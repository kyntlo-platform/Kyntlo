/* Frame renderer for the v3 ads — seven looks, two themes.

   Why not one renderer with one look: every v2 ad was the same phone mockup
   on the same dark gradient. That is monotonous, and per the Meta format
   taxonomy a fake-native UI is an F-tier device — the familiar interface
   stops everyone, so it qualifies nobody and teaches the algorithm nothing.
   None of the looks here is a UI mockup.

     editorial  typographic VSL                   (S-tier script-led)
     audit      a count, shown as a count         (A-tier investigation)
     bars       the four checks side by side      (recap inside the audit)
     clock      one working day, and the gap      (infographic beat)
     stack      a tower of tools that collapses   (A-tier David & Goliath)
     objection  struck-through quote posters      (B-tier converter)
     timeline   a clock running against one lead  (B-tier infographic)
     brand      the mark and three words

   Every colour comes from a token, so each look renders on a light or a dark
   ground from the same code — the set can be tested both ways instead of
   being committed to one.

   All of it composes inside the 720x1200 cross-platform safe band, and text
   carries the native fill/stroke caption treatment wherever it sits over a
   field rather than a flat panel: ~85% of feed video is watched muted.

   Deterministic — no clocks, no randomness; setT(t) fully fixes the frame.

   NODE_PATH=/opt/node22/lib/node_modules node v3-scenes.js <adId> [spec] [theme]
     -> frames/<adId>-<theme>/f00000.png ...
*/
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const ROOT = __dirname;
const W = 1080, H = 1920, FPS = 30;
const BAND = { x: 180, y: 220, w: 720, h: 1200 };
const SPECFILE = process.argv[3] || 'v3-final.json';
const THEME = process.argv[4] === 'light' ? 'light' : 'dark';
const SPEC = JSON.parse(fs.readFileSync(path.join(ROOT, SPECFILE), 'utf8'));
const FONTS = path.join(ROOT, 'fonts');
const LOGO = path.join(ROOT, 'brand',
  THEME === 'light' ? 'kyntlo-logo.png' : 'kyntlo-logo-white.png');

const page_html = `<!doctype html><html><head><meta charset="utf-8"><style>
@import url("file://${FONTS}/brand.css");
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:'Inter',system-ui,sans-serif;background:var(--ground);
  color:var(--ink)}

/* ---------------------------------------------------------------- tokens */
body{
  --accent:#ff1aa3; --accent2:#6d00c1; --cool:#ece4f8;
  --ink:#ffffff; --ink2:#ded5ee; --ink3:#9b90b4;
  --panel:rgba(255,255,255,.07); --ring:rgba(255,255,255,.13);
  --dim:#1b1430; --dimring:#2c2246;
  --capfill:#ffffff; --capstroke:#000000;
  --grain:rgba(255,255,255,.7); --grainop:.05;
  --rule:rgba(255,255,255,.045);
}
body[data-theme="light"]{
  --accent:#d1007f; --accent2:#5d00a6; --cool:#2a1b45;
  --ink:#150c24; --ink2:#3d3154; --ink3:#6f6388;
  --panel:rgba(21,12,36,.055); --ring:rgba(21,12,36,.17);
  --dim:#e3dbef; --dimring:#cec3e2;
  --capfill:#150c24; --capstroke:#ffffff;
  --grain:rgba(21,12,36,.5); --grainop:.04;
  --rule:rgba(21,12,36,.055);
}

/* grounds: baked as radial gradients, not blurred circles. A 150px
   filter:blur re-rasterises on every repaint and at 1080x1920 cost more per
   frame than everything else in the scene put together. */
#bg{position:absolute;inset:0;overflow:hidden;background-image:
  radial-gradient(640px 640px at 170px 210px,var(--g1),transparent 72%),
  radial-gradient(580px 580px at 940px 1720px,var(--g2),transparent 72%)}
#rule{position:absolute;inset:0;opacity:0}
#grain{position:absolute;inset:0;opacity:var(--grainop);
  background-image:radial-gradient(var(--grain) 1px,transparent 1px);
  background-size:3px 3px}

body[data-look="editorial"]{--ground:#f5f1f8;
  --g1:rgba(255,26,163,.26);--g2:rgba(109,0,193,.20)}
body[data-theme="dark"][data-look="editorial"]{--ground:#0a0616;
  --g1:rgba(255,26,163,.30);--g2:rgba(109,0,193,.40)}

body[data-look="audit"],body[data-look="bars"],body[data-look="clock"]{
  --ground:#06040c;--g1:rgba(109,0,193,.40);--g2:rgba(242,0,137,.28)}
body[data-theme="light"][data-look="audit"],
body[data-theme="light"][data-look="bars"],
body[data-theme="light"][data-look="clock"]{--ground:#f3eff8;
  --g1:rgba(109,0,193,.17);--g2:rgba(242,0,137,.15)}

body[data-look="stack"]{--ground:#090514;
  --g1:rgba(109,0,193,.48);--g2:rgba(242,0,137,.32)}
body[data-theme="light"][data-look="stack"]{--ground:#f4f0fa;
  --g1:rgba(109,0,193,.20);--g2:rgba(242,0,137,.16)}

body[data-look="objection"]{--ground:#160430;
  --g1:rgba(242,0,137,.42);--g2:rgba(109,0,193,.58)}
body[data-theme="light"][data-look="objection"]{--ground:#f6f0fd;
  --g1:rgba(242,0,137,.20);--g2:rgba(109,0,193,.22)}

body[data-look="timeline"]{--ground:#06040c;
  --g1:rgba(109,0,193,.36);--g2:rgba(242,0,137,.24)}
body[data-theme="light"][data-look="timeline"]{--ground:#f3eff8;
  --g1:rgba(109,0,193,.16);--g2:rgba(242,0,137,.14)}

body[data-look="brand"]{--ground:#07050f;
  --g1:rgba(109,0,193,.78);--g2:rgba(242,0,137,.72)}
body[data-theme="light"][data-look="brand"]{--ground:#f7f3fb;
  --g1:rgba(109,0,193,.26);--g2:rgba(242,0,137,.24)}

/* a faint ledger rule under the counts, a column rule under the clock */
body[data-look="audit"] #rule,body[data-look="bars"] #rule{opacity:1;
  background-image:linear-gradient(var(--rule) 1px,transparent 1px);
  background-size:100% 60px}
body[data-look="timeline"] #rule,body[data-look="clock"] #rule{opacity:1;
  background-image:linear-gradient(90deg,var(--rule) 1px,transparent 1px);
  background-size:72px 100%}

#band{position:absolute;left:${BAND.x}px;top:${BAND.y}px;
  width:${BAND.w}px;height:${BAND.h}px}
#canvas{position:absolute;inset:0}

/* native caption treatment, used where text sits over the field */
.nat{font-family:'Inter',system-ui,sans-serif;font-weight:800;
  letter-spacing:-.02em;line-height:1.12;color:var(--capfill);
  paint-order:stroke fill;-webkit-text-stroke:9px var(--capstroke);
  text-shadow:0 3px 14px rgba(0,0,0,.28)}
.nat em{font-style:normal;color:var(--accent)}
.mono{font-family:'JetBrains Mono',monospace;letter-spacing:.24em;
  text-transform:uppercase;color:var(--accent);font-size:26px;
  padding-left:20px;border-left:5px solid var(--accent)}

/* ------------------------------------------- editorial: the script is the ad */
.ed{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center;padding:0 6px}
.ed .ln{font-family:'Space Grotesk',sans-serif;font-weight:700;
  white-space:nowrap;letter-spacing:-.035em;line-height:1.06;
  color:var(--ink);opacity:0}
.ed .ln em{font-style:normal;color:var(--accent)}
.ed .sub{font-size:46px;line-height:1.3;color:var(--ink2);margin-top:42px;
  font-weight:500;opacity:0}
.ed .sub em{font-style:normal;color:var(--accent)}
.ed .key{height:10px;margin-top:34px;transform-origin:left center;
  transform:scaleX(0);border-radius:5px;width:58%;position:relative;
  overflow:hidden;background:linear-gradient(90deg,var(--accent),var(--accent2))}
.ed .key i{position:absolute;top:0;bottom:0;width:120px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent)}
#prog{position:absolute;bottom:0;left:6px;right:6px;display:flex;gap:7px}
#prog i{flex:1;height:9px;border-radius:5px;background:var(--ring)}
#prog i.on{background:var(--accent)}

/* ------------------------------------------- audit: a count, shown as a count */
.au{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center}
.au .head{margin-bottom:34px;opacity:0}
.au .big{font-family:'Space Grotesk',sans-serif;font-weight:700;
  white-space:nowrap;letter-spacing:-.035em;line-height:1.07;opacity:0;
  color:var(--ink)}
.au .big em{font-style:normal;color:var(--accent)}
.au .lab{font-family:'JetBrains Mono',monospace;font-size:27px;
  letter-spacing:.18em;text-transform:uppercase;color:var(--ink3);opacity:0}
.au .num{font-family:'Space Grotesk',sans-serif;font-weight:700;
  font-size:168px;letter-spacing:-.05em;line-height:1;color:var(--ink);opacity:0}
.au .num s{text-decoration:none;font-size:68px;color:var(--ink3);
  letter-spacing:0;margin-left:10px}
.au .note{font-size:41px;line-height:1.28;color:var(--ink2);font-weight:600;
  margin-top:26px;opacity:0}
.grid{display:grid;grid-template-columns:repeat(9,58px);gap:14px;
  margin:34px 0 8px}
.grid b{width:58px;height:58px;border-radius:13px;display:block;
  background:var(--dim);box-shadow:inset 0 0 0 2px var(--dimring)}
.grid b.on{background:var(--accent);box-shadow:none}
.grid b.cool{background:var(--cool);box-shadow:none}

/* ----------------------------------------------- bars: the four checks at once */
.br{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center}
.br .cap{font-size:58px;margin-bottom:16px;white-space:nowrap}
.br .head{margin:14px 0 42px;opacity:0}
.br .brow{margin-bottom:34px;opacity:0}
.br .rl{display:flex;justify-content:space-between;align-items:baseline;
  margin-bottom:11px}
.br .rl span{font-size:34px;font-weight:600;color:var(--ink2)}
.br .rl b{font-family:'Space Grotesk',sans-serif;font-size:40px;
  font-weight:700;letter-spacing:-.03em;color:var(--ink)}
.br .track{height:26px;border-radius:13px;background:var(--dim);
  box-shadow:inset 0 0 0 2px var(--dimring);overflow:hidden}
.br .fill{height:100%;width:0;border-radius:13px;background:var(--accent)}
.br .fill.cool{background:var(--cool)}
.br .foot{font-family:'JetBrains Mono',monospace;font-size:24px;
  letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);
  margin-top:6px;opacity:0}

/* ------------------------------------------- clock: one working day, one gap */
.ck{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center}
.ck .cap{font-size:58px;white-space:nowrap;margin-bottom:14px}
.ck .head{margin:16px 0 46px;opacity:0}
.ck .band{position:relative;height:168px;border-radius:22px;
  background:var(--dim);box-shadow:inset 0 0 0 2px var(--dimring);
  overflow:hidden}
.ck .open{position:absolute;top:0;bottom:0;left:0;width:0;
  background:linear-gradient(135deg,var(--accent),var(--accent2))}
.ck .shut{position:absolute;top:0;bottom:0;right:0;width:0;
  background:repeating-linear-gradient(135deg,rgba(242,0,137,.42) 0 12px,
    rgba(242,0,137,.07) 12px 24px)}
.ck .mark{position:absolute;top:-16px;bottom:-16px;width:5px;
  background:var(--ink);border-radius:3px;opacity:0;
  box-shadow:0 0 18px rgba(0,0,0,.45)}
.ck .ticks{display:flex;justify-content:space-between;margin-top:18px;
  font-family:'JetBrains Mono',monospace;font-size:27px;color:var(--ink3)}
.ck .legend{display:flex;gap:40px;margin-top:40px;opacity:0}
.ck .legend div{display:flex;align-items:center;gap:14px;font-size:34px;
  font-weight:600;color:var(--ink2)}
.ck .legend i{width:32px;height:32px;border-radius:9px;flex:none}
.ck .sub{font-size:42px;line-height:1.3;color:var(--ink2);font-weight:500;
  margin-top:34px;opacity:0}

/* ------------------------------- stack: six tools, and the gaps between them */
.st{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center}
.st .cap{font-size:66px;margin-bottom:44px;text-align:left;white-space:nowrap}
.st .sub{font-size:46px;line-height:1.28;color:var(--ink2);font-weight:600;
  margin-top:40px;opacity:0}
.tower{display:flex;flex-direction:column;gap:14px}
.chip{display:flex;align-items:center;gap:22px;height:112px;
  padding:0 24px;border-radius:20px;background:var(--panel);
  box-shadow:inset 0 0 0 1px var(--ring);opacity:0}
.chip i{width:62px;height:62px;border-radius:15px;flex:none;
  background:var(--dim);font-family:'JetBrains Mono',monospace;
  font-style:normal;font-size:23px;font-weight:700;color:var(--ink3);
  display:flex;align-items:center;justify-content:center}
.chip span{font-size:37px;font-weight:600;letter-spacing:-.01em;color:var(--ink)}
.gap{height:0;overflow:hidden;border-radius:9px;
  background:repeating-linear-gradient(135deg,rgba(242,0,137,.55) 0 10px,
    rgba(242,0,137,.12) 10px 20px);
  display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;font-size:23px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--capfill)}
.one{height:248px;border-radius:28px;padding:34px 36px;
  background:linear-gradient(135deg,#f20089,#6d00c1);opacity:0;color:#fff;
  display:flex;flex-direction:column;justify-content:center;gap:14px}
.one b{font-family:'Space Grotesk',sans-serif;font-size:46px;font-weight:700;
  letter-spacing:.02em}
.one u{text-decoration:none;font-size:35px;line-height:1.32;color:#ffe3f4}

/* --------------------------------------- objection: the quote, struck through */
.ob{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center}
.ob .tag{font-family:'JetBrains Mono',monospace;font-size:26px;
  letter-spacing:.26em;text-transform:uppercase;color:var(--accent);
  margin-bottom:30px;opacity:0}
.ob .qwrap{position:relative;display:block;margin-bottom:6px}
.ob .q{font-family:'Space Grotesk',sans-serif;font-weight:700;
  white-space:nowrap;letter-spacing:-.035em;line-height:1.07;color:var(--ink);
  opacity:0}
.ob .strike{position:absolute;left:-10px;top:50%;height:11px;width:104%;
  background:var(--accent);border-radius:6px;transform-origin:left center;
  transform:rotate(-2.2deg) scaleX(0);
  box-shadow:0 0 26px rgba(255,26,163,.5)}
.ob .awrap{margin-top:52px;padding-left:26px;border-left:6px solid var(--accent);
  opacity:0}
.ob .a{font-size:50px;line-height:1.3;font-weight:600;color:var(--ink2);
  white-space:nowrap}
.ob .a em{font-style:normal;color:var(--accent)}
.pips{display:flex;gap:9px;margin-top:34px}
.pips b{flex:1;height:26px;border-radius:7px;background:var(--dim);
  box-shadow:inset 0 0 0 2px var(--dimring)}
.pips b.on{background:var(--accent);box-shadow:none}
.pips+.pl{font-family:'JetBrains Mono',monospace;font-size:23px;
  letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);
  margin-top:14px}

/* ------------------------------------------ timeline: one lead, against a clock */
.tl{position:absolute;inset:0;display:flex;flex-direction:column}
.tl .cap{font-size:58px;margin-bottom:12px;white-space:nowrap}
.tl .sub{font-size:36px;line-height:1.3;color:var(--ink2);font-weight:500;
  margin-top:14px;opacity:0}
.rail{position:relative;flex:1;margin-top:46px;padding-left:76px;
  display:flex;flex-direction:column;justify-content:space-between;
  padding-bottom:16px}
.rail.solo{justify-content:center;gap:52px}
.rail .track{position:absolute;left:25px;top:14px;bottom:60px;width:4px;
  background:var(--dimring);border-radius:2px}
.rail .fill{position:absolute;left:25px;top:14px;width:4px;border-radius:2px;
  background:linear-gradient(180deg,var(--accent),var(--accent2));height:0}
.rail .row{display:flex;align-items:flex-start;gap:24px;position:relative;
  opacity:.16}
.rail .row .dot{position:absolute;left:-63px;top:6px;width:28px;height:28px;
  border-radius:50%;background:var(--ground);
  box-shadow:inset 0 0 0 4px var(--dimring)}
.rail .row.on{opacity:1}
.rail .row.on .dot{background:var(--accent);
  box-shadow:0 0 0 7px rgba(255,26,163,.22)}
.rail .row .tm{font-family:'JetBrains Mono',monospace;font-size:40px;
  color:var(--ink);
  width:140px;flex:none;letter-spacing:-.02em}
.rail .row .tx{font-size:36px;line-height:1.26;color:var(--ink2);font-weight:500}
.badge{display:inline-flex;align-self:flex-start;align-items:baseline;gap:18px;
  padding:20px 28px;border-radius:20px;color:#fff;
  background:linear-gradient(135deg,#f20089,#6d00c1);opacity:0}
.badge b{font-family:'Space Grotesk',sans-serif;font-size:62px;font-weight:700;
  letter-spacing:-.03em}
.badge u{text-decoration:none;font-family:'JetBrains Mono',monospace;
  font-size:23px;letter-spacing:.18em;text-transform:uppercase;color:#ffdcf1}

/* -------------------------------------------- brand: the mark and three words */
#brand{position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:52px}
#brand img{width:420px}
#brand .l{font-family:'Space Grotesk',sans-serif;font-weight:700;
  font-size:64px;letter-spacing:-.025em;color:var(--ink);white-space:nowrap}
</style></head><body data-look="editorial" data-theme="${THEME}">
<div id="bg"></div><div id="rule"></div>
<div id="grain"></div>
<div id="band"><div id="canvas"></div></div>
<script>
const el = (t, c, h) => { const e = document.createElement(t);
  if (c) e.className = c; if (h !== undefined) e.innerHTML = h; return e; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = x => 1 - Math.pow(1 - clamp(x, 0, 1), 3);
// settle: overshoots once then lands — reads as weight rather than a slide
const settle = x => { const k = clamp(x, 0, 1);
  return 1 - Math.pow(2, -9 * k) * Math.cos(5.2 * k); };

/* one size for the whole block: lines set at different sizes read as an
   accident rather than a hierarchy */
function fitGroup(nodes, start, min, maxH) {
  let s = start;
  for (; s > min; s -= 2) {
    nodes.forEach(n => { n.style.fontSize = s + 'px'; });
    if (nodes.every(n => n.scrollWidth <= n.clientWidth + 1 &&
                         n.offsetHeight <= maxH)) break;
  }
  nodes.forEach(n => { n.style.fontSize = s + 'px'; });
  return s;
}
function lines(html) { return html.split(/<br\\s*\\/?>/i); }

const TOOLS = [['BK', 'Booking tool'], ['WA', 'WhatsApp inbox'],
  ['EM', 'Email'], ['SH', 'Spreadsheet'], ['RM', 'Reminders'],
  ['IN', 'Invoices']];

const TROWS = [['19:41', 'Someone asks for an appointment'],
  ['19:41', 'Nobody is in the clinic'],
  ['23:00', 'They message two more clinics'],
  ['09:12', 'Reception opens, and replies']];

const LOOK = {

/* ------------------------------------------------------------- editorial */
editorial(sc, root) {
  const wrap = el('div', 'ed');
  const size = sc.kind === 'open' ? 110 : sc.kind === 'big' ? 104 : 94;
  const ls = lines(sc.text).map(t => {
    const n = el('div', 'ln', t); wrap.appendChild(n); return n; });
  const key = el('div', 'key', '<i></i>');
  const sub = sc.sub ? el('div', 'sub', sc.sub) : null;
  if (sc.kind === 'big' || sc.kind === 'offer') wrap.appendChild(key);
  if (sub) wrap.appendChild(sub);
  root.appendChild(wrap);

  const prog = el('div'); prog.id = 'prog';
  for (let i = 0; i < sc._n; i++) prog.appendChild(el('i', i <= sc._i ? 'on' : ''));
  root.appendChild(prog);

  fitGroup(ls, size, 46, 170);
  const shine = key.querySelector('i');
  return { update(t) {
    ls.forEach((n, i) => {
      const k = ease((t - (0.05 + i * 0.13)) / 0.2);
      n.style.opacity = k;
      n.style.transform = 'translateY(' + (30 * (1 - settle(k))) + 'px)';
    });
    const kk = ease((t - 0.42) / 0.26);
    key.style.transform = 'scaleX(' + kk + ')';
    // a highlight runs the rule once it is drawn, so the beat has a tail
    shine.style.left = (-140 + 900 * ease((t - 0.58) / 0.34)) + 'px';
    if (sub) {
      const k = ease((t - 0.46) / 0.22);
      sub.style.opacity = k;
      sub.style.transform = 'translateY(' + (18 * (1 - k)) + 'px)';
    }
  }};
},

/* ----------------------------------------------------------------- audit */
audit(sc, root) {
  const wrap = el('div', 'au');
  root.appendChild(wrap);

  if (sc.kind === 'intro') {
    const head = el('div', 'head mono', sc.head);
    const big = el('div', 'big', sc.text);
    wrap.appendChild(head); wrap.appendChild(big);
    fitGroup([big], 92, 46, 520);
    return { update(t) {
      const hk = ease(t / 0.18);
      head.style.opacity = hk;
      head.style.transform = 'translateX(' + (-20 * (1 - hk)) + 'px)';
      const bk = ease((t - 0.14) / 0.26);
      big.style.opacity = bk;
      big.style.transform = 'translateY(' + (26 * (1 - settle(bk))) + 'px)';
    }};
  }

  // tally: the count animates, and 62 cells say what the count is out of
  const num = el('div', 'num', '');
  const lab = el('div', 'lab', sc.label);
  const grid = el('div', 'grid');
  const cells = [];
  for (let i = 0; i < sc.of; i++) { const b = el('b'); grid.appendChild(b); cells.push(b); }
  const note = el('div', 'note', sc.note);
  wrap.appendChild(num); wrap.appendChild(lab);
  wrap.appendChild(grid); wrap.appendChild(note);
  const cls = sc.cold ? 'cool' : 'on';
  return { update(t) {
    // the counter is on screen from the first frame reading zero: an empty
    // grid with no number beside it just looks like a scene that failed
    const ck = ease((t - 0.04) / 0.46);
    num.style.opacity = ease(t / 0.07);
    const v = Math.round(sc.n * ck);
    num.innerHTML = v + '<s>/ ' + sc.of + '</s>';
    lab.style.opacity = ease(t / 0.09);
    cells.forEach((b, i) => {
      const on = i < v;
      b.className = on ? cls : '';
      // the three most recent cells stay a touch large: the count ripples
      // across the grid instead of appearing all at once
      const fresh = on ? clamp(1 - (v - 1 - i) / 3, 0, 1) : 0;
      b.style.transform = fresh ? 'scale(' + (1 + 0.16 * fresh) + ')' : '';
    });
    const nk = ease((t - 0.58) / 0.22);
    note.style.opacity = nk;
    note.style.transform = 'translateY(' + (16 * (1 - nk)) + 'px)';
  }};
},

/* ------------------------------------------------------------------ bars */
bars(sc, root) {
  const wrap = el('div', 'br');
  const cap = el('div', 'cap nat', sc.cap);
  const head = el('div', 'head mono', sc.mark);
  wrap.appendChild(cap); wrap.appendChild(head);
  // one measure, one hue: the bars are four counts of the same 62, so they
  // are not four series and get no legend. The calendar count keeps the
  // cool fill it carries in the tally scenes.
  const rows = sc.rows.map((r, i) => {
    const row = el('div', 'brow');
    row.appendChild(el('div', 'rl',
      '<span>' + r[0] + '</span><b>' + r[1] + '</b>'));
    const track = el('div', 'track');
    const fill = el('div', 'fill' + (i === sc.rows.length - 1 ? ' cool' : ''));
    track.appendChild(fill); row.appendChild(track);
    wrap.appendChild(row);
    return { row, fill, n: r[1] };
  });
  const foot = el('div', 'foot', 'out of ' + sc.of + ' clinics');
  wrap.appendChild(foot);
  root.appendChild(wrap);
  fitGroup([cap], 58, 34, 200);
  return { update(t) {
    head.style.opacity = ease(t / 0.16);
    rows.forEach((r, i) => {
      const k = ease((t - (0.12 + i * 0.13)) / 0.3);
      r.row.style.opacity = clamp(k * 1.4, 0, 1);
      r.fill.style.width = (100 * (r.n / sc.of) * k) + '%';
    });
    foot.style.opacity = ease((t - 0.74) / 0.18);
  }};
},

/* ----------------------------------------------------------------- clock */
clock(sc, root) {
  const wrap = el('div', 'ck');
  const cap = el('div', 'cap nat', sc.cap);
  const head = el('div', 'head mono', sc.mark);
  wrap.appendChild(cap); wrap.appendChild(head);

  // the strip runs 09:00 to 09:00, so the closed stretch is contiguous
  // instead of wrapping around midnight and reading as two gaps
  const band = el('div', 'band');
  const open = el('div', 'open');
  const shut = el('div', 'shut');
  const mark = el('div', 'mark');
  band.appendChild(open); band.appendChild(shut); band.appendChild(mark);
  wrap.appendChild(band);
  wrap.appendChild(el('div', 'ticks',
    '<span>09:00</span><span>15:00</span><span>21:00</span>' +
    '<span>03:00</span><span>09:00</span>'));
  const legend = el('div', 'legend',
    '<div><i style="background:linear-gradient(135deg,var(--accent),var(--accent2))"></i>' +
    'open · 10h</div><div><i style="background:repeating-linear-gradient(' +
    '135deg,rgba(242,0,137,.42) 0 7px,rgba(242,0,137,.07) 7px 14px)"></i>' +
    'closed · 14h</div>');
  wrap.appendChild(legend);
  const sub = sc.sub ? el('div', 'sub', sc.sub) : null;
  if (sub) wrap.appendChild(sub);
  root.appendChild(wrap);
  fitGroup([cap], 58, 34, 200);

  const OPEN = 10 / 24, SHUT = 14 / 24, AT = (19 + 41 / 60 - 9) / 24;
  return { update(t) {
    head.style.opacity = ease(t / 0.14);
    open.style.width = (100 * OPEN * ease(t / 0.24)) + '%';
    const sk = ease((t - 0.26) / 0.26);
    shut.style.width = (100 * SHUT * sk) + '%';
    // the hatch drifts while it grows, so the closed stretch reads as time
    // passing rather than as a static block
    shut.style.backgroundPosition = (t * 34) + 'px 0';
    const mk = ease((t - 0.52) / 0.2);
    mark.style.opacity = mk;
    mark.style.left = (100 * AT) + '%';
    mark.style.transform = 'scaleY(' + (0.3 + 0.7 * settle(mk)) + ')';
    legend.style.opacity = ease((t - 0.62) / 0.2);
    if (sub) sub.style.opacity = ease((t - 0.74) / 0.2);
  }};
},

/* ----------------------------------------------------------------- stack */
stack(sc, root) {
  const wrap = el('div', 'st');
  const cap = el('div', 'cap nat', sc.cap);
  const tower = el('div', 'tower');
  wrap.appendChild(cap); wrap.appendChild(tower);
  root.appendChild(wrap);

  const chips = [], gaps = [];
  TOOLS.forEach((tl, i) => {
    if (i && (sc.kind === 'gaps' || sc.kind === 'collapse')) {
      const g = el('div', 'gap', 'lead lost'); tower.appendChild(g); gaps.push(g);
    }
    const c = el('div', 'chip',
      '<i>' + tl[0] + '</i><span>' + tl[1] + '</span>');
    tower.appendChild(c); chips.push(c);
  });
  const one = el('div', 'one',
    '<b>KYNTLO</b><u>' + (sc.cap2 || 'One inbox. One calendar. One pipeline.') + '</u>');
  if (sc.kind === 'one') tower.appendChild(one);
  const sub = sc.sub ? el('div', 'sub', sc.sub) : null;
  if (sub) wrap.appendChild(sub);
  fitGroup([cap], 66, 36, 250);

  const upto = sc.upto || 6;
  return { update(t) {
    chips.forEach((c, i) => {
      if (sc.kind === 'one') {
        // the tower leaves; one block takes its place
        const k = ease((t - i * 0.03) / 0.2);
        c.style.opacity = (1 - k) * 0.5;
        c.style.transform = 'translateX(' + (-120 * k) + 'px) scale(' + (1 - 0.1 * k) + ')';
        return;
      }
      if (i >= upto) { c.style.opacity = 0; c.style.transform = 'scale(.9)'; return; }
      if (sc.kind === 'build') {
        const at = 0.08 + (i - (upto - 2)) * 0.22;
        const k = i < upto - 2 ? 1 : ease((t - Math.max(at, 0)) / 0.2);
        c.style.opacity = k;
        // the chips already standing breathe a little, so the tower is never
        // a still image while the next one drops in
        const idle = i < upto - 2 ? Math.sin(t * 3.4 + i * 1.1) * 1.4 : 0;
        c.style.transform = 'translateY(' + (-44 * (1 - settle(k)) + idle) + 'px)';
        return;
      }
      c.style.opacity = 1;
      if (sc.kind === 'wobble') {
        // deterministic sway: the tower is top-heavy and says so
        const a = Math.sin(t * 6.2 + i * 0.8) * (0.5 + i * 0.26) * ease(t / 0.25);
        c.style.transform = 'rotate(' + a.toFixed(3) + 'deg) translateX(' +
          (a * 2.4).toFixed(2) + 'px)';
      } else if (sc.kind === 'collapse') {
        const k = ease((t - 0.3 - i * 0.045) / 0.22);
        c.style.opacity = 1 - 0.94 * k;
        c.style.transform = 'translateX(' + ((i % 2 ? 1 : -1) * 150 * k) +
          'px) rotate(' + ((i % 2 ? 1 : -1) * 5 * k) + 'deg)';
      } else {
        c.style.transform = 'none';
      }
    });
    gaps.forEach((g, i) => {
      const k = ease((t - (0.16 + i * 0.1)) / 0.2);
      g.style.height = (38 * k) + 'px';
      g.style.opacity = k;
      g.style.backgroundPosition = (t * 26) + 'px 0';
    });
    if (sc.kind === 'one') {
      const k = ease((t - 0.2) / 0.3);
      one.style.opacity = k;
      one.style.transform = 'scale(' + (0.9 + 0.1 * settle(k)) + ')';
    }
    if (sub) {
      const k = ease((t - 0.52) / 0.24);
      sub.style.opacity = k;
      sub.style.transform = 'translateY(' + (18 * (1 - k)) + 'px)';
    }
  }};
},

/* ------------------------------------------------------------- objection */
objection(sc, root) {
  const wrap = el('div', 'ob');
  const tag = el('div', 'tag', 'objection ' + (sc._i + 1));
  wrap.appendChild(tag);
  // a single rule across a two-line quote lands between the lines and strikes
  // neither of them, so each line gets its own
  const qs = [], strikes = [];
  lines(sc.q).forEach(txt => {
    const qw = el('div', 'qwrap');
    const q = el('div', 'q', txt);
    const st = el('div', 'strike');
    qw.appendChild(q); qw.appendChild(st); wrap.appendChild(qw);
    qs.push(q); strikes.push(st);
  });
  const aw = el('div', 'awrap');
  const as = lines(sc.a).map(txt => {
    const n = el('div', 'a', txt); aw.appendChild(n); return n; });
  wrap.appendChild(aw);

  // "fourteen days" is a thing you can count, so it gets counted
  let pips = null, pl = null;
  if (sc.viz === 'days14') {
    pips = el('div', 'pips');
    for (let i = 0; i < 14; i++) pips.appendChild(el('b'));
    pl = el('div', 'pl', '14 days, nothing moved');
    wrap.appendChild(pips); wrap.appendChild(pl);
  }
  root.appendChild(wrap);
  fitGroup(qs, 96, 50, 480);
  fitGroup(as, 50, 30, 120);
  return { update(t) {
    tag.style.opacity = ease(t / 0.14);
    qs.forEach((q, i) => {
      const qk = ease((t - (0.06 + i * 0.08)) / 0.2);
      q.style.opacity = qk;
      q.style.transform = 'translateY(' + (22 * (1 - settle(qk))) + 'px)';
    });
    // the strike lands before the answer: dismissed, then met
    strikes.forEach((st, i) => {
      st.style.transform = 'rotate(-2.2deg) scaleX(' +
        ease((t - (0.34 + i * 0.07)) / 0.16) + ')';
    });
    const ak = ease((t - 0.56) / 0.24);
    aw.style.opacity = ak;
    aw.style.transform = 'translateY(' + (24 * (1 - ak)) + 'px)';
    if (pips) {
      const lit = Math.round(14 * ease((t - 0.62) / 0.3));
      [].forEach.call(pips.children, (b, i) => {
        b.className = i < lit ? 'on' : ''; });
      pips.style.opacity = ease((t - 0.6) / 0.14);
      pl.style.opacity = ease((t - 0.78) / 0.16);
    }
  }};
},

/* -------------------------------------------------------------- timeline */
timeline(sc, root) {
  const wrap = el('div', 'tl');
  const cap = el('div', 'cap nat', sc.cap);
  wrap.appendChild(cap);
  const sub = sc.sub ? el('div', 'sub', sc.sub) : null;
  if (sub) wrap.appendChild(sub);
  const rail = el('div', 'rail');
  rail.appendChild(el('div', 'track'));
  const fill = el('div', 'fill'); rail.appendChild(fill);

  const rows = [];
  const final = sc.at === 7;
  const src = final ? [['19:41', 'Kyntlo answers, checks the calendar, books']] : TROWS;
  src.forEach(r => {
    const n = el('div', 'row',
      '<div class="dot"></div><div class="tm">' + r[0] +
      '</div><div class="tx">' + r[1] + '</div>');
    rail.appendChild(n); rows.push(n);
  });
  const badge = el('div', 'badge', '<b></b><u>' +
    (final ? 'reply time' : 'before anyone replied') + '</u>');
  if (sc.at >= 5 || final) rail.appendChild(badge);
  if (final) rail.classList.add('solo');
  wrap.appendChild(rail);
  root.appendChild(wrap);
  fitGroup([cap], 58, 34, 220);

  // how far down the rail this beat has travelled — measured off the rows
  // themselves, so the fill always ends on a dot rather than near one
  const lit = final ? 1 : clamp(sc.at, 0, 4);
  const tops = rows.map(r => r.offsetTop + 20);
  return { update(t) {
    const k = ease(t / 0.4);
    if (sub) sub.style.opacity = ease((t - 0.3) / 0.25);
    const target = lit ? tops[lit - 1] : 0;
    fill.style.height = (target * k) + 'px';
    rows.forEach((n, i) => {
      const on = final || i < lit;
      if (on) n.classList.add('on'); else n.classList.remove('on');
      if (sc.at === 6) n.style.opacity = 1 - 0.62 * ease((t - 0.2) / 0.3);
      if (on && (final || i === lit - 1)) {
        const p = ease((t - 0.1) / 0.3);
        n.style.transform = 'translateX(' + (18 * (1 - settle(p))) + 'px)';
        const dot = n.querySelector('.dot');
        // the live dot keeps a pulse: the clock in this ad never stops
        dot.style.transform = 'scale(' + (1 + 0.1 * Math.sin(t * 7.6)) + ')';
      }
    });
    if (sc.at >= 5 || final) {
      const bk = ease((t - 0.24) / 0.34);
      badge.style.opacity = bk;
      badge.style.transform = 'scale(' + (0.88 + 0.12 * settle(bk)) + ')';
      // 13h31m counts up out of the rail: the number is the argument
      if (final) badge.querySelector('b').textContent = 'seconds';
      else {
        const mins = Math.round(811 * bk);
        badge.querySelector('b').textContent =
          Math.floor(mins / 60) + 'h ' + String(mins % 60).padStart(2, '0') + 'm';
      }
    }
  }};
},

/* ----------------------------------------------------------------- brand */
brand(sc, root) {
  const b = el('div'); b.id = 'brand';
  b.innerHTML = '<img src="file://${LOGO}"><div class="l">' + sc.line + '</div>';
  root.appendChild(b);
  const line = b.querySelector('.l');
  return { update(t) {
    const k = ease(t / 0.3);
    b.style.opacity = k;
    b.style.transform = 'scale(' + (0.965 + 0.035 * k) + ')';
    // the words arrive after the mark, not with it
    const lk = ease((t - 0.26) / 0.28);
    line.style.opacity = lk;
    line.style.letterSpacing = (0.12 - 0.145 * lk) + 'em';
  }};
},
};

let CUR = null;
window.mount = function (sc) {
  document.body.setAttribute('data-look', sc.look);
  const root = document.getElementById('canvas');
  root.innerHTML = '';
  CUR = LOOK[sc.look](sc, root);
  return true;
};
window.setT = function (t) { CUR.update(t); return true; };
</script></body></html>`;

(async () => {
  const ad = process.argv[2];
  if (!ad || !SPEC[ad]) { console.error('usage: node v3-scenes.js <adId> [spec] [theme]'); process.exit(1); }
  const scenes = SPEC[ad].scenes;
  const out = path.join(ROOT, 'frames', ad + '-' + THEME);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const tmp = path.join(ROOT, 'frames', '_page-' + ad + '-' + THEME + '.html');
  fs.writeFileSync(tmp, page_html);
  page.on('pageerror', e => { console.error('PAGE ERROR: ' + e.message); process.exit(1); });
  await page.goto('file://' + tmp);
  await page.evaluate(() => document.fonts.ready);

  let n = 0;
  for (let i = 0; i < scenes.length; i++) {
    const sc = Object.assign({}, scenes[i], { _i: i, _n: scenes.length });
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
  console.log('  ' + ad + '-' + THEME + ': ' + n + ' frames (' + (n / FPS).toFixed(1) + 's)');
})();
