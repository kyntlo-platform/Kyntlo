// Track A · Module 5 · Lesson 1 — Calendar types explained.
// Filmed on the demo workspace (Calendars → Calendar Settings → Create Calendar).
export default {
  id: 'A-5.1',
  title: 'Kyntlo Academy 5.1 — Calendar types explained',
  description:
    'Personal booking, round robin, class booking, collective booking, service menu and event calendars: what each Kyntlo calendar type does, and which one to use for every kind of appointment.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Online booking', 'Calendars', 'Round robin', 'HighLevel calendars'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 5 · Lesson 1', title: 'Calendar *types* explained' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 5 · Lesson 1', title: 'Calendar *types* explained', sub: 'Pick the right calendar for every kind of booking.' },
      say: "Welcome to Module five, all about calendars and online booking! Before we build one, let's look at the different calendar types, so you can pick the right one for every kind of appointment you offer.",
      caption: "Welcome to Module 5, all about calendars and online booking! Before we build one, let's look at the different calendar types, so you can pick the right one for every kind of appointment you offer.",
    },
    {
      chapter: 'Where calendars live',
      goto: '{demo}#/calendars/settings',
      settle: 1,
      say: "Calendars have their own place in the sidebar. The Calendar Settings tab lists every booking calendar in your account. Bloom Dental already has seven, and each one has a type. The type decides who gets booked, and how.",
      caption: "Calendars have their own place in the sidebar. The Calendar Settings tab lists every booking calendar in your account. Bloom Dental already has 7, and each one has a type. The type decides who gets booked, and how.",
      actions: [
        { at: 0.3, hover: '#sb_calendars' },
        { at: 0.5, highlight: '#sb_calendars', label: 'Calendars', for: 2.4 },
        { at: 3.2, hover: '#tab_settings' },
        { at: 3.4, highlight: '#tab_settings', label: 'Calendar Settings', for: 2.4 },
        { at: 6.4, hover: '#cal_list' },
        { at: 6.6, highlight: '#cal_list', label: 'Every booking calendar', for: 3 },
        { at: 10.4, hover: '#cal_row_k1 .chip' },
        { at: 10.6, zoom: '#cal_list', scale: 1.4, for: 4.4 },
      ],
    },
    {
      chapter: 'Choosing a type',
      say: "When you click Create Calendar, the first thing you choose is the type. Let's go through each one, with a real example from the practice. Take a moment over this choice, because the type is the one thing you can't change later.",
      actions: [
        { at: 0.8, click: '#cal_create' },
        { at: 2.2, highlight: '#cal_types', label: 'Six calendar types', for: 4 },
      ],
    },
    {
      chapter: 'Personal Booking',
      say: "A Personal Booking calendar books time with one specific person. Bloom uses one for implant consultations, which only Sarah does. Patients see Sarah's free times, and nobody else's.",
      actions: [
        { at: 0.4, hover: '#cal_type_personal' },
        { at: 0.6, highlight: '#cal_type_personal', label: 'One person', for: 4 },
        { at: 0.8, zoom: '#cal_type_personal', scale: 1.8, for: 5.5 },
      ],
    },
    {
      chapter: 'Round Robin',
      say: "Round Robin shares bookings across a team. A check-up can be done by James or by Priya, so each booking goes to whoever is free. You can also balance the bookings evenly, or give one person priority.",
      actions: [
        { at: 0.4, hover: '#cal_type_roundrobin' },
        { at: 0.6, highlight: '#cal_type_roundrobin', label: 'Shared across a team', for: 4 },
        { at: 0.8, zoom: '#cal_type_roundrobin', scale: 1.8, for: 6.5 },
      ],
    },
    {
      chapter: 'Class Booking',
      say: "Class Booking is for groups: one host, many attendees, and a set number of seats. Bloom's Invisalign open evening has twelve seats, and bookings stop automatically when it's full.",
      caption: "Class Booking is for groups: one host, many attendees, and a set number of seats. Bloom's Invisalign open evening has 12 seats, and bookings stop automatically when it's full.",
      actions: [
        { at: 0.4, hover: '#cal_type_class' },
        { at: 0.6, highlight: '#cal_type_class', label: 'Groups with seats', for: 4 },
        { at: 0.8, zoom: '#cal_type_class', scale: 1.8, for: 6 },
      ],
    },
    {
      chapter: 'Collective Booking',
      say: "Collective Booking only offers a time when everyone you select is free. For a smile makeover planning session, Sarah and Priya must both be there, so Kyntlo only shows the slots that work for both of them.",
      actions: [
        { at: 0.4, hover: '#cal_type_collective' },
        { at: 0.6, highlight: '#cal_type_collective', label: 'Everyone attends', for: 4 },
        { at: 0.8, zoom: '#cal_type_collective', scale: 1.8, for: 6.5 },
      ],
    },
    {
      chapter: 'Service Menu',
      say: "A Service Menu lets clients choose a service first, like a scan, a clean or whitening, and then pick a time. Each service has its own length and its own team. It's ideal when you offer lots of treatments.",
      actions: [
        { at: 0.4, hover: '#cal_type_service' },
        { at: 0.6, highlight: '#cal_type_service', label: 'Choose a service first', for: 4 },
        { at: 0.8, zoom: '#cal_type_service', scale: 1.8, for: 6.5 },
      ],
    },
    {
      chapter: 'Event Calendar',
      say: "And an Event Calendar is a simple calendar that isn't tied to one team member. Use it for things like a treatment room, or a piece of equipment that people book. Most businesses won't need one on day one.",
      actions: [
        { at: 0.4, hover: '#cal_type_event' },
        { at: 0.6, highlight: '#cal_type_event', label: 'Not tied to a person', for: 4 },
        { at: 0.8, zoom: '#cal_type_event', scale: 1.8, for: 5.5 },
      ],
    },
    {
      chapter: 'Types in your list',
      say: "Let's close this for now. Back in the list, the type is shown next to every calendar. Check-up and Clean is a round robin, the open evening is a class, and the planning session is collective.",
      actions: [
        { at: 0.6, click: '.modal [data-close]' },
        { at: 3.0, hover: '#cal_row_k3' },
        { at: 3.2, zoom: '#cal_list', scale: 1.5, for: 9 },
        { at: 5.6, highlight: '#cal_row_k3', label: 'Round Robin', for: 2.2 },
        { at: 8.0, highlight: '#cal_row_k6', label: 'Class Booking', for: 2 },
        { at: 10.2, highlight: '#cal_row_k7', label: 'Collective Booking', for: 2.2 },
      ],
    },
    {
      chapter: 'Which one should I pick?',
      say: "Not sure which to pick? Ask one question: who needs to be there? If it's one specific person, choose Personal. If anyone on a team will do, choose Round Robin. If several people must attend together, choose Collective. And for groups, choose Class.",
      actions: [
        { at: 0.6, title: 'Who needs to be there?', sub: 'One person · anyone on a team · everyone · a group', for: 5 },
        { at: 6.4, hover: '#cal_row_k5 .chip' },
        { at: 9.0, hover: '#cal_row_k3 .chip' },
        { at: 11.6, hover: '#cal_row_k7 .chip' },
        { at: 14.2, hover: '#cal_row_k6 .chip' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'One calendar per *service*', sub: 'Different services need different lengths, forms and reminders.' },
      say: "Here's a pro tip. Create one calendar per service, rather than one calendar for everything. Different services need different lengths, forms and reminders, and separate calendars make your reports much clearer.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 5.2', title: 'Creating your first *booking calendar*', sub: 'Availability, duration, buffers and booking limits.', cta: 'Kyntlo [Academy]' },
      say: "Now you know the types! In the next lesson, we'll build a booking calendar from scratch, with your hours, buffers and booking limits. See you there.",
    },
  ],
};
