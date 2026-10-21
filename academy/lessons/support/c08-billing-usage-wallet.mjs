// Track C · Support Playbook C8 — Billing, usage & wallet questions.
// Rates and plan prices from pricing.html (USD, plus taxes). Quarterly billing = 50% off the
// first 3 months, then the normal monthly price plus taxes. Usage at wholesale rates, no markup;
// Pro includes unlimited AI usage. Demo wallet: auto recharge $40 when below $10.
export default {
  id: 'C-8',
  title: 'Kyntlo Academy Support C8 — Billing, usage & wallet questions',
  description:
    "Internal support playbook. How a Kyntlo bill is made up (plan, usage, add-ons), the quarterly first-quarter discount, how the wallet and auto recharge work, SMS segments, wholesale usage rates, AI usage by plan, and how to match a charge to a transaction.",
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'Billing', 'Wallet', 'Usage charges', 'HighLevel rebilling'],
  thumbnail: { kicker: 'Support Playbook C8', title: 'Billing, usage & *wallet*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C8', title: 'Billing, usage & *wallet*', sub: 'Explaining wholesale usage charges, calmly and clearly.' },
      say: "Billing questions need clear, calm answers, because the customer is usually worried about money. In this playbook, you'll learn how a Kyntlo bill is made up, how to explain usage charges at wholesale rates, how the wallet and auto recharge work, and how the quarterly offer affects invoices.",
    },
    {
      chapter: 'Three parts of a bill',
      card: { type: 'chapter', kicker: 'How a bill is made', title: 'Plan + *usage* + add-ons', sub: 'Plan: fixed monthly price plus taxes · Usage: texts, calls, email, AI at wholesale rates · Add-ons: optional extras' },
      say: "A Kyntlo bill has up to three parts. The plan, which is a fixed monthly price plus taxes. Usage, like text messages, calls, emails and AI, charged at wholesale rates with no markup. And optional add-ons, like WhatsApp or a dedicated IP. Most confusion comes from mixing these up, so first work out which part a charge belongs to.",
    },
    {
      chapter: 'The plan',
      goto: '{demo}#/settings/billing/subscription',
      settle: 1.5,
      say: "In Settings, open Billing, and the Subscription tab. This shows the plan, its price, and the next invoice date. Bloom Dental is on Pro, at four hundred and ninety dollars a month plus taxes. Usage isn't part of this price. It's paid separately, from the wallet.",
      caption: "In Settings, open Billing, and the Subscription tab. This shows the plan, its price, and the next invoice date. Bloom Dental is on Pro, at $490 a month plus taxes. Usage isn't part of this price. It's paid separately, from the wallet.",
      actions: [
        { at: 0.5, highlight: '#ss_menu_billing', label: 'Billing', for: 2.4 },
        { at: 4.4, highlight: '#bl_plan', label: 'Plan, price & next invoice', for: 5 },
        { at: 4.6, zoom: '#bl_plan', scale: 1.4, for: 6 },
      ],
    },
    {
      chapter: 'Quarterly billing',
      card: { type: 'chapter', kicker: 'Quarterly billing', title: '*50% off* the first quarter', sub: 'First 3 months: Starter $45 · Growth $135 · Pro $245 per month — then the normal monthly price plus taxes' },
      say: "Now the quarterly offer. Customers who choose quarterly billing get fifty percent off their first three months. That's forty-five dollars a month for Starter, a hundred and thirty-five for Growth, and two hundred and forty-five for Pro. After the first quarter, the plan renews at the normal monthly price plus taxes. If a customer asks why their bill doubled in month four, this is almost always why. The introductory discount has ended. It isn't an error.",
      caption: "Now the quarterly offer. Customers who choose quarterly billing get 50% off their first 3 months. That's $45 a month for Starter, $135 for Growth, and $245 for Pro. After the first quarter, the plan renews at the normal monthly price plus taxes. If a customer asks why their bill doubled in month 4, this is almost always why. The introductory discount has ended. It isn't an error.",
    },
    {
      chapter: 'The wallet',
      goto: '{demo}#/settings/billing/wallet',
      settle: 1.5,
      say: "Usage is paid from the wallet. Open Wallet and Transactions. The balance goes down as usage happens: a text here, a call there. It's not a separate bill that arrives at the end of the month. Behind the scenes, HighLevel charges Kyntlo for the usage, and Kyntlo passes it on at the wholesale rate.",
      caption: "Usage is paid from the wallet. Open Wallet & Transactions. The balance goes down as usage happens: a text here, a call there. It's not a separate bill that arrives at the end of the month. Behind the scenes, HighLevel charges Kyntlo for the usage, and Kyntlo passes it on at the wholesale rate.",
      actions: [
        { at: 0.5, highlight: '#billing_tab_wallet', label: 'Wallet & Transactions', for: 2.8 },
        { at: 3.6, highlight: '#bl_balance_card', label: 'Goes down as usage happens', for: 5 },
        { at: 3.8, zoom: '#bl_balance_card', scale: 1.5, for: 5.4 },
      ],
    },
    {
      chapter: 'Auto recharge',
      say: "Auto Recharge keeps the wallet topped up. Here, when the balance falls below ten dollars, the saved card is charged forty dollars. Each top-up is a separate card charge. So if a customer reports small, unexpected charges on their card between plan invoices, these are usually wallet top-ups. Show them the transaction list.",
      caption: "Auto Recharge keeps the wallet topped up. Here, when the balance falls below $10, the saved card is charged $40. Each top-up is a separate card charge. So if a customer reports small, unexpected charges on their card between plan invoices, these are usually wallet top-ups. Show them the transaction list.",
      actions: [
        { at: 0.4, highlight: '#bl_auto_card', label: 'Auto Recharge', for: 3.4 },
        { at: 0.6, zoom: '#bl_auto_card', scale: 1.5, for: 9 },
        { at: 4.4, highlight: '#bl_auto_below', label: 'Below $10', for: 2.6 },
        { at: 7.2, highlight: '#bl_auto_to', label: 'Add $40', for: 2.6 },
        { at: 15.6, highlight: '#bl_tx_card', label: 'Every top-up', for: 4 },
      ],
    },
    {
      chapter: 'When the wallet runs dry',
      say: "If auto recharge is off, or the card fails, the balance can reach zero. Then usage-based services, like texts and calls, can stop until the wallet is topped up, and workflows that send texts start failing. So when texts suddenly stop across a whole account, check the wallet early. A top-up with Add Balance gets things moving again.",
      actions: [
        { at: 0.4, highlight: '#bl_balance', label: 'Balance', for: 3.4 },
        { at: 15.0, highlight: '#bl_add_balance', label: 'Add Balance', for: 4 },
      ],
    },
    {
      chapter: 'Wholesale rates',
      say: "The usage summary shows each service, the quantity, the rate and the cost. Email is a dollar thirty-five per thousand emails. Text messages are about one point six cents per segment. Calls are two point eight cents a minute outgoing, and one point seven cents incoming. Rates for some countries differ. Always quote Kyntlo's pricing page, never HighLevel's own price list.",
      caption: "The usage summary shows each service, the quantity, the rate and the cost. Email is $1.35 per 1,000 emails ($0.00135 each). Text messages are $0.0158 per segment. Calls are $0.028 a minute outgoing, and $0.017 incoming. Rates for some countries differ. Always quote Kyntlo's pricing page, never HighLevel's own price list.",
      actions: [
        { at: 0.4, highlight: '#bl_usage_card', label: 'Usage summary', for: 3.6 },
        { at: 4.4, zoom: '#bl_usage', scale: 1.35, for: 15 },
        { at: 5.6, highlight: '#bl_usage_0', label: '$0.00135 per email', for: 3.4 },
        { at: 9.4, highlight: '#bl_usage_2', label: '$0.0158 per segment', for: 3.4 },
        { at: 13.2, highlight: '#bl_usage_3', label: '$0.028 / min out', for: 2.6 },
        { at: 15.8, highlight: '#bl_usage_4', label: '$0.017 / min in', for: 2.6 },
      ],
    },
    {
      chapter: 'SMS segments',
      card: { type: 'chapter', kicker: 'SMS segments', title: 'One text can be *several segments*', sub: 'Up to 160 plain characters = 1 segment · With an emoji or special character: 70 · Longer messages split, each part charged · Replies count too' },
      say: "Text charges confuse people most, because they're per segment, not per message. A plain text of up to a hundred and sixty characters is one segment. Add an emoji or certain special characters, and the limit drops to seventy. Longer messages are split into several segments, each one charged. Received texts are charged too. So a friendly reminder with an emoji can cost two or three times what the customer expects.",
      caption: "Text charges confuse people most, because they're per segment, not per message. A plain text of up to 160 characters is one segment. Add an emoji or certain special characters, and the limit drops to 70. Longer messages are split into several segments, each one charged. Received texts are charged too. So a friendly reminder with an emoji can cost 2 or 3 times what the customer expects.",
    },
    {
      chapter: 'AI usage by plan',
      goto: '{demo}#/settings/billing/wallet',
      settle: 1.5,
      say: "AI depends on the plan. On Pro, AI usage is unlimited, so it shows as included. On Starter and Growth, AI is pay as you go. For example, four cents per Conversation AI message, and six cents per Workflow AI run. Phone charges still apply to calls handled by AI, on every plan.",
      caption: "AI depends on the plan. On Pro, AI usage is unlimited, so it shows as included. On Starter and Growth, AI is pay as you go. For example, $0.04 per Conversation AI message, and $0.06 per Workflow AI run. Phone charges still apply to calls handled by AI, on every plan.",
      actions: [
        { at: 0.5, run: (p) => p.evaluate(() => document.querySelector('#bl_usage_6').scrollIntoView({ block: 'center' })) },
        { at: 1.0, zoom: '#bl_usage', scale: 1.35, for: 12 },
        { at: 1.2, highlight: '#bl_usage_6', label: 'Included in Pro', for: 4 },
        { at: 8.6, highlight: '#bl_usage_9', label: 'Pay as you go on Starter & Growth', for: 4 },
      ],
    },
    {
      chapter: 'Matching a charge',
      say: "To answer what's this charge, match it here. Wallet transactions list every top-up and usage charge. Invoices lists the plan invoices, which can be downloaded as P D Fs. If a charge appears in neither, or the amounts don't add up, collect the details and escalate to billing. Refunds and credits follow the current Kyntlo policy, so never promise one yourself.",
      caption: "To answer \"what's this charge?\", match it here. Wallet transactions list every top-up and usage charge. Invoices lists the plan invoices, which can be downloaded as PDFs. If a charge appears in neither, or the amounts don't add up, collect the details and escalate to billing. Refunds and credits follow the current Kyntlo policy, so never promise one yourself.",
      actions: [
        { at: 0.4, run: (p) => p.evaluate(() => document.querySelector('#bl_tx_card').scrollIntoView({ block: 'center' })) },
        { at: 1.0, highlight: '#bl_tx_card', label: 'Top-ups & usage', for: 4 },
        { at: 6.4, click: '#billing_tab_invoices' },
        { at: 7.8, highlight: '#bl_invoices', label: 'Plan invoices', for: 4 },
        { at: 17.0, title: 'Refunds & credits', sub: 'Follow the current Kyntlo policy', for: 4 },
      ],
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: 'Explaining a *bill*', sub: 'Plan, usage or add-on? · First-quarter discount ended? · Wallet top-ups · Rates & segments · AI by plan · Match the transaction · Refunds: current policy' },
      say: "Here's the checklist. Is the charge the plan, usage, or an add-on? Has the first-quarter discount ended? Is it a wallet top-up? Explain rates and segments. Check AI against the plan. Match the transaction. And for refunds or credits, follow the current Kyntlo policy, and escalate to billing with the invoice or transaction details.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Playbook C9', title: 'Upgrades, downgrades & *cancellations*', sub: 'The approved process.', cta: 'Kyntlo [Academy]' },
      say: "That's billing, usage and the wallet. In the next playbook, we'll handle plan upgrades, downgrades and cancellations.",
    },
  ],
};
