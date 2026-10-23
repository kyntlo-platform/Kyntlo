// Kyntlo Team Academy · Batch 1 · s01 "The 30-second pitch" (internal: sales & support team).
// Approved script (doc "Kyntlo Team Academy: Batch 1 Scripts", section c02). Design: Spotlight Stage.
// Filmed on the demo workspace (fictional Bloom Dental Studio) plus designed scenes in scenes/s01.html.
import { team } from './kit/lesson.mjs';

const t = team('s01');
const { page, message, booking } = t;
const drag = (card, column, ms = 1500) => async (p) => {
  const sleep = (n) => new Promise((r) => setTimeout(r, n));
  const a = await p.locator(card).first().boundingBox(), c = await p.locator(column).first().boundingBox();
  const [x1, y1, x2, y2] = [a.x + a.width / 2, a.y + 40, c.x + c.width / 2, c.y + 180];
  await p.evaluate(([x, y]) => window.__ky?.glide(x, y, 450), [x1, y1]);
  await p.mouse.move(x1, y1);
  await p.mouse.down();
  await sleep(180);
  p.evaluate(([x, y, ms]) => window.__ky?.glide(x, y, ms), [x2, y2, ms]).catch(() => {});
  for (let i = 1; i <= 26; i++) {
    const k = i / 26, e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
    await p.mouse.move(x1 + (x2 - x1) * e, y1 + (y2 - y1) * e);
    await sleep(ms / 26);
  }
  await sleep(250);
  await p.mouse.up();
};

export default {
  ...t.base,
  id: 'S-01',
  title: 'Kyntlo Team Academy s01 - The 30-second pitch',
  transitions: ['zoomin', 'circleopen'],
  music: { preset: 'pitch' },
  scenes: [
    { page: page('intro'), duration: 3.4, watermark: false },
    {
      page: page('hook'),
      voice: { voice: 'am_michael', speed: 1.02 },
      tail: 1,
      say: 'I run the business, answer the phone, chase invoices, and still lose customers. There has to be a better way.',
    },
    {
      page: page('chaos'),
      tail: 1.4,
      say: 'Every business owner has the same problem: ten tools, none of them talking to each other, and customers slipping through the cracks.',
    },
    { page: page('merge'), duration: 3 },
    {
      chapter: 'All in one place',
      goto: '{demo}#/dashboard',
      settle: 1,
      duration: 12.4,
      say: 'Kyntlo puts it all in one place: your leads, your messages, your calendar, your follow-ups, your payments and your reports.',
      actions: [
        { at: 0.2, focus: '#sidebar-v2' },
        { at: 2.1, highlight: '#sb_contacts', label: 'Leads', for: 1.1, nofocus: true },
        { at: 3.1, highlight: '#sb_conversations', label: 'Messages', for: 1.1, nofocus: true },
        { at: 4.1, highlight: '#sb_calendars', label: 'Calendar', for: 1.1, nofocus: true },
        { at: 5.0, highlight: '#sb_automation', label: 'Follow-ups', for: 1.1, nofocus: true },
        { at: 5.9, highlight: '#sb_payments', label: 'Payments', for: 1.1, nofocus: true },
        { at: 6.9, highlight: '#sb_reporting', label: 'Reports', for: 1.6, nofocus: true },
        { at: 8.8, highlight: '#sidebar-v2', label: 'One login for all of it', for: 3.2 },
      ],
    },
    {
      chapter: 'A customer at 9 pm',
      goto: '{demo}#/conversations/conversations/v20',
      settle: 1,
      duration: 23.6,
      say: 'A customer messages you at 9 pm. Kyntlo replies, books the appointment, reminds them, and tells you what it cost to win them.',
      actions: [
        { at: 0.2, highlight: '#cv_msg_1', label: 'Ruby, 21:04', for: 1.6 },
        { at: 1.5, run: message('v20', { from: 'ai', ch: 'sms', text: 'Hi Ruby! Yes, we have Thursday at 10:30 or Friday at 2:00. Which suits you?', time: '21:04' }) },
        { at: 1.7, title: 'Replied in seconds', sub: 'Conversation AI, 21:04', for: 2.4 },
        { at: 2.6, run: message('v20', { from: 'them', ch: 'sms', text: 'Thursday at 10:30 please!', time: '21:05' }) },
        { at: 3.4, run: message('v20', { from: 'ai', ch: 'sms', text: "You're booked for Thursday at 10:30. We'll send a reminder the day before.", time: '21:05' }) },
        { at: 4.3, click: '#sb_calendars' },
        { at: 5.2, run: booking({ id: 'n1', contact: 'c40', calendar: 'k3', day: 3, start: '10:30', end: '11:00', status: 'confirmed', with: 'Priya Shah' }) },
        { at: 5.3, highlight: '#cal_appt_n1', label: 'Booked: Thursday 10:30', for: 2.2 },
        { at: 7.6, click: '#sb_automation' },
        { at: 8.6, run: (p) => p.evaluate(() => window.KY.go('#/automation/workflows/w2')) },
        { at: 9.8, highlight: '#wf_node_s4', label: 'Reminder the day before', for: 2.2 },
        { at: 12.2, click: '#sb_reporting' },
        { at: 13.2, highlight: '#rp_g_kpis > :nth-child(7)', label: 'Cost to win a customer', for: 2.6 },
        { at: 16.0, click: '#sb_dashboard' },
        { at: 17.0, highlight: '#w_value', label: 'Every deal, one view', for: 2.4 },
        { at: 19.6, click: '#sb_opportunities' },
        { at: 20.6, run: drag('#op_card_o2', '#op_col_1') },
      ],
    },
    { page: page('one'), say: 'One platform. One login. One invoice.', duration: 3.6 },
    { page: page('break'), say: "That is the pitch. Now let's break it into three sentences you can say in 30 seconds." },
    { page: page('c1'), say: 'One: Kyntlo catches every lead.' },
    {
      chapter: 'Catch every lead',
      goto: '{demo}#/conversations/conversations/v1',
      settle: 1,
      duration: 6.2,
      actions: [
        { at: 0.2, highlight: '#cv_items', label: 'Nothing slips past', for: 2.6 },
        { at: 3.0, click: '#cv_item_v9' },
        { at: 3.8, highlight: '#cv_msg_2', label: 'Even a missed call gets a reply', for: 2.2 },
      ],
    },
    { page: page('c2'), say: 'Two: it follows up for you.' },
    {
      chapter: 'Follow up automatically',
      goto: '{demo}#/automation/workflows/w1',
      settle: 1,
      duration: 6.2,
      actions: [
        { at: 0.2, highlight: '#wf_trigger_0', label: 'A form comes in', for: 2.4 },
        { at: 2.8, highlight: '#wf_node_s2', label: 'Sent while you sleep', for: 3 },
      ],
    },
    { page: page('c3'), say: 'Three: it shows you what is working.' },
    {
      chapter: 'See what works',
      goto: '{demo}#/reporting/attribution',
      settle: 1,
      duration: 6.2,
      actions: [
        { at: 0.2, highlight: '#rp_attr_table', label: 'Revenue by source', for: 2.8 },
        { at: 3.2, highlight: '#rp_attr_row_paid-social', label: 'Social ads: top revenue', for: 2.6 },
      ],
    },
    { page: page('ask'), tail: 1.4, say: "Say those three, then ask, 'Which one hurts most today?'" },
    { page: page('recap'), duration: 7 },
    {
      page: page('tip'),
      say: "Selling tip: end every pitch with a question, not a feature list. Which of those three hurts most right now?",
      caption: 'Selling tip: end every pitch with a question, not a feature list: "Which of those three hurts most right now?"',
      tail: 2,
    },
    { page: page('outro'), watermark: false, duration: 5.6, say: 'Kyntlo, Own Tomorrow.' },
  ],
};
