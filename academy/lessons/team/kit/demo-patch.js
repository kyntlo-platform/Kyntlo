// Kyntlo Team Academy: injected into every page the recorder opens, before the page's own
// scripts. It keeps on-screen text to the team's rules, styles the recorder's spotlight for
// the video's theme (window.__TEAM, set by kit/themes/sNN.js), adds each video's fictional
// demo data to the demo workspace, and exposes small live helpers (window.__team) that
// lessons call on camera: a message arriving, a booking landing, a task appearing.
(() => {
  const T = window.__TEAM || {};

  // ---- On-screen text rules: plain hyphens only, and reserved example.com addresses ----
  const fix = (s) => s.replace(/[–—]/g, '-').replace(/@mail\.com\b/g, '@example.com');
  const clean = (root) => {
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      const v = fix(n.nodeValue);
      if (v !== n.nodeValue) n.nodeValue = v;
    }
    if (root.querySelectorAll) {
      for (const el of root.querySelectorAll('input, textarea')) {
        const v = fix(el.value || '');
        if (v !== el.value) el.value = v;
        const p = el.getAttribute('placeholder');
        if (p && fix(p) !== p) el.setAttribute('placeholder', fix(p));
      }
    }
  };
  const watch = () => {
    clean(document.body);
    new MutationObserver((list) => {
      for (const m of list) {
        if (m.type === 'characterData') { const v = fix(m.target.nodeValue); if (v !== m.target.nodeValue) m.target.nodeValue = v; }
        for (const n of m.addedNodes) {
          if (n.nodeType === 3) { const v = fix(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; } else if (n.nodeType === 1) clean(n);
        }
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
    document.title = fix(document.title);
  };

  // ---- Look: theme the recorder's spotlight, labels and titles; hide the K monogram ----
  const accent = T.accent || '#f20089';
  const font = (family, file, extra = '') => `@font-face { font-family: '${family}'; src: url('/academy/lessons/team/kit/fonts/${file}'); ${extra} }`;
  const css = `
    ${font('Anton', 'Anton-Regular.ttf')} ${font('Space Grotesk', 'SpaceGrotesk.ttf', 'font-weight: 300 700;')}
    ${font('Archivo Black', 'ArchivoBlack-Regular.ttf')} ${font('Caveat', 'Caveat.ttf', 'font-weight: 400 700;')}
    ${font('Fredoka', 'Fredoka.ttf', 'font-weight: 300 700;')} ${font('Nunito', 'Nunito.ttf', 'font-weight: 200 1000;')} ${font('Bebas Neue', 'BebasNeue-Regular.ttf')}
    .sb-logo img { visibility: hidden !important; }
    #ky-layer .ky-spot { border-radius: ${T.radius ?? 12}px; box-shadow: 0 0 0 9999px ${T.dim || 'rgba(8,6,20,.62)'}, 0 0 0 3px ${accent}, 0 0 34px 8px ${accent}88 !important; }
    #ky-layer .ky-label { background: ${T.labelBg || accent}; color: ${T.labelInk || '#fff'}; box-shadow: 0 0 0 2px ${accent}, 0 10px 28px rgba(0,0,0,.3); font-family: ${T.labelFont || 'Inter'}, Inter, sans-serif; font-size: ${T.labelSize || 24}px; letter-spacing: ${T.labelTracking || '0'}; border-radius: ${T.radius ?? 10}px; }
    #ky-layer .ky-l3 b { background: ${T.titleBg || accent}; color: ${T.titleInk || '#fff'}; font-family: ${T.titleFont || 'Inter'}, Inter, sans-serif; letter-spacing: ${T.titleTracking || '0'}; }
    #ky-layer .ky-l3 span { font-family: Inter, sans-serif; }
    .team-new { animation: team-new 1.1s cubic-bezier(.2,.9,.2,1.2) both; }
    @keyframes team-new { from { opacity: 0; transform: translateY(18px) scale(.94); } to { opacity: 1; transform: none; } }
    .team-pulse { animation: team-pulse 1.4s ease-out 2; }
    @keyframes team-pulse { 0% { box-shadow: 0 0 0 0 ${accent}aa; } 100% { box-shadow: 0 0 0 22px ${accent}00; } }
    .team-gap { position: absolute; left: 4px; right: 4px; border-radius: 8px; border: 2px dashed #f04438; background: repeating-linear-gradient(135deg, #f0443822 0 10px, #f0443811 10px 20px);
      color: #b42318; font: 700 13px Inter, sans-serif; display: grid; place-items: center; opacity: 0; transform: scale(.9); transition: all .45s cubic-bezier(.2,.9,.2,1.2); z-index: 3; }
    .team-gap.on { opacity: 1; transform: none; }
    .team-chips { position: fixed; display: flex; gap: 10px; z-index: 2147483646; }
    .team-chips span { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 999px; background: #fff; color: #101828; font: 700 19px Inter, sans-serif;
      box-shadow: 0 10px 28px rgba(16,24,40,.28), 0 0 0 2px ${accent}; opacity: 0; transform: translateY(14px) scale(.8); transition: all .4s cubic-bezier(.2,.9,.2,1.3); }
    .team-chips span.on { opacity: 1; transform: none; }
    .team-chips i { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
  `;
  const style = () => {
    const s = document.createElement('style');
    s.id = 'team-style';
    s.textContent = css;
    document.head.appendChild(s);
  };

  // ---- Demo data for each video (all fictional) ----
  const day = (text) => ({ type: 'day', text });
  const contact = (id, name, source, tags = [], extra = {}) => ({
    id, name, email: `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`, phone: `+44 7700 900${id.replace(/\D/g, '').padStart(3, '0')}`,
    tags, source, created: '23 Oct 2026', last: 'Just now', owner: 'Sarah Mitchell', value: 0, ...extra,
  });
  const PATCH = {
    s01(data) {
      data.contacts.unshift(contact('c40', 'Ruby Collins', 'Text Message', ['new patient'], { owner: 'Priya Shah', value: 90 }));
      data.inbox.unshift({ id: 'v20', contact: 'c40', unread: 1, starred: false, assigned: 'Priya Shah', time: '21:04', messages: [
        day('Today'),
        { from: 'them', ch: 'sms', text: 'Hi! Do you have any check-up appointments this week?', time: '21:04' },
      ] });
    },
    s02(data) {
      data.contacts.unshift(contact('c41', 'Leo Fraser', 'Website Form', ['new patient', 'website lead'], { owner: 'James Okafor', value: 120 }));
      data.opportunities.unshift({ id: 'o41', name: 'Leo Fraser - New patient', contact: 'c41', pipeline: 'p1', stage: 0, value: 120, status: 'open', owner: 'James Okafor', source: 'Website Form', added: 'Today' });
      if (!data.tags.includes('website lead')) data.tags.push('website lead');
      // The visitor from the chat widget scene, now a contact with a live-chat thread.
      data.contacts.unshift(contact('c42', 'Hannah Price', 'Website Chat', ['new patient'], { owner: 'Priya Shah' }));
      data.inbox.unshift({ id: 'v22', contact: 'c42', unread: 1, starred: false, assigned: 'Priya Shah', time: '22:14', messages: [
        day('Saturday'),
        { from: 'them', ch: 'chat', text: 'Do you see new patients on Saturdays?', time: '22:13' },
        { from: 'ai', ch: 'chat', text: 'We do! Saturday mornings, 9 to 1. Shall I book you in?', time: '22:13' },
        { from: 'ai', ch: 'chat', text: 'Leave your mobile and we will text you a time.', time: '22:13' },
        { from: 'them', ch: 'chat', text: 'Yes please! 07700 900042', time: '22:14' },
      ] });
    },
    s03(data) {
      data.pipelines.push({ id: 'p4', name: 'Treatment Quotes', stages: ['New', 'Contacted', 'Quote Sent', 'Won'], funnel: [true, true, true, true], pie: [true, true, true, true] });
      const people = [
        ['c50', 'Lily Morgan', 'Instagram', ['whitening', 'quote sent']], ['c51', 'Tom Becker', 'Google Ad', ['implants', 'quote sent']],
        ['c52', 'Amara Osei', 'Facebook Ad', ['invisalign']], ['c53', 'Ben Carter', 'Website Form', ['veneers']],
        ['c54', 'Nina Patel', 'Phone Call', ['check-up']], ['c55', 'Sam Rivera', 'Referral', ['whitening']],
        ['c56', 'Grace Kim', 'Google Business', ['implants']], ['c57', 'Owen Hughes', 'Referral', ['invisalign']],
      ];
      people.forEach(([id, name, source, tags]) => data.contacts.push(contact(id, name, source, tags)));
      const q = (id, c, name, stage, value, source, owner, extra = {}) => ({ id, contact: c, name, pipeline: 'p4', stage, value, status: 'open', owner, source, ...extra });
      data.opportunities.push(
        q('q4', 'c53', 'Ben Carter - Veneers quote', 0, 1800, 'Website Form', 'James Okafor', { added: '22 Oct', stageDays: 1 }),
        q('q5', 'c54', 'Nina Patel - Check-up', 0, 90, 'Phone Call', 'Priya Shah', { added: 'Today', stageDays: 0 }),
        q('q3', 'c52', 'Amara Osei - Invisalign quote', 1, 3800, 'Facebook Ad', 'Sarah Mitchell', { added: '20 Oct', stageDays: 2 }),
        q('q6', 'c55', 'Sam Rivera - Whitening quote', 1, 450, 'Referral', 'Priya Shah', { added: '19 Oct', stageDays: 3 }),
        q('q1', 'c50', 'Lily Morgan - Whitening quote', 2, 450, 'Instagram', 'Priya Shah', { added: '9 Oct', stageDays: 12 }),
        q('q2', 'c51', 'Tom Becker - Implant quote', 2, 2400, 'Google Ad', 'Sarah Mitchell', { added: '18 Oct', stageDays: 2 }),
        q('q7', 'c56', 'Grace Kim - Implant quote', 3, 2400, 'Google Business', 'Sarah Mitchell', { added: '6 Oct', status: 'won' }),
        q('q8', 'c57', 'Owen Hughes - Invisalign quote', 3, 3800, 'Referral', 'James Okafor', { added: '2 Oct', status: 'won' }),
      );
      const step = (id, kind, name, cfg) => ({ id, kind, name, cfg });
      data.automation.unshift({
        id: 'w20', name: 'Quote Follow-up', status: 'published', enrolled: 46, active: 7, trigger: 'Pipeline Stage Changed', updated: 'Today', created: '23 Oct 2026', folder: 'Sales',
        triggers: [{ type: 'Pipeline Stage Changed', name: 'Pipeline Stage Changed', filters: [{ field: 'In pipeline', value: 'Treatment Quotes' }, { field: 'Moved to stage', value: 'Quote Sent' }] }],
        steps: [
          step('s1', 'Wait', 'Wait 2 days', { type: 'Time Delay', amount: 2, unit: 'Days' }),
          step('s2', 'Send SMS', 'Friendly check-in', { message: 'Hi {{contact.first_name}}, just checking you got your quote from Bloom Dental. Any questions? Happy to help!' }),
          step('s3', 'Wait', 'Wait 1 day', { type: 'Time Delay', amount: 1, unit: 'Days' }),
          step('s4', 'Add Task', 'Call about the quote', { title: 'Call {{contact.name}} about their quote', assign: 'Assigned User', due: 0 }),
        ],
        settings: { reentry: false, stop: true, window: false, tz: 'Account time zone (Europe/London)' },
      });
    },
    s04(data) {
      data.contacts.unshift(contact('c60', 'Zara Ahmed', 'Website Form', ['new patient'], { owner: 'Sarah Mitchell', value: 120 }));
      const step = (id, kind, name, cfg) => ({ id, kind, name, cfg });
      data.automation.unshift({
        id: 'w21', name: 'Booking Confirmation & Reminders', status: 'published', enrolled: 318, active: 24, trigger: 'Customer Booked Appointment', updated: 'Today', created: '23 Oct 2026', folder: 'Appointments',
        triggers: [{ type: 'Customer Booked Appointment', name: 'Customer Booked Appointment', filters: [{ field: 'In calendar', value: 'New Patient Consultation' }] }],
        steps: [
          step('s1', 'Send SMS', 'Booking confirmation', { message: 'Hi {{contact.first_name}}, you are booked in at Bloom Dental for {{appointment.start_time}}. See you then!' }),
          step('s2', 'Send Email', 'Confirmation email', { subject: 'Your visit to Bloom Dental is confirmed', message: '' }),
          step('s3', 'Wait', 'Wait until 24 hours before', { type: 'Event/Appointment Time', when: 'Before', amount: 24, unit: 'Hours' }),
          step('s4', 'Send SMS', 'Reminder: 24 hours', { message: 'Reminder: your Bloom Dental visit is tomorrow at {{appointment.start_time}}. Tap to confirm or reschedule.' }),
          step('s5', 'Wait', 'Wait until 1 hour before', { type: 'Event/Appointment Time', when: 'Before', amount: 1, unit: 'Hours' }),
          step('s6', 'Send SMS', 'Reminder: 1 hour', { message: 'See you in an hour, {{contact.first_name}}! 14 Marylebone High Street.' }),
        ],
      });
    },
    s05() {},
  };

  function patch(KY) {
    const data = KY.data;
    // Reserved example.com addresses for every fictional contact.
    data.contacts.forEach((c) => { c.email = fix(c.email); });
    if (data.me) data.me.email = fix(data.me.email);
    PATCH[T.video]?.(data);
  }

  // Run the patch after every screen has loaded its data, just before the first render.
  let ky;
  Object.defineProperty(window, 'KY', {
    configurable: true,
    get: () => ky,
    set(v) {
      ky = v;
      let start;
      Object.defineProperty(v, 'start', {
        configurable: true,
        get: () => () => { try { patch(v); } catch (e) { console.error('team patch', e); } start(); },
        set(fn) { start = fn; },
      });
    },
  });

  // ---- Live helpers for lessons ----
  const rerender = () => dispatchEvent(new HashChangeEvent('hashchange'));
  const flash = (sel, cls = 'team-new') => {
    const el = document.querySelector(sel);
    if (el) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
    return el;
  };
  window.__team = {
    rerender,
    // A message lands in an open conversation thread.
    message(thread, msg) {
      const v = ky.data.inbox.find((x) => x.id === thread);
      v.messages.push(msg);
      rerender();
      const box = document.querySelector('#cv_thread');
      if (box) box.scrollTop = box.scrollHeight;
      flash(`#cv_msg_${v.messages.length - 1}`);
    },
    // A booking appears in the calendar.
    booking(appt) {
      ky.data.calAppts.push(appt);
      rerender();
      flash(`#cal_appt_${appt.id}`);
      setTimeout(() => flash(`#cal_appt_${appt.id}`, 'team-pulse'), 900);
    },
    // Empty working hours, highlighted in red, one after another.
    gaps({ from = 9, to = 17, step = 1, delay = 160 } = {}) {
      const HH = 76;
      const min = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
      let k = 0;
      document.querySelectorAll('.kc-col').forEach((col, d) => {
        const taken = ky.data.calAppts.filter((a) => a.day === d && a.status !== 'cancelled').map((a) => [min(a.start), min(a.end)]);
        for (let h = from; h < to; h += step) {
          const a = h * 60, b = (h + step) * 60;
          if (taken.some(([s, e]) => s < b && e > a)) continue;
          const g = document.createElement('div');
          g.className = 'team-gap';
          g.style.top = ((a - 480) / 60) * HH + 2 + 'px';
          g.style.height = step * HH - 6 + 'px';
          g.textContent = 'Empty';
          col.appendChild(g);
          setTimeout(() => g.classList.add('on'), delay * k++);
        }
      });
    },
    clearGaps() { document.querySelectorAll('.team-gap').forEach((g) => { g.classList.remove('on'); setTimeout(() => g.remove(), 500); }); },
    // Channel chips popping in one by one beside an element.
    chips(anchor, items, { dx = 0, dy = -64, delay = 420 } = {}) {
      const r = document.querySelector(anchor).getBoundingClientRect();
      const box = document.createElement('div');
      box.className = 'team-chips';
      box.style.left = r.left + dx + 'px';
      box.style.top = r.top + dy + 'px';
      box.innerHTML = items.map(([label, color]) => `<span><i style="background:${color}"></i>${label}</span>`).join('');
      document.body.appendChild(box);
      [...box.children].forEach((c, i) => setTimeout(() => c.classList.add('on'), delay * i));
      return box;
    },
    clearChips() { document.querySelectorAll('.team-chips').forEach((b) => b.remove()); },
    // A new row slides in at the top of a table (e.g. a follow-up task).
    row(table, cells, id) {
      const body = document.querySelector(`${table} tbody`) || document.querySelector(table);
      const tr = document.createElement('tr');
      tr.id = id;
      tr.innerHTML = cells.map((c) => `<td>${c}</td>`).join('');
      body.insertBefore(tr, body.firstChild);
      flash(`#${id}`);
    },
    toast(msg) { ky.toast(msg); },
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { style(); watch(); });
  else { style(); watch(); }
})();
