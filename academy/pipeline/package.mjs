#!/usr/bin/env node
// Packages rendered lessons for publishing:
//   academy/course/
//     Kyntlo Academy/<NN Module>/<NN.LL Title>.mp4 (+ .srt, .jpg)   ← upload-ready folders (hard links, no extra disk)
//     course.json                                                     ← full manifest
//     course-platform.csv                                             ← sections + lectures for Udemy / Teachable / Thinkific
//     youtube.md                                                      ← playlists, titles, descriptions, upload order
//     course-landing.md                                               ← course page copy
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ACADEMY, OUTPUT } from './lib/config.mjs';
import { duration } from './lib/run.mjs';

const COURSE = path.join(ACADEMY, 'course');
const LESSONS = path.join(ACADEMY, 'lessons', 'customer');
const clock = (t) => `${Math.floor(t / 60)}:${String(Math.round(t % 60)).padStart(2, '0')}`;
const safe = (s) => s.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim();
const csv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const exists = (f) => fs.access(f).then(() => true, () => false);

// Module names come from the course map's "### Module N — Name (…)" headings.
const curriculum = await fs.readFile(path.join(ACADEMY, 'curriculum.md'), 'utf8');
const modules = Object.fromEntries([...curriculum.matchAll(/^### Module (\d+) — ([^(\n]+)/gm)].map((m) => [Number(m[1]), m[2].trim()]));

const lessons = [];
for (const f of (await fs.readdir(LESSONS)).filter((f) => /^a\d\d-\d\d-.+\.mjs$/.test(f)).sort()) {
  const { default: l } = await import(pathToFileURL(path.join(LESSONS, f)).href);
  const name = f.replace(/\.mjs$/, '');
  const [, mod, num] = name.match(/^a(\d\d)-(\d\d)/);
  const video = path.join(OUTPUT, `${name}.mp4`);
  const rendered = await exists(video);
  const short = l.title.replace(/^Kyntlo Academy [\d.]+ — /, '');
  const youtube = rendered ? await fs.readFile(path.join(OUTPUT, `${name}.youtube.txt`), 'utf8') : '';
  lessons.push({
    file: name, module: Number(mod), lesson: Number(num), id: l.id, title: short, plan: l.plan || 'ALL',
    description: l.description || '', tags: l.tags || [],
    seconds: rendered ? await duration(video) : null, rendered,
    youtubeDescription: youtube.split('\n').slice(2).join('\n').trim(),
  });
}

await fs.rm(path.join(COURSE, 'Kyntlo Academy'), { recursive: true, force: true });
for (const l of lessons.filter((l) => l.rendered)) {
  const dir = path.join(COURSE, 'Kyntlo Academy', `${String(l.module).padStart(2, '0')} ${safe(modules[l.module] || `Module ${l.module}`)}`);
  await fs.mkdir(dir, { recursive: true });
  const base = path.join(dir, `${l.module}.${l.lesson} ${safe(l.title)}`);
  await fs.link(path.join(OUTPUT, `${l.file}.mp4`), `${base}.mp4`);
  await fs.link(path.join(OUTPUT, `${l.file}.srt`), `${base}.srt`).catch(() => {});
  await fs.link(path.join(OUTPUT, `${l.file}.thumb.png`), `${base}.thumbnail.png`).catch(() => {});
}

const planLabel = { ALL: 'All plans', 'GROWTH+': 'Growth & Pro', PRO: 'Pro', 'ADD-ON': 'Add-on' };
const total = lessons.reduce((n, l) => n + (l.seconds || 0), 0);
const byModule = Object.entries(modules).map(([n, name]) => ({ module: Number(n), name, lessons: lessons.filter((l) => l.module === Number(n)) }));

await fs.writeFile(path.join(COURSE, 'course.json'), JSON.stringify({
  title: 'Kyntlo Academy', totalSeconds: Math.round(total), lessons: lessons.length, rendered: lessons.filter((l) => l.rendered).length, modules: byModule,
}, null, 2));

await fs.writeFile(path.join(COURSE, 'course-platform.csv'), [
  ['Section #', 'Section', 'Lecture #', 'Lecture title', 'Plan', 'Duration', 'Video file', 'Captions file', 'Description'].map(csv).join(','),
  ...lessons.map((l) => [l.module, modules[l.module], `${l.module}.${l.lesson}`, l.title, planLabel[l.plan] || l.plan,
    l.seconds ? clock(l.seconds) : 'not rendered', `${l.module}.${l.lesson} ${safe(l.title)}.mp4`, `${l.module}.${l.lesson} ${safe(l.title)}.srt`, l.description].map(csv).join(',')),
].join('\n') + '\n');

const yt = ['# Kyntlo Academy — YouTube upload guide', '',
  'Create one playlist per module, upload lessons in order, and add every video to the full-course playlist too.',
  'For each video: title, description (includes chapters), the `.srt` as English captions, the `.thumbnail.png` as thumbnail.', '',
  `Full-course playlist: **Kyntlo Academy — Complete Course** (${lessons.length} lessons${total ? `, ${Math.round(total / 60)} minutes` : ''})`, ''];
for (const m of byModule) {
  if (!m.lessons.length) continue;
  yt.push(`## Playlist: Kyntlo Academy · Module ${m.module} — ${m.name}`, '');
  for (const l of m.lessons) {
    yt.push(`### ${l.module}.${l.lesson} · ${l.title}${l.seconds ? ` (${clock(l.seconds)})` : ' (not rendered yet)'}`, '',
      `**Title:** Kyntlo Academy ${l.module}.${l.lesson} — ${l.title}`, '', '**Description:**', '', '```', l.youtubeDescription || l.description, '```', '');
  }
}
await fs.writeFile(path.join(COURSE, 'youtube.md'), yt.join('\n'));

const learn = byModule.filter((m) => m.lessons.length).map((m) => `- ${m.name}`);
await fs.writeFile(path.join(COURSE, 'course-landing.md'), `# Kyntlo Academy — The Complete Kyntlo Course

**Subtitle:** Set up and run your whole business on Kyntlo: CRM, inbox, booking, pipelines, funnels, marketing, automation, AI and reviews.

## Course description

Kyntlo brings the tools a growing business needs into one platform. This course takes you from your first
login to a complete, automated lead-to-booking system, one short, focused lesson at a time. Every lesson is
filmed step by step inside a Kyntlo account, with clear narration, zoom-ins on every click and English captions.

Each lesson shows which Kyntlo plan includes the feature (Starter, Growth or Pro), so you always know what's
available to you.

## What you'll learn

${learn.join('\n')}

## Who this course is for

- Business owners and teams who have just started with Kyntlo
- Anyone choosing between Kyntlo's Starter, Growth, Pro and Customized plans
- Staff who manage leads, bookings, marketing or customer messages in Kyntlo

## Requirements

- A Kyntlo account (start a free 14-day trial at https://kyntlo.ai/trial)
- No technical experience needed

## Course stats

- ${byModule.filter((m) => m.lessons.length).length} modules · ${lessons.length} lessons${total ? ` · ${(total / 3600).toFixed(1)} hours of video` : ''}
- English narration and captions
`);

console.log(`Packaged ${lessons.filter((l) => l.rendered).length}/${lessons.length} rendered lessons (${clock(total)}) into ${COURSE}`);
