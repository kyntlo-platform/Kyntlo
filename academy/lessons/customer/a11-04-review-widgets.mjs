// Track A · Module 11 · Lesson 4 — Review widgets.
export default {
  id: 'A-11.4',
  title: 'Kyntlo Academy 11.4 — Review widgets',
  description:
    'Build a review widget in Kyntlo: choose a layout, sources, minimum rating and theme, then copy the embed code onto your website or Kyntlo funnel.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Reputation management', 'Review widget', 'Social proof'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 11 · Lesson 4', title: 'Reviews on your *website*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 11 · Lesson 4', title: 'Review *widgets*', sub: 'Real proof from real customers, on your website.' },
      say: "In this lesson, you'll turn your best reviews into a live widget on your website, so visitors see real proof from real customers, updated automatically. No coding needed, and it takes about five minutes.",
    },
    {
      chapter: 'Why widgets',
      goto: '{demo}#/reputation/widgets',
      settle: 1,
      say: "Social proof sells. A visitor who sees dozens of five-star reviews is far more likely to book. Widgets show your Google and Facebook reviews on any website, including your Kyntlo funnels. And unlike screenshots of reviews, a widget is live, so visitors can trust it's real.",
      actions: [
        { at: 0.6, title: 'Widgets', sub: 'Your reviews, on your website', for: 4 },
        { at: 6.8, hover: '#wg_table' },
        { at: 7.0, highlight: '#wg_table', label: 'Your widgets', for: 3.4 },
      ],
    },
    {
      chapter: 'The widget builder',
      say: "Click New Widget to open the builder. Your settings are on the left, and a live preview of your website is on the right, so you can see every change before anyone else does.",
      actions: [
        { at: 0.6, click: '#wg_new' },
        { at: 3.0, highlight: '#wg_settings', label: 'Settings', for: 2.6 },
        { at: 5.8, highlight: '#wg_preview', label: 'Live preview', for: 2.8 },
      ],
    },
    {
      chapter: 'Name',
      say: "Give it a name you'll recognise, like the page it's going on. You can create as many widgets as you need, one for each page or website.",
      actions: [
        { at: 0.4, click: '#wg_name' },
        { at: 0.8, press: 'Control+A' },
        { at: 1.0, type: 'Homepage reviews' },
      ],
    },
    {
      chapter: 'Layout',
      say: "Now choose a layout. A carousel slides through reviews and saves space. A list suits a dedicated reviews page. A badge is a small rating seal for your header or footer. And a grid shows lots of reviews at once. Pick the one that fits the space on your page.",
      actions: [
        { at: 0.8, click: '#wg_layout_carousel' },
        { at: 4.6, click: '#wg_layout_list' },
        { at: 7.4, click: '#wg_layout_badge' },
        { at: 10.6, click: '#wg_layout_grid' },
        { at: 11.2, zoom: '#wg_preview', scale: 1.2, for: 2.4 },
      ],
    },
    {
      chapter: 'Sources & ratings',
      say: "Choose your sources, Google and Facebook, and which ratings to show. Four stars and up is a good balance: it looks great, and it still feels genuine. A wall of only five-star reviews can actually look less believable.",
      actions: [
        { at: 0.6, hover: '#wg_src_google' },
        { at: 0.8, highlight: '#wg_src_google', label: 'Sources', for: 2.4 },
        { at: 4.4, click: '#wg_min_5-only' },
        { at: 6.6, click: '#wg_min_4-up' },
        { at: 7.0, highlight: '#wg_min_4-up', label: '4 stars and up', for: 3 },
      ],
    },
    {
      chapter: 'Theme & display',
      say: "Match your website with a light or dark theme, and choose what each review shows: the rating summary, reviewer photos and dates. Every change shows up in the preview straight away.",
      actions: [
        { at: 0.8, click: '#wg_theme_dark' },
        { at: 2.8, click: '#wg_theme_light' },
        { at: 5.2, hover: '#wg_show_header' },
        { at: 5.4, highlight: '#wg_show_header', label: 'What to show', for: 2.6 },
        { at: 7.4, click: '#wg_show_dates' },
      ],
    },
    {
      chapter: 'Save',
      say: "Happy with it? Click Save widget. You can come back and change it whenever you like.",
      actions: [
        { at: 0.4, click: '#wg_save' },
      ],
    },
    {
      chapter: 'Embed code',
      say: "Now click Get code. This short snippet is all your website needs. You don't need to be a developer. Click Copy code.",
      actions: [
        { at: 0.4, click: '#wg_code' },
        { at: 2.0, hover: '#wg_codebox' },
        { at: 2.2, highlight: '#wg_codebox', label: 'Your embed code', for: 3 },
        { at: 2.4, zoom: '#wg_codebox', scale: 1.4, for: 3 },
        { at: 5.8, click: '#wg_copy' },
      ],
    },
    {
      chapter: 'Add it to your site',
      say: "Paste it into your website wherever the reviews should appear. In a Kyntlo funnel or website, add a Custom JS or HTML element and paste it there. On WordPress, Wix or Squarespace, use their HTML or embed block.",
      actions: [
        { at: 0.6, title: 'Paste the code', sub: 'Kyntlo funnels: Custom JS/HTML element', for: 6 },
        { at: 7.0, title: 'Other websites', sub: 'Use an HTML or embed block', for: 4.4 },
      ],
    },
    {
      chapter: 'Always up to date',
      say: "You only do this once. Every new review that matches your settings appears in the widget automatically. And if you change the layout later, just save it here, and your website updates too.",
      actions: [
        { at: 0.4, click: '#wg_back' },
        { at: 2.2, hover: '#wg_table' },
        { at: 2.4, highlight: '#wg_table tbody tr:first-child', label: 'Saved & live', for: 3.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Put reviews next to *Book now*', sub: 'Proof works best at the moment of decision.' },
      say: "Here's a pro tip. Place your review widget right next to your main call to action, like your Book now button. Visitors hesitate at the moment they decide, and that's exactly when proof from other customers helps most. Add a small badge to your header too, so your rating is visible on every page.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 12', title: 'Connecting *Stripe*', sub: 'Set up payments in Kyntlo.', cta: 'Kyntlo [Academy]' },
      say: "That's the end of the Reputation module. Great job! Next, in module twelve, we'll set up payments, starting with connecting Stripe, so you can take payments right inside Kyntlo. See you there.",
    },
  ],
};
