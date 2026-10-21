// Track A · Module 6 · Lesson 3 — Working the board.
// Filmed on the Kyntlo demo workspace. The card move is a real HTML drag-and-drop driven by
// Playwright's mouse (down → move → up); the on-camera cursor glides along with it.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const box = async (page, sel) => page.locator(sel).first().boundingBox();
function dragCard(card, column, ms = 1700) {
  return async (page) => {
    const a = await box(page, card), c = await box(page, column);
    const [x1, y1] = [a.x + a.width / 2, a.y + 40];
    const [x2, y2] = [c.x + c.width / 2, c.y + 200];
    await page.evaluate(([x, y]) => window.__ky?.glide(x, y, 500), [x1, y1]);
    await page.mouse.move(x1, y1);
    await page.mouse.down();
    await sleep(200);
    // Native drag events don't fire mousemove, so the drawn cursor glides alongside.
    page.evaluate(([x, y, t]) => window.__ky?.glide(x, y, t), [x2, y2, ms]).catch(() => {});
    const steps = 30;
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
  id: 'A-6.3',
  title: 'Kyntlo Academy 6.3 — Working the board',
  description:
    'Work your pipeline every day: drag deals between stages, move them from the card menu, update status and lost reasons, add opportunities, search and filter, switch to list view and use bulk actions.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Sales pipeline', 'Opportunities', 'Bulk actions'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 6 · Lesson 3', title: 'Working the *board*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 6 · Lesson 3', title: 'Working the *board*', sub: 'Move deals, find them fast, update many at once.' },
      say: "Welcome back! Your pipeline only helps if it's kept up to date. In this lesson, you'll learn the everyday moves: dragging deals, updating them, finding them quickly, and changing lots of them at once.",
    },
    {
      chapter: 'Drag a deal',
      goto: '{demo}#/opportunities',
      settle: 1,
      say: "Olivia has just replied to our first message, so her deal is no longer a new enquiry. Grab her card, and drag it into the contacted column. The counts and totals at the top update straight away.",
      actions: [
        { at: 0.6, hover: '#op_card_o1' },
        { at: 0.8, highlight: '#op_card_o1', label: 'Olivia replied', for: 3 },
        { at: 4.8, run: dragCard('#op_card_o1', '#op_col_1') },
        { at: 8.6, hover: '#op_colh_1' },
        { at: 8.8, zoom: '#op_colh_1', scale: 1.9, for: 3.6 },
      ],
    },
    {
      chapter: 'Move from the card menu',
      say: "On a long board, or on your phone, dragging can be fiddly. Instead, open the three dots menu on any card, and choose the stage to move it to. Daniel's consultation is now booked.",
      actions: [
        { at: 2.0, hover: '#op_more_o3' },
        { at: 4.6, click: '#op_more_o3' },
        { at: 5.6, highlight: '.menu', label: 'Move to any stage', for: 3.4 },
        { at: 9.4, click: '.menu button:has-text("Move to: Consultation Booked")' },
      ],
    },
    {
      chapter: 'Mark a deal as won',
      say: "Ethan has accepted his implant treatment plan. Click his card to open it, change the status to won, and click update. Remember, it's the status that your reports count.",
      actions: [
        { at: 0.4, hover: '#op_card_o7' },
        { at: 2.6, click: '#op_card_o7' },
        { at: 4.4, click: '#op_f_status' },
        { at: 5.6, click: '.menu button:text-is("Won")' },
        { at: 6.6, zoom: '#op_f_status', scale: 1.8, for: 2.6 },
        { at: 9.6, click: '#op_f_save' },
      ],
    },
    {
      chapter: 'Lost, with a reason',
      say: "Noah has decided to stay with his current dentist. Open his card, set the status to lost, and pick a lost reason. Chose another clinic. That reason will feed your reporting later.",
      actions: [
        { at: 0.6, click: '#op_card_o13' },
        { at: 2.4, click: '#op_f_status' },
        { at: 3.4, click: '.menu button:text-is("Lost")' },
        { at: 4.8, click: '#op_f_lost' },
        { at: 6.2, click: '.menu button:has-text("Chose another clinic")' },
        { at: 7.2, zoom: '#op_f_lostwrap', scale: 1.8, for: 2.8 },
        { at: 10.4, click: '#op_f_save' },
      ],
    },
    {
      chapter: 'Add an opportunity',
      say: "To add a new deal, click Add opportunity. Search for the contact. Jack Morris is back, and this time he's interested in Invisalign. Finish the name, add the value, and choose where the lead came from.",
      actions: [
        { at: 0.4, click: '#op_add' },
        { at: 1.8, type: 'Jack', into: '#op_f_contact' },
        { at: 3.4, click: '#op_f_suggest button:has-text("Jack Morris")' },
        { at: 6.4, type: 'Invisalign', into: '#op_f_name' },
        { at: 8.6, type: '3200', into: '#op_f_value' },
        { at: 10.2, click: '#op_f_source' },
        { at: 11.2, click: '.menu button:has-text("Instagram")' },
      ],
    },
    {
      chapter: 'Create it',
      say: "Pipeline and stage are already filled in, and the owner is you. Click create, and the new deal appears at the top of the first column.",
      actions: [
        { at: 0.4, highlight: '#op_f_pipeline', label: 'Pipeline & stage', for: 2.8 },
        { at: 3.4, hover: '#op_f_owner' },
        { at: 5.2, click: '#op_f_save' },
        { at: 6.4, highlight: '#op_col_0 .op-card:first-child', label: 'New deal', for: 3 },
      ],
    },
    {
      chapter: 'Search & filters',
      say: "To find a deal fast, type in the search box. Names, contacts and emails all match. For more control, Advanced Filters narrows the board by status, owner, source, value or tags.",
      actions: [
        { at: 0.4, type: 'implant', into: '#op_search' },
        { at: 2.8, highlight: '#op_board', label: 'Only implant deals', for: 2.6 },
        { at: 5.6, click: '#op_search' },
        { at: 5.8, press: 'Control+A' },
        { at: 6.0, press: 'Backspace' },
        { at: 7.0, click: '#op_filters' },
        { at: 8.4, highlight: '.drawer', label: 'Advanced Filters', for: 3.6 },
      ],
    },
    {
      chapter: 'Filter by owner',
      say: "I'll show just Sarah's deals, which is great for a one-to-one with her. Apply, and the active filter shows at the top. Click clear to see everything again.",
      actions: [
        { at: 0.4, click: '#opf_owner' },
        { at: 1.4, click: '.menu button:has-text("Sarah Mitchell")' },
        { at: 2.8, click: '#opf_apply' },
        { at: 4.4, highlight: '.op-bar', label: 'Owner: Sarah Mitchell', for: 3 },
        { at: 7.8, click: '#op_clear' },
      ],
    },
    {
      chapter: 'List view',
      say: "Prefer a spreadsheet? Switch to list view. You get every deal in one table, with its stage, status, value and owner, and a total at the bottom. Click any row to open it.",
      actions: [
        { at: 0.4, click: '#op_view_list' },
        { at: 1.8, highlight: '#op_table thead', label: 'One row per deal', for: 3.6 },
        { at: 6.0, scroll: 600, ms: 1000 },
        { at: 7.4, highlight: '#op_table tfoot', label: 'Total value', for: 2.6 },
        { at: 10.2, scroll: -600, ms: 900 },
      ],
    },
    {
      chapter: 'Bulk actions',
      say: "List view is also where you change many deals at once. Tick the ones you want, and a bar of bulk actions appears. James is off next week, so I'll reassign two of his open deals to Priya.",
      actions: [
        { at: 2.6, click: '#op_row_o2 input' },
        { at: 3.4, click: '#op_row_o4 input' },
        { at: 4.4, highlight: '#op_bulk', label: 'Bulk actions', for: 3.6 },
        { at: 8.6, click: '#op_bulk_owner' },
        { at: 10.0, click: '.menu button:has-text("Priya Shah")' },
      ],
    },
    {
      chapter: 'Back to the board',
      say: "You can also move stage, change status, add a tag or delete in bulk. When you're done, switch back to the board view.",
      actions: [
        { at: 0.6, hover: '#op_views' },
        { at: 3.8, click: '#op_view_board' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Start the day on the *board*', sub: 'Every card should have a clear next step.' },
      say: "Here's a pro tip. Open the board first thing each morning, and work from left to right. Every card should have a clear next step. If a deal hasn't moved in two weeks, either chase it today, or mark it abandoned, so your numbers stay honest.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 6.4', title: 'Pipeline *reporting*', sub: 'Conversion rates, values and stage distribution.', cta: 'Kyntlo [Academy]' },
      say: "Nicely done! In the next lesson, we'll turn all this activity into numbers: conversion rates, pipeline value, and where deals get stuck. See you there.",
    },
  ],
};
