#!/usr/bin/env node
// Renders the YouTube thumbnails from academy/course/youtube-meta.json:
//   1. a clean screenshot of each video's feature in the demo workspace
//   2. the thumbnail (thumb.html) around it, 1280×720 PNG
// Usage: node thumbs/render.mjs [stem-prefix ...]   (needs the static server on :4173)
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { ACADEMY, ENV } from '../lib/config.mjs';

const meta = JSON.parse(await fs.readFile(path.join(ACADEMY, 'course', 'youtube-meta.json'), 'utf8'));
const SHOTS = path.join(ACADEMY, '.cache', 'thumbshots');
const OUT = path.join(ACADEMY, 'output', 'thumbnails');
await fs.mkdir(SHOTS, { recursive: true });
await fs.mkdir(OUT, { recursive: true });

const only = process.argv.slice(2);
const stems = Object.keys(meta.videos).filter((s) => !only.length || only.some((p) => s.startsWith(p)));
const origin = new URL(ENV.demoUrl).origin;
const url = (route) => (route.startsWith('SITE:') ? ENV.siteUrl + route.slice(5) : ENV.demoUrl + route);

const browser = await chromium.launch();
const app = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const stem of stems) {
  await app.goto(url(meta.videos[stem].route), { waitUntil: 'networkidle' });
  await app.waitForTimeout(700);
  await app.screenshot({ path: path.join(SHOTS, `${stem}.png`) });
}

const card = await browser.newPage({ viewport: { width: 1280, height: 720 } });
for (const stem of stems) {
  const v = { ...meta.videos[stem], lessonsPerModule: meta.lessonsPerModule, shot: `/academy/.cache/thumbshots/${stem}.png?${Date.now()}` };
  await card.goto(`${origin}/academy/pipeline/thumbs/thumb.html?v=${stem}#${encodeURIComponent(JSON.stringify(v))}`);
  await card.waitForSelector('body[data-ready]');
  await card.waitForFunction(() => document.getElementById('shot').complete);
  await card.screenshot({ path: path.join(OUT, `${stem}.png`) });
  process.stdout.write(`✓ ${stem}\n`);
}
await browser.close();
