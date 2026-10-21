// Track C · Support Playbook C9 — Plan upgrades, downgrades & cancellations.
// Journeys follow the BRD (sections 11.6–11.8). Anything that is company policy and not in the
// docs (proration, refunds, retention offers, data retention periods, effective dates) is
// stated as "follow the current Kyntlo policy". Plan limits from pricing.html.
export default {
  id: 'C-9',
  title: 'Kyntlo Academy Support C9 — Plan upgrades, downgrades & cancellations',
  description:
    'Internal support playbook. What changes when a customer upgrades, downgrades or cancels; what to check first (features lost, users and pipelines over the limit, effective date); the cancellation sequence; data export; and where the current Kyntlo policy decides.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'Plan changes', 'Cancellations', 'HighLevel SaaS'],
  thumbnail: { kicker: 'Support Playbook C9', title: 'Upgrades, downgrades & *cancellations*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C9', title: 'Plan changes & *cancellations*', sub: 'Upgrades, downgrades and leaving, done properly.' },
      say: "Customers change plans for good reasons: they're growing, they're cutting costs, or they're leaving. In this playbook, you'll learn what changes with each move, what to check before it happens, and where Kyntlo policy decides. When this video says follow the current Kyntlo policy, that's exactly what it means. Check it. Don't guess.",
    },
    {
      chapter: 'What a plan controls',
      card: { type: 'chapter', kicker: 'What a plan controls', title: 'Features, *limits*, price', sub: 'Starter: 3 users, 1 pipeline · Growth: 10 users, 2–3 pipelines, workflows & SMS · Pro: 25 users, unlimited pipelines & AI' },
      say: "A plan controls three things: which features are switched on, the limits, and the price. Starter has up to three users and one pipeline. Growth has up to ten users, two to three pipelines, workflows and texting. Pro has up to twenty-five users, unlimited pipelines and unlimited AI. A plan change updates the same sub-account. Nothing is rebuilt from scratch.",
      caption: "A plan controls three things: which features are switched on, the limits, and the price. Starter has up to 3 users and 1 pipeline. Growth has up to 10 users, 2 to 3 pipelines, workflows and texting. Pro has up to 25 users, unlimited pipelines and unlimited AI. A plan change updates the same sub-account. Nothing is rebuilt from scratch.",
    },
    {
      chapter: 'Where the plan lives',
      goto: '{demo}#/settings/billing/subscription',
      settle: 1.5,
      say: "The current plan is under Settings, Billing, Subscription. Depending on how the account is set up, the customer may be able to start a change here, with Change plan. Either way, before anything is confirmed, check three things: the new price, the date it takes effect, and exactly what the customer gains or loses.",
      actions: [
        { at: 0.5, highlight: '#bl_plan', label: 'Current plan', for: 3.6 },
        { at: 5.0, click: '#bl_change_plan' },
        { at: 6.4, zoom: '.modal', scale: 1.3, for: 8 },
        { at: 12.0, title: 'Before confirming', sub: 'Price · effective date · gains & losses', for: 5 },
      ],
    },
    {
      chapter: 'Upgrades',
      card: { type: 'chapter', kicker: 'Upgrades', title: 'More features, *same account*', sub: 'Contacts, pipelines & automations stay · New features may need setting up · Billing difference: current Kyntlo policy' },
      say: "Upgrades are the simple direction. New features and higher limits are switched on in the same account, and contacts, pipelines and automations stay where they are. Set two expectations. How the price difference is billed follows the current Kyntlo policy. And new features may still need setting up. For example, moving from Starter to Growth means a texting number, and possibly a registration. Any extra Kyntlo templates are added through the approved process.",
    },
    {
      chapter: 'Downgrades',
      card: { type: 'chapter', kicker: 'Downgrades', title: 'Show what will be *lost*', sub: 'Pro → Growth: Voice AI, advanced chatbot, reviews, memberships, missed-call text-back; AI becomes pay-as-you-go · → Starter: also workflows, SMS & WhatsApp' },
      say: "Downgrades need more care. Before anything changes, walk the customer through what they'll lose. Moving from Pro to Growth removes Voice AI, the advanced chatbot, the reputation manager, memberships and missed-call text-back, and AI becomes pay as you go. Moving to Starter also removes workflows, texting and WhatsApp. Anything that depends on a removed feature, like a workflow that sends texts, should be expected to stop.",
    },
    {
      chapter: 'Users over the limit',
      goto: '{demo}#/settings/my-staff',
      settle: 1.5,
      say: "Then check the limits. Count the users in My Staff. Bloom Dental has three users. That fits Starter's limit of three, but leaves no room for anyone new. If an account has more users than the new plan allows, the customer decides who stays, not us, and the extra users are removed before the change.",
      caption: "Then check the limits. Count the users in My Staff. Bloom Dental has 3 users. That fits Starter's limit of 3, but leaves no room for anyone new. If an account has more users than the new plan allows, the customer decides who stays, not us, and the extra users are removed before the change.",
      actions: [
        { at: 0.5, highlight: '#ms_table', label: 'Count the users', for: 5 },
        { at: 0.7, zoom: '#ms_table', scale: 1.35, for: 6 },
      ],
    },
    {
      chapter: 'Pipelines over the limit',
      goto: '{demo}#/opportunities/pipelines',
      settle: 1.5,
      say: "Pipelines work the same way. Bloom has three pipelines, and Starter allows one. So the customer would choose which to keep, and move or close open deals in the others first. Downgrades should never delete customer data on their own. What happens to data in switched-off features, and for how long, follows the current Kyntlo policy.",
      actions: [
        { at: 0.5, highlight: '#pl_table', label: '3 pipelines · Starter allows 1', for: 6 },
        { at: 0.7, zoom: '#pl_table', scale: 1.3, for: 7 },
      ],
    },
    {
      chapter: 'Confirm in writing',
      card: { type: 'chapter', kicker: 'Before any change', title: 'Explicit, *written* confirmation', sub: 'From the account owner or an authorised admin · Through the approved channel · Effective date stated' },
      say: "For any downgrade, get explicit confirmation from the account owner or an authorised admin, in writing, through the approved channel. It should state the new plan, the effective date, and what will be switched off. That protects the customer, and it protects you.",
    },
    {
      chapter: 'Cancellations',
      card: { type: 'chapter', kicker: 'Cancellations', title: 'A clear, *verified* sequence', sub: 'Verify the owner · Effective & access-end dates · Usage, wallet & add-ons · Refund eligibility: current policy · Export · Written confirmation' },
      say: "Cancellations follow a fixed sequence. First, verify the request comes from the account owner, through the approved channel. Confirm the effective date, and when access ends. Settle outstanding usage, the wallet balance and any add-ons. Check refund eligibility against the current Kyntlo refund policy. Offer an export. And send a written confirmation. During the fourteen-day free trial, customers can cancel any time.",
      caption: "Cancellations follow a fixed sequence. First, verify the request comes from the account owner, through the approved channel. Confirm the effective date, and when access ends. Settle outstanding usage, the wallet balance and any add-ons. Check refund eligibility against the current Kyntlo refund policy. Offer an export. And send a written confirmation. During the 14-day free trial, customers can cancel any time.",
    },
    {
      chapter: 'Helping them export',
      goto: '{demo}#/contacts',
      settle: 1.5,
      say: "Help the customer take their data with them. Contacts can be exported from the contact list: select the contacts, then choose Export in bulk actions, to get a spreadsheet file. Ask what else they need, and check what's possible, before the access end date, not after.",
      actions: [
        { at: 0.5, click: '#ct_sel_c1' },
        { at: 2.6, highlight: '#ct_bulk', label: 'Bulk actions', for: 3 },
        { at: 6.0, click: '#ct_bulk_export' },
        { at: 7.4, zoom: '.modal', scale: 1.3, for: 6 },
      ],
    },
    {
      chapter: 'Good practice',
      card: { type: 'chapter', kicker: 'Good practice', title: 'Listen, *offer once*, record', sub: 'No pressure · A genuine alternative, mentioned once · Offers only from current policy · Note the reason for leaving' },
      say: "Don't pressure a customer who wants to leave. If there's a genuine alternative to their problem, like a downgrade instead of cancelling, mention it once. Any discount or save offer must come from the current Kyntlo policy, never improvised. And record the reason for leaving in the ticket, so the team can learn from it.",
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: 'Plan changes, *done right*', sub: 'Verify the owner · Gains & losses explained · Users & pipelines within limits · Effective date confirmed in writing · Billing & refunds: current policy · Export before access ends' },
      say: "Here's the checklist. Verify who's asking. Explain what they gain or lose. Bring users and pipelines within the new limits. Confirm the effective date in writing. Follow the current Kyntlo policy for billing and refunds. And make sure any export happens before access ends.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Playbook C10', title: 'Escalation & *ticket handling*', sub: 'When and how to escalate.', cta: 'Kyntlo [Academy]' },
      say: "That's plan changes and cancellations. In the final playbook, we'll cover escalation and ticket handling.",
    },
  ],
};
