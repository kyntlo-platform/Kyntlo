// App shell: sidebar, top bar with module tabs, hash router and UI helpers.
// Screens register themselves with KY.screen(id, {...}) from screens/*.js.
(() => {
  const NAV = [
    ['ask-ai', 'Ask AI', 'ai'],
    ['launchpad', 'Launchpad', 'rocket'],
    ['dashboard', 'Dashboard', 'dashboard'],
    ['conversations', 'Conversations', 'chat'],
    ['calendars', 'Calendars', 'calendar'],
    ['contacts', 'Contacts', 'contacts'],
    ['opportunities', 'Opportunities', 'pipeline'],
    ['payments', 'Payments', 'payments'],
    '-',
    ['ai-agents', 'AI Agents', 'bot'],
    ['marketing', 'Marketing', 'send'],
    ['automation', 'Automation', 'automation'],
    ['sites', 'Sites', 'globe'],
    ['memberships', 'Memberships', 'cap'],
    ['media-storage', 'Media Storage', 'folder'],
    ['reputation', 'Reputation', 'star'],
    ['reporting', 'Reporting', 'chart'],
    ['app-marketplace', 'App Marketplace', 'apps'],
    ['mobile-app', 'Mobile App', 'mobile'],
  ];

  const screens = {};
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const COLORS = ['#7f56d9', '#2e90fa', '#12b76a', '#f79009', '#ee46bc', '#06aed4', '#f04438', '#6172f3', '#15b79e', '#875bf7'];
  const initials = (name) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const colorFor = (name) => COLORS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
  const money = (n, d = 0) => '£' + Number(n).toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d });

  const KY = {
    esc, $, $$, initials, money,
    icon: (n, s, x) => window.icon(n, s, x),
    avatar: (name, size = 36) =>
      `<span class="avatar" style="width:${size}px;height:${size}px;background:${colorFor(name)};font-size:${Math.round(size * 0.38)}px">${esc(initials(name))}</span>`,
    data: window.KY_DATA,

    screen(id, def) { screens[id] = def; },

    go(hash) { if (location.hash === hash) render(); else location.hash = hash; },

    toast(msg, kind = 'ok') {
      const t = document.createElement('div');
      t.className = 'toast';
      if (kind === 'warn') t.style.borderLeftColor = 'var(--amber)';
      t.innerHTML = `${window.icon(kind === 'warn' ? 'bell' : 'check', 18)}<span>${esc(msg)}</span>`;
      $('#toasts').appendChild(t);
      setTimeout(() => t.remove(), 3200);
    },

    // modal({ title, body, wide, actions: [{ label, primary, id, onClick(close, root) }] }) → root element
    modal({ title, body, wide, drawer, actions = [] }) {
      const ov = document.createElement('div');
      ov.className = 'overlay';
      const box = document.createElement('div');
      box.className = drawer ? 'drawer' : `modal${wide ? ' wide' : ''}`;
      box.innerHTML = `<div class="modal-h"><h3>${esc(title)}</h3><span class="spacer"></span>
          <button class="btn ghost icon" data-close>${window.icon('x')}</button></div>
        <div class="modal-b">${body}</div>
        ${actions.length ? `<div class="modal-f">${actions.map((a, i) =>
          `<button class="btn ${a.primary ? 'primary' : ''}" data-act="${i}" ${a.id ? `id="${a.id}"` : ''}>${esc(a.label)}</button>`).join('')}</div>` : ''}`;
      const close = () => { ov.remove(); box.remove(); };
      if (drawer) { document.body.append(ov, box); ov.style.background = 'rgba(16,24,40,.25)'; }
      else { ov.appendChild(box); document.body.appendChild(ov); }
      ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
      box.querySelector('[data-close]').onclick = close;
      actions.forEach((a, i) => { box.querySelector(`[data-act="${i}"]`).onclick = () => (a.onClick ? a.onClick(close, box) : close()); });
      return box;
    },

    // menu(anchorEl, [{ label, icon, onClick }]) — small dropdown under an element
    menu(anchor, items) {
      $$('.menu').forEach((m) => m.remove());
      const r = anchor.getBoundingClientRect();
      const m = document.createElement('div');
      m.className = 'menu';
      m.style.left = Math.min(r.left, innerWidth - 240) + 'px';
      m.style.top = r.bottom + 6 + 'px';
      m.innerHTML = items.map((it, i) => `<button data-i="${i}">${it.icon ? window.icon(it.icon, 18) : ''}${esc(it.label)}</button>`).join('');
      document.body.appendChild(m);
      m.onclick = (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        m.remove();
        items[b.dataset.i].onClick?.();
      };
      setTimeout(() => document.addEventListener('click', function off(e) {
        if (!m.contains(e.target)) { m.remove(); document.removeEventListener('click', off); }
      }), 0);
      return m;
    },

    // Wire a toggle button group: <button class="toggle">
    toggles(root) {
      $$('.toggle', root).forEach((t) => (t.onclick = () => t.classList.toggle('on')));
    },
  };
  window.KY = KY;

  function shell() {
    const biz = KY.data.business;
    document.body.innerHTML = `
      <div id="app">
        <aside id="sidebar">
          <div class="sb-logo"><img src="${'../../assets/favicon.png'}" alt="Kyntlo"></div>
          <div class="sb-account" id="sb_account">
            <span class="av">${window.icon('user', 18)}</span>
            <div><b>${esc(biz.name)}</b><small>${esc(biz.city)}</small></div>
            <span class="chev">${window.icon('updown', 18)}</span>
          </div>
          <div class="sb-search">
            <div class="box" id="sb_search">${window.icon('search', 18)}<span>Search</span><kbd>ctrl K</kbd></div>
            <div class="bolt" id="sb_quick">${window.icon('bolt', 18)}</div>
          </div>
          <nav class="sb-nav" id="sidebar-v2">
            ${NAV.map((n) => (n === '-' ? '<hr>' :
              `<a href="#/${n[0]}" id="sb_${n[0]}">${window.icon(n[2])}<span>${n[1]}</span></a>`)).join('')}
          </nav>
          <div class="sb-foot"><a href="#/settings" id="sb_settings">${window.icon('settings')}<span>Settings</span></a></div>
        </aside>
        <div id="main">
          <header id="topbar">
            <div class="tabs" id="tabs"></div>
            <div class="tb-right">
              <button class="tb-round tb-phone" id="tb_phone" title="Phone">${window.icon('phone', 18)}</button>
              <button class="tb-ask" id="tb_ask">${window.icon('ai', 18)}Ask AI</button>
              <button class="tb-round tb-bell" id="tb_bell" title="Notifications">${window.icon('bell', 18)}</button>
              <span class="tb-avatar" id="tb_avatar">${esc(initials(KY.data.me.name))}</span>
            </div>
          </header>
          <main id="view"></main>
        </div>
      </div>
      <div id="toasts"></div>`;
    $('#sb_search').onclick = openSearch;
    $('#tb_ask').onclick = () => KY.go('#/ask-ai');
    $('#tb_bell').onclick = (e) => KY.menu(e.currentTarget.closest('button'), KY.data.notifications.map((n) => ({ label: n, icon: 'bell' })));
    $('#sb_account').onclick = (e) => KY.menu(e.currentTarget, [
      { label: `${biz.name} — ${biz.city}`, icon: 'check' },
      { label: 'Bloom Dental — Kensington', icon: 'building' },
    ]);
    addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); } });
  }

  function openSearch() {
    const box = KY.modal({
      title: 'Search',
      body: `<div class="search"><span>${window.icon('search', 18)}</span><input class="input" id="gs_input" placeholder="Search contacts, pages and settings…"></div>
             <div id="gs_results" style="margin-top:12px"></div>`,
    });
    const input = $('#gs_input', box);
    const out = $('#gs_results', box);
    const draw = () => {
      const q = input.value.trim().toLowerCase();
      const hits = KY.data.contacts.filter((c) => !q || c.name.toLowerCase().includes(q) || c.email.includes(q)).slice(0, 6);
      out.innerHTML = hits.map((c) => `<div class="row" style="padding:8px 4px;cursor:pointer" data-id="${c.id}">${KY.avatar(c.name, 30)}<div><div class="bold">${esc(c.name)}</div><div class="muted" style="font-size:14px">${esc(c.email)}</div></div></div>`).join('');
      $$('[data-id]', out).forEach((r) => (r.onclick = () => { box.closest('.overlay').remove(); KY.go(`#/contacts/detail/${r.dataset.id}`); }));
    };
    input.oninput = draw;
    draw();
    setTimeout(() => input.focus(), 50);
  }

  function render() {
    const [id = 'dashboard', tab, ...rest] = location.hash.replace(/^#\/?/, '').split('/');
    const def = screens[id];
    $$('.sb-nav a, .sb-foot a').forEach((a) => a.classList.toggle('active', a.id === `sb_${id}`));
    $$('.overlay, .drawer, .menu').forEach((el) => el.remove());
    const view = $('#view');
    view.scrollTop = 0;
    view.style.padding = '';
    if (!def) {
      $('#tabs').innerHTML = '';
      view.innerHTML = `<div class="soon">This area isn't part of the demo yet.</div>`;
      return;
    }
    const tabs = def.tabs || [];
    const current = tab || tabs[0]?.id;
    $('#tabs').innerHTML = tabs.map((t) =>
      `<a href="#/${id}/${t.id}" id="tab_${t.id}" class="${t.id === current ? 'active' : ''}">${esc(t.label)}</a>`).join('');
    view.innerHTML = '';
    def.render(view, { tab: current, params: rest });
  }

  KY.start = () => {
    shell();
    addEventListener('hashchange', render);
    if (!location.hash) location.hash = '#/dashboard';
    render();
  };
})();
