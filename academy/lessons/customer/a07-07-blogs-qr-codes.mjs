// Track A · Module 7 · Lesson 7 — Blogs & QR codes.
// Filmed on the demo workspace (academy/demo-app), screen: Sites → Blogs / QR Codes.
export default {
  id: 'A-7.7',
  title: 'Kyntlo Academy 7.7 — Blogs & QR codes',
  description:
    'Publish blog posts that bring in search traffic, draft them faster with Content AI, set slugs and meta descriptions, schedule posts, then create trackable QR codes that bring offline visitors to your pages.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Blog', 'QR codes', 'Content AI'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 7 · Lesson 7', title: 'Blogs & *QR codes*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 7 · Lesson 7', title: 'Blogs & *QR codes*', sub: 'Publish content and track offline traffic.' },
      say: "In this final lesson of the Sites module, you'll publish a blog post that helps new patients find you on Google, and create QR codes that turn posters and leaflets into trackable leads.",
    },
    {
      chapter: 'Your blog',
      goto: '{demo}#/sites/blogs',
      settle: 1,
      say: "Go to Sites, then Blogs. Every post answers a question your customers are already searching for, like how much Invisalign costs. Each one is a new way for people to find you, long after you publish it.",
      actions: [
        { at: 0.4, highlight: '#bl_table', label: 'Your blog posts', for: 4 },
        { at: 5.4, highlight: '#bl_row_p1', label: 'Answers a real question', for: 4 },
      ],
    },
    {
      chapter: 'Categories & authors',
      say: "Categories group related posts together, and Authors shows who wrote what. Both help readers, and search engines, make sense of your content.",
      actions: [
        { at: 0.4, click: '#bl_sub_categories' },
        { at: 4.2, click: '#bl_sub_authors' },
        { at: 7.4, click: '#bl_sub_posts' },
      ],
    },
    {
      chapter: 'New post',
      say: "Click New Blog Post, and start with the title. Write it the way people search, as a question if you can. Notice the URL slug fills in automatically from the title.",
      actions: [
        { at: 0.4, click: '#bl_new' },
        { at: 2.4, type: 'Invisalign vs. braces: which is right for you?', into: '#bl_title', delay: 40 },
        { at: 7.4, highlight: '#bl_slug', label: 'Clean URL slug', for: 3 },
      ],
    },
    {
      chapter: 'Content AI',
      say: "Staring at a blank page? Click Content AI, describe what the post should cover, and choose a tone. Content AI is billed by usage on Starter and Growth, and included on Pro.",
      actions: [
        { at: 0.4, click: '#bl_ai' },
        { at: 2.4, highlight: '.modal', label: 'Describe the post', for: 4 },
        { at: 9.4, click: '#bl_ai_generate' },
      ],
    },
    {
      chapter: 'Review & edit',
      say: "In seconds, you have a full first draft. Always read it through and make it sound like you. Check prices and facts, and add a personal touch, like a story from your practice.",
      actions: [
        { at: 0.4, highlight: '#bl_body', label: 'Your first draft', for: 4.4 },
        { at: 5.6, scroll: 300, ms: 1400 },
      ],
    },
    {
      chapter: 'Post settings',
      say: "On the right are the post settings. The meta description is the snippet Google shows under your title. Add alt text to the featured image, and choose a category and author.",
      actions: [
        { at: 0.4, highlight: '#bl_desc', label: 'Meta description', for: 3.4 },
        { at: 4.6, type: 'Clear Invisalign aligner next to metal braces', into: '#bl_alt', delay: 30 },
        { at: 8.4, highlight: '#bl_cat', label: 'Category', for: 2.4 },
      ],
    },
    {
      chapter: 'Schedule it',
      say: "When it's ready, click Publish. Publish it now, or schedule it for later, so you can write several posts in one sitting and release one a week.",
      actions: [
        { at: 0.4, click: '#bl_publish' },
        { at: 1.6, click: '.menu button:has-text("Schedule for later")' },
        { at: 4.0, highlight: '.modal', label: 'Pick a date & time', for: 2.6 },
        { at: 7.0, click: '#bl_sched_ok' },
      ],
    },
    {
      chapter: 'QR codes',
      say: "Now, QR codes. They connect the real world to your pages. A poster in your window, a leaflet, or a business card can send people straight to a funnel, a booking calendar, or a review page.",
      actions: [
        { at: 0.4, click: '#tab_qr-codes' },
        { at: 2.2, highlight: '#qr_table', label: 'Offline → online', for: 5 },
      ],
    },
    {
      chapter: 'Create a QR code',
      say: "Click Create QR Code and give it a name that says where it will be printed. Then choose where it goes. We'll send this leaflet to the Invisalign free scan page.",
      actions: [
        { at: 0.4, click: '#qr_new' },
        { at: 2.2, type: 'Leaflet — Invisalign free scan', into: '#qr_name', delay: 40 },
        { at: 6.8, highlight: '#qr_page', label: 'Destination', for: 3 },
      ],
    },
    {
      chapter: 'Track it with UTMs',
      speed: 1.2,
      say: "Leave tracking switched on. Kyntlo adds UTM parameters to the link, so every lead from this leaflet shows its source on the contact record. Name the campaign after the print run.",
      actions: [
        { at: 0.4, highlight: '#qr_utm', label: 'UTM tracking', for: 3 },
        { at: 6.0, click: '#qr_campaign' },
        { at: 6.3, press: 'Control+A' },
        { at: 6.5, type: 'leaflet-october', delay: 40 },
        { at: 9.0, press: 'Tab' },
        { at: 9.6, highlight: '#qr_dest', label: '?utm_source=qr…', for: 2.6 },
      ],
    },
    {
      chapter: 'Design & download',
      say: "Pick a colour and add your logo in the centre. Then create it, and download it. Choose PNG for everyday use, or SVG for print, because it stays sharp at any size.",
      actions: [
        { at: 0.4, click: '#qr_col_2' },
        { at: 2.2, highlight: '#qr_preview', label: 'Your QR code', for: 2.6 },
        { at: 5.0, click: '#qr_create' },
        { at: 6.8, click: '#qr_dl_q4' },
        { at: 8.4, click: '.menu button:has-text("SVG")' },
      ],
    },
    {
      chapter: 'Measuring results',
      say: "Visits from the QR code appear in your funnel stats, and new leads carry the leaflet as their source. So you finally know whether that print run paid for itself.",
      actions: [
        { at: 0.4, highlight: '#qr_row_q4', label: 'Trackable print', for: 4.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: '*Test-scan* before you print', sub: 'Check it with two different phones.' },
      say: "Here's a pro tip. Before you send anything to the printer, scan the QR code with two different phones, and make sure it opens the right page. Reprints are expensive.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 8', title: 'Marketing: *email, SMS* & social', sub: 'Reach your contacts where they are.', cta: 'Kyntlo [Academy]' },
      say: "That's the Sites module complete! You can now build funnels, websites, forms, blogs and QR codes. Next, in Module Eight, we'll start marketing to your contacts with email, SMS and social media. See you there.",
      caption: "That's the Sites module complete! You can now build funnels, websites, forms, blogs and QR codes. Next, in Module 8, we'll start marketing to your contacts with email, SMS and social media. See you there.",
    },
  ],
};
