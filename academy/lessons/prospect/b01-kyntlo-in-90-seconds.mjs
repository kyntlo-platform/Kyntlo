// Track B · Video 1 — Kyntlo in 90 seconds. Fast cuts, punch-in zooms, CTA.
const nav = (id, text) => [`#sb_${id}`, `nav a:has-text("${text}")`, `aside a:has-text("${text}")`, `text="${text}"`];

export default {
  id: 'B1',
  title: 'Kyntlo in 90 Seconds — Your Whole Business in One Platform',
  description:
    'See how Kyntlo replaces your CRM, inbox, booking, funnels, email and SMS marketing, automation and reviews, with AI built in.',
  tags: ['Kyntlo', 'CRM', 'Marketing Automation', 'Small Business', 'AI'],
  musicVolume: 0.2,
  thumbnail: { kicker: 'Kyntlo in 90 seconds', title: 'Your whole business. *One platform.*' },
  scenes: [
    {
      card: { type: 'intro', kicker: 'Kyntlo in 90 seconds', title: 'Your whole business. *One platform.*' },
      say: "Still juggling five different tools to run your business? Let me show you Kyntlo, in ninety seconds.",
    },
    {
      goto: '{app}/v2/location/{loc}/dashboard',
      settle: 2,
      say: "This is your Kyntlo dashboard. Leads, bookings, sales and revenue, all live, all in one place.",
      actions: [{ at: 0.3, zoom: 'main', scale: 1.25, for: 4 }],
    },
    {
      goto: '{app}/v2/location/{loc}/conversations/conversations',
      settle: 2,
      say: "Every message, from email, text, WhatsApp, Instagram and Facebook, lands in one inbox. And AI can reply for you, around the clock.",
      actions: [
        { at: 0.4, title: 'Unified inbox', sub: 'Every channel, one place', for: 3.4 },
        { at: 3.8, move: [1200, 600] },
        { at: 4.0, zoom: 'cursor', scale: 1.5, for: 3 },
      ],
    },
    {
      goto: '{app}/v2/location/{loc}/calendars/view',
      settle: 2,
      speed: 1.5,
      say: "Customers book themselves straight into your calendar, and automatic reminders cut your no-shows.",
      actions: [{ at: 0.4, title: 'Online booking', sub: 'With automatic reminders', for: 3.2 }],
    },
    {
      goto: '{app}/v2/location/{loc}/opportunities/list',
      settle: 2,
      say: "Your pipeline shows every deal, and exactly where it stands.",
      actions: [
        { at: 0.4, title: 'Sales pipeline', for: 2.6 },
        { at: 1.2, zoom: 'main', scale: 1.3, for: 2.4 },
      ],
    },
    {
      goto: '{app}/v2/location/{loc}/automation/workflows',
      settle: 2,
      say: "Workflows follow up with every lead automatically, so nobody slips through the cracks.",
      actions: [{ at: 0.4, title: 'Automation', sub: 'Follow-up on autopilot', for: 3.2 }],
    },
    {
      goto: '{app}/v2/location/{loc}/funnels-websites/funnels',
      settle: 2,
      say: "Build funnels, websites and forms from ready-made templates. No developer needed.",
      actions: [{ at: 0.4, title: 'Funnels & websites', for: 3 }],
    },
    {
      goto: '{app}/v2/location/{loc}/reputation/overview',
      settle: 2,
      say: "And Kyntlo asks happy customers for reviews, so your reputation grows on autopilot.",
      actions: [{ at: 0.4, title: 'Reputation', sub: 'More 5-star reviews', for: 3 }],
    },
    {
      card: { type: 'chapter', kicker: 'One login · one invoice', title: 'Everything your business needs, *together*' },
      say: "One login. One invoice. Everything your business needs to grow.",
    },
    {
      card: { type: 'outro', kicker: 'Start today', title: 'Try Kyntlo *free for 14 days*', sub: 'No setup fees. Cancel anytime.', cta: 'kyntlo.ai/[trial]' },
      say: "Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
