/* Frame renderer for the v3 ads — five formats, five visual systems.

   Why not one renderer with one look: every v2 ad was the same phone mockup
   on the same dark gradient. That is monotonous, and per the Meta format
   taxonomy a fake-native UI is an F-tier device — the familiar interface
   stops everyone, so it qualifies nobody and teaches the algorithm nothing.
   None of the five looks here is a UI mockup.

     editorial  light-ground typographic VSL      (S-tier script-led)
     audit      dark data investigation           (A-tier, 62-clinic audit)
     stack      a tower of tools that collapses   (A-tier David & Goliath)
     objection  struck-through quote posters      (B-tier converter)
     timeline   a clock running against a lead    (B-tier infographic)
     brand      shared closing card

   All six compose inside the 720x1200 cross-platform safe band. Text carries
   the native white-fill/black-stroke treatment wherever it sits over a field
   rather than a flat panel: 85% of feed video is watched muted.

   Deterministic — no clocks, no randomness; setT(t) fully fixes the frame.

   NODE_PATH=/opt/node22/lib/node_modules node v3-scenes.js <adId> [specFile]
     -> frames/<adId>/f00000.png ...
*/
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const ROOT = __dirname;
const W = 1080, H = 1920, FPS = 30;
const BAND = { x: 180, y: 220, w: 720, h: 1200 };
const SPECFILE = process.argv[3] || 'v3-final.json';
const SPEC = JSON.parse(fs.readFileSync(path.join(ROOT, SPECFILE), 'utf8'));
const FONTS = path.join(ROOT, 'fonts');
const LOGO = path.join(ROOT, 'brand', 'kyntlo-logo-white.png');

const page_html = `<!doctype html><html><head><meta charset="utf-8"><style>
@import url("file://${FONTS}/brand.css");
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:'Inter',system-ui,sans-serif;color:#fff;background:#07050f}

/* ---------- grounds, one per look ---------- */
/* The grounds are baked as radial gradients rather than blurred circles.
   A 150px filter:blur re-rasterises on every repaint, which at 1080x1920 cost
   more per frame than everything else in the scene put together. */
#bg{position:absolute;inset:0;overflow:hidden}
#rule{position:absolute;inset:0;opacity:0}
#grain{position:absolute;inset:0;opacity:.05;
  background-image:radial-gradient(rgba(255,255,255,.7) 1px,transparent 1px);
  background-size:3px 3px}

body[data-look="editorial"]{background:#f5f1f8;color:#150c24}
body[data-look="editorial"] #bg{background-image:
  radial-gradient(640px 640px at 170px 210px,rgba(255,26,163,.26),transparent 72%),
  radial-gradient(580px 580px at 940px 1720px,rgba(109,0,193,.20),transparent 72%)}
body[data-look="editorial"] #grain{opacity:.04;
  background-image:radial-gradient(rgba(21,12,36,.5) 1px,transparent 1px)}

body[data-look="audit"]{background:#06040c}
body[data-look="audit"] #bg{background-image:
  radial-gradient(640px 640px at 170px 210px,rgba(109,0,193,.40),transparent 72%),
  radial-gradient(580px 580px at 940px 1720px,rgba(242,0,137,.28),transparent 72%)}
/* a faint ledger rule, because the ad is a count */
body[data-look="audit"] #rule{opacity:.5;
  background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px);
  background-size:100% 60px}

body[data-look="stack"]{background:#090514}
body[data-look="stack"] #bg{background-image:
  radial-gradient(660px 660px at 130px 470px,rgba(109,0,193,.48),transparent 72%),
  radial-gradient(580px 580px at 940px 1720px,rgba(242,0,137,.32),transparent 72%)}

body[data-look="objection"]{background:#160430}
body[data-look="objection"] #bg{background-image:
  radial-gradient(620px 620px at 230px 690px,rgba(242,0,137,.42),transparent 72%),
  radial-gradient(600px 600px at 940px 1720px,rgba(109,0,193,.58),transparent 72%)}

body[data-look="timeline"]{background:#06040c}
body[data-look="timeline"] #bg{background-image:
  radial-gradient(640px 640px at 170px 210px,rgba(109,0,193,.36),transparent 72%),
  radial-gradient(580px 580px at 940px 1720px,rgba(242,0,137,.24),transparent 72%)}
body[data-look="timeline"] #rule{opacity:.45;
  background-image:linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);
  background-size:72px 100%}

body[data-look="brand"]{background:#07050f}
body[data-look="brand"] #bg{background-image:
  radial-gradient(640px 640px at 170px 210px,rgba(109,0,193,.78),transparent 72%),
  radial-gradient(580px 580px at 940px 1720px,rgba(242,0,137,.72),transparent 72%)}

#band{position:absolute;left:${BAND.x}px;top:${BAND.y}px;
  width:${BAND.w}px;height:${BAND.h}px}
#canvas{position:absolute;inset:0}

/* native caption treatment, used where text sits over the field */
.nat{font-family:'Inter',system-ui,sans-serif;font-weight:800;
  letter-spacing:-.02em;line-height:1.12;color:#fff;
  paint-order:stroke fill;-webkit-text-stroke:9px #000;
  text-shadow:0 3px 14px rgba(0,0,0,.45)}
.nat em{font-style:normal;color:#ff3db1}

/* ---------- editorial: the script is the ad ---------- */
.ed{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center;padding:0 6px}
.ed .ln{font-family:'Space Grotesk',sans-serif;font-weight:700;white-space:nowrap;
  letter-spacing:-.035em;line-height:1.06;color:#150c24;opacity:0}
.ed .ln em{font-style:normal;color:#c20077}
.ed .sub{font-size:46px;line-height:1.3;color:#574a6b;margin-top:42px;
  font-weight:500;opacity:0}
.ed .sub em{font-style:normal;color:#c20077}
.ed .key{height:10px;background:linear-gradient(90deg,#f20089,#6d00c1);
  margin-top:34px;transform-origin:left center;transform:scaleX(0);
  border-radius:5px;width:58%}
.ed .mark{position:absolute;top:0;left:6px;font-family:'JetBrains Mono',monospace;
  font-size:24px;letter-spacing:.26em;color:#8a7aa6;text-transform:uppercase}
#prog{position:absolute;bottom:0;left:6px;right:6px;display:flex;gap:7px}
#prog i{flex:1;height:9px;border-radius:5px;background:rgba(21,12,36,.18)}
#prog i.on{background:#c20077}

/* ---------- audit: a count, shown as a count ---------- */
.au{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center}
.au .head{font-family:'JetBrains Mono',monospace;font-size:28px;
  letter-spacing:.24em;text-transform:uppercase;color:#ff3db1;
  padding-left:22px;border-left:5px solid #ff3db1;margin-bottom:34px;opacity:0}
.au .big{font-family:'Space Grotesk',sans-serif;font-weight:700;white-space:nowrap;
  letter-spacing:-.035em;line-height:1.07;opacity:0}
.au .big em{font-style:normal;color:#ff3db1}
.au .lab{font-family:'JetBrains Mono',monospace;font-size:27px;
  letter-spacing:.18em;text-transform:uppercase;color:#9b90b4;opacity:0}
.au .num{font-family:'Space Grotesk',sans-serif;font-weight:700;
  font-size:168px;letter-spacing:-.05em;line-height:1;color:#fff;opacity:0}
.au .num s{text-decoration:none;font-size:68px;color:#6f6490;
  letter-spacing:0;margin-left:10px}
.au .note{font-size:41px;line-height:1.28;color:#e4dcf2;font-weight:600;
  margin-top:26px;opacity:0}
/* the dot grid: 62 clinics, one cell each — part-of-whole, not a bar */
.grid{display:grid;grid-template-columns:repeat(9,58px);gap:14px;
  margin:34px 0 8px}
.grid b{width:58px;height:58px;border-radius:13px;display:block;
  background:#1b1430;box-shadow:inset 0 0 0 2px #2c2246}
.grid b.on{background:#ff1aa3;box-shadow:none}
.grid b.cool{background:#ece4f8;box-shadow:none}

/* ---------- stack: six tools, and the gaps between them ---------- */
.st{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center}
.st .cap{font-size:66px;margin-bottom:44px;text-align:left;white-space:nowrap}
.st .sub{font-size:46px;line-height:1.28;color:#d3c6ea;font-weight:600;
  margin-top:40px;opacity:0}
.tower{display:flex;flex-direction:column;gap:14px}
.chip{display:flex;align-items:center;gap:22px;height:112px;
  padding:0 24px;border-radius:20px;background:rgba(255,255,255,.07);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.13);opacity:0}
.chip i{width:62px;height:62px;border-radius:15px;flex:none;
  background:#241a3c;font-family:'JetBrains Mono',monospace;font-style:normal;
  font-size:23px;font-weight:700;color:#b7a6d6;
  display:flex;align-items:center;justify-content:center}
.chip span{font-size:37px;font-weight:600;letter-spacing:-.01em}
.gap{height:0;overflow:hidden;border-radius:9px;
  background:repeating-linear-gradient(135deg,rgba(242,0,137,.55) 0 10px,
    rgba(242,0,137,.12) 10px 20px);
  display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;font-size:23px;letter-spacing:.18em;
  text-transform:uppercase;color:#ffd4ec}
.one{height:248px;border-radius:28px;padding:34px 36px;
  background:linear-gradient(135deg,#f20089,#6d00c1);opacity:0;
  display:flex;flex-direction:column;justify-content:center;gap:14px}
.one b{font-family:'Space Grotesk',sans-serif;font-size:46px;font-weight:700;
  letter-spacing:.02em}
.one u{text-decoration:none;font-size:35px;line-height:1.32;color:#ffe3f4}

/* ---------- objection: the quote, struck through ---------- */
.ob{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:center}
.ob .tag{font-family:'JetBrains Mono',monospace;font-size:26px;
  letter-spacing:.26em;text-transform:uppercase;color:#ff5cbb;
  margin-bottom:30px;opacity:0}
.ob .qwrap{position:relative;display:block;margin-bottom:6px}
.ob .q{font-family:'Space Grotesk',sans-serif;font-weight:700;white-space:nowrap;
  letter-spacing:-.035em;line-height:1.07;color:#fff;opacity:0}
.ob .strike{position:absolute;left:-10px;top:50%;height:11px;width:104%;
  background:#ff1aa3;border-radius:6px;transform-origin:left center;
  transform:rotate(-2.2deg) scaleX(0);box-shadow:0 0 26px rgba(255,26,163,.6)}
.ob .awrap{margin-top:52px;padding-left:26px;border-left:6px solid #ff1aa3;
  opacity:0}
.ob .a{font-size:50px;line-height:1.3;font-weight:600;color:#f3ebff;
  white-space:nowrap}
.ob .a em{font-style:normal;color:#ff7cc8}

/* ---------- timeline: one lead, against the clock ---------- */
.tl{position:absolute;inset:0;display:flex;flex-direction:column}
.tl .cap{font-size:58px;margin-bottom:12px;white-space:nowrap}
.tl .sub{font-size:36px;line-height:1.3;color:#cdc2e2;font-weight:500;
  margin-top:14px;opacity:0}
.rail{position:relative;flex:1;margin-top:46px;padding-left:76px;
  display:flex;flex-direction:column;justify-content:space-between;
  padding-bottom:16px}
.rail.solo{justify-content:center;gap:52px}
.rail .track{position:absolute;left:25px;top:14px;bottom:60px;width:4px;
  background:#241a3c;border-radius:2px}
.rail .fill{position:absolute;left:25px;top:14px;width:4px;border-radius:2px;
  background:linear-gradient(180deg,#f20089,#6d00c1);height:0}
.row{display:flex;align-items:flex-start;gap:24px;position:relative;opacity:.16}
.row .dot{position:absolute;left:-63px;top:6px;width:28px;height:28px;
  border-radius:50%;background:#0b0718;box-shadow:inset 0 0 0 4px #3a2c5c}
.row.on{opacity:1}
.row.on .dot{background:#ff1aa3;box-shadow:0 0 0 7px rgba(255,26,163,.22)}
.row .tm{font-family:'JetBrains Mono',monospace;font-size:40px;color:#fff;
  width:140px;flex:none;letter-spacing:-.02em}
.row .tx{font-size:36px;line-height:1.26;color:#ded5ee;font-weight:500}
.badge{display:inline-flex;align-self:flex-start;align-items:baseline;gap:18px;
  padding:20px 28px;border-radius:20px;
  background:linear-gradient(135deg,#f20089,#6d00c1);opacity:0}
.badge b{font-family:'Space Grotesk',sans-serif;font-size:62px;font-weight:700;
  letter-spacing:-.03em}
.badge u{text-decoration:none;font-family:'JetBrains Mono',monospace;
  font-size:23px;letter-spacing:.18em;text-transform:uppercase;color:#ffdcf1}

/* ---------- shared closing card ---------- */
#brand{position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:34px}
#brand img{width:380px}
#brand .l{font-size:36px;color:#d7cfe6;text-align:center;line-height:1.35}
#brand .u{font-family:'JetBrains Mono',monospace;font-size:30px;color:#ff3db1}
</style></head><body data-look="editorial">
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

/* shrink type until it fits both ways — the copy is fixed, the size is not */
function lines(html) { return html.split(/<br\\s*\\/?>/i); }
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
  if (sc.mark) wrap.appendChild(el('div', 'mark', sc.mark));
  const size = sc.kind === 'open' ? 110 : sc.kind === 'big' ? 104 : 94;
  const ls = lines(sc.text).map(t => {
    const n = el('div', 'ln', t); wrap.appendChild(n); return n; });
  const key = el('div', 'key');
  const sub = sc.sub ? el('div', 'sub', sc.sub) : null;
  if (sc.kind === 'big' || sc.kind === 'offer') wrap.appendChild(key);
  if (sub) wrap.appendChild(sub);
  root.appendChild(wrap);

  const prog = el('div'); prog.id = 'prog';
  for (let i = 0; i < sc._n; i++) prog.appendChild(el('i', i <= sc._i ? 'on' : ''));
  root.appendChild(prog);

  fitGroup(ls, size, 46, 170);
  return { update(t) {
    ls.forEach((n, i) => {
      const k = ease((t - (0.05 + i * 0.13)) / 0.2);
      n.style.opacity = k;
      n.style.transform = 'translateY(' + (30 * (1 - settle(k))) + 'px)';
    });
    key.style.transform = 'scaleX(' + ease((t - 0.42) / 0.26) + ')';
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
    const head = el('div', 'head', sc.head);
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
    // cells light in the same pass as the number, so the two agree on screen
    cells.forEach((b, i) => {
      b.className = i < v ? cls : '';
    });
    const nk = ease((t - 0.58) / 0.22);
    note.style.opacity = nk;
    note.style.transform = 'translateY(' + (16 * (1 - nk)) + 'px)';
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
        c.style.transform = 'translateY(' + (-44 * (1 - settle(k))) + 'px)';
        return;
      }
      c.style.opacity = 1;
      if (sc.kind === 'wobble') {
        // deterministic sway: the tower is top-heavy and says so
        const a = Math.sin(t * 6.2 + i * 0.8) * (0.5 + i * 0.26) *
          ease(t / 0.25);
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
  b.innerHTML = '<img src="file://${LOGO}"><div class="l">' + sc.line +
    '</div><div class="u">' + (sc.url || 'kyntlo.ai') + '</div>';
  root.appendChild(b);
  return { update(t) {
    const k = ease(t / 0.3);
    b.style.opacity = k;
    b.style.transform = 'scale(' + (0.965 + 0.035 * k) + ')';
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
  if (!ad || !SPEC[ad]) { console.error('usage: node v3-scenes.js <adId> [spec]'); process.exit(1); }
  const scenes = SPEC[ad].scenes;
  const out = path.join(ROOT, 'frames', ad);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const tmp = path.join(ROOT, 'frames', '_page-' + ad + '.html');
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
  console.log('  ' + ad + ': ' + n + ' frames (' + (n / FPS).toFixed(1) + 's)');
})();
