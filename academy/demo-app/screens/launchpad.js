// Launchpad — HighLevel's first-day setup checklist. Connect buttons complete steps.
(() => {
  const { esc, icon, $, $$, avatar } = KY;
  const data = KY.data;
  const steps = (KY.data.launchpad = KY.data.launchpad || {
    google: false, facebook: false, widget: false, email: false, phone: false, mobile: false,
  });

  // Deterministic, QR-looking pattern (decorative only).
  KY.qr = KY.qr || ((seed = 7, size = 150) => {
    const n = 25, c = size / n;
    let s = seed, cells = '';
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    const finder = (x, y) => x < 7 && y < 7 || x >= n - 7 && y < 7 || x < 7 && y >= n - 7;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      let on;
      if (finder(x, y)) {
        const fx = x >= n - 7 ? x - (n - 7) : x, fy = y >= n - 7 ? y - (n - 7) : y;
        on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4);
      } else on = rnd() > 0.52;
      if (on) cells += `<rect x="${x * c}" y="${y * c}" width="${c + 0.3}" height="${c + 0.3}"/>`;
    }
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="background:#fff"><g fill="#101828">${cells}</g></svg>`;
  });

  if (!document.getElementById('css-launchpad')) {
    const st = document.createElement('style');
    st.id = 'css-launchpad';
    st.textContent = `
      .lp-hero { background: linear-gradient(120deg, #1d2939, #4b21a9 70%, #7a1cac); color: #fff; border-radius: 14px; padding: 26px 30px; display: flex; align-items: center; gap: 24px; margin-bottom: 20px; }
      .lp-hero h1 { margin: 0; font-size: 28px; }
      .lp-hero p { margin: 6px 0 0; color: #e0d4fb; font-size: 16px; }
      .lp-prog { width: 340px; }
      .lp-bar { height: 10px; border-radius: 99px; background: rgba(255,255,255,.22); overflow: hidden; margin-top: 8px; }
      .lp-bar div { height: 100%; background: linear-gradient(90deg, #34d399, #a6f4c5); border-radius: 99px; transition: width .5s; }
      .lp-step { display: flex; align-items: center; gap: 18px; padding: 18px 22px; border-bottom: 1px solid var(--line-soft); }
      .lp-step:last-child { border-bottom: 0; }
      .lp-step .ic { width: 52px; height: 52px; border-radius: 12px; display: grid; place-items: center; flex: none; background: #f2f4f7; }
      .lp-step .ic img { width: 30px; height: 30px; object-fit: contain; }
      .lp-step h4 { margin: 0; font-size: 17px; }
      .lp-step p { margin: 3px 0 0; color: var(--muted); font-size: 14.5px; }
      .lp-step.done h4 { color: var(--muted); }
      .lp-check { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--line); display: grid; place-items: center; flex: none; color: transparent; }
      .lp-step.done .lp-check { background: var(--green); border-color: var(--green); color: #fff; }
      .lp-opt { display: flex; align-items: center; gap: 14px; padding: 14px; border: 1px solid var(--line); border-radius: 10px; margin-bottom: 10px; background: #fff; width: 100%; text-align: left; }
      .lp-opt:hover { border-color: #84adff; background: var(--blue-soft); }
      .lp-code { font: 13px/1.5 ui-monospace, Menlo, Consolas, monospace; background: #101828; color: #d0d5dd; border-radius: 8px; padding: 12px 14px; white-space: pre-wrap; word-break: break-all; }
    `;
    document.head.appendChild(st);
  }

  const STEPS = [
    ['google', 'Connect your Google Business Profile', 'Bring Google reviews and messages into Kyntlo, and let people book from Google.', '<span style="color:#4285f4">' + icon('google', 28) + '</span>', 'Connect'],
    ['facebook', 'Connect your Facebook & Instagram', 'Reply to Messenger and Instagram DMs and capture Facebook lead forms.', '<span style="color:#1877f2">' + icon('facebook', 28) + '</span>', 'Connect'],
    ['widget', 'Install the chat widget on your website', 'Turn website visitors into conversations. Messages land in your inbox.', icon('chat', 26), 'Install'],
    ['email', 'Set up your email', 'Send from your own domain so your emails reach the inbox.', icon('mail', 26), 'Set up'],
    ['phone', 'Get a business phone number', 'Call and text customers from a number that belongs to your business.', icon('phone', 26), 'Get number'],
  ];

  function oauth(name, logo, onDone, pickLabel, picks) {
    let step = 0;
    const box = KY.modal({ title: `Connect ${name}`, body: '<div id="lp_flow"></div>' });
    const close = () => box.closest('.overlay')?.remove();
    const draw = () => {
      const f = $('#lp_flow', box);
      if (step === 0) {
        f.innerHTML = `<div style="text-align:center;margin-bottom:16px"><img src="../../assets/integration-logos/${logo}" style="height:30px"><div class="bold" style="font-size:19px;margin-top:8px">Choose an account</div><div class="muted">to continue to Kyntlo</div></div>
          <button class="lp-opt" id="lp_account">${avatar(data.me.name, 38)}<div><b>${esc(data.me.name)}</b><div class="muted" style="font-size:14px">${esc(data.me.email)}</div></div></button>`;
        $('#lp_account', box).onclick = () => { step = 1; draw(); };
      } else if (step === 1) {
        f.innerHTML = `<div class="bold" style="font-size:18px;margin-bottom:6px">Kyntlo would like to:</div>
          ${['Read and reply to your messages', 'See and reply to your reviews', 'Manage your business information'].map((t) => `<div class="row" style="margin:10px 0"><span style="color:var(--blue)">${icon('check', 18)}</span>${t}</div>`).join('')}
          <div class="row" style="margin-top:16px"><span class="spacer"></span><button class="btn" data-x>Cancel</button><button class="btn primary" id="lp_allow">Allow</button></div>`;
        $('[data-x]', box).onclick = close;
        $('#lp_allow', box).onclick = () => { step = 2; draw(); };
      } else {
        f.innerHTML = `<div class="bold" style="font-size:18px;margin-bottom:12px">${esc(pickLabel)}</div>
          ${picks.map((p, i) => `<label class="lp-opt" style="cursor:pointer"><input type="${name.includes('Facebook') ? 'checkbox' : 'radio'}" name="lp_pick" ${i === 0 ? 'checked' : ''} style="width:18px;height:18px"><div><b>${esc(p[0])}</b><div class="muted" style="font-size:14px">${esc(p[1])}</div></div></label>`).join('')}
          <div class="row" style="margin-top:6px"><span class="spacer"></span><button class="btn primary" id="lp_pick_save">Save</button></div>`;
        $('#lp_pick_save', box).onclick = () => { close(); onDone(); };
      }
    };
    draw();
  }

  function render(view) {
    const done = STEPS.filter(([k]) => steps[k]).length;
    view.innerHTML = `
      <div class="lp-hero" id="lp_hero">
        <div style="flex:1"><h1>Welcome to Kyntlo, ${esc(data.me.name.split(' ')[0])}</h1><p>Complete these steps to get ${esc(data.business.name)} ready to capture and convert leads.</p></div>
        <div class="lp-prog" id="lp_progress"><div class="row"><b>Your progress</b><span class="spacer"></span><span>${done} of ${STEPS.length} completed</span></div>
          <div class="lp-bar"><div style="width:${(done / STEPS.length) * 100}%"></div></div></div>
      </div>
      <div class="grid" style="grid-template-columns:1fr 400px;align-items:start">
        <div class="card" id="lp_steps">
          <div class="card-h"><h3>Set up your account</h3><span class="spacer"></span><span class="muted" style="font-size:14px">Takes about 15 minutes</span></div>
          ${STEPS.map(([k, t, d, ic, btn]) => `
            <div class="lp-step ${steps[k] ? 'done' : ''}" id="lp_step_${k}">
              <span class="lp-check">${icon('check', 18)}</span>
              <span class="ic">${ic}</span>
              <div style="flex:1"><h4>${esc(t)}</h4><p>${esc(d)}</p></div>
              ${steps[k] ? `<span class="chip green">${icon('check', 14)} ${k === 'widget' ? 'Installed' : k === 'mobile' ? 'Done' : 'Connected'}</span>`
                : `<button class="btn ${k === 'email' || k === 'phone' ? '' : 'primary'}" id="lp_${k}_btn" data-step="${k}">${btn}</button>`}
            </div>`).join('')}
        </div>
        <div class="grid">
          <div class="card" id="lp_help"><div class="card-b row" style="align-items:flex-start">
            <span style="color:var(--purple)">${icon('book', 24)}</span>
            <div><b>Need a hand?</b><div class="muted" style="font-size:14.5px;margin:4px 0 10px">Watch Kyntlo Academy or ask Ask AI how to do anything.</div><button class="btn sm" id="lp_ask_ai">${icon('ai', 16)} Ask AI</button></div></div></div>
        </div>
      </div>`;

    const complete = (k, msg) => { steps[k] = true; render(view); KY.toast(msg); };
    $('#lp_ask_ai').onclick = () => KY.go('#/ask-ai');
    $$('[data-step]', view).forEach((b) => (b.onclick = () => {
      const k = b.dataset.step;
      if (k === 'google') oauth('Google Business Profile', 'google.png', () => complete('google', 'Google Business Profile connected'), 'Select your business location',
        [['Bloom Dental Studio', '14 Marylebone High Street, London'], ['Bloom Dental — Kensington', 'Kensington High Street, London']]);
      if (k === 'facebook') oauth('Facebook & Instagram', 'facebook.png', () => complete('facebook', 'Facebook & Instagram connected'), 'Choose the pages to connect',
        [['Bloom Dental Studio', 'Facebook page · 2.4K followers'], ['@bloomdentalstudio', 'Instagram business account']]);
      if (k === 'widget') {
        const box = KY.modal({ title: 'Install the chat widget', wide: true,
          body: `<p class="muted" style="margin-top:0">Choose how to add the chat widget to <b>bloomdental.co.uk</b>.</p>
            <button class="lp-opt" id="lp_widget_copy">${icon('copy', 22)}<div><b>Copy the code</b><div class="muted" style="font-size:14px">Paste it just before the closing &lt;/body&gt; tag of your website</div></div></button>
            <button class="lp-opt" id="lp_widget_dev">${icon('mail', 22)}<div><b>Email it to your web developer</b><div class="muted" style="font-size:14px">We'll send the code and instructions</div></div></button>
            <button class="lp-opt" id="lp_widget_wp"><span style="color:#21759b">${icon('globe', 22)}</span><div><b>Using WordPress?</b><div class="muted" style="font-size:14px">Install the LeadConnector plugin and switch the widget on</div></div></button>
            <div class="lp-code" id="lp_widget_code" style="margin-top:6px">&lt;script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="65f2b1c9e4bloom01"&gt;&lt;/script&gt;</div>`,
          actions: [{ label: 'Close' }, { label: 'Mark as installed', primary: true, id: 'lp_widget_done', onClick: (close) => { close(); complete('widget', 'Chat widget marked as installed'); } }] });
        $('#lp_widget_copy', box).onclick = () => KY.toast('Code copied to clipboard');
        $('#lp_widget_dev', box).onclick = () => KY.toast('Instructions sent to your developer');
      }
      if (k === 'email') KY.go('#/settings/email-services');
      if (k === 'phone') KY.go('#/settings/phone-numbers');
      if (k === 'mobile') KY.modal({ title: 'Download the mobile app',
        body: `<div class="row" style="align-items:flex-start;gap:20px"><div style="padding:8px;border:1px solid var(--line-soft);border-radius:12px">${KY.qr(23, 150)}</div>
          <div><p style="margin-top:0">Scan the code with your phone's camera, or search for <b>Kyntlo</b> in the App Store or Google Play.</p>
          <p class="muted" style="font-size:14.5px">Log in with the same email and password you use here.</p>
          <div class="row"><input class="input" id="lp_sms_phone" value="${esc(data.me.name === 'Sarah Mitchell' ? '+44 7700 900111' : '')}"><button class="btn" id="lp_sms_link">Text me a link</button></div></div></div>`,
        actions: [{ label: "I've installed it", primary: true, id: 'lp_mobile_done', onClick: (close) => { close(); complete('mobile', 'Mobile app step completed'); } }] });
      const sms = $('#lp_sms_link');
      if (sms) sms.onclick = () => KY.toast('Download link sent by SMS');
    }));
  }

  KY.screen('launchpad', { tabs: [], render });
})();
