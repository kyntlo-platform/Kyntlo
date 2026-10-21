// Track A · Module 5 · Lesson 6 — Automatic reminders (Growth+).
// Filmed on the demo workspace (Calendar Settings → New Patient Consultation → Notifications & Additional Options).
export default {
  id: 'A-5.6',
  title: 'Kyntlo Academy 5.6 — Automatic appointment reminders',
  description:
    'Cut no-shows with automatic email and SMS appointment reminders in Kyntlo: notifications vs reminders, adding a reminder, timing and message templates, consent and DND, and when to use a workflow instead.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Appointment reminders', 'No-shows', 'SMS reminders', 'HighLevel calendars'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 5 · Lesson 6', title: 'Cut no-shows with *reminders*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 5 · Lesson 6', title: 'Automatic *reminders*', sub: 'Cut no-shows with email and text reminders.' },
      say: "In this lesson, you'll set up automatic appointment reminders by email and text. It's one of the simplest changes you can make, and one of the most effective at cutting no-shows.",
    },
    {
      chapter: 'Why reminders work',
      goto: '{demo}#/calendars/settings',
      settle: 1,
      say: "Most no-shows aren't rude. People simply forget. A reminder the day before, and a short text a couple of hours before, fixes most of that. Reminders are included from the Growth plan. Open your calendar from Calendar Settings.",
      actions: [
        { at: 0.6, title: 'Most no-shows are forgetfulness', sub: 'A timely reminder fixes most of them', for: 5 },
        { at: 8.4, title: 'Appointment reminders', sub: 'Growth plan and above', for: 3.6 },
        { at: 12.4, hover: '#cal_row_k1' },
        { at: 13.6, click: '#cal_edit_k1' },
      ],
    },
    {
      chapter: 'Notifications tab',
      say: "Go to Notifications and Additional Options. At the top are the notifications that go out when something happens: a booking, a reschedule, or a cancellation. Each one uses a template you can edit.",
      actions: [
        { at: 0.6, click: '#cal_ed_tab_notifications' },
        { at: 3.2, hover: '#cal_ed_n_booked' },
        { at: 3.4, highlight: '#cal_ed_sec_notifications', label: 'When something happens', for: 5 },
        { at: 9.4, hover: '#cal_ed_n_booked .btn' },
        { at: 9.6, highlight: '#cal_ed_n_booked .btn', label: 'Edit the template', for: 2.4 },
      ],
    },
    {
      chapter: 'Reminders',
      say: "Below those are reminders, which are sent a set time before the appointment. This calendar already sends an email twenty-four hours before, and a text message two hours before.",
      caption: 'Below those are reminders, which are sent a set time before the appointment. This calendar already sends an email 24 hours before, and a text message 2 hours before.',
      actions: [
        { at: 0.6, hover: '#cal_ed_rem_toggle' },
        { at: 0.8, highlight: '#cal_ed_sec_reminders', label: 'Before the appointment', for: 3.6 },
        { at: 5.0, hover: '#cal_ed_rem_0' },
        { at: 5.2, highlight: '#cal_ed_rem_0', label: 'Email · 24 hours before', for: 2.6 },
        { at: 8.0, hover: '#cal_ed_rem_1' },
        { at: 8.2, highlight: '#cal_ed_rem_1', label: 'SMS · 2 hours before', for: 2.6 },
      ],
    },
    {
      chapter: 'Add a reminder',
      say: "New patients often need to bring forms and their medical history, so let's add one more reminder, a little earlier. Click Add reminder, and choose how to send it. We'll use email, because there's a bit more to say.",
      actions: [
        { at: 4.8, click: '#cal_ed_add_rem' },
        { at: 6.2, highlight: '#cal_rem_ch', label: 'SMS or Email', for: 3 },
        { at: 10.6, click: '#cal_rem_email' },
      ],
    },
    {
      chapter: 'Timing & message',
      say: "Choose when it goes out: forty-eight hours before. Then write the message. The words in curly brackets are custom values, so each patient's name, appointment and time fill in automatically.",
      caption: "Choose when it goes out: 48 hours before. Then write the message. The words in curly brackets are custom values, so each patient's name, appointment and time fill in automatically.",
      actions: [
        { at: 0.6, hover: '#cal_rem_when' },
        { at: 1.6, run: (p) => p.selectOption('#cal_rem_when', '48 hours') },
        { at: 1.8, highlight: '#cal_rem_when', label: '48 hours before', for: 2.6 },
        { at: 5.0, hover: '#cal_rem_msg' },
        { at: 5.2, highlight: '#cal_rem_msg', label: 'Custom values fill in', for: 4 },
        { at: 5.4, zoom: '#cal_rem_msg', scale: 1.6, for: 5 },
      ],
    },
    {
      chapter: 'Save the reminder',
      say: "Click Add reminder, and the calendar now sends three reminders. If the patient cancels or reschedules, Kyntlo stops or moves the reminders for you, so nobody is reminded about an appointment that no longer exists.",
      actions: [
        { at: 0.6, click: '#cal_rem_save' },
        { at: 1.8, highlight: '#cal_ed_rems', label: 'Three reminders', for: 3.6 },
        { at: 2.0, zoom: '#cal_ed_sec_reminders', scale: 1.4, for: 5 },
      ],
    },
    {
      chapter: 'Consent & DND',
      say: "One important rule: only text people who've agreed to receive messages. That's why the booking form from lesson five point three asks for consent. And contacts marked Do Not Disturb never receive texts at all.",
      caption: "One important rule: only text people who've agreed to receive messages. That's why the booking form from lesson 5.3 asks for consent. And contacts marked Do Not Disturb never receive texts at all.",
      actions: [
        { at: 0.6, title: 'Consent first', sub: 'Only text people who agreed to hear from you', for: 5 },
        { at: 8.0, title: 'Do Not Disturb', sub: 'DND contacts never receive texts', for: 4.4 },
      ],
    },
    {
      chapter: 'Save',
      say: "Click Save, and every future booking on this calendar gets these reminders automatically. Repeat the same steps for each of your calendars.",
      actions: [
        { at: 0.6, click: '#cal_ed_save' },
        { at: 1.6, highlight: '#cal_ed_save', label: 'Saved', for: 2 },
      ],
    },
    {
      chapter: 'Going further with workflows',
      say: "Want more control, like a different message for first-time patients, or a text asking people to confirm? Build reminders as a workflow instead. Bloom already has one called Appointment Confirmation and Reminders, and you'll learn to build it in Module nine.",
      caption: "Want more control, like a different message for first-time patients, or a text asking people to confirm? Build reminders as a workflow instead. Bloom already has one called \"Appointment Confirmation & Reminders\", and you'll learn to build it in Module 9.",
      actions: [
        { at: 0.6, title: 'More control?', sub: 'Use a workflow for advanced reminders', for: 5 },
        { at: 9.0, title: 'Appointment Confirmation & Reminders', sub: 'Built in Module 9 · Automation', for: 5 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Two reminders, *not five*', sub: 'One the day before, one a few hours before.' },
      say: "Here's a pro tip. Two or three reminders are plenty. One the day before, so people can rearrange, and one a couple of hours before, as a nudge. Any more starts to feel like nagging, and people tune out.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 6', title: 'Pipelines *explained*', sub: 'Stages, values and statuses for every deal.', cta: 'Kyntlo [Academy]' },
      say: "That's the end of Module five! You can now take bookings, deposits and reminders on autopilot. Next, in Module six, we'll track every deal with pipelines. See you there.",
      caption: "That's the end of Module 5! You can now take bookings, deposits and reminders on autopilot. Next, in Module 6, we'll track every deal with pipelines. See you there.",
    },
  ],
};
