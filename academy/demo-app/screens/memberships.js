// Memberships — Client Portal, Courses (products, categories, lessons, offers, checkout) and Communities.
// Mirrors HighLevel's Memberships area. Routes:
//   #/memberships/courses/<dashboard|products|offers|analytics|settings>
//   #/memberships/courses/product/<pid>            product builder
//   #/memberships/courses/product/<pid>/lesson/<lid> lesson editor
//   #/memberships/courses/offer/<oid|new>          offer editor
//   #/memberships/communities[/<gid>]               community groups
(() => {
  const { esc, icon, money, $, $$, avatar } = KY;
  const data = KY.data;
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  // ---- Screen data (built from data.courses so names and counts stay consistent) ----
  let seq = 0, catSeq = 5;
  const L = (title, type = 'video', status = 'Published', len = '') => ({ id: 'l' + ++seq, title, type, status, len });
  const M = (data.memberships = data.memberships || {
    products: [
      { id: 'm1', title: data.courses[0].title, desc: 'Everything you need to know before, during and after Invisalign treatment.', students: data.courses[0].students, color: ['#ee46bc', '#7f56d9'], ic: 'smile', created: '2 Aug 2026',
        cats: [
          { id: 'k1', title: 'Before you start', status: 'Published', lessons: [L('Welcome to your Invisalign journey', 'video', 'Published', '3:12'), L('How your 3D scan works', 'video', 'Published', '4:05'), L('What to expect in week one', 'text')] },
          { id: 'k2', title: 'Living with aligners', status: 'Published', lessons: [L('Cleaning your aligners', 'video', 'Published', '2:48'), L('Eating and drinking', 'text'), L('Swapping to a new set', 'video', 'Published', '2:10')] },
          { id: 'k3', title: 'After treatment', status: 'Published', lessons: [L('Wearing your retainers', 'video', 'Published', '3:30'), L('Keeping your new smile', 'text')] },
        ] },
      { id: 'm2', title: data.courses[1].title, desc: 'Simple, dentist-approved habits for a healthy smile between visits.', students: data.courses[1].students, color: ['#12b76a', '#06aed4'], ic: 'heart', created: '14 Jun 2026',
        cats: [
          { id: 'k4', title: 'Your daily routine', status: 'Published', lessons: [L('Brushing the right way', 'video', 'Published', '3:40'), L('Flossing made easy', 'video', 'Published', '2:55'), L('Choosing a toothpaste', 'text')] },
          { id: 'k5', title: 'Food, drink & your teeth', status: 'Published', lessons: [L('Snacks that protect enamel', 'video', 'Published', '3:05'), L('Drinks to watch', 'text')] },
        ] },
    ],
    offers: [
      { id: 'of1', title: 'Invisalign patients — free access', products: ['m1'], pricing: 'Free', amount: 0, students: 64, status: 'Published' },
      { id: 'of2', title: 'Smile Care at Home — free', products: ['m2'], pricing: 'Free', amount: 0, students: 212, status: 'Published' },
    ],
    enrolments: [
      ['Isla Thompson', 'Invisalign patients — free access', '12 Oct 2026'],
      ['Sophie Turner', 'Invisalign patients — free access', '16 Oct 2026'],
      ['Noah Williams', 'Smile Care at Home — free', '15 Oct 2026'],
      ['Daniel Hughes', 'Smile Care at Home — free', '20 Oct 2026'],
    ],
    groups: [
      { id: 'g1', name: 'Bloom Smile Club', desc: 'Tips, Q&As and support for Bloom patients.', privacy: 'Private', members: 148, color: ['#155eef', '#7f56d9'],
        channels: [['general', 'Everyone'], ['announcements', 'Admins only'], ['smile-wins', 'Everyone'], ['ask-the-dentist', 'Everyone']],
        posts: [
          { by: 'Sarah Mitchell', role: 'Admin', ch: 'announcements', title: 'Welcome to the Bloom Smile Club! 🎉', body: 'This is your space to ask questions, share your progress and pick up tips from our team. Start by introducing yourself in #general.', time: '2 days ago', likes: 34, comments: 12, pinned: true },
          { by: 'Isla Thompson', role: 'Member', ch: 'smile-wins', title: 'Week 6 of Invisalign!', body: "Honestly didn't think I'd stick with it but the aligners are so easy now. Already seeing a difference.", time: '5 hours ago', likes: 18, comments: 6 },
          { by: 'Priya Shah', role: 'Admin', ch: 'ask-the-dentist', title: 'Q: Is whitening safe for sensitive teeth?', body: 'Great question from a member this week. Short answer: yes, with the right gel. Watch the Whitening Aftercare lesson in the Learning tab for the full routine.', time: 'Yesterday', likes: 22, comments: 9 },
        ] },
    ],
  });
  const S = { groupTab: 'Feed', channel: 'all' };
  const product = (id) => M.products.find((p) => p.id === id);
  const lessonCount = (p) => p.cats.reduce((n, c) => n + c.lessons.length, 0);
  const thumb = (p, h = 150, r = 10) => `<div style="height:${h}px;border-radius:${r}px ${r}px 0 0;background:linear-gradient(135deg,${p.color[0]},${p.color[1]});display:grid;place-items:center;color:#fff">${icon(p.ic || 'cap', Math.round(h / 3))}</div>`;
  const status = (s) => `<span class="chip ${s === 'Published' ? 'green' : 'amber'}">${s}</span>`;
  const seg = (name, opts, cur, idp) => `<div class="mb-seg">${opts.map((o) => `<button class="${o === cur ? 'on' : ''}" data-seg="${name}" data-val="${esc(o)}" id="${idp}_${slug(o)}">${esc(o)}</button>`).join('')}</div>`;
  const wireSeg = (root, cb) => $$('[data-seg]', root).forEach((b) => (b.onclick = () => { $$(`[data-seg="${b.dataset.seg}"]`, root).forEach((x) => x.classList.toggle('on', x === b)); cb && cb(b.dataset.seg, b.dataset.val); }));

  function css() {
    if ($('#css-memberships')) return;
    const s = document.createElement('style');
    s.id = 'css-memberships';
    s.textContent = `
      .mb-sub { display:flex; gap:4px; border-bottom:1px solid var(--line); margin:-4px 0 22px; }
      .mb-sub a { padding:10px 14px; color:var(--ink-2); font-weight:500; border-bottom:2px solid transparent; margin-bottom:-1px; }
      .mb-sub a.on { color:var(--blue); border-bottom-color:var(--blue); font-weight:600; }
      .mb-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(330px,1fr)); gap:20px; }
      .mb-prod { cursor:pointer; overflow:hidden; transition:box-shadow .15s; }
      .mb-prod:hover { box-shadow:0 8px 20px rgba(16,24,40,.12); }
      .mb-cat { margin-bottom:16px; overflow:hidden; }
      .mb-cat-h { display:flex; align-items:center; gap:10px; padding:14px 18px; background:#f9fafb; border-bottom:1px solid var(--line-soft); }
      .mb-les { display:flex; align-items:center; gap:12px; padding:12px 18px; border-bottom:1px solid var(--line-soft); cursor:pointer; }
      .mb-les:last-child { border-bottom:0; }
      .mb-les:hover { background:#f9fafb; }
      .mb-les .grip { color:var(--faint); }
      .mb-seg { align-self:flex-start; display:inline-flex; border:1px solid var(--line); border-radius:8px; overflow:hidden; }
      .mb-seg button { border:0; background:#fff; padding:8px 14px; font-weight:600; font-size:14px; color:var(--ink-2); border-right:1px solid var(--line); }
      .mb-seg button:last-child { border-right:0; }
      .mb-seg button.on { background:var(--blue); color:#fff; }
      .mb-drop { border:2px dashed var(--line); border-radius:12px; padding:38px; text-align:center; color:var(--muted); cursor:pointer; background:#fcfcfd; }
      .mb-video { position:relative; border-radius:12px; overflow:hidden; height:330px; background:linear-gradient(135deg,#0b1220,#1d2939); display:grid; place-items:center; color:#fff; }
      .mb-video .play { width:74px; height:74px; border-radius:50%; background:rgba(255,255,255,.18); display:grid; place-items:center; backdrop-filter:blur(4px); }
      .mb-video .bar { position:absolute; left:16px; right:16px; bottom:14px; display:flex; align-items:center; gap:10px; font-size:13px; }
      .mb-video .bar i { flex:1; height:4px; border-radius:4px; background:rgba(255,255,255,.3); display:block; }
      .mb-rte { border:1px solid var(--line); border-radius:10px; overflow:hidden; }
      .mb-rte .tb { display:flex; gap:2px; padding:6px 8px; border-bottom:1px solid var(--line-soft); background:#f9fafb; }
      .mb-rte .tb span { width:32px; height:30px; display:grid; place-items:center; border-radius:6px; color:var(--ink-2); font-weight:700; font-size:14px; }
      .mb-rte .body { min-height:170px; padding:14px 16px; outline:none; line-height:1.6; }
      .mb-rte .body:empty::before { content:attr(data-ph); color:var(--faint); }
      .mb-check { display:flex; align-items:center; gap:12px; padding:12px 14px; border:1px solid var(--line); border-radius:10px; margin-bottom:10px; cursor:pointer; }
      .mb-check.on { border-color:var(--blue); background:var(--blue-soft); }
      .mb-check .box { width:20px; height:20px; border-radius:5px; border:2px solid var(--line); display:grid; place-items:center; color:#fff; flex:none; }
      .mb-check.on .box { background:var(--blue); border-color:var(--blue); }
      .mb-mini { width:46px; height:34px; border-radius:7px; display:grid; place-items:center; color:#fff; flex:none; }
      .mb-co { display:grid; grid-template-columns:1fr 1fr; min-height:480px; }
      .mb-co .l { background:#f9fafb; padding:30px; border-right:1px solid var(--line-soft); }
      .mb-co .r { padding:30px; }
      .mb-ch a { display:flex; align-items:center; gap:8px; padding:8px 12px; border-radius:8px; color:var(--ink-2); font-weight:500; cursor:pointer; }
      .mb-ch a.on { background:var(--blue-soft); color:#004eeb; font-weight:600; }
      .mb-post { padding:18px 20px; margin-bottom:14px; }
      .mb-gtabs { display:flex; gap:4px; border-bottom:1px solid var(--line-soft); padding:0 14px; background:#fff; }
      .mb-gtabs a { padding:12px 12px; color:var(--ink-2); font-weight:500; border-bottom:2px solid transparent; cursor:pointer; }
      .mb-gtabs a.on { color:var(--blue); border-bottom-color:var(--blue); font-weight:600; }
    `;
    document.head.appendChild(s);
  }

  const SUBS = [['dashboard', 'Dashboard'], ['products', 'Products'], ['offers', 'Offers'], ['analytics', 'Analytics'], ['settings', 'Settings']];
  const subnav = (cur) => `<div class="mb-sub" id="mb_subnav">${SUBS.map(([k, l]) => `<a href="#/memberships/courses/${k}" id="mb_sub_${k}" class="${k === cur ? 'on' : ''}">${l}</a>`).join('')}</div>`;
  const pageHead = (title, sub, actions = '') => `<div class="page-head"><h1>${esc(title)}</h1>${sub ? `<span class="sub">${sub}</span>` : ''}<div class="actions">${actions}</div></div>`;

  // ---------- Courses: dashboard ----------
  function dashboard(view) {
    const members = M.products.reduce((n, p) => n + p.students, 0);
    view.innerHTML = `${pageHead('Courses', '', `<button class="btn" id="mb_preview_portal">${icon('eye', 18)} Preview portal</button><button class="btn primary" id="mb_new_product">${icon('plus', 18)} Create Product</button>`)}${subnav('dashboard')}
      <div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
        ${[['Products', M.products.length, 'cap', '#7f56d9'], ['Offers', M.offers.length, 'tag', '#ee46bc'], ['Members', members, 'users', '#155eef'], ['Lessons completed (30 days)', 1286, 'check', '#12b76a']].map(([k, v, ic, col]) => `<div class="card stat"><div class="k row" style="gap:8px"><span style="color:${col}">${icon(ic, 18)}</span>${k}</div><div class="v">${Number(v).toLocaleString('en-GB')}</div></div>`).join('')}
      </div>
      <div class="grid" style="grid-template-columns:1.3fr 1fr;align-items:start">
        <div class="card" id="mb_enrolments"><div class="card-h"><h3>Recent enrolments</h3></div>
          <table class="t"><thead><tr><th>Member</th><th>Offer</th><th>Enrolled</th></tr></thead><tbody>
          ${M.enrolments.slice().reverse().map(([n, o, d], i) => `<tr id="mb_enrol_${i}"><td><div class="row">${avatar(n, 30)}<b>${esc(n)}</b>${d === 'Just now' ? '<span class="chip green">New</span>' : ''}</div></td><td>${esc(o)}</td><td class="muted">${esc(d)}</td></tr>`).join('')}</tbody></table></div>
        <div class="card"><div class="card-h"><h3>Your products</h3></div><div class="card-b">
          ${M.products.map((p) => `<div class="row" style="margin-bottom:14px"><span class="mb-mini" style="background:linear-gradient(135deg,${p.color[0]},${p.color[1]})">${icon(p.ic || 'cap', 18)}</span><div style="flex:1"><b>${esc(p.title)}</b><div class="muted" style="font-size:14px">${lessonCount(p)} lessons · ${p.students} members</div></div></div>`).join('')}
        </div></div>
      </div>`;
    $('#mb_new_product').onclick = createProduct;
    $('#mb_preview_portal').onclick = () => preview(M.products[0]);
  }

  // ---------- Courses: products ----------
  function products(view) {
    view.innerHTML = `${pageHead('Courses', '', `<button class="btn primary" id="mb_new_product">${icon('plus', 18)} Create Product</button>`)}${subnav('products')}
      <div class="mb-grid" id="mb_products">${M.products.map((p) => `
        <div class="card mb-prod" data-p="${p.id}" id="mb_prod_${p.id}">${thumb(p)}
          <div class="card-b"><div class="row"><b style="font-size:17px;flex:1">${esc(p.title)}</b><button class="btn ghost icon sm">${icon('more', 18)}</button></div>
            <div class="muted" style="font-size:14px;margin:4px 0 12px;min-height:40px">${esc(p.desc)}</div>
            <div class="row" style="font-size:14px"><span class="row" style="gap:6px">${icon('book', 16)} ${lessonCount(p)} lessons</span><span class="row" style="gap:6px;margin-left:14px">${icon('users', 16)} ${p.students} members</span></div></div></div>`).join('')}
      </div>`;
    $$('[data-p]', view).forEach((c) => (c.onclick = () => KY.go(`#/memberships/courses/product/${c.dataset.p}`)));
    $('#mb_new_product').onclick = createProduct;
  }

  function createProduct() {
    KY.modal({
      title: 'Create product',
      body: `<div class="field"><label>Product title</label><input class="input" id="np_title" placeholder="e.g. Whitening Aftercare"></div>
        <div class="field"><label>Description</label><textarea class="input" rows="3" id="np_desc" placeholder="What will members learn?"></textarea></div>
        <p class="muted" style="font-size:14px;margin:0">You'll add categories and lessons next. Nobody can see the product until it's part of an offer.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Create product', primary: true, id: 'np_create', onClick: (close, b) => {
        const p = { id: 'm' + (M.products.length + 1), title: $('#np_title', b).value || 'New product', desc: $('#np_desc', b).value || '', students: 0, color: ['#f79009', '#ee46bc'], ic: 'sparkle', created: '21 Oct 2026', cats: [] };
        M.products.push(p); close(); KY.toast('Product created'); KY.go(`#/memberships/courses/product/${p.id}`);
      } }],
    });
  }

  // ---------- Product builder ----------
  function builder(view, pid) {
    const p = product(pid);
    if (!p) return KY.go('#/memberships/courses/products');
    const inOffers = M.offers.filter((o) => o.products.includes(p.id));
    view.innerHTML = `
      <div class="page-head"><button class="btn ghost icon" id="pb_back">${icon('left', 20)}</button>
        <span class="mb-mini" style="background:linear-gradient(135deg,${p.color[0]},${p.color[1]})">${icon(p.ic || 'cap', 18)}</span>
        <div><h1>${esc(p.title)}</h1><div class="sub">${lessonCount(p)} lessons · ${p.cats.length} categories</div></div>
        <div class="actions"><button class="btn" id="pb_preview">${icon('eye', 18)} Preview</button><button class="btn primary" id="pb_add_cat">${icon('plus', 18)} Add Category</button></div></div>
      <div class="grid" style="grid-template-columns:1fr 380px;align-items:start">
        <div id="pb_cats">${p.cats.length ? p.cats.map((c) => `
          <div class="card mb-cat" id="pb_cat_${c.id}">
            <div class="mb-cat-h"><span class="grip faint">${icon('grip', 18)}</span>${icon('folder', 20)}<b style="flex:1;font-size:16.5px">${esc(c.title)}</b>${status(c.status)}
              <button class="btn sm" data-addles="${c.id}" id="pb_add_lesson_${c.id}">${icon('plus', 16)} Add Lesson</button><button class="btn ghost icon sm">${icon('more', 18)}</button></div>
            ${c.lessons.map((l) => `<div class="mb-les" data-les="${l.id}" id="pb_les_${l.id}"><span class="grip">${icon('grip', 16)}</span>
              <span style="color:${l.type === 'video' ? 'var(--blue)' : 'var(--muted)'}">${icon(l.type === 'video' ? 'video' : 'note', 18)}</span><span style="flex:1">${esc(l.title)}</span>
              ${l.len ? `<span class="muted" style="font-size:14px">${l.len}</span>` : ''}${status(l.status)}</div>`).join('') || `<div class="muted" style="padding:14px 18px">No lessons yet — click <b>Add Lesson</b>.</div>`}
          </div>`).join('') : `<div class="card empty" id="pb_empty"><div style="color:var(--blue)">${icon('layers', 40)}</div><div class="big">Start with a category</div>Categories are the chapters of your course. Each one holds lessons.<div style="margin-top:16px"><button class="btn primary" id="pb_add_cat2">${icon('plus', 18)} Add Category</button></div></div>`}
        </div>
        <div>
          <div class="card" style="margin-bottom:20px;overflow:hidden" id="pb_details">${thumb(p, 120, 0)}<div class="card-b">
            <div class="field"><label>Product title</label><input class="input" value="${esc(p.title)}"></div>
            <div class="field" style="margin-bottom:0"><label>Description</label><textarea class="input" rows="3">${esc(p.desc)}</textarea></div></div></div>
          <div class="card" id="pb_offers"><div class="card-h"><h3>Offers</h3><span class="spacer"></span><a href="#/memberships/courses/offers" style="font-size:14px">Manage</a></div><div class="card-b">
            ${inOffers.length ? inOffers.map((o) => `<div class="row" style="margin-bottom:8px">${icon('tag', 16)}<span style="flex:1">${esc(o.title)}</span>${o.pricing === 'Free' ? '<span class="chip">Free</span>' : `<span class="chip blue">${money(o.amount)}${o.pricing === 'Subscription' ? '/mo' : ''}</span>`}</div>`).join('')
              : `<div class="muted" style="font-size:14px">Not in any offer yet. Members get access to products through <b>offers</b> — that's next.</div>`}</div></div>
        </div>
      </div>`;
    $('#pb_back').onclick = () => KY.go('#/memberships/courses/products');
    $('#pb_preview').onclick = () => preview(p);
    const addCat = () => {
      const box = KY.modal({
        title: 'Add category',
        body: `<div class="field"><label>Category title</label><input class="input" id="nc_cat_title" placeholder="e.g. Your first 48 hours"></div>
          <div class="field"><label>Description</label><textarea class="input" rows="2" id="nc_cat_desc" placeholder="Optional"></textarea></div>
          <div class="field" style="margin-bottom:0"><label>Visibility</label>${seg('vis', ['Published', 'Draft'], 'Published', 'nc_cat')}</div>`,
        actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'nc_cat_save', onClick: (close, b) => {
          p.cats.push({ id: 'k' + ++catSeq, title: $('#nc_cat_title', b).value || 'New category', status: $('[data-seg="vis"].on', b).dataset.val, lessons: [] });
          close(); builder(view, pid); KY.toast('Category added');
        } }],
      });
      wireSeg(box);
    };
    $('#pb_add_cat').onclick = addCat;
    if ($('#pb_add_cat2')) $('#pb_add_cat2').onclick = addCat;
    $$('[data-addles]', view).forEach((b) => (b.onclick = () => {
      const c = p.cats.find((x) => x.id === b.dataset.addles);
      const l = L('', 'video', 'Draft');
      l.fresh = true; c.lessons.push(l);
      KY.go(`#/memberships/courses/product/${pid}/lesson/${l.id}`);
    }));
    $$('[data-les]', view).forEach((r) => (r.onclick = () => KY.go(`#/memberships/courses/product/${pid}/lesson/${r.dataset.les}`)));
  }

  // ---------- Lesson editor ----------
  function lessonEditor(view, pid, lid) {
    const p = product(pid);
    const cat = p?.cats.find((c) => c.lessons.some((l) => l.id === lid));
    const l = cat?.lessons.find((x) => x.id === lid);
    if (!l) return KY.go(`#/memberships/courses/product/${pid}`);
    let st = l.status;
    let hasVideo = l.type === 'video' && !!l.len;
    view.innerHTML = `
      <div class="page-head"><button class="btn ghost icon" id="le_back">${icon('left', 20)}</button>
        <div><div class="sub">${esc(p.title)} › ${esc(cat.title)}</div><h1>${l.title ? esc(l.title) : 'New lesson'}</h1></div>
        <div class="actions"><button class="btn" id="le_cancel">Cancel</button><button class="btn primary" id="le_save">Save</button></div></div>
      <div class="grid" style="grid-template-columns:1fr 360px;align-items:start">
        <div class="card"><div class="card-b">
          <div class="field"><label>Lesson title</label><input class="input" id="le_title" value="${esc(l.title)}" placeholder="e.g. Foods to avoid for 48 hours"></div>
          <div class="field"><label>Video</label><div id="le_video"></div></div>
          <div class="field"><label>Lesson text</label><div class="mb-rte"><div class="tb">${['B', 'I', 'U'].map((t) => `<span style="${t === 'I' ? 'font-style:italic' : t === 'U' ? 'text-decoration:underline' : ''}">${t}</span>`).join('')}<span>${icon('list', 16)}</span><span>${icon('link', 16)}</span><span>${icon('image', 16)}</span></div>
            <div class="body" contenteditable="true" id="le_body" data-ph="Add notes, steps or a transcript for this lesson…">${l.body ? esc(l.body) : ''}</div></div></div>
          <div class="field" style="margin-bottom:0"><label>Lesson materials</label><div class="row" id="le_files"><button class="btn sm" id="le_attach">${icon('paperclip', 16)} Add file</button><span class="muted" style="font-size:14px">PDFs, worksheets or checklists members can download</span></div></div>
        </div></div>
        <div>
          <div class="card" style="margin-bottom:20px"><div class="card-h"><h3>Status</h3></div><div class="card-b">
            ${seg('status', ['Published', 'Draft'], st, 'le_status')}
            <p class="muted" style="font-size:14px;margin:12px 0 0">Draft lessons are hidden from members until you publish them.</p></div></div>
          <div class="card" style="margin-bottom:20px"><div class="card-h"><h3>Drip content</h3></div><div class="card-b">
            <div class="row"><button class="toggle" id="le_drip"></button><span>Unlock after a delay</span></div>
            <p class="muted" style="font-size:14px;margin:10px 0 0">Release this lesson a set number of days after someone joins.</p></div></div>
          <div class="card"><div class="card-h"><h3>Thumbnail</h3></div><div class="card-b"><div class="mb-drop" style="padding:22px">${icon('image', 26)}<div style="font-size:14px;margin-top:6px">Upload an image</div></div></div></div>
        </div>
      </div>`;
    KY.toggles(view);
    const paintVideo = () => {
      $('#le_video').innerHTML = hasVideo
        ? `<div class="mb-video" id="le_player"><div class="play">${icon('play', 32)}</div><div class="bar"><span>0:00</span><i></i><span>${l.len || '3:42'}</span></div></div>
           <div class="row" style="margin-top:8px;font-size:14px"><span class="chip green">${icon('check', 13)} Uploaded</span><span class="muted">${esc(l.file || slug(l.title || 'lesson') + '.mp4')}</span><span class="spacer"></span><button class="btn ghost sm" id="le_video_remove">Replace</button></div>`
        : `<div class="mb-drop" id="le_video_drop">${icon('video', 34)}<div class="bold" style="margin-top:8px;color:var(--ink)">Drop a video here, or click to upload</div><div style="font-size:14px">MP4 or MOV · or paste a YouTube, Vimeo or Wistia link</div></div>`;
      if ($('#le_video_drop')) $('#le_video_drop').onclick = () => {
        $('#le_video_drop').innerHTML = `${icon('upload', 30)}<div class="bold" style="margin-top:8px;color:var(--ink)">Uploading… 100%</div>`;
        setTimeout(() => { hasVideo = true; l.len = l.len || '3:42'; l.file = 'whitening-48-hours.mp4'; paintVideo(); }, 500);
      };
      if ($('#le_video_remove')) $('#le_video_remove').onclick = () => { hasVideo = false; paintVideo(); };
    };
    paintVideo();
    wireSeg(view, (k, v) => { if (k === 'status') st = v; });
    $('#le_attach').onclick = () => { $('#le_files').insertAdjacentHTML('afterbegin', `<span class="chip blue" style="height:34px">${icon('note', 15)} 48-hour-food-guide.pdf</span>`); $('#le_attach').remove(); KY.toast('File attached'); };
    const back = () => KY.go(`#/memberships/courses/product/${pid}`);
    $('#le_back').onclick = () => { if (l.fresh && !l.title) cat.lessons.splice(cat.lessons.indexOf(l), 1); back(); };
    $('#le_cancel').onclick = $('#le_back').onclick;
    $('#le_save').onclick = () => {
      l.title = $('#le_title').value || 'Untitled lesson'; l.status = st; l.body = $('#le_body').innerText; l.type = hasVideo ? 'video' : 'text'; l.fresh = false;
      if (!hasVideo) l.len = '';
      KY.toast(st === 'Published' ? 'Lesson published' : 'Lesson saved as draft'); back();
    };
  }

  // ---------- Learner preview ----------
  function preview(p) {
    const first = p.cats[0]?.lessons.find((l) => l.status === 'Published') || p.cats[0]?.lessons[0];
    KY.modal({
      title: 'Preview — member view', wide: true,
      body: `<div style="border:1px solid var(--line);border-radius:12px;overflow:hidden" id="pv_portal">
        <div class="row" style="padding:12px 16px;background:#101828;color:#fff"><b>Bloom Dental Studio</b><span class="faint" style="margin-left:8px;font-size:13px">portal.bloomdental.co.uk</span><span class="spacer"></span>${avatar('Emma Clarke', 28)}</div>
        <div style="display:grid;grid-template-columns:260px 1fr">
          <div style="border-right:1px solid var(--line-soft);padding:14px;max-height:430px;overflow:auto"><b>${esc(p.title)}</b>
            <div style="height:6px;border-radius:6px;background:#f2f4f7;margin:10px 0 4px"><div style="width:0%;height:100%;background:var(--green)"></div></div><div class="muted" style="font-size:12px;margin-bottom:10px">0% complete</div>
            ${p.cats.filter((c) => c.status === 'Published').map((c) => `<div style="margin-top:10px;font-weight:600;font-size:14px">${esc(c.title)}</div>${c.lessons.filter((l) => l.status === 'Published').map((l) => `<div class="row" style="font-size:13.5px;padding:6px 4px;${l === first ? 'color:var(--blue);font-weight:600' : ''}">${icon(l.type === 'video' ? 'play' : 'note', 13)} ${esc(l.title)}</div>`).join('')}`).join('')}
          </div>
          <div style="padding:18px">${first ? `<div class="mb-video" style="height:300px"><div class="play">${icon('play', 30)}</div></div><h3 style="margin:14px 0 4px">${esc(first.title)}</h3><div class="muted" style="font-size:14px">${esc(first.body || 'Lesson notes appear here, under the video.')}</div>
            <div class="row" style="margin-top:14px"><span class="spacer"></span><button class="btn primary sm">${icon('check', 14)} Mark as complete</button></div>` : '<div class="empty">No published lessons yet.</div>'}</div>
        </div></div>`,
    });
  }

  // ---------- Offers ----------
  function offers(view) {
    view.innerHTML = `${pageHead('Courses', '', `<button class="btn primary" id="of_new">${icon('plus', 18)} Create Offer</button>`)}${subnav('offers')}
      <div class="card"><table class="t" id="of_table"><thead><tr><th>Offer</th><th>Products</th><th>Price</th><th>Members</th><th>Status</th></tr></thead><tbody>
      ${M.offers.map((o) => `<tr class="click" data-of="${o.id}" id="of_row_${o.id}"><td><div class="row"><span style="color:#ee46bc">${icon('tag', 18)}</span><b>${esc(o.title)}</b></div></td>
        <td>${o.products.map((id) => `<span class="chip" style="margin:2px">${esc(product(id)?.title || '')}</span>`).join('')}</td>
        <td>${o.pricing === 'Free' ? 'Free' : `${money(o.amount)}${o.pricing === 'Subscription' ? ' / month' : ''}`}</td><td>${o.students}</td><td>${status(o.status)}</td></tr>`).join('')}
      </tbody></table></div>`;
    $('#of_new').onclick = () => KY.go('#/memberships/courses/offer/new');
    $$('[data-of]', view).forEach((r) => (r.onclick = () => KY.go(`#/memberships/courses/offer/${r.dataset.of}`)));
  }

  function offerEditor(view, oid) {
    let o = M.offers.find((x) => x.id === oid);
    const draft = o ? { ...o, products: [...o.products] } : { id: 'of' + (M.offers.length + 1), title: '', products: [], pricing: 'Free', amount: 0, students: 0, status: 'Draft' };
    const link = () => `portal.bloomdental.co.uk/courses/offers/${slug(draft.title || 'new-offer')}`;
    view.innerHTML = `
      <div class="page-head"><button class="btn ghost icon" id="of_back">${icon('left', 20)}</button><h1 id="of_heading">${o ? esc(o.title) : 'New offer'}</h1>${status(draft.status)}
        <div class="actions"><button class="btn" id="of_preview">${icon('eye', 18)} Preview checkout</button><button class="btn primary" id="of_publish">${draft.status === 'Published' ? 'Save' : 'Publish offer'}</button></div></div>
      <div class="grid" style="grid-template-columns:1fr 400px;align-items:start">
        <div>
          <div class="card" style="margin-bottom:20px"><div class="card-h"><h3>1. Offer details</h3></div><div class="card-b">
            <div class="field"><label>Offer title</label><input class="input" id="of_title" value="${esc(draft.title)}" placeholder="e.g. Bloom Smile Club"></div>
            <div class="field" style="margin-bottom:0"><label>Description</label><textarea class="input" rows="2" id="of_desc" placeholder="Shown on the checkout page"></textarea></div></div></div>
          <div class="card" style="margin-bottom:20px"><div class="card-h"><h3>2. Products in this offer</h3></div><div class="card-b" id="of_products">
            ${M.products.map((p) => `<div class="mb-check ${draft.products.includes(p.id) ? 'on' : ''}" data-prod="${p.id}" id="of_prod_${p.id}"><span class="box">${icon('check', 14)}</span><span class="mb-mini" style="background:linear-gradient(135deg,${p.color[0]},${p.color[1]})">${icon(p.ic || 'cap', 16)}</span><div style="flex:1"><b>${esc(p.title)}</b><div class="muted" style="font-size:13px">${lessonCount(p)} lessons</div></div></div>`).join('')}
            <div class="mb-check" id="of_prod_community"><span class="box">${icon('check', 14)}</span><span class="mb-mini" style="background:linear-gradient(135deg,#155eef,#7f56d9)">${icon('community', 16)}</span><div style="flex:1"><b>Bloom Smile Club community</b><div class="muted" style="font-size:13px">Community group</div></div></div>
          </div></div>
          <div class="card"><div class="card-h"><h3>3. Pricing</h3></div><div class="card-b">
            <div class="field"><label>Price type</label>${seg('pricing', ['Free', 'One time', 'Subscription', 'Payment plan'], draft.pricing, 'of_price')}</div>
            <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px;${draft.pricing === 'Free' ? 'display:none' : ''}" id="of_amount_row">
              <div class="field"><label>Amount (GBP)</label><input class="input" id="of_amount" value="${draft.amount || ''}" placeholder="0.00"></div>
              <div class="field" id="of_interval_f"><label>Billing</label><input class="input" value="Every month" readonly></div></div>
            <div class="row muted" style="font-size:14px">${icon('card', 16)} Payments go through your connected Stripe account.</div></div></div>
        </div>
        <div>
          <div class="card" style="margin-bottom:20px" id="of_access"><div class="card-h"><h3>Access</h3></div><div class="card-b">
            <div class="row" style="margin-bottom:12px;align-items:flex-start"><button class="toggle on"></button><div><b>Grant access automatically</b><div class="muted" style="font-size:14px">As soon as the payment succeeds, the buyer is enrolled in every product above.</div></div></div>
            <div class="row" style="align-items:flex-start"><button class="toggle on"></button><div><b>Send login details by email</b><div class="muted" style="font-size:14px">New members get a welcome email with a link to set their password.</div></div></div></div></div>
          <div class="card" id="of_share"><div class="card-h"><h3>Share your offer</h3></div><div class="card-b">
            <div class="field"><label>Checkout link</label><div class="row"><input class="input" id="of_link" readonly value="${esc(link())}"><button class="btn" id="of_copy">${icon('copy', 16)}</button></div></div>
            <div class="muted" style="font-size:14px">Or sell it from a funnel: add this offer to a product, then use that product in an order form.</div></div></div>
        </div>
      </div>`;
    KY.toggles(view);
    const paintProducts = () => $$('[data-prod]', view).forEach((c) => c.classList.toggle('on', draft.products.includes(c.dataset.prod)));
    $$('[data-prod]', view).forEach((c) => (c.onclick = () => { const id = c.dataset.prod; draft.products = draft.products.includes(id) ? draft.products.filter((x) => x !== id) : [...draft.products, id]; paintProducts(); }));
    $('#of_prod_community').onclick = (e) => e.currentTarget.classList.toggle('on');
    $('#of_title').oninput = (e) => { draft.title = e.target.value; $('#of_link').value = link(); };
    wireSeg(view, (k, v) => { if (k === 'pricing') { draft.pricing = v; $('#of_amount_row').style.display = v === 'Free' ? 'none' : 'grid'; $('#of_interval_f').style.visibility = v === 'Subscription' ? 'visible' : 'hidden'; } });
    $('#of_back').onclick = () => KY.go('#/memberships/courses/offers');
    $('#of_copy').onclick = () => KY.toast('Checkout link copied');
    const collect = () => { draft.title = $('#of_title').value || 'New offer'; draft.amount = parseFloat($('#of_amount').value) || 0; };
    $('#of_publish').onclick = () => {
      collect(); draft.status = 'Published';
      if (o) Object.assign(o, draft); else { M.offers.push(draft); o = draft; }
      KY.toast(`Offer "${draft.title}" published`);
      $('#of_heading').textContent = draft.title;
      $('#of_publish').textContent = 'Save';
      const chip = $('.page-head .chip', view); if (chip) chip.outerHTML = status('Published');
    };
    $('#of_preview').onclick = () => { collect(); checkout(draft, () => { if (o) o.students++; }); };
  }

  function checkout(offer, onPaid) {
    const price = offer.pricing === 'Free' ? 'Free' : `${money(offer.amount, 2)}${offer.pricing === 'Subscription' ? ' / month' : ''}`;
    const box = KY.modal({
      title: 'Checkout preview', wide: true,
      body: `<div class="card mb-co" style="box-shadow:none;overflow:hidden" id="co_page">
        <div class="l"><div class="muted" style="font-size:14px">Bloom Dental Studio</div><div style="font-size:26px;font-weight:700;margin:6px 0">${esc(offer.title || 'New offer')}</div>
          <div style="font-size:30px;font-weight:800;color:var(--blue)" id="co_price">${price}</div>
          <div style="margin-top:18px"><b>What's included</b>${offer.products.map((id) => `<div class="row" style="margin:10px 0">${icon('check', 18)}<span>${esc(product(id)?.title || '')}</span></div>`).join('')}
          <div class="row" style="margin:10px 0">${icon('check', 18)}<span>Members-only community</span></div></div></div>
        <div class="r" id="co_form">
          <div class="field"><label>Full name</label><input class="input" id="co_name" value=""></div>
          <div class="field"><label>Email</label><input class="input" id="co_email" value=""></div>
          <div class="field"><label>Card details</label><div class="input row" style="justify-content:space-between;color:var(--muted)"><span>${icon('card', 18)} 4242 4242 4242 4242</span><span>12/28 · 123</span></div></div>
          <button class="btn primary" style="width:100%;justify-content:center;height:46px;margin-top:6px" id="co_pay">${offer.pricing === 'Free' ? 'Get access' : `Pay ${price}`}</button>
          <div class="muted" style="font-size:13px;text-align:center;margin-top:10px">${icon('lock', 13)} Test mode — no real charge</div></div>
      </div>`,
    });
    $('#co_pay', box).onclick = () => {
      const name = $('#co_name', box).value || 'Emma Clarke';
      M.enrolments.push([name, offer.title, 'Just now']);
      onPaid && onPaid();
      $('#co_form', box).innerHTML = `<div class="empty" style="padding:50px 10px"><div style="color:var(--green)">${icon('check', 48)}</div><div class="big">You're in, ${esc(name.split(' ')[0])}!</div>Check your email for your login link.<div style="margin-top:14px"><span class="chip green">Enrolled automatically</span></div></div>`;
    };
  }

  function analytics(view) {
    view.innerHTML = `${pageHead('Courses')}${subnav('analytics')}
      <div class="card"><table class="t"><thead><tr><th>Product</th><th>Members</th><th>Avg. completion</th><th>Most watched lesson</th></tr></thead><tbody>
        ${M.products.map((p, i) => `<tr><td><b>${esc(p.title)}</b></td><td>${p.students}</td><td><div class="row"><div style="width:140px;height:8px;border-radius:8px;background:#f2f4f7"><div style="width:${[62, 48, 0][i] || 0}%;height:100%;border-radius:8px;background:var(--green)"></div></div>${[62, 48, 0][i] || 0}%</div></td><td class="muted">${esc(p.cats[0]?.lessons[0]?.title || '—')}</td></tr>`).join('')}
      </tbody></table></div>`;
  }

  function courseSettings(view) {
    view.innerHTML = `${pageHead('Courses')}${subnav('settings')}
      <div class="card" style="max-width:860px"><div class="card-b">
        <div class="field"><label>Member portal domain</label><input class="input" value="portal.bloomdental.co.uk" readonly></div>
        <div class="field"><label>Welcome email</label><input class="input" value="Your Bloom member login is ready 🎉" readonly></div>
        <div class="row"><button class="toggle on"></button>Let members comment on lessons</div></div></div>`;
    KY.toggles(view);
  }

  // ---------- Communities ----------
  function groupsList(view) {
    view.innerHTML = `${pageHead('Communities', 'Groups where your members meet, learn and chat', `<button class="btn primary" id="cm_new">${icon('plus', 18)} Create Group</button>`)}
      <div class="mb-grid">${M.groups.map((g) => `<div class="card mb-prod" data-g="${g.id}" id="cm_group_${g.id}">
        <div style="height:120px;background:linear-gradient(135deg,${g.color[0]},${g.color[1]});display:grid;place-items:center;color:#fff">${icon('community', 44)}</div>
        <div class="card-b"><div class="row"><b style="font-size:17px;flex:1">${esc(g.name)}</b><span class="chip">${icon('lock', 13)} ${g.privacy}</span></div>
          <div class="muted" style="font-size:14px;margin:4px 0 10px">${esc(g.desc)}</div><div class="row" style="font-size:14px">${icon('users', 16)} ${g.members} members · ${g.channels.length} channels</div></div></div>`).join('')}</div>`;
    $$('[data-g]', view).forEach((c) => (c.onclick = () => KY.go(`#/memberships/communities/${c.dataset.g}`)));
    $('#cm_new').onclick = () => {
      const box = KY.modal({
        title: 'Create group',
        body: `<div class="field"><label>Group name</label><input class="input" id="cm_name" placeholder="e.g. Invisalign Support Group"></div>
          <div class="field"><label>Group URL</label><input class="input" id="cm_url" value="portal.bloomdental.co.uk/communities/groups/" readonly></div>
          <div class="field" style="margin-bottom:0"><label>Who can join?</label>${seg('privacy', ['Private', 'Public'], 'Private', 'cm_privacy')}
            <p class="muted" style="font-size:14px;margin:8px 0 0">Private groups are only for people you invite or who buy an offer that includes the group.</p></div>`,
        actions: [{ label: 'Cancel' }, { label: 'Create group', primary: true, id: 'cm_create', onClick: (close, b) => {
          const g = { id: 'g' + (M.groups.length + 1), name: $('#cm_name', b).value || 'New group', desc: 'A new community group.', privacy: $('[data-seg="privacy"].on', b).dataset.val, members: 1, color: ['#12b76a', '#155eef'], channels: [['general', 'Everyone']], posts: [] };
          M.groups.push(g); close(); KY.toast('Group created'); KY.go(`#/memberships/communities/${g.id}`);
        } }],
      });
      wireSeg(box);
      $('#cm_name', box).oninput = (e) => ($('#cm_url', box).value = 'portal.bloomdental.co.uk/communities/groups/' + slug(e.target.value));
    };
  }

  function groupView(view, gid) {
    const g = M.groups.find((x) => x.id === gid);
    if (!g) return KY.go('#/memberships/communities');
    const posts = g.posts.filter((p) => S.channel === 'all' || p.ch === S.channel);
    view.innerHTML = `
      <div class="page-head"><button class="btn ghost icon" id="cm_back">${icon('left', 20)}</button>
        <span class="mb-mini" style="background:linear-gradient(135deg,${g.color[0]},${g.color[1]})">${icon('community', 18)}</span><h1>${esc(g.name)}</h1><span class="chip">${icon('lock', 13)} ${g.privacy}</span>
        <div class="actions"><button class="btn" id="cm_settings">${icon('settings', 18)} Group settings</button><button class="btn primary" id="cm_invite">${icon('users', 18)} Invite members</button></div></div>
      <div class="card" style="overflow:hidden;margin-bottom:20px"><div class="mb-gtabs" id="cm_tabs">${['Feed', 'Learning', 'Members', 'Leaderboard', 'Events', 'About'].map((t) => `<a class="${t === S.groupTab ? 'on' : ''}" data-gt="${t}" id="cm_tab_${slug(t)}">${t}</a>`).join('')}</div></div>
      <div class="grid" style="grid-template-columns:250px 1fr 320px;align-items:start">
        <div class="card mb-ch" style="padding:10px" id="cm_channels"><div class="row" style="padding:4px 8px 8px"><b style="flex:1">Channels</b><button class="btn ghost icon sm" id="cm_add_channel" title="Add channel">${icon('plus', 18)}</button></div>
          <a class="${S.channel === 'all' ? 'on' : ''}" data-ch="all" id="cm_ch_all">${icon('layers', 16)} All posts</a>
          ${g.channels.map(([c, who]) => `<a class="${S.channel === c ? 'on' : ''}" data-ch="${c}" id="cm_ch_${c}"><span style="opacity:.6">#</span> ${esc(c)}${who === 'Admins only' ? `<span style="margin-left:auto;color:var(--faint)">${icon('lock', 13)}</span>` : ''}</a>`).join('')}</div>
        <div id="cm_main"></div>
        <div>
          <div class="card" style="margin-bottom:20px"><div class="card-b"><b>${esc(g.name)}</b><div class="muted" style="font-size:14px;margin:4px 0 12px">${esc(g.desc)}</div>
            <div class="row" style="font-size:14px;gap:16px"><span><b>${g.members}</b> members</span><span><b style="color:var(--green)">●</b> 12 online</span><span><b>3</b> admins</span></div></div></div>
          <div class="card" id="cm_leader"><div class="card-h"><h3>Leaderboard</h3><span class="muted" style="font-size:13px">· 30 days</span></div><div class="card-b">
            ${(g.id === 'g1' ? [['Isla Thompson', 142], ['Sophie Turner', 98], ['Chloe Scott', 76]] : []).map(([n, pts], i) => `<div class="row" style="margin-bottom:12px"><b style="width:18px">${i + 1}</b>${avatar(n, 30)}<span style="flex:1">${esc(n)}</span><span class="chip purple">${pts} pts</span></div>`).join('')}
            <div class="muted" style="font-size:13px">Members earn points for posts, comments and likes.</div></div></div>
        </div>
      </div>`;
    const main = $('#cm_main');
    const paintFeed = () => {
      if (S.groupTab === 'Learning') {
        main.innerHTML = `<div class="card"><div class="card-h"><h3>Learning</h3></div><div class="card-b">${M.products.slice(0, 3).map((p) => `<div class="row" style="margin-bottom:14px"><span class="mb-mini" style="background:linear-gradient(135deg,${p.color[0]},${p.color[1]})">${icon(p.ic || 'cap', 16)}</span><div style="flex:1"><b>${esc(p.title)}</b><div class="muted" style="font-size:13px">${lessonCount(p)} lessons</div></div><button class="btn sm">Open</button></div>`).join('')}
          <div class="muted" style="font-size:14px">Courses linked to this group appear here, so members learn and chat in one place.</div></div></div>`;
        return;
      }
      if (S.groupTab === 'Members') {
        main.innerHTML = `<div class="card"><table class="t"><thead><tr><th>Member</th><th>Role</th><th>Joined</th></tr></thead><tbody>${[['Sarah Mitchell', 'Admin', 'Aug 2026'], ['Priya Shah', 'Admin', 'Aug 2026'], ['Isla Thompson', 'Member', 'Oct 2026'], ['Sophie Turner', 'Member', 'Oct 2026'], ['Chloe Scott', 'Member', 'Sep 2026']].map(([n, r, d]) => `<tr><td><div class="row">${avatar(n, 30)}<b>${n}</b></div></td><td>${r === 'Admin' ? '<span class="chip blue">Admin</span>' : 'Member'}</td><td class="muted">${d}</td></tr>`).join('')}</tbody></table></div>`;
        return;
      }
      if (S.groupTab !== 'Feed') { main.innerHTML = `<div class="card empty"><div class="big">${S.groupTab}</div>This part of the group is set up in the same way.</div>`; return; }
      main.innerHTML = `
        <div class="card" style="padding:14px 16px;margin-bottom:14px" id="cm_composer"><div class="row">${avatar(data.me.name, 36)}<input class="input" id="cm_compose" placeholder="Write something to the group…" readonly style="cursor:pointer"></div></div>
        ${posts.map((p, i) => `<div class="card mb-post" id="cm_post_${i}">
          ${p.pinned ? `<div class="row muted" style="font-size:13px;margin-bottom:8px">${icon('bolt', 14)} Pinned</div>` : ''}
          <div class="row">${avatar(p.by, 38)}<div style="flex:1"><div class="row" style="gap:8px"><b>${esc(p.by)}</b>${p.role === 'Admin' ? '<span class="chip blue" style="height:22px">Admin</span>' : ''}</div><div class="muted" style="font-size:13px">${esc(p.time)} · #${esc(p.ch)}</div></div><button class="btn ghost icon sm">${icon('more', 18)}</button></div>
          <div class="bold" style="font-size:17px;margin:12px 0 4px">${esc(p.title)}</div><div>${esc(p.body)}</div>
          <div class="row" style="margin-top:14px;gap:18px;color:var(--muted);font-size:14px"><span class="row" style="gap:6px;cursor:pointer" data-like="${i}">${icon('heart', 17)} ${p.likes}</span><span class="row" style="gap:6px">${icon('chat', 17)} ${p.comments} comments</span></div></div>`).join('') || '<div class="card empty"><div class="big">No posts here yet</div>Be the first to post in this channel.</div>'}`;
      $('#cm_compose').onclick = compose;
      $$('[data-like]', main).forEach((b) => (b.onclick = () => { posts[+b.dataset.like].likes++; paintFeed(); }));
    };
    const compose = () => {
      $('#cm_composer').innerHTML = `<div class="row" style="margin-bottom:10px">${avatar(data.me.name, 36)}<b>${esc(data.me.name)}</b><span class="muted">posting in</span>
          <div class="row" style="gap:6px" id="cm_post_channels">${g.channels.map(([c], i) => `<button class="chip ${(S.channel === 'all' ? i === 0 : S.channel === c) ? 'blue' : ''}" style="border:0;cursor:pointer" data-pc="${c}" id="cm_pc_${c}">#${esc(c)}</button>`).join('')}</div></div>
        <input class="input" id="cm_post_title" placeholder="Title" style="margin-bottom:8px;font-weight:600">
        <textarea class="input" rows="3" id="cm_post_body" placeholder="Write something to the group…"></textarea>
        <div class="row" style="margin-top:10px"><button class="btn ghost icon sm">${icon('image', 18)}</button><button class="btn ghost icon sm">${icon('paperclip', 18)}</button><button class="btn ghost icon sm">${icon('video', 18)}</button><span class="spacer"></span><button class="btn" id="cm_post_cancel">Cancel</button><button class="btn primary" id="cm_post">Post</button></div>`;
      $$('[data-pc]', main).forEach((b) => (b.onclick = () => { $$('[data-pc]', main).forEach((x) => x.classList.remove('blue')); b.classList.add('blue'); }));
      $('#cm_post_cancel').onclick = paintFeed;
      $('#cm_post').onclick = () => {
        const ch = $('[data-pc].blue', main)?.dataset.pc || 'general';
        g.posts.unshift({ by: data.me.name, role: 'Admin', ch, title: $('#cm_post_title').value || 'New post', body: $('#cm_post_body').value, time: 'Just now', likes: 0, comments: 0 });
        groupView(view, gid); KY.toast('Post published — members are notified');
      };
      $('#cm_post_title').focus();
    };
    paintFeed();
    $('#cm_back').onclick = () => KY.go('#/memberships/communities');
    $$('[data-gt]', view).forEach((t) => (t.onclick = () => { S.groupTab = t.dataset.gt; $$('[data-gt]', view).forEach((x) => x.classList.toggle('on', x === t)); paintFeed(); }));
    $$('[data-ch]', view).forEach((a) => (a.onclick = () => { S.channel = a.dataset.ch; S.groupTab = 'Feed'; groupView(view, gid); }));
    $('#cm_invite').onclick = () => KY.modal({
      title: 'Invite members',
      body: `<div class="field"><label>Invite link</label><div class="row"><input class="input" readonly value="portal.bloomdental.co.uk/communities/groups/${slug(g.name)}/join"><button class="btn">${icon('copy', 16)}</button></div></div>
        <div class="field"><label>Or invite by email</label><input class="input" placeholder="name@example.com, …"></div>
        <p class="muted" style="font-size:14px;margin:0">Tip: include the group in a paid offer and buyers are added automatically.</p>`,
      actions: [{ label: 'Close' }, { label: 'Send invites', primary: true, onClick: (close) => { close(); KY.toast('Invites sent'); } }],
    });
    $('#cm_settings').onclick = () => KY.modal({
      title: 'Group settings',
      body: `<div class="field"><label>Who can join?</label>${seg('p', ['Private', 'Public'], g.privacy, 'cm_set_privacy')}</div>
        <div class="field"><label>Access</label><div class="muted" style="font-size:14px">Free for invited members, or included in the <b>Bloom Smile Club</b> offer.</div></div>
        <div class="row" style="margin-bottom:10px"><button class="toggle on"></button>Members can create posts</div>
        <div class="row"><button class="toggle on"></button>Gamification (points & leaderboard)</div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, onClick: (close) => { close(); KY.toast('Group settings saved'); } }],
    });
    $('#cm_add_channel').onclick = () => {
      const box = KY.modal({
        title: 'Create channel',
        body: `<div class="field"><label>Channel name</label><input class="input" id="cm_ch_name" placeholder="e.g. whitening-tips"></div>
          <div class="field" style="margin-bottom:0"><label>Who can post?</label>${seg('who', ['Everyone', 'Admins only'], 'Everyone', 'cm_ch_who')}</div>`,
        actions: [{ label: 'Cancel' }, { label: 'Create channel', primary: true, id: 'cm_ch_create', onClick: (close, b) => {
          const name = slug($('#cm_ch_name', b).value || 'new-channel');
          g.channels.push([name, $('[data-seg="who"].on', b).dataset.val]); S.channel = name; close(); groupView(view, gid); KY.toast(`Channel #${name} created`);
        } }],
      });
      wireSeg(box);
    };
  }

  // ---------- Client portal ----------
  function clientPortal(view) {
    view.innerHTML = `${pageHead('Client Portal', 'One login for everything your members get from you')}
      <div class="grid" style="grid-template-columns:1.2fr 1fr;align-items:start">
        <div class="card"><div class="card-h"><h3>Portal</h3><span class="chip green">Live</span></div><div class="card-b">
          <div class="field"><label>Domain</label><div class="row"><input class="input" readonly value="portal.bloomdental.co.uk"><button class="btn">${icon('external', 16)} Open</button></div></div>
          <div class="field" style="margin-bottom:0"><label>Apps in your portal</label>
            ${[['cap', 'Courses', 'Your products and lessons'], ['community', 'Communities', 'Groups, channels and posts']].map(([ic, n, d]) => `<div class="row" style="padding:12px 0;border-bottom:1px solid var(--line-soft)"><span style="color:var(--blue)">${icon(ic, 20)}</span><div style="flex:1"><b>${n}</b><div class="muted" style="font-size:14px">${d}</div></div><button class="toggle on"></button></div>`).join('')}</div></div></div>
        <div class="card"><div class="card-h"><h3>Branding</h3></div><div class="card-b">
          <div class="row" style="margin-bottom:12px"><img src="../../assets/favicon.png" style="width:44px;height:44px;border-radius:10px;background:#f2f4f7"><div><b>Bloom Dental Studio</b><div class="muted" style="font-size:14px">Logo, colours and login page</div></div></div>
          <div class="row" style="gap:8px">${['#155eef', '#ee46bc', '#12b76a', '#101828'].map((c) => `<span style="width:30px;height:30px;border-radius:8px;background:${c};display:block"></span>`).join('')}</div></div></div>
      </div>`;
    KY.toggles(view);
  }

  KY.screen('memberships', {
    tabs: [{ id: 'client-portal', label: 'Client Portal' }, { id: 'courses', label: 'Courses' }, { id: 'communities', label: 'Communities' }],
    render(view, { tab, params }) {
      css();
      if (tab === 'communities') return params[0] ? groupView(view, params[0]) : groupsList(view);
      if (tab === 'courses') {
        const [sub, id, kind, lid] = params;
        if (sub === 'product' && kind === 'lesson') return lessonEditor(view, id, lid);
        if (sub === 'product') return builder(view, id);
        if (sub === 'offer') return offerEditor(view, id);
        if (sub === 'products') return products(view);
        if (sub === 'offers') return offers(view);
        if (sub === 'analytics') return analytics(view);
        if (sub === 'settings') return courseSettings(view);
        return dashboard(view);
      }
      return clientPortal(view);
    },
  });
})();
