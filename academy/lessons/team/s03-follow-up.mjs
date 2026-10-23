// Kyntlo Team Academy · Batch 1 · s03 "I forget to follow up" (internal: sales & support team).
// Approved script (doc "Kyntlo Team Academy: Batch 1 Scripts", section c05). Design: Sticky Notes.
// Filmed on the demo workspace (fictional Bloom Dental Studio) plus designed scenes in scenes/s03.html.
import { team } from './kit/lesson.mjs';

const t = team('s03');
const { page, row, toast } = t;
// Off camera: open the Treatment Quotes pipeline (the board opens on Patient Journey).
const quotes = [{ click: '#op_pipeline' }, { click: '.menu button:has-text("Treatment Quotes")' }, { wait: 0.4 }];
const drag = (card, column, ms = 1600) => async (p) => {
  const sleep = (n) => new Promise((r) => setTimeout(r, n));
  const a = await p.locator(card).first().boundingBox(), c = await p.locator(column).first().boundingBox();
  const [x1, y1, x2, y2] = [a.x + a.width / 2, a.y + 40, c.x + c.width / 2, c.y + 200];
  await p.evaluate(([x, y]) => window.__ky?.glide(x, y, 450), [x1, y1]);
  await p.mouse.move(x1, y1);
  await p.mouse.down();
  await sleep(180);
  p.evaluate(([x, y, ms]) => window.__ky?.glide(x, y, ms), [x2, y2, ms]).catch(() => {});
  for (let i = 1; i <= 28; i++) {
    const k = i / 28, e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
    await p.mouse.move(x1 + (x2 - x1) * e, y1 + (y2 - y1) * e);
    await sleep(ms / 28);
  }
  await sleep(250);
  await p.mouse.up();
};

export default {
  ...t.base,
  id: 'S-03',
  title: 'Kyntlo Team Academy s03 - I forget to follow up',
  transitions: ['slideup', 'coverup'],
  music: { preset: 'followup' },
  scenes: [
    { page: page('intro'), duration: 3.6, watermark: false },
    {
      page: page('hook'),
      voice: { voice: 'am_fenrir', speed: 1.0 },
      duration: 7,
      say: 'I sent a quote last Tuesday. I have no idea if they ever replied.',
    },
    { page: page('lost'), say: 'Most sales are lost after the first message, not before it. Nobody follows up.', tail: 1 },
    {
      chapter: 'Every enquiry is a card',
      goto: '{demo}#/opportunities',
      setup: quotes,
      settle: 1,
      duration: 15.4,
      say: 'In Kyntlo, every enquiry becomes a card in your pipeline: New, Contacted, Quote Sent, Won.',
      actions: [
        { at: 0.3, highlight: '#op_board', label: 'Treatment Quotes pipeline', for: 3.6 },
        { at: 4.2, highlight: '#op_colh_0', label: 'New', for: 1.4 },
        { at: 5.3, highlight: '#op_colh_1', label: 'Contacted', for: 1.4 },
        { at: 6.4, highlight: '#op_colh_2', label: 'Quote Sent', for: 1.4 },
        { at: 7.6, highlight: '#op_colh_3', label: 'Won', for: 1.6 },
        { at: 9.6, hover: '#op_card_q4' },
        { at: 9.8, highlight: '#op_card_q4', label: 'Value, source and owner on every card', for: 2.8 },
        { at: 12.8, highlight: '#op_colh_3', label: '£6,200 won this month', for: 2.4 },
      ],
    },
    {
      chapter: 'Drag it forward',
      goto: '{demo}#/opportunities',
      setup: quotes,
      settle: 1,
      duration: 12,
      say: 'Drag a card to the next stage and Kyntlo takes the next step for you.',
      actions: [
        { at: 0.3, highlight: '#op_card_q3', label: 'Quote just sent to Amara', for: 2.6 },
        { at: 3.2, run: drag('#op_card_q3', '#op_col_2') },
        { at: 5.6, run: toast('Quote Follow-up workflow started for Amara Osei') },
        { at: 5.8, highlight: '#op_card_q3', label: 'Next step: on autopilot', for: 3 },
        { at: 6.0, zoom: '#op_col_2', scale: 1.4, for: 3.4 },
      ],
    },
    {
      chapter: 'Build it once',
      goto: '{demo}#/automation/workflows/w20',
      settle: 1,
      duration: 19,
      say: 'Build an automation once: when a quote is sent, wait two days, then send a friendly check-in by text.',
      actions: [
        { at: 0.3, highlight: '#wf_trigger_0', label: 'When a quote is sent', for: 2.8 },
        { at: 3.4, highlight: '#wf_node_s1', label: 'Wait two days', for: 2.4 },
        { at: 6.0, highlight: '#wf_node_s2', label: 'Friendly check-in by text', for: 2.4 },
        { at: 8.6, highlight: '#wf_node_s3', label: 'Still quiet? One more day', for: 2 },
        { at: 10.9, click: '#wf_node_s2' },
        { at: 12.1, highlight: '.drawer', label: 'Written once, sent every time', for: 4.4 },
        { at: 12.3, zoom: '.drawer', scale: 1.3, for: 4 },
      ],
    },
    {
      chapter: 'Stops when they reply',
      goto: '{demo}#/automation/workflows/w20/settings',
      settle: 1,
      duration: 13,
      say: "If they reply, the automation stops. If they do not, a task lands on your team's list.",
      actions: [
        { at: 0.3, highlight: '#wfs_stop', label: 'Stop on response: on', for: 3.4 },
        { at: 0.5, zoom: '#wfs_stop', scale: 1.6, for: 3 },
        { at: 4.4, click: '#wf_tab_builder' },
        { at: 5.6, highlight: '#wf_node_s4', label: 'No reply? A task for the team', for: 3.6 },
      ],
    },
    {
      chapter: "Your team's list",
      goto: '{demo}#/contacts/tasks',
      settle: 1,
      duration: 8,
      actions: [
        { at: 0.6, run: row('table', ['<input type="checkbox">', 'Call Lily Morgan about her whitening quote', 'Lily Morgan', 'Priya Shah', '<span class="chip amber">Today</span>'], 'tk_new') },
        { at: 1.0, highlight: '#tk_new', label: 'Created by the workflow', for: 3.6 },
        { at: 4.9, highlight: '#tk_new td:nth-child(4)', label: 'Assigned to Priya, due today', for: 2.6 },
      ],
    },
    {
      chapter: "What's stuck",
      goto: '{demo}#/opportunities',
      setup: quotes,
      settle: 1,
      duration: 13,
      say: 'The pipeline shows exactly what is stuck, and for how long.',
      actions: [
        { at: 0.4, highlight: '#op_col_2', label: 'Quote Sent', for: 2.4 },
        { at: 3.0, hover: '#op_age_q1' },
        { at: 3.2, highlight: '#op_card_q1', label: '12 days without a reply', for: 4.2 },
        { at: 3.4, zoom: '#op_card_q1', scale: 1.7, for: 3.8 },
        { at: 8.4, highlight: '#op_card_q2', label: '2 days: still on track', for: 3.6 },
      ],
    },
    { page: page('machine'), duration: 7 },
    {
      page: page('tip'),
      say: "Selling tip: ask, how many quotes did you send last month, and how many did you chase? The gap is the value of Kyntlo.",
      caption: 'Selling tip: ask, "How many quotes did you send last month, and how many did you chase?" The gap is the value of Kyntlo.',
      tail: 2,
    },
    { page: page('outro'), watermark: false, duration: 6.8, say: 'Stop chasing. Start closing. Kyntlo, Own Tomorrow.' },
  ],
};
