// Render a scene HTML file to MP4 (1080x1920, 30fps) with a synthesized soundtrack.
//   NODE_PATH=$(npm root -g) node render.cjs ../scenes/01-group-chat.html ../out/01-group-chat.mp4
//   add --stills 1,5,12.5 to write PNG stills at those times instead of a video
//   add --audio to write only the soundtrack (handy for checking voice-over timing)
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FPS = 30;
const [scene, outFile, ...rest] = process.argv.slice(2);
const stillsArg = rest.indexOf('--stills') >= 0 ? rest[rest.indexOf('--stills') + 1] : null;
const audioOnly = rest.includes('--audio'); // write just the soundtrack to <outFile>.wav

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(scene));
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.renderFrame(0));
  await page.waitForTimeout(300);
  const meta = await page.evaluate(() => ({ duration: window.DURATION, sfx: window.SFX || [], bed: window.BED || 'lofi', vo: window.VO || [], voSpeed: window.VO_SPEED || 1.0, voStyle: window.VO_STYLE || null }));

  if (audioOnly) {
    fs.writeFileSync(outFile + '.cues.json', JSON.stringify(meta));
    execFileSync('python3', [path.join(__dirname, 'audio.py'), outFile + '.cues.json', outFile + '.wav'], { stdio: 'inherit' });
    console.log('duration', meta.duration);
    await browser.close();
    return;
  }

  if (stillsArg) {
    for (const s of stillsArg.split(',').map(Number)) {
      await page.evaluate((t) => window.renderFrame(t), s);
      await page.screenshot({ path: `${outFile}-${String(s).replace('.', '_')}.png` });
    }
    await browser.close();
    return;
  }

  const silent = outFile.replace(/\.mp4$/, '.silent.mp4');
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', silent], { stdio: ['pipe', 'inherit', 'inherit'] });

  const frames = Math.round(meta.duration * FPS);
  for (let i = 0; i < frames; i++) {
    await page.evaluate((t) => window.renderFrame(t), i / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 150 === 0) process.stdout.write(`  frame ${i}/${frames}\n`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();

  const cues = outFile.replace(/\.mp4$/, '.cues.json');
  const wav = outFile.replace(/\.mp4$/, '.wav');
  fs.writeFileSync(cues, JSON.stringify(meta));
  execFileSync('python3', [path.join(__dirname, 'audio.py'), cues, wav], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-i', wav, '-c:v', 'copy', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '44100', '-c:a', 'aac', '-b:a', '192k', '-shortest', outFile]);
  [silent, cues, wav].forEach((f) => fs.unlinkSync(f));
  console.log('wrote', outFile);
})();
