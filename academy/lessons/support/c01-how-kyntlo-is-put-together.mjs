// Track C · Support Playbook C1 — How Kyntlo is put together.
// Internal (support team). Business context from docs/03-kyntlo-ghl-white-label-brd.md:
// HighLevel agency account + SaaS mode, one sub-account per customer, SaaS plans set
// permissions & limits, snapshots, usage rebilled via wallet. Prices from pricing.html.
export default {
  id: 'C-1',
  title: 'Kyntlo Academy Support C1 — How Kyntlo is put together',
  description:
    'Internal support playbook. How Kyntlo is built on HighLevel: the agency account, one sub-account per customer, what each plan switches on, snapshots, usage and add-ons, and how to tell a Kyntlo configuration question from a HighLevel platform issue.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'HighLevel', 'SaaS mode', 'Sub-accounts'],
  thumbnail: { kicker: 'Support Playbook C1', title: 'How *Kyntlo* is put together' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C1', title: 'How Kyntlo is *put together*', sub: 'Plans, sub-accounts, and who owns what.' },
      say: "Welcome to the Kyntlo support playbooks. Before you troubleshoot anything, you need a clear picture of how Kyntlo is built. In this playbook, we'll cover the platform underneath, how each customer account is set up, what the plans switch on, and which problems belong to whom.",
    },
    {
      chapter: 'Built on HighLevel',
      card: { type: 'chapter', kicker: 'The foundation', title: 'Kyntlo runs on *HighLevel*', sub: 'HighLevel provides the software. Kyntlo packages, configures, sells, onboards and supports it.' },
      say: "Kyntlo is a white-label service built on HighLevel, a CRM and marketing platform. HighLevel provides the software and the infrastructure. Kyntlo packages it, brands it, configures it, sells it, onboards customers, and supports them. That last part matters most for you. Even when the cause is inside HighLevel, the customer is Kyntlo's customer, and we own the conversation.",
    },
    {
      chapter: 'One customer, one sub-account',
      goto: '{demo}#/dashboard',
      settle: 1.5,
      say: "Kyntlo holds an agency account on HighLevel. Every customer business gets its own sub-account inside it, sometimes called a location. This is the demo sub-account for Bloom Dental Studio. A sub-account has its own contacts, calendars, phone numbers, workflows and settings. Nothing is shared between customers, so always confirm which sub-account a ticket is about.",
      actions: [
        { at: 0.5, title: 'One customer = one sub-account', sub: 'Also called a location', for: 4 },
        { at: 9.5, highlight: '#sidebar-v2', label: 'Everything inside belongs to this customer', for: 4 },
      ],
    },
    {
      chapter: 'Where customers log in',
      say: "Customers log in at hub dot kyntlo dot A I. That's Kyntlo's branded address for the app, so customers see Kyntlo's name and logo. They sign in with the email address their user was created with, and reset forgotten passwords from the login page. Never ask a customer for their password, and never send one by email or chat.",
      actions: [
        { at: 0.5, title: 'hub.kyntlo.ai', sub: 'The branded Kyntlo login', for: 4.5 },
        { at: 12.0, title: 'Never ask for passwords', sub: 'Resets go through the login page', for: 4 },
      ],
    },
    {
      chapter: 'The four plans',
      card: { type: 'plans', kicker: 'Kyntlo plans', title: 'Four plans. *One platform.*',
        p1: 'Starter|$90|/mo|CRM, booking & lead capture · 3 users',
        p2: 'Growth|$270|/mo|Workflows, full inbox & SMS · 10 users',
        p3: 'Pro|$490|/mo|Unlimited AI, Voice AI & reviews · 25 users|hot',
        p4: "Customized|Quoted||Features & limits chosen per customer" },
      say: "Customers buy one of four plans. Starter at ninety dollars a month, Growth at two hundred and seventy, and Pro at four hundred and ninety, all plus taxes. Customized is quoted for each customer. All four run on the same platform. In HighLevel terms, each plan is a SaaS plan that switches modules on or off for the sub-account, and sets limits, like the number of users.",
      caption: "Customers buy one of four plans. Starter at $90 a month, Growth at $270, and Pro at $490, all plus taxes. Customized is quoted for each customer. All four run on the same platform. In HighLevel terms, each plan is a SaaS plan that switches modules on or off for the sub-account, and sets limits, like the number of users.",
    },
    {
      chapter: 'What each plan switches on',
      card: { type: 'chapter', kicker: 'Missing feature?', title: 'Check the *plan* first', sub: 'Starter: no workflows, SMS or WhatsApp · Growth: automation & full inbox · Pro: AI, Voice AI, reviews & memberships' },
      say: "This is the most useful fact in support. If a feature seems to be missing, check the plan first. Starter has one pipeline, and no workflow automation, text messages or WhatsApp. Growth adds workflows, the full inbox, two to three pipelines and a basic AI chatbot. Pro adds Voice AI, the advanced chatbot, missed-call text-back, reviews, memberships and unlimited AI usage. User limits are three, ten and twenty-five.",
      caption: "This is the most useful fact in support. If a feature seems to be missing, check the plan first. Starter has 1 pipeline, and no workflow automation, text messages or WhatsApp. Growth adds workflows, the full inbox, 2 to 3 pipelines and a basic AI chatbot. Pro adds Voice AI, the advanced chatbot, missed-call text-back, reviews, memberships and unlimited AI usage. User limits are 3, 10 and 25.",
    },
    {
      chapter: 'Confirming the plan',
      goto: '{demo}#/settings/billing/subscription',
      settle: 1.5,
      say: "You can confirm the plan inside the sub-account. In Settings, open Billing, then Subscription. Bloom Dental is on Pro, and you can see its users against the limit. One caution about limits. If a contact limit is ever set on an account, it isn't a hard cap. It blocks adding contacts by hand or by import, but forms, workflows and integrations can still create them.",
      actions: [
        { at: 0.5, highlight: '#ss_menu_billing', label: 'Settings → Billing', for: 2.6 },
        { at: 4.0, highlight: '#bl_plan', label: 'Plan & user count', for: 5 },
        { at: 4.2, zoom: '#bl_plan', scale: 1.4, for: 5.4 },
      ],
    },
    {
      chapter: 'Snapshots',
      card: { type: 'chapter', kicker: 'Snapshots', title: 'Set-up copies, *live data* never', sub: 'Workflows, funnels, forms, calendars, pipelines, fields, templates — not contacts, conversations, numbers or integrations' },
      say: "New sub-accounts can be loaded with a Kyntlo snapshot. A snapshot copies set-up: workflows, funnels, forms, calendars, pipelines, custom fields, templates and dashboards. It never copies live data, like contacts, appointments or conversations, and it doesn't bring phone numbers, Stripe or other connected integrations. Those still have to be connected for each customer. A snapshot is a head start, not finished onboarding.",
    },
    {
      chapter: 'Who owns what',
      card: { type: 'chapter', kicker: 'Who owns what', title: 'Platform, *configuration* or service?', sub: 'Native HighLevel feature · Kyntlo configuration · Kyntlo managed service · Usage-based service · Resold add-on' },
      say: "Every capability falls into one of a few types. Native platform features, like contacts, calendars and workflows, are HighLevel software under the Kyntlo brand. Kyntlo configuration is what we build on top, like template workflows and pipeline stages. Managed services are human work, like setup or campaign management. Usage-based services, like texts, calls, email and AI, are paid from the wallet. And resold add-ons, like WhatsApp or a dedicated IP, are optional extras.",
    },
    {
      chapter: 'Usage and the wallet',
      goto: '{demo}#/settings/billing/wallet',
      settle: 1.5,
      say: "Usage is where many billing questions start. HighLevel charges Kyntlo for each text, call, email and AI action, and Kyntlo passes it on to the customer at wholesale rates, with no markup. The customer sees it here, under Wallet and Transactions. When you quote a rate, always use Kyntlo's pricing page, never HighLevel's own price list. Playbook C eight covers this in detail.",
      caption: "Usage is where many billing questions start. HighLevel charges Kyntlo for each text, call, email and AI action, and Kyntlo passes it on to the customer at wholesale rates, with no markup. The customer sees it here, under Wallet & Transactions. When you quote a rate, always use Kyntlo's pricing page, never HighLevel's own price list. Playbook C8 covers this in detail.",
      actions: [
        { at: 0.5, highlight: '#bl_balance_card', label: 'Wallet balance', for: 3.4 },
        { at: 9.0, highlight: '#bl_usage_card', label: 'Usage at wholesale rates', for: 5 },
        { at: 9.2, zoom: '#bl_usage_card', scale: 1.25, for: 6 },
      ],
    },
    {
      chapter: 'Where configuration lives',
      goto: '{demo}#/settings/business-profile',
      settle: 1.5,
      say: "Most configuration lives in Settings. Business Profile, Billing and My Staff are at the top. Email Services and Phone System sit under Business Services. Domains, Integrations and Audit Logs are further down. The other playbooks in this track walk through each of these, in the order you'll usually need them.",
      actions: [
        { at: 0.4, highlight: '#ss_nav', label: 'Settings', for: 2.6 },
        { at: 3.2, highlight: '#ss_menu_business-profile', label: 'Business Profile', for: 2.4 },
        { at: 7.4, highlight: '#ss_menu_email-services', label: 'Email Services', for: 2.2 },
        { at: 9.8, highlight: '#ss_menu_phone-numbers', label: 'Phone System', for: 2.2 },
        { at: 12.4, highlight: '#ss_menu_audit-logs', label: 'Audit Logs', for: 2.6 },
      ],
    },
    {
      chapter: 'Three layers',
      card: { type: 'chapter', kicker: 'Diagnosing', title: 'Plan → *Set-up* → Platform', sub: 'Is it in their plan? Is it set up and connected? Only then: a HighLevel platform issue.' },
      say: "So when a ticket arrives, work through three layers. First, the plan. Is the feature switched on for this customer at all? Second, the set-up. Is it configured and connected correctly in their sub-account? Most tickets end here. Only when both check out is it likely to be a platform issue in HighLevel. Then you escalate, and Kyntlo, not the customer, deals with HighLevel.",
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: 'Before you *answer*', sub: 'Which sub-account? · Which plan? · Set up & connected? · Kyntlo configuration or HighLevel platform?' },
      say: "Here's the checklist for every ticket. Which sub-account is it? Which plan are they on? Is the feature set up and connected? And is this a Kyntlo configuration question, or a HighLevel platform issue? Answer those four, and you'll know exactly where to look.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Playbook C2', title: 'Onboarding a *new customer*', sub: 'The first-week checklist, step by step.', cta: 'Kyntlo [Academy]' },
      say: "That's how Kyntlo is put together. In the next playbook, we'll walk through onboarding a new customer, step by step.",
    },
  ],
};
