// Pipeline pilot, filmed on the Kyntlo marketing website (served locally).
// Proves the look: cards, cursor, spotlights, zooms, lower thirds, subtitles,
// cross-dissolves and music, before app footage is available.
export default {
  id: 'B0',
  title: 'Kyntlo — One platform for your whole growth stack (pilot)',
  description:
    'A quick look at Kyntlo: CRM, AI conversations, funnels, booking, automation and reviews in one platform, on one invoice.',
  tags: ['Kyntlo', 'CRM', 'Marketing Automation', 'Small Business'],
  auth: false,
  thumbnail: { kicker: 'Kyntlo in 60 seconds', title: 'One platform. *One invoice.*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Kyntlo Academy', title: 'One platform for your *whole growth stack*', sub: 'CRM, AI, funnels, booking and automation — together.' },
      say: "Hi, and welcome to Kyntlo! In the next minute, I'll show you how one platform can replace the stack of tools you're juggling today.",
    },
    {
      chapter: 'The AI growth engine',
      goto: '{site}/',
      // The homepage plays a short logo intro; start filming after it.
      settle: 4,
      say: "Kyntlo brings your leads, conversations, bookings and follow-ups into one place, with AI quietly working in the background.",
      actions: [
        { at: 0.6, move: [980, 520] },
        { at: 1.2, highlight: '.hero h1', label: 'Built on AI', for: 3.2 },
        { at: 4.2, title: 'Kyntlo', sub: 'The AI engine behind your growth', for: 3.4 },
      ],
    },
    {
      chapter: 'AI features',
      setup: [{ run: (p) => p.locator('#features').scrollIntoViewIfNeeded() }, { run: (p) => p.evaluate(() => scrollBy(0, -40)) }],
      settle: 1.2,
      say: "Your CRM scores leads and suggests the next best action. Instagram, Facebook, SMS and email land in one inbox, and the AI receptionist answers your calls.",
      actions: [
        { at: 0.5, hover: '.feature-card >> nth=0' },
        { at: 0.7, zoom: '.feature-card >> nth=0', scale: 1.6, for: 2.6 },
        { at: 4.6, hover: '.feature-card >> nth=1' },
        { at: 4.8, highlight: '.feature-card >> nth=1', label: 'One inbox for every channel', for: 3 },
        { at: 8.2, hover: '.feature-card >> nth=2' },
        { at: 8.4, highlight: '.feature-card >> nth=2', label: 'Voice AI receptionist', for: 2.6 },
      ],
    },
    {
      chapter: 'What Kyntlo replaces',
      setup: [{ run: (p) => p.locator('#compare .matrix').scrollIntoViewIfNeeded() }],
      settle: 1.2,
      say: "Instead of paying for separate CRM, funnel, email, SMS and booking tools, you get all of it in Kyntlo.",
      actions: [
        { at: 0.4, highlight: '#compare .matrix-row >> nth=0', label: 'Replaces Pipedrive, Salesforce, HubSpot', for: 2.8 },
        { at: 3.4, scroll: 220, ms: 1200 },
        { at: 4.8, zoom: 'cursor', scale: 1.5, for: 2 },
      ],
    },
    {
      chapter: 'Plans & pricing',
      setup: [{ run: (p) => p.locator('#pricing .pricing-grid').scrollIntoViewIfNeeded() }, { run: (p) => p.evaluate(() => scrollBy(0, -120)) }],
      settle: 1.4,
      say: "Pick the plan that fits where you are today, and upgrade any time. Every plan starts with a fourteen-day free trial.",
      actions: [
        { at: 0.4, hover: '.pricing-card >> nth=0' },
        { at: 1.8, hover: '.pricing-card >> nth=2' },
        { at: 2.0, highlight: '.pricing-card >> nth=2', label: 'Most popular: Pro', for: 3 },
        { at: 5.2, zoom: '.pricing-card >> nth=2 >> .pricing-price', scale: 1.8, for: 2.2 },
      ],
    },
    {
      card: { type: 'outro', kicker: 'Start today', title: 'Try Kyntlo *free for 14 days*', sub: 'No setup fees. Cancel anytime.', cta: 'kyntlo.ai/[trial]' },
      say: 'Ready to see it with your own business? Start your free trial at kyntlo dot A I.',
    },
  ],
};
