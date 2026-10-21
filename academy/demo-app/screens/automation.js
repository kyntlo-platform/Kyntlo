// Automation — Workflows list, recipes, the vertical workflow builder (triggers, actions,
// If/Else lanes), workflow settings, enrollment history, execution logs and the
// Global Workflow Settings tab. Mirrors HighLevel's Automation → Workflows module.
(() => {
  const { esc, icon, $, $$, avatar } = KY;
  const data = KY.data;

  Object.assign(KY_ICONS, {
    flag: '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
    crown: '<path d="M3 7l4 4 5-7 5 7 4-4-2 12H5z"/>',
    sheet: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
    goto: '<path d="M4 4v7a4 4 0 0 0 4 4h12M16 11l4 4-4 4"/>',
    webhook: '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><circle cx="12" cy="6" r="3"/><path d="M9 17h6M10.5 8.6L7.5 14.4M13.5 8.6l3 5.8"/>',
    zoomIn: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>',
    zoomOut: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M8 11h6"/>',
    fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  });

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  const contact = (id) => data.contacts.find((c) => c.id === id) || { name: id, phone: '', email: '' };
  const first = (id) => contact(id).name.split(' ')[0];

  // ---------------------------------------------------------------- catalogs
  const TRIGGERS = {
    Contact: ['Birthday Reminder', 'Contact Changed', 'Contact Created', 'Contact DND', 'Contact Tag', 'Custom Date Reminder', 'Note Added', 'Task Added', 'Task Completed'],
    Events: ['Call Status', 'Customer Replied', 'Email Events', 'Form Submitted', 'Survey Submitted', 'Trigger Link Clicked', 'Facebook Lead Form Submitted', 'Inbound Webhook', 'Scheduler'],
    Appointments: ['Appointment Status', 'Customer Booked Appointment'],
    Opportunities: ['Opportunity Created', 'Opportunity Status Changed', 'Opportunity Changed', 'Pipeline Stage Changed', 'Stale Opportunities'],
    Payments: ['Invoice', 'Payment Received', 'Order Submitted'],
    'Courses & Communities': ['Category Started', 'Lesson Completed', 'Group Access Granted'],
  };
  const PREMIUM_TRIGGERS = ['Inbound Webhook', 'Scheduler'];
  const TRIGGER_DESC = {
    'Form Submitted': 'Runs when a contact submits one of your forms.',
    'Contact Tag': 'Runs when a tag is added to or removed from a contact.',
    'Appointment Status': 'Runs when an appointment is confirmed, cancelled, showed or no-show.',
    'Customer Booked Appointment': 'Runs when a contact books through one of your calendars.',
    'Call Status': 'Runs when a call ends with a given status, such as no answer.',
    'Opportunity Status Changed': 'Runs when a deal becomes open, won, lost or abandoned.',
    'Pipeline Stage Changed': 'Runs when a deal moves to a pipeline stage.',
    'Inbound Webhook': 'Starts the workflow from another app by sending data to a unique URL.',
    'Payment Received': 'Runs when a payment is completed.',
    'Birthday Reminder': "Runs on (or before) the contact's date of birth.",
  };
  const forms = data.forms.map((f) => f.name);
  const calendars = data.calendars.map((k) => k.name);
  const pipelines = data.pipelines.map((p) => p.name);
  const allStages = [...new Set(data.pipelines.flatMap((p) => p.stages))];
  const TAGS = [...new Set([...data.tags, 'consultation booked', 'no-show', 'patient', 'hot lead'])];
  const FILTERS = {
    'Form Submitted': [['Form', forms]],
    'Survey Submitted': [['Survey', ['Smile Assessment']]],
    'Contact Tag': [['Tag Added', TAGS], ['Tag Removed', TAGS]],
    'Appointment Status': [['Appointment status', ['Confirmed', 'Cancelled', 'Showed', 'No Show', 'Invalid']], ['In calendar', calendars]],
    'Customer Booked Appointment': [['In calendar', calendars]],
    'Call Status': [['Call status', ['No Answer', 'Busy', 'Completed', 'Voicemail', 'Canceled', 'Failed']], ['Direction', ['Inbound', 'Outbound']]],
    'Opportunity Status Changed': [['Status', ['Open', 'Won', 'Lost', 'Abandoned']], ['In pipeline', pipelines]],
    'Opportunity Created': [['In pipeline', pipelines]],
    'Pipeline Stage Changed': [['In pipeline', pipelines], ['Pipeline stage', allStages]],
    'Payment Received': [['Product', data.products.map((p) => p.name)]],
    'Facebook Lead Form Submitted': [['Page', ['Bloom Dental Studio']]],
    'Trigger Link Clicked': [['Trigger link', ['Book your free scan', 'Leave a review']]],
    'Customer Replied': [['Reply channel', ['SMS', 'Email', 'WhatsApp', 'Facebook', 'Instagram']]],
  };

  // Action catalog: [name, type, icon, colour, premium]
  const C = { comm: '#2e90fa', tool: '#7f56d9', contact: '#12b76a', opp: '#f79009', data: '#06aed4', ai: '#ee46bc', appt: '#6172f3', mkt: '#f04438' };
  const ACTIONS = {
    Contact: [['Create Contact', 'create_contact', 'user', C.contact], ['Find Contact', 'contact', 'search', C.contact], ['Update Contact Field', 'contact', 'edit', C.contact],
      ['Add Contact Tag', 'add_tag', 'tag', C.contact], ['Remove Contact Tag', 'remove_tag', 'tag', C.contact], ['Assign to User', 'assign', 'user', C.contact],
      ['Remove Assigned User', 'contact', 'user', C.contact], ['Add Note', 'contact', 'note', C.contact], ['Add Task', 'task', 'task', C.contact],
      ['Enable/Disable DND', 'contact', 'lock', C.contact], ['Delete Contact', 'contact', 'trash', C.contact]],
    Communication: [['Send Email', 'email', 'mail', C.comm], ['Send SMS', 'sms', 'sms', C.comm], ['Call', 'generic', 'phone', C.comm], ['Voicemail', 'generic', 'mic', C.comm],
      ['Send Internal Notification', 'notification', 'bell', C.comm], ['Send Review Request', 'review', 'star', C.comm], ['WhatsApp', 'generic', 'whatsapp', C.comm],
      ['Facebook Messenger', 'generic', 'facebook', C.comm], ['Instagram DM', 'generic', 'instagram', C.comm], ['Manual Action', 'generic', 'user', C.comm]],
    'Send Data': [['Webhook', 'webhook', 'webhook', C.data], ['Custom Webhook', 'custom_webhook', 'webhook', C.data, true], ['Google Sheets', 'sheets', 'sheet', C.data, true]],
    'Internal Tools': [['If/Else', 'ifelse', 'split', C.tool], ['Wait', 'wait', 'wait', C.tool], ['Goal Event', 'goal', 'flag', C.tool], ['Go To', 'goto', 'goto', C.tool],
      ['Split', 'generic', 'split', C.tool], ['Update Custom Value', 'generic', 'edit', C.tool], ['Add To Workflow', 'generic', 'automation', C.tool],
      ['Remove From Workflow', 'remove_wf', 'x', C.tool], ['Drip Mode', 'generic', 'clock', C.tool], ['Custom Code', 'generic', 'layers', C.tool, true]],
    AI: [['GPT Powered by OpenAI', 'gpt', 'ai', C.ai, true], ['Conversation AI', 'generic', 'bot', C.ai]],
    Appointments: [['Update Appointment Status', 'appt_status', 'calendar', C.appt], ['Generate One Time Booking Link', 'generic', 'link', C.appt]],
    Opportunities: [['Create/Update Opportunity', 'opportunity', 'pipeline', C.opp], ['Remove Opportunity', 'generic', 'pipeline', C.opp]],
    Payments: [['Stripe One Time Charge', 'generic', 'card', C.mkt]],
    Marketing: [['Add to Google Analytics', 'generic', 'chart', C.mkt], ['Add to Google Adwords', 'generic', 'google', C.mkt], ['Facebook - Add To Custom Audience', 'generic', 'facebook', C.mkt]],
  };
  const ACTION_BY_NAME = {};
  Object.values(ACTIONS).flat().forEach(([n, t, i, c, p]) => (ACTION_BY_NAME[n] = { label: n, type: t, icon: i, color: c, premium: !!p }));
  const meta = (s) => ACTION_BY_NAME[s.kind] || { label: s.kind, type: 'generic', icon: 'zap', color: C.tool };

  const CUSTOM_VALUES = [
    ['First Name', '{{contact.first_name}}'], ['Full Name', '{{contact.name}}'], ['Phone', '{{contact.phone}}'], ['Email', '{{contact.email}}'],
    ['Appointment Start Time', '{{appointment.start_time}}'], ['Appointment Title', '{{appointment.title}}'], ['Assigned User Name', '{{user.name}}'],
    ['Business Name', '{{location.name}}'], ['Business Phone', '{{location.phone}}'], ['Booking Link', '{{custom_values.booking_link}}'],
  ];

  // ---------------------------------------------------------------- workflows
  let seq = 0;
  const step = (kind, name, cfg = {}, branches) => ({ id: cfg.id || 's' + ++seq, kind, name: name || kind, cfg, ...(branches ? { branches } : {}) });
  const trig = (type, filters = [], name) => ({ type, name: name || type, filters: filters.map(([field, value]) => ({ field, value })) });
  const sms = (name, message) => step('Send SMS', name, { message });
  const mail = (name, subject, message = '') => step('Send Email', name, { subject, message });
  const wait = (amount, unit, name) => step('Wait', name || `Wait ${amount} ${amount === 1 ? unit.replace(/s$/, '') : unit.toLowerCase()}`, { type: 'Time Delay', amount, unit });
  const waitAppt = (amount, unit, name) => step('Wait', name, { type: 'Event/Appointment Time', when: 'Before', amount, unit });

  const BOOK = 'Book here: {{custom_values.booking_link}}';
  const BUILT = {
    w1: () => ({ triggers: [trig('Form Submitted', [['Form', 'Invisalign Enquiry']]), trig('Facebook Lead Form Submitted', [['Page', 'Bloom Dental Studio']])],
      steps: [
        step('Create/Update Opportunity', 'Create Opportunity', { pipeline: 'Patient Journey', stage: 'New Enquiry', status: 'Open' }),
        sms('Instant SMS reply', 'Hi {{contact.first_name}}, thanks for your Invisalign enquiry! Your free 3D scan is waiting. ' + BOOK + ' — Bloom Dental'),
        step('Send Internal Notification', 'Notify assigned user', { ntype: 'In-App Notification', who: 'Assigned User', message: 'New Invisalign lead: {{contact.name}}' }),
        wait(1, 'Days', 'Wait 1 day'),
        step('If/Else', 'Booked a consultation?', {}, [
          { name: 'Booked', cond: { field: 'Contact Tag', op: 'includes', value: 'consultation booked' }, steps: [step('Create/Update Opportunity', 'Move to Consultation Booked', { pipeline: 'Patient Journey', stage: 'Consultation Booked', status: 'Open' })] },
          { name: 'None', steps: [mail('Still thinking about Invisalign?', 'Still thinking about Invisalign, {{contact.first_name}}?'), wait(2, 'Days', 'Wait 2 days'), sms('Last-chance SMS', 'Hi {{contact.first_name}}, just checking in. Free Invisalign scans are filling up this month. ' + BOOK)] },
        ]),
      ] }),
    w2: () => ({ triggers: [trig('Customer Booked Appointment', [['In calendar', 'New Patient Consultation']]), trig('Customer Booked Appointment', [['In calendar', 'Check-up & Clean']])],
      steps: [
        sms('Confirmation SMS', 'Hi {{contact.first_name}}, you are booked in at Bloom Dental for {{appointment.start_time}}. Reply C to confirm.'),
        mail('Confirmation email', 'Your appointment at Bloom Dental is confirmed'),
        waitAppt(1, 'Days', 'Wait until 1 day before'),
        sms('Reminder: tomorrow', 'Reminder: your Bloom Dental appointment is tomorrow at {{appointment.start_time}}. See you soon!'),
        waitAppt(2, 'Hours', 'Wait until 2 hours before'),
        sms('Reminder: 2 hours', 'See you in 2 hours, {{contact.first_name}}! 14 Marylebone High Street.'),
      ] }),
    w3: () => ({ triggers: [trig('Appointment Status', [['Appointment status', 'No Show']])],
      steps: [
        step('Add Contact Tag', 'Tag no-show', { tags: ['no-show'] }),
        wait(30, 'Minutes', 'Wait 30 minutes'),
        sms('We missed you SMS', 'Hi {{contact.first_name}}, we missed you today! No problem, life happens. Pick a new time here: {{custom_values.booking_link}}'),
        wait(1, 'Days', 'Wait 1 day'),
        step('Add Task', 'Call to rebook', { title: 'Call {{contact.name}} to rebook', assign: 'Priya Shah', due: 1 }),
      ] }),
    w4: () => ({ triggers: [trig('Appointment Status', [['Appointment status', 'Showed']])],
      steps: [wait(2, 'Hours', 'Wait 2 hours'), step('Send Review Request', 'Send Review Request'), step('Add Contact Tag', 'Tag review requested', { tags: ['review requested'] })] }),
    w5: () => ({ triggers: [trig('Call Status', [['Call status', 'No Answer'], ['Direction', 'Inbound']])],
      steps: [sms('Missed call text-back', "Hi, sorry we missed your call at Bloom Dental! How can we help? You can reply right here."),
        step('Send Internal Notification', 'Notify front desk', { ntype: 'In-App Notification', who: 'All Users', message: 'Missed call from {{contact.phone}}' })] }),
    w6: () => ({ triggers: [trig('Contact Tag', [['Tag Added', 'reactivation']])],
      steps: [sms('Recall SMS', "Hi {{contact.first_name}}, it's been a while! You're due your 6-month check-up. Want us to find you a time?")] }),
    w7: () => ({ triggers: [trig('Birthday Reminder')],
      steps: [sms('Birthday SMS', 'Happy birthday {{contact.first_name}}! 🎂 Enjoy 20% off whitening this month, from all of us at Bloom.')] }),
    w8: () => ({ triggers: [trig('Opportunity Status Changed', [['Status', 'Won'], ['In pipeline', 'Patient Journey']])],
      steps: [step('Add Contact Tag', 'Tag patient', { tags: ['patient'] }), mail('Welcome to Bloom', 'Welcome to Bloom Dental, {{contact.first_name}}!')] }),
    w9: () => ({ triggers: [trig('Inbound Webhook', [], 'Inbound Webhook — website leads')],
      steps: [step('Create Contact', 'Create contact from webhook'), step('Google Sheets', 'Add row to Leads sheet', { gaction: 'Create Spreadsheet Row', sheet: 'Bloom Leads 2026', tab: 'Leads' })] }),
  };
  const ACTIVE = { w1: 18, w2: 41, w3: 4, w4: 9, w5: 2, w6: 0, w7: 3, w8: 0, w9: 0 };
  const EXTRA = [
    { id: 'w7', name: 'Birthday Offer', status: 'published', enrolled: 64, trigger: 'Birthday Reminder', updated: '2 months ago', folder: '' },
    { id: 'w8', name: 'Opportunity Won — Welcome', status: 'published', enrolled: 57, trigger: 'Opportunity Status Changed', updated: '3 weeks ago', folder: '' },
    { id: 'w9', name: 'Website Leads → Google Sheet', status: 'draft', enrolled: 0, trigger: 'Inbound Webhook', updated: 'Yesterday', folder: '' },
  ];
  const CREATED = { w1: '4 Mar 2026', w2: '4 Mar 2026', w3: '11 Mar 2026', w4: '20 Mar 2026', w5: '2 Apr 2026', w6: '21 Oct 2026', w7: '6 May 2026', w8: '12 Jun 2026', w9: '20 Oct 2026' };
  const WF = [...data.workflows, ...EXTRA].map((w) => ({ ...w, active: ACTIVE[w.id] ?? 0, created: CREATED[w.id] || 'Today', ...(BUILT[w.id] ? BUILT[w.id]() : { triggers: [], steps: [] }) }));
  // Number steps in display order (s1, s2, …) so lessons can target #wf_node_s3 etc.
  const renumber = (w) => { let i = 0; const walk = (steps) => steps.forEach((s) => { s.id = 's' + ++i; (s.branches || []).forEach((b) => walk(b.steps)); }); walk(w.steps); };
  WF.forEach(renumber);
  KY.data.automation = WF;
  const byId = (id) => WF.find((w) => w.id === id);
  let newCount = 0;
  let nodeCount = 0;

  // Contacts used in histories and logs.
  const ENROLL = {
    w1: [['c1', '21 Oct 2026, 10:02', 'Active', 'Wait 1 day', 'Form Submitted'], ['c5', '16 Oct 2026, 14:21', 'Finished', 'Move to Consultation Booked', 'Form Submitted'],
      ['c8', '13 Oct 2026, 18:40', 'Finished', 'Last-chance SMS', 'Form Submitted'], ['c9', '12 Oct 2026, 09:12', 'Finished', 'Move to Consultation Booked', 'Facebook Lead Form Submitted'],
      ['c15', '22 Sep 2026, 20:05', 'Finished', 'Move to Consultation Booked', 'Facebook Lead Form Submitted'], ['c10', '10 Oct 2026, 11:48', 'Finished', 'Last-chance SMS', 'Form Submitted']],
  };
  const LOGS = {
    w1: [
      ['c1', 'Wait 1 day', 'Waiting', '21 Oct 2026, 10:02', 'Waiting until 22 Oct 2026, 10:02, then continues to "Booked a consultation?".'],
      ['c1', 'Notify assigned user', 'Executed', '21 Oct 2026, 10:02', 'In-app notification sent to Sarah Mitchell.'],
      ['c1', 'Instant SMS reply', 'Executed', '21 Oct 2026, 10:02', 'SMS delivered to +44 7700 900101.'],
      ['c1', 'Create Opportunity', 'Executed', '21 Oct 2026, 10:02', 'Opportunity "Olivia Bennett" created in Patient Journey → New Enquiry.'],
      ['c1', 'Form Submitted', 'Executed', '21 Oct 2026, 10:02', 'Trigger fired: form "Invisalign Enquiry" submitted. Contact enrolled.'],
      ['c8', 'Last-chance SMS', 'Skipped', '16 Oct 2026, 18:41', 'Skipped: the contact has Do Not Disturb turned on for SMS.'],
      ['c8', 'Wait 2 days', 'Executed', '14 Oct 2026, 18:41', 'Waited 2 days.'],
      ['c8', 'Still thinking about Invisalign?', 'Executed', '14 Oct 2026, 18:41', 'Email delivered to mason.evans@mail.com.'],
      ['c8', 'Booked a consultation?', 'Executed', '14 Oct 2026, 18:40', 'No condition matched → went down the "None" branch.'],
      ['c8', 'Wait 1 day', 'Executed', '13 Oct 2026, 18:40', 'Waited 1 day.'],
      ['c8', 'Notify assigned user', 'Executed', '13 Oct 2026, 18:40', 'In-app notification sent to James Okafor.'],
      ['c8', 'Instant SMS reply', 'Skipped', '13 Oct 2026, 18:40', 'Skipped: the contact has Do Not Disturb turned on for SMS.'],
      ['c8', 'Create Opportunity', 'Executed', '13 Oct 2026, 18:40', 'Opportunity "Mason Evans" created in Patient Journey → New Enquiry.'],
      ['c10', 'Still thinking about Invisalign?', 'Failed', '11 Oct 2026, 11:49', 'Failed: email bounced (mailbox full). Check the address or try SMS instead.'],
      ['c10', 'Instant SMS reply', 'Executed', '10 Oct 2026, 11:48', 'SMS delivered to +44 7700 900110.'],
      ['c5', 'Move to Consultation Booked', 'Executed', '17 Oct 2026, 14:22', 'Opportunity moved to Patient Journey → Consultation Booked.'],
      ['c5', 'Booked a consultation?', 'Executed', '17 Oct 2026, 14:22', 'Condition met: tag includes "consultation booked" → went down the "Booked" branch.'],
      ['c5', 'Instant SMS reply', 'Executed', '16 Oct 2026, 14:21', 'SMS delivered to +44 7700 900105.'],
    ],
  };
  function enrollFor(w) {
    if (ENROLL[w.id]) return ENROLL[w.id];
    if (!w.enrolled) return [];
    const last = (w.steps[w.steps.length - 1] || {}).name || '—';
    return ['c2', 'c4', 'c7', 'c13', 'c6'].map((c, i) => [c, `${20 - i * 2} Oct 2026, 1${i}:15`, i < 1 && w.active ? 'Active' : 'Finished', i < 1 && w.active ? (w.steps[1] || w.steps[0] || {}).name : last, w.triggers[0]?.type || w.trigger]);
  }
  function logsFor(w) {
    if (!w.logs) w.logs = LOGS[w.id] ? LOGS[w.id].slice() : enrollFor(w).flatMap(([c, at]) => w.steps.slice(0, 3).map((s) => [c, s.name, 'Executed', at, `${s.name} completed.`]));
    return w.logs;
  }

  // ---------------------------------------------------------------- helpers
  const dd = (id, value, extra = '') => `<button type="button" class="wf-dd" id="${id}" data-value="${esc(value)}" ${extra}><span>${esc(value)}</span>${icon('chevron', 16)}</button>`;
  function menu(anchor, items) {
    const m = KY.menu(anchor, items);
    m.classList.add('wf-menu');
    const r = anchor.getBoundingClientRect();
    const h = m.getBoundingClientRect().height;
    if (r.bottom + 6 + h > innerHeight - 10) m.style.top = Math.max(10, r.top - h - 6) + 'px';
    m.style.minWidth = Math.max(200, r.width) + 'px';
    return m;
  }
  function wireDD(root, id, options, onPick) {
    const b = $('#' + id, root);
    if (!b) return;
    b.onclick = (e) => {
      e.stopPropagation();
      menu(b, (typeof options === 'function' ? options() : options).map((o) => ({ label: o, onClick: () => {
        b.dataset.value = o; b.querySelector('span').textContent = o; onPick && onPick(o);
      } })));
    };
  }
  const val = (root, id) => { const el = $('#' + id, root); return el ? (el.dataset.value ?? el.value) : undefined; };
  const premiumChip = `<span class="chip amber wf-prem">${icon('crown', 13)} Premium</span>`;
  const statusChip = (s) => s === 'published' ? '<span class="chip green">Published</span>' : '<span class="chip">Draft</span>';

  function css() {
    if ($('#css-automation')) return;
    const s = document.createElement('style');
    s.id = 'css-automation';
    s.textContent = `
      .wf-menu { max-height: 56vh; overflow: auto; z-index: 70; }
      .wf-dd { display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; height: 42px; border: 1px solid var(--line); border-radius: 8px; background: #fff; padding: 0 12px; text-align: left; }
      .wf-dd span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .wf-dd:hover { border-color: #84adff; }
      .wf-prem { height: 22px; font-size: 12px; padding: 0 8px; }
      .wf-folder td:first-child + td { font-weight: 600; }
      .wf-name { display: flex; align-items: center; gap: 10px; font-weight: 600; }
      .wf-name .ic { width: 34px; height: 34px; border-radius: 8px; display: grid; place-items: center; background: var(--blue-soft); color: var(--blue); flex: none; }
      .wf-name .ic.fold { background: #fef0c7; color: #b54708; }
      /* builder */
      .wf-wrap { display: flex; flex-direction: column; height: 100%; }
      .wf-head { height: 64px; flex: none; background: #fff; border-bottom: 1px solid var(--line-soft); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0 18px; gap: 16px; }
      .wf-head .l { display: flex; align-items: center; gap: 10px; min-width: 0; }
      .wf-head .r { display: flex; align-items: center; gap: 10px; justify-content: flex-end; }
      .wf-title { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 700; cursor: text; padding: 6px 10px; border-radius: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 470px; }
      .wf-title:hover { background: #f2f4f7; }
      .wf-title svg { color: var(--faint); }
      #wf_name_input { height: 40px; font-size: 17px; font-weight: 600; width: 420px; }
      .wf-tabs { display: flex; gap: 4px; align-self: stretch; }
      .wf-tabs a { display: flex; align-items: center; padding: 0 16px; color: var(--ink-2); font-weight: 500; font-size: 15.5px; border-bottom: 2px solid transparent; cursor: pointer; white-space: nowrap; }
      .wf-tabs a.active { color: var(--blue); border-bottom-color: var(--blue); font-weight: 600; }
      .wf-pub { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 15px; color: var(--muted); padding: 0 6px; }
      .wf-pub .on { color: var(--ink); }
      .wf-canvas { flex: 1; overflow: auto; position: relative; background-color: #f5f6f8; background-image: radial-gradient(#d0d5dd 1px, transparent 1px); background-size: 22px 22px; }
      .wf-flow { display: flex; flex-direction: column; align-items: center; padding: 36px 40px 120px; min-width: max-content; margin: 0 auto; }
      .wf-triggers { display: flex; justify-content: center; position: relative; }
      .wf-tcol { display: flex; flex-direction: column; align-items: center; padding: 0 12px; position: relative; }
      .wf-tcol .stem { width: 2px; flex: 1; min-height: 26px; background: #98a2b3; }
      .wf-triggers.multi .wf-tcol::after { content: ''; position: absolute; bottom: 0; height: 2px; background: #98a2b3; left: 0; right: 0; }
      .wf-triggers.multi .wf-tcol:first-child::after { left: 50%; } .wf-triggers.multi .wf-tcol:last-child::after { right: 50%; }
      .wf-trigger { width: 300px; background: #fff; border: 1px solid var(--line); border-radius: 12px; box-shadow: var(--shadow); padding: 12px 14px; cursor: pointer; display: flex; gap: 12px; align-items: center; }
      .wf-trigger:hover, .wf-node:hover { border-color: #84adff; box-shadow: 0 0 0 3px #e0eaff; }
      .wf-trigger .ic { width: 38px; height: 38px; border-radius: 9px; display: grid; place-items: center; background: #ecfdf3; color: #039855; flex: none; }
      .wf-trigger .k { font-size: 12px; font-weight: 700; color: #039855; text-transform: uppercase; letter-spacing: .04em; }
      .wf-trigger .n { font-weight: 600; line-height: 1.25; }
      .wf-trigger .f { font-size: 13.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; }
      .wf-addtrig { width: 260px; border: 2px dashed #84adff; background: #f5f8ff; color: var(--blue); border-radius: 12px; padding: 18px 14px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; }
      .wf-addtrig:hover { background: #eff4ff; }
      .wf-conn { display: flex; flex-direction: column; align-items: center; }
      .wf-conn .ln { width: 2px; height: 18px; background: #98a2b3; }
      .wf-plus { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #98a2b3; background: #fff; color: #475467; display: grid; place-items: center; padding: 0; }
      .wf-plus:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-soft); }
      .wf-node { width: 320px; background: #fff; border: 1px solid var(--line); border-radius: 12px; box-shadow: var(--shadow); padding: 12px 14px; display: flex; gap: 12px; align-items: center; cursor: pointer; position: relative; }
      .wf-node .ic { width: 38px; height: 38px; border-radius: 9px; display: grid; place-items: center; color: #fff; flex: none; }
      .wf-node .n { font-weight: 600; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 236px; }
      .wf-node .s { font-size: 13.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 236px; }
      .wf-node.flash { animation: wfflash 1.4s; }
      @keyframes wfflash { 0%, 60% { box-shadow: 0 0 0 4px #b2ccff; border-color: var(--blue); } }
      .wf-end { background: #e4e7ec; color: #475467; font-weight: 700; font-size: 12px; letter-spacing: .06em; border-radius: 999px; padding: 4px 14px; }
      .wf-branches { display: flex; justify-content: center; }
      .wf-branch { display: flex; flex-direction: column; align-items: center; padding: 0 20px; position: relative; }
      .wf-branch::before { content: ''; position: absolute; top: 0; height: 2px; background: #98a2b3; left: 0; right: 0; }
      .wf-branch:first-child::before { left: 50%; } .wf-branch:last-child::before { right: 50%; }
      .wf-branch > .ln0 { width: 2px; height: 22px; background: #98a2b3; }
      .wf-bpill { background: #f4f3ff; color: #5925dc; border: 1px solid #d9d6fe; font-weight: 600; font-size: 14px; border-radius: 999px; padding: 4px 14px; max-width: 260px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .wf-bpill.none { background: #f2f4f7; color: #475467; border-color: var(--line); }
      .wf-zoombar { position: absolute; left: 18px; bottom: 18px; display: flex; flex-direction: column; background: #fff; border: 1px solid var(--line); border-radius: 10px; box-shadow: var(--shadow); overflow: hidden; z-index: 2; }
      .wf-zoombar button { width: 42px; height: 40px; border: 0; background: #fff; color: var(--ink-2); display: grid; place-items: center; }
      .wf-zoombar button + button { border-top: 1px solid var(--line-soft); }
      .wf-zoombar span { font-size: 12px; font-weight: 600; text-align: center; padding: 4px 0; border-top: 1px solid var(--line-soft); color: var(--muted); }
      /* drawers */
      .drawer.wf-drawer { width: 580px; }
      .wf-drawer .sub { color: var(--muted); font-size: 14.5px; margin: -4px 0 16px; }
      .wf-cat { font-size: 12.5px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; margin: 18px 0 8px; }
      .wf-cat:first-child { margin-top: 4px; }
      .wf-pick { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .wf-pick button { display: flex; align-items: center; gap: 10px; text-align: left; border: 1px solid var(--line-soft); border-radius: 8px; background: #fff; padding: 9px 10px; font-size: 14.5px; font-weight: 500; color: var(--ink-2); min-height: 46px; }
      .wf-pick button:hover { border-color: #84adff; background: #f5f8ff; }
      .wf-pick .ic { width: 28px; height: 28px; border-radius: 7px; display: grid; place-items: center; color: #fff; flex: none; }
      .wf-pick .ic.t { background: #ecfdf3; color: #039855; }
      .wf-pick .wf-prem { margin-left: auto; }
      .wf-frow { display: grid; grid-template-columns: 1fr 74px 1fr 36px; gap: 8px; align-items: center; margin-bottom: 8px; }
      .wf-frow .is { text-align: center; color: var(--muted); font-size: 14px; }
      .wf-box { border: 1px solid var(--line-soft); border-radius: 10px; padding: 14px; background: #f9fafb; margin-bottom: 14px; }
      .wf-tool { display: flex; gap: 6px; padding: 6px; border: 1px solid var(--line); border-bottom: 0; border-radius: 8px 8px 0 0; background: #f9fafb; }
      .wf-tool + textarea.input { border-radius: 0 0 8px 8px; }
      .wf-hint { font-size: 13.5px; color: var(--muted); margin-top: -8px; margin-bottom: 14px; }
      .wf-url { display: flex; gap: 8px; }
      .wf-url .input { font-family: ui-monospace, Menlo, monospace; font-size: 13.5px; background: #f9fafb; }
      .wf-settings { max-width: 980px; margin: 0 auto; padding: 24px; display: grid; gap: 18px; }
      .wf-setrow { display: flex; align-items: flex-start; gap: 14px; padding: 14px 0; border-top: 1px solid var(--line-soft); }
      .wf-setrow:first-child { border-top: 0; padding-top: 0; }
      .wf-setrow .t { font-weight: 600; } .wf-setrow .d { color: var(--muted); font-size: 14px; }
      .wf-days { display: flex; gap: 6px; } .wf-days span { width: 44px; height: 34px; border-radius: 8px; display: grid; place-items: center; font-size: 13px; font-weight: 600; border: 1px solid var(--line); }
      .wf-days span.on { background: var(--blue-soft); border-color: #84adff; color: var(--blue); }
      .wf-panel { padding: 22px 24px; overflow: auto; flex: 1; }
      .wf-recipes { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .wf-recipe { border: 1px solid var(--line); border-radius: 10px; padding: 14px; cursor: pointer; background: #fff; }
      .wf-recipe:hover { border-color: #84adff; background: #f5f8ff; }
      .wf-recipe .t { font-weight: 600; } .wf-recipe .d { color: var(--muted); font-size: 13.5px; margin-top: 4px; }
      .wf-scratch { border: 2px dashed #84adff; background: #f5f8ff; border-radius: 12px; padding: 26px 18px; text-align: center; cursor: pointer; color: var(--blue); }
      .wf-scratch:hover { background: #eff4ff; }
      .wf-test-res .row { padding: 9px 0; border-top: 1px solid var(--line-soft); }
    `;
    document.head.appendChild(s);
  }

  // ---------------------------------------------------------------- list view
  const ui = { folder: '', q: '' };
  const FOLDERS = ['Appointments', 'Lead Nurture', 'Reactivation', 'Reputation'];

  function listView(view) {
    const q = ui.q.toLowerCase();
    const folders = ui.folder || q ? [] : FOLDERS;
    const rows = WF.filter((w) => (q ? w.name.toLowerCase().includes(q) : (w.folder || '') === ui.folder));
    view.innerHTML = `
      <div class="page-head"><h1>Workflows</h1>
        <div class="actions">
          <button class="btn" id="wf_create_folder">${icon('folder', 18)} Create Folder</button>
          <button class="btn primary" id="wf_create">${icon('plus', 18)} Create Workflow</button>
        </div></div>
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)">
          <div class="row" style="gap:6px;font-weight:600" id="wf_breadcrumb">
            <a id="wf_home" style="cursor:pointer;${ui.folder ? '' : 'color:var(--ink)'}">Home</a>
            ${ui.folder ? `${icon('right', 16)}<span>${esc(ui.folder)}</span>` : ''}</div>
          <span class="spacer"></span>
          <div class="search" style="width:320px"><span>${icon('search', 18)}</span><input class="input" id="wf_search" placeholder="Search workflows" value="${esc(ui.q)}"></div>
        </div>
        <table class="t" id="wf_table">
          <thead><tr><th style="width:44px"><input type="checkbox"></th><th>Name</th><th>Status</th><th>Total enrolled</th><th>Active enrolled</th><th>Last updated</th><th>Created on</th><th style="width:56px"></th></tr></thead>
          <tbody>
            ${folders.map((f) => `<tr class="click wf-folder" data-folder="${esc(f)}" id="wf_folder_${slug(f)}">
              <td><input type="checkbox"></td><td><div class="wf-name"><span class="ic fold">${icon('folder', 18)}</span>${esc(f)}</div></td>
              <td class="muted">${((n) => `${n} workflow${n === 1 ? '' : 's'}`)(WF.filter((w) => w.folder === f).length)}</td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}
            ${rows.map((w) => `<tr class="click" data-wf="${w.id}" id="wf_row_${w.id}">
              <td><input type="checkbox"></td>
              <td><div class="wf-name"><span class="ic">${icon('automation', 18)}</span>${esc(w.name)}</div></td>
              <td>${statusChip(w.status)}</td><td>${w.enrolled.toLocaleString('en-GB')}</td><td>${w.active}</td>
              <td class="muted">${esc(w.updated)}</td><td class="muted">${esc(w.created)}</td>
              <td><button class="btn ghost icon sm" data-more="${w.id}">${icon('more', 18)}</button></td></tr>`).join('')}
          </tbody>
        </table>
        ${!folders.length && !rows.length ? `<div class="empty"><div class="big">No workflows found</div>Try another search.</div>` : ''}
      </div>`;
    const s = $('#wf_search');
    s.oninput = () => { ui.q = s.value; const p = s.selectionStart; listView(view); const n = $('#wf_search'); n.focus(); n.setSelectionRange(p, p); };
    $('#wf_home').onclick = () => { ui.folder = ''; ui.q = ''; listView(view); };
    $$('[data-folder]', view).forEach((r) => (r.onclick = (e) => { if (e.target.matches('input')) return; ui.folder = r.dataset.folder; listView(view); }));
    $$('[data-wf]', view).forEach((r) => (r.onclick = (e) => { if (e.target.closest('input,[data-more]')) return; KY.go(`#/automation/workflows/${r.dataset.wf}`); }));
    $$('[data-more]', view).forEach((b) => (b.onclick = () => {
      const w = byId(b.dataset.more);
      menu(b, [{ label: 'Edit', icon: 'edit', onClick: () => KY.go(`#/automation/workflows/${w.id}`) },
        { label: 'Clone', icon: 'copy', onClick: () => { const c = { ...structuredClone(w), id: 'w' + (100 + ++newCount), name: w.name + ' (copy)', status: 'draft', enrolled: 0, active: 0, updated: 'Just now', created: '21 Oct 2026', logs: [] }; WF.push(c); listView(view); KY.toast('Workflow cloned'); } },
        { label: 'Move to folder', icon: 'folder' }, { label: 'Delete', icon: 'trash' }]);
    }));
    $('#wf_create_folder').onclick = () => KY.modal({ title: 'Create folder', body: `<div class="field"><label>Folder name</label><input class="input" id="wf_folder_name" placeholder="e.g. Pipeline"></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Create', primary: true, id: 'wf_folder_save', onClick: (close, box) => {
        const n = $('#wf_folder_name', box).value.trim() || 'New Folder'; if (!FOLDERS.includes(n)) FOLDERS.push(n); FOLDERS.sort(); close(); listView(view); KY.toast(`Folder "${n}" created`);
      } }] });
    $('#wf_create').onclick = () => createModal();
  }

  // ---------------------------------------------------------------- recipes
  const RECIPES = [
    { name: 'Appointment Confirmation + Reminder', desc: 'Confirm every booking, then remind them the day before and on the day.', build: () => BUILT.w2() },
    { name: 'Fast Five', desc: 'Contact new leads within five minutes: notify your team, call, then text and email.', build: () => ({ triggers: [trig('Facebook Lead Form Submitted')],
      steps: [step('Send Internal Notification', 'Notify team: new lead', { ntype: 'In-App Notification', who: 'Assigned User' }), step('Call', 'Call the lead'), wait(5, 'Minutes', 'Wait 5 minutes'),
        sms('Intro SMS', 'Hi {{contact.first_name}}, thanks for reaching out to Bloom Dental! When is a good time to chat?'), mail('Intro email', 'Thanks for your enquiry, {{contact.first_name}}')] }) },
    { name: 'Review Request', desc: 'Ask for a Google review a couple of hours after a visit.', build: () => BUILT.w4() },
    { name: 'No Show Nurture', desc: 'Win back missed appointments with a friendly SMS and a rebooking link.', build: () => BUILT.w3() },
    { name: 'Missed Call Text Back', desc: 'Text callers back automatically when you miss their call.', build: () => BUILT.w5() },
    { name: 'Birthday Template', desc: 'Send a birthday message with a little gift.', build: () => BUILT.w7() },
    { name: 'Customer Reactivation', desc: 'Re-engage past customers with a short SMS and email sequence.', build: () => ({ triggers: [trig('Contact Tag', [['Tag Added', 'reactivation']])],
      steps: [sms('Reactivation SMS 1', "Hi {{contact.first_name}}, it's been a while! Fancy a check-up this month?"), wait(2, 'Days', 'Wait 2 days'), mail('Reactivation email', 'We miss you at Bloom Dental'), wait(3, 'Days', 'Wait 3 days'), sms('Reactivation SMS 2', 'Last call, {{contact.first_name}}: reply YES and we will find you a time.')] }) },
  ];

  function newWorkflow(name, flow) {
    const id = 'w' + (10 + ++newCount);
    WF.push({ id, name, status: 'draft', enrolled: 0, active: 0, trigger: '', updated: 'Just now', created: '21 Oct 2026', folder: ui.folder, triggers: [], steps: [], ...(flow || {}), logs: [] });
    renumber(WF[WF.length - 1]);
    return id;
  }

  function createModal() {
    const box = KY.modal({ title: 'Create Workflow', wide: true, body: `<div id="wf_create_body"></div>` });
    box.classList.add('wf-create');
    const body = $('#wf_create_body', box);
    const close = () => box.closest('.overlay').remove();
    const home = () => {
      body.innerHTML = `
        <div class="wf-scratch" id="wf_scratch">${icon('plus', 30)}<div class="bold" style="font-size:17px;margin-top:6px">Start from Scratch</div>
          <div class="muted" style="font-size:14px">Open a blank workflow and add your own trigger and actions.</div></div>
        <div class="row" style="margin:20px 0 10px"><b style="font-size:17px">Recipes</b><span class="muted" style="font-size:14px">Ready-made workflows you can customise</span></div>
        <div class="wf-recipes">${RECIPES.map((r) => `<div class="wf-recipe" id="wfr_${slug(r.name)}" data-recipe="${esc(r.name)}"><div class="t">${esc(r.name)}</div><div class="d">${esc(r.desc)}</div></div>`).join('')}</div>`;
      $('#wf_scratch', body).onclick = () => { close(); KY.go(`#/automation/workflows/${newWorkflow(`New Workflow : ${1761041925 + newCount}`)}`); };
      $$('[data-recipe]', body).forEach((c) => (c.onclick = () => preview(RECIPES.find((r) => r.name === c.dataset.recipe))));
    };
    const preview = (r) => {
      const flow = r.build();
      body.innerHTML = `<button class="btn ghost sm" id="wfr_back">${icon('left', 16)} All recipes</button>
        <h3 style="margin:12px 0 4px">${esc(r.name)}</h3><p class="muted" style="margin:0 0 14px">${esc(r.desc)}</p>
        <div class="wf-box"><div class="wf-cat" style="margin-top:0">Trigger</div>${flow.triggers.map((t) => `<div class="row" style="margin:6px 0">${icon('zap', 18)}<b>${esc(t.type)}</b><span class="muted">${esc(t.filters.map((f) => `${f.field} is ${f.value}`).join(', '))}</span></div>`).join('')}
          <div class="wf-cat">Actions</div>${flow.steps.map((s, i) => `<div class="row" style="margin:6px 0"><span class="muted" style="width:20px">${i + 1}.</span><span style="color:${meta(s).color}">${icon(meta(s).icon, 18)}</span>${esc(s.name)}</div>`).join('')}</div>
        <div class="row"><span class="spacer"></span><button class="btn primary" id="wfr_use">Use this recipe</button></div>`;
      $('#wfr_back', body).onclick = home;
      $('#wfr_use', body).onclick = () => { close(); KY.go(`#/automation/workflows/${newWorkflow(r.name, r.build())}`); KY.toast(`Recipe "${r.name}" added as a draft`); };
    };
    home();
  }

  // ---------------------------------------------------------------- builder
  let zoom = 1;
  let current = null;

  function summary(s) {
    const c = s.cfg || {};
    switch (meta(s).type) {
      case 'sms': case 'email': return s.kind;
      case 'wait': { const u = `${c.amount} ${(c.amount == 1 ? (c.unit || '').replace(/s$/, '') : c.unit || '').toLowerCase()}`; return c.type === 'Event/Appointment Time' ? `Appointment time · ${u} ${(c.when || 'Before').toLowerCase()}` : c.type === 'Time Delay' ? `Time delay · ${u}` : `Wait for ${(c.type || '').toLowerCase()}`; }
      case 'ifelse': return `If/Else · ${s.branches.length} branches`;
      case 'add_tag': case 'remove_tag': return `${s.kind}: ${(c.tags || []).join(', ')}`;
      case 'opportunity': return `${c.pipeline} → ${c.stage}`;
      case 'task': return `Add Task · ${c.assign || 'Assigned user'}`;
      case 'goal': return /Tag/.test(c.goal || '') ? `Goal: ${c.goal.toLowerCase()} "${c.goalTag}"` : `Goal: ${(c.goal || '').toLowerCase()}`;
      case 'goto': return `Go to: ${c.target || ''}`;
      case 'sheets': return `Google Sheets · ${c.gaction || ''}`;
      default: return s.kind;
    }
  }

  function trigCard(t, i) {
    return `<div class="wf-tcol"><div class="wf-trigger" id="wf_trigger_${i}" data-trig="${i}"><span class="ic">${icon('zap', 20)}</span>
      <div style="min-width:0"><div class="k">Trigger</div><div class="n">${esc(t.name)}</div>
      <div class="f">${t.filters.length ? esc(t.filters.map((f) => `${f.field} is ${f.value}`).join(' · ')) : (PREMIUM_TRIGGERS.includes(t.type) ? 'Premium trigger' : 'No filters')}</div></div></div><div class="stem"></div></div>`;
  }

  function plus(id, list, index) {
    return `<div class="wf-conn"><span class="ln"></span><button class="wf-plus" id="${id}" data-list="${list}" data-index="${index}" title="Add action">${icon('plus', 16)}</button><span class="ln"></span></div>`;
  }

  // Renders a list of steps. `key` locates the list: 'main' or '<stepId>.<branchIndex>'.
  function listHTML(steps, key, prefix) {
    let h = '';
    steps.forEach((s, i) => {
      h += plus(i === 0 && key === 'main' ? 'wf_plus_0' : `${prefix}${i}`, key, i);
      const m = meta(s);
      h += `<div class="wf-node" id="wf_node_${s.id}" data-step="${s.id}"><span class="ic" style="background:${m.color}">${icon(m.icon, 20)}</span>
        <div style="min-width:0"><div class="n">${esc(s.name)}</div><div class="s">${esc(summary(s))}</div></div>
        ${m.premium ? `<span style="margin-left:auto;color:#b54708" title="Premium action">${icon('crown', 16)}</span>` : ''}</div>`;
      if (s.branches) {
        h += `<div class="wf-conn"><span class="ln" style="height:22px"></span></div><div class="wf-branches">${s.branches.map((b, bi) => `
          <div class="wf-branch"><span class="ln0"></span><div class="wf-bpill ${b.name === 'None' ? 'none' : ''}" id="wf_branch_${s.id}_${bi}">${esc(b.name)}</div>
          ${listHTML(b.steps, `${s.id}.${bi}`, `wf_plus_${s.id}_${bi}_`)}</div>`).join('')}</div>`;
      }
    });
    if (!steps.some((s) => s.branches)) {
      h += plus(key === 'main' ? 'wf_plus_end' : `${prefix}end`, key, steps.length);
      h += `<div class="wf-conn"><span class="ln" style="height:14px"></span></div><div class="wf-end">END</div>`;
    }
    return h;
  }

  function findList(w, key) {
    if (key === 'main') return w.steps;
    const [sid, bi] = key.split('.');
    const s = findStep(w.steps, sid);
    return s.branches[+bi].steps;
  }
  function findStep(steps, id) {
    for (const s of steps) {
      if (s.id === id) return s;
      for (const b of s.branches || []) { const f = findStep(b.steps, id); if (f) return f; }
    }
    return null;
  }
  const allSteps = (steps) => steps.flatMap((s) => [s, ...(s.branches || []).flatMap((b) => allSteps(b.steps))]);

  function builder(view, w, sub) {
    current = w;
    view.style.padding = '0';
    const tabs = [['builder', 'Builder'], ['settings', 'Settings'], ['enrollment', 'Enrollment History'], ['logs', 'Execution Logs']];
    view.innerHTML = `<div class="wf-wrap">
      <div class="wf-head">
        <div class="l"><button class="btn ghost icon" id="wf_back" title="Back to Workflows">${icon('left', 20)}</button>
          <div class="wf-title" id="wf_name" title="Rename">${esc(w.name)} ${icon('edit', 16)}</div></div>
        <div class="wf-tabs">${tabs.map(([id, l]) => `<a id="wf_tab_${id}" data-sub="${id}" class="${sub === id ? 'active' : ''}">${l}</a>`).join('')}</div>
        <div class="r">
          <button class="btn" id="wf_test">${icon('play', 16)} Test Workflow</button>
          <div class="wf-pub"><span class="${w.status === 'published' ? '' : 'on'}" id="wf_draft_lbl">Draft</span><button class="toggle ${w.status === 'published' ? 'on' : ''}" id="wf_publish"></button><span class="${w.status === 'published' ? 'on' : ''}" id="wf_pub_lbl">Publish</span></div>
          <button class="btn primary" id="wf_save">Save</button>
        </div>
      </div>
      <div id="wf_body" style="flex:1;min-height:0;display:flex;flex-direction:column"></div></div>`;
    $('#wf_back').onclick = () => KY.go('#/automation/workflows');
    $('#wf_name').onclick = () => rename(w);
    $$('[data-sub]', view).forEach((a) => (a.onclick = () => { history.replaceState(null, '', `#/automation/workflows/${w.id}/${a.dataset.sub}`); builder(view, w, a.dataset.sub); }));
    let pending = w.status;
    $('#wf_publish').onclick = (e) => {
      e.currentTarget.classList.toggle('on');
      pending = e.currentTarget.classList.contains('on') ? 'published' : 'draft';
      $('#wf_draft_lbl').className = pending === 'draft' ? 'on' : '';
      $('#wf_pub_lbl').className = pending === 'published' ? 'on' : '';
    };
    $('#wf_save').onclick = () => {
      if (pending === 'published' && !w.triggers.length) { KY.toast('Add a trigger before publishing', 'warn'); return; }
      w.status = pending; w.updated = 'Just now';
      KY.toast(pending === 'published' ? 'Workflow saved and published' : 'Workflow saved as draft');
    };
    $('#wf_test').onclick = () => testModal(w);
    const body = $('#wf_body');
    if (sub === 'settings') return settingsTab(body, w);
    if (sub === 'enrollment') return enrollmentTab(body, w);
    if (sub === 'logs') return logsTab(body, w);
    canvas(body, w);
  }

  function rename(w) {
    const t = $('#wf_name');
    t.outerHTML = `<input class="input" id="wf_name_input" value="${esc(w.name)}">`;
    const inp = $('#wf_name_input');
    inp.focus(); inp.select();
    const done = () => { w.name = inp.value.trim() || w.name; inp.outerHTML = `<div class="wf-title" id="wf_name" title="Rename">${esc(w.name)} ${icon('edit', 16)}</div>`; $('#wf_name').onclick = () => rename(w); };
    inp.onkeydown = (e) => { if (e.key === 'Enter') inp.blur(); };
    inp.onblur = done;
  }

  function canvas(body, w, flash) {
    body.innerHTML = `<div class="wf-canvas" id="wf_canvas">
        <div class="wf-flow" id="wf_flow" style="zoom:${zoom}">
          <div class="wf-triggers ${w.triggers.length ? 'multi' : ''}">
            ${w.triggers.map(trigCard).join('')}
            <div class="wf-tcol"><div class="wf-addtrig" id="wf_add_trigger">${icon('plus', 18)} Add New Trigger</div><div class="stem"></div></div>
          </div>
          ${listHTML(w.steps, 'main', 'wf_plus_')}
        </div>
        <div class="wf-zoombar"><button id="wf_zoom_in" title="Zoom in">${icon('zoomIn', 18)}</button><button id="wf_zoom_out" title="Zoom out">${icon('zoomOut', 18)}</button><button id="wf_zoom_fit" title="Reset zoom">${icon('fit', 18)}</button><span id="wf_zoom_pct">${Math.round(zoom * 100)}%</span></div>
      </div>`;
    const setZoom = (z) => { zoom = Math.min(1.3, Math.max(0.5, Math.round(z * 10) / 10)); $('#wf_flow').style.zoom = zoom; $('#wf_zoom_pct').textContent = Math.round(zoom * 100) + '%'; };
    $('#wf_zoom_in').onclick = () => setZoom(zoom + 0.1);
    $('#wf_zoom_out').onclick = () => setZoom(zoom - 0.1);
    $('#wf_zoom_fit').onclick = () => setZoom(1);
    $('#wf_add_trigger').onclick = () => triggerDrawer(w);
    $$('[data-trig]', body).forEach((el) => (el.onclick = () => triggerDrawer(w, +el.dataset.trig)));
    $$('.wf-plus', body).forEach((b) => (b.onclick = () => actionDrawer(w, b.dataset.list, +b.dataset.index)));
    $$('[data-step]', body).forEach((el) => (el.onclick = () => { const s = findStep(w.steps, el.dataset.step); configDrawer(w, s.kind, { step: s }); }));
    if (flash) { const n = $(`#wf_node_${flash}`); if (n) { n.classList.add('flash'); n.scrollIntoView({ block: 'nearest' }); } }
  }
  const redraw = (w, flash) => { const b = $('#wf_body'); if (b && current === w) canvas(b, w, flash); };

  // ---- trigger drawer
  function triggerDrawer(w, index) {
    const box = KY.modal({ title: 'Workflow Trigger', drawer: true, body: `<div id="wft_body"></div>` });
    box.classList.add('wf-drawer');
    const body = $('#wft_body', box);
    const close = () => { box.remove(); $$('.overlay').forEach((o) => o.remove()); };
    const pick = () => {
      body.innerHTML = `<p class="sub">Adds contacts to this workflow when the trigger event happens.</p>
        <div class="search" style="margin-bottom:6px"><span>${icon('search', 18)}</span><input class="input" id="wft_search" placeholder="Search triggers"></div>
        <div id="wft_list"></div>`;
      const draw = () => {
        const q = $('#wft_search', body).value.toLowerCase();
        $('#wft_list', body).innerHTML = Object.entries(TRIGGERS).map(([cat, list]) => {
          const l = list.filter((t) => t.toLowerCase().includes(q));
          return l.length ? `<div class="wf-cat">${esc(cat)}</div><div class="wf-pick">${l.map((t) => `<button id="wft_${slug(t)}" data-t="${esc(t)}"><span class="ic t">${icon('zap', 16)}</span>${esc(t)}${PREMIUM_TRIGGERS.includes(t) ? premiumChip : ''}</button>`).join('')}</div>` : '';
        }).join('') || '<p class="muted">No triggers match.</p>';
        $$('[data-t]', body).forEach((b) => (b.onclick = () => config({ type: b.dataset.t, name: b.dataset.t, filters: [] })));
      };
      $('#wft_search', body).oninput = draw;
      draw();
    };
    const config = (t) => {
      const opts = FILTERS[t.type] || [];
      const premium = PREMIUM_TRIGGERS.includes(t.type);
      body.innerHTML = `
        <div class="field"><label>Choose a workflow trigger</label>${dd('wft_type', t.type)}</div>
        ${TRIGGER_DESC[t.type] ? `<p class="wf-hint">${esc(TRIGGER_DESC[t.type])}</p>` : ''}
        <div class="field"><label>Workflow trigger name</label><input class="input" id="wft_name" value="${esc(t.name)}"></div>
        ${t.type === 'Inbound Webhook' ? `<div class="wf-box">${premiumChip}<div class="field" style="margin-top:10px"><label>Webhook URL</label>
            <div class="wf-url"><input class="input" id="wft_url" readonly value="https://services.leadconnectorhq.com/hooks/bL00mD3nt/webhook-trigger/7f3c2a91"><button class="btn" id="wft_copy">${icon('copy', 16)} Copy</button></div></div>
            <p class="muted" style="margin:0;font-size:14px">Send a POST request with JSON data to this URL from your other app, then click <b>Fetch sample requests</b> so Kyntlo can map the fields.</p>
            <button class="btn sm" style="margin-top:12px" id="wft_fetch">${icon('download', 16)} Fetch sample requests</button><div id="wft_sample"></div></div>` : ''}
        ${opts.length ? `<div class="field"><label>Filters</label><div id="wft_filters"></div>
          <button class="btn sm" id="wft_add_filter" style="align-self:flex-start">${icon('plus', 16)} Add filters</button></div>` : (premium ? '' : '<p class="muted" style="font-size:14px">This trigger has no filters.</p>')}`;
      const fl = $('#wft_filters', body);
      const drawFilters = () => {
        if (!fl) return;
        fl.innerHTML = t.filters.map((f, i) => `<div class="wf-frow">${dd(`wft_filter_field${i ? '_' + i : ''}`, f.field)}<span class="is">is</span>${dd(`wft_filter_value${i ? '_' + i : ''}`, f.value || 'Select')}
          <button class="btn ghost icon sm" data-rm="${i}">${icon('trash', 16)}</button></div>`).join('');
        t.filters.forEach((f, i) => {
          const sfx = i ? '_' + i : '';
          wireDD(fl, `wft_filter_field${sfx}`, opts.map((o) => o[0]), (v) => { f.field = v; f.value = ''; drawFilters(); });
          wireDD(fl, `wft_filter_value${sfx}`, () => (opts.find((o) => o[0] === f.field) || opts[0])[1], (v) => { f.value = v; });
        });
        $$('[data-rm]', fl).forEach((b) => (b.onclick = () => { t.filters.splice(+b.dataset.rm, 1); drawFilters(); }));
      };
      drawFilters();
      if ($('#wft_add_filter', body)) $('#wft_add_filter', body).onclick = () => {
        const used = t.filters.map((f) => f.field);
        t.filters.push({ field: (opts.find((o) => !used.includes(o[0])) || opts[0])[0], value: '' });
        drawFilters();
      };
      wireDD(body, 'wft_type', Object.values(TRIGGERS).flat(), (v) => config({ type: v, name: v, filters: [] }));
      if ($('#wft_copy', body)) $('#wft_copy', body).onclick = () => KY.toast('Webhook URL copied');
      if ($('#wft_fetch', body)) $('#wft_fetch', body).onclick = () => {
        $('#wft_sample', body).innerHTML = `<pre style="background:#101828;color:#e4e7ec;border-radius:8px;padding:12px;font-size:13px;margin:12px 0 0;white-space:pre-wrap">{ "first_name": "Olivia", "email": "olivia.bennett@mail.com", "phone": "+44 7700 900101", "treatment": "Invisalign" }</pre>`;
        KY.toast('Sample request received');
      };
      foot.innerHTML = `${index !== undefined ? `<button class="btn" id="wft_delete" style="color:var(--red);margin-right:auto">${icon('trash', 16)} Delete</button>` : ''}<button class="btn" id="wft_cancel">Cancel</button><button class="btn primary" id="wft_save">Save Trigger</button>`;
      $('#wft_cancel', box).onclick = close;
      if ($('#wft_delete', box)) $('#wft_delete', box).onclick = () => { w.triggers.splice(index, 1); close(); redraw(w); };
      $('#wft_save', box).onclick = () => {
        t.name = $('#wft_name', body).value || t.type;
        t.filters = t.filters.filter((f) => f.value);
        if (index !== undefined) w.triggers[index] = t; else w.triggers.push(t);
        close(); redraw(w);
      };
    };
    const foot = document.createElement('div');
    foot.className = 'modal-f';
    box.appendChild(foot);
    if (index !== undefined) config(structuredClone(w.triggers[index])); else { pick(); foot.innerHTML = `<button class="btn" id="wft_cancel">Cancel</button>`; $('#wft_cancel', box).onclick = close; }
  }

  // ---- action picker
  function actionDrawer(w, listKey, index) {
    const box = KY.modal({ title: 'Actions', drawer: true, body: `<p class="sub">Pick the next thing that should happen.</p>
      <div class="search" style="margin-bottom:6px"><span>${icon('search', 18)}</span><input class="input" id="wfa_search" placeholder="Search actions"></div><div id="wfa_list"></div>` });
    box.classList.add('wf-drawer');
    const draw = () => {
      const q = $('#wfa_search', box).value.toLowerCase();
      $('#wfa_list', box).innerHTML = Object.entries(ACTIONS).map(([cat, list]) => {
        const l = list.filter(([n]) => n.toLowerCase().includes(q));
        return l.length ? `<div class="wf-cat">${esc(cat)}</div><div class="wf-pick">${l.map(([n, , ic, col, p]) => `<button id="wfa_${slug(n)}" data-a="${esc(n)}"><span class="ic" style="background:${col}">${icon(ic, 16)}</span>${esc(n)}${p ? premiumChip : ''}</button>`).join('')}</div>` : '';
      }).join('') || '<p class="muted">No actions match.</p>';
      $$('[data-a]', box).forEach((b) => (b.onclick = () => { box.remove(); $$('.overlay').forEach((o) => o.remove()); configDrawer(w, b.dataset.a, { listKey, index }); }));
    };
    $('#wfa_search', box).oninput = draw;
    draw();
  }

  // ---- action config
  function configDrawer(w, kind, { step: existing, listKey, index }) {
    const m = ACTION_BY_NAME[kind] || { label: kind, type: 'generic', icon: 'zap', color: C.tool };
    const c = existing ? structuredClone(existing.cfg || {}) : {};
    const name = existing ? existing.name : kind;
    const box = KY.modal({ title: kind, drawer: true, body: `<div id="wfa_body"></div>` });
    box.classList.add('wf-drawer');
    const body = $('#wfa_body', box);
    const nameField = `<div class="field"><label>Action name</label><input class="input" id="wfa_name" value="${esc(name)}"></div>`;
    const msgBox = (v, rows = 5) => `<div class="field"><label>Message</label>
      <div class="wf-tool"><button class="btn sm" id="wfa_custom_values" type="button">${icon('tag', 16)} Custom Values</button><button class="btn sm" type="button" id="wfa_templates">${icon('note', 16)} Templates</button><button class="btn sm ghost icon" type="button">${icon('paperclip', 16)}</button><button class="btn sm ghost icon" type="button">${icon('link', 16)}</button></div>
      <textarea class="input" id="wfa_message" rows="${rows}" placeholder="Type your message…">${esc(v || '')}</textarea></div>`;
    const team = data.team.map((t) => t.name);
    let branches = existing?.branches ? existing.branches.map((b) => ({ ...b })) : [{ name: 'Branch 1', cond: { field: 'Contact Tag', op: 'includes', value: '' }, steps: [] }, { name: 'None', steps: [] }];
    const COND = { 'Contact Tag': ['includes', TAGS], 'Contact replied': ['is', ['Yes', 'No']], 'Appointment status': ['is', ['Confirmed', 'Showed', 'No Show', 'Cancelled']], 'Opportunity stage': ['is', allStages], 'Email event': ['is', ['Opened', 'Clicked', 'Bounced']], 'Contact source': ['is', [...new Set(data.contacts.map((x) => x.source))]] };

    const forms = {
      sms: () => `${nameField}<div class="field"><label>From number</label>${dd('wfa_from', 'Default number (+44 20 7946 0321)')}</div>${msgBox(c.message)}
        <div class="row muted" style="font-size:13.5px;margin-top:-6px;margin-bottom:14px"><span id="wfa_count">${(c.message || '').length} characters</span><span class="spacer"></span>Custom values fill in each contact's details</div>
        <div class="field"><label>Test phone number</label><div class="row"><input class="input" placeholder="+44" id="wfa_testnum"><button class="btn" type="button" id="wfa_sendtest">Send test</button></div></div>`,
      email: () => `${nameField}<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>From name</label><input class="input" value="Bloom Dental Studio"></div>
        <div class="field"><label>From email</label><input class="input" value="hello@bloomdental.co.uk"></div></div>
        <div class="field"><label>Subject</label><input class="input" id="wfa_subject" value="${esc(c.subject || '')}" placeholder="Subject line"></div>${msgBox(c.message, 7)}`,
      wait: () => `${nameField}<div class="field"><label>Wait for</label>${dd('wfa_wait_type', c.type || 'Time Delay')}</div><div id="wfa_wait_opts"></div>`,
      ifelse: () => `${nameField}<div id="wfa_branches"></div><button class="btn sm" id="wfa_add_branch" type="button">${icon('plus', 16)} Add branch</button>
        <div class="wf-box" style="margin-top:14px"><b>None</b><div class="muted" style="font-size:14px">Contacts who don't match any branch go down the <b>None</b> path.</div></div>`,
      add_tag: () => `${nameField}<div class="field"><label>Tags</label>${dd('wfa_tags', (c.tags || [])[0] || 'Select tags')}</div>`,
      remove_tag: () => forms.add_tag(),
      opportunity: () => `${nameField}<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
        <div class="field"><label>In pipeline</label>${dd('wfa_pipeline', c.pipeline || 'Patient Journey')}</div>
        <div class="field"><label>In pipeline stage</label>${dd('wfa_stage', c.stage || 'Select stage')}</div></div>
        <div class="field"><label>Opportunity name</label><input class="input" value="{{contact.name}}"></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Opportunity source</label><input class="input" value="{{contact.source}}"></div>
        <div class="field"><label>Lead value</label><input class="input" id="wfa_value" value="${esc(c.value || '')}" placeholder="£0"></div></div>
        <div class="field"><label>Opportunity status</label>${dd('wfa_status', c.status || 'Open')}</div>
        <div class="row" style="margin:6px 0"><button class="toggle on" id="wfa_backward"></button><span>Allow opportunity to move to any previous stage in pipeline</span></div>
        <div class="row" style="margin:12px 0"><button class="toggle" id="wfa_duplicate"></button><span>Allow duplicate opportunities</span></div>`,
      notification: () => `${nameField}<div class="field"><label>Type</label>${dd('wfa_ntype', c.ntype || 'In-App Notification')}</div>
        <div class="field"><label>Send to</label>${dd('wfa_who', c.who || 'Assigned User')}</div>
        <div class="field"><label>Message</label><textarea class="input" id="wfa_message" rows="3">${esc(c.message || 'New lead: {{contact.name}} ({{contact.phone}})')}</textarea></div>`,
      assign: () => `${nameField}<div class="field"><label>Users</label>${dd('wfa_users', (c.users || team.slice(0, 2)).join(', '))}</div>
        <div class="field"><label>Split traffic</label>${dd('wfa_split', 'Equally')}</div>
        <div class="row"><button class="toggle on" id="wfa_unassigned"></button><span>Only apply to unassigned contacts</span></div>`,
      task: () => `${nameField}<div class="field"><label>Title</label><input class="input" id="wfa_task_title" value="${esc(c.title || '')}" placeholder="e.g. Call to confirm consultation"></div>
        <div class="field"><label>Description</label><textarea class="input" rows="3" id="wfa_task_desc">${esc(c.desc || '')}</textarea></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Assign to</label>${dd('wfa_assign', c.assign || 'Assigned User')}</div>
        <div class="field"><label>Due in (days)</label><input class="input" id="wfa_due" value="${esc(c.due ?? 1)}"></div></div>`,
      goal: () => `${nameField}<div class="field"><label>Goal type</label>${dd('wfa_goal', c.goal || 'Added Tag')}</div>
        <div class="field"><label>Tag</label>${dd('wfa_goal_tag', c.goalTag || 'consultation booked')}</div>
        <div class="wf-box" style="font-size:14px">When a contact meets this goal at <b>any</b> point in the workflow, they jump straight to this step and skip everything before it.</div>
        <div class="field"><label>If a contact reaches this step without meeting the goal</label>${dd('wfa_goal_else', c.otherwise || 'Continue to the next action')}</div>`,
      goto: () => `${nameField}<div class="field"><label>Go to</label>${dd('wfa_goto', c.target || 'Select a step')}</div>
        <p class="wf-hint">Jumps the contact to another step, for example to loop back to an earlier message.</p>`,
      webhook: () => `${nameField}<div class="field"><label>Method</label>${dd('wfa_method', 'POST')}</div>
        <div class="field"><label>URL</label><input class="input" id="wfa_url" value="${esc(c.url || '')}" placeholder="https://"></div>
        <div class="field"><label>Custom data</label><div class="wf-frow" style="grid-template-columns:1fr 1fr"><input class="input" value="treatment"><input class="input" value="{{contact.treatment_interest}}"></div></div>
        <p class="wf-hint">Sends the contact's details to another app whenever a contact reaches this step.</p>`,
      custom_webhook: () => `${nameField}<div class="wf-box">${premiumChip}<span class="muted" style="font-size:14px;margin-left:6px">Billed per execution</span></div>
        <div class="grid" style="grid-template-columns:140px 1fr;gap:0 14px"><div class="field"><label>Method</label>${dd('wfa_method', 'POST')}</div>
        <div class="field"><label>URL</label><input class="input" id="wfa_url" placeholder="https://"></div></div>
        <div class="field"><label>Authorization</label>${dd('wfa_auth', 'Bearer token')}</div>
        <div class="field"><label>Headers</label><div class="wf-frow" style="grid-template-columns:1fr 1fr"><input class="input" value="Content-Type"><input class="input" value="application/json"></div></div>
        <div class="field"><label>Raw body (JSON)</label><textarea class="input" rows="4" style="font-family:ui-monospace,monospace;font-size:13.5px">{ "name": "{{contact.name}}", "phone": "{{contact.phone}}" }</textarea></div>`,
      sheets: () => `${nameField}<div class="wf-box">${premiumChip}<span class="muted" style="font-size:14px;margin-left:6px">Billed per execution</span></div>
        <div class="field"><label>Connected Google account</label><div class="row"><span class="chip green">${icon('check', 14)} sarah@bloomdental.co.uk</span></div></div>
        <div class="field"><label>Action</label>${dd('wfa_gaction', c.gaction || 'Create Spreadsheet Row')}</div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Spreadsheet</label>${dd('wfa_sheet', c.sheet || 'Select spreadsheet')}</div>
        <div class="field"><label>Worksheet</label>${dd('wfa_tab', c.tab || 'Leads')}</div></div>
        <div class="field" id="wfa_map"><label>Map columns</label>${[['Name', '{{contact.name}}'], ['Email', '{{contact.email}}'], ['Phone', '{{contact.phone}}'], ['Treatment', '{{contact.treatment_interest}}'], ['Date', '{{right_now.date}}']].map(([a, b]) => `<div class="wf-frow" style="grid-template-columns:150px 1fr"><span class="bold" style="font-size:14px">${a}</span><input class="input" value="${b}"></div>`).join('')}</div>`,
      gpt: () => `${nameField}<div class="wf-box">${premiumChip}<span class="muted" style="font-size:14px;margin-left:6px">Billed per execution</span></div>
        <div class="field"><label>Action type</label>${dd('wfa_gpt', 'Custom prompt')}</div>
        <div class="field"><label>Prompt</label><textarea class="input" rows="4">Summarise this enquiry in one sentence: {{message.body}}</textarea></div>
        <p class="wf-hint">The AI's answer can be used in later steps. We'll build this in Module 10.</p>`,
      review: () => `${nameField}<div class="wf-box" style="font-size:14px">Sends your review request (set up in <b>Reputation → Settings</b>) by SMS or email, with a link to leave a Google review.</div>`,
      appt_status: () => `${nameField}<div class="field"><label>Status</label>${dd('wfa_appt', 'Confirmed')}</div>`,
      remove_wf: () => `${nameField}<div class="field"><label>Workflow</label>${dd('wfa_remove', 'Current workflow')}</div>`,
      create_contact: () => `${nameField}<p class="wf-hint" style="margin-top:0">Map incoming data to contact fields. Values from an Inbound Webhook appear under <b>Inbound Webhook Trigger</b> in Custom Values.</p>
        ${[['First Name', '{{inboundWebhookRequest.first_name}}'], ['Email', '{{inboundWebhookRequest.email}}'], ['Phone', '{{inboundWebhookRequest.phone}}'], ['Tags', 'invisalign, website lead']].map(([a, b]) => `<div class="wf-frow" style="grid-template-columns:150px 1fr"><span class="bold" style="font-size:14px">${a}</span><input class="input" value="${b}"></div>`).join('')}`,
      generic: () => `${nameField}<div class="wf-box" style="font-size:14px">${esc(kind)} — configure the details of this action, then save it.</div>`,
      contact: () => forms.generic(),
    };
    body.innerHTML = (forms[m.type] || forms.generic)();
    KY.toggles(body);

    // Wiring per type
    const msg = $('#wfa_message', body);
    if (msg) {
      let caret = msg.value.length;
      const remember = () => (caret = msg.selectionStart);
      msg.onkeyup = msg.onclick = msg.oninput = () => { remember(); const n = $('#wfa_count', body); if (n) n.textContent = `${msg.value.length} characters`; };
      const cv = $('#wfa_custom_values', body);
      if (cv) cv.onclick = (e) => {
        e.stopPropagation();
        menu(cv, CUSTOM_VALUES.map(([l, v]) => ({ label: `${l}  ${v}`, onClick: () => {
          msg.value = msg.value.slice(0, caret) + v + msg.value.slice(caret);
          caret += v.length; msg.focus(); msg.setSelectionRange(caret, caret);
          const n = $('#wfa_count', body); if (n) n.textContent = `${msg.value.length} characters`;
        } })));
      };
      const tp = $('#wfa_templates', body);
      if (tp) tp.onclick = (e) => { e.stopPropagation(); menu(tp, [{ label: 'Invisalign — first reply' }, { label: 'Appointment reminder' }, { label: 'Review request' }]); };
      const st = $('#wfa_sendtest', body);
      if (st) st.onclick = () => KY.toast('Test SMS sent');
    }
    wireDD(body, 'wfa_from', ['Default number (+44 20 7946 0321)', '+44 7700 900500 (Marketing)']);
    wireDD(body, 'wfa_tags', TAGS);
    wireDD(body, 'wfa_pipeline', pipelines, () => { const s = $('#wfa_stage', body); s.dataset.value = ''; s.querySelector('span').textContent = 'Select stage'; });
    wireDD(body, 'wfa_stage', () => data.pipelines.find((p) => p.name === val(body, 'wfa_pipeline')).stages);
    wireDD(body, 'wfa_status', ['Open', 'Won', 'Lost', 'Abandoned']);
    wireDD(body, 'wfa_ntype', ['In-App Notification', 'Email', 'SMS']);
    wireDD(body, 'wfa_who', ['Assigned User', 'All Users', 'Particular User']);
    wireDD(body, 'wfa_users', team);
    wireDD(body, 'wfa_split', ['Equally', 'Unevenly (weighted)']);
    wireDD(body, 'wfa_assign', ['Assigned User', ...team]);
    wireDD(body, 'wfa_goal', ['Added Tag', 'Removed Tag', 'Clicked Email Link', 'Opened Email', 'Clicked Trigger Link']);
    wireDD(body, 'wfa_goal_tag', TAGS);
    wireDD(body, 'wfa_goal_else', ['Continue to the next action', 'End this workflow', 'Wait until the goal is met']);
    wireDD(body, 'wfa_goto', () => allSteps(w.steps).map((s) => s.name));
    wireDD(body, 'wfa_method', ['POST', 'GET', 'PUT', 'DELETE']);
    wireDD(body, 'wfa_auth', ['None', 'Bearer token', 'API key', 'Basic auth']);
    wireDD(body, 'wfa_gaction', ['Create Spreadsheet Row', 'Update Spreadsheet Row', 'Lookup Spreadsheet Row', 'Delete Spreadsheet Row']);
    wireDD(body, 'wfa_sheet', ['Bloom Leads 2026', 'Patient Reviews', 'Marketing Spend']);
    wireDD(body, 'wfa_tab', ['Leads', 'Sheet1']);
    wireDD(body, 'wfa_gpt', ['Custom prompt', 'Summarise', 'Classify intent', 'Detect sentiment']);
    wireDD(body, 'wfa_appt', ['Confirmed', 'Cancelled', 'Showed', 'No Show', 'Invalid']);
    wireDD(body, 'wfa_remove', ['Current workflow', ...WF.map((x) => x.name)]);

    if (m.type === 'wait') {
      const opts = $('#wfa_wait_opts', body);
      const drawWait = (type) => {
        c.type = type;
        const unit = c.unit || 'Minutes';
        opts.innerHTML = type === 'Time Delay'
          ? `<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Wait</label><input class="input" id="wfa_wait_amount" value="${esc(c.amount ?? 5)}"></div>
              <div class="field"><label>Unit</label>${dd('wfa_wait_unit', unit)}</div></div>
              <div class="row" style="margin-bottom:12px"><button class="toggle" id="wfa_window"></button><span>Advanced window: only resume on certain days and times</span></div>`
          : type === 'Event/Appointment Time'
            ? `<div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:0 12px"><div class="field"><label>When</label>${dd('wfa_wait_when', c.when || 'Before')}</div>
              <div class="field"><label>Amount</label><input class="input" id="wfa_wait_amount" value="${esc(c.amount ?? 1)}"></div><div class="field"><label>Unit</label>${dd('wfa_wait_unit', c.unit || 'Days')}</div></div>
              <p class="wf-hint">Counts from the appointment's start time. Use this for reminders.</p>`
            : type === 'Contact Reply'
              ? `<p class="wf-hint">Waits until the contact replies. Set a timeout so contacts who never reply don't wait forever.</p>
                 <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Timeout after</label><input class="input" value="2"></div><div class="field"><label>Unit</label>${dd('wfa_wait_unit', 'Days')}</div></div>`
              : `<p class="wf-hint">Waits until this ${esc(type.toLowerCase())} happens.</p>`;
        wireDD(opts, 'wfa_wait_unit', ['Minutes', 'Hours', 'Days']);
        wireDD(opts, 'wfa_wait_when', ['Before', 'After']);
        KY.toggles(opts);
      };
      wireDD(body, 'wfa_wait_type', ['Time Delay', 'Event/Appointment Time', 'Condition', 'Contact Reply', 'Trigger Link Clicked', 'Email Event'], drawWait);
      drawWait(c.type || 'Time Delay');
    }

    if (m.type === 'ifelse') {
      const wrap = $('#wfa_branches', body);
      const drawB = () => {
        const real = branches.filter((b) => b.name !== 'None' || b.cond);
        wrap.innerHTML = real.map((b, i) => {
          const sfx = i ? '_' + i : '';
          return `<div class="wf-box"><div class="field"><label>Branch name</label><input class="input" id="wfa_branch_name${sfx}" value="${esc(b.name)}"></div>
            <label class="bold" style="font-size:14px">Conditions</label>
            <div class="wf-frow" style="margin-top:6px">${dd('wfa_cond_field' + sfx, b.cond.field)}<span class="is">${esc((COND[b.cond.field] || ['is'])[0])}</span>${dd('wfa_cond_value' + sfx, b.cond.value || 'Select')}<span></span></div></div>`;
        }).join('');
        real.forEach((b, i) => {
          const sfx = i ? '_' + i : '';
          $('#wfa_branch_name' + sfx, wrap).oninput = (e) => (b.name = e.target.value);
          wireDD(wrap, 'wfa_cond_field' + sfx, Object.keys(COND), (v) => { b.cond = { field: v, op: COND[v][0], value: '' }; drawB(); });
          wireDD(wrap, 'wfa_cond_value' + sfx, () => COND[b.cond.field][1], (v) => (b.cond.value = v));
        });
      };
      drawB();
      $('#wfa_add_branch', body).onclick = () => { branches.splice(branches.length - 1, 0, { name: `Branch ${branches.length}`, cond: { field: 'Contact Tag', op: 'includes', value: '' }, steps: [] }); drawB(); };
    }

    const close = () => { box.remove(); $$('.overlay').forEach((o) => o.remove()); };
    const foot = document.createElement('div');
    foot.className = 'modal-f';
    foot.innerHTML = `${existing ? `<button class="btn" id="wfa_delete" style="color:var(--red);margin-right:auto">${icon('trash', 16)} Delete</button>` : ''}<button class="btn" id="wfa_cancel">Cancel</button><button class="btn primary" id="wfa_save">Save Action</button>`;
    box.appendChild(foot);
    $('#wfa_cancel', box).onclick = close;
    if (existing) $('#wfa_delete', box).onclick = () => {
      const remove = (steps) => { const i = steps.indexOf(existing); if (i >= 0) { steps.splice(i, 1); return true; } return steps.some((s) => (s.branches || []).some((b) => remove(b.steps))); };
      remove(w.steps); close(); redraw(w);
    };
    $('#wfa_save', box).onclick = () => {
      const cfg = { ...c };
      const get = (id) => val(body, id);
      if (msg) cfg.message = msg.value;
      if (m.type === 'email') cfg.subject = $('#wfa_subject', body).value;
      if (m.type === 'wait') { cfg.amount = +(get('wfa_wait_amount') || 1); cfg.unit = get('wfa_wait_unit') || 'Days'; cfg.when = get('wfa_wait_when') || 'Before'; }
      if (m.type === 'add_tag' || m.type === 'remove_tag') cfg.tags = [get('wfa_tags')].filter((t) => t && t !== 'Select tags');
      if (m.type === 'opportunity') { cfg.pipeline = get('wfa_pipeline'); cfg.stage = get('wfa_stage') === 'Select stage' ? data.pipelines.find((p) => p.name === cfg.pipeline).stages[0] : get('wfa_stage'); cfg.status = get('wfa_status'); cfg.value = $('#wfa_value', body).value; }
      if (m.type === 'task') { cfg.title = $('#wfa_task_title', body).value; cfg.assign = get('wfa_assign'); cfg.due = $('#wfa_due', body).value; }
      if (m.type === 'goal') { cfg.goal = get('wfa_goal'); cfg.goalTag = get('wfa_goal_tag'); cfg.otherwise = get('wfa_goal_else'); }
      if (m.type === 'goto') cfg.target = get('wfa_goto');
      if (m.type === 'sheets') { cfg.gaction = get('wfa_gaction'); cfg.sheet = get('wfa_sheet'); cfg.tab = get('wfa_tab'); }
      if (m.type === 'notification') { cfg.ntype = get('wfa_ntype'); cfg.who = get('wfa_who'); }
      let nm = $('#wfa_name', body).value.trim() || kind;
      if (m.type === 'wait' && nm === 'Wait') nm = cfg.type === 'Time Delay' ? `Wait ${cfg.amount} ${cfg.amount === 1 ? cfg.unit.toLowerCase().replace(/s$/, '') : cfg.unit.toLowerCase()}` : cfg.type === 'Event/Appointment Time' ? `Wait until ${cfg.amount} ${cfg.unit.toLowerCase()} ${cfg.when.toLowerCase()}` : `Wait for ${cfg.type.toLowerCase()}`;
      let flashId;
      if (existing) {
        existing.name = nm; existing.cfg = cfg;
        if (m.type === 'ifelse') existing.branches = branches;
        flashId = existing.id;
      } else {
        const s = { id: 'n' + ++nodeCount, kind, name: nm, cfg };
        if (m.type === 'ifelse') s.branches = branches;
        const list = findList(w, listKey);
        const rest = list.splice(index);
        list.push(s);
        // Steps that came after a new If/Else continue in its first branch.
        if (s.branches) s.branches[0].steps.push(...rest); else list.push(...rest);
        flashId = s.id;
      }
      close(); redraw(w, flashId);
    };
  }

  // ---- test
  function testModal(w) {
    const people = [`${data.me.name} (you)`, ...data.contacts.map((x) => x.name)];
    const box = KY.modal({ title: 'Test Workflow', body: `
      <p class="muted" style="margin-top:0">Runs the workflow for one contact, right now. Messages are really sent, so test on your own contact record.</p>
      <div class="field"><label>Contact</label>${dd('wf_test_contact', 'Search contact')}</div><div id="wf_test_res" class="wf-test-res"></div>`,
      actions: [{ label: 'Close' }, { label: 'Run Test', primary: true, id: 'wf_test_run', onClick: (close, b) => {
        const who = val(b, 'wf_test_contact');
        if (!who || who === 'Search contact') return KY.toast('Choose a contact first', 'warn');
        const res = [];
        for (const s of w.steps) {
          if (meta(s).type === 'wait') { res.push([s.name, 'Waiting']); break; }
          res.push([s.name, 'Executed']);
          if (s.branches) break;
        }
        $('#wf_test_res', b).innerHTML = `<div class="bold" style="margin:6px 0">Test results — ${esc(who)}</div>` + res.map(([n, st]) => `<div class="row">${st === 'Executed' ? `<span style="color:var(--green)">${icon('check', 18)}</span>` : `<span style="color:var(--amber)">${icon('clock', 18)}</span>`}<span style="flex:1">${esc(n)}</span><span class="chip ${st === 'Executed' ? 'green' : 'amber'}">${st}</span></div>`).join('');
        const name = who.replace(' (you)', '');
        logsFor(w).unshift(...res.reverse().map(([n, st]) => ['me:' + name, n, st, '21 Oct 2026, 10:30', st === 'Executed' ? `${n} completed (test run).` : 'Waiting (test run).']));
        KY.toast(`Test run started for ${name}`);
      } }] });
    wireDD(box, 'wf_test_contact', people);
  }

  // ---- settings tab
  function settingsTab(body, w) {
    body.style.overflow = 'auto';
    const s = w.settings || (w.settings = { reentry: false, stop: true, window: false, tz: 'Account time zone (Europe/London)' });
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    body.innerHTML = `<div class="wf-settings">
      <div class="card"><div class="card-h"><h3>Time Window</h3></div><div class="card-b">
        <div class="wf-setrow"><button class="toggle ${s.window ? 'on' : ''}" id="wfs_window"></button><div><div class="t">Only run actions during these hours</div>
          <div class="d">Messages that would go out at night wait until the window opens.</div></div></div>
        <div class="row" style="gap:20px;flex-wrap:wrap"><div class="wf-days">${days.map((d, i) => `<span class="${i < 6 ? 'on' : ''}">${d}</span>`).join('')}</div>
          <div class="row"><input class="input" value="08:00" style="width:100px"><span class="muted">to</span><input class="input" value="20:00" style="width:100px"></div></div>
        <div class="field" style="margin-top:16px;max-width:420px"><label>Time zone</label>${dd('wfs_timezone', s.tz)}</div></div></div>
      <div class="card"><div class="card-h"><h3>Sender Details</h3></div><div class="card-b">
        <div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:0 16px">
          <div class="field"><label>From name</label><input class="input" id="wfs_from_name" value="Bloom Dental Studio"></div>
          <div class="field"><label>From email</label><input class="input" id="wfs_from_email" value="hello@bloomdental.co.uk"></div>
          <div class="field"><label>From number</label>${dd('wfs_from_number', '+44 20 7946 0321')}</div></div>
        <div class="d muted" style="font-size:14px">Used by every email and SMS in this workflow unless an action sets its own.</div></div></div>
      <div class="card"><div class="card-h"><h3>Contact Enrollment & Conversations</h3></div><div class="card-b">
        <div class="wf-setrow"><button class="toggle ${s.reentry ? 'on' : ''}" id="wfs_reentry"></button><div><div class="t">Allow re-entry</div>
          <div class="d">Lets a contact go through this workflow more than once, for example every time they book.</div></div></div>
        <div class="wf-setrow"><button class="toggle ${s.stop ? 'on' : ''}" id="wfs_stop"></button><div><div class="t">Stop on response</div>
          <div class="d">Removes the contact from this workflow as soon as they reply, so they don't get chased after answering.</div></div></div>
        <div class="wf-setrow"><button class="toggle" id="wfs_markread"></button><div><div class="t">Mark conversations as read</div>
          <div class="d">Messages sent by this workflow won't show as unread in Conversations.</div></div></div>
      </div></div>
      <div class="row"><span class="spacer"></span><button class="btn primary" id="wfs_save">Save settings</button></div></div>`;
    KY.toggles(body);
    wireDD(body, 'wfs_timezone', ['Account time zone (Europe/London)', "Contact's time zone"]);
    wireDD(body, 'wfs_from_number', ['+44 20 7946 0321', '+44 7700 900500']);
    $('#wfs_save', body).onclick = () => {
      s.reentry = $('#wfs_reentry').classList.contains('on'); s.stop = $('#wfs_stop').classList.contains('on'); s.window = $('#wfs_window').classList.contains('on');
      KY.toast('Workflow settings saved');
    };
  }

  // ---- enrollment history
  function enrollmentTab(body, w) {
    const rows = enrollFor(w);
    const draw = (q = '') => {
      const list = rows.filter(([c]) => contact(c).name.toLowerCase().includes(q.toLowerCase()));
      $('#wfe_rows', body).innerHTML = list.map(([c, at, st, cur, tr]) => `<tr><td><div class="row">${avatar(contact(c).name, 30)}<span class="bold">${esc(contact(c).name)}</span></div></td>
        <td class="muted">${esc(tr)}</td><td>${esc(at)}</td><td><span class="chip ${st === 'Active' ? 'blue' : 'green'}">${st}</span></td><td>${esc(cur)}</td></tr>`).join('')
        + (list.length ? '' : `<tr><td colspan="5"><div class="empty" style="padding:30px"><div class="big">No enrollments found</div>This contact never entered the workflow. Check the trigger and its filters.</div></td></tr>`);
    };
    body.innerHTML = `<div class="wf-panel">
      <div class="grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
        <div class="card stat"><div class="k">Total enrolled</div><div class="v">${w.enrolled.toLocaleString('en-GB')}</div></div>
        <div class="card stat"><div class="k">Currently active</div><div class="v">${w.active}</div></div>
        <div class="card stat"><div class="k">Completed</div><div class="v">${(w.enrolled - w.active).toLocaleString('en-GB')}</div></div></div>
      <div class="card"><div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)">
        <div class="search" style="width:320px"><span>${icon('search', 18)}</span><input class="input" id="wfe_search" placeholder="Search contact"></div>
        <button class="btn">${icon('calendar', 18)} Last 30 days</button><span class="spacer"></span></div>
        <table class="t" id="wfe_table"><thead><tr><th>Contact</th><th>Enrolled by</th><th>Enrolled on</th><th>Status</th><th>Current / last step</th></tr></thead><tbody id="wfe_rows"></tbody></table></div></div>`;
    $('#wfe_search', body).oninput = (e) => draw(e.target.value);
    draw();
  }

  // ---- execution logs
  function logsTab(body, w) {
    const f = { q: '', status: 'All statuses', action: 'All actions' };
    const nameOf = (c) => (c.startsWith('me:') ? c.slice(3) : contact(c).name);
    const color = { Executed: 'green', Skipped: 'amber', Failed: 'red', Waiting: 'blue' };
    body.innerHTML = `<div class="wf-panel"><div class="card">
      <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft);gap:10px">
        <div class="search" style="width:300px"><span>${icon('search', 18)}</span><input class="input" id="wfl_search" placeholder="Search contact"></div>
        <div style="width:240px">${dd('wfl_action', f.action)}</div><div style="width:190px">${dd('wfl_status', f.status)}</div>
        <button class="btn">${icon('calendar', 18)} Last 30 days</button><span class="spacer"></span><span class="muted" id="wfl_count" style="font-size:14px"></span></div>
      <table class="t" id="wfl_table"><thead><tr><th>Contact</th><th>Action</th><th>Status</th><th>Executed on</th><th>Event details</th></tr></thead><tbody id="wfl_rows"></tbody></table></div></div>`;
    const draw = () => {
      const list = logsFor(w).map((r, i) => [...r, i]).filter(([c, a, st]) => nameOf(c).toLowerCase().includes(f.q.toLowerCase()) &&
        (f.status === 'All statuses' || st === f.status) && (f.action === 'All actions' || a === f.action));
      $('#wfl_rows', body).innerHTML = list.map(([c, a, st, at, , i]) => `<tr id="wfl_row_${i}"><td><div class="row">${avatar(nameOf(c), 30)}<span class="bold">${esc(nameOf(c))}</span></div></td>
        <td>${esc(a)}</td><td><span class="chip ${color[st]}">${st}</span></td><td class="muted">${esc(at)}</td>
        <td><button class="btn sm" data-log="${i}" id="wfl_view_${i}">${icon('eye', 16)} View details</button></td></tr>`).join('')
        + (list.length ? '' : `<tr><td colspan="5"><div class="empty" style="padding:30px"><div class="big">No log entries</div>Try another contact or filter.</div></td></tr>`);
      $('#wfl_count', body).textContent = `${list.length} entries`;
      $$('[data-log]', body).forEach((b) => (b.onclick = () => {
        const [c, a, st, at, detail] = logsFor(w)[+b.dataset.log];
        const ct = c.startsWith('me:') ? { name: nameOf(c), phone: data.team[0].phone, email: data.me.email } : contact(c);
        const box = KY.modal({ title: 'Execution details', drawer: true, body: `
          <div class="row" style="margin-bottom:16px">${avatar(ct.name, 44)}<div><div class="bold" style="font-size:18px">${esc(ct.name)}</div><div class="muted" style="font-size:14px">${esc(ct.phone)} · ${esc(ct.email)}</div></div></div>
          <div class="wf-box"><div class="row" style="margin-bottom:8px"><span class="muted" style="width:120px">Action</span><b>${esc(a)}</b></div>
            <div class="row" style="margin-bottom:8px"><span class="muted" style="width:120px">Status</span><span class="chip ${color[st]}">${st}</span></div>
            <div class="row"><span class="muted" style="width:120px">Executed on</span>${esc(at)}</div></div>
          <div class="field"><label>Details</label><div class="card" id="wfl_detail" style="padding:14px 16px;box-shadow:none;border-color:${st === 'Skipped' ? '#fedf89' : st === 'Failed' ? '#fecdca' : 'var(--line)'};background:${st === 'Skipped' ? 'var(--amber-soft)' : st === 'Failed' ? 'var(--red-soft)' : '#fff'}">${esc(detail)}</div></div>
          ${st === 'Skipped' && /Do Not Disturb/.test(detail) ? `<p class="muted" style="font-size:14px">To fix: open the contact and check <b>Do not disturb</b>. Only turn it off if the contact has agreed to hear from you.</p>
            <button class="btn" id="wfl_open_contact">${icon('user', 16)} Open contact</button>` : ''}
          ${st === 'Failed' ? `<p class="muted" style="font-size:14px">Fix the cause, then re-enrol the contact or message them manually.</p>` : ''}` });
        const oc = $('#wfl_open_contact', box);
        if (oc) oc.onclick = () => KY.go(`#/contacts/detail/${c}`);
      }));
    };
    $('#wfl_search', body).oninput = (e) => { f.q = e.target.value; draw(); };
    wireDD(body, 'wfl_status', ['All statuses', 'Executed', 'Waiting', 'Skipped', 'Failed'], (v) => { f.status = v; draw(); });
    wireDD(body, 'wfl_action', () => ['All actions', ...new Set([...w.triggers.map((t) => t.type), ...allSteps(w.steps).map((s) => s.name)])], (v) => { f.action = v; draw(); });
    draw();
  }

  // ---------------------------------------------------------------- global settings
  function globalSettings(view) {
    const ch = ['SMS', 'Email', 'WhatsApp', 'Facebook', 'Instagram', 'Live chat', 'Google Business'];
    view.innerHTML = `<div class="page-head"><h1>Global Workflow Settings</h1><span class="sub">Apply to every workflow in this account</span></div>
      <div class="card" style="max-width:980px"><div class="card-h"><h3>Stop on Response</h3></div><div class="card-b">
        <div class="wf-setrow"><button class="toggle on" id="gws_stop"></button><div><div class="t">Stop all workflows when a contact replies</div>
          <div class="d">When a contact replies on one of the channels below, they're removed from every workflow that has Stop on response turned on.</div></div></div>
        <div class="field" style="margin-top:6px"><label>Channels</label><div class="row" style="flex-wrap:wrap;gap:14px">
          ${ch.map((c, i) => `<label class="row" style="gap:6px;font-weight:500"><input type="checkbox" ${i < 3 ? 'checked' : ''}> ${c}</label>`).join('')}</div></div>
        <div class="field" style="max-width:520px"><label>Exclude these workflows</label>${dd('gws_exclude', 'Appointment Confirmation & Reminders')}</div>
        <div class="d muted" style="font-size:14px">Excluded workflows keep running even after a reply. Reminders are a good example.</div>
      </div></div>
      <div class="row" style="max-width:980px;margin-top:18px"><span class="spacer"></span><button class="btn primary" id="gws_save">Save</button></div>`;
    KY.toggles(view);
    wireDD(view, 'gws_exclude', WF.map((w) => w.name));
    $('#gws_save').onclick = () => KY.toast('Global workflow settings saved');
  }

  KY.screen('automation', {
    tabs: [{ id: 'workflows', label: 'Workflows' }, { id: 'settings', label: 'Global Workflow Settings' }],
    render(view, { tab, params }) {
      css();
      if (tab === 'settings') return globalSettings(view);
      if (params[0]) {
        const w = byId(params[0]);
        if (!w) return KY.go('#/automation/workflows');
        return builder(view, w, ['settings', 'enrollment', 'logs'].includes(params[1]) ? params[1] : 'builder');
      }
      listView(view);
    },
  });
})();
