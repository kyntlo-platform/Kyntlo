// Dashboard — mirrors the real Kyntlo dashboard layout (see assets/dashboard-kyntlo-interface.png).
// Widgets read the live demo opportunities, each widget has its own pipeline filter, and edit
// mode lets you add, configure, resize (drag the corner) and rearrange (drag the grip) widgets.
(() => {
  const { esc, icon, money, $, $$ } = KY;
  const D = KY.data.dashboard;
  const data = KY.data;
  let range = 'Last 30 days';
  let board = 'Dashboard';
  let editing = false;
  let backup = null;
  window.KY_ICONS.blank = window.KY_ICONS.blank || '';
  window.KY_ICONS.resize = '<path d="M21 15l-6 6M21 9L9 21"/>';

  const TYPES = {
    status: { title: 'Opportunity status', group: 'Opportunities', pipe: true, h: 360, span: 4, desc: 'Open, won, lost and abandoned deals as a donut chart.' },
    value: { title: 'Opportunity value', group: 'Opportunities', pipe: true, h: 360, span: 4, desc: 'The money in your pipeline, by status.' },
    conversion: { title: 'Conversion rate', group: 'Opportunities', pipe: true, h: 360, span: 4, desc: 'The share of opportunities you won.' },
    funnel: { title: 'Funnel', group: 'Opportunities', pipe: true, h: 320, span: 6, desc: 'How many deals reach each stage.' },
    stages: { title: 'Stage distribution', group: 'Opportunities', pipe: true, h: 320, span: 6, desc: 'Where your open deals are sitting now.' },
    appointments: { title: 'Appointments', group: 'Appointments', h: 320, span: 4, desc: 'Bookings, show rate and what is coming up.' },
    leadsource: { title: 'Lead source report', group: 'Contacts', h: 320, span: 4, desc: 'Where your new contacts came from.' },
    tasks: { title: 'Tasks', group: 'Tasks & activity', h: 320, span: 4, desc: 'Your team’s open tasks, due soonest first.' },
    manual: { title: 'Manual actions', group: 'Tasks & activity', h: 320, span: 4, desc: 'Calls and texts your workflows have queued for a person.' },
    reviews: { title: 'Reviews', group: 'Reputation', h: 320, span: 4, desc: 'Average rating and the latest reviews.' },
  };
  const w = (type, extra = {}) => ({ type, title: TYPES[type].title, span: TYPES[type].span, h: TYPES[type].h, pipe: TYPES[type].pipe ? 'p1' : null, ...extra });
  const BOARDS = {
    Dashboard: [w('status'), w('value'), w('conversion'), w('funnel'), w('stages')],
    'Front Desk': [w('appointments'), w('tasks'), w('manual'), w('stages', { span: 12, h: 300 })],
    'Marketing Performance': [w('leadsource', { span: 6 }), w('conversion', { span: 3, h: 320 }), w('reviews', { span: 3 }), w('funnel', { span: 12 })],
  };
  const SHARE = { Dashboard: 'Everyone', 'Front Desk': 'Everyone', 'Marketing Performance': 'Admins' };

  // ---- live numbers ----
  const pipeName = (id) => (id === 'all' ? 'All pipelines' : (data.pipelines.find((p) => p.id === id) || {}).name || 'All pipelines');
  const opps = (pipe) => data.opportunities.filter((o) => pipe === 'all' || !pipe || o.pipeline === pipe);
  const sum = (list) => list.reduce((a, o) => a + o.value, 0);
  function stats(pipe) {
    const l = opps(pipe);
    const by = (s) => l.filter((o) => o.status === s);
    return {
      total: l.length, open: by('open'), won: by('won'), lost: by('lost'), abandoned: by('abandoned'),
      rate: l.length ? Math.round((by('won').length / l.length) * 100) : 0,
    };
  }
  const short = (n) => (n >= 1000 ? `£${(n / 1000).toFixed(n % 1000 ? 1 : 0)}K` : `£${n}`);

  function donut(wd) {
    const s = stats(wd.pipe);
    const parts = [[s.open.length, '#53b1fd', 'Open'], [s.won.length, '#8098f9', 'Won'], [s.lost.length, '#22ccee', 'Lost'], [s.abandoned.length, '#c7d7fe', 'Abandoned']];
    const total = s.total || 1;
    let acc = 0;
    const r = 70, c = 2 * Math.PI * r;
    const arcs = parts.filter((p) => p[0]).map(([v, col]) => {
      const len = Math.max(0, (v / total) * c - 4);
      const out = `<circle r="${r}" cx="100" cy="100" fill="none" stroke="${col}" stroke-width="22" stroke-dasharray="${len} ${c}" stroke-dashoffset="${-acc}" transform="rotate(-90 100 100)"/>`;
      acc += (v / total) * c;
      return out;
    }).join('');
    return `<div class="row" style="justify-content:space-around;height:100%;flex-wrap:wrap">
      <svg viewBox="0 0 200 200" width="190" height="190">${arcs}<text x="100" y="112" text-anchor="middle" font-size="34" font-weight="600" fill="#101828">${s.total}</text></svg>
      <div>${parts.map(([v, col, n]) => `<div class="row" style="margin:8px 0"><span style="width:30px;height:14px;border-radius:3px;background:${col}"></span>${n} - ${v}</div>`).join('')}</div></div>`;
  }

  function bars(wd) {
    const s = stats(wd.pipe);
    const rows = [['Won', sum(s.won)], ['Lost', sum(s.lost)], ['Open', sum(s.open)], ['Abandoned', sum(s.abandoned)]];
    const top = Math.max(...rows.map((r) => r[1]), 1);
    const step = top > 30000 ? 10000 : top > 12000 ? 5000 : top > 4000 ? 2000 : 1000;
    const max = Math.ceil(top / step) * step;
    const ticks = [0, 1, 2, 3].map((i) => short((max / 3) * i));
    return `<div style="padding:2px 6px 0">${rows.map(([n, v]) => `
      <div class="row" style="margin:13px 0"><span class="muted" style="width:84px;text-align:right;font-size:14px">${n}</span>
        <div style="flex:1;height:12px;border-radius:9px;background:#f2f4f7"><div style="width:${Math.max(1.5, (v / max) * 100)}%;height:100%;border-radius:9px;background:#53b1fd"></div></div>
        <b style="width:74px;text-align:right;font-size:14px">${money(v)}</b></div>`).join('')}
      <div class="row muted" style="justify-content:space-between;font-size:13px;padding:0 84px 0 94px">${ticks.map((t) => `<span>${t}</span>`).join('')}</div>
      <div style="text-align:center;margin-top:14px"><div class="muted" style="font-size:14px">Total value</div><div style="font-size:24px;font-weight:700" class="dw-total">${money(sum(opps(wd.pipe)))}</div></div></div>`;
  }

  function dial(wd) {
    const s = stats(wd.pipe);
    const r = 80, c = 2 * Math.PI * r;
    return `<div style="text-align:center"><svg viewBox="0 0 200 200" width="172" height="172">
        <circle r="${r}" cx="100" cy="100" fill="none" stroke="#e8edfb" stroke-width="14"/>
        <circle r="${r}" cx="100" cy="100" fill="none" stroke="#53b1fd" stroke-width="14" stroke-linecap="round" stroke-dasharray="${(s.rate / 100) * c} ${c}" transform="rotate(-90 100 100)"/>
        <text x="100" y="112" text-anchor="middle" font-size="34" font-weight="500" fill="#101828">${s.rate}%</text></svg>
      <div class="muted" style="font-size:14px">Won revenue</div><div style="font-size:24px;font-weight:700" class="dw-won">${money(sum(s.won))}</div></div>`;
  }

  const visibleStages = (p, key) => p.stages.map((s, i) => [s, i]).filter(([, i]) => !p[key] || p[key][i] !== false);
  function funnel(wd) {
    const p = data.pipelines.find((x) => x.id === wd.pipe) || data.pipelines[0];
    const l = opps(p.id);
    const st = visibleStages(p, 'funnel');
    const counts = st.map(([, i]) => l.filter((o) => o.stage >= i).length);
    const max = Math.max(counts[0] || 1, 1);
    return st.map(([name], k) => `<div class="row" style="margin:6px 0"><span style="width:180px;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" class="muted">${esc(name)}</span>
      <div style="flex:1"><div style="width:${Math.max(2, (counts[k] / max) * 100)}%;height:22px;border-radius:4px;background:linear-gradient(90deg,#53b1fd,#8098f9)"></div></div>
      <b style="width:34px;text-align:right">${counts[k]}</b><span class="muted" style="width:46px;text-align:right;font-size:13px">${k ? Math.round((counts[k] / (counts[k - 1] || 1)) * 100) + '%' : ''}</span></div>`).join('')
      + (wd.pipe === 'all' ? '<div class="faint" style="font-size:13px;margin-top:6px">Showing the Patient Journey stages. Pick a pipeline in the filter.</div>' : '');
  }

  function stagesW(wd) {
    const p = data.pipelines.find((x) => x.id === wd.pipe) || data.pipelines[0];
    const open = opps(p.id).filter((o) => o.status === 'open');
    const st = visibleStages(p, 'pie');
    const max = Math.max(1, ...st.map(([, i]) => open.filter((o) => o.stage === i).length));
    return `<div class="row" style="align-items:flex-end;gap:18px;height:100%;padding:0 10px">${st.map(([s, i]) => {
      const n = open.filter((o) => o.stage === i).length;
      return `<div style="flex:1;min-width:0;text-align:center"><b>${n}</b><div style="height:${(n / max) * 120 + 6}px;border-radius:6px 6px 0 0;background:#22ccee;margin-top:6px"></div>
        <div class="muted" style="font-size:13px;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(s)}</div></div>`;
    }).join('')}</div>`;
  }

  function leadsource() {
    const src = {};
    data.contacts.forEach((c) => (src[c.source] = (src[c.source] || 0) + 1));
    const rows = Object.entries(src).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const max = rows[0][1];
    return rows.map(([s, n]) => `<div class="row" style="margin:9px 0"><span style="width:130px;font-size:14px">${esc(s)}</span>
      <div style="flex:1"><div style="width:${(n / max) * 100}%;height:14px;border-radius:4px;background:#8098f9"></div></div><b style="width:24px;text-align:right">${n}</b></div>`).join('');
  }
  function appointments() {
    const up = data.appointments.filter((a) => a.status !== 'noshow').slice(0, 3);
    return `<div class="row" style="gap:0;margin:-6px -8px 4px"><div class="stat" style="flex:1"><div class="k">Booked</div><div class="v">${D.appointments}</div></div>
        <div class="stat" style="flex:1"><div class="k">Show rate</div><div class="v">${D.showRate}</div></div></div>
      ${up.map((a) => { const c = data.contacts.find((x) => x.id === a.contact); const k = data.calendars.find((x) => x.id === a.calendar);
        return `<div class="row" style="margin:8px 0;font-size:14px"><span style="width:8px;height:8px;border-radius:50%;background:${k.color}"></span><b style="flex:1">${esc(c.name)}</b><span class="muted">${esc(data.week[a.day])} · ${a.start}</span></div>`; }).join('')}`;
  }
  const tasks = () => [['Call Olivia Bennett about Invisalign', 'Today'], ['Send treatment plan to Ethan Walker', 'Tomorrow'], ['Follow up on overdue invoice INV-1045', 'Overdue']]
    .map(([t, d]) => `<div class="row" style="margin:12px 0;font-size:15px"><input type="checkbox"><span style="flex:1">${esc(t)}</span><span class="chip ${d === 'Overdue' ? 'red' : d === 'Today' ? 'amber' : ''}">${d}</span></div>`).join('');
  const manual = () => `<div class="row" style="gap:0;margin:-6px -8px 6px"><div class="stat" style="flex:1"><div class="k">Calls</div><div class="v">3</div></div><div class="stat" style="flex:1"><div class="k">SMS</div><div class="v">2</div></div></div>
      <p class="muted" style="font-size:14px;margin:0 0 14px">Queued by your workflows for a team member to complete.</p><button class="btn sm primary">${icon('play', 14)} Start calling</button>`;
  function reviews() {
    const r = data.reviews;
    const avg = (r.reduce((a, x) => a + x.rating, 0) / r.length).toFixed(1);
    return `<div class="row"><div style="font-size:34px;font-weight:700">${avg}</div><div style="color:#fdb022;font-size:24px;letter-spacing:2px">★★★★★</div></div>
      <div class="muted" style="font-size:14px;margin-bottom:8px">${r.length} reviews in this period</div>
      ${r.slice(0, 2).map((x) => `<div style="font-size:14px;margin:8px 0"><b>${esc(x.name)}</b> <span class="muted">· ${esc(x.source)}</span><div class="muted" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(x.text)}</div></div>`).join('')}`;
  }
  const RENDER = { status: donut, value: bars, conversion: dial, funnel, stages: stagesW, leadsource, appointments, tasks, manual, reviews };

  function css() {
    if ($('#css-dashboard')) return;
    const s = document.createElement('style');
    s.id = 'css-dashboard';
    s.textContent = `
      #toasts { pointer-events: none; }
      .dw-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 20px; align-items: start; }
      .dw { position: relative; display: flex; flex-direction: column; min-width: 0; transition: box-shadow .15s, outline-color .15s; }
      .dw .card-b { flex: 1; min-height: 0; overflow: hidden; }
      .dw.edit { outline: 2px dashed #84adff; outline-offset: -2px; }
      .dw.target { outline: 3px solid var(--blue); }
      .dw.lifted { opacity: .35; }
      .dw-grip { cursor: grab; color: var(--faint); display: grid; place-items: center; width: 28px; height: 32px; border-radius: 6px; margin-left: -8px; }
      .dw-grip:hover { background: #f2f4f7; color: var(--ink-2); }
      .dw-resize { position: absolute; right: 2px; bottom: 2px; width: 26px; height: 26px; display: grid; place-items: center; color: var(--blue); cursor: nwse-resize; border-radius: 6px; background: #fff; }
      .dw-resize:hover { background: var(--blue-soft); }
      .dw-ghost { position: fixed; z-index: 70; pointer-events: none; background: #fff; transform: rotate(1.5deg); box-shadow: 0 20px 40px rgba(16,24,40,.28); }
      .dw-size { position: absolute; right: 34px; bottom: 6px; font-size: 12px; font-weight: 700; color: var(--blue); background: var(--blue-soft); border-radius: 6px; padding: 2px 8px; }
      .dw-dd { justify-content: space-between; width: 100%; font-weight: 500; color: var(--ink); }
      .dw-lib-row { display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid var(--line-soft); border-radius: 10px; margin-bottom: 10px; }
      .dw-lib-row .ic { width: 40px; height: 40px; border-radius: 8px; background: var(--blue-soft); color: var(--blue); display: grid; place-items: center; flex: none; }
      .dw-empty { grid-column: span 12; border: 2px dashed var(--line); border-radius: 12px; padding: 70px 20px; text-align: center; color: var(--muted); background: #fff; }
    `;
    document.head.appendChild(s);
  }

  const ids = {};
  function widgetHtml(wd, i) {
    const t = TYPES[wd.type];
    const id = wd.id || (ids[wd.type] ? `w_${wd.type}_${++ids[wd.type]}` : (ids[wd.type] = 1, `w_${wd.type}`));
    wd.id = id;
    return `<div class="card dw ${editing ? 'edit' : ''}" id="${id}" data-i="${i}" style="grid-column:span ${wd.span};height:${wd.h}px">
      <div class="card-h">${editing ? `<span class="dw-grip" id="dw_grip_${i}" title="Drag to move">${icon('grip', 20)}</span>` : ''}
        <h3 style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(wd.title)}</h3><span class="spacer"></span>
        ${t.pipe && !editing ? `<button class="btn sm w-filter" data-i="${i}" id="${id}_filter">${esc(pipeName(wd.pipe))} ${icon('chevron', 16)}</button>` : ''}
        ${editing ? `<button class="btn ghost icon sm" data-cfg="${i}" id="dw_cfg_${i}" title="Edit widget">${icon('edit', 18)}</button>
                    <button class="btn ghost icon sm" data-more="${i}" id="dw_more_${i}" title="More">${icon('more', 18)}</button>`
                  : `<button class="btn ghost icon sm" title="Filters">${icon('filter', 18)}</button>`}</div>
      <div class="card-b">${RENDER[wd.type](wd)}</div>
      ${editing ? `<span class="dw-resize" id="dw_resize_${i}" title="Drag to resize">${icon('resize', 18)}</span>` : ''}</div>`;
  }

  const dd = (id, value) => `<button type="button" class="btn dw-dd" id="${id}" data-value="${esc(value)}"><span>${esc(value)}</span>${icon('chevron', 16)}</button>`;
  function wireDd(root, id, options, onChange) {
    const b = $('#' + id, root);
    b.onclick = (e) => {
      e.stopPropagation();
      const m = KY.menu(b, options.map((o) => ({ label: o, icon: o === b.dataset.value ? 'check' : 'blank', onClick: () => { b.dataset.value = o; b.querySelector('span').textContent = o; onChange?.(o); } })));
      m.style.minWidth = b.offsetWidth + 'px';
    };
  }

  function draw(view) {
    css();
    Object.keys(ids).forEach((k) => delete ids[k]);
    const list = BOARDS[board];
    list.forEach((x) => delete x.id);
    view.innerHTML = `
      <div class="row" style="margin-bottom:20px">
        <div class="card row" style="gap:0;box-shadow:none">
          <button class="btn ghost" id="dash_switch" style="height:46px">${esc(board)} ${icon('chevron', 18)}</button>
          <span style="width:1px;align-self:stretch;background:var(--line)"></span>
          <button class="btn ghost" id="dash_new" style="height:46px;color:var(--blue)">${icon('plus', 18)} New</button>
        </div>
        ${editing ? `<span class="chip blue" style="height:30px;margin-left:6px">${icon('edit', 14)} Editing — drag ${icon('grip', 14)} to move, drag the corner to resize</span>` : ''}
        <span class="spacer"></span>
        ${editing ? `<button class="btn" id="dash_add" style="height:46px">${icon('plus', 18)} Add widget</button>
                     <button class="btn" id="dash_cancel" style="height:46px">Cancel</button>
                     <button class="btn primary" id="dash_save" style="height:46px">Save</button>` : `
        <button class="btn" id="dash_range" style="height:46px">${icon('calendar', 18)} ${esc(range)} ${icon('chevron', 18)}</button>
        <button class="btn icon" id="dash_edit" style="height:46px;width:46px" title="Edit dashboard">${icon('edit', 18)}</button>
        <button class="btn ghost icon" id="dash_more" style="height:46px">${icon('more', 18)}</button>`}
      </div>
      <div class="card" style="padding:20px;background:#f9fafb;box-shadow:none;border-color:var(--line-soft)">
        <div class="dw-grid" id="dash_grid">
          ${list.map(widgetHtml).join('') || `<div class="dw-empty" id="dash_empty"><div class="bold" style="font-size:19px;color:var(--ink)">This dashboard is empty</div>
            <div style="margin:6px 0 16px">Add widgets to see the numbers that matter to this team.</div>
            ${editing ? `<button class="btn primary" id="dash_add2">${icon('plus', 18)} Add widget</button>` : ''}</div>`}
        </div>
      </div>`;
    wire(view);
  }

  function wire(view) {
    const list = BOARDS[board];
    $('#dash_switch').onclick = (e) => KY.menu(e.currentTarget, Object.keys(BOARDS)
      .map((b) => ({ label: b, icon: b === board ? 'check' : 'blank', onClick: () => { board = b; editing = false; draw(view); } })));
    $('#dash_new').onclick = () => newDashboard(view);
    if (!editing) {
      $('#dash_range').onclick = (e) => KY.menu(e.currentTarget, ['Today', 'Last 7 days', 'Last 30 days', 'This month', 'Last 90 days', 'Custom range']
        .map((r) => ({ label: r, icon: r === range ? 'check' : 'blank', onClick: () => { range = r; draw(view); } })));
      $('#dash_edit').onclick = () => { backup = JSON.parse(JSON.stringify(list)); editing = true; draw(view); };
      $('#dash_more').onclick = (e) => KY.menu(e.currentTarget, [
        { label: 'Duplicate dashboard', icon: 'copy', onClick: () => { const n = `${board} (copy)`; BOARDS[n] = JSON.parse(JSON.stringify(list)); board = n; draw(view); KY.toast('Dashboard duplicated'); } },
        { label: `Sharing: ${SHARE[board] || 'Only me'}`, icon: 'users', onClick: () => shareModal(view) },
        { label: 'Set as my default', icon: 'star', onClick: () => KY.toast(`“${board}” is now your default dashboard`) },
      ]);
      $$('.w-filter', view).forEach((b) => (b.onclick = () => KY.menu(b, ['all', ...data.pipelines.map((p) => p.id)]
        .map((p) => ({ label: pipeName(p), icon: p === list[b.dataset.i].pipe ? 'check' : 'blank', onClick: () => { list[b.dataset.i].pipe = p; draw(view); } })))));
      return;
    }
    const openLib = () => library(view);
    $('#dash_add').onclick = openLib;
    if ($('#dash_add2')) $('#dash_add2').onclick = openLib;
    $('#dash_cancel').onclick = () => { if (backup) BOARDS[board] = backup; editing = false; draw(view); };
    $('#dash_save').onclick = () => { editing = false; backup = null; draw(view); KY.toast('Dashboard saved'); };
    $$('[data-cfg]', view).forEach((b) => (b.onclick = () => settings(view, list[b.dataset.cfg])));
    $$('[data-more]', view).forEach((b) => (b.onclick = () => {
      const i = +b.dataset.more;
      KY.menu(b, [
        { label: 'Edit widget', icon: 'edit', onClick: () => settings(view, list[i]) },
        { label: 'Duplicate', icon: 'copy', onClick: () => { const c = { ...list[i] }; delete c.id; list.splice(i + 1, 0, c); draw(view); } },
        { label: 'Delete', icon: 'trash', onClick: () => { list.splice(i, 1); draw(view); KY.toast('Widget removed'); } },
      ]);
    }));
    $$('.dw-resize', view).forEach((h) => h.addEventListener('mousedown', (e) => resize(e, view)));
    $$('.dw-grip', view).forEach((g) => g.addEventListener('mousedown', (e) => arrange(e, view)));
  }

  // Drag the bottom-right corner: width snaps to the 12-column grid, height to 20px steps.
  function resize(e, view) {
    e.preventDefault();
    const el = e.currentTarget.closest('.dw');
    const wd = BOARDS[board][+el.dataset.i];
    const grid = $('#dash_grid');
    const col = (grid.clientWidth + 20) / 12;
    const [x0, y0, s0, h0] = [e.clientX, e.clientY, wd.span, wd.h];
    const badge = document.createElement('span');
    badge.className = 'dw-size';
    el.appendChild(badge);
    const move = (ev) => {
      wd.span = Math.max(3, Math.min(12, Math.round(s0 + (ev.clientX - x0) / col)));
      wd.h = Math.max(240, Math.min(640, Math.round((h0 + ev.clientY - y0) / 20) * 20));
      el.style.gridColumn = `span ${wd.span}`;
      el.style.height = wd.h + 'px';
      badge.textContent = `${wd.span} / 12 columns`;
    };
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); draw(view); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  // Drag the grip: the widget follows the mouse and drops before/after the widget underneath.
  function arrange(e, view) {
    e.preventDefault();
    const el = e.currentTarget.closest('.dw');
    const list = BOARDS[board];
    const from = +el.dataset.i;
    const r = el.getBoundingClientRect();
    const [dx, dy] = [e.clientX - r.left, e.clientY - r.top];
    const ghost = el.cloneNode(true);
    ghost.removeAttribute('id');
    ghost.className = 'card dw dw-ghost';
    Object.assign(ghost.style, { width: r.width + 'px', height: r.height + 'px', left: r.left + 'px', top: r.top + 'px' });
    document.body.appendChild(ghost);
    el.classList.add('lifted');
    let target = null, after = false;
    const move = (ev) => {
      ghost.style.left = ev.clientX - dx + 'px';
      ghost.style.top = ev.clientY - dy + 'px';
      const under = $$('.dw-grid > .dw', view).find((x) => { const b = x.getBoundingClientRect(); return x !== el && ev.clientX >= b.left && ev.clientX <= b.right && ev.clientY >= b.top && ev.clientY <= b.bottom; });
      $$('.dw.target', view).forEach((x) => x.classList.remove('target'));
      target = under || null;
      if (under) { under.classList.add('target'); const b = under.getBoundingClientRect(); after = ev.clientX > b.left + b.width / 2; }
    };
    const up = () => {
      document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up);
      ghost.remove();
      if (target) {
        const [item] = list.splice(from, 1);
        let to = +target.dataset.i;
        if (to > from) to -= 1;
        list.splice(after ? to + 1 : to, 0, item);
      }
      draw(view);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  function library(view) {
    const groups = {};
    Object.entries(TYPES).forEach(([k, t]) => (groups[t.group] = groups[t.group] || []).push([k, t]));
    const icons = { Opportunities: 'pipeline', Appointments: 'calendar', Contacts: 'contacts', 'Tasks & activity': 'task', Reputation: 'star' };
    const box = KY.modal({
      title: 'Add widget', drawer: true,
      body: `<div class="search" style="margin-bottom:16px"><span>${icon('search', 18)}</span><input class="input" placeholder="Search widgets"></div>
        ${Object.entries(groups).map(([g, items]) => `<div class="bold" style="margin:16px 0 10px">${esc(g)}</div>
          ${items.map(([k, t]) => `<div class="dw-lib-row"><span class="ic">${icon(icons[g], 20)}</span>
            <div style="flex:1"><div class="bold">${esc(t.title)}</div><div class="muted" style="font-size:14px">${esc(t.desc)}</div></div>
            <button class="btn sm" id="dw_add_${k}" data-w="${k}">${icon('plus', 16)} Add</button></div>`).join('')}`).join('')}`,
    });
    $$('[data-w]', box).forEach((b) => (b.onclick = () => {
      BOARDS[board].push(w(b.dataset.w));
      box.remove(); $$('.overlay').forEach((o) => o.remove());
      draw(view);
    }));
  }

  function settings(view, wd) {
    const t = TYPES[wd.type];
    const box = KY.modal({
      title: 'Edit widget', drawer: true,
      body: `<div class="field"><label>Widget name</label><input class="input" id="ws_name" value="${esc(wd.title)}"></div>
        ${t.pipe ? `<div class="field"><label>Pipeline</label>${dd('ws_pipeline', pipeName(wd.pipe))}</div>` : ''}
        <div class="field"><label>Date range</label>${dd('ws_range', 'Use dashboard date range')}</div>
        <div class="field"><label>Assigned user</label>${dd('ws_user', 'All users')}</div>
        <div class="field"><label>Width</label>${dd('ws_width', `${wd.span} of 12 columns`)}</div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'ws_save', onClick: (close, b) => {
        wd.title = $('#ws_name', b).value || wd.title;
        if (t.pipe) { const n = $('#ws_pipeline', b).dataset.value; wd.pipe = n === 'All pipelines' ? 'all' : data.pipelines.find((p) => p.name === n).id; }
        wd.span = parseInt($('#ws_width', b).dataset.value, 10);
        close(); draw(view);
      } }],
    });
    if (t.pipe) wireDd(box, 'ws_pipeline', ['All pipelines', ...data.pipelines.map((p) => p.name)]);
    wireDd(box, 'ws_range', ['Use dashboard date range', 'Today', 'Last 7 days', 'Last 30 days', 'This month', 'Last 90 days']);
    wireDd(box, 'ws_user', ['All users', ...data.team.map((m) => m.name)]);
    wireDd(box, 'ws_width', [3, 4, 5, 6, 8, 12].map((n) => `${n} of 12 columns`));
  }

  function newDashboard(view) {
    const box = KY.modal({
      title: 'Create dashboard',
      body: `<div class="field"><label>Dashboard name</label><input class="input" id="nd_name" placeholder="e.g. Front Desk"></div>
             <div class="field"><label>Start from</label>${dd('nd_from', 'Blank dashboard')}</div>
             <div class="field"><label>Who can see it</label>${dd('nd_share', 'Only me')}</div>
             <p class="muted" style="font-size:14px;margin:0">Dashboards are shared views — each person can still pick their own default.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Create', primary: true, id: 'nd_create', onClick: (close, b) => {
        const name = $('#nd_name', b).value.trim() || 'New Dashboard';
        BOARDS[name] = $('#nd_from', b).dataset.value === 'Blank dashboard' ? [] : JSON.parse(JSON.stringify(BOARDS[board]));
        SHARE[name] = $('#nd_share', b).dataset.value;
        board = name; backup = []; close(); editing = true; draw(view); KY.toast('Dashboard created');
      } }],
    });
    wireDd(box, 'nd_from', ['Blank dashboard', 'Copy of current dashboard']);
    wireDd(box, 'nd_share', ['Only me', 'Everyone', 'Admins', 'Specific users']);
  }

  function shareModal(view) {
    const box = KY.modal({
      title: `Share “${board}”`,
      body: `<div class="field"><label>Who can see this dashboard</label>${dd('ds_share', SHARE[board] || 'Only me')}</div>
        ${data.team.map((m) => `<div class="row" style="margin:10px 0">${KY.avatar(m.name, 30)}<span style="flex:1">${esc(m.name)} <span class="muted">· ${m.role}</span></span><span class="chip">${m.role === 'Admin' ? 'Can edit' : 'Can view'}</span></div>`).join('')}`,
      actions: [{ label: 'Done', primary: true, id: 'ds_done', onClick: (close, b) => { SHARE[board] = $('#ds_share', b).dataset.value; close(); KY.toast('Sharing updated'); } }],
    });
    wireDd(box, 'ds_share', ['Only me', 'Everyone', 'Admins', 'Specific users']);
  }

  KY.screen('dashboard', { render: draw });
})();
