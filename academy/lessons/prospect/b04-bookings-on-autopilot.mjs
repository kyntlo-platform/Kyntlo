// Track B · Video 4 — Bookings on autopilot. Calendars + reminders + no-show recovery.
// Plan facts (pricing.html): calendar booking = every plan; appointment reminders & workflow automation = Growth+.
export default {
  id: 'B4',
  title: 'Bookings on Autopilot — Online Booking, Reminders & No-Show Recovery | Kyntlo',
  description:
    'Let customers book themselves online, send automatic email and text reminders, and win back no-shows with a friendly rebooking workflow, all in Kyntlo.',
  tags: ['Kyntlo', 'Online booking', 'Appointment reminders', 'Reduce no-shows', 'Scheduling software'],
  thumbnail: { kicker: 'Bookings on autopilot', title: 'Fill your diary. *Cut no-shows.*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Bookings on autopilot', title: 'Fill your diary. *Cut no-shows.*', sub: 'Online booking, reminders and no-show recovery.' },
      say: "What if your diary filled itself, reminded every customer, and chased every no-show, without you lifting a finger? Let's see how.",
    },
    {
      chapter: 'Your calendar',
      goto: '{demo}#/calendars/calendar',
      settle: 1,
      say: "This is your Kyntlo calendar. Every booking, for every member of your team, in one view. Day, week or month.",
      actions: [
        { at: 0.4, title: 'Calendars', sub: "Your whole team's diary", for: 3.2 },
        { at: 4.0, highlight: '#cal_filter_users', label: 'Every team member', for: 2.4 },
        { at: 6.6, highlight: '#cal_mode', label: 'Day · Week · Month', for: 2 },
      ],
    },
    {
      chapter: 'Online booking',
      goto: '{demo}#/calendars/settings/edit/k1/details',
      settle: 1,
      say: "Customers book themselves from a simple booking page, and only see times that are genuinely free. Share the link on your website, in emails, or on your Google profile.",
      actions: [
        { at: 0.4, click: '#cal_ed_preview' },
        { at: 1.6, highlight: '.kc-wid', label: 'What customers see', for: 4 },
        { at: 1.8, zoom: '.kc-wid', scale: 1.3, for: 5 },
        { at: 7.4, click: '#cal_pv_slot_0930' },
      ],
    },
    {
      chapter: 'Automatic reminders',
      card: { type: 'chapter', kicker: 'Then Kyntlo takes over', title: 'Reminders that *cut no-shows*', sub: 'Email and text, sent automatically before every appointment.' },
      say: "Then Kyntlo takes over. It confirms every booking, and sends reminders before the appointment, by email and text, automatically.",
    },
    {
      chapter: 'Set your timing',
      goto: '{demo}#/calendars/settings/edit/k1/details',
      settle: 1,
      say: "This calendar sends an email twenty-four hours before, and a text two hours before. You choose the timing, and the message.",
      caption: "This calendar sends an email 24 hours before, and a text 2 hours before. You choose the timing, and the message.",
      actions: [
        { at: 0.3, click: '#cal_ed_tab_notifications' },
        { at: 1.4, zoom: '#cal_ed_sec_reminders', scale: 1.4, for: 6 },
        { at: 1.6, highlight: '#cal_ed_rem_0', label: 'Email · 24 hours before', for: 2.6 },
        { at: 4.4, highlight: '#cal_ed_rem_1', label: 'SMS · 2 hours before', for: 2.6 },
      ],
    },
    {
      chapter: 'When someone no-shows',
      goto: '{demo}#/calendars/calendar',
      settle: 1,
      say: "And when someone doesn't turn up, your team marks the appointment as a no-show, in one click.",
      actions: [
        { at: 0.6, highlight: '#cal_appt_a7', label: 'No-show', for: 3 },
        { at: 0.8, zoom: '#cal_appt_a7', scale: 2, for: 3 },
      ],
    },
    {
      chapter: 'No-show recovery',
      goto: '{demo}#/automation/workflows/w3',
      settle: 1,
      say: "That starts a no-show recovery workflow. It waits thirty minutes, then sends a friendly text with a link to rebook. And if they still haven't rebooked, it creates a task for your team to call.",
      caption: "That starts a no-show recovery workflow. It waits 30 minutes, then sends a friendly text with a link to rebook. And if they still haven't rebooked, it creates a task for your team to call.",
      actions: [
        { at: 0.4, title: 'No-show recovery', sub: 'Workflow · runs by itself', for: 3.4 },
        { at: 4.0, highlight: '#wf_node_s2', label: 'Wait 30 minutes', for: 2.4 },
        { at: 6.6, highlight: '#wf_node_s3', label: 'Rebooking link', for: 3 },
        { at: 10.2, highlight: '#wf_node_s5', label: 'Task: call to rebook', for: 2.8 },
      ],
    },
    {
      chapter: 'Which plan?',
      card: { type: 'chapter', kicker: 'Which plan?', title: 'Booking on *every plan*', sub: 'Online booking: every plan · Reminders & no-show workflows: Growth and Pro' },
      say: "Online booking comes with every Kyntlo plan. Automatic reminders and no-show workflows start on Growth.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'Bookings on autopilot', title: 'Start your free *14-day trial*', sub: 'No setup fees · Cancel anytime', cta: 'kyntlo.ai/[trial]' },
      say: "Let your calendar run itself. Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
