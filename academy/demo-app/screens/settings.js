// Settings — HighLevel's sub-account settings. Opening Settings swaps the left
// navigation for the settings menu (with "Go Back"), like the real app.
// Routes: #/settings/<page>/<sub-tab>, e.g. #/settings/billing/wallet.
(() => {
  const { esc, icon, $, $$, avatar } = KY;
  const data = KY.data;
  const biz = data.business;
  const usd = (n, d = 2) => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

  // ---------- Screen-specific demo data ----------
  const S = (KY.data.settings = KY.data.settings || {
    logo: false,
    profile: {
      name: biz.name, legal: '', email: biz.email, phone: biz.phone, website: 'https://' + biz.website, niche: 'Dental Practice',
      street: '14 Marylebone High Street', city: 'London', postcode: 'W1U 4NS', region: 'Greater London', country: 'United Kingdom', timezone: 'GMT+01:00 Europe/London (BST)',
      repFirst: 'Sarah', repLast: 'Mitchell', repEmail: 'sarah@bloomdental.co.uk', repTitle: 'Director', repPhone: '+44 7700 900111',
      type: 'Limited Company (Ltd)', industry: 'Healthcare', regType: 'UK Companies House Number', regNum: '', regions: 'Europe',
    },
    general: { dupContact: false, dupOpp: true, fbMerge: true, tzDisabled: false, invalidEmail: true },
    staff: data.team.map((t, i) => ({ ...t, type: i === 0 ? 'Account - Admin' : 'Account - User', status: 'Active' })),
    calendarsTeam: Object.fromEntries(data.calendars.map((k) => [k.id, [...k.team]])),
    numbers: [
      { num: '+44 20 7946 0321', name: 'Main line — Marylebone', type: 'Local', caps: ['Voice'], fwd: '+44 7700 900111', isDefault: true },
      { num: '+44 7700 900500', name: 'Text line', type: 'Mobile', caps: ['Voice', 'SMS', 'MMS'], fwd: '+44 7700 900111', isDefault: false },
    ],
    domains: [],
    integrations: { google: false, facebook: true, tiktok: false, linkedin: false, zoom: false, quickbooks: false },
    wallet: { balance: 36.81, autoRecharge: true, below: 10, to: 50 },
    transactions: [
      { date: '21 Oct 2026', desc: 'Usage charges — SMS, calls & email', amount: -6.42 },
      { date: '18 Oct 2026', desc: 'Auto recharge — Visa •••• 4242', amount: 40 },
      { date: '18 Oct 2026', desc: 'Usage charges — SMS, calls & email', amount: -11.87 },
      { date: '12 Oct 2026', desc: 'Usage charges — Email newsletter (2,140 emails)', amount: -2.89 },
      { date: '1 Oct 2026', desc: 'Phone numbers — monthly rental (2)', amount: -4.30 },
    ],
    customFields: [
      { name: 'Treatment interest', type: 'Dropdown (Single)', key: 'contact.treatment_interest', folder: 'Patient info' },
      { name: 'Last visit date', type: 'Date Picker', key: 'contact.last_visit_date', folder: 'Patient info' },
      { name: 'NHS or private', type: 'Radio Select', key: 'contact.nhs_or_private', folder: 'Patient info' },
      { name: 'Referred by', type: 'Single Line', key: 'contact.referred_by', folder: 'Marketing' },
      { name: 'Insurance provider', type: 'Single Line', key: 'contact.insurance_provider', folder: 'Patient info' },
    ],
    customValues: [
      { name: 'Booking link', value: 'https://bloomdental.co.uk/book', key: 'custom_values.booking_link' },
      { name: 'Google review link', value: 'https://g.page/r/bloom-dental/review', key: 'custom_values.google_review_link' },
      { name: 'Whitening offer price', value: '£199', key: 'custom_values.whitening_offer_price' },
      { name: 'Practice manager', value: 'Sarah Mitchell', key: 'custom_values.practice_manager' },
    ],
    tags: data.tags.map((t, i) => ({ name: t, created: ['2 Sep 2026', '2 Sep 2026', '5 Sep 2026', '5 Sep 2026', '9 Sep 2026', '12 Sep 2026', '18 Sep 2026', '18 Sep 2026', '22 Sep 2026', '2 Oct 2026', '9 Oct 2026'][i] || '1 Oct 2026' })),
  });

  // ---------- Styles ----------
  if (!document.getElementById('css-settings')) {
    const st = document.createElement('style');
    st.id = 'css-settings';
    st.textContent = `
      .ss-nav { position: fixed; left: 0; top: 0; bottom: 0; width: 280px; background: var(--sb); color: var(--sb-text); z-index: 5; display: flex; flex-direction: column; }
      .ss-nav .logo { height: 84px; display: flex; align-items: center; justify-content: center; flex: none; }
      .ss-nav .logo img { height: 52px; }
      .ss-nav .back { margin: 0 10px 10px; display: flex; align-items: center; gap: 8px; background: var(--sb-box); color: #fff; border: 0; border-radius: 8px; padding: 9px 12px; font-weight: 600; font-size: 15px; flex: none; }
      .ss-nav .ttl { padding: 4px 22px 8px; font-size: 19px; font-weight: 700; color: #fff; flex: none; }
      .ss-nav .scroll { flex: 1; overflow-y: auto; padding: 0 10px 14px; }
      .ss-nav h6 { margin: 12px 12px 4px; font-size: 12px; letter-spacing: .08em; color: var(--sb-muted); font-weight: 700; }
      .ss-nav a { display: flex; align-items: center; gap: 11px; color: var(--sb-text); padding: 6px 12px; border-radius: 6px; font-size: 15.5px; font-weight: 500; margin-bottom: 1px; }
      .ss-nav a svg { width: 18px; height: 18px; color: var(--sb-muted); }
      .ss-nav a:hover { background: rgba(255,255,255,.06); }
      .ss-nav a.active { background: var(--sb-active); color: #fff; font-weight: 600; }
      .ss-nav a.active svg { color: #fff; }
      .ss-main { max-width: 1540px; }
      .ss-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px; }
      .ss-head h1 { margin: 0; font-size: 24px; }
      .ss-head p { margin: 4px 0 0; color: var(--muted); font-size: 15px; }
      .ss-head .actions { margin-left: auto; display: flex; gap: 10px; }
      .ss-sub { display: flex; gap: 4px; border-bottom: 1px solid var(--line); margin-bottom: 18px; }
      .ss-sub a { padding: 10px 14px; color: var(--ink-2); font-weight: 500; border-bottom: 2px solid transparent; margin-bottom: -1px; }
      .ss-sub a.active { color: var(--blue); border-bottom-color: var(--blue); font-weight: 600; }
      .ss-sel { justify-content: space-between; width: 100%; font-weight: 400; color: var(--ink); height: 42px; }
      .ss-sel svg { color: var(--faint); }
      .ss-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
      .ss-g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 16px; }
      .ss-card-f { display: flex; justify-content: flex-end; padding: 0 20px 18px; }
      .ss-logo { border: 1.5px dashed var(--line); border-radius: 10px; height: 132px; display: flex; align-items: center; justify-content: center; gap: 16px; cursor: pointer; background: #f9fafb; text-align: left; }
      .ss-logo:hover { border-color: #84adff; background: var(--blue-soft); }
      .ss-trow { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--line-soft); }
      .ss-trow:last-child { border-bottom: 0; }
      .ss-trow .lbl { flex: 1; }
      .ss-trow .lbl small { display: block; color: var(--muted); font-size: 13.5px; }
      .ss-code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 13.5px; background: #f2f4f7; border-radius: 6px; padding: 3px 8px; color: var(--ink-2); word-break: break-all; }
      .ss-int { padding: 20px; display: flex; flex-direction: column; gap: 12px; }
      .ss-int .lg { height: 40px; display: flex; align-items: center; flex: none; color: var(--blue); }
      .ss-int .lg img { height: 30px; max-width: 150px; object-fit: contain; }
      .ss-step { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--line-soft); }
      .ss-step:last-child { border-bottom: 0; }
      .ss-dot { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; font-size: 14px; flex: none; background: var(--blue-soft); color: var(--blue); }
      .ss-dot.ok { background: var(--green-soft); color: #027a48; }
      .ss-perm { display: grid; grid-template-columns: 1fr 1fr; gap: 0 28px; }
      .ss-perm .ss-trow { padding: 9px 0; }
      .ss-seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
      .ss-seg button { border: 0; background: #fff; padding: 9px 16px; white-space: nowrap; font-weight: 600; color: var(--ink-2); }
      .ss-seg button + button { border-left: 1px solid var(--line); }
      .ss-seg button.on { background: var(--blue-soft); color: var(--blue); }
      .ss-dsec { font-size: 13px; font-weight: 700; letter-spacing: .06em; color: var(--muted); text-transform: uppercase; margin: 22px 0 10px; }
      .ss-dblock .ss-dsec:first-child { margin-top: 0; }
      .ss-dblock + .ss-dblock { margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--line-soft); }
      .ss-big { font-size: 38px; font-weight: 700; letter-spacing: -.01em; }
      .ss-pill { display: inline-flex; align-items: center; gap: 6px; }
      .ss-tcard { padding: 18px 20px; display: flex; gap: 14px; align-items: flex-start; }
      .ss-tcard .ic { width: 42px; height: 42px; border-radius: 10px; display: grid; place-items: center; flex: none; }
      .ss-type { border: 1px solid var(--line); border-radius: 10px; padding: 12px; display: flex; align-items: center; gap: 10px; background: #fff; font-weight: 600; color: var(--ink-2); text-align: left; }
      .ss-type:hover { border-color: #84adff; }
      .ss-type.on { border-color: var(--blue); box-shadow: 0 0 0 3px #d1e0ff; color: var(--blue); }
      .ss-num { display: flex; align-items: center; gap: 14px; padding: 12px 14px; border: 1px solid var(--line-soft); border-radius: 10px; margin-bottom: 10px; }
      .ss-num b { font-size: 17px; }
    `;
    document.head.appendChild(st);
  }

  // ---------- Small helpers ----------
  const field = (label, id, value = '', ph = '', extra = '') =>
    `<div class="field"><label for="${id}">${label}</label><input class="input" id="${id}" value="${esc(value)}" placeholder="${esc(ph)}" ${extra}></div>`;
  // A dropdown that films well (a native <select> popup isn't captured on video).
  const dd = (label, id, value, opts) =>
    `<div class="field"><label>${label}</label><button class="btn ss-sel" id="${id}" data-opts="${esc(JSON.stringify(opts))}"><span>${esc(value)}</span>${icon('chevron', 18)}</button></div>`;
  const wireDropdowns = (root, onPick) => $$('.ss-sel', root).forEach((b) => (b.onclick = () => {
    const opts = JSON.parse(b.dataset.opts);
    KY.menu(b, opts.map((o) => ({ label: o, onClick: () => { b.querySelector('span').textContent = o; onPick && onPick(b.id, o); } })));
  }));
  const tog = (id, on) => `<button class="toggle ${on ? 'on' : ''}" id="${id}"></button>`;
  const statusChip = (s) => ({ Verified: 'green', Approved: 'green', Active: 'green', Connected: 'green', Pending: 'amber', 'In review': 'amber', 'Not started': '', 'Not required': '' }[s] ?? '');
  const chip = (s, kind) => `<span class="chip ${kind ?? statusChip(s)}">${s === 'Verified' || s === 'Approved' || s === 'Connected' ? icon('check', 14) : ''}${esc(s)}</span>`;
  const logoSvg = (h = 64) => `<svg viewBox="0 0 300 96" height="${h}" style="height:${h}px;width:auto">
      <g transform="translate(48 48)">${[0, 72, 144, 216, 288].map((r) => `<ellipse rx="13" ry="25" cy="-19" fill="#f472b6" opacity=".85" transform="rotate(${r})"/>`).join('')}
      <circle r="13" fill="#fff"/><path d="M-7-6c3-3 5-1 7-1s4-2 7 1c2 3 0 7-1 10-1 4-2 7-3 7s-2-5-3-5-2 5-3 5-2-3-3-7c-1-3-3-7-1-10z" fill="#7f56d9"/></g>
      <text x="96" y="46" font-family="Inter, system-ui, sans-serif" font-size="30" font-weight="800" fill="#101828">Bloom</text>
      <text x="97" y="72" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="600" letter-spacing="3.2" fill="#7f56d9">DENTAL STUDIO</text></svg>`;
  const head = (title, sub, actions = '') => `<div class="ss-head"><div><h1>${esc(title)}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${actions ? `<div class="actions">${actions}</div>` : ''}</div>`;
  const subtabs = (page, tabs, cur) => `<div class="ss-sub">${tabs.map(([id, l]) => `<a href="#/settings/${page}/${id}" id="${page.split("-")[0]}_tab_${id}" class="${id === cur ? 'active' : ''}">${esc(l)}</a>`).join('')}</div>`;
  const table = (id, headCells, rows) => `<table class="t" ${id ? `id="${id}"` : ''}><thead><tr>${headCells.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`;

  // ---------- Settings menu ----------
  const MENU = [
    ['MY BUSINESS', [
      ['business-profile', 'Business Profile', 'building'], ['my-profile', 'My Profile', 'user'], ['billing', 'Billing', 'card'],
      ['my-staff', 'My Staff', 'users'], ['pipelines', 'Opportunities & Pipelines', 'pipeline']]],
    ['BUSINESS SERVICES', [
      ['automation', 'Automation', 'automation'], ['calendars', 'Calendars', 'calendar'], ['conversation-ai', 'Conversation AI', 'bot'],
      ['email-services', 'Email Services', 'mail'], ['phone-numbers', 'Phone System', 'phone'], ['whatsapp', 'WhatsApp', 'whatsapp'],
      ['reputation', 'Reputation Management', 'star']]],
    ['OTHER SETTINGS', [
      ['custom-fields', 'Custom Fields', 'form'], ['custom-values', 'Custom Values', 'layers'], ['tags', 'Tags', 'tag'],
      ['domains', 'Domains', 'globe'], ['integrations', 'Integrations', 'apps'], ['conversation-providers', 'Conversation Providers', 'chat'],
      ['audit-logs', 'Audit Logs', 'clock']]],
  ];

  function navHtml(cur) {
    return `<nav class="ss-nav" id="ss_nav">
      <div class="logo"><img src="../../assets/favicon.png" alt="Kyntlo"></div>
      <button class="back" id="ss_back">${icon('left', 18)} Go Back</button>
      <div class="ttl">Settings</div>
      <div class="scroll">${MENU.map(([h, items]) => `<h6>${h}</h6>${items.map(([id, l, ic]) =>
        `<a href="#/settings/${id}" id="ss_menu_${id}" class="${id === cur ? 'active' : ''}">${icon(ic, 18)}<span>${esc(l)}</span></a>`).join('')}`).join('')}</div>
    </nav>`;
  }

  // ======================================================================
  // Business Profile
  // ======================================================================
  function businessProfile(main) {
    const p = S.profile, g = S.general;
    main.innerHTML = `${head('Business Profile', 'Your business details are used on invoices, emails, booking pages and for phone and messaging compliance.')}
      <div class="grid" style="grid-template-columns:1.55fr 1fr;align-items:start">
        <div class="grid">
          <div class="card" id="bp_general_card">
            <div class="card-h"><h3>General Information</h3></div>
            <div class="card-b">
              <div class="field"><label>Business Logo</label>
                <div class="ss-logo" id="bp_logo">${S.logo
                  ? `${logoSvg(84)}<span class="chip green">${icon('check', 14)} bloom-logo.png</span>`
                  : `<span style="color:var(--blue)">${icon('upload', 30)}</span><div><div class="bold">Upload your logo</div><div class="muted" style="font-size:14px">The proposed size is 350px × 180px. No bigger than 2.5 MB</div></div>`}</div></div>
              <div class="ss-g2">
                ${field('Friendly Business Name', 'bp_name', p.name)}
                ${field('Legal Business Name', 'bp_legal', p.legal, 'Exactly as registered with Companies House')}
                ${field('Business Email', 'bp_email', p.email)}
                ${field('Business Phone', 'bp_phone', p.phone)}
                ${field('Business Website', 'bp_website', p.website)}
                ${dd('Business Niche', 'bp_niche', p.niche, ['Dental Practice', 'Medical Clinic', 'Med Spa', 'Fitness', 'Real Estate', 'Legal', 'Home Services', 'Other'])}
              </div>
            </div>
            <div class="ss-card-f"><button class="btn primary" id="bp_save_general">Update Information</button></div>
          </div>
          <div class="card" id="bp_address_card">
            <div class="card-h"><h3>Business Physical Address</h3></div>
            <div class="card-b">
              ${field('Street Address', 'bp_street', p.street)}
              <div class="ss-g3">${field('City', 'bp_city', p.city)}${field('Postal / Zip Code', 'bp_postcode', p.postcode)}${field('State / Prov / Region', 'bp_region', p.region)}</div>
              <div class="ss-g2">
                ${dd('Country', 'bp_country', p.country, ['United Kingdom', 'Ireland', 'United States', 'Canada', 'Australia'])}
                ${dd('Time Zone', 'bp_timezone', p.timezone, ['GMT+00:00 Atlantic/Reykjavik', 'GMT+01:00 Europe/London (BST)', 'GMT+01:00 Europe/Dublin (IST)', 'GMT+02:00 Europe/Paris (CEST)', 'GMT-04:00 America/New_York (EDT)'])}
              </div>
            </div>
            <div class="ss-card-f"><button class="btn primary" id="bp_save_address">Update Address</button></div>
          </div>
          <div class="card" id="bp_info_card">
            <div class="card-h"><h3>Business Information</h3><span class="muted" style="font-size:14px">Used for phone number and messaging registration</span></div>
            <div class="card-b">
              <div class="ss-g2">
                ${dd('Business Type', 'bp_type', p.type, ['Sole Proprietorship', 'Partnership', 'Limited Company (Ltd)', 'Public Limited Company (PLC)', 'Non-profit Organisation'])}
                ${dd('Business Industry', 'bp_industry', p.industry, ['Healthcare', 'Professional Services', 'Retail', 'Real Estate', 'Hospitality'])}
                ${dd('Business Registration ID Type', 'bp_regtype', p.regType, ['UK Companies House Number', 'UK VAT Number', 'USA: Employer Identification Number (EIN)', 'Other'])}
                ${field('Business Registration Number', 'bp_regnum', p.regNum, 'e.g. 09876543')}
              </div>
              ${dd('Business Regions of Operations', 'bp_regions', p.regions, ['Europe', 'USA and Canada', 'Asia', 'Africa', 'Latin America', 'Australia'])}
            </div>
            <div class="ss-card-f"><button class="btn primary" id="bp_save_info">Update Information</button></div>
          </div>
        </div>
        <div class="grid">
          <div class="card"><div class="card-h"><h3>Location ID</h3></div>
            <div class="card-b row"><span class="ss-code">x7Kd2LmQ9pBloomDnt01</span><span class="spacer"></span><button class="btn sm" onclick="KY.toast('Location ID copied')">${icon('copy', 16)} Copy</button></div></div>
          <div class="card" id="bp_rep_card">
            <div class="card-h"><h3>Authorized Representative</h3></div>
            <div class="card-b">
              <div class="ss-g2">${field('First Name', 'bp_rep_first', p.repFirst)}${field('Last Name', 'bp_rep_last', p.repLast)}</div>
              ${field('Representative Email', 'bp_rep_email', p.repEmail)}
              <div class="ss-g2">${field('Job Position', 'bp_rep_title', p.repTitle)}${field('Phone Number', 'bp_rep_phone', p.repPhone)}</div>
            </div>
            <div class="ss-card-f"><button class="btn primary" id="bp_save_rep">Update Information</button></div>
          </div>
          <div class="card" id="bp_general_settings">
            <div class="card-h"><h3>General</h3></div>
            <div class="card-b" style="padding-top:6px;padding-bottom:6px">
              ${[['dupContact', 'Allow Duplicate Contact', 'Create a new contact even when the email or phone already exists'],
                 ['dupOpp', 'Allow Duplicate Opportunity', 'One contact can have several deals in the same pipeline'],
                 ['fbMerge', 'Merge Facebook Contacts By Name', 'Match Messenger leads to existing contacts'],
                 ['tzDisabled', 'Disable Contact Timezone', 'Use the business time zone for every contact'],
                 ['invalidEmail', 'Mark email as invalid due to verification', 'Stop sending to addresses that fail verification']]
                .map(([k, l, s]) => `<div class="ss-trow"><div class="lbl">${l}<small>${s}</small></div>${tog('bp_g_' + k, g[k])}</div>`).join('')}
            </div>
            <div class="ss-card-f"><button class="btn primary" id="bp_save_settings">Save</button></div>
          </div>
        </div>
      </div>`;
    wireDropdowns(main);
    KY.toggles(main);
    $('#bp_logo').onclick = () => {
      $('#bp_logo').innerHTML = `<span class="muted">${icon('upload', 22)}</span><span class="bold">Uploading bloom-logo.png…</span>`;
      setTimeout(() => { S.logo = true; $('#bp_logo').innerHTML = `${logoSvg(84)}<span class="chip green">${icon('check', 14)} bloom-logo.png</span>`; }, 700);
    };
    const val = (id) => $('#' + id).value;
    const txt = (id) => $('#' + id + ' span').textContent;
    $('#bp_save_general').onclick = () => { Object.assign(p, { name: val('bp_name'), legal: val('bp_legal'), email: val('bp_email'), phone: val('bp_phone'), website: val('bp_website'), niche: txt('bp_niche') }); KY.toast('Business information updated'); };
    $('#bp_save_address').onclick = () => { Object.assign(p, { street: val('bp_street'), city: val('bp_city'), postcode: val('bp_postcode'), region: val('bp_region'), country: txt('bp_country'), timezone: txt('bp_timezone') }); KY.toast('Business address updated'); };
    $('#bp_save_info').onclick = () => { Object.assign(p, { type: txt('bp_type'), industry: txt('bp_industry'), regType: txt('bp_regtype'), regNum: val('bp_regnum'), regions: txt('bp_regions') }); KY.toast('Business information updated'); };
    $('#bp_save_rep').onclick = () => KY.toast('Authorized representative updated');
    $('#bp_save_settings').onclick = () => { Object.keys(g).forEach((k) => (g[k] = $('#bp_g_' + k).classList.contains('on'))); KY.toast('Settings saved'); };
  }

  // ======================================================================
  // My Profile
  // ======================================================================
  function myProfile(main) {
    const me = data.me;
    main.innerHTML = `${head('My Profile', 'Your personal details, password and signature. Only you can see this page.')}
      <div class="grid" style="grid-template-columns:1.4fr 1fr;align-items:start">
        <div class="card"><div class="card-h"><h3>Personal Data</h3></div><div class="card-b">
          <div class="row" style="margin-bottom:16px">${avatar(me.name, 64)}<button class="btn sm">${icon('upload', 16)} Change photo</button></div>
          <div class="ss-g2">${field('First Name', 'mp_first', 'Sarah')}${field('Last Name', 'mp_last', 'Mitchell')}</div>
          <div class="ss-g2">${field('Email', 'mp_email', me.email)}${field('Phone', 'mp_phone', '+44 7700 900111')}</div>
          ${field('Email Signature', 'mp_sig', 'Sarah Mitchell · Bloom Dental Studio · 020 7946 0321')}
        </div><div class="ss-card-f"><button class="btn primary" onclick="KY.toast('Profile updated')">Update Profile</button></div></div>
        <div class="grid">
          <div class="card"><div class="card-h"><h3>Change Password</h3></div><div class="card-b">
            ${field('Existing Password', 'mp_pw0', '', '••••••••', 'type="password"')}${field('New Password', 'mp_pw1', '', '', 'type="password"')}
          </div><div class="ss-card-f"><button class="btn primary" onclick="KY.toast('Password updated')">Update Password</button></div></div>
          <div class="card"><div class="card-h"><h3>Two-Factor Authentication</h3></div><div class="card-b ss-trow" style="padding:16px 20px">
            <div class="lbl">Ask for a code when signing in<small>Codes are sent to your email or phone</small></div>${tog('mp_2fa', true)}</div></div>
        </div>
      </div>`;
    KY.toggles(main);
  }

  // ======================================================================
  // Billing — subscription, wallet & usage at Kyntlo's wholesale rates
  // ======================================================================
  const USAGE = [
    ['Email', 'LC Email — emails sent', 3000, 0.00135, '/ email'],
    ['Email', 'Email verification', 420, 0.005, '/ email'],
    ['Phone', 'SMS — segments sent & received', 1250, 0.0158, '/ segment'],
    ['Phone', 'Outbound calls', 340, 0.028, '/ min'],
    ['Phone', 'Inbound calls', 610, 0.017, '/ min'],
    ['Automation', 'Premium workflow actions', 180, 0.02, '/ action'],
    ['AI', 'Conversation AI messages', 1460, 0.04, '/ message', true],
    ['AI', 'Content AI', 12, 0.18, '/ 1k words', true],
    ['AI', 'Reviews AI responses', 26, 0.16, '/ response', true],
    ['AI', 'Workflow AI executions', 310, 0.06, '/ execution', true],
  ];
  function billing(main, sub) {
    sub = sub || 'wallet';
    main.innerHTML = `${head('Billing', 'Your Kyntlo plan, your wallet balance and what you have used this month.')}
      ${subtabs('billing', [['subscription', 'Subscription'], ['wallet', 'Wallet & Transactions'], ['invoices', 'Invoices']], sub)}<div id="bl_body"></div>`;
    const body = $('#bl_body');
    if (sub === 'subscription') {
      body.innerHTML = `<div class="grid" style="grid-template-columns:1.3fr 1fr;align-items:start">
        <div class="card" id="bl_plan"><div class="card-b">
          <div class="row"><span class="chip purple">Current plan</span><span class="spacer"></span><span class="chip green">${icon('check', 14)} Active</span></div>
          <div class="row" style="margin-top:14px;align-items:baseline"><span class="ss-big">Kyntlo Pro</span><span class="spacer"></span><span style="font-size:24px;font-weight:700">$490</span><span class="muted">/month plus taxes</span></div>
          <p class="muted" style="margin:6px 0 16px">Unlimited AI, reviews, call tracking, memberships and advanced reporting. Up to 25 users.</p>
          <div class="ss-trow"><div class="lbl">Next invoice</div><b>1 Nov 2026</b></div>
          <div class="ss-trow"><div class="lbl">Users</div><b>${S.staff.length} of 25</b></div>
          <div class="ss-trow"><div class="lbl">Payment method</div><b>Visa •••• 4242</b></div>
        </div><div class="ss-card-f" style="gap:10px"><button class="btn" id="bl_change_plan">Change plan</button></div></div>
        <div class="card"><div class="card-h"><h3>What's included</h3></div><div class="card-b">
          ${['Plan features (CRM, inbox, calendars, funnels, workflows…)', 'Unlimited AI usage on Pro', 'Secure hosting & support']
            .map((t) => `<div class="row" style="margin:8px 0"><span style="color:var(--green)">${icon('check', 18)}</span>${t}</div>`).join('')}
          <div class="row" style="margin:8px 0"><span style="color:var(--amber)">${icon('money', 18)}</span>Phone, SMS and email usage is billed from your wallet at wholesale rates</div>
        </div></div></div>`;
      $('#bl_change_plan').onclick = () => KY.modal({ title: 'Change plan', wide: true,
        body: `<div class="grid" style="grid-template-columns:repeat(3,1fr)">${[['Starter', 90, 'Up to 3 users · 1 pipeline'], ['Growth', 270, 'Up to 10 users · workflows · SMS'], ['Pro', 490, 'Up to 25 users · unlimited AI']]
          .map(([n, pr, d]) => `<div class="card" style="padding:18px;box-shadow:none;${n === 'Pro' ? 'border-color:var(--blue)' : ''}"><div class="bold" style="font-size:18px">${n}</div><div style="font-size:26px;font-weight:700;margin:6px 0">$${pr}<span class="muted" style="font-size:14px;font-weight:500">/mo</span></div><div class="muted" style="font-size:14px">${d}</div>
          <button class="btn sm ${n === 'Pro' ? '' : 'primary'}" style="margin-top:14px" ${n === 'Pro' ? 'disabled' : ''}>${n === 'Pro' ? 'Current plan' : 'Switch'}</button></div>`).join('')}</div>`,
        actions: [{ label: 'Close' }] });
      return;
    }
    if (sub === 'invoices') {
      body.innerHTML = `<div class="card">${table('bl_invoices', ['Invoice', 'Date', 'Description', 'Amount', 'Status', ''], [
        ['KY-20261001', '1 Oct 2026', 'Kyntlo Pro — October', 490], ['KY-20260901', '1 Sep 2026', 'Kyntlo Pro — September', 490], ['KY-20260801', '1 Aug 2026', 'Kyntlo Pro — August', 490]]
        .map(([id, d, de, a]) => `<tr><td class="bold">${id}</td><td>${d}</td><td>${de}</td><td>${usd(a)}</td><td>${chip('Paid', 'green')}</td><td><button class="btn sm ghost">${icon('download', 16)} PDF</button></td></tr>`))}</div>`;
      return;
    }
    // Wallet & Transactions
    const w = S.wallet;
    const total = USAGE.reduce((a, u) => a + (u[5] ? 0 : u[2] * u[3]), 0);
    body.innerHTML = `
      <div class="grid" style="grid-template-columns:1fr 1.25fr;align-items:stretch">
        <div class="card" id="bl_balance_card"><div class="card-b">
          <div class="muted bold">Current Balance</div>
          <div class="row" style="align-items:baseline;margin:6px 0 4px"><span class="ss-big" id="bl_balance">${usd(w.balance)}</span><span class="muted">USD</span></div>
          <div class="muted" style="font-size:14px">Usage is deducted from this balance as it happens.</div>
          <div class="row" style="margin-top:18px"><button class="btn primary" id="bl_add_balance">${icon('plus', 18)} Add Balance</button><button class="btn" id="bl_pm">${icon('card', 18)} Visa •••• 4242</button></div>
        </div></div>
        <div class="card" id="bl_auto_card"><div class="card-b">
          <div class="row"><div><div class="bold" style="font-size:17px">Auto Recharge</div><div class="muted" style="font-size:14px">Top up automatically so calls and messages never stop.</div></div><span class="spacer"></span>${tog('bl_auto', w.autoRecharge)}</div>
          <div class="row" style="margin-top:16px;gap:12px;flex-wrap:wrap;font-size:15.5px">Recharge my wallet with
            <span class="row" style="gap:4px"><b>$</b><input class="input" id="bl_auto_to" value="${w.to - w.below}" style="width:80px;height:38px"></span> when the balance falls below
            <span class="row" style="gap:4px"><b>$</b><input class="input" id="bl_auto_below" value="${w.below}" style="width:70px;height:38px"></span></div>
          <div class="row" style="margin-top:14px"><span class="spacer"></span><button class="btn primary sm" id="bl_auto_save">Save</button></div>
        </div></div>
      </div>
      <div class="card" style="margin-top:20px" id="bl_usage_card">
        <div class="card-h"><h3>Usage summary</h3><span class="chip">1 Oct – 21 Oct 2026</span><span class="spacer"></span><span class="muted" style="font-size:14px">Wholesale rates, no markup</span></div>
        ${table('bl_usage', ['Service', 'Category', 'Quantity', 'Rate', 'Cost'], USAGE.map(([cat, n, q, r, unit, incl], i) => `
          <tr id="bl_usage_${i}"><td class="bold">${esc(n)}</td><td>${chip(cat, cat === 'AI' ? 'purple' : cat === 'Phone' ? 'blue' : cat === 'Email' ? 'pink' : 'amber')}</td>
          <td>${q.toLocaleString('en-US')}</td><td class="muted">$${r} ${unit}</td>
          <td>${incl ? `<span class="chip green">Included in Pro</span>` : `<b>${usd(q * r)}</b>`}</td></tr>`))}
        <div class="row" style="padding:14px 16px;font-size:16px"><span class="muted" style="font-size:14px">Kyntlo's standard wholesale rates. SMS and call rates for some countries differ.</span><span class="spacer"></span>Total this month <b style="font-size:20px;margin-left:10px" id="bl_usage_total">${usd(total)}</b></div>
      </div>
      <div class="card" style="margin-top:20px" id="bl_tx_card">
        <div class="card-h"><h3>Wallet transactions</h3></div>
        ${table('bl_tx', ['Date', 'Description', 'Amount'], S.transactions.map((t) => `<tr><td class="muted">${t.date}</td><td>${esc(t.desc)}</td>
          <td style="font-weight:600;color:${t.amount > 0 ? '#027a48' : 'var(--ink)'}">${t.amount > 0 ? '+' : '−'}${usd(Math.abs(t.amount))}</td></tr>`))}
      </div>`;
    KY.toggles(body);
    $('#bl_auto_save').onclick = () => { w.autoRecharge = $('#bl_auto').classList.contains('on'); KY.toast('Auto recharge settings saved'); };
    $('#bl_add_balance').onclick = () => {
      let amt = 50;
      const box = KY.modal({ title: 'Add Balance',
        body: `<p class="muted" style="margin-top:0">Choose how much to add to your wallet.</p>
          <div class="row" style="gap:10px;margin-bottom:16px" id="bl_amounts">${[25, 50, 100, 200].map((a) => `<button class="ss-type ${a === 50 ? 'on' : ''}" data-amt="${a}" id="bl_amt_${a}" style="flex:1;justify-content:center;font-size:18px">$${a}</button>`).join('')}</div>
          <div class="field"><label>Payment method</label><div class="ss-num" style="margin:0">${icon('card', 22)}<b style="font-size:15px">Visa ending 4242</b><span class="muted">Expires 08/28</span><span class="spacer"></span><span class="chip">Default</span></div></div>`,
        actions: [{ label: 'Cancel' }, { label: 'Add $50 to wallet', primary: true, id: 'bl_add_confirm', onClick: (close) => {
          w.balance += amt; S.transactions.unshift({ date: '21 Oct 2026', desc: 'Manual top-up — Visa •••• 4242', amount: amt });
          close(); billing(main, 'wallet'); KY.toast(`${usd(amt)} added to your wallet`);
        } }] });
      $$('[data-amt]', box).forEach((b) => (b.onclick = () => {
        amt = +b.dataset.amt; $$('[data-amt]', box).forEach((x) => x.classList.toggle('on', x === b));
        $('#bl_add_confirm', box).textContent = `Add $${amt} to wallet`;
      }));
    };
  }

  // ======================================================================
  // My Staff — users, roles & permissions
  // ======================================================================
  const PERMS = [
    ['dashboard', 'Dashboard Stats', true], ['conversations', 'Conversations', true], ['calendars', 'Calendars', true], ['contacts', 'Contacts', true],
    ['opportunities', 'Opportunities', true], ['payments', 'Payments', false], ['marketing', 'Marketing', false], ['automation', 'Automation', false],
    ['sites', 'Sites (Funnels, Websites & Forms)', false], ['reputation', 'Reputation', true], ['reporting', 'Reporting', false], ['settings', 'Settings', false],
    ['bulk', 'Bulk Actions (incl. exports)', false], ['memberships', 'Memberships', false], ['ai', 'AI Agents', false], ['phone', 'Phone Calls', true],
  ];
  function myStaff(main) {
    main.innerHTML = `${head('My Staff', 'Add your team, choose what each person can see and do, and assign them to calendars.', `<button class="btn primary" id="ms_add">${icon('plus', 18)} Add Employee</button>`)}
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)">
          <div class="search" style="width:320px"><span>${icon('search', 18)}</span><input class="input" placeholder="Search by name, email or phone"></div>
          <span class="spacer"></span><span class="muted" style="font-size:14px">${S.staff.length} of 25 users on your plan</span></div>
        ${table('ms_table', ['Name', 'Email', 'Phone', 'User Type', 'Status', ''], S.staff.map((u, i) => `
          <tr id="ms_row_${i}"><td><div class="row">${avatar(u.name, 34)}<span class="bold">${esc(u.name)}</span></div></td><td>${esc(u.email)}</td><td>${esc(u.phone)}</td>
          <td><span class="chip ${u.type.includes('Admin') ? 'purple' : 'blue'}">${esc(u.type)}</span></td><td>${u.status === 'Invited' ? chip('Invite sent', 'amber') : chip('Active', 'green')}</td>
          <td style="text-align:right"><button class="btn sm ghost" data-edit="${i}" id="ms_edit_${i}">${icon('edit', 16)}</button><button class="btn sm ghost">${icon('trash', 16)}</button></td></tr>`))}
      </div>`;
    $('#ms_add').onclick = () => userDrawer(main);
    $$('[data-edit]', main).forEach((b) => (b.onclick = () => userDrawer(main, S.staff[+b.dataset.edit])));
  }

  function userDrawer(main, user) {
    const isNew = !user;
    const box = KY.modal({ title: isNew ? 'Add New Employee' : 'Edit Employee', drawer: true,
      body: `<div class="row" style="gap:6px;margin-bottom:18px" id="ms_sections">
          ${[['info', 'User Info'], ['perm', 'User Permissions'], ['roles', 'User Roles'], ['call', 'Call & Voicemail']].map(([k, l], i) =>
            `<button class="btn sm ${i === 0 ? 'primary' : ''}" data-sec="${k}" id="ms_sec_${k}">${l}</button>`).join('')}</div>
        <div class="ss-dblock" id="ms_s_info">
          <div class="ss-dsec">User Info</div>
          <div class="ss-g2">${field('First Name', 'ms_first', user?.name.split(' ')[0] || '')}${field('Last Name', 'ms_last', user?.name.split(' ').slice(1).join(' ') || '')}</div>
          ${field('Email', 'ms_email', user?.email || '', 'name@bloomdental.co.uk')}
          <div class="ss-g2">${field('Phone', 'ms_phone', user?.phone || '', '+44')}${field('Extension', 'ms_ext', '')}</div>
          <p class="muted" style="font-size:14px;margin:0">${icon('mail', 16)} They'll get an email invitation to set their own password.</p>
        </div>
        <div class="ss-dblock" id="ms_s_perm">
          <div class="ss-dsec">User Permissions</div>
          <p class="muted" style="font-size:14px;margin:-4px 0 6px">Turn on only the areas this person needs for their job.</p>
          <div class="ss-perm">${PERMS.map(([k, l, on]) => `<div class="ss-trow"><span class="lbl">${l}</span>${tog('ms_perm_' + k, user ? true : on)}</div>`).join('')}</div>
        </div>
        <div class="ss-dblock" id="ms_s_roles">
          <div class="ss-dsec">User Roles</div>
          <div class="field"><label>User Type</label><div class="ss-seg" style="width:fit-content"><button class="on">Account</button></div></div>
          <div class="field"><label>User Role</label><div class="ss-seg" id="ms_role" style="width:fit-content">
            <button id="ms_role_admin" class="${user?.type.includes('Admin') ? 'on' : ''}">Admin</button><button id="ms_role_user" class="${user?.type.includes('Admin') ? '' : 'on'}">User</button></div></div>
          <div class="ss-trow" id="ms_assigned_row"><div class="lbl">Only show assigned data<small>Contacts, conversations and opportunities assigned to this user only</small></div>${tog('ms_assigned_only', false)}</div>
        </div>
        <div class="ss-dblock" id="ms_s_call">
          <div class="ss-dsec">Call &amp; Voicemail Settings</div>
          ${dd('Outbound Call Number', 'ms_outbound', '+44 20 7946 0321 (Main line)', S.numbers.map((n) => `${n.num} (${n.name})`))}
          <div class="ss-trow"><div class="lbl">Forward incoming calls to my phone</div>${tog('ms_fwd', true)}</div>
        </div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'ms_save', onClick: (close, root) => {
        const name = `${$('#ms_first', root).value} ${$('#ms_last', root).value}`.trim() || 'New Employee';
        const type = $('#ms_role_admin', root).classList.contains('on') ? 'Account - Admin' : 'Account - User';
        if (isNew) S.staff.push({ name, email: $('#ms_email', root).value, phone: $('#ms_phone', root).value, role: 'User', type, status: 'Invited' });
        else Object.assign(user, { name, type });
        close(); myStaff(main); KY.toast(isNew ? `Invitation sent to ${$('#ms_email', root).value || name}` : 'Employee updated');
      } }] });
    box.style.width = '680px';
    KY.toggles(box);
    wireDropdowns(box);
    $$('#ms_role button', box).forEach((b) => (b.onclick = () => $$('#ms_role button', box).forEach((x) => x.classList.toggle('on', x === b))));
    const mb = $('.modal-b', box);
    $$('[data-sec]', box).forEach((b) => (b.onclick = () => {
      $$('[data-sec]', box).forEach((x) => x.classList.toggle('primary', x === b));
      const target = $('#ms_s_' + b.dataset.sec, box);
      mb.scrollTo({ top: target.offsetTop - mb.offsetTop - 64, behavior: 'smooth' });
    }));
  }

  // ======================================================================
  // Opportunities & Pipelines
  // ======================================================================
  function pipelinesPage(main) {
    main.innerHTML = `${head('Opportunities & Pipelines', 'Your pipelines and their stages. Build and edit them from Opportunities → Pipelines.')}
      <div class="card">${table('', ['Pipeline', 'Stages', 'Opportunities'], data.pipelines.map((p) =>
        `<tr><td class="bold">${esc(p.name)}</td><td><div class="row" style="gap:6px;flex-wrap:wrap">${p.stages.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div></td><td>${data.opportunities.filter((o) => o.pipeline === p.id).length}</td></tr>`))}</div>
      <div class="card" style="margin-top:20px"><div class="card-b" style="padding-top:6px;padding-bottom:6px">
        <div class="ss-trow"><div class="lbl">Allow duplicate opportunities<small>One contact can have several opportunities in the same pipeline</small></div>${tog('op_dup', true)}</div>
        <div class="ss-trow"><div class="lbl">Show lost reasons<small>Ask for a reason when an opportunity is marked as lost</small></div>${tog('op_lost', true)}</div></div></div>`;
    KY.toggles(main);
  }

  // ======================================================================
  // Calendars — calendar list with team members (calendar assignment)
  // ======================================================================
  function calendarsPage(main) {
    main.innerHTML = `${head('Calendars', 'Manage your calendars, who takes bookings on each one, and your connected calendars.', `<button class="btn primary">${icon('plus', 18)} Create Calendar</button>`)}
      <div class="card">${table('sc_table', ['Calendar', 'Type', 'Duration', 'Team members', ''], data.calendars.map((k) => `
        <tr id="sc_row_${k.id}"><td><div class="row"><span style="width:12px;height:12px;border-radius:50%;background:${k.color}"></span><span class="bold">${esc(k.name)}</span></div></td>
        <td>${esc(k.type)}</td><td>${k.duration} mins</td>
        <td><div class="row" style="gap:6px">${S.calendarsTeam[k.id].map((n) => `<span title="${esc(n)}">${avatar(n, 30)}</span>`).join('')}<span class="muted" style="font-size:14px">${S.calendarsTeam[k.id].join(', ')}</span></div></td>
        <td style="text-align:right"><button class="btn sm" id="sc_team_${k.id}" data-k="${k.id}">${icon('users', 16)} Team members</button></td></tr>`))}</div>
      <div class="card" style="margin-top:20px"><div class="card-h"><h3>Connected calendars</h3></div><div class="card-b row">
        <img src="../../assets/integration-logos/google.png" style="height:22px"> <span>sarah@bloomdental.co.uk — Google Calendar</span>${chip('Connected')}
        <span class="spacer"></span><button class="btn sm">Manage</button></div></div>`;
    $$('[data-k]', main).forEach((b) => (b.onclick = () => {
      const k = data.calendars.find((c) => c.id === b.dataset.k);
      const box = KY.modal({ title: `Team members — ${k.name}`,
        body: `<p class="muted" style="margin-top:0">Bookings on this ${esc(k.type.toLowerCase())} calendar are shared between the people you select.</p>
          ${S.staff.map((u, i) => `<label class="ss-trow" style="cursor:pointer"><input type="checkbox" id="sc_member_${i}" data-n="${esc(u.name)}" ${S.calendarsTeam[k.id].includes(u.name) ? 'checked' : ''} style="width:18px;height:18px">
            ${avatar(u.name, 32)}<span class="lbl">${esc(u.name)}<small>${esc(u.email)}</small></span>
            <span class="muted" style="font-size:13px">Priority</span><span class="chip">${i === 0 ? 'High' : 'Medium'}</span></label>`).join('')}`,
        actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'sc_team_save', onClick: (close, root) => {
          S.calendarsTeam[k.id] = $$('[data-n]', root).filter((c) => c.checked).map((c) => c.dataset.n);
          close(); calendarsPage(main); KY.toast(`Team members updated for ${k.name}`);
        } }] });
      box.style.width = '600px';
    }));
  }

  // ======================================================================
  // Email Services — dedicated sending domain
  // ======================================================================
  const dnsRecords = (d) => {
    const root = d.split('.').slice(1).join('.');
    return [
      ['TXT', d, 'v=spf1 include:mailgun.org ~all', 'SPF'],
      ['TXT', `krs._domainkey.${d}`, 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7v…IDAQAB', 'DKIM'],
      ['MX', d, 'mxa.mailgun.org  (priority 10)', 'MX'],
      ['MX', d, 'mxb.mailgun.org  (priority 10)', 'MX'],
      ['CNAME', `email.${d}`, 'mailgun.org', 'Tracking'],
      ['TXT', `_dmarc.${root}`, 'v=DMARC1; p=none; rua=mailto:dmarc@' + root, 'DMARC'],
    ];
  };
  function emailServices(main, sub) {
    sub = sub || 'dedicated';
    main.innerHTML = `${head('Email Services', 'Send your emails from your own domain so they land in the inbox and look like they come from you.')}
      ${subtabs('email-services', [['dedicated', 'Dedicated Domain And IP'], ['smtp', 'SMTP Service'], ['verification', 'Email Verification']], sub)}<div id="es_body"></div>`;
    const body = $('#es_body');
    if (sub === 'smtp') {
      body.innerHTML = `<div class="card">${table('', ['Provider', 'From', 'Status', ''], [
        `<tr><td class="bold">LC Email (Kyntlo)</td><td>hello@bloomdental.co.uk</td><td>${chip('Active', 'green')} <span class="chip">Default</span></td><td></td></tr>`])}
        <div class="card-b"><button class="btn">${icon('plus', 18)} Add Service</button> <span class="muted" style="font-size:14px;margin-left:8px">Use Mailgun, Gmail/Google Workspace or any SMTP server instead.</span></div></div>`;
      return;
    }
    if (sub === 'verification') {
      body.innerHTML = `<div class="card"><div class="card-b" style="padding-top:6px;padding-bottom:6px">
        <div class="ss-trow"><div class="lbl">Verify new email addresses automatically<small>Each check costs $0.005 and is rechecked every 90 days</small></div>${tog('es_verify_auto', true)}</div>
        <div class="ss-trow"><div class="lbl">Mark email as invalid due to verification<small>Contacts that fail are skipped by campaigns and workflows</small></div>${tog('es_verify_invalid', true)}</div></div></div>`;
      KY.toggles(body);
      return;
    }
    const rows = S.domains.map((d, i) => `<tr id="es_row_${i}"><td class="bold">${esc(d.name)}</td><td>${chip(d.status)}</td><td>${d.isDefault ? '<span class="chip blue">Default</span>' : ''}</td><td class="muted">Shared IP</td>
      <td style="text-align:right">${d.status === 'Verified' && !d.isDefault ? `<button class="btn sm" id="es_default_${i}" data-def="${i}">Set as default</button>` : ''}<button class="btn sm ghost" data-dns="${i}" id="es_dns_${i}">${icon('eye', 16)} DNS records</button></td></tr>`);
    body.innerHTML = `
      <div class="grid" style="grid-template-columns:2fr 1fr;align-items:start">
        <div class="card">
          <div class="card-h"><h3>Dedicated Sending Domains</h3><span class="spacer"></span><button class="btn primary" id="es_add_domain">${icon('plus', 18)} Add Domain</button></div>
          ${S.domains.length ? table('es_table', ['Domain', 'Status', '', 'IP', ''], rows)
            : `<div class="empty" id="es_empty" style="padding:44px 20px"><div style="color:var(--blue)">${icon('mail', 40)}</div><div class="big">No dedicated domain yet</div>Emails are currently sent from Kyntlo's shared domain.<br>Add your own domain to improve deliverability.</div>`}
        </div>
        <div class="grid">
          <div class="card" id="es_why"><div class="card-h"><h3>Why use your own domain?</h3></div><div class="card-b" style="font-size:15px">
            ${['Your emails show "sent from bloomdental.co.uk", not a shared domain', 'Better inbox placement with Gmail, Outlook & Yahoo', 'Your sending reputation is yours alone']
              .map((t) => `<div class="row" style="margin:8px 0;align-items:flex-start"><span style="color:var(--green)">${icon('check', 18)}</span>${t}</div>`).join('')}</div></div>
          <div class="card"><div class="card-h"><h3>Dedicated IP</h3><span class="chip amber">Add-on</span></div><div class="card-b" style="font-size:15px">
            <p class="muted" style="margin:0 0 12px">For high-volume senders. $88.50 / month.</p><button class="btn sm">Request Dedicated IP</button></div></div>
        </div>
      </div>`;
    $('#es_add_domain').onclick = () => addDomain(main);
    $$('[data-dns]', body).forEach((b) => (b.onclick = () => dnsView(main, S.domains[+b.dataset.dns])));
    $$('[data-def]', body).forEach((b) => (b.onclick = () => { S.domains.forEach((d, i) => (d.isDefault = i === +b.dataset.def)); emailServices(main); KY.toast('Default sending domain updated'); }));
  }
  function addDomain(main) {
    KY.modal({ title: 'Add Domain',
      body: `<div class="field"><label>Domain</label><input class="input" id="es_domain_input" placeholder="mail.yourbusiness.com"></div>
        <div class="card" style="box-shadow:none;background:var(--blue-soft);border-color:#d1e0ff;padding:12px 14px;font-size:14.5px">
          ${icon('bolt', 16)} <b>Use a subdomain</b>, like <b>mail.bloomdental.co.uk</b>. It keeps your marketing email separate from your everyday mailbox, so it can't affect it.</div>`,
      actions: [{ label: 'Cancel' }, { label: 'Add & Verify', primary: true, id: 'es_domain_continue', onClick: (close, root) => {
        const name = $('#es_domain_input', root).value.trim() || 'mail.bloomdental.co.uk';
        const d = { name, status: 'Pending', isDefault: false };
        S.domains.push(d); close(); dnsView(main, d);
      } }] });
  }
  function dnsView(main, d) {
    const recs = dnsRecords(d.name);
    main.innerHTML = `${head(d.name, 'Add these records at your domain provider (GoDaddy, Cloudflare, 123 Reg…), then click Verify.',
        '')}
      <div class="card" style="margin-bottom:16px"><div class="card-b row">
        <button class="btn" id="es_back">${icon('left', 18)} Back</button><span>Status</span><span id="es_status">${chip(d.status)}</span><span class="spacer"></span>
        <span class="muted" style="font-size:14px">DNS changes can take up to 24–48 hours to spread.</span><button class="btn primary" id="es_verify">${icon('check', 18)} Verify</button></div></div>
      <div class="card" id="es_dns_card">
        <div class="card-h"><h3>DNS Records</h3><span class="spacer"></span><button class="btn sm" id="es_auto">${icon('bolt', 16)} Add records automatically</button></div>
        ${table('es_dns', ['Type', 'Host / Name', 'Value', 'Purpose', 'Status', ''], recs.map(([t, h, v, p], i) => `
          <tr id="es_rec_${i}"><td><span class="chip blue">${t}</span></td><td><span class="ss-code">${esc(h)}</span></td><td style="max-width:520px"><span class="ss-code">${esc(v)}</span></td>
          <td class="muted">${p}</td><td class="es-rs">${d.status === 'Verified' || p === 'DMARC' ? chip(p === 'DMARC' && d.status !== 'Verified' ? 'Recommended' : 'Verified', p === 'DMARC' && d.status !== 'Verified' ? 'amber' : 'green') : chip('Pending', 'amber')}</td>
          <td><button class="btn sm ghost" onclick="KY.toast('Copied to clipboard')">${icon('copy', 16)}</button></td></tr>`))}
      </div>`;
    $('#es_back').onclick = () => emailServices(main);
    $('#es_auto').onclick = () => KY.toast('Connecting to your DNS provider…', 'warn');
    $('#es_verify').onclick = () => {
      $('#es_status').innerHTML = chip('Checking DNS…', 'amber');
      setTimeout(() => {
        d.status = 'Verified';
        if (!$('#es_status')) { if (!S.domains.some((x) => x.isDefault)) d.isDefault = true; return; }
        if (!S.domains.some((x) => x.isDefault)) d.isDefault = true;
        $('#es_status').innerHTML = chip('Verified') + (d.isDefault ? ' <span class="chip blue">Default sending domain</span>' : '');
        $$('.es-rs', main).forEach((c) => (c.innerHTML = chip('Verified')));
        KY.toast(`${d.name} verified`);
      }, 900);
    };
  }

  // ======================================================================
  // Phone System — numbers, buy flow, forwarding, Trust Center
  // ======================================================================
  function phonePage(main, sub) {
    sub = sub || 'numbers';
    main.innerHTML = `${head('Phone System', 'Your business phone numbers, call forwarding and the registrations that let you call and text.')}
      ${subtabs('phone-numbers', [['numbers', 'Phone Numbers'], ['trust-center', 'Trust Center'], ['porting', 'Number Porting'], ['caller-id', 'Verified Caller ID']], sub)}<div id="ph_body"></div>`;
    const body = $('#ph_body');
    if (sub === 'trust-center') {
      const cardT = (id, ic, col, t, d, st, btn) => `<div class="card ss-tcard" id="${id}"><span class="ic" style="background:${col}1a;color:${col}">${icon(ic, 22)}</span>
        <div style="flex:1"><div class="row"><b style="font-size:17px">${t}</b>${chip(st)}</div><div class="muted" style="font-size:14.5px;margin-top:4px">${d}</div></div>${btn || ''}</div>`;
      body.innerHTML = `<div class="grid" style="grid-template-columns:1fr 1fr">
        ${cardT('tc_profile', 'building', '#12b76a', 'Primary Customer Profile', 'Your verified business identity, taken from Business Profile. Needed before any registration.', 'Approved', '<button class="btn sm">View</button>')}
        ${cardT('tc_bundle', 'note', '#12b76a', 'Regulatory Bundles — United Kingdom', 'Proof of business address required by UK regulators for local and mobile numbers.', 'Approved', '<button class="btn sm">View</button>')}
        ${cardT('tc_a2p', 'sms', '#155eef', 'A2P 10DLC Registration — US numbers', 'Required to send texts from US local numbers. Register your brand and a campaign describing the messages you send.', 'Not required', '<button class="btn sm primary" id="tc_a2p_start">Start registration</button>')}
        ${cardT('tc_cnam', 'phone', '#155eef', 'Caller ID Name (CNAM) — US numbers', 'Shows your business name on outgoing calls in the US.', 'Not required', '')}
      </div>
      <div class="card" style="margin-top:20px" id="tc_steps"><div class="card-h"><h3>Registration progress</h3></div><div class="card-b">
        ${[['Business profile submitted', 'Approved 3 Oct 2026', true], ['UK regulatory bundle', 'Approved 5 Oct 2026', true], ['A2P brand & campaign (US only)', 'Only needed if you add a US number', false]]
          .map(([t, s, ok], i) => `<div class="ss-step"><span class="ss-dot ${ok ? 'ok' : ''}">${ok ? icon('check', 16) : i + 1}</span><div><b>${t}</b><div class="muted" style="font-size:14px">${s}</div></div></div>`).join('')}</div></div>`;
      $('#tc_a2p_start').onclick = () => KY.modal({ title: 'A2P 10DLC Registration', wide: true,
        body: `${['Brand: your legal business name, registration number (EIN for US companies) and address', 'Campaign: what you send (e.g. appointment reminders, marketing), sample messages and how people opt in', 'Review by US carriers, usually a few days to a few weeks']
          .map((t, i) => `<div class="ss-step"><span class="ss-dot">${i + 1}</span><div>${t}</div></div>`).join('')}`,
        actions: [{ label: 'Close' }] });
      return;
    }
    if (sub === 'porting') {
      body.innerHTML = `<div class="card"><div class="empty"><div style="color:var(--blue)">${icon('phone', 40)}</div><div class="big">Bring your existing number</div>Move a number you already own to Kyntlo. Keep it active with your old provider until the port completes.<br><br>
        <button class="btn primary">${icon('plus', 18)} Start a port request</button></div></div>`;
      return;
    }
    if (sub === 'caller-id') {
      body.innerHTML = `<div class="card">${table('', ['Number', 'Name', 'Status'], [`<tr><td class="bold">+44 7700 900111</td><td>Sarah's mobile</td><td>${chip('Verified')}</td></tr>`])}
        <div class="card-b"><button class="btn">${icon('plus', 18)} Add verified caller ID</button></div></div>`;
      return;
    }
    body.innerHTML = `
      <div class="card">
        <div class="card-h"><h3>Phone Numbers</h3><span class="chip">${S.numbers.length}</span><span class="spacer"></span><button class="btn primary" id="ph_add">${icon('plus', 18)} Add Number</button></div>
        ${table('ph_table', ['Number', 'Name', 'Type', 'Capabilities', 'Forwards to', ''], S.numbers.map((n, i) => `
          <tr id="ph_row_${i}"><td><div class="row"><b>${esc(n.num)}</b>${n.isDefault ? '<span class="chip blue">Default</span>' : ''}</div></td><td>${esc(n.name)}</td><td>${n.type}</td>
          <td><div class="row" style="gap:6px">${n.caps.map((c) => `<span class="chip ${c === 'Voice' ? 'green' : 'purple'}">${c}</span>`).join('')}</div></td>
          <td class="muted">${n.fwd ? esc(n.fwd) : '—'}</td><td style="text-align:right"><button class="btn sm" id="ph_edit_${i}" data-n="${i}">${icon('settings', 16)} Configure</button></td></tr>`))}
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr;margin-top:20px">
        <div class="card" id="ph_default_card"><div class="card-b row"><div style="flex:1"><b>Default outbound number</b><div class="muted" style="font-size:14px">Used for calls and texts unless a user has their own number.</div></div>
          <button class="btn ss-sel" style="width:300px" id="ph_default" data-opts="${esc(JSON.stringify(S.numbers.map((n) => n.num)))}"><span>${S.numbers.find((n) => n.isDefault).num}</span>${icon('chevron', 18)}</button></div></div>
        <div class="card"><div class="card-b row"><span style="color:var(--blue)">${icon('chart', 22)}</span><div style="flex:1"><b>Call rates</b><div class="muted" style="font-size:14px">Outbound $0.028/min · Inbound $0.017/min · SMS $0.0158/segment, from your wallet</div></div></div></div>
      </div>`;
    wireDropdowns(body);
    $('#ph_add').onclick = () => buyNumber(main);
    $$('[data-n]', body).forEach((b) => (b.onclick = () => configureNumber(main, S.numbers[+b.dataset.n])));
  }
  function buyNumber(main) {
    let type = 'Mobile';
    const results = {
      Local: [['+44 20 3870 1142', 'London'], ['+44 20 3870 5520', 'London'], ['+44 20 3962 7781', 'London']],
      Mobile: [['+44 7700 900742', 'United Kingdom'], ['+44 7700 900815', 'United Kingdom'], ['+44 7700 900930', 'United Kingdom']],
      'Toll-free': [['+44 800 058 2240', 'United Kingdom'], ['+44 808 196 4471', 'United Kingdom']],
    };
    const caps = { Local: ['Voice'], Mobile: ['Voice', 'SMS', 'MMS'], 'Toll-free': ['Voice'] };
    const box = KY.modal({ title: 'Add Number', wide: true,
      body: `<div class="ss-g3" style="align-items:end">
          ${dd('Country', 'ph_country', 'United Kingdom (+44)', ['United Kingdom (+44)', 'Ireland (+353)', 'United States (+1)', 'Canada (+1)', 'Australia (+61)'])}
          <div class="field"><label>Number type</label><div class="ss-seg" id="ph_types">${['Local', 'Mobile', 'Toll-free'].map((t) => `<button id="ph_type_${t.toLowerCase().replace('-', '')}" data-t="${t}" class="${t === type ? 'on' : ''}">${t}</button>`).join('')}</div></div>
          ${field('Area code or digits', 'ph_search', '', 'e.g. 20')}
        </div>
        <div class="row" style="margin:-4px 0 12px;gap:8px" id="ph_caps_note"></div>
        <div id="ph_results"></div>`,
      actions: [{ label: 'Cancel' }] });
    wireDropdowns(box);
    const draw = () => {
      $('#ph_caps_note', box).innerHTML = `<span class="muted" style="font-size:14px">${type} numbers in the UK support:</span>${caps[type].map((c) => `<span class="chip ${c === 'Voice' ? 'green' : 'purple'}">${c}</span>`).join('')}${type !== 'Mobile' ? '<span class="muted" style="font-size:14px">· choose Mobile if you want to text</span>' : ''}`;
      $('#ph_results', box).innerHTML = results[type].map(([n, loc], i) => `<div class="ss-num" id="ph_result_${i}"><b>${n}</b><span class="muted">${loc}</span>
        <div class="row" style="gap:6px">${caps[type].map((c) => `<span class="chip ${c === 'Voice' ? 'green' : 'purple'}">${c}</span>`).join('')}</div><span class="spacer"></span>
        <button class="btn sm primary" data-buy="${n}" id="ph_buy_${i}">Buy</button></div>`).join('');
      $$('[data-buy]', box).forEach((b) => (b.onclick = () => confirmBuy(b.dataset.buy)));
    };
    $$('[data-t]', box).forEach((b) => (b.onclick = () => { type = b.dataset.t; $$('[data-t]', box).forEach((x) => x.classList.toggle('on', x === b)); draw(); }));
    draw();
    function confirmBuy(num) {
      $('.modal-b', box).innerHTML = `<div style="text-align:center;padding:12px 0 4px"><div style="color:var(--blue)">${icon('phone', 40)}</div>
        <div class="big bold" style="font-size:22px;margin:8px 0">${num}</div><div class="muted">${type} number · ${caps[type].join(', ')}</div></div>
        <div class="card" style="box-shadow:none;padding:14px 16px;margin-top:16px;font-size:15px">
          <div class="ss-trow"><span class="lbl">Monthly rental</span><b>Charged to your wallet</b></div>
          <div class="ss-trow"><span class="lbl">Calls</span><b>$0.028/min out · $0.017/min in</b></div>
          ${caps[type].includes('SMS') ? '<div class="ss-trow"><span class="lbl">SMS</span><b>$0.0158 per segment</b></div>' : ''}
          <div class="ss-trow"><span class="lbl">UK regulatory bundle</span>${chip('Approved')}</div></div>`;
      $('.modal-f', box).innerHTML = `<button class="btn" id="ph_buy_cancel">Back</button><button class="btn primary" id="ph_buy_confirm">Confirm purchase</button>`;
      $('#ph_buy_cancel', box).onclick = () => { box.closest('.overlay').remove(); buyNumber(main); };
      $('#ph_buy_confirm', box).onclick = () => {
        S.numbers.push({ num, name: 'New number', type, caps: caps[type], fwd: '', isDefault: false });
        box.closest('.overlay').remove(); phonePage(main, 'numbers'); KY.toast(`${num} added to your account`);
      };
    }
  }
  function configureNumber(main, n) {
    const box = KY.modal({ title: `Configure ${n.num}`, drawer: true,
      body: `${field('Number Name', 'ph_cfg_name', n.name)}
        <div class="ss-dsec">Inbound calls</div>
        ${field('Forward calls to', 'ph_cfg_fwd', n.fwd, '+44 7700 900111')}
        <div class="ss-trow"><div class="lbl">Pass caller's number<small>Your mobile shows who is calling, not your Kyntlo number</small></div>${tog('ph_cfg_pass', true)}</div>
        <div class="ss-trow"><div class="lbl">Whisper message<small>Hear "Call from Bloom Dental" before you're connected</small></div>${tog('ph_cfg_whisper', true)}</div>
        <div class="ss-trow"><div class="lbl">Record calls<small>Tell callers they are being recorded</small></div>${tog('ph_cfg_record', false)}</div>
        <div class="field" style="margin-top:12px"><label>Ring for (seconds) before voicemail</label><input class="input" id="ph_cfg_timeout" value="20"></div>
        <div class="ss-dsec">Missed calls</div>
        <div class="ss-trow"><div class="lbl">Voicemail<small>Play a greeting and save the voicemail to the conversation</small></div>${tog('ph_cfg_vm', true)}</div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'ph_cfg_save', onClick: (close, root) => {
        n.name = $('#ph_cfg_name', root).value; n.fwd = $('#ph_cfg_fwd', root).value; close(); phonePage(main, 'numbers'); KY.toast('Number settings saved');
      } }] });
    KY.toggles(box);
  }

  // ======================================================================
  // Integrations
  // ======================================================================
  const INTS = [
    ['google', 'Google', 'google.png', 'Google Business Profile, Google Ads & Analytics, and Google Calendar.', 'Google Business Profile: Bloom Dental Studio'],
    ['facebook', 'Facebook & Instagram', 'facebook.png', 'Messenger & Instagram DMs, lead forms, and posting from Social Planner.', 'Page: Bloom Dental Studio · @bloomdentalstudio'],
    ['tiktok', 'TikTok', 'tiktok.png', 'TikTok lead forms and posting from Social Planner.'],
    ['linkedin', 'LinkedIn', 'linkedin.png', 'LinkedIn lead forms and posting from Social Planner.'],
    ['zoom', 'Zoom', 'zoom.png', 'Create a Zoom link automatically for every online appointment.', 'sarah@bloomdental.co.uk'],
    ['quickbooks', 'QuickBooks Online', 'quickbooks.png', 'Sync invoices, payments and customers with your accounts.'],
  ];
  function integrations(main) {
    main.innerHTML = `${head('Integrations', 'Connect the accounts Kyntlo works with. Each connection takes a minute and you can disconnect at any time.')}
      <div class="grid" style="grid-template-columns:repeat(3,1fr)" id="int_grid">${INTS.map(([k, n, logo, d, acct]) => {
        const on = S.integrations[k];
        return `<div class="card ss-int" id="int_${k}">
          <div class="row"><span class="lg"><img src="../../assets/integration-logos/${logo}" alt=""></span><span class="spacer"></span>${on ? chip('Connected') : '<span class="chip">Not connected</span>'}</div><b style="font-size:17px">${n}</b>
          <div class="muted" style="font-size:14.5px;min-height:42px">${d}</div>
          ${on && acct ? `<div class="row" style="font-size:14px;gap:6px"><span style="color:var(--green)">${icon('check', 16)}</span>${esc(acct)}</div>` : ''}
          <div class="row">${on ? `<button class="btn sm" id="int_${k}_manage">Manage</button><button class="btn sm ghost" style="color:var(--red)" data-dis="${k}">Disconnect</button>`
            : `<button class="btn sm primary" id="int_${k}_connect" data-con="${k}">${icon('link', 16)} Connect</button>`}</div></div>`;
      }).join('')}
        <div class="card ss-int" id="int_stripe"><div class="row"><span class="lg"><img src="../../assets/integration-logos/stripe.png" alt=""></span><span class="spacer"></span>${chip('Connected')}</div><b style="font-size:17px">Stripe</b>
          <div class="muted" style="font-size:14.5px;min-height:42px">Payment processing is connected in Payments → Integrations.</div>
          <div class="row"><button class="btn sm" id="int_stripe_go">${icon('external', 16)} Go to Payments</button></div></div>
        <div class="card ss-int" id="int_marketplace" style="background:var(--blue-soft);border-color:#d1e0ff"><div class="row"><span class="lg">${icon('apps', 30)}</span></div><b style="font-size:17px">More apps</b>
          <div class="muted" style="font-size:14.5px;min-height:42px">Slack, Xero, Shopify, Zapier and hundreds more live in the App Marketplace.</div>
          <div class="row"><button class="btn sm primary" id="int_open_marketplace">Open App Marketplace</button></div></div>
      </div>`;
    $('#int_stripe_go').onclick = () => KY.go('#/payments');
    $('#int_open_marketplace').onclick = () => KY.go('#/app-marketplace');
    $$('[data-dis]', main).forEach((b) => (b.onclick = () => { S.integrations[b.dataset.dis] = false; integrations(main); KY.toast('Disconnected'); }));
    $$('[data-con]', main).forEach((b) => (b.onclick = () => connectFlow(main, b.dataset.con)));
  }
  function connectFlow(main, k) {
    const [, n] = INTS.find((i) => i[0] === k);
    const steps = k === 'google' ? 3 : 2;
    let step = 0;
    const box = KY.modal({ title: `Connect ${n}`, body: '<div id="int_flow"></div>', actions: [] });
    const draw = () => {
      const f = $('#int_flow', box);
      if (step === 0) {
        f.innerHTML = `<div style="text-align:center"><div class="bold" style="font-size:19px">Choose an account</div><div class="muted" style="margin:4px 0 16px">to continue to Kyntlo</div></div>
          <button class="ss-num" id="int_account" style="width:100%;background:#fff;cursor:pointer">${avatar(data.me.name, 38)}<div style="text-align:left"><b style="font-size:15.5px">${esc(data.me.name)}</b><div class="muted" style="font-size:14px">${esc(data.me.email)}</div></div></button>
          <button class="ss-num" style="width:100%;background:#fff">${icon('user', 22)}<span>Use another account</span></button>`;
        $('#int_account', box).onclick = () => { step++; draw(); };
      } else if (step === 1) {
        f.innerHTML = `<div class="bold" style="font-size:18px;margin-bottom:6px">Kyntlo wants to access your ${esc(n)} account</div>
          ${({ zoom: ['Create and manage Zoom meetings for your appointments', 'See your Zoom user profile'], quickbooks: ['Create and update invoices and customers', 'Read payments'], tiktok: ['Read lead form submissions', 'Publish posts'], linkedin: ['Read lead form submissions', 'Publish posts to your page'] }[k] || ['See and manage your business listing and reviews', 'Read and reply to messages', 'View performance data']).map((t) => `<div class="row" style="margin:10px 0"><span style="color:var(--blue)">${icon('check', 18)}</span>${t}</div>`).join('')}
          <p class="muted" style="font-size:14px">You can remove access at any time from Settings → Integrations.</p>
          <div class="row"><span class="spacer"></span><button class="btn">Cancel</button><button class="btn primary" id="int_allow">Allow</button></div>`;
        $('#int_allow', box).onclick = () => { if (steps === 2) finish(); else { step++; draw(); } };
      } else {
        f.innerHTML = `<div class="bold" style="font-size:18px;margin-bottom:4px">Select your Business Profile</div><div class="muted" style="margin-bottom:14px">Reviews, messages and insights from this location will come into Kyntlo.</div>
          <label class="ss-num" style="cursor:pointer"><input type="radio" name="gbp" checked style="width:18px;height:18px"><div><b style="font-size:15.5px">Bloom Dental Studio</b><div class="muted" style="font-size:14px">14 Marylebone High Street, London</div></div></label>
          <label class="ss-num" style="cursor:pointer"><input type="radio" name="gbp" style="width:18px;height:18px"><div><b style="font-size:15.5px">Bloom Dental — Kensington</b><div class="muted" style="font-size:14px">Kensington High Street, London</div></div></label>
          <div class="row"><span class="spacer"></span><button class="btn primary" id="int_gbp_save">Connect location</button></div>`;
        $('#int_gbp_save', box).onclick = finish;
      }
    };
    const finish = () => { S.integrations[k] = true; box.closest('.overlay').remove(); integrations(main); KY.toast(`${n} connected`); };
    draw();
  }

  // ======================================================================
  // Custom Fields, Custom Values, Tags
  // ======================================================================
  const FIELD_TYPES = [['single', 'Single Line', 'edit'], ['multi', 'Multi Line', 'note'], ['number', 'Number', 'chart'], ['phone', 'Phone', 'phone'], ['money', 'Monetary', 'money'],
    ['dropdown', 'Dropdown (Single)', 'chevron'], ['dropdownm', 'Dropdown (Multiple)', 'list'], ['radio', 'Radio Select', 'check'], ['checkbox', 'Checkbox', 'task'],
    ['date', 'Date Picker', 'calendar'], ['file', 'File Upload', 'upload'], ['signature', 'Signature', 'edit']];
  function customFields(main) {
    main.innerHTML = `${head('Custom Fields', 'Store the extra information your business needs on every contact. Use them in forms, filters and automations.', `<button class="btn primary" id="cf_add">${icon('plus', 18)} Add Field</button>`)}
      <div class="ss-sub"><a class="active">Contact</a><a>Opportunity</a><a>Folders</a></div>
      <div class="card">${table('cf_table', ['Field Name', 'Folder', 'Field Type', 'Unique Key', ''], S.customFields.map((f, i) => `
        <tr id="cf_row_${i}"><td class="bold">${esc(f.name)}</td><td>${esc(f.folder)}</td><td><span class="chip">${esc(f.type)}</span></td><td><span class="ss-code">{{ ${esc(f.key)} }}</span></td>
        <td style="text-align:right"><button class="btn sm ghost">${icon('edit', 16)}</button></td></tr>`))}</div>`;
    $('#cf_add').onclick = () => {
      let type = null;
      const box = KY.modal({ title: 'Add Custom Field', wide: true,
        body: `<div id="cf_step1"><div class="bold" style="margin-bottom:10px">Choose a field type</div>
            <div class="grid" style="grid-template-columns:repeat(4,1fr);gap:10px">${FIELD_TYPES.map(([k, l, ic]) => `<button class="ss-type" data-ft="${k}" id="cf_type_${k}">${icon(ic, 18)}${l}</button>`).join('')}</div></div>
          <div id="cf_step2" style="display:none">
            <div class="ss-g2">${field('Field Name', 'cf_name', '', 'e.g. Marketing consent')}
              ${dd('Folder', 'cf_folder', 'Patient info', ['Patient info', 'Marketing', 'Consent & privacy'])}</div>
            ${field('Option label', 'cf_option', '', 'e.g. I agree to receive offers by email and SMS')}
            <div class="muted" style="font-size:14px">Unique key: <span class="ss-code" id="cf_key">{{ contact.field_name }}</span></div></div>`,
        actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'cf_save', onClick: (close, root) => {
          const name = $('#cf_name', root).value || 'New field';
          S.customFields.push({ name, type: FIELD_TYPES.find((t) => t[0] === type)?.[1] || 'Single Line', key: 'contact.' + name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''), folder: $('#cf_folder span', root).textContent });
          close(); customFields(main); KY.toast(`Custom field "${name}" created`);
        } }] });
      wireDropdowns(box);
      $$('[data-ft]', box).forEach((b) => (b.onclick = () => {
        type = b.dataset.ft; $$('[data-ft]', box).forEach((x) => x.classList.toggle('on', x === b));
        setTimeout(() => { $('#cf_step1', box).style.display = 'none'; $('#cf_step2', box).style.display = ''; }, 350);
      }));
      $('#cf_name', box).oninput = (e) => ($('#cf_key', box).textContent = `{{ contact.${e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'field_name'} }}`);
    };
  }
  function customValues(main) {
    main.innerHTML = `${head('Custom Values', 'Reusable details like your booking link or offer price. Change one here and every email, SMS and page that uses it updates.', `<button class="btn primary" id="cv_add">${icon('plus', 18)} Add Custom Value</button>`)}
      <div class="card">${table('cv_table', ['Name', 'Value', 'Key', ''], S.customValues.map((v, i) => `
        <tr id="cv_row_${i}"><td class="bold">${esc(v.name)}</td><td>${esc(v.value)}</td><td><span class="ss-code">{{ ${esc(v.key)} }}</span></td>
        <td style="text-align:right"><button class="btn sm ghost" onclick="KY.toast('Key copied')">${icon('copy', 16)}</button><button class="btn sm ghost">${icon('edit', 16)}</button></td></tr>`))}</div>`;
    $('#cv_add').onclick = () => KY.modal({ title: 'Add Custom Value',
      body: `${field('Name', 'cv_name', '', 'e.g. Privacy policy link')}${field('Value', 'cv_value', '', 'https://')}`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'cv_save', onClick: (close, root) => {
        const name = $('#cv_name', root).value || 'New value';
        S.customValues.push({ name, value: $('#cv_value', root).value, key: 'custom_values.' + name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') });
        close(); customValues(main); KY.toast(`Custom value "${name}" created`);
      } }] });
  }
  function tagsPage(main) {
    main.innerHTML = `${head('Tags', 'Labels you add to contacts to group them, filter them and trigger automations.', `<button class="btn primary" id="tg_add">${icon('plus', 18)} New Tag</button>`)}
      <div class="card"><div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)"><div class="search" style="width:320px"><span>${icon('search', 18)}</span><input class="input" placeholder="Search tags"></div><span class="spacer"></span><span class="muted" style="font-size:14px">${S.tags.length} tags</span></div>
      ${table('tg_table', ['Tag', 'Contacts', 'Created on', ''], S.tags.map((t, i) => `<tr id="tg_row_${i}"><td><span class="chip">${icon('tag', 14)} ${esc(t.name)}</span></td>
        <td>${data.contacts.filter((c) => c.tags.includes(t.name)).length}</td><td class="muted">${t.created}</td><td style="text-align:right"><button class="btn sm ghost">${icon('edit', 16)}</button><button class="btn sm ghost">${icon('trash', 16)}</button></td></tr>`))}</div>`;
    $('#tg_add').onclick = () => KY.modal({ title: 'New Tag', body: field('Tag name', 'tg_name', '', 'e.g. consent-given'),
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'tg_save', onClick: (close, root) => {
        const name = $('#tg_name', root).value.trim().toLowerCase() || 'new tag';
        S.tags.unshift({ name, created: '21 Oct 2026' }); if (!data.tags.includes(name)) data.tags.push(name);
        close(); tagsPage(main); KY.toast(`Tag "${name}" created`);
      } }] });
  }

  // ======================================================================
  // Audit Logs
  // ======================================================================
  const LOGS = [
    ['21 Oct 2026, 10:42', 'Sarah Mitchell', 'Contact', 'Updated', 'Olivia Bennett', 'DND turned on for SMS'],
    ['21 Oct 2026, 09:15', 'James Okafor', 'Contact', 'Updated', 'Daniel Hughes', 'Phone number changed'],
    ['20 Oct 2026, 17:03', 'Priya Shah', 'Contact', 'Deleted', 'Test Patient', 'Contact deleted'],
    ['20 Oct 2026, 16:20', 'Sarah Mitchell', 'Workflow', 'Published', 'New Lead — Instant Follow-up', 'Workflow published'],
    ['19 Oct 2026, 11:58', 'Sarah Mitchell', 'User', 'Updated', 'James Okafor', 'Permissions changed: Payments off'],
    ['18 Oct 2026, 14:31', 'Priya Shah', 'Opportunity', 'Updated', 'Emma Clarke — Whitening', 'Status changed to Won'],
    ['17 Oct 2026, 08:47', 'James Okafor', 'Calendar', 'Updated', 'Check-up & Clean', 'Availability changed'],
  ];
  function auditLogs(main) {
    let mod = 'All modules';
    const draw = () => {
      const rows = LOGS.filter((l) => mod === 'All modules' || l[2] === mod);
      main.innerHTML = `${head('Audit Logs', 'See who changed what, and when. Useful for training, troubleshooting and data-protection requests.')}
        <div class="card"><div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft);gap:10px">
          <button class="btn" id="al_filter_module">${icon('filter', 18)} ${esc(mod)} ${icon('chevron', 16)}</button>
          <button class="btn">${icon('user', 18)} All users ${icon('chevron', 16)}</button><button class="btn">${icon('calendar', 18)} Last 7 days ${icon('chevron', 16)}</button>
          <span class="spacer"></span><span class="muted" style="font-size:14px">${rows.length} events</span></div>
        ${table('al_table', ['Date & time', 'User', 'Module', 'Action', 'Record', 'Details'], rows.map((l, i) => `<tr class="click" id="al_row_${i}"><td class="muted">${l[0]}</td>
          <td><div class="row">${avatar(l[1], 28)}${esc(l[1])}</div></td><td>${esc(l[2])}</td><td>${chip(l[3], l[3] === 'Deleted' ? 'red' : l[3] === 'Published' ? 'green' : 'blue')}</td><td class="bold">${esc(l[4])}</td><td class="muted">${esc(l[5])}</td></tr>`))}</div>`;
      $('#al_filter_module').onclick = (e) => KY.menu(e.currentTarget, ['All modules', 'Contact', 'Opportunity', 'Workflow', 'User', 'Calendar'].map((m) => ({ label: m, onClick: () => { mod = m; draw(); } })));
      $$('#al_table tr.click', main).forEach((tr, i) => (tr.onclick = () => {
        const l = rows[i];
        KY.modal({ title: `${l[2]} ${l[3].toLowerCase()} — ${l[4]}`, drawer: true,
          body: `<div class="ss-trow"><span class="lbl">When</span><b>${l[0]}</b></div><div class="ss-trow"><span class="lbl">Who</span><b>${esc(l[1])}</b></div>
            <div class="ss-trow"><span class="lbl">From</span><b>Web app · London, UK</b></div>
            <div class="ss-dsec">Changes</div>
            <div class="card" style="box-shadow:none;padding:12px 14px;font-size:14.5px"><div class="row"><span class="lbl" style="flex:1">${esc(l[5])}</span></div>
            ${l[5].startsWith('DND') ? `<div class="row" style="margin-top:8px"><span class="chip red">Before: SMS allowed</span>${icon('arrowRight', 16)}<span class="chip green">After: SMS DND on</span></div>` : ''}</div>` });
      }));
    };
    draw();
  }

  // ======================================================================
  // Smaller pages
  // ======================================================================
  const simple = (title, sub, inner) => (main) => { main.innerHTML = `${head(title, sub)}${inner()}`; KY.toggles(main); };
  const toggleCard = (rows) => `<div class="card"><div class="card-b" style="padding-top:6px;padding-bottom:6px">${rows.map(([l, s, on], i) =>
    `<div class="ss-trow"><div class="lbl">${l}<small>${s}</small></div>${tog('x_t' + i, on)}</div>`).join('')}</div></div>`;
  const PAGES = {
    'business-profile': businessProfile,
    'my-profile': myProfile,
    billing,
    'my-staff': myStaff,
    pipelines: pipelinesPage,
    calendars: calendarsPage,
    'email-services': emailServices,
    'phone-numbers': phonePage,
    integrations,
    'custom-fields': customFields,
    'custom-values': customValues,
    tags: tagsPage,
    'audit-logs': auditLogs,
    automation: simple('Automation', 'Settings that apply to every workflow in this account.', () => toggleCard([
      ['Stop workflows on response', 'Remove a contact from a workflow when they reply (per workflow setting)', true],
      ['Allow re-entry by default', 'New workflows let contacts enter more than once', false],
      ['Send email notifications for workflow errors', 'Emails the account admins', true]])),
    'conversation-ai': simple('Conversation AI', 'Default settings for your AI chat agents. Build agents from AI Agents → Conversation AI.', () => toggleCard([
      ['Hand off to a human when the contact asks', 'Turns the bot off for that conversation', true],
      ['Only reply during business hours', 'Outside these hours the bot stays quiet', false],
      ['Add a short delay before replying', 'Feels more natural than an instant reply', true]])),
    whatsapp: simple('WhatsApp', 'Send and receive WhatsApp messages from Conversations. Available on Growth and Pro, billed as an add-on.', () =>
      `<div class="card"><div class="card-b row"><img src="../../assets/integration-logos/whatsapp.png" style="height:30px"><div style="flex:1"><b>WhatsApp Business</b><div class="muted" style="font-size:14px">+44 7700 900500 · Display name: Bloom Dental Studio</div></div>${chip('Connected')}<button class="btn sm">Manage templates</button></div></div>`),
    reputation: simple('Reputation Management', 'How review requests are sent and where reviewers are sent to.', () => toggleCard([
      ['Send review requests by SMS', 'Uses your text line', true], ['Send review requests by email', 'Uses your sending domain', true],
      ['Send to Google review page', 'Bloom Dental Studio — Google Business Profile', true]])),
    domains: simple('Domains', 'Domains you connect to publish funnels, websites and booking pages.', () =>
      `<div class="card">${table('', ['Domain', 'Used for', 'SSL', 'Status'], [`<tr><td class="bold">offers.bloomdental.co.uk</td><td>Funnels</td><td>${chip('Active', 'green')}</td><td>${chip('Connected')}</td></tr>`,
        `<tr><td class="bold">book.bloomdental.co.uk</td><td>Calendars & booking pages</td><td>${chip('Active', 'green')}</td><td>${chip('Connected')}</td></tr>`])}</div>`),
    'conversation-providers': simple('Conversation Providers', 'Which service sends your SMS and email.', () =>
      `<div class="card">${table('', ['Channel', 'Provider', 'Status'], [`<tr><td class="bold">SMS</td><td>LC Phone (Kyntlo)</td><td>${chip('Active', 'green')}</td></tr>`, `<tr><td class="bold">Email</td><td>LC Email (Kyntlo)</td><td>${chip('Active', 'green')}</td></tr>`])}</div>`),
  };

  KY.screen('settings', {
    tabs: [],
    render(view, { tab, params }) {
      const page = PAGES[tab] ? tab : 'business-profile';
      view.innerHTML = `${navHtml(page)}<div class="ss-main" id="ss_main"></div>`;
      $('#ss_back').onclick = () => KY.go('#/dashboard');
      PAGES[page]($('#ss_main'), params[0]);
    },
  });
})();
