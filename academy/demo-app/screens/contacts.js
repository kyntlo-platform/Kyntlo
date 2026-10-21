// Contacts (CRM) — list, smart lists, filters, sort, columns, add/import, bulk actions,
// merge duplicates, the contact record, companies and restore.
(() => {
  const { esc, icon, money, $, $$, avatar } = KY;
  const data = KY.data;

  // ---- Screen-local demo data (kept here so data.js stays shared and untouched) ----
  // A duplicate that sneaked in through website chat with a nickname and another email.
  const local = [{ id: 'c19', name: 'Liv Bennett', email: 'liv.b@mail.com', phone: '', tags: ['invisalign'], source: 'Website Chat', created: '21 Oct 2026', last: '2 hours ago', owner: 'Sarah Mitchell', value: 0 }];
  const all = () => [...data.contacts, ...local];
  const byId = (id) => all().find((c) => c.id === id);
  const companies = KY.data.companies = KY.data.companies || [
    { id: 'co1', name: 'Marylebone Law LLP', phone: '+44 20 7946 0100', email: 'office@marylebonelaw.co.uk', website: 'marylebonelaw.co.uk', address: '22 Wimpole Street, London W1G 8GQ', owner: 'Sarah Mitchell', created: '3 Sep 2026', note: 'Staff dental plan — 10% off for employees', contacts: ['c4', 'c14'], deal: ['Marylebone Law LLP — Staff dental plan', 'Treatment Plan Sent', 1800] },
    { id: 'co2', name: 'Baker Street Fitness', phone: '+44 20 7946 0200', email: 'hello@bakerstreetfitness.co.uk', website: 'bakerstreetfitness.co.uk', address: '81 Baker Street, London W1U 6AG', owner: 'Priya Shah', created: '18 Sep 2026', note: 'Partner gym — members get a free whitening consult', contacts: ['c8', 'c18'], deal: ['Baker Street Fitness — Member whitening offer', 'Contacted', 900] },
  ];
  const companyOf = (id) => companies.find((co) => co.contacts.includes(id));
  const treatment = (c) => ({ invisalign: 'Invisalign', whitening: 'Teeth whitening', implants: 'Dental implants', 'check-up': 'Check-up & clean' })[c.tags.find((t) => ['invisalign', 'whitening', 'implants', 'check-up'].includes(t))] || '';
  const cf = {};
  const fieldsFor = (c) => (cf[c.id] = cf[c.id] || {
    treatment: treatment(c), lastVisit: c.tags.includes('new patient') ? '' : '02/03/2026',
    dentist: { 'Sarah Mitchell': 'Dr Sarah Mitchell', 'James Okafor': 'Dr James Okafor', 'Priya Shah': 'Priya Shah (hygienist)' }[c.owner] || '',
    birthday: '', referral: c.source === 'Referral' ? 'Existing patient' : '',
  });
  const CF_DEFS = [['treatment', 'Treatment interest', '{{contact.treatment_interest}}'], ['lastVisit', 'Last visit date', '{{contact.last_visit_date}}'], ['dentist', 'Preferred dentist', '{{contact.preferred_dentist}}'], ['referral', 'Referred by', '{{contact.referred_by}}']];
  const deleted = [
    { name: 'Test Patient', email: 'test@mail.com', at: '19 Oct 2026', by: 'James Okafor' },
    { name: 'Mia H', email: 'mia.h@mail.com', at: '12 Oct 2026', by: 'Sarah Mitchell' },
    { name: 'Charlotte Price', email: 'charlotte.price@mail.com', at: '6 Oct 2026', by: 'Priya Shah' },
  ];

  const COLUMNS = [
    ['phone', 'Phone', (c) => esc(c.phone) || '<span class="faint">—</span>'],
    ['email', 'Email', (c) => esc(c.email)],
    ['tags', 'Tags', (c) => `<div class="row" style="gap:6px;flex-wrap:wrap">${c.tags.map(tagChip).join('')}</div>`],
    ['source', 'Source', (c) => `<span class="muted">${esc(c.source)}</span>`],
    ['created', 'Created', (c) => `<span class="muted">${esc(c.created)}</span>`],
    ['last', 'Last activity', (c) => `<span class="muted">${esc(c.last)}</span>`],
    ['owner', 'Assigned to', (c) => `<span class="muted">${esc(c.owner)}</span>`],
    ['company', 'Company', (c) => `<span class="muted">${esc(companyOf(c.id)?.name || '—')}</span>`],
    ['treatment', 'Treatment interest', (c) => `<span class="muted">${esc(fieldsFor(c).treatment || '—')}</span>`],
  ];
  const SORTS = { 'Date created (newest)': null, 'Date created (oldest)': (a, b) => Date.parse(a.created) - Date.parse(b.created), 'Name (A–Z)': (a, b) => a.name.localeCompare(b.name), 'Name (Z–A)': (a, b) => b.name.localeCompare(a.name) };
  const FILTERS = {
    tag: { label: 'Tag', op: 'is', values: () => data.tags, test: (c, v) => c.tags.includes(v) },
    source: { label: 'Contact source', op: 'is', values: () => [...new Set(all().map((c) => c.source))], test: (c, v) => c.source === v },
    owner: { label: 'Assigned to', op: 'is', values: () => data.team.map((t) => t.name), test: (c, v) => c.owner === v },
    created: { label: 'Created', op: 'is within', values: () => ['Last 7 days', 'Last 30 days', 'Last 90 days'], test: (c, v) => Date.parse('21 Oct 2026') - Date.parse(c.created) <= { 'Last 7 days': 7, 'Last 30 days': 30, 'Last 90 days': 90 }[v] * 864e5 },
  };
  const state = { q: '', filters: [], list: 'All', selected: new Set(), sort: 'Date created (newest)', cols: ['phone', 'email', 'tags', 'source', 'created', 'last'] };
  const CAMPAIGN_TAGS = ['whitening-offer-oct'];
  const lists = { All: () => true, 'Invisalign leads': (c) => c.tags.includes('invisalign'), 'New this week': (c) => /2[0-1] Oct/.test(c.created), Reactivation: (c) => c.tags.includes('reactivation') };
  const tagChip = (t) => `<span class="chip ${t === 'vip' ? 'purple' : t.includes('lead') ? 'blue' : t === 'reactivation' ? 'amber' : ''}">${esc(t)}</span>`;
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function css() {
    if ($('#css-contacts')) return;
    const s = document.createElement('style');
    s.id = 'css-contacts';
    s.textContent = `
      .ct-pill { display:inline-flex; align-items:center; gap:6px; height:34px; padding:0 8px 0 12px; border-radius:8px; background:var(--blue-soft); color:#004eeb; font-size:14px; font-weight:600; border:1px solid #c7d7fe; }
      .ct-pill button { border:0; background:none; color:#004eeb; display:grid; place-items:center; padding:2px; }
      .ct-bulk { display:flex; align-items:center; gap:8px; padding:10px 16px; background:#f5f8ff; border-bottom:1px solid #d1e0ff; }
      .ct-foot { display:flex; align-items:center; gap:12px; padding:12px 16px; color:var(--muted); font-size:14px; }
      .ct-sec { display:flex; align-items:center; gap:8px; margin:18px 0 10px; font-weight:600; }
      .ct-sec small { font-weight:500; color:var(--muted); font-size:13px; }
      .ct-tagbox { position:relative; margin-top:8px; }
      .ct-sugg { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
      .ct-sugg button { border:1px dashed var(--line); background:#fff; }
      .ct-savebar { position:sticky; bottom:0; background:#fff; border-top:1px solid var(--line-soft); padding:12px 18px; display:flex; gap:10px; justify-content:flex-end; box-shadow:0 -6px 16px rgba(16,24,40,.06); }
      .ct-check { display:flex; align-items:center; gap:10px; padding:10px 12px; border:1px solid var(--line-soft); border-radius:8px; margin-bottom:8px; cursor:pointer; }
      .ct-check input { width:17px; height:17px; }
      .ct-opt { display:flex; gap:12px; padding:14px 16px; border:1px solid var(--line); border-radius:10px; margin-bottom:10px; cursor:pointer; align-items:flex-start; }
      .ct-opt.on { border-color:var(--blue); background:var(--blue-soft); }
      .ct-opt input { margin-top:4px; }
      .ct-merge td { padding:10px 14px; }
      .ct-merge label { display:flex; align-items:center; gap:8px; cursor:pointer; }
      .ct-dup { display:flex; gap:8px; align-items:flex-start; background:var(--amber-soft); border:1px solid #fedf89; color:#93370d; border-radius:8px; padding:10px 12px; font-size:14px; margin:-4px 0 14px; }
      .ct-ftabs a { cursor:pointer; }
    `;
    document.head.appendChild(s);
  }

  function filtered() {
    const q = state.q.toLowerCase();
    const rows = all().filter((c) => lists[state.list](c) &&
      (!q || c.name.toLowerCase().includes(q) || c.email.includes(q) || (q.replace(/\s/g, '') && c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')))) &&
      state.filters.every((f) => FILTERS[f.field].test(c, f.value)));
    const sorter = SORTS[state.sort];
    return sorter ? rows.sort(sorter) : rows.sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
  }

  function listView(view) {
    const rows = filtered();
    const cols = COLUMNS.filter(([k]) => state.cols.includes(k));
    const n = state.selected.size;
    view.innerHTML = `
      <div class="page-head"><h1>Contacts</h1><span class="chip" id="ct_total">${all().length} total</span>
        <div class="actions">
          <button class="btn" id="ct_import">${icon('upload', 18)} Import</button>
          <button class="btn primary" id="ct_add">${icon('plus', 18)} Add Contact</button>
        </div></div>
      <div class="row" style="gap:6px;margin-bottom:14px" id="ct_lists">
        ${Object.keys(lists).map((l) => `<button class="btn sm ${l === state.list ? 'primary' : ''}" data-list="${esc(l)}" id="ct_list_${slug(l)}">${esc(l)}</button>`).join('')}
        <button class="btn sm ghost" id="ct_savelist">${icon('plus', 16)} Save as smart list</button>
      </div>
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft);flex-wrap:wrap">
          <div class="search" style="width:340px"><span>${icon('search', 18)}</span><input class="input" id="ct_search" placeholder="Search name, email or phone" value="${esc(state.q)}"></div>
          <button class="btn" id="ct_filter">${icon('filter', 18)} Advanced Filters${state.filters.length ? ` <span class="chip blue" style="height:22px">${state.filters.length}</span>` : ''}</button>
          ${state.filters.map((f, i) => `<span class="ct-pill" id="ct_pill_${i}">${esc(FILTERS[f.field].label)} ${esc(FILTERS[f.field].op)} "${esc(f.value)}"<button data-unf="${i}" title="Remove">${icon('x', 15)}</button></span>`).join('')}
          ${state.filters.length ? `<button class="btn ghost sm" id="ct_clear">Clear all</button>` : ''}
          <span class="spacer"></span>
          <button class="btn" id="ct_sort">${icon('updown', 18)} Sort: ${esc(state.sort)}</button>
          <button class="btn" id="ct_columns">${icon('board', 18)} Columns</button>
        </div>
        <div class="ct-bulk" id="ct_bulk" style="display:${n ? 'flex' : 'none'}">
          <span class="bold" id="ct_selcount" style="margin-right:6px">${n} selected</span>
          <button class="btn sm" id="ct_bulk_tag">${icon('tag', 16)} Add tag</button>
          <button class="btn sm" id="ct_bulk_untag">${icon('tag', 16)} Remove tag</button>
          <button class="btn sm" id="ct_bulk_sms">${icon('sms', 16)} Send SMS</button>
          <button class="btn sm" id="ct_bulk_email">${icon('mail', 16)} Send email</button>
          <button class="btn sm" id="ct_bulk_wf">${icon('automation', 16)} Add to workflow</button>
          <button class="btn sm" id="ct_bulk_export">${icon('download', 16)} Export</button>
          <button class="btn sm" id="ct_bulk_merge" style="display:${n === 2 ? 'inline-flex' : 'none'}">${icon('merge', 16)} Merge</button>
          <span class="spacer"></span>
          <button class="btn sm" id="ct_bulk_del" style="color:var(--red)">${icon('trash', 16)} Delete</button>
        </div>
        <table class="t" id="ct_table">
          <thead><tr><th style="width:44px"><input type="checkbox" id="ct_all"></th><th>Name</th>${cols.map(([k, l]) => `<th data-col="${k}">${esc(l)}</th>`).join('')}</tr></thead>
          <tbody>${rows.map((c) => `
            <tr class="click" data-id="${c.id}" id="ct_row_${c.id}">
              <td><input type="checkbox" data-sel="${c.id}" id="ct_sel_${c.id}" ${state.selected.has(c.id) ? 'checked' : ''}></td>
              <td><div class="row">${avatar(c.name, 32)}<span class="bold" style="white-space:nowrap">${esc(c.name)}</span></div></td>
              ${cols.map(([k, , f]) => `<td style="${k === 'tags' ? '' : 'white-space:nowrap'}">${f(c)}</td>`).join('')}
            </tr>`).join('')}</tbody>
        </table>
        ${rows.length ? '' : `<div class="empty"><div class="big">No contacts match</div>Try a different search or filter.</div>`}
        <div class="ct-foot"><span>Showing ${rows.length ? 1 : 0}–${rows.length} of ${rows.length}</span><span class="spacer"></span>
          <span>Page size</span><button class="btn sm">20 ${icon('chevron', 14)}</button>
          <button class="btn sm icon" style="width:34px">${icon('left', 16)}</button><button class="btn sm primary" style="width:34px;padding:0;justify-content:center">1</button><button class="btn sm icon" style="width:34px">${icon('right', 16)}</button></div>
      </div>`;

    const redraw = () => listView(view);
    const search = $('#ct_search');
    search.oninput = () => { state.q = search.value; const pos = search.selectionStart; redraw(); const s = $('#ct_search'); s.focus(); s.setSelectionRange(pos, pos); };
    $$('[data-list]', view).forEach((b) => (b.onclick = () => { state.list = b.dataset.list; state.filters = []; state.q = ''; redraw(); }));
    $('#ct_filter').onclick = () => filterDrawer(redraw);
    $$('[data-unf]', view).forEach((b) => (b.onclick = (e) => { e.stopPropagation(); state.filters.splice(+b.dataset.unf, 1); redraw(); }));
    if ($('#ct_clear')) $('#ct_clear').onclick = () => { state.filters = []; redraw(); };
    $('#ct_sort').onclick = (e) => {
      const m = KY.menu(e.currentTarget, Object.keys(SORTS).map((s) => ({ label: s, icon: s === state.sort ? 'check' : '', onClick: () => { state.sort = s; redraw(); } })));
      $$('button', m).forEach((b, i) => (b.id = `ct_sort_${slug(Object.keys(SORTS)[i])}`));
    };
    $('#ct_columns').onclick = () => columnsDrawer(redraw);
    $('#ct_savelist').onclick = () => KY.modal({
      title: 'Save as smart list',
      body: `<div class="field"><label>List name</label><input class="input" id="sl_name" placeholder="e.g. Invisalign leads — Facebook"></div>
             ${state.filters.length || state.q ? `<div class="muted" style="font-size:14px;margin-bottom:10px">Filters saved with this list: ${state.filters.map((f) => `<b>${esc(FILTERS[f.field].label)} ${esc(FILTERS[f.field].op)} "${esc(f.value)}"</b>`).join(', ')}${state.q ? ` <b>Search "${esc(state.q)}"</b>` : ''}</div>` : ''}
             <p class="muted" style="margin:0">Smart lists update automatically as contacts match your filters. Columns and sorting are saved too.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'sl_save', onClick: (close, box) => {
        const name = $('#sl_name', box).value || 'My list';
        const q = state.q.toLowerCase(), fs = [...state.filters];
        lists[name] = (c) => fs.every((f) => FILTERS[f.field].test(c, f.value)) && (!q || c.name.toLowerCase().includes(q));
        state.list = name; state.q = ''; state.filters = []; close(); redraw(); KY.toast(`Smart list "${name}" saved`);
      } }],
    });
    $('#ct_add').onclick = () => addContact(redraw);
    $('#ct_import').onclick = () => importWizard(redraw);
    $$('tr.click', view).forEach((tr) => (tr.onclick = (e) => {
      if (e.target.matches('input')) return;
      KY.go(`#/contacts/detail/${tr.dataset.id}`);
    }));
    $$('[data-sel]', view).forEach((cb) => (cb.onchange = () => {
      cb.checked ? state.selected.add(cb.dataset.sel) : state.selected.delete(cb.dataset.sel);
      const k = state.selected.size;
      $('#ct_bulk').style.display = k ? 'flex' : 'none';
      $('#ct_bulk_merge').style.display = k === 2 ? 'inline-flex' : 'none';
      $('#ct_selcount').textContent = `${k} selected`;
    }));
    $('#ct_all').onchange = (e) => { rows.forEach((c) => (e.target.checked ? state.selected.add(c.id) : state.selected.delete(c.id))); redraw(); };
    const done = (msg) => { state.selected.clear(); redraw(); KY.toast(msg); };
    const tagMenu = (el, remove) => { const opts = remove ? [...new Set([...state.selected].flatMap((id) => byId(id).tags))] : [...new Set([...data.tags, ...CAMPAIGN_TAGS])]; const m = KY.menu(el, opts.map((t) => ({ label: t, icon: 'tag', onClick: () => {
      const k = state.selected.size;
      state.selected.forEach((id) => { const c = byId(id); if (remove) c.tags = c.tags.filter((x) => x !== t); else if (!c.tags.includes(t)) c.tags.push(t); });
      bulkLog(remove ? `Remove tag "${t}"` : `Add tag "${t}"`, k);
      done(remove ? `Tag "${t}" removed from ${k} contacts` : `Tag "${t}" added to ${k} contacts`);
    } }))); $$('button', m).forEach((b, i) => (b.id = `ct_tagopt_${slug(opts[i])}`)); };
    $('#ct_bulk_tag').onclick = (e) => tagMenu(e.currentTarget, false);
    $('#ct_bulk_untag').onclick = (e) => tagMenu(e.currentTarget, true);
    $('#ct_bulk_sms').onclick = () => bulkMessage('SMS', done);
    $('#ct_bulk_email').onclick = () => bulkMessage('Email', done);
    $('#ct_bulk_wf').onclick = (e) => { const wfs = data.workflows.filter((w) => w.status === 'published'); const m = KY.menu(e.currentTarget, wfs.map((w) => ({ label: w.name, icon: 'automation', onClick: () => { bulkLog(`Add to workflow "${w.name}"`, state.selected.size); done(`${state.selected.size} contacts added to "${w.name}"`); } }))); $$('button', m).forEach((b, i) => (b.id = `ct_wf_${wfs[i].id}`)); };
    $('#ct_bulk_export').onclick = () => KY.modal({
      title: `Export ${state.selected.size} contacts`,
      body: `<p style="margin-top:0">Your export will include the columns you can see in this list.</p>
        <div class="ct-opt on"><input type="radio" checked><div><b>Visible columns</b><div class="muted" style="font-size:14px">Name, ${cols.map(([, l]) => l).join(', ')}</div></div></div>
        <div class="ct-opt"><input type="radio"><div><b>All fields</b><div class="muted" style="font-size:14px">Every standard and custom field</div></div></div>
        <p class="muted" style="margin:0;font-size:14px">The CSV file downloads when it's ready. Large exports are emailed to you.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Export', primary: true, id: 'ex_go', onClick: (close) => { close(); bulkLog('Export contacts (CSV)', state.selected.size); done('Export started — contacts.csv will download shortly'); } }],
    });
    $('#ct_bulk_merge').onclick = () => mergeModal([...state.selected], () => { state.selected.clear(); redraw(); });
    $('#ct_bulk_del').onclick = () => KY.modal({ title: `Delete ${state.selected.size} contacts?`, body: `<p style="margin:0">Deleted contacts can be brought back from the <b>Restore</b> tab.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Delete', primary: true, id: 'del_go', onClick: (close) => {
        state.selected.forEach((id) => { const c = byId(id); deleted.unshift({ name: c.name, email: c.email, at: '21 Oct 2026', by: data.me.name }); });
        data.contacts = data.contacts.filter((c) => !state.selected.has(c.id));
        for (let i = local.length - 1; i >= 0; i--) if (state.selected.has(local[i].id)) local.splice(i, 1);
        close(); done('Contacts deleted');
      } }] });
  }

  const bulkLog = (action, count) => bulkHistory.unshift([action, String(count), '<span class="chip green">Complete</span>', data.me.name, '21 Oct 2026']);
  const bulkHistory = [
    ['Add tag "reactivation"', '212', '<span class="chip green">Complete</span>', 'Sarah Mitchell', '20 Oct 2026'],
    ['Send SMS — Whitening offer', '486', '<span class="chip blue">Running · 62%</span>', 'Priya Shah', '21 Oct 2026'],
    ['Import patients-export.csv', '1,248', '<span class="chip green">Complete</span>', 'Sarah Mitchell', '2 Oct 2026'],
  ];

  function filterDrawer(redraw) {
    const draft = state.filters.map((f) => ({ ...f }));
    const box = KY.modal({
      title: 'Advanced Filters', drawer: true,
      body: `<p class="muted" style="margin-top:0">Show only the contacts that match <b>all</b> of these conditions.</p><div id="flt_rows"></div>
        <button class="btn" id="flt_add">${icon('plus', 18)} Add filter</button>`,
      actions: [{ label: 'Clear all', id: 'flt_clearall', onClick: () => { draft.length = 0; draw(); } }, { label: 'Apply', primary: true, id: 'flt_apply', onClick: (close) => { state.filters = draft.filter((f) => f.value); close(); redraw(); } }],
    });
    const draw = () => {
      $('#flt_rows', box).innerHTML = draft.map((f, i) => {
        const F = FILTERS[f.field];
        return `<div class="card" style="padding:14px 16px;margin-bottom:12px;box-shadow:none">
          <div class="row" style="margin-bottom:10px"><b>${esc(F.label)}</b><span class="muted">${esc(F.op)}</span><span class="spacer"></span><button class="btn ghost icon sm" data-rm="${i}">${icon('trash', 16)}</button></div>
          <div class="row" style="flex-wrap:wrap;gap:6px">${F.values().map((v) => `<button class="btn sm ${f.value === v ? 'primary' : ''}" data-i="${i}" data-v="${esc(v)}" id="flt_${f.field}_${slug(v)}">${esc(v)}</button>`).join('')}</div></div>`;
      }).join('');
      $$('[data-v]', box).forEach((b) => (b.onclick = () => { draft[+b.dataset.i].value = b.dataset.v; draw(); }));
      $$('[data-rm]', box).forEach((b) => (b.onclick = () => { draft.splice(+b.dataset.rm, 1); draw(); }));
    };
    $('#flt_add', box).onclick = (e) => {
      const m = KY.menu(e.currentTarget, Object.entries(FILTERS).map(([k, F]) => ({ label: F.label, icon: 'filter', onClick: () => { draft.push({ field: k, value: '' }); draw(); } })));
      $$('button', m).forEach((b, i) => (b.id = `flt_field_${Object.keys(FILTERS)[i]}`));
    };
    draw();
  }

  function columnsDrawer(redraw) {
    const box = KY.modal({
      title: 'Manage columns', drawer: true,
      body: `<p class="muted" style="margin-top:0">Choose which fields show as columns. <b>Name</b> is always shown.</p>
        ${COLUMNS.map(([k, l]) => `<label class="ct-check" id="col_${k}"><input type="checkbox" data-col="${k}" ${state.cols.includes(k) ? 'checked' : ''}> ${esc(l)}${['treatment'].includes(k) ? ' <span class="chip" style="margin-left:auto">Custom field</span>' : ''}</label>`).join('')}`,
      actions: [{ label: 'Cancel' }, { label: 'Apply', primary: true, id: 'col_apply', onClick: (close, b) => {
        state.cols = COLUMNS.map(([k]) => k).filter((k) => $(`[data-col="${k}"]`, b).checked); close(); redraw(); KY.toast('Columns updated');
      } }],
    });
    return box;
  }

  function bulkMessage(kind, done) {
    const n = state.selected.size;
    KY.modal({
      title: `Send ${kind} to ${n} contacts`,
      body: `${kind === 'Email' ? '<div class="field"><label>Subject</label><input class="input" id="bm_subject"></div>' : ''}
        <div class="field"><label>Message</label><textarea class="input" rows="5" id="bm_body" placeholder="Hi {{contact.first_name}}, …"></textarea></div>
        <div class="field"><label>When</label>
          <div class="ct-opt on" id="bm_now"><input type="radio" name="bmw" checked><div><b>Send all at once</b><div class="muted" style="font-size:14px">Starts as soon as you click Send</div></div></div>
          <div class="ct-opt" id="bm_drip"><input type="radio" name="bmw"><div><b>Send in drip mode</b><div class="muted" style="font-size:14px">Batches of 10 every 15 minutes — friendlier for replies</div></div></div></div>
        <p class="muted" style="font-size:14px;margin:0" id="bm_dnd">Contacts with Do Not Disturb on for ${kind === 'SMS' ? 'text messages' : 'emails'} are skipped automatically.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Send', primary: true, id: 'bm_send', onClick: (close) => { close(); bulkLog(`Send ${kind}`, n); done(`${kind} queued for ${n} contacts`); } }],
    });
    $$('.ct-opt').forEach((o) => (o.onclick = () => { $$('.ct-opt').forEach((x) => { x.classList.remove('on'); $('input', x).checked = false; }); o.classList.add('on'); $('input', o).checked = true; }));
  }

  function addContact(redraw) {
    const box = KY.modal({
      title: 'Add new contact', drawer: true,
      body: `<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
          <div class="field"><label>First name</label><input class="input" id="nc_first"></div>
          <div class="field"><label>Last name</label><input class="input" id="nc_last"></div></div>
        <div class="field"><label>Email</label><input class="input" id="nc_email"></div>
        <div class="field"><label>Phone</label><input class="input" id="nc_phone" placeholder="+44"></div>
        <div id="nc_dup"></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
          <div class="field"><label>Contact type</label><select class="select" id="nc_type"><option>Lead</option><option>Customer</option></select></div>
          <div class="field"><label>Contact source</label><select class="select" id="nc_source"><option>Walk-in</option><option>Phone Call</option><option>Referral</option><option>Website Form</option></select></div></div>
        <div class="field"><label>Tags</label><div class="input row" style="height:auto;min-height:42px;flex-wrap:wrap;gap:6px;padding:6px 10px" id="nc_tagbox"><span id="nc_chips" class="row" style="gap:6px;flex-wrap:wrap"></span><input id="nc_tags" style="border:0;outline:0;flex:1;min-width:160px" placeholder="Type a tag and press Enter"></div></div>
        <div class="field"><label>Assigned to</label><select class="select" id="nc_owner">${data.team.map((t) => `<option>${esc(t.name)}</option>`).join('')}</select></div>
        <div class="row"><button class="toggle" id="nc_dnd"></button><span>Do not disturb (all channels)</span></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'nc_save', onClick: (close, b) => {
        const name = `${$('#nc_first', b).value} ${$('#nc_last', b).value}`.trim() || 'New Contact';
        const pending = $('#nc_tags', b).value.trim();
        if (pending) tags.push(pending.toLowerCase());
        data.contacts.unshift({ id: 'c' + Date.now(), name, email: $('#nc_email', b).value, phone: $('#nc_phone', b).value, tags, source: $('#nc_source', b).value, created: '21 Oct 2026', last: 'Just now', owner: data.me.name, value: 0 });
        close(); redraw(); KY.toast('Contact created');
      } }],
    });
    KY.toggles(box);
    const tags = [];
    const chips = () => ($('#nc_chips', box).innerHTML = tags.map(tagChip).join(''));
    $('#nc_tags', box).onkeydown = (e) => {
      if (e.key !== 'Enter' && e.key !== ',') return;
      e.preventDefault();
      const v = e.target.value.trim().toLowerCase();
      if (v && !tags.includes(v)) tags.push(v);
      e.target.value = ''; chips();
    };
    const dup = () => {
      const em = $('#nc_email', box).value.trim().toLowerCase();
      const ph = $('#nc_phone', box).value.replace(/\D/g, '');
      const hit = all().find((c) => (em && c.email === em) || (ph.length > 9 && c.phone.replace(/\D/g, '') === ph));
      $('#nc_dup', box).innerHTML = hit ? `<div class="ct-dup" id="nc_dupwarn">${icon('bell', 18)}<div><b>This contact already exists.</b> ${esc(hit.name)} has the same ${em && hit.email === em ? 'email' : 'phone number'}. <a href="#/contacts/detail/${hit.id}" id="nc_open_dup" style="font-weight:600">Open ${esc(hit.name.split(' ')[0])}'s record</a> instead of creating a duplicate.</div></div>` : '';
    };
    $('#nc_email', box).oninput = dup;
    $('#nc_phone', box).oninput = dup;
  }

  function importWizard(redraw) {
    const box = KY.modal({
      title: 'Import contacts', wide: true,
      body: `<div class="row" style="gap:8px;margin-bottom:18px" id="im_steps"></div><div id="im_step"></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Next', primary: true, id: 'im_next', onClick: () => next() }],
    });
    let step = 0;
    const names = ['Upload file', 'Map fields', 'Import options', 'Done'];
    const cols = [['First Name', 'First Name'], ['Last Name', 'Last Name'], ['Email Address', 'Email'], ['Mobile', 'Phone'], ['Treatment', 'Treatment interest (custom field)'], ['Last Visit', 'Last visit date (custom field)'], ['Notes', "Don't import"]];
    const steps = [
      () => `<div class="card" style="border-style:dashed;padding:46px;text-align:center;box-shadow:none;cursor:pointer" id="im_drop">
          ${icon('upload', 34)}<div class="bold" style="margin-top:10px">Drop your CSV file here, or click to browse</div>
          <div class="muted" style="font-size:14px">One contact per row · first row must be column names · .csv</div></div>
          <p class="muted" style="font-size:14px;margin:14px 0 0">Tip: export from your old system as CSV and keep phone numbers with the country code, like +44.</p>`,
      () => `<div class="row" style="margin-bottom:14px">${icon('note', 22)}<b>patients-export.csv</b><span class="muted">· 1,248 rows</span><span class="chip green">${icon('check', 14)} Uploaded</span></div>
        <table class="t" id="im_map"><thead><tr><th>Column in your file</th><th>Sample</th><th>Kyntlo field</th></tr></thead><tbody>
          ${cols.map(([a, b], i) => `<tr><td class="bold">${a}</td><td class="muted">${['Amelia', 'Baker', 'amelia.baker@mail.com', '+44 7700 900117', 'Check-up', '02/03/2026', 'Prefers mornings'][i]}</td>
          <td><span class="chip ${b.startsWith('Don') ? '' : 'green'}">${b.startsWith('Don') ? '' : icon('check', 14)} ${esc(b)}</span></td></tr>`).join('')}</tbody></table>`,
      () => `<div class="field"><label>How should we import these contacts?</label>
          <div class="ct-opt on" id="im_opt_both"><input type="radio" name="imo" checked><div><b>Create and update contacts</b><div class="muted" style="font-size:14px">New people are added, people you already have are updated</div></div></div>
          <div class="ct-opt" id="im_opt_new"><input type="radio" name="imo"><div><b>Create new contacts only</b><div class="muted" style="font-size:14px">Rows that match an existing contact are skipped</div></div></div>
          <div class="ct-opt" id="im_opt_upd"><input type="radio" name="imo"><div><b>Update existing contacts only</b><div class="muted" style="font-size:14px">Nobody new is created</div></div></div></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
          <div class="field"><label>Find existing contacts by</label><input class="input" value="Email, then phone" readonly></div>
          <div class="field"><label>Add these tags to every imported contact</label><input class="input" id="im_tags" value="imported-oct-2026"></div></div>
        <label class="row" style="margin-bottom:8px"><input type="checkbox" checked> <span>Don't overwrite existing values with empty cells</span></label>
        <label class="row"><input type="checkbox" id="im_consent" checked> <span>I confirm these contacts agreed to hear from Bloom Dental Studio</span></label>`,
      () => `<div class="empty" style="padding:30px"><div style="color:var(--green)">${icon('check', 44)}</div><div class="big">Import started</div>1,248 contacts are being imported. You can follow progress under <b>Bulk Actions</b>.</div>`,
    ];
    const paint = () => {
      $('#im_steps', box).innerHTML = names.map((n, i) => `<span class="chip ${i === step ? 'blue' : i < step ? 'green' : ''}">${i < step ? icon('check', 14) : i + 1 + '.'} ${n}</span>${i < 3 ? `<span class="faint">${icon('right', 14)}</span>` : ''}`).join('');
      $('#im_step', box).innerHTML = steps[step]();
      $('#im_next', box).textContent = step === 2 ? 'Start import' : step === 3 ? 'Done' : 'Next';
      $$('.ct-opt', box).forEach((o) => (o.onclick = () => { $$('.ct-opt', box).forEach((x) => { x.classList.remove('on'); $('input', x).checked = false; }); o.classList.add('on'); $('input', o).checked = true; }));
      if ($('#im_drop', box)) $('#im_drop', box).onclick = next;
    };
    const next = () => {
      step++;
      if (step === 3) bulkLog('Import patients-export.csv', '1,248');
      if (step >= steps.length) { box.closest('.overlay').remove(); redraw(); KY.toast('1,248 contacts imported'); return; }
      paint();
    };
    paint();
  }

  function mergeModal(ids, after) {
    const [a, b] = ids.map(byId).sort((x, y) => (y.phone ? 1 : 0) - (x.phone ? 1 : 0) || x.id.localeCompare(y.id));
    const rows = [['First name', (c) => c.name.split(' ')[0]], ['Last name', (c) => c.name.split(' ').slice(1).join(' ')], ['Email', (c) => c.email], ['Phone', (c) => c.phone], ['Contact source', (c) => c.source], ['Assigned to', (c) => c.owner]];
    const box = KY.modal({
      title: 'Merge contacts', wide: true,
      body: `<p style="margin-top:0">Pick the <b>primary contact</b>, then choose which value to keep for each field. Conversations, notes, tasks, appointments and opportunities from both are kept, and tags are combined.</p>
        <table class="t ct-merge"><thead><tr><th>Field</th><th>${esc(a.name)}</th><th>${esc(b.name)}</th></tr></thead><tbody>
          <tr><td class="bold">Primary contact</td><td><label id="mg_master_a"><input type="radio" name="mg_master" checked> Keep as primary</label></td><td><label id="mg_master_b"><input type="radio" name="mg_master"> Keep as primary</label></td></tr>
          ${rows.map(([k, f]) => {
            const va = f(a), vb = f(b), key = slug(k);
            const pickB = !va && vb;
            return `<tr><td class="bold">${k}</td>
              <td><label id="mg_${key}_a"><input type="radio" name="mg_${key}" data-k="${k}" value="a" ${pickB ? '' : 'checked'} ${va ? '' : 'disabled'}> ${esc(va) || '<span class="faint">empty</span>'}</label></td>
              <td><label id="mg_${key}_b"><input type="radio" name="mg_${key}" data-k="${k}" value="b" ${pickB ? 'checked' : ''} ${vb ? '' : 'disabled'}> ${esc(vb) || '<span class="faint">empty</span>'}</label></td></tr>`;
          }).join('')}
          <tr><td class="bold">Tags</td><td colspan="2"><div class="row" style="gap:6px;flex-wrap:wrap">${[...new Set([...a.tags, ...b.tags])].map(tagChip).join('')}<span class="muted" style="font-size:14px">combined</span></div></td></tr>
        </tbody></table>
        <div class="ct-dup" style="margin:14px 0 0">${icon('bell', 18)}<div>Merging can't be undone. The other contact is removed once its history moves to the primary contact.</div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Merge contacts', primary: true, id: 'mg_merge', onClick: (close, root) => {
        const primary = $('#mg_master_b input', root).checked ? b : a;
        const other = primary === a ? b : a;
        const pick = (key, f) => ($(`[name="mg_${slug(key)}"][value="b"]`, root)?.checked ? f(b) : f(a));
        primary.name = `${pick('First name', rows[0][1])} ${pick('Last name', rows[1][1])}`.trim();
        primary.email = pick('Email', rows[2][1]); primary.phone = pick('Phone', rows[3][1]);
        primary.source = pick('Contact source', rows[4][1]); primary.owner = pick('Assigned to', rows[5][1]);
        primary.tags = [...new Set([...a.tags, ...b.tags])];
        data.contacts = data.contacts.filter((c) => c !== other);
        const li = local.indexOf(other); if (li >= 0) local.splice(li, 1);
        bulkLog(`Merge ${other.name} into ${primary.name}`, 2);
        close(); after(); KY.toast(`Contacts merged into ${primary.name}`);
      } }],
    });
    return box;
  }

  function detailView(view, id) {
    const c = byId(id);
    if (!c) return KY.go('#/contacts');
    const F = fieldsFor(c);
    const convo = data.conversations.find((v) => v.contact === c.id);
    const opps = data.opportunities.filter((o) => o.contact === c.id);
    const appts = data.appointments.filter((a) => a.contact === c.id);
    const co = companyOf(c.id);
    const msgs = convo ? convo.messages.map((m) => ({ kind: 'msg', icon: m.from === 'them' ? 'chat' : 'send', text: `${m.from === 'them' ? c.name.split(' ')[0] : m.from === 'ai' ? 'AI agent' : 'You'}: ${m.text}`, time: m.time })) : [];
    const notes = (c._notes = c._notes || ({ c1: ['Prefers morning appointments. Nervous patient — offer a longer first visit.'], c3: ['Sensitive teeth — use the low-peroxide whitening gel.'], c4: ['Works at Marylebone Law — staff plan discount applies.'], c10: ['Wants to spread the implant cost. Send finance options.'] })[c.id] || []);
    const activity = [
      ...msgs,
      ...appts.map((a) => ({ kind: 'appt', icon: 'calendar', text: `Appointment booked: ${data.calendars.find((k) => k.id === a.calendar).name}`, time: data.week[a.day] || 'Earlier' })),
      ...opps.map((o) => ({ kind: 'opp', icon: 'pipeline', text: `Opportunity created: ${o.name} (${money(o.value)})`, time: c.created })),
      { kind: 'tag', icon: 'tag', text: `Tags added: ${c.tags.join(', ')}`, time: c.created },
      { kind: 'created', icon: 'user', text: `Contact created from ${c.source}`, time: c.created },
    ];
    let ftab = 'Activity';
    view.style.padding = '0';
    view.innerHTML = `
      <div style="display:grid;grid-template-columns:400px 1fr 380px;height:100%">
        <section style="background:#fff;border-right:1px solid var(--line-soft);overflow:auto;display:flex;flex-direction:column" id="cd_left">
          <div class="row" style="padding:16px 18px;border-bottom:1px solid var(--line-soft)">
            <button class="btn ghost icon sm" id="cd_back">${icon('left', 18)}</button>${avatar(c.name, 44)}
            <div><div class="bold" style="font-size:19px" id="cd_name">${esc(c.name)}</div><div class="muted" style="font-size:14px">Added ${esc(c.created)} · ${esc(c.source)}</div></div></div>
          <div class="row" style="padding:12px 18px;gap:8px">
            <button class="btn sm" id="cd_call">${icon('phone', 16)} Call</button><button class="btn sm" id="cd_sms">${icon('sms', 16)} SMS</button><button class="btn sm" id="cd_email">${icon('mail', 16)} Email</button></div>
          <div style="padding:0 18px 18px;flex:1" id="cd_fields">
            <div class="ct-sec" id="cd_sec_contact">${icon('user', 18)} Contact</div>
            ${[['First name', c.name.split(' ')[0]], ['Last name', c.name.split(' ').slice(1).join(' ')], ['Email', c.email], ['Phone', c.phone], ['Contact source', c.source], ['Assigned to', c.owner], ['Company name', co?.name || c._company || '']]
              .map(([k, v]) => `<div class="field"><label>${k}</label><input class="input cd-in" id="cd_f_${slug(k)}" value="${esc(v)}"></div>`).join('')}
            <div class="ct-sec" id="cd_sec_tags">${icon('tag', 18)} Tags</div>
            <div class="row" style="flex-wrap:wrap;gap:6px" id="cd_tags">${c.tags.map((t) => `<span class="chip ${tagChip(t).match(/chip ([a-z]*)/)[1]}">${esc(t)}<span data-untag="${esc(t)}" style="cursor:pointer;display:inline-grid">${icon('x', 12)}</span></span>`).join('')}<button class="btn sm ghost" id="cd_addtag">${icon('plus', 16)} Add tag</button></div>
            <div id="cd_tagbox"></div>
            <div class="ct-sec" id="cd_sec_custom">${icon('layers', 18)} Additional info <small>· custom fields</small></div>
            <div id="cd_custom">${CF_DEFS.map(([k, l]) => `<div class="field"><label>${l}</label><input class="input cd-in" id="cd_cf_${k}" value="${esc(F[k])}" placeholder="—"></div>`).join('')}</div>
            <div class="ct-sec" id="cd_sec_dnd">${icon('bell', 18)} Do not disturb</div>
            <div id="cd_dnd">
              <div class="row" style="margin:8px 0;padding:10px 12px;border:1px solid var(--line-soft);border-radius:8px"><button class="toggle" id="cd_dnd_all"></button><b>DND all channels</b></div>
              ${['Emails', 'Text messages', 'Calls & voicemails', 'WhatsApp', 'Google Business messages', 'Facebook Messenger'].map((ch) => `<div class="row" style="margin:10px 0 10px 4px"><button class="toggle cd-dnd" id="cd_dnd_${slug(ch)}"></button>${ch}</div>`).join('')}
              <div class="row" style="margin:14px 0 4px;padding-top:12px;border-top:1px solid var(--line-soft)"><button class="toggle" id="cd_dnd_inbound"></button><span>Inbound calls & SMS <span class="muted" style="font-size:13px">(block replies too)</span></span></div>
            </div>
          </div>
          <div class="ct-savebar" id="cd_savebar" style="display:none"><button class="btn" id="cd_cancel">Cancel</button><button class="btn primary" id="cd_save">Save</button></div>
        </section>
        <section style="display:flex;flex-direction:column;background:var(--bg);min-width:0">
          <div class="tabs ct-ftabs" style="background:#fff;border-bottom:1px solid var(--line-soft);height:52px;padding:0 10px" id="cd_tabs">
            ${['Activity', 'Conversations', 'Notes'].map((t) => `<a id="cd_tab_${slug(t)}" data-ft="${t}">${t}</a>`).join('')}</div>
          <div style="flex:1;overflow:auto;padding:20px" id="cd_activity"></div>
          <div style="background:#fff;border-top:1px solid var(--line-soft);padding:12px 16px">
            <div class="row" style="gap:6px;margin-bottom:8px" id="cd_channels">${['SMS', 'Email', 'WhatsApp'].map((ch, i) => `<button class="chip ${i === 0 ? 'blue' : ''}" style="border:0" data-ch="${ch}" id="cd_ch_${slug(ch)}">${ch}</button>`).join('')}
              <span class="spacer"></span><button class="btn sm" id="cd_merge" title="Insert custom values and fields">{ } Custom values</button></div>
            <div class="row"><input class="input" id="cd_msg" placeholder="Type a message…"><button class="btn primary" id="cd_send">Send</button></div>
          </div>
        </section>
        <section style="background:#fff;border-left:1px solid var(--line-soft);overflow:auto;padding:16px 18px" id="cd_right">
          <div class="row"><b>Opportunities</b><span class="spacer"></span><button class="btn sm ghost" id="cd_addopp">${icon('plus', 16)}</button></div>
          ${opps.map((o) => `<div class="card" style="padding:12px 14px;margin:10px 0;box-shadow:none"><div class="bold">${esc(o.name)}</div>
            <div class="row muted" style="font-size:14px">${esc(data.pipelines.find((p) => p.id === o.pipeline).stages[o.stage])}<span class="spacer"></span><b style="color:var(--ink)">${money(o.value)}</b></div></div>`).join('') || '<p class="muted">No opportunities yet.</p>'}
          <div class="row" style="margin-top:18px"><b>Appointments</b><span class="spacer"></span><button class="btn sm ghost" id="cd_addappt">${icon('plus', 16)}</button></div>
          <div id="cd_appts">${appts.map((a) => `<div class="card" style="padding:12px 14px;margin:10px 0;box-shadow:none"><div class="bold">${esc(data.calendars.find((k) => k.id === a.calendar).name)}</div>
            <div class="muted" style="font-size:14px">${esc(data.week[a.day])} · ${a.start}–${a.end} · ${esc(a.with)}</div></div>`).join('') || '<p class="muted" id="cd_noappt">No upcoming appointments.</p>'}</div>
          <div class="row" style="margin-top:18px"><b>Tasks</b><span class="spacer"></span><button class="btn sm ghost" id="cd_addtask">${icon('plus', 16)}</button></div>
          <div id="cd_tasks"><label class="row" style="margin:10px 0"><input type="checkbox"> Follow up about treatment plan <span class="chip amber" style="margin-left:auto">Today</span></label></div>
          <div class="row" style="margin-top:18px"><b>Notes</b><span class="spacer"></span><button class="btn sm ghost" id="cd_addnote">${icon('plus', 16)}</button></div>
          <div id="cd_notes">${notes.map((n) => `<div class="card" style="padding:12px 14px;margin:10px 0;box-shadow:none;font-size:14px">${esc(n)}</div>`).join('') || '<p class="muted" style="font-size:14px">No notes yet.</p>'}</div>
        </section>
      </div>`;
    KY.toggles(view);

    const feed = () => {
      $$('#cd_tabs a').forEach((a) => a.classList.toggle('active', a.dataset.ft === ftab));
      const items = ftab === 'Activity' ? activity : ftab === 'Conversations' ? activity.filter((a) => a.kind === 'msg') : notes.map((n) => ({ icon: 'note', text: n, time: 'Sarah Mitchell' }));
      $('#cd_activity').innerHTML = items.map((a) => `<div class="card row" style="padding:12px 16px;margin-bottom:10px;box-shadow:none;align-items:flex-start">
        <span style="color:var(--blue)">${icon(a.icon, 18)}</span><span style="flex:1">${esc(a.text)}</span><span class="faint" style="font-size:13px;white-space:nowrap">${esc(a.time)}</span></div>`).join('') || '<div class="empty">Nothing here yet.</div>';
    };
    feed();
    $$('#cd_tabs a').forEach((a) => (a.onclick = () => { ftab = a.dataset.ft; feed(); }));
    const redraw = () => detailView(view, id);

    $('#cd_back').onclick = () => KY.go('#/contacts');
    $$('.cd-in', view).forEach((i) => (i.oninput = () => ($('#cd_savebar').style.display = 'flex')));
    $('#cd_cancel').onclick = redraw;
    $('#cd_save').onclick = () => {
      CF_DEFS.forEach(([k]) => (F[k] = $(`#cd_cf_${k}`).value));
      c.name = `${$('#cd_f_first-name').value} ${$('#cd_f_last-name').value}`.trim();
      c.email = $('#cd_f_email').value; c.phone = $('#cd_f_phone').value; c._company = $('#cd_f_company-name').value;
      redraw(); KY.toast('Contact updated');
    };
    $('#cd_dnd_all').addEventListener('click', () => { const on = $('#cd_dnd_all').classList.contains('on'); $$('.cd-dnd').forEach((t) => t.classList.toggle('on', on)); KY.toast(on ? 'DND turned on for all channels' : 'DND turned off'); });

    $$('#cd_channels [data-ch]').forEach((b) => (b.onclick = () => { $$('#cd_channels [data-ch]').forEach((x) => x.classList.remove('blue')); b.classList.add('blue'); }));
    $('#cd_merge').onclick = (e) => {
      const items = [
        ['Contact · First name', '{{contact.first_name}}'],
        ...CF_DEFS.map(([, l, tok]) => [`Contact · ${l}`, tok]),
        ['Custom value · Booking link', '{{custom_values.booking_link}}'],
        ['Custom value · Whitening offer price', '{{custom_values.whitening_offer_price}}'],
      ];
      const m = KY.menu(e.currentTarget, items.map(([l, tok]) => ({ label: `${l}`, icon: l.startsWith('Custom value') ? 'key' : 'user', onClick: () => {
        const inp = $('#cd_msg'); inp.value = inp.value + (inp.value && !/\s$/.test(inp.value) ? ' ' : '') + tok; inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);
      } })));
      $$('button', m).forEach((b, i) => (b.id = `cd_mf_${slug(items[i][1])}`));
      m.style.minWidth = '330px';
      const r = e.currentTarget.getBoundingClientRect();
      m.style.left = r.right - 330 + 'px'; m.style.top = r.top - m.offsetHeight - 6 + 'px';
    };
    $('#cd_send').onclick = () => {
      const v = $('#cd_msg').value.trim();
      if (!v) return;
      const shown = v.replace(/\{\{contact\.first_name\}\}/g, c.name.split(' ')[0])
        .replace(/\{\{contact\.treatment_interest\}\}/g, F.treatment || 'your treatment')
        .replace(/\{\{custom_values\.booking_link\}\}/g, 'bloomdental.co.uk/book')
        .replace(/\{\{custom_values\.whitening_offer_price\}\}/g, '£199');
      activity.unshift({ kind: 'msg', icon: 'send', text: `You: ${shown}`, time: 'Just now' });
      ftab = 'Activity'; feed();
      $('#cd_msg').value = '';
      KY.toast('Message sent');
    };
    $$('[data-untag]', view).forEach((x) => (x.onclick = () => { c.tags = c.tags.filter((t) => t !== x.dataset.untag); redraw(); KY.toast(`Tag "${x.dataset.untag}" removed`); }));
    $('#cd_addtag').onclick = () => {
      $('#cd_tagbox').innerHTML = `<div class="ct-tagbox"><input class="input" id="cd_tag_input" placeholder="Search or create a tag…"><div class="ct-sugg" id="cd_tag_sugg"></div></div>`;
      const inp = $('#cd_tag_input');
      const add = (t) => { t = t.trim().toLowerCase(); if (!t) return; if (!data.tags.includes(t)) data.tags.push(t); if (!c.tags.includes(t)) c.tags.push(t); redraw(); KY.toast(`Tag "${t}" added`); };
      const sugg = () => {
        const q = inp.value.trim().toLowerCase();
        const opts = data.tags.filter((t) => !c.tags.includes(t) && t.includes(q));
        $('#cd_tag_sugg').innerHTML = opts.map((t) => `<button class="chip" id="cd_tagopt_${slug(t)}" data-t="${esc(t)}">${esc(t)}</button>`).join('') +
          (q && !data.tags.includes(q) ? `<button class="chip blue" id="cd_tag_create" data-t="${esc(q)}">${icon('plus', 12)} Create tag "${esc(q)}"</button>` : '');
        $$('#cd_tag_sugg [data-t]').forEach((b) => (b.onclick = () => add(b.dataset.t)));
      };
      inp.oninput = sugg;
      inp.onkeydown = (e) => { if (e.key === 'Enter') add(inp.value); };
      sugg(); inp.focus();
    };
    $('#cd_addnote').onclick = () => KY.modal({ title: 'Add note', body: `<textarea class="input" rows="5" id="cd_note_text" placeholder="Write a note…"></textarea>`,
      actions: [{ label: 'Cancel' }, { label: 'Save note', primary: true, id: 'cd_note_save', onClick: (close, box) => {
        const t = $('#cd_note_text', box).value.trim(); if (!t) return close();
        notes.unshift(t);
        $('#cd_notes p.muted')?.remove();
        $('#cd_notes').insertAdjacentHTML('afterbegin', `<div class="card" style="padding:12px 14px;margin:10px 0;box-shadow:none;font-size:14px;border-color:#84adff">${esc(t)}</div>`);
        activity.unshift({ kind: 'note', icon: 'note', text: `Note added: ${t}`, time: 'Just now' }); feed(); close(); KY.toast('Note saved');
      } }] });
    $('#cd_addtask').onclick = () => KY.modal({ title: 'Add task', body: `<div class="field"><label>Title</label><input class="input" id="cd_task_title"></div>
        <div class="field"><label>Description</label><textarea class="input" rows="2" id="cd_task_desc" placeholder="Optional"></textarea></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Due date</label><input class="input" id="cd_task_due" value="Tomorrow, 10:00"></div>
        <div class="field"><label>Assigned to</label><select class="select">${data.team.map((t) => `<option>${esc(t.name)}</option>`).join('')}</select></div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save task', primary: true, id: 'cd_task_save', onClick: (close, box) => {
        const t = $('#cd_task_title', box).value || 'New task';
        $('#cd_tasks').insertAdjacentHTML('afterbegin', `<label class="row" style="margin:10px 0"><input type="checkbox"> ${esc(t)} <span class="chip blue" style="margin-left:auto">Tomorrow</span></label>`);
        activity.unshift({ kind: 'task', icon: 'task', text: `Task created: ${t}`, time: 'Just now' }); feed(); close(); KY.toast('Task created');
      } }] });
    $('#cd_addappt').onclick = () => {
      const box = KY.modal({ title: 'Book appointment', body: `
        <div class="field"><label>Calendar</label><div class="row" style="flex-wrap:wrap;gap:6px">${data.calendars.map((k, i) => `<button class="btn sm ${i === 0 ? 'primary' : ''}" data-cal="${k.id}" id="cd_appt_cal_${k.id}">${esc(k.name)}</button>`).join('')}</div></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Date</label><input class="input" id="cd_appt_date" value="Thu 29 Oct 2026"></div>
        <div class="field"><label>Time</label><div class="row" style="gap:6px;flex-wrap:wrap" id="cd_appt_times">${['09:00', '10:30', '14:00', '16:15'].map((t, i) => `<button class="btn sm ${i === 1 ? 'primary' : ''}" data-time="${t}" id="cd_appt_t_${t.replace(':', '')}">${t}</button>`).join('')}</div></div></div>
        <div class="field"><label>Team member</label><input class="input" value="${esc(c.owner)}" readonly></div>
        <label class="row"><input type="checkbox" checked> Send confirmation to ${esc(c.name.split(' ')[0])} by SMS & email</label>`,
        actions: [{ label: 'Cancel' }, { label: 'Book appointment', primary: true, id: 'cd_appt_save', onClick: (close, b) => {
          const cal = data.calendars.find((k) => k.id === $('[data-cal].primary', b).dataset.cal);
          const time = $('[data-time].primary', b).dataset.time;
          $('#cd_noappt')?.remove();
          $('#cd_appts').insertAdjacentHTML('afterbegin', `<div class="card" style="padding:12px 14px;margin:10px 0;box-shadow:none;border-color:#84adff"><div class="bold">${esc(cal.name)}</div><div class="muted" style="font-size:14px">${esc($('#cd_appt_date', b).value)} · ${time} · ${esc(c.owner)}</div></div>`);
          activity.unshift({ kind: 'appt', icon: 'calendar', text: `Appointment booked: ${cal.name} — ${$('#cd_appt_date', b).value}, ${time}`, time: 'Just now' }); feed(); close(); KY.toast('Appointment booked');
        } }] });
      const pick = (sel) => $$(sel, box).forEach((x) => (x.onclick = () => { $$(sel, box).forEach((y) => y.classList.remove('primary')); x.classList.add('primary'); }));
      pick('[data-cal]'); pick('[data-time]');
    };
    $('#cd_addopp').onclick = () => KY.go('#/opportunities');
    $('#cd_call').onclick = () => KY.toast(`Calling ${c.phone || 'contact'}…`);
    $('#cd_sms').onclick = () => { $('#cd_ch_sms').click(); $('#cd_msg').focus(); };
    $('#cd_email').onclick = () => { $('#cd_ch_email').click(); $('#cd_msg').focus(); };
  }

  const simpleTable = (view, title, head, rows, action, sub = '') => {
    view.innerHTML = `<div class="page-head"><h1>${esc(title)}</h1>${sub ? `<span class="sub">${sub}</span>` : ''}<div class="actions">${action || ''}</div></div>
      <div class="card"><table class="t"><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r, i) => `<tr id="${esc(title).toLowerCase().replace(/\W+/g, '_')}_${i}">${r.map((v) => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table>
      ${rows.length ? '' : '<div class="empty"><div class="big">Nothing here</div></div>'}</div>`;
  };

  function restoreView(view) {
    view.innerHTML = `<div class="page-head"><h1>Restore</h1><span class="sub">Contacts that were deleted recently. Restoring brings back their history too.</span></div>
      <div class="card"><table class="t" id="rs_table"><thead><tr><th>Name</th><th>Email</th><th>Deleted on</th><th>Deleted by</th><th></th></tr></thead>
      <tbody>${deleted.map((d, i) => `<tr id="rs_row_${i}"><td><div class="row">${avatar(d.name, 30)}<b>${esc(d.name)}</b></div></td><td>${esc(d.email)}</td><td class="muted">${esc(d.at)}</td><td class="muted">${esc(d.by)}</td>
        <td style="text-align:right"><button class="btn sm" data-rs="${i}" id="rs_restore_${i}">${icon('restore', 16)} Restore</button></td></tr>`).join('')}</tbody></table>
      ${deleted.length ? '' : '<div class="empty"><div class="big">Nothing to restore</div>Deleted contacts appear here.</div>'}</div>`;
    $$('[data-rs]', view).forEach((b) => (b.onclick = () => {
      const d = deleted.splice(+b.dataset.rs, 1)[0];
      data.contacts.push({ id: 'c' + Date.now(), name: d.name, email: d.email, phone: '', tags: [], source: 'Restored', created: d.at, last: 'Just now', owner: d.by, value: 0 });
      restoreView(view); KY.toast(`${d.name} restored`);
    }));
  }

  function companiesView(view) {
    view.innerHTML = `<div class="page-head"><h1>Companies</h1><span class="chip">${companies.length} total</span>
        <div class="actions"><button class="btn primary" id="co_add">${icon('plus', 18)} Add Company</button></div></div>
      <div class="card"><div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)"><div class="search" style="width:340px"><span>${icon('search', 18)}</span><input class="input" placeholder="Search companies"></div></div>
      <table class="t" id="co_table"><thead><tr><th>Company</th><th>Phone</th><th>Email</th><th>Website</th><th>Contacts</th><th>Owner</th><th>Created</th></tr></thead>
      <tbody>${companies.map((co) => `<tr class="click" data-co="${co.id}" id="co_row_${co.id}"><td><div class="row"><span class="avatar" style="width:32px;height:32px;border-radius:8px;background:#eef4ff;color:var(--blue)">${icon('building', 18)}</span><b>${esc(co.name)}</b></div></td>
        <td>${esc(co.phone)}</td><td>${esc(co.email)}</td><td class="muted">${esc(co.website)}</td><td><span class="chip">${co.contacts.length}</span></td><td class="muted">${esc(co.owner)}</td><td class="muted">${esc(co.created)}</td></tr>`).join('')}</tbody></table></div>`;
    $$('[data-co]', view).forEach((r) => (r.onclick = () => KY.go(`#/contacts/companies/${r.dataset.co}`)));
    $('#co_add').onclick = () => KY.modal({
      title: 'Add company', drawer: true,
      body: `<div class="field"><label>Company name</label><input class="input" id="co_name"></div>
        <div class="field"><label>Phone</label><input class="input" id="co_phone" placeholder="+44"></div>
        <div class="field"><label>Email</label><input class="input" id="co_email"></div>
        <div class="field"><label>Website</label><input class="input" id="co_web"></div>
        <div class="field"><label>Address</label><input class="input" id="co_addr"></div>
        <div class="field"><label>Owner</label><select class="select">${data.team.map((t) => `<option>${esc(t.name)}</option>`).join('')}</select></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'co_save', onClick: (close, b) => {
        const co = { id: 'co' + (companies.length + 1), name: $('#co_name', b).value || 'New Company', phone: $('#co_phone', b).value, email: $('#co_email', b).value, website: $('#co_web', b).value, address: $('#co_addr', b).value, owner: data.me.name, created: '21 Oct 2026', note: '', contacts: [], deal: ['New company opportunity', 'New Enquiry', 0] };
        companies.push(co); close(); companiesView(view); KY.toast('Company created');
      } }],
    });
  }

  function companyDetail(view, id) {
    const co = companies.find((x) => x.id === id);
    if (!co) return KY.go('#/contacts/companies');
    const people = co.contacts.map(byId).filter(Boolean);
    view.innerHTML = `
      <div class="page-head"><button class="btn ghost icon" id="co_back">${icon('left', 20)}</button>
        <span class="avatar" style="width:44px;height:44px;border-radius:10px;background:#eef4ff;color:var(--blue)">${icon('building', 24)}</span>
        <div><h1>${esc(co.name)}</h1><div class="sub">${esc(co.website)}</div></div></div>
      <div class="grid" style="grid-template-columns:420px 1fr;align-items:start">
        <div class="card"><div class="card-h"><h3>Company details</h3></div><div class="card-b">
          ${[['Company name', co.name], ['Phone', co.phone], ['Email', co.email], ['Website', co.website], ['Address', co.address], ['Owner', co.owner], ['Description', co.note]].map(([k, v]) => `<div class="field"><label>${k}</label><input class="input" value="${esc(v)}"></div>`).join('')}
        </div></div>
        <div class="card" id="co_people"><div class="card-h"><h3>Contacts</h3><span class="chip">${people.length}</span><span class="spacer"></span><button class="btn sm" id="co_addcontact">${icon('plus', 16)} Add contact</button></div>
          <table class="t"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Tags</th></tr></thead><tbody>
          ${people.map((c) => `<tr class="click" data-id="${c.id}" id="co_person_${c.id}"><td><div class="row">${avatar(c.name, 30)}<b>${esc(c.name)}</b></div></td><td>${esc(c.email)}</td><td>${esc(c.phone)}</td><td><div class="row" style="gap:6px">${c.tags.map(tagChip).join('')}</div></td></tr>`).join('')}
          </tbody></table>
          <div class="card-b muted" style="font-size:14px">Opportunities linked to this company</div>
          <div style="padding:0 20px 18px">${co.deal[2] ? `<div class="card row" style="padding:12px 14px;box-shadow:none">${icon('pipeline', 18)}<b>${esc(co.deal[0])}</b><span class="spacer"></span><span class="chip blue">${esc(co.deal[1])}</span><b>${money(co.deal[2])}</b></div>` : '<span class="muted">No opportunities yet.</span>'}</div>
        </div>
      </div>`;
    $('#co_back').onclick = () => KY.go('#/contacts/companies');
    $$('[data-id]', view).forEach((r) => (r.onclick = () => KY.go(`#/contacts/detail/${r.dataset.id}`)));
    $('#co_addcontact').onclick = (e) => {
      const opts = all().filter((c) => !companyOf(c.id)).slice(0, 8);
      const m = KY.menu(e.currentTarget, opts.map((c) => ({ label: c.name, icon: 'user', onClick: () => { co.contacts.push(c.id); companyDetail(view, id); KY.toast(`${c.name} linked to ${co.name}`); } })));
      $$('button', m).forEach((b, i) => (b.id = `co_pick_${opts[i].id}`));
      const r = e.currentTarget.getBoundingClientRect(); m.style.left = r.right - 240 + 'px';
    };
  }

  KY.screen('contacts', {
    tabs: [{ id: 'smart-lists', label: 'Smart Lists' }, { id: 'bulk-actions', label: 'Bulk Actions' }, { id: 'restore', label: 'Restore' }, { id: 'tasks', label: 'Tasks' }, { id: 'companies', label: 'Companies' }],
    render(view, { tab, params }) {
      css();
      if (tab === 'detail') return detailView(view, params[0]);
      if (tab === 'bulk-actions') return simpleTable(view, 'Bulk Actions', ['Action', 'Contacts', 'Status', 'Started by', 'Date'], bulkHistory, '', 'Everything you ran on many contacts at once');
      if (tab === 'restore') return restoreView(view);
      if (tab === 'tasks') return simpleTable(view, 'Tasks', ['', 'Task', 'Contact', 'Assigned to', 'Due'], [
        ['<input type="checkbox">', 'Call about Invisalign consultation', 'Olivia Bennett', 'Sarah Mitchell', '<span class="chip amber">Today</span>'],
        ['<input type="checkbox">', 'Send implant treatment plan', 'Ethan Walker', 'Sarah Mitchell', 'Tomorrow'],
        ['<input type="checkbox">', 'Chase overdue invoice INV-1045', 'Ethan Walker', 'Priya Shah', '<span class="chip red">Overdue</span>']],
        `<button class="btn primary">${icon('plus', 18)} Add task</button>`);
      if (tab === 'companies') return params[0] ? companyDetail(view, params[0]) : companiesView(view);
      return listView(view);
    },
  });
})();
