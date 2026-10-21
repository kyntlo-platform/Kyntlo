// Track A · Module 1 · Lesson 2 — Logging in & the Kyntlo interface tour.
// Filmed on the demo workspace (academy/demo-app).
export default {
  id: 'A-1.2',
  title: 'Kyntlo Academy 1.2 — Logging in & the Kyntlo interface tour',
  description:
    'Find your way around Kyntlo in a few minutes: logging in, the account switcher, search, the sidebar, module tabs, the top bar, Ask AI, notifications and Settings.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM tutorial', 'Getting started', 'HighLevel'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 1 · Lesson 2', title: 'Your Kyntlo *interface tour*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 1 · Lesson 2', title: 'Logging in & the *interface tour*', sub: "By the end of this lesson you'll know where everything lives." },
      say: "Welcome back! In this lesson, we'll log in and take a guided tour of the Kyntlo interface. By the end, you'll know exactly where everything lives, and the quickest ways to get around.",
    },
    {
      chapter: 'Logging in',
      card: { type: 'chapter', kicker: 'Step 1', title: 'Log in at *hub.kyntlo.ai*', sub: 'Use the email address you signed up with.' },
      say: "To sign in, go to hub dot kyntlo dot A I, and log in with the email address you used when you signed up. Bookmark the page, because this is your new home base. If you ever forget your password, use the reset link on the login page.",
    },
    {
      chapter: 'The dashboard',
      goto: '{demo}#/dashboard',
      settle: 1,
      say: "Once you're in, you land on your dashboard. It's a snapshot of how the business is doing: your opportunities, revenue and conversion rate, all on one screen. We'll read it properly in Module 2.",
      actions: [
        { at: 0.4, title: 'Dashboard', sub: 'Your daily snapshot', for: 3.5 },
        { at: 4.4, hover: '#w_status' },
        { at: 6.2, hover: '#w_conversion' },
        { at: 6.4, zoom: '#w_conversion', scale: 1.4, for: 3 },
      ],
    },
    {
      chapter: 'Account switcher',
      say: "Top left is your account switcher. It shows which business you're working in. If you run more than one location, click it to jump between them. Everything you see, contacts, calendars and settings, belongs to the account selected here.",
      actions: [
        { at: 0.4, highlight: '#sb_account', label: 'Your business account', for: 3.2 },
        { at: 3.8, click: '#sb_account' },
        { at: 4.6, zoom: '#sb_account', scale: 1.8, for: 4 },
        { at: 9.6, click: '.menu button >> nth=0' },
      ],
    },
    {
      chapter: 'Search',
      say: "Just below is search. Click it, or press control K from anywhere, and start typing a name, email or phone number. Pick a result, and you're straight into that contact's record.",
      actions: [
        { at: 0.4, click: '#sb_search' },
        { at: 1.6, type: 'Olivia', into: '#gs_input' },
        { at: 3.4, highlight: '#gs_results', label: 'Jump straight to a contact', for: 3.4 },
        { at: 3.6, zoom: '.modal', scale: 1.4, for: 3.4 },
        { at: 7.6, click: '#gs_results [data-id] >> nth=0' },
      ],
    },
    {
      chapter: 'The sidebar',
      goto: '{demo}#/dashboard',
      say: "On the left is the sidebar, where every tool lives. The everyday ones sit at the top: conversations, calendars, contacts, opportunities and payments. Below the line are the tools that help you grow: AI agents, marketing, automation, sites, reputation and reporting.",
      actions: [
        { at: 0.4, highlight: '#sidebar-v2', label: 'Every tool lives here', for: 3.4 },
        { at: 4.0, hover: '#sb_conversations' },
        { at: 5.0, hover: '#sb_calendars' },
        { at: 6.0, hover: '#sb_contacts' },
        { at: 7.0, hover: '#sb_opportunities' },
        { at: 8.0, hover: '#sb_payments' },
        { at: 10.0, hover: '#sb_ai-agents' },
        { at: 11.0, hover: '#sb_marketing' },
        { at: 12.0, hover: '#sb_automation' },
        { at: 13.0, hover: '#sb_sites' },
        { at: 14.0, hover: '#sb_reputation' },
        { at: 15.0, hover: '#sb_reporting' },
      ],
    },
    {
      chapter: 'Module tabs',
      say: "Click any tool, and its own tabs appear along the top bar. In Contacts, for example, you'll find smart lists, bulk actions, restore, tasks and companies. Whenever you're looking for a feature, check these tabs first.",
      actions: [
        { at: 0.4, click: '#sb_contacts' },
        { at: 2.0, highlight: '#tabs', label: 'Each tool has its own tabs', for: 4 },
        { at: 2.2, zoom: '#tabs', scale: 1.6, for: 4.2 },
        { at: 7.0, hover: '#tabs a:nth-child(2)' },
      ],
    },
    {
      chapter: 'Conversations, calendars & opportunities',
      say: "Conversations is your unified inbox, with every email, text and social message in one thread per customer. Calendars holds your bookings. And Opportunities shows your sales pipeline as a board, so you can see every deal and where it stands.",
      actions: [
        { at: 0.3, click: '#sb_conversations' },
        { at: 1.4, title: 'Conversations', sub: 'Every channel, one inbox', for: 3.2 },
        { at: 5.6, click: '#sb_calendars' },
        { at: 6.6, title: 'Calendars', sub: 'Bookings & availability', for: 2.6 },
        { at: 9.4, click: '#sb_opportunities' },
        { at: 10.4, title: 'Opportunities', sub: 'Your sales pipeline', for: 3 },
      ],
    },
    {
      chapter: 'The top bar',
      say: "Now the top right corner. The green phone button opens the dialer, so you can call from your business number. The bell shows your notifications: new leads, bookings, reviews and missed calls. And your initials open your own profile.",
      actions: [
        { at: 0.3, zoom: '.tb-right', scale: 2.0, for: 12 },
        { at: 1.0, highlight: '#tb_phone', label: 'Dialer', for: 2.6 },
        { at: 1.2, hover: '#tb_phone' },
        { at: 5.6, click: '#tb_bell' },
        { at: 6.0, highlight: '.menu', label: 'Notifications', for: 3.4 },
        { at: 10.6, hover: '#tb_avatar' },
        { at: 10.8, highlight: '#tb_avatar', label: 'Your profile', for: 2.4 },
      ],
    },
    {
      chapter: 'Ask AI',
      say: "Next to the bell is Ask AI, your built-in assistant. Ask it about your business, like how many new leads came in this week, or how to set something up, and it answers using your account.",
      actions: [
        { at: 0.3, click: '#tb_ask' },
        { at: 2.0, highlight: '#ai_thread .ai-sugs', label: 'Try a suggestion', for: 2.8 },
        { at: 5.2, click: '#ai_sug_0' },
        { at: 8.2, zoom: '#ai_thread', scale: 1.3, for: 3.4 },
      ],
    },
    {
      chapter: 'Launchpad & Settings',
      say: "Two more places to know. Launchpad, near the top of the sidebar, is your setup checklist. And Settings, at the very bottom, is where your business profile, team, phone numbers and integrations live. Opening Settings swaps the sidebar for the settings menu. Click Go Back to return.",
      actions: [
        { at: 0.4, highlight: '#sb_launchpad', label: 'Your setup checklist', for: 3 },
        { at: 0.6, hover: '#sb_launchpad' },
        { at: 4.4, hover: '#sb_settings' },
        { at: 4.6, highlight: '#sb_settings', label: 'Settings', for: 2.4 },
        { at: 7.4, click: '#sb_settings' },
        { at: 8.6, highlight: '#ss_nav', label: 'The settings menu', for: 3.4 },
        { at: 13.6, click: '#ss_back' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Press *Ctrl + K* from anywhere', sub: 'Search is the fastest way to any contact.' },
      say: "Here's a pro tip. Get into the habit of pressing control K. It's the quickest way to find any contact, from any page, without touching the sidebar.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 1.3', title: 'Your *Launchpad* setup checklist', sub: 'Connect Google, Facebook, your chat widget and the mobile app.', cta: 'Kyntlo [Academy]' },
      say: "That's the tour! Next up, we'll work through your Launchpad, the checklist that gets your account ready to capture leads. See you there.",
    },
  ],
};
