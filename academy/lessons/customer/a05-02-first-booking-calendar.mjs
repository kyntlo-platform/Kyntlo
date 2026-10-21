// Track A · Module 5 · Lesson 2 — Creating your first booking calendar.
// Filmed on the demo workspace (Calendars → Calendar Settings → Create Calendar → Personal Booking).
export default {
  id: 'A-5.2',
  title: 'Kyntlo Academy 5.2 — Creating your first booking calendar',
  description:
    'Build a booking calendar in Kyntlo step by step: name and booking link, team member and location, meeting duration, weekly hours, date-specific hours, buffers, minimum notice and booking limits.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Online booking', 'Booking calendar', 'Availability', 'HighLevel calendars'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 5 · Lesson 2', title: 'Your first *booking calendar*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 5 · Lesson 2', title: 'Creating your first *booking calendar*', sub: 'Availability, duration, buffers and booking limits.' },
      say: "In this lesson, we'll build a booking calendar from scratch. By the end, patients will be able to book you online, only at the times you choose, with breathing room between appointments.",
    },
    {
      chapter: 'Create the calendar',
      goto: '{demo}#/calendars/settings',
      settle: 1,
      say: "Bloom Dental wants patients to book emergency appointments online. In Calendar Settings, click Create Calendar. Emergencies are always seen by Sarah, so choose Personal Booking, and click Continue.",
      actions: [
        { at: 2.4, click: '#cal_create' },
        { at: 6.6, click: '#cal_type_personal' },
        { at: 7.4, highlight: '#cal_type_personal', label: 'Personal Booking', for: 2.4 },
        { at: 10.2, click: '#cal_type_continue' },
      ],
    },
    {
      chapter: 'Name & booking link',
      say: "Start with the details. Give the calendar a clear name, because patients will see it. Kyntlo builds the booking link from the name automatically, and you can shorten it if you like. Then add a short description, so people know what to expect.",
      actions: [
        { at: 0.6, type: 'Emergency Appointment', into: '#cal_ed_name', delay: 60 },
        { at: 4.6, hover: '#cal_ed_slug' },
        { at: 4.8, highlight: '#cal_ed_slug', label: 'Booking link, made for you', for: 3 },
        { at: 8.6, type: 'Toothache, a chipped tooth or a lost filling? We keep same-day slots for you.', into: '#cal_ed_desc', delay: 22 },
      ],
    },
    {
      chapter: 'Team member & location',
      say: "Next, choose who this calendar books with. That's Sarah. Then set the meeting location. Ours is in person at the practice, and the address is added to every confirmation and calendar invite.",
      actions: [
        { at: 0.6, hover: '#cal_ed_tm_sarah' },
        { at: 0.8, highlight: '#cal_ed_team', label: 'Sarah', for: 2.8 },
        { at: 4.6, hover: '#cal_ed_loctype' },
        { at: 4.8, highlight: '#cal_ed_loctype', label: 'In person', for: 2.6 },
        { at: 7.8, hover: '#cal_ed_address' },
        { at: 8.0, highlight: '#cal_ed_address', label: 'Added to confirmations', for: 3 },
      ],
    },
    {
      chapter: 'Duration',
      say: "Now open the Availability tab. First, the meeting duration. Emergency appointments take thirty minutes. The slot interval controls how often a new start time is offered. Every thirty minutes keeps the diary tidy.",
      caption: 'Now open the Availability tab. First, the meeting duration. Emergency appointments take 30 minutes. The slot interval controls how often a new start time is offered. Every 30 minutes keeps the diary tidy.',
      actions: [
        { at: 0.6, click: '#cal_ed_tab_availability' },
        { at: 2.6, hover: '#cal_ed_duration' },
        { at: 3.0, run: (p) => p.selectOption('#cal_ed_duration', '30 mins') },
        { at: 3.2, highlight: '#cal_ed_duration', label: '30 minutes', for: 3 },
        { at: 7.6, hover: '#cal_ed_interval' },
        { at: 8.0, run: (p) => p.selectOption('#cal_ed_interval', '30 mins') },
        { at: 8.2, highlight: '#cal_ed_interval', label: 'A new slot every 30 minutes', for: 3.2 },
      ],
    },
    {
      chapter: 'Weekly hours',
      say: "Below that are your weekly working hours. Switch each day on or off, and set the times. Let's switch on Saturday mornings too, because toothache doesn't wait for Monday. If you take a lunch break, use the plus button to add a second time range on the same day.",
      actions: [
        { at: 0.6, hover: '#cal_ed_hours' },
        { at: 0.8, highlight: '#cal_ed_hours', label: 'Weekly hours', for: 3.4 },
        { at: 5.6, click: '#cal_ed_day_sat' },
        { at: 6.4, zoom: '#cal_ed_sec_hours', scale: 1.4, for: 4 },
      ],
    },
    {
      chapter: 'Date-specific hours',
      say: "Date-specific hours override your normal week for a single day. Bank holidays are already blocked. Let's add Christmas Eve as unavailable too, so nobody can book it.",
      actions: [
        { at: 0.6, hover: '#cal_ed_sec_overrides' },
        { at: 0.8, highlight: '#cal_ed_overrides', label: 'Already blocked', for: 2.6 },
        { at: 4.8, click: '#cal_ed_override' },
        { at: 6.0, run: (p) => p.selectOption('#cal_ov_date', 'Thu 24 Dec 2026') },
        { at: 6.2, highlight: '.modal', label: 'Christmas Eve · unavailable', for: 2.4 },
        { at: 9.0, click: '#cal_ov_apply' },
      ],
    },
    {
      chapter: 'Buffers & notice',
      say: "Now the scheduling rules. A buffer adds breathing room after each appointment, for notes and resetting the room. Minimum scheduling notice stops last-minute surprises. For emergencies, one hour's notice is enough.",
      caption: "Now the scheduling rules. A buffer adds breathing room after each appointment, for notes and resetting the room. Minimum scheduling notice stops last-minute surprises. For emergencies, 1 hour's notice is enough.",
      actions: [
        { at: 0.6, hover: '#cal_ed_sec_rules' },
        { at: 1.4, hover: '#cal_ed_buffer_after' },
        { at: 1.8, run: (p) => p.selectOption('#cal_ed_buffer_after', '10 mins') },
        { at: 2.0, highlight: '#cal_ed_buffer_after', label: '10-minute buffer', for: 3.4 },
        { at: 8.0, hover: '#cal_ed_notice' },
        { at: 8.4, run: (p) => p.selectOption('#cal_ed_notice', '1 hour') },
        { at: 8.6, highlight: '#cal_ed_notice', label: 'At least 1 hour ahead', for: 3.4 },
      ],
    },
    {
      chapter: 'Booking limits',
      say: "Booking limits protect the rest of your day. We'll allow a maximum of four emergency appointments per day, and let patients book up to thirty days ahead. That way, emergencies never squeeze out your routine appointments.",
      caption: "Booking limits protect the rest of your day. We'll allow a maximum of 4 emergency appointments per day, and let patients book up to 30 days ahead. That way, emergencies never squeeze out your routine appointments.",
      actions: [
        { at: 1.6, hover: '#cal_ed_maxday' },
        { at: 2.0, run: (p) => p.selectOption('#cal_ed_maxday', '4') },
        { at: 2.2, highlight: '#cal_ed_maxday', label: 'Max 4 per day', for: 3 },
        { at: 6.0, hover: '#cal_ed_range' },
        { at: 6.4, run: (p) => p.selectOption('#cal_ed_range', '30 days') },
        { at: 6.6, highlight: '#cal_ed_range', label: 'Up to 30 days ahead', for: 3 },
      ],
    },
    {
      chapter: 'Save & share',
      say: "Click Save, and your calendar is live. Use Copy link to share the booking page on your website, in your emails, or on your Google Business Profile. Patients only ever see times when Sarah is genuinely free, because Kyntlo checks her other appointments first.",
      actions: [
        { at: 0.6, click: '#cal_ed_save' },
        { at: 4.6, click: '#cal_ed_link' },
        { at: 5.4, highlight: '#cal_ed_link', label: 'Your booking link', for: 3.4 },
      ],
    },
    {
      chapter: 'Preview',
      say: "Click Preview to see exactly what patients see: the calendar name, the length, the location, and a calendar with only the times that are genuinely free. Pick a time, and they're asked for their details.",
      actions: [
        { at: 0.6, click: '#cal_ed_preview' },
        { at: 2.0, highlight: '.kc-wid', label: 'What patients see', for: 4 },
        { at: 2.2, zoom: '.kc-wid', scale: 1.3, for: 6 },
        { at: 9.4, click: '#cal_pv_slot_0930' },
        { at: 10.6, highlight: '#cal_pv_form', label: 'Their details', for: 2.6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Book *yourself* first', sub: 'Test the link on your phone before you share it.' },
      say: "Here's a pro tip. Before you share the link, book a test appointment yourself, on your phone. You'll spot a confusing name, a missing day, or a wrong time zone in seconds, before a real patient does.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 5.3', title: 'Booking forms, confirmations & *payments*', sub: 'Collect the right details, and a deposit, at booking.', cta: 'Kyntlo [Academy]' },
      say: "Your first calendar is live! In the next lesson, we'll collect the right details at booking, send confirmations, and take a deposit. See you there.",
    },
  ],
};
