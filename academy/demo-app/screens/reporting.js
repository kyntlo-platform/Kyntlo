// Reporting — HighLevel's Reporting tabs: Google Ads, Facebook Ads, Attribution Report,
// Call Reporting, Appointment Report and Agent Reporting. Numbers are tied to the demo data
// (46 leads and 38 appointments in the last 30 days, the won deals from Opportunities).
(() => {
  const { esc, icon, money, $, $$, avatar } = KY;
  const data = KY.data;
  const m2 = (n) => money(n, 2);
  const n0 = (n) => Number(n).toLocaleString('en-GB');
  const pct = (a, b, d = 1) => (b ? ((a / b) * 100).toFixed(d) : '0') + '%';
  window.KY_ICONS.blank = window.KY_ICONS.blank || '';
  const LOGO = (n) => `../../assets/integration-logos/${n}.png`;

  const R = KY.reporting = KY.reporting || { google: true, facebook: true, range: 'Last 30 days', attr: 'first', gTab: 'Campaigns', fTab: 'Campaigns', open: {} };
  const days = Array.from({ length: 30 }, (_, i) => i);
  const dayLabel = (i) => { const d = new Date(2026, 8, 22 + i); return `${d.getDate()} ${d.toLocaleString('en-GB', { month: 'short' })}`; };
  const wave = (base, amp, seed) => days.map((i) => Math.max(0, Math.round(base + amp * Math.sin(i / 2.3 + seed) + amp * 0.6 * Math.cos(i / 5 + seed * 2) + (i % 7 === 5 || i % 7 === 6 ? -base * 0.25 : 0))));

  const G = [
    { name: 'Invisalign — London (Search)', status: 'Enabled', impr: 8240, clicks: 296, cost: 432.2, conv: 5 },
    { name: 'Dental Implants — Search', status: 'Enabled', impr: 5110, clicks: 162, cost: 268.4, conv: 3 },
    { name: 'Emergency Dentist — Search', status: 'Enabled', impr: 3380, clicks: 118, cost: 112.36, conv: 1 },
    { name: 'Brand — Bloom Dental', status: 'Enabled', impr: 1690, clicks: 36, cost: 31.6, conv: 2 },
  ];
  const GKW = [['invisalign london', 2480, 121, 4.88, 3], ['invisalign cost uk', 1960, 74, 3.78, 1], ['dental implants london', 2210, 71, 3.21, 2], ['emergency dentist marylebone', 1410, 63, 4.47, 1], ['bloom dental', 1690, 36, 2.13, 2], ['clear aligners near me', 1320, 48, 3.64, 1]];
  const F = [
    { name: 'Invisalign Free Scan — Lead Form', status: 'Active', reach: 12900, impr: 28400, clicks: 610, spend: 388.5, leads: 10 },
    { name: 'Teeth Whitening £199 Offer', status: 'Active', reach: 6200, impr: 14300, clicks: 302, spend: 164.9, leads: 3 },
    { name: 'Retargeting — Website Visitors', status: 'Active', reach: 2200, impr: 6200, clicks: 128, spend: 59, leads: 1 },
  ];
  const ATTR = {
    first: [
      ['paid-social', 'Paid Social', 'Facebook & Instagram ads', 14, 9, 1, 3800, [['Invisalign Free Scan — Lead Form', 10, 1, 3800], ['Teeth Whitening £199 Offer', 3, 0, 0], ['Retargeting — Website Visitors', 1, 0, 0]]],
      ['paid-search', 'Paid Search', 'Google Ads', 11, 7, 0, 0, [['Invisalign — London (Search)', 5, 0, 0], ['Dental Implants — Search', 3, 0, 0], ['Brand — Bloom Dental', 2, 0, 0], ['Emergency Dentist — Search', 1, 0, 0]]],
      ['organic', 'Organic Search', 'Google search & Business Profile', 6, 5, 1, 450, [['Google Business Profile', 4, 1, 450], ['Google organic', 2, 0, 0]]],
      ['referral', 'Referral', 'Patient referrals & partner sites', 5, 5, 1, 2400, [['Patient referral', 4, 1, 2400], ['baker-street-fitness.co.uk', 1, 0, 0]]],
      ['direct', 'Direct Traffic', 'Typed your web address', 4, 3, 1, 450, [['bloomdental.co.uk', 4, 1, 450]]],
      ['social', 'Social Media', 'Unpaid social posts', 4, 2, 0, 0, [['Instagram', 3, 0, 0], ['Facebook page', 1, 0, 0]]],
      ['calls', 'Call Tracking', 'Tracked phone numbers', 2, 2, 0, 0, [['Main line', 2, 0, 0]]],
    ],
  };
  ATTR.last = ATTR.first.map((r) => r.slice());
  [[0, 12, 8], [1, 10, 6], [2, 5, 4], [4, 8, 6]].forEach(([i, l, a]) => { ATTR.last[i][3] = l; ATTR.last[i][4] = a; });
  ATTR.last[2][5] = 0; ATTR.last[2][6] = 0; ATTR.last[4][5] = 2; ATTR.last[4][6] = 900;
  const CALL_SRC = [['Website number', 38, '#53b1fd'], ['Main line', 32, '#8098f9'], ['Google Ads number', 31, '#22ccee'], ['Google Business Profile', 27, '#f79009']];
  const CALLS = [
    ['21 Oct, 10:42', 'c1', 'Inbound', 'Answered', '4:18', 'Website number', 'Sarah Mitchell'],
    ['21 Oct, 09:15', 'c6', 'Outbound', 'Answered', '2:05', 'Main line', 'Priya Shah'],
    ['20 Oct, 17:51', null, 'Inbound', 'Missed', '0:00', 'Google Ads number', '—'],
    ['20 Oct, 15:30', 'c2', 'Inbound', 'Answered', '3:41', 'Google Business Profile', 'James Okafor'],
    ['20 Oct, 11:02', 'c10', 'Outbound', 'Voicemail', '0:38', 'Main line', 'Sarah Mitchell'],
    ['19 Oct, 16:24', 'c8', 'Inbound', 'Answered', '5:12', 'Website number', 'James Okafor'],
  ];
  const AGENT = {
    'Sarah Mitchell': { appts: 14, calls: 41, sms: 186, email: 74, resp: '4 min' },
    'James Okafor': { appts: 13, calls: 52, sms: 231, email: 58, resp: '6 min' },
    'Priya Shah': { appts: 11, calls: 35, sms: 149, email: 91, resp: '9 min' },
  };

  // ---------- charts (inline SVG) ----------
  function bars(series, labels, { h = 230, w = 1000, colors = ['#53b1fd'], stacked = false, fmt = (v) => v, every = 1, legend = [] } = {}) {
    const W = w, H = h, L = 46, B = 30, T = 14;
    const totals = labels.map((_, i) => (stacked ? series.reduce((a, s) => a + s[i], 0) : Math.max(...series.map((s) => s[i]))));
    const top = Math.max(...totals, 1);
    const step = Math.pow(10, Math.floor(Math.log10(top))) * (top / Math.pow(10, Math.floor(Math.log10(top))) > 5 ? 2 : 1);
    const max = Math.ceil(top / step) * step;
    const cw = (W - L - 10) / labels.length;
    const bw = stacked ? cw * 0.62 : (cw * 0.7) / series.length;
    const y = (v) => H - B - ((H - B - T) * v) / max;
    let out = '';
    for (let v = 0; v <= max; v += step) out += `<line x1="${L}" x2="${W - 6}" y1="${y(v)}" y2="${y(v)}" stroke="#eaecf0"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" font-size="12" fill="#98a2b3">${fmt(v)}</text>`;
    labels.forEach((lab, i) => {
      const x0 = L + i * cw + (cw - (stacked ? bw : bw * series.length)) / 2;
      let acc = 0;
      series.forEach((s, k) => {
        const v = s[i];
        if (stacked) { out += `<rect x="${x0}" y="${y(acc + v)}" width="${bw}" height="${Math.max(0, y(acc) - y(acc + v))}" fill="${colors[k]}" rx="${k === series.length - 1 ? 3 : 0}"/>`; acc += v; }
        else out += `<rect x="${x0 + k * bw}" y="${y(v)}" width="${bw - 2}" height="${H - B - y(v)}" fill="${colors[k]}" rx="3"/>`;
      });
      if (i % every === 0) out += `<text x="${L + i * cw + cw / 2}" y="${H - 9}" text-anchor="middle" font-size="12" fill="#667085">${esc(lab)}</text>`;
    });
    return `${legend.length ? `<div class="row" style="gap:16px;margin-bottom:6px;font-size:13.5px">${legend.map((l, k) => `<span class="row" style="gap:6px"><span style="width:12px;height:12px;border-radius:3px;background:${colors[k]}"></span>${esc(l)}</span>`).join('')}</div>` : ''}
      <svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" preserveAspectRatio="none" style="display:block">${out}</svg>`;
  }
  function line(series, labels, { h = 230, w = 1000, colors = ['#155eef', '#22ccee'], legend = [], every = 5, fmt = (v) => v } = {}) {
    const W = w, H = h, L = 46, B = 30, T = 14;
    const top = Math.max(...series.flat(), 1);
    const step = Math.pow(10, Math.floor(Math.log10(top))) * (top / Math.pow(10, Math.floor(Math.log10(top))) > 5 ? 2 : 1);
    const max = Math.ceil(top / step) * step;
    const x = (i) => L + ((W - L - 16) * i) / (labels.length - 1);
    const y = (v) => H - B - ((H - B - T) * v) / max;
    let out = '';
    for (let v = 0; v <= max; v += step) out += `<line x1="${L}" x2="${W - 6}" y1="${y(v)}" y2="${y(v)}" stroke="#eaecf0"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" font-size="12" fill="#98a2b3">${fmt(v)}</text>`;
    series.forEach((s, k) => {
      const pts = s.map((v, i) => `${x(i)},${y(v)}`).join(' ');
      if (k === 0) out += `<polygon points="${x(0)},${y(0)} ${pts} ${x(s.length - 1)},${y(0)}" fill="${colors[k]}" opacity=".08"/>`;
      out += `<polyline points="${pts}" fill="none" stroke="${colors[k]}" stroke-width="2.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
    });
    labels.forEach((lab, i) => { if (i % every === 0) out += `<text x="${x(i)}" y="${H - 9}" text-anchor="middle" font-size="12" fill="#667085">${esc(lab)}</text>`; });
    return `${legend.length ? `<div class="row" style="gap:16px;margin-bottom:6px;font-size:13.5px">${legend.map((l, k) => `<span class="row" style="gap:6px"><span style="width:14px;height:3px;border-radius:2px;background:${colors[k]}"></span>${esc(l)}</span>`).join('')}</div>` : ''}
      <svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" preserveAspectRatio="none" style="display:block">${out}</svg>`;
  }
  function donut(parts, center, sub) {
    const total = parts.reduce((a, p) => a + p[1], 0) || 1;
    const r = 64, c = 2 * Math.PI * r;
    let acc = 0;
    const arcs = parts.map(([, v, col]) => { const len = Math.max(0, (v / total) * c - 3); const s = `<circle r="${r}" cx="90" cy="90" fill="none" stroke="${col}" stroke-width="20" stroke-dasharray="${len} ${c}" stroke-dashoffset="${-acc}" transform="rotate(-90 90 90)"/>`; acc += (v / total) * c; return s; }).join('');
    return `<div class="row" style="gap:22px;justify-content:center"><svg viewBox="0 0 180 180" width="170" height="170">${arcs}<text x="90" y="92" text-anchor="middle" font-size="30" font-weight="700" fill="#101828">${center}</text><text x="90" y="114" text-anchor="middle" font-size="12" fill="#667085">${sub}</text></svg>
      <div>${parts.map(([n, v, col]) => `<div class="row" style="margin:7px 0;font-size:14.5px"><span style="width:12px;height:12px;border-radius:3px;background:${col}"></span><span style="flex:1;min-width:150px">${esc(n)}</span><b>${v}</b></div>`).join('')}</div></div>`;
  }
  const hbars = (rows, color = '#8098f9', fmt = (v) => v) => {
    const max = Math.max(...rows.map((r) => r[1]), 1);
    return rows.map(([n, v]) => `<div class="row" style="margin:12px 0"><span style="width:190px;font-size:14.5px">${esc(n)}</span><div style="flex:1;background:#f2f4f7;border-radius:5px"><div style="width:${Math.max(1, (v / max) * 100)}%;height:16px;border-radius:5px;background:${color}"></div></div><b style="width:90px;text-align:right">${fmt(v)}</b></div>`).join('');
  };

  function css() {
    if ($('#css-reporting')) return;
    const s = document.createElement('style');
    s.id = 'css-reporting';
    s.textContent = `
      .rp-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 18px; }
      .rp-kpis.six { grid-template-columns: repeat(6, 1fr); }
      .rp-kpi { padding: 14px 18px; }
      .rp-kpi .k { color: var(--muted); font-size: 14px; font-weight: 500; }
      .rp-kpi .v { font-size: 26px; font-weight: 700; margin-top: 2px; }
      .rp-kpi .d { font-size: 13px; font-weight: 600; }
      .rp-kpi .d.up { color: #027a48; } .rp-kpi .d.down { color: #b42318; }
      .rp-acct { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 4px 12px 4px 6px; font-size: 14px; font-weight: 600; }
      .rp-acct img { height: 20px; width: auto; max-width: 74px; object-fit: contain; }
      .rp-sub { display: flex; gap: 6px; }
      .rp-seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: #fff; }
      .rp-seg button { border: 0; background: #fff; height: 38px; padding: 0 14px; font-weight: 600; color: var(--muted); font-size: 14.5px; }
      .rp-seg button + button { border-left: 1px solid var(--line); }
      .rp-seg button.on { background: var(--blue-soft); color: var(--blue); }
      table.t td.num, table.t th.num { text-align: right; }
      .rp-caret { display: inline-grid; place-items: center; width: 22px; color: var(--muted); transition: transform .15s; }
      .rp-caret.open { transform: rotate(90deg); }
      tr.rp-child td { background: #f9fafb; font-size: 14px; }
      .rp-empty { padding: 70px 20px; text-align: center; }
      .rp-play { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--line); background: #fff; display: grid; place-items: center; color: var(--blue); }
      .rp-wave { display: inline-flex; gap: 2px; align-items: center; height: 20px; vertical-align: middle; margin-left: 8px; }
      .rp-wave i { width: 3px; border-radius: 2px; background: #c7d7fe; display: block; }
      .rp-wave.playing i { background: var(--blue); animation: rpw .8s ease-in-out infinite alternate; }
      @keyframes rpw { to { transform: scaleY(.35); } }
    `;
    document.head.appendChild(s);
  }

  const kpi = (k, v, d, up = true) => `<div class="card rp-kpi"><div class="k">${esc(k)}</div><div class="v">${v}</div>${d ? `<div class="d ${up ? 'up' : 'down'}">${up ? '▲' : '▼'} ${esc(d)} vs previous period</div>` : ''}</div>`;
  const header = (title, extra = '') => `<div class="page-head"><h1>${esc(title)}</h1>${extra}<div class="actions">
      <button class="btn" id="rp_range">${icon('calendar', 18)} ${esc(R.range)} ${icon('chevron', 16)}</button>
      <button class="btn" id="rp_export">${icon('download', 18)} Export</button></div></div>`;
  function wireHead(view, redraw) {
    $('#rp_range').onclick = (e) => KY.menu(e.currentTarget, ['Last 7 days', 'Last 30 days', 'This month', 'Last month', 'Last 90 days', 'Custom range'].map((r) => ({ label: r, icon: r === R.range ? 'check' : 'blank', onClick: () => { R.range = r; redraw(); } })));
    $('#rp_export').onclick = () => KY.toast('Report exported as CSV');
  }
  const card = (title, body, right = '', id = '') => `<div class="card" ${id ? `id="${id}"` : ''}><div class="card-h"><h3>${esc(title)}</h3><span class="spacer"></span>${right}</div><div class="card-b">${body}</div></div>`;

  // ================= Google Ads =================
  function googleAds(view) {
    const redraw = () => googleAds(view);
    if (!R.google) {
      view.innerHTML = `${header('Google Ads')}<div class="card rp-empty" id="rp_g_empty"><img src="${LOGO('google')}" style="height:54px" alt="">
        <div class="bold" style="font-size:20px;margin:14px 0 6px">Connect your Google Ads account</div>
        <p class="muted" style="max-width:560px;margin:0 auto 20px">See clicks, cost and conversions next to the leads and revenue they produced in Kyntlo. Uses the same Google connection as Settings › Integrations.</p>
        <button class="btn primary" id="rp_g_connect">${icon('link', 18)} Connect Google Ads</button></div>`;
      wireHead(view, redraw);
      $('#rp_g_connect').onclick = () => {
        const box = KY.modal({
          title: 'Connect Google Ads',
          body: `<div class="row card" style="padding:12px 14px;box-shadow:none;margin-bottom:16px"><img src="${LOGO('google')}" style="height:26px" alt=""><div style="flex:1"><b>sarah@bloomdental.co.uk</b><div class="muted" style="font-size:13px">Google account connected</div></div><span class="chip green">${icon('check', 14)} Signed in</span></div>
            <div class="field"><label>Select the ad account for this business</label>
              ${[['4821935520', 'Bloom Dental Studio', true], ['7730418862', 'Bloom Dental — Kensington', false]].map(([id, n, on]) => `<label class="card row" style="padding:12px 14px;box-shadow:none;margin-bottom:8px;cursor:pointer;${on ? 'border-color:var(--blue);background:var(--blue-soft)' : ''}" id="rp_g_acct_${id}"><input type="radio" name="gacct" ${on ? 'checked' : ''}><div><b>${n}</b><div class="muted" style="font-size:13px">${id.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</div></div></label>`).join('')}</div>`,
          actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'rp_g_save', onClick: (close) => { R.google = true; close(); redraw(); KY.toast('Google Ads connected — data can take up to 24 hours to appear'); } }],
        });
        return box;
      };
      return;
    }
    const t = G.reduce((a, c) => ({ impr: a.impr + c.impr, clicks: a.clicks + c.clicks, cost: a.cost + c.cost, conv: a.conv + c.conv }), { impr: 0, clicks: 0, cost: 0, conv: 0 });
    const clicks = wave(20, 6, 1);
    const scale = t.clicks / clicks.reduce((a, b) => a + b, 0);
    const daily = clicks.map((v) => Math.round(v * scale));
    view.innerHTML = `${header('Google Ads', `<span class="rp-acct"><img src="${LOGO('google')}" alt="">Bloom Dental Studio · 482-193-5520</span>`)}
      <div class="rp-kpis" id="rp_g_kpis">
        ${kpi('Impressions', n0(t.impr), '12.4%')}${kpi('Clicks', n0(t.clicks), '8.1%')}${kpi('CTR', pct(t.clicks, t.impr, 2), '0.2 pts', false)}${kpi('Avg. CPC', m2(t.cost / t.clicks), '3.0%', false)}
        ${kpi('Cost', m2(t.cost), '9.6%')}${kpi('Conversions', t.conv, '2')}${kpi('Cost / conv.', m2(t.cost / t.conv), '£4.10', false)}${kpi('Conv. rate', pct(t.conv, t.clicks, 2), '0.1 pts')}
      </div>
      <div class="grid" style="grid-template-columns:1.7fr 1fr;margin-bottom:18px">
        ${card('Clicks by day', bars([daily], days.map(dayLabel), { h: 220, every: 5 }), '', 'rp_g_chart')}
        ${card('Cost per conversion by campaign', hbars(G.filter((c) => c.conv).map((c) => [c.name.replace(' (Search)', '').replace(' — Search', ''), c.cost / c.conv]), '#53b1fd', m2), '', 'rp_g_cpa')}
      </div>
      <div class="card" id="rp_g_table"><div class="card-h"><div class="rp-sub">${['Campaigns', 'Ad Groups', 'Keywords'].map((s) => `<button class="btn sm ${R.gTab === s ? 'primary' : ''}" data-gt="${s}" id="rp_g_tab_${s.replace(' ', '')}">${s}</button>`).join('')}</div><span class="spacer"></span><span class="muted" style="font-size:14px">Conversions come from Google Ads conversion tracking</span></div>
        ${R.gTab === 'Keywords' ? `<table class="t"><thead><tr><th>Keyword</th><th class="num">Impressions</th><th class="num">Clicks</th><th class="num">CTR</th><th class="num">Avg. CPC</th><th class="num">Conversions</th></tr></thead>
          <tbody>${GKW.map(([k, i, c, cpc, cv]) => `<tr><td class="bold">${esc(k)}</td><td class="num">${n0(i)}</td><td class="num">${c}</td><td class="num">${pct(c, i, 2)}</td><td class="num">${m2(cpc)}</td><td class="num">${cv}</td></tr>`).join('')}</tbody></table>`
        : `<table class="t"><thead><tr><th>${R.gTab === 'Campaigns' ? 'Campaign' : 'Ad group'}</th><th>Status</th><th class="num">Impressions</th><th class="num">Clicks</th><th class="num">CTR</th><th class="num">Avg. CPC</th><th class="num">Cost</th><th class="num">Conversions</th><th class="num">Cost / conv.</th></tr></thead>
          <tbody>${(R.gTab === 'Campaigns' ? G : G.flatMap((c) => [{ ...c, name: c.name.split(' — ')[0] + ' — Exact', impr: Math.round(c.impr * 0.6), clicks: Math.round(c.clicks * 0.62), cost: c.cost * 0.6, conv: Math.ceil(c.conv * 0.6) }])).map((c) => `<tr>
            <td class="bold">${esc(c.name)}</td><td><span class="chip green">${c.status}</span></td><td class="num">${n0(c.impr)}</td><td class="num">${n0(c.clicks)}</td><td class="num">${pct(c.clicks, c.impr, 2)}</td>
            <td class="num">${m2(c.cost / c.clicks)}</td><td class="num">${m2(c.cost)}</td><td class="num bold">${c.conv}</td><td class="num">${c.conv ? m2(c.cost / c.conv) : '—'}</td></tr>`).join('')}
            ${R.gTab === 'Campaigns' ? `<tr><td class="bold">Total</td><td></td><td class="num bold">${n0(t.impr)}</td><td class="num bold">${n0(t.clicks)}</td><td class="num bold">${pct(t.clicks, t.impr, 2)}</td><td class="num bold">${m2(t.cost / t.clicks)}</td><td class="num bold">${m2(t.cost)}</td><td class="num bold">${t.conv}</td><td class="num bold">${m2(t.cost / t.conv)}</td></tr>` : ''}</tbody></table>`}
      </div>`;
    wireHead(view, redraw);
    $$('[data-gt]', view).forEach((b) => (b.onclick = () => { R.gTab = b.dataset.gt; redraw(); }));
  }

  // ================= Facebook Ads =================
  function facebookAds(view) {
    const redraw = () => facebookAds(view);
    const t = F.reduce((a, c) => ({ reach: a.reach + c.reach, impr: a.impr + c.impr, clicks: a.clicks + c.clicks, spend: a.spend + c.spend, leads: a.leads + c.leads }), { reach: 0, impr: 0, clicks: 0, spend: 0, leads: 0 });
    const spend = wave(20, 5, 2.2);
    const k = t.spend / spend.reduce((a, b) => a + b, 0);
    const leadsDaily = days.map((i) => ([2, 4, 7, 9, 11, 12, 15, 16, 18, 20, 22, 25, 27, 29].includes(i) ? 1 : 0));
    view.innerHTML = `${header('Facebook Ads', `<span class="rp-acct"><img src="${LOGO('facebook')}" alt="">Bloom Dental Studio · act_29481736</span>`)}
      <div class="rp-kpis" id="rp_f_kpis">
        ${kpi('Reach', n0(t.reach), '6.3%')}${kpi('Impressions', n0(t.impr), '9.8%')}${kpi('Link clicks', n0(t.clicks), '11.2%')}${kpi('CTR', pct(t.clicks, t.impr, 2), '0.1 pts')}
        ${kpi('Amount spent', m2(t.spend), '4.5%')}${kpi('Leads', t.leads, '3')}${kpi('Cost per lead', m2(t.spend / t.leads), '£6.20', false)}${kpi('Frequency', (t.impr / t.reach).toFixed(2), '')}
      </div>
      <div class="grid" style="grid-template-columns:1.7fr 1fr;margin-bottom:18px">
        ${card('Amount spent by day', bars([spend.map((v) => Math.round(v * k))], days.map(dayLabel), { h: 220, every: 5, colors: ['#6172f3'], fmt: (v) => '£' + v }), '', 'rp_f_chart')}
        ${card('Leads by campaign', donut(F.map((c, i) => [c.name.replace(' — Lead Form', '').replace(' — Website Visitors', ''), c.leads, ['#6172f3', '#22ccee', '#f79009'][i]]), t.leads, 'leads'), '', 'rp_f_leads')}
      </div>
      <div class="card" id="rp_f_table"><div class="card-h"><div class="rp-sub">${['Campaigns', 'Ad Sets', 'Ads'].map((s) => `<button class="btn sm ${R.fTab === s ? 'primary' : ''}" data-ft="${s}">${s}</button>`).join('')}</div><span class="spacer"></span><span class="muted" style="font-size:14px">Leads include Facebook lead forms and website form fills</span></div>
        <table class="t"><thead><tr><th>${R.fTab === 'Campaigns' ? 'Campaign' : R.fTab === 'Ad Sets' ? 'Ad set' : 'Ad'}</th><th>Status</th><th class="num">Reach</th><th class="num">Impressions</th><th class="num">Link clicks</th><th class="num">CTR</th><th class="num">Spent</th><th class="num">Leads</th><th class="num">Cost per lead</th></tr></thead>
        <tbody>${F.map((c, i) => ({ ...c, name: R.fTab === 'Campaigns' ? c.name : R.fTab === 'Ad Sets' ? ['London 25–55 — Invisalign interest', 'London women 25–45 — Beauty', 'Website visitors — 30 days'][i] : ['Video — 12-week before & after', 'Carousel — Whitening results', 'Image — “Still thinking about it?”'][i] })).map((c) => `<tr>
          <td class="bold">${esc(c.name)}</td><td><span class="chip green">${c.status}</span></td><td class="num">${n0(c.reach)}</td><td class="num">${n0(c.impr)}</td><td class="num">${n0(c.clicks)}</td><td class="num">${pct(c.clicks, c.impr, 2)}</td><td class="num">${m2(c.spend)}</td><td class="num bold">${c.leads}</td><td class="num">${m2(c.spend / c.leads)}</td></tr>`).join('')}
          <tr><td class="bold">Total</td><td></td><td class="num bold">${n0(t.reach)}</td><td class="num bold">${n0(t.impr)}</td><td class="num bold">${n0(t.clicks)}</td><td class="num bold">${pct(t.clicks, t.impr, 2)}</td><td class="num bold">${m2(t.spend)}</td><td class="num bold">${t.leads}</td><td class="num bold">${m2(t.spend / t.leads)}</td></tr></tbody></table></div>`;
    wireHead(view, redraw);
    $$('[data-ft]', view).forEach((b) => (b.onclick = () => { R.fTab = b.dataset.ft; redraw(); }));
    void leadsDaily;
  }

  // ================= Attribution =================
  function attribution(view) {
    const redraw = () => attribution(view);
    const rows = ATTR[R.attr];
    const tot = rows.reduce((a, r) => ({ leads: a.leads + r[3], appts: a.appts + r[4], won: a.won + r[5], rev: a.rev + r[6] }), { leads: 0, appts: 0, won: 0, rev: 0 });
    const colors = ['#6172f3', '#22ccee', '#12b76a', '#f79009', '#8098f9', '#ee46bc', '#98a2b3'];
    view.innerHTML = `${header('Attribution Report')}
      <div class="row" style="margin:-4px 0 18px">
        <div class="rp-seg" id="rp_attr_model"><button id="rp_attr_first" class="${R.attr === 'first' ? 'on' : ''}">First Attribution</button><button id="rp_attr_last" class="${R.attr === 'last' ? 'on' : ''}">Last Attribution</button></div>
        <span class="muted" style="font-size:14.5px">${R.attr === 'first' ? 'Credit goes to the source that first brought each contact in.' : 'Credit goes to the last source each contact came from before converting.'}</span></div>
      <div class="rp-kpis">${kpi('Leads', tot.leads, '15%')}${kpi('Appointments', tot.appts, '9%')}${kpi('Won opportunities', tot.won, '1')}${kpi('Revenue', m2(tot.rev), '£1,950')}</div>
      <div class="grid" style="grid-template-columns:1fr 1.4fr;margin-bottom:18px">
        ${card('Leads by source', donut(rows.map((r, i) => [r[1], r[3], colors[i]]), tot.leads, 'leads'), '', 'rp_attr_donut')}
        ${card('Revenue by source', hbars(rows.filter((r) => r[6]).map((r) => [r[1], r[6]]), '#12b76a', (v) => money(v)) + `<p class="muted" style="font-size:13.5px;margin:14px 0 0">Revenue is the value of opportunities marked <b>Won</b>, credited to the contact’s ${R.attr} source.</p>`, '', 'rp_attr_rev')}
      </div>
      <div class="card" id="rp_attr_table"><table class="t"><thead><tr><th>Source</th><th class="num">Leads</th><th class="num">Appointments</th><th class="num">Won</th><th class="num">Revenue</th><th class="num">Lead → won</th></tr></thead>
        <tbody>${rows.map((r) => `<tr class="click" data-src="${r[0]}" id="rp_attr_row_${r[0]}"><td><div class="row"><span class="rp-caret ${R.open[r[0]] ? 'open' : ''}">${icon('right', 16)}</span><div><div class="bold">${esc(r[1])}</div><div class="muted" style="font-size:13px">${esc(r[2])}</div></div></div></td>
            <td class="num bold">${r[3]}</td><td class="num">${r[4]}</td><td class="num">${r[5]}</td><td class="num bold">${r[6] ? m2(r[6]) : '—'}</td><td class="num">${pct(r[5], r[3])}</td></tr>
            ${R.open[r[0]] ? r[7].map((c) => `<tr class="rp-child"><td style="padding-left:56px">${esc(c[0])}</td><td class="num">${c[1]}</td><td class="num">—</td><td class="num">${c[2]}</td><td class="num">${c[3] ? m2(c[3]) : '—'}</td><td class="num">${pct(c[2], c[1])}</td></tr>`).join('') : ''}`).join('')}
          <tr><td class="bold" style="padding-left:48px">Total</td><td class="num bold">${tot.leads}</td><td class="num bold">${tot.appts}</td><td class="num bold">${tot.won}</td><td class="num bold">${m2(tot.rev)}</td><td class="num bold">${pct(tot.won, tot.leads)}</td></tr></tbody></table></div>`;
    wireHead(view, redraw);
    $('#rp_attr_first').onclick = () => { R.attr = 'first'; redraw(); };
    $('#rp_attr_last').onclick = () => { R.attr = 'last'; redraw(); };
    $$('[data-src]', view).forEach((tr) => (tr.onclick = () => { R.open[tr.dataset.src] = !R.open[tr.dataset.src]; redraw(); }));
  }

  // ================= Call Reporting =================
  function calls(view) {
    const redraw = () => calls(view);
    const wk = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const ans = [22, 19, 18, 20, 17, 8, 0], miss = [4, 3, 5, 3, 4, 3, 2];
    const dir = R.callDir || 'All calls';
    const list = CALLS.filter((c) => dir === 'All calls' || c[2] === dir.replace(' only', ''));
    view.innerHTML = `${header('Call Reporting')}
      <div class="row" style="margin:-4px 0 18px;gap:10px"><button class="btn" id="rp_call_dir">${icon('phone', 18)} ${esc(dir)} ${icon('chevron', 16)}</button><button class="btn" id="rp_call_src">${icon('filter', 18)} All numbers ${icon('chevron', 16)}</button></div>
      <div class="rp-kpis six" id="rp_call_kpis">${kpi('Total calls', 128, '11%')}${kpi('Answered', 104, '9%')}${kpi('Missed', 24, '4', false)}${kpi('Answer rate', '81%', '2 pts')}${kpi('Avg. duration', '3m 12s', '')}${kpi('First-time callers', 41, '6')}</div>
      <div class="grid" style="grid-template-columns:1.4fr 1fr;margin-bottom:18px">
        ${card('Calls by day of week', bars([ans, miss], wk, { h: 220, w: 860, stacked: true, colors: ['#53b1fd', '#fda29b'], legend: ['Answered', 'Missed'] }), '', 'rp_call_chart')}
        ${card('Calls by source', donut(CALL_SRC.map(([n, v, c]) => [n, v, c]), 128, 'calls') + '<p class="muted" style="font-size:13.5px;margin:10px 0 0">Each tracking number is tied to one marketing source.</p>', '', 'rp_call_src_card')}
      </div>
      <div class="card" id="rp_call_table"><div class="card-h"><h3>Recent calls</h3><span class="spacer"></span><span class="muted" style="font-size:14px">Recordings are kept for 30 days</span></div>
        <table class="t"><thead><tr><th>Date</th><th>Contact</th><th>Direction</th><th>Status</th><th>Duration</th><th>Source / number</th><th>Handled by</th><th>Recording</th></tr></thead>
        <tbody>${list.map((c, i) => { const ct = c[1] ? data.contacts.find((x) => x.id === c[1]) : null; return `<tr>
          <td class="muted">${esc(c[0])}</td><td>${ct ? `<div class="row">${avatar(ct.name, 28)}<b>${esc(ct.name)}</b></div>` : '<span class="muted">+44 7700 900 456</span>'}</td>
          <td>${icon(c[2] === 'Inbound' ? 'download' : 'upload', 16)} ${c[2]}</td><td><span class="chip ${c[3] === 'Answered' ? 'green' : c[3] === 'Missed' ? 'red' : 'amber'}">${c[3]}</span></td>
          <td>${c[4]}</td><td class="muted">${esc(c[5])}</td><td>${esc(c[6])}</td>
          <td>${c[3] === 'Missed' ? '<span class="muted">—</span>' : `<div class="row" style="gap:0"><button class="rp-play" id="rp_play_${i}" data-play="${i}">${icon('play', 14)}</button><span class="rp-wave" id="rp_wave_${i}">${[8, 14, 10, 18, 12, 16, 9, 13, 7, 15, 11, 6].map((h) => `<i style="height:${h}px"></i>`).join('')}</span></div>`}</td></tr>`; }).join('')}</tbody></table></div>`;
    wireHead(view, redraw);
    $('#rp_call_dir').onclick = (e) => KY.menu(e.currentTarget, ['All calls', 'Inbound only', 'Outbound only'].map((d) => ({ label: d, icon: d === dir ? 'check' : 'blank', onClick: () => { R.callDir = d; redraw(); } })));
    $('#rp_call_src').onclick = (e) => KY.menu(e.currentTarget, ['All numbers', ...CALL_SRC.map((s) => s[0])].map((d) => ({ label: d })));
    $$('[data-play]', view).forEach((b) => (b.onclick = () => {
      const w = $(`#rp_wave_${b.dataset.play}`);
      const on = !w.classList.contains('playing');
      $$('.rp-wave.playing').forEach((x) => x.classList.remove('playing'));
      $$('.rp-play').forEach((x) => (x.innerHTML = icon('play', 14)));
      if (on) { w.classList.add('playing'); b.innerHTML = icon('pause', 14); }
    }));
  }

  // ================= Appointment Report =================
  function appointments(view) {
    const redraw = () => appointments(view);
    const cals = [['New Patient Consultation', 12, 11, 1, 0], ['Invisalign Free Scan', 9, 8, 1, 0], ['Check-up & Clean', 12, 10, 1, 1], ['Whitening Session', 5, 4, 0, 1]];
    const cal = R.cal || 'All calendars';
    const rows = cal === 'All calendars' ? cals : cals.filter((c) => c[0] === cal);
    const t = rows.reduce((a, c) => [a[0] + c[1], a[1] + c[2], a[2] + c[3], a[3] + c[4]], [0, 0, 0, 0]);
    const split = (n) => { const a = Math.round((n * 24) / 38), b = Math.round((n * 9) / 38); return [['Online booking widget', a, '#53b1fd'], ['Booked by staff', b, '#8098f9'], ['AI agent', Math.max(0, n - a - b), '#ee46bc']]; };
    const color = (n) => (data.calendars.find((k) => k.name === n) || {}).color || '#53b1fd';
    view.innerHTML = `${header('Appointment Report')}
      <div class="row" style="margin:-4px 0 18px;gap:10px"><button class="btn" id="rp_appt_cal">${icon('calendar', 18)} ${esc(cal)} ${icon('chevron', 16)}</button><button class="btn" id="rp_appt_user">${icon('user', 18)} All team members ${icon('chevron', 16)}</button></div>
      <div class="rp-kpis six" id="rp_appt_kpis">${kpi('Booked', t[0], '6')}${kpi('Showed', t[1], '5')}${kpi('No-shows', t[2], '')}${kpi('Cancelled', t[3], '')}${kpi('Show rate', pct(t[1], t[1] + t[2], 0), '4 pts')}${kpi('Booked online', '63%', '8 pts')}</div>
      <div class="grid" style="grid-template-columns:1.4fr 1fr;margin-bottom:18px">
        ${card('Appointments by week', bars([[8, 10, 9, 6], [1, 0, 1, 1], [1, 1, 0, 0]].map((s) => (cal === 'All calendars' ? s : s.map((v) => Math.round((v * t[0]) / 38)))), ['22–28 Sep', '29 Sep–5 Oct', '6–12 Oct', '13–19 Oct'], { h: 220, w: 860, stacked: true, colors: ['#12b76a', '#f04438', '#d0d5dd'], legend: ['Showed', 'No-show', 'Cancelled'] }), '', 'rp_appt_chart')}
        ${card('How appointments were booked', donut(split(t[0]), t[0], 'booked'), '', 'rp_appt_src')}
      </div>
      <div class="card" id="rp_appt_table"><table class="t"><thead><tr><th>Calendar</th><th class="num">Booked</th><th class="num">Showed</th><th class="num">No-shows</th><th class="num">Cancelled</th><th class="num">Show rate</th></tr></thead>
        <tbody>${rows.map((c) => `<tr><td><div class="row"><span style="width:10px;height:10px;border-radius:50%;background:${color(c[0])}"></span><b>${esc(c[0])}</b></div></td><td class="num bold">${c[1]}</td><td class="num">${c[2]}</td><td class="num">${c[3]}</td><td class="num">${c[4]}</td><td class="num bold">${pct(c[2], c[2] + c[3], 0)}</td></tr>`).join('')}
          ${rows.length > 1 ? `<tr><td class="bold">Total</td><td class="num bold">${t[0]}</td><td class="num bold">${t[1]}</td><td class="num bold">${t[2]}</td><td class="num bold">${t[3]}</td><td class="num bold">${pct(t[1], t[1] + t[2], 0)}</td></tr>` : ''}</tbody></table></div>`;
    wireHead(view, redraw);
    $('#rp_appt_cal').onclick = (e) => KY.menu(e.currentTarget, ['All calendars', ...cals.map((c) => c[0])].map((d) => ({ label: d, icon: d === cal ? 'check' : 'blank', onClick: () => { R.cal = d; redraw(); } })));
    $('#rp_appt_user').onclick = (e) => KY.menu(e.currentTarget, ['All team members', ...data.team.map((m) => m.name)].map((d) => ({ label: d })));
  }

  // ================= Agent Reporting =================
  function agents(view) {
    const redraw = () => agents(view);
    const rows = data.team.map((m) => {
      const o = data.opportunities.filter((x) => x.owner === m.name);
      const won = o.filter((x) => x.status === 'won');
      return { name: m.name, role: m.role, total: o.length, open: o.filter((x) => x.status === 'open').length, won: won.length, lost: o.filter((x) => x.status === 'lost').length, aband: o.filter((x) => x.status === 'abandoned').length, value: won.reduce((a, x) => a + x.value, 0), ...AGENT[m.name] };
    });
    const tv = rows.reduce((a, r) => a + r.value, 0);
    view.innerHTML = `${header('Agent Reporting')}
      <div class="rp-kpis">${kpi('Opportunities', rows.reduce((a, r) => a + r.total, 0), '4')}${kpi('Won', rows.reduce((a, r) => a + r.won, 0), '1')}${kpi('Won value', money(tv), '£1,950')}${kpi('Calls handled', rows.reduce((a, r) => a + r.calls, 0), '11%')}</div>
      <div class="grid" style="grid-template-columns:1fr 1fr;margin-bottom:18px">
        ${card('Won value by team member', hbars(rows.map((r) => [r.name, r.value]), '#12b76a', (v) => money(v)), '', 'rp_ag_value')}
        ${card('Activity by team member', bars([rows.map((r) => r.calls), rows.map((r) => r.appts), rows.map((r) => r.email)], rows.map((r) => r.name), { h: 200, w: 740, colors: ['#53b1fd', '#8098f9', '#22ccee'], legend: ['Calls', 'Appointments booked', 'Emails'] }), '', 'rp_ag_activity')}
      </div>
      <div class="card" id="rp_ag_table"><table class="t"><thead><tr><th>Team member</th><th class="num">Opportunities</th><th class="num">Open</th><th class="num">Won</th><th class="num">Lost</th><th class="num">Abandoned</th><th class="num">Won value</th><th class="num">Win rate</th><th class="num">Calls</th><th class="num">SMS</th><th class="num">Emails</th><th class="num">Avg. first reply</th></tr></thead>
        <tbody>${rows.map((r) => `<tr id="rp_ag_row_${r.name.split(' ')[0].toLowerCase()}"><td><div class="row">${avatar(r.name, 30)}<div><b>${esc(r.name)}</b><div class="muted" style="font-size:13px">${r.role}</div></div></div></td>
          <td class="num bold">${r.total}</td><td class="num">${r.open}</td><td class="num">${r.won}</td><td class="num">${r.lost}</td><td class="num">${r.aband}</td><td class="num bold">${money(r.value)}</td>
          <td class="num">${pct(r.won, r.total, 0)}</td><td class="num">${r.calls}</td><td class="num">${r.sms}</td><td class="num">${r.email}</td><td class="num">${r.resp}</td></tr>`).join('')}</tbody></table></div>`;
    wireHead(view, redraw);
  }

  KY.screen('reporting', {
    tabs: [{ id: 'google-ads', label: 'Google Ads' }, { id: 'facebook-ads', label: 'Facebook Ads' }, { id: 'attribution', label: 'Attribution Report' }, { id: 'calls', label: 'Call Reporting' }, { id: 'appointments', label: 'Appointment Report' }, { id: 'agents', label: 'Agent Reporting' }],
    render(view, { tab }) {
      css();
      ({ 'google-ads': googleAds, 'facebook-ads': facebookAds, attribution, calls, appointments, agents }[tab] || googleAds)(view);
    },
  });
})();
