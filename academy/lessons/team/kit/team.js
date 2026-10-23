// Kyntlo Team Academy: shared runtime for the designed scene pages.
//   ?scene=<name>  shows <section data-scene="name"> (and runs SCENES[name] on play)
//   ?frame=1       shows the portrait frame used around app screens (section "frame")
// The recorder calls window.__kyPlay() when the scene starts on camera.
(() => {
  const q = new URLSearchParams(location.search);
  const name = q.get('frame') ? 'frame' : q.get('scene') || 'intro';
  const portrait = innerHeight > innerWidth;
  document.body.classList.toggle('portrait', portrait);
  document.body.classList.toggle('landscape', !portrait);
  const el = document.querySelector(`section[data-scene="${name}"]`);
  if (el) el.classList.add('on');
  else document.body.textContent = `Unknown scene: ${name}`;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  window.TEAM = {
    q,
    scene: name,
    portrait,
    root: el,
    wait,
    // Types text into an element, character by character.
    async type(target, text, cps = 22) {
      const t = typeof target === 'string' ? el.querySelector(target) : target;
      t.classList.add('caret');
      for (const ch of text) {
        t.textContent += ch;
        await wait(1000 / cps);
      }
      t.classList.remove('caret');
    },
    // Counts a number up (or down) inside an element.
    count(target, from, to, ms, fmt = (n) => Math.round(n).toLocaleString('en-GB')) {
      const t = typeof target === 'string' ? el.querySelector(target) : target;
      const t0 = performance.now();
      return new Promise((done) => {
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / ms);
          const e = 1 - (1 - p) ** 3;
          t.textContent = fmt(from + (to - from) * e);
          p < 1 ? requestAnimationFrame(tick) : done();
        };
        requestAnimationFrame(tick);
      });
    },
    // Adds a class after a delay (for step-by-step reveals driven from script).
    at(ms, target, cls = 'on') {
      setTimeout(() => (typeof target === 'string' ? el.querySelectorAll(target) : [target]).forEach((n) => n.classList.add(cls)), ms);
    },
  };
  window.SCENES = window.SCENES || {};
  window.__kyPlay = () => {
    document.body.classList.add('play');
    window.SCENES[name]?.(el, q);
  };
  // Pages opened outside the recorder (checking by hand) play straight away.
  if (q.get('autoplay')) setTimeout(() => window.__kyPlay(), 300);
})();
