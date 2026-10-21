// Tiny deterministic animation kit. Scenes set window.DURATION, window.SFX, window.BED
// and define window.renderFrame(t). The renderer calls renderFrame for every frame.
window.K = (() => {
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const p = (t, start, dur) => clamp((t - start) / dur);
  const lerp = (a, b, x) => a + (b - a) * x;
  const out = (x) => 1 - Math.pow(1 - x, 3);
  const inOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const back = (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // pop an element in at `start` (and optionally out at `end`)
  function pop(el, t, start, { dur = 0.4, dy = 40, scale = 0.9, end = Infinity, outDur = 0.3 } = {}) {
    const a = p(t, start, dur);
    const b = 1 - p(t, end, outDur);
    const e = back(a);
    el.style.opacity = Math.min(clamp(a * 1.6), b);
    el.style.transform = `translateY(${(1 - e) * dy}px) scale(${lerp(scale, 1, e)})`;
    el.style.visibility = a > 0 && b > 0 ? 'visible' : 'hidden';
  }

  // deterministic pseudo-random
  function rand(seed) { const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

  function aurora(root, t, { a = 0.38 } = {}) {
    if (!root.children.length) {
      root.className = 'layer aurora';
      root.innerHTML = '<span></span><span></span><span></span>';
    }
    const s = root.children;
    const spec = [
      [-260, -200, 760, '#6d00c1', a],
      [520, 700, 680, '#f20089', a * 0.6],
      [80, 1350, 760, '#3a0d7a', a],
    ];
    spec.forEach(([x, y, size, c, o], i) => {
      const dx = Math.sin(t * 0.35 + i * 2) * 90, dy = Math.cos(t * 0.28 + i) * 70;
      Object.assign(s[i].style, { left: x + 'px', top: y + 'px', width: size + 'px', height: size + 'px', background: c, opacity: o, transform: `translate(${dx}px, ${dy}px)` });
    });
  }

  // Shared end card. words: array of [text, gradient?]
  function endCard(t, start, { words, sub, cta: keyword }) {
    let el = $('#end');
    if (!el) {
      el = document.createElement('div');
      el.id = 'end';
      el.innerHTML = `<div class="punch">${words.map(([w, g]) => (w === '|' ? '<br>' : `<span class="w${g ? ' g' : ''}">${w}</span>`)).join('')}</div>
        ${sub ? `<div class="sub">${sub}</div>` : ''}
        <img src="../../../assets/kyntlo-logo-cropped.png" alt="">
        <div class="tag">Own Tomorrow.</div>
        <div class="cta">Comment <b>${keyword}</b></div>`;
      $('#stage').appendChild(el);
    }
    el.style.opacity = p(t, start, 0.25);
    el.style.visibility = t >= start ? 'visible' : 'hidden';
    $$('.punch .w', el).forEach((w, i) => pop(w, t, start + 0.15 + i * 0.07, { dy: 60, scale: 0.7 }));
    const subEl = $('.sub', el); if (subEl) pop(subEl, t, start + 0.4 + words.length * 0.07, { dy: 20 });
    const base = start + 0.9 + words.length * 0.07;
    pop($('img', el), t, base, { dy: 0, scale: 0.6, dur: 0.6 });
    pop($('.tag', el), t, base + 0.35, { dy: 20 });
    const cta = $('.cta', el);
    pop(cta, t, base + 0.8, { dy: 50, scale: 0.6 });
    if (t > base + 1.3) cta.style.transform += ` scale(${1 + Math.sin((t - base) * 5) * 0.025})`;
    return base + 0.8; // time the CTA lands (for SFX)
  }

  return { clamp, p, lerp, out, inOut, back, $, $$, pop, rand, aurora, endCard };
})();
