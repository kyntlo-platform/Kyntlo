// Track A · Module 8 · Lesson 5 — Social Planner.
// Filmed on the demo workspace (academy/demo-app): Marketing → Social Planner.
export default {
  id: 'A-8.5',
  title: 'Kyntlo Academy 8.5 — Social Planner',
  description:
    'Plan and schedule social media posts in Kyntlo: connect Facebook, Instagram, Google Business Profile, LinkedIn, TikTok and X, use the calendar and list views, write posts with Content AI, preview them per network and set up recurring posts.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Social media scheduling', 'Social Planner', 'Content AI'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 8 · Lesson 5', title: 'Schedule your *social posts*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 8 · Lesson 5', title: 'The *Social Planner*', sub: 'Plan a month of posts in one sitting.' },
      say: "Posting on social media every day can eat your time. In this lesson, you'll use the Social Planner to write, schedule and manage posts for all your social accounts, from one calendar.",
    },
    {
      chapter: 'Your social calendar',
      goto: '{demo}#/marketing/social-planner',
      settle: 1,
      say: "You'll find it under Marketing, Social Planner. The calendar shows everything at a glance. Blue posts are scheduled, and green ones are already published. The little icons show which accounts each post goes to.",
      actions: [
        { at: 0.4, title: 'Marketing → Social Planner', sub: 'All your social posts', for: 3.6 },
        { at: 4.4, highlight: '#sp_calendar', label: 'This month', for: 3.4 },
        { at: 8.2, zoom: '#sp_day_10_27', scale: 1.9, for: 4 },
        { at: 8.4, hover: '#sp_post_s1' },
      ],
    },
    {
      chapter: 'Connect your accounts',
      say: "First, connect your accounts. Click Connect accounts. You can link a Facebook page, Instagram, your Google Business Profile, LinkedIn, TikTok and X. Click Connect, log in to that network once, and you're set.",
      actions: [
        { at: 0.4, click: '#sp_accounts' },
        { at: 2.4, highlight: '#sp_acc_list', label: 'Facebook, Instagram, Google, LinkedIn, TikTok, X', for: 5 },
        { at: 8.6, click: '#sp_connect_tiktok' },
        { at: 11.2, click: '#sp_acc_done' },
      ],
    },
    {
      chapter: 'Week & list views',
      say: "Switch to Week for a closer look at timings. Or switch to List, where you can filter by scheduled, published, drafts and failed posts. Failed is worth checking now and then, usually it just means an account needs reconnecting.",
      actions: [
        { at: 0.4, click: '#sp_mode_week' },
        { at: 2.4, highlight: '#sp_calendar', label: 'Week view', for: 3 },
        { at: 5.8, click: '#sp_view_list' },
        { at: 7.4, highlight: '#sp_filters', label: 'Filter by status', for: 4 },
        { at: 12.4, click: '#sp_view_cal' },
        { at: 13.4, click: '#sp_mode_month' },
      ],
    },
    {
      chapter: 'Create a post',
      say: "Now let's create one. Click New Post. At the top, choose where it goes. Facebook and Instagram are already selected. Let's add LinkedIn too, so we reach local professionals.",
      actions: [
        { at: 0.4, click: '#sp_new' },
        { at: 2.6, highlight: '#sp_pick', label: 'Post to', for: 4 },
        { at: 7.2, click: '#sp_acc_linkedin' },
      ],
    },
    {
      chapter: 'Write with Content AI',
      say: "Stuck for words? Click Content AI, and describe the post you want. Here, an invitation to our Invisalign open evening. Click Generate, and in seconds you have a friendly draft, with emojis and hashtags. Always read it, and make it sound like you.",
      actions: [
        { at: 0.4, click: '#sp_ai' },
        { at: 1.6, click: '#sp_ai_prompt' },
        { at: 1.9, type: 'Invite patients to our Invisalign open evening on 12 November', delay: 30 },
        { at: 6.4, click: '#sp_ai_go' },
        { at: 9.0, zoom: '#sp_text', scale: 1.5, for: 4.6 },
      ],
    },
    {
      chapter: 'Add an image',
      say: "Posts with an image get far more attention, and Instagram needs one. Click Add media, and pick a file from your Media Storage. It appears straight away in the preview.",
      actions: [
        { at: 0.4, click: '#sp_media' },
        { at: 2.4, click: '#sp_media_evening' },
        { at: 4.4, highlight: '#sp_preview', label: 'Live preview', for: 3.4 },
      ],
    },
    {
      chapter: 'Preview each network',
      say: "On the right, preview the post for each network. Instagram shows the image first, with your caption underneath. LinkedIn looks more like Facebook. Check each one, because long text gets cut off in different places.",
      actions: [
        { at: 0.4, click: '#sp_prev_instagram' },
        { at: 1.2, zoom: '.sp-comp .r', scale: 1.4, for: 6 },
        { at: 7.6, click: '#sp_prev_linkedin' },
      ],
    },
    {
      chapter: 'Google Business posts',
      say: "Don't forget Google. Posts to your Google Business Profile show up on your listing in Google Search and Maps, right where local customers are looking. Keep them short, because Google only shows the first few lines, and they come with a handy Book button.",
      actions: [
        { at: 0.4, click: '#sp_acc_google' },
        { at: 1.6, click: '#sp_prev_google' },
        { at: 3.0, zoom: '.sp-comp .r', scale: 1.4, for: 6 },
        { at: 3.2, highlight: '#sp_preview', label: 'Google Business Profile', for: 5 },
      ],
    },
    {
      chapter: 'Schedule it',
      say: "Finally, pick when it goes out. Let's choose Thursday the fifth of November at six in the evening, when people are scrolling after work. Click Schedule, and there it is on the calendar. You could also post it now, or save it as a draft.",
      caption: "Finally, pick when it goes out. Let's choose Thursday 5 November at 18:00, when people are scrolling after work. Click Schedule, and there it is on the calendar. You could also post it now, or save it as a draft.",
      actions: [
        { at: 0.4, click: '#sp_date' },
        { at: 0.7, press: 'Control+A' },
        { at: 1.0, type: 'Thu 5 Nov 2026' },
        { at: 2.8, click: '#sp_time' },
        { at: 3.1, press: 'Control+A' },
        { at: 3.4, type: '18:00' },
        { at: 7.8, click: '#sp_schedule' },
        { at: 9.8, highlight: '#sp_day_11_5', label: 'Scheduled', for: 3.4 },
        { at: 10.0, zoom: '#sp_day_11_5', scale: 1.8, for: 3.4 },
      ],
    },
    {
      chapter: 'Recurring posts',
      say: "Some posts are worth repeating. Our Smile Tip Tuesday goes out every week. Open it, and you'll see Recurring post switched on, set to repeat weekly. It's perfect for evergreen tips, opening hours and reviews.",
      actions: [
        { at: 0.4, click: '#sp_prev' },
        { at: 2.0, click: '#sp_post_x7' },
        { at: 4.4, highlight: '#sp_recurring', label: 'Recurring post', for: 3 },
        { at: 7.6, zoom: '#sp_rec_opts', scale: 1.8, for: 3.6 },
        { at: 11.8, click: '.modal [data-close]' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Batch a *month* in one hour', sub: 'Plan themes per weekday, then schedule them all at once.' },
      say: "Here's a pro tip. Give each weekday a theme, like tips on Tuesday and team stories on Friday. Then set aside one hour a month to schedule everything at once. You'll post consistently without thinking about it every day.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 8.6', title: 'Trigger links & *link tracking*', sub: 'See who clicked, and act on it automatically.', cta: 'Kyntlo [Academy]' },
      say: "Your social media is now on autopilot. In the last lesson of this module, you'll learn trigger links, so you can see exactly who clicked, and act on it. See you there.",
    },
  ],
};
