// Conversations — HighLevel's unified inbox: conversation list, thread with every
// channel (SMS, email, WhatsApp, Facebook, Instagram, live chat, calls, voicemail),
// composer with channel switcher, snippets, templates and schedule-send, and the
// contact panel. Plus the Manual Actions, Snippets and Trigger Links tabs.
(() => {
  const { esc, icon, money, $, $$, avatar } = KY;
  const data = KY.data;

  KY_ICONS.phoneIn = '<path d="M16 2v6h6M23 1l-7 7"/><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>';
  KY_ICONS.phoneOut = '<path d="M23 7V1h-6M16 8l7-7"/><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>';
  KY_ICONS.phoneMissed = '<path d="M23 1l-6 6M17 1l6 6"/><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>';
  KY_ICONS.voicemail = '<circle cx="6" cy="12" r="4"/><circle cx="18" cy="12" r="4"/><path d="M6 16h12"/>';
  KY_ICONS.braces = '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/>';
  KY_ICONS.userPlus = '<circle cx="9" cy="8" r="4"/><path d="M2 21c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5M19 8v6M16 11h6"/>';
  KY_ICONS.mailOpen = '<path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 9l9 6 9-6"/>';
  KY_ICONS.micOff = '<path d="M2 2l20 20M9 9v3a3 3 0 0 0 5.1 2.1M15 9.3V5a3 3 0 0 0-5.9-.7"/><path d="M17 16.9A7 7 0 0 1 5 12v-2M19 10v2a7 7 0 0 1-.1 1.2M12 19v3"/>';
  KY_ICONS.grid9 = '<circle cx="6" cy="6" r="1"/><circle cx="12" cy="6" r="1"/><circle cx="18" cy="6" r="1"/><circle cx="6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18" cy="12" r="1"/><circle cx="6" cy="18" r="1"/><circle cx="12" cy="18" r="1"/><circle cx="18" cy="18" r="1"/>';
  KY_ICONS.comment = '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>';
  KY_ICONS.starFill = '<path fill="currentColor" d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>';

  // ---------- Screen data (kept here, not in data.js) ----------
  const unknown = { id: 'cx1', name: '+44 7700 900456', email: '', phone: '+44 7700 900456', tags: [], source: 'Phone Call', created: '21 Oct 2026', last: '12 min ago', owner: '', value: 0 };
  const contactOf = (id) => (id === unknown.id ? unknown : data.contacts.find((c) => c.id === id));

  const CH = {
    sms: { label: 'SMS', icon: 'sms', color: '#12b76a' },
    whatsapp: { label: 'WhatsApp', icon: 'whatsapp', color: '#25a244' },
    email: { label: 'Email', icon: 'mail', color: '#2e90fa' },
    facebook: { label: 'Facebook', icon: 'facebook', color: '#1877f2' },
    instagram: { label: 'Instagram', icon: 'instagram', color: '#e1306c' },
    chat: { label: 'Live Chat', icon: 'chat', color: '#7f56d9' },
    call: { label: 'Call', icon: 'phone', color: '#49b584' },
    comment: { label: 'Internal Comment', icon: 'comment', color: '#b54708' },
  };

  const day = (text) => ({ type: 'day', text });
  const inbox = KY.data.inbox = KY.data.inbox || [
    { id: 'v1', contact: 'c1', unread: 2, starred: true, assigned: 'Sarah Mitchell', time: '5m', messages: [
      day('Yesterday'),
      { from: 'them', ch: 'facebook', text: 'Hi! Is the Invisalign free scan offer still running?', time: '18:20' },
      { from: 'us', ch: 'facebook', by: 'Sarah Mitchell', text: 'It is, Olivia! The free 3D scan offer runs until the end of October. Shall I email you the details?', time: '18:32' },
      { from: 'them', ch: 'facebook', text: 'Yes please, olivia.bennett@mail.com 😊', time: '18:35' },
      { from: 'us', ch: 'email', by: 'Sarah Mitchell', subject: 'Your free Invisalign scan at Bloom Dental', text: 'Hi Olivia, thanks for your interest! Your free consultation includes a 3D scan and a preview of your new smile. Treatment starts from £3,200, with 0% finance available.', time: '18:41' },
      day('Today'),
      ...data.conversations[0].messages.map((m) => ({ ...m, ch: 'sms' })),
    ] },
    { id: 'v9', contact: 'cx1', unread: 1, starred: false, assigned: '', time: '12m', messages: [
      day('Today'),
      { type: 'call', dir: 'missed', time: '09:41', line: 'Main line · +44 20 7946 0321' },
      { from: 'us', ch: 'sms', auto: 'Missed call text-back', text: "Hi, it's Bloom Dental Studio. Sorry we missed your call! How can we help? You can also book online at bloomdental.co.uk/book", time: '09:42' },
      { from: 'them', ch: 'sms', text: 'Hi! I chipped my front tooth this morning. Can someone see me today?', time: '09:47' },
    ] },
    { id: 'v2', contact: 'c2', unread: 1, starred: false, assigned: 'James Okafor', time: '1h', messages: [
      day('Today'),
      { from: 'them', ch: 'email', subject: 'Moving my check-up', ...data.conversations[1].messages[0] },
    ] },
    { id: 'v10', contact: 'c6', unread: 1, starred: false, assigned: 'Priya Shah', time: '2h', messages: [
      day('Today'),
      { type: 'call', dir: 'missed', time: '08:05', line: 'Main line · +44 20 7946 0321' },
      { type: 'voicemail', time: '08:05', dur: '0:34', text: "Hi, it's Noah Williams. I've got a check-up on Wednesday afternoon but something's come up at work. Could you call me back to move it? Thanks." },
    ] },
    { id: 'v3', contact: 'c3', unread: 0, starred: true, assigned: 'Priya Shah', time: '3h', messages: [day('Yesterday'), data.conversations[2].messages[0], day('Today'), data.conversations[2].messages[1]].map((m) => (m.type ? m : { ...m, ch: 'whatsapp' })) },
    { id: 'v6', contact: 'c4', unread: 0, starred: false, assigned: 'Sarah Mitchell', time: '1d', messages: [
      day('Tuesday'),
      ...data.conversations[5].messages.map((m) => ({ ...m, ch: 'facebook' })),
      { type: 'call', dir: 'out', time: '15:10', by: 'Sarah Mitchell', dur: '4:12', recording: true },
      { from: 'us', ch: 'sms', by: 'Sarah Mitchell', text: 'Lovely to speak to you, Liam. You are booked in for your implant consultation on Monday at 11:00. See you then!', time: '15:16' },
    ] },
    { id: 'v4', contact: 'c7', unread: 1, starred: false, assigned: '', time: '2d', messages: [day('Monday'), ...data.conversations[3].messages.map((m) => ({ ...m, ch: 'instagram' }))] },
    { id: 'v5', contact: 'c8', unread: 0, starred: false, assigned: 'James Okafor', time: '3d', messages: [day('Sunday'), ...data.conversations[4].messages.map((m) => ({ ...m, ch: 'chat' }))] },
    { id: 'v7', contact: 'c9', unread: 0, starred: false, assigned: 'Priya Shah', time: '4d', messages: [
      day('Friday'),
      { from: 'them', ch: 'email', subject: 'Invisalign aligners', text: 'Hi Priya, my second set of aligners feels tight. Is that normal?', time: '11:02' },
      { from: 'us', ch: 'email', by: 'Priya Shah', subject: 'Re: Invisalign aligners', text: 'Hi Isla, completely normal for the first two or three days with a new set. If it still hurts after that, give us a call.', time: '11:40' },
    ] },
  ];

  const snippets = KY.data.snippets = KY.data.snippets || [
    { id: 'sn1', name: 'Booking link', type: 'Text', folder: 'Bookings', body: 'Hi {{contact.first_name}}, you can pick a time that suits you here: bloomdental.co.uk/book. Any questions, just reply to this message!' },
    { id: 'sn2', name: 'Invisalign pricing', type: 'Text', folder: 'Treatments', body: 'Hi {{contact.first_name}}, Invisalign at Bloom starts from £3,200 with 0% finance, and your first consultation with a 3D scan is free.' },
    { id: 'sn3', name: 'Opening hours', type: 'Text', folder: 'General', body: "We're open Monday to Friday, 8am to 6pm, and Saturday mornings 9am to 1pm. We're at 14 Marylebone High Street, W1U 4NS." },
    { id: 'sn4', name: 'Review request', type: 'Text', folder: 'Reviews', body: 'Thanks for visiting Bloom today, {{contact.first_name}}! Would you mind leaving us a quick review? It really helps: bloomdental.co.uk/review' },
    { id: 'sn5', name: 'Treatment plan follow-up', type: 'Email', folder: 'Treatments', subject: 'Your treatment plan from Bloom Dental', body: 'Hi {{contact.first_name}}, thank you for coming in. Attached is your personalised treatment plan. Reply to this email or call us on +44 20 7946 0321 with any questions.' },
  ];
  const emailTemplates = [
    { id: 'et1', name: 'New patient welcome', subject: 'Welcome to Bloom Dental Studio', body: 'Hi {{contact.first_name}}, welcome to Bloom! Here is everything you need before your first visit.' },
    { id: 'et2', name: 'Appointment moved', subject: 'Your appointment has been moved', body: "Hi {{contact.first_name}}, no problem at all, we've moved your appointment. You'll get a confirmation shortly." },
    { id: 'et3', name: 'Whitening offer — £199', subject: 'Whitening for £199 this month', body: 'Hi {{contact.first_name}}, brighten your smile before the holidays with professional whitening for just £199.' },
  ];
  const triggerLinks = KY.data.triggerLinks = KY.data.triggerLinks || [
    { id: 'tl1', name: 'Book online', url: 'https://bloomdental.co.uk/book', key: '{{trigger_link.Xk29fL}}', clicks: 214 },
    { id: 'tl2', name: 'Invisalign offer', url: 'https://bloomdental.co.uk/invisalign', key: '{{trigger_link.Pq81aZ}}', clicks: 96 },
    { id: 'tl3', name: 'Leave a review', url: 'https://g.page/r/bloom-dental/review', key: '{{trigger_link.Rv55tM}}', clicks: 58 },
  ];

  const state = KY._conv = KY._conv || { filter: 'recents', q: '', extra: '', active: 'v1', ch: {}, draft: '', subject: '', keep: null };
  const EMOJI = ['😊', '👍', '🙏', '🦷', '✨', '📅', '❤️', '😀', '👋', '🎉', '✅', '😃'];

  const fill = (text, c) => text
    .replace(/\{\{contact\.first_name\}\}/g, c.name.startsWith('+') ? 'there' : c.name.split(' ')[0])
    .replace(/\{\{contact\.name\}\}/g, c.name);
  const lastMsg = (v) => [...v.messages].reverse().find((m) => m.type !== 'day');
  const lastCh = (v) => {
    const m = [...v.messages].reverse().find((x) => x.ch || x.type === 'call' || x.type === 'voicemail');
    return m.ch || 'call';
  };
  const preview = (m) => (m.type === 'call' ? (m.dir === 'missed' ? 'Missed call' : m.dir === 'out' ? 'Outgoing call' : 'Incoming call')
    : m.type === 'voicemail' ? 'Voicemail · ' + m.dur : m.type === 'event' ? m.text : (m.from === 'them' ? '' : 'You: ') + m.text);
  const chBadge = (ch, size = 13) => `<span class="cv-chb" style="background:${CH[ch].color}" title="${CH[ch].label}">${icon(CH[ch].icon, size)}</span>`;

  function css() {
    if ($('#css-conversations')) return;
    const s = document.createElement('style');
    s.id = 'css-conversations';
    s.textContent = `
      .cv { display: grid; grid-template-columns: 410px minmax(0,1fr) 360px; height: 100%; }
      .cv-list { background: #fff; border-right: 1px solid var(--line-soft); display: flex; flex-direction: column; min-height: 0; }
      .cv-filters { display: flex; border-bottom: 1px solid var(--line-soft); padding: 0 8px; }
      .cv-filters button { flex: 1; background: none; border: 0; border-bottom: 2px solid transparent; padding: 12px 4px; font-weight: 500; color: var(--ink-2); font-size: 15px; }
      .cv-filters button.on { color: var(--blue); border-bottom-color: var(--blue); font-weight: 600; }
      .cv-filters .n { display: inline-grid; place-items: center; min-width: 20px; height: 20px; border-radius: 10px; background: var(--blue); color: #fff; font-size: 12px; margin-left: 4px; padding: 0 5px; }
      .cv-items { flex: 1; overflow: auto; }
      .cv-item { display: flex; gap: 12px; padding: 13px 16px; border-bottom: 1px solid var(--line-soft); cursor: pointer; position: relative; }
      .cv-item:hover { background: #f9fafb; }
      .cv-item.on { background: var(--blue-soft); box-shadow: inset 3px 0 0 var(--blue); }
      .cv-item .who { position: relative; }
      .cv-item .who .cv-chb { position: absolute; right: -3px; bottom: -3px; border: 2px solid #fff; }
      .cv-item .nm { font-weight: 500; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .cv-item.unread .nm, .cv-item.unread .pv { font-weight: 700; color: var(--ink); }
      .cv-item .pv { color: var(--muted); font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .cv-item .tm { font-size: 13px; color: var(--faint); }
      .cv-item .ub { min-width: 20px; height: 20px; border-radius: 10px; background: var(--blue); color: #fff; font-size: 12px; font-weight: 700; display: grid; place-items: center; padding: 0 5px; }
      .cv-chb { width: 20px; height: 20px; border-radius: 50%; color: #fff; display: inline-grid; place-items: center; flex: none; }
      .cv-chb svg.i { stroke-width: 2.2; }
      .cv-mid { display: flex; flex-direction: column; min-width: 0; min-height: 0; background: var(--bg); }
      .cv-head { background: #fff; border-bottom: 1px solid var(--line-soft); padding: 10px 16px; display: flex; align-items: center; gap: 10px; min-height: 66px; }
      .cv-head .btn.icon { width: 38px; height: 38px; }
      .cv-thread { flex: 1; overflow: auto; padding: 18px 26px 10px; display: flex; flex-direction: column; gap: 12px; }
      .cv-day { align-self: center; font-size: 13px; color: var(--muted); background: #e4e7ec; border-radius: 999px; padding: 2px 12px; font-weight: 600; }
      .cv-msg { max-width: 66%; display: flex; flex-direction: column; gap: 4px; }
      .cv-msg.them { align-self: flex-start; }
      .cv-msg.us { align-self: flex-end; align-items: flex-end; }
      .cv-bub { padding: 10px 14px; border-radius: 14px; background: #fff; border: 1px solid var(--line-soft); font-size: 15.5px; white-space: pre-wrap; }
      .cv-msg.us .cv-bub { background: #d1e0ff; border-color: #b2ccff; }
      .cv-msg.us.ai .cv-bub { background: #ebe9fe; border-color: #d9d6fe; }
      .cv-msg.us.sched .cv-bub { background: #fff; border: 1.5px dashed #84adff; }
      .cv-bub .subj { font-weight: 700; display: block; margin-bottom: 4px; }
      .cv-meta { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted); }
      .cv-meta .cv-chb { width: 18px; height: 18px; }
      .cv-ai { display: inline-flex; align-items: center; gap: 3px; background: #ebe9fe; color: #5925dc; border-radius: 999px; padding: 0 8px; height: 20px; font-weight: 700; font-size: 12px; }
      .cv-auto { display: inline-flex; align-items: center; gap: 3px; background: var(--amber-soft); color: #b54708; border-radius: 999px; padding: 0 8px; height: 20px; font-weight: 700; font-size: 12px; }
      .cv-call { align-self: center; width: min(520px, 90%); background: #fff; border: 1px solid var(--line-soft); border-radius: 12px; padding: 12px 16px; }
      .cv-call .ci { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; flex: none; }
      .cv-player { display: flex; align-items: center; gap: 10px; margin-top: 10px; background: #f9fafb; border-radius: 8px; padding: 6px 10px; }
      .cv-player .pl { width: 30px; height: 30px; border-radius: 50%; border: 0; background: var(--blue); color: #fff; display: grid; place-items: center; }
      .cv-wave { flex: 1; height: 26px; display: flex; align-items: center; gap: 2px; }
      .cv-wave i { flex: 1; background: #b2ccff; border-radius: 2px; }
      .cv-wave i.p { background: var(--blue); }
      .cv-note { align-self: stretch; background: #fffaeb; border: 1px solid #fedf89; border-radius: 10px; padding: 10px 14px; font-size: 15px; }
      .cv-event { align-self: center; font-size: 13.5px; color: var(--muted); display: flex; align-items: center; gap: 6px; }
      .cv-comp { background: #fff; border-top: 1px solid var(--line-soft); padding: 10px 16px 12px; }
      .cv-chs { display: flex; gap: 4px; margin-bottom: 8px; flex-wrap: wrap; }
      .cv-chs button { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 11px; border-radius: 8px; border: 1px solid transparent; background: none; color: var(--ink-2); font-weight: 600; font-size: 14px; }
      .cv-chs button:hover { background: #f2f4f7; }
      .cv-chs button.on { background: var(--blue-soft); color: #004eeb; border-color: #b2ccff; }
      .cv-chs button.on.cm { background: var(--amber-soft); color: #b54708; border-color: #fedf89; }
      .cv-addr { display: flex; gap: 18px; font-size: 14px; color: var(--muted); margin-bottom: 8px; }
      .cv-addr b { color: var(--ink-2); font-weight: 600; }
      .cv-box { border: 1px solid var(--line); border-radius: 10px; }
      .cv-box.cm { background: #fffcf5; border-color: #fedf89; }
      .cv-box textarea { width: 100%; border: 0; outline: 0; resize: none; padding: 10px 12px; height: 74px; background: transparent; font-size: 15.5px; }
      .cv-box .subj { border: 0; border-bottom: 1px solid var(--line-soft); border-radius: 10px 10px 0 0; height: 40px; }
      .cv-tools { display: flex; align-items: center; gap: 2px; padding: 4px 6px; border-top: 1px solid var(--line-soft); }
      .cv-tools .btn.icon { width: 36px; height: 34px; color: var(--muted); }
      .cv-tools .btn.icon:hover { color: var(--blue); }
      .cv-att { display: inline-flex; align-items: center; gap: 6px; margin: 0 12px 8px; padding: 4px 10px; border-radius: 8px; background: #f2f4f7; font-size: 13px; font-weight: 600; }
      .cv-pop { position: absolute; z-index: 60; background: #fff; border: 1px solid var(--line); border-radius: 10px; box-shadow: 0 12px 28px rgba(16,24,40,.18); width: 420px; animation: pop .15s; }
      .cv-pop .ph { display: flex; align-items: center; padding: 12px 14px; border-bottom: 1px solid var(--line-soft); font-weight: 700; }
      .cv-pop .it { padding: 10px 14px; cursor: pointer; border-bottom: 1px solid var(--line-soft); }
      .cv-pop .it:hover { background: var(--blue-soft); }
      .cv-pop .it .d { font-size: 13.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .cv-emo { display: grid; grid-template-columns: repeat(6, 1fr); padding: 8px; width: 300px; }
      .cv-emo button { border: 0; background: none; font-size: 24px; padding: 6px; border-radius: 6px; }
      .cv-emo button:hover { background: #f2f4f7; }
      .cv-right { background: #fff; border-left: 1px solid var(--line-soft); overflow: auto; }
      .cv-right .sec { padding: 14px 18px; border-bottom: 1px solid var(--line-soft); }
      .cv-right .kv { display: flex; gap: 10px; align-items: center; margin: 9px 0; font-size: 15px; }
      .cv-right .kv svg { color: var(--faint); }
      .cv-right h4 { margin: 0 0 8px; font-size: 15px; display: flex; align-items: center; }
      .cv-dial { text-align: center; padding: 10px 0 4px; }
      .cv-dial .big { font-size: 22px; font-weight: 700; margin-top: 10px; }
      .cv-dial .st { color: var(--muted); margin: 4px 0 18px; }
      .cv-dial .ctrls { display: flex; justify-content: center; gap: 18px; }
      .cv-dial .ctrls button { width: 56px; height: 56px; border-radius: 50%; border: 1px solid var(--line); background: #fff; display: grid; place-items: center; }
      .cv-dial .ctrls button.on { background: var(--blue-soft); color: var(--blue); border-color: #b2ccff; }
      .cv-dial .ctrls .hang { background: var(--red); border-color: var(--red); color: #fff; }
      .cv-dial small { display: block; color: var(--muted); font-size: 12px; margin-top: 4px; }
    `;
    document.head.appendChild(s);
  }

  // ---------- Conversation list ----------
  function visible() {
    const q = state.q.toLowerCase();
    return inbox.filter((v) => {
      const c = contactOf(v.contact);
      if (state.filter === 'unread' && !v.unread && v.id !== state.keep) return false;
      if (state.filter === 'starred' && !v.starred) return false;
      if (state.filter === 'recents' && /d$/.test(v.time) && parseInt(v.time, 10) > 3) return false;
      if (state.extra === 'mine' && v.assigned !== data.me.name) return false;
      if (state.extra === 'unassigned' && v.assigned) return false;
      if (state.extra.startsWith('ch:') && !v.messages.some((m) => m.ch === state.extra.slice(3))) return false;
      return !q || c.name.toLowerCase().includes(q) || v.messages.some((m) => (m.text || '').toLowerCase().includes(q));
    });
  }

  const extraLabel = () => (state.extra === 'mine' ? 'Assigned to me' : state.extra === 'unassigned' ? 'Unassigned'
    : state.extra.startsWith('ch:') ? `Channel: ${CH[state.extra.slice(3)].label}` : '');

  function drawList() {
    const box = $('#cv_list_wrap');
    if (!box) return;
    const unread = inbox.filter((v) => v.unread).length;
    const rows = visible();
    box.innerHTML = `
      <div style="padding:14px 16px 10px">
        <div class="row" style="gap:8px">
          <div class="search" style="flex:1"><span>${icon('search', 18)}</span><input class="input" id="cv_search" placeholder="Search conversations" value="${esc(state.q)}"></div>
          <button class="btn icon" id="cv_filter" title="Filters">${icon('filter', 18)}</button>
          <button class="btn icon primary" id="cv_new" title="New message">${icon('edit', 18)}</button>
        </div>
        ${state.extra ? `<div class="row" style="margin-top:10px"><span class="chip blue" id="cv_extra">${esc(extraLabel())}
          <button class="btn ghost" id="cv_filter_clear" style="height:20px;padding:0;color:inherit">${icon('x', 14)}</button></span></div>` : ''}
      </div>
      <div class="cv-filters" id="cv_tabs">
        ${[['unread', 'Unread'], ['recents', 'Recents'], ['starred', 'Starred'], ['all', 'All']].map(([k, l]) =>
          `<button id="cv_f_${k}" class="${state.filter === k ? 'on' : ''}" data-f="${k}">${l}${k === 'unread' && unread ? `<span class="n">${unread}</span>` : ''}</button>`).join('')}
      </div>
      <div class="cv-items" id="cv_items">
        ${rows.map((v) => {
          const c = contactOf(v.contact);
          const m = lastMsg(v);
          return `<div class="cv-item ${v.id === state.active ? 'on' : ''} ${v.unread ? 'unread' : ''}" id="cv_item_${v.id}" data-v="${v.id}">
            <div class="who">${avatar(c.name.startsWith('+') ? '#' : c.name, 42)}${chBadge(lastCh(v), 11)}</div>
            <div style="flex:1;min-width:0">
              <div class="row" style="gap:6px"><span class="nm">${esc(c.name)}</span>
                ${v.starred ? `<span style="color:#fdb022">${icon('starFill', 15)}</span>` : ''}<span class="tm">${esc(v.time)}</span></div>
              <div class="row" style="gap:6px;margin-top:2px"><span class="pv" style="flex:1">${esc(preview(m))}</span>
                ${v.assigned ? `<span title="Assigned to ${esc(v.assigned)}">${avatar(v.assigned, 20)}</span>` : ''}
                ${v.unread ? `<span class="ub">${v.unread}</span>` : ''}</div>
            </div></div>`;
        }).join('') || `<div class="empty"><div class="big">No conversations</div>Nothing matches this view.</div>`}
      </div>`;
    const s = $('#cv_search');
    s.oninput = () => { state.q = s.value; const p = s.selectionStart; drawList(); const n = $('#cv_search'); n.focus(); n.setSelectionRange(p, p); };
    $$('[data-f]', box).forEach((b) => (b.onclick = () => { state.filter = b.dataset.f; state.keep = state.active; drawList(); }));
    $$('[data-v]', box).forEach((el) => (el.onclick = () => open(el.dataset.v)));
    $('#cv_filter').onclick = (e) => KY.menu(e.currentTarget, [
      { label: 'Assigned to me', icon: 'user', onClick: () => setExtra('mine') },
      { label: 'Unassigned', icon: 'userPlus', onClick: () => setExtra('unassigned') },
      ...['sms', 'email', 'whatsapp', 'facebook', 'instagram', 'chat'].map((k) => ({ label: `Channel: ${CH[k].label}`, icon: CH[k].icon, onClick: () => setExtra('ch:' + k) })),
    ]);
    if ($('#cv_filter_clear')) $('#cv_filter_clear').onclick = () => setExtra('');
    $('#cv_new').onclick = () => KY.modal({
      title: 'New message',
      body: `<div class="field"><label>To</label><select class="select">${data.contacts.slice(0, 10).map((c) => `<option>${esc(c.name)}</option>`).join('')}</select></div>
        <div class="field"><label>Channel</label><select class="select"><option>SMS</option><option>Email</option><option>WhatsApp</option></select></div>
        <div class="field"><label>Message</label><textarea class="input" rows="4"></textarea></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Send', primary: true, onClick: (close) => { close(); KY.toast('Message sent'); } }],
    });
  }
  const setExtra = (x) => { state.extra = x; drawList(); };

  function open(id) {
    state.active = id;
    state.keep = id;
    const v = inbox.find((x) => x.id === id);
    v.unread = 0;
    state.draft = '';
    state.subject = '';
    state.attach = null;
    history.replaceState(null, '', `#/conversations/conversations/${id}`);
    drawList();
    drawThread();
    drawPanel();
  }

  // ---------- Thread ----------
  const wave = (n = 46, played = 0) => `<div class="cv-wave">${Array.from({ length: n }, (_, i) =>
    `<i class="${i < played ? 'p' : ''}" style="height:${30 + Math.round(Math.abs(Math.sin(i * 1.7) * 55 + Math.sin(i * .5) * 15))}%"></i>`).join('')}</div>`;

  function msgHtml(m, i, c) {
    if (m.type === 'day') return `<div class="cv-day">${esc(m.text)}</div>`;
    if (m.type === 'event') return `<div class="cv-event">${icon(m.icon || 'user', 15)} ${esc(m.text)} · ${esc(m.time)}</div>`;
    if (m.type === 'call') {
      const kind = m.dir === 'missed' ? ['Missed call', 'phoneMissed', 'var(--red-soft)', 'var(--red)'] : m.dir === 'out' ? ['Outgoing call', 'phoneOut', 'var(--green-soft)', 'var(--green)'] : ['Incoming call', 'phoneIn', 'var(--green-soft)', 'var(--green)'];
      return `<div class="cv-call" id="cv_msg_${i}"><div class="row">
          <span class="ci" style="background:${kind[2]};color:${kind[3]}">${icon(kind[1], 20)}</span>
          <div style="flex:1"><div class="bold">${kind[0]}</div>
            <div class="muted" style="font-size:14px">${m.dir === 'missed' ? `From ${esc(c.phone)} · ${esc(m.line || '')}` : `${esc(m.by || '')} · ${esc(m.dur)}`}</div></div>
          <span class="faint" style="font-size:13px">${esc(m.time)}</span></div>
        ${m.recording ? `<div class="cv-player"><button class="pl" id="cv_play_${i}">${icon('play', 14)}</button>${wave()}<span class="muted" style="font-size:13px">${esc(m.dur)}</span><span class="chip" style="height:22px">Recording</span></div>` : ''}
      </div>`;
    }
    if (m.type === 'voicemail') {
      return `<div class="cv-call" id="cv_msg_${i}"><div class="row">
          <span class="ci" style="background:var(--blue-soft);color:var(--blue)">${icon('voicemail', 20)}</span>
          <div style="flex:1"><div class="bold">Voicemail</div><div class="muted" style="font-size:14px">From ${esc(c.phone)} · ${esc(m.dur)}</div></div>
          <span class="faint" style="font-size:13px">${esc(m.time)}</span></div>
        <div class="cv-player"><button class="pl" id="cv_play_${i}">${icon('play', 14)}</button>${wave()}<span class="muted" style="font-size:13px">${esc(m.dur)}</span></div>
        <div style="margin-top:10px;font-size:14.5px"><span class="muted bold" style="font-size:12px;letter-spacing:.04em">TRANSCRIPT</span><div style="font-style:italic">“${esc(m.text)}”</div></div>
      </div>`;
    }
    if (m.ch === 'comment') {
      return `<div class="cv-note" id="cv_msg_${i}"><div class="cv-meta" style="color:#b54708;margin-bottom:4px">${icon('comment', 15)} <b>Internal comment</b> · ${esc(m.by)} · ${esc(m.time)} · only your team can see this</div>${esc(m.text)}</div>`;
    }
    const side = m.from === 'them' ? 'them' : 'us';
    const who = m.from === 'them' ? c.name.split(' ')[0] : m.from === 'ai' ? '' : m.auto ? '' : (m.by || data.me.name);
    return `<div class="cv-msg ${side} ${m.from === 'ai' ? 'ai' : ''} ${m.scheduled ? 'sched' : ''}" id="cv_msg_${i}">
      <div class="cv-bub">${m.subject ? `<span class="subj">${esc(m.subject)}</span>` : ''}${esc(m.text)}</div>
      ${m.attach ? `<span class="cv-att" style="margin:0">${icon('paperclip', 14)} ${esc(m.attach)}</span>` : ''}
      <div class="cv-meta">${chBadge(m.ch)} ${CH[m.ch].label}
        ${m.from === 'ai' ? `<span class="cv-ai">${icon('sparkle', 12)} AI</span> <span>Conversation AI</span>` : ''}
        ${m.auto ? `<span class="cv-auto">${icon('automation', 12)} ${esc(m.auto)}</span><span>Sent by workflow</span>` : ''}
        ${who ? `· ${esc(who)}` : ''} · ${m.scheduled ? `<b style="color:var(--blue)">${icon('clock', 13)} Scheduled for ${esc(m.scheduled)}</b>
          <button class="btn ghost sm" id="cv_sched_cancel" style="height:22px;padding:0 6px">Cancel</button>` : esc(m.time)}</div>
    </div>`;
  }

  function drawThread() {
    const v = inbox.find((x) => x.id === state.active);
    const c = contactOf(v.contact);
    const mid = $('#cv_mid');
    const ch = state.ch[v.id] || (lastCh(v) === 'call' ? 'sms' : lastCh(v));
    state.ch[v.id] = ch;
    mid.innerHTML = `
      <div class="cv-head" id="cv_head">
        ${avatar(c.name.startsWith('+') ? '#' : c.name, 40)}
        <div style="min-width:0"><div class="bold" style="font-size:17px">${esc(c.name)}</div>
          <div class="muted" style="font-size:14px">${esc([c.phone, c.email].filter(Boolean).join(' · '))}</div></div>
        <span class="spacer"></span>
        <button class="btn sm" id="cv_assign">${v.assigned ? avatar(v.assigned, 22) : icon('userPlus', 16)} ${esc(v.assigned || 'Unassigned')} ${icon('chevron', 15)}</button>
        <button class="btn icon" id="cv_star" title="${v.starred ? 'Unstar' : 'Star'}" style="color:${v.starred ? '#fdb022' : 'var(--muted)'}">${icon(v.starred ? 'starFill' : 'star', 19)}</button>
        <button class="btn icon" id="cv_unread" title="Mark as unread">${icon('mailOpen', 19)}</button>
        <button class="btn icon" id="cv_call" title="Call" style="color:var(--green)">${icon('phone', 19)}</button>
        <button class="btn icon" id="cv_more" title="More">${icon('more', 19)}</button>
      </div>
      <div class="cv-thread" id="cv_thread">${v.messages.map((m, i) => msgHtml(m, i, c)).join('')}</div>
      <div class="cv-comp" id="cv_composer"></div>`;
    const th = $('#cv_thread');
    th.scrollTop = th.scrollHeight;
    $('#cv_assign').onclick = (e) => KY.menu(e.currentTarget, [...data.team.map((t) => ({ label: t.name, icon: 'user', onClick: () => assign(v, t.name) })),
      { label: 'Unassigned', icon: 'x', onClick: () => assign(v, '') }]);
    $('#cv_star').onclick = () => { v.starred = !v.starred; drawList(); drawThread(); KY.toast(v.starred ? 'Conversation starred' : 'Star removed'); };
    $('#cv_unread').onclick = () => { v.unread = Math.max(1, v.unread); drawList(); KY.toast('Marked as unread'); };
    $('#cv_call').onclick = () => dial(v, c);
    $('#cv_more').onclick = (e) => KY.menu(e.currentTarget, [
      { label: 'View contact', icon: 'user', onClick: () => c.id !== unknown.id && KY.go(`#/contacts/detail/${c.id}`) },
      { label: 'Mark as unread', icon: 'mailOpen', onClick: () => $('#cv_unread').click() },
      { label: 'Delete conversation', icon: 'trash', onClick: () => KY.toast('Only admins can delete conversations', 'warn') },
    ]);
    $$('[id^="cv_play_"]', mid).forEach((b) => (b.onclick = () => {
      const w = b.parentElement.querySelector('.cv-wave');
      b.innerHTML = icon('pause', 14);
      $$('i', w).forEach((bar, k) => setTimeout(() => bar.classList.add('p'), k * 60));
    }));
    if ($('#cv_sched_cancel')) $('#cv_sched_cancel').onclick = () => { v.messages = v.messages.filter((m) => !m.scheduled); drawThread(); KY.toast('Scheduled message cancelled'); };
    drawComposer(v, c);
  }

  function assign(v, name) {
    v.assigned = name;
    v.messages.push({ type: 'event', icon: 'userPlus', text: name ? `Assigned to ${name} by ${data.me.name}` : `Unassigned by ${data.me.name}`, time: 'Just now' });
    drawList(); drawThread(); drawPanel();
    KY.toast(name ? `Conversation assigned to ${name}` : 'Conversation unassigned');
  }

  // ---------- Composer ----------
  function drawComposer(v, c) {
    const box = $('#cv_composer');
    const ch = state.ch[v.id];
    const isEmail = ch === 'email';
    const isCm = ch === 'comment';
    const to = isEmail ? c.email : ['facebook', 'instagram', 'chat'].includes(ch) ? c.name : c.phone;
    const from = isEmail ? `${data.me.name} <hello@bloomdental.co.uk>` : ch === 'whatsapp' ? 'Bloom Dental (WhatsApp) · +44 20 7946 0321' : ch === 'facebook' ? 'Bloom Dental Studio (Page)' : ch === 'instagram' ? '@bloomdentalstudio' : ch === 'chat' ? 'Website chat widget' : data.business.phone;
    const len = state.draft.length;
    box.innerHTML = `
      <div class="cv-chs" id="cv_channels">
        ${['sms', 'whatsapp', 'email', 'facebook', 'instagram', 'chat', 'comment'].map((k) =>
          `<button id="cv_ch_${k}" data-ch="${k}" class="${k === ch ? 'on' : ''} ${k === 'comment' ? 'cm' : ''}">${icon(CH[k].icon, 16)} ${CH[k].label}</button>`).join('')}
      </div>
      ${isCm ? `<div class="cv-addr"><span>Visible to your team only. Type <b>@</b> to mention a teammate.</span></div>`
        : `<div class="cv-addr"><span>From: <b>${esc(from)}</b></span><span>To: <b>${esc(to || '—')}</b></span></div>`}
      <div class="cv-box ${isCm ? 'cm' : ''}" id="cv_box">
        ${isEmail ? `<input class="input subj" id="cv_subject" placeholder="Subject" value="${esc(state.subject)}">` : ''}
        ${state.attach ? `<span class="cv-att" style="margin-top:8px">${icon('paperclip', 14)} ${esc(state.attach)}</span>` : ''}
        <textarea id="cv_text" placeholder="${isCm ? 'Add an internal comment…' : `Type a message (${CH[ch].label})…`}">${esc(state.draft)}</textarea>
        <div class="cv-tools">
          <button class="btn ghost icon" id="cv_emoji" title="Emoji">${icon('smile', 19)}</button>
          <button class="btn ghost icon" id="cv_attach" title="Attach file">${icon('paperclip', 19)}</button>
          <button class="btn ghost icon" id="cv_snippets" title="Snippets">${icon('braces', 19)}</button>
          ${isEmail ? `<button class="btn ghost sm" id="cv_templates" style="color:var(--muted)">${icon('note', 17)} Templates</button>` : ''}
          <button class="btn ghost icon" id="cv_triggerlink" title="Trigger links">${icon('link', 19)}</button>
          <span class="spacer"></span>
          ${ch === 'sms' ? `<span class="faint" style="font-size:13px;margin-right:8px" id="cv_count">${len} / 160 · ${Math.max(1, Math.ceil(len / 160))} segment${len > 160 ? 's' : ''}</span>` : ''}
          <button class="btn ghost sm" id="cv_clear" style="color:var(--muted)">Clear</button>
          ${isCm ? '' : `<button class="btn icon" id="cv_schedule" title="Schedule message" style="height:36px">${icon('clock', 18)}</button>`}
          <button class="btn primary" id="cv_send" style="height:36px">${isCm ? 'Add comment' : 'Send'} ${icon('send', 16)}</button>
        </div>
      </div>`;
    const t = $('#cv_text');
    t.oninput = () => { state.draft = t.value; const n = $('#cv_count'); if (n) n.textContent = `${t.value.length} / 160 · ${Math.max(1, Math.ceil(t.value.length / 160))} segment${t.value.length > 160 ? 's' : ''}`; };
    if ($('#cv_subject')) $('#cv_subject').oninput = (e) => (state.subject = e.target.value);
    $$('[data-ch]', box).forEach((b) => (b.onclick = () => { state.ch[v.id] = b.dataset.ch; drawComposer(v, c); }));
    $('#cv_clear').onclick = () => { state.draft = ''; state.subject = ''; state.attach = null; drawComposer(v, c); };
    $('#cv_emoji').onclick = (e) => pop(e.currentTarget, `<div class="cv-emo" id="cv_emoji_pop">${EMOJI.map((em) => `<button data-e="${em}">${em}</button>`).join('')}</div>`, (p) => {
      $$('[data-e]', p).forEach((b) => (b.onclick = () => { insert(b.dataset.e); p.remove(); }));
    }, 300);
    $('#cv_attach').onclick = () => { state.attach = 'Bloom-aftercare-guide.pdf'; drawComposer(v, c); KY.toast('File attached'); };
    $('#cv_snippets').onclick = (e) => snippetPop(e.currentTarget, c, isEmail);
    if ($('#cv_templates')) $('#cv_templates').onclick = (e) => pop(e.currentTarget, `<div id="cv_tpl_pop"><div class="ph">Email templates</div>
        ${emailTemplates.map((tp) => `<div class="it" id="cv_tpl_${tp.id}" data-t="${tp.id}"><div class="bold">${esc(tp.name)}</div><div class="d">${esc(tp.subject)}</div></div>`).join('')}</div>`, (p) => {
      $$('[data-t]', p).forEach((it) => (it.onclick = () => {
        const tp = emailTemplates.find((x) => x.id === it.dataset.t);
        state.subject = tp.subject; state.draft = fill(tp.body, c); p.remove(); drawComposer(v, c);
      }));
    });
    $('#cv_triggerlink').onclick = (e) => pop(e.currentTarget, `<div id="cv_tl_pop"><div class="ph">Trigger links</div>
        ${triggerLinks.map((l) => `<div class="it" data-l="${l.id}"><div class="bold">${esc(l.name)}</div><div class="d">${esc(l.url)}</div></div>`).join('')}</div>`, (p) => {
      $$('[data-l]', p).forEach((it) => (it.onclick = () => { insert(triggerLinks.find((l) => l.id === it.dataset.l).key); p.remove(); }));
    });
    if ($('#cv_schedule')) $('#cv_schedule').onclick = () => schedule(v, c);
    $('#cv_send').onclick = () => send(v, c);
  }

  function insert(text) {
    const t = $('#cv_text');
    const s = t.selectionStart ?? t.value.length;
    t.value = t.value.slice(0, s) + text + t.value.slice(t.selectionEnd ?? s);
    t.dispatchEvent(new Event('input'));
    t.focus();
  }

  function pop(anchor, html, wire, width = 420) {
    $$('.cv-pop').forEach((p) => p.remove());
    const r = anchor.getBoundingClientRect();
    const p = document.createElement('div');
    p.className = 'cv-pop';
    p.style.width = width + 'px';
    p.innerHTML = html;
    document.body.appendChild(p);
    p.style.left = Math.min(r.left, innerWidth - width - 16) + 'px';
    p.style.top = Math.max(70, r.top - p.offsetHeight - 8) + 'px';
    wire(p);
    setTimeout(() => document.addEventListener('mousedown', function off(e) {
      if (!p.contains(e.target) && !anchor.contains(e.target)) { p.remove(); document.removeEventListener('mousedown', off); }
    }), 0);
    return p;
  }

  function snippetPop(anchor, c, isEmail) {
    const draw = (p, q = '') => {
      const list = snippets.filter((s) => !q || (s.name + s.body).toLowerCase().includes(q.toLowerCase()));
      $('#cv_snip_list', p).innerHTML = list.map((s) => `<div class="it" id="cv_snip_${s.id}" data-s="${s.id}">
          <div class="row"><span class="bold">${esc(s.name)}</span><span class="spacer"></span><span class="chip" style="height:22px">${esc(s.type)}</span></div>
          <div class="d">${esc(s.body)}</div></div>`).join('') || '<div class="muted" style="padding:14px">No snippets found.</div>';
      $$('[data-s]', p).forEach((it) => (it.onclick = () => {
        const s = snippets.find((x) => x.id === it.dataset.s);
        if (isEmail && s.subject && !state.subject) state.subject = s.subject;
        p.remove();
        if (isEmail && s.subject) { state.draft = (state.draft ? state.draft + ' ' : '') + fill(s.body, c); const v = inbox.find((x) => x.id === state.active); drawComposer(v, c); }
        else insert(fill(s.body, c));
      }));
    };
    pop(anchor, `<div id="cv_snip_pop"><div class="ph">Snippets<span class="spacer"></span><a href="#/conversations/snippets" id="cv_snip_manage" style="font-weight:600;font-size:14px">Manage</a></div>
      <div style="padding:10px 14px;border-bottom:1px solid var(--line-soft)"><div class="search"><span>${icon('search', 18)}</span><input class="input" id="cv_snip_search" placeholder="Search snippets"></div></div>
      <div id="cv_snip_list" style="max-height:340px;overflow:auto"></div></div>`, (p) => {
      draw(p);
      $('#cv_snip_search', p).oninput = (e) => draw(p, e.target.value);
    });
  }

  function send(v, c, scheduled) {
    const ch = state.ch[v.id];
    const text = state.draft.trim();
    if (!text && !state.attach) return KY.toast('Type a message first', 'warn');
    const m = { from: 'us', ch, by: data.me.name, text, time: 'Just now' };
    if (ch === 'email') m.subject = state.subject || '(no subject)';
    if (state.attach) m.attach = state.attach;
    if (scheduled) m.scheduled = scheduled;
    v.messages.push(m);
    v.time = 'now';
    state.draft = ''; state.subject = ''; state.attach = null;
    drawThread(); drawList();
    KY.toast(scheduled ? `Message scheduled for ${scheduled}` : ch === 'comment' ? 'Internal comment added' : `${CH[ch].label} sent`);
  }

  function schedule(v, c) {
    if (!state.draft.trim()) return KY.toast('Type a message first', 'warn');
    KY.modal({
      title: 'Schedule message',
      body: `<p class="muted" style="margin:0 0 16px">The message is sent automatically at the time you choose. You can cancel it until then.</p>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
          <div class="field"><label>Date</label><select class="select" id="cv_sched_date">
            ${['Thu 22 Oct 2026', 'Fri 23 Oct 2026', 'Mon 26 Oct 2026', 'Tue 27 Oct 2026'].map((d) => `<option>${d}</option>`).join('')}</select></div>
          <div class="field"><label>Time</label><select class="select" id="cv_sched_time">
            ${['08:00', '08:30', '09:00', '09:30', '10:00', '12:00', '17:00'].map((t) => `<option ${t === '09:00' ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
        </div>
        <div class="field"><label>Time zone</label><input class="input" value="Europe/London (GMT+1)" disabled></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Schedule', primary: true, id: 'cv_sched_save', onClick: (close, box) => {
        const when = `${$('#cv_sched_date', box).value.replace(' 2026', '')}, ${$('#cv_sched_time', box).value}`;
        close(); send(v, c, when);
      } }],
    });
  }

  // ---------- Calling ----------
  function dial(v, c) {
    let secs = 0;
    let timer;
    const box = KY.modal({
      title: 'Call',
      body: `<div class="cv-dial" id="cv_dialer">${avatar(c.name.startsWith('+') ? '#' : c.name, 72).replace('class="avatar"', 'class="avatar" style="margin:0 auto;width:72px;height:72px"')}
        <div class="big">${esc(c.name)}</div><div class="st" id="cv_dial_status">Calling ${esc(c.phone)}…</div>
        <div class="muted" style="font-size:14px;margin:-8px 0 18px">From ${esc(data.business.phone)} · Bloom main line · ${icon('mic', 14)} Recording on</div>
        <div class="ctrls">
          <div><button id="cv_mute">${icon('micOff', 22)}</button><small>Mute</small></div>
          <div><button id="cv_keypad">${icon('grid9', 22)}</button><small>Keypad</small></div>
          <div><button id="cv_transfer">${icon('arrowRight', 22)}</button><small>Transfer</small></div>
          <div><button class="hang" id="cv_hangup">${icon('phone', 22)}</button><small>Hang up</small></div>
        </div></div>`,
    });
    setTimeout(() => {
      const st = $('#cv_dial_status', box);
      if (!st) return;
      timer = setInterval(() => { secs++; st.textContent = `Connected · 0:${String(secs).padStart(2, '0')}`; }, 1000);
      st.textContent = 'Connected · 0:00';
      st.style.color = 'var(--green)';
    }, 1600);
    $('#cv_mute', box).onclick = (e) => e.currentTarget.classList.toggle('on');
    $('#cv_keypad', box).onclick = (e) => e.currentTarget.classList.toggle('on');
    $('#cv_transfer', box).onclick = (e) => KY.menu(e.currentTarget, data.team.slice(1).map((t) => ({ label: `Transfer to ${t.name}`, icon: 'user', onClick: () => KY.toast(`Transferring to ${t.name}`) })));
    $('#cv_hangup', box).onclick = () => {
      clearInterval(timer);
      box.closest('.overlay').remove();
      const dur = `${Math.floor((secs + 95) / 60)}:${String((secs + 95) % 60).padStart(2, '0')}`;
      v.messages.push({ type: 'call', dir: 'out', time: 'Just now', by: data.me.name, dur, recording: true });
      v.time = 'now';
      drawThread(); drawList();
      KY.toast('Call ended · recording saved to the conversation');
    };
  }

  // ---------- Contact panel ----------
  function drawPanel() {
    const v = inbox.find((x) => x.id === state.active);
    const c = contactOf(v.contact);
    const opps = data.opportunities.filter((o) => o.contact === c.id);
    const appts = data.appointments.filter((a) => a.contact === c.id);
    const tagChip = (t) => `<span class="chip ${t === 'vip' ? 'purple' : t.includes('lead') ? 'blue' : ''}">${esc(t)}</span>`;
    $('#cv_right').innerHTML = `
      <div class="sec" style="text-align:center;padding:20px 18px">
        <div style="display:flex;justify-content:center">${avatar(c.name.startsWith('+') ? '#' : c.name, 64)}</div>
        <div class="bold" style="font-size:19px;margin-top:8px">${esc(c.name)}</div>
        <div class="muted" style="font-size:14px">${c.id === unknown.id ? 'New contact · created from a phone call' : `Contact since ${esc(c.created)}`}</div>
        <div class="row" style="justify-content:center;margin-top:12px;gap:8px">
          ${c.id === unknown.id ? `<button class="btn sm" id="cv_addname">${icon('edit', 15)} Add name</button>` : `<a class="btn sm" id="cv_viewcontact" href="#/contacts/detail/${c.id}">${icon('user', 15)} View contact</a>`}
        </div>
      </div>
      <div class="sec" id="cv_details">
        <h4>Contact details</h4>
        <div class="kv">${icon('phone', 17)}<span>${esc(c.phone || '—')}</span></div>
        <div class="kv">${icon('mail', 17)}<span>${esc(c.email || 'No email yet')}</span></div>
        <div class="kv">${icon('user', 17)}<span>Owner: ${esc(c.owner || 'Unassigned')}</span></div>
        <div class="kv">${icon('globe', 17)}<span>Source: ${esc(c.source)}</span></div>
      </div>
      <div class="sec"><h4>Tags</h4><div class="row" style="flex-wrap:wrap;gap:6px">${c.tags.map(tagChip).join('') || '<span class="muted" style="font-size:14px">No tags</span>'}</div></div>
      <div class="sec" id="cv_opps"><h4>Opportunities<span class="spacer"></span><button class="btn ghost icon sm" style="height:28px;width:28px">${icon('plus', 16)}</button></h4>
        ${opps.map((o) => `<div class="card" style="padding:10px 12px;margin:8px 0;box-shadow:none"><div class="bold" style="font-size:14.5px">${esc(o.name)}</div>
          <div class="row muted" style="font-size:13.5px">${esc(data.pipelines.find((p) => p.id === o.pipeline).stages[o.stage])}<span class="spacer"></span><b style="color:var(--ink)">${money(o.value)}</b></div></div>`).join('') || '<div class="muted" style="font-size:14px">No opportunities</div>'}
      </div>
      <div class="sec" id="cv_appts"><h4>Appointments<span class="spacer"></span><button class="btn ghost icon sm" id="cv_book" style="height:28px;width:28px">${icon('plus', 16)}</button></h4>
        ${appts.map((a) => `<div class="card" style="padding:10px 12px;margin:8px 0;box-shadow:none"><div class="bold" style="font-size:14.5px">${esc(data.calendars.find((k) => k.id === a.calendar).name)}</div>
          <div class="muted" style="font-size:13.5px">${esc(data.week[a.day])} Oct · ${a.start}</div></div>`).join('') || '<div class="muted" style="font-size:14px">No upcoming appointments</div>'}
      </div>
      <div class="sec"><h4>DND</h4><div class="row" style="font-size:14.5px"><button class="toggle"></button> Do not disturb (all channels)</div></div>`;
    KY.toggles($('#cv_right'));
    $('#cv_book').onclick = () => KY.go('#/calendars/calendar');
    if ($('#cv_addname')) $('#cv_addname').onclick = () => KY.toast('Open the contact to add their name');
  }

  function inboxView(view, id) {
    if (id && inbox.some((v) => v.id === id)) state.active = id;
    state.keep = state.active;
    inbox.find((v) => v.id === state.active).unread = 0;
    view.style.padding = '0';
    view.style.overflow = 'hidden';
    view.innerHTML = `<div class="cv" id="cv_root">
        <section class="cv-list" id="cv_list_wrap"></section>
        <section class="cv-mid" id="cv_mid"></section>
        <aside class="cv-right" id="cv_right"></aside>
      </div>`;
    drawList(); drawThread(); drawPanel();
  }

  // ---------- Manual Actions ----------
  function manualView(view) {
    const rows = [
      ['Call', 'Olivia Bennett', 'New Lead — Instant Follow-up', 'Call new Invisalign lead within 5 minutes', 'Sarah Mitchell', 'Due now'],
      ['Call', 'Sophie Turner', 'New Lead — Instant Follow-up', 'Call new Invisalign lead within 5 minutes', 'James Okafor', 'Due now'],
      ['Call', 'Grace Wright', 'No-show Recovery', 'Call to re-book missed check-up', 'James Okafor', 'Today'],
      ['SMS', 'Lucas Green', '6-Month Recall Reactivation', 'Personal text: check-up is overdue', 'Priya Shah', 'Today'],
      ['SMS', 'Amelia Baker', '6-Month Recall Reactivation', 'Personal text: check-up is overdue', 'Priya Shah', 'Tomorrow'],
    ];
    view.innerHTML = `
      <div class="page-head"><h1>Manual Actions</h1><span class="sub">Calls and texts your workflows ask a person to do</span>
        <div class="actions"><select class="select" style="width:220px"><option>All team members</option>${data.team.map((t) => `<option>${esc(t.name)}</option>`).join('')}</select></div></div>
      <div class="grid" style="grid-template-columns:1fr 1fr;margin-bottom:20px">
        ${[['phone', 'Calls', 3, 'Start calling', 'ma_calls'], ['sms', 'SMS', 2, 'Start texting', 'ma_sms']].map(([ic, n, k, b, id]) => `
          <div class="card row" style="padding:20px 22px;gap:16px"><span class="ci" style="width:48px;height:48px;border-radius:12px;background:var(--blue-soft);color:var(--blue);display:grid;place-items:center">${icon(ic, 24)}</span>
            <div><div class="muted" style="font-size:14px">${n} pending</div><div style="font-size:28px;font-weight:700">${k}</div></div><span class="spacer"></span>
            <button class="btn primary" id="${id}">${b} ${icon('arrowRight', 16)}</button></div>`).join('')}
      </div>
      <div class="card"><table class="t" id="ma_table"><thead><tr><th>Type</th><th>Contact</th><th>Workflow</th><th>Instructions</th><th>Assigned to</th><th>Due</th></tr></thead>
        <tbody>${rows.map((r) => `<tr><td><span class="chip ${r[0] === 'Call' ? 'green' : 'blue'}">${icon(r[0] === 'Call' ? 'phone' : 'sms', 14)} ${r[0]}</span></td>
          <td><div class="row">${avatar(r[1], 30)}<b>${esc(r[1])}</b></div></td><td class="muted">${esc(r[2])}</td><td>${esc(r[3])}</td><td>${esc(r[4])}</td>
          <td><span class="chip ${r[5] === 'Due now' ? 'red' : r[5] === 'Today' ? 'amber' : ''}">${r[5]}</span></td></tr>`).join('')}</tbody></table></div>`;
    $('#ma_calls').onclick = () => KY.go('#/conversations/conversations/v1');
    $('#ma_sms').onclick = () => KY.toast('Opening the first pending text…');
  }

  // ---------- Snippets ----------
  function snippetsView(view) {
    view.innerHTML = `
      <div class="page-head"><h1>Snippets</h1><span class="sub">Saved replies your whole team can insert in one click</span>
        <div class="actions"><button class="btn" id="sn_folder">${icon('folder', 18)} Add Folder</button>
          <button class="btn primary" id="sn_add">${icon('plus', 18)} Add Snippet</button></div></div>
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)">
          <div class="search" style="width:340px"><span>${icon('search', 18)}</span><input class="input" id="sn_search" placeholder="Search snippets"></div></div>
        <table class="t" id="sn_table"><thead><tr><th>Name</th><th>Snippet</th><th>Type</th><th>Folder</th><th style="width:60px"></th></tr></thead>
          <tbody>${snippets.map((s) => `<tr id="sn_row_${s.id}"><td class="bold" style="white-space:nowrap">${esc(s.name)}</td>
            <td class="muted" style="max-width:640px"><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:640px">${esc(s.body)}</div></td>
            <td><span class="chip ${s.type === 'Email' ? 'blue' : 'green'}">${icon(s.type === 'Email' ? 'mail' : 'sms', 14)} ${s.type}</span></td>
            <td class="muted">${icon('folder', 15)} ${esc(s.folder)}</td>
            <td><button class="btn ghost icon sm">${icon('more', 18)}</button></td></tr>`).join('')}</tbody></table></div>`;
    $('#sn_add').onclick = () => addSnippet(view);
    $('#sn_folder').onclick = () => KY.toast('Folder created');
    $('#sn_search').oninput = (e) => $$('#sn_table tbody tr').forEach((tr) => (tr.style.display = tr.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? '' : 'none'));
  }

  function addSnippet(view) {
    const box = KY.modal({
      title: 'Add Snippet', wide: true,
      body: `<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
          <div class="field"><label>Name</label><input class="input" id="sn_name" placeholder="e.g. Parking information"></div>
          <div class="field"><label>Folder</label><select class="select" id="sn_folder_sel">${[...new Set(snippets.map((s) => s.folder))].map((f) => `<option>${esc(f)}</option>`).join('')}</select></div></div>
        <div class="field"><label>Type</label><div class="row" style="gap:18px" id="sn_type">
          <label class="row" style="gap:6px;font-weight:500"><input type="radio" name="snt" value="Text" checked> Text (SMS, WhatsApp, chat)</label>
          <label class="row" style="gap:6px;font-weight:500"><input type="radio" name="snt" value="Email"> Email</label></div></div>
        <div class="field"><label class="row">Snippet body<span class="spacer"></span>
          <button class="btn ghost sm" id="sn_cv" style="color:var(--blue)">${icon('braces', 16)} Custom values</button></label>
          <textarea class="input" rows="5" id="sn_body" placeholder="Hi {{contact.first_name}}, …"></textarea></div>
        <p class="muted" style="margin:0;font-size:14px">Custom values like {{contact.first_name}} are filled in with each contact's details when you insert the snippet.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'sn_save', onClick: (close, b) => {
        const name = $('#sn_name', b).value.trim() || 'New snippet';
        snippets.unshift({ id: 'sn' + Date.now(), name, type: $('input[name=snt]:checked', b).value, folder: $('#sn_folder_sel', b).value, body: $('#sn_body', b).value.trim() || '…' });
        close(); snippetsView(view); KY.toast(`Snippet "${name}" saved`);
      } }],
    });
    $('#sn_cv', box).onclick = (e) => KY.menu(e.currentTarget, ['contact.first_name', 'contact.name', 'contact.phone', 'location.name', 'user.name'].map((k) => ({
      label: `{{${k}}}`, icon: 'braces', onClick: () => { const t = $('#sn_body', box); t.value += `{{${k}}}`; t.focus(); },
    })));
  }

  // ---------- Trigger Links ----------
  function linksView(view) {
    view.innerHTML = `
      <div class="page-head"><h1>Trigger Links</h1><span class="sub">Trackable links: see who clicked and start workflows from a click</span>
        <div class="actions"><button class="btn primary" id="tl_add">${icon('plus', 18)} Add Link</button></div></div>
      <div class="card"><table class="t" id="tl_table"><thead><tr><th>Name</th><th>Link URL</th><th>Link key</th><th>Clicks</th><th style="width:60px"></th></tr></thead>
        <tbody>${triggerLinks.map((l) => `<tr><td class="bold">${esc(l.name)}</td><td><a>${esc(l.url)}</a></td>
          <td><code style="background:#f2f4f7;padding:3px 8px;border-radius:6px;font-size:14px">${esc(l.key)}</code></td><td>${l.clicks}</td>
          <td><button class="btn ghost icon sm" title="Copy">${icon('copy', 18)}</button></td></tr>`).join('')}</tbody></table></div>`;
    $('#tl_add').onclick = () => KY.modal({
      title: 'Add Trigger Link',
      body: `<div class="field"><label>Link name</label><input class="input" id="tl_name" placeholder="e.g. Whitening offer"></div>
        <div class="field"><label>Link URL</label><input class="input" id="tl_url" placeholder="https://"></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'tl_save', onClick: (close, b) => {
        triggerLinks.push({ id: 'tl' + Date.now(), name: $('#tl_name', b).value || 'New link', url: $('#tl_url', b).value || 'https://bloomdental.co.uk', key: '{{trigger_link.Nw' + Math.floor(Math.random() * 90 + 10) + 'xQ}}', clicks: 0 });
        close(); linksView(view); KY.toast('Trigger link saved');
      } }],
    });
  }

  KY.screen('conversations', {
    tabs: [{ id: 'conversations', label: 'Conversations' }, { id: 'manual-actions', label: 'Manual Actions' }, { id: 'snippets', label: 'Snippets' }, { id: 'trigger-links', label: 'Trigger Links' }],
    render(view, { tab, params }) {
      css();
      $$('.cv-pop').forEach((p) => p.remove());
      view.style.overflow = '';
      if (tab === 'manual-actions') return manualView(view);
      if (tab === 'snippets') return snippetsView(view);
      if (tab === 'trigger-links') return linksView(view);
      return inboxView(view, params[0]);
    },
  });
})();
