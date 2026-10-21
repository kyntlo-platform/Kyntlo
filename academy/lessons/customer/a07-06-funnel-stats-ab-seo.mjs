// Track A · Module 7 · Lesson 6 — Funnel stats, A/B tests & SEO.
// Filmed on the demo workspace (academy/demo-app), screen: Sites → Funnels.
export default {
  id: 'A-7.6',
  title: 'Kyntlo Academy 7.6 — Funnel stats, A/B tests & SEO',
  description:
    'Measure and improve your funnels: read page views, opt-ins and opt-in rates, find where visitors drop off, run an A/B split test and declare a winner, then set SEO meta data and tracking code.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Funnel analytics', 'A/B testing', 'SEO'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 7 · Lesson 6', title: 'Stats, *A/B tests* & SEO' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 7 · Lesson 6', title: 'Funnel stats, *A/B tests* & SEO', sub: 'Measure, test and improve.' },
      say: "Publishing a funnel is only the start. In this lesson, you'll learn to read your funnel stats, run an A B test to find out what works better, and set up SEO so people can find your pages.",
      caption: "Publishing a funnel is only the start. In this lesson, you'll learn to read your funnel stats, run an A/B test to find out what works better, and set up SEO so people can find your pages.",
    },
    {
      chapter: 'Funnel stats',
      goto: '{demo}#/sites/funnels/f1/stats',
      settle: 1,
      say: "Open your funnel and click Stats. Across the top are the headline numbers: how many people viewed the first page, how many opted in, and your opt-in rate. Here, four thousand eight hundred and twenty views turned into four hundred and twelve leads.",
      caption: 'Open your funnel and click Stats. Across the top are the headline numbers: how many people viewed the first page, how many opted in, and your opt-in rate. Here, 4,820 views turned into 412 leads.',
      actions: [
        { at: 0.4, highlight: '#fn_tab_stats', label: 'Stats', for: 2.4 },
        { at: 3.4, highlight: '#fn_stats_tiles', label: 'The headline numbers', for: 5 },
        { at: 9.6, zoom: '#fn_stats_tiles', scale: 1.4, for: 4.4 },
      ],
    },
    {
      chapter: 'All vs. uniques',
      say: "The table breaks this down step by step. All counts every visit. Uniques counts each person once, even if they came back three times. Uniques is the truer picture of how many people you reached.",
      actions: [
        { at: 0.4, highlight: '#fn_stats_table', label: 'Step by step', for: 3.4 },
        { at: 4.6, zoom: '#fn_stat_s1', scale: 1.5, for: 6.4 },
        { at: 4.8, highlight: '#fn_stat_s1', label: 'All vs. uniques', for: 6 },
      ],
    },
    {
      chapter: 'Find the leak',
      say: "Now look for the biggest drop. Of the people who reached the booking page, only forty three percent booked. That's the step to work on first, because small gains there turn straight into appointments. Use the date range to compare periods.",
      caption: "Now look for the biggest drop. Of the people who reached the booking page, only 43% booked. That's the step to work on first, because small gains there turn straight into appointments. Use the date range to compare periods.",
      actions: [
        { at: 0.4, highlight: '#fn_stat_s2', label: '43% book', for: 5 },
        { at: 11.6, click: '#fn_stats_range' },
        { at: 12.8, click: '.menu button:has-text("Last 90 days")' },
      ],
    },
    {
      chapter: 'Create an A/B test',
      say: "Instead of guessing what to change, test it. Go to Steps, open the step you want to improve, and click Create A B Test. Kyntlo makes Variation B as a copy of your page.",
      caption: "Instead of guessing what to change, test it. Go to Steps, open the step you want to improve, and click Create A/B Test. Kyntlo makes Variation B as a copy of your page.",
      actions: [
        { at: 0.4, click: '#fn_tab_steps' },
        { at: 4.0, click: '#fn_ab_create' },
        { at: 5.6, highlight: '.modal', label: 'Variation B = a copy', for: 2.6 },
        { at: 8.4, click: '#fn_ab_confirm' },
      ],
    },
    {
      chapter: 'Change one thing',
      speed: 1.2,
      say: "Edit Variation B and change just one thing, so you know what made the difference. The headline is a great place to start. Save, then head back.",
      actions: [
        { at: 0.4, click: '#fn_edit_b' },
        { at: 2.6, click: '#pb_el_headline' },
        { at: 3.4, press: 'Control+A' },
        { at: 3.6, type: 'See your new smile before you start.', delay: 40 },
        { at: 7.4, click: '#pb_save' },
        { at: 8.6, click: '#pb_back' },
      ],
    },
    {
      chapter: 'Traffic split',
      say: "Both versions are now live. Visitors are split between them, fifty fifty by default. Use the slider if you'd rather send less traffic to the new version while you build confidence.",
      caption: "Both versions are now live. Visitors are split between them, 50/50 by default. Use the slider if you'd rather send less traffic to the new version while you build confidence.",
      actions: [
        { at: 0.4, highlight: '#fn_ab_panel', label: 'A/B test running', for: 3.6 },
        { at: 4.6, zoom: '#fn_ab_panel', scale: 1.5, for: 4.4 },
        { at: 5.0, hover: '#fn_ab_slider' },
      ],
    },
    {
      chapter: 'Reading results',
      goto: '{demo}#/sites/funnels/f2/stats',
      settle: 1,
      say: "Here's a test Bloom has been running for three weeks on the whitening offer. Variation B converts at nine and a half percent, against six point eight for A. With over a thousand visitors each, that's a result you can trust.",
      caption: "Here's a test Bloom has been running for three weeks on the whitening offer. Variation B converts at 9.5%, against 6.8% for A. With over a thousand visitors each, that's a result you can trust.",
      actions: [
        { at: 0.4, highlight: '#fn_stat_w1_a', label: 'Variation A · 6.8%', for: 3.6 },
        { at: 4.6, highlight: '#fn_stat_w1_b', label: 'Variation B · 9.5%', for: 4 },
        { at: 4.8, zoom: '#fn_stats_table', scale: 1.3, for: 5 },
      ],
    },
    {
      chapter: 'Declare a winner',
      say: "So go to Steps and click Declare Winner on Variation B. All traffic now goes to the better page, and you can start your next test.",
      actions: [
        { at: 0.4, click: '#fn_tab_steps' },
        { at: 2.4, click: '#fn_win_b' },
        { at: 4.2, click: '#fn_win_confirm' },
      ],
    },
    {
      chapter: 'SEO meta data',
      goto: '{demo}#/sites/funnels/f1/builder/s1',
      settle: 1.2,
      say: "Now SEO. In the page builder, open Settings, then SEO Meta Data. The title and description are what Google shows in search results, and what appears when someone shares your link.",
      actions: [
        { at: 0.6, click: '#pb_settings' },
        { at: 2.6, highlight: '#pb_seo_title', label: 'Title', for: 2.6 },
        { at: 5.4, highlight: '#pb_seo_desc', label: 'Description', for: 2.6 },
        { at: 8.4, highlight: '#pb_seo_preview', label: 'Search preview', for: 3 },
      ],
    },
    {
      chapter: 'Writing a good title',
      speed: 1.2,
      say: "Keep the title under sixty characters, with the service and the location people search for. The preview updates as you type. Add a social image too, so shared links look great.",
      caption: 'Keep the title under 60 characters, with the service and the location people search for. The preview updates as you type. Add a social image too, so shared links look great.',
      actions: [
        { at: 0.4, click: '#pb_seo_title' },
        { at: 0.8, press: 'Control+A' },
        { at: 1.0, type: 'Free Invisalign Scan in London | Bloom Dental', delay: 40 },
        { at: 6.0, zoom: '#pb_seo_preview', scale: 1.4, for: 3 },
        { at: 9.4, highlight: '#pb_seo_image', label: 'Social image', for: 2.4 },
        { at: 12.0, click: '#pb_set_save' },
      ],
    },
    {
      chapter: 'Tracking code',
      goto: '{demo}#/sites/funnels/f1/settings',
      settle: 1,
      say: "Finally, to measure your ads, paste your Meta Pixel or Google tag into the head tracking code in the funnel's Settings. It's added to every step automatically.",
      actions: [
        { at: 0.4, highlight: '#fn_set_head', label: 'Meta Pixel · Google tag', for: 4 },
        { at: 7.0, click: '#fn_set_save' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Test *one change* at a time', sub: 'And wait for a few hundred visitors per version.' },
      say: "Here's a pro tip. Test one change at a time, and wait until each version has had a few hundred visitors before you decide. Small samples can fool you.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 7.7', title: 'Blogs & *QR codes*', sub: 'Publish content and track offline traffic.', cta: 'Kyntlo [Academy]' },
      say: "Now you can measure and improve every funnel. Next, we'll publish blog posts and create QR codes to bring offline visitors online. See you there.",
    },
  ],
};
