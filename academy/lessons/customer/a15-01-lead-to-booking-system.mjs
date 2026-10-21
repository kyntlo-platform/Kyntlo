// Track A · Module 15 · Lesson 1 — Capstone: a complete lead-to-booking system.
// Tours the pieces built across the course on the demo workspace, following one lead:
// funnel → form → workflow → pipeline → calendar → reminders → review request.
export default {
  id: 'A-15.1',
  title: 'Kyntlo Academy 15.1 — Build a complete lead-to-booking system',
  description:
    'Put the whole course together: follow one lead from your funnel and form, through an instant-reply workflow and your pipeline, to a booked appointment, reminders and a review request.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Capstone', 'Lead to booking', 'Marketing automation'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 15 · Capstone', title: 'Your *lead-to-booking* system' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 15 · Lesson 1', title: 'Your *lead-to-booking* system', sub: 'Everything you have learned, working together.' },
      say: "Welcome to the capstone! You've learned each part of Kyntlo on its own. Now we'll connect them into one system that turns a stranger into a booked, happy customer, mostly on autopilot. We'll follow one real lead, Olivia, all the way through.",
    },
    {
      chapter: 'The system',
      card: { type: 'chapter', kicker: 'The system', title: 'Funnel → Form → *Workflow* → Pipeline → Calendar → Review', sub: 'Six pieces, one journey.' },
      say: "Here's the whole system in one line. A funnel attracts the lead. A form captures their details. A workflow replies instantly, and creates a deal in your pipeline. The calendar takes the booking, reminders make sure they turn up, and a review request turns a good visit into social proof.",
    },
    {
      chapter: '1. The funnel',
      goto: '{demo}#/sites/funnels',
      settle: 1,
      say: "It starts in Sites. Bloom runs a funnel called Invisalign Free Scan Offer. Their Facebook ads send people here. The page explains the offer, and has one clear call to action: claim your free scan.",
      actions: [
        { at: 0.4, highlight: '#sb_sites', label: 'Sites', for: 2.4 },
        { at: 3.2, hover: '#fn_row_f1' },
        { at: 3.4, highlight: '#fn_row_f1', label: 'Invisalign Free Scan Offer', for: 4.4 },
        { at: 3.6, zoom: '#fn_row_f1', scale: 1.5, for: 4.4 },
      ],
    },
    {
      chapter: '2. The form',
      say: "On that funnel sits the Invisalign Enquiry form. Every submission creates or updates a contact in your CRM automatically. This form has already captured over four hundred enquiries.",
      caption: 'On that funnel sits the Invisalign Enquiry form. Every submission creates or updates a contact in your CRM automatically. This form has already captured over 400 enquiries.',
      actions: [
        { at: 0.4, click: '#tab_forms' },
        { at: 2.2, hover: '#fm_row_fm1' },
        { at: 2.4, highlight: '#fm_row_fm1', label: 'Invisalign Enquiry', for: 4.4 },
        { at: 2.6, zoom: '#fm_row_fm1', scale: 1.5, for: 4.4 },
      ],
    },
    {
      chapter: '3. The instant-reply workflow',
      goto: '{demo}#/automation/workflows/w1',
      settle: 1,
      say: "The moment Olivia submits it, this workflow fires. Its trigger is that exact form. It creates her deal in the pipeline, texts her within seconds with a booking link, and alerts the team member who owns the lead.",
      actions: [
        { at: 0.4, highlight: '#wf_trigger_0', label: 'Form is Invisalign Enquiry', for: 3.6 },
        { at: 4.4, highlight: '#wf_node_s1', label: 'Deal created', for: 2.8 },
        { at: 7.6, hover: '#wf_node_s2' },
        { at: 7.8, highlight: '#wf_node_s2', label: 'Instant SMS + booking link', for: 3.4 },
        { at: 11.6, highlight: '#wf_node_s3', label: 'Team alerted', for: 2.6 },
      ],
    },
    {
      chapter: '4. The pipeline',
      say: "In Opportunities, Olivia's deal is waiting in New Enquiry, with its value and source already filled in. Nobody typed anything. When she books, the pipeline workflow from lesson nine point five moves her to Consultation Booked.",
      caption: "In Opportunities, Olivia's deal is waiting in New Enquiry, with its value and source already filled in. Nobody typed anything. When she books, the pipeline workflow from lesson 9.5 moves her to Consultation Booked.",
      actions: [
        { at: 0.3, click: '#sb_opportunities' },
        { at: 2.2, highlight: '#op_col_0', label: 'New Enquiry', for: 4.4 },
        { at: 9.4, hover: '#op_col_2' },
        { at: 9.6, highlight: '#op_col_2', label: 'Consultation Booked', for: 3.4 },
      ],
    },
    {
      chapter: '5. The calendar',
      say: "The link in her text opens your booking calendar. She picks a time that suits her, and it lands right here, in the right person's calendar, with no back-and-forth emails.",
      actions: [
        { at: 0.3, click: '#sb_calendars' },
        { at: 2.2, highlight: '#cal_grid', label: 'Bookings land here', for: 5 },
      ],
    },
    {
      chapter: '6. Confirmations & reminders',
      goto: '{demo}#/automation/workflows/w2',
      settle: 1,
      say: "Booking triggers the appointment workflow. Olivia gets an instant confirmation, then reminders the day before and two hours before. This is the part that protects you from no-shows. And if she does miss it, the no-show workflow offers her a new time.",
      actions: [
        { at: 0.4, highlight: '#wf_trigger_0', label: 'Customer Booked Appointment', for: 3.4 },
        { at: 4.2, highlight: '#wf_node_s1', label: 'Confirmation', for: 2.6 },
        { at: 7.2, hover: '#wf_node_s3' },
        { at: 7.4, highlight: '#wf_node_s3', label: 'Day-before reminder', for: 3 },
      ],
    },
    {
      chapter: '7. The review request',
      goto: '{demo}#/automation/workflows/w4',
      settle: 1,
      say: "After her visit, the team marks the appointment as showed. Two hours later, this workflow asks Olivia for a review, while the experience is still fresh.",
      actions: [
        { at: 0.4, highlight: '#wf_trigger_0', label: 'Status: Showed', for: 3.4 },
        { at: 4.4, hover: '#wf_node_s2' },
        { at: 4.6, highlight: '#wf_node_s2', label: 'Review request', for: 3.4 },
      ],
    },
    {
      chapter: '8. Reputation',
      say: "Those reviews flow into Reputation. More happy customers leave reviews, your rating climbs, and your next ad brings in even more leads like Olivia. That's the loop that makes the whole system grow.",
      actions: [
        { at: 0.3, click: '#sb_reputation' },
        { at: 2.2, highlight: '#rp_kpis', label: 'Reviews & rating', for: 4 },
        { at: 7.0, highlight: '#rp_latest', label: 'Fresh reviews', for: 3.6 },
      ],
    },
    {
      chapter: 'Test it end to end',
      goto: '{demo}#/contacts/detail/c1',
      settle: 1,
      say: "Before you trust any system, test it as a customer. Fill in your own form, then open your contact record. The activity timeline should show every step: the form, the tags, the deal, and every message the workflows sent.",
      actions: [
        { at: 0.4, title: 'Test it as a customer', sub: 'Then check the contact record', for: 4 },
        { at: 5.0, highlight: '#cd_activity', label: 'Every step, in order', for: 5 },
        { at: 10.4, highlight: '#cd_tags', label: 'Tags added automatically', for: 3 },
      ],
    },
    {
      chapter: 'Measure it',
      say: "Finally, watch it work. Your dashboard shows how many leads came in, how many booked, and how much revenue the system produced. If one number dips, you now know exactly which piece to look at.",
      actions: [
        { at: 0.3, click: '#sb_dashboard' },
        { at: 2.4, highlight: '#w_funnel', label: 'Lead → booked → won', for: 4.4 },
        { at: 7.6, highlight: '#w_conversion', label: 'Conversion rate', for: 3.6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Build it *one link* at a time', sub: 'Get each piece working and tested before adding the next.' },
      say: "Here's a pro tip. Don't build everything in one afternoon. Add one link of the chain, test it with your own details, and only then add the next. A simple system that works beats a clever one that breaks.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 15.2', title: 'Your *30-day* action plan', sub: 'What to set up, in which order.', cta: 'Kyntlo [Academy]' },
      say: "That's a complete lead-to-booking system, built from everything you've learned. In the final lesson, I'll give you a thirty-day plan, so you know exactly what to set up first. See you there!",
    },
  ],
};
