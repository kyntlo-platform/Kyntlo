// Reputation — overview, review requests, reviews (with Reviews AI replies), widgets, listings and settings.
// Mirrors HighLevel's Reputation Management module. Demo route for an account that hasn't connected
// Google yet: #/reputation/overview/not-connected
(() => {
  const { esc, icon, $, $$, avatar } = KY;
  const data = KY.data;
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const contactBy = (name) => data.contacts.find((c) => c.name === name);

  // ---- Screen data ----
  const S = {
    connected: true, setupSeen: false,
    reviewFilter: 'All',
    requestFilter: 'All',
    link: 'google',
    aiMode: 'Suggestive',
    tone: 'Friendly',
    widgets: [{ id: 'wg1', name: 'Homepage carousel', layout: 'Carousel', updated: '12 Oct 2026', views: 1840 }],
  };
  const reviews = (data.repReviews = data.repReviews || [
    ...data.reviews.map((r) => ({ ...r })),
    { name: 'Sophie Turner', rating: 5, text: 'Free scan was so quick and they showed me exactly how my teeth will move. Starting Invisalign next month!', source: 'Google', date: '2 weeks ago', replied: true },
    { name: 'Noah Williams', rating: 5, text: 'Friendly reception team and they got me in the same week. Great NHS check-up.', source: 'Facebook', date: '3 weeks ago', replied: true },
    { name: 'Grace Wright', rating: 3, text: 'Treatment was good but I waited 25 minutes past my appointment time.', source: 'Google', date: '3 weeks ago', replied: false },
    { name: 'Isla Thompson', rating: 5, text: "Best dentist I've been to in London. Priya is amazing!", source: 'Google', date: '1 month ago', replied: true },
  ]);
  const replies = {
    'Henry Adams': 'Thank you so much, Henry! It was a pleasure looking after you through your implant journey. — Sarah, Bloom Dental Studio',
    'Chloe Scott': "Thanks Chloe! We're so pleased your Invisalign journey has been easy. Can't wait to see your final smile! — The Bloom team",
    'Sophie Turner': "Thank you Sophie! We're excited to get your Invisalign started. See you next month! — Sarah, Bloom Dental Studio",
    'Noah Williams': 'Thanks for the kind words, Noah! See you at your next check-up. — The Bloom team',
    'Isla Thompson': "Thank you Isla! We'll make sure Priya sees this. — Sarah, Bloom Dental Studio",
  };
  const AI = {
    'Emma Clarke': "Hi Emma, thank you so much for the lovely five-star review! We're thrilled you love your whitening results, and it means a lot that the team made you feel comfortable. Enjoy that brighter smile, and we'll see you at your next visit. — Sarah, Bloom Dental Studio",
    'Oliver King': "Hi Oliver, thank you for taking the time to leave a review, and we're glad you found your check-up thorough! You're right that parking nearby can be tricky. The Cramer Street car park is a two-minute walk away, and we'll include directions in your next reminder. See you soon! — Sarah, Bloom Dental Studio",
    'Grace Wright': "Hi Grace, thank you for your honest feedback, and we're sorry you were kept waiting. That isn't the experience we want for you. We're glad you were happy with your treatment, and we'd love to hear more — please call us on 020 7946 0321 and ask for Sarah. — Sarah, Bloom Dental Studio",
  };
  const requests = [
    ['Emma Clarke', 'SMS', 'Review Request After Visit', 'Yesterday, 16:40', 'Reviewed'],
    ['Henry Adams', 'SMS', 'Review Request After Visit', '17 Oct 2026', 'Reviewed'],
    ['Liam Patel', 'Email', 'Sarah Mitchell', '17 Oct 2026', 'Clicked'],
    ['Daniel Hughes', 'SMS', 'Review Request After Visit', '16 Oct 2026', 'Delivered'],
    ['Ava Robinson', 'SMS', 'Review Request After Visit', '15 Oct 2026', 'Delivered'],
    ['Oliver King', 'Email', 'Review Request After Visit', '6 Oct 2026', 'Reviewed'],
    ['Grace Wright', 'SMS', 'Priya Shah', '29 Sep 2026', 'Reviewed'],
  ];
  const MONTHS = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const INVITES = [38, 44, 51, 55, 58, 66];
  const GOT = [12, 15, 19, 22, 26, 33];
  const RATINGS = [108, 13, 4, 1, 1];
  const SMS_TPL = "Hi {{contact.first_name}}, thanks for visiting Bloom Dental Studio today! We'd love to hear how it went. Could you leave us a quick review? {{location.review_link}}";

  const stars = (n, size = 18) => `<span class="rp-stars">${[1, 2, 3, 4, 5].map((i) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" style="fill:${i <= n ? '#fdb022' : '#eaecf0'}"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>`).join('')}</span>`;
  const srcBadge = (s) => `<span class="rp-src ${s === 'Google' ? 'g' : 'f'}">${icon(s === 'Google' ? 'google' : 'facebook', 15)}${s}</span>`;
  const statusChip = (s) => `<span class="chip ${{ Reviewed: 'green', Clicked: 'blue', Delivered: '', Sent: 'purple', Scheduled: 'amber' }[s] || ''}">${esc(s)}</span>`;

  function css() {
    if ($('#css-reputation')) return;
    const st = document.createElement('style');
    st.id = 'css-reputation';
    st.textContent = `
      .rp-stars { display:inline-flex; gap:2px; vertical-align:middle; }
      .rp-src { display:inline-flex; align-items:center; gap:5px; font-size:13px; font-weight:600; padding:3px 9px; border-radius:999px; }
      .rp-src.g { background:#eef4ff; color:#1a56db; } .rp-src.f { background:#eff8ff; color:#175cd3; }
      .rp-kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:20px; }
      .rp-kpi { padding:18px 20px; }
      .rp-kpi .k { color:var(--muted); font-size:14px; font-weight:500; display:flex; align-items:center; gap:8px; }
      .rp-kpi .v { font-size:32px; font-weight:700; margin-top:6px; display:flex; align-items:center; gap:10px; }
      .rp-kpi .d { font-size:13px; font-weight:600; color:#027a48; margin-top:2px; }
      .rp-ico { width:34px; height:34px; border-radius:9px; display:grid; place-items:center; }
      .rp-bar { display:flex; align-items:center; gap:10px; margin:9px 0; font-size:14px; }
      .rp-bar .track { flex:1; height:10px; border-radius:9px; background:#f2f4f7; overflow:hidden; }
      .rp-bar .fill { height:100%; border-radius:9px; background:#fdb022; }
      .rp-review { padding:18px 20px; border-bottom:1px solid var(--line-soft); }
      .rp-review:last-child { border-bottom:0; }
      .rp-reply { margin:12px 0 0 46px; padding:12px 14px; background:#f9fafb; border-left:3px solid var(--blue); border-radius:8px; font-size:15px; }
      .rp-compose { margin:12px 0 0 46px; }
      .rp-compose textarea { min-height:110px; }
      .rp-ai { background:linear-gradient(90deg,#7f56d9,#ee46bc); color:#fff; border:0; }
      .rp-ai:hover { background:linear-gradient(90deg,#6941c6,#dd2590); }
      .rp-typing::after { content:'▍'; animation:rpblink .8s infinite; color:#7f56d9; }
      @keyframes rpblink { 50% { opacity:0 } }
      .rp-banner { display:flex; align-items:center; gap:16px; padding:18px 20px; border-radius:var(--radius); background:linear-gradient(90deg,#eff4ff,#f5f3ff); border:1px solid #c7d7fe; margin-bottom:20px; }
      .rp-side a { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:8px; color:var(--ink-2); font-weight:500; cursor:pointer; }
      .rp-side a.on { background:var(--blue-soft); color:#004eeb; font-weight:600; }
      .rp-opt { display:flex; gap:12px; padding:14px 16px; border:1px solid var(--line); border-radius:10px; margin-bottom:10px; cursor:pointer; align-items:flex-start; }
      .rp-opt.on { border-color:var(--blue); background:var(--blue-soft); }
      .rp-opt .dot { width:18px; height:18px; border-radius:50%; border:2px solid var(--line); flex:none; margin-top:2px; }
      .rp-opt.on .dot { border:5px solid var(--blue); }
      .rp-seg { align-self:flex-start; display:inline-flex; border:1px solid var(--line); border-radius:8px; overflow:hidden; }
      .rp-seg button { border:0; background:#fff; padding:8px 14px; font-weight:600; font-size:14px; color:var(--ink-2); border-right:1px solid var(--line); }
      .rp-seg button:last-child { border-right:0; }
      .rp-seg button.on { background:var(--blue); color:#fff; }
      .rp-layout { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
      .rp-layout button { border:1px solid var(--line); border-radius:10px; background:#fff; padding:12px 6px 8px; font-size:13px; font-weight:600; color:var(--ink-2); display:flex; flex-direction:column; align-items:center; gap:6px; }
      .rp-layout button.on { border-color:var(--blue); background:var(--blue-soft); color:#004eeb; box-shadow:0 0 0 3px #d1e0ff; }
      .rp-mini { width:64px; height:40px; display:grid; gap:3px; }
      .rp-mini i { background:#c7d7fe; border-radius:3px; display:block; }
      .rp-frame { border:1px solid var(--line); border-radius:12px; overflow:hidden; background:#fff; box-shadow:var(--shadow); }
      .rp-frame .bar { height:40px; background:#f2f4f7; display:flex; align-items:center; gap:8px; padding:0 14px; border-bottom:1px solid var(--line-soft); }
      .rp-frame .bar i { width:11px; height:11px; border-radius:50%; background:#d0d5dd; display:block; }
      .rp-frame .url { margin-left:10px; background:#fff; border-radius:6px; padding:3px 12px; font-size:13px; color:var(--muted); flex:1; max-width:420px; }
      .rp-w { padding:22px; border-radius:12px; }
      .rp-w.dark { background:#101828; color:#fff; }
      .rp-w.dark .rp-card { background:#1d2939; border-color:#344054; color:#e4e7ec; }
      .rp-card { border:1px solid var(--line-soft); border-radius:10px; padding:14px; background:#fff; font-size:14px; }
      .rp-code { font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace; background:#101828; color:#d1e9ff; border-radius:10px; padding:16px; white-space:pre-wrap; word-break:break-all; }
      .gg { font-family:Roboto,Arial,sans-serif; }
      .gg .acct { display:flex; align-items:center; gap:14px; padding:14px 6px; border-bottom:1px solid #e0e0e0; cursor:pointer; }
      .gg .acct:hover { background:#f8fafd; }
    `;
    document.head.appendChild(st);
  }

  const head = (title, sub, actions = '') => `<div class="page-head"><h1>${esc(title)}</h1>${sub ? `<span class="sub">${sub}</span>` : ''}<div class="actions">${actions}</div></div>`;
  const sendBtn = `<button class="btn primary" id="rp_send">${icon('send', 18)} Send Review Request</button>`;

  function chart() {
    const max = 70;
    return `<div class="row" style="align-items:flex-end;gap:22px;height:210px;padding:10px 10px 0">${MONTHS.map((m, i) => `
      <div style="flex:1;text-align:center;display:flex;flex-direction:column;justify-content:flex-end;height:100%">
        <div class="row" style="gap:5px;align-items:flex-end;justify-content:center;flex:1">
          <div title="Invites" style="width:22px;height:${(INVITES[i] / max) * 100}%;background:#53b1fd;border-radius:5px 5px 0 0"></div>
          <div title="Reviews" style="width:22px;height:${(GOT[i] / max) * 100}%;background:#8098f9;border-radius:5px 5px 0 0"></div></div>
        <div class="muted" style="font-size:13px;margin-top:8px">${m}</div></div>`).join('')}</div>
      <div class="row" style="justify-content:center;gap:22px;margin-top:12px;font-size:14px"><span class="row" style="gap:6px"><i style="width:14px;height:14px;border-radius:3px;background:#53b1fd;display:block"></i>Invites sent</span><span class="row" style="gap:6px"><i style="width:14px;height:14px;border-radius:3px;background:#8098f9;display:block"></i>Reviews received</span></div>`;
  }

  function overview(view) {
    if (!S.connected) return overviewEmpty(view);
    const total = RATINGS.reduce((a, b) => a + b, 0);
    view.innerHTML = `
      ${head('Overview', '', `<button class="btn" id="rp_range">${icon('calendar', 18)} Last 6 months ${icon('chevron', 16)}</button>${sendBtn}`)}
      <div class="rp-kpis" id="rp_kpis">
        <div class="card rp-kpi" id="rp_kpi_invites"><div class="k"><span class="rp-ico" style="background:#eff8ff;color:#1570ef">${icon('send', 18)}</span>Invites sent</div><div class="v">312</div><div class="d">▲ 18% vs previous 6 months</div></div>
        <div class="card rp-kpi" id="rp_kpi_reviews"><div class="k"><span class="rp-ico" style="background:#f4f3ff;color:#6938ef">${icon('chat', 18)}</span>Reviews received</div><div class="v">${total}</div><div class="d">▲ 41% vs previous 6 months</div></div>
        <div class="card rp-kpi" id="rp_kpi_rating"><div class="k"><span class="rp-ico" style="background:#fffaeb;color:#dc6803">${icon('star', 18)}</span>Average rating</div><div class="v">4.8 ${stars(5, 22)}</div><div class="d">Google 4.8 · Facebook 4.9</div></div>
        <div class="card rp-kpi" id="rp_kpi_sentiment"><div class="k"><span class="rp-ico" style="background:#ecfdf3;color:#039855">${icon('smile', 18)}</span>Sentiment</div><div class="v">94%<span class="chip green">Positive</span></div>
          <div style="display:flex;height:8px;border-radius:9px;overflow:hidden;margin-top:8px"><i style="width:94%;background:#12b76a"></i><i style="width:4%;background:#fdb022"></i><i style="width:2%;background:#f04438"></i></div></div>
      </div>
      <div class="grid" style="grid-template-columns:1.5fr 1fr 1fr;margin-bottom:20px">
        <div class="card" id="rp_trends"><div class="card-h"><h3>Invite trends</h3><span class="spacer"></span><span class="muted" style="font-size:14px">27.6% of invites became reviews</span></div><div class="card-b">${chart()}</div></div>
        <div class="card" id="rp_breakdown"><div class="card-h"><h3>Ratings</h3></div><div class="card-b">
          ${RATINGS.map((n, i) => `<div class="rp-bar"><b style="width:28px">${5 - i}★</b><div class="track"><div class="fill" style="width:${(n / RATINGS[0]) * 100}%"></div></div><span class="muted" style="width:34px;text-align:right">${n}</span></div>`).join('')}
          <div class="muted" style="font-size:14px;margin-top:14px">${total} reviews in total</div></div></div>
        <div class="card" id="rp_sources"><div class="card-h"><h3>Review sources</h3></div><div class="card-b">
          <div class="row" style="margin:6px 0 16px">${srcBadge('Google')}<span class="spacer"></span><b>102</b><span class="muted">· 4.8★</span></div>
          <div class="row" style="margin-bottom:18px">${srcBadge('Facebook')}<span class="spacer"></span><b>25</b><span class="muted">· 4.9★</span></div>
          <div style="border-top:1px solid var(--line-soft);padding-top:14px"><div class="row"><b>Monthly invite goal</b><span class="spacer"></span><span class="muted">48 / 60</span></div>
          <div class="track" style="height:10px;border-radius:9px;background:#f2f4f7;margin-top:10px"><div style="width:80%;height:100%;border-radius:9px;background:var(--blue)"></div></div></div>
        </div></div>
      </div>
      <div class="card" id="rp_latest"><div class="card-h"><h3>Latest reviews</h3><span class="spacer"></span><a href="#/reputation/reviews" id="rp_viewall">View all reviews</a></div>
        ${reviews.slice(0, 3).map((r) => reviewRow(r, -1, true)).join('')}</div>`;
    $('#rp_send').onclick = () => sendRequest();
    $('#rp_range').onclick = (e) => KY.menu(e.currentTarget, ['Last 30 days', 'Last 3 months', 'Last 6 months', 'This year'].map((l) => ({ label: l })));
  }

  function overviewEmpty(view) {
    view.innerHTML = `
      ${head('Overview', '', sendBtn)}
      <div class="rp-banner" id="rp_connect_banner">
        <span class="rp-ico" style="width:52px;height:52px;background:#fff;color:#1a56db;border-radius:12px">${icon('google', 28)}</span>
        <div style="flex:1"><div class="bold" style="font-size:18px">Connect your Google Business Profile</div>
          <div class="muted">Bring your Google reviews into Kyntlo, reply to them from here, and get your review link for requests.</div></div>
        <button class="btn primary" id="rp_connect_google">${icon('link', 18)} Connect Google</button>
      </div>
      <div class="rp-kpis">${['Invites sent', 'Reviews received', 'Average rating', 'Sentiment'].map((k) => `<div class="card rp-kpi"><div class="k">${k}</div><div class="v faint">—</div><div class="muted" style="font-size:13px">No data yet</div></div>`).join('')}</div>
      <div class="grid" style="grid-template-columns:1fr 1fr">
        <div class="card" id="rp_sources_setup"><div class="card-h"><h3>Review sources</h3></div><div class="card-b">
          <div class="row" style="padding:10px 0;border-bottom:1px solid var(--line-soft)">${srcBadge('Google')}<span class="muted">Google Business Profile</span><span class="spacer"></span><span class="chip">Not connected</span></div>
          <div class="row" style="padding:10px 0">${srcBadge('Facebook')}<span class="muted">Facebook Page recommendations</span><span class="spacer"></span><button class="btn sm" id="rp_connect_fb">Connect</button></div></div></div>
        <div class="card"><div class="empty" style="padding:44px 20px">${icon('star', 34)}<div class="big" style="margin-top:8px">No reviews yet</div>Once Google is connected, your existing reviews appear here within a few minutes.</div></div>
      </div>`;
    $('#rp_connect_google').onclick = connectGoogle;
    $('#rp_connect_fb').onclick = () => KY.toast('Facebook connects from Settings → Integrations', 'warn');
    $('#rp_send').onclick = () => KY.toast('Connect a review source first so requests have a review link', 'warn');
  }

  function connectGoogle() {
    const me = data.me;
    const box = KY.modal({
      title: 'Sign in with Google',
      body: `<div class="gg" id="gg_step"></div>`,
    });
    const step = $('#gg_step', box);
    const one = () => {
      step.innerHTML = `<div style="text-align:center;margin-bottom:14px"><div style="color:#4285f4">${icon('google', 36)}</div>
          <div style="font-size:22px;margin-top:8px">Choose an account</div><div class="muted">to continue to <b style="color:var(--ink)">Kyntlo</b></div></div>
        <div class="acct" id="gg_account">${avatar(me.name, 36)}<div><div class="bold">${esc(me.name)}</div><div class="muted" style="font-size:14px">${esc(me.email)}</div></div></div>
        <div class="acct">${icon('user', 22)}<span>Use another account</span></div>`;
      $('#gg_account', box).onclick = two;
    };
    const two = () => {
      step.innerHTML = `<div style="text-align:center;margin-bottom:10px"><div style="font-size:21px">Kyntlo wants to access your Google Account</div><div class="muted" style="margin-top:4px">${esc(me.email)}</div></div>
        <div style="margin:16px 0"><b>This will allow Kyntlo to:</b>
          <div class="row" style="margin:12px 0;align-items:flex-start">${icon('building', 20)}<span>See, edit, create and delete your Google business listings, and reply to reviews</span></div>
          <div class="row" style="margin:12px 0;align-items:flex-start">${icon('user', 20)}<span>See your primary Google Account email address</span></div></div>
        <div class="row" style="justify-content:flex-end;gap:10px"><button class="btn">Cancel</button><button class="btn primary" id="gg_allow">Allow</button></div>`;
      $('#gg_allow', box).onclick = three;
    };
    const three = () => {
      $('.modal-h h3', box).textContent = 'Select a Google Business Profile';
      step.innerHTML = `<p style="margin-top:0">Pick the location that matches this sub-account. Its reviews and messages will come into Kyntlo.</p>
        ${[['Bloom Dental Studio', '14 Marylebone High Street, London W1U 4NS', 'Verified'], ['Bloom Dental — Kensington', '210 Kensington High Street, London W8 7RG', 'Verified']].map(([n, a, v], i) =>
          `<div class="rp-opt ${i === 0 ? 'on' : ''}" id="gbp_loc_${i}"><span class="dot"></span><div style="flex:1"><b>${n}</b><div class="muted" style="font-size:14px">${a}</div></div><span class="chip green">${v}</span></div>`).join('')}
        <div class="row" style="justify-content:flex-end;gap:10px;margin-top:6px"><button class="btn">Cancel</button><button class="btn primary" id="gbp_save">Connect location</button></div>`;
      $$('.rp-opt', box).forEach((o) => (o.onclick = () => { $$('.rp-opt', box).forEach((x) => x.classList.remove('on')); o.classList.add('on'); }));
      $('#gbp_save', box).onclick = () => {
        S.connected = true;
        box.closest('.overlay').remove();
        KY.toast('Google Business Profile connected — importing 102 reviews');
        KY.go('#/reputation/overview');
      };
    };
    one();
  }

  function reviewRow(r, i, compact) {
    const reply = r.replied && (r.reply || replies[r.name] || 'Thank you so much for your review! — The Bloom team');
    return `<div class="rp-review" id="rv_${i >= 0 ? i : 'l' + slug(r.name)}">
      <div class="row" style="align-items:flex-start">${avatar(r.name, 36)}
        <div style="flex:1"><div class="row" style="gap:10px"><b>${esc(r.name)}</b>${stars(r.rating)}${srcBadge(r.source)}<span class="faint" style="font-size:14px">${esc(r.date)}</span>
          <span class="spacer"></span>${r.replied ? '<span class="chip green">Replied</span>' : '<span class="chip amber">Needs reply</span>'}
          ${!compact && !r.replied ? `<button class="btn sm" data-reply="${i}" id="rv_reply_${i}">${icon('chat', 16)} Reply</button>` : ''}</div>
          <div style="margin-top:6px">${esc(r.text)}</div></div></div>
      ${reply && !compact ? `<div class="rp-reply"><div class="muted" style="font-size:13px;margin-bottom:4px">${icon('send', 14)} Reply from Bloom Dental Studio${r.justNow ? ' · just now' : ''}</div>${esc(reply)}</div>` : ''}
      ${!compact ? `<div class="rp-compose" id="rv_box_${i}" style="display:none"></div>` : ''}
    </div>`;
  }

  function reviewsView(view) {
    if (!S.connected) { overviewEmpty(view); $('.page-head h1', view).textContent = 'Reviews'; return; }
    const filters = { All: () => true, 'Needs reply': (r) => !r.replied, Google: (r) => r.source === 'Google', Facebook: (r) => r.source === 'Facebook', '5 stars': (r) => r.rating === 5, '3 stars & below': (r) => r.rating <= 3 };
    const list = reviews.map((r, i) => [r, i]).filter(([r]) => filters[S.reviewFilter](r));
    view.innerHTML = `
      ${head('Reviews', '', `<button class="btn" id="rv_settings">${icon('sparkle', 18)} Reviews AI settings</button>${sendBtn}`)}
      <div class="rp-banner" style="padding:14px 18px" id="rv_ai_banner"><span class="rp-ico" style="background:linear-gradient(135deg,#7f56d9,#ee46bc);color:#fff">${icon('sparkle', 18)}</span>
        <div style="flex:1"><b>Reviews AI is in ${esc(S.aiMode)} mode.</b> <span class="muted">${S.aiMode === 'Auto-pilot' ? 'AI replies to new reviews for you automatically.' : 'Click Reply with AI and an on-brand reply is drafted for you to check and post.'}</span></div></div>
      <div class="row" style="gap:6px;margin-bottom:14px" id="rv_filters">${Object.keys(filters).map((f) => `<button class="btn sm ${f === S.reviewFilter ? 'primary' : ''}" data-f="${f}" id="rv_f_${slug(f)}">${f}${f === 'Needs reply' ? ` <span class="chip ${f === S.reviewFilter ? '' : 'amber'}" style="height:20px;padding:0 7px">${reviews.filter((r) => !r.replied).length}</span>` : ''}</button>`).join('')}</div>
      <div class="card" id="rv_list">${list.map(([r, i]) => reviewRow(r, i)).join('') || '<div class="empty"><div class="big">All caught up</div>Every review has a reply.</div>'}
        <div class="ct-foot" style="display:flex;padding:12px 20px;color:var(--muted);font-size:14px;border-top:1px solid var(--line-soft)">Showing ${list.length} of ${S.reviewFilter === 'All' ? 127 : list.length} reviews</div></div>`;
    $('#rp_send').onclick = () => sendRequest();
    $('#rv_settings').onclick = () => KY.go('#/reputation/settings/ai');
    $$('[data-f]', view).forEach((b) => (b.onclick = () => { S.reviewFilter = b.dataset.f; reviewsView(view); }));
    $$('[data-reply]', view).forEach((b) => (b.onclick = () => openReply(view, +b.dataset.reply)));
  }

  function openReply(view, i) {
    const r = reviews[i];
    const box = $(`#rv_box_${i}`, view);
    box.style.display = 'block';
    $(`#rv_reply_${i}`, view)?.style.setProperty('display', 'none');
    box.innerHTML = `<textarea class="input" id="rv_text_${i}" placeholder="Write a public reply to ${esc(r.name.split(' ')[0])}…"></textarea>
      <div class="row" style="margin-top:10px"><button class="btn rp-ai" id="rv_ai_${i}">${icon('sparkle', 18)} Reply with AI</button>
        <span class="muted" style="font-size:13px">Your reply is posted publicly on ${esc(r.source)}.</span><span class="spacer"></span>
        <button class="btn" id="rv_cancel_${i}">Cancel</button><button class="btn primary" id="rv_post_${i}">Post reply</button></div>`;
    const ta = $(`#rv_text_${i}`, box);
    ta.focus();
    $(`#rv_cancel_${i}`, box).onclick = () => { box.style.display = 'none'; box.innerHTML = ''; $(`#rv_reply_${i}`, view)?.style.removeProperty('display'); };
    $(`#rv_ai_${i}`, box).onclick = () => {
      const text = AI[r.name] || `Hi ${r.name.split(' ')[0]}, thank you so much for your review! We really appreciate you choosing Bloom Dental Studio. — Sarah, Bloom Dental Studio`;
      const btn = $(`#rv_ai_${i}`, box);
      btn.innerHTML = `${icon('sparkle', 18)} Writing…`;
      ta.value = ''; ta.classList.add('rp-typing');
      let k = 0;
      const tick = setInterval(() => {
        k += 4; ta.value = text.slice(0, k);
        if (k >= text.length) { clearInterval(tick); ta.classList.remove('rp-typing'); btn.innerHTML = `${icon('sparkle', 18)} Regenerate`; }
      }, 18);
    };
    $(`#rv_post_${i}`, box).onclick = () => {
      if (!ta.value.trim()) return KY.toast('Write a reply first', 'warn');
      r.replied = true; r.reply = ta.value.trim(); r.justNow = true;
      reviewsView(view); KY.toast(`Reply posted to ${r.source}`);
    };
  }

  function sendRequest(prefill) {
    let pick = prefill ? contactBy(prefill) : null;
    let channel = 'SMS';
    const box = KY.modal({
      title: 'Send Review Request',
      body: `<div class="field"><label>Contact</label><div class="search"><span>${icon('search', 18)}</span><input class="input" id="rq_search" placeholder="Search by name, email or phone"></div><div id="rq_results"></div></div>
        <div class="field"><label>Send via</label><div class="rp-seg"><button id="rq_sms" class="on">${icon('sms', 16)} SMS</button><button id="rq_email">${icon('mail', 16)} Email</button></div></div>
        <div class="field"><label>Preview</label><div class="card" style="padding:14px;box-shadow:none;background:#f9fafb;font-size:15px" id="rq_preview"></div>
          <div class="muted" style="font-size:13px;margin-top:6px">Edit this message in Reputation → Settings → Review requests.</div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Send', primary: true, id: 'rq_send', onClick: (close) => {
        if (!pick) return KY.toast('Choose a contact first', 'warn');
        requests.unshift([pick.name, channel, data.me.name, 'Just now', 'Sent']);
        close(); KY.toast(`Review request sent to ${pick.name} by ${channel}`);
        if (location.hash.startsWith('#/reputation/requests')) KY.go('#/reputation/requests');
        else KY.go('#/reputation/requests');
      } }],
    });
    const draw = () => {
      const q = $('#rq_search', box).value.trim().toLowerCase();
      $('#rq_results', box).innerHTML = pick
        ? `<div class="card row" style="padding:10px 12px;margin-top:8px;box-shadow:none;border-color:#84adff" id="rq_selected">${avatar(pick.name, 30)}<div><b>${esc(pick.name)}</b><div class="muted" style="font-size:13px">${esc(pick.phone)} · ${esc(pick.email)}</div></div><span class="spacer"></span><button class="btn ghost sm" id="rq_clear">${icon('x', 16)}</button></div>`
        : q ? data.contacts.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4).map((c) => `<div class="row" style="padding:8px 6px;cursor:pointer;border-radius:8px" data-pick="${c.id}" id="rq_pick_${c.id}">${avatar(c.name, 28)}<b>${esc(c.name)}</b><span class="muted" style="font-size:13px">${esc(c.phone)}</span></div>`).join('') : '';
      $$('[data-pick]', box).forEach((r) => (r.onclick = () => { pick = data.contacts.find((c) => c.id === r.dataset.pick); draw(); }));
      if ($('#rq_clear', box)) $('#rq_clear', box).onclick = () => { pick = null; draw(); };
      const first = pick ? pick.name.split(' ')[0] : '{{contact.first_name}}';
      $('#rq_preview', box).innerHTML = channel === 'SMS'
        ? esc(SMS_TPL.replace('{{contact.first_name}}', first)).replace('{{location.review_link}}', '<a>g.page/r/bloom-dental/review</a>')
        : `<b>Subject: How was your visit, ${esc(first)}?</b><div style="margin-top:8px">Thanks for choosing Bloom Dental Studio. Tap a star to tell us how we did.</div><div style="margin-top:8px">${stars(5, 26)}</div>`;
    };
    $('#rq_search', box).oninput = draw;
    ['sms', 'email'].forEach((k) => ($(`#rq_${k}`, box).onclick = () => { channel = k === 'sms' ? 'SMS' : 'Email'; $$('.rp-seg button', box).forEach((b) => b.classList.toggle('on', b.id === `rq_${k}`)); draw(); }));
    draw();
  }

  function requestsView(view) {
    const f = { All: () => true, SMS: (r) => r[1] === 'SMS', Email: (r) => r[1] === 'Email' };
    const rows = requests.filter(f[S.requestFilter]);
    view.innerHTML = `
      ${head('Review Requests', '', sendBtn)}
      <div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
        ${[['Sent', 312, 'send', '#1570ef'], ['Clicked', 141, 'link', '#6938ef'], ['Reviewed', 86, 'star', '#dc6803'], ['Click rate', '45%', 'chart', '#039855']].map(([k, v, ic, col]) => `<div class="card rp-kpi"><div class="k"><span style="color:${col}">${icon(ic, 18)}</span>${k}</div><div class="v" style="font-size:28px">${v}</div></div>`).join('')}
      </div>
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft);gap:6px" id="rq_filters">${Object.keys(f).map((k) => `<button class="btn sm ${k === S.requestFilter ? 'primary' : ''}" data-rf="${k}" id="rq_f_${slug(k)}">${k}</button>`).join('')}
          <span class="spacer"></span><span class="muted" style="font-size:14px">Automatic requests come from the <b>Review Request After Visit</b> workflow</span></div>
        <table class="t" id="rq_table"><thead><tr><th>Contact</th><th>Sent via</th><th>Sent by</th><th>Sent on</th><th>Status</th></tr></thead>
          <tbody>${rows.map((r, i) => `<tr id="rq_row_${i}"><td><div class="row">${avatar(r[0], 30)}<b>${esc(r[0])}</b></div></td><td>${icon(r[1] === 'SMS' ? 'sms' : 'mail', 16)} ${r[1]}</td>
            <td class="muted">${r[2].includes('Review Request') ? `${icon('automation', 15)} Workflow: ${esc(r[2])}` : esc(r[2])}</td><td class="muted">${esc(r[3])}</td><td>${statusChip(r[4])}</td></tr>`).join('')}</tbody></table>
      </div>`;
    $('#rp_send').onclick = () => sendRequest();
    $$('[data-rf]', view).forEach((b) => (b.onclick = () => { S.requestFilter = b.dataset.rf; requestsView(view); }));
  }

  // ---- Widgets ----
  const W = { name: 'Reviews — website', layout: 'Grid', google: true, facebook: true, min: '4★ & up', theme: 'Light', header: true, dates: true, photos: true };
  function widgetPreview() {
    const minN = { 'All ratings': 1, '3★ & up': 3, '4★ & up': 4, '5★ only': 5 }[W.min];
    const list = reviews.filter((r) => r.rating >= minN && ((W.google && r.source === 'Google') || (W.facebook && r.source === 'Facebook'))).slice(0, W.layout === 'List' ? 3 : W.layout === 'Badge' ? 0 : 6);
    const card = (r) => `<div class="rp-card"><div class="row" style="gap:8px">${W.photos ? avatar(r.name, 30) : ''}<div><b>${esc(r.name)}</b>${W.dates ? `<div style="font-size:12px;opacity:.6">${esc(r.date)}</div>` : ''}</div><span class="spacer"></span><span style="color:${r.source === 'Google' ? '#4285f4' : '#1877f2'}">${icon(r.source === 'Google' ? 'google' : 'facebook', 16)}</span></div>
      <div style="margin:8px 0 6px">${stars(r.rating, 15)}</div><div style="line-height:1.45">${esc(r.text)}</div></div>`;
    const summary = W.header ? `<div class="row" style="margin-bottom:16px;gap:14px"><div style="font-size:38px;font-weight:800">4.8</div><div>${stars(5, 20)}<div style="font-size:14px;opacity:.7">Based on 127 reviews</div></div><span class="spacer"></span><span class="btn sm" style="pointer-events:none">${icon('edit', 14)} Write a review</span></div>` : '';
    let body;
    if (W.layout === 'Badge') body = `<div class="rp-card row" style="width:300px;gap:12px;padding:14px 16px"><span style="color:#4285f4">${icon('google', 30)}</span><div><b>Google rating</b><div class="row" style="gap:6px"><b style="font-size:20px">4.8</b>${stars(5, 16)}</div><div style="font-size:13px;opacity:.7">127 reviews</div></div></div>`;
    else if (W.layout === 'Carousel') body = `<div class="row" style="gap:12px;align-items:stretch"><span class="btn icon sm" style="align-self:center">${icon('left', 16)}</span>${list.slice(0, 3).map((r) => `<div style="flex:1">${card(r)}</div>`).join('')}<span class="btn icon sm" style="align-self:center">${icon('right', 16)}</span></div>`;
    else if (W.layout === 'List') body = `<div style="display:flex;flex-direction:column;gap:10px">${list.map(card).join('')}</div>`;
    else body = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">${list.map(card).join('')}</div>`;
    return `<div class="rp-w ${W.theme === 'Dark' ? 'dark' : ''}" id="wg_preview_widget">${W.layout === 'Badge' ? '' : summary}${body}</div>`;
  }

  function widgetsList(view) {
    view.innerHTML = `${head('Widgets', 'Show your best reviews on your website', `<button class="btn primary" id="wg_new">${icon('plus', 18)} New Widget</button>`)}
      <div class="card"><table class="t" id="wg_table"><thead><tr><th>Name</th><th>Layout</th><th>Views (30 days)</th><th>Last updated</th><th></th></tr></thead>
      <tbody>${S.widgets.map((w) => `<tr class="click" data-w="${w.id}" id="wg_row_${w.id}"><td><div class="row"><span class="rp-ico" style="background:#fffaeb;color:#dc6803">${icon('star', 18)}</span><b>${esc(w.name)}</b></div></td><td>${esc(w.layout)}</td><td>${w.views.toLocaleString('en-GB')}</td><td class="muted">${esc(w.updated)}</td>
        <td style="text-align:right"><button class="btn sm" data-code="${w.id}">${icon('copy', 16)} Get code</button></td></tr>`).join('')}</tbody></table></div>`;
    $('#wg_new').onclick = () => KY.go('#/reputation/widgets/new');
    $$('[data-w]', view).forEach((r) => (r.onclick = (e) => { if (e.target.closest('[data-code]')) return embedCode(); KY.go(`#/reputation/widgets/${r.dataset.w}`); }));
  }

  function embedCode() {
    const code = `<script type="text/javascript" src="https://reputationhub.site/reputation/assets/review-widget.js"></script>\n<iframe class="lc_reviews_widget" src="https://reputationhub.site/reputation/widgets/review_widget/bLm0Dnt4lSt7d10" frameborder="0" scrolling="no" style="min-width:100%; width:100%;"></iframe>`;
    KY.modal({
      title: 'Embed your widget', wide: true,
      body: `<p style="margin-top:0">Copy this code and paste it into your website where the reviews should appear. In a Kyntlo funnel or website, add a <b>Custom JS/HTML</b> element and paste it there.</p>
        <div class="rp-code" id="wg_codebox">${esc(code)}</div>
        <p class="muted" style="font-size:14px;margin-bottom:0">The widget updates itself as new reviews come in — you only paste the code once.</p>`,
      actions: [{ label: 'Close' }, { label: 'Copy code', primary: true, id: 'wg_copy', onClick: (close) => { close(); KY.toast('Embed code copied'); } }],
    });
  }

  function widgetBuilder(view, id) {
    const existing = S.widgets.find((w) => w.id === id);
    if (existing) Object.assign(W, { name: existing.name, layout: existing.layout });
    const seg = (key, opts, idp) => `<div class="rp-seg">${opts.map((o) => `<button class="${W[key] === o ? 'on' : ''}" data-seg="${key}" data-val="${o}" id="${idp}_${slug(o)}">${o}</button>`).join('')}</div>`;
    const mini = { Carousel: 'grid-template-columns:repeat(3,1fr)', Grid: 'grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr', List: 'grid-template-rows:repeat(3,1fr)', Badge: '' };
    view.innerHTML = `
      <div class="page-head"><button class="btn ghost icon" id="wg_back">${icon('left', 20)}</button><h1>${existing ? esc(existing.name) : 'New review widget'}</h1>
        <div class="actions"><button class="btn" id="wg_code">${icon('copy', 18)} Get code</button><button class="btn primary" id="wg_save">Save widget</button></div></div>
      <div class="grid" style="grid-template-columns:440px 1fr;align-items:start">
        <div class="card" id="wg_settings"><div class="card-b">
          <div class="field"><label>Widget name</label><input class="input" id="wg_name" value="${esc(W.name)}"></div>
          <div class="field"><label>Layout</label><div class="rp-layout" id="wg_layouts">${Object.keys(mini).map((l) => `<button class="${W.layout === l ? 'on' : ''}" data-layout="${l}" id="wg_layout_${slug(l)}">
            <span class="rp-mini" style="${mini[l]}">${l === 'Badge' ? '<i style="width:40px;height:22px;margin:9px auto 0"></i>' : '<i></i>'.repeat(l === 'Grid' ? 6 : 3)}</span>${l}</button>`).join('')}</div></div>
          <div class="field"><label>Review sources</label>
            <div class="row" style="margin:4px 0"><button class="toggle ${W.google ? 'on' : ''}" data-tog="google" id="wg_src_google"></button>${srcBadge('Google')}</div>
            <div class="row" style="margin:4px 0"><button class="toggle ${W.facebook ? 'on' : ''}" data-tog="facebook" id="wg_src_facebook"></button>${srcBadge('Facebook')}</div></div>
          <div class="field"><label>Show reviews rated</label>${seg('min', ['All ratings', '3★ & up', '4★ & up', '5★ only'], 'wg_min')}</div>
          <div class="field"><label>Theme</label>${seg('theme', ['Light', 'Dark'], 'wg_theme')}</div>
          <div class="field" style="margin-bottom:0"><label>Display</label>
            ${[['header', 'Rating summary header'], ['photos', 'Reviewer photos'], ['dates', 'Review dates']].map(([k, l]) => `<div class="row" style="margin:6px 0"><button class="toggle ${W[k] ? 'on' : ''}" data-tog="${k}" id="wg_show_${k}"></button>${l}</div>`).join('')}</div>
        </div></div>
        <div>
          <div class="row" style="margin-bottom:10px"><b>Live preview</b><span class="muted" style="font-size:14px">· how it looks on your website</span></div>
          <div class="rp-frame" id="wg_preview"><div class="bar"><i></i><i></i><i></i><span class="url">bloomdental.co.uk</span></div>
            <div style="padding:22px 26px;background:#fcfcfd"><div style="font-size:22px;font-weight:700;margin-bottom:4px">What our patients say</div><div class="muted" style="margin-bottom:16px">Real reviews from real smiles.</div>
            <div id="wg_render">${widgetPreview()}</div></div></div>
        </div>
      </div>`;
    const rerender = () => { $('#wg_render').innerHTML = widgetPreview(); };
    $('#wg_back').onclick = () => KY.go('#/reputation/widgets');
    $('#wg_name').oninput = (e) => (W.name = e.target.value);
    $$('[data-layout]', view).forEach((b) => (b.onclick = () => { W.layout = b.dataset.layout; $$('[data-layout]', view).forEach((x) => x.classList.toggle('on', x === b)); rerender(); }));
    $$('[data-seg]', view).forEach((b) => (b.onclick = () => { W[b.dataset.seg] = b.dataset.val; $$(`[data-seg="${b.dataset.seg}"]`, view).forEach((x) => x.classList.toggle('on', x === b)); rerender(); }));
    $$('[data-tog]', view).forEach((b) => (b.onclick = () => { W[b.dataset.tog] = !W[b.dataset.tog]; b.classList.toggle('on', W[b.dataset.tog]); rerender(); }));
    $('#wg_save').onclick = () => {
      if (existing) Object.assign(existing, { name: W.name, layout: W.layout, updated: 'Just now' });
      else S.widgets.unshift({ id: 'wg' + (S.widgets.length + 1), name: W.name, layout: W.layout, updated: 'Just now', views: 0 });
      KY.toast('Widget saved');
    };
    $('#wg_code').onclick = embedCode;
  }

  // ---- Settings ----
  function settingsView(view, sub = 'link') {
    const nav = [['link', 'Review link', 'link'], ['requests', 'Review requests', 'send'], ['ai', 'Reviews AI', 'sparkle']];
    const opt = (on, id, title, desc, extra = '') => `<div class="rp-opt ${on ? 'on' : ''}" id="${id}"><span class="dot"></span><div style="flex:1"><b>${title}</b><div class="muted" style="font-size:14px">${desc}</div>${extra}</div></div>`;
    let body = '';
    if (sub === 'link') body = `
      <div class="card-h"><h3>Review link</h3></div><div class="card-b">
        <p class="muted" style="margin-top:0">This is where review requests send people. Pick the platform where you want most of your reviews.</p>
        <div id="rs_link_opts">
          ${opt(S.link === 'google', 'rs_link_google', `${icon('google', 16)} Google <span class="chip green" style="margin-left:6px">Connected</span>`, 'Opens the "write a review" box on your Google Business Profile')}
          ${opt(S.link === 'facebook', 'rs_link_facebook', `${icon('facebook', 16)} Facebook`, 'Opens the recommendations tab on your Facebook Page')}
          ${opt(S.link === 'custom', 'rs_link_custom', `${icon('link', 16)} Custom link`, 'Any other review site, such as Trustpilot or Yell')}</div>
        <div class="field" style="margin-top:16px"><label>Your review link</label><div class="row"><input class="input" id="rs_link_url" readonly value="${S.link === 'facebook' ? 'facebook.com/bloomdentalstudio/reviews' : 'g.page/r/bloom-dental/review'}"><button class="btn" id="rs_copy">${icon('copy', 16)} Copy</button></div></div>
        <div class="row" style="gap:16px;margin-top:6px" id="rs_qr"><div style="width:96px;height:96px;border:1px solid var(--line);border-radius:10px;display:grid;place-items:center;color:var(--ink)">${icon('qr', 70)}</div>
          <div><b>Review QR code</b><div class="muted" style="font-size:14px;margin:4px 0 10px">Print it for your reception desk so patients can review before they leave.</div><button class="btn sm">${icon('download', 16)} Download QR code</button></div></div>
      </div>`;
    if (sub === 'requests') body = `
      <div class="card-h"><h3>Review requests</h3></div><div class="card-b">
        <div class="field"><label>SMS review request behaviour</label>
          ${opt(false, 'rs_sms_now', 'Immediately', 'Send the request the moment it is triggered')}
          ${opt(true, 'rs_sms_custom', 'Custom', 'Wait, then follow up if they haven’t clicked yet',
            `<div class="grid" style="grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px"><div class="field" style="margin:0"><label>Send after</label><input class="input" value="2 hours"></div><div class="field" style="margin:0"><label>Repeat every</label><input class="input" value="3 days"></div><div class="field" style="margin:0"><label>Maximum retries</label><input class="input" value="2"></div></div>
             <label class="row" style="margin-top:10px;font-size:14px"><input type="checkbox" checked> Stop once the review link is clicked</label>`)}</div>
        <div class="field"><label>SMS message</label><textarea class="input" rows="3" id="rs_sms_tpl">${esc(SMS_TPL)}</textarea></div>
        <div class="field" style="margin-bottom:0"><label>Email review request behaviour</label>
          ${opt(true, 'rs_email_now', 'Immediately', 'Send the email the moment it is triggered')}${opt(false, 'rs_email_custom', 'Custom', 'Delay and repeat, like the SMS settings')}</div>
      </div>`;
    if (sub === 'ai') body = `
      <div class="card-h"><h3>Reviews AI</h3><span class="chip purple">${icon('sparkle', 14)} AI</span></div><div class="card-b">
        <div class="field"><label>Mode</label>
          ${opt(S.aiMode === 'Off', 'rs_ai_off', 'Off', 'Write every reply yourself')}
          ${opt(S.aiMode === 'Suggestive', 'rs_ai_suggestive', 'Suggestive', 'AI drafts a reply, you review it and click Post')}
          ${opt(S.aiMode === 'Auto-pilot', 'rs_ai_autopilot', 'Auto-pilot', 'AI posts replies for you automatically, after a short delay')}</div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
          <div class="field"><label>Agent name</label><input class="input" value="Bloom reply assistant"></div>
          <div class="field"><label>Sign off as</label><input class="input" id="rs_signoff" value="Sarah, Bloom Dental Studio"></div></div>
        <div class="field"><label>Tone of voice</label><div class="rp-seg" id="rs_tones">${['Friendly', 'Professional', 'Empathetic', 'Casual'].map((t) => `<button class="${S.tone === t ? 'on' : ''}" data-tone="${t}" id="rs_tone_${slug(t)}">${t}</button>`).join('')}</div></div>
        <div class="field"><label>Instructions for the AI</label><textarea class="input" rows="4" id="rs_ai_prompt">Thank the reviewer by first name and mention the treatment they had. Keep replies to two or three sentences. Never mention health details they didn't share. For three stars or less, apologise and invite them to call 020 7946 0321.</textarea></div>
        <div class="field" style="margin-bottom:0"><label>Auto-pilot replies to</label><div class="row" style="gap:6px">${['5★', '4★', '3★', '2★', '1★'].map((s, i) => `<span class="chip ${i < 2 ? 'blue' : ''}">${i < 2 ? icon('check', 13) : ''}${s}</span>`).join('')}<span class="muted" style="font-size:14px;margin-left:6px">Lower ratings always wait for a human.</span></div></div>
      </div>`;
    view.innerHTML = `${head('Reputation Settings')}
      <div class="grid" style="grid-template-columns:260px 1fr;align-items:start">
        <div class="card rp-side" style="padding:8px">${nav.map(([k, l, ic]) => `<a class="${k === sub ? 'on' : ''}" id="rs_nav_${k}" href="#/reputation/settings/${k}">${icon(ic, 18)} ${l}</a>`).join('')}</div>
        <div class="card" id="rs_panel">${body}<div class="modal-f"><button class="btn">Cancel</button><button class="btn primary" id="rs_save">Save</button></div></div>
      </div>`;
    // radio-card groups: options sharing an id prefix act as one group
    $$('.rp-opt', view).forEach((o) => (o.onclick = () => {
      const group = o.id.split('_').slice(0, 2).join('_');
      $$(`.rp-opt[id^="${group}_"]`, view).forEach((x) => x.classList.toggle('on', x === o));
      if (group === 'rs_link') { S.link = o.id.split('_')[2]; $('#rs_link_url').value = S.link === 'facebook' ? 'facebook.com/bloomdentalstudio/reviews' : S.link === 'custom' ? 'https://' : 'g.page/r/bloom-dental/review'; }
      if (group === 'rs_ai') S.aiMode = { off: 'Off', suggestive: 'Suggestive', autopilot: 'Auto-pilot' }[o.id.split('_')[2]];
    }));
    $$('[data-tone]', view).forEach((b) => (b.onclick = () => { S.tone = b.dataset.tone; $$('[data-tone]', view).forEach((x) => x.classList.toggle('on', x === b)); }));
    if ($('#rs_copy')) $('#rs_copy').onclick = () => KY.toast('Review link copied');
    $('#rs_save').onclick = () => KY.toast('Reputation settings saved');
  }

  function listingsView(view) {
    view.innerHTML = `${head('Listings', 'Keep your business details right everywhere people search')}
      <div class="card" style="max-width:900px"><div class="card-b row" style="gap:20px;align-items:flex-start;padding:28px">
        <span class="rp-ico" style="width:56px;height:56px;background:#eff4ff;color:var(--blue);border-radius:14px">${icon('globe', 30)}</span>
        <div style="flex:1"><div class="bold" style="font-size:19px">Listings is an add-on</div>
          <p class="muted">Publish your name, address, phone and opening hours to dozens of directories, maps and voice assistants from one place, and keep them in sync. Ask the Kyntlo team to switch it on for your account.</p>
          <div class="row" style="gap:8px;flex-wrap:wrap">${['Google', 'Apple Maps', 'Bing', 'Yelp', 'Facebook', 'Yell'].map((n) => `<span class="chip">${n}</span>`).join('')}</div></div>
        <span class="chip amber">Add-on</span></div></div>`;
  }

  KY.screen('reputation', {
    tabs: [{ id: 'overview', label: 'Overview' }, { id: 'requests', label: 'Requests' }, { id: 'reviews', label: 'Reviews' }, { id: 'widgets', label: 'Widgets' }, { id: 'listings', label: 'Listings' }, { id: 'settings', label: 'Settings' }],
    render(view, { tab, params }) {
      css();
      if (params[0] === 'not-connected' && !S.setupSeen) { S.connected = false; S.setupSeen = true; }
      if (tab === 'requests') return requestsView(view);
      if (tab === 'reviews') return reviewsView(view);
      if (tab === 'widgets') return params[0] ? widgetBuilder(view, params[0]) : widgetsList(view);
      if (tab === 'listings') return listingsView(view);
      if (tab === 'settings') return settingsView(view, params[0] || 'link');
      return overview(view);
    },
  });
})();
