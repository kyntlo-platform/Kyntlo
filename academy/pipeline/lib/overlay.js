// Injected into every page the recorder opens. Draws the on-camera cursor,
// click ripples, spotlight highlights and lower-third titles. Kept free of
// page dependencies so it works on any site, including the Kyntlo app.
(() => {
  if (window.__ky) return;
  const PINK = '#f20089';
  const css = `
    #ky-layer{position:fixed;inset:0;pointer-events:none;z-index:2147483647;font-family:Inter,'Space Grotesk',system-ui,sans-serif}
    #ky-cursor{position:fixed;left:0;top:0;width:30px;height:30px;transform:translate(-4px,-3px);transition:opacity .2s;opacity:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))}
    .ky-ripple{position:fixed;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;border:3px solid ${PINK};background:rgba(242,0,137,.18);animation:ky-rip .6s ease-out forwards}
    @keyframes ky-rip{to{transform:scale(4.2);opacity:0}}
    .ky-spot{position:fixed;border-radius:12px;box-shadow:0 0 0 9999px rgba(12,6,22,.55),0 0 0 3px ${PINK},0 0 28px 6px rgba(242,0,137,.55);opacity:0;transition:opacity .35s ease,left .45s ease,top .45s ease,width .45s ease,height .45s ease}
    .ky-spot.on{opacity:1}
    .ky-label{position:fixed;background:${PINK};color:#fff;font-weight:700;font-size:22px;padding:10px 18px;border-radius:10px;white-space:nowrap;opacity:0;transform:translateY(6px);transition:all .35s ease;box-shadow:0 8px 24px rgba(0,0,0,.25)}
    .ky-label.on{opacity:1;transform:none}
    .ky-l3{position:fixed;left:56px;bottom:150px;display:flex;flex-direction:column;gap:6px;opacity:0;transform:translateX(-30px);transition:all .5s cubic-bezier(.2,.8,.2,1)}
    .ky-l3.on{opacity:1;transform:none}
    .ky-l3 b{align-self:flex-start;background:linear-gradient(90deg,${PINK},#6d00c1);color:#fff;font-size:34px;font-weight:800;padding:10px 22px;border-radius:12px}
    .ky-l3 span{align-self:flex-start;background:rgba(18,11,31,.88);color:#fff;font-size:22px;padding:8px 18px;border-radius:10px}
  `;
  const cursorSvg =
    '<svg viewBox="0 0 24 24" width="30" height="30"><path d="M4 2l15 11.2-6.6 1.1 3.9 7.4-3 1.5-3.9-7.5L4 20z" fill="#fff" stroke="#120b1f" stroke-width="1.4" stroke-linejoin="round"/></svg>';

  function mount() {
    if (document.getElementById('ky-layer') || !document.body) return;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    const layer = document.createElement('div');
    layer.id = 'ky-layer';
    layer.innerHTML = `<div id="ky-cursor">${cursorSvg}</div>`;
    document.body.appendChild(layer);
  }
  const layer = () => (mount(), document.getElementById('ky-layer'));

  window.addEventListener('mousemove', (e) => {
    const c = layer()?.querySelector('#ky-cursor');
    if (!c || window.__ky.hideCursor) return;
    window.__ky.pos = { x: e.clientX, y: e.clientY };
    c.style.left = e.clientX + 'px';
    c.style.top = e.clientY + 'px';
    c.style.opacity = '1';
  }, true);
  window.addEventListener('mousedown', (e) => {
    const r = document.createElement('div');
    r.className = 'ky-ripple';
    r.style.left = e.clientX + 'px';
    r.style.top = e.clientY + 'px';
    layer()?.appendChild(r);
    setTimeout(() => r.remove(), 700);
  }, true);

  const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2);
  const animate = (ms, step) => new Promise((done) => {
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      step(ease(p));
      p < 1 ? requestAnimationFrame(tick) : done();
    };
    requestAnimationFrame(tick);
  });
  // The nearest scrollable box under a point; apps often scroll an inner panel, not the window.
  function scroller(x, y) {
    for (let el = document.elementFromPoint(x, y); el; el = el.parentElement) {
      const st = getComputedStyle(el);
      if (/(auto|scroll)/.test(st.overflowY) && el.scrollHeight > el.clientHeight + 4) return el;
    }
    return document.scrollingElement;
  }

  window.__ky = {
    hideCursor: false,
    pos: { x: innerWidth * 0.55, y: innerHeight * 0.55 },
    glide(x, y, ms) {
      const c = layer().querySelector('#ky-cursor');
      const { x: sx, y: sy } = this.pos;
      this.pos = { x, y };
      c.style.opacity = '1';
      return animate(ms, (e) => {
        c.style.left = sx + (x - sx) * e + 'px';
        c.style.top = sy + (y - sy) * e + 'px';
      });
    },
    scroll(dy, ms) {
      const el = scroller(this.pos.x, this.pos.y);
      const from = el.scrollTop;
      return animate(ms, (e) => { el.scrollTop = from + dy * e; });
    },
    reveal(el, ms) {
      const r = el.getBoundingClientRect();
      if (r.top >= 60 && r.bottom <= innerHeight - 60) return;
      const box = scroller(r.left + r.width / 2, Math.min(Math.max(r.top, 1), innerHeight - 1));
      const target = r.top + r.height / 2 - innerHeight / 2;
      const from = box.scrollTop;
      return animate(ms, (e) => { box.scrollTop = from + target * e; });
    },
    spotlight(rect, label, ms) {
      const l = layer();
      const pad = 8;
      const spot = document.createElement('div');
      spot.className = 'ky-spot';
      Object.assign(spot.style, {
        left: rect.x - pad + 'px', top: rect.y - pad + 'px',
        width: rect.width + pad * 2 + 'px', height: rect.height + pad * 2 + 'px',
      });
      l.appendChild(spot);
      let tag;
      if (label) {
        tag = document.createElement('div');
        tag.className = 'ky-label';
        tag.textContent = label;
        const below = rect.y + rect.height + 70 < innerHeight;
        tag.style.left = Math.min(Math.max(rect.x, 24), innerWidth - 420) + 'px';
        tag.style.top = (below ? rect.y + rect.height + pad + 14 : rect.y - pad - 62) + 'px';
        l.appendChild(tag);
      }
      requestAnimationFrame(() => { spot.classList.add('on'); tag?.classList.add('on'); });
      setTimeout(() => {
        spot.classList.remove('on'); tag?.classList.remove('on');
        setTimeout(() => { spot.remove(); tag?.remove(); }, 400);
      }, ms);
    },
    lowerThird(title, sub, ms) {
      const el = document.createElement('div');
      el.className = 'ky-l3';
      el.innerHTML = `<b></b>${sub ? '<span></span>' : ''}`;
      el.querySelector('b').textContent = title;
      if (sub) el.querySelector('span').textContent = sub;
      layer().appendChild(el);
      requestAnimationFrame(() => el.classList.add('on'));
      setTimeout(() => { el.classList.remove('on'); setTimeout(() => el.remove(), 600); }, ms);
    },
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
