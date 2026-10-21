// Track A · Module 9 · Lesson 4 — Appointment workflows.
// Walks through Bloom's appointment confirmation/reminder, no-show and review workflows.
export default {
  id: 'A-9.4',
  title: 'Kyntlo Academy 9.4 — Appointment workflows: confirmations, reminders & no-shows',
  description:
    'Cut no-shows with appointment workflows: confirm every booking, send reminders timed to the appointment, recover no-shows automatically and ask happy patients for a review.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Workflows', 'Appointment reminders', 'No-shows'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 9 · Lesson 4', title: '*Appointment* workflows' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 9 · Lesson 4', title: '*Appointment* workflows', sub: 'Confirmations, reminders and no-show recovery.' },
      say: "Every no-show is an empty chair you can't get back. In this lesson, you'll see the three appointment workflows that most businesses need: confirmations and reminders, no-show recovery, and a review request after the visit.",
    },
    {
      chapter: 'The Appointments folder',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Bloom keeps these in a folder called Appointments. Grouping workflows by purpose like this makes them much easier to find, especially once you have twenty or thirty of them.",
      actions: [
        { at: 0.4, click: '#wf_folder_appointments' },
        { at: 2.6, highlight: '#wf_table tbody', label: 'Appointment workflows', for: 4 },
      ],
    },
    {
      chapter: 'Trigger: booked appointment',
      say: "Let's open the confirmation and reminders workflow. It's triggered by Customer Booked Appointment, filtered to specific calendars. That way, a new patient consultation and a check-up can each have their own wording if you want.",
      actions: [
        { at: 0.4, click: '#wf_row_w2' },
        { at: 2.8, click: '#wf_trigger_0' },
        { at: 4.8, highlight: '.wf-frow', label: 'In calendar is…', for: 4 },
        { at: 5.0, zoom: '.drawer .modal-b', scale: 1.5, for: 5 },
        { at: 13.6, click: '#wft_cancel' },
      ],
    },
    {
      chapter: 'Instant confirmation',
      say: "The first action confirms the booking straight away. Notice the appointment custom value. Kyntlo fills in the real date and time of each person's appointment, so one message works for every booking, whatever the date.",
      actions: [
        { at: 0.4, click: '#wf_node_s1' },
        { at: 2.2, highlight: '#wfa_message', label: '{{appointment.start_time}}', for: 4.6 },
        { at: 2.4, zoom: '#wfa_message', scale: 1.7, for: 5 },
        { at: 10.6, click: '#wfa_cancel' },
      ],
    },
    {
      chapter: 'Reminders timed to the appointment',
      say: "Now the clever part. This wait isn't a fixed delay. It's set to Event, or Appointment Time: one day before. Whether someone books three weeks ahead or tomorrow, the reminder always lands the day before their visit.",
      actions: [
        { at: 0.4, click: '#wf_node_s3' },
        { at: 2.2, highlight: '#wfa_wait_type', label: 'Event / Appointment Time', for: 3.6 },
        { at: 6.2, highlight: '#wfa_wait_opts', label: '1 day before', for: 4 },
        { at: 6.4, zoom: '#wfa_wait_opts', scale: 1.6, for: 4.4 },
        { at: 13.4, click: '#wfa_cancel' },
      ],
    },
    {
      chapter: 'A second reminder',
      say: "After the day-before reminder, a second wait sends one more text two hours before the appointment, with the address. Two reminders like this can make a big difference to your show rate, and your team never has to send them by hand.",
      actions: [
        { at: 0.4, hover: '#wf_node_s4' },
        { at: 0.6, highlight: '#wf_node_s4', label: 'Day before', for: 3 },
        { at: 3.8, hover: '#wf_node_s5' },
        { at: 4.0, highlight: '#wf_node_s5', label: '2 hours before', for: 3 },
        { at: 7.2, hover: '#wf_node_s6' },
        { at: 7.4, highlight: '#wf_node_s6', label: 'Final reminder', for: 3 },
      ],
    },
    {
      chapter: 'Allow re-entry',
      say: "One setting matters a lot here. Open Settings and turn on Allow re-entry. Patients book again and again, and without re-entry, they'd only ever get reminders for their very first appointment.",
      actions: [
        { at: 0.4, click: '#wf_tab_settings' },
        { at: 2.4, click: '#wfs_reentry' },
        { at: 2.8, highlight: '#wfs_reentry', label: 'Allow re-entry', for: 4 },
        { at: 3.0, zoom: '#wfs_reentry', scale: 1.5, for: 4.4 },
        { at: 10.0, click: '#wfs_save' },
      ],
    },
    {
      chapter: 'No-show recovery',
      goto: '{demo}#/automation/workflows/w3',
      settle: 1,
      say: "Next, no-shows. This workflow uses the Appointment Status trigger, filtered to No Show. When your team marks an appointment as a no-show in the calendar, the contact enters this workflow automatically.",
      actions: [
        { at: 0.4, click: '#wf_trigger_0' },
        { at: 2.4, highlight: '.wf-frow', label: 'Appointment status is No Show', for: 4.6 },
        { at: 2.6, zoom: '.drawer .modal-b', scale: 1.5, for: 5 },
        { at: 11.0, click: '#wft_cancel' },
      ],
    },
    {
      chapter: 'A friendly second chance',
      say: "It tags the contact, waits thirty minutes, then sends a friendly text with a link to rebook. No guilt, just an easy way back. A day later, if they still haven't rebooked, it creates a task for someone to call.",
      actions: [
        { at: 0.4, highlight: '#wf_node_s1', label: 'Tag: no-show', for: 2.6 },
        { at: 3.2, highlight: '#wf_node_s2', label: 'Wait 30 minutes', for: 2.6 },
        { at: 6.0, hover: '#wf_node_s3' },
        { at: 6.2, highlight: '#wf_node_s3', label: 'Rebooking link', for: 3.4 },
        { at: 10.4, hover: '#wf_node_s5' },
        { at: 10.6, highlight: '#wf_node_s5', label: 'Task: call to rebook', for: 3 },
      ],
    },
    {
      chapter: 'Review request after the visit',
      goto: '{demo}#/automation/workflows/w4',
      settle: 1,
      say: "The third workflow runs when the status is Showed. Two hours after the visit, while the experience is fresh, it sends a review request. We'll go deeper into reviews in the reputation module.",
      actions: [
        { at: 0.4, highlight: '#wf_trigger_0', label: 'Status: Showed', for: 3.4 },
        { at: 4.2, highlight: '#wf_node_s1', label: 'Wait 2 hours', for: 2.6 },
        { at: 7.0, hover: '#wf_node_s2' },
        { at: 7.2, highlight: '#wf_node_s2', label: 'Send Review Request', for: 3 },
      ],
    },
    {
      chapter: 'Keep reminders running',
      goto: '{demo}#/automation/settings',
      settle: 1,
      say: "One last check. In Global Workflow Settings, Stop on response removes people from workflows when they reply. That's great for sales follow-ups, but a patient who texts back thanks should still get their reminders. So exclude your reminder workflow here.",
      actions: [
        { at: 0.4, highlight: '#gws_stop', label: 'Stop on response', for: 3.6 },
        { at: 8.0, hover: '#gws_exclude' },
        { at: 8.2, highlight: '#gws_exclude', label: 'Excluded: reminders', for: 4 },
        { at: 8.4, zoom: '#gws_exclude', scale: 1.6, for: 4.2 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Mark *no-shows* every day', sub: 'Status triggers only fire when someone updates the status.' },
      say: "Here's a pro tip. The no-show and review workflows only run when someone updates the appointment status. Make it part of your team's end-of-day routine to mark every appointment as showed or no-show. Thirty seconds a day keeps everything running.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 9.5', title: '*Pipeline* automation', sub: 'Move deals automatically and create tasks.', cta: 'Kyntlo [Academy]' },
      say: "Your calendar now looks after itself. In the next lesson, we'll connect workflows to your pipeline, so deals move forward automatically, and nothing slips through the cracks.",
    },
  ],
};
