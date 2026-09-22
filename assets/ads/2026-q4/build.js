/* Kyntlo paid-social creative build.
   Renders every ad asset to PNG (and MP4 for the motion posts) from HTML.
   Run:  NODE_PATH=/opt/node22/lib/node_modules node build.js
   Tokens come from tokens.json; a null token renders as a visible amber slot. */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'out');
const TMP = path.join(ROOT, 'html');
const FFMPEG = process.env.FFMPEG ||
  '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2';
for (const d of [OUT, TMP]) fs.mkdirSync(d, { recursive: true });

const TOK = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens.json'), 'utf8'));
function tk(name) {
  const v = TOK[name];
  if (v === null || v === undefined || v === '') {
    return `<span class="slot">${name}</span>`;
  }
  return `<span class="filled">${v}</span>`;
}

/* ---------------------------------------------------------------- shared */
const CSS = /* css */ `
@import url("../fonts/brand.css");
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:100%;height:100%;overflow:hidden}
body{
  --ground:#07050f; --raise:#0f0b1c; --raise2:#16112a;
  --pink:#f20089; --purple:#6d00c1; --hot:#ff1aa3;
  --ink:#f5f3fa; --dim:#b8b2cc; --muted:#8b85a3;
  --line:rgba(255,255,255,.12); --amber:#ffb340;
  --d:'Space Grotesk',sans-serif; --b:'Inter',sans-serif;
  --m:'JetBrains Mono',monospace; --ar:'IBM Plex Sans Arabic',sans-serif;
  font-family:var(--b); color:var(--ink); background:var(--ground);
  -webkit-font-smoothing:antialiased;
}
.frame{position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column}
.slot{font-family:var(--m);color:#111;background:var(--amber);padding:0 .22em;border-radius:.12em;font-weight:700;font-size:.92em}
.filled{font-variant-numeric:tabular-nums}
.mono{font-family:var(--m)}
.eyebrow{font-family:var(--m);font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--hot)}
.wordmark{font-family:var(--d);font-weight:700;letter-spacing:-.02em}
.aurora{position:absolute;border-radius:50%;filter:blur(140px);pointer-events:none}
`;

function page(css, body, opts = {}) {
  return `<!doctype html><html lang="${opts.lang || 'en'}"${opts.dir ? ` dir="${opts.dir}"` : ''}><head>
<meta charset="utf-8"><style>${CSS}${css}</style></head><body><div class="frame">${body}</div></body></html>`;
}

/* ------------------------------------------------------- asset registry */
const assets = [];
const add = (name, w, h, html) => assets.push({ name, w, h, html });

/* ============================================================ META  A
   The Tuesday Test — must read as a phone screenshot, not an ad.
   Light iOS mail aesthetic, red pen annotation, no logo, no brand colour. */
add('meta-a-tuesday-test', 1080, 1350, page(`
body{background:#e9e9ee;color:#000;font-family:-apple-system,'Inter',sans-serif}
.frame{padding:0}
.status{height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 46px;
  font-size:26px;font-weight:600;letter-spacing:-.01em;flex:none}
.status .dots{display:flex;gap:7px}
.status .dots i{display:block;width:11px;height:11px;border-radius:50%;background:#000;opacity:.85}
.navbar{padding:6px 40px 18px;border-bottom:1px solid #d3d3da;flex:none}
.navbar .back{font-size:28px;color:#0a7cff}
.navbar h1{font-size:33px;font-weight:700;letter-spacing:-.02em;margin-top:6px}
.list{position:relative;flex:1}
.msg{height:174px;padding:26px 40px 0;border-bottom:1px solid #d9d9e0;background:#fff;position:relative}
.msg .from{display:flex;justify-content:space-between;align-items:baseline;gap:20px;height:40px}
.msg .from b{font-size:29px;font-weight:700;letter-spacing:-.015em}
.msg .time{font-size:25px;color:#6a6a72;white-space:nowrap;font-variant-numeric:tabular-nums;position:relative}
.msg .subj{font-size:27px;margin-top:4px;font-weight:500}
.msg .prev{font-size:24px;color:#8a8a92;margin-top:6px;line-height:1.4;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.msg.unread::before{content:'';position:absolute;left:16px;top:44px;
  width:15px;height:15px;border-radius:50%;background:#0a7cff}
.msg .noreply{color:#e0182d;font-weight:600}
/* red-pen annotation, anchored to the timestamps themselves */
.time.mark{color:#000;font-weight:600}
.time.mark::after{content:'';position:absolute;left:-30px;right:-24px;top:-15px;bottom:-13px;
  border:6px solid #e0182d;border-radius:50%;transform:rotate(-2deg)}
.time.mark.b::after{transform:rotate(2deg)}
.arrow{position:absolute;right:76px;top:82px;width:120px;height:102px;z-index:9}
.gapnote{position:absolute;right:212px;top:96px;z-index:9;text-align:right;transform:rotate(-6deg)}
.gapnote .n{font-family:'Space Grotesk',sans-serif;font-size:70px;font-weight:700;color:#e0182d;line-height:.88}
.gapnote .l{font-family:'Space Grotesk',sans-serif;font-size:25px;font-weight:600;color:#e0182d;letter-spacing:.08em}
.caption{background:#fff;border-top:1px solid #c9c9d1;padding:28px 40px 32px;flex:none}
.caption p{font-size:26px;line-height:1.48;color:#3a3a42}
.caption p b{color:#000}
`, `
<div class="status"><span>9:41</span><span class="dots"><i></i><i></i><i></i></span></div>
<div class="navbar"><div class="back">‹ Mailboxes</div><h1>Enquiries sent — Tue 7 Oct</h1></div>

<div class="list">
  <div class="msg unread">
    <div class="from"><b>Al Barsha Interiors</b><span class="time mark">Tue 23:04</span></div>
    <div class="subj">Website enquiry — villa fit-out, Jumeirah</div>
    <div class="prev">Thank you for contacting us. A member of our team will be in touch with you shortly.</div>
  </div>
  <div class="msg">
    <div class="from"><b>Al Barsha Interiors</b><span class="time mark b">Thu 09:41</span></div>
    <div class="subj">Re: Website enquiry — villa fit-out, Jumeirah</div>
    <div class="prev">Good morning, apologies for the delay coming back to you. Could you share a little more about the project?</div>
  </div>
  <div class="msg">
    <div class="from"><b>Marina Design Studio</b><span class="time">Tue 23:07</span></div>
    <div class="subj">Website enquiry — villa fit-out, Jumeirah</div>
    <div class="prev"><span class="noreply">No reply.</span> Still running ads.</div>
  </div>
  <div class="msg">
    <div class="from"><b>JLT Fit-Out Contracting</b><span class="time">Tue 23:11</span></div>
    <div class="subj">Website enquiry — villa fit-out, Jumeirah</div>
    <div class="prev"><span class="noreply">No reply.</span> Still running ads.</div>
  </div>
  <div class="msg">
    <div class="from"><b>Jumeirah Joinery</b><span class="time">Tue 23:14</span></div>
    <div class="subj">Website enquiry — villa fit-out, Jumeirah</div>
    <div class="prev"><span class="noreply">No reply.</span> Still running ads.</div>
  </div>
  <div class="msg">
    <div class="from"><b>Business Bay Interiors</b><span class="time">Tue 23:18</span></div>
    <div class="subj">Website enquiry — villa fit-out, Jumeirah</div>
    <div class="prev">Thanks for your message — we will revert shortly.</div>
  </div>

  <svg class="arrow" viewBox="0 0 120 102" fill="none">
    <path d="M96 6 C 116 34, 114 68, 92 92" stroke="#e0182d" stroke-width="6" stroke-linecap="round"/>
    <path d="M92 92 l 3 -27 M92 92 l 26 -7" stroke="#e0182d" stroke-width="6" stroke-linecap="round"/>
  </svg>
  <div class="gapnote"><div class="n">34</div><div class="l">HOURS</div></div>
</div>

<div class="caption">
  <p><b>Four of these were running ads that night.</b> I submitted the same enquiry to ${tk('N_TIMED')} Dubai businesses on one Tuesday. ${tk('N_NEVER_REPLIED')} never replied at all.</p>
</div>
`));

/* ============================================================ META  B
   62 Clinics — evidential, brand-dark, the grid is the argument. */
function clinicGrid(lit, total, litColor) {
  let cells = '';
  for (let i = 0; i < total; i++) {
    cells += `<i class="${i < lit ? 'on' : 'off'}"></i>`;
  }
  return `<div class="grid" style="--on:${litColor}">${cells}</div>`;
}

add('meta-b-62-clinics', 1080, 1350, page(`
.frame{padding:76px 72px 64px;justify-content:space-between}
.aurora.p{width:760px;height:760px;background:var(--purple);opacity:.30;top:-260px;right:-280px}
.aurora.k{width:620px;height:620px;background:var(--pink);opacity:.17;bottom:-300px;left:-220px}
.top{position:relative;z-index:2}
.eyebrow{font-size:22px}
.ratio{display:flex;align-items:baseline;gap:18px;margin-top:34px}
.ratio .big{font-family:var(--d);font-size:214px;font-weight:700;letter-spacing:-.055em;line-height:.82;
  background:linear-gradient(135deg,#ff1aa3,#f20089 55%,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.ratio .of{font-family:var(--d);font-size:78px;font-weight:600;color:var(--muted);letter-spacing:-.03em}
.grid{display:grid;grid-template-columns:repeat(10,1fr);gap:13px;margin:52px 0 0;position:relative;z-index:2}
.grid i{display:block;aspect-ratio:1;border-radius:9px}
.grid i.on{background:var(--on);box-shadow:0 0 22px rgba(242,0,137,.45)}
.grid i.off{background:rgba(255,255,255,.075);border:1px solid rgba(255,255,255,.10)}
.bottom{position:relative;z-index:2}
.claim{font-family:var(--d);font-size:47px;font-weight:600;line-height:1.2;letter-spacing:-.022em;margin-top:52px}
.claim em{font-style:normal;color:var(--hot)}
.rule{height:1px;background:var(--line);margin:34px 0 22px}
.foot{display:flex;justify-content:space-between;align-items:center}
.foot .src{font-family:var(--m);font-size:19px;color:var(--muted);letter-spacing:.04em;line-height:1.5}
.foot .wordmark{font-size:38px}
`, `
<span class="aurora p"></span><span class="aurora k"></span>
<div class="top">
  <div class="eyebrow">UAE clinic booking audit · Sept 2026</div>
  <div class="ratio"><span class="big">35</span><span class="of">of 62</span></div>
  ${clinicGrid(35, 62, 'var(--pink)')}
</div>
<div class="bottom">
  <div class="claim">clinics whose “Book&nbsp;Now” opens <em>a form, not a calendar</em>.</div>
  <div class="rule"></div>
  <div class="foot">
    <div class="src">62 UAE clinics advertising on Instagram,<br>checked by hand. Source: Kyntlo.</div>
    <div class="wordmark">Kyntlo</div>
  </div>
</div>
`));

/* ============================================================ CAROUSEL
   The UAE Clinic Booking Audit — 6 frames.
   Every number here is already measured, so this set ships with no tokens. */
const carouselFrames = [
  { // 1 cover
    css: `
.frame{padding:86px 76px;justify-content:space-between}
.aurora.a{width:820px;height:820px;background:var(--purple);opacity:.32;top:-300px;left:-280px}
.aurora.b{width:560px;height:560px;background:var(--pink);opacity:.20;bottom:-220px;right:-200px}
.eyebrow{font-size:23px;position:relative;z-index:2}
h1{font-family:var(--d);font-size:104px;font-weight:700;line-height:1.0;letter-spacing:-.045em;position:relative;z-index:2}
h1 em{font-style:normal;background:linear-gradient(120deg,#ff1aa3,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.sub{font-size:34px;color:var(--dim);line-height:1.5;max-width:22ch;position:relative;z-index:2}
.swipe{display:flex;align-items:center;gap:16px;font-family:var(--m);font-size:22px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;position:relative;z-index:2}
.swipe .arrow{font-size:30px;color:var(--hot)}
`,
    body: `<span class="aurora a"></span><span class="aurora b"></span>
<div class="eyebrow">Kyntlo field audit · September 2026</div>
<div>
  <h1>We checked <em>62 UAE clinics</em> that advertise on Instagram.</h1>
  <p class="sub" style="margin-top:38px">Not one of them was short of leads. Here is what we found instead.</p>
</div>
<div class="swipe"><span>Swipe</span><span class="arrow">→</span></div>`
  },
  { n: 35, label: 'have a “Book Now” button that opens <em>a form</em>, not a calendar.',
    detail: 'Often with a free-text date field — so somebody on the team retypes every request by hand.' },
  { n: 18, label: 'have <em>no booking mechanism at all</em>.',
    detail: 'The button is a phone number. If nobody picks up, the enquiry simply does not exist.' },
  { n: 43, label: 'have a WhatsApp button and <em>no record</em> of the conversation.',
    detail: 'Not assigned, not logged, not followed up. For most of them this is the real funnel.' },
  { n: 8, label: 'have a real calendar — and <em>none</em> of them sits inside a system.',
    detail: 'No reminders, no no-show recovery, no recall. The booking is made and then forgotten.' },
  { // 6 CTA
    css: `
.frame{padding:86px 76px;justify-content:space-between;text-align:left}
.aurora.a{width:900px;height:900px;background:var(--pink);opacity:.20;top:-340px;right:-320px}
.aurora.b{width:640px;height:640px;background:var(--purple);opacity:.34;bottom:-260px;left:-240px}
.eyebrow{font-size:23px;position:relative;z-index:2}
h1{font-family:var(--d);font-size:92px;font-weight:700;line-height:1.05;letter-spacing:-.04em;position:relative;z-index:2}
.sub{font-size:33px;color:var(--dim);line-height:1.55;max-width:26ch;margin-top:34px;position:relative;z-index:2}
.cta{position:relative;z-index:2}
.btn{display:inline-flex;align-items:center;gap:16px;background:linear-gradient(120deg,#ff1aa3,#6d00c1);
  padding:30px 52px;border-radius:999px;font-family:var(--d);font-size:37px;font-weight:700;letter-spacing:-.01em}
.terms{font-family:var(--m);font-size:21px;color:var(--muted);margin-top:28px;letter-spacing:.05em}
.wordmark{font-size:40px;margin-top:44px;color:var(--ink)}
`,
    body: `<span class="aurora a"></span><span class="aurora b"></span>
<div class="eyebrow">Which one is your clinic?</div>
<div>
  <h1>We will tell you — free, in 24 hours.</h1>
  <p class="sub">Give us your website. We time your own enquiry form, check the booking path, and send you the timestamps. No call required.</p>
</div>
<div class="cta">
  <div class="btn">Get the free audit →</div>
  <div class="terms">Booking, reminders and recall in one place.</div>
  <div class="wordmark">Kyntlo</div>
</div>`
  }
];

carouselFrames.forEach((f, i) => {
  const idx = String(i + 1).padStart(2, '0');
  if (f.css) {
    add(`carousel-${idx}`, 1080, 1350, page(f.css, f.body));
    return;
  }
  add(`carousel-${idx}`, 1080, 1350, page(`
.frame{padding:82px 76px;justify-content:space-between}
.aurora.a{width:700px;height:700px;background:var(--purple);opacity:.28;top:-250px;right:-250px}
.eyebrow{font-size:22px;position:relative;z-index:2}
.stat{position:relative;z-index:2}
.stat .n{font-family:var(--d);font-size:258px;font-weight:700;line-height:.8;letter-spacing:-.06em;
  background:linear-gradient(135deg,#ff1aa3,#f20089 50%,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.stat .of{font-family:var(--d);font-size:60px;font-weight:600;color:var(--muted);letter-spacing:-.03em;margin-top:6px}
.grid{display:grid;grid-template-columns:repeat(10,1fr);gap:12px;margin-top:40px;position:relative;z-index:2}
.grid i{display:block;aspect-ratio:1;border-radius:8px}
.grid i.on{background:var(--pink);box-shadow:0 0 18px rgba(242,0,137,.4)}
.grid i.off{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.09)}
.claim{font-family:var(--d);font-size:52px;font-weight:600;line-height:1.18;letter-spacing:-.025em;position:relative;z-index:2}
.claim em{font-style:normal;color:var(--hot)}
.detail{font-size:30px;color:var(--dim);line-height:1.5;margin-top:24px;max-width:28ch;position:relative;z-index:2}
.pageno{font-family:var(--m);font-size:21px;color:var(--muted);letter-spacing:.14em;position:relative;z-index:2}
`, `
<span class="aurora a"></span>
<div class="eyebrow">62 UAE clinics · checked by hand</div>
<div class="stat"><div class="n">${f.n}</div><div class="of">of 62</div></div>
${clinicGrid(f.n, 62, 'var(--pink)')}
<div>
  <div class="claim">${f.label}</div>
  <div class="detail">${f.detail}</div>
</div>
<div class="pageno">${i + 1} / 6</div>
`));
});

/* ============================================================ LINKEDIN A
   The AED Number — 1200x627, one figure, method line at the foot. */
add('linkedin-a-aed-number', 1200, 627, page(`
.frame{padding:64px 72px;justify-content:space-between}
.aurora.a{width:620px;height:620px;background:var(--purple);opacity:.30;top:-240px;right:-180px}
.aurora.b{width:420px;height:420px;background:var(--pink);opacity:.15;bottom:-220px;left:-140px}
.eyebrow{font-size:18px;position:relative;z-index:2}
.big{font-family:var(--d);font-size:136px;font-weight:700;letter-spacing:-.05em;line-height:.92;position:relative;z-index:2;
  background:linear-gradient(120deg,#ff1aa3,#f20089 45%,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.cap{font-family:var(--d);font-size:40px;font-weight:600;color:var(--ink);letter-spacing:-.02em;margin-top:14px;position:relative;z-index:2}
.rule{height:1px;background:var(--line);margin:26px 0 20px;position:relative;z-index:2}
.foot{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;position:relative;z-index:2}
.method{font-family:var(--m);font-size:18px;color:var(--muted);line-height:1.6;letter-spacing:.02em;max-width:62ch}
.method b{color:var(--dim);font-weight:500}
.wordmark{font-size:31px;white-space:nowrap}
`, `
<span class="aurora a"></span><span class="aurora b"></span>
<div class="eyebrow">The number most owners can quote</div>
<div>
  <div class="big">AED 1,500–5,000</div>
  <div class="cap">What one missed consultation costs.</div>
</div>
<div>
  <div class="rule"></div>
  <div class="foot">
    <div class="method">The number most of them <b>cannot</b> quote: how long their own enquiry form takes to get a reply.<br>
    Median across ${tk('N_TIMED')} UAE businesses actively running ads, timed October 2026: <b>${tk('MEDIAN_HOURS')} hours</b>.</div>
    <div class="wordmark">Kyntlo</div>
  </div>
</div>
`));

/* ============================================================ SNAP A
   Open sign, closed inbox — graphic, not photographic. */
add('snap-a-closed-inbox', 1080, 1920, page(`
.frame{padding:120px 80px 110px;justify-content:space-between;align-items:center;text-align:center}
.aurora.a{width:900px;height:900px;background:var(--purple);opacity:.30;top:-260px;left:-300px}
.aurora.b{width:700px;height:700px;background:var(--pink);opacity:.14;bottom:-240px;right:-260px}
.eyebrow{font-size:23px;position:relative;z-index:2}
.scene{position:relative;z-index:2;width:100%;display:flex;justify-content:center}
.shop{position:relative;width:690px;height:800px;border-radius:26px;border:2px solid rgba(255,255,255,.14);
  background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.015));overflow:hidden}
.shop .awn{height:78px;background:repeating-linear-gradient(90deg,#1b1430 0 46px,#241a3f 46px 92px);border-bottom:2px solid rgba(255,255,255,.12)}
.sign{position:absolute;top:166px;left:50%;transform:translateX(-50%) rotate(-3deg);
  background:#0b0817;border:4px solid #e0182d;border-radius:14px;padding:20px 44px;
  font-family:var(--d);font-size:54px;font-weight:700;color:#e0182d;letter-spacing:.14em}
.phone{position:absolute;bottom:52px;left:50%;transform:translateX(-50%);width:300px;height:412px;
  border-radius:30px;border:3px solid rgba(255,255,255,.22);background:#0a0716;overflow:hidden;
  box-shadow:0 0 90px rgba(242,0,137,.55),0 0 160px rgba(242,0,137,.25)}
.phone .n{margin:17px 16px 0;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.14);
  border-radius:13px;padding:11px 13px;text-align:left}
.phone .n b{display:block;font-size:17px;font-weight:700;letter-spacing:-.01em}
.phone .n span{display:block;font-family:var(--m);font-size:14px;color:var(--muted);margin-top:3px}
.phone .n:nth-child(2){opacity:.72}.phone .n:nth-child(3){opacity:.46}.phone .n:nth-child(4){opacity:.24}
h1{font-family:var(--d);font-size:82px;font-weight:700;line-height:1.06;letter-spacing:-.04em;position:relative;z-index:2}
h1 em{font-style:normal;color:var(--hot)}
.sub{font-size:31px;color:var(--dim);line-height:1.5;margin-top:26px;max-width:24ch;position:relative;z-index:2}
.wordmark{font-size:36px;position:relative;z-index:2}
`, `
<span class="aurora a"></span><span class="aurora b"></span>
<div class="eyebrow">23:41 · Al Quoz</div>
<div class="scene">
  <div class="shop">
    <div class="awn"></div>
    <div class="sign">CLOSED</div>
    <div class="phone">
      <div class="n"><b>New enquiry</b><span>23:04 · villa fit-out</span></div>
      <div class="n"><b>New enquiry</b><span>23:19 · kitchen remodel</span></div>
      <div class="n"><b>Missed call</b><span>23:27 · +971 5•• ••• •••</span></div>
      <div class="n"><b>New enquiry</b><span>23:38 · office fit-out</span></div>
    </div>
  </div>
</div>
<div>
  <h1>Your ads never close.<br><em>Your inbox does.</em></h1>
  <p class="sub">We will time your own enquiry form and send you the numbers. Free, in 24 hours.</p>
</div>
<div class="wordmark">Kyntlo</div>
`));

/* ============================================================ SNAP B
   Arabic receipt — RTL, Plex Arabic, timestamps carry it. */
add('snap-b-arabic-receipt', 1080, 1920, page(`
.frame{padding:130px 84px 116px;justify-content:space-between;text-align:right;font-family:var(--ar)}
.aurora.a{width:860px;height:860px;background:var(--purple);opacity:.30;top:-280px;right:-280px}
.aurora.b{width:640px;height:640px;background:var(--pink);opacity:.15;bottom:-230px;left:-220px}
.eyebrow{font-size:24px;font-family:var(--ar);letter-spacing:.06em;position:relative;z-index:2}
.receipt{position:relative;z-index:2;border:1px solid var(--line);border-radius:26px;
  background:rgba(255,255,255,.05);padding:58px 56px;backdrop-filter:blur(8px)}
.row{display:flex;justify-content:space-between;align-items:baseline;gap:24px;padding:30px 0}
.row + .row{border-top:1px solid rgba(255,255,255,.09)}
.row .k{font-size:35px;color:var(--dim);font-family:var(--ar)}
.row .v{font-family:var(--m);font-size:56px;font-weight:700;color:var(--ink);font-variant-numeric:tabular-nums;direction:ltr}
.gap{margin-top:30px;text-align:center;border-top:1px dashed rgba(255,255,255,.22);padding-top:30px}
.gap .n{font-family:var(--d);font-size:134px;font-weight:700;line-height:.9;letter-spacing:-.04em;
  background:linear-gradient(120deg,#ff1aa3,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;direction:ltr}
.gap .l{font-size:29px;color:var(--dim);margin-top:12px;font-family:var(--ar)}
h1{font-family:var(--ar);font-size:80px;font-weight:700;line-height:1.28;letter-spacing:0;position:relative;z-index:2}
h1 em{font-style:normal;color:var(--hot)}
.sub{font-size:31px;color:var(--dim);line-height:1.7;margin-top:28px;position:relative;z-index:2;font-family:var(--ar)}
.wordmark{font-size:36px;position:relative;z-index:2;text-align:left;direction:ltr}
.warn{position:absolute;left:0;right:0;bottom:0;background:var(--amber);color:#150d00;
  font-family:var(--m);font-size:19px;font-weight:700;letter-spacing:.06em;padding:12px 20px;text-align:center;direction:ltr}
`, `
<span class="aurora a"></span><span class="aurora b"></span>
<div class="eyebrow">اختبار سرعة الرد · دبي</div>
<div class="receipt">
  <div class="row"><span class="k">وصل الاستفسار</span><span class="v">23:04</span></div>
  <div class="row"><span class="k">وصل الرد</span><span class="v">09:12</span></div>
  <div class="gap">
    <div class="n">10h 08m</div>
    <div class="l">الفجوة التي تدفع ثمنها مرتين</div>
  </div>
</div>
<div>
  <h1>إعلاناتك تعمل ٢٤ ساعة.<br><em>فريقك لا.</em></h1>
  <p class="sub">سنقيس سرعة الرد على نموذج التواصل في موقعك، ونرسل لك الأرقام. مجاناً، خلال ٢٤ ساعة.</p>
</div>
<div class="wordmark">Kyntlo</div>
<div class="warn">ARABIC COPY IS A DRAFT — NATIVE GULF-DIALECT REVIEW REQUIRED BEFORE THIS RUNS</div>
`, { lang: 'ar', dir: 'rtl' }));

/* ============================================================ GOOGLE BUSINESS
   GBP posts: square, high contrast, legible at thumbnail size. */
add('gbp-a-free-report', 1200, 1200, page(`
.frame{padding:96px 86px;justify-content:space-between}
.aurora.a{width:760px;height:760px;background:var(--purple);opacity:.32;top:-270px;right:-250px}
.eyebrow{font-size:23px;position:relative;z-index:2}
h1{font-family:var(--d);font-size:96px;font-weight:700;line-height:1.02;letter-spacing:-.042em;position:relative;z-index:2}
h1 em{font-style:normal;background:linear-gradient(120deg,#ff1aa3,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.sub{font-size:33px;color:var(--dim);line-height:1.5;margin-top:30px;max-width:24ch;position:relative;z-index:2}
.strip{display:flex;gap:14px;position:relative;z-index:2;margin-top:34px}
.chip{font-family:var(--m);font-size:20px;letter-spacing:.06em;padding:13px 20px;border-radius:999px;
  border:1px solid var(--line);background:rgba(255,255,255,.05);color:var(--dim)}
.foot{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:2}
.wordmark{font-size:38px}
.free{font-family:var(--d);font-size:31px;font-weight:700;color:var(--hot)}
`, `
<span class="aurora a"></span>
<div class="eyebrow">Free · 24-hour turnaround</div>
<div>
  <h1>How fast does <em>your own form</em> get answered?</h1>
  <p class="sub">Give us your website. We submit your enquiry form, time the reply, and send you the timestamps.</p>
  <div class="strip"><span class="chip">No call required</span><span class="chip">No signup</span></div>
</div>
<div class="foot"><div class="wordmark">Kyntlo</div><div class="free">Get the report →</div></div>
`));

add('gbp-b-leak-test', 1200, 1200, page(`
.frame{padding:96px 86px;justify-content:space-between}
.aurora.a{width:820px;height:820px;background:var(--pink);opacity:.17;bottom:-300px;left:-260px}
.aurora.b{width:600px;height:600px;background:var(--purple);opacity:.34;top:-220px;right:-200px}
.eyebrow{font-size:23px;position:relative;z-index:2}
.n{font-family:var(--d);font-size:230px;font-weight:700;line-height:.82;letter-spacing:-.06em;position:relative;z-index:2;
  background:linear-gradient(135deg,#ff1aa3,#f20089 50%,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
h1{font-family:var(--d);font-size:66px;font-weight:600;line-height:1.14;letter-spacing:-.03em;margin-top:8px;position:relative;z-index:2}
.sub{font-size:31px;color:var(--dim);line-height:1.55;margin-top:26px;max-width:26ch;position:relative;z-index:2}
.rule{height:1px;background:var(--line);margin:30px 0 22px;position:relative;z-index:2}
.foot{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:2}
.wordmark{font-size:38px}
.terms{font-family:var(--m);font-size:20px;color:var(--muted);letter-spacing:.05em;line-height:1.5}
`, `
<span class="aurora a"></span><span class="aurora b"></span>
<div class="eyebrow">The 14-day leak test</div>
<div>
  <div class="n">14</div>
  <h1>days. One leak. Fixed free.</h1>
  <p class="sub">On your existing numbers and channels, with the success metric agreed in writing before we start.</p>
</div>
<div>
  <div class="rule"></div>
  <div class="foot">
    <div class="terms">No migration. No new system<br>to learn first.</div>
    <div class="wordmark">Kyntlo</div>
  </div>
</div>
`));

/* ============================================================ YOUTUBE thumbs (16:9 in-feed) */
add('youtube-a-infeed', 1920, 1080, page(`
.frame{padding:88px 100px;justify-content:space-between}
.aurora.a{width:900px;height:900px;background:var(--purple);opacity:.28;top:-330px;right:-280px}
.eyebrow{font-size:24px;position:relative;z-index:2}
h1{font-family:var(--d);font-size:124px;font-weight:700;line-height:1.0;letter-spacing:-.045em;position:relative;z-index:2;max-width:17ch}
h1 em{font-style:normal;background:linear-gradient(120deg,#ff1aa3,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.foot{display:flex;justify-content:space-between;align-items:flex-end;position:relative;z-index:2}
.sub{font-size:32px;color:var(--dim);line-height:1.5;max-width:34ch}
.wordmark{font-size:42px}
`, `
<span class="aurora a"></span>
<div class="eyebrow">One Tuesday · ${tk('N_TIMED')} Dubai businesses · every reply timed</div>
<h1>I filled in <em>${tk('N_TIMED')} contact forms</em> in one afternoon.</h1>
<div class="foot">
  <p class="sub">${tk('N_NEVER_REPLIED')} of them never replied. Every one was paying for the click that sent me there.</p>
  <div class="wordmark">Kyntlo</div>
</div>
`));

add('youtube-b-infeed', 1920, 1080, page(`
.frame{padding:88px 100px;justify-content:space-between}
.aurora.a{width:820px;height:820px;background:var(--pink);opacity:.16;bottom:-300px;left:-240px}
.aurora.b{width:700px;height:700px;background:var(--purple);opacity:.30;top:-260px;right:-230px}
.eyebrow{font-size:24px;position:relative;z-index:2}
.row{display:flex;align-items:center;gap:70px;position:relative;z-index:2}
.n{font-family:var(--d);font-size:280px;font-weight:700;line-height:.8;letter-spacing:-.06em;white-space:nowrap;
  background:linear-gradient(135deg,#ff1aa3,#f20089 50%,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
h1{font-family:var(--d);font-size:62px;font-weight:600;line-height:1.16;letter-spacing:-.028em}
h1 em{font-style:normal;color:var(--hot)}
.grid{display:grid;grid-template-columns:repeat(21,1fr);gap:11px;position:relative;z-index:2}
.grid i{display:block;aspect-ratio:1;border-radius:6px}
.grid i.on{background:var(--pink);box-shadow:0 0 14px rgba(242,0,137,.4)}
.grid i.off{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.09)}
.foot{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:2}
.src{font-family:var(--m);font-size:21px;color:var(--muted);letter-spacing:.04em}
.wordmark{font-size:42px}
`, `
<span class="aurora a"></span><span class="aurora b"></span>
<div class="eyebrow">UAE clinic booking audit · Sept 2026</div>
<div class="row">
  <div class="n">35/62</div>
  <h1>clinics whose “Book Now”<br>opens <em>a form, not a calendar</em>.</h1>
</div>
${clinicGrid(35, 62, 'var(--pink)')}
<div class="foot"><div class="src">62 UAE clinics advertising on Instagram, checked by hand.</div><div class="wordmark">Kyntlo</div></div>
`));

/* ============================================================ MOTION POSTS
   Scene-based: each scene renders as a still, ffmpeg holds it for a set
   duration with hard cuts. Hard cuts every 0.5-2s is the native edit for
   these surfaces, so scene-based is the correct construction, not a
   shortcut around frame animation. */

const vertShell = (extra) => `
.frame{padding:150px 78px 540px;justify-content:center;align-items:center;text-align:center}
.aurora.a{width:900px;height:900px;background:var(--purple);opacity:.26;top:-300px;left:-300px}
.aurora.b{width:700px;height:700px;background:var(--pink);opacity:.13;bottom:-260px;right:-250px}
.cap{position:absolute;left:66px;right:66px;bottom:182px;z-index:6;font-family:var(--b);
  font-size:58px;font-weight:800;line-height:1.24;letter-spacing:-.02em;color:#fff;
  text-shadow:0 0 3px #000,3px 3px 0 #000,-3px 3px 0 #000,3px -3px 0 #000,-3px -3px 0 #000,0 5px 14px rgba(0,0,0,.7)}
.cap em{font-style:normal;color:#ffd84d}
.wordmark{position:absolute;left:0;right:0;bottom:92px;z-index:6;font-size:32px;color:rgba(255,255,255,.75);text-align:center}
${extra || ''}`;

// ---- TikTok A / YouTube A : the spreadsheet, founder register
const sheetRows = [
  ['Al Barsha Interiors', '23:04', null],
  ['Marina Design Studio', '23:07', null],
  ['JLT Fit-Out Contracting', '23:11', '09:41'],
  ['Jumeirah Joinery', '23:14', null],
  ['Business Bay Interiors', '23:18', '11:26'],
  ['Deira Fit-Out Co.', '23:22', null],
  ['Al Quoz Woodworks', '23:26', null],
  ['Palm Interiors LLC', '23:31', '14:02']
];
function sheet(highlightBlank) {
  return `<div class="sheet">
    <div class="sh"><span>COMPANY</span><span>SUBMITTED</span><span>REPLIED</span></div>
    ${sheetRows.map(([c, s, r]) => `<div class="sr${(!r && highlightBlank) ? ' hot' : ''}">
      <span class="c">${c}</span><span class="t">${s}</span><span class="t${r ? '' : ' blank'}">${r || '—'}</span></div>`).join('')}
  </div>`;
}
const sheetCSS = `
.sheet{position:relative;z-index:3;width:100%;border:1px solid var(--line);border-radius:20px;
  background:rgba(12,9,24,.86);overflow:hidden;font-family:var(--m)}
.sh,.sr{display:grid;grid-template-columns:1.55fr .8fr .8fr;gap:14px;padding:40px 30px;align-items:center;text-align:right}
.sh span:first-child,.sr .c{text-align:left}
.sh{background:rgba(255,255,255,.055);font-size:23px;font-weight:700;letter-spacing:.13em;color:var(--muted);border-bottom:1px solid var(--line)}
.sr{border-bottom:1px solid rgba(255,255,255,.055);font-size:32px}
.sr:last-child{border-bottom:0}
.sr .c{color:var(--ink);font-family:var(--b);font-weight:600;font-size:31px;letter-spacing:-.01em;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sr .t{color:var(--dim);font-variant-numeric:tabular-nums;text-align:right}
.sr .t.blank{color:var(--hot);font-weight:700}
.sr.hot{background:rgba(242,0,137,.13)}
`;

const ttA = [
  { d: 2.6, cap: `I filled in the contact form on ${tk('N_TIMED')} Dubai businesses that are running ads <em>right now</em>.`, body: sheet(false) },
  { d: 2.2, cap: `Not to sell them anything.`, body: sheet(false) },
  { d: 2.4, cap: `Column two is when I submitted.`, body: sheet(false) },
  { d: 2.4, cap: `Column three is when they replied.`, body: sheet(false) },
  { d: 3.0, cap: `<em>${tk('N_NEVER_REPLIED')}</em> of them are still blank.`, body: sheet(true) },
  { d: 2.8, cap: `Every one of them paid for the click that sent me there.`, body: sheet(true) },
  { d: 2.8, cap: `It isn't a slow team. It's 11pm, and Friday, and lunch.`, body: sheet(true) },
  { d: 3.2, cap: `I'll run the same test on yours. <em>Free.</em>`, body: `<div class="endcard"><div class="ec-n">24h</div><div class="ec-l">Your form, timed.<br>Timestamps sent back.</div><div class="ec-b">Get the free report →</div></div>` }
];

// ---- TikTok B / YouTube B : the 11pm lead, evidential register
const lockCSS = `
.lock{position:relative;z-index:3;width:660px;height:1080px;border-radius:52px;
  border:3px solid rgba(255,255,255,.18);background:linear-gradient(180deg,#120c24,#07050f);
  overflow:hidden;box-shadow:0 40px 120px rgba(0,0,0,.65)}
.lock .clock{text-align:center;padding-top:118px}
.lock .clock .t{font-family:var(--d);font-size:152px;font-weight:600;letter-spacing:-.04em;line-height:1;font-variant-numeric:tabular-nums}
.lock .clock .d{font-family:var(--b);font-size:30px;color:var(--dim);margin-top:12px}
.notif{margin:30px 26px 0;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.16);
  border-radius:24px;padding:24px 26px;text-align:left;backdrop-filter:blur(10px)}
.notif b{display:block;font-size:29px;font-weight:700;letter-spacing:-.015em}
.notif span{display:block;font-size:25px;color:var(--dim);margin-top:8px;line-height:1.35}
.notif .st{font-family:var(--m);font-size:20px;color:var(--muted);margin-top:10px;letter-spacing:.05em}
.notif.rival{border-color:rgba(255,26,163,.55);background:rgba(242,0,137,.16)}
.dim .lock{filter:brightness(.34)}
`;
const lock = (time, date, notifs = '') =>
  `<div class="lock"><div class="clock"><div class="t">${time}</div><div class="d">${date}</div></div>${notifs}</div>`;
const notif = (b, s, st, cls = '') => `<div class="notif ${cls}"><b>${b}</b><span>${s}</span><div class="st">${st}</div></div>`;

const ttB = [
  { d: 2.6, cap: `23:04 — the lead arrives.`, body: lock('23:04', 'Tuesday 7 October', notif('New enquiry', 'Villa fit-out — Jumeirah', 'kyntlo.ai · just now')) },
  { d: 2.2, cap: `The office is closed.`, body: `<div class="dim">${lock('23:04', 'Tuesday 7 October', notif('New enquiry', 'Villa fit-out — Jumeirah', 'kyntlo.ai · just now'))}</div>` },
  { d: 2.6, cap: `09:12 — somebody replies.`, body: lock('09:12', 'Wednesday 8 October', notif('Reply sent', 'Re: Villa fit-out — Jumeirah', 'Sent · 10h 08m later')) },
  { d: 2.6, cap: `<em>Ten hours</em> later.`, body: lock('09:12', 'Wednesday 8 October', notif('Reply sent', 'Re: Villa fit-out — Jumeirah', 'Sent · 10h 08m later')) },
  { d: 3.0, cap: `The same enquiry went to three other companies.`, body: lock('09:12', 'Wednesday 8 October', notif('Reply sent', 'Re: Villa fit-out — Jumeirah', 'Sent · 10h 08m later') + notif('Enquiry also sent to', '3 other companies', 'Standard for this category')) },
  { d: 3.2, cap: `One of them answered at <em>23:06</em>.`, body: lock('09:12', 'Wednesday 8 October', notif('Reply sent', 'Re: Villa fit-out — Jumeirah', 'Sent · 10h 08m later') + notif('Competitor replied', 'Re: Villa fit-out — Jumeirah', 'Sent · 23:06 · 2 minutes', 'rival')) },
  { d: 2.8, cap: `Your ads run at 11pm. <em>Your team doesn't.</em>`, body: '' },
  { d: 3.2, cap: `We close that gap in 14 days.`, body: `<div class="endcard"><div class="ec-n">14</div><div class="ec-l">days. One leak.<br>Fixed free.</div><div class="ec-b">Start with the free report →</div></div>` }
];

const endcardCSS = `
.endcard{position:relative;z-index:3;text-align:center}
.ec-n{font-family:var(--d);font-size:250px;font-weight:700;line-height:.82;letter-spacing:-.06em;
  background:linear-gradient(135deg,#ff1aa3,#f20089 50%,#a021d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.ec-l{font-family:var(--d);font-size:56px;font-weight:600;line-height:1.2;letter-spacing:-.028em;margin-top:22px}
.ec-b{display:inline-block;margin-top:44px;background:linear-gradient(120deg,#ff1aa3,#6d00c1);
  padding:26px 46px;border-radius:999px;font-family:var(--d);font-size:36px;font-weight:700}
`;

const videos = [
  { id: 'tiktok-a-spreadsheet', scenes: ttA, css: sheetCSS + endcardCSS },
  { id: 'tiktok-b-11pm-lead', scenes: ttB, css: lockCSS + endcardCSS }
];
// YouTube Shorts reuse the same two constructions — same hypothesis test,
// platform-native surface. Rendered separately so each can diverge later.
videos.push({ id: 'youtube-a-spreadsheet', scenes: ttA, css: sheetCSS + endcardCSS });
videos.push({ id: 'youtube-b-11pm-lead', scenes: ttB, css: lockCSS + endcardCSS });

const videoScenes = [];
for (const v of videos) {
  v.scenes.forEach((s, i) => {
    const nm = `${v.id}-s${String(i + 1).padStart(2, '0')}`;
    videoScenes.push({ video: v.id, name: nm, dur: s.d });
    add(nm, 1080, 1920, page(vertShell(v.css), `
<span class="aurora a"></span><span class="aurora b"></span>
${s.body}
<div class="cap">${s.cap}</div>
<div class="wordmark">Kyntlo</div>
`));
  });
}

/* ------------------------------------------------------------- rendering */
(async () => {
  for (const a of assets) {
    fs.writeFileSync(path.join(TMP, a.name + '.html'), a.html);
  }
  const browser = process.env.SKIP_RENDER ? null
    : await chromium.launch({ args: ['--font-render-hinting=none'] });
  let done = 0;
  const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null;
  for (const a of (browser ? (ONLY ? assets.filter(x => ONLY.includes(x.name)) : assets) : [])) {
    const pg = await browser.newPage({ viewport: { width: a.w, height: a.h }, deviceScaleFactor: 1 });
    await pg.goto('file://' + path.join(TMP, a.name + '.html'));
    await pg.evaluate(() => document.fonts.ready);
    await pg.waitForTimeout(160);
    await pg.screenshot({ path: path.join(OUT, a.name + '.png') });
    await pg.close();
    done++;
    if (done % 8 === 0) process.stdout.write(`  rendered ${done}/${assets.length}\n`);
  }
  if (browser) await browser.close();
  console.log(`rendered ${done} stills`);

  // ---- encode the motion posts
  for (const v of (process.env.SKIP_VIDEO ? [] : videos)) {
    const scenes = videoScenes.filter(s => s.video === v.id);
    const listFile = path.join(TMP, v.id + '.txt');
    let list = '';
    for (const s of scenes) {
      const p = path.join(OUT, s.name + '.png');
      list += `file '${p}'\nduration ${s.dur}\n`;
    }
    list += `file '${path.join(OUT, scenes[scenes.length - 1].name + '.png')}'\n`;
    fs.writeFileSync(listFile, list);
    const mp4 = path.join(OUT, v.id + '.mp4');
    execFileSync(FFMPEG, [
      '-y', '-f', 'concat', '-safe', '0', '-i', listFile,
      '-vf', 'fps=30,format=yuv420p,scale=1080:1920',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
      '-movflags', '+faststart', mp4
    ], { stdio: 'pipe' });
    const secs = scenes.reduce((t, s) => t + s.dur, 0);
    console.log(`encoded ${v.id}.mp4  (${scenes.length} scenes, ${secs.toFixed(1)}s)`);
  }

  // scene stills are intermediates — keep them out of the delivery folder
  fs.mkdirSync(path.join(OUT, 'scenes'), { recursive: true });
  for (const s of (process.env.SKIP_VIDEO ? [] : videoScenes)) {
    fs.renameSync(path.join(OUT, s.name + '.png'), path.join(OUT, 'scenes', s.name + '.png'));
  }
  console.log('done');
})();
