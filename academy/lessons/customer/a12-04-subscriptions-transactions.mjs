// Track A · Module 12 · Lesson 4 — Subscriptions & transactions.
// Filmed on the Kyntlo demo workspace: Payments › Subscriptions and Transactions (with a partial refund).
export default {
  id: 'A-12.4',
  title: 'Kyntlo Academy 12.4 — Subscriptions & transactions',
  description:
    'Manage recurring revenue: read your subscriptions and their statuses, recover past-due payments, cancel a subscription the right way, find any payment in Transactions and issue a full or partial refund.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Subscriptions', 'Refunds', 'Recurring revenue'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 12 · Lesson 4', title: 'Subscriptions & *refunds*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 12 · Lesson 4', title: 'Subscriptions & *transactions*', sub: 'Recurring revenue, failed payments and refunds.' },
      say: "Welcome to the last lesson of module twelve. Recurring revenue is the steadiest money a business can have. In this lesson, you'll learn to manage subscriptions, rescue failed payments, and handle refunds with confidence.",
      caption: "Welcome to the last lesson of Module 12. Recurring revenue is the steadiest money a business can have. In this lesson, you'll learn to manage subscriptions, rescue failed payments, and handle refunds with confidence.",
    },
    {
      chapter: 'Your subscriptions',
      goto: '{demo}#/payments/subscriptions',
      settle: 1,
      say: "Open Payments, then Subscriptions. At the top, you can see four active subscriptions, one of them still in its free trial, bringing in a hundred and eighty pounds every month.",
      caption: 'Open Payments, then Subscriptions. At the top, you can see 4 active subscriptions, one of them still in its free trial, bringing in £180 every month.',
      actions: [
        { at: 0.4, hover: '#tab_subscriptions' },
        { at: 0.6, highlight: '#tab_subscriptions', label: 'Subscriptions', for: 2.4 },
        { at: 3.4, zoom: '.pay-stats', scale: 1.4, for: 7.4 },
        { at: 8.4, hover: '.pay-stats .card:nth-child(2)' },
      ],
    },
    {
      chapter: 'Where they come from',
      say: "A subscription starts whenever someone buys a recurring price, through a payment link, an order form, or an invoice. Their card is saved securely in Stripe, and charged automatically on every billing date.",
      actions: [
        { at: 0.4, highlight: '#sub_table', label: 'Every subscription', for: 4 },
        { at: 5.0, hover: '#sub_row_s3' },
        { at: 5.2, highlight: '#sub_row_s3', label: 'Invisalign monthly plan', for: 3.6 },
      ],
    },
    {
      chapter: 'Subscription statuses',
      say: "Each one has a status. Active means it's paying. Trialing means it's in a free trial. Past due means the last payment failed. And cancelled means it has ended. The buttons above the list filter by status.",
      actions: [
        { at: 0.8, highlight: '#sub_row_s1 td:nth-child(4)', label: 'Active', for: 2.2 },
        { at: 3.2, highlight: '#sub_row_s4 td:nth-child(4)', label: 'Trialing', for: 2.4 },
        { at: 5.8, highlight: '#sub_row_s5 td:nth-child(4)', label: 'Past due', for: 2.6 },
        { at: 8.6, highlight: '#sub_row_s6 td:nth-child(4)', label: 'Cancelled', for: 2.4 },
        { at: 11.2, hover: '#sub_filters' },
        { at: 11.4, highlight: '#sub_filters', label: 'Filter by status', for: 2.4 },
      ],
    },
    {
      chapter: 'Rescue a failed payment',
      say: "Grace's payment failed, because her card was declined. Stripe retries automatically, but you can help. Open her subscription, and click Update payment method. Kyntlo sends her a secure link to add a new card.",
      actions: [
        { at: 0.4, click: '#sub_row_s5' },
        { at: 2.0, highlight: '.drawer .card', label: 'Retrying automatically', for: 3.6 },
        { at: 6.4, hover: '.drawer .modal-f button:has-text("Update payment method")' },
        { at: 9.4, click: '.drawer .modal-f button:has-text("Update payment method")' },
      ],
    },
    {
      chapter: 'Cancel a subscription',
      say: "Ava is moving away, so let's cancel her smile plan. Open it, and click Cancel subscription. Choose to end it at the end of the billing period, so she keeps what she's paid for. Then confirm.",
      actions: [
        { at: 0.4, click: '#sub_row_s1' },
        { at: 2.6, click: '#sub_cancel' },
        { at: 4.0, highlight: '#sub_cancel_when', label: 'End of billing period', for: 3.6 },
        { at: 8.0, click: '#sub_cancel_reason' },
        { at: 9.0, click: '.menu button:has-text("Moving away")' },
        { at: 10.6, click: '#sub_cancel_ok' },
        { at: 12.0, highlight: '#sub_row_s1', label: 'Ends 15 Nov', for: 2.6 },
      ],
    },
    {
      chapter: 'Transactions',
      say: "Now, Transactions. This is every payment that has come in, from every source. Gross volume is three thousand one hundred and sixty-seven pounds, minus ninety pounds of refunds. And one payment has failed.",
      caption: 'Now, Transactions. This is every payment that has come in, from every source. Gross volume is £3,167, minus £90 of refunds. And one payment has failed.',
      actions: [
        { at: 0.4, click: '#tab_transactions' },
        { at: 2.0, highlight: '#tx_table', label: 'Every payment', for: 3.4 },
        { at: 6.0, zoom: '.pay-stats', scale: 1.4, for: 7.4 },
      ],
    },
    {
      chapter: 'Payment details',
      say: "Click any payment to see the details: the card used, the source, and the Stripe charge ID, which you'll need if you ever contact Stripe support. You can resend the receipt from here, too.",
      actions: [
        { at: 0.4, click: '#tx_row_t2' },
        { at: 2.0, highlight: '.drawer .card', label: 'Payment details', for: 4 },
        { at: 6.6, hover: '.drawer .card .row:nth-child(6)' },
        { at: 6.8, zoom: '.drawer .card', scale: 1.5, for: 4.2 },
      ],
    },
    {
      chapter: 'Issue a partial refund',
      say: "Emma's whitening session was cut short, so we'll refund fifty pounds as a goodwill gesture. Click Refund, choose partial refund, enter the amount, pick a reason, and confirm.",
      caption: 'Emma’s whitening session was cut short, so we’ll refund £50 as a goodwill gesture. Click Refund, choose Partial refund, enter the amount, pick a reason, and confirm.',
      actions: [
        { at: 0.4, click: '#tx_refund' },
        { at: 2.4, click: '#rf_type' },
        { at: 3.4, click: '.menu button:has-text("Partial refund")' },
        { at: 4.6, click: '#rf_amount' },
        { at: 4.8, press: 'Control+A' },
        { at: 5.0, type: '50' },
        { at: 6.8, hover: '#rf_reason' },
        { at: 9.2, click: '#rf_ok' },
      ],
    },
    {
      chapter: 'After a refund',
      say: "The payment is now marked as partially refunded. The money goes back to Emma's card, and usually arrives within five to ten working days. Keep in mind that card processing fees aren't returned on refunds.",
      caption: 'The payment is now marked as partially refunded. The money goes back to Emma’s card, and usually arrives within 5 to 10 working days. Keep in mind that card processing fees aren’t returned on refunds.',
      actions: [
        { at: 0.4, hover: '#tx_row_t2' },
        { at: 0.6, highlight: '#tx_row_t2', label: 'Partially refunded', for: 4 },
        { at: 0.8, zoom: '#tx_row_t2', scale: 1.5, for: 4 },
      ],
    },
    {
      chapter: 'Failed payments & exports',
      say: "Further down, Grace's failed payment shows the reason it was declined. And when your accountant asks for figures at the end of the month, click Export, to download every transaction as a spreadsheet.",
      actions: [
        { at: 0.6, hover: '#tx_row_t8' },
        { at: 0.8, highlight: '#tx_row_t8', label: 'Card declined', for: 3.6 },
        { at: 7.2, hover: '#view .page-head .actions button' },
        { at: 7.4, highlight: '#view .page-head .actions button', label: 'Export', for: 2.8 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Check *past due* every week', sub: 'A friendly personal message saves most of them.' },
      say: "Here's a pro tip. Every week, filter your subscriptions for past due, and send each person a short, friendly message. Most failed payments are just expired cards, and a personal nudge saves far more of them than automatic retries alone.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 13', title: 'Creating a *course*', sub: 'Memberships & courses in Kyntlo.', cta: 'Kyntlo [Academy]' },
      say: "That's module twelve complete! You can now get paid, and manage every payment that comes in. In module thirteen, we'll create your first online course in Memberships. See you there!",
      caption: "That's Module 12 complete! You can now get paid, and manage every payment that comes in. In Module 13, we'll create your first online course in Memberships. See you there!",
    },
  ],
};
