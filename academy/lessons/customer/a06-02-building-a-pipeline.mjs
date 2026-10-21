// Track A · Module 6 · Lesson 2 — Building a pipeline.
// Filmed on the Kyntlo demo workspace (Opportunities › Pipelines). The stage reorder is a
// real mouse drag on the stage's grip handle.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const box = async (page, sel) => page.locator(sel).first().boundingBox();
function drag(from, to, ms = 1500) {
  return async (page) => {
    const a = await box(page, from), b = await box(page, to);
    const [x1, y1] = [a.x + a.width / 2, a.y + a.height / 2];
    const [x2, y2] = [x1, b.y + b.height / 2];
    await page.evaluate(([x, y]) => window.__ky?.glide(x, y, 500), [x1, y1]);
    await page.mouse.move(x1, y1);
    await page.mouse.down();
    await sleep(250);
    const steps = 26;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps, e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      await page.mouse.move(x1 + (x2 - x1) * e, y1 + (y2 - y1) * e);
      await sleep(ms / steps);
    }
    await sleep(300);
    await page.mouse.up();
  };
}

export default {
  id: 'A-6.2',
  title: 'Kyntlo Academy 6.2 — Building a pipeline',
  description:
    'Plan your sales stages, create a new pipeline, name and add stages, drag them into the right order, choose which stages appear in your charts, and edit an existing pipeline safely.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Sales pipeline', 'Pipeline stages', 'CRM setup'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 6 · Lesson 2', title: 'Build your *pipeline*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 6 · Lesson 2', title: 'Building a *pipeline*', sub: 'Create and order the stages of your sales process.' },
      say: "Welcome back! In this lesson, we'll build a pipeline from scratch. You'll create it, name its stages, put them in the right order, and learn how to change it later without losing a single deal.",
    },
    {
      chapter: 'Plan your stages first',
      goto: '{demo}#/opportunities/pipelines',
      settle: 1,
      say: "Before you click anything, write down the steps a customer goes through with you. Make each stage something that has already happened, like consultation booked. That way, anyone on the team can tell exactly where a deal belongs. For implants, that might be: new lead, contacted, consultation booked, treatment plan sent, deposit paid, and treatment started.",
      actions: [
        { at: 0.6, title: 'Plan on paper first', sub: 'One stage = one thing that has happened', for: 6 },
        { at: 7.0, move: [1000, 520] },
      ],
    },
    {
      chapter: 'The Pipelines tab',
      say: "Pipelines live in their own tab, next to Opportunities. Each row shows a pipeline and its stages, in order. This account already has three: patient journey, Invisalign, and reactivation.",
      actions: [
        { at: 0.4, hover: '#tab_pipelines' },
        { at: 0.6, highlight: '#tab_pipelines', label: 'Pipelines tab', for: 2.8 },
        { at: 4.0, highlight: '#pl_table', label: 'Your pipelines and stages', for: 5 },
        { at: 4.2, hover: '#pl_row_p1' },
        { at: 7.4, hover: '#pl_row_p3' },
      ],
    },
    {
      chapter: 'Create a pipeline',
      say: "Let's build one for dental implants, which have a longer journey than a check-up. Click Create new pipeline, and give it a clear name.",
      actions: [
        { at: 0.4, hover: '#pl_new' },
        { at: 4.0, click: '#pl_new' },
        { at: 5.6, type: 'Dental Implants', into: '#pl_name' },
      ],
    },
    {
      chapter: 'Name your stages',
      say: "Kyntlo starts you off with three example stages. Click any stage name to change it. I'll rename Booked, to Consultation Booked.",
      actions: [
        { at: 0.4, highlight: '#pl_stages', label: 'Starter stages', for: 3.4 },
        { at: 5.0, click: '#pl_stage_2' },
        { at: 5.6, press: 'Control+A' },
        { at: 5.8, type: 'Consultation Booked' },
      ],
    },
    {
      chapter: 'Add stages',
      speed: 1.3,
      say: "Now click Add stage for each step that follows. Deposit paid. Treatment started. And treatment plan sent.",
      actions: [
        { at: 0.4, click: '#pl_add_stage' },
        { at: 1.0, type: 'Deposit Paid' },
        { at: 2.6, click: '#pl_add_stage' },
        { at: 3.2, type: 'Treatment Started' },
        { at: 5.0, click: '#pl_add_stage' },
        { at: 5.6, type: 'Treatment Plan Sent' },
      ],
    },
    {
      chapter: 'Reorder stages',
      say: "Oops! Treatment plan sent should come before the deposit. No problem. Grab it by the handle on the left, and drag it up into place. Deals always move from the top stage to the bottom one.",
      actions: [
        { at: 0.6, highlight: '#pl_stage_row_5', label: 'In the wrong place', for: 3.4 },
        { at: 4.4, hover: '#pl_grip_5' },
        { at: 5.6, run: drag('#pl_grip_5', '#pl_grip_3', 1800) },
        { at: 8.4, highlight: '#pl_stage_row_3', label: 'Now in the right order', for: 3.4 },
      ],
    },
    {
      chapter: 'Funnel & pie charts',
      say: "The two switches on each stage decide whether it appears in your dashboard's funnel chart and pie chart. Leave them on for now. You might switch one off later, if a stage clutters a chart without telling you anything.",
      actions: [
        { at: 0.4, highlight: '.pl-head', label: 'Chart visibility', for: 3.6 },
        { at: 0.6, zoom: '#pl_stage_row_0', scale: 1.6, for: 4 },
        { at: 4.6, hover: '#pl_stage_row_0 [data-k=funnel]' },
        { at: 6.4, hover: '#pl_stage_row_0 [data-k=pie]' },
      ],
    },
    {
      chapter: 'Save',
      say: "When you're happy, click Create. The new pipeline appears in your list, with all six stages in order. Its open value is zero for now, because it doesn't have any deals yet.",
      actions: [
        { at: 0.4, click: '#pl_save' },
        { at: 2.4, highlight: '#pl_table tbody tr:last-child', label: 'Dental Implants', for: 3.6 },
      ],
    },
    {
      chapter: 'See it on the board',
      say: "Back on the Opportunities tab, pick it from the pipeline menu. There's your new board, with one empty column for each stage, ready for its first deal. From now on, whenever you add an opportunity, or a workflow creates one, you can choose this pipeline and its stage.",
      actions: [
        { at: 0.4, click: '#tab_opportunities' },
        { at: 2.0, click: '#op_pipeline' },
        { at: 3.2, click: '.menu button:has-text("Dental Implants")' },
        { at: 4.6, highlight: '#op_board', label: 'Your new pipeline', for: 4 },
      ],
    },
    {
      chapter: 'Editing a pipeline',
      say: "You can change a pipeline at any time. Click the pencil next to it to rename, reorder or add stages. Existing deals stay in their stages, even when you reorder them. Just move deals out of a stage before you delete it.",
      actions: [
        { at: 0.4, click: '#tab_pipelines' },
        { at: 2.0, click: '#pl_edit_p1' },
        { at: 3.6, highlight: '#pl_stages', label: 'Rename, reorder, add', for: 4.6 },
        { at: 10.4, hover: '#pl_stages [data-del="4"]' },
        { at: 10.6, highlight: '#pl_stages [data-del="4"]', label: 'Move deals out first', for: 2.8 },
        { at: 13.6, click: '.modal-f button:has-text("Cancel")' },
      ],
    },
    {
      chapter: 'Pipelines on your plan',
      say: "One thing to check: the Starter plan includes one pipeline, so shape that one around your main sales process. Growth gives you up to three, and Pro is unlimited.",
      actions: [
        { at: 0.6, title: 'Starter: 1 pipeline', sub: 'Growth: up to 3 · Pro: unlimited', for: 6 },
        { at: 1.0, hover: '#pl_new' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Five to *seven* stages', sub: 'Enough to see progress, few enough to keep up to date.' },
      say: "Here's a pro tip. Aim for five to seven stages. Fewer, and you can't see where deals get stuck. More, and your team will stop moving cards, because it feels like admin. Simple pipelines get used.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 6.3', title: 'Working the *board*', sub: 'Drag deals, filter, list view and bulk actions.', cta: 'Kyntlo [Academy]' },
      say: "Your pipeline is ready! In the next lesson, we'll work the board day to day: moving deals, filtering, and making changes to many at once. See you there.",
    },
  ],
};
