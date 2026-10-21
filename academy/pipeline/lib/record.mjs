import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { AUTH_STATE, CARD_HTML, LEAD, TAIL, VIDEO, expand } from './config.mjs';

const OVERLAY = new URL('./overlay.js', import.meta.url);
const sleep = (ms) => new Promise((r) => setTimeout(r, Math.max(0, ms)));
const now = () => Date.now() / 1000;

// Encodes the CDP screencast into a constant-frame-rate video. Chrome only
// sends a frame when the screen changes, so each frame is repeated until the
// next one arrives, keyed to the browser's own timestamps.
class FrameSink {
  constructor(file) {
    this.proc = spawn('ffmpeg', [
      '-hide_banner', '-v', 'error', '-y',
      '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(VIDEO.fps), '-i', '-',
      '-vf', `scale=${VIDEO.width}:${VIDEO.height}:flags=lanczos,format=yuv420p`,
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '12', file,
    ], { stdio: ['pipe', 'ignore', 'inherit'] });
    this.done = new Promise((res, rej) => this.proc.on('close', (c) => (c ? rej(new Error(`encoder exited ${c}`)) : res())));
    this.t0 = null;
    this.written = 0;
    this.last = null;
    this.queue = Promise.resolve();
  }
  async #emit(buf, count) {
    for (let i = 0; i < count; i++) {
      if (!this.proc.stdin.write(buf)) await new Promise((r) => this.proc.stdin.once('drain', r));
    }
    this.written += count;
  }
  push(buf, t) {
    this.queue = this.queue.then(async () => {
      if (this.t0 === null) this.t0 = t;
      const due = Math.round((t - this.t0) * VIDEO.fps);
      if (this.last) await this.#emit(this.last, Math.max(0, due - this.written));
      this.last = buf;
    });
  }
  async close(t) {
    this.push(null, t);
    await this.queue;
    this.proc.stdin.end();
    await this.done;
  }
}

async function find(page, sel, timeout = 10000) {
  const options = Array.isArray(sel) ? sel : [sel];
  const each = Math.max(1500, timeout / options.length);
  for (const s of options) {
    const loc = page.locator(s).first();
    try {
      await loc.waitFor({ state: 'visible', timeout: each });
      // Scroll on camera, smoothly, only when the target is off screen.
      await loc.evaluate((el) => window.__ky?.reveal(el, 900));
      return loc;
    } catch {}
  }
  throw new Error(`None of these selectors appeared: ${options.join(' | ')}`);
}

async function rectOf(page, sel) {
  // On a screen stage, targets are {x, y, w, h} in screenshot pixels.
  if (sel && typeof sel === 'object' && !Array.isArray(sel)) return page.evaluate((r) => window.__kyMap(r), sel);
  const box = await (await find(page, sel)).boundingBox();
  return { x: box.x, y: box.y, width: box.width, height: box.height };
}

// The visible cursor is animated inside the page; Playwright only sends the
// final real mouse event. Streams of real mouse events stall on busy pages.
class Cursor {
  constructor(page) {
    this.page = page;
    this.x = VIDEO.width * 0.55;
    this.y = VIDEO.height * 0.55;
  }
  async moveTo(x, y, ms = 650) {
    await this.page.evaluate(([x, y, ms]) => window.__ky.glide(x, y, ms), [x, y, ms]);
    await this.page.mouse.move(x, y);
    [this.x, this.y] = [x, y];
  }
  async to(sel) {
    const r = await rectOf(this.page, sel);
    await this.moveTo(r.x + r.width / 2, r.y + r.height / 2);
    return r;
  }
  async wake() {
    await this.page.evaluate(([x, y]) => window.__ky && (window.__ky.pos = { x, y }), [this.x, this.y]).catch(() => {});
    await this.page.mouse.move(this.x, this.y);
  }
}

async function perform(page, cursor, a, scene, sceneStart) {
  if (process.env.KY_DEBUG) console.log(`    ${(now() - sceneStart).toFixed(2)}s`, JSON.stringify(a).slice(0, 80));
  if (a.goto) {
    await page.goto(expand(a.goto), { waitUntil: 'networkidle' }).catch(() => {});
    await cursor.wake();
  } else if (a.click) {
    await cursor.to(a.click);
    await sleep(120);
    scene.clicks.push(now() - sceneStart);
    await page.mouse.down();
    await sleep(90);
    await page.mouse.up();
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await cursor.wake();
  } else if (a.hover) {
    await cursor.to(a.hover);
  } else if (a.move) {
    await cursor.moveTo(a.move[0], a.move[1]);
  } else if (a.type !== undefined) {
    if (a.into) {
      await cursor.to(a.into);
      await (await find(page, a.into)).click();
    }
    await page.keyboard.type(a.type, { delay: a.delay ?? 55 });
  } else if (a.press) {
    await page.keyboard.press(a.press);
  } else if (a.scroll !== undefined) {
    await page.evaluate(([dy, ms]) => window.__ky.scroll(dy, ms), [a.scroll, (a.ms ?? 900) * scene.speed]);
  } else if (a.highlight) {
    const r = await rectOf(page, a.highlight);
    await page.evaluate(([r, l, ms]) => window.__ky.spotlight(r, l, ms), [r, a.label || '', (a.for ?? 2.8) * 1000 * scene.speed]);
  } else if (a.title) {
    await page.evaluate(([t, s, ms]) => window.__ky.lowerThird(t, s, ms), [a.title, a.sub || '', (a.for ?? 3.5) * 1000 * scene.speed]);
  } else if (a.zoom) {
    // Zooms are applied in the edit, so only the target and timing are recorded here.
    const rect = a.zoom === 'cursor'
      ? { x: cursor.x - 160, y: cursor.y - 90, width: 320, height: 180 }
      : await rectOf(page, a.zoom);
    scene.zooms.push({ t: now() - sceneStart, for: (a.for ?? 3) * scene.speed, scale: a.scale ?? 1.7, rect });
  } else if (a.wait !== undefined) {
    await sleep(a.wait * 1000 * scene.speed);
  } else if (a.run) {
    await a.run(page);
  } else {
    throw new Error(`Unknown action: ${JSON.stringify(a)}`);
  }
}

function cardUrl(card, file = CARD_HTML) {
  const u = pathToFileURL(file);
  for (const [k, v] of Object.entries(card)) u.searchParams.set(k, v);
  return u.href;
}

function screenUrl(screen) {
  return cardUrl(screen, CARD_HTML.replace(/card\.html$/, 'screen.html'));
}

// Plays the lesson in a real browser and records it. Returns the raw video and,
// for each scene, where it sits in that video and what to zoom.
export async function record(lesson, narrations, rawFile, { headed = false } = {}) {
  const browser = await chromium.launch({ headless: !headed });
  let state;
  try { await fs.access(AUTH_STATE); state = AUTH_STATE; } catch {}
  const context = await browser.newContext({
    viewport: { width: VIDEO.width, height: VIDEO.height },
    deviceScaleFactor: 1,
    storageState: lesson.auth === false ? undefined : state,
    locale: 'en-US',
    timezoneId: process.env.KYNTLO_TIMEZONE || 'Europe/London',
  });
  await context.addInitScript({ path: new URL(OVERLAY).pathname });
  const page = await context.newPage();
  const cursor = new Cursor(page);
  const cdp = await context.newCDPSession(page);
  const sink = new FrameSink(rawFile);
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    sink.push(Buffer.from(data, 'base64'), metadata.timestamp ?? now());
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });

  const scenes = [];
  try {
    await page.goto('about:blank');
    await cdp.send('Page.startScreencast', {
      format: 'jpeg', quality: 92, maxWidth: VIDEO.width, maxHeight: VIDEO.height, everyNthFrame: 1,
    });
    for (const [i, s] of lesson.scenes.entries()) {
      const scene = { index: i, speed: s.speed ?? 1, zooms: [], clicks: [] };
      // Off-camera setup: this part of the recording is cut out in the edit.
      if (s.card) await page.goto(cardUrl(s.card.type === 'intro' && lesson.plan ? { plan: lesson.plan, ...s.card } : s.card), { waitUntil: 'load' });
      if (s.screen) {
        await page.goto(screenUrl(s.screen), { waitUntil: 'load' });
        await page.waitForSelector('body[data-ready]', { timeout: 10000 }).catch(async () => {
          throw new Error(`Screen image did not load: ${s.screen.img} (${await page.title()})`);
        });
      }
      if (s.goto) await page.goto(expand(s.goto), { waitUntil: 'networkidle' }).catch(() => {});
      for (const a of s.setup || []) await perform(page, cursor, a, scene, now());
      await page.evaluate((hide) => { if (window.__ky) window.__ky.hideCursor = hide; }, !!s.card).catch(() => {});
      if (!s.card) await cursor.wake();
      await sleep((s.settle ?? 0.6) * 1000);

      const start = now();
      if (s.card) await page.evaluate(() => window.__kyPlay?.());
      const target = s.duration ?? (LEAD + (narrations[i]?.seconds ?? 0) + TAIL);
      for (const a of s.actions || []) {
        if (a.at !== undefined) await sleep((start + a.at * scene.speed - now()) * 1000);
        await perform(page, cursor, a, scene, start);
      }
      await sleep((start + target * scene.speed - now()) * 1000);
      // Screencast frames lag slightly behind real time; give the last one a moment to land.
      await sleep(150);
      Object.assign(scene, { start, end: now() });
      scenes.push(scene);
      const over = (scene.end - start) / scene.speed - target;
      process.stdout.write(`  ● recorded scene ${i + 1}/${lesson.scenes.length}` +
        (over > 0.5 ? `  (actions ran ${over.toFixed(1)}s past the narration)` : '') + '\n');
    }
    await cdp.send('Page.stopScreencast');
  } finally {
    await sink.close(now());
    await browser.close();
  }
  // Make scene times relative to the first frame of the raw video.
  for (const s of scenes) { s.start -= sink.t0; s.end -= sink.t0; }
  return scenes;
}
