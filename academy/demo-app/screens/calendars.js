// Calendars — Calendar View (week grid + appointment drawer + new appointment),
// Appointment List, and Calendar Settings (calendar list, create flow by type,
// calendar editor, connections for Google / Outlook sync, booking widget preview).
(() => {
  const { esc, icon, money, $, $$, avatar } = KY;
  const data = KY.data;
  const contact = (id) => data.contacts.find((c) => c.id === id);

  KY_ICONS.video2 = '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3z"/>';
  KY_ICONS.pin = '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>';
  KY_ICONS.repeat = '<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>';
  KY_ICONS.ban = '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>';
  KY_ICONS.sync = '<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>';
  KY_ICONS.outlook = '<rect x="2" y="5" width="12" height="14" rx="2"/><circle cx="8" cy="12" r="3"/><path d="M14 8h7v9h-7M14 9l3.5 3L21 9"/>';
  KY_ICONS.palette = '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="16" cy="10" r="1.2"/><path d="M12 21a3 3 0 0 1 0-6h2a3 3 0 0 0 3-3"/>';

  // ---------- Screen data ----------
  const TYPES = [
    { id: 'personal', label: 'Personal Booking', icon: 'user', desc: 'One-on-one meetings with one specific team member, like a consultation with your dentist.' },
    { id: 'roundrobin', label: 'Round Robin', icon: 'repeat', desc: 'Share bookings across your team. Each booking goes to whoever is free, by availability or priority.' },
    { id: 'class', label: 'Class Booking', icon: 'users', desc: 'One host, many attendees. Set a number of seats for group sessions such as an open evening.' },
    { id: 'collective', label: 'Collective Booking', icon: 'community', desc: 'A time is offered only when every selected team member is free, so all of them attend.' },
    { id: 'service', label: 'Service Menu', icon: 'list', desc: 'Clients pick a service from a menu first. Each service has its own duration and team.' },
    { id: 'event', label: 'Event Calendar', icon: 'calendar', desc: 'A simple calendar for events that are not tied to a team member, such as a room or equipment.' },
  ];
  const TYPE_LABEL = { Personal: 'Personal Booking', 'Round Robin': 'Round Robin', Service: 'Service Menu', Class: 'Class Booking', Collective: 'Collective Booking', Event: 'Event Calendar' };
  const base = (k) => ({ active: true, slug: k.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''), location: 'In person · 14 Marylebone High Street', interval: 15, before: 0, after: 10, notice: '4 hours', range: '60 days', maxDay: 0, form: 'Default form', pay: false, amount: 0, autoConfirm: true, layout: 'Neo', ...k });
  const cals = KY.data.calExtra = KY.data.calExtra || [
    ...data.calendars.map(base),
    base({ id: 'k5', name: 'Implant Consultation', type: 'Personal', duration: 45, team: ['Sarah Mitchell'], color: '#7a5af8', after: 15, notice: '24 hours', maxDay: 4 }),
    base({ id: 'k6', name: 'Invisalign Open Evening', type: 'Class', duration: 90, team: ['Sarah Mitchell'], color: '#06aed4', seats: 12 }),
    base({ id: 'k7', name: 'Smile Makeover Planning', type: 'Collective', duration: 60, team: ['Sarah Mitchell', 'Priya Shah'], color: '#f04438' }),
  ];
  cals.find((k) => k.id === 'k2').location = 'In person · Room 2 (iTero scanner)';
  const calOf = (id) => cals.find((k) => k.id === id);

  const appts = KY.data.calAppts = KY.data.calAppts || [
    ...data.appointments.map((a) => ({ ...a })),
    { id: 'x1', contact: 'c12', calendar: 'k3', day: 0, start: '10:00', end: '10:30', status: 'confirmed', with: 'James Okafor' },
    { id: 'x2', contact: 'c5', calendar: 'k2', day: 1, start: '09:30', end: '10:00', status: 'new', with: 'Sarah Mitchell' },
    { id: 'x3', contact: 'c8', calendar: 'k1', day: 2, start: '09:00', end: '09:45', status: 'confirmed', with: 'Priya Shah' },
    { id: 'x4', contact: 'c15', calendar: 'k6', day: 3, start: '16:30', end: '18:00', status: 'confirmed', with: 'Sarah Mitchell', seats: '7 / 12 seats' },
    { id: 'x5', contact: 'c14', calendar: 'k3', day: 2, start: '11:30', end: '12:00', status: 'cancelled', with: 'James Okafor' },
    { id: 'x6', contact: 'c16', calendar: 'k5', day: 0, start: '14:00', end: '14:45', status: 'showed', with: 'Sarah Mitchell' },
  ];
  const blocks = [];
  const STATUS = {
    confirmed: ['Confirmed', 'green'], new: ['Unconfirmed', 'amber'], showed: ['Showed', 'blue'],
    noshow: ['No-show', 'red'], cancelled: ['Cancelled', ''], invalid: ['Invalid', ''],
  };
  const statusChip = (s) => `<span class="chip ${STATUS[s][1]}">${STATUS[s][0]}</span>`;
  const DAYS = data.week.map((d) => d + ' Oct');
  const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const HH = 76;
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const fromMin = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
  const view$ = { hidden: new Set(), mode: 'Week' };

  function css() {
    if ($('#css-calendars')) return;
    const s = document.createElement('style');
    s.id = 'css-calendars';
    s.textContent = `
      body:has(#cal_ed_body) #toasts, body:has(#cal_conn_list) #toasts { pointer-events: none; }
      .kc-wrap { display: grid; grid-template-columns: minmax(0,1fr) 300px; gap: 20px; }
      .kc-grid { display: grid; grid-template-columns: 70px repeat(5, 1fr); }
      .kc-dayh { padding: 12px 10px; border-bottom: 1px solid var(--line-soft); border-left: 1px solid var(--line-soft); text-align: center; }
      .kc-dayh b { display: block; font-size: 22px; }
      .kc-dayh span { color: var(--muted); font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
      .kc-times div { height: ${HH}px; font-size: 13px; color: var(--faint); text-align: right; padding-right: 10px; transform: translateY(-9px); }
      .kc-col { position: relative; border-left: 1px solid var(--line-soft); background-image: linear-gradient(var(--line-soft) 1px, transparent 1px); background-size: 100% ${HH}px; }
      .kc-ev { position: absolute; left: 5px; right: 5px; border-radius: 7px; padding: 5px 9px; font-size: 13.5px; line-height: 1.3; overflow: hidden; cursor: pointer; border-left: 4px solid; transition: box-shadow .15s; }
      .kc-ev:hover { box-shadow: 0 4px 12px rgba(16,24,40,.18); z-index: 3; }
      .kc-ev b { display: block; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .kc-ev .t { opacity: .85; white-space: nowrap; }
      .kc-ev.cancelled { opacity: .55; text-decoration: line-through; }
      .kc-ev.noshow { background-image: repeating-linear-gradient(135deg, transparent 0 8px, rgba(240,68,56,.10) 8px 16px) !important; }
      .kc-ev .st { position: absolute; right: 6px; top: 5px; width: 9px; height: 9px; border-radius: 50%; }
      .kc-block { position: absolute; left: 5px; right: 5px; border-radius: 7px; padding: 6px 9px; font-size: 13.5px; color: var(--ink-2); background: repeating-linear-gradient(135deg, #f2f4f7 0 8px, #e4e7ec 8px 16px); border: 1px solid var(--line); font-weight: 600; }
      .kc-side .card { margin-bottom: 16px; }
      .kc-side h4 { margin: 0 0 10px; font-size: 15px; }
      .kc-side label { display: flex; align-items: center; gap: 10px; padding: 6px 0; font-size: 15px; cursor: pointer; }
      .kc-side input { width: 17px; height: 17px; }
      .kc-dot { width: 12px; height: 12px; border-radius: 4px; flex: none; display: inline-block; }
      .kc-seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
      .kc-seg button { border: 0; background: #fff; padding: 0 14px; height: 38px; font-weight: 600; color: var(--ink-2); border-left: 1px solid var(--line); }
      .kc-seg button:first-child { border-left: 0; }
      .kc-seg button.on { background: var(--blue-soft); color: #004eeb; }
      .kc-chips { display: flex; flex-wrap: wrap; gap: 8px; }
      .kc-chips button { height: 38px; padding: 0 14px; border-radius: 8px; border: 1px solid var(--line); background: #fff; font-weight: 600; color: var(--ink-2); }
      #cal_resched_box .kc-chips { gap: 6px; } #cal_resched_box .kc-chips button { padding: 0 10px; height: 34px; }
      .kc-chips button.on { background: var(--blue); color: #fff; border-color: var(--blue); }
      .kc-sug { border: 1px solid var(--line); border-radius: 8px; margin-top: 4px; overflow: hidden; }
      .kc-sug div { padding: 8px 12px; display: flex; align-items: center; gap: 10px; cursor: pointer; }
      .kc-sug div:hover { background: var(--blue-soft); }
      .kc-kv { display: grid; grid-template-columns: 26px 1fr; gap: 10px; align-items: start; margin: 12px 0; font-size: 15px; }
      .kc-kv svg { color: var(--muted); margin-top: 2px; }
      .kc-tabs2 { display: flex; gap: 4px; border-bottom: 1px solid var(--line); margin-bottom: 18px; }
      .kc-tabs2 a { padding: 10px 14px; color: var(--ink-2); font-weight: 500; border-bottom: 2px solid transparent; margin-bottom: -1px; }
      .kc-tabs2 a.on { color: var(--blue); border-bottom-color: var(--blue); font-weight: 600; }
      .kc-type { display: flex; gap: 14px; align-items: flex-start; padding: 16px; border: 1.5px solid var(--line); border-radius: 12px; cursor: pointer; background: #fff; text-align: left; width: 100%; }
      .kc-type:hover { border-color: #84adff; background: #f5f8ff; }
      .kc-type.on { border-color: var(--blue); background: var(--blue-soft); box-shadow: 0 0 0 3px #d1e0ff; }
      .kc-type .ic { width: 44px; height: 44px; border-radius: 10px; background: var(--blue-soft); color: var(--blue); display: grid; place-items: center; flex: none; }
      .kc-type.on .ic { background: var(--blue); color: #fff; }
      .kc-ed { display: grid; grid-template-columns: 290px minmax(0,1fr); gap: 22px; align-items: start; }
      .kc-nav { position: sticky; top: 0; padding: 8px; }
      .kc-nav a { display: flex; align-items: center; gap: 10px; padding: 11px 12px; border-radius: 8px; color: var(--ink-2); font-weight: 500; font-size: 15px; }
      .kc-nav a:hover { background: #f2f4f7; }
      .kc-nav a.on { background: var(--blue-soft); color: #004eeb; font-weight: 600; }
      .kc-sec { margin-bottom: 18px; }
      .kc-sec .card-h p { margin: 2px 0 0; color: var(--muted); font-size: 14px; font-weight: 400; }
      .kc-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px; }
      .kc-g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 18px; }
      .kc-hours .r { display: grid; grid-template-columns: 54px 120px 1fr; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--line-soft); }
      .kc-hours .r:last-child { border-bottom: 0; }
      .kc-hours .tm { display: flex; align-items: center; gap: 8px; }
      .kc-hours .tm .input { width: 110px; height: 38px; }
      .kc-sw { display: flex; gap: 10px; }
      .kc-sw button { width: 34px; height: 34px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 0 1px var(--line); }
      .kc-sw button.on { box-shadow: 0 0 0 2px var(--ink); }
      .kc-opt { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid var(--line-soft); }
      .kc-opt:last-child { border-bottom: 0; }
      .kc-opt .d { color: var(--muted); font-size: 14px; }
      .kc-wid { border: 1px solid var(--line); border-radius: 14px; overflow: hidden; display: grid; grid-template-columns: 250px 1fr 170px; background: #fff; }
      .kc-wid .l { padding: 20px; border-right: 1px solid var(--line-soft); }
      .kc-wid .m { padding: 20px; }
      .kc-wid .r { padding: 20px 14px; border-left: 1px solid var(--line-soft); }
      .kc-month { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; font-size: 14px; }
      .kc-month span { padding: 7px 0; border-radius: 50%; }
      .kc-month .h { color: var(--muted); font-weight: 600; font-size: 12px; }
      .kc-month .av { color: var(--wc, var(--blue)); font-weight: 700; background: color-mix(in srgb, var(--wc, var(--blue)) 12%, transparent); cursor: pointer; }
      .kc-month .sel { background: var(--wc, var(--blue)); color: #fff; }
      .kc-month .off { color: var(--faint); }
      .kc-slot { display: block; width: 100%; height: 38px; margin-bottom: 8px; border-radius: 8px; border: 1px solid var(--wc, var(--blue)); color: var(--wc, var(--blue)); background: #fff; font-weight: 600; }
      .kc-slot.on { background: var(--wc, var(--blue)); color: #fff; }
      .kc-conn { display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-bottom: 1px solid var(--line-soft); }
      .kc-conn:last-child { border-bottom: 0; }
      .kc-conn .lg { width: 46px; height: 46px; border-radius: 10px; display: grid; place-items: center; flex: none; border: 1px solid var(--line-soft); }
    `;
    document.head.appendChild(s);
  }

  // ---------- Calendar View ----------
  function calendarView(view) {
    const shown = appts.filter((a) => !view$.hidden.has(a.calendar) && !view$.hidden.has('u:' + a.with));
    view.innerHTML = `
      <div class="row" style="margin-bottom:18px;gap:10px">
        <button class="btn" id="cal_today">Today</button>
        <div class="kc-seg"><button id="cal_prev">${icon('left', 18)}</button><button id="cal_next">${icon('right', 18)}</button></div>
        <h1 style="margin:0 8px;font-size:22px" id="cal_range">26 – 30 October 2026</h1>
        <span class="spacer"></span>
        <div class="kc-seg" id="cal_mode">${['Day', 'Week', 'Month'].map((m) => `<button class="${m === view$.mode ? 'on' : ''}" data-m="${m}">${m}</button>`).join('')}</div>
        <button class="btn primary" id="cal_new">${icon('plus', 18)} New ${icon('chevron', 16)}</button>
      </div>
      <div class="kc-wrap">
        <div class="card" id="cal_grid" style="overflow:hidden">
          <div class="kc-grid" style="position:sticky;top:0;background:#fff;z-index:4">
            <div style="border-bottom:1px solid var(--line-soft);font-size:12px;color:var(--faint);display:grid;place-items:end center;padding-bottom:8px">GMT+1</div>
            ${DAYS.map((d) => `<div class="kc-dayh"><span>${d.split(' ')[0]}</span><b>${d.split(' ')[1]}</b></div>`).join('')}
          </div>
          <div class="kc-grid" style="padding-top:10px">
            <div class="kc-times">${HOURS.map((h) => `<div>${String(h).padStart(2, '0')}:00</div>`).join('')}</div>
            ${DAYS.map((d, i) => `<div class="kc-col" id="cal_day_${i}" style="height:${HOURS.length * HH}px">
              ${shown.filter((a) => a.day === i).map(evHtml).join('')}
              ${blocks.filter((b) => b.day === i).map((b) => `<div class="kc-block" style="top:${((toMin(b.start) - 480) / 60) * HH}px;height:${((toMin(b.end) - toMin(b.start)) / 60) * HH - 3}px">${icon('ban', 14)} ${esc(b.title)}</div>`).join('')}
            </div>`).join('')}
          </div>
        </div>
        <div class="kc-side" id="cal_side">
          <div class="card card-b" id="cal_filter_cals"><h4>Calendars</h4>
            ${cals.filter((k) => appts.some((a) => a.calendar === k.id)).map((k) => `<label><input type="checkbox" data-hide="${k.id}" ${view$.hidden.has(k.id) ? '' : 'checked'} style="accent-color:${k.color}">
              <span class="kc-dot" style="background:${k.color}"></span>${esc(k.name)}</label>`).join('')}</div>
          <div class="card card-b" id="cal_filter_users"><h4>Team members</h4>
            ${data.team.map((t) => `<label><input type="checkbox" data-hide="u:${esc(t.name)}" ${view$.hidden.has('u:' + t.name) ? '' : 'checked'}>${avatar(t.name, 26)}${esc(t.name)}</label>`).join('')}</div>
          <div class="card card-b"><h4>Status</h4>
            ${Object.entries(STATUS).slice(0, 5).map(([k, [l, c]]) => `<div class="row" style="margin:7px 0;font-size:14.5px"><span class="kc-dot" style="border-radius:50%;background:${c ? `var(--${c === 'blue' ? 'blue' : c})` : '#98a2b3'}"></span>${l}</div>`).join('')}</div>
        </div>
      </div>`;
    $$('.kc-ev', view).forEach((el) => (el.onclick = () => drawer(el.dataset.a, () => calendarView(view))));
    $$('[data-hide]', view).forEach((cb) => (cb.onchange = () => { cb.checked ? view$.hidden.delete(cb.dataset.hide) : view$.hidden.add(cb.dataset.hide); calendarView(view); }));
    $$('[data-m]', view).forEach((b) => (b.onclick = () => { if (b.dataset.m !== 'Week') KY.toast(`${b.dataset.m} view`); }));
    $('#cal_today').onclick = () => KY.toast('Showing this week');
    $('#cal_prev').onclick = $('#cal_next').onclick = () => KY.toast('Demo shows one week of appointments');
    $('#cal_new').onclick = (e) => KY.menu(e.currentTarget, [
      { label: 'Appointment', icon: 'calendar', onClick: () => newAppointment(() => calendarView(view)) },
      { label: 'Blocked off time', icon: 'ban', onClick: () => blockTime(() => calendarView(view)) },
    ]);
  }

  function evHtml(a) {
    const k = calOf(a.calendar);
    const c = contact(a.contact);
    const top = ((toMin(a.start) - 480) / 60) * HH;
    const h = ((toMin(a.end) - toMin(a.start)) / 60) * HH - 3;
    const stc = { confirmed: 'var(--green)', new: 'var(--amber)', showed: 'var(--blue)', noshow: 'var(--red)', cancelled: '#98a2b3' }[a.status];
    return `<div class="kc-ev ${a.status}" id="cal_appt_${a.id}" data-a="${a.id}" style="top:${top}px;height:${h}px;background:${k.color}1f;border-color:${k.color};color:#101828">
      <span class="st" style="background:${stc}" title="${STATUS[a.status][0]}"></span>
      ${h < 50 ? `<div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:10px;margin-top:2px"><b style="display:inline">${esc(k.type === 'Class' ? k.name : c.name)}</b> <span class="t">· ${a.start}</span></div>`
        : `<b>${esc(k.type === 'Class' ? k.name : c.name)}</b><div class="t">${a.start} – ${a.end}</div>`}
      ${h > 60 ? `<div class="t">${esc(a.seats || k.name)}</div>` : ''}</div>`;
  }

  // ---------- Appointment drawer ----------
  function drawer(id, redraw) {
    const a = appts.find((x) => x.id === id);
    const k = calOf(a.calendar);
    const c = contact(a.contact);
    const box = KY.modal({
      title: 'Appointment', drawer: true,
      body: `<div id="cal_drawer">
        <div class="row" style="gap:14px">${avatar(c.name, 52)}<div><div class="bold" style="font-size:19px">${esc(k.type === 'Class' ? k.name : c.name)}</div>
          <div class="muted" style="font-size:14px">${esc(k.type === 'Class' ? a.seats : `${c.phone} · ${c.email}`)}</div></div></div>
        <div class="row" style="margin:18px 0 6px;gap:10px">
          <span class="muted bold" style="font-size:14px">Status</span>
          <button class="btn sm" id="cal_dr_status">${statusChip(a.status)} ${icon('chevron', 15)}</button>
        </div>
        <div class="kc-kv">${icon('calendar', 19)}<div><b>${esc(k.name)}</b><div class="muted" style="font-size:14px"><span class="kc-dot" style="background:${k.color};width:9px;height:9px"></span> ${esc(TYPE_LABEL[k.type])} calendar</div></div></div>
        <div class="kc-kv">${icon('clock', 19)}<div id="cal_dr_when"><b>${esc(DAYS[a.day])} 2026</b><div class="muted" style="font-size:14px">${a.start} – ${a.end} · Europe/London</div></div></div>
        <div class="kc-kv">${icon('user', 19)}<div>With <b>${esc(a.with)}</b></div></div>
        <div class="kc-kv">${icon('pin', 19)}<div>${esc(k.location)}</div></div>
        <div class="kc-kv">${icon('globe', 19)}<div class="muted">Booked online via the booking widget · 18 Oct 2026</div></div>
        <div id="cal_resched_box"></div>
        <div class="field" style="margin-top:14px"><label>Internal notes</label><textarea class="input" rows="3" placeholder="Only your team can see these notes">${a.id === 'a2' ? 'Bring previous X-rays.' : ''}</textarea></div>
        <div class="row" style="gap:8px;margin-top:6px;flex-wrap:wrap">
          <button class="btn" id="cal_dr_resched">${icon('repeat', 17)} Reschedule</button>
          <button class="btn" id="cal_dr_noshow">${icon('ban', 17)} Mark no-show</button>
          <button class="btn" id="cal_dr_cancel" style="color:var(--red)">${icon('x', 17)} Cancel</button>
        </div>
        <div class="bold" style="margin:22px 0 8px">History</div>
        <div class="muted" style="font-size:14px;line-height:1.9" id="cal_dr_history">
          <div>${icon('check', 14)} Booked by ${esc(c.name.split(' ')[0])} on the booking widget · 18 Oct</div>
          <div>${icon('mail', 14)} Confirmation email and SMS sent · 18 Oct</div></div>
      </div>`,
      actions: [{ label: 'View contact', onClick: () => KY.go(`#/contacts/detail/${c.id}`) }, { label: 'Done', primary: true, id: 'cal_dr_done' }],
    });
    const log = (t) => $('#cal_dr_history', box).insertAdjacentHTML('afterbegin', `<div style="color:var(--ink)">${icon('edit', 14)} ${esc(t)} · just now</div>`);
    const setStatus = (s) => {
      a.status = s;
      $('#cal_dr_status', box).innerHTML = `${statusChip(s)} ${icon('chevron', 15)}`;
      log(`Status changed to ${STATUS[s][0]} by ${data.me.name}`);
      redraw();
      KY.toast(`Appointment marked as ${STATUS[s][0]}`);
    };
    $('#cal_dr_status', box).onclick = (e) => KY.menu(e.currentTarget, ['confirmed', 'new', 'showed', 'noshow', 'cancelled', 'invalid'].map((s) => ({ label: STATUS[s][0], onClick: () => setStatus(s) })));
    $('#cal_dr_noshow', box).onclick = () => setStatus('noshow');
    $('#cal_dr_cancel', box).onclick = () => setStatus('cancelled');
    $('#cal_dr_resched', box).onclick = () => {
      let day = a.day; let slot = a.start;
      const draw = () => {
        $('#cal_resched_box', box).innerHTML = `<div class="card" style="padding:14px 16px;box-shadow:none;margin-top:8px;border-color:#84adff;background:#f5f8ff">
          <div class="bold" style="margin-bottom:10px">Pick a new time</div>
          <div class="kc-chips" style="margin-bottom:10px">${DAYS.map((d, i) => `<button id="cal_rs_day_${i}" data-d="${i}" class="${i === day ? 'on' : ''}">${d.split(' ').slice(0, 2).join(' ')}</button>`).join('')}</div>
          <div class="kc-chips">${SLOTS.slice(0, 10).map((t) => `<button id="cal_rs_slot_${t.replace(':', '')}" data-t="${t}" class="${t === slot ? 'on' : ''}">${t}</button>`).join('')}</div>
          <div class="row" style="margin-top:12px"><span class="muted" style="font-size:14px">${esc(c.name.split(' ')[0])} gets an automatic reschedule notification.</span><span class="spacer"></span>
          <button class="btn primary sm" id="cal_rs_save">Confirm new time</button></div></div>`;
        $$('[data-d]', box).forEach((b) => (b.onclick = () => { day = +b.dataset.d; draw(); }));
        $$('[data-t]', box).forEach((b) => (b.onclick = () => { slot = b.dataset.t; draw(); }));
        $('#cal_rs_save', box).onclick = () => {
          const len = toMin(a.end) - toMin(a.start);
          Object.assign(a, { day, start: slot, end: fromMin(toMin(slot) + len), status: a.status === 'cancelled' ? 'confirmed' : a.status });
          $('#cal_dr_when', box).innerHTML = `<b>${esc(DAYS[a.day])} 2026</b><div class="muted" style="font-size:14px">${a.start} – ${a.end} · Europe/London</div>`;
          $('#cal_resched_box', box).innerHTML = '';
          log(`Rescheduled to ${DAYS[a.day]}, ${a.start}`);
          redraw();
          KY.toast(`Rescheduled to ${DAYS[a.day]} at ${a.start}`);
        };
      };
      draw();
    };
  }

  // ---------- New appointment & blocked time ----------
  function newAppointment(redraw) {
    let pick = null; let day = 3; let slot = '';
    const box = KY.modal({
      title: 'Book appointment', wide: true,
      body: `<div class="kc-g2">
          <div class="field"><label>Calendar</label><select class="select" id="cal_na_cal">${cals.filter((k) => k.type !== 'Class').map((k) => `<option value="${k.id}">${esc(k.name)}</option>`).join('')}</select></div>
          <div class="field"><label>Team member</label><select class="select" id="cal_na_user">${data.team.map((t) => `<option>${esc(t.name)}</option>`).join('')}</select></div></div>
        <div class="field"><label>Contact</label><div class="search"><span>${icon('search', 18)}</span><input class="input" id="cal_na_contact" placeholder="Search by name, email or phone" autocomplete="off"></div><div id="cal_na_sug"></div></div>
        <div class="field"><label>Date</label><div class="kc-chips" id="cal_na_days">${DAYS.map((d, i) => `<button id="cal_na_day_${i}" data-d="${i}" class="${i === day ? 'on' : ''}">${d}</button>`).join('')}</div></div>
        <div class="field"><label>Available times <span class="muted" style="font-weight:400">(Europe/London)</span></label><div class="kc-chips" id="cal_na_slots"></div></div>
        <div class="kc-g2">
          <div class="field"><label>Appointment status</label><select class="select" id="cal_na_status"><option value="confirmed">Confirmed</option><option value="new">Unconfirmed</option></select></div>
          <div class="field"><label>Meeting location</label><input class="input" id="cal_na_loc" value="In person · 14 Marylebone High Street"></div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Book appointment', primary: true, id: 'cal_na_book', onClick: (close) => {
        if (!pick || !slot) return KY.toast('Choose a contact and a time', 'warn');
        const k = calOf($('#cal_na_cal', box).value);
        appts.push({ id: 'n' + Date.now(), contact: pick, calendar: k.id, day, start: slot, end: fromMin(toMin(slot) + k.duration), status: $('#cal_na_status', box).value, with: $('#cal_na_user', box).value });
        close(); redraw(); KY.toast(`Appointment booked: ${contact(pick).name}, ${DAYS[day]} at ${slot}`);
      } }],
    });
    const slots = () => {
      const taken = appts.filter((a) => a.day === day && a.status !== 'cancelled').map((a) => a.start);
      $('#cal_na_slots', box).innerHTML = SLOTS.filter((t) => !taken.includes(t)).map((t) => `<button id="cal_na_slot_${t.replace(':', '')}" data-t="${t}" class="${t === slot ? 'on' : ''}">${t}</button>`).join('');
      $$('[data-t]', box).forEach((b) => (b.onclick = () => { slot = b.dataset.t; slots(); }));
    };
    slots();
    $$('[data-d]', box).forEach((b) => (b.onclick = () => { day = +b.dataset.d; slot = ''; $$('[data-d]', box).forEach((x) => x.classList.toggle('on', x === b)); slots(); }));
    $('#cal_na_cal', box).onchange = (e) => { $('#cal_na_loc', box).value = calOf(e.target.value).location; $('#cal_na_user', box).value = calOf(e.target.value).team[0]; };
    const inp = $('#cal_na_contact', box);
    inp.oninput = () => {
      const q = inp.value.trim().toLowerCase();
      const hits = q ? data.contacts.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4) : [];
      $('#cal_na_sug', box).innerHTML = hits.length ? `<div class="kc-sug">${hits.map((c) => `<div id="cal_na_pick_${c.id}" data-c="${c.id}">${avatar(c.name, 28)}<b>${esc(c.name)}</b><span class="muted" style="font-size:14px">${esc(c.phone)}</span></div>`).join('')}</div>` : '';
      $$('[data-c]', box).forEach((d) => (d.onclick = () => { pick = d.dataset.c; inp.value = contact(pick).name; $('#cal_na_sug', box).innerHTML = ''; }));
    };
  }

  function blockTime(redraw) {
    KY.modal({
      title: 'Blocked off time',
      body: `<div class="field"><label>Title</label><input class="input" id="cal_bt_title" value="Staff training"></div>
        <div class="kc-g3"><div class="field"><label>Day</label><select class="select" id="cal_bt_day">${DAYS.map((d, i) => `<option value="${i}">${d}</option>`).join('')}</select></div>
        <div class="field"><label>From</label><input class="input" id="cal_bt_from" value="12:00"></div><div class="field"><label>To</label><input class="input" id="cal_bt_to" value="13:00"></div></div>
        <div class="field"><label>Team member</label><select class="select">${data.team.map((t) => `<option>${esc(t.name)}</option>`).join('')}</select></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'cal_bt_save', onClick: (close, b) => {
        blocks.push({ day: +$('#cal_bt_day', b).value, start: $('#cal_bt_from', b).value, end: $('#cal_bt_to', b).value, title: $('#cal_bt_title', b).value });
        close(); redraw(); KY.toast('Time blocked off');
      } }],
    });
  }

  // ---------- Appointment List ----------
  const listState = { tab: 'upcoming', cal: '', user: '', q: '' };
  function listView(view) {
    const rows = appts.filter((a) => (listState.tab === 'all' || (listState.tab === 'cancelled' ? a.status === 'cancelled' : a.status !== 'cancelled'))
      && (!listState.cal || a.calendar === listState.cal) && (!listState.user || a.with === listState.user)
      && (!listState.q || contact(a.contact).name.toLowerCase().includes(listState.q.toLowerCase())))
      .sort((x, y) => x.day - y.day || toMin(x.start) - toMin(y.start));
    view.innerHTML = `
      <div class="page-head"><h1>Appointment List</h1><span class="chip">${rows.length} appointments</span>
        <div class="actions"><button class="btn primary" id="cal_al_new">${icon('plus', 18)} New appointment</button></div></div>
      <div class="kc-tabs2" id="cal_al_tabs">${[['upcoming', 'Upcoming'], ['cancelled', 'Cancelled'], ['all', 'All']].map(([k, l]) => `<a id="cal_al_${k}" data-t="${k}" class="${listState.tab === k ? 'on' : ''}" href="javascript:void 0">${l}</a>`).join('')}</div>
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft);gap:10px">
          <div class="search" style="width:300px"><span>${icon('search', 18)}</span><input class="input" id="cal_al_search" placeholder="Search by contact" value="${esc(listState.q)}"></div>
          <select class="select" id="cal_al_cal" style="width:250px"><option value="">All calendars</option>${cals.map((k) => `<option value="${k.id}" ${listState.cal === k.id ? 'selected' : ''}>${esc(k.name)}</option>`).join('')}</select>
          <select class="select" id="cal_al_user" style="width:210px"><option value="">All team members</option>${data.team.map((t) => `<option ${listState.user === t.name ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select>
          <button class="btn" id="cal_al_dates">${icon('calendar', 18)} 26 Oct – 30 Oct 2026</button>
        </div>
        <table class="t" id="cal_al_table"><thead><tr><th>Contact</th><th>Calendar</th><th>Status</th><th>Appointment time</th><th>Assigned to</th><th>Booked</th></tr></thead>
          <tbody>${rows.map((a) => {
            const c = contact(a.contact); const k = calOf(a.calendar);
            return `<tr class="click" id="cal_al_row_${a.id}" data-a="${a.id}"><td><div class="row">${avatar(c.name, 32)}<div><div class="bold">${esc(c.name)}</div><div class="muted" style="font-size:13.5px">${esc(c.phone)}</div></div></div></td>
              <td><div class="row" style="gap:8px"><span class="kc-dot" style="background:${k.color}"></span>${esc(k.name)}</div></td><td>${statusChip(a.status)}</td>
              <td>${esc(DAYS[a.day])} · ${a.start} – ${a.end}</td><td>${esc(a.with)}</td><td class="muted">${a.id.startsWith('n') ? 'Just now' : '18 Oct 2026'}</td></tr>`;
          }).join('')}</tbody></table>
        ${rows.length ? '' : '<div class="empty"><div class="big">No appointments</div>Try another filter.</div>'}
      </div>`;
    $$('[data-t]', view).forEach((t) => (t.onclick = () => { listState.tab = t.dataset.t; listView(view); }));
    $('#cal_al_cal').onchange = (e) => { listState.cal = e.target.value; listView(view); };
    $('#cal_al_user').onchange = (e) => { listState.user = e.target.value; listView(view); };
    const s = $('#cal_al_search');
    s.oninput = () => { listState.q = s.value; const p = s.selectionStart; listView(view); const n = $('#cal_al_search'); n.focus(); n.setSelectionRange(p, p); };
    $('#cal_al_dates').onclick = (e) => KY.menu(e.currentTarget, ['Today', 'This week', 'Next week', 'This month', 'Custom range'].map((l) => ({ label: l })));
    $$('tr[data-a]', view).forEach((tr) => (tr.onclick = () => drawer(tr.dataset.a, () => listView(view))));
    $('#cal_al_new').onclick = () => newAppointment(() => listView(view));
  }

  // ---------- Calendar Settings ----------
  const SUB = [['calendars', 'Calendars'], ['groups', 'Groups'], ['preferences', 'Preferences'], ['availability', 'Availability'], ['connections', 'Connections']];
  function settingsView(view, params) {
    if (params[0] === 'edit') return editor(view, params[1], params[2] || 'details');
    const sub = params[0] || 'calendars';
    view.innerHTML = `
      <div class="page-head"><h1>Calendar Settings</h1>
        <div class="actions">${sub === 'calendars' ? `<button class="btn primary" id="cal_create">${icon('plus', 18)} Create Calendar</button>` : ''}</div></div>
      <div class="kc-tabs2" id="cal_set_tabs">${SUB.map(([k, l]) => `<a id="cal_set_${k}" class="${k === sub ? 'on' : ''}" href="#/calendars/settings/${k}">${l}</a>`).join('')}</div>
      <div id="cal_set_body"></div>`;
    const body = $('#cal_set_body');
    if (sub === 'connections') return connections(body);
    if (sub === 'groups') {
      body.innerHTML = `<div class="card"><table class="t"><thead><tr><th>Group</th><th>Calendars</th><th>Group link</th><th></th></tr></thead><tbody>
        <tr><td class="bold">Bloom Dental — All treatments</td><td>${cals.slice(0, 5).length} calendars</td><td><a>bloomdental.co.uk/widget/group/bloom-dental</a></td><td><button class="toggle on"></button></td></tr>
        <tr><td class="bold">Cosmetic</td><td>3 calendars</td><td><a>bloomdental.co.uk/widget/group/cosmetic</a></td><td><button class="toggle on"></button></td></tr></tbody></table></div>`;
      return KY.toggles(body);
    }
    if (sub === 'preferences') {
      body.innerHTML = `<div class="card card-b" style="max-width:760px">
        <div class="field"><label>Time zone</label><select class="select"><option>Europe/London (GMT+1)</option></select></div>
        <div class="field"><label>Week starts on</label><select class="select"><option>Monday</option><option>Sunday</option></select></div>
        <div class="field"><label>Default calendar view</label><select class="select"><option>Week</option><option>Day</option><option>Month</option></select></div>
        <div class="kc-opt"><button class="toggle on"></button><div><b>Show cancelled appointments</b><div class="d">Keep cancelled appointments visible, crossed out, in the calendar view.</div></div></div></div>`;
      return KY.toggles(body);
    }
    if (sub === 'availability') {
      body.innerHTML = `<div class="card" style="max-width:900px"><div class="card-h"><h3>My availability</h3><span class="spacer"></span><span class="chip">Sarah Mitchell</span></div><div class="card-b kc-hours">${hoursRows()}</div></div>`;
      return KY.toggles(body);
    }
    body.innerHTML = `<div class="card"><table class="t" id="cal_list"><thead><tr><th>Calendar name</th><th>Type</th><th>Duration</th><th>Team members</th><th>Booking link</th><th>Active</th><th></th></tr></thead>
      <tbody>${cals.map((k) => `<tr id="cal_row_${k.id}">
        <td><div class="row"><span class="kc-dot" style="background:${k.color};width:14px;height:14px"></span><a class="bold" style="color:var(--ink)" href="#/calendars/settings/edit/${k.id}/details" id="cal_edit_${k.id}">${esc(k.name)}</a></div></td>
        <td><span class="chip ${k.type === 'Round Robin' ? 'blue' : k.type === 'Personal' ? 'purple' : k.type === 'Class' ? 'green' : k.type === 'Collective' ? 'pink' : 'amber'}">${esc(TYPE_LABEL[k.type])}</span></td>
        <td>${k.duration} min</td>
        <td><div class="row" style="gap:0">${k.team.map((t, i) => `<span style="margin-left:${i ? -8 : 0}px;border:2px solid #fff;border-radius:50%">${avatar(t, 30)}</span>`).join('')}<span class="muted" style="margin-left:8px;font-size:14px">${k.team.length === 1 ? esc(k.team[0]) : k.team.length + ' members'}</span></div></td>
        <td><div class="row" style="gap:4px"><button class="btn sm" id="cal_link_${k.id}">${icon('copy', 15)} Copy link</button><button class="btn sm ghost icon" id="cal_preview_${k.id}" title="Preview">${icon('external', 16)}</button></div></td>
        <td><button class="toggle ${k.active ? 'on' : ''}" data-act="${k.id}"></button></td>
        <td><button class="btn ghost icon sm" id="cal_more_${k.id}" data-more="${k.id}">${icon('more', 18)}</button></td></tr>`).join('')}</tbody></table></div>`;
    $$('[data-act]', body).forEach((t) => (t.onclick = () => { const k = calOf(t.dataset.act); k.active = !k.active; t.classList.toggle('on', k.active); KY.toast(`${k.name} ${k.active ? 'activated' : 'deactivated'}`); }));
    cals.forEach((k) => {
      $(`#cal_link_${k.id}`).onclick = () => KY.toast(`Copied: bloomdental.co.uk/widget/booking/${k.slug}`);
      $(`#cal_preview_${k.id}`).onclick = () => preview(k);
      $(`#cal_more_${k.id}`).onclick = (e) => KY.menu(e.currentTarget, [
        { label: 'Edit', icon: 'edit', onClick: () => KY.go(`#/calendars/settings/edit/${k.id}/details`) },
        { label: 'Preview booking widget', icon: 'eye', onClick: () => preview(k) },
        { label: 'Duplicate', icon: 'copy', onClick: () => KY.toast('Calendar duplicated') },
        { label: 'Delete', icon: 'trash', onClick: () => KY.toast('Delete is disabled in the demo', 'warn') },
      ]);
    });
    $('#cal_create').onclick = createFlow;
  }

  function createFlow() {
    let type = null;
    const box = KY.modal({
      title: 'Create Calendar', wide: true,
      body: `<p class="muted" style="margin:0 0 16px">Choose the type of calendar first. You can change every other setting later.</p>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:12px" id="cal_types">
          ${TYPES.map((t) => `<button class="kc-type" id="cal_type_${t.id}" data-type="${t.id}"><span class="ic">${icon(t.icon, 22)}</span>
            <span><b style="font-size:16px">${t.label}</b><span class="muted" style="display:block;font-size:14px;margin-top:3px">${t.desc}</span></span></button>`).join('')}
        </div>`,
      actions: [{ label: 'Cancel' }, { label: 'Continue', primary: true, id: 'cal_type_continue', onClick: (close) => {
        if (!type) return KY.toast('Choose a calendar type', 'warn');
        const label = TYPES.find((t) => t.id === type).label;
        const shortType = Object.keys(TYPE_LABEL).find((k) => TYPE_LABEL[k] === label);
        const k = base({ id: 'kn' + Date.now().toString(36), name: 'Untitled calendar', type: shortType, duration: 30, team: [data.me.name], color: '#155eef', isNew: true });
        cals.push(k);
        close();
        KY.go(`#/calendars/settings/edit/${k.id}/details`);
      } }],
    });
    $$('[data-type]', box).forEach((b) => (b.onclick = () => { type = b.dataset.type; $$('[data-type]', box).forEach((x) => x.classList.toggle('on', x === b)); }));
  }

  // ---------- Calendar editor ----------
  const ED = [['details', 'Calendar Details', 'note'], ['availability', 'Availability', 'clock'], ['forms', 'Forms & Payment', 'card'], ['notifications', 'Notifications & Additional Options', 'bell'], ['customizations', 'Customizations', 'palette']];
  const DOW = [['Mon', true, '09:00', '17:00'], ['Tue', true, '09:00', '17:00'], ['Wed', true, '09:00', '19:00'], ['Thu', true, '09:00', '17:00'], ['Fri', true, '09:00', '16:00'], ['Sat', false, '09:00', '13:00'], ['Sun', false, '', '']];
  const hoursRows = (pfx = 'cal_ed') => DOW.map(([d, on, f, t]) => `<div class="r"><button class="toggle ${on ? 'on' : ''}" id="${pfx}_day_${d.toLowerCase()}" data-day></button><b>${d}${d === 'Mon' ? 'day' : d === 'Tue' ? 'sday' : d === 'Wed' ? 'nesday' : d === 'Thu' ? 'rsday' : d === 'Fri' ? 'day' : d === 'Sat' ? 'urday' : 'day'}</b>
    <div class="tm" data-tm style="${on ? '' : 'display:none'}"><input class="input" value="${f || '09:00'}"><span class="muted">to</span><input class="input" value="${t || '17:00'}"><button class="btn ghost icon sm">${icon('plus', 16)}</button></div>
    <span class="muted" data-off style="${on ? 'display:none' : ''}">Unavailable</span></div>`).join('');

  function editor(view, id, sec) {
    const k = calOf(id);
    if (!k) return KY.go('#/calendars/settings');
    const isClass = k.type === 'Class';
    view.innerHTML = `
      <div class="row" style="margin-bottom:18px;gap:12px">
        <a class="btn ghost icon" id="cal_ed_back" href="#/calendars/settings">${icon('left', 20)}</a>
        <span class="kc-dot" style="background:${k.color};width:16px;height:16px"></span>
        <h1 style="margin:0;font-size:22px" id="cal_ed_title">${esc(k.name)}</h1><span class="chip">${esc(TYPE_LABEL[k.type])}</span>
        <span class="spacer"></span>
        <button class="btn" id="cal_ed_link">${icon('copy', 17)} Copy link</button>
        <button class="btn" id="cal_ed_preview">${icon('eye', 17)} Preview</button>
        <button class="btn primary" id="cal_ed_save">${icon('check', 17)} Save</button>
      </div>
      <div class="kc-ed">
        <div class="card kc-nav" id="cal_ed_nav">${ED.map(([s, l, ic]) => `<a id="cal_ed_tab_${s}" class="${s === sec ? 'on' : ''}" href="#/calendars/settings/edit/${k.id}/${s}">${icon(ic, 19)}${l}</a>`).join('')}</div>
        <div id="cal_ed_body"></div>
      </div>`;
    const body = $('#cal_ed_body');
    const card = (title, sub, inner, id = '') => `<div class="card kc-sec" ${id ? `id="${id}"` : ''}><div class="card-h"><div><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ''}</div></div><div class="card-b">${inner}</div></div>`;
    const sel = (id, opts, cur) => `<select class="select" id="${id}">${opts.map((o) => `<option ${String(o) === String(cur) ? 'selected' : ''}>${o}</option>`).join('')}</select>`;

    if (sec === 'details') {
      body.innerHTML = card('Calendar details', 'What patients see when they book.', `
          <div class="field"><label>Calendar name</label><input class="input" id="cal_ed_name" value="${k.isNew ? '' : esc(k.name)}" placeholder="e.g. Emergency Appointment"></div>
          <div class="field"><label>Description</label><textarea class="input" rows="3" id="cal_ed_desc" placeholder="Tell patients what to expect">${k.isNew ? '' : 'A relaxed appointment with our team at Bloom Dental Studio.'}</textarea></div>
          <div class="field"><label>Calendar URL</label><div class="row" style="gap:0"><span class="input" style="width:auto;display:flex;align-items:center;background:#f9fafb;border-right:0;border-radius:8px 0 0 8px;color:var(--muted);white-space:nowrap">bloomdental.co.uk/widget/booking/</span>
            <input class="input" id="cal_ed_slug" style="border-radius:0 8px 8px 0" value="${k.isNew ? '' : esc(k.slug)}"></div></div>`, 'cal_ed_sec_details') +
        card(k.type === 'Round Robin' || k.type === 'Collective' ? 'Team members' : isClass ? 'Host' : 'Team member', k.type === 'Round Robin' ? 'Bookings are shared between these people, by availability and priority.' : k.type === 'Collective' ? 'Every selected person must be free for a time to be offered.' : 'Who this calendar books time with.', `
          <div class="row" style="flex-wrap:wrap;gap:10px" id="cal_ed_team">${data.team.map((t) => `<label class="row" style="gap:8px;border:1px solid var(--line);border-radius:999px;padding:5px 14px 5px 6px;cursor:pointer"><input type="checkbox" ${k.team.includes(t.name) ? 'checked' : ''} id="cal_ed_tm_${t.name.split(' ')[0].toLowerCase()}">${avatar(t.name, 28)}${esc(t.name)}</label>`).join('')}</div>
          ${isClass ? `<div class="field" style="margin-top:14px;max-width:260px"><label>Seats per class</label><input class="input" value="${k.seats || 10}"></div>` : ''}`) +
        card('Meeting location', 'Shown in confirmations and added to calendar invites.', `
          <div class="kc-g2"><div class="field"><label>Location type</label>${sel('cal_ed_loctype', ['In person', 'Phone call', 'Google Meet', 'Zoom', 'Custom'], 'In person')}</div>
          <div class="field"><label>Address</label><input class="input" id="cal_ed_address" value="${esc(data.business.address)}"></div></div>`) +
        card('Calendar colour', '', `<div class="kc-sw" id="cal_ed_colors">${['#155eef', '#2e90fa', '#12b76a', '#f79009', '#ee46bc', '#7a5af8', '#06aed4', '#f04438'].map((c) => `<button data-c="${c}" class="${c === k.color ? 'on' : ''}" style="background:${c}"></button>`).join('')}</div>`);
      $('#cal_ed_name').oninput = (e) => {
        k.name = e.target.value || 'Untitled calendar';
        $('#cal_ed_title').textContent = k.name;
        k.slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        $('#cal_ed_slug').value = k.slug;
      };
      $$('[data-c]', body).forEach((b) => (b.onclick = () => { k.color = b.dataset.c; $$('[data-c]', body).forEach((x) => x.classList.toggle('on', x === b)); $('.kc-dot', view).style.background = k.color; }));
      $('#cal_ed_loctype').onchange = (e) => { k.location = e.target.value === 'In person' ? 'In person · 14 Marylebone High Street' : e.target.value; };
    }

    if (sec === 'availability') {
      body.innerHTML = card('Meeting duration', 'How long each appointment lasts, and how often a new start time is offered.', `
          <div class="kc-g2"><div class="field"><label>Duration</label>${sel('cal_ed_duration', ['15 mins', '30 mins', '45 mins', '60 mins', '90 mins'], k.duration + ' mins')}</div>
          <div class="field"><label>Slot interval</label>${sel('cal_ed_interval', ['15 mins', '30 mins', '60 mins'], k.interval + ' mins')}</div></div>`, 'cal_ed_sec_duration') +
        card('Weekly working hours', 'When this calendar can be booked. Outside these hours, no times are offered.', `<div class="kc-hours" id="cal_ed_hours">${hoursRows()}</div>`, 'cal_ed_sec_hours') +
        card('Date-specific hours', 'Change availability for a single day, like a bank holiday or a late opening.', `
          <div id="cal_ed_overrides"><div class="row" style="padding:8px 0;border-bottom:1px solid var(--line-soft)"><b style="width:180px">Fri 25 Dec 2026</b><span class="chip red">Unavailable</span><span class="spacer"></span><button class="btn ghost icon sm">${icon('trash', 16)}</button></div></div>
          <button class="btn" id="cal_ed_override" style="margin-top:12px">${icon('plus', 17)} Add date-specific hours</button>`, 'cal_ed_sec_overrides') +
        card('Scheduling rules', 'Protect your diary: buffers, notice and daily limits.', `
          <div class="kc-g2">
            <div class="field"><label>Buffer before appointment</label>${sel('cal_ed_buffer_before', ['None', '5 mins', '10 mins', '15 mins', '30 mins'], k.before ? k.before + ' mins' : 'None')}</div>
            <div class="field"><label>Buffer after appointment</label>${sel('cal_ed_buffer_after', ['None', '5 mins', '10 mins', '15 mins', '30 mins'], k.after ? k.after + ' mins' : 'None')}</div>
            <div class="field"><label>Minimum scheduling notice</label>${sel('cal_ed_notice', ['None', '1 hour', '4 hours', '12 hours', '24 hours', '48 hours'], k.notice)}</div>
            <div class="field"><label>Date range (how far ahead people can book)</label>${sel('cal_ed_range', ['14 days', '30 days', '60 days', '90 days'], k.range)}</div>
            <div class="field"><label>Maximum bookings per day</label>${sel('cal_ed_maxday', ['No limit', '2', '4', '6', '8', '10'], k.maxDay || 'No limit')}</div>
            <div class="field"><label>Maximum bookings per slot</label>${sel('cal_ed_maxslot', ['1', '2', '3'], isClass ? '1' : '1')}</div>
          </div>`, 'cal_ed_sec_rules');
      $$('[data-day]', body).forEach((t) => (t.onclick = () => {
        t.classList.toggle('on');
        const r = t.closest('.r');
        $('[data-tm]', r).style.display = t.classList.contains('on') ? '' : 'none';
        $('[data-off]', r).style.display = t.classList.contains('on') ? 'none' : '';
      }));
      $('#cal_ed_override').onclick = () => KY.modal({
        title: 'Add date-specific hours',
        body: `<div class="field"><label>Date</label><select class="select" id="cal_ov_date"><option>Thu 24 Dec 2026</option><option>Thu 31 Dec 2026</option><option>Fri 1 Jan 2027</option></select></div>
          <div class="row" style="margin-bottom:14px"><button class="toggle on" id="cal_ov_unavail"></button> Mark as unavailable all day</div>`,
        actions: [{ label: 'Cancel' }, { label: 'Apply', primary: true, id: 'cal_ov_apply', onClick: (close, b) => {
          $('#cal_ed_overrides').insertAdjacentHTML('afterbegin', `<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line-soft)"><b style="width:180px">${esc($('#cal_ov_date', b).value)}</b><span class="chip red">Unavailable</span><span class="spacer"></span><button class="btn ghost icon sm">${icon('trash', 16)}</button></div>`);
          close(); KY.toast('Date-specific hours added');
        } }],
      });
    }

    if (sec === 'forms') {
      body.innerHTML = card('Booking form', 'The details people fill in when they book.', `
          <div class="row" style="gap:22px;margin-bottom:14px">
            <label class="row" style="gap:6px"><input type="radio" name="cal_form" id="cal_ed_form_default" ${k.form === 'Default form' ? 'checked' : ''}> Default form</label>
            <label class="row" style="gap:6px"><input type="radio" name="cal_form" id="cal_ed_form_custom" ${k.form !== 'Default form' ? 'checked' : ''}> Custom form</label></div>
          <div id="cal_ed_formbox"></div>`, 'cal_ed_sec_form') +
        card('Payments', 'Take a payment or deposit when the appointment is booked.', `
          <div class="kc-opt" style="padding-top:0"><button class="toggle ${k.pay ? 'on' : ''}" id="cal_ed_pay"></button><div><b>Accept payments</b><div class="d">Patients pay by card on the booking widget before the booking is confirmed.</div></div></div>
          <div id="cal_ed_paybox" style="${k.pay ? '' : 'display:none'}">
            <div class="row" style="gap:12px;margin:14px 0;padding:12px 14px;background:#f9fafb;border-radius:10px">
              <span style="width:40px;height:40px;border-radius:8px;background:#635bff;color:#fff;display:grid;place-items:center;font-weight:800">S</span>
              <div><b>Stripe</b><div class="muted" style="font-size:14px">Connected · Bloom Dental Studio Ltd</div></div><span class="spacer"></span><span class="chip green">${icon('check', 14)} Live mode</span></div>
            <div class="kc-g2"><div class="field"><label>Amount</label><div class="row" style="gap:0"><span class="input" style="width:auto;display:flex;align-items:center;background:#f9fafb;border-right:0;border-radius:8px 0 0 8px">£</span>
              <input class="input" id="cal_ed_amount" style="border-radius:0 8px 8px 0" value="${k.amount || ''}" placeholder="0.00"></div></div>
              <div class="field"><label>Currency</label>${sel('cal_ed_currency', ['GBP — British pound', 'EUR — Euro', 'USD — US dollar'], 'GBP — British pound')}</div></div>
            <div class="field"><label>Description on the receipt</label><input class="input" id="cal_ed_paydesc" value="Consultation deposit — taken off your treatment"></div>
          </div>`, 'cal_ed_sec_pay') +
        card('After booking', 'What people see once they have booked.', `
          <div class="row" style="gap:22px;margin-bottom:12px"><label class="row" style="gap:6px"><input type="radio" name="cal_after" checked> Show a thank-you message</label><label class="row" style="gap:6px"><input type="radio" name="cal_after"> Redirect to a URL</label></div>
          <textarea class="input" rows="2" id="cal_ed_thanks">Thank you! Your appointment is booked. We've sent the details to your email and phone.</textarea>`, 'cal_ed_sec_after');
      const drawForm = () => {
        const custom = $('#cal_ed_form_custom').checked;
        k.form = custom ? 'New Patient Registration' : 'Default form';
        const fields = custom ? ['First name', 'Last name', 'Phone', 'Email', 'Date of birth', 'Current dentist', 'Any medical conditions we should know about?', 'Consent to SMS & email reminders']
          : ['First name', 'Last name', 'Phone', 'Email'];
        $('#cal_ed_formbox').innerHTML = `${custom ? `<div class="field"><label>Form</label>${sel('cal_ed_formsel', data.forms.map((f) => f.name), 'New Patient Registration')}</div>` : ''}
          <div class="muted bold" style="font-size:13px;margin-bottom:8px">FIELDS ON THE BOOKING FORM</div>
          <div class="row" style="flex-wrap:wrap;gap:8px" id="cal_ed_fields">${fields.map((f) => `<span class="chip" style="height:30px;font-size:14px">${icon('form', 14)} ${esc(f)}</span>`).join('')}</div>`;
      };
      drawForm();
      $('#cal_ed_form_default').onchange = $('#cal_ed_form_custom').onchange = drawForm;
      $('#cal_ed_pay').onclick = (e) => { k.pay = !k.pay; e.currentTarget.classList.toggle('on', k.pay); $('#cal_ed_paybox').style.display = k.pay ? '' : 'none'; };
      $('#cal_ed_amount').oninput = (e) => (k.amount = parseFloat(e.target.value) || 0);
    }

    if (sec === 'notifications') {
      const rem = k.reminders = k.reminders || [['Email', '24 hours before'], ['SMS', '2 hours before']];
      const drawRem = () => {
        $('#cal_ed_rems').innerHTML = rem.map(([ch, when], i) => `<div class="row" style="padding:10px 12px;border:1px solid var(--line-soft);border-radius:8px;margin-bottom:8px" id="cal_ed_rem_${i}">
          <span class="chip ${ch === 'SMS' ? 'green' : 'blue'}">${icon(ch === 'SMS' ? 'sms' : 'mail', 14)} ${ch}</span><b>${esc(when)}</b><span class="muted" style="font-size:14px">· to the contact</span>
          <span class="spacer"></span><button class="btn ghost sm">${icon('edit', 15)} Edit template</button><button class="btn ghost icon sm" data-rm="${i}">${icon('trash', 16)}</button></div>`).join('');
        $$('[data-rm]', body).forEach((b) => (b.onclick = () => { rem.splice(+b.dataset.rm, 1); drawRem(); }));
      };
      const nrow = (id, title, d, ch, on = true) => `<div class="kc-opt" id="cal_ed_n_${id}"><button class="toggle ${on ? 'on' : ''}"></button><div style="flex:1"><b>${title}</b><div class="d">${d}</div></div>
        ${ch.map((c) => `<span class="chip ${c === 'SMS' ? 'green' : c === 'Email' ? 'blue' : ''}">${c}</span>`).join('')}<button class="btn ghost sm">${icon('edit', 15)} Edit</button></div>`;
      body.innerHTML = card('Notifications', 'Automatic messages sent for this calendar. Each one uses a template you can edit.', `
          ${nrow('booked', 'Booking confirmation', 'Sent to the contact and the assigned team member as soon as an appointment is booked.', ['Email', 'SMS'])}
          ${nrow('resched', 'Reschedule', 'Sent when the appointment time changes.', ['Email', 'SMS'])}
          ${nrow('cancel', 'Cancellation', 'Sent when the appointment is cancelled.', ['Email'])}
          ${nrow('followup', 'Follow-up', 'Sent after the appointment, for example to ask for a review.', ['Email'], false)}`, 'cal_ed_sec_notifications') +
        card('Reminders', 'Remind the contact before the appointment. Fewer no-shows, less chasing.', `
          <div class="kc-opt" style="padding-top:0"><button class="toggle on" id="cal_ed_rem_toggle"></button><div><b>Send appointment reminders</b><div class="d">Reminders stop automatically if the appointment is cancelled or rescheduled.</div></div></div>
          <div id="cal_ed_rems" style="margin-top:6px"></div>
          <button class="btn" id="cal_ed_add_rem">${icon('plus', 17)} Add reminder</button>`, 'cal_ed_sec_reminders') +
        card('Additional options', '', `
          <div class="kc-opt" id="cal_ed_opt_confirm"><button class="toggle ${k.autoConfirm ? 'on' : ''}" id="cal_ed_autoconfirm"></button><div><b>Auto-confirm appointments</b><div class="d">Bookings are marked Confirmed straight away. Turn off to review each booking first.</div></div></div>
          <div class="kc-opt"><button class="toggle on" id="cal_ed_allow_resched"></button><div><b>Allow rescheduling</b><div class="d">Contacts can move their appointment using the link in their confirmation.</div></div></div>
          <div class="kc-opt"><button class="toggle on" id="cal_ed_allow_cancel"></button><div><b>Allow cancellation</b><div class="d">Contacts can cancel using the link in their confirmation.</div></div></div>
          <div class="kc-opt"><button class="toggle on"></button><div><b>Send calendar invite</b><div class="d">Adds the appointment to the contact's Google, Outlook or Apple calendar.</div></div></div>`, 'cal_ed_sec_options');
      drawRem();
      $('#cal_ed_add_rem').onclick = () => { const rb = KY.modal({
        title: 'Add reminder',
        body: `<div class="field"><label>Send by</label><div class="kc-chips" id="cal_rem_ch"><button class="on" data-rc="SMS" id="cal_rem_sms">${icon('sms', 16)} SMS</button><button data-rc="Email" id="cal_rem_email">${icon('mail', 16)} Email</button></div></div>
          <div class="kc-g2"><div class="field"><label>When</label><select class="select" id="cal_rem_when">${['15 minutes', '1 hour', '2 hours', '24 hours', '48 hours', '7 days'].map((w) => `<option ${w === '24 hours' ? 'selected' : ''}>${w}</option>`).join('')}</select></div>
            <div class="field"><label>&nbsp;</label><input class="input" value="before the appointment" disabled></div></div>
          <div class="field"><label>Message</label><textarea class="input" rows="4" id="cal_rem_msg">Hi {{contact.first_name}}, a reminder of your {{appointment.title}} at Bloom Dental Studio on {{appointment.start_time}}. Need to change it? Call us on +44 20 7946 0321.</textarea></div>`,
        actions: [{ label: 'Cancel' }, { label: 'Add reminder', primary: true, id: 'cal_rem_save', onClick: (close, b) => {
          rem.push([$('#cal_rem_ch .on', b).dataset.rc, `${$('#cal_rem_when', b).value} before`]); close(); drawRem(); KY.toast('Reminder added');
        } }],
      });
        $$('[data-rc]', rb).forEach((b) => (b.onclick = () => $$('[data-rc]', rb).forEach((x) => x.classList.toggle('on', x === b))));
      };
    }

    if (sec === 'customizations') {
      body.innerHTML = card('Booking widget', 'How your booking page looks to patients.', `
          <div class="field"><label>Layout</label><div class="kc-chips" id="cal_ed_layout"><button class="${k.layout === 'Neo' ? 'on' : ''}" data-l="Neo">Neo</button><button class="${k.layout === 'Classic' ? 'on' : ''}" data-l="Classic">Classic</button></div></div>
          <div class="kc-g2"><div class="field"><label>Primary colour</label><div class="kc-sw" id="cal_ed_wcolors">${['#155eef', '#7a5af8', '#12b76a', '#ee46bc', '#101828'].map((c) => `<button data-wc="${c}" class="${c === (k.wcolor || '#155eef') ? 'on' : ''}" style="background:${c}"></button>`).join('')}</div></div>
            <div class="field"><label>Language</label>${sel('cal_ed_lang', ['English (UK)', 'English (US)', 'Español', 'Français'], 'English (UK)')}</div></div>
          <div class="kc-opt"><button class="toggle on"></button><div><b>Show calendar description</b></div></div>
          <div class="kc-opt"><button class="toggle on"></button><div><b>Show team member photo</b></div></div>`, 'cal_ed_sec_custom') +
        card('Preview', '', `<div id="cal_ed_wpreview">${widget(k)}</div>`);
      $$('[data-l]', body).forEach((b) => (b.onclick = () => { k.layout = b.dataset.l; $$('[data-l]', body).forEach((x) => x.classList.toggle('on', x === b)); }));
      $$('[data-wc]', body).forEach((b) => (b.onclick = () => { k.wcolor = b.dataset.wc; $$('[data-wc]', body).forEach((x) => x.classList.toggle('on', x === b)); $('#cal_ed_wpreview').innerHTML = widget(k); }));
    }

    $$('.toggle', body).forEach((t) => { if (!t.onclick) t.onclick = () => t.classList.toggle('on'); });
    $('#cal_ed_save').onclick = () => { delete k.isNew; KY.toast(`${k.name} saved`); };
    $('#cal_ed_link').onclick = () => KY.toast(`Copied: bloomdental.co.uk/widget/booking/${k.slug || 'untitled'}`);
    $('#cal_ed_preview').onclick = () => preview(k);
  }

  // ---------- Booking widget ----------
  function widget(k, selDay = 29, selSlot = '') {
    const avail = [26, 27, 28, 29, 30, 2, 3, 4, 5, 6];
    const first = 3; // 1 Oct 2026 is a Thursday (Mon-first grid)
    const cells = [...Array(first).fill(''), ...Array.from({ length: 31 }, (_, i) => i + 1)];
    return `<div class="kc-wid" style="--wc:${k.wcolor || k.color}">
      <div class="l"><span style="display:inline-grid;place-items:center;width:42px;height:42px;border-radius:12px;background:var(--wc);color:#fff">${icon('smile', 24)}</span><div class="muted" style="margin-top:12px;font-size:14px">Bloom Dental Studio</div>
        <div class="bold" style="font-size:19px;margin:4px 0 12px">${esc(k.name)}</div>
        <div class="row muted" style="font-size:14px;margin:6px 0">${icon('clock', 16)} ${k.duration} mins</div>
        <div class="row muted" style="font-size:14px;margin:6px 0;align-items:flex-start">${icon('pin', 16)} ${esc(k.location)}</div>
        ${k.pay ? `<div class="row" style="font-size:14px;margin:6px 0;color:#027a48;font-weight:600">${icon('card', 16)} ${money(k.amount || 0)} deposit</div>` : ''}</div>
      <div class="m"><div class="row" style="margin-bottom:12px"><b>October 2026</b><span class="spacer"></span>${icon('left', 18)}${icon('right', 18)}</div>
        <div class="kc-month">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => `<span class="h">${d}</span>`).join('')}
          ${cells.map((d) => `<span class="${d === selDay ? 'sel' : d && avail.includes(d) && d > 20 ? 'av' : d ? 'off' : ''}">${d}</span>`).join('')}</div></div>
      <div class="r"><div class="bold" style="font-size:14px;margin-bottom:10px">Thu 29 Oct</div>
        ${['09:00', '09:30', '11:00', '13:30', '14:00'].map((t) => `<button class="kc-slot ${t === selSlot ? 'on' : ''}" id="cal_pv_slot_${t.replace(':', '')}" data-s="${t}">${t}</button>`).join('')}</div></div>`;
  }

  function preview(k) {
    const box = KY.modal({
      title: `Preview · ${k.name}`, wide: true,
      body: `<div class="row muted" style="font-size:14px;margin:-4px 0 14px">${icon('globe', 16)} bloomdental.co.uk/widget/booking/${esc(k.slug || 'untitled')}</div><div id="cal_pv">${widget(k)}</div>`,
    });
    box.style.width = '960px';
    const wire = () => $$('[data-s]', box).forEach((b) => (b.onclick = () => {
      $('#cal_pv', box).innerHTML = `<div class="kc-wid" style="grid-template-columns:250px 1fr;--wc:${k.wcolor || k.color}">${$('.kc-wid .l', box).outerHTML}
        <div class="m" id="cal_pv_form"><div class="bold" style="font-size:17px;margin-bottom:4px">Your details</div><div class="muted" style="font-size:14px;margin-bottom:14px">Thu 29 Oct 2026 · ${b.dataset.s}</div>
          <div class="kc-g2">${(k.form === 'Default form' ? ['First name', 'Last name', 'Phone', 'Email'] : ['First name', 'Last name', 'Phone', 'Email', 'Date of birth', 'Current dentist']).map((f) => `<div class="field"><label>${f}</label><input class="input"></div>`).join('')}</div>
          ${k.pay ? `<div class="card" style="padding:14px;box-shadow:none;margin-bottom:12px"><div class="row"><b>Payment</b><span class="spacer"></span><b>${money(k.amount || 0, 2)}</b></div>
            <div class="input" style="display:flex;align-items:center;gap:10px;margin-top:10px;color:var(--faint)">${icon('card', 18)} Card number <span class="spacer"></span> MM / YY  CVC</div>
            <div class="muted" style="font-size:12.5px;margin-top:6px">${icon('lock', 12)} Secured by Stripe</div></div>` : ''}
          <button class="btn primary" id="cal_pv_book" style="width:100%;justify-content:center;background:var(--wc);border-color:var(--wc)">${k.pay ? `Pay ${money(k.amount || 0, 2)} and book` : 'Book appointment'}</button></div></div>`;
      $('#cal_pv_book', box).onclick = () => { box.closest('.overlay').remove(); KY.toast('Preview only: no appointment was booked'); };
    }));
    wire();
  }

  // ---------- Connections ----------
  function connections(body) {
    const st = KY.data.calConn = KY.data.calConn || { outlook: false };
    body.innerHTML = `
      <div class="grid" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start">
        <div>
          <div class="card kc-sec" id="cal_conn_list"><div class="card-h"><div><h3>Calendar connections</h3><p class="muted" style="margin:2px 0 0;font-size:14px">Connect your own calendars to Kyntlo. Each team member connects their own.</p></div></div>
            <div class="kc-conn" id="cal_conn_google"><span class="lg" style="color:#4285f4">${icon('google', 26)}</span><div style="flex:1"><b>Google Calendar</b><div class="muted" style="font-size:14px">sarah@bloomdental.co.uk</div></div>
              <span class="chip green">${icon('check', 14)} Connected</span><button class="btn ghost icon sm">${icon('more', 18)}</button></div>
            <div class="kc-conn" id="cal_conn_ms"><span class="lg" style="color:#0f6cbd">${icon('outlook', 26)}</span><div style="flex:1"><b>Outlook / Microsoft 365</b><div class="muted" style="font-size:14px">${st.outlook ? 'sarah.mitchell@outlook.com' : 'Not connected'}</div></div>
              ${st.outlook ? `<span class="chip green">${icon('check', 14)} Connected</span>` : `<button class="btn" id="cal_conn_outlook">${icon('plus', 16)} Connect</button>`}</div>
          </div>
          <div class="card kc-sec"><div class="card-h"><div><h3>Conferencing</h3><p class="muted" style="margin:2px 0 0;font-size:14px">Add video links to online appointments automatically.</p></div></div>
            <div class="kc-conn"><span class="lg" style="color:#00897b">${icon('video2', 24)}</span><div style="flex:1"><b>Google Meet</b><div class="muted" style="font-size:14px">Uses your Google connection</div></div><span class="chip green">${icon('check', 14)} Connected</span></div>
            <div class="kc-conn"><span class="lg" style="color:#2d8cff">${icon('video', 24)}</span><div style="flex:1"><b>Zoom</b><div class="muted" style="font-size:14px">Not connected</div></div><button class="btn" id="cal_conn_zoom">${icon('plus', 16)} Connect</button></div>
          </div>
        </div>
        <div class="card kc-sec" id="cal_conn_config"><div class="card-h"><div><h3>Calendar configuration</h3><p class="muted" style="margin:2px 0 0;font-size:14px">Decide where bookings go, and which calendars block your availability.</p></div></div>
          <div class="card-b">
            <div class="row" style="gap:8px;margin-bottom:6px">${icon('sync', 18)}<b>Linked calendar</b><span class="chip blue">Two-way sync</span></div>
            <p class="muted" style="margin:0 0 10px;font-size:14px">New Kyntlo appointments are added here, and events here block your Kyntlo availability.</p>
            <select class="select" id="cal_conn_linked"><option>sarah@bloomdental.co.uk — Bloom work (Google)</option>${st.outlook ? '<option>sarah.mitchell@outlook.com — Calendar (Outlook)</option>' : ''}</select>
            <div class="row" style="gap:8px;margin:22px 0 6px">${icon('ban', 18)}<b>Conflict calendars</b></div>
            <p class="muted" style="margin:0 0 10px;font-size:14px">Kyntlo checks these for busy times, so nobody can book you when you're already busy. Nothing is written to them.</p>
            <div id="cal_conn_conflicts">
              ${[['Bloom work', 'Google', true], ['Family', 'Google', false], ['UK Holidays', 'Google', false], ...(st.outlook ? [['Calendar', 'Outlook', true]] : [])].map(([n, src, on], i) => `<label class="row" style="padding:9px 0;border-bottom:1px solid var(--line-soft);cursor:pointer"><input type="checkbox" id="cal_conn_cf_${i}" ${on ? 'checked' : ''} style="width:17px;height:17px">
                <span style="color:${src === 'Google' ? '#4285f4' : '#0f6cbd'}">${icon(src === 'Google' ? 'google' : 'outlook', 18)}</span><b style="font-weight:500">${n}</b><span class="muted" style="font-size:14px">· ${src}</span></label>`).join('')}
            </div>
            <div class="row" style="margin-top:16px"><span class="muted" style="font-size:14px">${icon('clock', 14)} Last synced 2 minutes ago</span><span class="spacer"></span><button class="btn primary" id="cal_conn_save">Save</button></div>
          </div></div>
      </div>`;
    $('#cal_conn_save').onclick = () => KY.toast('Calendar configuration saved');
    $('#cal_conn_zoom').onclick = () => KY.toast('Opening Zoom sign-in…');
    if ($('#cal_conn_outlook')) $('#cal_conn_outlook').onclick = () => {
      KY.modal({
        title: 'Connect Outlook / Microsoft 365',
        body: `<div style="text-align:center;padding:10px 0"><span style="color:#0f6cbd">${icon('outlook', 46)}</span>
          <div class="bold" style="font-size:18px;margin:10px 0 4px">Sign in with Microsoft</div>
          <p class="muted" style="margin:0 0 16px">Kyntlo will be able to read your busy times and add appointments to your calendar.</p>
          <input class="input" id="cal_ms_email" value="sarah.mitchell@outlook.com" style="max-width:360px">
          <div class="muted" style="font-size:13px;margin-top:10px">${icon('lock', 13)} You'll be asked to approve calendar access on Microsoft's page.</div></div>`,
        actions: [{ label: 'Cancel' }, { label: 'Allow access', primary: true, id: 'cal_ms_allow', onClick: (close) => {
          st.outlook = true; close(); connections(body); KY.toast('Outlook calendar connected');
        } }],
      });
    };
  }

  KY.screen('calendars', {
    tabs: [{ id: 'calendar', label: 'Calendar View' }, { id: 'appointments', label: 'Appointment List' }, { id: 'settings', label: 'Calendar Settings' }],
    render(view, { tab, params }) {
      css();
      if (tab === 'appointments') return listView(view);
      if (tab === 'settings') return settingsView(view, params);
      return calendarView(view);
    },
  });
})();
