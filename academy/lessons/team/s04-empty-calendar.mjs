// Kyntlo Team Academy · Batch 1 · s04 "My calendar is empty and people don't show up" (internal team).
// Approved script (doc "Kyntlo Team Academy: Batch 1 Scripts", section c06). Design: Sunrise.
// Filmed on the demo workspace (fictional Bloom Dental Studio) plus designed scenes in scenes/s04.html.
import { team } from './kit/lesson.mjs';

const t = team('s04');
const { page, gaps, clearGaps, booking } = t;
// Bookings that fill the week, landing one after another.
const fill = [
  { id: 'f1', contact: 'c3', calendar: 'k4', day: 0, start: '11:00', end: '12:00', status: 'confirmed', with: 'Priya Shah' },
  { id: 'f2', contact: 'c7', calendar: 'k3', day: 1, start: '13:00', end: '13:30', status: 'confirmed', with: 'James Okafor' },
  { id: 'f3', contact: 'c13', calendar: 'k1', day: 2, start: '14:30', end: '15:15', status: 'confirmed', with: 'Sarah Mitchell' },
  { id: 'f4', contact: 'c6', calendar: 'k3', day: 4, start: '15:00', end: '15:30', status: 'confirmed', with: 'Priya Shah' },
  { id: 'f5', contact: 'c11', calendar: 'k2', day: 0, start: '15:00', end: '15:30', status: 'confirmed', with: 'Sarah Mitchell' },
  { id: 'f6', contact: 'c14', calendar: 'k3', day: 4, start: '11:00', end: '11:30', status: 'confirmed', with: 'James Okafor' },
];

export default {
  ...t.base,
  id: 'S-04',
  title: "Kyntlo Team Academy s04 - My calendar is empty and people don't show up",
  transitions: ['radial', 'circlecrop'],
  music: { preset: 'calendar' },
  scenes: [
    { page: page('intro'), duration: 3.8, watermark: false },
    {
      page: page('hook'),
      voice: { voice: 'bf_isabella', speed: 1.0 },
      tail: 1,
      say: 'Half my week is gaps, and the other half is people who never turn up.',
    },
    {
      chapter: 'Empty slots',
      goto: '{demo}#/calendars/calendar',
      settle: 1,
      duration: 10,
      say: 'An empty slot is money you cannot get back.',
      actions: [
        { at: 0.3, run: gaps({ delay: 90 }) },
        { at: 0.4, focus: '#cal_day_2' },
        { at: 2.4, title: 'Empty hours this week', sub: 'Each one is lost revenue', for: 4.6 },
      ],
    },
    {
      page: page('booking'),
      cursor: true,
      duration: 15,
      say: 'Give customers a booking link. They pick a time that suits them, day or night, no phone tag.',
      actions: [
        { at: 2.4, click: '#bk_d3' },
        { at: 4.0, click: '#bk_s_1100' },
        { at: 6.2, click: '#bk_go' },
        { at: 7.4, focus: '#bk_done' },
      ],
    },
    {
      chapter: 'Set it up once',
      goto: '{demo}#/calendars/settings/edit/k1/details',
      settle: 1,
      duration: 17,
      say: 'Set your hours, buffers and services once. Kyntlo only offers times you can actually do.',
      actions: [
        { at: 0.3, highlight: '#cal_ed_name', label: 'The service', for: 2.2 },
        { at: 2.6, click: '#cal_ed_tab_availability' },
        { at: 3.8, highlight: '#cal_ed_sec_hours', label: 'Your working hours', for: 2.8 },
        { at: 6.8, highlight: '#cal_ed_sec_rules', label: 'Buffers between visits', for: 3.2 },
        { at: 7.0, zoom: '#cal_ed_sec_rules', scale: 1.4, for: 3 },
        { at: 10.6, highlight: '#cal_ed_sec_duration', label: '45 minutes, every time', for: 3.4 },
        { at: 14.4, highlight: '#cal_ed_sec_overrides', label: 'Holidays blocked out', for: 2.4 },
      ],
    },
    {
      page: page('confirm'),
      duration: 8.6,
      say: 'The moment they book, they get a confirmation by text and email, and it lands in your calendar.',
    },
    {
      chapter: 'In the calendar',
      goto: '{demo}#/calendars/calendar',
      settle: 1,
      duration: 9,
      actions: [
        { at: 0.6, run: booking({ id: 'z1', contact: 'c60', calendar: 'k1', day: 3, start: '11:00', end: '11:45', status: 'confirmed', with: 'Sarah Mitchell' }) },
        { at: 0.8, highlight: '#cal_appt_z1', label: 'Zara Ahmed · Thursday 11:00', for: 4.8 },
        { at: 1.0, zoom: '#cal_appt_z1', scale: 1.8, for: 3.6 },
        { at: 5.8, click: '#cal_appt_z1' },
        { at: 6.8, highlight: '#cal_drawer', label: 'Confirmed, with every detail', for: 2.2 },
      ],
    },
    {
      page: page('remind'),
      cursor: true,
      duration: 11,
      say: 'A day before and an hour before, automatic reminders go out. Customers can confirm or reschedule in one tap.',
      actions: [{ at: 6.6, click: '#rm_yes' }],
    },
    {
      chapter: 'The reminder workflow',
      goto: '{demo}#/automation/workflows/w21',
      settle: 1,
      duration: 10,
      actions: [
        { at: 0.3, highlight: '#wf_trigger_0', label: 'Customer booked', for: 1.8 },
        { at: 2.2, highlight: '#wf_node_s1', label: 'Confirmation text', for: 1.4 },
        { at: 3.7, highlight: '#wf_node_s3', label: '24 hours before', for: 1.5 },
        { at: 5.3, highlight: '#wf_node_s5', label: '1 hour before', for: 1.5 },
        { at: 6.9, highlight: '#wf_node_s6', label: 'See you soon', for: 2.8 },
      ],
    },
    {
      chapter: 'Built into every calendar',
      goto: '{demo}#/calendars/settings/edit/k1/notifications',
      settle: 1,
      duration: 5.4,
      actions: [{ at: 0.3, highlight: '#cal_ed_sec_reminders', label: 'Reminders switched on per calendar', for: 4.6 }],
    },
    {
      chapter: 'A fuller week',
      goto: '{demo}#/calendars/calendar',
      settle: 1,
      duration: 12,
      say: 'Fewer gaps, fewer no-shows, and nobody on your team playing receptionist.',
      actions: [
        { at: 0.2, run: gaps({ delay: 40 }) },
        { at: 1.4, run: clearGaps },
        ...fill.map((a, i) => ({ at: 1.8 + i * 0.55, run: booking(a) })),
        { at: 5.6, highlight: '#cal_grid', label: 'Booked while the team works', for: 5.8 },
      ],
    },
    {
      chapter: 'Show rate',
      goto: '{demo}#/reporting/appointments',
      settle: 1,
      duration: 5.4,
      actions: [{ at: 0.3, highlight: '#rp_appt_kpis', label: 'Shows and no-shows, counted for you', for: 4.6 }],
    },
    {
      page: page('tip'),
      tail: 2,
      say: 'Selling tip: ask, how many appointments did you lose to no-shows last month? Multiply by the average job value and let them hear the number.',
      caption: 'Selling tip: ask, "How many appointments did you lose to no-shows last month?" Multiply by the average job value and let them hear the number.',
    },
    { page: page('outro'), watermark: false, duration: 6.2, say: 'Fill the diary. Kyntlo, Own Tomorrow.' },
  ],
};
