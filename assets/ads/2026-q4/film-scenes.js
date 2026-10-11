/* Render the brand-film scene stills.
   NODE_PATH=/opt/node22/lib/node_modules node film-scenes.js  ->  film/s01..s08.png

   One still per scene at 1.12x the frame, so ffmpeg's slow push-in has real
   pixels to work with instead of upscaling. */
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'film');
const W = 1080, H = 1920, SCALE = 1.12;
const SCRIPT = JSON.parse(fs.readFileSync(path.join(ROOT, 'script.json'), 'utf8'))['brand-film'];
const FONTS = path.join(ROOT, 'fonts');
const LOGO = path.join(ROOT, 'brand', 'kyntlo-logo-white.png');

const css = `
@import url("file://${FONTS}/brand.css");
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${Math.round(W*SCALE)}px;height:${Math.round(H*SCALE)}px;overflow:hidden}
body{
  background:#07050f; color:#fff; position:relative;
  font-family:'Inter',system-ui,sans-serif;
  display:flex; align-items:center; justify-content:center;
}
/* brand glow, placed per scene */
.glow{position:absolute; border-radius:50%; filter:blur(120px); opacity:.5}
.g1{width:900px;height:900px; background:#6d00c1; left:-240px; top:-180px}
.g2{width:760px;height:760px; background:#f20089; right:-220px; bottom:-140px; opacity:.42}
/* fine grid, keeps flat dark from reading as empty */
.grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);
  background-size:60px 60px}
.vig{position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 45%,transparent 38%,rgba(7,5,15,.82) 100%)}
.wrap{position:relative;z-index:3;width:100%;padding:0 104px;text-align:center}

.mono{font-family:'JetBrains Mono',monospace}
.kicker{font-family:'JetBrains Mono',monospace; font-size:25px; letter-spacing:.32em;
  text-transform:uppercase; color:#ff1aa3; margin-bottom:46px; opacity:.95}
.cap{font-family:'Space Grotesk',sans-serif; font-weight:700; letter-spacing:-.035em;
  line-height:1.03; font-size:112px}
.sub{font-size:40px; line-height:1.42; color:#c8c0d8; margin-top:52px; font-weight:400}

/* the giant measured numbers */
.huge{font-family:'Space Grotesk',sans-serif; font-weight:700; letter-spacing:-.05em;
  font-size:430px; line-height:.88;
  background:linear-gradient(170deg,#ff1aa3 0%,#f20089 42%,#6d00c1 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent}
.huge.cold{background:linear-gradient(170deg,#8f86a8 0%,#5d5570 100%);
  -webkit-background-clip:text; background-clip:text}
.pair{font-size:300px; letter-spacing:-.04em}
.time{font-family:'JetBrains Mono',monospace; font-weight:700; font-size:300px;
  letter-spacing:-.02em; color:#fff}

.closed{color:#6f6782; text-decoration:line-through; text-decoration-thickness:5px}
.rule{width:92px;height:5px;background:#f20089;margin:0 auto 54px;border-radius:3px}
.wordmark img{height:150px;display:block;margin:0 auto}
.url{font-family:'JetBrains Mono',monospace;font-size:35px;color:#ff1aa3;
  margin-top:60px;letter-spacing:.04em}
`;

const SCENES = [
  // 1 — the hook
  s => `<div class="glow g1"></div><div class="grid"></div><div class="vig"></div>
        <div class="wrap"><div class="kicker">Tuesday night</div>
        <div class="time">23:04</div><div class="sub">${s.sub}</div></div>`,
  // 2 — the gap, stated
  s => `<div class="glow g1"></div><div class="glow g2"></div><div class="grid"></div><div class="vig"></div>
        <div class="wrap"><div class="cap">The ads are running.<br><span class="closed">The office is closed.</span></div></div>`,
  // 3 — 62
  s => `<div class="glow g2"></div><div class="grid"></div><div class="vig"></div>
        <div class="wrap"><div class="kicker">Measured by hand</div>
        <div class="huge">62</div><div class="sub">${s.sub}</div></div>`,
  // 4 — 35 / 18
  s => `<div class="glow g1"></div><div class="grid"></div><div class="vig"></div>
        <div class="wrap"><div class="huge pair">35<span style="opacity:.3"> · </span>18</div>
        <div class="sub">${s.sub}</div></div>`,
  // 5 — only 8, deliberately drained of brand colour
  s => `<div class="grid"></div><div class="vig"></div>
        <div class="wrap"><div class="kicker" style="color:#8f86a8">Only</div>
        <div class="huge cold">8</div><div class="sub">${s.sub}</div></div>`,
  // 6 — the insight, text alone
  s => `<div class="glow g1" style="opacity:.3"></div><div class="grid"></div><div class="vig"></div>
        <div class="wrap"><div class="cap" style="font-size:96px">${s.cap}</div>
        <div class="sub">${s.sub}</div></div>`,
  // 7 — the offer
  s => `<div class="glow g1"></div><div class="glow g2"></div><div class="grid"></div><div class="vig"></div>
        <div class="wrap"><div class="rule"></div>
        <div class="cap" style="font-size:128px">${s.cap}</div>
        <div class="sub">${s.sub}</div></div>`,
  // 8 — brand card
  s => `<div class="glow g1"></div><div class="glow g2"></div><div class="grid"></div><div class="vig"></div>
        <div class="wrap"><div class="wordmark"><img src="file://${LOGO}"></div>
        <div class="sub" style="margin-top:56px">${s.sub}</div>
        <div class="url">kyntlo.ai/leak-test</div></div>`,
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: Math.round(W * SCALE), height: Math.round(H * SCALE) },
    deviceScaleFactor: 1,
  });
  for (let i = 0; i < SCENES.length; i++) {
    const html = `<!doctype html><html><head><meta charset="utf-8">
      <style>${css}</style></head><body>${SCENES[i](SCRIPT[i])}</body></html>`;
    const tmp = path.join(OUT, `_s${i + 1}.html`);
    fs.writeFileSync(tmp, html);
    await page.goto('file://' + tmp);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(160);
    const f = path.join(OUT, `s${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: f });
    fs.unlinkSync(tmp);
    console.log('  ' + path.basename(f) + '  ' + Math.round(fs.statSync(f).size / 1024) + ' KB');
  }
  await browser.close();
  console.log(SCENES.length + ' scenes rendered');
})();
