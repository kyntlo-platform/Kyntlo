// Track A · Module 2 · Lesson 3 — Google & Facebook ads reporting (Pro).
// Filmed on the Kyntlo demo workspace: Reporting › Google Ads, Facebook Ads and Attribution Report.
export default {
  id: 'A-2.3',
  title: 'Kyntlo Academy 2.3 — Google & Facebook ads reporting',
  description:
    'Connect your Google Ads and Facebook ad accounts, read clicks, cost and cost per lead, and use the Attribution Report to see which sources actually bring in leads and revenue.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Google Ads', 'Facebook Ads', 'Attribution'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 2 · Lesson 3', title: 'Ads that *pay off*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 2 · Lesson 3', title: 'Google & Facebook *ads reporting*', sub: 'See what your ad spend really brings in.' },
      say: "Welcome back! If you spend money on ads, this lesson is for you. We'll connect your ad accounts, read the Google and Facebook reports, and then use attribution to see which sources actually turn into paying customers.",
    },
    {
      chapter: 'Where ads reporting lives',
      goto: '{demo}#/reporting/google-ads',
      setup: [{ run: (page) => page.evaluate(() => { KY.reporting.google = false; KY.go(location.hash); }) }],
      settle: 1,
      say: "Everything lives under Reporting, in the sidebar. These advanced reports are part of the Pro plan. Across the top, you'll find tabs for Google Ads, Facebook Ads, attribution, calls, appointments and your team.",
      actions: [
        { at: 0.5, hover: '#sb_reporting' },
        { at: 0.7, highlight: '#sb_reporting', label: 'Reporting', for: 2.6 },
        { at: 4.2, title: 'Advanced reporting', sub: 'Included in Kyntlo Pro', for: 3.6 },
        { at: 8.4, highlight: '#tabs', label: 'One tab per report', for: 4 },
      ],
    },
    {
      chapter: 'Connect Google Ads',
      say: "The first time, you'll see a connect button. Click it, sign in with the Google account that runs your ads, and choose the ad account for this business. Then save. New data can take up to a day to appear.",
      actions: [
        { at: 0.4, hover: '#rp_g_connect' },
        { at: 1.6, click: '#rp_g_connect' },
        { at: 3.4, highlight: '.modal', label: 'Pick your ad account', for: 4.2 },
        { at: 6.2, click: '#rp_g_acct_4821935520' },
        { at: 8.8, click: '#rp_g_save' },
      ],
    },
    {
      chapter: 'Reading the Google report',
      say: "Here's the last thirty days. Impressions is how often your ads were shown. Clicks is how many people visited. Click-through rate, or CTR, is the share who clicked, and average CPC is what each click cost you.",
      caption: "Here's the last 30 days. Impressions is how often your ads were shown. Clicks is how many people visited. Click-through rate, or CTR, is the share who clicked, and average CPC is what each click cost you.",
      actions: [
        { at: 0.4, zoom: '#rp_g_kpis', scale: 1.4, for: 13 },
        { at: 2.8, hover: '#rp_g_kpis .rp-kpi:nth-child(1)' },
        { at: 5.6, hover: '#rp_g_kpis .rp-kpi:nth-child(2)' },
        { at: 8.0, hover: '#rp_g_kpis .rp-kpi:nth-child(3)' },
        { at: 11.4, hover: '#rp_g_kpis .rp-kpi:nth-child(4)' },
      ],
    },
    {
      chapter: 'Cost per conversion',
      say: "The second row is about money. This month, Google cost eight hundred and forty-four pounds, and brought eleven conversions. That's about seventy-seven pounds for each one. Cost per conversion is the number to compare between campaigns.",
      caption: 'The second row is about money. This month, Google cost £844.56, and brought 11 conversions. That’s about £77 for each one. Cost per conversion is the number to compare between campaigns.',
      actions: [
        { at: 0.4, hover: '#rp_g_kpis .rp-kpi:nth-child(5)' },
        { at: 0.6, highlight: '#rp_g_kpis .rp-kpi:nth-child(5)', label: 'Total cost', for: 3 },
        { at: 4.8, highlight: '#rp_g_kpis .rp-kpi:nth-child(6)', label: 'Conversions', for: 2.6 },
        { at: 7.8, hover: '#rp_g_kpis .rp-kpi:nth-child(7)' },
        { at: 8.0, highlight: '#rp_g_kpis .rp-kpi:nth-child(7)', label: 'Cost per conversion', for: 3.4 },
        { at: 11.6, hover: '#rp_g_cpa' },
      ],
    },
    {
      chapter: 'Campaigns & keywords',
      say: "Scroll down for each campaign. Invisalign brings the most conversions, while the brand campaign is the cheapest, because those people already know you. Switch to Keywords to see exactly what people searched for.",
      actions: [
        { at: 0.4, scroll: 520, ms: 1200 },
        { at: 1.8, highlight: '#rp_g_table table tbody tr:nth-child(1)', label: 'Most conversions', for: 3.2 },
        { at: 5.6, highlight: '#rp_g_table table tbody tr:nth-child(4)', label: 'Cheapest per conversion', for: 3 },
        { at: 9.6, click: '#rp_g_tab_Keywords' },
        { at: 10.6, zoom: '#rp_g_table', scale: 1.3, for: 3.4 },
      ],
    },
    {
      chapter: 'Facebook Ads',
      say: "Facebook Ads works the same way, once you've connected your Facebook page and ad account. Here we spent six hundred and twelve pounds, and got fourteen leads. That's a cost per lead of about forty-four pounds.",
      caption: "Facebook Ads works the same way, once you've connected your Facebook page and ad account. Here we spent £612.40, and got 14 leads. That's a cost per lead of about £44.",
      actions: [
        { at: 0.3, click: '#tab_facebook-ads' },
        { at: 1.6, title: 'Facebook Ads', sub: 'Spend, leads and cost per lead', for: 3.4 },
        { at: 5.6, highlight: '#rp_f_kpis .rp-kpi:nth-child(5)', label: 'Amount spent', for: 2.8 },
        { at: 8.6, highlight: '#rp_f_kpis .rp-kpi:nth-child(6)', label: 'Leads', for: 2.2 },
        { at: 10.4, hover: '#rp_f_kpis .rp-kpi:nth-child(7)' },
        { at: 10.6, highlight: '#rp_f_kpis .rp-kpi:nth-child(7)', label: 'Cost per lead', for: 3 },
      ],
    },
    {
      chapter: 'Facebook campaigns',
      say: "The donut shows where those leads came from. The Invisalign free scan campaign brought ten of the fourteen. Below, you can drill down from campaigns, into ad sets and individual ads, to find the creative that's working.",
      caption: 'The donut shows where those leads came from. The Invisalign free scan campaign brought 10 of the 14. Below, you can drill down from campaigns, into ad sets and individual ads, to find the creative that’s working.',
      actions: [
        { at: 0.4, highlight: '#rp_f_leads', label: 'Leads by campaign', for: 4.6 },
        { at: 0.6, hover: '#rp_f_leads svg' },
        { at: 6.0, scroll: 480, ms: 1100 },
        { at: 7.6, hover: '#rp_f_table [data-ft="Ads"]' },
        { at: 9.0, click: '#rp_f_table [data-ft="Ads"]' },
        { at: 10.0, zoom: '#rp_f_table', scale: 1.3, for: 3.4 },
      ],
    },
    {
      chapter: 'Attribution report',
      say: "Clicks and leads are only half the story. The Attribution Report follows each lead all the way to revenue. In the last thirty days, forty-six leads came in, four became won deals, worth seven thousand one hundred pounds.",
      caption: 'Clicks and leads are only half the story. The Attribution Report follows each lead all the way to revenue. In the last 30 days, 46 leads came in, 4 became won deals, worth £7,100.',
      actions: [
        { at: 0.3, click: '#tab_attribution' },
        { at: 1.8, title: 'Attribution Report', sub: 'From first click to revenue', for: 3.6 },
        { at: 6.0, zoom: '.rp-kpis', scale: 1.4, for: 6.4 },
      ],
    },
    {
      chapter: 'Sources & campaigns',
      say: "Each row is a source. Paid social brought fourteen leads, and three thousand eight hundred pounds of revenue. Click a row to see the campaigns inside it, so you know exactly which ad earned that money.",
      caption: 'Each row is a source. Paid Social brought 14 leads, and £3,800 of revenue. Click a row to see the campaigns inside it, so you know exactly which ad earned that money.',
      actions: [
        { at: 0.4, scroll: 600, ms: 1200 },
        { at: 2.0, highlight: '#rp_attr_row_paid-social', label: 'Paid Social', for: 3.6 },
        { at: 6.6, click: '#rp_attr_row_paid-social' },
        { at: 8.0, zoom: '#rp_attr_table', scale: 1.3, for: 4.4 },
      ],
    },
    {
      chapter: 'First vs last attribution',
      say: "At the top, switch between first and last attribution. First gives credit to the source that brought someone in. Last credits the final touch before they converted. Looking at both tells you which channels find people, and which ones close them.",
      actions: [
        { at: 0.3, run: async (page) => page.evaluate(() => document.querySelector('#view').scrollTo({ top: 0, behavior: 'smooth' })) },
        { at: 1.4, highlight: '#rp_attr_model', label: 'Attribution model', for: 3.4 },
        { at: 8.4, click: '#rp_attr_last' },
        { at: 9.8, hover: '#rp_attr_rev' },
        { at: 10.0, highlight: '#rp_attr_rev', label: 'Revenue moves with the model', for: 4 },
      ],
    },
    {
      chapter: 'Making decisions',
      say: "So how do you use this? Compare cost per lead between channels, but judge them on revenue, not clicks. And give each campaign at least a month of data before you switch it off. A single good patient can pay for a whole month of ads.",
      actions: [
        { at: 0.4, move: [1100, 560] },
        { at: 1.0, title: 'Judge ads on revenue', sub: 'Not on clicks or likes', for: 5 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Tag every link with *UTM parameters*', sub: 'So attribution can tell your campaigns apart.' },
      say: "Here's a pro tip. Add UTM parameters to every link in your ads, emails and social posts, like U T M source equals facebook. Kyntlo reads them when someone fills in a form, so your attribution report can tell every campaign apart.",
      caption: 'Here’s a pro tip. Add UTM parameters to every link in your ads, emails and social posts, like utm_source=facebook. Kyntlo reads them when someone fills in a form, so your attribution report can tell every campaign apart.',
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 2.4', title: 'Call, appointment & *agent reports*', sub: 'Are you answering, are they showing up, who is doing what?', cta: 'Kyntlo [Academy]' },
      say: "Now you know what your ads really bring in. Next, we'll look at calls, appointments and your team's performance. See you there!",
    },
  ],
};
