// Track B · Video 1 — Kyntlo in 90 seconds. The whole platform at a glance, on the demo workspace.
// Fast cuts, punch-in zooms, lower thirds, free-trial CTA. Prices from pricing.html.
export default {
  id: 'B1',
  title: 'Kyntlo in 90 Seconds — Your Whole Business in One Platform',
  description:
    'See how Kyntlo brings your CRM, inbox, online booking, sales pipeline, funnels, automation, AI agents and reviews together in one platform, with one login and one invoice. Start your free 14-day trial at kyntlo.ai.',
  tags: ['Kyntlo', 'CRM', 'Marketing Automation', 'Small Business', 'AI', 'All-in-one CRM'],
  musicVolume: 0.2,
  thumbnail: { kicker: 'Kyntlo in 90 seconds', title: 'Your whole business. *One platform.*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Kyntlo in 90 seconds', title: 'Your whole business. *One platform.*' },
      say: "Still juggling five different tools to run your business? Let me show you Kyntlo, in ninety seconds.",
    },
    {
      chapter: 'Dashboard',
      goto: '{demo}#/dashboard',
      settle: 1.5,
      say: "This is Kyntlo. Your leads, deals and revenue, live, in one place. This demo belongs to a dental clinic, but it works the same way for any local business.",
      actions: [
        { at: 0.4, title: 'Dashboard', sub: 'Your business at a glance', for: 3.2 },
        { at: 4.0, highlight: '#w_status', label: 'Deals by status', for: 2.6 },
        { at: 7.0, zoom: '#w_conversion', scale: 1.5, for: 3 },
      ],
    },
    {
      chapter: 'One inbox',
      goto: '{demo}#/conversations/conversations/v1',
      settle: 1,
      say: "Every message lands in one inbox: email, text, WhatsApp, Facebook, Instagram and website chat. So nothing slips through the cracks.",
      actions: [
        { at: 0.4, title: 'Unified inbox', sub: 'Every channel, one place', for: 3.2 },
        { at: 3.6, highlight: '#cv_list_wrap', label: 'Every channel', for: 2.6 },
        { at: 6.0, zoom: '#cv_mid', scale: 1.3, for: 2.4 },
      ],
    },
    {
      chapter: 'Online booking',
      goto: '{demo}#/calendars/calendar',
      settle: 1,
      say: "Customers book themselves online, and automatic reminders help cut your no-shows.",
      actions: [
        { at: 0.4, title: 'Online booking', sub: 'With automatic reminders', for: 3 },
        { at: 1.6, zoom: '#cal_grid', scale: 1.3, for: 2.6 },
      ],
    },
    {
      chapter: 'Sales pipeline',
      goto: '{demo}#/opportunities',
      settle: 1,
      say: "Your pipeline shows every deal, and exactly where it stands.",
      actions: [
        { at: 0.4, title: 'Sales pipeline', sub: 'Every deal, every stage', for: 2.8 },
        { at: 1.2, zoom: '#op_board', scale: 1.3, for: 2.4 },
      ],
    },
    {
      chapter: 'Automation',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Workflows follow up with every lead, confirm every booking, and win back no-shows, automatically.",
      actions: [
        { at: 0.4, title: 'Automation', sub: 'Follow-up on autopilot', for: 3 },
        { at: 3.0, highlight: '#wf_table tbody', label: 'Working for you, 24/7', for: 2.8 },
      ],
    },
    {
      chapter: 'Funnels & websites',
      goto: '{demo}#/sites/funnels',
      settle: 1,
      say: "Build funnels, websites and forms from ready-made templates. No developer needed.",
      actions: [
        { at: 0.4, title: 'Funnels & websites', sub: 'From ready-made templates', for: 3 },
        { at: 2.2, click: '#fn_new' },
        { at: 3.2, highlight: '#fn_new_template', label: 'Ready-made designs', for: 2 },
      ],
    },
    {
      chapter: 'AI agents',
      goto: '{demo}#/ai-agents/voice-ai',
      settle: 1,
      say: "And AI agents answer your chats, and even your phone calls, around the clock, and book appointments for you.",
      actions: [
        { at: 0.4, title: 'AI agents', sub: 'Chat & voice, 24/7', for: 3.2 },
        { at: 3.8, highlight: '#vai_stats', label: 'Calls answered & booked', for: 3 },
        { at: 4.0, zoom: '#vai_stats', scale: 1.3, for: 3 },
      ],
    },
    {
      chapter: 'Reviews',
      goto: '{demo}#/reputation/overview',
      settle: 1,
      say: "After each visit, Kyntlo can ask for a review, so your five-star reputation keeps growing on its own.",
      actions: [
        { at: 0.4, title: 'Reputation', sub: '5-star reviews on autopilot', for: 3 },
        { at: 3.6, highlight: '#rp_kpis', label: 'Requests, reviews & rating', for: 3 },
      ],
    },
    {
      chapter: 'One invoice',
      card: { type: 'chapter', kicker: 'One login · One invoice', title: 'Replace your *whole tool stack*', sub: 'CRM, inbox, booking, funnels, email, SMS, automation, reviews and AI.' },
      say: "One login. One invoice. Everything connected, so your business keeps working, even when you're not.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'Plans from $90/mo', title: 'Start your free *14-day trial*', sub: 'No setup fees · Cancel anytime', cta: 'kyntlo.ai/[trial]' },
      say: "Plans start at ninety dollars a month. Start your free fourteen-day trial today, at kyntlo dot A I.",
      caption: "Plans start at $90 a month. Start your free 14-day trial today, at kyntlo.ai.",
    },
  ],
};
