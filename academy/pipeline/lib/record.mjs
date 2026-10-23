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
  constructor(file, size = VIDEO) {
    this.proc = spawn('ffmpeg', [
      '-hide_banner', '-v', 'error', '-y',
      '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(VIDEO.fps), '-i', '-',
      '-vf', `scale=${size.width}:${size.height}:flags=lanczos,format=yuv420p`,
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

// Where the viewer's attention is, for the portrait version's moving crop.
// Wide targets (table rows, boards) are read from the left, where their label sits.
const centre = (r) => ({ x: r.x + Math.min(r.width, 700) / 2, y: r.y + r.height / 2 });
function attend(scene, sceneStart, r) {
  if (r) scene.focus.push({ t: now() - sceneStart, ...centre(r) });
}

async function perform(page, cursor, a, scene, sceneStart) {
  if (process.env.KY_DEBUG) console.log(`    ${(now() - sceneStart).toFixed(2)}s`, JSON.stringify(a).slice(0, 80));
  if (a.focus) {
    // Portrait-only hint: look here, without showing anything.
    const r = Array.isArray(a.focus) ? { x: a.focus[0], y: a.focus[1], width: 0, height: 0 } : await rectOf(page, a.focus);
    attend(scene, sceneStart, r);
  } else if (a.goto) {
    await page.goto(expand(a.goto), { waitUntil: 'networkidle' }).catch(() => {});
    await cursor.wake();
  } else if (a.click) {
    attend(scene, sceneStart, await cursor.to(a.click));
    await sleep(120);
    scene.clicks.push(now() - sceneStart);
    await page.mouse.down();
    await sleep(90);
    await page.mouse.up();
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await cursor.wake();
  } else if (a.hover) {
    attend(scene, sceneStart, await cursor.to(a.hover));
  } else if (a.move) {
    await cursor.moveTo(a.move[0], a.move[1]);
  } else if (a.type !== undefined) {
    if (a.into) {
      attend(scene, sceneStart, await cursor.to(a.into));
      await (await find(page, a.into)).click();
    }
    await page.keyboard.type(a.type, { delay: a.delay ?? 55 });
  } else if (a.press) {
    await page.keyboard.press(a.press);
  } else if (a.scroll !== undefined) {
    await page.evaluate(([dy, ms]) => window.__ky.scroll(dy, ms), [a.scroll, (a.ms ?? 900) * scene.speed]);
  } else if (a.highlight) {
    const r = await rectOf(page, a.highlight);
    // Aim the portrait crop so the label beside the spotlight stays in view too.
    const labelled = { ...r, width: Math.max(r.width, (a.label || '').length * 14 + 40) };
    if (!a.nofocus) attend(scene, sceneStart, labelled);
    await page.evaluate(([r, l, ms]) => window.__ky.spotlight(r, l, ms), [r, a.label || '', (a.for ?? 2.8) * 1000 * scene.speed]);
  } else if (a.title) {
    // The portrait version shows titles in its own top band, so their text and timing are kept.
    scene.titles.push({ t: now() - sceneStart, title: a.title, sub: a.sub || '', for: (a.for ?? 3.5) * scene.speed });
    await page.evaluate(([t, s, ms]) => window.__ky.lowerThird(t, s, ms), [a.title, a.sub || '', (a.for ?? 3.5) * 1000 * scene.speed]);
  } else if (a.zoom) {
    // Zooms are applied in the edit, so only the target and timing are recorded here.
    const rect = a.zoom === 'cursor'
      ? { x: cursor.x - 160, y: cursor.y - 90, width: 320, height: 180 }
      : await rectOf(page, a.zoom);
    attend(scene, sceneStart, rect);
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

// A designed scene page (motion graphics, mock websites, phones): { src: file URL, ...query params }.
function pageUrl({ src, ...params }) {
  const u = new URL(expand(src));
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  return u.href;
}

// Plays the lesson in a real browser and records it. Returns the raw video and,
// for each scene, where it sits in that video and what to zoom.
// With `check` set to a folder, nothing is recorded: every action runs as fast as
// possible to prove the selectors work, and each scene's end state is screenshotted.
// `size` records at another frame size (the portrait pass); `only` records just the scenes
// it accepts and leaves empty placeholders for the rest.
export async function record(lesson, narrations, rawFile, { headed = false, check = null, size = VIDEO, only = null } = {}) {
  const lead = lesson.lead ?? LEAD;
  const tail = lesson.tail ?? TAIL;
  const browser = await chromium.launch({ headless: !headed });
  let state;
  try { await fs.access(AUTH_STATE); state = AUTH_STATE; } catch {}
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    deviceScaleFactor: 1,
    storageState: lesson.auth === false ? undefined : state,
    locale: 'en-US',
    timezoneId: process.env.KYNTLO_TIMEZONE || 'Europe/London',
  });
  await context.addInitScript({ path: new URL(OVERLAY).pathname });
  // Lesson-specific page scripts (demo data, on-screen text rules), in order.
  for (const src of lesson.init || []) await context.addInitScript({ path: src instanceof URL ? src.pathname : src });
  const page = await context.newPage();
  const cursor = new Cursor(page);
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const cdp = await context.newCDPSession(page);
  const sink = check ? { push() {}, async close() {}, t0: 0 } : new FrameSink(rawFile, size);
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    sink.push(Buffer.from(data, 'base64'), metadata.timestamp ?? now());
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });

  const scenes = [];
  try {
    await page.goto('about:blank');
    if (!check) await cdp.send('Page.startScreencast', {
      format: 'jpeg', quality: 92, maxWidth: size.width, maxHeight: size.height, everyNthFrame: 1,
    });
    for (const [i, s] of lesson.scenes.entries()) {
      const scene = { index: i, speed: s.speed ?? 1, zooms: [], clicks: [], focus: [], titles: [] };
      if (only && !only(s)) {
        scenes.push({ ...scene, skipped: true, start: now(), end: now() });
        continue;
      }
      // Off-camera setup: this part of the recording is cut out in the edit.
      if (s.card) await page.goto(cardUrl(s.card.type === 'intro' && lesson.plan ? { plan: lesson.plan, ...s.card } : s.card), { waitUntil: 'load' });
      if (s.page) {
        await page.goto(pageUrl(s.page), { waitUntil: 'load' });
        await page.evaluate(() => document.fonts?.ready).catch(() => {});
      }
      if (s.screen) {
        await page.goto(screenUrl(s.screen), { waitUntil: 'load' });
        await page.waitForSelector('body[data-ready]', { timeout: 10000 }).catch(async () => {
          throw new Error(`Screen image did not load: ${s.screen.img} (${await page.title()})`);
        });
      }
      if (s.goto) await page.goto(expand(s.goto), { waitUntil: 'networkidle' }).catch(() => {});
      for (const a of s.setup || []) await perform(page, cursor, a, scene, now());
      const hidden = !!s.card || (!!s.page && !s.cursor);
      await page.evaluate((hide) => { if (window.__ky) window.__ky.hideCursor = hide; }, hidden).catch(() => {});
      if (!hidden) await cursor.wake();
      await sleep((s.settle ?? 0.6) * 1000);

      const start = now();
      if (s.card || s.page) await page.evaluate(() => window.__kyPlay?.());
      const target = s.duration ?? (lead + (narrations[i]?.seconds ?? 0) + (s.tail ?? tail));
      for (const a of s.actions || []) {
        if (a.at !== undefined && !check) await sleep((start + a.at * scene.speed - now()) * 1000);
        try {
          await perform(page, cursor, a, scene, start);
        } catch (e) {
          throw new Error(`Scene ${i + 1}, action ${JSON.stringify(a).slice(0, 120)}: ${e.message.split('\n')[0]}`);
        }
        if (check) await sleep(250);
      }
      if (check) {
        await sleep(400);
        await page.screenshot({ path: `${check}/scene-${String(i + 1).padStart(2, '0')}.png` });
        const banned = await page.evaluate((words) => words.filter((w) => new RegExp(w, 'i').test(document.body?.innerText || '')), lesson.bannedWords || []);
        if (banned.length) console.log(`  ⚠ scene ${i + 1} shows: ${banned.join(', ')}`);
      } else await sleep((start + target * scene.speed - now()) * 1000);
      // Screencast frames lag slightly behind real time; give the last one a moment to land.
      await sleep(150);
      Object.assign(scene, { start, end: now() });
      scenes.push(scene);
      const over = (scene.end - start) / scene.speed - target;
      if (!check) process.stdout.write(`  ● recorded scene ${i + 1}/${lesson.scenes.length}` +
        (over > 0.5 ? `  (actions ran ${over.toFixed(1)}s past the narration)` : '') + '\n');
    }
    if (!check) await cdp.send('Page.stopScreencast');
    if (errors.length) throw new Error(`JavaScript errors on the page:\n${errors.join('\n')}`);
  } finally {
    await sink.close(now());
    await browser.close();
  }
  // Make scene times relative to the first frame of the raw video.
  for (const s of scenes) { s.start -= sink.t0; s.end -= sink.t0; }
  return scenes;
}
