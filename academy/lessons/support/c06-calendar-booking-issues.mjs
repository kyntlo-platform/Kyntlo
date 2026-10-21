// Track C · Support Playbook C6 — Calendar & booking issues.
// Uses the "Check-up & Clean" round robin calendar (k3: James Okafor & Priya Shah).
// Order: reproduce → working hours & overrides → scheduling rules & limits → team
// assignment → personal availability → connected calendars → time zones → test.
export default {
  id: 'C-6',
  title: 'Kyntlo Academy Support C6 — Calendar & booking issues',
  description:
    'Internal support playbook. Why no times show, the wrong person gets a booking, or a time looks wrong: working hours and date overrides, scheduling notice, date range and daily limits, team assignment, personal availability, Google and Outlook conflict and linked calendars, and time zones.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'Calendars', 'Booking', 'Calendar sync', 'HighLevel'],
  thumbnail: { kicker: 'Support Playbook C6', title: 'Calendar & *booking* issues' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C6', title: 'Calendar & *booking issues*', sub: 'Availability, time zones and sync conflicts.' },
      say: "Calendar tickets usually sound like this: no times are showing, the wrong person got the booking, or the time is wrong. In this playbook, you'll learn where each of those comes from: availability, booking limits, team assignment, connected calendars and time zones.",
    },
    {
      chapter: 'Reproduce it first',
      goto: '{demo}#/calendars/settings/edit/k3/details',
      settle: 1.5,
      say: "Always start by reproducing the problem. Open the calendar the customer means, and click Preview to see exactly what their clients see. Check the date they tried to book. If slots are missing there too, the cause is one of the settings we'll go through next. If they show fine, ask for the exact booking link the client used.",
      actions: [
        { at: 0.5, highlight: '#cal_ed_title', label: 'Check-up & Clean', for: 3 },
        { at: 3.6, click: '#cal_ed_preview' },
        { at: 5.0, highlight: '.kc-wid', label: 'What clients see', for: 5 },
        { at: 5.2, zoom: '.kc-wid', scale: 1.25, for: 6 },
      ],
    },
    {
      chapter: 'Working hours & overrides',
      goto: '{demo}#/calendars/settings/edit/k3/availability',
      settle: 1.5,
      say: "Open Availability. First, the weekly working hours. Outside these hours, no times are offered at all. Then date-specific hours, which override a single day, like a bank holiday or a late opening. A forgotten override is a classic cause of one mysteriously empty day.",
      actions: [
        { at: 0.5, highlight: '#cal_ed_hours', label: 'Weekly hours', for: 4.6 },
        { at: 0.7, zoom: '#cal_ed_sec_hours', scale: 1.3, for: 5 },
        { at: 8.0, highlight: '#cal_ed_overrides', label: 'One-off changes', for: 5 },
        { at: 8.2, zoom: '#cal_ed_sec_overrides', scale: 1.5, for: 5.4 },
      ],
    },
    {
      chapter: 'Scheduling rules & limits',
      say: "Then the scheduling rules. Minimum scheduling notice hides slots that are too soon, so with a day's notice, nothing shows for today. The date range limits how far ahead people can book. Maximum bookings per day closes the day once it's full, even if the hours look free. And buffers before and after each appointment reduce the slots on offer.",
      actions: [
        { at: 0.4, run: (p) => p.evaluate(() => document.querySelector('#cal_ed_sec_rules').scrollIntoView({ block: 'center' })) },
        { at: 1.0, zoom: '#cal_ed_sec_rules', scale: 1.35, for: 18 },
        { at: 2.6, highlight: '#cal_ed_notice', label: 'Minimum notice', for: 4 },
        { at: 7.4, highlight: '#cal_ed_range', label: 'How far ahead', for: 3.4 },
        { at: 11.0, highlight: '#cal_ed_maxday', label: 'Daily limit', for: 4 },
        { at: 16.0, highlight: '#cal_ed_buffer_after', label: 'Buffers', for: 3.4 },
      ],
    },
    {
      chapter: 'Team assignment',
      goto: '{demo}#/calendars/settings/edit/k3/details',
      settle: 1.5,
      say: "Next, team assignment. In Calendar Details, check which team members are on this calendar. This is a round robin calendar, so bookings are shared between James and Priya, and a slot shows when at least one of them is free. If a new team member isn't getting bookings, they probably aren't ticked here.",
      actions: [
        { at: 0.5, highlight: '#cal_ed_team', label: 'Who takes bookings', for: 5 },
        { at: 0.7, zoom: '#cal_ed_team', scale: 1.6, for: 6 },
        { at: 13.0, highlight: '#cal_ed_tm_james', label: 'James', for: 2.4 },
      ],
    },
    {
      chapter: 'Personal availability',
      goto: '{demo}#/calendars/settings/availability',
      settle: 1.5,
      say: "Team members can also have their own availability, under Calendar Settings, Availability. Depending on how a calendar is set up, it can use the team member's hours as well as its own. So when one person never gets bookings, compare their hours with the calendar's. Slots only appear where the two overlap.",
      actions: [
        { at: 0.5, highlight: '#cal_set_availability', label: 'Availability', for: 3 },
        { at: 3.8, highlight: '#cal_set_body .card', label: 'Personal working hours', for: 5 },
        { at: 4.0, zoom: '#cal_set_body .card', scale: 1.25, for: 6 },
      ],
    },
    {
      chapter: 'Conflict calendars',
      goto: '{demo}#/calendars/settings/connections',
      settle: 1.5,
      say: "Next, connected calendars. Each team member connects their own Google or Outlook calendar here. Conflict calendars are checked for busy times. So an all-day event, or a recurring block marked as busy, makes slots disappear. Ask the team member to look at that calendar first. Often the slot really is taken.",
      actions: [
        { at: 0.5, highlight: '#cal_conn_list', label: 'Google or Outlook', for: 4 },
        { at: 5.6, highlight: '#cal_conn_conflicts', label: 'Busy here = blocked', for: 5 },
        { at: 5.8, zoom: '#cal_conn_conflicts', scale: 1.6, for: 7 },
      ],
    },
    {
      chapter: 'Linked calendar & reconnecting',
      say: "The linked calendar is where new bookings are written. If appointments aren't appearing in Google or Outlook, check that the right calendar is linked. If a team member changed their password or removed access, the connection can stop syncing. Disconnecting and reconnecting usually fixes it. Only the team member can do that, because it uses their own Google or Microsoft login.",
      actions: [
        { at: 0.4, highlight: '#cal_conn_linked', label: 'Bookings written here', for: 4.4 },
        { at: 0.6, zoom: '#cal_conn_config', scale: 1.4, for: 6 },
        { at: 12.0, highlight: '#cal_conn_google', label: 'Reconnect if sync stops', for: 5 },
      ],
    },
    {
      chapter: 'Time zones',
      goto: '{demo}#/settings/business-profile',
      settle: 1.5,
      say: "Time zones cause the most confusing tickets. There are three to check. The account's time zone, here in Business Profile. Each team member's own time zone, in their profile. And the visitor's time zone, which the booking widget detects from their device and shows times in. So a client abroad sees different times from the practice. That's expected, and the confirmation shows the correct time.",
      actions: [
        { at: 0.5, run: (p) => p.evaluate(() => document.querySelector('#bp_timezone').scrollIntoView({ block: 'center' })) },
        { at: 4.2, highlight: '#bp_timezone', label: 'Account time zone', for: 4 },
        { at: 4.4, zoom: '#bp_timezone', scale: 1.8, for: 4.4 },
        { at: 9.6, title: 'Three time zones', sub: 'Account · team member · visitor', for: 6 },
      ],
    },
    {
      chapter: 'Test the fix',
      goto: '{demo}#/calendars/settings/edit/k3/details',
      settle: 1.5,
      say: "After any change, save and test. Preview the calendar again, and check the slots match what the customer expects. Then book a test appointment through the live link, and confirm it lands in the right person's diary and in their connected calendar. Cancel the test booking afterwards.",
      actions: [
        { at: 0.5, click: '#cal_ed_preview' },
        { at: 2.0, highlight: '.kc-wid', label: 'Slots as expected?', for: 5 },
        { at: 2.2, zoom: '.kc-wid', scale: 1.25, for: 6 },
      ],
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: 'No slots? *Wrong time?*', sub: 'Reproduce · Hours & overrides · Notice, range, daily limit & buffers · Team members · Personal availability · Conflict & linked calendars · Time zones · Test' },
      say: "Here's the order. Reproduce it. Check hours and overrides. Then notice, date range, daily limits and buffers. Team members. Personal availability. Conflict and linked calendars. Time zones. And test. If everything checks out and slots still don't match, escalate with the calendar name, the date, the time zone and a screenshot of the preview.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Playbook C7', title: 'Domain & *funnel publishing*', sub: 'DNS, SSL and 404s.', cta: 'Kyntlo [Academy]' },
      say: "That's calendars. In the next playbook, we'll fix domain and funnel publishing problems.",
    },
  ],
};
