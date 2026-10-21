// Track A · Module 5 · Lesson 3 — Booking forms, confirmations & payments.
// Filmed on the demo workspace (Calendar Settings → Implant Consultation → Forms & Payment).
export default {
  id: 'A-5.3',
  title: 'Kyntlo Academy 5.3 — Booking forms, confirmations & payments',
  description:
    'Collect the right information when people book a Kyntlo calendar, take a deposit through Stripe, choose what happens after booking, and send booking confirmations automatically.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Online booking', 'Booking deposits', 'Stripe', 'HighLevel calendars'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 5 · Lesson 3', title: 'Take a *deposit* at booking' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 5 · Lesson 3', title: 'Booking forms, confirmations & *payments*', sub: 'Collect the right details, and a deposit, at booking.' },
      say: "In this lesson, you'll make your booking calendar work harder. We'll collect the right details when people book, take a deposit by card, and make sure everyone gets a confirmation straight away.",
    },
    {
      chapter: 'Open the calendar',
      goto: '{demo}#/calendars/settings',
      settle: 1,
      say: "We'll set up Bloom's implant consultation, a longer appointment where a no-show really hurts. Open it from Calendar Settings, then go to the Forms and Payment tab.",
      actions: [
        { at: 0.6, hover: '#cal_row_k5' },
        { at: 0.8, highlight: '#cal_row_k5', label: 'Implant Consultation', for: 3 },
        { at: 5.0, click: '#cal_edit_k5' },
        { at: 8.0, click: '#cal_ed_tab_forms' },
      ],
    },
    {
      chapter: 'The default form',
      say: "By default, the booking form asks for four things: first name, last name, phone and email. That's enough to create the contact in your CRM, and to send confirmations and reminders.",
      actions: [
        { at: 0.6, hover: '#cal_ed_fields' },
        { at: 0.8, highlight: '#cal_ed_sec_form', label: 'Default form', for: 3.4 },
        { at: 1.0, zoom: '#cal_ed_sec_form', scale: 1.5, for: 6 },
      ],
    },
    {
      chapter: 'A custom form',
      say: "For new patients, we need more. Choose Custom form, and select a form you've built in Sites, like New Patient Registration. Now patients give their date of birth, current dentist and any medical notes while they book.",
      actions: [
        { at: 1.6, click: '#cal_ed_form_custom' },
        { at: 3.4, highlight: '#cal_ed_formsel', label: 'Your form from Sites', for: 3.4 },
        { at: 8.6, hover: '#cal_ed_fields' },
        { at: 8.8, highlight: '#cal_ed_fields', label: 'Extra questions', for: 4 },
        { at: 9.0, zoom: '#cal_ed_sec_form', scale: 1.5, for: 5 },
      ],
    },
    {
      chapter: 'Consent',
      say: "The form also asks for consent to text and email reminders. You'll want that in place before you switch on the reminders in lesson five point six.",
      caption: "The form also asks for consent to text and email reminders. You'll want that in place before you switch on the reminders in lesson 5.6.",
      actions: [
        { at: 0.6, hover: '#cal_ed_fields .chip:last-child' },
        { at: 0.8, highlight: '#cal_ed_fields .chip:last-child', label: 'Reminder consent', for: 3.6 },
      ],
    },
    {
      chapter: 'Accept payments',
      say: "Next, payments. Switch on Accept payments. Kyntlo charges the card through your connected Stripe account, so the money goes straight to your business. If Stripe isn't connected yet, you'll do that under Payments, in Module twelve.",
      caption: "Next, payments. Switch on Accept payments. Kyntlo charges the card through your connected Stripe account, so the money goes straight to your business. If Stripe isn't connected yet, you'll do that under Payments, in Module 12.",
      actions: [
        { at: 0.6, hover: '#cal_ed_pay' },
        { at: 1.6, click: '#cal_ed_pay' },
        { at: 3.0, highlight: '#cal_ed_paybox .row', label: 'Stripe connected', for: 3.6 },
        { at: 3.2, zoom: '#cal_ed_sec_pay', scale: 1.4, for: 6 },
      ],
    },
    {
      chapter: 'Deposit amount',
      say: "Enter the amount. Bloom takes a fifty pound deposit, which comes off the treatment later. Deposits cut no-shows dramatically, because people turn up for appointments they've already paid for.",
      caption: "Enter the amount. Bloom takes a £50 deposit, which comes off the treatment later. Deposits cut no-shows dramatically, because people turn up for appointments they've already paid for.",
      actions: [
        { at: 0.6, type: '50', into: '#cal_ed_amount', delay: 200 },
        { at: 1.6, highlight: '#cal_ed_amount', label: '£50 deposit', for: 3 },
        { at: 6.0, hover: '#cal_ed_currency' },
        { at: 6.2, highlight: '#cal_ed_currency', label: 'Pounds sterling', for: 2.4 },
      ],
    },
    {
      chapter: 'Receipt description',
      say: "Add a short description. It appears on the patient's receipt, so they know exactly what they paid for, and that it counts towards their treatment.",
      actions: [
        { at: 0.6, hover: '#cal_ed_paydesc' },
        { at: 0.8, highlight: '#cal_ed_paydesc', label: 'Shown on the receipt', for: 4 },
      ],
    },
    {
      chapter: 'After booking',
      say: "Under After booking, choose what people see once they've booked: a thank-you message, or a redirect to a page on your website, for example one that explains how to prepare for the visit.",
      actions: [
        { at: 0.6, hover: '#cal_ed_thanks' },
        { at: 0.8, highlight: '#cal_ed_sec_after', label: 'Thank-you message or redirect', for: 4.6 },
      ],
    },
    {
      chapter: 'Confirmations',
      say: "Confirmations live in the next tab, Notifications and Additional Options. The booking confirmation goes out by email and text the moment someone books, to the patient, and to the team member they're seeing.",
      actions: [
        { at: 0.6, click: '#cal_ed_tab_notifications' },
        { at: 3.0, hover: '#cal_ed_n_booked' },
        { at: 3.2, highlight: '#cal_ed_n_booked', label: 'Booking confirmation', for: 4 },
        { at: 3.4, zoom: '#cal_ed_n_booked', scale: 1.6, for: 6 },
      ],
    },
    {
      chapter: 'Auto-confirm',
      say: "Further down, Auto-confirm marks new bookings as Confirmed straight away. Switch it off if you'd rather review each booking yourself first. Then click Save.",
      actions: [
        { at: 0.6, hover: '#cal_ed_autoconfirm' },
        { at: 0.8, highlight: '#cal_ed_opt_confirm', label: 'Auto-confirm', for: 4 },
        { at: 7.4, click: '#cal_ed_save' },
      ],
    },
    {
      chapter: 'Test it',
      say: "Now preview it. Pick a time, and you'll see the longer form, then the card payment, secured by Stripe, before the booking is made. That's exactly what your patients will see.",
      actions: [
        { at: 0.6, click: '#cal_ed_preview' },
        { at: 2.4, click: '#cal_pv_slot_1100' },
        { at: 3.6, highlight: '#cal_pv_form', label: 'Form + £50 deposit', for: 5 },
        { at: 3.8, zoom: '#cal_pv_form', scale: 1.3, for: 6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Keep the form *short*', sub: 'Ask only what you need before the visit.' },
      say: "Here's a pro tip. Keep booking forms short. Every extra question loses a few bookings. Ask only what you truly need before the visit, and collect the rest when the patient arrives.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 5.4', title: 'Connecting *Google & Outlook*', sub: 'Two-way sync and conflict calendars.', cta: 'Kyntlo [Academy]' },
      say: "Your calendar now collects details and deposits! Next, we'll connect your Google or Outlook calendar, so you never get double-booked. See you there.",
    },
  ],
};
