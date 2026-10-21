// Track A · Module 5 · Lesson 4 — Connecting Google / Outlook calendars.
// Filmed on the demo workspace (Calendars → Calendar Settings → Connections).
export default {
  id: 'A-5.4',
  title: 'Kyntlo Academy 5.4 — Connecting Google & Outlook calendars',
  description:
    'Connect Google Calendar or Outlook to Kyntlo, choose a linked calendar for two-way sync, add conflict calendars so private plans block your availability, and add Zoom or Google Meet links.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Google Calendar sync', 'Outlook calendar', 'Double booking', 'HighLevel calendars'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 5 · Lesson 4', title: 'No more *double bookings*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 5 · Lesson 4', title: 'Connecting *Google & Outlook*', sub: 'Two-way sync and conflict calendars.' },
      say: "In this lesson, you'll connect your Google or Outlook calendar to Kyntlo. Once it's done, your bookings appear in the calendar you already use, and you'll never be double-booked again.",
    },
    {
      chapter: 'Why connect',
      goto: '{demo}#/calendars/settings/connections',
      settle: 1,
      say: "Why bother? Without a connection, Kyntlo can't see the dentist's appointment you put in Google, or the school run in Outlook, so a patient could book that exact time. Go to Calendar Settings, then Connections.",
      actions: [
        { at: 0.6, title: 'Why connect?', sub: 'Kyntlo can only avoid what it can see', for: 5 },
        { at: 8.4, hover: '#tab_settings' },
        { at: 9.6, hover: '#cal_set_connections' },
        { at: 9.8, highlight: '#cal_set_connections', label: 'Connections', for: 2.8 },
      ],
    },
    {
      chapter: 'One connection per person',
      say: "Connections are personal. Each team member connects their own calendar, while logged in as themselves. Sarah's Google Calendar is already connected, along with Google Meet. Ask every team member to do this in their first week.",
      actions: [
        { at: 0.6, hover: '#cal_conn_google' },
        { at: 0.8, highlight: '#cal_conn_list', label: 'Your own calendars', for: 3.4 },
        { at: 5.4, highlight: '#cal_conn_google', label: 'Google · connected', for: 3 },
        { at: 5.6, zoom: '#cal_conn_list', scale: 1.5, for: 5 },
      ],
    },
    {
      chapter: 'Connect Outlook',
      say: "Sarah also uses Outlook for her personal life, so let's add that too. Click Connect, sign in with your Microsoft account, and allow Kyntlo to access your calendar.",
      actions: [
        { at: 2.4, hover: '#cal_conn_outlook' },
        { at: 2.6, highlight: '#cal_conn_ms', label: 'Outlook / Microsoft 365', for: 2.6 },
        { at: 5.4, click: '#cal_conn_outlook' },
        { at: 6.6, highlight: '.modal', label: 'Sign in with Microsoft', for: 2.6 },
        { at: 9.4, click: '#cal_ms_allow' },
        { at: 10.6, highlight: '#cal_conn_ms', label: 'Connected', for: 2.4 },
      ],
    },
    {
      chapter: 'Linked calendar',
      say: "Now the important part: configuration. The linked calendar is your two-way sync. Every new Kyntlo booking is added to it, and anything you put in it blocks your Kyntlo availability. Choose the calendar you use for work.",
      actions: [
        { at: 0.6, hover: '#cal_conn_config' },
        { at: 0.8, highlight: '#cal_conn_config', label: 'Calendar configuration', for: 2.6 },
        { at: 4.0, hover: '#cal_conn_linked' },
        { at: 4.2, highlight: '#cal_conn_linked', label: 'Two-way sync', for: 4 },
        { at: 4.4, zoom: '#cal_conn_config', scale: 1.5, for: 9 },
        { at: 12.6, run: (p) => p.selectOption('#cal_conn_linked', { index: 0 }) },
      ],
    },
    {
      chapter: 'Conflict calendars',
      say: "Conflict calendars are only checked for busy times. Kyntlo never writes to them. Tick your family calendar and your Outlook calendar, so private plans block bookings, without patients ever seeing the details.",
      actions: [
        { at: 0.6, hover: '#cal_conn_conflicts' },
        { at: 0.8, highlight: '#cal_conn_conflicts', label: 'Checked for busy times', for: 3.6 },
        { at: 0.8, zoom: '#cal_conn_conflicts', scale: 1.7, for: 11 },
        { at: 6.6, click: '#cal_conn_cf_1' },
        { at: 8.2, click: '#cal_conn_cf_3' },
      ],
    },
    {
      chapter: 'What to leave out',
      say: "Leave out calendars that don't reflect your own time, like a public holidays calendar or a colleague's shared calendar. Otherwise, their events could block slots you're actually free for.",
      actions: [
        { at: 0.6, hover: '#cal_conn_cf_2' },
        { at: 0.8, highlight: '#cal_conn_cf_2', label: 'Leave unticked', for: 3.4 },
      ],
    },
    {
      chapter: 'Save',
      say: "Click Save. From now on, Kyntlo keeps everything in sync automatically, and you can see when it last checked. New bookings will show up in Google within moments.",
      actions: [
        { at: 0.6, click: '#cal_conn_save' },
        { at: 3.6, hover: '#cal_conn_config .muted' },
        { at: 3.8, highlight: '#cal_conn_save', label: 'Saved', for: 2.4 },
      ],
    },
    {
      chapter: 'What two-way sync means',
      say: "Here's what two-way sync means in practice. When a patient books, the appointment appears in your linked calendar, with their name. When you add a lunch meeting in Google, that time disappears from your booking page. And if you move a Kyntlo appointment, the event in Google moves too.",
      actions: [
        { at: 0.6, title: 'Two-way sync', sub: 'Kyntlo → your calendar, and your calendar → Kyntlo', for: 5 },
        { at: 6.0, hover: '#cal_conn_linked' },
        { at: 6.2, highlight: '#cal_conn_linked', label: 'Bookings go here', for: 4 },
        { at: 11.0, highlight: '#cal_conn_conflicts', label: 'Busy times block slots', for: 3.4 },
      ],
    },
    {
      chapter: 'Managing a connection',
      say: "Changed your email address, or leaving the business? Use the three-dot menu next to a connection to manage or disconnect it. Your existing Kyntlo appointments stay exactly where they are.",
      actions: [
        { at: 1.2, hover: '#cal_conn_google .btn' },
        { at: 1.4, highlight: '#cal_conn_google', label: 'Manage or disconnect', for: 4 },
      ],
    },
    {
      chapter: 'Check your time zone',
      say: "One last check: your time zone. Open Preferences, and make sure it matches where you work. For Bloom, that's Europe slash London. If the time zones don't match, synced events can appear an hour out.",
      caption: "One last check: your time zone. Open Preferences, and make sure it matches where you work. For Bloom, that's Europe/London. If the time zones don't match, synced events can appear an hour out.",
      actions: [
        { at: 1.6, click: '#cal_set_preferences' },
        { at: 3.4, highlight: '#cal_set_body .field', label: 'Europe/London', for: 4.4 },
        { at: 3.6, zoom: '#cal_set_body .field', scale: 1.8, for: 5 },
      ],
    },
    {
      chapter: 'Video meetings',
      say: "While you're here, connect Zoom or Google Meet if you offer online consultations. Then choose it as the meeting location in your calendar, and Kyntlo adds a unique video link to every online booking.",
      actions: [
        { at: 0.2, click: '#cal_set_connections' },
        { at: 1.6, hover: '#cal_conn_zoom' },
        { at: 1.8, highlight: '#cal_conn_zoom', label: 'Zoom', for: 2.8 },
        { at: 6.4, title: 'Online consultations', sub: 'A video link is added to every booking', for: 4.6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Test it *both ways*', sub: 'Busy in Google? The slot should disappear in Kyntlo.' },
      say: "Here's a pro tip. Test the sync both ways. Add a busy event in Google, and check that the time disappears from your booking page. Then book a test appointment in Kyntlo, and check it appears in Google.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 5.5', title: 'Managing *appointments*', sub: 'Calendar view, reschedule, cancel and no-shows.', cta: 'Kyntlo [Academy]' },
      say: "You're synced! In the next lesson, we'll manage appointments day to day: booking, rescheduling, cancelling and handling no-shows. See you there.",
    },
  ],
};
