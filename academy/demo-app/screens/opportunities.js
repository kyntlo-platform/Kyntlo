// Opportunities — HighLevel's pipeline board: pipeline switcher, board/list views,
// search & filters, stage columns, opportunity cards, drag-and-drop, add/edit modal,
// bulk actions (list view) and the Pipelines tab (create/edit pipelines, reorder stages).
(() => {
  const { esc, icon, money, $, $$, avatar } = KY;
  const data = KY.data;

  // ---- Extra demo data for this screen (kept consistent with data.js) ----
  const extraOpps = [
    { id: 'o13', name: 'Noah Williams — Check-up', contact: 'c6', pipeline: 'p1', stage: 0, value: 90, status: 'open', owner: 'Priya Shah', source: 'Phone Call' },
    { id: 'o14', name: 'Mia Harris — Whitening', contact: 'c13', pipeline: 'p1', stage: 4, value: 450, status: 'won', owner: 'Sarah Mitchell', source: 'Website Form' },
    { id: 'o15', name: 'Oliver King — Check-up', contact: 'c14', pipeline: 'p1', stage: 2, value: 90, status: 'abandoned', owner: 'James Okafor', source: 'Phone Call' },
    { id: 'o16', name: 'Jack Morris — Whitening', contact: 'c18', pipeline: 'p1', stage: 3, value: 450, status: 'lost', owner: 'Priya Shah', source: 'Instagram', lostReason: 'Price too high' },
    { id: 'o17', name: 'Olivia Bennett — Aligners', contact: 'c1', pipeline: 'p2', stage: 0, value: 3200, status: 'open', owner: 'Sarah Mitchell', source: 'Facebook Ad' },
    { id: 'o18', name: 'Sophie Turner — Aligners', contact: 'c5', pipeline: 'p2', stage: 1, value: 3200, status: 'open', owner: 'Sarah Mitchell', source: 'Google Ad' },
    { id: 'o19', name: 'Isla Thompson — Aligners', contact: 'c9', pipeline: 'p2', stage: 2, value: 3200, status: 'open', owner: 'Priya Shah', source: 'Referral' },
    { id: 'o20', name: 'Lucas Green — Recall', contact: 'c12', pipeline: 'p3', stage: 0, value: 90, status: 'open', owner: 'Priya Shah', source: 'Import' },
    { id: 'o21', name: 'Amelia Baker — Recall', contact: 'c17', pipeline: 'p3', stage: 1, value: 90, status: 'open', owner: 'James Okafor', source: 'Import' },
  ];
  if (!data.opportunities.some((o) => o.id === 'o13')) data.opportunities.push(...extraOpps);
  data.opportunities.forEach((o) => { if (o.id === 'o12' && !o.lostReason) o.lostReason = 'No response'; });
  const added = { o1: '21 Oct', o2: '16 Oct', o3: '20 Oct', o4: '13 Oct', o5: '17 Oct', o6: '14 Oct', o7: '10 Oct', o8: '12 Oct', o9: '18 Oct', o10: '18 Sep', o11: '22 Sep', o12: '9 Oct', o13: '15 Oct', o14: '28 Sep', o15: '25 Sep', o16: '28 Aug', o17: '21 Oct', o18: '16 Oct', o19: '12 Oct', o20: '2 Oct', o21: '2 Sep' };
  data.opportunities.forEach((o) => { o.added = o.added || added[o.id] || 'Today'; });
  data.pipelines.forEach((p) => { p.funnel = p.funnel || p.stages.map(() => true); p.pie = p.pie || p.stages.map(() => true); });
  const LOST_REASONS = ['Price too high', 'Chose another clinic', 'No response', 'Not ready yet', 'Other'];
  const SOURCES = ['Facebook Ad', 'Google Ad', 'Instagram', 'Website Form', 'Website Chat', 'Phone Call', 'Referral', 'Google Business', 'Walk-in', 'Import'];
  const STATUS = { open: 'Open', won: 'Won', lost: 'Lost', abandoned: 'Abandoned' };
  const statusChip = (s) => `<span class="chip ${{ open: 'blue', won: 'green', lost: 'red', abandoned: '' }[s]}">${STATUS[s]}</span>`;
  const contactOf = (o) => data.contacts.find((c) => c.id === o.contact) || { name: 'Unknown', email: '', phone: '', tags: [] };
  const pipeOf = (id) => data.pipelines.find((p) => p.id === id) || data.pipelines[0];
  const m2 = (n) => money(n, 2);

  const state = { pipeline: 'p1', view: 'board', q: '', status: 'all', owner: 'all', source: 'all', selected: new Set(), fields: { contact: true, source: true, value: true, tags: true, owner: true } };

  // ---- Small custom dropdown (native <select> popups don't show up in recordings) ----
  const dd = (id, value, extra = '') => `<button type="button" class="btn op-dd" id="${id}" data-value="${esc(value)}" ${extra}><span>${esc(value)}</span>${icon('chevron', 16)}</button>`;
  function placeMenu(m, anchor) {
    const r = anchor.getBoundingClientRect();
    m.style.minWidth = Math.max(200, r.width) + 'px';
    const h = m.offsetHeight;
    if (r.bottom + 6 + h > innerHeight - 8) m.style.top = Math.max(8, r.top - h - 6) + 'px';
  }
  function wireDd(root, id, options, onChange) {
    const b = $('#' + id, root);
    if (!b) return;
    b.onclick = (e) => {
      e.stopPropagation();
      const m = KY.menu(b, options.map((o) => ({ label: o, icon: o === b.dataset.value ? 'check' : 'blank', onClick: () => {
        b.dataset.value = o; b.querySelector('span').textContent = o; onChange?.(o);
      } })));
      placeMenu(m, b);
    };
  }
  window.KY_ICONS.blank = '';

  function css() {
    if ($('#css-opportunities')) return;
    const s = document.createElement('style');
    s.id = 'css-opportunities';
    s.textContent = `
      #toasts { pointer-events: none; }
      .op-dd { justify-content: space-between; width: 100%; font-weight: 500; color: var(--ink); }
      .op-dd span { overflow: hidden; text-overflow: ellipsis; }
      .op-wrap { display: flex; flex-direction: column; height: 100%; }
      .op-top { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
      .op-top h1 { font-size: 24px; margin: 0 6px 0 0; }
      .op-seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: #fff; }
      .op-seg button { border: 0; background: #fff; height: 38px; padding: 0 12px; display: flex; align-items: center; gap: 6px; color: var(--muted); font-weight: 600; font-size: 14px; }
      .op-seg button + button { border-left: 1px solid var(--line); }
      .op-seg button.on { background: var(--blue-soft); color: var(--blue); }
      .op-pipe { min-width: 250px; height: 42px; font-size: 16px; font-weight: 600; }
      .op-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
      .op-board { flex: 1; min-height: 0; display: flex; gap: 14px; overflow-x: auto; overflow-y: hidden; padding-bottom: 8px; }
      .op-col { width: 306px; flex: none; display: flex; flex-direction: column; min-height: 0; border-radius: 10px; background: #eaecf0; border: 2px solid transparent; transition: border-color .15s, background .15s; }
      .op-col.drop { border-color: var(--blue); border-style: dashed; background: #e0eaff; }
      .op-colh { background: #fff; border-radius: 9px 9px 0 0; padding: 12px 14px; border-bottom: 3px solid var(--sky); }
      .op-colh b { font-size: 16px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .op-colh .meta { display: flex; justify-content: space-between; color: var(--muted); font-size: 14px; margin-top: 2px; }
      .op-colh .meta span:last-child { color: var(--ink); font-weight: 600; }
      .op-cards { flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 10px; }
      .op-card { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px 10px; box-shadow: var(--shadow); cursor: grab; user-select: none; }
      .op-card:hover { border-color: #84adff; }
      .op-card.dragging { opacity: .35; }
      .op-card .t { display: flex; align-items: flex-start; gap: 8px; }
      .op-card .t b { flex: 1; font-size: 15.5px; line-height: 1.3; color: var(--ink); }
      .op-card .kv { display: flex; gap: 6px; font-size: 14px; margin-top: 5px; color: var(--muted); }
      .op-card .kv span:last-child { color: var(--ink-2); font-weight: 500; }
      .op-card .tags { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 8px; }
      .op-card .tags .chip { height: 22px; font-size: 12px; padding: 0 8px; }
      .op-card .acts { display: flex; align-items: center; gap: 2px; margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--line-soft); color: var(--faint); }
      .op-card .acts span { width: 28px; height: 26px; display: grid; place-items: center; border-radius: 6px; }
      .op-card .acts span:hover { background: #f2f4f7; color: var(--blue); }
      .op-card .st { margin-top: 8px; }
      .op-more { width: 28px; height: 28px; border: 0; background: none; border-radius: 6px; color: var(--muted); display: grid; place-items: center; padding: 0; }
      .op-more:hover { background: #f2f4f7; }
      .op-ghost { position: fixed; z-index: 70; pointer-events: none; width: 286px; transform: rotate(2.5deg); box-shadow: 0 18px 36px rgba(16,24,40,.28); opacity: .96; cursor: grabbing; }
      .op-empty { color: var(--faint); font-size: 14px; text-align: center; padding: 18px 0; }
      .op-suggest { position: absolute; left: 0; right: 0; top: 46px; z-index: 5; background: #fff; border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 12px 24px rgba(16,24,40,.15); padding: 6px; }
      .op-suggest button { display: flex; width: 100%; gap: 10px; align-items: center; border: 0; background: none; padding: 7px 8px; border-radius: 6px; text-align: left; }
      .op-suggest button:hover { background: #f2f4f7; }
      .op-mtabs { display: flex; gap: 4px; border-bottom: 1px solid var(--line-soft); margin: -6px 0 18px; }
      .op-mtabs a { padding: 10px 12px; color: var(--muted); font-weight: 600; font-size: 14.5px; border-bottom: 2px solid transparent; cursor: pointer; }
      .op-mtabs a.on { color: var(--blue); border-bottom-color: var(--blue); }
      .op-sec { font-size: 13px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; margin: 4px 0 12px; }
      .op-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
      .op-money { position: relative; } .op-money .input { padding-left: 28px; } .op-money i { position: absolute; left: 12px; top: 10px; font-style: normal; color: var(--muted); }
      .op-modal { width: 760px; }
      .pl-row { display: grid; grid-template-columns: 34px 1fr 110px 110px 44px; align-items: center; gap: 10px; padding: 8px 10px; border: 1px solid var(--line-soft); border-radius: 8px; background: #fff; margin-bottom: 8px; }
      .pl-row.lift { box-shadow: 0 14px 28px rgba(16,24,40,.22); border-color: #84adff; position: relative; z-index: 3; }
      .pl-grip { color: var(--faint); cursor: grab; display: grid; place-items: center; height: 34px; border-radius: 6px; }
      .pl-grip:hover { background: #f2f4f7; color: var(--ink-2); }
      .pl-head { display: grid; grid-template-columns: 34px 1fr 110px 110px 44px; gap: 10px; padding: 0 10px 6px; font-size: 13px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .03em; }
      .pl-head span:nth-child(3), .pl-head span:nth-child(4), .pl-row > div.c { text-align: center; display: flex; justify-content: center; }
      .pl-ph { height: 52px; border: 2px dashed #84adff; border-radius: 8px; margin-bottom: 8px; background: var(--blue-soft); }
    `;
    document.head.appendChild(s);
  }

  // ---------------- Opportunities tab ----------------
  function visible() {
    const q = state.q.toLowerCase();
    return data.opportunities.filter((o) => o.pipeline === state.pipeline &&
      (state.status === 'all' || o.status === state.status) &&
      (state.owner === 'all' || o.owner === state.owner) &&
      (state.source === 'all' || o.source === state.source) &&
      (!q || o.name.toLowerCase().includes(q) || contactOf(o).name.toLowerCase().includes(q) || contactOf(o).email.includes(q)));
  }

  function card(o) {
    const c = contactOf(o);
    const f = state.fields;
    return `<div class="op-card" draggable="true" id="op_card_${o.id}" data-id="${o.id}">
      <div class="t"><b>${esc(o.name)}</b>${f.owner ? `<span title="${esc(o.owner)}">${avatar(o.owner, 26)}</span>` : ''}
        <button class="op-more" id="op_more_${o.id}" title="More">${icon('more', 18)}</button></div>
      ${f.contact ? `<div class="kv"><span>Contact:</span><span>${esc(c.name)}</span></div>` : ''}
      ${f.source ? `<div class="kv"><span>Opportunity source:</span><span>${esc(o.source)}</span></div>` : ''}
      ${f.value ? `<div class="kv"><span>Opportunity value:</span><span>${m2(o.value)}</span></div>` : ''}
      ${f.tags && c.tags.length ? `<div class="tags">${c.tags.slice(0, 2).map((t) => `<span class="chip ${t.includes('lead') ? 'blue' : t === 'vip' ? 'purple' : ''}">${esc(t)}</span>`).join('')}</div>` : ''}
      ${o.status !== 'open' ? `<div class="st">${statusChip(o.status)}${o.lostReason ? ` <span class="muted" style="font-size:13px">${esc(o.lostReason)}</span>` : ''}</div>` : ''}
      <div class="acts"><span title="Call">${icon('phone', 16)}</span><span title="SMS">${icon('sms', 16)}</span><span title="Email">${icon('mail', 16)}</span>
        <span title="Tasks">${icon('task', 16)}</span><span title="Notes">${icon('note', 16)}</span><span title="Appointments">${icon('calendar', 16)}</span>
        <span style="margin-left:auto;width:auto;font-size:12.5px">${esc(o.added)}</span></div>
    </div>`;
  }

  function oppTab(view) {
    css();
    view.style.padding = '20px 24px 16px';
    const p = pipeOf(state.pipeline);
    const rows = visible();
    const total = rows.reduce((a, o) => a + o.value, 0);
    const filters = [state.status !== 'all' && `Status: ${STATUS[state.status]}`, state.owner !== 'all' && `Owner: ${state.owner}`, state.source !== 'all' && `Source: ${state.source}`].filter(Boolean);
    view.innerHTML = `<div class="op-wrap">
      <div class="op-top">
        <h1>Opportunities</h1>
        <button class="btn op-dd op-pipe" id="op_pipeline" style="width:auto"><span>${esc(p.name)}</span>${icon('chevron', 18)}</button>
        <div class="op-seg" id="op_views">
          <button id="op_view_board" class="${state.view === 'board' ? 'on' : ''}" title="Board view">${icon('board', 18)} Board</button>
          <button id="op_view_list" class="${state.view === 'list' ? 'on' : ''}" title="List view">${icon('list', 18)} List</button>
        </div>
        <span class="spacer"></span>
        <button class="btn" id="op_import">${icon('upload', 18)} Import</button>
        <button class="btn primary" id="op_add">${icon('plus', 18)} Add opportunity</button>
      </div>
      <div class="op-bar">
        <div class="search" style="width:330px"><span>${icon('search', 18)}</span><input class="input" id="op_search" placeholder="Search Opportunities" value="${esc(state.q)}"></div>
        <button class="btn" id="op_filters">${icon('filter', 18)} Advanced Filters${filters.length ? ` <span class="chip blue" style="height:22px">${filters.length}</span>` : ''}</button>
        ${filters.map((f) => `<span class="chip blue" style="height:30px">${esc(f)}</span>`).join('')}
        ${filters.length ? `<button class="btn ghost sm" id="op_clear">${icon('x', 16)} Clear</button>` : ''}
        <button class="btn" id="op_sort">${icon('updown', 18)} Sort: Date added</button>
        <span class="spacer"></span>
        <div class="row" id="op_bulk" style="display:${state.view === 'list' && state.selected.size ? 'flex' : 'none'};gap:8px">
          <b id="op_selcount">${state.selected.size} selected</b>
          <button class="btn sm" id="op_bulk_stage">${icon('pipeline', 16)} Move stage</button>
          <button class="btn sm" id="op_bulk_status">${icon('check', 16)} Change status</button>
          <button class="btn sm" id="op_bulk_owner">${icon('user', 16)} Assign owner</button>
          <button class="btn sm" id="op_bulk_tag">${icon('tag', 16)} Add tag</button>
          <button class="btn sm" id="op_bulk_del" style="color:var(--red)">${icon('trash', 16)}</button>
        </div>
        <span class="muted" id="op_summary" style="font-size:14.5px">${rows.length} opportunities · <b style="color:var(--ink)">${m2(total)}</b></span>
        ${state.view === 'board' ? `<button class="btn icon" id="op_customize" title="Customize card">${icon('settings', 18)}</button>` : ''}
      </div>
      ${state.view === 'board' ? board(p, rows) : list(p, rows)}
    </div>`;
    wireOpp(view, p, rows);
  }

  function board(p, rows) {
    return `<div class="op-board" id="op_board">${p.stages.map((s, i) => {
      const inStage = rows.filter((o) => o.stage === i);
      return `<div class="op-col" id="op_col_${i}" data-stage="${i}">
        <div class="op-colh" id="op_colh_${i}"><b>${esc(s)}</b><div class="meta"><span>${inStage.length} ${inStage.length === 1 ? 'Opportunity' : 'Opportunities'}</span><span>${m2(inStage.reduce((a, o) => a + o.value, 0))}</span></div></div>
        <div class="op-cards">${inStage.map(card).join('') || '<div class="op-empty">No opportunities</div>'}</div></div>`;
    }).join('')}</div>`;
  }

  function list(p, rows) {
    return `<div class="card" style="overflow:auto"><table class="t" id="op_table">
      <thead><tr><th style="width:44px"><input type="checkbox" id="op_all"></th><th>Opportunity name</th><th>Contact</th><th>Stage</th><th>Status</th><th>Value</th><th>Owner</th><th>Source</th><th>Added</th></tr></thead>
      <tbody>${rows.map((o) => `<tr class="click" data-id="${o.id}" id="op_row_${o.id}">
        <td><input type="checkbox" data-sel="${o.id}" ${state.selected.has(o.id) ? 'checked' : ''}></td>
        <td class="bold">${esc(o.name)}</td><td>${esc(contactOf(o).name)}</td>
        <td>${esc(p.stages[o.stage])}</td><td>${statusChip(o.status)}</td><td class="bold">${m2(o.value)}</td>
        <td><div class="row" style="gap:8px">${avatar(o.owner, 26)}${esc(o.owner)}</div></td><td class="muted">${esc(o.source)}</td><td class="muted">${esc(o.added)}</td></tr>`).join('')}</tbody>
      <tfoot><tr><td></td><td class="bold">Total</td><td></td><td></td><td></td><td class="bold">${m2(rows.reduce((a, o) => a + o.value, 0))}</td><td colspan="3"></td></tr></tfoot>
    </table>${rows.length ? '' : '<div class="empty"><div class="big">No opportunities match</div>Try a different search or filter.</div>'}</div>`;
  }

  function moveTo(o, stage, view) {
    const p = pipeOf(o.pipeline);
    if (o.stage === stage) return;
    o.stage = stage;
    o.added = o.added; // keep
    // Newest moves show at the top of the column.
    data.opportunities.splice(data.opportunities.indexOf(o), 1);
    data.opportunities.unshift(o);
    oppTab(view);
    const el = $(`#op_card_${o.id}`);
    if (el) el.animate([{ boxShadow: '0 0 0 3px #84adff' }, { boxShadow: '0 0 0 0 transparent' }], { duration: 1200 });
    KY.toast(`Moved to “${p.stages[stage]}”`);
  }

  function setStatus(o, status, view, reason) {
    o.status = status;
    if (status === 'lost') o.lostReason = reason || o.lostReason || 'No response'; else delete o.lostReason;
    oppTab(view);
    KY.toast(`Marked as ${STATUS[status]}`);
  }

  function wireOpp(view, p, rows) {
    $('#op_pipeline').onclick = (e) => {
      const m = KY.menu(e.currentTarget, data.pipelines.map((pp) => ({ label: pp.name, icon: pp.id === state.pipeline ? 'check' : 'blank', onClick: () => { state.pipeline = pp.id; state.selected.clear(); oppTab(view); } })));
      placeMenu(m, e.currentTarget);
    };
    $('#op_view_board').onclick = () => { state.view = 'board'; oppTab(view); };
    $('#op_view_list').onclick = () => { state.view = 'list'; oppTab(view); };
    const search = $('#op_search');
    search.oninput = () => { state.q = search.value; const pos = search.selectionStart; oppTab(view); const s = $('#op_search'); s.focus(); s.setSelectionRange(pos, pos); };
    $('#op_filters').onclick = () => filtersDrawer(view);
    if ($('#op_clear')) $('#op_clear').onclick = () => { Object.assign(state, { status: 'all', owner: 'all', source: 'all' }); oppTab(view); };
    $('#op_sort').onclick = (e) => KY.menu(e.currentTarget, ['Date added (newest)', 'Date added (oldest)', 'Opportunity value', 'Last updated', 'Name'].map((l) => ({ label: l })));
    $('#op_add').onclick = () => editModal(view, null);
    $('#op_import').onclick = () => KY.modal({ title: 'Import opportunities', body: `<p style="margin-top:0">Upload a CSV with one row per opportunity. You'll map each column (contact, pipeline, stage, value, status, owner) on the next step.</p>
      <div class="card" style="border-style:dashed;padding:38px;text-align:center;box-shadow:none">${icon('upload', 30)}<div class="bold" style="margin-top:8px">Drop your CSV file here, or click to browse</div></div>`, actions: [{ label: 'Cancel' }] });
    if ($('#op_customize')) $('#op_customize').onclick = () => customizeCard(view);

    if (state.view === 'board') wireBoard(view);
    else wireList(view, p, rows);
  }

  function cardMenu(view, o, anchor) {
    const p = pipeOf(o.pipeline);
    const m = KY.menu(anchor, [
      { label: 'Edit opportunity', icon: 'edit', onClick: () => editModal(view, o) },
      ...p.stages.map((s, i) => i === o.stage ? null : { label: `Move to: ${s}`, icon: 'arrowRight', onClick: () => moveTo(o, i, view) }).filter(Boolean),
      ...['won', 'lost', 'abandoned', 'open'].filter((s) => s !== o.status).map((s) => ({ label: `Mark as ${STATUS[s]}`, icon: s === 'won' ? 'check' : s === 'open' ? 'restore' : 'x', onClick: () => setStatus(o, s, view) })),
      { label: 'Delete', icon: 'trash', onClick: () => { data.opportunities.splice(data.opportunities.indexOf(o), 1); oppTab(view); KY.toast('Opportunity deleted'); } },
    ]);
    placeMenu(m, anchor);
  }

  function wireBoard(view) {
    $$('.op-card', view).forEach((el) => {
      const o = data.opportunities.find((x) => x.id === el.dataset.id);
      el.onclick = (e) => {
        if (e.target.closest('.op-more')) { e.stopPropagation(); return cardMenu(view, o, e.target.closest('.op-more')); }
        if (e.target.closest('.acts')) return KY.toast('Opens the contact record', 'ok');
        editModal(view, o);
      };
    });
    // Real HTML drag and drop, with an in-page "ghost" card so the move is visible on camera.
    let ghost = null, dragId = null;
    const blank = new Image();
    blank.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    const follow = (e) => { if (ghost && (e.clientX || e.clientY)) { ghost.style.left = e.clientX - 140 + 'px'; ghost.style.top = e.clientY - 26 + 'px'; } };
    const stop = () => {
      ghost?.remove(); ghost = null; dragId = null;
      $$('.op-col.drop').forEach((c) => c.classList.remove('drop'));
      $$('.op-card.dragging').forEach((c) => c.classList.remove('dragging'));
      document.removeEventListener('dragover', follow, true);
    };
    $$('.op-card', view).forEach((el) => {
      el.addEventListener('dragstart', (e) => {
        dragId = el.dataset.id;
        e.dataTransfer.setData('text/plain', dragId);
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setDragImage(blank, 0, 0); } catch {}
        ghost = el.cloneNode(true);
        ghost.removeAttribute('id');
        ghost.className = 'op-card op-ghost';
        document.body.appendChild(ghost);
        follow(e);
        document.addEventListener('dragover', follow, true);
        requestAnimationFrame(() => el.classList.add('dragging'));
      });
      el.addEventListener('dragend', stop);
    });
    $$('.op-col', view).forEach((col) => {
      col.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; $$('.op-col.drop').forEach((c) => c !== col && c.classList.remove('drop')); col.classList.add('drop'); });
      col.addEventListener('dragleave', (e) => { if (!col.contains(e.relatedTarget)) col.classList.remove('drop'); });
      col.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain') || dragId;
        const o = data.opportunities.find((x) => x.id === id);
        stop();
        if (o) moveTo(o, +col.dataset.stage, view);
      });
    });
  }

  function wireList(view, p, rows) {
    $$('#op_table tr.click', view).forEach((tr) => (tr.onclick = (e) => {
      if (e.target.matches('input')) return;
      editModal(view, data.opportunities.find((o) => o.id === tr.dataset.id));
    }));
    const sync = () => {
      $('#op_bulk').style.display = state.selected.size ? 'flex' : 'none';
      $('#op_selcount').textContent = `${state.selected.size} selected`;
    };
    $$('[data-sel]', view).forEach((cb) => (cb.onchange = () => { cb.checked ? state.selected.add(cb.dataset.sel) : state.selected.delete(cb.dataset.sel); sync(); }));
    $('#op_all').onchange = (e) => { rows.forEach((o) => (e.target.checked ? state.selected.add(o.id) : state.selected.delete(o.id))); oppTab(view); };
    const chosen = () => data.opportunities.filter((o) => state.selected.has(o.id));
    const done = (msg) => { const n = state.selected.size; state.selected.clear(); oppTab(view); KY.toast(msg.replace('{n}', n)); };
    $('#op_bulk_stage').onclick = (e) => placeMenu(KY.menu(e.currentTarget, p.stages.map((s, i) => ({ label: s, icon: 'arrowRight', onClick: () => { chosen().forEach((o) => (o.stage = i)); done(`{n} opportunities moved to “${s}”`); } }))), e.currentTarget);
    $('#op_bulk_status').onclick = (e) => placeMenu(KY.menu(e.currentTarget, Object.entries(STATUS).map(([k, l]) => ({ label: l, icon: 'check', onClick: () => { chosen().forEach((o) => (o.status = k)); done(`{n} opportunities marked as ${l}`); } }))), e.currentTarget);
    $('#op_bulk_owner').onclick = (e) => placeMenu(KY.menu(e.currentTarget, data.team.map((t) => ({ label: t.name, icon: 'user', onClick: () => { chosen().forEach((o) => (o.owner = t.name)); done(`{n} opportunities assigned to ${t.name}`); } }))), e.currentTarget);
    $('#op_bulk_tag').onclick = (e) => placeMenu(KY.menu(e.currentTarget, data.tags.map((t) => ({ label: t, icon: 'tag', onClick: () => {
      chosen().forEach((o) => { const c = contactOf(o); if (c.tags && !c.tags.includes(t)) c.tags.push(t); }); done(`Tag “${t}” added to {n} contacts`);
    } }))), e.currentTarget);
    $('#op_bulk_del').onclick = () => KY.modal({ title: 'Delete opportunities?', body: `<p style="margin:0">This deletes ${state.selected.size} opportunities. The contacts themselves are kept.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Delete', primary: true, id: 'op_bulk_del_ok', onClick: (close) => { data.opportunities = data.opportunities.filter((o) => !state.selected.has(o.id)); close(); done('{n} opportunities deleted'); } }] });
  }

  function filtersDrawer(view) {
    const box = KY.modal({
      title: 'Advanced Filters', drawer: true,
      body: `<div class="field"><label>Status</label>${dd('opf_status', state.status === 'all' ? 'All' : STATUS[state.status])}</div>
        <div class="field"><label>Owner</label>${dd('opf_owner', state.owner === 'all' ? 'All' : state.owner)}</div>
        <div class="field"><label>Opportunity source</label>${dd('opf_source', state.source === 'all' ? 'All' : state.source)}</div>
        <div class="field"><label>Opportunity value</label><div class="op-g2"><div class="op-money"><i>£</i><input class="input" placeholder="Min"></div><div class="op-money"><i>£</i><input class="input" placeholder="Max"></div></div></div>
        <div class="field"><label>Date added</label>${dd('opf_date', 'Any time')}</div>
        <div class="field"><label>Tags</label>${dd('opf_tags', 'Any tag')}</div>`,
      actions: [{ label: 'Clear all', onClick: (close) => { Object.assign(state, { status: 'all', owner: 'all', source: 'all' }); close(); oppTab(view); } },
        { label: 'Apply', primary: true, id: 'opf_apply', onClick: (close, b) => {
          const sv = $('#opf_status', b).dataset.value, ov = $('#opf_owner', b).dataset.value, so = $('#opf_source', b).dataset.value;
          state.status = sv === 'All' ? 'all' : Object.keys(STATUS).find((k) => STATUS[k] === sv);
          state.owner = ov === 'All' ? 'all' : ov;
          state.source = so === 'All' ? 'all' : so;
          close(); oppTab(view);
        } }],
    });
    wireDd(box, 'opf_status', ['All', ...Object.values(STATUS)]);
    wireDd(box, 'opf_owner', ['All', ...data.team.map((t) => t.name)]);
    wireDd(box, 'opf_source', ['All', ...SOURCES]);
    wireDd(box, 'opf_date', ['Any time', 'Today', 'Last 7 days', 'Last 30 days', 'This month', 'Custom range']);
    wireDd(box, 'opf_tags', ['Any tag', ...data.tags]);
  }

  function customizeCard(view) {
    const labels = { contact: 'Contact name', source: 'Opportunity source', value: 'Opportunity value', tags: 'Tags', owner: 'Owner' };
    const box = KY.modal({
      title: 'Customize card',
      body: `<p class="muted" style="margin-top:0">Choose which fields show on each opportunity card.</p>
        ${Object.entries(labels).map(([k, l]) => `<div class="row" style="margin:12px 0"><button class="toggle ${state.fields[k] ? 'on' : ''}" data-f="${k}"></button>${l}</div>`).join('')}`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'op_cust_save', onClick: (close, b) => {
        $$('[data-f]', b).forEach((t) => (state.fields[t.dataset.f] = t.classList.contains('on'))); close(); oppTab(view); KY.toast('Card layout saved');
      } }],
    });
    KY.toggles(box);
  }

  function editModal(view, o) {
    const isNew = !o;
    const cur = o ? { ...o } : { name: '', contact: '', pipeline: state.pipeline, stage: 0, value: '', status: 'open', owner: data.me.name, source: 'Walk-in' };
    const c = cur.contact ? contactOf(cur) : null;
    const p = pipeOf(cur.pipeline);
    const box = KY.modal({
      title: isNew ? 'Add opportunity' : `Edit “${o.name}”`, wide: true,
      body: `<div class="op-mtabs" id="op_mtabs"><a class="on" data-t="d">Opportunity Details</a><a data-t="a">Book/Update Appointment</a><a data-t="t">Tasks</a><a data-t="n">Notes</a></div>
      <div data-pane="d">
        <div class="op-sec">Contact details</div>
        <div class="op-g2">
          <div class="field" style="position:relative"><label>Primary Contact Name</label>
            <input class="input" id="op_f_contact" placeholder="Search by name, email or phone" value="${esc(c ? c.name : '')}" autocomplete="off"><div id="op_f_suggest"></div></div>
          <div class="field"><label>Primary Email</label><input class="input" id="op_f_email" value="${esc(c ? c.email : '')}" placeholder="—"></div>
          <div class="field"><label>Primary Phone</label><input class="input" id="op_f_phone" value="${esc(c ? c.phone : '')}" placeholder="—"></div>
          <div class="field"><label>Business Name</label><input class="input" placeholder="Optional"></div>
        </div>
        <div class="op-sec" style="margin-top:6px">Opportunity details</div>
        <div class="field"><label>Opportunity Name *</label><input class="input" id="op_f_name" value="${esc(cur.name)}" placeholder="e.g. Olivia Bennett — Invisalign"></div>
        <div class="op-g2">
          <div class="field"><label>Pipeline</label>${dd('op_f_pipeline', p.name)}</div>
          <div class="field"><label>Stage</label>${dd('op_f_stage', p.stages[cur.stage])}</div>
          <div class="field"><label>Status</label>${dd('op_f_status', STATUS[cur.status])}</div>
          <div class="field"><label>Opportunity Value</label><div class="op-money"><i>£</i><input class="input" id="op_f_value" value="${esc(cur.value)}" placeholder="0.00"></div></div>
          <div class="field"><label>Owner</label>${dd('op_f_owner', cur.owner)}</div>
          <div class="field"><label>Opportunity Source</label>${dd('op_f_source', cur.source)}</div>
          <div class="field" id="op_f_lostwrap" style="display:${cur.status === 'lost' ? 'flex' : 'none'}"><label>Lost Reason</label>${dd('op_f_lost', cur.lostReason || LOST_REASONS[0])}</div>
          <div class="field"><label>Followers</label><input class="input" placeholder="Add team members to notify"></div>
        </div>
      </div>
      <div data-pane="a" style="display:none"><p class="muted" style="margin-top:0">Book an appointment for this contact without leaving the opportunity.</p>
        <div class="op-g2"><div class="field"><label>Calendar</label>${dd('op_f_cal', data.calendars[0].name)}</div><div class="field"><label>Date & time</label><input class="input" value="Thu 29 Oct, 10:00"></div></div></div>
      <div data-pane="t" style="display:none"><div class="row" style="margin:8px 0"><input type="checkbox"> Call to discuss treatment options</div><button class="btn sm">${icon('plus', 16)} Add task</button></div>
      <div data-pane="n" style="display:none"><textarea class="input" rows="5" placeholder="Write a note…"></textarea></div>`,
      actions: [
        ...(isNew ? [] : [{ label: 'Delete', id: 'op_f_delete', onClick: (close) => { data.opportunities.splice(data.opportunities.indexOf(o), 1); close(); oppTab(view); KY.toast('Opportunity deleted'); } }]),
        { label: 'Cancel' },
        { label: isNew ? 'Create' : 'Update', primary: true, id: 'op_f_save', onClick: (close, b) => save(close, b) },
      ],
    });
    box.classList.add('op-modal');
    if (!isNew) { const del = $('#op_f_delete', box); del.style.color = 'var(--red)'; del.style.marginRight = 'auto'; }
    $$('#op_mtabs a', box).forEach((a) => (a.onclick = () => {
      $$('#op_mtabs a', box).forEach((x) => x.classList.toggle('on', x === a));
      $$('[data-pane]', box).forEach((pn) => (pn.style.display = pn.dataset.pane === a.dataset.t ? '' : 'none'));
    }));
    let pipe = p;
    const stageOpts = () => pipe.stages;
    wireDd(box, 'op_f_pipeline', data.pipelines.map((x) => x.name), (name) => {
      pipe = data.pipelines.find((x) => x.name === name);
      const s = $('#op_f_stage', box); s.dataset.value = pipe.stages[0]; s.querySelector('span').textContent = pipe.stages[0];
      wireDd(box, 'op_f_stage', stageOpts());
    });
    wireDd(box, 'op_f_stage', stageOpts());
    wireDd(box, 'op_f_status', Object.values(STATUS), (v) => { $('#op_f_lostwrap', box).style.display = v === 'Lost' ? 'flex' : 'none'; });
    wireDd(box, 'op_f_owner', data.team.map((t) => t.name));
    wireDd(box, 'op_f_source', SOURCES);
    wireDd(box, 'op_f_lost', LOST_REASONS);
    wireDd(box, 'op_f_cal', data.calendars.map((k) => k.name));

    let contactId = cur.contact;
    const input = $('#op_f_contact', box), sug = $('#op_f_suggest', box);
    input.oninput = () => {
      const q = input.value.trim().toLowerCase();
      const hits = q ? data.contacts.filter((x) => x.name.toLowerCase().includes(q) || x.email.includes(q)).slice(0, 5) : [];
      sug.innerHTML = hits.length ? `<div class="op-suggest">${hits.map((x) => `<button type="button" data-c="${x.id}">${avatar(x.name, 28)}<span><b>${esc(x.name)}</b><br><span class="muted" style="font-size:13px">${esc(x.email)}</span></span></button>`).join('')}</div>` : '';
      $$('[data-c]', sug).forEach((bt) => (bt.onclick = () => {
        const x = data.contacts.find((k) => k.id === bt.dataset.c);
        contactId = x.id; input.value = x.name; $('#op_f_email', box).value = x.email; $('#op_f_phone', box).value = x.phone; sug.innerHTML = '';
        const nm = $('#op_f_name', box); if (!nm.value) nm.value = `${x.name} — `;
      }));
    };

    function save(close, b) {
      const name = $('#op_f_name', b).value.trim() || (input.value ? `${input.value} — New opportunity` : 'New opportunity');
      const statusLabel = $('#op_f_status', b).dataset.value;
      const rec = {
        name, contact: contactId || data.contacts[0].id, pipeline: pipe.id,
        stage: Math.max(0, pipe.stages.indexOf($('#op_f_stage', b).dataset.value)),
        value: parseFloat(String($('#op_f_value', b).value).replace(/[£,]/g, '')) || 0,
        status: Object.keys(STATUS).find((k) => STATUS[k] === statusLabel),
        owner: $('#op_f_owner', b).dataset.value, source: $('#op_f_source', b).dataset.value,
      };
      if (rec.status === 'lost') rec.lostReason = $('#op_f_lost', b).dataset.value;
      if (isNew) data.opportunities.unshift({ id: 'o' + Date.now(), added: 'Today', ...rec });
      else { Object.assign(o, rec); if (rec.status !== 'lost') delete o.lostReason; }
      state.pipeline = pipe.id;
      close(); oppTab(view);
      KY.toast(isNew ? 'Opportunity created' : 'Opportunity updated');
    }
  }

  // ---------------- Pipelines tab ----------------
  function pipelinesTab(view) {
    css();
    view.innerHTML = `
      <div class="page-head"><h1>Pipelines</h1><span class="chip">${data.pipelines.length} pipelines</span>
        <div class="actions"><button class="btn primary" id="pl_new">${icon('plus', 18)} Create new pipeline</button></div></div>
      <div class="card"><table class="t" id="pl_table">
        <thead><tr><th>Pipeline name</th><th>Stages</th><th>Open opportunities</th><th>Open value</th><th style="width:120px"></th></tr></thead>
        <tbody>${data.pipelines.map((p) => {
          const open = data.opportunities.filter((o) => o.pipeline === p.id && o.status === 'open');
          return `<tr id="pl_row_${p.id}"><td><div class="row">${icon('pipeline', 20)}<span class="bold">${esc(p.name)}</span></div>
              <div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">${p.stages.map((s) => `<span class="chip">${esc(s)}</span>`).join('<span class="faint">›</span>')}</div></td>
            <td>${p.stages.length}</td><td>${open.length}</td><td class="bold">${m2(open.reduce((a, o) => a + o.value, 0))}</td>
            <td><div class="row" style="gap:4px;justify-content:flex-end"><button class="btn ghost icon sm" id="pl_edit_${p.id}" title="Edit">${icon('edit', 18)}</button>
              <button class="btn ghost icon sm" id="pl_del_${p.id}" title="Delete">${icon('trash', 18)}</button></div></td></tr>`;
        }).join('')}</tbody></table></div>`;
    $('#pl_new').onclick = () => pipelineModal(view, null);
    data.pipelines.forEach((p) => {
      $(`#pl_edit_${p.id}`).onclick = () => pipelineModal(view, p);
      $(`#pl_del_${p.id}`).onclick = () => KY.modal({ title: 'Delete pipeline?', body: `<p style="margin:0">Move or delete the opportunities in <b>${esc(p.name)}</b> first. Deleting a pipeline can't be undone.</p>`, actions: [{ label: 'Cancel' }] });
    });
  }

  function pipelineModal(view, p) {
    const isNew = !p;
    let stages = isNew ? ['New Lead', 'Contacted', 'Booked'].map((n) => ({ name: n, funnel: true, pie: true }))
      : p.stages.map((n, i) => ({ name: n, funnel: p.funnel[i] !== false, pie: p.pie[i] !== false, from: i }));
    const box = KY.modal({
      title: isNew ? 'Create new pipeline' : 'Edit pipeline', wide: true,
      body: `<div class="field"><label>Pipeline Name</label><input class="input" id="pl_name" value="${esc(isNew ? '' : p.name)}" placeholder="e.g. Implants"></div>
        <div class="row" style="margin:18px 0 10px"><b>Stages</b><span class="muted" style="font-size:14px">Drag <span style="vertical-align:-4px">${icon('grip', 18)}</span> to change the order. Deals move left to right.</span></div>
        <div class="pl-head"><span></span><span>Stage name</span><span>Funnel chart</span><span>Pie chart</span><span></span></div>
        <div id="pl_stages"></div>
        <button class="btn sm" id="pl_add_stage" style="margin-top:4px">${icon('plus', 16)} Add stage</button>`,
      actions: [{ label: 'Cancel' }, { label: isNew ? 'Create' : 'Save', primary: true, id: 'pl_save', onClick: (close, b) => {
        sync();
        const name = $('#pl_name', b).value.trim() || 'New pipeline';
        const clean = stages.filter((s) => s.name.trim());
        if (isNew) data.pipelines.push({ id: 'p' + Date.now(), name, stages: clean.map((s) => s.name), funnel: clean.map((s) => s.funnel), pie: clean.map((s) => s.pie) });
        else {
          // Keep each opportunity in the same stage after a reorder.
          const map = {};
          clean.forEach((s, i) => { if (s.from !== undefined) map[s.from] = i; });
          data.opportunities.filter((o) => o.pipeline === p.id).forEach((o) => { o.stage = map[o.stage] ?? 0; });
          Object.assign(p, { name, stages: clean.map((s) => s.name), funnel: clean.map((s) => s.funnel), pie: clean.map((s) => s.pie) });
        }
        close(); pipelinesTab(view); KY.toast(isNew ? `Pipeline “${name}” created` : 'Pipeline saved');
      } }],
    });
    const holder = $('#pl_stages', box);
    function sync() {
      $$('.pl-row', holder).forEach((r, i) => {
        stages[i].name = $('input', r).value;
        stages[i].funnel = $('[data-k=funnel]', r).classList.contains('on');
        stages[i].pie = $('[data-k=pie]', r).classList.contains('on');
      });
    }
    function draw() {
      holder.innerHTML = stages.map((s, i) => `<div class="pl-row" data-i="${i}" id="pl_stage_row_${i}">
        <div class="pl-grip" id="pl_grip_${i}" title="Drag to reorder">${icon('grip', 20)}</div>
        <input class="input" id="pl_stage_${i}" value="${esc(s.name)}" placeholder="Stage name">
        <div class="c"><button class="toggle ${s.funnel ? 'on' : ''}" data-k="funnel"></button></div>
        <div class="c"><button class="toggle ${s.pie ? 'on' : ''}" data-k="pie"></button></div>
        <button class="btn ghost icon sm" data-del="${i}" title="Delete stage">${icon('trash', 18)}</button></div>`).join('');
      KY.toggles(holder);
      $$('[data-del]', holder).forEach((b) => (b.onclick = () => { sync(); stages.splice(+b.dataset.del, 1); draw(); }));
      $$('.pl-grip', holder).forEach((g) => g.addEventListener('mousedown', startDrag));
    }
    // Mouse-driven reordering (works with a real mouse and with Playwright's mouse.down/move/up).
    function startDrag(e) {
      e.preventDefault();
      sync();
      const row = e.currentTarget.closest('.pl-row');
      const from = +row.dataset.i;
      const rows = $$('.pl-row', holder);
      const rects = rows.map((r) => r.getBoundingClientRect());
      const h = rects[0].height + 8;
      const y0 = e.clientY;
      row.classList.add('lift');
      let to = from;
      const move = (ev) => {
        const dy = ev.clientY - y0;
        row.style.transform = `translateY(${dy}px)`;
        to = Math.max(0, Math.min(rows.length - 1, from + Math.round(dy / h)));
        rows.forEach((r, i) => {
          if (r === row) return;
          let shift = 0;
          if (from < to && i > from && i <= to) shift = -h;
          if (from > to && i < from && i >= to) shift = h;
          r.style.transition = 'transform .15s'; r.style.transform = shift ? `translateY(${shift}px)` : '';
        });
      };
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        const [s] = stages.splice(from, 1);
        stages.splice(to, 0, s);
        draw();
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
    $('#pl_add_stage', box).onclick = () => { sync(); stages.push({ name: '', funnel: true, pie: true }); draw(); $(`#pl_stage_${stages.length - 1}`, box).focus(); };
    draw();
  }

  KY.screen('opportunities', {
    tabs: [{ id: 'opportunities', label: 'Opportunities' }, { id: 'pipelines', label: 'Pipelines' }],
    render(view, { tab, params }) {
      if (tab === 'pipelines') return pipelinesTab(view);
      if (params[0] && data.pipelines.some((p) => p.id === params[0])) state.pipeline = params[0];
      if (params[1] === 'list' || params[1] === 'board') state.view = params[1];
      return oppTab(view);
    },
  });
})();
