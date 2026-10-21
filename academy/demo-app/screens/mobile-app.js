// Mobile App — download info plus an interactive phone mockup of the Kyntlo app
// (log in, pick the account, inbox, reply, calendar, contacts, opportunities).
(() => {
  const { esc, icon, $, $$, avatar, money } = KY;
  const data = KY.data;
  const ph = (KY.data.mobile = KY.data.mobile || { screen: 'login', convo: null, sent: [] });
  const contact = (id) => data.contacts.find((c) => c.id === id);
  const qr = (seed, size) => (KY.qr ? KY.qr(seed, size) : `<div style="width:${size}px;height:${size}px;background:#f2f4f7"></div>`);

  if (!document.getElementById('css-mobile-app')) {
    const st = document.createElement('style');
    st.id = 'css-mobile-app';
    st.textContent = `
      .mo-wrap { display: grid; grid-template-columns: 1fr 470px; gap: 28px; align-items: start; max-width: 1560px; }
      .mo-store { display: flex; gap: 16px; align-items: center; padding: 18px 20px; }
      .mo-badge { display: inline-flex; align-items: center; gap: 10px; background: #101828; color: #fff; border-radius: 10px; padding: 8px 16px; }
      .mo-badge small { display: block; font-size: 11px; color: #d0d5dd; line-height: 1.1; }
      .mo-badge b { font-size: 17px; line-height: 1.1; }
      .mo-feat { display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid var(--line-soft); }
      .mo-feat:last-child { border-bottom: 0; }
      .mo-feat .ic { width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; background: var(--blue-soft); color: var(--blue); flex: none; }
      .mo-phone { width: 400px; height: 820px; margin: 0 auto; border-radius: 56px; background: #0b0f19; padding: 14px; box-shadow: 0 30px 60px rgba(16,24,40,.28), inset 0 0 0 2px #344054; position: relative; }
      .mo-screen { width: 100%; height: 100%; border-radius: 44px; background: #fff; overflow: hidden; display: flex; flex-direction: column; position: relative; font-size: 15px; }
      .mo-notch { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 112px; height: 30px; border-radius: 20px; background: #0b0f19; z-index: 3; }
      .mo-status { height: 50px; flex: none; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 30px 6px; font-weight: 600; font-size: 14px; }
      .mo-top { padding: 8px 18px 12px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--line-soft); flex: none; }
      .mo-top h2 { margin: 0; font-size: 22px; flex: 1; }
      .mo-body { flex: 1; overflow: auto; }
      .mo-nav { height: 74px; flex: none; border-top: 1px solid var(--line-soft); display: grid; grid-template-columns: repeat(5, 1fr); padding-bottom: 10px; background: #fff; }
      .mo-nav button { border: 0; background: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; font-size: 11.5px; color: var(--muted); font-weight: 600; }
      .mo-nav button.on { color: var(--blue); }
      .mo-item { display: flex; gap: 12px; padding: 12px 18px; border-bottom: 1px solid var(--line-soft); align-items: center; cursor: pointer; }
      .mo-item .t { flex: 1; min-width: 0; }
      .mo-item .t div { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .mo-dot { min-width: 20px; height: 20px; border-radius: 10px; background: var(--blue); color: #fff; font-size: 12px; font-weight: 700; display: grid; place-items: center; padding: 0 5px; }
      .mo-bub { max-width: 78%; padding: 10px 13px; border-radius: 16px; margin: 6px 0; font-size: 14.5px; line-height: 1.35; }
      .mo-bub.them { background: #f2f4f7; border-bottom-left-radius: 4px; }
      .mo-bub.us { background: var(--blue); color: #fff; margin-left: auto; border-bottom-right-radius: 4px; }
      .mo-push { position: absolute; top: 54px; left: 12px; right: 12px; background: rgba(255,255,255,.96); border-radius: 18px; box-shadow: 0 10px 30px rgba(16,24,40,.25); padding: 12px 14px; display: flex; gap: 10px; z-index: 4; animation: moPush .4s cubic-bezier(.2,.8,.2,1); }
      @keyframes moPush { from { transform: translateY(-30px); opacity: 0; } }
      .mo-login { padding: 40px 28px; display: flex; flex-direction: column; gap: 14px; }
      .mo-login img { width: 72px; margin: 10px auto 6px; }
      .mo-appt { margin: 10px 16px; padding: 12px 14px; border-radius: 12px; border-left: 4px solid; background: #f9fafb; }
    `;
    document.head.appendChild(st);
  }

  function phoneScreen() {
    const status = `<div class="mo-status"><span>9:41</span><span class="row" style="gap:5px">${icon('chart', 15)}${icon('globe', 15)}<span style="width:24px;height:12px;border:1.5px solid #101828;border-radius:3px;display:inline-block;position:relative"><span style="position:absolute;inset:1.5px;right:5px;background:#101828;border-radius:1px"></span></span></span></div>`;
    const nav = (cur) => `<div class="mo-nav">${[['conversations', 'chat', 'Conversations'], ['calendar', 'calendar', 'Calendar'], ['contacts', 'contacts', 'Contacts'], ['opportunities', 'pipeline', 'Opportunities'], ['more', 'dots', 'More']]
      .map(([k, ic, l]) => `<button id="mob_nav_${k}" data-nav="${k}" class="${k === cur ? 'on' : ''}">${icon(ic, 22)}${l}</button>`).join('')}</div>`;
    const s = ph.screen;
    if (s === 'login') return `${status}<div class="mo-login">
        <img src="../../assets/favicon.png" alt="Kyntlo"><div style="text-align:center"><b style="font-size:22px">Welcome back</b><div class="muted">Log in to your Kyntlo account</div></div>
        <div class="field" style="margin:8px 0 0"><label>Email</label><input class="input" id="mob_email" value="" placeholder="you@business.com"></div>
        <div class="field" style="margin:0"><label>Password</label><input class="input" type="password" id="mob_password" value="" placeholder="••••••••"></div>
        <button class="btn primary" id="mob_login" style="justify-content:center;height:46px">Log in</button>
        <div class="muted" style="text-align:center;font-size:14px">Forgot password?</div></div>`;
    if (s === 'account') return `${status}<div class="mo-top"><h2>Select account</h2></div><div class="mo-body">
        <div class="mo-item" id="mob_pick_account"><span class="avatar" style="background:#7f56d9">BD</span><div class="t"><b>${esc(data.business.name)}</b><div class="muted" style="font-size:13.5px">${esc(data.business.address)}</div></div>${icon('right', 18)}</div>
        <div class="mo-item"><span class="avatar" style="background:#12b76a">BK</span><div class="t"><b>Bloom Dental — Kensington</b><div class="muted" style="font-size:13.5px">Kensington High Street, London</div></div>${icon('right', 18)}</div></div>`;
    if (s === 'thread') {
      const v = data.conversations.find((x) => x.id === ph.convo);
      const c = contact(v.contact);
      return `${status}<div class="mo-top"><button class="btn ghost icon sm" id="mob_back">${icon('left', 20)}</button>${avatar(c.name, 34)}<div style="flex:1"><b>${esc(c.name)}</b><div class="muted" style="font-size:12.5px">${v.channel.toUpperCase()} · ${esc(c.phone)}</div></div>${icon('phone', 20)}</div>
        <div class="mo-body" id="mob_thread" style="padding:12px 14px">${v.messages.map((m) => `<div class="mo-bub ${m.from === 'them' ? 'them' : 'us'}">${esc(m.text)}</div>`).join('')}
          ${ph.sent.filter((x) => x.convo === v.id).map((x) => `<div class="mo-bub us">${esc(x.text)}</div>`).join('')}</div>
        <div class="row" style="padding:10px 12px 14px;border-top:1px solid var(--line-soft);gap:8px"><input class="input" id="mob_reply" placeholder="Type a message" style="border-radius:20px">
          <button class="btn primary icon" id="mob_reply_send" style="border-radius:50%">${icon('send', 18)}</button></div>`;
    }
    if (s === 'calendar') {
      const appts = data.appointments.filter((a) => a.day === 1);
      return `${status}<div class="mo-top"><h2>Calendar</h2><span class="chip blue">Tue 27 Oct</span></div><div class="mo-body">
        <div class="row" style="padding:10px 16px;gap:6px">${data.week.map((d, i) => `<span class="chip ${i === 1 ? 'blue' : ''}" style="flex:1;justify-content:center">${d.split(' ')[0]}<br></span>`).join('')}</div>
        ${appts.map((a) => { const k = data.calendars.find((x) => x.id === a.calendar); const c = contact(a.contact);
          return `<div class="mo-appt" id="mob_appt_${a.id}" style="border-color:${k.color}"><b>${a.start} – ${a.end}</b><div>${esc(c.name)}</div><div class="muted" style="font-size:13.5px">${esc(k.name)} · ${esc(a.with)}</div>
            <div class="row" style="margin-top:8px;gap:6px"><span class="chip green">Confirmed</span><button class="btn sm" style="height:28px" data-resched="${a.id}">Reschedule</button></div></div>`; }).join('')}
        <div class="mo-appt" style="border-color:#d0d5dd;color:var(--muted)">14:00 – 17:00 · Free</div>
        <div style="padding:6px 16px"><button class="btn primary" id="mob_new_appt" style="width:100%;justify-content:center">${icon('plus', 18)} New appointment</button></div></div>${nav('calendar')}`;
    }
    if (s === 'contacts') return `${status}<div class="mo-top"><h2>Contacts</h2>${icon('search', 20)}</div><div class="mo-body">
        ${data.contacts.slice(0, 9).map((c) => `<div class="mo-item">${avatar(c.name, 38)}<div class="t"><b>${esc(c.name)}</b><div class="muted" style="font-size:13.5px">${esc(c.phone)}</div></div>${icon('phone', 18)}</div>`).join('')}</div>${nav('contacts')}`;
    if (s === 'opportunities') return `${status}<div class="mo-top"><h2>Opportunities</h2><span class="chip">Patient Journey</span></div><div class="mo-body">
        ${data.opportunities.filter((o) => o.status === 'open').slice(0, 7).map((o) => `<div class="mo-item"><div class="t"><b>${esc(o.name)}</b><div class="muted" style="font-size:13.5px">${esc(data.pipelines[0].stages[o.stage])}</div></div><b>${money(o.value)}</b></div>`).join('')}</div>${nav('opportunities')}`;
    if (s === 'more') return `${status}<div class="mo-top"><h2>More</h2></div><div class="mo-body">
        ${[['bell', 'Notifications'], ['task', 'Tasks'], ['payments', 'Payments'], ['star', 'Reviews'], ['phone', 'Dialer'], ['settings', 'Settings']].map(([ic, l]) => `<div class="mo-item">${icon(ic, 22)}<div class="t"><b>${l}</b></div>${icon('right', 18)}</div>`).join('')}</div>${nav('more')}`;
    // conversations (default)
    return `${status}<div class="mo-top"><h2>Conversations</h2>${icon('search', 20)}${icon('edit', 20)}</div>
      <div class="row" style="padding:10px 16px;gap:6px;flex:none"><span class="chip blue">Unread</span><span class="chip">Recents</span><span class="chip">Starred</span><span class="chip">All</span></div>
      <div class="mo-body">${data.conversations.map((v) => { const c = contact(v.contact); const last = v.messages[v.messages.length - 1];
        return `<div class="mo-item" id="mob_conv_${v.id}" data-conv="${v.id}">${avatar(c.name, 42)}<div class="t"><div class="row" style="gap:6px"><b>${esc(c.name)}</b><span class="muted" style="font-size:12.5px;margin-left:auto">${v.time}</span></div>
          <div class="muted" style="font-size:13.5px">${esc(last.text)}</div></div>${v.unread ? `<span class="mo-dot">${v.unread}</span>` : ''}</div>`; }).join('')}</div>${nav('conversations')}`;
  }

  function drawPhone() {
    const scr = $('#mob_screen');
    if (!scr) return;
    scr.innerHTML = `<div class="mo-notch"></div>${phoneScreen()}`;
    const go = (s) => { ph.screen = s; drawPhone(); };
    $$('[data-nav]', scr).forEach((b) => (b.onclick = () => go(b.dataset.nav)));
    $$('[data-conv]', scr).forEach((r) => (r.onclick = () => { ph.convo = r.dataset.conv; const v = data.conversations.find((x) => x.id === ph.convo); v.unread = 0; go('thread'); }));
    const login = $('#mob_login', scr);
    if (login) login.onclick = () => go('account');
    const pick = $('#mob_pick_account', scr);
    if (pick) pick.onclick = () => {
      go('conversations');
      setTimeout(() => {
        const s2 = $('#mob_screen');
        if (!s2 || ph.screen !== 'conversations') return;
        s2.insertAdjacentHTML('beforeend', `<div class="mo-push" id="mob_push"><img src="../../assets/favicon.png" style="width:34px;height:34px;border-radius:8px"><div style="flex:1"><div class="row"><b style="font-size:14px">Kyntlo</b><span class="muted" style="margin-left:auto;font-size:12px">now</span></div>
          <div style="font-size:14px"><b>New lead:</b> Olivia Bennett submitted the Invisalign form</div></div></div>`);
        setTimeout(() => $('#mob_push')?.remove(), 4200);
      }, 900);
    };
    const back = $('#mob_back', scr);
    if (back) back.onclick = () => go('conversations');
    const send = $('#mob_reply_send', scr);
    if (send) {
      const doSend = () => { const t = $('#mob_reply').value.trim(); if (!t) return; ph.sent.push({ convo: ph.convo, text: t }); drawPhone(); KY.toast('Message sent'); };
      send.onclick = doSend;
      $('#mob_reply').onkeydown = (e) => { if (e.key === 'Enter') doSend(); };
      const th = $('#mob_thread'); th.scrollTop = th.scrollHeight;
    }
    $$('[data-resched]', scr).forEach((b) => (b.onclick = () => KY.toast('Reschedule link opened')));
    const na = $('#mob_new_appt', scr);
    if (na) na.onclick = () => KY.toast('New appointment');
  }

  function render(view) {
    view.innerHTML = `
      <div class="page-head"><h1>Mobile App</h1><span class="chip green">${icon('check', 14)} Included in every plan</span></div>
      <div class="mo-wrap">
        <div class="grid">
          <div class="card" id="mob_download">
            <div class="card-h"><h3>Download the Kyntlo app</h3></div>
            <div class="mo-store">
              <div style="padding:8px;border:1px solid var(--line-soft);border-radius:12px">${qr(11, 170)}</div>
              <div style="flex:1">
                <p style="margin:0 0 6px;font-size:17px"><b>Scan with your phone's camera</b> to download the app, or search for <b>Kyntlo</b> in your app store.</p>
                <p class="muted" style="margin:0 0 14px">Log in with the same email and password you use on the web.</p>
                <div class="row" style="gap:12px">
                  <span class="mo-badge" id="mob_ios">${icon('mobile', 24)}<span><small>Download on the</small><b>App Store</b></span></span>
                  <span class="mo-badge" id="mob_android">${icon('play', 22)}<span><small>Get it on</small><b>Google Play</b></span></span></div>
              </div></div>
            <div class="row" style="padding:0 20px 20px;gap:10px"><input class="input" id="mob_link_phone" value="+44 7700 900111" style="max-width:260px">
              <button class="btn" id="mob_send_link">${icon('sms', 18)} Text me the download link</button></div>
          </div>
          <div class="card" id="mob_features"><div class="card-h"><h3>What you can do on the go</h3></div><div class="card-b" style="padding-top:4px;padding-bottom:4px">
            ${[['chat', 'Reply to every channel', 'SMS, email, WhatsApp, Facebook, Instagram and website chat, from one inbox.'],
               ['bell', 'Instant notifications', 'Get a push notification the moment a new lead or message comes in.'],
               ['calendar', 'Manage your calendar', 'See today\'s appointments, book, reschedule and confirm.'],
               ['contacts', 'Contacts & opportunities', 'Look up a customer, add notes and move deals along your pipeline.'],
               ['phone', 'Call from your business number', 'Make and take calls with your Kyntlo number, so your mobile stays private.']]
              .map(([ic, t, d]) => `<div class="mo-feat"><span class="ic">${icon(ic, 20)}</span><div><b>${t}</b><div class="muted" style="font-size:14.5px">${d}</div></div></div>`).join('')}</div></div>
        </div>
        <div><div class="mo-phone" id="mob_phone"><div class="mo-screen" id="mob_screen"></div></div></div>
      </div>`;
    $('#mob_send_link').onclick = () => KY.toast('Download link sent to ' + $('#mob_link_phone').value);
    drawPhone();
  }

  KY.screen('mobile-app', { tabs: [], render });
})();
