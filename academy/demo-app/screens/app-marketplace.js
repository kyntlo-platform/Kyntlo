// App Marketplace — browse, search and install apps into this sub-account.
(() => {
  const { esc, icon, $, $$ } = KY;
  const st0 = (KY.data.marketplace = KY.data.marketplace || { installed: new Set(['zoom']), cat: 'All', q: '' });

  const APPS = [
    ['zoom', 'Zoom', 'zoom.png', 'Calendars', 'Add a Zoom meeting link to online appointments automatically.', 4.6, 'Zoom Video Communications'],
    ['slack', 'Slack', 'slack.png', 'Communication', 'Send new-lead and booking alerts to a Slack channel.', 4.5, 'Slack'],
    ['teams', 'Microsoft Teams', 'teams.png', 'Calendars', 'Use Teams meeting links for your appointments.', 4.3, 'Microsoft'],
    ['quickbooks', 'QuickBooks Online', 'quickbooks.png', 'Accounting', 'Sync invoices, payments and customers to QuickBooks.', 4.4, 'Intuit'],
    ['xero', 'Xero', 'xero.png', 'Accounting', 'Send paid invoices and payments to Xero.', 4.2, 'Xero'],
    ['shopify', 'Shopify', 'shopify.png', 'E-commerce', 'Bring Shopify customers and orders into your CRM.', 4.3, 'Shopify'],
    ['woocommerce', 'WooCommerce', 'woocommerce.png', 'E-commerce', 'Sync WooCommerce orders and trigger workflows.', 4.1, 'Automattic'],
    ['wordpress', 'WordPress', 'wordpress.png', 'Websites', 'Add your chat widget and forms to a WordPress site.', 4.4, 'LeadConnector'],
    ['zapier', 'Zapier', 'zapier.png', 'Automation', 'Connect Kyntlo to thousands of other apps.', 4.5, 'Zapier'],
    ['notion', 'Notion', 'notion.png', 'Productivity', 'Create Notion pages from new contacts and deals.', 4.0, 'Notion Labs'],
    ['paypal', 'PayPal', 'paypal.png', 'Payments', 'Accept PayPal on invoices, forms and order forms.', 4.3, 'PayPal'],
    ['square', 'Square', 'square.png', 'Payments', 'Take Square payments in person and online.', 4.1, 'Block, Inc.'],
  ];
  const CATS = ['All', 'Calendars', 'Communication', 'Accounting', 'E-commerce', 'Payments', 'Automation', 'Websites', 'Productivity'];

  if (!document.getElementById('css-app-marketplace')) {
    const st = document.createElement('style');
    st.id = 'css-app-marketplace';
    st.textContent = `
      .mk-wrap { display: grid; grid-template-columns: 230px 1fr; gap: 24px; align-items: start; }
      .mk-cats a { display: block; padding: 9px 12px; border-radius: 8px; color: var(--ink-2); font-weight: 500; cursor: pointer; }
      .mk-cats a:hover { background: #fff; }
      .mk-cats a.on { background: var(--blue-soft); color: var(--blue); font-weight: 600; }
      .mk-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
      .mk-app { padding: 18px; display: flex; flex-direction: column; gap: 10px; }
      .mk-app .lg { height: 40px; display: flex; align-items: center; flex: none; }
      .mk-app .lg img { height: 30px; max-width: 160px; object-fit: contain; }
    `;
    document.head.appendChild(st);
  }

  function install(app, redraw) {
    const [k, n, logo, , d, , by] = app;
    KY.modal({ title: `Install ${n}`,
      body: `<div class="row" style="margin-bottom:14px;gap:16px"><img src="../../assets/integration-logos/${logo}" alt="" style="height:30px;max-width:150px;object-fit:contain">
          <div><b style="font-size:18px">${esc(n)}</b><div class="muted" style="font-size:14px">by ${esc(by)}</div></div></div>
        <p style="margin-top:0">${esc(d)}</p>
        <div class="bold" style="margin-bottom:6px">This app will be able to:</div>
        ${['View and update contacts', 'View calendars and appointments', 'Send notifications'].map((t) => `<div class="row" style="margin:8px 0"><span style="color:var(--blue)">${icon('check', 18)}</span>${t}</div>`).join('')}
        <div class="field" style="margin-top:14px"><label>Install into</label><div class="input row" style="height:42px">${icon('building', 18)} ${esc(KY.data.business.name)}</div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Allow & Install', primary: true, id: 'mk_install_confirm', onClick: (close) => {
        st0.installed.add(k); close(); redraw(); KY.toast(`${n} installed`);
      } }] });
  }

  function render(view, { tab }) {
    st0.q = ''; st0.cat = 'All';
    const draw = () => {
      const q = st0.q.toLowerCase();
      const list = APPS.filter((a) => (tab !== 'installed' || st0.installed.has(a[0])) && (st0.cat === 'All' || a[3] === st0.cat) && (!q || a[1].toLowerCase().includes(q)));
      view.innerHTML = `
        <div class="page-head"><div><h1>App Marketplace</h1><div class="sub">Add extra features to Kyntlo by installing apps.</div></div>
          <div class="actions"><div class="search" style="width:340px"><span>${icon('search', 18)}</span><input class="input" id="mk_search" placeholder="Search apps" value="${esc(st0.q)}"></div></div></div>
        <div class="mk-wrap">
          <div class="mk-cats card" style="padding:8px;box-shadow:none;background:transparent;border:0" id="mk_cats">
            ${CATS.map((c) => `<a class="${c === st0.cat ? 'on' : ''}" data-cat="${c}" id="mk_cat_${c.toLowerCase().replace(/[^a-z]/g, '')}">${c}</a>`).join('')}</div>
          <div>${list.length ? `<div class="mk-grid" id="mk_grid">${list.map((a) => {
            const [k, n, logo, cat, d, r] = a; const on = st0.installed.has(k);
            return `<div class="card mk-app" id="mk_app_${k}">
              <div class="row"><span class="lg"><img src="../../assets/integration-logos/${logo}" alt=""></span><span class="spacer"></span><span class="chip">${esc(cat)}</span></div><b style="font-size:17px">${esc(n)}</b>
              <div class="muted" style="font-size:14.5px;min-height:42px;margin-top:-4px">${esc(d)}</div>
              <div class="row"><span class="row" style="gap:4px;color:#f79009">${icon('star', 16)}<b style="color:var(--ink);font-size:14px">${r}</b></span><span class="spacer"></span>
                ${on ? `<span class="chip green">${icon('check', 14)} Installed</span>` : `<button class="btn sm primary" id="mk_install_${k}" data-k="${k}">Install</button>`}</div></div>`;
          }).join('')}</div>` : `<div class="card empty"><div class="big">No apps found</div>Try another search or category.</div>`}</div>
        </div>`;
      const s = $('#mk_search');
      s.oninput = () => { st0.q = s.value; const pos = s.selectionStart; draw(); const s2 = $('#mk_search'); s2.focus(); s2.setSelectionRange(pos, pos); };
      $$('[data-cat]', view).forEach((a) => (a.onclick = () => { st0.cat = a.dataset.cat; draw(); }));
      $$('[data-k]', view).forEach((b) => (b.onclick = () => install(APPS.find((a) => a[0] === b.dataset.k), draw)));
    };
    draw();
  }

  KY.screen('app-marketplace', { tabs: [{ id: 'all', label: 'All Apps' }, { id: 'installed', label: 'Installed Apps' }], render });
})();
