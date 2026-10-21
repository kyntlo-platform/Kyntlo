// Dashboard — mirrors the real Kyntlo dashboard layout (see assets/dashboard-kyntlo-interface.png).
(() => {
  const { esc, icon, money, $, $$ } = KY;
  const D = KY.data.dashboard;
  let range = 'Last 30 days';
  let board = 'Dashboard';
  let editing = false;
  const extra = [];

  function donut() {
    const parts = [[D.status.open, '#53b1fd', 'Open'], [D.status.won, '#8098f9', 'Won'], [D.status.lost, '#22ccee', 'Lost'], [D.status.abandoned, '#c7d7fe', 'Abandoned']];
    const total = parts.reduce((a, p) => a + p[0], 0);
    let acc = 0;
    const r = 70, c = 2 * Math.PI * r;
    const arcs = parts.filter((p) => p[0]).map(([v, col]) => {
      const len = (v / total) * c - 4;
      const s = `<circle r="${r}" cx="100" cy="100" fill="none" stroke="${col}" stroke-width="22" stroke-dasharray="${len} ${c}" stroke-dashoffset="${-acc}" transform="rotate(-90 100 100)"/>`;
      acc += (v / total) * c;
      return s;
    }).join('');
    return `<div class="row" style="justify-content:space-around;height:100%">
      <svg viewBox="0 0 200 200" width="200" height="200">${arcs}<text x="100" y="112" text-anchor="middle" font-size="34" font-weight="600" fill="#101828">${total}</text></svg>
      <div>${parts.map(([v, col, n]) => `<div class="row" style="margin:8px 0"><span style="width:30px;height:14px;border-radius:3px;background:${col}"></span>${n} - ${v}</div>`).join('')}</div></div>`;
  }

  function bars() {
    const rows = [['Won', D.revenue.won], ['Lost', D.revenue.lost], ['Open', D.revenue.open]];
    const max = 18000;
    return `<div style="padding:10px 6px 0">${rows.map(([n, v]) => `
      <div class="row" style="margin:18px 0"><span class="muted" style="width:56px;text-align:right;font-size:14px">${n}</span>
        <div style="flex:1;height:12px;border-radius:9px;background:#f2f4f7"><div style="width:${Math.max(2, (v / max) * 100)}%;height:100%;border-radius:9px;background:#53b1fd"></div></div></div>`).join('')}
      <div class="row muted" style="justify-content:space-between;font-size:13px;padding-left:66px"><span>£0</span><span>£5K</span><span>£10K</span><span>£15K</span></div>
      <div style="text-align:center;margin-top:18px"><div class="muted" style="font-size:14px">Total revenue</div><div style="font-size:24px;font-weight:700">${money(D.revenue.open + D.revenue.won)}</div></div></div>`;
  }

  function dial() {
    const pct = parseInt(D.conversion, 10);
    const r = 80, c = 2 * Math.PI * r;
    return `<div style="text-align:center"><svg viewBox="0 0 200 200" width="180" height="180">
        <circle r="${r}" cx="100" cy="100" fill="none" stroke="#e8edfb" stroke-width="14"/>
        <circle r="${r}" cx="100" cy="100" fill="none" stroke="#53b1fd" stroke-width="14" stroke-linecap="round" stroke-dasharray="${(pct / 100) * c} ${c}" transform="rotate(-90 100 100)"/>
        <text x="100" y="112" text-anchor="middle" font-size="34" font-weight="500" fill="#101828">${pct}%</text></svg>
      <div class="muted" style="font-size:14px">Won revenue</div><div style="font-size:24px;font-weight:700">${money(D.revenue.won)}</div></div>`;
  }

  function funnel() {
    const labels = KY.data.pipelines[0].stages;
    const max = D.funnel[0];
    return labels.map((l, i) => `<div class="row" style="margin:7px 0"><span style="width:190px;font-size:14px" class="muted">${esc(l)}</span>
      <div style="flex:1"><div style="width:${(D.funnel[i] / max) * 100}%;height:22px;border-radius:4px;background:linear-gradient(90deg,#53b1fd,#8098f9)"></div></div>
      <b style="width:40px;text-align:right">${D.funnel[i]}</b></div>`).join('');
  }

  function stages() {
    const opp = KY.data.opportunities.filter((o) => o.pipeline === 'p1' && o.status === 'open');
    const st = KY.data.pipelines[0].stages.slice(0, 4);
    return `<div class="row" style="align-items:flex-end;gap:26px;height:150px;padding:0 20px">${st.map((s, i) => {
      const n = opp.filter((o) => o.stage === i).length;
      return `<div style="flex:1;text-align:center"><b>${n}</b><div style="height:${n * 40 + 6}px;border-radius:6px 6px 0 0;background:#22ccee;margin-top:6px"></div><div class="muted" style="font-size:13px;margin-top:6px">${esc(s)}</div></div>`;
    }).join('')}</div>`;
  }

  const LIBRARY = {
    'Lead source report': () => {
      const src = {};
      KY.data.contacts.forEach((c) => (src[c.source] = (src[c.source] || 0) + 1));
      return Object.entries(src).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([s, n]) =>
        `<div class="row" style="margin:8px 0"><span style="flex:1">${esc(s)}</span><b>${n}</b></div>`).join('');
    },
    'Appointments': () => `<div class="row" style="justify-content:space-around;padding:20px 0">
        <div class="stat"><div class="k">Booked</div><div class="v">${D.appointments}</div></div>
        <div class="stat"><div class="k">Show rate</div><div class="v">${D.showRate}</div></div></div>`,
    'Tasks': () => ['Call Olivia Bennett about Invisalign', 'Send treatment plan to Ethan Walker', 'Follow up on overdue invoice INV-1045']
      .map((t) => `<div class="row" style="margin:10px 0"><input type="checkbox"> ${esc(t)}</div>`).join(''),
  };

  const widget = (title, filter, body, h = 520, id = '') => `
    <div class="card" style="height:${h}px;display:flex;flex-direction:column" ${id ? `id="${id}"` : ''}>
      <div class="card-h"><h3>${esc(title)}</h3><span class="spacer"></span>
        ${filter ? `<button class="btn sm w-filter">${esc(filter)} ${icon('chevron', 16)}</button>` : ''}
        <button class="btn ghost icon sm">${icon(editing ? 'trash' : 'filter', 18)}</button></div>
      <div class="card-b" style="flex:1">${body}</div></div>`;

  function draw(view) {
    view.innerHTML = `
      <div class="row" style="margin-bottom:20px">
        <div class="card row" style="gap:0;box-shadow:none">
          <button class="btn ghost" id="dash_switch" style="height:46px">${esc(board)} ${icon('chevron', 18)}</button>
          <span style="width:1px;align-self:stretch;background:var(--line)"></span>
          <button class="btn ghost" id="dash_new" style="height:46px;color:var(--blue)">${icon('plus', 18)} New</button>
        </div>
        <span class="spacer"></span>
        ${editing ? `<button class="btn" id="dash_add">${icon('plus', 18)} Add widget</button><button class="btn primary" id="dash_save">Save</button>` : ''}
        <button class="btn" id="dash_range" style="height:46px">${icon('calendar', 18)} ${esc(range)} ${icon('chevron', 18)}</button>
        <button class="btn icon" id="dash_edit" style="height:46px;width:46px" title="Edit dashboard">${icon('edit', 18)}</button>
        <button class="btn ghost icon" style="height:46px">${icon('more', 18)}</button>
      </div>
      <div class="card" style="padding:20px;background:#f9fafb;box-shadow:none;border-color:var(--line-soft)">
        <div class="grid" style="grid-template-columns:1.2fr 1fr .85fr">
          ${widget('Opportunity status', 'All pipelines', donut(), 360, 'w_status')}
          ${widget('Opportunity value', 'Patient Journey', bars(), 360, 'w_value')}
          ${widget('Conversion rate', 'All pipelines', dial(), 360, 'w_conversion')}
        </div>
        <div class="grid" style="grid-template-columns:1fr 1fr;margin-top:20px">
          ${widget('Funnel', 'Patient Journey', funnel(), 300, 'w_funnel')}
          ${widget('Stage distribution', 'Patient Journey', stages(), 300, 'w_stages')}
        </div>
        ${extra.length ? `<div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:20px">${extra.map((n, i) => widget(n, '', LIBRARY[n](), 260, `w_extra${i}`)).join('')}</div>` : ''}
      </div>`;

    $('#dash_range').onclick = (e) => KY.menu(e.currentTarget, ['Today', 'Last 7 days', 'Last 30 days', 'This month', 'Last 90 days', 'Custom range']
      .map((r) => ({ label: r, onClick: () => { range = r; draw(view); } })));
    $('#dash_switch').onclick = (e) => KY.menu(e.currentTarget, ['Dashboard', 'Front Desk', 'Marketing Performance']
      .map((b) => ({ label: b, onClick: () => { board = b; draw(view); } })));
    $('#dash_new').onclick = () => KY.modal({
      title: 'Create dashboard',
      body: `<div class="field"><label>Dashboard name</label><input class="input" id="nd_name" placeholder="e.g. Front Desk"></div>
             <div class="field"><label>Start from</label><select class="select"><option>Blank dashboard</option><option>Copy of current dashboard</option></select></div>
             <div class="field"><label>Who can see it</label><select class="select"><option>Everyone</option><option>Only me</option><option>Admins</option></select></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Create', primary: true, id: 'nd_create', onClick: (close, box) => {
        board = $('#nd_name', box).value || 'New Dashboard'; close(); editing = true; draw(view); KY.toast('Dashboard created');
      } }],
    });
    $('#dash_edit').onclick = () => { editing = !editing; draw(view); };
    const add = $('#dash_add');
    if (add) add.onclick = () => {
      const box = KY.modal({
        title: 'Add widget', wide: true,
        body: `<div class="grid" style="grid-template-columns:repeat(3,1fr)">${Object.keys(LIBRARY).map((n) => `
          <div class="card" style="padding:18px;box-shadow:none"><div class="bold">${esc(n)}</div>
          <div class="muted" style="font-size:14px;margin:6px 0 14px">Add a ${esc(n.toLowerCase())} widget to this dashboard.</div>
          <button class="btn sm primary" data-w="${esc(n)}">${icon('plus', 16)} Add</button></div>`).join('')}</div>`,
      });
      $$('[data-w]', box).forEach((b) => (b.onclick = () => {
        if (!extra.includes(b.dataset.w)) extra.push(b.dataset.w);
        box.closest('.overlay').remove(); draw(view); KY.toast(`${b.dataset.w} added`);
      }));
    };
    const save = $('#dash_save');
    if (save) save.onclick = () => { editing = false; draw(view); KY.toast('Dashboard saved'); };
    $$('.w-filter', view).forEach((b) => (b.onclick = () => KY.menu(b, ['All pipelines', ...KY.data.pipelines.map((p) => p.name)]
      .map((p) => ({ label: p, onClick: () => { b.firstChild.textContent = p + ' '; } })))));
  }

  KY.screen('dashboard', { render: draw });
})();
