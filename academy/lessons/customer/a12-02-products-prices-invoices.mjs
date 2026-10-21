// Track A · Module 12 · Lesson 2 — Products, prices & invoices.
// Filmed on the Kyntlo demo workspace: Payments › Products and Invoices & Estimates.
export default {
  id: 'A-12.2',
  title: 'Kyntlo Academy 12.2 — Products, prices & invoices',
  description:
    'Create a product with a one-time and a monthly price, then build an invoice: add the customer and items, tax, a due date and payment settings, send it by email and SMS, and record a payment.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Invoices', 'Products', 'Payments'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 12 · Lesson 2', title: 'Products & *invoices*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 12 · Lesson 2', title: 'Products, prices & *invoices*', sub: 'Bill one-off and recurring treatments.' },
      say: "Welcome back! In this lesson, we'll set up a product with two ways to pay, then use it to build, send and settle a professional invoice, in just a few minutes.",
    },
    {
      chapter: 'Why products first',
      goto: '{demo}#/payments/products',
      settle: 1,
      say: "Start in Payments, under Products. A product is anything you sell, and each product can have one or more prices. Set them up once, and you can reuse them on invoices, payment links and order forms, with the right name and price every time.",
      actions: [
        { at: 0.5, title: 'Products', sub: 'Set up once, reuse everywhere', for: 4 },
        { at: 5.4, highlight: '#prod_table', label: 'Your products', for: 4 },
        { at: 10.4, hover: '#prod_row_pr4' },
        { at: 10.6, highlight: '#prod_row_pr4', label: 'One-time or recurring', for: 3.4 },
      ],
    },
    {
      chapter: 'Create a product',
      say: "Click Create product. Give it a clear name, the way you'd like it to appear on an invoice. I'll add composite bonding, with a short description your patients will understand.",
      actions: [
        { at: 0.4, click: '#prod_new' },
        { at: 2.0, type: 'Composite Bonding', into: '#prod_name' },
        { at: 5.6, type: 'Tooth-coloured resin to repair chips and close small gaps. Price per tooth.', into: '#prod_desc', delay: 25 },
      ],
    },
    {
      chapter: 'A one-time price',
      say: "Now add a price. This first one is a one-time price: two hundred and fifty pounds per tooth.",
      caption: 'Now add a price. This first one is a one-time price: £250 per tooth.',
      actions: [
        { at: 0.4, click: '#prod_add_price' },
        { at: 1.8, type: 'Per tooth', into: '#pr_name' },
        { at: 3.4, highlight: '.pay-seg', label: 'One time', for: 2 },
        { at: 4.6, type: '250', into: '#pr_amount' },
        { at: 6.2, click: '#pr_save' },
      ],
    },
    {
      chapter: 'A recurring price',
      say: "Then add a second price, so patients can spread the cost. Choose recurring, set seventy pounds, billed monthly, and limit it to four payments. Leave the number of payments blank for something that runs until it's cancelled, like a membership plan.",
      caption: 'Then add a second price, so patients can spread the cost. Choose Recurring, set £70, billed monthly, and limit it to 4 payments. Leave the number of payments blank for something that runs until it’s cancelled, like a membership plan.',
      actions: [
        { at: 0.4, click: '#prod_add_price' },
        { at: 1.6, click: '#pr_recurring' },
        { at: 2.4, type: 'Pay monthly', into: '#pr_name' },
        { at: 4.6, type: '70', into: '#pr_amount' },
        { at: 6.0, hover: '#pr_interval' },
        { at: 7.4, type: '4', into: '#pr_count' },
        { at: 9.0, zoom: '#pr_rec', scale: 1.5, for: 4.6 },
        { at: 14.6, click: '#pr_save' },
      ],
    },
    {
      chapter: 'Save the product',
      say: "Both prices are listed under Pricing. Click Save product, and it joins your product list, ready to use.",
      actions: [
        { at: 0.4, highlight: '#prod_prices', label: 'Two ways to pay', for: 3 },
        { at: 3.8, click: '#prod_save' },
        { at: 5.2, highlight: '#prod_table tbody tr:first-child', label: 'Composite Bonding', for: 2.6 },
      ],
    },
    {
      chapter: 'Start an invoice',
      say: "Now let's bill a patient. Go to Invoices and Estimates, and click New invoice. On the left is the invoice itself, with your business details already filled in. On the right are its payment settings.",
      actions: [
        { at: 0.4, click: '#tab_invoices' },
        { at: 2.4, click: '#pay_new_invoice' },
        { at: 4.4, highlight: '#inv_paper', label: 'Your invoice', for: 3.4 },
        { at: 8.4, highlight: '#inv_settings', label: 'Payment settings', for: 3 },
      ],
    },
    {
      chapter: 'Customer & items',
      speed: 1.2,
      say: "Click Add customer, and search for the contact. Emma Clarke. Then click Add item, and pick composite bonding. Emma is having two teeth done, so I'll set the quantity to two. I'll also add her teeth whitening.",
      actions: [
        { at: 0.4, click: '#inv_customer' },
        { at: 1.4, type: 'Emma', into: '#inv_cust_q' },
        { at: 2.8, click: '#inv_cust_c3' },
        { at: 4.4, click: '#inv_add_item' },
        { at: 5.4, type: 'Bond', into: '#inv_prod_q' },
        { at: 6.6, click: '.pay-pick-l button:has-text("Composite Bonding")' },
        { at: 8.6, click: '#inv_qty_0' },
        { at: 8.8, press: 'Control+A' },
        { at: 9.0, type: '2' },
        { at: 9.4, press: 'Tab' },
        { at: 11.2, click: '#inv_add_item' },
        { at: 12.2, type: 'Whit', into: '#inv_prod_q' },
        { at: 13.4, click: '.pay-pick-l button:has-text("Teeth Whitening")' },
      ],
    },
    {
      chapter: 'Tax',
      say: "Next, tax. Tick the tax box on each line that needs it, and VAT at twenty percent is added. Cosmetic treatments like whitening are often taxable, while most dental care isn't. If you're not sure, check with your accountant.",
      caption: 'Next, tax. Tick the Tax box on each line that needs it, and VAT at 20% is added. Cosmetic treatments like whitening are often taxable, while most dental care isn’t. If you’re not sure, check with your accountant.',
      actions: [
        { at: 0.6, hover: '#inv_taxck_1' },
        { at: 2.4, click: '#inv_taxck_1' },
        { at: 3.4, zoom: '#inv_totals', scale: 1.7, for: 5 },
      ],
    },
    {
      chapter: 'Due date & payment settings',
      say: "Choose a due date. I'll give Emma seven days. On the right, card payments are on, because Stripe is connected. You can also allow partial payments, and Kyntlo will send polite reminders before and after the due date.",
      actions: [
        { at: 0.4, click: '#inv_due' },
        { at: 1.6, click: '.menu button:has-text("In 7 days")' },
        { at: 4.4, highlight: '#inv_opt_card', label: 'Card payments via Stripe', for: 2.8 },
        { at: 8.0, click: '#inv_opt_partial' },
        { at: 10.4, highlight: '#inv_opt_reminders', label: 'Automatic reminders', for: 3 },
      ],
    },
    {
      chapter: 'Send by email & SMS',
      say: "When it looks right, click Send invoice. Send it by email and by text message. Patients are far more likely to pay straight away from their phone. Then click Send.",
      actions: [
        { at: 0.4, click: '#inv_send' },
        { at: 2.0, highlight: '#snd_email', label: 'Email', for: 2 },
        { at: 4.0, highlight: '#snd_sms', label: 'SMS', for: 2.6 },
        { at: 7.0, zoom: '.modal', scale: 1.3, for: 2.6 },
        { at: 9.8, click: '#snd_send' },
      ],
    },
    {
      chapter: 'Record a payment',
      say: "The invoice is now marked as sent. When Emma pays online, it updates by itself. If she pays at reception instead, click Record payment, choose how she paid, and save. The invoice is marked as paid.",
      actions: [
        { at: 0.4, highlight: '.inv-top', label: 'Status: Sent', for: 3 },
        { at: 6.4, click: '#inv_record' },
        { at: 8.0, click: '#rp_mode' },
        { at: 9.2, click: '.menu button:has-text("Card (in person)")' },
        { at: 10.6, click: '#rp_save' },
        { at: 12.0, highlight: '.inv-top', label: 'Paid', for: 2.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Send an *estimate* first', sub: 'Get the yes in writing, then turn it into an invoice.' },
      say: "Here's a pro tip. For bigger treatments, send an estimate before the invoice. It's in the same place, under Estimates. The patient can accept it online, and you have their agreement in writing before any work begins.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 12.3', title: 'Payment links, *Text2Pay* & order forms', sub: 'Get paid faster, with less admin.', cta: 'Kyntlo [Academy]' },
      say: "You've sent your first invoice! In the next lesson, we'll look at even faster ways to get paid: payment links, Text2Pay, and order forms. See you there.",
    },
  ],
};
