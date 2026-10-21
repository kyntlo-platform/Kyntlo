// Track A · Module 1 · Lesson 2 — Logging in & the Kyntlo interface tour.
// App selectors follow the standard HighLevel sidebar ids (#sb_*) with
// visible-text fallbacks. Verify them on the first recording of the demo account.
const nav = (id, text) => [`#sb_${id}`, `nav a:has-text("${text}")`, `aside a:has-text("${text}")`, `text="${text}"`];

export default {
  id: 'A-1.2',
  title: 'Kyntlo Academy 1.2 — Logging in & the Kyntlo interface tour',
  description:
    'Find your way around Kyntlo in five minutes: the sidebar, the top bar, search, notifications and where every tool lives.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM tutorial', 'Getting started'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 1 · Lesson 2', title: 'Your Kyntlo *interface tour*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 1 · Lesson 2', title: 'Logging in & the *interface tour*', sub: "By the end of this lesson you'll know where everything lives." },
      say: "Welcome back! In this lesson, we'll take a guided tour of the Kyntlo interface, so you always know exactly where to find things.",
    },
    {
      chapter: 'Logging in',
      card: { type: 'chapter', kicker: 'Step 1', title: 'Logging in' },
      say: "To sign in, go to hub dot kyntlo dot A I and log in with the email address you used when you signed up. Bookmark this page, because it's your new home base.",
    },
    {
      chapter: 'The dashboard',
      goto: '{app}/v2/location/{loc}/dashboard',
      settle: 2,
      say: "Once you're in, you land on your dashboard. This is your daily snapshot: new leads, opportunities, appointments and conversions, all in one view.",
      actions: [
        { at: 0.4, title: 'Dashboard', sub: 'Your daily snapshot', for: 3.5 },
        { at: 4.2, move: [1100, 480] },
        { at: 4.6, zoom: 'cursor', scale: 1.4, for: 3 },
      ],
    },
    {
      chapter: 'The sidebar',
      say: "On the left is the sidebar. Every tool in Kyntlo lives here, grouped in the order you'll use them most: conversations, calendars, contacts and opportunities at the top, then marketing, automation and your sites.",
      actions: [
        { at: 0.5, highlight: 'aside, nav#sidebar-v2, #sidebar-v2', label: 'Every tool lives here', for: 4 },
        { at: 4.8, hover: nav('conversations', 'Conversations') },
        { at: 6.0, hover: nav('calendars', 'Calendars') },
        { at: 7.2, hover: nav('contacts', 'Contacts') },
        { at: 8.4, hover: nav('opportunities', 'Opportunities') },
        { at: 10.2, hover: nav('automation', 'Automation') },
        { at: 11.6, hover: nav('sites', 'Sites') },
      ],
    },
    {
      chapter: 'Conversations',
      say: "Conversations is your unified inbox. Emails, text messages, WhatsApp, Facebook, Instagram and website chats all arrive here, in one thread per customer.",
      actions: [
        { at: 0.3, click: nav('conversations', 'Conversations') },
        { at: 2.0, title: 'Conversations', sub: 'Every channel, one inbox', for: 3.5 },
        { at: 5.0, zoom: 'cursor', scale: 1.3, for: 2.5 },
      ],
    },
    {
      chapter: 'Contacts',
      say: "Contacts is your CRM. Every lead and customer has a full record here, with their history, notes, tasks and appointments.",
      actions: [
        { at: 0.3, click: nav('contacts', 'Contacts') },
        { at: 2.0, title: 'Contacts', sub: 'Your CRM', for: 3.5 },
      ],
    },
    {
      chapter: 'Calendars & opportunities',
      say: "Calendars handles your bookings, and Opportunities shows your sales pipeline as a board, so you can see every deal and where it stands.",
      actions: [
        { at: 0.3, click: nav('calendars', 'Calendars') },
        { at: 1.8, title: 'Calendars', sub: 'Bookings & availability', for: 2.6 },
        { at: 4.6, click: nav('opportunities', 'Opportunities') },
        { at: 6.2, title: 'Opportunities', sub: 'Your sales pipeline', for: 3 },
      ],
    },
    {
      chapter: 'Top bar & search',
      say: "Up at the top you'll find quick actions. Use search to jump straight to any contact, and the bell icon for your notifications. Your profile menu is on the right.",
      actions: [
        { at: 0.6, highlight: ['header [placeholder*="Search" i]', 'header input', '#globalSearchOpener'], label: 'Search anything', for: 3 },
        { at: 4.2, highlight: ['header [class*="notification" i]', 'header button:has(svg) >> nth=-2'], label: 'Notifications', for: 2.6 },
        { at: 7.2, highlight: ['header [class*="avatar" i]', 'header button >> nth=-1'], label: 'Your profile', for: 2.6 },
      ],
    },
    {
      chapter: 'Settings',
      say: "And finally, Settings sits at the bottom of the sidebar. This is where you'll set up your business profile, team, phone numbers and integrations. We'll cover each of these in its own lesson.",
      actions: [
        { at: 0.3, hover: nav('settings', 'Settings') },
        { at: 0.6, highlight: nav('settings', 'Settings'), label: 'Settings', for: 3 },
        { at: 3.8, click: nav('settings', 'Settings') },
        { at: 5.4, zoom: 'cursor', scale: 1.3, for: 2.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Install the *Kyntlo mobile app*' },
      say: "Here's a quick tip. Install the Kyntlo mobile app on your phone, so you can reply to new leads and manage bookings even when you're away from your desk.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 1.3', title: 'Your *Launchpad* setup checklist', sub: 'Connect email, phone, Google and your chat widget.', cta: 'Kyntlo [Academy]' },
      say: "That's the tour! Next up, we'll walk through your Launchpad, the checklist that gets your account fully set up. See you there.",
    },
  ],
};
