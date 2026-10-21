// Track A · Module 6 · Lesson 4 — Pipeline reporting.
// Filmed on the Kyntlo demo workspace: the dashboard's opportunity widgets, board/list totals,
// lost reasons, and Reporting › Agent Reporting (Pro).
export default {
  id: 'A-6.4',
  title: 'Kyntlo Academy 6.4 — Pipeline reporting',
  description:
    'Turn your pipeline into numbers: opportunity status and value, conversion rate, the stage-by-stage funnel, stage distribution, column totals, lost reasons and won value per team member.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Pipeline reporting', 'Conversion rate', 'Sales funnel'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 6 · Lesson 4', title: 'Pipeline *reporting*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 6 · Lesson 4', title: 'Pipeline *reporting*', sub: 'Find the leaks, then fix them.' },
      say: "Welcome to the last lesson of module six. Now that your deals are on the board, let's read the numbers behind them. You'll learn where to see your conversion rate, how to spot the stage where deals get stuck, and what to do about it.",
      caption: "Welcome to the last lesson of Module 6. Now that your deals are on the board, let's read the numbers behind them. You'll learn where to see your conversion rate, how to spot the stage where deals get stuck, and what to do about it.",
    },
    {
      chapter: 'Where pipeline reports live',
      goto: '{demo}#/dashboard',
      settle: 1,
      say: "Your pipeline reports live on the dashboard. Every opportunity widget has a pipeline filter, so check that it's showing the pipeline you care about. Here, they're all on Patient Journey.",
      actions: [
        { at: 0.5, title: 'Pipeline reports', sub: 'On your dashboard', for: 3.6 },
        { at: 5.0, hover: '#w_status_filter' },
        { at: 5.2, highlight: '#w_status_filter', label: 'Pipeline filter', for: 3 },
        { at: 8.6, hover: '#w_funnel_filter' },
      ],
    },
    {
      chapter: 'Status & value',
      say: "Opportunity status tells you how many deals you have, and opportunity value tells you what they're worth. Watch the open number over time. If it shrinks week after week, you need more leads coming in at the top.",
      actions: [
        { at: 0.4, highlight: '#w_status', label: 'How many', for: 3.4 },
        { at: 3.8, highlight: '#w_value', label: 'How much', for: 3.4 },
        { at: 7.6, hover: '#w_status svg' },
        { at: 7.8, zoom: '#w_status', scale: 1.5, for: 4.4 },
      ],
    },
    {
      chapter: 'Conversion rate',
      say: "Conversion rate is the share of deals you've won. In Patient Journey it's twenty-five percent. Switch the filter to all pipelines, and it drops to nineteen percent, because the Invisalign and reactivation pipelines haven't closed anything yet this month.",
      caption: "Conversion rate is the share of deals you've won. In Patient Journey it's 25%. Switch the filter to all pipelines, and it drops to 19%, because the Invisalign and reactivation pipelines haven't closed anything yet this month.",
      actions: [
        { at: 0.4, hover: '#w_conversion svg' },
        { at: 0.6, zoom: '#w_conversion', scale: 1.6, for: 4.6 },
        { at: 6.0, click: '#w_conversion_filter' },
        { at: 7.4, click: '.menu button:has-text("All pipelines")' },
        { at: 8.4, zoom: '#w_conversion', scale: 1.6, for: 4 },
        { at: 13.2, click: '#w_conversion_filter' },
        { at: 14.2, click: '.menu button:has-text("Patient Journey")' },
      ],
    },
    {
      chapter: 'Find the leak in the funnel',
      say: "The funnel is where you find the leak. Sixteen deals entered, and four reached won. The percentages show how many made it from one stage to the next. Most stages keep three quarters or more. But only fifty-seven percent of treatment plans turn into a yes.",
      caption: 'The funnel is where you find the leak. 16 deals entered, and 4 reached Won. The percentages show how many made it from one stage to the next. Most stages keep three quarters or more. But only 57% of treatment plans turn into a yes.',
      actions: [
        { at: 0.4, hover: '#w_funnel .card-b' },
        { at: 0.6, zoom: '#w_funnel', scale: 1.5, for: 14 },
        { at: 15.0, hover: '#w_funnel .card-b > .row:nth-child(5)' },
        { at: 15.2, highlight: '#w_funnel .card-b > .row:nth-child(5)', label: 'The leak', for: 3.6 },
      ],
    },
    {
      chapter: 'Fixing the leak',
      say: "That tells you exactly where to focus. Patients get a plan, then go quiet. A follow-up call two days after the plan is sent, and a simple payment plan, could lift that number. You'll automate that follow-up in module nine.",
      caption: "That tells you exactly where to focus. Patients get a plan, then go quiet. A follow-up call two days after the plan is sent, and a simple payment plan, could lift that number. You'll automate that follow-up in Module 9.",
      actions: [
        { at: 0.6, title: 'Treatment Plan Sent → Won', sub: 'Follow up within 48 hours', for: 6 },
      ],
    },
    {
      chapter: 'Stage distribution',
      say: "Stage distribution shows where your open deals are sitting right now. Three are still new enquiries, so those people need contacting today. Remember, you can hide a stage from these charts in the pipeline's settings.",
      actions: [
        { at: 0.4, highlight: '#w_stages', label: 'Open deals by stage', for: 3.6 },
        { at: 4.2, hover: '#w_stages .card-b > .row > div:nth-child(1)' },
        { at: 4.4, zoom: '#w_stages', scale: 1.5, for: 5.4 },
      ],
    },
    {
      chapter: 'Totals on the board',
      say: "For a quick check without the dashboard, the board itself is a report. Each column shows its count and value, and the total for the whole pipeline sits at the top right.",
      actions: [
        { at: 0.4, click: '#sb_opportunities' },
        { at: 2.4, highlight: '#op_colh_3', label: 'Count & value per stage', for: 3.4 },
        { at: 6.4, hover: '#op_summary' },
        { at: 6.6, zoom: '#op_summary', scale: 2.0, for: 3.4 },
      ],
    },
    {
      chapter: 'Why deals are lost',
      say: "Next, look at why deals are lost. Open Advanced Filters, set the status to lost, and apply. Each lost card shows its reason. If price keeps coming up, review your pricing, or offer a payment plan.",
      actions: [
        { at: 1.2, click: '#op_filters' },
        { at: 2.6, click: '#opf_status' },
        { at: 3.6, click: '.menu button:text-is("Lost")' },
        { at: 4.8, click: '#opf_apply' },
        { at: 6.4, highlight: '#op_board', label: 'Lost deals and their reasons', for: 4 },
        { at: 7.0, hover: '#op_card_o16 .st' },
        { at: 7.2, zoom: '#op_card_o16', scale: 1.8, for: 3.6 },
        { at: 12.0, click: '#op_clear' },
      ],
    },
    {
      chapter: 'Won value per person',
      say: "On the Pro plan, Reporting also shows each team member's pipeline. Agent Reporting lists the deals each person owns, how many they've won, and the value of those wins.",
      actions: [
        { at: 0.4, click: '#sb_reporting' },
        { at: 1.6, click: '#tab_agents' },
        { at: 3.0, title: 'Agent Reporting', sub: 'Kyntlo Pro', for: 3.4 },
        { at: 6.6, highlight: '#rp_ag_value', label: 'Won value per person', for: 3.6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Fix *one stage* at a time', sub: 'Change one thing, then measure it for a month.' },
      say: "Here's a pro tip. Pick the one stage with the lowest percentage, and change just one thing about how you handle it. Then measure it again in a month. Small, focused fixes beat big overhauls every time.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 7', title: 'Funnels vs. *websites*', sub: 'Pick the right one for the job.', cta: 'Kyntlo [Academy]' },
      say: "That's module six complete! You can now build a pipeline, work it every day, and read its numbers. In module seven, we'll start building pages that bring new leads in, beginning with funnels versus websites. See you there!",
      caption: "That's Module 6 complete! You can now build a pipeline, work it every day, and read its numbers. In Module 7, we'll start building pages that bring new leads in, beginning with funnels versus websites. See you there!",
    },
  ],
};
