// Track A · Module 2 · Lesson 2 — Customising dashboards.
// Filmed on the Kyntlo demo workspace. Resizing and rearranging are real mouse drags
// (mouse down → move → up), animated with the on-camera cursor.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const box = async (page, sel) => page.locator(sel).first().boundingBox();
// Drag from the centre of `from` to a point returned by `to(page, start)`.
function drag(from, to, ms = 1500) {
  return async (page) => {
    const a = await box(page, from);
    const [x1, y1] = [a.x + a.width / 2, a.y + a.height / 2];
    const [x2, y2] = await to(page, [x1, y1]);
    await page.evaluate(([x, y]) => window.__ky?.glide(x, y, 500), [x1, y1]);
    await page.mouse.move(x1, y1);
    await page.mouse.down();
    await sleep(250);
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
  id: 'A-2.2',
  title: 'Kyntlo Academy 2.2 — Customising dashboards',
  description:
    'Make the dashboard your own: edit mode, resizing and rearranging widgets, widget settings, adding widgets, and building a separate dashboard for each role in your team.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM dashboard', 'Custom dashboards'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 2 · Lesson 2', title: 'Customise your *dashboards*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 2 · Lesson 2', title: 'Customising your *dashboards*', sub: 'The right numbers, for the right person.' },
      say: "Welcome back! In this lesson, you'll learn to shape your dashboard around the way you work. We'll resize and rearrange widgets, add new ones, and build a separate dashboard for each role in your team.",
    },
    {
      chapter: 'Why customise',
      goto: '{demo}#/dashboard',
      settle: 1,
      say: "The default dashboard is built around your sales pipeline. That's perfect for an owner. But your receptionist cares about today's appointments and tasks, not revenue. A good dashboard answers the questions one person asks every day.",
      actions: [
        { at: 0.6, title: 'One dashboard per role', sub: 'Show each person what they need', for: 4.4 },
        { at: 5.6, hover: '#w_status' },
        { at: 9.4, hover: '#w_funnel' },
      ],
    },
    {
      chapter: 'Edit mode',
      say: "To change a dashboard, click the pencil icon at the top right. Each widget now shows a grip on the left for moving it, a pencil for its settings, and a handle in the bottom corner for resizing it.",
      actions: [
        { at: 0.5, click: '#dash_edit' },
        { at: 2.0, title: 'Edit mode', for: 2.6 },
        { at: 4.8, hover: '#dw_grip_0' },
        { at: 5.0, zoom: '#w_status .card-h', scale: 1.8, for: 4.6 },
        { at: 5.2, highlight: '#dw_grip_0', label: 'Drag to move', for: 2.2 },
        { at: 7.6, highlight: '#dw_cfg_0', label: 'Widget settings', for: 2.2 },
        { at: 10.2, hover: '#dw_resize_0' },
        { at: 10.4, highlight: '#dw_resize_0', label: 'Drag to resize', for: 2.6 },
      ],
    },
    {
      chapter: 'Resize a widget',
      say: "Let's make the funnel wider, so the stage names have more room. Drag its corner handle to the right. The width snaps to a twelve-column grid, so everything stays neatly lined up.",
      caption: "Let's make the funnel wider, so the stage names have more room. Drag its corner handle to the right. The width snaps to a 12-column grid, so everything stays neatly lined up.",
      actions: [
        { at: 0.6, hover: '#dw_resize_3' },
        { at: 2.6, run: drag('#dw_resize_3', async (page, [, y]) => { const g = await box(page, '#dash_grid'); return [g.x + g.width - 14, y]; }, 2200) },
        { at: 6.4, highlight: '#w_funnel', label: 'Full width', for: 3.4 },
      ],
    },
    {
      chapter: 'Rearrange widgets',
      say: "Next, rearrange. Put the number you check most in the top left, because that's where your eye lands first. I'll drag conversion rate by its grip, and drop it in front of opportunity status.",
      actions: [
        { at: 4.6, hover: '#dw_grip_2' },
        { at: 6.4, run: drag('#dw_grip_2', async (page) => { const b = await box(page, '#w_status'); return [b.x + 90, b.y + 140]; }, 2000) },
        { at: 9.8, highlight: '#w_conversion', label: 'Moved to the top left', for: 3 },
      ],
    },
    {
      chapter: 'Widget settings',
      say: "Every widget has its own settings. Click its pencil to rename it, choose which pipeline it reports on, or override the date range. I'll point conversion rate at all pipelines, then save.",
      actions: [
        { at: 0.5, click: '#dw_cfg_0' },
        { at: 2.0, highlight: '.drawer', label: 'Widget settings', for: 3 },
        { at: 6.4, click: '#ws_pipeline' },
        { at: 7.6, click: '.menu button:has-text("All pipelines")' },
        { at: 8.8, zoom: '.drawer .modal-b', scale: 1.4, for: 2.6 },
        { at: 11.6, click: '#ws_save' },
      ],
    },
    {
      chapter: 'Add a widget',
      say: "To add something new, click Add widget. Widgets are grouped by area: opportunities, appointments, contacts, tasks and reputation. I'll add the appointments widget, which shows bookings and your show rate.",
      actions: [
        { at: 0.5, click: '#dash_add' },
        { at: 2.0, highlight: '.drawer', label: 'Widget library', for: 4.6 },
        { at: 7.0, hover: '#dw_add_appointments' },
        { at: 9.6, click: '#dw_add_appointments' },
        { at: 10.6, run: async (page) => page.evaluate(() => document.querySelector('#w_appointments')?.scrollIntoView({ behavior: 'smooth', block: 'center' })) },
      ],
    },
    {
      chapter: 'Save your changes',
      say: "Happy with it? Click Save. If you change your mind while editing, Cancel puts everything back the way it was. Remember that changes to a shared dashboard show up for everyone who can see it, so if you just want to experiment, duplicate it first, and play with your own copy.",
      actions: [
        { at: 0.6, hover: '#dash_cancel' },
        { at: 0.8, highlight: '#dash_cancel', label: 'Undo all changes', for: 2.4 },
        { at: 3.6, click: '#dash_save' },
      ],
    },
    {
      chapter: 'A dashboard per role',
      say: "Now let's build a dashboard for the front desk. Click New, and give it a name. Start from a blank dashboard, and choose who can see it. I'll share this one with everyone.",
      actions: [
        { at: 0.3, run: async (page) => page.evaluate(() => document.querySelector('#view').scrollTo({ top: 0, behavior: 'smooth' })) },
        { at: 0.8, click: '#dash_new' },
        { at: 2.4, type: 'Reception', into: '#nd_name' },
        { at: 5.0, hover: '#nd_from' },
        { at: 5.2, highlight: '#nd_from', label: 'Blank dashboard', for: 2.4 },
        { at: 8.2, click: '#nd_share' },
        { at: 9.4, click: '.menu button:has-text("Everyone")' },
        { at: 10.6, click: '#nd_create' },
      ],
    },
    {
      chapter: 'Build it',
      speed: 1.3,
      say: "It opens empty, and ready to edit. I'll add appointments, tasks, and manual actions, which lists the calls and texts your workflows have queued for a person to make.",
      actions: [
        { at: 0.5, click: '#dash_add2' },
        { at: 1.6, click: '#dw_add_appointments' },
        { at: 3.0, click: '#dash_add' },
        { at: 4.2, click: '#dw_add_tasks' },
        { at: 5.6, click: '#dash_add' },
        { at: 6.8, click: '#dw_add_manual' },
        { at: 8.0, highlight: '#dash_grid', label: 'Reception dashboard', for: 2.6 },
      ],
    },
    {
      chapter: 'Switching dashboards',
      say: "Save it, and it's ready. Anyone can now switch between dashboards from the menu at the top left, and you can set the one you see first, from the three dots menu.",
      actions: [
        { at: 0.4, click: '#dash_save' },
        { at: 2.6, click: '#dash_switch' },
        { at: 3.6, highlight: '.menu', label: 'All your dashboards', for: 2.8 },
        { at: 6.8, click: '.menu button:has-text("Reception")' },
        { at: 8.0, click: '#dash_more' },
        { at: 9.0, highlight: '.menu', label: 'Dashboard options', for: 2.6 },
        { at: 11.8, click: '.menu button:has-text("Set as my default")' },
      ],
    },
    {
      chapter: 'Ideas for each role',
      say: "Not sure where to start? Here are some ideas. For the owner: opportunity value, conversion rate and the funnel. For the front desk: appointments, tasks and manual actions. And for whoever runs your marketing: the lead source report, next to conversion rate, so they can see which channels bring in patients, not just enquiries.",
      actions: [
        { at: 2.6, title: 'Owner', sub: 'Opportunity value · Conversion rate · Funnel', for: 4.4 },
        { at: 7.4, title: 'Front desk', sub: 'Appointments · Tasks · Manual actions', for: 4.4 },
        { at: 12.4, title: 'Marketing', sub: 'Lead source report · Conversion rate', for: 5.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Five widgets, *one question*', sub: 'If a widget never changes what you do, remove it.' },
      say: "Here's a pro tip. Keep each dashboard to about five widgets, and build it around one question, like: are we busy enough this week? If a widget never changes what anyone does, remove it. A short dashboard gets looked at. A long one gets ignored.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 2.3', title: 'Google & Facebook *ads reporting*', sub: 'See what your ad spend really brings in.', cta: 'Kyntlo [Academy]' },
      say: "Great work! Next, we'll connect your ad accounts, and see which campaigns turn into real leads and real revenue. See you in the next lesson.",
    },
  ],
};
