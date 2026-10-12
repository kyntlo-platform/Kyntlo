/* Render scene stills for the four cold-feed ads.
   NODE_PATH=/opt/node22/lib/node_modules node ads-scenes.js [adId ...]
   -> ads/<adId>/s01..s08.png

   Type is sized to be read in well under a second, because at this cut rate
   that is all each frame gets. Scene ticks across the top give the viewer a
   sense of how long they are being asked to stay. */
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const ROOT = __dirname;
const W = 1080, H = 1920, SCALE = 1.1;
const SCRIPT = JSON.parse(fs.readFileSync(path.join(ROOT, 'script.json'), 'utf8'));
const FONTS = path.join(ROOT, 'fonts');
const LOGO = path.join(ROOT, 'brand', 'kyntlo-logo-white.png');

const ADS = process.argv.slice(2).length ? process.argv.slice(2)
  : ['ad-a-uae', 'ad-a-usa', 'ad-b-uae', 'ad-b-usa'];

const css = `
@import url("file://${FONTS}/brand.css");
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${Math.round(W*SCALE)}px;height:${Math.round(H*SCALE)}px;overflow:hidden}
body{background:#07050f;color:#fff;position:relative;
  font-family:'Inter',system-ui,sans-serif;display:flex;align-items:center;justify-content:center}
.glow{position:absolute;border-radius:50%;filter:blur(130px)}
.grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
  background-size:56px 56px}
.vig{position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 46%,transparent 40%,rgba(7,5,15,.86) 100%)}
.wrap{position:relative;z-index:3;width:100%;padding:0 92px;text-align:center}
/* scene ticks */
.ticks{position:absolute;top:104px;left:92px;right:92px;z-index:4;display:flex;gap:10px}
.ticks i{flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,.16)}
.ticks i.on{background:#f20089}
.cap{font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-.04em;
  line-height:1.0;font-size:150px}
.cap.sm{font-size:118px}
.sub{font-size:38px;line-height:1.4;color:#c3bbd4;margin-top:48px;font-weight:400}
.time{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:208px;
  letter-spacing:-.03em;color:#fff}
.grad{background:linear-gradient(170deg,#ff1aa3 0%,#f20089 45%,#6d00c1 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.wordmark img{height:146px;display:block;margin:0 auto}
.url{font-family:'JetBrains Mono',monospace;font-size:34px;color:#ff1aa3;
  margin-top:54px;letter-spacing:.04em}
.flag{position:absolute;bottom:96px;left:0;right:0;z-index:4;text-align:center;
  font-family:'JetBrains Mono',monospace;font-size:24px;letter-spacing:.3em;
  color:rgba(255,255,255,.3)}
`;

// Heat ramps 0..1 across the ad: cold and tense at the hook, full brand by the
// payoff. It is the cheapest way to make eight stills feel like one arc.
function bg(heat, busy) {
  const a = 0.18 + heat * 0.5, b = 0.12 + heat * 0.45;
  return `<div class="glow" style="width:${760 + heat*240}px;height:${760 + heat*240}px;
            background:#6d00c1;left:${busy ? -300 : -200}px;top:-220px;opacity:${a}"></div>
          <div class="glow" style="width:${680 + heat*260}px;height:${680 + heat*260}px;
            background:#f20089;right:-240px;bottom:-180px;opacity:${b}"></div>
          <div class="grid"></div><div class="vig"></div>`;
}

const ticks = (i, n) => `<div class="ticks">${
  Array.from({length: n}, (_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('')}</div>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: Math.round(W * SCALE), height: Math.round(H * SCALE) },
    deviceScaleFactor: 1,
  });
  for (const ad of ADS) {
    const scenes = SCRIPT[ad];
    if (!scenes) { console.log('skip ' + ad); continue; }
    const out = path.join(ROOT, 'ads', ad);
    fs.mkdirSync(out, { recursive: true });
    const busy = ad.includes('-b-');
    for (let i = 0; i < scenes.length; i++) {
      const s = scenes[i];
      const heat = i / (scenes.length - 1);
      let body;
      if (s.cap === '__LOGO__') {
        body = `${bg(1, busy)}${ticks(i, scenes.length)}
          <div class="wrap"><div class="wordmark"><img src="file://${LOGO}"></div>
          <div class="sub" style="margin-top:52px">${s.sub}</div>
          <div class="url">kyntlo.ai</div></div>`;
      } else if (/^\d{1,2}:\d{2}/.test(s.cap)) {
        body = `${bg(heat, busy)}${ticks(i, scenes.length)}
          <div class="wrap"><div class="time">${s.cap}</div>
          ${s.sub ? `<div class="sub">${s.sub}</div>` : ''}</div>`;
      } else {
        const long = s.cap.replace(/<br>/g, ' ').length > 26;
        const grad = i >= scenes.length - 3;   // brand colour arrives with the payoff
        body = `${bg(heat, busy)}${ticks(i, scenes.length)}
          <div class="wrap"><div class="cap${long ? ' sm' : ''}${grad ? ' grad' : ''}">${s.cap}</div>
          ${s.sub ? `<div class="sub">${s.sub}</div>` : ''}</div>`;
      }
      // no region marker burned in: it reads as a watermark in a live ad.
      // The preview contact sheet labels the variants instead.
      const tmp = path.join(out, `_s${i + 1}.html`);
      fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8">
        <style>${css}</style></head><body>${body}</body></html>`);
      await page.goto('file://' + tmp);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(140);
      await page.screenshot({ path: path.join(out, `s${String(i + 1).padStart(2, '0')}.png`) });
      fs.unlinkSync(tmp);
    }
    console.log('  ' + ad + ': ' + scenes.length + ' scenes');
  }
  await browser.close();
})();
