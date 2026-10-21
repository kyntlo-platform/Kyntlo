// Track B · Video 8 — Which Kyntlo plan is right for you? Starter vs Growth vs Pro vs Customized.
// Every price and plan item comes from pricing.html (USD, plus taxes). Quarterly billing = 50% off the first 3 months.
export default {
  id: 'B8',
  title: 'Which Kyntlo Plan Is Right for You? Starter vs Growth vs Pro vs Customized',
  description:
    "Compare Kyntlo's four plans: what's included in Starter, Growth, Pro and Customized, how quarterly billing halves your first three months, how usage is billed at wholesale cost, and how to choose. Every plan starts with a 14-day free trial.",
  tags: ['Kyntlo', 'Kyntlo pricing', 'Kyntlo plans', 'CRM pricing', 'Starter vs Growth vs Pro'],
  thumbnail: { kicker: 'Kyntlo plans', title: 'Which plan is *right for you?*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Kyntlo plans', title: 'Which plan is *right for you?*', sub: 'Starter, Growth, Pro or Customized.' },
      say: "Kyntlo comes in four plans: Starter, Growth, Pro and Customized. In the next two minutes, I'll help you pick the right one for your business.",
      caption: "Kyntlo comes in four plans: Starter, Growth, Pro and Customized. In the next 2 minutes, I'll help you pick the right one for your business.",
    },
    {
      chapter: 'Four plans',
      card: { type: 'plans', kicker: 'Kyntlo packages', title: 'Four plans. *One platform.*',
        p1: 'Starter|$90|/mo|Get organised: CRM, booking & lead capture',
        p2: 'Growth|$270|/mo|Automate follow-up across every channel',
        p3: 'Pro|$490|/mo|AI everywhere, reviews & deep reporting|hot',
        p4: "Customized|Let's talk||Your features, your limits, your price" },
      say: "Every plan runs on the same platform. What changes is which tools are switched on, and how many people can use your account.",
    },
    {
      chapter: 'Starter',
      card: { type: 'plan', kicker: 'Plan 1', title: 'Starter', price: '$90', per: '/month + taxes',
        promo: '$45/mo for your first 3 months on quarterly billing',
        items: 'CRM contacts & opportunities|1 pipeline|Funnels & pages|Forms & surveys|Calendar booking|Live chat widget|Basic email campaigns|Up to 3 users|-Workflow automation|-SMS & WhatsApp|-AI chatbot & missed-call text-back|-Reputation Manager',
        best: "You're getting organised: one place for leads, bookings and customer records." },
      say: "Starter is ninety dollars a month. You get the CRM, one pipeline, funnels and pages, forms and surveys, online booking, a live chat widget and basic email campaigns, for up to three users. It's perfect if you're getting organised.",
      caption: "Starter is $90 a month. You get the CRM, one pipeline, funnels and pages, forms and surveys, online booking, a live chat widget and basic email campaigns, for up to 3 users. It's perfect if you're getting organised.",
    },
    {
      chapter: 'Growth',
      card: { type: 'plan', kicker: 'Plan 2', title: 'Growth', price: '$270', per: '/month + taxes',
        promo: '$135/mo for your first 3 months on quarterly billing',
        items: 'Everything in Starter|2–3 pipelines|Workflow automation|Appointment reminders|Full inbox: email, chat, SMS & WhatsApp|Basic AI chatbot|Up to 10 users|-Advanced AI chatbot & Voice AI|-Memberships & courses|-Advanced reporting',
        best: "You're losing leads to slow follow-up, and you want automation doing the chasing." },
      say: "Growth is two hundred and seventy dollars a month. It adds two to three pipelines, workflow automation, appointment reminders, the full inbox with texts and WhatsApp, and a basic AI chatbot, for up to ten users. Choose it if leads are slipping through the cracks.",
      caption: "Growth is $270 a month. It adds 2 to 3 pipelines, workflow automation, appointment reminders, the full inbox with texts and WhatsApp, and a basic AI chatbot, for up to 10 users. Choose it if leads are slipping through the cracks.",
    },
    {
      chapter: 'Pro',
      card: { type: 'plan', kicker: 'Plan 3 · Most popular', title: 'Pro', price: '$490', per: '/month + taxes',
        promo: '$245/mo for your first 3 months on quarterly billing',
        items: 'Everything in Growth|Unlimited AI usage|Unlimited pipelines|Advanced AI chatbot|Voice AI|Missed-call text-back|Reputation Manager|Reactivation campaigns|Memberships & courses|Call tracking & recording|Advanced analytics|Up to 25 users',
        best: "You're ready for AI everywhere: AI answering chats and calls, automatic reviews and deep reporting." },
      say: "Pro, our most popular plan, is four hundred and ninety dollars a month. It unlocks unlimited AI usage, unlimited pipelines, the advanced chatbot, Voice AI, missed-call text-back, the Reputation Manager, reactivation campaigns, memberships and courses, call tracking and advanced analytics, for up to twenty-five users.",
      caption: "Pro, our most popular plan, is $490 a month. It unlocks unlimited AI usage, unlimited pipelines, the advanced chatbot, Voice AI, missed-call text-back, the Reputation Manager, reactivation campaigns, memberships and courses, call tracking and advanced analytics, for up to 25 users.",
    },
    {
      chapter: 'Customized',
      card: { type: 'plan', kicker: 'Plan 4', title: 'Customized', price: "Let's talk", per: '',
        items: 'Pick exactly the features you need|Custom limits for users, pipelines & volumes|Multiple brands or branches|Custom integrations & development|Human campaign management|Dedicated onboarding|Tailored pricing',
        best: "Your operation doesn't fit a box: multi-brand businesses, multiple branches, or special requirements." },
      say: "And if you don't fit a box, there's Customized. Pick exactly the features and limits you need, with options like multiple brands or branches, custom integrations and dedicated onboarding. You pay for your mix, and nothing more.",
    },
    {
      chapter: 'Quarterly billing',
      goto: '{site}/pricing.html',
      setup: [{ run: (p) => p.evaluate(() => scrollTo({ top: document.querySelector('.billing-offer').getBoundingClientRect().top + scrollY - 40, behavior: 'instant' })) }],
      settle: 2.5,
      say: "Choose quarterly billing, and your first three months are half price: forty-five dollars a month for Starter, a hundred and thirty-five for Growth, or two hundred and forty-five for Pro. After that, your plan renews at the normal monthly price.",
      caption: "Choose quarterly billing, and your first 3 months are half price: $45 a month for Starter, $135 for Growth, or $245 for Pro. After that, your plan renews at the normal monthly price.",
      actions: [
        { at: 0.4, highlight: '.billing-offer', label: '50% off your first 3 months', for: 3.4 },
        { at: 4.2, highlight: '.pricing-card >> nth=0 >> .pricing-header', label: 'Starter · $45/mo', for: 2.4 },
        { at: 6.8, highlight: '.pricing-card >> nth=1 >> .pricing-header', label: 'Growth · $135/mo', for: 2.4 },
        { at: 9.6, highlight: '.pricing-card >> nth=2 >> .pricing-header', label: 'Pro · $245/mo', for: 2.4 },
        { at: 12.4, click: '.billing-tab[data-billing="monthly"]' },
        { at: 13.0, title: 'Then the normal monthly price', sub: '$90 · $270 · $490 a month, plus taxes', for: 3.4 },
      ],
    },
    {
      chapter: 'Usage at wholesale cost',
      goto: '{site}/pricing.html',
      setup: [{ run: async (p) => {
        await p.click('#usageAccordionBtn');
        await p.waitForTimeout(1200);
        await p.evaluate(() => scrollTo({ top: document.querySelector('.usage-grid').getBoundingClientRect().top + scrollY - 260, behavior: 'instant' }));
      } }],
      settle: 2,
      say: "On top of your plan, things like texts, calls and emails are pay-as-you-go, at wholesale rates, with no markup. You only pay for what you use. And on Pro, AI usage is unlimited.",
      actions: [
        { at: 0.4, highlight: '.usage-note', label: 'Wholesale rates · no markup', for: 3 },
        { at: 3.6, highlight: '.usage-item >> nth=2', label: 'Texts', for: 2 },
        { at: 3.8, zoom: '.usage-item >> nth=2', scale: 1.6, for: 2.2 },
        { at: 6.2, highlight: '.usage-item >> nth=3', label: 'Calls', for: 1.8 },
        { at: 8.4, title: 'Usage at wholesale cost', sub: 'Unlimited AI usage on Pro', for: 3.4 },
      ],
    },
    {
      chapter: 'How to choose',
      goto: '{site}/pricing.html',
      setup: [{ run: (p) => p.evaluate(() => document.querySelector('.pricing-guidance').scrollIntoView({ block: 'center' })) }],
      settle: 2,
      say: "So how do you choose? Getting organised: Starter. Losing leads to slow follow-up: Growth. Ready for AI everywhere: Pro. And if your operation doesn't fit a box: Customized.",
      actions: [
        { at: 0.4, highlight: '#pricing-guidance-title', label: 'Which plan is right for you?', for: 2 },
        { at: 2.8, highlight: '.guidance-card >> nth=0', label: 'Starter', for: 2 },
        { at: 5.0, highlight: '.guidance-card >> nth=1', label: 'Growth', for: 2.2 },
        { at: 7.4, highlight: '.guidance-card >> nth=2', label: 'Pro', for: 2 },
        { at: 9.6, highlight: '.guidance-card >> nth=3', label: 'Customized', for: 2.4 },
      ],
    },
    {
      chapter: 'Free trial',
      card: { type: 'chapter', kicker: 'Good to know', title: 'Start with a *14-day free trial*', sub: 'No setup fees · Cancel anytime · Upgrade or downgrade any time' },
      say: "Every standard plan starts with a fourteen-day free trial, with no setup fees. And you can upgrade or downgrade any time: your contacts and automations move with you.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'Kyntlo plans', title: 'Start your free *14-day trial*', sub: 'Or talk to sales about a Customized plan', cta: 'kyntlo.ai/[trial]' },
      say: "Not sure yet? Try it free. Start your fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
