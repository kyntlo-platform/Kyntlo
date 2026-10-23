#!/usr/bin/env node
// Renders Kyntlo Academy lessons end to end:
//   narration (Gemini TTS) → browser recording → edit → MP4 + SRT + chapters + thumbnail
//
//   node render.mjs ../lessons/prospect/b1-kyntlo-in-90-seconds.mjs
//   node render.mjs ../lessons/customer            (every lesson in a folder)
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { CACHE, CARD_HTML, ENV, LEAD, OUTPUT, WRITTEN, XFADE, expand } from './lib/config.mjs';
import { narrateAll } from './lib/tts.mjs';
import { record } from './lib/record.mjs';
import { PORTRAIT, assemble, timeline } from './lib/edit.mjs';
import { cues, toAss, toSrt } from './lib/subtitles.mjs';

async function lessonFiles(args) {
  const files = [];
  for (const a of args) {
    const stat = await fs.stat(a);
    if (stat.isDirectory()) {
      for (const f of (await fs.readdir(a)).sort()) if (f.endsWith('.mjs')) files.push(path.join(a, f));
    } else files.push(a);
  }
  return files.map((f) => path.resolve(f));
}

const clock = (t) => {
  const s = Math.floor(t);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

async function thumbnail(lesson, file) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const u = pathToFileURL(CARD_HTML);
  for (const [k, v] of Object.entries({ type: 'thumb', ...lesson.thumbnail })) u.searchParams.set(k, v);
  await page.goto(u.href, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: file });
  await browser.close();
}

// --check: run every action against the app quickly, save a screenshot per scene, no video.
async function check(file) {
  const { default: lesson } = await import(pathToFileURL(file).href);
  const name = path.basename(file, '.mjs');
  const dir = path.join(CACHE, 'check', name);
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
  const words = lesson.scenes.reduce((n, s) => n + (s.say || '').split(/\s+/).filter(Boolean).length, 0);
  console.log(`\n▶ CHECK ${lesson.id} — ${lesson.title}  (~${clock(words / 2.5 + lesson.scenes.length * 1.5)} at narration pace)`);
  await record(lesson, lesson.scenes.map(() => ({ seconds: 0 })), null, { check: dir });
  console.log(`  ✔ all ${lesson.scenes.length} scenes ran; screenshots in ${dir}`);
}

// Each scene's narration line; a lesson or scene can choose its own voice ({ voice, speed }).
const lines = (lesson) => lesson.scenes.map((s) => {
  const v = s.voice || lesson.voice;
  return v ? { text: s.say || '', voice: v.voice, speed: v.speed } : s.say || '';
});

// The portrait version's frame: a designed page screenshotted with a transparent window.
async function portraitFrame(spec, file) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: PORTRAIT.width, height: PORTRAIT.height } });
  const u = new URL(expand(spec.src));
  for (const [k, v] of Object.entries(spec)) if (k !== 'src') u.searchParams.set(k, v);
  u.searchParams.set('frame', '1');
  await page.goto(u.href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: file, omitBackground: true });
  await browser.close();
}

// --voice: only generate (and cache) the narration, so recording later isn't slowed by it.
async function voice(file) {
  const { default: lesson } = await import(pathToFileURL(file).href);
  const n = await narrateAll(lines(lesson));
  console.log(`  ♪ ${path.basename(file)}: ${n.length} lines, ${clock(n.reduce((a, x) => a + x.seconds, 0))} of narration`);
}

async function render(file, opts) {
  const { default: lesson } = await import(pathToFileURL(file).href);
  const name = path.basename(file, '.mjs');
  const work = path.join(CACHE, 'work', name);
  await fs.mkdir(work, { recursive: true });
  await fs.mkdir(OUTPUT, { recursive: true });
  console.log(`\n▶ ${lesson.id} — ${lesson.title}`);

  const narrations = await narrateAll(lines(lesson));
  const draft = narrations.some((n) => n.draft);
  console.log(`  ♪ narration ready (${draft ? 'DRAFT: silent, no voice engine' : narrations[0].engine})`);

  // Recordings and their scene timings are kept, so `--edit` can re-cut without re-recording.
  const raw = path.join(work, 'raw.mp4');
  const saved = path.join(work, 'scenes.json');
  const scenes = opts.edit ? JSON.parse(await fs.readFile(saved, 'utf8')) : await record(lesson, narrations, raw, opts);
  if (!opts.edit) await fs.writeFile(saved, JSON.stringify(scenes));
  const tl = timeline(scenes, narrations, lesson);
  const lead = lesson.lead ?? LEAD;

  const subtitleCues = (line) => lesson.scenes.flatMap((s, i) =>
    s.say ? cues(s.caption ?? WRITTEN.reduce((t, [from, to]) => t.replace(from, to), s.say), tl.starts[i] + lead, narrations[i].seconds, { line }) : []);
  const allCues = subtitleCues(42);
  const base = path.join(OUTPUT, name + (draft ? '.draft' : ''));
  const assFile = path.join(work, 'subs.ass');
  await fs.writeFile(assFile, toAss(allCues, lesson.subtitles?.landscape));
  await fs.writeFile(`${base}.srt`, toSrt(allCues));

  const { music } = await assemble({ lesson, raw, scenes, narrations, timeline: tl, work, assFile, out: `${base}.mp4` });

  if (lesson.formats?.includes('portrait')) {
    // Designed scenes are recorded again at 1080x1920; app scenes reuse the landscape recording.
    console.log('  ▶ portrait version');
    const pRaw = path.join(work, 'raw-portrait.mp4');
    const pSaved = path.join(work, 'scenes-portrait.json');
    const pScenes = opts.edit ? JSON.parse(await fs.readFile(pSaved, 'utf8'))
      : await record(lesson, narrations, pRaw, { ...opts, size: PORTRAIT, only: (s) => !!(s.card || s.page) });
    if (!opts.edit) await fs.writeFile(pSaved, JSON.stringify(pScenes));
    const frame = path.join(work, 'portrait-frame.png');
    await portraitFrame(lesson.portraitFrame, frame);
    // App scenes show their chapter (or on-screen title) in the band above the window.
    const ps = lesson.subtitles?.portrait || {};
    const events = [];
    lesson.scenes.forEach((s, i) => {
      if (s.card || s.page) return;
      const from = tl.starts[i] + (i ? lesson.xfade ?? XFADE : 0);
      const to = tl.starts[i] + tl.durations[i];
      const label = s.plabel ?? s.chapter;
      const titles = scenes[i].titles.map((x) => ({ ...x, t: from + x.t / scenes[i].speed }));
      let t = from;
      for (const x of [...titles, null]) {
        const end = x ? Math.min(x.t, to) : to;
        if (label && end - t > 0.3) events.push({ start: t, end, style: 'Top', text: `{\\fad(150,150)}${label}` });
        if (!x) break;
        const until = Math.min(x.t + x.for, to);
        events.push({ start: x.t, end: until, style: 'Top', text: `{\\fad(150,150)}${x.title}${x.sub ? `\\N{\\rTopSub}${x.sub}` : ''}` });
        t = until;
      }
    });
    const pAss = path.join(work, 'subs-portrait.ass');
    await fs.writeFile(pAss, toAss(subtitleCues(ps.line ?? 26), {
      width: PORTRAIT.width, height: PORTRAIT.height, size: 56, marginV: 120, marginH: 70, ...ps,
      styles: [
        `Style: Top,${ps.titleFont || 'Inter'},62,${ps.titleColour || '&H00FFFFFF'},&H00FFFFFF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,0,0,7,60,60,150,1`,
        `Style: TopSub,${ps.titleFont || 'Inter'},38,${ps.subColour || '&H33FFFFFF'},&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,7,60,60,150,1`,
      ],
      events,
    }));
    await assemble({ lesson, raw, scenes, narrations, timeline: tl, work, assFile: pAss, out: `${base}-portrait.mp4`,
      format: 'portrait', portrait: { raw: pRaw, scenes: pScenes, frame } });
    console.log(`  ✔ ${path.relative(process.cwd(), base)}-portrait.mp4`);
  }

  const chapters = lesson.scenes
    .map((s, i) => (s.chapter ? `${clock(i === 0 ? 0 : tl.starts[i])} ${s.chapter}` : null))
    .filter(Boolean);
  const description = [
    lesson.description || '', '',
    ...(chapters.length >= 3 ? ['Chapters:', ...chapters, ''] : []),
    'Start your free 14-day Kyntlo trial: https://kyntlo.ai/trial',
    '', lesson.tags ? lesson.tags.map((t) => '#' + t.replace(/\s+/g, '')).join(' ') : '',
  ].join('\n').trim();
  await fs.writeFile(`${base}.youtube.txt`, `${lesson.title}\n\n${description}\n`);
  if (lesson.thumbnail) await thumbnail(lesson, `${base}.thumb.png`);

  console.log(`  ✔ ${path.relative(process.cwd(), base)}.mp4 (${clock(tl.total)}${music ? ', music: ' + path.basename(music) : ', no music'})`);
}

const args = process.argv.slice(2);
const headed = args.includes('--headed');
const files = await lessonFiles(args.filter((a) => !a.startsWith('--')));
if (!files.length) {
  console.error('Usage: node render.mjs <lesson.mjs | lessons-folder> [...] [--headed] [--check | --voice | --edit]');
  process.exit(1);
}
const checking = args.includes('--check');
const voicing = args.includes('--voice');
let failed = 0;
for (const f of files) {
  try {
    await (checking ? check(f) : voicing ? voice(f) : render(f, { headed, edit: args.includes('--edit') }));
  } catch (e) {
    failed++;
    console.error(`  ✘ ${path.basename(f)}: ${e.message}`);
  }
}
process.exit(failed ? 1 : 0);
