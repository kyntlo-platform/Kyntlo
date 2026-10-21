// Track A · Module 12 · Lesson 1 — Connecting Stripe.
// Filmed on the Kyntlo demo workspace (Payments › Integrations). The demo starts connected,
// so the first walkthrough scene disconnects Stripe off camera.
export default {
  id: 'A-12.1',
  title: 'Kyntlo Academy 12.1 — Connecting Stripe',
  description:
    'Connect Stripe so you can take card payments on invoices, payment links, order forms, calendar bookings and Text2Pay. Covers what you need before you start, test mode, and adding PayPal.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Stripe', 'Payments', 'Online payments'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 12 · Lesson 1', title: 'Connect *Stripe*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 12 · Lesson 1', title: 'Connecting *Stripe*', sub: 'Start taking card payments in a few minutes.' },
      say: "Welcome to module twelve, all about getting paid! Before Kyntlo can take a single card payment, it needs a payment provider. In this lesson, we'll connect Stripe, test it safely, and see where it's used.",
      caption: "Welcome to Module 12, all about getting paid! Before Kyntlo can take a single card payment, it needs a payment provider. In this lesson, we'll connect Stripe, test it safely, and see where it's used.",
    },
    {
      chapter: 'Where to connect',
      goto: '{demo}#/payments/integrations',
      setup: [{ run: (page) => page.evaluate(() => { KY.payments.stripe = false; KY.payments.testMode = false; KY.go(location.hash); }) }],
      settle: 1,
      say: "Open Payments in the sidebar, then the Integrations tab. This is where every payment provider lives. Stripe is the one we recommend. You can also connect PayPal, Square, Authorize dot net or NMI.",
      caption: 'Open Payments in the sidebar, then the Integrations tab. This is where every payment provider lives. Stripe is the one we recommend. You can also connect PayPal, Square, Authorize.net or NMI.',
      actions: [
        { at: 0.4, hover: '#sb_payments' },
        { at: 0.6, highlight: '#sb_payments', label: 'Payments', for: 2.4 },
        { at: 3.0, hover: '#tab_integrations' },
        { at: 3.2, highlight: '#tab_integrations', label: 'Integrations', for: 2.4 },
        { at: 6.6, highlight: '#int_stripe', label: 'Recommended', for: 3.4 },
        { at: 10.4, hover: '#int_paypal' },
      ],
    },
    {
      chapter: 'Before you start',
      say: "Before you connect, have three things ready: your business details, the bank account you want your money paid into, and some photo ID. Stripe asks for these to verify your business, and it's a legal requirement.",
      actions: [
        { at: 0.6, title: 'Have these ready', sub: 'Business details · Bank account · Photo ID', for: 7.4 },
        { at: 1.0, move: [1100, 640] },
      ],
    },
    {
      chapter: 'Connect Stripe',
      say: "Now click Connect on the Stripe card. Kyntlo explains what happens next. You'll go to Stripe, where you can sign in to an existing account, or create a new one for free.",
      actions: [
        { at: 0.4, hover: '#int_stripe_connect' },
        { at: 1.4, click: '#int_stripe_connect' },
        { at: 3.0, highlight: '.modal', label: 'What happens next', for: 4.4 },
        { at: 3.2, zoom: '.modal', scale: 1.3, for: 4.2 },
        { at: 8.0, hover: '#stripe_go' },
      ],
    },
    {
      chapter: 'Authorise the connection',
      say: "Click Connect with Stripe. Stripe asks you to choose the account for this business. Check the name and currency, pounds for a UK business, then click Connect.",
      actions: [
        { at: 0.6, click: '#stripe_go' },
        { at: 2.2, highlight: '.stripe-o', label: 'This happens on Stripe', for: 3.6 },
        { at: 6.0, hover: '.stripe-o .card' },
        { at: 6.2, zoom: '.stripe-o .card', scale: 1.8, for: 3.4 },
        { at: 10.0, click: '#stripe_authorize' },
      ],
    },
    {
      chapter: 'Connected',
      say: "And that's it. The Stripe card now says connected, and shows the account and the mode. Live mode means real payments. You can open your Stripe dashboard from here at any time, to see payouts and fees.",
      actions: [
        { at: 0.4, highlight: '#int_stripe', label: 'Connected', for: 3.6 },
        { at: 0.6, zoom: '#int_stripe', scale: 1.6, for: 7 },
        { at: 10.4, hover: '#int_stripe_manage' },
      ],
    },
    {
      chapter: 'Test mode',
      say: "Want to try things out first? Switch on test mode at the top. Test payments never move real money. Stripe's test card number is four two four two, repeated four times. When you're done, switch test mode off again.",
      caption: "Want to try things out first? Switch on test mode at the top. Test payments never move real money. Stripe's test card number is 4242 4242 4242 4242. When you're done, switch test mode off again.",
      actions: [
        { at: 1.4, click: '#pay_testmode' },
        { at: 2.8, highlight: '#int_stripe', label: 'Test mode', for: 3 },
        { at: 7.0, title: 'Test card', sub: '4242 4242 4242 4242 · any future date · any CVC', for: 5 },
        { at: 13.0, click: '#pay_testmode' },
      ],
    },
    {
      chapter: 'Adding PayPal',
      say: "Some customers prefer PayPal. You can connect it alongside Stripe. You'll need a client ID and secret key from the Apps and Credentials page of your PayPal developer dashboard. Make sure you use the live ones.",
      caption: 'Some customers prefer PayPal. You can connect it alongside Stripe. You’ll need a Client ID and Secret key from the Apps & Credentials page of your PayPal Developer dashboard. Make sure you use the Live ones.',
      actions: [
        { at: 0.4, click: '#int_paypal_connect' },
        { at: 2.0, highlight: '.modal', label: 'PayPal keys', for: 4 },
        { at: 6.4, hover: '#pp_client' },
        { at: 8.4, hover: '#pp_secret' },
        { at: 11.2, click: '.modal-f button:has-text("Cancel")' },
      ],
    },
    {
      chapter: 'Where payments show up',
      say: "Once Stripe is connected, you can take card payments everywhere in Kyntlo: on invoices, payment links and Text2Pay, on funnel order forms, and as deposits when someone books an appointment.",
      actions: [
        { at: 0.4, click: '#tab_invoices' },
        { at: 2.0, hover: '#pay_new_invoice' },
        { at: 3.6, hover: '#tab_payment-links' },
        { at: 5.0, hover: '#pay_text2pay' },
        { at: 6.8, hover: '#tab_orders' },
        { at: 8.4, hover: '#sb_calendars' },
        { at: 8.6, highlight: '#sb_calendars', label: 'Booking deposits', for: 2.6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Make a real *£1 test*', sub: 'Pay yourself, check the payout, then refund it.' },
      say: "Here's a pro tip. Once you're live, send yourself a one pound payment link, and pay it with your own card. Check it appears in Transactions and in Stripe, then refund it. Now you know the whole journey works, before a customer ever tries it.",
      caption: "Here's a pro tip. Once you're live, send yourself a £1 payment link, and pay it with your own card. Check it appears in Transactions and in Stripe, then refund it. Now you know the whole journey works, before a customer ever tries it.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 12.2', title: 'Products, prices & *invoices*', sub: 'Bill one-off and recurring treatments.', cta: 'Kyntlo [Academy]' },
      say: "You're ready to take payments! In the next lesson, we'll set up your products and prices, and send our first invoice. See you there.",
    },
  ],
};
