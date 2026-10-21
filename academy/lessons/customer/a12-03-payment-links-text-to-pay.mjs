// Track A · Module 12 · Lesson 3 — Payment links, Text2Pay & order forms.
// Filmed on the Kyntlo demo workspace: Payments › Payment Links, Invoices (Text2Pay), Orders, Transactions.
export default {
  id: 'A-12.3',
  title: 'Kyntlo Academy 12.3 — Payment links, Text2Pay & order forms',
  description:
    'Get paid faster: create a reusable payment link, text a one-off payment request with Text2Pay, and understand how funnel order forms feed your Orders and Transactions.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Payment links', 'Text2Pay', 'Order forms'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 12 · Lesson 3', title: 'Get paid *faster*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 12 · Lesson 3', title: 'Payment links, *Text2Pay* & order forms', sub: 'Three quick ways to get paid.' },
      say: "Welcome back! Invoices are great for treatment plans, but sometimes you just need to get paid, quickly. In this lesson, we'll cover three faster options: payment links, Text2Pay, and order forms.",
    },
    {
      chapter: 'Payment links',
      goto: '{demo}#/payments/payment-links',
      settle: 1,
      say: "A payment link is a checkout page for one or more products, with its own web address. You create it once, and share it as often as you like. This whitening link has already been paid fourteen times.",
      caption: 'A payment link is a checkout page for one or more products, with its own web address. You create it once, and share it as often as you like. This whitening link has already been paid 14 times.',
      actions: [
        { at: 0.5, title: 'Payment Links', sub: 'Create once, share anywhere', for: 4 },
        { at: 5.0, highlight: '#plk_table', label: 'Your links', for: 3.6 },
        { at: 9.6, hover: '#plk_row_lk1' },
        { at: 9.8, highlight: '#plk_row_lk1', label: 'Paid 14 times', for: 3.4 },
      ],
    },
    {
      chapter: 'Create a payment link',
      say: "Let's make one for a check-up and clean. Click Create payment link, name it, and add the product. Prices come straight from your product list, so they're always right.",
      actions: [
        { at: 0.4, click: '#pay_newlink' },
        { at: 2.0, type: 'Check-up & Clean', into: '#plk_name' },
        { at: 5.4, click: '#plk_add_product' },
        { at: 6.6, type: 'Check', into: '#plk_prod_q' },
        { at: 7.8, click: '.pay-pick-l button:has-text("Check-up & Clean")' },
        { at: 8.8, highlight: '#plk_products', label: 'From your products', for: 2.6 },
      ],
    },
    {
      chapter: 'Checkout options',
      say: "Choose what the checkout asks for. Collecting a phone number is handy for appointment reminders. You can also allow coupon codes, and decide what happens after payment: a confirmation page, or a page on your own website.",
      actions: [
        { at: 0.4, highlight: '#plk_phone', label: 'Collect phone number', for: 3.4 },
        { at: 5.2, hover: '#plk_coupon' },
        { at: 7.4, click: '#plk_after' },
        { at: 8.6, highlight: '.menu', label: 'After payment', for: 2.8 },
        { at: 11.6, click: '.menu button:has-text("Show a confirmation page")' },
      ],
    },
    {
      chapter: 'Share your link',
      say: "Click Create link, and it's ready. Copy it into a text, an email, a social post or your website. There's a QR code too. Print it at reception, and patients can pay from their phone. When an offer ends, just switch its link off.",
      actions: [
        { at: 0.4, click: '#plk_save' },
        { at: 2.0, highlight: '#plk_url', label: 'Your link', for: 3 },
        { at: 4.4, click: '#plk_copy' },
        { at: 7.6, hover: '.modal .row > div:last-child' },
        { at: 7.8, zoom: '.modal', scale: 1.4, for: 3.6 },
        { at: 11.6, click: '#plk_done' },
      ],
    },
    {
      chapter: 'Text2Pay',
      say: "Next, Text2Pay. It's perfect for a one-off amount for one person, like a deposit. You'll find it on the Invoices tab. It creates a quick invoice, and texts the payment link straight to the patient's phone. It's ideal straight after a phone call, when someone has just said yes.",
      actions: [
        { at: 0.4, click: '#tab_invoices' },
        { at: 3.6, hover: '#pay_text2pay' },
        { at: 3.8, highlight: '#pay_text2pay', label: 'Text2Pay', for: 3 },
        { at: 8.6, click: '#pay_text2pay' },
      ],
    },
    {
      chapter: 'Send a Text2Pay request',
      speed: 1.15,
      say: "Pick the customer, Liam Patel, and his number fills in. Choose the item: the implant consultation deposit. The message on the right is exactly what Liam will see. Click Send, and he can pay in a couple of taps.",
      actions: [
        { at: 0.4, click: '#t2p_customer' },
        { at: 1.4, type: 'Liam', into: '#t2p_cust_q' },
        { at: 2.6, click: '#t2p_cust_c4' },
        { at: 4.0, click: '#t2p_item' },
        { at: 5.0, type: 'Implant', into: '#t2p_prod_q' },
        { at: 6.2, click: '.pay-pick-l button:has-text("Implant Consultation Deposit")' },
        { at: 8.0, hover: '#t2p_preview' },
        { at: 8.2, zoom: '.pay-phone', scale: 1.5, for: 3.4 },
        { at: 12.4, click: '#t2p_send' },
      ],
    },
    {
      chapter: 'Track it like an invoice',
      say: "Because Text2Pay creates an invoice, you can track it here like any other. You can also send payment requests from a conversation, while you're chatting with a patient.",
      actions: [
        { at: 0.6, highlight: '#inv_table tbody tr:first-child', label: 'Text2Pay invoice', for: 3.6 },
        { at: 5.6, hover: '#sb_conversations' },
        { at: 5.8, highlight: '#sb_conversations', label: 'Also from Conversations', for: 3 },
      ],
    },
    {
      chapter: 'Order forms',
      say: "Finally, order forms. These live on your funnels and websites. You add an order form element to a page in the funnel builder, which we covered in module seven. Every purchase shows up here, in Orders.",
      caption: 'Finally, order forms. These live on your funnels and websites. You add an order form element to a page in the funnel builder, which we covered in Module 7. Every purchase shows up here, in Orders.',
      actions: [
        { at: 0.4, click: '#tab_orders' },
        { at: 2.4, highlight: '#view .card.row', label: 'Built in Sites › Funnels', for: 4.6 },
        { at: 8.0, highlight: '#ord_table', label: 'Orders from your funnels', for: 3.4 },
      ],
    },
    {
      chapter: 'Upsells & order bumps',
      say: "Order forms are best when you're selling online. They support order bumps, like adding the smile plan at checkout, and one-click upsells after payment. Here, Ava bought whitening, and added the smile plan as a bump.",
      actions: [
        { at: 0.6, title: 'Order forms', sub: 'Order bumps & one-click upsells', for: 5 },
        { at: 8.4, hover: '#ord_table tbody tr:nth-child(2)' },
        { at: 8.6, highlight: '#ord_table tbody tr:nth-child(2)', label: 'Whitening + smile plan', for: 3.4 },
      ],
    },
    {
      chapter: 'Every payment in one place',
      say: "Wherever the money comes from, it all lands in Transactions. The source column tells you whether each payment came from an invoice, a link, Text2Pay, a subscription, or an order form.",
      actions: [
        { at: 0.4, click: '#tab_transactions' },
        { at: 2.0, highlight: '#tx_table', label: 'Every payment', for: 3.4 },
        { at: 6.0, zoom: '#tx_table', scale: 1.4, for: 5 },
        { at: 6.2, hover: '#tx_row_t3' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Pick the *right tool*', sub: 'Link to repeat · Text2Pay for one person · Order form to sell online' },
      say: "Here's a pro tip. Use a payment link for anything you sell again and again at a fixed price. Use Text2Pay for a one-off amount to one person. And use an order form when you're selling on your website, so you can add upsells.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 12.4', title: 'Subscriptions & *transactions*', sub: 'Recurring revenue, failed payments and refunds.', cta: 'Kyntlo [Academy]' },
      say: "Now you have three fast ways to get paid. In the final lesson of this module, we'll manage subscriptions, failed payments and refunds. See you there!",
    },
  ],
};
