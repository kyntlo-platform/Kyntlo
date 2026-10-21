// Track A · Module 3 · Lesson 3 — Inside a contact record.
export default {
  id: 'A-3.3',
  title: 'Kyntlo Academy 3.3 — Inside a contact record',
  description:
    'Tour the Kyntlo contact record: contact details, the activity timeline, replying, notes, tasks, appointments, opportunities and Do Not Disturb.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM tutorial', 'Contact record', 'Do Not Disturb'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 3 · Lesson 3', title: 'Inside a *contact record*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 3 · Lesson 3', title: 'Inside a *contact record*', sub: 'Everything you know about a customer, on one page.' },
      say: "In this lesson, we'll open a contact and look at everything Kyntlo knows about them: their details, their timeline, notes, tasks, appointments and Do Not Disturb settings.",
    },
    {
      chapter: 'Opening a contact',
      goto: '{demo}#/contacts',
      settle: 1,
      say: "From your contact list, click any name. Let's open Olivia Bennett, a new Invisalign lead who found us through a Facebook ad.",
      actions: [
        { at: 0.6, hover: '#ct_row_c1' },
        { at: 0.8, highlight: '#ct_row_c1', label: 'Olivia Bennett', for: 2.6 },
        { at: 4.2, click: '#ct_row_c1 td:nth-child(2)' },
      ],
    },
    {
      chapter: 'Three columns',
      say: "A contact record has three columns. On the left are her details. In the middle is her activity and conversation. And on the right are her opportunities, appointments, tasks and notes.",
      actions: [
        { at: 1.4, highlight: '#cd_left', label: 'Details', for: 2.6 },
        { at: 4.4, highlight: '#cd_activity', label: 'Activity & messages', for: 3 },
        { at: 8.2, highlight: '#cd_right', label: 'Deals, bookings, tasks & notes', for: 3.6 },
      ],
    },
    {
      chapter: 'Contact details',
      say: "Every field on the left can be edited. Click a field, make your change, and a Save button appears at the bottom of the panel. Here, I'll add the company Olivia works for, then save.",
      actions: [
        { at: 1.2, click: '#cd_f_company-name' },
        { at: 2.4, type: 'Studio Nine Design' },
        { at: 4.6, highlight: '#cd_savebar', label: 'Save your change', for: 2.6 },
        { at: 6.8, click: '#cd_save' },
      ],
    },
    {
      chapter: 'The timeline',
      say: "The middle column is her timeline. Every message, booking, tag and change is logged here in order, so anyone on your team can catch up in seconds, even if they've never spoken to her. Switch to Conversations to see just her messages.",
      actions: [
        { at: 0.6, hover: '#cd_activity' },
        { at: 0.8, highlight: '#cd_activity', label: 'Her whole history', for: 4 },
        { at: 8.4, click: '#cd_tab_conversations' },
      ],
    },
    {
      chapter: 'Replying',
      say: "You can reply right from the record. Choose the channel, type your message and click Send. Her reply comes back into this same thread, and into your Conversations inbox. She asked about Thursday, so let's offer her a time.",
      speed: 1.2,
      actions: [
        { at: 0.8, hover: '#cd_channels' },
        { at: 1.0, highlight: '#cd_channels', label: 'SMS, email or WhatsApp', for: 2.4 },
        { at: 3.8, type: 'Hi Olivia! We have Thursday at 10:30 free. Shall I book you in?', into: '#cd_msg', delay: 35 },
        { at: 8.4, click: '#cd_send' },
      ],
    },
    {
      chapter: 'Notes',
      say: "On the right, notes are for anything your team should remember. Click the plus next to Notes, type it in, and save.",
      speed: 1.2,
      actions: [
        { at: 0.8, click: '#cd_addnote' },
        { at: 3.0, type: 'Prefers texts to calls. Ask about payment plans at the scan.', into: '#cd_note_text', delay: 35 },
        { at: 7.0, click: '#cd_note_save' },
        { at: 7.6, highlight: '#cd_notes', label: 'Note saved', for: 2.4 },
      ],
    },
    {
      chapter: 'Tasks',
      say: "Tasks are reminders with a due date and an owner. Let's remind ourselves to call Olivia tomorrow if she hasn't replied. Tasks show up on your dashboard and in the Tasks tab, so nothing slips through the cracks.",
      actions: [
        { at: 0.6, click: '#cd_addtask' },
        { at: 2.6, type: 'Call Olivia if no reply', into: '#cd_task_title' },
        { at: 5.0, highlight: '#cd_task_due', label: 'Due date', for: 2 },
        { at: 7.0, click: '#cd_task_save' },
      ],
    },
    {
      chapter: 'Appointments',
      say: "You can book appointments from here too. Click the plus next to Appointments, choose the calendar and a time, and Kyntlo sends her a confirmation.",
      actions: [
        { at: 0.6, click: '#cd_addappt' },
        { at: 3.0, click: '#cd_appt_cal_k2' },
        { at: 5.4, click: '#cd_appt_t_1030' },
        { at: 6.4, highlight: '.modal', label: 'Invisalign Free Scan · 10:30', for: 2.4 },
        { at: 9.0, click: '#cd_appt_save' },
        { at: 9.6, highlight: '#cd_appts', label: 'Booked', for: 2 },
      ],
    },
    {
      chapter: 'Opportunities',
      say: "At the top on the right, opportunities show the deals linked to her, with their stage and value. Click one to see where the deal stands. We'll dig into those in module six.",
      actions: [
        { at: 0.6, hover: '#cd_right .card' },
        { at: 0.8, highlight: '#cd_right .card', label: 'Her deal', for: 3.4 },
        { at: 1.0, zoom: '#cd_right .card', scale: 1.8, for: 3.4 },
      ],
    },
    {
      chapter: 'Do Not Disturb',
      say: "Finally, scroll down the left side to Do Not Disturb. If someone asks you to stop messaging them, switch on DND for that channel, or for every channel at once.",
      actions: [
        { at: 1.4, hover: '#cd_sec_dnd' },
        { at: 3.0, highlight: '#cd_dnd', label: 'Do Not Disturb', for: 3 },
        { at: 7.0, click: '#cd_dnd_all' },
      ],
    },
    {
      chapter: 'Do Not Disturb',
      say: "With DND on, Kyntlo blocks messages on those channels, including ones from automations and bulk sends. It's how you respect people's wishes and stay on the right side of privacy rules. Olivia is happy to hear from us, so I'll switch it back off.",
      actions: [
        { at: 0.6, zoom: '#cd_dnd', scale: 1.5, for: 4 },
        { at: 11.6, click: '#cd_dnd_all' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Leave a *note* after every call', sub: 'Ten seconds now saves your customer repeating themselves.' },
      say: "Here's a pro tip. After every phone call, take ten seconds to add a note. When a colleague picks up the conversation next week, they'll know exactly where things stand, and your customer never has to repeat themselves.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 3.4', title: 'Tags, custom fields & *custom values*', sub: 'Organise your data so automations can use it.', cta: 'Kyntlo [Academy]' },
      say: "That's the contact record! Next, we'll look at tags, custom fields and custom values, the three tools that make your automations and messages truly personal. See you there.",
    },
  ],
};
