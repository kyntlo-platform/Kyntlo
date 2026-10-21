// Payments — HighLevel's Payments module: Invoices & Estimates (list + builder, send by email/SMS,
// record payment, Text2Pay), Orders, Subscriptions, Payment Links, Transactions (with refunds),
// Products (one-time and recurring prices), Coupons and Integrations (Stripe, PayPal…). Currency £.
(() => {
  const { esc, icon, money, $, $$, avatar } = KY;
  const data = KY.data;
  const m2 = (n) => money(n, 2);
  const contact = (id) => data.contacts.find((c) => c.id === id) || { name: 'Unknown', email: '', phone: '' };
  const byName = (n) => data.contacts.find((c) => c.name === n);
  window.KY_ICONS.blank = window.KY_ICONS.blank || '';
  const LOGO = (n) => `../../assets/integration-logos/${n}.png`;
  const TODAY = '21 Oct 2026';

  // ---------- Screen data (kept consistent with data.js) ----------
  const P = KY.payments = KY.payments || {};
  if (!P.ready) {
    P.ready = true;
    P.stripe = true;
    P.paypal = false;
    P.testMode = false;
    P.products = data.products.map((p) => ({
      id: p.id, name: p.name, type: 'Service', updated: '2 Oct 2026',
      desc: { pr1: 'Clear aligner treatment including scans, aligners and reviews.', pr2: 'In-chair professional whitening session.', pr3: 'Examination, scale and polish.', pr4: 'Two check-ups and two hygiene visits a year, 10% off treatment.', pr5: 'Refundable deposit, deducted from your implant treatment.' }[p.id] || '',
      prices: [p.type.startsWith('Recurring') ? { name: 'Monthly', amount: p.price, recurring: true, interval: 'Monthly' } : { name: 'Standard', amount: p.price, recurring: false }],
    }));
    P.products.push({ id: 'pr6', name: 'Invisalign Monthly Plan', type: 'Service', updated: '2 Oct 2026', desc: 'Spread the cost of Invisalign over 24 months.', prices: [{ name: '24 monthly payments', amount: 150, recurring: true, interval: 'Monthly', count: 24 }] });
    const items = { 'INV-1042': [['pr2', 1, 199]], 'INV-1043': [['custom:Dental implant — single tooth', 1, 2400]], 'INV-1044': [['custom:Invisalign — 50% deposit', 1, 1600]], 'INV-1045': [['pr5', 1, 50]], 'INV-1046': [['pr1', 1, 3200]] };
    const issued = { 'INV-1042': '11 Oct 2026', 'INV-1043': '13 Oct 2026', 'INV-1044': '16 Oct 2026', 'INV-1045': '8 Oct 2026', 'INV-1046': TODAY };
    P.invoices = data.invoices.map((i) => ({ ...i, issued: issued[i.id], paid: i.status === 'paid' ? i.amount : 0, tax: 0,
      items: items[i.id].map(([ref, qty, price]) => ({ name: ref.startsWith('custom:') ? ref.slice(7) : P.products.find((p) => p.id === ref).name, qty, price, tax: false })) }));
    P.estimates = [
      { id: 'EST-0018', contact: 'c10', amount: 2400, status: 'sent', issued: '9 Oct 2026', expires: '9 Nov 2026', name: 'Implant treatment plan' },
      { id: 'EST-0017', contact: 'c9', amount: 3200, status: 'accepted', issued: '2 Oct 2026', expires: '2 Nov 2026', name: 'Invisalign treatment plan' },
    ];
    P.links = [
      { id: 'lk1', name: 'Teeth Whitening — £199', products: ['Teeth Whitening'], amount: 199, slug: 'whitening-199', created: '2 Oct 2026', payments: 14, active: true },
      { id: 'lk2', name: 'Implant Consultation Deposit', products: ['Implant Consultation Deposit'], amount: 50, slug: 'implant-deposit', created: '18 Sep 2026', payments: 9, active: true },
      { id: 'lk3', name: 'Bloom Smile Plan — monthly', products: ['Bloom Smile Plan'], amount: 15, recurring: true, slug: 'smile-plan', created: '1 Sep 2026', payments: 23, active: true },
    ];
    P.subs = [
      { id: 's1', contact: 'c7', product: 'Bloom Smile Plan', amount: 15, interval: 'Monthly', status: 'active', next: '15 Nov 2026', started: '15 Jul 2026', card: 'Visa •••• 4242' },
      { id: 's2', contact: 'c9', product: 'Bloom Smile Plan', amount: 15, interval: 'Monthly', status: 'active', next: '1 Nov 2026', started: '1 Aug 2026', card: 'Mastercard •••• 5454' },
      { id: 's3', contact: 'c15', product: 'Invisalign Monthly Plan', amount: 150, interval: 'Monthly', status: 'active', next: '22 Nov 2026', started: '22 Sep 2026', card: 'Visa •••• 1881', count: '2 of 24' },
      { id: 's4', contact: 'c2', product: 'Bloom Smile Plan', amount: 15, interval: 'Monthly', status: 'trialing', next: '3 Nov 2026', started: '20 Oct 2026', card: 'Amex •••• 0005' },
      { id: 's5', contact: 'c11', product: 'Bloom Smile Plan', amount: 15, interval: 'Monthly', status: 'past_due', next: 'Retrying 23 Oct', started: '8 May 2026', card: 'Visa •••• 0341' },
      { id: 's6', contact: 'c12', product: 'Bloom Smile Plan', amount: 15, interval: 'Monthly', status: 'canceled', next: '—', started: '2 Jan 2026', card: 'Visa •••• 7720' },
    ];
    P.tx = [
      { id: 't1', date: '20 Oct 2026, 14:12', contact: 'c16', amount: 2400, source: 'Invoice INV-1043', status: 'succeeded', method: 'Visa •••• 4242', ref: 'pi_3Q8kLm2eZvKYlo2C1a9d' },
      { id: 't2', date: '18 Oct 2026, 09:47', contact: 'c3', amount: 199, source: 'Invoice INV-1042', status: 'succeeded', method: 'Mastercard •••• 5454', ref: 'pi_3Q7xTr2eZvKYlo2C0b7e' },
      { id: 't3', date: '17 Oct 2026, 19:05', contact: 'c18', amount: 199, source: 'Order form — Teeth Whitening £199 Offer', status: 'succeeded', method: 'Apple Pay', ref: 'pi_3Q7qWe2eZvKYlo2C1c2f' },
      { id: 't4', date: '15 Oct 2026, 08:00', contact: 'c7', amount: 15, source: 'Subscription — Bloom Smile Plan', status: 'succeeded', method: 'Visa •••• 4242', ref: 'in_1Q7aBc2eZvKYlo2Cx81' },
      { id: 't5', date: '14 Oct 2026, 12:31', contact: 'c13', amount: 199, source: 'Payment link — Teeth Whitening — £199', status: 'succeeded', method: 'Visa •••• 3220', ref: 'pi_3Q7WqA2eZvKYlo2C0d4g' },
      { id: 't6', date: '12 Oct 2026, 16:20', contact: 'c4', amount: 50, source: 'Text2Pay — Implant Consultation Deposit', status: 'succeeded', method: 'Visa •••• 9001', ref: 'pi_3Q6zEr2eZvKYlo2C1e5h' },
      { id: 't7', date: '10 Oct 2026, 10:02', contact: 'c14', amount: 90, source: 'Payment link — Check-up & Clean', status: 'refunded', method: 'Mastercard •••• 6612', ref: 'pi_3Q6gHt2eZvKYlo2C0f6i', refunded: 90 },
      { id: 't8', date: '8 Oct 2026, 08:00', contact: 'c11', amount: 15, source: 'Subscription — Bloom Smile Plan', status: 'failed', method: 'Visa •••• 0341', ref: 'in_1Q6Pq92eZvKYlo2Cy13', note: 'Card declined — insufficient funds' },
      { id: 't9', date: '1 Oct 2026, 08:00', contact: 'c9', amount: 15, source: 'Subscription — Bloom Smile Plan', status: 'succeeded', method: 'Mastercard •••• 5454', ref: 'in_1Q5Xa12eZvKYlo2Cz45' },
    ];
    P.orders = [
      { id: '#1031', contact: 'c18', funnel: 'Teeth Whitening — £199 Offer', item: 'Teeth Whitening', amount: 199, status: 'paid', date: '17 Oct 2026' },
      { id: '#1030', contact: 'c7', funnel: 'Teeth Whitening — £199 Offer', item: 'Teeth Whitening + Bloom Smile Plan', amount: 214, status: 'paid', date: '15 Jul 2026' },
      { id: '#1029', contact: 'c13', funnel: 'Teeth Whitening — £199 Offer', item: 'Teeth Whitening', amount: 199, status: 'pending', date: '28 Sep 2026' },
    ];
    P.coupons = [
      { code: 'NEWSMILE25', name: 'New patient — £25 off', off: '£25.00 off', used: 12, status: 'Active', ends: '31 Dec 2026' },
      { code: 'WHITE20', name: 'Whitening — 20% off', off: '20% off', used: 31, status: 'Active', ends: '30 Nov 2026' },
      { code: 'SUMMER10', name: 'Summer offer', off: '10% off', used: 47, status: 'Expired', ends: '31 Aug 2026' },
    ];
  }
  const nextInv = () => 'INV-' + (1042 + P.invoices.length);
  const STATUS = {
    draft: ['Draft', ''], sent: ['Sent', 'blue'], paid: ['Paid', 'green'], overdue: ['Overdue', 'red'], partial: ['Partially paid', 'amber'], void: ['Void', ''],
    accepted: ['Accepted', 'green'], active: ['Active', 'green'], trialing: ['Trialing', 'purple'], past_due: ['Past due', 'amber'], canceled: ['Cancelled', ''],
    succeeded: ['Succeeded', 'green'], refunded: ['Refunded', ''], partially_refunded: ['Partially refunded', 'amber'], failed: ['Failed', 'red'], pending: ['Pending', 'amber'],
  };
  const chip = (s) => `<span class="chip ${STATUS[s][1]}">${STATUS[s][0]}</span>`;

  // ---------- helpers ----------
  const dd = (id, value) => `<button type="button" class="btn pay-dd" id="${id}" data-value="${esc(value)}"><span>${esc(value)}</span>${icon('chevron', 16)}</button>`;
  function placeMenu(m, anchor) {
    const r = anchor.getBoundingClientRect();
    m.style.minWidth = Math.max(200, r.width) + 'px';
    if (r.bottom + 6 + m.offsetHeight > innerHeight - 8) m.style.top = Math.max(8, r.top - m.offsetHeight - 6) + 'px';
    return m;
  }
  function wireDd(root, id, options, onChange) {
    const b = $('#' + id, root);
    if (!b) return;
    b.onclick = (e) => {
      e.stopPropagation();
      placeMenu(KY.menu(b, options.map((o) => ({ label: o, icon: o === b.dataset.value ? 'check' : 'blank', onClick: () => { b.dataset.value = o; b.querySelector('span').textContent = o; onChange?.(o); } }))), b);
    };
  }
  // A search-as-you-type picker (contacts or products) that opens under a button.
  function picker(anchor, { placeholder, items, onPick, idPrefix }) {
    $$('.pay-pick').forEach((x) => x.remove());
    const r = anchor.getBoundingClientRect();
    const box = document.createElement('div');
    box.className = 'pay-pick';
    box.style.left = Math.min(r.left, innerWidth - 400) + 'px';
    box.style.top = r.bottom + 6 + 'px';
    box.innerHTML = `<div class="search"><span>${icon('search', 18)}</span><input class="input" id="${idPrefix}_q" placeholder="${esc(placeholder)}"></div><div class="pay-pick-l"></div>`;
    document.body.appendChild(box);
    const list = $('.pay-pick-l', box), q = $('input', box);
    const draw = () => {
      const s = q.value.trim().toLowerCase();
      const hits = items.filter((it) => !s || it.label.toLowerCase().includes(s) || (it.sub || '').toLowerCase().includes(s)).slice(0, 6);
      list.innerHTML = hits.map((it) => `<button type="button" id="${idPrefix}_${it.id}" data-k="${it.id}">${it.avatar ? avatar(it.label, 30) : `<span class="pay-pi">${icon(it.icon || 'tag', 16)}</span>`}
        <span style="flex:1"><b>${esc(it.label)}</b>${it.sub ? `<br><span class="muted" style="font-size:13px">${esc(it.sub)}</span>` : ''}</span>${it.right ? `<b>${esc(it.right)}</b>` : ''}</button>`).join('') || '<div class="muted" style="padding:10px">No matches</div>';
      $$('[data-k]', list).forEach((b) => (b.onclick = (e) => { e.stopPropagation(); box.remove(); onPick(items.find((it) => it.id === b.dataset.k)); }));
    };
    q.oninput = draw;
    draw();
    setTimeout(() => q.focus(), 30);
    setTimeout(() => document.addEventListener('mousedown', function off(e) { if (!box.contains(e.target) && e.target !== anchor) { box.remove(); document.removeEventListener('mousedown', off); } }), 0);
    if (box.getBoundingClientRect().bottom > innerHeight - 8) box.style.top = Math.max(8, r.top - box.offsetHeight - 6) + 'px';
  }
  const contactItems = () => data.contacts.map((c) => ({ id: c.id, label: c.name, sub: c.email, avatar: true }));
  const priceLabel = (pr) => `${m2(pr.amount)}${pr.recurring ? ` / ${pr.interval === 'Monthly' ? 'month' : pr.interval.toLowerCase()}` : ''}`;
  const productItems = (onlyOneTime) => P.products.filter((p) => !onlyOneTime || !p.prices[0].recurring).map((p) => ({ id: p.id, label: p.name, sub: p.prices.map(priceLabel).join(' · '), icon: 'tag', right: m2(p.prices[0].amount) }));

  function css() {
    if ($('#css-payments')) return;
    const s = document.createElement('style');
    s.id = 'css-payments';
    s.textContent = `
      #toasts { pointer-events: none; }
      .pay-dd { justify-content: space-between; width: 100%; font-weight: 500; color: var(--ink); }
      .pay-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 18px; }
      .pay-stats .card { padding: 16px 20px; }
      .pay-stats .k { color: var(--muted); font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 8px; }
      .pay-stats .v { font-size: 26px; font-weight: 700; margin-top: 4px; }
      .pay-sub { display: flex; gap: 6px; margin-bottom: 16px; }
      .pay-pick { position: fixed; z-index: 65; width: 380px; background: #fff; border: 1px solid var(--line); border-radius: 10px; box-shadow: 0 14px 30px rgba(16,24,40,.18); padding: 10px; animation: pop .15s; }
      .pay-pick-l { margin-top: 8px; max-height: 330px; overflow: auto; }
      .pay-pick-l button { display: flex; align-items: center; gap: 10px; width: 100%; border: 0; background: none; padding: 8px; border-radius: 8px; text-align: left; }
      .pay-pick-l button:hover { background: #f2f4f7; }
      .pay-pi { width: 30px; height: 30px; border-radius: 8px; background: var(--blue-soft); color: var(--blue); display: grid; place-items: center; }
      .inv-wrap { display: grid; grid-template-columns: 1fr 380px; height: 100%; }
      .inv-top { grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; background: #fff; border-bottom: 1px solid var(--line-soft); padding: 12px 20px; }
      .inv-canvas { overflow: auto; padding: 26px 34px; }
      .inv-paper { max-width: 940px; margin: 0 auto; background: #fff; border: 1px solid var(--line); border-radius: 12px; box-shadow: var(--shadow); padding: 34px 40px; }
      .inv-side { background: #fff; border-left: 1px solid var(--line-soft); overflow: auto; padding: 20px; }
      .inv-side h4 { margin: 4px 0 12px; font-size: 16px; }
      .inv-side .opt { display: flex; align-items: center; gap: 10px; margin: 12px 0; font-size: 15px; }
      .inv-items { width: 100%; border-collapse: collapse; margin-top: 8px; }
      .inv-items th { text-align: left; font-size: 13px; color: var(--muted); text-transform: uppercase; letter-spacing: .03em; padding: 10px 8px; border-bottom: 1px solid var(--line); }
      .inv-items td { padding: 10px 8px; border-bottom: 1px solid var(--line-soft); vertical-align: middle; }
      .inv-items .input { height: 38px; }
      .inv-tot { margin-left: auto; width: 360px; margin-top: 16px; }
      .inv-tot .row { justify-content: space-between; padding: 7px 0; }
      .inv-logo { width: 56px; height: 56px; border-radius: 12px; background: linear-gradient(135deg,#6d00c1,#f20089); color: #fff; display: grid; place-items: center; font-weight: 800; font-size: 20px; }
      .inv-meta { display: grid; grid-template-columns: 130px 1fr; gap: 8px 12px; align-items: center; font-size: 15px; }
      .inv-meta .pay-dd { height: 36px; }
      .inv-billto { border: 1.5px dashed var(--line); border-radius: 10px; padding: 14px 16px; min-height: 92px; }
      .pay-phone { width: 300px; border-radius: 34px; border: 10px solid #101828; background: #f9fafb; padding: 18px 12px; height: 420px; display: flex; flex-direction: column; }
      .pay-bubble { align-self: flex-end; background: var(--blue); color: #fff; padding: 10px 12px; border-radius: 16px 16px 4px 16px; font-size: 14px; max-width: 92%; white-space: pre-wrap; }
      .pay-int { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
      .pay-int .card { padding: 20px; display: flex; flex-direction: column; gap: 12px; }
      .pay-int img { height: 34px; width: 96px; object-fit: contain; object-position: left center; }
      .pay-seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
      .pay-seg button { border: 0; background: #fff; height: 40px; padding: 0 16px; font-weight: 600; color: var(--muted); }
      .pay-seg button + button { border-left: 1px solid var(--line); }
      .pay-seg button.on { background: var(--blue-soft); color: var(--blue); }
      .pay-money { position: relative; } .pay-money .input { padding-left: 28px; } .pay-money i { position: absolute; left: 12px; top: 10px; font-style: normal; color: var(--muted); }
      .pay-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
      .pay-check { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 10px; cursor: pointer; flex: 1; }
      .pay-check.on { border-color: var(--blue); background: var(--blue-soft); }
      .pay-check .box { width: 20px; height: 20px; border-radius: 5px; border: 1.5px solid var(--line); display: grid; place-items: center; background: #fff; color: #fff; }
      .pay-check.on .box { background: var(--blue); border-color: var(--blue); }
      .stripe-o { border-radius: 12px; overflow: hidden; border: 1px solid var(--line); }
      .stripe-o .h { background: #635bff; color: #fff; padding: 18px 22px; font-weight: 800; font-size: 26px; letter-spacing: -.5px; }
    `;
    document.head.appendChild(s);
  }
  const head = (title, sub, actions = '') => `<div class="page-head"><h1>${esc(title)}</h1>${sub ? `<span class="chip">${esc(sub)}</span>` : ''}<div class="actions">${actions}</div></div>`;
  const stats = (rows) => `<div class="pay-stats">${rows.map(([k, v, ic, col]) => `<div class="card"><div class="k"><span style="color:${col || 'var(--blue)'}">${icon(ic, 18)}</span>${esc(k)}</div><div class="v">${v}</div></div>`).join('')}</div>`;

  // ================= Invoices & Estimates =================
  let invSub = 'invoices';
  function invoicesTab(view) {
    const inv = P.invoices;
    const due = inv.filter((i) => ['sent', 'overdue', 'partial'].includes(i.status));
    const amtDue = (i) => i.amount + (i.tax || 0) - (i.paid || 0);
    view.innerHTML = `${head('Invoices & Estimates', '', `<button class="btn" id="pay_text2pay">${icon('sms', 18)} Text2Pay</button><button class="btn primary" id="pay_new_invoice">${icon('plus', 18)} New invoice</button>`)}
      ${stats([['Draft', m2(inv.filter((i) => i.status === 'draft').reduce((a, i) => a + i.amount, 0)), 'note', 'var(--muted)'], ['Due', m2(due.reduce((a, i) => a + amtDue(i), 0)), 'clock'], ['Overdue', m2(inv.filter((i) => i.status === 'overdue').reduce((a, i) => a + amtDue(i), 0)), 'bell', 'var(--red)'], ['Received (30 days)', m2(inv.reduce((a, i) => a + (i.paid || 0), 0)), 'check', 'var(--green)']])}
      <div class="pay-sub" id="inv_subtabs">${[['invoices', 'Invoices'], ['recurring', 'Recurring Invoices'], ['estimates', 'Estimates'], ['templates', 'Templates']].map(([k, l]) => `<button class="btn sm ${invSub === k ? 'primary' : ''}" data-sub="${k}" id="inv_sub_${k}">${l}</button>`).join('')}</div>
      <div class="card" id="inv_list">${invSub === 'invoices' ? `<table class="t" id="inv_table">
        <thead><tr><th>Invoice</th><th>Customer</th><th>Issue date</th><th>Due date</th><th>Amount</th><th>Status</th><th style="width:60px"></th></tr></thead>
        <tbody>${inv.slice().reverse().map((i) => `<tr class="click" data-inv="${i.id}" id="inv_row_${i.id}">
          <td class="bold">${i.id}</td><td><div class="row">${avatar(contact(i.contact).name, 30)}${esc(contact(i.contact).name)}</div></td>
          <td class="muted">${esc(i.issued)}</td><td class="muted">${esc(i.due)}</td><td class="bold">${m2(i.amount + (i.tax || 0))}</td><td>${chip(i.status)}</td>
          <td><button class="btn ghost icon sm" data-imenu="${i.id}" id="inv_menu_${i.id}">${icon('more', 18)}</button></td></tr>`).join('')}</tbody></table>`
      : invSub === 'estimates' ? `<table class="t"><thead><tr><th>Estimate</th><th>Customer</th><th>Name</th><th>Issued</th><th>Expires</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>${P.estimates.map((e) => `<tr><td class="bold">${e.id}</td><td>${esc(contact(e.contact).name)}</td><td>${esc(e.name)}</td><td class="muted">${e.issued}</td><td class="muted">${e.expires}</td><td class="bold">${m2(e.amount)}</td><td>${chip(e.status)}</td></tr>`).join('')}</tbody></table>`
      : invSub === 'recurring' ? `<table class="t"><thead><tr><th>Name</th><th>Customer</th><th>Repeats</th><th>Next invoice</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody><tr><td class="bold">Staff dental plan — Marylebone Law LLP</td><td>Marylebone Law LLP</td><td>Monthly</td><td class="muted">1 Nov 2026</td><td class="bold">${m2(420)}</td><td>${chip('active')}</td></tr></tbody></table>`
      : `<div class="empty"><div class="big">Invoice templates</div>Save an invoice as a template to reuse its items, terms and settings.</div>`}</div>`;
    $('#pay_new_invoice').onclick = () => KY.go('#/payments/invoices/new');
    $('#pay_text2pay').onclick = () => text2pay(view);
    $$('[data-sub]', view).forEach((b) => (b.onclick = () => { invSub = b.dataset.sub; invoicesTab(view); }));
    $$('tr[data-inv]', view).forEach((tr) => (tr.onclick = (e) => { if (!e.target.closest('[data-imenu]')) KY.go(`#/payments/invoices/${tr.dataset.inv}`); }));
    $$('[data-imenu]', view).forEach((b) => (b.onclick = (e) => {
      e.stopPropagation();
      const i = P.invoices.find((x) => x.id === b.dataset.imenu);
      placeMenu(KY.menu(b, [
        { label: 'View / edit', icon: 'edit', onClick: () => KY.go(`#/payments/invoices/${i.id}`) },
        ...(i.status !== 'paid' ? [{ label: 'Record payment', icon: 'money', onClick: () => recordPayment(i, () => invoicesTab(view)) }, { label: 'Send', icon: 'send', onClick: () => sendInvoice(i, () => invoicesTab(view)) }] : []),
        { label: 'Download PDF', icon: 'download', onClick: () => KY.toast(`${i.id}.pdf downloaded`) },
        { label: 'Void invoice', icon: 'x', onClick: () => { i.status = 'void'; invoicesTab(view); KY.toast(`${i.id} voided`); } },
      ]), b);
    }));
  }

  function invoiceBuilder(view, id) {
    const existing = P.invoices.find((x) => x.id === id);
    const inv = existing ? existing : { id: nextInv(), contact: '', amount: 0, status: 'draft', due: '', issued: TODAY, items: [], taxRate: 0, discount: 0, paid: 0, isNew: true };
    inv.items = inv.items || [];
    const opts = { card: true, bank: false, partial: false, reminders: true, late: false, tips: false };
    view.style.padding = '0';
    const DUE = ['Due on receipt', 'In 7 days — 28 Oct 2026', 'In 14 days — 4 Nov 2026', 'In 30 days — 20 Nov 2026'];
    let dueLabel = inv.due && inv.due !== '—' ? inv.due : DUE[2];
    const totals = () => {
      const sub = inv.items.reduce((a, it) => a + it.qty * it.price, 0);
      const taxable = inv.items.filter((it) => it.tax).reduce((a, it) => a + it.qty * it.price, 0);
      const tax = Math.round(taxable * (inv.taxRate || 0)) / 100;
      const disc = inv.discount || 0;
      return { sub, tax, disc, total: sub + tax - disc, due: sub + tax - disc - (inv.paid || 0) };
    };
    function draw() {
      const c = inv.contact ? contact(inv.contact) : null;
      const t = totals();
      const locked = ['paid', 'void'].includes(inv.status);
      view.innerHTML = `<div class="inv-wrap">
        <div class="inv-top">
          <button class="btn ghost icon" id="inv_back" title="Back">${icon('left', 20)}</button>
          <div><div class="bold" style="font-size:18px">${inv.isNew ? 'New invoice' : inv.id} ${chip(inv.status)}</div><div class="muted" style="font-size:13px">Invoices & Estimates › ${inv.isNew ? 'New invoice' : inv.id}</div></div>
          <span class="spacer"></span>
          ${!inv.isNew && !locked ? `<button class="btn" id="inv_record">${icon('money', 18)} Record payment</button>` : ''}
          <button class="btn" id="inv_preview">${icon('eye', 18)} Preview</button>
          ${!locked ? `<button class="btn" id="inv_save">Save</button><button class="btn primary" id="inv_send">${icon('send', 18)} Send invoice</button>` : `<button class="btn" id="inv_pdf">${icon('download', 18)} Download PDF</button>`}
        </div>
        <div class="inv-canvas"><div class="inv-paper" id="inv_paper">
          <div class="row" style="align-items:flex-start;gap:16px">
            <div class="inv-logo">BD</div>
            <div style="flex:1"><div class="bold" style="font-size:18px">${esc(data.business.name)}</div><div class="muted" style="font-size:14px">${esc(data.business.address)}<br>${esc(data.business.email)} · ${esc(data.business.phone)}</div></div>
            <div style="text-align:right"><div style="font-size:30px;font-weight:800;letter-spacing:.04em;color:#344054">INVOICE</div><div class="muted">${inv.id}</div></div>
          </div>
          <div class="row" style="align-items:flex-start;gap:30px;margin-top:28px">
            <div style="flex:1"><div class="bold" style="margin-bottom:8px;color:var(--muted);font-size:13px;letter-spacing:.04em">BILL TO</div>
              <div class="inv-billto" id="inv_billto">${c ? `<div class="row">${avatar(c.name, 36)}<div style="flex:1"><div class="bold">${esc(c.name)}</div><div class="muted" style="font-size:14px">${esc(c.email)}<br>${esc(c.phone)}</div></div>
                ${locked ? '' : `<button class="btn ghost sm" id="inv_customer">Change</button>`}</div>` : `<button class="btn" id="inv_customer">${icon('plus', 18)} Add customer</button><div class="muted" style="font-size:13px;margin-top:8px">Pick an existing contact, or create a new one.</div>`}</div></div>
            <div class="inv-meta" style="width:380px">
              <span class="muted">Invoice number</span><input class="input" style="height:36px" value="${inv.id}">
              <span class="muted">Issue date</span><input class="input" style="height:36px" value="${esc(inv.issued)}">
              <span class="muted">Due date</span>${locked ? `<b>${esc(inv.due)}</b>` : dd('inv_due', dueLabel)}
            </div>
          </div>
          <table class="inv-items" id="inv_items"><thead><tr><th>Item</th><th style="width:90px">Qty</th><th style="width:150px">Price</th><th style="width:80px;text-align:center">Tax</th><th style="width:130px;text-align:right">Amount</th><th style="width:40px"></th></tr></thead>
            <tbody>${inv.items.map((it, i) => `<tr id="inv_item_${i}"><td><div class="bold">${esc(it.name)}</div>${it.desc ? `<div class="muted" style="font-size:13px">${esc(it.desc)}</div>` : ''}</td>
              <td><input class="input" id="inv_qty_${i}" data-q="${i}" value="${it.qty}" ${locked ? 'disabled' : ''}></td>
              <td><div class="pay-money"><i>£</i><input class="input" id="inv_price_${i}" data-p="${i}" value="${it.price.toFixed(2)}" ${locked ? 'disabled' : ''}></div></td>
              <td style="text-align:center"><input type="checkbox" data-tx="${i}" id="inv_taxck_${i}" ${it.tax ? 'checked' : ''} ${locked ? 'disabled' : ''} style="width:18px;height:18px"></td>
              <td style="text-align:right" class="bold">${m2(it.qty * it.price)}</td>
              <td>${locked ? '' : `<button class="btn ghost icon sm" data-rm="${i}">${icon('trash', 16)}</button>`}</td></tr>`).join('')}
            ${inv.items.length ? '' : `<tr><td colspan="6" class="muted" style="text-align:center;padding:22px">No items yet — add a product or a custom item.</td></tr>`}</tbody></table>
          ${locked ? '' : `<div class="row" style="margin-top:12px"><button class="btn sm" id="inv_add_item">${icon('plus', 16)} Add item</button><button class="btn sm ghost" id="inv_add_custom">${icon('plus', 16)} Custom item</button></div>`}
          <div class="inv-tot" id="inv_totals">
            <div class="row"><span class="muted">Subtotal</span><b>${m2(t.sub)}</b></div>
            <div class="row"><span class="muted">${inv.taxRate ? `VAT (${inv.taxRate}%)` : 'Tax'}</span>${inv.taxRate ? `<b>${m2(t.tax)}</b>` : locked ? '<b>—</b>' : `<button class="btn sm ghost" id="inv_add_tax" style="color:var(--blue)">${icon('plus', 16)} Add tax</button>`}</div>
            <div class="row"><span class="muted">Discount</span>${inv.discount ? `<b>− ${m2(t.disc)}</b>` : locked ? '<b>—</b>' : `<button class="btn sm ghost" id="inv_add_discount" style="color:var(--blue)">${icon('plus', 16)} Add discount</button>`}</div>
            <div class="row" style="border-top:1px solid var(--line);margin-top:6px;padding-top:12px"><b style="font-size:17px">Total</b><b style="font-size:17px" id="inv_total">${m2(t.total)}</b></div>
            ${inv.paid ? `<div class="row"><span class="muted">Paid</span><b style="color:var(--green)">− ${m2(inv.paid)}</b></div>` : ''}
            <div class="row" style="background:#f9fafb;border-radius:8px;padding:10px 12px;margin-top:6px"><b>Amount due</b><b id="inv_amount_due">${m2(Math.max(0, t.due))}</b></div>
          </div>
          <div style="margin-top:22px"><div class="bold" style="margin-bottom:6px">Terms & notes</div>
            <textarea class="input" rows="3" id="inv_terms" ${locked ? 'disabled' : ''}>Payment is due by the date above. Thank you for choosing Bloom Dental Studio!</textarea></div>
        </div></div>
        <aside class="inv-side" id="inv_settings">
          <h4>Payment settings</h4>
          <div class="muted" style="font-size:14px;margin-bottom:6px">How customers can pay this invoice</div>
          <div class="opt"><button class="toggle ${opts.card ? 'on' : ''}" id="inv_opt_card"></button>Card payments ${P.stripe ? '<span class="chip green">Stripe</span>' : '<span class="chip amber">Connect Stripe</span>'}</div>
          <div class="opt"><button class="toggle" id="inv_opt_bank"></button>Bank transfer (manual)</div>
          <div class="opt"><button class="toggle" id="inv_opt_partial"></button>Allow partial payments</div>
          <div class="opt"><button class="toggle" id="inv_opt_tips"></button>Allow tips</div>
          <hr style="border:0;border-top:1px solid var(--line-soft);margin:18px 0">
          <h4>Reminders & late fees</h4>
          <div class="opt"><button class="toggle on" id="inv_opt_reminders"></button>Send payment reminders</div>
          <div class="muted" style="font-size:13.5px;margin:-4px 0 8px 52px">3 days before, on the due date, and 7 days after</div>
          <div class="opt"><button class="toggle" id="inv_opt_late"></button>Add a late fee when overdue</div>
          <hr style="border:0;border-top:1px solid var(--line-soft);margin:18px 0">
          <h4>Currency</h4>
          <div class="row"><span class="chip">GBP — £</span><span class="muted" style="font-size:13.5px">Set in Payments › Settings</span></div>
        </aside></div>`;
      wire();
    }
    function wire() {
      KY.toggles(view);
      $('#inv_back').onclick = () => KY.go('#/payments/invoices');
      $('#inv_preview').onclick = () => KY.toast('Preview opened in a new tab');
      if ($('#inv_pdf')) $('#inv_pdf').onclick = () => KY.toast(`${inv.id}.pdf downloaded`);
      const custBtn = $('#inv_customer');
      if (custBtn) custBtn.onclick = () => picker(custBtn, { placeholder: 'Search contacts', idPrefix: 'inv_cust', items: contactItems(), onPick: (it) => { inv.contact = it.id; draw(); } });
      if ($('#inv_due')) wireDd(view, 'inv_due', DUE, (v) => { dueLabel = v; });
      const add = $('#inv_add_item');
      if (add) add.onclick = () => picker(add, { placeholder: 'Search products', idPrefix: 'inv_prod', items: productItems(), onPick: (it) => {
        const p = P.products.find((x) => x.id === it.id);
        inv.items.push({ name: p.name, desc: p.desc, qty: 1, price: p.prices[0].amount, tax: false }); draw();
      } });
      if ($('#inv_add_custom')) $('#inv_add_custom').onclick = () => { inv.items.push({ name: 'Custom item', qty: 1, price: 0, tax: false }); draw(); };
      $$('[data-q]', view).forEach((inp) => (inp.onchange = () => { inv.items[inp.dataset.q].qty = parseFloat(inp.value) || 1; draw(); }));
      $$('[data-p]', view).forEach((inp) => (inp.onchange = () => { inv.items[inp.dataset.p].price = parseFloat(inp.value.replace(/[£,]/g, '')) || 0; draw(); }));
      $$('[data-tx]', view).forEach((cb) => (cb.onchange = () => { inv.items[cb.dataset.tx].tax = cb.checked; if (cb.checked && !inv.taxRate) inv.taxRate = 20; draw(); }));
      $$('[data-rm]', view).forEach((b) => (b.onclick = () => { inv.items.splice(+b.dataset.rm, 1); draw(); }));
      const tax = $('#inv_add_tax');
      if (tax) tax.onclick = () => placeMenu(KY.menu(tax, [
        { label: 'VAT — 20%', icon: 'tag', onClick: () => { inv.taxRate = 20; inv.items.forEach((it) => (it.tax = true)); draw(); } },
        { label: 'VAT — 5% (reduced)', icon: 'tag', onClick: () => { inv.taxRate = 5; inv.items.forEach((it) => (it.tax = true)); draw(); } },
        { label: 'Create new tax', icon: 'plus' },
      ]), tax);
      const disc = $('#inv_add_discount');
      if (disc) disc.onclick = () => placeMenu(KY.menu(disc, [
        { label: 'Coupon NEWSMILE25 — £25 off', icon: 'tag', onClick: () => { inv.discount = 25; draw(); } },
        { label: 'Fixed amount…', icon: 'money', onClick: () => { inv.discount = 10; draw(); } },
      ]), disc);
      const commit = () => {
        const t = totals();
        inv.amount = t.sub - t.disc; inv.tax = t.tax;
        inv.due = dueLabel.includes('—') ? dueLabel.split('— ')[1] : dueLabel === 'Due on receipt' ? TODAY : dueLabel;
        if (inv.isNew) { delete inv.isNew; P.invoices.push(inv); }
      };
      if ($('#inv_save')) $('#inv_save').onclick = () => {
        if (!inv.contact) return KY.toast('Add a customer first', 'warn');
        commit(); KY.toast(`${inv.id} saved as draft`); KY.go(`#/payments/invoices/${inv.id}`);
      };
      if ($('#inv_send')) $('#inv_send').onclick = () => {
        if (!inv.contact) return KY.toast('Add a customer first', 'warn');
        if (!inv.items.length) return KY.toast('Add at least one item', 'warn');
        sendInvoice(inv, () => { commit(); inv.status = inv.status === 'draft' ? 'sent' : inv.status; KY.go(`#/payments/invoices/${inv.id}`); }, totals().total);
      };
      if ($('#inv_record')) $('#inv_record').onclick = () => recordPayment(inv, () => draw());
    }
    draw();
  }

  function sendInvoice(inv, done, total) {
    const c = contact(inv.contact);
    const amount = total ?? inv.amount + (inv.tax || 0);
    const ch = { email: true, sms: true };
    const box = KY.modal({
      title: `Send ${inv.id}`, wide: true,
      body: `<div class="row" style="gap:12px;margin-bottom:16px">
          <div class="pay-check on" id="snd_email"><span class="box">${icon('check', 14)}</span>${icon('mail', 18)}<div><b>Email</b><div class="muted" style="font-size:13px">${esc(c.email)}</div></div></div>
          <div class="pay-check on" id="snd_sms"><span class="box">${icon('check', 14)}</span>${icon('sms', 18)}<div><b>SMS</b><div class="muted" style="font-size:13px">${esc(c.phone)}</div></div></div></div>
        <div class="pay-g2"><div class="field"><label>From name</label><input class="input" value="${esc(data.business.name)}"></div><div class="field"><label>From email</label><input class="input" value="${esc(data.business.email)}"></div></div>
        <div class="field"><label>Email subject</label><input class="input" id="snd_subject" value="Invoice ${inv.id} from ${esc(data.business.name)}"></div>
        <div class="field"><label>SMS message</label><textarea class="input" rows="3" id="snd_text">Hi ${esc(c.name.split(' ')[0])}, here's your invoice from Bloom Dental Studio for ${m2(amount)}. You can view and pay it securely here: {{invoice.url}}</textarea></div>
        <div class="muted" style="font-size:13.5px">${icon('lock', 14)} Your customer gets a secure link to view the invoice and pay by card${P.stripe ? '' : ' (connect Stripe in Payments › Integrations to take card payments)'}.</div>`,
      actions: [{ label: 'Cancel' }, { label: 'Send', primary: true, id: 'snd_send', onClick: (close) => {
        close(); if (inv.status === 'draft') inv.status = 'sent'; done?.();
        KY.toast(`${inv.id} sent by ${[ch.email && 'email', ch.sms && 'SMS'].filter(Boolean).join(' and ') || 'email'}`);
      } }],
    });
    ['email', 'sms'].forEach((k) => ($(`#snd_${k}`, box).onclick = (e) => { ch[k] = !ch[k]; e.currentTarget.classList.toggle('on', ch[k]); }));
  }

  function recordPayment(inv, done) {
    const dueAmt = inv.amount + (inv.tax || 0) - (inv.paid || 0);
    const box = KY.modal({
      title: `Record payment — ${inv.id}`,
      body: `<p class="muted" style="margin-top:0">Use this when a customer pays outside Kyntlo, for example cash or bank transfer at reception.</p>
        <div class="pay-g2"><div class="field"><label>Amount</label><div class="pay-money"><i>£</i><input class="input" id="rp_amount" value="${dueAmt.toFixed(2)}"></div></div>
        <div class="field"><label>Payment mode</label>${dd('rp_mode', 'Bank transfer')}</div>
        <div class="field"><label>Payment date</label><input class="input" id="rp_date" value="${TODAY}"></div>
        <div class="field"><label>Reference</label><input class="input" id="rp_ref" placeholder="Optional"></div></div>
        <div class="field"><label>Notes</label><textarea class="input" rows="2" id="rp_notes" placeholder="Visible to your team only"></textarea></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Record payment', primary: true, id: 'rp_save', onClick: (close, b) => {
        const amt = parseFloat($('#rp_amount', b).value.replace(/[£,]/g, '')) || 0;
        inv.paid = (inv.paid || 0) + amt;
        inv.status = inv.paid + 0.001 >= inv.amount + (inv.tax || 0) ? 'paid' : 'partial';
        P.tx.unshift({ id: 't' + Date.now(), date: `${TODAY}, 11:20`, contact: inv.contact, amount: amt, source: `Invoice ${inv.id}`, status: 'succeeded', method: `Manual — ${$('#rp_mode', b).dataset.value}`, ref: 'manual' });
        close(); done?.(); KY.toast(`Payment of ${m2(amt)} recorded — ${inv.id} is ${STATUS[inv.status][0].toLowerCase()}`);
      } }],
    });
    wireDd(box, 'rp_mode', ['Cash', 'Card (in person)', 'Bank transfer', 'Cheque', 'Other']);
  }

  function text2pay(view) {
    let cid = '', item = null;
    const box = KY.modal({
      title: 'Text2Pay', wide: true,
      body: `<div class="row" style="align-items:flex-start;gap:26px">
        <div style="flex:1">
          <p class="muted" style="margin-top:0">Create a quick invoice and text the payment link straight to your customer’s phone.</p>
          <div class="field"><label>Customer</label><button class="btn pay-dd" id="t2p_customer"><span>Select a contact</span>${icon('chevron', 16)}</button></div>
          <div class="field"><label>Phone</label><input class="input" id="t2p_phone" placeholder="Picked from the contact"></div>
          <div class="field"><label>Item</label><button class="btn pay-dd" id="t2p_item"><span>Select a product</span>${icon('chevron', 16)}</button></div>
          <div class="pay-g2"><div class="field"><label>Amount</label><div class="pay-money"><i>£</i><input class="input" id="t2p_amount" placeholder="0.00"></div></div>
            <div class="field"><label>Due</label>${dd('t2p_due', 'Due on receipt')}</div></div>
          <div class="field"><label>Message</label><textarea class="input" rows="3" id="t2p_msg">Hi {{contact.first_name}}, here's your payment link from Bloom Dental Studio: {{invoice.url}}</textarea></div>
        </div>
        <div><div class="muted" style="font-size:13px;margin-bottom:8px;text-align:center">What your customer sees</div>
          <div class="pay-phone"><div class="muted" style="text-align:center;font-size:12px;margin-bottom:14px">Bloom Dental Studio</div><div class="pay-bubble" id="t2p_preview"></div></div></div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Send', primary: true, id: 't2p_send', onClick: (close, b) => {
        if (!cid || !item) return KY.toast('Pick a customer and an item', 'warn');
        const amt = parseFloat($('#t2p_amount', b).value) || item.prices[0].amount;
        P.invoices.push({ id: nextInv(), contact: cid, amount: amt, status: 'sent', due: TODAY, issued: TODAY, paid: 0, tax: 0, items: [{ name: item.name, qty: 1, price: amt, tax: false }], text2pay: true });
        close(); if (location.hash.startsWith('#/payments/invoices')) invoicesTab(view);
        KY.toast(`Payment link texted to ${contact(cid).name}`);
      } }],
    });
    const preview = () => {
      const c = cid ? contact(cid) : null;
      $('#t2p_preview', box).textContent = $('#t2p_msg', box).value.replace('{{contact.first_name}}', c ? c.name.split(' ')[0] : 'there').replace('{{invoice.url}}', 'link.kyntlo.ai/i/7Hq2xA');
    };
    $('#t2p_msg', box).oninput = preview;
    preview();
    wireDd(box, 't2p_due', ['Due on receipt', 'In 7 days', 'In 14 days']);
    $('#t2p_customer', box).onclick = (e) => picker(e.currentTarget, { placeholder: 'Search contacts', idPrefix: 't2p_cust', items: contactItems(), onPick: (it) => {
      cid = it.id; $('#t2p_customer span', box).textContent = it.label; $('#t2p_phone', box).value = contact(it.id).phone; preview();
    } });
    $('#t2p_item', box).onclick = (e) => picker(e.currentTarget, { placeholder: 'Search products', idPrefix: 't2p_prod', items: productItems(true), onPick: (it) => {
      item = P.products.find((p) => p.id === it.id); $('#t2p_item span', box).textContent = item.name; $('#t2p_amount', box).value = item.prices[0].amount.toFixed(2);
    } });
  }

  // ================= Orders =================
  function ordersTab(view) {
    view.innerHTML = `${head('Orders', `${P.orders.length} orders`)}
      <div class="card row" style="padding:14px 18px;margin-bottom:16px;box-shadow:none;background:var(--blue-soft);border-color:#c7d7fe">${icon('layers', 20)}
        <span>Orders come from the <b>order forms</b> on your funnels and websites (Sites › Funnels › Order form element), including any order bumps and upsells.</span></div>
      <div class="card"><table class="t" id="ord_table"><thead><tr><th>Order</th><th>Customer</th><th>Source</th><th>Items</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>${P.orders.map((o) => `<tr><td class="bold">${o.id}</td><td><div class="row">${avatar(contact(o.contact).name, 30)}${esc(contact(o.contact).name)}</div></td>
          <td class="muted">Funnel — ${esc(o.funnel)}</td><td>${esc(o.item)}</td><td class="bold">${m2(o.amount)}</td><td>${chip(o.status)}</td><td class="muted">${o.date}</td></tr>`).join('')}</tbody></table></div>`;
  }

  // ================= Subscriptions =================
  let subFilter = 'all';
  function subsTab(view) {
    const active = P.subs.filter((s) => ['active', 'trialing'].includes(s.status));
    const mrr = P.subs.filter((s) => s.status === 'active').reduce((a, s) => a + s.amount, 0);
    view.innerHTML = `${head('Subscriptions', `${P.subs.length} subscriptions`)}
      ${stats([['Active subscriptions', active.length, 'restore'], ['Monthly recurring revenue', m2(mrr), 'chart', 'var(--green)'], ['Trialing', P.subs.filter((s) => s.status === 'trialing').length, 'clock', '#5925dc'], ['Past due', P.subs.filter((s) => s.status === 'past_due').length, 'bell', 'var(--amber)']])}
      <div class="pay-sub" id="sub_filters">${[['all', 'All'], ['active', 'Active'], ['trialing', 'Trialing'], ['past_due', 'Past due'], ['canceled', 'Cancelled']].map(([k, l]) => `<button class="btn sm ${subFilter === k ? 'primary' : ''}" data-sf="${k}" id="sub_f_${k}">${l}</button>`).join('')}</div>
      <div class="card"><table class="t" id="sub_table"><thead><tr><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Next payment</th><th>Started</th><th>Provider</th></tr></thead>
        <tbody>${P.subs.filter((s) => subFilter === 'all' || s.status === subFilter).map((s) => `<tr class="click" id="sub_row_${s.id}" data-sub="${s.id}"><td><div class="row">${avatar(contact(s.contact).name, 30)}<span class="bold">${esc(contact(s.contact).name)}</span></div></td>
          <td>${esc(s.product)}${s.count ? ` <span class="muted" style="font-size:13px">· payment ${s.count}</span>` : ''}</td><td class="bold">${m2(s.amount)} <span class="muted" style="font-weight:400">/ month</span></td><td>${chip(s.status)}</td>
          <td class="muted">${esc(s.next)}</td><td class="muted">${esc(s.started)}</td><td><div class="row" style="gap:6px"><img src="${LOGO('stripe')}" style="height:18px;width:auto" alt="Stripe"></div></td></tr>`).join('')}</tbody></table></div>`;
    $$('[data-sub]', view).forEach((tr) => (tr.onclick = () => subDrawer(view, P.subs.find((s) => s.id === tr.dataset.sub))));
    $$('[data-sf]', view).forEach((b) => (b.onclick = () => { subFilter = b.dataset.sf; subsTab(view); }));
  }

  function subDrawer(view, s) {
    const c = contact(s.contact);
    const hist = P.tx.filter((t) => t.contact === s.contact && t.source.startsWith('Subscription'));
    const box = KY.modal({
      title: 'Subscription details', drawer: true,
      body: `<div class="row" style="margin-bottom:16px">${avatar(c.name, 44)}<div style="flex:1"><div class="bold" style="font-size:18px">${esc(c.name)}</div><div class="muted">${esc(c.email)}</div></div>${chip(s.status)}</div>
        <div class="card" style="padding:16px;box-shadow:none">
          ${[['Product', s.product], ['Price', `${m2(s.amount)} / month`], ['Next payment', s.next], ['Started', s.started], ['Payment method', s.card], ['Provider', 'Stripe']].map(([k, v]) => `<div class="row" style="justify-content:space-between;margin:8px 0"><span class="muted">${k}</span><b>${esc(v)}</b></div>`).join('')}</div>
        <div class="bold" style="margin:18px 0 8px">Payments</div>
        ${hist.length ? hist.map((t) => `<div class="row" style="justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--line-soft)"><span>${esc(t.date.split(',')[0])}</span><span>${chip(t.status)}</span><b>${m2(t.amount)}</b></div>`).join('') : '<p class="muted">No payments yet.</p>'}`,
      actions: s.status === 'canceled' ? [{ label: 'Close' }] : [{ label: 'Update payment method', onClick: (close) => { close(); KY.toast(`Secure card-update link sent to ${c.name}`); } },
        { label: 'Cancel subscription', id: 'sub_cancel', onClick: (close) => cancelSub(view, s, close) }],
    });
    const cb = $('#sub_cancel', box);
    if (cb) { cb.style.color = 'var(--red)'; cb.style.borderColor = '#fda29b'; }
  }

  function cancelSub(view, s, closeDrawer) {
    const box = KY.modal({
      title: 'Cancel subscription?',
      body: `<p style="margin-top:0">${esc(contact(s.contact).name)} won’t be charged again for <b>${esc(s.product)}</b>.</p>
        <div class="field"><label>When</label>${dd('sub_cancel_when', 'At the end of the current billing period')}</div>
        <div class="field"><label>Reason (optional)</label>${dd('sub_cancel_reason', 'Requested by customer')}</div>`,
      actions: [{ label: 'Keep subscription' }, { label: 'Cancel subscription', primary: true, id: 'sub_cancel_ok', onClick: (close, b) => {
        const now = $('#sub_cancel_when', b).dataset.value === 'Immediately';
        s.status = now ? 'canceled' : s.status; s.next = now ? '—' : `Ends ${s.next}`;
        close(); closeDrawer(); subsTab(view); KY.toast(now ? 'Subscription cancelled' : `Subscription will end on ${s.next.replace('Ends ', '')}`);
      } }],
    });
    wireDd(box, 'sub_cancel_when', ['At the end of the current billing period', 'Immediately']);
    wireDd(box, 'sub_cancel_reason', ['Requested by customer', 'Moving away', 'Too expensive', 'Other']);
  }

  // ================= Payment Links =================
  function linksTab(view) {
    view.innerHTML = `${head('Payment Links', `${P.links.length} links`, `<button class="btn primary" id="pay_newlink">${icon('plus', 18)} Create payment link</button>`)}
      <div class="card"><table class="t" id="plk_table"><thead><tr><th>Name</th><th>Products</th><th>Amount</th><th>Link</th><th>Payments</th><th>Created</th><th>Status</th></tr></thead>
        <tbody>${P.links.map((l) => `<tr id="plk_row_${l.id}"><td class="bold">${esc(l.name)}</td><td>${l.products.map((p) => `<span class="chip">${esc(p)}</span>`).join(' ')}</td>
          <td class="bold">${m2(l.amount)}${l.recurring ? ' <span class="muted" style="font-weight:400">/ month</span>' : ''}</td>
          <td><div class="row" style="gap:6px"><span class="muted" style="font-size:14px">link.kyntlo.ai/payment-link/${esc(l.slug)}</span><button class="btn ghost icon sm" data-copy="${l.slug}" title="Copy link">${icon('copy', 16)}</button></div></td>
          <td>${l.payments}</td><td class="muted">${esc(l.created)}</td><td><button class="toggle ${l.active ? 'on' : ''}" data-act="${l.id}"></button></td></tr>`).join('')}</tbody></table></div>`;
    $$('[data-copy]', view).forEach((b) => (b.onclick = () => KY.toast('Link copied to clipboard')));
    $$('[data-act]', view).forEach((t) => (t.onclick = () => { const l = P.links.find((x) => x.id === t.dataset.act); l.active = !l.active; t.classList.toggle('on', l.active); KY.toast(l.active ? 'Link activated' : 'Link deactivated'); }));
    $('#pay_newlink').onclick = () => newLink(view);
  }

  function newLink(view) {
    const chosen = [];
    const box = KY.modal({
      title: 'Create payment link', drawer: true,
      body: `<div class="field"><label>Link name</label><input class="input" id="plk_name" placeholder="e.g. Whitening deposit"></div>
        <div class="field"><label>Products</label><div id="plk_products"></div><button class="btn sm" id="plk_add_product" style="align-self:flex-start">${icon('plus', 16)} Add product</button></div>
        <div class="bold" style="margin:18px 0 6px">Checkout options</div>
        ${[['plk_address', 'Collect billing address', false], ['plk_phone', 'Collect phone number', true], ['plk_qty', 'Let customers adjust quantity', false], ['plk_coupon', 'Allow coupon codes', true]].map(([id, l, on]) => `<div class="row" style="margin:12px 0"><button class="toggle ${on ? 'on' : ''}" id="${id}"></button>${l}</div>`).join('')}
        <div class="field" style="margin-top:14px"><label>After payment</label>${dd('plk_after', 'Show a confirmation page')}</div>`,
      actions: [{ label: 'Cancel' }, { label: 'Create link', primary: true, id: 'plk_save', onClick: (close, b) => {
        if (!chosen.length) return KY.toast('Add at least one product', 'warn');
        const name = $('#plk_name', b).value.trim() || chosen[0].name;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24);
        const l = { id: 'lk' + Date.now(), name, products: chosen.map((p) => p.name), amount: chosen.reduce((a, p) => a + p.prices[0].amount, 0), recurring: chosen.some((p) => p.prices[0].recurring), slug, created: TODAY, payments: 0, active: true };
        P.links.unshift(l);
        close(); linksTab(view);
        KY.modal({
          title: 'Your payment link is ready',
          body: `<div class="row" style="gap:20px;align-items:flex-start"><div style="flex:1">
              <div class="field"><label>Share this link</label><div class="row"><input class="input" id="plk_url" value="https://link.kyntlo.ai/payment-link/${esc(slug)}"><button class="btn primary" id="plk_copy">${icon('copy', 16)} Copy</button></div></div>
              <p class="muted" style="font-size:14px;margin:0">Paste it into a text, email, social post or your website. Every payment shows up in Transactions.</p></div>
              <div style="text-align:center"><div style="width:120px;height:120px;border:1px solid var(--line);border-radius:10px;display:grid;place-items:center;color:var(--ink)">${icon('qr', 88)}</div><div class="muted" style="font-size:12.5px;margin-top:4px">QR code</div></div></div>`,
          actions: [{ label: 'Done', primary: true, id: 'plk_done' }],
        });
        $('#plk_copy').onclick = () => KY.toast('Link copied to clipboard');
      } }],
    });
    KY.toggles(box);
    wireDd(box, 'plk_after', ['Show a confirmation page', 'Redirect to a URL']);
    const draw = () => ($('#plk_products', box).innerHTML = chosen.map((p) => `<div class="row card" style="padding:10px 12px;box-shadow:none;margin-bottom:8px">${icon('tag', 18)}<b style="flex:1">${esc(p.name)}</b><span>${priceLabel(p.prices[0])}</span></div>`).join(''));
    $('#plk_add_product', box).onclick = (e) => picker(e.currentTarget, { placeholder: 'Search products', idPrefix: 'plk_prod', items: productItems(), onPick: (it) => { chosen.push(P.products.find((p) => p.id === it.id)); draw(); } });
  }

  // ================= Transactions =================
  function txTab(view) {
    const ok = P.tx.filter((t) => t.status !== 'failed');
    const gross = ok.reduce((a, t) => a + t.amount, 0);
    const ref = P.tx.reduce((a, t) => a + (t.refunded || 0), 0);
    view.innerHTML = `${head('Transactions', `${P.tx.length} transactions`, `<button class="btn">${icon('download', 18)} Export</button>`)}
      ${stats([['Gross volume', m2(gross), 'chart'], ['Refunds', m2(ref), 'restore', 'var(--muted)'], ['Net volume', m2(gross - ref), 'money', 'var(--green)'], ['Failed payments', P.tx.filter((t) => t.status === 'failed').length, 'bell', 'var(--red)']])}
      <div class="card"><table class="t" id="tx_table"><thead><tr><th>Date</th><th>Customer</th><th>Source</th><th>Amount</th><th>Status</th><th>Payment method</th></tr></thead>
        <tbody>${P.tx.map((t) => `<tr class="click" id="tx_row_${t.id}" data-tx="${t.id}"><td class="muted">${esc(t.date)}</td><td><div class="row">${avatar(contact(t.contact).name, 30)}<span class="bold">${esc(contact(t.contact).name)}</span></div></td>
          <td>${esc(t.source)}</td><td class="bold">${m2(t.amount)}${t.refunded && t.refunded < t.amount ? `<div class="muted" style="font-size:12.5px;font-weight:500">${m2(t.refunded)} refunded</div>` : ''}</td><td>${chip(t.status)}</td><td class="muted">${esc(t.method)}</td></tr>`).join('')}</tbody></table></div>`;
    $$('[data-tx]', view).forEach((tr) => (tr.onclick = () => txDrawer(view, P.tx.find((t) => t.id === tr.dataset.tx))));
  }

  function txDrawer(view, t) {
    const c = contact(t.contact);
    const canRefund = ['succeeded', 'partially_refunded'].includes(t.status);
    const box = KY.modal({
      title: 'Transaction details', drawer: true,
      body: `<div style="font-size:32px;font-weight:700">${m2(t.amount)} <span style="font-size:16px;vertical-align:middle">${chip(t.status)}</span></div>
        <div class="muted" style="margin-bottom:18px">${esc(t.date)}</div>
        <div class="card" style="padding:16px;box-shadow:none">
          ${[['Customer', c.name], ['Email', c.email], ['Source', t.source], ['Payment method', t.method], ['Provider', t.method.startsWith('Manual') ? 'Recorded manually' : 'Stripe'], ['Charge ID', t.ref], ...(t.refunded ? [['Refunded', m2(t.refunded)]] : []), ...(t.note ? [['Failure reason', t.note]] : [])]
            .map(([k, v]) => `<div class="row" style="justify-content:space-between;margin:9px 0;gap:20px"><span class="muted">${k}</span><b style="text-align:right">${esc(v)}</b></div>`).join('')}</div>
        <div class="bold" style="margin:18px 0 8px">Timeline</div>
        ${[[t.status === 'failed' ? 'Payment failed' : 'Payment succeeded', t.date], ['Receipt emailed to customer', t.date], ...(t.refunded ? [['Refund issued', TODAY]] : [])].map(([a, d]) => `<div class="row" style="margin:8px 0;font-size:14px"><span style="color:var(--blue)">${icon('check', 16)}</span><span style="flex:1">${a}</span><span class="muted">${esc(d.split(',')[0])}</span></div>`).join('')}`,
      actions: canRefund ? [{ label: 'Send receipt', onClick: (close) => { close(); KY.toast(`Receipt emailed to ${c.email}`); } }, { label: 'Refund', primary: true, id: 'tx_refund', onClick: (close) => refund(view, t, close) }] : [{ label: 'Close' }],
    });
  }

  function refund(view, t, closeDrawer) {
    const left = t.amount - (t.refunded || 0);
    const box = KY.modal({
      title: 'Refund payment',
      body: `<div class="field"><label>Refund</label>${dd('rf_type', 'Full refund')}</div>
        <div class="field"><label>Amount</label><div class="pay-money"><i>£</i><input class="input" id="rf_amount" value="${left.toFixed(2)}" disabled></div></div>
        <div class="field"><label>Reason</label>${dd('rf_reason', 'Requested by customer')}</div>
        <div class="card row" style="padding:12px 14px;box-shadow:none;background:var(--amber-soft);border-color:#fedf89;font-size:14px;align-items:flex-start">${icon('bell', 18)}<span>Refunds go back to the original card through Stripe and usually arrive in 5–10 working days. Processing fees aren’t returned.</span></div>`,
      actions: [{ label: 'Cancel' }, { label: `Refund ${m2(left)}`, primary: true, id: 'rf_ok', onClick: (close, b) => {
        const amt = Math.min(left, parseFloat($('#rf_amount', b).value) || left);
        t.refunded = (t.refunded || 0) + amt;
        t.status = t.refunded + 0.001 >= t.amount ? 'refunded' : 'partially_refunded';
        close(); closeDrawer(); txTab(view); KY.toast(`${m2(amt)} refunded to ${contact(t.contact).name}`);
      } }],
    });
    const amount = $('#rf_amount', box), btn = $('#rf_ok', box);
    wireDd(box, 'rf_type', ['Full refund', 'Partial refund'], (v) => {
      amount.disabled = v === 'Full refund'; if (v === 'Full refund') amount.value = left.toFixed(2); else { amount.focus(); amount.select(); }
      btn.textContent = `Refund ${m2(parseFloat(amount.value) || 0)}`;
    });
    amount.oninput = () => (btn.textContent = `Refund ${m2(parseFloat(amount.value) || 0)}`);
    wireDd(box, 'rf_reason', ['Requested by customer', 'Duplicate', 'Fraudulent', 'Other']);
  }

  // ================= Products =================
  function productsTab(view) {
    view.innerHTML = `${head('Products', `${P.products.length} products`, `<button class="btn primary" id="prod_new">${icon('plus', 18)} Create product</button>`)}
      <div class="card"><div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)"><div class="search" style="width:340px"><span>${icon('search', 18)}</span><input class="input" placeholder="Search products"></div></div>
      <table class="t" id="prod_table"><thead><tr><th>Product</th><th>Prices</th><th>Billing</th><th>Type</th><th>Updated</th></tr></thead>
        <tbody>${P.products.map((p) => `<tr id="prod_row_${p.id}"><td><div class="row"><span class="pay-pi" style="width:40px;height:40px">${icon(p.prices[0].recurring ? 'restore' : 'tag', 20)}</span><div><div class="bold">${esc(p.name)}</div><div class="muted" style="font-size:13.5px;max-width:460px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(p.desc)}</div></div></div></td>
          <td class="bold">${p.prices.map(priceLabel).join('<br>')}</td><td>${p.prices.map((pr) => `<span class="chip ${pr.recurring ? 'purple' : ''}">${pr.recurring ? 'Recurring' : 'One-time'}</span>`).join(' ')}</td><td class="muted">${esc(p.type)}</td><td class="muted">${esc(p.updated)}</td></tr>`).join('')}</tbody></table></div>`;
    $('#prod_new').onclick = () => KY.go('#/payments/products/new');
  }

  function productEditor(view) {
    const prod = { name: '', desc: '', type: 'Service', prices: [] };
    function draw() {
      view.innerHTML = `<div class="row" style="margin-bottom:18px"><button class="btn ghost icon" id="prod_back">${icon('left', 20)}</button><h1 style="margin:0;font-size:24px">Create product</h1>
          <span class="spacer"></span><button class="btn" id="prod_cancel">Cancel</button><button class="btn primary" id="prod_save">Save product</button></div>
        <div class="grid" style="grid-template-columns:1fr 360px;align-items:start">
          <div class="card card-b">
            <div class="field"><label>Product name</label><input class="input" id="prod_name" value="${esc(prod.name)}" placeholder="e.g. Composite Bonding"></div>
            <div class="field"><label>Description</label><textarea class="input" rows="3" id="prod_desc" placeholder="Shown on invoices, payment links and checkout">${esc(prod.desc)}</textarea></div>
            <div class="row" style="margin:22px 0 12px"><b style="font-size:17px">Pricing</b><span class="spacer"></span><button class="btn sm" id="prod_add_price">${icon('plus', 16)} Add price</button></div>
            <div id="prod_prices">${prod.prices.map((pr, i) => `<div class="row card" style="padding:12px 14px;box-shadow:none;margin-bottom:8px" id="prod_price_${i}"><span class="pay-pi">${icon(pr.recurring ? 'restore' : 'tag', 16)}</span>
                <div style="flex:1"><b>${esc(pr.name)}</b><div class="muted" style="font-size:13.5px">${pr.recurring ? `Recurring · every ${pr.interval === 'Monthly' ? 'month' : pr.interval.toLowerCase()}${pr.trial ? ` · ${pr.trial}-day free trial` : ''}${pr.setup ? ` · ${m2(pr.setup)} setup fee` : ''}` : 'One-time'}</div></div><b>${priceLabel(pr)}</b></div>`).join('')
              || `<div class="empty" style="padding:28px;border:1.5px dashed var(--line);border-radius:10px">No prices yet. A product can have several — for example pay in full, or monthly.</div>`}</div>
          </div>
          <div>
            <div class="card card-b"><div class="bold" style="margin-bottom:10px">Product image</div>
              <div style="border:1.5px dashed var(--line);border-radius:10px;padding:30px;text-align:center;color:var(--muted)">${icon('image', 30)}<div style="font-size:14px;margin-top:6px">Drop an image or browse</div></div></div>
            <div class="card card-b" style="margin-top:16px"><div class="field" style="margin:0"><label>Product type</label>${dd('prod_type', prod.type)}</div></div>
            <div class="card card-b" style="margin-top:16px"><div class="row"><button class="toggle" id="prod_store"></button>Show in online store</div></div>
          </div></div>`;
      KY.toggles(view);
      wireDd(view, 'prod_type', ['Service', 'Digital', 'Physical'], (v) => (prod.type = v));
      const keep = () => { prod.name = $('#prod_name').value; prod.desc = $('#prod_desc').value; };
      $('#prod_back').onclick = $('#prod_cancel').onclick = () => KY.go('#/payments/products');
      $('#prod_add_price').onclick = () => { keep(); priceModal((pr) => { prod.prices.push(pr); draw(); }); };
      $('#prod_save').onclick = () => {
        keep();
        if (!prod.name.trim()) return KY.toast('Give the product a name', 'warn');
        if (!prod.prices.length) return KY.toast('Add at least one price', 'warn');
        P.products.unshift({ id: 'pr' + Date.now(), name: prod.name.trim(), desc: prod.desc, type: prod.type, updated: TODAY, prices: prod.prices });
        KY.go('#/payments/products'); KY.toast(`Product “${prod.name.trim()}” created`);
      };
    }
    draw();
  }

  function priceModal(onSave) {
    let recurring = false;
    const box = KY.modal({
      title: 'Add price',
      body: `<div class="field"><label>Price name</label><input class="input" id="pr_name" placeholder="e.g. Pay in full"></div>
        <div class="field"><label>Pricing type</label><div class="pay-seg"><button class="on" id="pr_onetime" type="button">One time</button><button id="pr_recurring" type="button">Recurring</button></div></div>
        <div class="pay-g2"><div class="field"><label>Amount</label><div class="pay-money"><i>£</i><input class="input" id="pr_amount" placeholder="0.00"></div></div>
          <div class="field"><label>Currency</label><input class="input" value="GBP — £" disabled></div></div>
        <div id="pr_rec" style="display:none">
          <div class="pay-g2"><div class="field"><label>Billing period</label>${dd('pr_interval', 'Monthly')}</div>
            <div class="field"><label>Number of payments</label><input class="input" id="pr_count" placeholder="Until cancelled"></div>
            <div class="field"><label>Free trial (days)</label><input class="input" id="pr_trial" placeholder="0"></div>
            <div class="field"><label>Setup fee</label><div class="pay-money"><i>£</i><input class="input" id="pr_setup" placeholder="0.00"></div></div></div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save price', primary: true, id: 'pr_save', onClick: (close, b) => {
        const amount = parseFloat($('#pr_amount', b).value.replace(/[£,]/g, '')) || 0;
        onSave({ name: $('#pr_name', b).value || (recurring ? 'Monthly' : 'Standard'), amount, recurring, interval: $('#pr_interval', b).dataset.value,
          trial: parseInt($('#pr_trial', b).value, 10) || 0, setup: parseFloat($('#pr_setup', b).value) || 0, count: parseInt($('#pr_count', b).value, 10) || 0 });
        close();
      } }],
    });
    const set = (r) => { recurring = r; $('#pr_onetime', box).classList.toggle('on', !r); $('#pr_recurring', box).classList.toggle('on', r); $('#pr_rec', box).style.display = r ? '' : 'none'; };
    $('#pr_onetime', box).onclick = () => set(false);
    $('#pr_recurring', box).onclick = () => set(true);
    wireDd(box, 'pr_interval', ['Daily', 'Weekly', 'Monthly', 'Every 3 months', 'Every 6 months', 'Yearly']);
  }

  // ================= Coupons =================
  function couponsTab(view) {
    view.innerHTML = `${head('Coupons', `${P.coupons.length} coupons`, `<button class="btn primary">${icon('plus', 18)} New coupon</button>`)}
      <div class="card"><table class="t"><thead><tr><th>Code</th><th>Name</th><th>Discount</th><th>Redemptions</th><th>Ends</th><th>Status</th></tr></thead>
      <tbody>${P.coupons.map((c) => `<tr><td><span class="chip blue" style="font-family:ui-monospace,monospace">${c.code}</span></td><td class="bold">${esc(c.name)}</td><td>${esc(c.off)}</td><td>${c.used}</td><td class="muted">${c.ends}</td><td><span class="chip ${c.status === 'Active' ? 'green' : ''}">${c.status}</span></td></tr>`).join('')}</tbody></table></div>`;
  }

  // ================= Integrations =================
  function integrationsTab(view) {
    const others = [['square', 'Square', 'Take payments with your Square account.'], ['authorizenet', 'Authorize.net', 'Card payments through Authorize.net.'], ['nmi', 'NMI', 'Connect an NMI merchant account.']];
    view.innerHTML = `${head('Integrations', '', `<div class="row" style="gap:10px"><span class="muted">Test mode</span><button class="toggle ${P.testMode ? 'on' : ''}" id="pay_testmode"></button></div>`)}
      <p class="muted" style="margin:-6px 0 20px">Connect a payment provider to take card payments on invoices, payment links, order forms, calendars and Text2Pay.</p>
      <div class="pay-int">
        <div class="card" id="int_stripe" style="${P.stripe ? 'border-color:#a6f4c5' : ''}">
          <div class="row"><img src="${LOGO('stripe')}" alt=""><div style="flex:1"><div class="bold" style="font-size:18px">Stripe</div><div class="muted" style="font-size:14px">Cards, Apple Pay & Google Pay</div></div>
            ${P.stripe ? `<span class="chip green">${icon('check', 14)} Connected</span>` : '<span class="chip blue">Recommended</span>'}</div>
          ${P.stripe ? `<div class="card" style="padding:12px 14px;box-shadow:none;background:#f9fafb;font-size:14px">
              <div class="row" style="justify-content:space-between"><span class="muted">Account</span><b>Bloom Dental Studio</b></div>
              <div class="row" style="justify-content:space-between;margin-top:6px"><span class="muted">Account ID</span><b>acct_1Q8bLmDental</b></div>
              <div class="row" style="justify-content:space-between;margin-top:6px"><span class="muted">Mode</span>${P.testMode ? '<span class="chip amber">Test mode</span>' : '<span class="chip green">Live</span>'}</div></div>
            <div class="row"><button class="btn sm" id="int_stripe_manage">${icon('external', 16)} Open Stripe dashboard</button><button class="btn sm ghost" id="int_stripe_disconnect" style="color:var(--red)">Disconnect</button></div>`
          : `<p class="muted" style="margin:0;font-size:14.5px">The fastest way to get paid. Payouts go straight to your bank account.</p>
            <button class="btn primary" id="int_stripe_connect" style="align-self:flex-start">${icon('link', 18)} Connect</button>`}
        </div>
        <div class="card" id="int_paypal">
          <div class="row"><img src="${LOGO('paypal')}" alt=""><div style="flex:1"><div class="bold" style="font-size:18px">PayPal</div><div class="muted" style="font-size:14px">PayPal checkout & Pay Later</div></div>${P.paypal ? `<span class="chip green">${icon('check', 14)} Connected</span>` : ''}</div>
          <p class="muted" style="margin:0;font-size:14.5px">Let customers pay with their PayPal account. Works alongside Stripe.</p>
          ${P.paypal ? '' : `<button class="btn" id="int_paypal_connect" style="align-self:flex-start">${icon('link', 18)} Connect</button>`}
        </div>
        ${others.map(([k, n, d]) => `<div class="card"><div class="row"><img src="${LOGO(k)}" alt=""><div class="bold" style="font-size:18px">${n}</div></div><p class="muted" style="margin:0;font-size:14.5px">${d}</p><button class="btn" style="align-self:flex-start" data-other="${n}">${icon('link', 18)} Connect</button></div>`).join('')}
      </div>`;
    $('#pay_testmode').onclick = () => { P.testMode = !P.testMode; integrationsTab(view); KY.toast(P.testMode ? 'Test mode on — no real money moves' : 'Live mode on'); };
    if ($('#int_stripe_connect')) $('#int_stripe_connect').onclick = () => connectStripe(view);
    if ($('#int_stripe_manage')) $('#int_stripe_manage').onclick = () => KY.toast('Opens dashboard.stripe.com in a new tab');
    if ($('#int_stripe_disconnect')) $('#int_stripe_disconnect').onclick = () => { P.stripe = false; integrationsTab(view); KY.toast('Stripe disconnected', 'warn'); };
    if ($('#int_paypal_connect')) $('#int_paypal_connect').onclick = () => {
      KY.modal({ title: 'Connect PayPal', body: `<p class="muted" style="margin-top:0">Find these in your PayPal Developer dashboard under <b>Apps & Credentials</b>. Use your <b>Live</b> app, not Sandbox.</p>
          <div class="field"><label>Client ID</label><input class="input" id="pp_client" placeholder="A…"></div><div class="field"><label>Secret key</label><input class="input" id="pp_secret" type="password" placeholder="••••••••"></div>`,
        actions: [{ label: 'Cancel' }, { label: 'Connect', primary: true, id: 'pp_save', onClick: (close) => { P.paypal = true; close(); integrationsTab(view); KY.toast('PayPal connected'); } }] });
    };
    $$('[data-other]', view).forEach((b) => (b.onclick = () => KY.toast(`${b.dataset.other}: you’ll be asked for your API keys`)));
  }

  function connectStripe(view) {
    const box = KY.modal({
      title: 'Connect Stripe', wide: true,
      body: `<div id="st_step"><div class="row" style="gap:18px;align-items:flex-start"><img src="${LOGO('stripe')}" style="width:110px;height:56px;object-fit:contain" alt="Stripe">
          <div><p style="margin-top:0">You’ll be taken to Stripe to <b>sign in</b> or <b>create a free account</b>. Stripe will ask for your business details and the bank account your payouts should go to.</p>
          <ul class="muted" style="margin:0;padding-left:18px;font-size:14.5px;line-height:1.8"><li>Already use Stripe? Sign in and choose the account for this business.</li><li>Payouts land in your bank on Stripe’s schedule — usually every few days.</li><li>Stripe’s standard card fees apply to each payment.</li></ul></div></div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Connect with Stripe', primary: true, id: 'stripe_go', onClick: (close, b) => {
        $('#st_step', b).innerHTML = `<div class="stripe-o"><div class="h">stripe</div><div style="padding:22px">
            <div class="bold" style="font-size:18px;margin-bottom:6px">Kyntlo would like to connect to your Stripe account</div>
            <p class="muted" style="margin-top:0">Signed in as <b>sarah@bloomdental.co.uk</b></p>
            <div class="field"><label>Account</label><div class="card row" style="padding:12px 14px;box-shadow:none;border-color:#635bff"><span class="avatar" style="background:#635bff">BD</span><div style="flex:1"><b>Bloom Dental Studio</b><div class="muted" style="font-size:13px">acct_1Q8bLmDental · United Kingdom · GBP</div></div>${icon('check', 18)}</div></div>
            <p class="muted" style="font-size:13.5px;margin:0">Kyntlo will be able to create payments and refunds on this account. You can disconnect at any time.</p></div></div>`;
        const go = $('#stripe_go', b);
        go.textContent = 'Connect'; go.id = 'stripe_authorize'; go.style.background = '#635bff'; go.style.borderColor = '#635bff';
        go.onclick = () => { P.stripe = true; close(); integrationsTab(view); KY.toast('Stripe connected — you can now take card payments'); };
      } }],
    });
    return box;
  }

  KY.screen('payments', {
    tabs: [{ id: 'invoices', label: 'Invoices & Estimates' }, { id: 'orders', label: 'Orders' }, { id: 'subscriptions', label: 'Subscriptions' }, { id: 'payment-links', label: 'Payment Links' },
      { id: 'transactions', label: 'Transactions' }, { id: 'products', label: 'Products' }, { id: 'coupons', label: 'Coupons' }, { id: 'integrations', label: 'Integrations' }],
    render(view, { tab, params }) {
      css();
      $$('.pay-pick').forEach((x) => x.remove());
      if (tab === 'invoices' && params[0]) return invoiceBuilder(view, params[0]);
      if (tab === 'products' && params[0] === 'new') return productEditor(view);
      const fn = { invoices: invoicesTab, orders: ordersTab, subscriptions: subsTab, 'payment-links': linksTab, transactions: txTab, products: productsTab, coupons: couponsTab, integrations: integrationsTab }[tab] || invoicesTab;
      return fn(view);
    },
  });
})();
