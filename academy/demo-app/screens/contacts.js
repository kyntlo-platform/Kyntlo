// Contacts (CRM) — list, smart lists, add/import, bulk actions and the contact record.
(() => {
  const { esc, icon, money, $, $$, avatar } = KY;
  const data = KY.data;
  const byId = (id) => data.contacts.find((c) => c.id === id);
  const state = { q: '', tag: '', list: 'All', selected: new Set() };
  const lists = { All: () => true, 'Invisalign leads': (c) => c.tags.includes('invisalign'), 'New this week': (c) => /2[0-1] Oct/.test(c.created), Reactivation: (c) => c.tags.includes('reactivation') };
  const tagChip = (t) => `<span class="chip ${t === 'vip' ? 'purple' : t.includes('lead') ? 'blue' : t === 'reactivation' ? 'amber' : ''}">${esc(t)}</span>`;

  function filtered() {
    const q = state.q.toLowerCase();
    return data.contacts.filter((c) => lists[state.list](c) &&
      (!q || c.name.toLowerCase().includes(q) || c.email.includes(q) || c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''))) &&
      (!state.tag || c.tags.includes(state.tag)));
  }

  function listView(view) {
    const rows = filtered();
    view.innerHTML = `
      <div class="page-head"><h1>Contacts</h1><span class="chip">${data.contacts.length} total</span>
        <div class="actions">
          <button class="btn" id="ct_import">${icon('upload', 18)} Import</button>
          <button class="btn primary" id="ct_add">${icon('plus', 18)} Add Contact</button>
        </div></div>
      <div class="row" style="gap:6px;margin-bottom:14px" id="ct_lists">
        ${Object.keys(lists).map((l) => `<button class="btn sm ${l === state.list ? 'primary' : ''}" data-list="${esc(l)}">${esc(l)}</button>`).join('')}
        <button class="btn sm ghost" id="ct_savelist">${icon('plus', 16)} Save as smart list</button>
      </div>
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)">
          <div class="search" style="width:340px"><span>${icon('search', 18)}</span><input class="input" id="ct_search" placeholder="Search name, email or phone" value="${esc(state.q)}"></div>
          <button class="btn" id="ct_filter">${icon('filter', 18)} ${state.tag ? `Tag: ${esc(state.tag)}` : 'More filters'}</button>
          ${state.tag ? `<button class="btn ghost sm" id="ct_clear">${icon('x', 16)} Clear</button>` : ''}
          <span class="spacer"></span>
          <div class="row" id="ct_bulk" style="display:${state.selected.size ? 'flex' : 'none'}">
            <span class="bold" id="ct_selcount">${state.selected.size} selected</span>
            <button class="btn sm" id="ct_bulk_tag">${icon('tag', 16)} Add tag</button>
            <button class="btn sm" id="ct_bulk_sms">${icon('sms', 16)} Send SMS</button>
            <button class="btn sm" id="ct_bulk_email">${icon('mail', 16)} Send email</button>
            <button class="btn sm" id="ct_bulk_wf">${icon('automation', 16)} Add to workflow</button>
            <button class="btn sm" id="ct_bulk_del" style="color:var(--red)">${icon('trash', 16)}</button>
          </div>
          <span class="muted" style="font-size:14px">${rows.length} contacts</span>
        </div>
        <table class="t" id="ct_table">
          <thead><tr><th style="width:44px"><input type="checkbox" id="ct_all"></th><th>Name</th><th>Phone</th><th>Email</th><th>Tags</th><th>Source</th><th>Created</th><th>Last activity</th></tr></thead>
          <tbody>${rows.map((c) => `
            <tr class="click" data-id="${c.id}">
              <td><input type="checkbox" data-sel="${c.id}" ${state.selected.has(c.id) ? 'checked' : ''}></td>
              <td><div class="row">${avatar(c.name, 32)}<span class="bold">${esc(c.name)}</span></div></td>
              <td>${esc(c.phone)}</td><td>${esc(c.email)}</td>
              <td><div class="row" style="gap:6px;flex-wrap:wrap">${c.tags.map(tagChip).join('')}</div></td>
              <td class="muted">${esc(c.source)}</td><td class="muted">${esc(c.created)}</td><td class="muted">${esc(c.last)}</td>
            </tr>`).join('')}</tbody>
        </table>
        ${rows.length ? '' : `<div class="empty"><div class="big">No contacts match</div>Try a different search or filter.</div>`}
      </div>`;

    const search = $('#ct_search');
    search.oninput = () => { state.q = search.value; const pos = search.selectionStart; listView(view); const s = $('#ct_search'); s.focus(); s.setSelectionRange(pos, pos); };
    $$('[data-list]', view).forEach((b) => (b.onclick = () => { state.list = b.dataset.list; listView(view); }));
    $('#ct_filter').onclick = (e) => KY.menu(e.currentTarget, data.tags.map((t) => ({ label: `Tag is "${t}"`, icon: 'tag', onClick: () => { state.tag = t; listView(view); } })));
    if ($('#ct_clear')) $('#ct_clear').onclick = () => { state.tag = ''; listView(view); };
    $('#ct_savelist').onclick = () => KY.modal({
      title: 'Save as smart list',
      body: `<div class="field"><label>List name</label><input class="input" id="sl_name" placeholder="e.g. Invisalign leads — Facebook"></div>
             <p class="muted" style="margin:0">Smart lists update automatically as contacts match your filters.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'sl_save', onClick: (close, box) => {
        const name = $('#sl_name', box).value || 'My list';
        const q = state.q, tag = state.tag;
        lists[name] = (c) => (!tag || c.tags.includes(tag)) && (!q || c.name.toLowerCase().includes(q.toLowerCase()));
        state.list = name; state.q = ''; state.tag = ''; close(); listView(view); KY.toast(`Smart list "${name}" saved`);
      } }],
    });
    $('#ct_add').onclick = () => addContact(view);
    $('#ct_import').onclick = () => importWizard(view);
    $$('tr.click', view).forEach((tr) => (tr.onclick = (e) => {
      if (e.target.matches('input')) return;
      KY.go(`#/contacts/detail/${tr.dataset.id}`);
    }));
    $$('[data-sel]', view).forEach((cb) => (cb.onchange = () => {
      cb.checked ? state.selected.add(cb.dataset.sel) : state.selected.delete(cb.dataset.sel);
      $('#ct_bulk').style.display = state.selected.size ? 'flex' : 'none';
      $('#ct_selcount').textContent = `${state.selected.size} selected`;
    }));
    $('#ct_all').onchange = (e) => { rows.forEach((c) => (e.target.checked ? state.selected.add(c.id) : state.selected.delete(c.id))); listView(view); };
    const done = (msg) => { state.selected.clear(); listView(view); KY.toast(msg); };
    $('#ct_bulk_tag').onclick = (e) => KY.menu(e.currentTarget, data.tags.map((t) => ({ label: t, icon: 'tag', onClick: () => {
      state.selected.forEach((id) => { const c = byId(id); if (!c.tags.includes(t)) c.tags.push(t); });
      done(`Tag "${t}" added to ${state.selected.size} contacts`);
    } })));
    $('#ct_bulk_sms').onclick = () => bulkMessage('SMS', done);
    $('#ct_bulk_email').onclick = () => bulkMessage('Email', done);
    $('#ct_bulk_wf').onclick = (e) => KY.menu(e.currentTarget, data.workflows.map((w) => ({ label: w.name, icon: 'automation', onClick: () => done(`${state.selected.size} contacts added to "${w.name}"`) })));
    $('#ct_bulk_del').onclick = () => KY.modal({ title: 'Delete contacts?', body: `<p>Deleted contacts can be restored for 60 days from <b>Contacts → Restore</b>.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Delete', primary: true, onClick: (close) => { data.contacts = data.contacts.filter((c) => !state.selected.has(c.id)); close(); done('Contacts deleted'); } }] });
  }

  function bulkMessage(kind, done) {
    KY.modal({
      title: `Send ${kind} to ${state.selected.size} contacts`,
      body: `${kind === 'Email' ? '<div class="field"><label>Subject</label><input class="input" id="bm_subject"></div>' : ''}
        <div class="field"><label>Message</label><textarea class="input" rows="5" id="bm_body" placeholder="Hi {{contact.first_name}}, …"></textarea></div>
        <div class="field"><label>When</label><select class="select"><option>Send now</option><option>Schedule for later</option><option>Drip: 10 per hour</option></select></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Send', primary: true, id: 'bm_send', onClick: (close) => { close(); done(`${kind} queued for ${state.selected.size} contacts`); } }],
    });
  }

  function addContact(view) {
    KY.modal({
      title: 'Add new contact', drawer: true,
      body: `<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
          <div class="field"><label>First name</label><input class="input" id="nc_first"></div>
          <div class="field"><label>Last name</label><input class="input" id="nc_last"></div></div>
        <div class="field"><label>Email</label><input class="input" id="nc_email"></div>
        <div class="field"><label>Phone</label><input class="input" id="nc_phone" placeholder="+44"></div>
        <div class="field"><label>Contact source</label><select class="select" id="nc_source"><option>Walk-in</option><option>Phone Call</option><option>Referral</option><option>Website Form</option></select></div>
        <div class="field"><label>Tags</label><input class="input" id="nc_tags" placeholder="Type a tag and press Enter"></div>
        <div class="field"><label>Assigned to</label><select class="select">${data.team.map((t) => `<option>${esc(t.name)}</option>`).join('')}</select></div>
        <div class="row"><button class="toggle" id="nc_dnd"></button><span>Do not disturb (all channels)</span></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'nc_save', onClick: (close, box) => {
        const name = `${$('#nc_first', box).value} ${$('#nc_last', box).value}`.trim() || 'New Contact';
        const tags = $('#nc_tags', box).value.split(',').map((t) => t.trim()).filter(Boolean);
        data.contacts.unshift({ id: 'c' + Date.now(), name, email: $('#nc_email', box).value, phone: $('#nc_phone', box).value, tags, source: $('#nc_source', box).value, created: 'Today', last: 'Just now', owner: data.me.name, value: 0 });
        close(); listView(view); KY.toast('Contact created');
      } }],
    });
    KY.toggles(document);
  }

  function importWizard(view) {
    const box = KY.modal({
      title: 'Import contacts', wide: true,
      body: `<div id="im_step"></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Next', primary: true, id: 'im_next', onClick: () => next() }],
    });
    let step = 0;
    const cols = [['First Name', 'First Name'], ['Last Name', 'Last Name'], ['Email Address', 'Email'], ['Mobile', 'Phone'], ['Treatment', 'Tag'], ['Last Visit', 'Custom field: Last visit date']];
    const steps = [
      () => `<div class="card" style="border-style:dashed;padding:46px;text-align:center;box-shadow:none" id="im_drop">
          ${icon('upload', 34)}<div class="bold" style="margin-top:10px">Drop your CSV file here, or click to browse</div>
          <div class="muted" style="font-size:14px">Up to 50,000 rows · .csv</div></div>`,
      () => `<div class="row" style="margin-bottom:14px">${icon('note', 22)}<b>patients-export.csv</b><span class="muted">· 1,248 rows</span><span class="chip green">${icon('check', 14)} Uploaded</span></div>
        <table class="t"><thead><tr><th>Column in your file</th><th>Kyntlo field</th><th>Sample</th></tr></thead><tbody>
          ${cols.map(([a, b], i) => `<tr><td class="bold">${a}</td><td><select class="select" style="height:36px"><option>${b}</option><option>Don't import</option></select></td>
          <td class="muted">${['Amelia', 'Baker', 'amelia.baker@mail.com', '07700 900117', 'check-up', '02/03/2026'][i]}</td></tr>`).join('')}</tbody></table>`,
      () => `<div class="field"><label>Add these tags to every imported contact</label><input class="input" value="reactivation, imported-oct-2026"></div>
        <div class="field"><label>If a contact already exists (same email or phone)</label><select class="select"><option>Update the existing contact</option><option>Skip it</option></select></div>
        <div class="row"><input type="checkbox" checked> <span>I confirm these contacts agreed to hear from us (consent)</span></div>`,
      () => `<div class="empty" style="padding:30px"><div style="color:var(--green)">${icon('check', 44)}</div><div class="big">Import started</div>1,248 contacts are being imported. We'll notify you when it's done.</div>`,
    ];
    const next = () => {
      step++;
      if (step >= steps.length) { box.closest('.overlay').remove(); KY.toast('1,248 contacts imported'); return; }
      $('#im_step', box).innerHTML = steps[step]();
      $('#im_next', box).textContent = step === 2 ? 'Start import' : step === 3 ? 'Done' : 'Next';
    };
    $('#im_step', box).innerHTML = steps[0]();
    $('#im_drop', box).onclick = next;
  }

  function detailView(view, id) {
    const c = byId(id);
    if (!c) return KY.go('#/contacts');
    const convo = data.conversations.find((v) => v.contact === c.id);
    const opps = data.opportunities.filter((o) => o.contact === c.id);
    const appts = data.appointments.filter((a) => a.contact === c.id);
    const activity = [
      ...(convo ? convo.messages.map((m) => ({ icon: m.from === 'them' ? 'chat' : 'send', text: `${m.from === 'them' ? c.name.split(' ')[0] : m.from === 'ai' ? 'AI agent' : 'You'}: ${m.text}`, time: m.time })) : []),
      ...appts.map((a) => ({ icon: 'calendar', text: `Appointment booked: ${data.calendars.find((k) => k.id === a.calendar).name}`, time: data.week[a.day] || 'Earlier' })),
      { icon: 'tag', text: `Tags added: ${c.tags.join(', ')}`, time: c.created },
      { icon: 'user', text: `Contact created from ${c.source}`, time: c.created },
    ];
    view.style.padding = '0';
    view.innerHTML = `
      <div style="display:grid;grid-template-columns:400px 1fr 380px;height:100%">
        <section style="background:#fff;border-right:1px solid var(--line-soft);overflow:auto">
          <div class="row" style="padding:16px 18px;border-bottom:1px solid var(--line-soft)">
            <button class="btn ghost icon sm" id="cd_back">${icon('left', 18)}</button>${avatar(c.name, 44)}
            <div><div class="bold" style="font-size:19px">${esc(c.name)}</div><div class="muted" style="font-size:14px">Added ${esc(c.created)}</div></div></div>
          <div class="row" style="padding:12px 18px;gap:8px">
            <button class="btn sm" id="cd_call">${icon('phone', 16)} Call</button><button class="btn sm" id="cd_sms">${icon('sms', 16)} SMS</button><button class="btn sm" id="cd_email">${icon('mail', 16)} Email</button></div>
          <div style="padding:6px 18px 18px">
            <div class="bold" style="margin:10px 0">Contact</div>
            ${[['First name', c.name.split(' ')[0]], ['Last name', c.name.split(' ').slice(1).join(' ')], ['Email', c.email], ['Phone', c.phone], ['Contact source', c.source], ['Assigned to', c.owner]]
              .map(([k, v]) => `<div class="field"><label>${k}</label><input class="input" value="${esc(v)}"></div>`).join('')}
            <div class="bold" style="margin:16px 0 10px">Tags</div>
            <div class="row" style="flex-wrap:wrap;gap:6px" id="cd_tags">${c.tags.map(tagChip).join('')}<button class="btn sm ghost" id="cd_addtag">${icon('plus', 16)} Add</button></div>
            <div class="bold" style="margin:18px 0 10px">Custom fields</div>
            <div class="field"><label>Treatment interest</label><input class="input" value="${esc(c.tags[0] || '')}"></div>
            <div class="field"><label>Last visit date</label><input class="input" value="02/03/2026"></div>
            <div class="bold" style="margin:18px 0 10px">Do not disturb</div>
            ${['SMS', 'Email', 'Calls', 'WhatsApp'].map((ch) => `<div class="row" style="margin:8px 0"><button class="toggle"></button>${ch}</div>`).join('')}
          </div>
        </section>
        <section style="display:flex;flex-direction:column;background:var(--bg);min-width:0">
          <div class="tabs" style="background:#fff;border-bottom:1px solid var(--line-soft);height:52px;padding:0 10px">
            <a class="active">Activity</a><a>Conversations</a><a>Notes</a></div>
          <div style="flex:1;overflow:auto;padding:20px" id="cd_activity">
            ${activity.map((a) => `<div class="card row" style="padding:12px 16px;margin-bottom:10px;box-shadow:none;align-items:flex-start">
              <span style="color:var(--blue)">${icon(a.icon, 18)}</span><span style="flex:1">${esc(a.text)}</span><span class="faint" style="font-size:13px">${esc(a.time)}</span></div>`).join('')}
          </div>
          <div style="background:#fff;border-top:1px solid var(--line-soft);padding:12px 16px">
            <div class="row" style="gap:6px;margin-bottom:8px"><span class="chip blue">SMS</span><span class="chip">Email</span><span class="chip">WhatsApp</span></div>
            <div class="row"><input class="input" id="cd_msg" placeholder="Type a message…"><button class="btn primary" id="cd_send">Send</button></div>
          </div>
        </section>
        <section style="background:#fff;border-left:1px solid var(--line-soft);overflow:auto;padding:16px 18px">
          <div class="row"><b>Opportunities</b><span class="spacer"></span><button class="btn sm ghost" id="cd_addopp">${icon('plus', 16)}</button></div>
          ${opps.map((o) => `<div class="card" style="padding:12px 14px;margin:10px 0;box-shadow:none"><div class="bold">${esc(o.name)}</div>
            <div class="row muted" style="font-size:14px">${esc(data.pipelines.find((p) => p.id === o.pipeline).stages[o.stage])}<span class="spacer"></span><b style="color:var(--ink)">${money(o.value)}</b></div></div>`).join('') || '<p class="muted">No opportunities yet.</p>'}
          <div class="row" style="margin-top:18px"><b>Appointments</b><span class="spacer"></span><button class="btn sm ghost">${icon('plus', 16)}</button></div>
          ${appts.map((a) => `<div class="card" style="padding:12px 14px;margin:10px 0;box-shadow:none"><div class="bold">${esc(data.calendars.find((k) => k.id === a.calendar).name)}</div>
            <div class="muted" style="font-size:14px">${esc(data.week[a.day])} · ${a.start}–${a.end}</div></div>`).join('') || '<p class="muted">No upcoming appointments.</p>'}
          <div class="row" style="margin-top:18px"><b>Tasks</b><span class="spacer"></span><button class="btn sm ghost" id="cd_addtask">${icon('plus', 16)}</button></div>
          <div id="cd_tasks"><div class="row" style="margin:10px 0"><input type="checkbox"> Follow up about treatment plan</div></div>
          <div class="row" style="margin-top:18px"><b>Notes</b><span class="spacer"></span><button class="btn sm ghost" id="cd_addnote">${icon('plus', 16)}</button></div>
          <div id="cd_notes"><div class="card" style="padding:12px 14px;margin:10px 0;box-shadow:none;font-size:14px">Prefers morning appointments. Nervous patient — offer a longer first visit.</div></div>
        </section>
      </div>`;
    KY.toggles(view);
    $('#cd_back').onclick = () => KY.go('#/contacts');
    $('#cd_send').onclick = () => {
      const v = $('#cd_msg').value.trim();
      if (!v) return;
      $('#cd_activity').insertAdjacentHTML('afterbegin', `<div class="card row" style="padding:12px 16px;margin-bottom:10px;box-shadow:none"><span style="color:var(--blue)">${icon('send', 18)}</span><span style="flex:1">You: ${esc(v)}</span><span class="faint" style="font-size:13px">Just now</span></div>`);
      $('#cd_msg').value = '';
      KY.toast('Message sent');
    };
    $('#cd_addtag').onclick = (e) => KY.menu(e.currentTarget, data.tags.filter((t) => !c.tags.includes(t)).map((t) => ({ label: t, icon: 'tag', onClick: () => { c.tags.push(t); detailView(view, id); KY.toast(`Tag "${t}" added`); } })));
    $('#cd_addnote').onclick = () => KY.modal({ title: 'Add note', body: `<textarea class="input" rows="5" id="cd_note_text" placeholder="Write a note…"></textarea>`,
      actions: [{ label: 'Cancel' }, { label: 'Save note', primary: true, id: 'cd_note_save', onClick: (close, box) => {
        $('#cd_notes').insertAdjacentHTML('afterbegin', `<div class="card" style="padding:12px 14px;margin:10px 0;box-shadow:none;font-size:14px">${esc($('#cd_note_text', box).value)}</div>`); close(); KY.toast('Note saved');
      } }] });
    $('#cd_addtask').onclick = () => KY.modal({ title: 'Add task', body: `<div class="field"><label>Title</label><input class="input" id="cd_task_title"></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Due</label><input class="input" value="Tomorrow, 10:00"></div>
        <div class="field"><label>Assigned to</label><select class="select">${data.team.map((t) => `<option>${esc(t.name)}</option>`).join('')}</select></div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save task', primary: true, id: 'cd_task_save', onClick: (close, box) => {
        $('#cd_tasks').insertAdjacentHTML('afterbegin', `<div class="row" style="margin:10px 0"><input type="checkbox"> ${esc($('#cd_task_title', box).value)}</div>`); close(); KY.toast('Task created');
      } }] });
    $('#cd_addopp').onclick = () => KY.go('#/opportunities');
    ['call', 'sms', 'email'].forEach((k) => ($(`#cd_${k}`).onclick = () => $('#cd_msg').focus()));
  }

  const simpleTable = (view, title, head, rows, action) => {
    view.innerHTML = `<div class="page-head"><h1>${esc(title)}</h1><div class="actions">${action || ''}</div></div>
      <div class="card"><table class="t"><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${r.map((v) => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  };

  KY.screen('contacts', {
    tabs: [{ id: 'smart-lists', label: 'Smart Lists' }, { id: 'bulk-actions', label: 'Bulk Actions' }, { id: 'restore', label: 'Restore' }, { id: 'tasks', label: 'Tasks' }, { id: 'companies', label: 'Companies' }],
    render(view, { tab, params }) {
      if (tab === 'detail') return detailView(view, params[0]);
      if (tab === 'bulk-actions') return simpleTable(view, 'Bulk Actions', ['Action', 'Contacts', 'Status', 'Started by', 'Date'], [
        ['Add tag "reactivation"', '212', '<span class="chip green">Complete</span>', 'Sarah Mitchell', '20 Oct 2026'],
        ['Send SMS — Whitening offer', '486', '<span class="chip blue">Running · 62%</span>', 'Priya Shah', '21 Oct 2026'],
        ['Import patients-export.csv', '1,248', '<span class="chip green">Complete</span>', 'Sarah Mitchell', '2 Oct 2026']]);
      if (tab === 'restore') return simpleTable(view, 'Restore deleted contacts', ['Name', 'Email', 'Deleted', 'Deleted by', ''], [
        ['Test Patient', 'test@mail.com', '19 Oct 2026', 'James Okafor', '<button class="btn sm" onclick="KY.toast(\'Contact restored\');this.closest(\'tr\').remove()">Restore</button>'],
        ['Duplicate — Mia H', 'mia.h@mail.com', '12 Oct 2026', 'Sarah Mitchell', '<button class="btn sm" onclick="KY.toast(\'Contact restored\');this.closest(\'tr\').remove()">Restore</button>']]);
      if (tab === 'tasks') return simpleTable(view, 'Tasks', ['', 'Task', 'Contact', 'Assigned to', 'Due'], [
        ['<input type="checkbox">', 'Call about Invisalign consultation', 'Olivia Bennett', 'Sarah Mitchell', '<span class="chip amber">Today</span>'],
        ['<input type="checkbox">', 'Send implant treatment plan', 'Ethan Walker', 'Sarah Mitchell', 'Tomorrow'],
        ['<input type="checkbox">', 'Chase overdue invoice INV-1045', 'Ethan Walker', 'Priya Shah', '<span class="chip red">Overdue</span>']],
        `<button class="btn primary">${icon('plus', 18)} Add task</button>`);
      if (tab === 'companies') return simpleTable(view, 'Companies', ['Company', 'Contacts', 'Phone', 'Owner'], [
        ['Marylebone Law LLP (staff plan)', '14', '+44 20 7946 0100', 'Sarah Mitchell'],
        ['Baker Street Fitness', '9', '+44 20 7946 0200', 'Priya Shah']],
        `<button class="btn primary">${icon('plus', 18)} Add company</button>`);
      return listView(view);
    },
  });
})();
