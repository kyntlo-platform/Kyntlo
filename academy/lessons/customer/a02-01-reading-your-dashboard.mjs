// Track A · Module 2 · Lesson 1 — Reading your dashboard.
// Filmed on the Kyntlo demo workspace (academy/demo-app). Numbers are the demo data's
// Patient Journey pipeline: 16 opportunities (9 open, 4 won, 2 lost, 1 abandoned).
export default {
  id: 'A-2.1',
  title: 'Kyntlo Academy 2.1 — Reading your dashboard',
  description:
    'Understand every part of your Kyntlo dashboard: navigation, dashboards and date ranges, opportunity status, opportunity value, conversion rate, the funnel and stage distribution, and per-widget pipeline filters.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM dashboard', 'Sales reporting'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 2 · Lesson 1', title: 'Reading your *dashboard*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 2 · Lesson 1', title: 'Reading your *dashboard*', sub: 'Know exactly how your business is doing, at a glance.' },
      say: "Hi there! In this lesson, we'll explore your Kyntlo dashboard, the first screen you see every time you log in. By the end, you'll know what every number means, and how to use it to make better decisions.",
    },
    {
      chapter: 'Your home screen',
      goto: '{demo}#/dashboard',
      settle: 1,
      say: "Here it is. Think of the dashboard as your business at a glance: your sales pipeline, the money in it, and how well you're turning enquiries into paying customers, all on one screen.",
      actions: [
        { at: 0.6, title: 'Dashboard', sub: 'Your business at a glance', for: 4 },
        { at: 4.8, move: [1100, 520] },
      ],
    },
    {
      chapter: 'Where the numbers come from',
      say: "Most of these widgets read from Opportunities, the deals in your sales pipelines. So the more carefully your team keeps each deal up to date, the more you can trust this screen.",
      actions: [
        { at: 0.6, hover: '#sb_opportunities' },
        { at: 0.8, highlight: '#sb_opportunities', label: 'Your deals live here', for: 3.6 },
        { at: 5.2, hover: '#w_status' },
      ],
    },
    {
      chapter: 'Finding your way around',
      say: "On the left is the sidebar. At the top, you'll see which business account you're in, and a search bar. Press control K from anywhere to jump straight to a contact or a page.",
      actions: [
        { at: 0.3, highlight: '#sidebar', label: 'Navigation', for: 2.8 },
        { at: 3.2, hover: '#sb_account' },
        { at: 3.4, highlight: '#sb_account', label: 'Your business account', for: 2.8 },
        { at: 6.6, hover: '#sb_search' },
        { at: 6.8, zoom: '#sb_search', scale: 2.0, for: 3.6 },
        { at: 7.0, highlight: '#sb_search', label: 'Ctrl + K to search', for: 3.4 },
      ],
    },
    {
      chapter: 'The sidebar',
      say: "Below that are your tools. The everyday ones sit at the top: conversations, calendars, contacts, opportunities and payments. Further down are AI agents, marketing, automation and your websites. Settings is always at the very bottom.",
      actions: [
        { at: 2.6, hover: '#sb_conversations' },
        { at: 3.6, hover: '#sb_calendars' },
        { at: 4.5, hover: '#sb_contacts' },
        { at: 5.4, hover: '#sb_opportunities' },
        { at: 6.4, hover: '#sb_payments' },
        { at: 8.0, hover: '#sb_ai-agents' },
        { at: 9.0, hover: '#sb_marketing' },
        { at: 9.8, hover: '#sb_automation' },
        { at: 10.6, hover: '#sb_sites' },
        { at: 12.0, hover: '#sb_settings' },
        { at: 12.2, highlight: '#sb_settings', label: 'Settings', for: 2.4 },
      ],
    },
    {
      chapter: 'Dashboards & date range',
      say: "At the top of the page, choose which dashboard you're looking at, or click New to create your own. On the right, the date range controls the period that every widget shows. Here, it's the last thirty days.",
      actions: [
        { at: 0.4, hover: '#dash_switch' },
        { at: 0.6, highlight: '#dash_switch', label: 'Switch dashboards', for: 3 },
        { at: 2.8, hover: '#dash_new' },
        { at: 5.6, click: '#dash_range' },
        { at: 6.4, highlight: '.menu', label: 'Pick a period', for: 3.4 },
        { at: 6.6, zoom: '.menu', scale: 1.6, for: 3.4 },
        { at: 10.4, click: '.menu button:has-text("Last 30 days")' },
      ],
    },
    {
      chapter: 'Opportunity status',
      say: "Now for the widgets. Opportunity status counts the deals in your pipeline, and shows where they stand. Here there are sixteen: nine still open, four won, two lost, and one abandoned.",
      caption: 'Now for the widgets. Opportunity status counts the deals in your pipeline, and shows where they stand. Here there are 16: 9 still open, 4 won, 2 lost, and 1 abandoned.',
      actions: [
        { at: 0.4, highlight: '#w_status', label: 'Opportunity status', for: 3.4 },
        { at: 4.0, hover: '#w_status svg' },
        { at: 4.2, zoom: '#w_status', scale: 1.5, for: 6.6 },
      ],
    },
    {
      chapter: 'Opportunity value',
      say: "Opportunity value turns those deals into money. Each bar shows what the deals with that status are worth. Open deals add up to nearly seventeen thousand pounds, and the whole pipeline is worth twenty-four thousand seven hundred and forty.",
      caption: 'Opportunity value turns those deals into money. Each bar shows what the deals with that status are worth. Open deals add up to nearly £17,000, and the whole pipeline is worth £24,740.',
      actions: [
        { at: 0.3, highlight: '#w_value', label: 'Opportunity value', for: 3.4 },
        { at: 3.8, zoom: '#w_value', scale: 1.6, for: 8.4 },
        { at: 4.4, hover: '#w_value .card-b' },
        { at: 9.4, hover: '#w_value .dw-total' },
      ],
    },
    {
      chapter: 'Conversion rate',
      say: "Conversion rate is the number to watch. It's the share of your opportunities that you've won. Twenty-five percent means one in every four became a paying patient. Underneath is the revenue from those wins: seven thousand one hundred pounds.",
      caption: "Conversion rate is the number to watch. It's the share of your opportunities that you've won. 25% means one in every four became a paying patient. Underneath is the revenue from those wins: £7,100.",
      actions: [
        { at: 0.3, hover: '#w_conversion svg' },
        { at: 0.5, zoom: '#w_conversion', scale: 1.6, for: 6.4 },
        { at: 9.2, hover: '#w_conversion .dw-won' },
        { at: 9.4, highlight: '#w_conversion .dw-won', label: 'Won revenue', for: 3.4 },
      ],
    },
    {
      chapter: 'Funnel & stages',
      say: "Further down, the funnel shows how many deals reach each stage, and what percentage make it from one stage to the next. Stage distribution shows where your open deals are sitting right now.",
      actions: [
        { at: 0.4, highlight: '#w_funnel', label: 'Funnel', for: 3.8 },
        { at: 0.6, hover: '#w_funnel .card-b' },
        { at: 2.6, zoom: '#w_funnel', scale: 1.5, for: 4 },
        { at: 7.4, highlight: '#w_stages', label: 'Stage distribution', for: 3.4 },
        { at: 7.6, hover: '#w_stages .card-b' },
      ],
    },
    {
      chapter: 'Filtering a widget',
      say: "Each widget has its own filter. Right now they all show the Patient Journey pipeline. Pick a different pipeline, and only that widget changes, so you can compare two pipelines side by side.",
      actions: [
        { at: 0.4, hover: '#w_status_filter' },
        { at: 0.6, highlight: '#w_status_filter', label: 'Per-widget filter', for: 3 },
        { at: 4.6, click: '#w_status_filter' },
        { at: 6.0, click: '.menu button:has-text("Invisalign")' },
        { at: 7.0, highlight: '#w_status', label: 'Now showing Invisalign', for: 3.6 },
      ],
    },
    {
      chapter: 'Ask AI',
      say: "And if you ever have a question about your numbers, click Ask AI in the top corner. It can explain a trend, or point you to what needs your attention today.",
      actions: [
        { at: 0.4, hover: '#tb_ask' },
        { at: 0.6, zoom: '#tb_ask', scale: 2.0, for: 4.2 },
        { at: 1.4, highlight: '#tb_ask', label: 'Ask AI', for: 3.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Check your *conversion rate* weekly', sub: 'Small changes there have the biggest effect on revenue.' },
      say: "Here's a pro tip. Make checking your conversion rate a weekly habit, on the same day each week. If it drops, look first at how quickly your team follows up with new enquiries. Speed is usually the reason.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 2.2', title: 'Customising your *dashboards*', sub: 'Add, resize and arrange widgets for every role.', cta: 'Kyntlo [Academy]' },
      say: "That's your dashboard! In the next lesson, I'll show you how to build your own dashboards, with exactly the widgets each person on your team needs. See you there.",
    },
  ],
};
