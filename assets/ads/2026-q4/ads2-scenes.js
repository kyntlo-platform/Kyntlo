/* Animated scene renderer for the v2 cold-feed ads.

   The v1 ads were eight stills with a slow zoom — a slideshow. Per the hook
   system, a hook is three components (visual action / spoken line / caption)
   and they must not duplicate each other; v1 had the caption restating the
   voiceover over a frame where nothing happened, so two thirds of every hook
   was wasted. Here the phone actually does something and the caption says
   something else.

   Layout obeys the cross-platform safe band: 720x1200 centred, y=220..1420.
   Captions use the native white-fill/black-stroke look rather than brand
   furniture, because 85% of feed video is watched muted and a caption that
   looks like an ad gets treated like one.

   Deterministic: no clocks, no randomness. setT(t) fully determines the frame.

   NODE_PATH=/opt/node22/lib/node_modules node ads2-scenes.js <adId>
     -> frames/<adId>/f00000.png ...
*/
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const ROOT = __dirname;
const W = 1080, H = 1920, FPS = 30;
const BAND = { x: 180, y: 220, w: 720, h: 1200 };   // safe band
const SPEC = JSON.parse(fs.readFileSync(path.join(ROOT, 'ads2.json'), 'utf8'));
const FONTS = path.join(ROOT, 'fonts');
const LOGO = path.join(ROOT, 'brand', 'kyntlo-logo-white.png');

const page_html = `<!doctype html><html><head><meta charset="utf-8"><style>
@import url("file://${FONTS}/brand.css");
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#07050f}
body{font-family:'Inter',system-ui,sans-serif;color:#fff}
#bg{position:absolute;inset:0}
#bg .glow{position:absolute;border-radius:50%;filter:blur(140px);opacity:.42}
#g1{width:820px;height:820px;background:#6d00c1;left:-240px;top:-200px}
#g2{width:720px;height:720px;background:#f20089;right:-220px;bottom:-160px}
#grain{position:absolute;inset:0;opacity:.05;
  background-image:radial-gradient(rgba(255,255,255,.7) 1px,transparent 1px);
  background-size:3px 3px}

/* everything load-bearing lives inside the band */
#band{position:absolute;left:${BAND.x}px;top:${BAND.y}px;
  width:${BAND.w}px;height:${BAND.h}px}

/* native caption look: white fill, black stroke, no pill */
#cap{position:absolute;left:0;right:0;top:0;text-align:center;
  font-family:'Inter',system-ui,sans-serif;font-weight:800;
  font-size:62px;line-height:1.1;letter-spacing:-.02em;
  color:#fff;paint-order:stroke fill;-webkit-text-stroke:9px #000;
  text-shadow:0 3px 14px rgba(0,0,0,.45)}
#cap .hl{color:#ff3db1}

/* phone */
#stage{position:absolute;left:0;right:0;bottom:0;height:884px;
  display:flex;align-items:flex-end;justify-content:center}
.phone{position:relative;width:556px;height:884px;border-radius:54px;
  background:#0d0a18;border:7px solid #241d38;overflow:hidden;
  box-shadow:0 36px 90px rgba(0,0,0,.65)}
.notch{position:absolute;top:14px;left:50%;transform:translateX(-50%);
  width:132px;height:30px;border-radius:16px;background:#241d38;z-index:9}
.screen{position:absolute;inset:0;padding:66px 22px 22px}
.statusbar{position:absolute;top:22px;left:30px;right:30px;display:flex;
  justify-content:space-between;font-family:'JetBrains Mono',monospace;
  font-size:19px;color:#9d93b5;z-index:8}

/* missed-call notifications */
.notif{display:flex;gap:15px;align-items:center;background:rgba(255,255,255,.1);
  border:1px solid rgba(255,255,255,.1);border-radius:22px;padding:17px 19px;
  margin-bottom:13px;backdrop-filter:blur(8px)}
.notif .ic{width:48px;height:48px;border-radius:50%;background:#ff3b30;
  display:flex;align-items:center;justify-content:center;font-size:25px;flex:none}
.notif .tx{flex:1;min-width:0}
.notif .t1{font-size:22px;font-weight:700;margin-bottom:3px}
.notif .t2{font-size:19px;color:#a79dbd}
.notif .tm{font-family:'JetBrains Mono',monospace;font-size:18px;color:#8c82a3}

/* chat */
.bub{max-width:80%;padding:16px 20px;border-radius:22px;margin-bottom:13px;
  font-size:22px;line-height:1.32;word-wrap:break-word}
.them{background:#241d38;border-bottom-left-radius:7px}
.us{background:linear-gradient(135deg,#f20089,#6d00c1);margin-left:auto;
  border-bottom-right-radius:7px}
.meta{font-family:'JetBrains Mono',monospace;font-size:17px;color:#8c82a3;
  margin:-7px 0 15px}
.meta.r{text-align:right}

/* arithmetic */
.calc{text-align:center;padding-top:74px}
.calc .row{font-family:'JetBrains Mono',monospace;font-size:34px;color:#b7adcb;
  margin-bottom:17px}
.calc .rule{height:3px;background:#3a2f55;margin:26px 44px}
.calc .tot{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:82px;
  letter-spacing:-.03em;white-space:nowrap;
  background:linear-gradient(170deg,#ff1aa3,#6d00c1);-webkit-background-clip:text;
  background-clip:text;color:transparent}
.calc .lab{font-size:23px;color:#8c82a3;margin-top:13px;letter-spacing:.14em;
  text-transform:uppercase;font-family:'JetBrains Mono',monospace}

/* reveal cards */
.card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.11);
  border-radius:22px;padding:22px 24px;margin-bottom:17px}
.card .n{font-family:'JetBrains Mono',monospace;font-size:19px;color:#ff3db1;
  letter-spacing:.2em;margin-bottom:9px}
.card .q{font-size:25px;font-weight:600;line-height:1.3}
.card .lock{font-size:44px;text-align:center;color:#4a4063;padding:9px 0}

/* calendar */
.cal{padding-top:26px}
.cal .hd{font-size:23px;color:#a79dbd;margin-bottom:19px;text-align:center;
  font-family:'JetBrains Mono',monospace}
.slot{border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:17px 20px;
  margin-bottom:12px;font-size:22px;display:flex;justify-content:space-between;
  align-items:center;color:#8c82a3}
.slot.on{background:linear-gradient(135deg,#f20089,#6d00c1);color:#fff;
  border-color:transparent;font-weight:600}
.slot .tag{font-family:'JetBrains Mono',monospace;font-size:18px}

/* brand card */
#brand{position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:34px}
#brand img{width:380px}
#brand .l{font-size:36px;color:#d7cfe6;text-align:center;line-height:1.35}
#brand .u{font-family:'JetBrains Mono',monospace;font-size:30px;color:#ff3db1}
</style></head><body>
<div id="bg"><div class="glow" id="g1"></div><div class="glow" id="g2"></div></div>
<div id="grain"></div>
<div id="band"><div id="cap"></div><div id="stage"></div></div>
<script>
const BANDH = ${BAND.h};
const el = (t, c, h) => { const e = document.createElement(t);
  if (c) e.className = c; if (h !== undefined) e.innerHTML = h; return e; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// ease so elements arrive rather than snap
const ease = x => 1 - Math.pow(1 - clamp(x, 0, 1), 3);

let SCENE = null;

function phone(inner) {
  const p = el('div', 'phone');
  p.appendChild(el('div', 'notch'));
  p.appendChild(el('div', 'statusbar',
    '<span>' + (SCENE.clock || '19:41') + '</span><span>' +
    (SCENE.carrier || '') + '</span>'));
  const s = el('div', 'screen');
  s.appendChild(inner);
  p.appendChild(s);
  return p;
}

/* each builder returns {node, update(t)} — t is 0..1 across the scene */
const BUILD = {
  missedcalls(sc) {
    const wrap = el('div');
    const items = sc.items.map(it => {
      const n = el('div', 'notif',
        '<div class="ic">\\u2715</div><div class="tx"><div class="t1">' +
        it.who + '</div><div class="t2">' + it.sub +
        '</div></div><div class="tm">' + it.at + '</div>');
      wrap.appendChild(n); return n;
    });
    return { node: phone(wrap), update(t) {
      items.forEach((n, i) => {
        // each notification drops in on its own beat
        const at = 0.1 + i * (0.72 / items.length);
        const k = ease((t - at) / 0.16);
        n.style.opacity = k;
        n.style.transform = 'translateY(' + (34 * (1 - k)) + 'px) scale(' +
          (0.94 + 0.06 * k) + ')';
      });
    }};
  },

  math(sc) {
    const wrap = el('div', 'calc');
    const rows = sc.rows.map(r => { const n = el('div', 'row', r);
      wrap.appendChild(n); return n; });
    const rule = el('div', 'rule'); wrap.appendChild(rule);
    const tot = el('div', 'tot', ''); wrap.appendChild(tot);
    const lab = el('div', 'lab', sc.label || ''); wrap.appendChild(lab);
    return { node: phone(wrap), update(t) {
      rows.forEach((n, i) => {
        const k = ease((t - (0.06 + i * 0.16)) / 0.14);
        n.style.opacity = k;
        n.style.transform = 'translateX(' + (-22 * (1 - k)) + 'px)';
      });
      const rk = ease((t - 0.44) / 0.1);
      rule.style.opacity = rk; rule.style.transform = 'scaleX(' + rk + ')';
      // the total counts up: the number earns itself on screen
      const ck = ease((t - 0.52) / 0.3);
      tot.style.opacity = ck > 0 ? 1 : 0;
      if (sc.totalText) {
        // no verified figure for this market: the viewer supplies it
        tot.textContent = ck > 0 ? sc.totalText : '';
        tot.style.fontSize = '76px';
      } else {
        const v = Math.round(sc.total * ck);
        tot.textContent = ck > 0 ? (sc.prefix || '') +
          v.toLocaleString('en-US') : '';
      }
      lab.style.opacity = ease((t - 0.8) / 0.12);
    }};
  },

  thread(sc) {
    const wrap = el('div');
    // real chat apps anchor to the bottom; floating at the top reads as a mockup
    wrap.style.cssText = 'display:flex;flex-direction:column;justify-content:flex-end;height:100%';
    const nodes = [];
    sc.msgs.forEach(m => {
      const b = el('div', 'bub ' + (m.side === 'us' ? 'us' : 'them'), m.text);
      wrap.appendChild(b); nodes.push(b);
      if (m.at) { const mt = el('div', 'meta' + (m.side === 'us' ? ' r' : ''), m.at);
        wrap.appendChild(mt); nodes.push(mt); }
    });
    return { node: phone(wrap), update(t) {
      const per = 0.84 / nodes.length;
      nodes.forEach((n, i) => {
        const k = ease((t - (0.08 + i * per)) / 0.13);
        n.style.opacity = k;
        n.style.transform = 'translateY(' + (20 * (1 - k)) + 'px)';
      });
    }};
  },

  cards(sc) {
    const wrap = el('div');
    wrap.style.paddingTop = '34px';
    const nodes = sc.items.map(it => {
      const c = el('div', 'card');
      c.appendChild(el('div', 'n', it.n));
      const q = el('div', 'q', it.q);
      const lk = el('div', 'lock', '\\u25A0 \\u25A0 \\u25A0 \\u25A0');
      c.appendChild(lk); c.appendChild(q);
      return { c, q, lk, node: (wrap.appendChild(c), c) };
    });
    return { node: phone(wrap), update(t) {
      nodes.forEach((o, i) => {
        const at = 0.08 + i * 0.26;
        const k = ease((t - at) / 0.14);
        o.c.style.opacity = clamp(0.25 + k, 0, 1);
        o.c.style.transform = 'translateY(' + (18 * (1 - k)) + 'px)';
        // locked -> revealed: the curiosity gap closing, one card at a time
        const r = ease((t - (at + 0.1)) / 0.12);
        o.lk.style.display = r > 0.5 ? 'none' : 'block';
        o.q.style.display = r > 0.5 ? 'block' : 'none';
        o.q.style.opacity = r;
      });
    }};
  },

  calendar(sc) {
    const wrap = el('div', 'cal');
    wrap.appendChild(el('div', 'hd', sc.head));
    const slots = sc.slots.map(s => { const n = el('div', 'slot',
      '<span>' + s.d + '</span><span class="tag">' + s.t + '</span>');
      wrap.appendChild(n); return n; });
    return { node: phone(wrap), update(t) {
      slots.forEach((n, i) => {
        const k = ease((t - (0.06 + i * 0.1)) / 0.12);
        n.style.opacity = k;
        if (i === sc.pick) {
          const p = ease((t - 0.62) / 0.18);
          if (p > 0.5) n.classList.add('on'); else n.classList.remove('on');
          n.style.transform = 'scale(' + (1 + 0.045 * Math.sin(Math.PI * clamp(p,0,1))) + ')';
        }
      });
    }};
  },

  brand(sc) {
    const wrap = el('div');
    const b = el('div');
    b.id = 'brand';
    b.innerHTML = '<img src="file://${LOGO}"><div class="l">' + sc.line +
      '</div><div class="u">' + (sc.url || 'kyntlo.ai') + '</div>';
    wrap.appendChild(b);
    return { node: b, update(t) {
      const k = ease(t / 0.3);
      b.style.opacity = k;
      b.style.transform = 'scale(' + (0.965 + 0.035 * k) + ')';
    }};
  },
};

let CUR = null;
window.mount = function (sc) {
  SCENE = sc;
  const cap = document.getElementById('cap');
  cap.innerHTML = sc.cap || '';
  // auto-size the caption down until it fits its slot in the band
  cap.style.fontSize = '62px';
  for (let s = 62; s > 26 && cap.offsetHeight > 290; s -= 2) cap.style.fontSize = s + 'px';
  const stage = document.getElementById('stage');
  stage.innerHTML = '';
  CUR = BUILD[sc.type](sc);
  if (sc.type === 'brand') {
    stage.style.height = BANDH + 'px';
    stage.style.alignItems = 'center';
  } else {
    stage.style.height = '884px';
    stage.style.alignItems = 'flex-end';
  }
  stage.appendChild(CUR.node);
  return true;
};
window.setT = function (t) { CUR.update(t); return true; };
</script></body></html>`;

(async () => {
  const ad = process.argv[2];
  if (!ad || !SPEC[ad]) { console.error('usage: node ads2-scenes.js <adId>'); process.exit(1); }
  const scenes = SPEC[ad].scenes;
  const out = path.join(ROOT, 'frames', ad);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const tmp = path.join(ROOT, 'frames', '_page-' + ad + '.html');
  fs.writeFileSync(tmp, page_html);
  await page.goto('file://' + tmp);
  await page.evaluate(() => document.fonts.ready);

  let n = 0;
  for (const sc of scenes) {
    await page.evaluate(s => window.mount(s), sc);
    await page.waitForTimeout(30);
    const frames = Math.round(sc.sec * FPS);
    for (let f = 0; f < frames; f++) {
      await page.evaluate(t => window.setT(t), f / Math.max(1, frames - 1));
      await page.screenshot({ path: path.join(out,
        'f' + String(n).padStart(5, '0') + '.png') });
      n++;
    }
  }
  fs.unlinkSync(tmp);
  await browser.close();
  console.log('  ' + ad + ': ' + n + ' frames (' + (n / FPS).toFixed(1) + 's)');
})();
