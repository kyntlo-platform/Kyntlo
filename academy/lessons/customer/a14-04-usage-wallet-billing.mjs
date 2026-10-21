// Track A · Module 14 · Lesson 4 — Usage, wallet & billing.
// Filmed on the demo workspace (academy/demo-app): Settings → Billing.
// Rates match the wholesale usage table on kyntlo.ai/pricing.
export default {
  id: 'A-14.4',
  title: 'Kyntlo Academy 14.4 — Usage, wallet & billing',
  description:
    'Understand how Kyntlo billing works: your plan subscription, your wallet balance, the usage summary at wholesale rates (email, SMS, calls, AI), adding balance, auto recharge, transactions and invoices.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Billing', 'Wallet', 'Wholesale rates', 'Settings'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 14 · Lesson 4', title: 'Usage, wallet & *billing*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 14 · Lesson 4', title: 'Usage, wallet & *billing*', sub: 'Know exactly what you pay for, and why.' },
      say: "In this lesson, we'll make sense of your Kyntlo bill. You'll learn the difference between your plan and your usage, how to read your wallet, and how to make sure your calls and messages never stop.",
    },
    {
      chapter: 'Your plan',
      goto: '{demo}#/settings/billing/subscription',
      settle: 1,
      say: "Open Settings, then Billing. Your bill has two parts. The first is your plan, a fixed monthly price. Bloom is on Pro, at four hundred and ninety dollars a month plus taxes. It covers all the features, your users, and your hosting.",
      caption: "Open Settings, then Billing. Your bill has two parts. The first is your plan, a fixed monthly price. Bloom is on Pro, at $490 a month plus taxes. It covers all the features, your users, and your hosting.",
      actions: [
        { at: 0.4, highlight: '#ss_menu_billing', label: 'Billing', for: 2.4 },
        { at: 5.0, highlight: '#bl_plan', label: 'Your plan', for: 5 },
        { at: 5.2, zoom: '#bl_plan', scale: 1.4, for: 6 },
      ],
    },
    {
      chapter: 'Your wallet',
      say: "The second part is usage: the emails, texts and calls you actually send and make. These are paid from your wallet. Open Wallet and Transactions. Here's your current balance, and usage is deducted from it as it happens.",
      caption: "The second part is usage: the emails, texts and calls you actually send and make. These are paid from your wallet. Open Wallet & Transactions. Here's your current balance, and usage is deducted from it as it happens.",
      actions: [
        { at: 0.4, click: '#billing_tab_wallet' },
        { at: 8.6, highlight: '#bl_balance_card', label: 'Current balance', for: 4 },
        { at: 8.8, zoom: '#bl_balance_card', scale: 1.5, for: 4.4 },
      ],
    },
    {
      chapter: 'Usage summary',
      say: "Below is your usage summary for the month. For each service, you see how much you used, the rate, and the cost. These are wholesale rates, with no markup from Kyntlo. You pay what the telecom and AI providers charge.",
      actions: [
        { at: 0.4, highlight: '#bl_usage_card', label: 'This month so far', for: 4 },
        { at: 5.0, zoom: '#bl_usage', scale: 1.35, for: 8 },
      ],
    },
    {
      chapter: 'Email & SMS',
      say: "Email is very cheap: about a seventh of a cent per email. Bloom's newsletter to two thousand one hundred and forty patients cost under three dollars. Texts are billed per segment, at about one and a half cents. One segment is up to a hundred and sixty characters, and emojis shorten that to seventy, so keep texts short.",
      caption: "Email is very cheap: $0.00135 per email. Bloom's newsletter to 2,140 patients cost under $3. Texts are billed per segment, at $0.0158. One segment is up to 160 characters, and emojis shorten that to 70, so keep texts short.",
      actions: [
        { at: 0.4, zoom: '#bl_usage_0', scale: 1.6, for: 6 },
        { at: 0.6, highlight: '#bl_usage_0', label: '$0.00135 per email', for: 5 },
        { at: 10.6, zoom: '#bl_usage_2', scale: 1.6, for: 8 },
        { at: 10.8, highlight: '#bl_usage_2', label: '$0.0158 per segment', for: 7 },
      ],
    },
    {
      chapter: 'Calls & AI',
      say: "Calls are billed per minute: just under three cents to make a call, and under two cents to receive one. And on Pro, AI usage is unlimited, so Conversation AI, Content AI, Reviews AI and Workflow AI show as included. On other plans, they're charged at the rates you see here.",
      caption: "Calls are billed per minute: $0.028 to make a call, and $0.017 to receive one. And on Pro, AI usage is unlimited, so Conversation AI, Content AI, Reviews AI and Workflow AI show as included. On other plans, they're charged at the rates you see here.",
      actions: [
        { at: 0.4, highlight: '#bl_usage_3', label: '$0.028 / min out', for: 3 },
        { at: 3.6, highlight: '#bl_usage_4', label: '$0.017 / min in', for: 3 },
        { at: 7.4, zoom: '#bl_usage_6', scale: 1.4, for: 8 },
        { at: 7.6, highlight: '#bl_usage_7', label: 'Included in Pro', for: 6 },
      ],
    },
    {
      chapter: 'Add balance',
      say: "To top up, click Add Balance. Choose an amount, check the card, and confirm. The new balance shows straight away.",
      actions: [
        { at: 0.4, click: '#bl_add_balance' },
        { at: 2.0, click: '#bl_amt_100' },
        { at: 3.6, zoom: '.modal', scale: 1.35, for: 3 },
        { at: 6.6, click: '#bl_add_confirm' },
        { at: 7.8, highlight: '#bl_balance', label: 'Updated', for: 2.4 },
      ],
    },
    {
      chapter: 'Auto recharge',
      say: "Better still, switch on auto recharge. Here, whenever Bloom's balance falls below ten dollars, the wallet adds forty dollars from the saved card. That way, reminders, missed-call text-backs and phone calls never stop because of an empty wallet.",
      caption: "Better still, switch on auto recharge. Here, whenever Bloom's balance falls below $10, the wallet adds $40 from the saved card. That way, reminders, missed-call text-backs and phone calls never stop because of an empty wallet.",
      actions: [
        { at: 0.4, highlight: '#bl_auto_card', label: 'Auto Recharge', for: 4 },
        { at: 0.6, zoom: '#bl_auto_card', scale: 1.45, for: 9 },
        { at: 4.8, hover: '#bl_auto_below' },
        { at: 7.0, hover: '#bl_auto_to' },
        { at: 12.6, click: '#bl_auto_save' },
      ],
    },
    {
      chapter: 'Transactions & invoices',
      say: "Wallet transactions lists every top-up and usage charge, so you can see exactly where the money went. And the Invoices tab keeps your monthly plan invoices, ready to download for your accountant.",
      actions: [
        { at: 0.4, highlight: '#bl_tx_card', label: 'Every top-up and charge', for: 4.4 },
        { at: 6.6, click: '#billing_tab_invoices' },
        { at: 8.2, highlight: '#bl_invoices', label: 'Plan invoices', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Review usage *once a month*', sub: 'A sudden jump usually means a workflow needs a look.' },
      say: "Here's a pro tip. Glance at your usage summary once a month. If one line suddenly jumps, it's usually a workflow sending more often than you meant, and it's an easy fix once you spot it.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 14.5', title: 'Data, privacy & *DND*', sub: 'Consent, unsubscribes and exports.', cta: 'Kyntlo [Academy]' },
      say: "Now you know exactly what you're paying for. In the last lesson of this module, we'll cover data, privacy and do not disturb. See you there.",
    },
  ],
};
