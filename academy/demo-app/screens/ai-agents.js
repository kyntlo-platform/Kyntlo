// AI Agents — Getting Started (AI employees, plans, Workflow AI), Conversation AI (bots,
// settings, actions, test panel, dashboard, history), Voice AI (agent, voices, routing,
// call logs), Knowledge Base (sources, crawler, FAQs, files) and Content AI (text + images).
// Mirrors HighLevel's AI Agents module. Everything is scripted: no real AI is called.
(() => {
  const { esc, icon, $, $$, avatar } = KY;
  const data = KY.data;
  Object.assign(window.KY_ICONS, {
    stop: '<circle cx="12" cy="12" r="9"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
    wave: '<path d="M3 10v4M7 7v10M11 4v16M15 8v8M19 6v12M23 11v2"/>',
    volume: '<path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h8"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  });

  // ---------- Demo data (screen-specific) ----------
  const HOURS = [['Monday', '08:00', '18:00'], ['Tuesday', '08:00', '18:00'], ['Wednesday', '08:00', '18:00'], ['Thursday', '08:00', '20:00'], ['Friday', '08:00', '18:00'], ['Saturday', '09:00', '14:00'], ['Sunday', '', '']];
  const AI = data.ai = {
    bots: [
      { id: 'b1', name: 'Bloom Front Desk Bot', mode: 'suggestive', channels: { SMS: true, Facebook: true, Instagram: true, WhatsApp: false, 'Live Chat': true }, kb: true, convs: 312, updated: '2 days ago',
        personality: 'You are Bloom, the friendly front desk assistant at Bloom Dental Studio, a private dental practice on Marylebone High Street, London. You are warm, reassuring and concise. Use British English, keep replies under three sentences and never give medical advice.',
        goal: 'Answer questions about treatments, prices and opening hours using the knowledge base, then help the person book the right appointment: an Invisalign Free Scan for braces enquiries, or a New Patient Consultation for everything else.',
        instructions: 'Always ask for the person\'s first name and mobile number before booking. Prices start from: Invisalign £3,200, whitening £199, check-up & clean £90. If someone mentions pain, swelling or an emergency, hand over to the team immediately. Never promise a diagnosis or a final price.' },
      { id: 'b2', name: 'Whitening Offer Bot', mode: 'off', channels: { SMS: false, Facebook: false, Instagram: true, WhatsApp: false, 'Live Chat': false }, kb: true, convs: 48, updated: '3 weeks ago', personality: '', goal: '', instructions: '' },
    ],
    actions: [
      { type: 'booking', on: true, title: 'Appointment booking', desc: 'Books into <b>Invisalign Free Scan</b> and <b>New Patient Consultation</b>', when: 'When the contact wants to book or asks about availability' },
      { type: 'collect', on: true, title: 'Collect info', desc: 'Saves <b>First name</b>, <b>Phone</b>, <b>Email</b> and <b>Treatment interest</b> to the contact', when: 'Before booking, if the details are missing' },
      { type: 'stop', on: true, title: 'Stop bot', desc: 'Ends the bot\'s part of the conversation and adds the tag <b>ai-complete</b>', when: 'When the appointment is booked or the contact says stop' },
    ],
    faqs: [
      ['How much does Invisalign cost?', 'Invisalign at Bloom starts from £3,200. Your first consultation, including a 3D scan, is free.'],
      ['What are your opening hours?', 'Monday to Friday 8am–6pm (Thursdays until 8pm) and Saturday 9am–2pm. We\'re closed on Sundays.'],
      ['Do you take NHS patients?', 'We\'re a private practice, but we offer NHS check-ups for existing patients.'],
      ['How much is teeth whitening?', 'Professional teeth whitening costs £199, including custom trays.'],
      ['Where are you?', '14 Marylebone High Street, London W1U 4NS — five minutes from Baker Street station.'],
      ['Is there parking nearby?', 'There\'s no on-site parking. The nearest car park is on Cramer Street, a two-minute walk.'],
      ['Do you see children?', 'Yes, we see children from age three with a parent or guardian.'],
      ['What should I do in an emergency?', 'Call us on 020 7946 0321. We keep same-day emergency slots every weekday.'],
      ['How long is a check-up?', 'A check-up & clean takes about 30 minutes and costs £90.'],
      ['Can I bring my own toothbrush?', 'Of course! We\'ll also give you a fresh one after every hygiene visit.'],
      ['Do you offer sedation?', 'We offer relaxation options for nervous patients — ask us at your consultation.'],
      ['How do I cancel?', 'Use the link in your confirmation text, or reply CANCEL. Please give us 24 hours\' notice.'],
    ],
    sources: [
      { id: 's1', type: 'web', name: 'bloomdental.co.uk', detail: '14 pages · All pages on this domain', status: 'trained', updated: '12 Oct 2026' },
      { id: 's2', type: 'faq', name: 'Frequently asked questions', detail: '12 questions', status: 'trained', updated: '18 Oct 2026' },
      { id: 's3', type: 'file', name: 'Bloom price list 2026.pdf', detail: 'PDF · 2 pages · 184 KB', status: 'trained', updated: '2 Oct 2026' },
    ],
    agents: [{ id: 'r1', name: 'Rosie', role: 'Bloom Receptionist', number: '+44 20 7946 0321', voice: 'emma', status: 'Active', calls: 128, updated: 'Yesterday' }],
    voices: [
      { id: 'emma', name: 'Emma', accent: 'British English', style: 'Warm & friendly', color: '#ee46bc' },
      { id: 'oliver', name: 'Oliver', accent: 'British English', style: 'Calm & reassuring', color: '#2e90fa' },
      { id: 'aoife', name: 'Aoife', accent: 'Irish English', style: 'Bright & upbeat', color: '#12b76a' },
      { id: 'george', name: 'George', accent: 'British English', style: 'Professional', color: '#f79009' },
    ],
    transfers: [
      { when: 'Dental emergency, pain or swelling', to: 'Sarah Mitchell', phone: '+44 7700 900111' },
      { when: 'Billing, payments or finance questions', to: 'Priya Shah', phone: '+44 7700 900333' },
      { when: 'Caller asks to speak to a person', to: 'James Okafor', phone: '+44 7700 900222' },
    ],
    calls: [
      { id: 'l1', caller: 'Olivia Bennett', phone: '+44 7700 900101', when: 'Today, 09:12', dur: '2:41', outcome: ['green', 'Appointment booked'],
        summary: 'Olivia asked how much Invisalign costs. Rosie explained it starts from £3,200 with a free 3D scan, then booked an Invisalign Free Scan for Thursday 29 October at 11:30. A confirmation text was sent.',
        actions: ['Appointment booked · Invisalign Free Scan · Thu 29 Oct, 11:30', 'Contact updated · Treatment interest: Invisalign', 'Post-call SMS sent'],
        transcript: [['ai', 'Hi, thanks for calling Bloom Dental Studio. This is Rosie, the virtual assistant. How can I help you today?'], ['them', 'Hi, I wanted to ask how much Invisalign costs?'], ['ai', 'Of course! Invisalign at Bloom starts from £3,200, and your first consultation with a 3D scan is free. Would you like me to book you a free scan?'], ['them', 'Yes please. Do you have anything on Thursday?'], ['ai', 'I have Thursday the 29th at 11:30 or 3pm. Which would you prefer?'], ['them', 'Eleven thirty is perfect.'], ['ai', 'Lovely, you\'re booked in for Thursday at 11:30. I\'ll text you a confirmation now. Is there anything else I can help with?'], ['them', 'No, that\'s everything, thanks!']] },
      { id: 'l2', caller: 'Unknown caller', phone: '+44 7700 900456', when: 'Today, 08:03', dur: '1:18', outcome: ['blue', 'Transferred · Sarah Mitchell'],
        summary: 'Caller reported toothache and swelling since last night. Rosie recognised an emergency and transferred the call to Sarah Mitchell.',
        actions: ['Call transferred · Sarah Mitchell (+44 7700 900111)', 'Contact created'],
        transcript: [['ai', 'Hi, thanks for calling Bloom Dental Studio. This is Rosie, the virtual assistant. How can I help you today?'], ['them', 'I\'ve got really bad toothache and my face is a bit swollen.'], ['ai', 'I\'m sorry to hear that. That sounds urgent, so I\'m going to put you straight through to a member of our team. One moment please.']] },
      { id: 'l3', caller: 'Noah Williams', phone: '+44 7700 900106', when: 'Yesterday, 21:42', dur: '1:05', outcome: ['amber', 'Message taken'],
        summary: 'Noah wants to move his NHS check-up to a Saturday morning. Rosie took a message and created a task for the team to call him back.',
        actions: ['Task created · Call Noah back about a Saturday check-up', 'Post-call SMS sent'],
        transcript: [['ai', 'Hi, thanks for calling Bloom Dental Studio. This is Rosie, the virtual assistant. How can I help you today?'], ['them', 'Hi, I need to move my check-up to a Saturday if possible.'], ['ai', 'No problem. I\'ll pass that to the team and they\'ll call you back tomorrow morning. Is this the best number to reach you?'], ['them', 'Yes, it is. Thanks.']] },
      { id: 'l4', caller: 'Mia Harris', phone: '+44 7700 900113', when: 'Yesterday, 13:20', dur: '0:52', outcome: ['', 'Question answered'],
        summary: 'Mia asked about parking. Rosie explained there is no on-site parking and the nearest car park is on Cramer Street.',
        actions: ['Post-call SMS sent'],
        transcript: [['ai', 'Hi, thanks for calling Bloom Dental Studio. This is Rosie, the virtual assistant. How can I help you today?'], ['them', 'Is there anywhere to park near you?'], ['ai', 'There\'s no on-site parking, but the nearest car park is on Cramer Street, just a two-minute walk away.']] },
      { id: 'l5', caller: 'Daniel Hughes', phone: '+44 7700 900102', when: 'Mon, 11:05', dur: '1:37', outcome: ['blue', 'Transferred · Priya Shah'],
        summary: 'Daniel had a question about his invoice. Rosie transferred him to Priya Shah for billing.',
        actions: ['Call transferred · Priya Shah (+44 7700 900333)'],
        transcript: [['ai', 'Hi, thanks for calling Bloom Dental Studio. This is Rosie, the virtual assistant. How can I help you today?'], ['them', 'I\'ve got a question about my last invoice.'], ['ai', 'Of course. Let me transfer you to Priya, who looks after billing.']] },
    ],
    history: [
      { contact: 'Olivia Bennett', channel: 'SMS', last: 'You\'re booked in for Thursday at 11:30 ✓', outcome: ['green', 'Booked'], time: '10:06' },
      { contact: 'Mason Evans', channel: 'Live Chat', last: 'We are! You can book your first visit here…', outcome: ['', 'Answered'], time: 'Sun' },
      { contact: 'Ava Robinson', channel: 'Instagram', last: 'Let me pass you to Priya, our whitening specialist.', outcome: ['blue', 'Handed to team'], time: 'Mon' },
      { contact: 'Sophie Turner', channel: 'Facebook', last: 'Invisalign starts from £3,200 and the 3D scan is free.', outcome: ['green', 'Booked'], time: 'Mon' },
      { contact: 'Liam Patel', channel: 'Facebook', last: 'An implant consultation includes an exam and X-rays…', outcome: ['', 'Answered'], time: 'Tue' },
      { contact: 'Grace Wright', channel: 'SMS', last: 'No problem, I\'ve stopped these messages.', outcome: ['amber', 'Stopped'], time: '9 Oct' },
    ],
  };

  const S = {
    gsView: 'overview', caiView: 'bots', botTab: 'settings', vaiView: 'agents', vaiTab: 'goals', kbFilter: 'all',
    cntView: 'text', cntType: 'email', cntTone: 'Friendly', cntLen: 'Medium', imgStyle: 'Photo', imgAr: '1:1', voice: 'emma',
    chat: [], chatStage: 0, wfSample: 0, wfRun: false, imgs: null,
    sleepOnHuman: true, delay: '30 seconds',
  };

  // ---------- Styles ----------
  if (!$('#css-ai-agents')) document.head.insertAdjacentHTML('beforeend', `<style id="css-ai-agents">
    .ai-seg { display:inline-flex; gap:4px; background:#eaecf0; border-radius:9px; padding:4px; }
    .ai-seg button { border:0; background:transparent; border-radius:7px; padding:7px 16px; font-weight:600; font-size:15px; color:var(--muted); display:flex; align-items:center; gap:8px; }
    .ai-seg button.on { background:#fff; color:var(--ink); box-shadow:var(--shadow); }
    .ai-ico { width:48px; height:48px; border-radius:12px; display:grid; place-items:center; flex:none; color:#fff; }
    .ai-ico.sm { width:38px; height:38px; border-radius:10px; }
    .ai-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
    .ai-card { padding:22px; display:flex; flex-direction:column; gap:12px; }
    .ai-card h3 { margin:0; font-size:18px; }
    .ai-card p { margin:0; color:var(--muted); font-size:15px; flex:1; }
    .ai-banner { display:flex; align-items:center; gap:18px; padding:20px 24px; margin-bottom:20px; background:linear-gradient(100deg,#4b21a9 0%,#6d00c1 55%,#c11574 100%); color:#fff; border:0; }
    .ai-banner .chip { background:rgba(255,255,255,.18); color:#fff; }
    .ai-tabs { display:flex; gap:4px; border-bottom:1px solid var(--line-soft); padding:0 12px; background:#fff; border-radius:var(--radius) var(--radius) 0 0; }
    .ai-tabs button { border:0; background:none; padding:14px 14px 12px; font-weight:600; font-size:15.5px; color:var(--ink-2); border-bottom:2px solid transparent; display:flex; align-items:center; gap:8px; }
    .ai-tabs button.on { color:var(--blue); border-bottom-color:var(--blue); }
    .ai-split { display:grid; grid-template-columns:minmax(0,1fr) 450px; gap:20px; align-items:start; }
    .ai-sec { padding:20px 22px; border-bottom:1px solid var(--line-soft); }
    .ai-sec:last-child { border-bottom:0; }
    .ai-sec h4 { margin:0 0 4px; font-size:16.5px; }
    .ai-sec .hint { color:var(--muted); font-size:14px; margin:0 0 14px; }
    .ai-modes { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
    .ai-opt { border:1.5px solid var(--line); border-radius:10px; padding:14px 16px; background:#fff; text-align:left; display:flex; flex-direction:column; gap:4px; }
    .ai-opt b { display:flex; align-items:center; gap:8px; font-size:15.5px; }
    .ai-opt span { color:var(--muted); font-size:14px; line-height:1.4; }
    .ai-opt.on { border-color:var(--blue); background:var(--blue-soft); box-shadow:0 0 0 3px #d1e0ff; }
    .ai-opt .dot { width:16px; height:16px; border-radius:50%; border:2px solid var(--line); flex:none; }
    .ai-opt.on .dot { border:5px solid var(--blue); }
    .ai-chans { display:flex; gap:10px; flex-wrap:wrap; }
    .ai-chan { display:flex; align-items:center; gap:10px; border:1.5px solid var(--line); border-radius:10px; padding:9px 14px; background:#fff; font-weight:600; font-size:15px; }
    .ai-chan.on { border-color:var(--blue); background:var(--blue-soft); color:#004eeb; }
    .ai-chan .tick { width:18px; height:18px; border-radius:5px; border:1.5px solid var(--line); display:grid; place-items:center; background:#fff; }
    .ai-chan.on .tick { background:var(--blue); border-color:var(--blue); color:#fff; }
    .ai-chat { display:flex; flex-direction:column; height:calc(100vh - 170px); min-height:560px; position:sticky; top:0; }
    .ai-msgs { flex:1; overflow:auto; padding:18px; background:#f9fafb; display:flex; flex-direction:column; gap:10px; }
    .ai-b { max-width:82%; padding:10px 14px; border-radius:14px; font-size:15px; line-height:1.45; }
    .ai-b.me { align-self:flex-end; background:var(--blue); color:#fff; border-bottom-right-radius:4px; }
    .ai-b.bot { align-self:flex-start; background:#fff; border:1px solid var(--line-soft); border-bottom-left-radius:4px; }
    .ai-b small { display:block; margin-top:6px; color:var(--faint); font-size:12.5px; }
    .ai-act { align-self:center; display:flex; align-items:center; gap:6px; font-size:13px; font-weight:600; padding:5px 12px; border-radius:999px; background:var(--green-soft); color:#027a48; }
    .ai-act.blue { background:var(--blue-soft); color:#004eeb; }
    .ai-typing { align-self:flex-start; background:#fff; border:1px solid var(--line-soft); border-radius:14px; padding:12px 16px; display:flex; gap:5px; }
    .ai-typing i { width:7px; height:7px; border-radius:50%; background:var(--faint); animation:aiDot 1s infinite; }
    .ai-typing i:nth-child(2) { animation-delay:.15s } .ai-typing i:nth-child(3) { animation-delay:.3s }
    @keyframes aiDot { 0%,60%,100% { transform:none; opacity:.5 } 30% { transform:translateY(-4px); opacity:1 } }
    .ai-actrow { display:flex; align-items:flex-start; gap:14px; padding:16px; border:1px solid var(--line); border-radius:10px; margin-bottom:12px; background:#fff; }
    .ai-actrow .t { font-weight:600; font-size:16px; }
    .ai-actrow .d { color:var(--ink-2); font-size:14.5px; margin-top:2px; }
    .ai-actrow .w { color:var(--muted); font-size:13.5px; margin-top:6px; display:flex; align-items:center; gap:6px; }
    .ai-pick { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
    .ai-pick button { display:flex; gap:12px; align-items:flex-start; text-align:left; border:1.5px solid var(--line); border-radius:10px; padding:14px; background:#fff; }
    .ai-pick button:hover { border-color:#84adff; background:#f5f8ff; }
    .ai-pick b { display:block; font-size:15px; } .ai-pick span { color:var(--muted); font-size:13.5px; }
    .ai-tbl td .chip { font-size:12.5px; }
    .ai-stat { padding:18px 20px; } .ai-stat .k { color:var(--muted); font-size:14px; font-weight:500; display:flex; gap:8px; align-items:center; }
    .ai-stat .v { font-size:30px; font-weight:700; margin-top:6px; } .ai-stat .d { font-size:13px; font-weight:600; color:#027a48; }
    .ai-voices { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
    .ai-voice { border:1.5px solid var(--line); border-radius:12px; padding:14px; background:#fff; display:flex; flex-direction:column; gap:10px; text-align:left; }
    .ai-voice.on { border-color:var(--blue); background:var(--blue-soft); box-shadow:0 0 0 3px #d1e0ff; }
    .ai-voice .play { width:36px; height:36px; border-radius:50%; border:0; background:var(--blue); color:#fff; display:grid; place-items:center; flex:none; }
    .ai-voice .bars { display:flex; align-items:center; gap:3px; height:26px; flex:1; }
    .ai-voice .bars i { width:4px; border-radius:2px; background:#b2ccff; height:30%; }
    .ai-voice.playing .bars i { background:var(--blue); animation:aiBar .7s ease-in-out infinite alternate; }
    @keyframes aiBar { from { height:20% } to { height:100% } }
    .ai-hours td { padding:9px 16px; }
    .ai-tr { display:grid; grid-template-columns:1.3fr auto 1fr auto; align-items:center; gap:14px; padding:12px 14px; border:1px solid var(--line); border-radius:10px; margin-bottom:10px; background:#fff; }
    .ai-tx { display:flex; flex-direction:column; gap:10px; }
    .ai-tx .who { font-size:12.5px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; margin-bottom:3px; }
    .ai-player { display:flex; align-items:center; gap:14px; padding:12px 14px; border:1px solid var(--line); border-radius:10px; background:#f9fafb; }
    .ai-player .track { flex:1; height:6px; border-radius:6px; background:#eaecf0; overflow:hidden; }
    .ai-player .track i { display:block; height:100%; width:0; background:var(--blue); transition:width 6s linear; }
    .ai-player.playing .track i { width:62%; }
    .ai-src { width:40px; height:40px; border-radius:10px; display:grid; place-items:center; flex:none; }
    .ai-out { white-space:pre-wrap; font-size:16px; line-height:1.6; color:var(--ink); min-height:360px; }
    .ai-out .cur { display:inline-block; width:2px; height:18px; background:var(--blue); vertical-align:-3px; animation:aiBlink .8s infinite; }
    @keyframes aiBlink { 50% { opacity:0 } }
    .ai-imgs { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
    .ai-img { border-radius:12px; overflow:hidden; border:2px solid transparent; position:relative; background:#eaecf0; cursor:pointer; }
    .ai-img.on { border-color:var(--blue); box-shadow:0 0 0 3px #d1e0ff; }
    .ai-img svg { display:block; width:100%; height:auto; }
    .ai-shim { background:linear-gradient(100deg,#eaecf0 30%,#f9fafb 50%,#eaecf0 70%); background-size:300% 100%; animation:aiShim 1.2s infinite linear; }
    @keyframes aiShim { from { background-position:100% 0 } to { background-position:0 0 } }
    .ai-flow { display:flex; flex-direction:column; align-items:center; gap:0; }
    .ai-node { width:100%; max-width:430px; display:flex; align-items:center; gap:12px; padding:12px 14px; border:1.5px solid var(--line); border-radius:10px; background:#fff; transition:all .3s; }
    .ai-node .t { font-weight:600; font-size:15px; } .ai-node .s { color:var(--muted); font-size:13.5px; }
    .ai-node.lit { border-color:#7a5af8; box-shadow:0 0 0 3px #ebe9fe; }
    .ai-node .out { margin-left:auto; }
    .ai-link { width:2px; height:20px; background:var(--line); }
    .ai-branch { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; width:100%; }
    .ai-branch .ai-node { flex-direction:column; align-items:flex-start; gap:4px; padding:10px 12px; }
    .ai-branch .ai-node.dim { opacity:.45; }
    .ai-plan td, .ai-plan th { text-align:center; } .ai-plan td:first-child, .ai-plan th:first-child { text-align:left; }
    .ai-yes { color:#027a48; font-weight:600; } .ai-no { color:var(--faint); }
    .ai-pro { background:linear-gradient(90deg,#6d00c1,#f20089); color:#fff; }
    .ai-lbl { font-size:14px; font-weight:600; color:var(--ink-2); margin:0 0 8px; }
  </style>`);

  // ---------- Helpers ----------
  const seg = (items, cur, pfx) => `<div class="ai-seg">${items.map(([id, label, ic]) =>
    `<button id="${pfx}_${String(id).toLowerCase().replace(/[^a-z0-9]/g, '')}" data-seg="${id}" class="${id === cur ? 'on' : ''}">${ic ? icon(ic, 17) : ''}${esc(label)}</button>`).join('')}</div>`;
  const planChip = (p) => ({ growth: '<span class="chip blue">Growth+</span>', pro: '<span class="chip ai-pro">Pro</span>', usage: '<span class="chip amber">Pay per use · Unlimited on Pro</span>', wf: '<span class="chip ai-pro">Pro</span>', all: '<span class="chip green">All plans</span>' })[p];
  const MODES = { off: ['Off', 'gray'], suggestive: ['Suggestive', 'amber'], auto: ['Auto-pilot', 'green'] };
  const modeChip = (m) => `<span class="chip ${MODES[m][1]}">${MODES[m][0]}</span>`;
  const CH_ICON = { SMS: 'sms', Facebook: 'facebook', Instagram: 'instagram', WhatsApp: 'whatsapp', 'Live Chat': 'chat' };
  const later = (ms, fn) => setTimeout(fn, ms);
  const alive = (id) => document.getElementById(id);

  // ================= GETTING STARTED =================
  const EMPLOYEES = [
    ['conversation', 'Conversation AI', 'bot', '#155eef', 'A chatbot that answers questions, qualifies leads and books appointments across SMS, Facebook, Instagram, WhatsApp and live chat.', 'growth', '1 bot live · Auto-reply', '#/ai-agents/conversation-ai'],
    ['voice', 'Voice AI', 'mic', '#c11574', 'An AI receptionist that answers your phone, books appointments, takes messages and transfers calls to your team.', 'pro', '1 agent · 128 calls this month', '#/ai-agents/voice-ai'],
    ['kb', 'Knowledge Base', 'book', '#12b76a', 'Teach your AI agents about your business with your website, FAQs and documents. Shared by every agent.', 'growth', '3 sources · Trained', '#/ai-agents/knowledge-base'],
    ['content', 'Content AI', 'edit', '#f79009', 'Write emails, social posts, blogs and website copy, and generate images, in your brand voice.', 'usage', 'Used 14 times this month', '#/ai-agents/content-ai'],
    ['workflow', 'Workflow AI', 'automation', '#6172f3', 'AI steps inside your automations: classify messages, summarise conversations and write replies automatically.', 'wf', '2 workflows use AI', '#/ai-agents/getting-started/workflow-ai'],
    ['reviews', 'Reviews AI', 'star', '#7a5af8', 'Replies to your Google and Facebook reviews on-brand, in seconds. Covered in Module 11.', 'pro', 'Auto-suggest on', '#/reputation'],
  ];
  const PLAN_ROWS = [
    ['Conversation AI chatbot', '✕', 'Basic · replies & FAQs', 'Advanced · multi-step, booking & actions'],
    ['Knowledge Base', '✕', '✓', '✓'],
    ['Voice AI receptionist', '✕', '✕', '✓'],
    ['Content AI (text & images)', 'Pay per use', 'Pay per use', 'Unlimited'],
    ['Workflow AI actions', '✕', '✕', '✓ Included'],
    ['Reviews AI', '✕', '✕', 'Unlimited'],
    ['AI usage', 'Wholesale rates', 'Wholesale rates', 'Unlimited, included'],
  ];
  const RATES = [['Conversation AI', '$0.04', 'per message', 'bot'], ['Content AI', '$0.18', 'per 1,000 words', 'edit'], ['Workflow AI', '$0.06', 'per execution', 'automation'], ['Reviews AI', '$0.16', 'per response', 'star'], ['Funnels AI', '$1.98', 'per funnel', 'globe']];
  const cell = (v) => v === '✕' ? `<span class="ai-no">${icon('x', 18)}</span>` : v === '✓' ? `<span class="ai-yes">${icon('check', 20)}</span>` : `<span class="${/Unlimited|Advanced/.test(v) ? 'ai-yes' : ''}" style="font-size:14.5px">${esc(v)}</span>`;

  const WF_SAMPLES = [
    { label: 'Booking request', msg: 'Hi, can I book a check-up for next week? Ideally a morning. Thanks, Grace', intent: 'Booking request', branch: 0, sentiment: 'Positive',
      summary: 'Grace wants a check-up next week, mornings preferred.', reply: 'Hi Grace! Of course. We have Tuesday at 9:00 or Wednesday at 10:30 for a check-up & clean. Which would you like?' },
    { label: 'Price question', msg: 'How much is whitening and does it hurt? My teeth are a bit sensitive', intent: 'Pricing question', branch: 1, sentiment: 'Neutral',
      summary: 'Asks the price of whitening; has sensitive teeth.', reply: 'Hi! Professional whitening at Bloom is £199, including custom trays. We use a gentle gel for sensitive teeth, and we\'ll check your teeth first. Would you like to book a quick consultation?' },
    { label: 'Complaint', msg: 'I waited 40 minutes past my appointment time today. Not happy.', intent: 'Complaint', branch: 2, sentiment: 'Negative',
      summary: 'Unhappy about a 40-minute wait at today\'s appointment.', reply: '— No AI reply. Assigned to Sarah Mitchell with an internal note.' },
  ];

  function gettingStarted(view, params) {
    S.gsView = params[0] === 'workflow-ai' ? 'workflow' : params[0] === 'plans' ? 'plans' : 'overview';
    view.innerHTML = `
      <div class="page-head"><h1>AI Agents</h1><span class="sub">Your AI employees, working around the clock</span>
        <div class="actions">${seg([['overview', 'Overview', 'ai'], ['plans', 'Plans & usage', 'card'], ['workflow', 'Workflow AI', 'automation']], S.gsView, 'gs_view')}</div></div>
      <div id="gs_body"></div>`;
    $$('[data-seg]', view).forEach((b) => (b.onclick = () => KY.go({ overview: '#/ai-agents/getting-started', plans: '#/ai-agents/getting-started/plans', workflow: '#/ai-agents/getting-started/workflow-ai' }[b.dataset.seg])));
    const body = $('#gs_body');
    if (S.gsView === 'overview') {
      body.innerHTML = `
        <div class="card ai-banner" id="gs_plan">
          <div class="ai-ico" style="background:rgba(255,255,255,.18)">${icon('sparkle', 26)}</div>
          <div style="flex:1"><div style="font-size:20px;font-weight:700">You're on the Pro plan</div>
            <div style="opacity:.9">Every AI agent below is unlocked, with unlimited AI usage included.</div></div>
          <span class="chip">${icon('check', 14)} Unlimited AI usage</span>
        </div>
        <div class="ai-cards" id="gs_cards">${EMPLOYEES.map(([id, name, ic, col, desc, plan, status, href]) => `
          <div class="card ai-card" id="gs_card_${id}">
            <div class="row"><div class="ai-ico" style="background:${col}">${icon(ic, 24)}</div><span class="spacer"></span>${planChip(plan)}</div>
            <h3>${esc(name)}</h3><p>${esc(desc)}</p>
            <div class="row" style="border-top:1px solid var(--line-soft);padding-top:12px">
              <span class="row" style="gap:6px;font-size:14px;color:#027a48;font-weight:600"><span style="width:8px;height:8px;border-radius:50%;background:var(--green)"></span>${esc(status)}</span>
              <span class="spacer"></span><button class="btn sm" id="gs_open_${id}" data-href="${href}">Open ${icon('right', 16)}</button></div>
          </div>`).join('')}</div>`;
      $$('[data-href]', body).forEach((b) => (b.onclick = () => KY.go(b.dataset.href)));
    } else if (S.gsView === 'plans') {
      body.innerHTML = `
        <div class="grid" style="grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);align-items:start">
          <div class="card" id="gs_plans">
            <div class="card-h"><h3>Which AI features are on each plan</h3><span class="spacer"></span><span class="chip ai-pro">You're on Pro</span></div>
            <table class="t ai-plan"><thead><tr><th>Feature</th><th>Starter</th><th>Growth</th><th style="color:#6d00c1">Pro</th></tr></thead>
              <tbody>${PLAN_ROWS.map((r, i) => `<tr id="gs_row_${i}"><td class="bold">${esc(r[0])}</td><td>${cell(r[1])}</td><td>${cell(r[2])}</td><td style="background:#faf5ff">${cell(r[3])}</td></tr>`).join('')}</tbody></table>
            <div class="muted" id="gs_custom" style="padding:14px 18px;font-size:14px">On a <b>Customized</b> plan, you pick exactly the AI features you need.</div>
          </div>
          <div class="card" id="gs_rates">
            <div class="card-h"><h3>Pay-as-you-go AI rates</h3></div>
            <div class="card-b" style="padding-top:8px">
              <p class="muted" style="margin:6px 0 12px;font-size:14.5px">On plans without unlimited AI, usage is billed at wholesale cost with no markup, on top of your plan.</p>
              ${RATES.map(([n, p, per, ic], i) => `<div class="row" id="gs_rate_${i}" style="padding:11px 0;border-top:1px solid var(--line-soft)"><span class="ai-ico sm" style="background:#f4f3ff;color:#6d00c1">${icon(ic, 18)}</span>
                <span class="bold" style="flex:1">${n}</span><b style="font-size:17px">${p}</b><span class="muted" style="width:130px;font-size:14px">${per}</span></div>`).join('')}
              <div class="row" id="gs_rates_pro" style="margin-top:12px;padding:12px 14px;border-radius:8px;background:#faf5ff;color:#5925dc;font-weight:600;font-size:14.5px">${icon('check', 18)} Pro includes unlimited AI usage: no per-use charges.</div>
            </div>
          </div>
        </div>`;
    } else workflowAI(body);
  }

  function workflowAI(body) {
    const smp = WF_SAMPLES[S.wfSample];
    const ran = S.wfRun;
    body.innerHTML = `
      <div class="grid" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start">
        <div>
          <div class="card" id="gs_wf_actions" style="margin-bottom:20px">
            <div class="card-h"><h3>AI actions for your workflows</h3><span class="spacer"></span>${planChip('wf')}</div>
            <div class="card-b" style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              ${[['classify', 'Classify message', 'split', 'Sorts a message into categories you define, like booking, price question or complaint.'],
                ['summarise', 'Summarise', 'note', 'Turns a long conversation or form into a two-line summary for your team.'],
                ['reply', 'AI reply', 'chat', 'Writes and sends a reply using your knowledge base, or hands the chat to your Conversation AI bot.'],
                ['sentiment', 'Sentiment', 'smile', 'Detects whether a message is positive, neutral or negative, so you can act fast.']].map(([id, t, ic, d]) => `
                <div class="ai-actrow" id="gs_wf_${id}" style="margin:0;padding:14px"><span class="ai-ico sm" style="background:#eef4ff;color:#3538cd">${icon(ic, 18)}</span><div><div class="t" style="font-size:15px">${t}</div><div class="d" style="font-size:13.5px;color:var(--muted)">${d}</div></div></div>`).join('')}
            </div>
            <div class="row muted" id="gs_wf_where" style="padding:0 20px 16px;font-size:14px">${icon('automation', 18)}<span>In the workflow builder, click <b style="color:var(--ink-2)">Add action</b> and look in the <b style="color:var(--ink-2)">AI</b> section. Each AI step is one Workflow AI execution.</span></div>
          </div>
          <div class="card" id="gs_wf_test">
            <div class="card-h"><h3>Try it on a message</h3><span class="spacer"></span><span class="muted" style="font-size:14px">Sample inbound message</span></div>
            <div class="card-b">
              <div class="row" style="gap:8px;margin-bottom:12px">${WF_SAMPLES.map((s, i) => `<button class="btn sm ${i === S.wfSample ? 'primary' : ''}" id="gs_wf_sample${i}" data-smp="${i}">${esc(s.label)}</button>`).join('')}</div>
              <div class="row" id="gs_wf_msg" style="align-items:flex-start;padding:12px 14px;border:1px solid var(--line);border-radius:10px;background:#f9fafb">${avatar(smp.msg.includes('Grace') ? 'Grace Wright' : smp.label === 'Complaint' ? 'Oliver King' : 'Ava Robinson', 32)}<div style="font-size:15px">${esc(smp.msg)}</div></div>
              <div class="row" style="margin-top:14px"><button class="btn primary" id="gs_wf_run">${icon('play', 16)} Run test</button><span class="muted" style="font-size:14px" id="gs_wf_status">${ran ? 'Test complete · 3 AI steps' : 'Runs the example workflow on this message'}</span></div>
              <div id="gs_wf_results" style="margin-top:14px;display:${ran ? 'block' : 'none'}">
                ${[['Classify message', smp.intent, 'split'], ['Summarise', smp.summary, 'note'], ['AI reply', smp.reply, 'chat']].map(([k, v, ic], i) => `
                  <div class="row" style="align-items:flex-start;padding:10px 0;border-top:1px solid var(--line-soft)" id="gs_wf_out${i}"><span style="color:#6d00c1">${icon(ic, 18)}</span><b style="width:150px;flex:none;font-size:14.5px">${k}</b><span style="font-size:14.5px">${esc(v)}</span></div>`).join('')}
              </div>
            </div>
          </div>
        </div>
        <div class="card" id="gs_wf_flow">
          <div class="card-h"><h3>Example: AI inbox triage</h3><span class="spacer"></span><button class="btn sm" id="gs_wf_open">${icon('external', 16)} Open Workflows</button></div>
          <div class="card-b ai-flow">
            <div class="ai-node ${ran ? 'lit' : ''}" id="gs_node_trigger"><span class="ai-ico sm" style="background:#fef0c7;color:#b54708">${icon('zap', 18)}</span><div><div class="s">Trigger</div><div class="t">Customer replied</div></div></div>
            <div class="ai-link"></div>
            <div class="ai-node ${ran ? 'lit' : ''}" id="gs_node_classify"><span class="ai-ico sm" style="background:#eef4ff;color:#3538cd">${icon('split', 18)}</span><div><div class="s">Workflow AI</div><div class="t">Classify message</div></div>${ran ? `<span class="chip purple out">${esc(smp.intent)}</span>` : ''}</div>
            <div class="ai-link"></div>
            <div class="ai-node ${ran ? 'lit' : ''}" id="gs_node_summary"><span class="ai-ico sm" style="background:#eef4ff;color:#3538cd">${icon('note', 18)}</span><div><div class="s">Workflow AI</div><div class="t">Summarise → save as contact note</div></div></div>
            <div class="ai-link"></div>
            <div class="ai-node" style="max-width:250px;justify-content:center"><span style="color:var(--muted)">${icon('split', 18)}</span><div class="t">If / Else · by category</div></div>
            <div class="ai-link"></div>
            <div class="ai-branch" id="gs_node_branches">
              ${[['Booking request', 'AI reply with booking times', 'chat'], ['Pricing question', 'AI reply from knowledge base', 'chat'], ['Complaint', 'Assign to Sarah + internal note', 'user']].map(([b, t, ic], i) => `
                <div class="ai-node ${ran ? (i === smp.branch ? 'lit' : 'dim') : ''}" id="gs_branch${i}"><span class="chip ${i === 2 ? 'red' : 'blue'}">${b}</span><div class="row" style="gap:6px;font-size:14px;font-weight:600">${icon(ic, 16)}${t}</div></div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
    $$('[data-smp]', body).forEach((b) => (b.onclick = () => { S.wfSample = +b.dataset.smp; S.wfRun = false; workflowAI(body); }));
    $('#gs_wf_open').onclick = () => KY.go('#/automation');
    $('#gs_wf_run').onclick = () => {
      $('#gs_wf_status').textContent = 'Running…';
      const order = ['gs_node_trigger', 'gs_node_classify', 'gs_node_summary'];
      order.forEach((id, i) => later(250 + i * 350, () => alive(id)?.classList.add('lit')));
      later(1300, () => { if (!alive('gs_wf_run')) return; S.wfRun = true; workflowAI(body); KY.toast('Test complete'); });
    };
  }

  // ================= CONVERSATION AI =================
  function conversationAI(view, params) {
    if (params[0] && !['dashboard', 'history'].includes(params[0])) return botEditor(view, params[0], params[1]);
    S.caiView = params[0] || 'bots';
    const bots = AI.bots;
    view.innerHTML = `
      <div class="page-head"><h1>Conversation AI</h1>${planChip('growth')}
        <div class="actions">${seg([['bots', 'Bots', 'bot'], ['dashboard', 'Dashboard', 'chart'], ['history', 'Conversation history', 'chat']], S.caiView, 'cai_view')}
          <button class="btn primary" id="cai_create">${icon('plus', 18)} Create bot</button></div></div>
      <div id="cai_body"></div>`;
    $$('[data-seg]', view).forEach((b) => (b.onclick = () => KY.go('#/ai-agents/conversation-ai' + (b.dataset.seg === 'bots' ? '' : '/' + b.dataset.seg))));
    $('#cai_create').onclick = () => KY.modal({
      title: 'Create bot',
      body: `<div class="field"><label>Bot name</label><input class="input" id="cai_new_name" placeholder="e.g. After-hours Bot"></div>
        <div class="field"><label>Start from</label><select class="select"><option>Blank bot</option><option>Appointment booking template</option><option>FAQ template</option></select></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Create', primary: true, id: 'cai_new_save', onClick: (close, box) => {
        const name = $('#cai_new_name', box).value || 'New Bot';
        AI.bots.push({ id: 'b' + (AI.bots.length + 1), name, mode: 'off', channels: { SMS: false, Facebook: false, Instagram: false, WhatsApp: false, 'Live Chat': false }, kb: false, convs: 0, updated: 'Just now', personality: '', goal: '', instructions: '' });
        close(); KY.go('#/ai-agents/conversation-ai'); KY.toast(`Bot "${name}" created`);
      } }],
    });
    const body = $('#cai_body');
    if (S.caiView === 'bots') {
      body.innerHTML = `<div class="card"><table class="t ai-tbl" id="cai_bots"><thead><tr><th>Bot name</th><th>Bot mode</th><th>Channels</th><th>Knowledge base</th><th>Conversations (30 days)</th><th>Last updated</th><th></th></tr></thead>
        <tbody>${bots.map((b) => `<tr class="click" id="cai_bot_${b.id}" data-bot="${b.id}">
          <td><div class="row"><span class="ai-ico sm" style="background:#155eef">${icon('bot', 18)}</span><span class="bold">${esc(b.name)}</span>${b.id === 'b1' ? '<span class="chip">Primary</span>' : ''}</div></td>
          <td>${modeChip(b.mode)}</td>
          <td><div class="row" style="gap:6px;color:var(--ink-2)">${Object.entries(b.channels).filter(([, v]) => v).map(([c]) => `<span title="${c}">${icon(CH_ICON[c], 18)}</span>`).join('') || '<span class="faint">None</span>'}</div></td>
          <td>${b.kb ? '<span class="chip green">Bloom Dental KB</span>' : '<span class="faint">—</span>'}</td>
          <td class="bold">${b.convs}</td><td class="muted">${esc(b.updated)}</td><td>${icon('right', 18)}</td></tr>`).join('')}</tbody></table></div>
        <div class="row muted" style="margin-top:14px;font-size:14px">${icon('ai', 18)} Each bot can reply on the channels you choose. A contact talks to one bot at a time.</div>`;
      $$('[data-bot]', body).forEach((r) => (r.onclick = () => KY.go(`#/ai-agents/conversation-ai/${r.dataset.bot}`)));
    } else if (S.caiView === 'dashboard') {
      const days = [18, 24, 21, 30, 27, 12, 9, 22, 26, 31, 28, 35, 14, 11];
      body.innerHTML = `
        <div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px" id="cai_stats">
          ${[['chat', 'Conversations handled', '312', '+18% vs last month'], ['send', 'AI messages sent', '1,486', '+22% vs last month'], ['calendar', 'Appointments booked', '41', '+9 vs last month'], ['users', 'Handed to your team', '23', '7% of conversations']].map(([ic, k, v, d]) =>
            `<div class="card ai-stat"><div class="k">${icon(ic, 18)} ${k}</div><div class="v">${v}</div><div class="d">${d}</div></div>`).join('')}
        </div>
        <div class="grid" style="grid-template-columns:minmax(0,1.6fr) minmax(0,1fr)">
          <div class="card" id="cai_chart"><div class="card-h"><h3>Conversations per day</h3><span class="spacer"></span><span class="muted" style="font-size:14px">Last 14 days</span></div>
            <div class="card-b"><svg viewBox="0 0 700 230" width="100%" height="250">${days.map((d, i) => `<rect x="${14 + i * 49}" y="${200 - d * 5}" width="32" height="${d * 5}" rx="5" fill="${i === days.length - 1 ? '#155eef' : '#84adff'}"/><text x="${30 + i * 49}" y="222" font-size="13" text-anchor="middle" fill="#667085">${8 + i}</text>`).join('')}</svg></div></div>
          <div class="card" id="cai_top"><div class="card-h"><h3>Top questions</h3></div><div class="card-b" style="padding-top:6px">
            ${[['How much is Invisalign?', 64], ['What are your opening hours?', 41], ['Do you take new patients?', 33], ['How much is whitening?', 28], ['Is there parking nearby?', 12]].map(([q, n]) =>
              `<div class="row" style="padding:10px 0;border-bottom:1px solid var(--line-soft)"><span style="flex:1">${q}</span><b>${n}</b></div>`).join('')}
            <div class="row" style="margin-top:12px;font-size:14px;color:#5925dc;font-weight:600">${icon('sparkle', 16)} 1,486 AI messages · unlimited on Pro</div></div></div>
        </div>`;
    } else {
      body.innerHTML = `<div class="card"><table class="t ai-tbl" id="cai_history"><thead><tr><th>Contact</th><th>Channel</th><th>Bot</th><th>Last message</th><th>Outcome</th><th>Time</th></tr></thead>
        <tbody>${AI.history.map((h, i) => `<tr class="click" id="cai_hist_${i}" data-h="${i}"><td><div class="row">${avatar(h.contact, 30)}<span class="bold">${esc(h.contact)}</span></div></td>
          <td><span class="row" style="gap:6px">${icon(CH_ICON[h.channel], 18)}${h.channel}</span></td><td class="muted">Bloom Front Desk Bot</td>
          <td style="max-width:420px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(h.last)}</td><td><span class="chip ${h.outcome[0]}">${h.outcome[1]}</span></td><td class="muted">${h.time}</td></tr>`).join('')}</tbody></table></div>`;
      $$('[data-h]', body).forEach((r) => (r.onclick = () => {
        const h = AI.history[+r.dataset.h];
        const v = data.conversations.find((c) => data.contacts.find((x) => x.id === c.contact)?.name === h.contact);
        const msgs = v ? v.messages : [{ from: 'them', text: 'Hi, quick question…' }, { from: 'ai', text: h.last }];
        KY.modal({ title: `${h.contact} · ${h.channel}`, drawer: true,
          body: `<div class="row" style="margin-bottom:14px"><span class="chip ${h.outcome[0]}">${h.outcome[1]}</span><span class="muted" style="font-size:14px">Handled by Bloom Front Desk Bot</span></div>
            <div class="ai-msgs" style="border-radius:10px;border:1px solid var(--line-soft)">${msgs.map((m) => `<div class="ai-b ${m.from === 'them' ? 'bot' : 'me'}">${esc(m.text)}<small style="color:${m.from === 'them' ? '' : '#d1e0ff'}">${m.from === 'ai' ? 'AI bot' : m.from === 'us' ? 'Team' : h.contact.split(' ')[0]}</small></div>`).join('')}</div>` });
      }));
    }
  }

  // ----- Bot editor -----
  function botEditor(view, id, sub) {
    const bot = AI.bots.find((b) => b.id === id) || AI.bots[0];
    if (sub && ['settings', 'goals', 'actions', 'kb'].includes(sub)) S.botTab = sub;
    view.innerHTML = `
      <div class="page-head">
        <button class="btn ghost icon" id="cai_back">${icon('left', 20)}</button>
        <span class="ai-ico sm" style="background:#155eef">${icon('bot', 20)}</span><h1>${esc(bot.name)}</h1><span id="cai_modechip">${modeChip(bot.mode)}</span>
        <div class="actions"><button class="btn" id="cai_dup">${icon('copy', 18)} Duplicate</button><button class="btn primary" id="cai_save">${icon('check', 18)} Save</button></div></div>
      <div class="ai-split">
        <div class="card" style="min-width:0">
          <div class="ai-tabs" id="cai_tabs">${[['settings', 'Bot Settings', 'settings'], ['goals', 'Personality & Goals', 'ai'], ['actions', 'Actions', 'zap'], ['kb', 'Knowledge Base', 'book']].map(([t, l, ic]) =>
            `<button id="cai_t_${t}" data-t="${t}" class="${S.botTab === t ? 'on' : ''}">${icon(ic, 17)}${l}</button>`).join('')}</div>
          <div id="cai_pane"></div>
        </div>
        <div class="card ai-chat" id="cai_test">
          <div class="card-h" style="padding:14px 18px"><span class="ai-ico sm" style="background:#ecfdf3;color:#027a48">${icon('chat', 18)}</span><div><h3 style="font-size:17px">Test bot</h3><div class="muted" style="font-size:13px">Chat as a customer. Nothing is sent.</div></div>
            <span class="spacer"></span><button class="btn sm ghost" id="cai_test_reset">${icon('restore', 16)} Reset</button></div>
          <div class="ai-msgs" id="cai_msgs"></div>
          <div class="row" style="padding:12px 14px;border-top:1px solid var(--line-soft)"><input class="input" id="cai_test_input" placeholder="Type a message as the customer…" autocomplete="off"><button class="btn primary icon" id="cai_test_send">${icon('send', 18)}</button></div>
        </div>
      </div>`;
    $('#cai_back').onclick = () => KY.go('#/ai-agents/conversation-ai');
    $('#cai_save').onclick = () => { bot.updated = 'Just now'; KY.toast('Bot saved'); };
    $('#cai_dup').onclick = () => KY.toast('Bot duplicated');
    $$('[data-t]', view).forEach((b) => (b.onclick = () => { S.botTab = b.dataset.t; $$('[data-t]', view).forEach((x) => x.classList.toggle('on', x === b)); pane(); }));
    const pane = () => botPane($('#cai_pane'), bot);
    pane();
    drawChat();
    const send = () => {
      const inp = $('#cai_test_input');
      const q = inp.value.trim();
      if (!q) return;
      inp.value = '';
      S.chat.push({ me: q });
      drawChat(true);
      later(1100, () => { S.chat.push(...botReply(q)); drawChat(); });
    };
    $('#cai_test_send').onclick = send;
    $('#cai_test_input').onkeydown = (e) => { if (e.key === 'Enter') send(); };
    $('#cai_test_reset').onclick = () => { S.chat = []; S.chatStage = 0; drawChat(); };
  }

  function drawChat(typing) {
    const box = $('#cai_msgs');
    if (!box) return;
    const greet = `<div class="ai-b bot">Hi there! 👋 I'm Bloom, the virtual assistant at Bloom Dental Studio. How can I help you today?<small>AI bot</small></div>`;
    box.innerHTML = greet + S.chat.map((m) => m.me ? `<div class="ai-b me">${esc(m.me)}</div>`
      : m.act ? `<div class="ai-act ${m.blue ? 'blue' : ''}">${icon(m.blue ? 'users' : 'check', 15)} ${esc(m.act)}</div>`
      : `<div class="ai-b bot">${esc(m.bot)}<small>AI bot${m.src ? ` · Source: ${esc(m.src)}` : ''}</small></div>`).join('') +
      (typing ? '<div class="ai-typing"><i></i><i></i><i></i></div>' : '');
    box.scrollTop = box.scrollHeight;
  }

  function botReply(q) {
    const t = q.toLowerCase();
    const faqHas = (re) => AI.faqs.find(([fq, fa]) => re.test(fq) || re.test(fa));
    if (/human|person|someone|staff|real|speak to|talk to|unhappy|complain|pain|swell|emergency/.test(t)) {
      S.chatStage = 9;
      return [{ bot: /pain|swell|emergency/.test(t) ? 'I\'m sorry you\'re in discomfort. I\'m passing you to our team right now so someone can help you straight away.' : 'Of course! I\'ve let the team know, and someone will reply here shortly.' },
        { act: 'Human handover · Assigned to Sarah Mitchell · Bot stopped', blue: true }];
    }
    if (S.chatStage === 2 && /(11|eleven|3|three|15|pm|am|first|second|either|that one|perfect)/.test(t)) {
      S.chatStage = 3;
      const time = /11|eleven|half|first/.test(t) ? '11:30' : '15:00';
      return [{ bot: `Lovely, you're booked in for an Invisalign Free Scan on Thursday 29 October at ${time} ✓ I'll text you a confirmation. Is there anything else I can help with?` },
        { act: `Appointment booked · Invisalign Free Scan · Thu 29 Oct, ${time}` }];
    }
    if (/book|appointment|slot|available|availability|thursday|come in|yes/.test(t)) {
      if (S.chatStage < 1 && !/invisalign|scan|brace|thursday|yes/.test(t)) {
        S.chatStage = 2;
        return [{ bot: 'I\'d love to help you book! I have a New Patient Consultation on Thursday 29 October at 11:30 or 15:00. Which suits you best?' }];
      }
      S.chatStage = 2;
      return [{ bot: 'Great choice! For an Invisalign Free Scan, I have Thursday 29 October at 11:30 or 15:00. Which would you prefer?' }];
    }
    if (/invisalign|brace|aligner|straight/.test(t)) {
      S.chatStage = 1;
      return [{ bot: 'Invisalign at Bloom starts from £3,200, and your first consultation, including a 3D scan, is completely free. Would you like me to book you a free scan?', src: 'Bloom price list 2026.pdf' }];
    }
    if (/hour|open|close|when are you|saturday|sunday|weekend/.test(t)) return [{ bot: 'We\'re open Monday to Friday 8am–6pm (Thursdays until 8pm) and Saturday 9am–2pm. We\'re closed on Sundays. Would you like to book a visit?', src: 'FAQs' }];
    if (/whiten/.test(t)) return [{ bot: 'Professional teeth whitening is £199, including your custom trays. Would you like to book a quick consultation first?', src: 'Bloom price list 2026.pdf' }];
    if (/pay|finance|instal|monthly|spread/.test(t)) {
      const f = faqHas(/payment plan|finance/i);
      return f ? [{ bot: f[1], src: 'FAQs' }]
        : [{ bot: 'That\'s a great question. I don\'t have that information yet, so I\'ve asked the team to get back to you shortly.' }, { act: 'Human handover · Assigned to Sarah Mitchell', blue: true }];
    }
    if (/park/.test(t)) return [{ bot: 'There\'s no on-site parking, but the nearest car park is on Cramer Street, just a two-minute walk away.', src: 'FAQs' }];
    if (/where|address|located|location/.test(t)) return [{ bot: 'We\'re at 14 Marylebone High Street, London W1U 4NS, five minutes from Baker Street station.', src: 'bloomdental.co.uk' }];
    if (/price|cost|how much/.test(t)) return [{ bot: 'Here are a few of our prices: check-up & clean £90, whitening £199 and Invisalign from £3,200. Which treatment are you interested in?', src: 'Bloom price list 2026.pdf' }];
    if (/new patient|register|join/.test(t)) return [{ bot: 'We\'re welcoming new patients! A New Patient Consultation takes 45 minutes. Would you like me to find you a time?', src: 'bloomdental.co.uk' }];
    if (/thank|great|perfect|no that|that's all|bye/.test(t)) return [{ bot: 'You\'re very welcome! Have a lovely day 😊' }];
    return [{ bot: 'Thanks for your message! I can help with treatments, prices, opening hours and booking an appointment. What would you like to know?' }];
  }

  function botPane(el, bot) {
    const tab = S.botTab;
    if (tab === 'settings') {
      el.innerHTML = `
        <div class="ai-sec"><div class="grid" style="grid-template-columns:1fr 1fr;gap:0 18px">
          <div class="field" style="margin:0"><label>Bot name</label><input class="input" id="cai_name" value="${esc(bot.name)}"></div>
          <div class="field" style="margin:0"><label>Business name</label><input class="input" value="${esc(data.business.name)}"></div></div></div>
        <div class="ai-sec" id="cai_modes_sec"><h4>Bot mode</h4><p class="hint">Choose how much the bot does on its own.</p>
          <div class="ai-modes" id="cai_modes">${[['off', 'Off', 'The bot doesn\'t reply or suggest anything.'], ['suggestive', 'Suggestive', 'The bot drafts a reply in Conversations. Your team reviews it and clicks send.'], ['auto', 'Auto-pilot', 'The bot replies to customers automatically, 24/7.']].map(([m, l, d]) =>
            `<button class="ai-opt ${bot.mode === m ? 'on' : ''}" id="cai_mode_${m}" data-mode="${m}"><b><span class="dot"></span>${l}</b><span>${d}</span></button>`).join('')}</div></div>
        <div class="ai-sec" id="cai_channels_sec"><h4>Channels</h4><p class="hint">Where the bot is allowed to reply.</p>
          <div class="ai-chans" id="cai_channels">${Object.entries(bot.channels).map(([c, on]) =>
            `<button class="ai-chan ${on ? 'on' : ''}" id="cai_ch_${c.replace(/\s/g, '').toLowerCase()}" data-ch="${c}"><span class="tick">${on ? icon('check', 13) : ''}</span>${icon(CH_ICON[c], 18)}${c}</button>`).join('')}</div></div>
        <div class="ai-sec" id="cai_human_sec"><h4>When your team steps in</h4><p class="hint">Keep the bot out of the way once a person is talking.</p>
          <div class="row" style="margin-bottom:12px"><button class="toggle ${S.sleepOnHuman ? 'on' : ''}" id="cai_stop_human"></button><span class="bold">Pause the bot when a team member replies</span>
            <span class="spacer"></span><span class="muted" style="font-size:14px">Resume after</span><select class="select" style="width:150px;height:38px"><option>24 hours</option><option>12 hours</option><option>Never</option></select></div>
          <div class="row"><span class="bold" style="flex:1">Reply delay</span><span class="muted" style="font-size:14px">Wait before replying, so it feels natural</span><select class="select" id="cai_delay" style="width:150px;height:38px"><option>30 seconds</option><option>Instant</option><option>1 minute</option></select></div></div>`;
      $$('[data-mode]', el).forEach((b) => (b.onclick = () => {
        bot.mode = b.dataset.mode;
        $$('[data-mode]', el).forEach((x) => x.classList.toggle('on', x === b));
        $('#cai_modechip').innerHTML = modeChip(bot.mode);
      }));
      $$('[data-ch]', el).forEach((b) => (b.onclick = () => {
        bot.channels[b.dataset.ch] = !bot.channels[b.dataset.ch];
        const on = bot.channels[b.dataset.ch];
        b.classList.toggle('on', on);
        $('.tick', b).innerHTML = on ? icon('check', 13) : '';
      }));
      $('#cai_stop_human').onclick = (e) => { S.sleepOnHuman = !S.sleepOnHuman; e.currentTarget.classList.toggle('on', S.sleepOnHuman); };
      $('#cai_name').oninput = (e) => { bot.name = e.target.value; };
    } else if (tab === 'goals') {
      el.innerHTML = `
        <div class="ai-sec"><h4>Bot personality</h4><p class="hint">Who the bot is and how it talks.</p>
          <textarea class="input" rows="4" id="cai_personality">${esc(bot.personality)}</textarea></div>
        <div class="ai-sec"><h4>Goal</h4><p class="hint">What a successful conversation looks like.</p>
          <textarea class="input" rows="3" id="cai_goal">${esc(bot.goal)}</textarea></div>
        <div class="ai-sec"><div class="row"><h4 style="flex:1">Additional instructions</h4><span class="muted" style="font-size:13px" id="cai_instr_count">${bot.instructions.length} / 5000</span></div><p class="hint">Rules, facts and things the bot must never do.</p>
          <textarea class="input" rows="5" id="cai_instructions">${esc(bot.instructions)}</textarea></div>`;
      ['personality', 'goal', 'instructions'].forEach((k) => ($(`#cai_${k}`).oninput = (e) => {
        bot[k] = e.target.value;
        if (k === 'instructions') $('#cai_instr_count').textContent = `${bot.instructions.length} / 5000`;
      }));
    } else if (tab === 'actions') {
      const ICON = { booking: ['calendar', '#155eef'], collect: ['form', '#12b76a'], stop: ['stop', '#f04438'], handover: ['users', '#f79009'], workflow: ['automation', '#6172f3'], field: ['edit', '#06aed4'] };
      el.innerHTML = `
        <div class="ai-sec"><div class="row"><div style="flex:1"><h4>Actions</h4><p class="hint" style="margin:0">Things the bot can do during a conversation, and when.</p></div>
          <button class="btn primary" id="cai_add_action">${icon('plus', 18)} Add action</button></div></div>
        <div class="ai-sec" id="cai_actions">${AI.actions.map((a, i) => `
          <div class="ai-actrow" id="cai_action_${a.type}"><span class="ai-ico sm" style="background:${ICON[a.type][1]}">${icon(ICON[a.type][0], 18)}</span>
            <div style="flex:1"><div class="t">${esc(a.title)}</div><div class="d">${a.desc}</div><div class="w">${icon('zap', 14)} ${esc(a.when)}</div></div>
            <button class="btn sm ghost icon">${icon('edit', 16)}</button><button class="toggle ${a.on ? 'on' : ''}" data-ai="${i}"></button></div>`).join('')}</div>`;
      $$('[data-ai]', el).forEach((b) => (b.onclick = () => { AI.actions[+b.dataset.ai].on = !AI.actions[+b.dataset.ai].on; b.classList.toggle('on'); }));
      $('#cai_add_action').onclick = () => addAction(() => botPane(el, bot));
    } else {
      el.innerHTML = `
        <div class="ai-sec"><h4>Knowledge base</h4><p class="hint">The bot answers questions using the knowledge bases you attach here.</p>
          <div class="ai-actrow" id="cai_kb_card" style="align-items:center"><span class="ai-ico sm" style="background:#12b76a">${icon('book', 18)}</span>
            <div style="flex:1"><div class="t">Bloom Dental Knowledge Base</div><div class="d muted">${AI.sources.length} sources · website, FAQs and price list · <span class="ai-yes">Trained</span></div></div>
            <button class="toggle ${bot.kb ? 'on' : ''}" id="cai_kb_attach"></button></div>
          <button class="btn" id="cai_kb_manage">${icon('external', 16)} Manage knowledge base</button></div>
        <div class="ai-sec"><h4>If the bot doesn't know the answer</h4><p class="hint">It won't guess. It tells the customer a team member will follow up, and hands the conversation over.</p></div>`;
      $('#cai_kb_attach').onclick = (e) => { bot.kb = !bot.kb; e.currentTarget.classList.toggle('on', bot.kb); };
      $('#cai_kb_manage').onclick = () => KY.go('#/ai-agents/knowledge-base');
    }
  }

  function addAction(done) {
    const types = [['booking', 'Appointment booking', 'calendar', 'Book into one of your calendars'], ['collect', 'Collect info', 'form', 'Ask for and save contact details'],
      ['handover', 'Human handover', 'users', 'Pass the conversation to your team'], ['workflow', 'Trigger a workflow', 'automation', 'Start an automation from the chat'],
      ['field', 'Update contact field', 'edit', 'Save an answer to a custom field'], ['stop', 'Stop bot', 'stop', 'End the bot\'s part of the conversation']];
    const box = KY.modal({ title: 'Add action', wide: true,
      body: `<div id="cai_act_body"><div class="ai-pick">${types.map(([id, l, ic, d]) => `<button id="cai_act_${id}" data-type="${id}"><span class="ai-ico sm" style="background:#eff4ff;color:var(--blue)">${icon(ic, 18)}</span><div><b>${l}</b><span>${d}</span></div></button>`).join('')}</div></div>` });
    $$('[data-type]', box).forEach((b) => (b.onclick = () => {
      if (b.dataset.type !== 'handover') { box.closest('.overlay').remove(); KY.toast('Action added'); return; }
      $('#cai_act_body', box).innerHTML = `
        <div class="row" style="margin-bottom:16px"><span class="ai-ico sm" style="background:#f79009">${icon('users', 18)}</span><b style="font-size:17px">Human handover</b></div>
        <div class="field"><label>When should the bot hand over?</label><textarea class="input" rows="2" id="cai_ho_when">When the contact asks for a person, is unhappy, or mentions pain or an emergency</textarea></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 16px">
          <div class="field"><label>Assign conversation to</label><select class="select" id="cai_ho_user">${data.team.map((m) => `<option>${esc(m.name)}</option>`).join('')}</select></div>
          <div class="field"><label>Add tag</label><input class="input" id="cai_ho_tag" value="needs-human"></div></div>
        <div class="field"><label>Message to the contact</label><input class="input" value="Of course! I've let the team know, and someone will reply here shortly."></div>
        <div class="row" style="margin-bottom:6px"><button class="toggle on" id="cai_ho_stop"></button><span class="bold">Stop the bot after handing over</span></div>
        <div class="row" style="justify-content:flex-end;gap:10px;margin-top:18px"><button class="btn" id="cai_act_cancel">Cancel</button><button class="btn primary" id="cai_act_save">Save action</button></div>`;
      KY.toggles(box);
      $('#cai_act_cancel', box).onclick = () => box.closest('.overlay').remove();
      $('#cai_act_save', box).onclick = () => {
        if (!AI.actions.some((a) => a.type === 'handover')) AI.actions.splice(2, 0, { type: 'handover', on: true, title: 'Human handover', desc: `Assigns to <b>${esc($('#cai_ho_user', box).value)}</b>, adds the tag <b>${esc($('#cai_ho_tag', box).value)}</b> and stops the bot`, when: $('#cai_ho_when', box).value });
        box.closest('.overlay').remove(); done(); KY.toast('Human handover action added');
      };
    }));
  }

  // ================= VOICE AI =================
  function voiceAI(view, params) {
    if (params[0] && params[0] !== 'logs') return agentEditor(view, params[0], params[1]);
    S.vaiView = params[0] || 'agents';
    view.innerHTML = `
      <div class="page-head"><h1>Voice AI</h1>${planChip('pro')}
        <div class="actions">${seg([['agents', 'Agents', 'mic'], ['logs', 'Call logs', 'phone']], S.vaiView, 'vai_view')}
          <button class="btn primary" id="vai_create">${icon('plus', 18)} Create agent</button></div></div>
      <div id="vai_body"></div>`;
    $$('[data-seg]', view).forEach((b) => (b.onclick = () => KY.go('#/ai-agents/voice-ai' + (b.dataset.seg === 'logs' ? '/logs' : ''))));
    $('#vai_create').onclick = () => KY.toast('Agent created from template', 'ok');
    const body = $('#vai_body');
    if (S.vaiView === 'agents') {
      body.innerHTML = `
        <div class="grid" id="vai_stats" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
          ${[['phone', 'Calls answered', '128'], ['calendar', 'Appointments booked', '19'], ['route', 'Calls transferred', '22'], ['clock', 'Average call', '1m 54s']].map(([ic, k, v]) =>
            `<div class="card ai-stat"><div class="k">${icon(ic, 18)} ${k}</div><div class="v">${v}</div><div class="d">Last 30 days</div></div>`).join('')}</div>
        <div class="card"><table class="t ai-tbl" id="vai_agents"><thead><tr><th>Agent</th><th>Phone number</th><th>Voice</th><th>Status</th><th>Calls (30 days)</th><th>Last updated</th><th></th></tr></thead>
          <tbody>${AI.agents.map((a) => { const v = AI.voices.find((x) => x.id === a.voice); return `<tr class="click" id="vai_agent_${a.id}" data-ag="${a.id}">
            <td><div class="row"><span class="ai-ico sm" style="background:#c11574">${icon('mic', 18)}</span><div><div class="bold">${esc(a.name)}</div><div class="muted" style="font-size:13.5px">${esc(a.role)}</div></div></div></td>
            <td>${esc(a.number)}</td><td>${esc(v.name)} · ${esc(v.accent)}</td><td><span class="chip green">${a.status}</span></td><td class="bold">${a.calls}</td><td class="muted">${a.updated}</td><td>${icon('right', 18)}</td></tr>`; }).join('')}</tbody></table></div>`;
      $$('[data-ag]', body).forEach((r) => (r.onclick = () => KY.go(`#/ai-agents/voice-ai/${r.dataset.ag}`)));
    } else {
      body.innerHTML = `<div class="card"><table class="t ai-tbl" id="vai_logs"><thead><tr><th>Caller</th><th>Date & time</th><th>Duration</th><th>Outcome</th><th>Summary</th></tr></thead>
        <tbody>${AI.calls.map((c) => `<tr class="click" id="vai_log_${c.id}" data-call="${c.id}"><td><div class="row">${avatar(c.caller === 'Unknown caller' ? '? ?' : c.caller, 30)}<div><div class="bold">${esc(c.caller)}</div><div class="muted" style="font-size:13.5px">${c.phone}</div></div></div></td>
          <td class="muted">${c.when}</td><td>${c.dur}</td><td><span class="chip ${c.outcome[0]}">${c.outcome[1]}</span></td>
          <td style="max-width:520px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink-2)">${esc(c.summary)}</td></tr>`).join('')}</tbody></table></div>`;
      $$('[data-call]', body).forEach((r) => (r.onclick = () => callDrawer(AI.calls.find((c) => c.id === r.dataset.call))));
    }
  }

  function callDrawer(c) {
    const box = KY.modal({ title: `Call with ${c.caller}`, drawer: true,
      body: `<div class="row" style="margin-bottom:14px"><span class="chip ${c.outcome[0]}">${c.outcome[1]}</span><span class="muted" style="font-size:14px">${c.when} · ${c.dur} · Agent: Rosie</span></div>
        <div class="ai-player" id="vai_player"><button class="btn primary icon" id="vai_play" style="border-radius:50%">${icon('play', 16)}</button><div class="track"><i></i></div><span class="muted" style="font-size:13.5px">${c.dur}</span></div>
        <div class="bold" style="margin:18px 0 6px">Call summary</div>
        <div id="vai_summary" style="padding:12px 14px;border-radius:10px;background:#f4f3ff;color:#3e1c96;font-size:15px">${esc(c.summary)}</div>
        <div class="bold" style="margin:18px 0 6px">Actions taken</div>
        <div id="vai_actions_taken">${c.actions.map((a) => `<div class="row" style="padding:6px 0;font-size:14.5px"><span style="color:var(--green)">${icon('check', 16)}</span>${esc(a)}</div>`).join('')}</div>
        <div class="bold" style="margin:18px 0 10px">Transcript</div>
        <div class="ai-tx" id="vai_transcript">${c.transcript.map(([w, t]) => `<div class="ai-b ${w === 'ai' ? 'bot' : 'me'}" style="max-width:88%"><div class="who" style="${w === 'ai' ? '' : 'color:#d1e0ff'}">${w === 'ai' ? 'Rosie (AI)' : esc(c.caller.split(' ')[0])}</div>${esc(t)}</div>`).join('')}</div>` });
    $('#vai_play', box).onclick = (e) => { const p = $('#vai_player', box); p.classList.toggle('playing'); e.currentTarget.innerHTML = icon(p.classList.contains('playing') ? 'pause' : 'play', 16); };
  }

  function agentEditor(view, id, sub) {
    const ag = AI.agents.find((a) => a.id === id) || AI.agents[0];
    if (sub && ['goals', 'phone', 'actions'].includes(sub)) S.vaiTab = sub;
    view.innerHTML = `
      <div class="page-head"><button class="btn ghost icon" id="vai_back">${icon('left', 20)}</button>
        <span class="ai-ico sm" style="background:#c11574">${icon('mic', 20)}</span><h1>${esc(ag.name)}</h1><span class="sub">${esc(ag.role)}</span><span class="chip green">${ag.status}</span>
        <div class="actions"><button class="btn" id="vai_test">${icon('phone', 18)} Test agent</button><button class="btn primary" id="vai_save">${icon('check', 18)} Save</button></div></div>
      <div class="card">
        <div class="ai-tabs">${[['goals', 'Agent Goals', 'ai'], ['phone', 'Phone & Availability', 'phone'], ['actions', 'Actions', 'zap']].map(([t, l, ic]) =>
          `<button id="vai_t_${t}" data-vt="${t}" class="${S.vaiTab === t ? 'on' : ''}">${icon(ic, 17)}${l}</button>`).join('')}</div>
        <div id="vai_pane"></div></div>`;
    $('#vai_back').onclick = () => KY.go('#/ai-agents/voice-ai');
    $('#vai_save').onclick = () => KY.toast('Agent saved');
    $('#vai_test').onclick = testCall;
    $$('[data-vt]', view).forEach((b) => (b.onclick = () => { S.vaiTab = b.dataset.vt; $$('[data-vt]', view).forEach((x) => x.classList.toggle('on', x === b)); agentPane($('#vai_pane'), ag); }));
    agentPane($('#vai_pane'), ag);
  }

  function agentPane(el, ag) {
    if (S.vaiTab === 'goals') {
      el.innerHTML = `
        <div class="ai-sec"><div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:0 18px">
          <div class="field" style="margin:0"><label>Agent name</label><input class="input" id="vai_name" value="${esc(ag.name)}"></div>
          <div class="field" style="margin:0"><label>Business name</label><input class="input" value="${esc(data.business.name)}"></div>
          <div class="field" style="margin:0"><label>Language</label><select class="select"><option>English (UK)</option><option>English (US)</option></select></div></div></div>
        <div class="ai-sec" id="vai_voice_sec"><h4>Voice</h4><p class="hint">Press play to preview each voice.</p>
          <div class="ai-voices" id="vai_voices">${AI.voices.map((v) => `
            <div class="ai-voice ${S.voice === v.id ? 'on' : ''}" id="vai_voice_${v.id}" data-voice="${v.id}">
              <div class="row">${avatar(v.name, 34)}<div style="flex:1"><div class="bold">${v.name}</div><div class="muted" style="font-size:13px">${v.accent}</div></div>${S.voice === v.id ? `<span style="color:var(--blue)">${icon('check', 20)}</span>` : ''}</div>
              <div class="muted" style="font-size:13.5px">${v.style}</div>
              <div class="row"><button class="play" id="vai_play_${v.id}" data-play="${v.id}">${icon('play', 15)}</button><div class="bars">${[5, 9, 6, 12, 8, 14, 7, 10, 5, 11, 7, 9, 4, 8].map((h, i) => `<i style="animation-delay:${i * 0.07}s;height:${h * 6}%"></i>`).join('')}</div></div>
            </div>`).join('')}</div></div>
        <div class="ai-sec"><h4>Initial greeting</h4><p class="hint">The first thing callers hear. Say it's a virtual assistant.</p>
          <input class="input" id="vai_greeting" value="Hi, thanks for calling Bloom Dental Studio. This is Rosie, the virtual assistant. How can I help you today?"></div>
        <div class="ai-sec"><h4>Agent prompt & goals</h4><p class="hint">Who Rosie is, what she should achieve, and the rules she follows.</p>
          <textarea class="input" rows="6" id="vai_prompt">You are Rosie, the friendly receptionist at Bloom Dental Studio in Marylebone, London.
Goals: 1) Answer questions about treatments, prices and opening hours using the knowledge base. 2) Book new patients into a New Patient Consultation, or an Invisalign Free Scan for braces enquiries. 3) Transfer emergencies and billing questions to the right person. 4) Otherwise, take a message.
Keep answers short and friendly. Never give medical advice or promise a final price.</textarea></div>`;
      $$('[data-voice]', el).forEach((c) => (c.onclick = (e) => {
        if (e.target.closest('[data-play]')) return;
        S.voice = c.dataset.voice; ag.voice = S.voice; agentPane(el, ag); KY.toast(`Voice set to ${AI.voices.find((v) => v.id === S.voice).name}`);
      }));
      $$('[data-play]', el).forEach((b) => (b.onclick = (e) => {
        e.stopPropagation();
        const card = b.closest('.ai-voice');
        const playing = !card.classList.contains('playing');
        $$('.ai-voice', el).forEach((x) => { x.classList.remove('playing'); $('.play', x).innerHTML = icon('play', 15); });
        if (playing) { card.classList.add('playing'); b.innerHTML = icon('pause', 15); later(4000, () => { card.classList.remove('playing'); b.innerHTML = icon('play', 15); }); }
      }));
    } else if (S.vaiTab === 'phone') {
      el.innerHTML = `
        <div class="ai-sec"><div class="grid" style="grid-template-columns:1fr 1fr;gap:0 18px">
          <div class="field" style="margin:0" id="vai_number"><label>Inbound phone number</label><select class="select"><option>${ag.number} · Main line</option><option>+44 20 7946 0999 · Ads tracking</option></select></div>
          <div class="field" style="margin:0"><label>Maximum call length</label><select class="select"><option>10 minutes</option><option>5 minutes</option><option>15 minutes</option></select></div></div></div>
        <div class="ai-sec" id="vai_hours"><div class="row"><div style="flex:1"><h4>Working hours</h4><p class="hint" style="margin:0">When Rosie answers calls. Outside these hours, calls go to voicemail.</p></div>
          ${seg([['always', 'Always on (24/7)'], ['custom', 'Custom hours']], 'custom', 'vai_hours')}</div>
          <table class="t ai-hours" style="margin-top:14px;border:1px solid var(--line-soft);border-radius:8px">${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d, i) => `
            <tr><td style="width:180px" class="bold">${d}</td><td style="width:70px"><button class="toggle on"></button></td><td><div class="row" style="gap:8px"><input class="input" style="width:110px;height:36px" value="07:00"><span class="muted">to</span><input class="input" style="width:110px;height:36px" value="${i < 5 ? '22:00' : '18:00'}"></div></td>
            <td class="muted" style="font-size:14px">${i === 6 ? 'Clinic closed: Rosie takes messages' : HOURS[i][1] ? `Clinic open ${HOURS[i][1]}–${HOURS[i][2]}` : ''}</td></tr>`).join('')}</table></div>`;
      KY.toggles(el);
      $$('[data-seg]', el).forEach((b) => (b.onclick = () => $$('[data-seg]', el).forEach((x) => x.classList.toggle('on', x === b))));
    } else {
      el.innerHTML = `
        <div class="ai-sec" id="vai_transfer_sec"><div class="row"><span class="ai-ico sm" style="background:#155eef">${icon('route', 18)}</span><div style="flex:1"><h4>Call transfer</h4><p class="hint" style="margin:0">Route calls to the right person on your team.</p></div><button class="toggle on"></button></div>
          <div style="margin-top:14px" id="vai_transfers">${AI.transfers.map((t, i) => `
            <div class="ai-tr" id="vai_route_${i}"><div><div class="muted" style="font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em">When the caller…</div><div class="bold">${esc(t.when)}</div></div>
              <span style="color:var(--faint)">${icon('arrowRight', 20)}</span>
              <div class="row">${avatar(t.to, 30)}<div><div class="bold">${esc(t.to)}</div><div class="muted" style="font-size:13.5px">${t.phone}</div></div></div>
              <button class="btn sm ghost icon">${icon('edit', 16)}</button></div>`).join('')}
            <button class="btn sm" id="vai_add_route">${icon('plus', 16)} Add transfer rule</button></div></div>
        <div class="ai-sec" id="vai_booking_sec"><div class="row"><span class="ai-ico sm" style="background:#12b76a">${icon('calendar', 18)}</span><div style="flex:1"><h4>Appointment booking</h4><p class="hint" style="margin:0">Book callers straight into <b>New Patient Consultation</b> and <b>Invisalign Free Scan</b>.</p></div><button class="toggle on"></button></div></div>
        <div class="ai-sec" id="vai_sms_sec"><div class="row"><span class="ai-ico sm" style="background:#f79009">${icon('sms', 18)}</span><div style="flex:1"><h4>Send SMS after the call</h4><p class="hint" style="margin:0">A follow-up text, sent automatically when the call ends.</p></div><button class="toggle on"></button></div>
          <textarea class="input" rows="2" style="margin-top:12px" id="vai_sms_text">Thanks for calling Bloom Dental Studio, {{contact.first_name}}! Book or manage your visit any time: bloomdental.co.uk/book</textarea></div>
        <div class="ai-sec" id="vai_post_sec"><div class="row"><span class="ai-ico sm" style="background:#7a5af8">${icon('note', 18)}</span><div style="flex:1"><h4>After every call</h4><p class="hint" style="margin:0">Keep your team in the loop.</p></div></div>
          <div class="row" style="margin-top:12px"><button class="toggle on"></button>Save the call summary and transcript to the contact</div>
          <div class="row" style="margin-top:10px"><button class="toggle on"></button>Email the summary to <b>sarah@bloomdental.co.uk</b></div>
          <div class="row" style="margin-top:10px"><button class="toggle"></button>Trigger a workflow when the call ends</div></div>`;
      KY.toggles(el);
      $('#vai_add_route').onclick = () => KY.modal({ title: 'Add transfer rule',
        body: `<div class="field"><label>When the caller…</label><input class="input" id="vai_rule_when" placeholder="e.g. asks about implants"></div>
          <div class="field"><label>Transfer to</label><select class="select">${data.team.map((m) => `<option>${esc(m.name)} · ${m.phone}</option>`).join('')}</select></div>`,
        actions: [{ label: 'Cancel' }, { label: 'Add rule', primary: true, id: 'vai_rule_save', onClick: (close, box) => {
          const m = data.team[0];
          AI.transfers.push({ when: $('#vai_rule_when', box).value || 'Asks about implants', to: m.name, phone: m.phone });
          close(); agentPane(el, ag); KY.toast('Transfer rule added');
        } }] });
    }
  }

  function testCall() {
    const lines = AI.calls[0].transcript.slice(0, 5);
    const box = KY.modal({ title: 'Test agent · Web call',
      body: `<div style="text-align:center;padding:6px 0 14px"><div class="ai-ico" style="margin:0 auto;width:70px;height:70px;border-radius:50%;background:#c11574">${icon('mic', 30)}</div>
          <div class="bold" style="margin-top:10px;font-size:18px">Rosie</div><div class="muted" id="vai_call_state" style="font-size:14px">Connecting…</div></div>
        <div class="ai-tx" id="vai_live" style="height:400px;overflow:auto;padding:4px 2px"></div>`,
      actions: [{ label: 'End call', id: 'vai_end' }] });
    lines.forEach(([w, t], i) => later(700 + i * 1700, () => {
      const live = $('#vai_live', box);
      if (!live) return;
      $('#vai_call_state', box).textContent = 'Live · 0:' + String(4 + i * 6).padStart(2, '0');
      live.insertAdjacentHTML('beforeend', `<div class="ai-b ${w === 'ai' ? 'bot' : 'me'}" style="max-width:88%"><div class="who" style="${w === 'ai' ? '' : 'color:#d1e0ff'}">${w === 'ai' ? 'Rosie (AI)' : 'You'}</div>${esc(t)}</div>`);
      live.scrollTop = live.scrollHeight;
    }));
  }

  // ================= KNOWLEDGE BASE =================
  const SRC = { web: ['globe', '#eff4ff', '#155eef', 'Web crawler'], faq: ['chat', '#ecfdf3', '#027a48', 'FAQs'], file: ['note', '#fef3f2', '#b42318', 'File upload'], text: ['edit', '#f4f3ff', '#5925dc', 'Rich text'] };
  const statusChip = (s) => s === 'trained' ? `<span class="chip green">${icon('check', 14)} Trained</span>` : `<span class="chip amber">${icon('clock', 14)} Training…</span>`;
  function train(src, ms = 3200) {
    src.status = 'training';
    later(ms, () => {
      src.status = 'trained';
      const row = alive(`kb_src_${src.id}`);
      if (row) { row.querySelector('[data-st]').innerHTML = statusChip('trained'); KY.toast(`${src.name} trained`); }
      const hd = alive('kb_status'); if (hd && AI.sources.every((s) => s.status === 'trained')) hd.innerHTML = statusChip('trained');
    });
  }

  function knowledgeBase(view) {
    const list = AI.sources.filter((s) => S.kbFilter === 'all' || s.type === S.kbFilter);
    const allTrained = AI.sources.every((s) => s.status === 'trained');
    view.innerHTML = `
      <div class="page-head"><h1>Knowledge Base</h1>${planChip('growth')}
        <div class="actions"><button class="btn" id="kb_new">${icon('plus', 18)} New knowledge base</button></div></div>
      <div class="card" style="margin-bottom:20px" id="kb_summary">
        <div class="row" style="padding:18px 20px;gap:16px"><span class="ai-ico" style="background:#12b76a">${icon('book', 24)}</span>
          <div style="flex:1"><div class="row"><b style="font-size:19px">Bloom Dental Knowledge Base</b><span id="kb_status">${statusChip(allTrained ? 'trained' : 'training')}</span></div>
            <div class="muted" style="font-size:14.5px">Used by <b style="color:var(--ink-2)">Bloom Front Desk Bot</b> and Voice AI agent <b style="color:var(--ink-2)">Rosie</b></div></div>
          ${[['Sources', AI.sources.length], ['Web pages', 14 + (AI.sources.some((s) => s.id === 'sw') ? 6 : 0)], ['FAQs', AI.faqs.length], ['Files', AI.sources.filter((s) => s.type === 'file').length]].map(([k, v]) =>
            `<div style="text-align:center;padding:0 18px;border-left:1px solid var(--line-soft)"><div style="font-size:24px;font-weight:700">${v}</div><div class="muted" style="font-size:13.5px">${k}</div></div>`).join('')}
        </div></div>
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)">
          ${seg([['all', 'All sources'], ['web', 'Web crawler', 'globe'], ['faq', 'FAQs', 'chat'], ['file', 'Files', 'note']], S.kbFilter, 'kb_f')}
          <span class="spacer"></span><button class="btn primary" id="kb_add">${icon('plus', 18)} Add source</button></div>
        <table class="t ai-tbl" id="kb_sources"><thead><tr><th>Source</th><th>Type</th><th>Details</th><th>Training status</th><th>Last updated</th><th></th></tr></thead>
          <tbody>${list.map((s) => `<tr class="click" id="kb_src_${s.id}" data-src="${s.id}">
            <td><div class="row"><span class="ai-src" style="background:${SRC[s.type][1]};color:${SRC[s.type][2]}">${icon(SRC[s.type][0], 20)}</span><span class="bold">${esc(s.name)}</span></div></td>
            <td>${SRC[s.type][3]}</td><td class="muted">${esc(s.type === 'faq' ? `${AI.faqs.length} questions` : s.detail)}</td><td data-st>${statusChip(s.status)}</td><td class="muted">${esc(s.updated)}</td>
            <td><button class="btn sm ghost icon" title="Re-train">${icon('restore', 16)}</button></td></tr>`).join('')}</tbody></table>
      </div>`;
    $$('[data-seg]', view).forEach((b) => (b.onclick = () => { S.kbFilter = b.dataset.seg; knowledgeBase(view); }));
    $('#kb_new').onclick = () => KY.toast('Most businesses need just one knowledge base', 'warn');
    $('#kb_add').onclick = () => addSource(view);
    $$('[data-src]', view).forEach((r) => (r.onclick = (e) => {
      if (e.target.closest('button')) { const s = AI.sources.find((x) => x.id === r.dataset.src); train(s, 2500); r.querySelector('[data-st]').innerHTML = statusChip('training'); return; }
      if (r.dataset.src === 's2') faqDrawer(view);
      else KY.toast('Source details: re-crawl or replace from the ⟳ button');
    }));
  }

  function faqDrawer(view) {
    const box = KY.modal({ title: 'Frequently asked questions', drawer: true,
      body: `<div class="row" style="margin-bottom:14px"><span class="muted" style="flex:1;font-size:14px">${AI.faqs.length} questions · answers are used word for word</span><button class="btn sm primary" id="kb_faq_add">${icon('plus', 16)} Add FAQ</button></div>
        <div id="kb_faq_list">${AI.faqs.map(([q, a]) => `<div style="padding:12px 0;border-top:1px solid var(--line-soft)"><div class="bold">${esc(q)}</div><div class="muted" style="font-size:14.5px;margin-top:3px">${esc(a)}</div></div>`).join('')}</div>` });
    $('#kb_faq_add', box).onclick = () => { $$('.overlay, .drawer').forEach((x) => x.remove()); faqModal(view); };
  }

  function faqModal(view) {
    KY.modal({ title: 'Add FAQ',
      body: `<div class="field"><label>Question</label><input class="input" id="kb_q" placeholder="e.g. Do you offer payment plans?"></div>
        <div class="field"><label>Answer</label><textarea class="input" rows="4" id="kb_a" placeholder="Write the answer exactly as the AI should give it"></textarea></div>
        <p class="muted" style="margin:0;font-size:14px">Tip: add one FAQ for every question your team answers more than once a week.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Save FAQ', primary: true, id: 'kb_faq_save', onClick: (close, box) => {
        const q = $('#kb_q', box).value.trim() || 'Do you offer payment plans?';
        const a = $('#kb_a', box).value.trim() || 'Yes! Treatments over £1,000 can be spread over 12 months at 0% interest.';
        AI.faqs.push([q, a]);
        const s = AI.sources.find((x) => x.id === 's2');
        s.updated = 'Just now'; train(s, 2600);
        close(); knowledgeBase(view); KY.toast('FAQ added: training…');
      } }] });
  }

  function addSource(view) {
    const box = KY.modal({ title: 'Add source', wide: true,
      body: `<div id="kb_add_body"><p class="muted" style="margin:0 0 14px">Choose what you'd like to teach your AI agents.</p><div class="ai-pick">
        ${[['web', 'Web crawler', 'globe', 'Crawl pages from your website'], ['faq', 'FAQs', 'chat', 'Add questions and exact answers'], ['file', 'File upload', 'upload', 'PDF, Word or text documents'], ['text', 'Rich text', 'edit', 'Type or paste information directly']].map(([id, l, ic, d]) =>
          `<button id="kb_type_${id}" data-kt="${id}"><span class="ai-src" style="background:${SRC[id][1]};color:${SRC[id][2]}">${icon(ic, 20)}</span><div><b>${l}</b><span>${d}</span></div></button>`).join('')}</div></div>` });
    const body = $('#kb_add_body', box);
    const close = () => box.closest('.overlay').remove();
    $$('[data-kt]', box).forEach((b) => (b.onclick = () => {
      const t = b.dataset.kt;
      if (t === 'faq') { close(); return faqModal(view); }
      if (t === 'text') { close(); return KY.toast('Rich text source added'); }
      if (t === 'web') {
        box.querySelector('.modal-h h3').textContent = 'Web crawler';
        body.innerHTML = `
          <div class="field"><label>Website URL</label><input class="input" id="kb_url" placeholder="https://"></div>
          <div class="ai-lbl">What should we crawl?</div>
          <div class="ai-modes" id="kb_crawl_opts">${[['exact', 'This URL only', 'Just the page you entered.'], ['path', 'All pages under this path', 'e.g. every page in /blog'], ['domain', 'Entire domain', 'Every page we can find on the site.']].map(([id, l, d], i) =>
            `<button class="ai-opt ${i === 1 ? 'on' : ''}" id="kb_crawl_${id}" data-co="${id}"><b><span class="dot"></span>${l}</b><span>${d}</span></button>`).join('')}</div>
          <div class="row" style="justify-content:flex-end;gap:10px;margin-top:20px"><button class="btn" id="kb_cancel">Cancel</button><button class="btn primary" id="kb_crawl_start">${icon('search', 16)} Start crawling</button></div>`;
        $$('[data-co]', body).forEach((o) => (o.onclick = () => $$('[data-co]', body).forEach((x) => x.classList.toggle('on', x === o))));
        $('#kb_cancel', body).onclick = close;
        $('#kb_crawl_start', body).onclick = () => {
          const url = ($('#kb_url', body).value.trim() || 'bloomdental.co.uk/blog').replace(/^https?:\/\//, '').replace(/\/$/, '');
          const pages = ['', '/invisalign-vs-braces', '/how-to-keep-teeth-white', '/what-happens-at-a-check-up', '/nervous-patient-guide', '/whitening-faq'];
          body.innerHTML = `<div class="row" style="margin-bottom:12px"><span class="ai-src" style="background:#eff4ff;color:#155eef">${icon('globe', 20)}</span><b>${esc(url)}</b><span class="chip amber" id="kb_crawl_state">${icon('clock', 14)} Crawling…</span></div>
            <div id="kb_pages" class="card" style="box-shadow:none;max-height:320px;overflow:auto"></div>
            <div class="row" style="justify-content:flex-end;gap:10px;margin-top:18px"><span class="muted" style="flex:1;font-size:14px" id="kb_found">Finding pages…</span><button class="btn primary" id="kb_train" disabled style="opacity:.5">Train selected pages</button></div>`;
          pages.forEach((p, i) => later(250 + i * 260, () => {
            const list = $('#kb_pages', body); if (!list) return;
            list.insertAdjacentHTML('beforeend', `<div class="row" style="padding:10px 14px;border-bottom:1px solid var(--line-soft)"><input type="checkbox" checked style="width:17px;height:17px"><span style="flex:1">${esc(url + p)}</span><span class="chip green">${icon('check', 13)} Found</span></div>`);
            $('#kb_found', body).textContent = `${i + 1} pages found · ${i + 1} selected`;
            if (i === pages.length - 1) {
              $('#kb_crawl_state', body).outerHTML = `<span class="chip green">${icon('check', 14)} Crawl complete</span>`;
              const tb = $('#kb_train', body); tb.disabled = false; tb.style.opacity = 1;
            }
          }));
          $('#kb_train', body).onclick = () => {
            const s = { id: 'sw', type: 'web', name: url, detail: `${pages.length} pages · All pages under this path`, status: 'training', updated: 'Just now' };
            AI.sources = AI.sources.filter((x) => x.id !== 'sw'); AI.sources.push(s); train(s);
            close(); knowledgeBase(view); KY.toast(`Training ${pages.length} pages…`);
          };
        };
      }
      if (t === 'file') {
        box.querySelector('.modal-h h3').textContent = 'File upload';
        body.innerHTML = `
          <div class="card" style="border-style:dashed;padding:42px;text-align:center;box-shadow:none;cursor:pointer" id="kb_drop">${icon('upload', 34)}
            <div class="bold" style="margin-top:10px">Drop files here, or click to browse</div><div class="muted" style="font-size:14px">PDF, DOCX or TXT · up to 25 MB each</div></div>
          <div id="kb_file" style="margin-top:14px"></div>
          <div class="row" style="justify-content:flex-end;gap:10px;margin-top:18px"><button class="btn" id="kb_cancel">Cancel</button><button class="btn primary" id="kb_upload" disabled style="opacity:.5">${icon('upload', 16)} Upload & train</button></div>`;
        $('#kb_cancel', body).onclick = close;
        $('#kb_drop', body).onclick = () => {
          $('#kb_file', body).innerHTML = `<div class="row" style="padding:12px 14px;border:1px solid var(--line);border-radius:10px"><span class="ai-src" style="background:#fef3f2;color:#b42318">${icon('note', 20)}</span>
            <div style="flex:1"><div class="bold">Whitening aftercare guide.pdf</div><div class="muted" style="font-size:13.5px">PDF · 3 pages · 412 KB</div></div><span class="chip green">${icon('check', 13)} Ready</span></div>`;
          const u = $('#kb_upload', body); u.disabled = false; u.style.opacity = 1;
        };
        $('#kb_upload', body).onclick = () => {
          const s = { id: 'sf', type: 'file', name: 'Whitening aftercare guide.pdf', detail: 'PDF · 3 pages · 412 KB', status: 'training', updated: 'Just now' };
          AI.sources = AI.sources.filter((x) => x.id !== 'sf'); AI.sources.push(s); train(s);
          close(); knowledgeBase(view); KY.toast('File uploaded: training…');
        };
      }
    }));
  }

  // ================= CONTENT AI =================
  const TYPES = [['email', 'Email', 'mail'], ['social', 'Social post', 'instagram'], ['blog', 'Blog post', 'note'], ['website', 'Website copy', 'globe'], ['sms', 'SMS', 'sms']];
  const PROMPTS = {
    email: 'Email to past patients about our £199 teeth whitening offer this month, ending 31 October',
    social: 'Instagram post promoting our free Invisalign 3D scan',
    blog: 'Blog post: 5 signs you might be a good fit for Invisalign',
    website: 'Hero section for our Invisalign page',
    sms: 'Reminder for patients who are due a check-up',
  };
  const OUT = {
    email: {
      Friendly: 'Subject: Your brightest smile, just £199 this October ✨\n\nHi {{contact.first_name}},\n\nIt\'s been a while, and we\'ve missed you at Bloom!\n\nThis month only, professional teeth whitening is just £199, including your own custom-made trays. It\'s gentle, quick, and the results last.\n\nWhy patients love it:\n• Up to eight shades whiter\n• Safe for sensitive teeth\n• Done in our relaxed Marylebone studio\n\nThe offer ends on 31 October, and appointments are filling up fast.\n\n[Book my whitening]\n\nSee you soon,\nThe Bloom Dental team',
      Professional: 'Subject: Professional teeth whitening: £199 until 31 October\n\nDear {{contact.first_name}},\n\nThroughout October, Bloom Dental Studio is offering professional teeth whitening for £199, including custom-fitted trays.\n\nTreatment is supervised by our clinical team, suitable for sensitive teeth, and can lighten your smile by up to eight shades.\n\nThis offer is available until 31 October, subject to availability.\n\n[Book an appointment]\n\nKind regards,\nBloom Dental Studio',
    },
    social: {
      Friendly: '✨ Thinking about straighter teeth? Start with a FREE 3D scan! ✨\n\nSee your future smile on screen before you commit to anything. No pressure, no cost, just a friendly chat with our Invisalign team. 💙\n\n📍 Bloom Dental Studio, Marylebone\n🦷 Invisalign from £3,200\n📅 Book your free scan: link in bio\n\n#Invisalign #LondonDentist #Marylebone #SmileMakeover #BloomDental',
      Professional: 'Considering Invisalign? Book a complimentary 3D scan at Bloom Dental Studio.\n\nOur clinicians will assess your smile, show you a digital preview of your results and explain your options, with no obligation.\n\nInvisalign treatment from £3,200.\nBook online: link in bio.\n\n#Invisalign #LondonDentist #Marylebone',
    },
    blog: { _: '5 signs you might be a good fit for Invisalign\n\nThinking about straightening your teeth, but not keen on metal braces? Invisalign uses clear, removable aligners to move your teeth gradually, and it suits more people than you might think.\n\n1. Your teeth are a little crowded\nMild to moderate crowding is one of the most common reasons patients choose Invisalign.\n\n2. You have gaps you\'d like to close\nSmall spaces between teeth often respond really well to aligners.\n\n3. Your teeth have moved since you had braces\nIt\'s very common, and usually quick to correct.\n\n4. You want something discreet\nAligners are almost invisible, so most people won\'t notice you\'re wearing them.\n\n5. You\'re ready to wear them 22 hours a day\nThe results depend on you, so commitment matters.\n\nThe best way to find out? Book a free 3D scan at Bloom and see your future smile on screen.' },
    website: { _: 'Headline:\nStraighter teeth, without the braces.\n\nSubheading:\nClear, comfortable Invisalign aligners, planned by our expert team in Marylebone. See your new smile before you start, with a free 3D scan.\n\nKey points:\n• Free consultation and 3D smile scan\n• Treatment from £3,200, with flexible payment options\n• Almost invisible and removable\n\nButton:\nBook my free scan' },
    sms: { _: 'Hi {{contact.first_name}}, it\'s Bloom Dental 😊 You\'re due your 6-month check-up & clean. Book in seconds: bloomdental.co.uk/book. Reply STOP to opt out.' },
  };
  const LEN = { Short: 0.55, Medium: 1, Long: 1 };

  function contentAI(view, params) {
    S.cntView = ['image', 'history'].includes(params[0]) ? params[0] : 'text';
    view.innerHTML = `
      <div class="page-head"><h1>Content AI</h1>${planChip('usage')}
        <div class="actions">${seg([['text', 'Text', 'edit'], ['image', 'Image', 'image'], ['history', 'History', 'clock']], S.cntView, 'cnt_view')}</div></div>
      <div id="cnt_body"></div>`;
    $$('[data-seg]', view).forEach((b) => (b.onclick = () => KY.go('#/ai-agents/content-ai' + (b.dataset.seg === 'text' ? '' : '/' + b.dataset.seg))));
    const body = $('#cnt_body');
    if (S.cntView === 'text') textWriter(body);
    else if (S.cntView === 'image') imageGen(body);
    else body.innerHTML = `<div class="card"><table class="t" id="cnt_history"><thead><tr><th>Type</th><th>Prompt</th><th>Words</th><th>Used in</th><th>Created</th></tr></thead><tbody>
      ${[['Email', 'October whitening offer for past patients', 168, 'Email campaign', 'Today'], ['Social post', 'Free Invisalign 3D scan', 74, 'Social Planner', 'Yesterday'], ['Image', 'Bright modern dental studio, morning light', '—', 'Media Storage', '19 Oct'], ['Blog post', 'Invisalign vs braces', 612, 'Blog', '14 Oct'], ['Website copy', 'Whitening page hero', 58, 'Sites', '9 Oct']]
        .map((r) => `<tr>${r.map((v, i) => `<td class="${i === 0 ? 'bold' : i === 4 ? 'muted' : ''}">${v}</td>`).join('')}</tr>`).join('')}</tbody></table>
      <div class="muted" style="padding:14px 18px;font-size:14px">14 generations this month · included on Pro. On other plans Content AI costs $0.18 per 1,000 words.</div></div>`;
  }

  function textWriter(body) {
    body.innerHTML = `
      <div class="grid" style="grid-template-columns:520px minmax(0,1fr);align-items:start">
        <div class="card" id="cnt_form"><div class="card-b">
          <div class="ai-lbl">What are you writing?</div>
          <div class="row" style="flex-wrap:wrap;gap:8px;margin-bottom:18px" id="cnt_types">${TYPES.map(([id, l, ic]) => `<button class="btn sm ${S.cntType === id ? 'primary' : ''}" id="cnt_type_${id}" data-ty="${id}">${icon(ic, 16)}${l}</button>`).join('')}</div>
          <div class="field"><label>Describe what you want</label><textarea class="input" rows="4" id="cnt_prompt" placeholder="${esc(PROMPTS[S.cntType])}"></textarea></div>
          <div class="ai-lbl">Tone of voice</div>
          <div class="row" style="flex-wrap:wrap;gap:8px;margin-bottom:18px" id="cnt_tones">${['Friendly', 'Professional', 'Persuasive', 'Playful'].map((t) => `<button class="btn sm ${S.cntTone === t ? 'primary' : ''}" id="cnt_tone_${t.toLowerCase()}" data-tone="${t}">${t}</button>`).join('')}</div>
          <div class="ai-lbl">Length</div>
          <div style="margin-bottom:20px">${seg([['Short', 'Short'], ['Medium', 'Medium'], ['Long', 'Long']], S.cntLen, 'cnt_len')}</div>
          <button class="btn primary" id="cnt_generate" style="width:100%;justify-content:center;height:46px">${icon('sparkle', 18)} Generate</button>
          <div class="muted" style="font-size:13.5px;margin-top:12px;text-align:center">Uses your business details from Settings → Business Profile</div>
        </div></div>
        <div class="card" id="cnt_result"><div class="card-h"><h3>Result</h3><span class="spacer"></span><span class="muted" style="font-size:14px" id="cnt_words"></span></div>
          <div class="card-b"><div class="ai-out" id="cnt_out"><div class="empty" style="padding:110px 20px"><div style="color:#7a5af8">${icon('sparkle', 40)}</div><div class="big">Your content will appear here</div>Pick a type, describe what you need and click Generate.</div></div></div>
          <div class="row" style="padding:14px 20px;border-top:1px solid var(--line-soft)" id="cnt_tools">
            <button class="btn sm" id="cnt_copy">${icon('copy', 16)} Copy</button><button class="btn sm" id="cnt_regen">${icon('restore', 16)} Regenerate</button>
            <span class="spacer"></span><button class="btn sm primary" id="cnt_use">${icon('send', 16)} <span id="cnt_use_l">Use in email campaign</span></button></div>
        </div>
      </div>`;
    const useLabel = { email: 'Use in email campaign', social: 'Send to Social Planner', blog: 'Create blog post', website: 'Copy to page builder', sms: 'Use in SMS' };
    $('#cnt_use_l').textContent = useLabel[S.cntType];
    $$('[data-ty]', body).forEach((b) => (b.onclick = () => { S.cntType = b.dataset.ty; textWriter(body); }));
    $$('[data-tone]', body).forEach((b) => (b.onclick = () => { S.cntTone = b.dataset.tone; $$('[data-tone]', body).forEach((x) => x.classList.toggle('primary', x === b)); }));
    $$('[data-seg]', body).forEach((b) => (b.onclick = () => { S.cntLen = b.dataset.seg; $$('[data-seg]', body).forEach((x) => x.classList.toggle('on', x === b)); }));
    const gen = () => {
      const o = OUT[S.cntType];
      let txt = o[S.cntTone] || o.Friendly || o._;
      if (S.cntLen === 'Short') txt = txt.split('\n\n').slice(0, Math.max(2, Math.ceil(txt.split('\n\n').length * LEN.Short))).join('\n\n');
      const words = txt.split(/(\s+)/);
      const out = $('#cnt_out');
      out.innerHTML = '';
      $('#cnt_words').textContent = 'Writing…';
      let i = 0;
      const step = Math.max(2, Math.ceil(words.length / 110));
      const tick = setInterval(() => {
        if (!alive('cnt_out')) return clearInterval(tick);
        i += step;
        out.innerHTML = esc(words.slice(0, i).join('')) + (i < words.length ? '<span class="cur"></span>' : '');
        if (i >= words.length) { clearInterval(tick); const n = txt.split(/\s+/).length; $('#cnt_words').textContent = `${n} words · ${S.cntTone} · ${S.cntLen}`; }
      }, 40);
    };
    $('#cnt_generate').onclick = gen;
    $('#cnt_regen').onclick = gen;
    $('#cnt_copy').onclick = () => KY.toast('Copied to clipboard');
    $('#cnt_use').onclick = () => KY.toast(`Opened in ${useLabel[S.cntType].replace(/^(Use in|Send to|Copy to|Create) /, '')}`);
  }

  const ART = [
    ['#7f56d9', '#ee46bc', '#fec84b'], ['#155eef', '#22ccee', '#a6f4c5'], ['#f79009', '#f04438', '#fdb022'], ['#12b76a', '#06aed4', '#d1e0ff'],
  ];
  const art = (c, i, ar) => {
    const h = ar === '16:9' ? 225 : ar === '4:5' ? 500 : 400;
    const smile = `<path d="M${130} ${h * 0.58} q70 ${h * 0.16} 140 0" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"/>`;
    return `<svg viewBox="0 0 400 ${h}" preserveAspectRatio="xMidYMid slice"><defs>
      <linearGradient id="ag${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".6" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient>
      <radialGradient id="ar${i}" cx=".3" cy=".25" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      <rect width="400" height="${h}" fill="url(#ag${i})"/><rect width="400" height="${h}" fill="url(#ar${i})"/>
      <circle cx="${[300, 90, 320, 110][i]}" cy="${h * [0.25, 0.3, 0.75, 0.7][i]}" r="${h * 0.32}" fill="#fff" opacity=".12"/>
      <circle cx="${[90, 310, 70, 300][i]}" cy="${h * [0.8, 0.85, 0.2, 0.2][i]}" r="${h * 0.18}" fill="#fff" opacity=".1"/>
      ${i % 2 === 0 ? smile : `<rect x="140" y="${h * 0.3}" width="120" height="${h * 0.4}" rx="40" fill="#fff" opacity=".85"/><rect x="160" y="${h * 0.38}" width="80" height="${h * 0.08}" rx="10" fill="${c[0]}" opacity=".5"/>`}
    </svg>`;
  };

  function imageGen(body) {
    body.innerHTML = `
      <div class="grid" style="grid-template-columns:520px minmax(0,1fr);align-items:start">
        <div class="card" id="cnt_img_form"><div class="card-b">
          <div class="field"><label>Describe the image</label><textarea class="input" rows="4" id="cnt_img_prompt" placeholder="e.g. A bright, modern dental studio with plants, morning light"></textarea></div>
          <div class="ai-lbl">Style</div>
          <div class="row" style="flex-wrap:wrap;gap:8px;margin-bottom:18px">${['Photo', 'Illustration', '3D render', 'Minimal'].map((t) => `<button class="btn sm ${S.imgStyle === t ? 'primary' : ''}" id="cnt_style_${t.split(' ')[0].toLowerCase()}" data-style="${t}">${t}</button>`).join('')}</div>
          <div class="ai-lbl">Size</div>
          <div style="margin-bottom:20px">${seg([['1:1', 'Square 1:1'], ['4:5', 'Portrait 4:5'], ['16:9', 'Landscape 16:9']], S.imgAr, 'cnt_ar')}</div>
          <button class="btn primary" id="cnt_img_generate" style="width:100%;justify-content:center;height:46px">${icon('sparkle', 18)} Generate 4 images</button>
          <div class="muted" style="font-size:13.5px;margin-top:12px;text-align:center">Only use images that represent your business honestly.</div>
        </div></div>
        <div class="card" id="cnt_img_result"><div class="card-h"><h3>Images</h3><span class="spacer"></span>
          <button class="btn sm" id="cnt_img_save">${icon('folder', 16)} Save to Media Storage</button><button class="btn sm primary" id="cnt_img_use">${icon('send', 16)} Use in social post</button></div>
          <div class="card-b" id="cnt_imgs"></div></div>
      </div>`;
    const grid = $('#cnt_imgs');
    const draw = () => {
      if (S.imgs === null) { grid.innerHTML = `<div class="empty" style="padding:120px 20px"><div style="color:#7a5af8">${icon('image', 40)}</div><div class="big">No images yet</div>Describe an image and click Generate.</div>`; return; }
      const w = S.imgAr === '16:9' ? '100%' : S.imgAr === '4:5' ? '590px' : '720px';
      grid.innerHTML = `<div class="ai-imgs" style="width:${w};max-width:100%;margin:0 auto">${ART.map((c, i) => S.imgs === 'loading'
        ? `<div class="ai-img ai-shim" style="aspect-ratio:${S.imgAr.replace(':', '/')}"></div>`
        : `<div class="ai-img ${S.imgSel === i ? 'on' : ''}" id="cnt_img_${i}" data-img="${i}">${art(c, i, S.imgAr)}</div>`).join('')}</div>`;
      $$('[data-img]', grid).forEach((t) => (t.onclick = () => { S.imgSel = +t.dataset.img; draw(); }));
    };
    draw();
    $$('[data-style]', body).forEach((b) => (b.onclick = () => { S.imgStyle = b.dataset.style; $$('[data-style]', body).forEach((x) => x.classList.toggle('primary', x === b)); }));
    $$('[data-seg]', body).forEach((b) => (b.onclick = () => { S.imgAr = b.dataset.seg; $$('[data-seg]', body).forEach((x) => x.classList.toggle('on', x === b)); if (S.imgs === 'done') draw(); }));
    $('#cnt_img_generate').onclick = () => { S.imgs = 'loading'; S.imgSel = -1; draw(); later(2200, () => { if (!alive('cnt_imgs')) return; S.imgs = 'done'; draw(); }); };
    $('#cnt_img_save').onclick = () => KY.toast(S.imgSel >= 0 ? 'Image saved to Media Storage' : 'Select an image first', S.imgSel >= 0 ? 'ok' : 'warn');
    $('#cnt_img_use').onclick = () => KY.toast(S.imgSel >= 0 ? 'Image added to a new social post' : 'Select an image first', S.imgSel >= 0 ? 'ok' : 'warn');
  }

  // ---------- Register ----------
  KY.screen('ai-agents', {
    tabs: [{ id: 'getting-started', label: 'Getting Started' }, { id: 'conversation-ai', label: 'Conversation AI' }, { id: 'voice-ai', label: 'Voice AI' }, { id: 'knowledge-base', label: 'Knowledge Base' }, { id: 'content-ai', label: 'Content AI' }],
    render(view, { tab, params }) {
      if (tab === 'conversation-ai') return conversationAI(view, params);
      if (tab === 'voice-ai') return voiceAI(view, params);
      if (tab === 'knowledge-base') return knowledgeBase(view);
      if (tab === 'content-ai') return contentAI(view, params);
      return gettingStarted(view, params);
    },
  });
})();
