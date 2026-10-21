// Track B · Video 9a — Kyntlo for clinics. The demo workspace is a dental clinic, so this one is filmed end to end on it.
// Plan facts (pricing.html): booking = every plan; reminders/workflows/SMS = Growth+; Voice AI, missed-call text-back,
// Reputation Manager & reactivation campaigns = Pro.
export default {
  id: 'B9',
  title: 'Kyntlo for Clinics — Bookings, Reminders, AI Reception & Reviews in One Platform',
  description:
    'How a clinic runs on Kyntlo: patient records, online booking, automatic reminders, no-show recovery, missed-call text-back, an AI phone receptionist, review requests and recall campaigns, shown on a demo dental practice.',
  tags: ['Kyntlo', 'Clinic software', 'Dental practice marketing', 'Patient booking', 'Clinic CRM', 'Healthcare marketing'],
  thumbnail: { kicker: 'Kyntlo for clinics', title: 'Run your clinic on *one platform*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Kyntlo for clinics', title: 'Run your clinic on *one platform*', sub: 'Dental, physio, aesthetics, wellness and more.' },
      say: "Running a clinic means phones ringing, patients to remind, and a diary that never stays full on its own. Here's how clinics use Kyntlo to stay on top of it all.",
    },
    {
      chapter: 'Meet Bloom Dental',
      goto: '{demo}#/dashboard',
      settle: 1.5,
      say: "Meet Bloom Dental Studio, a demo clinic in London. Patients, bookings, messages and revenue, all in one place.",
      actions: [
        { at: 0.4, title: 'Bloom Dental Studio', sub: 'A demo clinic in London', for: 3.4 },
        { at: 4.2, zoom: '#w_status', scale: 1.4, for: 3 },
      ],
    },
    {
      chapter: 'Every patient, one record',
      goto: '{demo}#/contacts/detail/c1',
      settle: 1,
      say: "Every patient has one record, with their details, tags, conversations, and the treatments they're interested in.",
      actions: [
        { at: 0.4, title: 'Contacts', sub: 'Every patient, one record', for: 3.2 },
        { at: 3.8, zoom: '#view', scale: 1.2, for: 3 },
      ],
    },
    {
      chapter: 'Online booking',
      goto: '{demo}#/calendars/calendar',
      settle: 1,
      say: "Patients book online, straight into the right calendar: new patient consultations, check-ups, whitening, or a free Invisalign scan.",
      actions: [
        { at: 0.4, title: 'Online booking', sub: 'One calendar per treatment', for: 3.2 },
        { at: 3.8, highlight: '#cal_filter_cals', label: 'One calendar per treatment', for: 4 },
        { at: 4.0, zoom: '#cal_filter_cals', scale: 1.6, for: 3.6 },
      ],
    },
    {
      chapter: 'Reminders & no-shows',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Confirmations and reminders go out automatically, by email and text, so fewer chairs sit empty. And when a patient misses an appointment, a no-show workflow offers an easy way to rebook.",
      actions: [
        { at: 0.4, click: '#wf_folder_appointments' },
        { at: 1.2, title: 'Appointment workflows', sub: 'Reminders & no-show recovery', for: 3.4 },
        { at: 5.0, highlight: '#wf_row_w2', label: 'Confirmation & reminders', for: 3 },
        { at: 8.6, highlight: '#wf_row_w3', label: 'No-show recovery', for: 3 },
      ],
    },
    {
      chapter: 'Missed-call text-back',
      goto: '{demo}#/conversations/conversations/v9',
      settle: 1,
      say: "When the front desk is busy and a call goes unanswered, missed-call text-back texts the caller within seconds. Here, that turned into a new patient asking to be seen today.",
      actions: [
        { at: 0.4, title: 'Missed-call text-back', sub: 'Pro plan', for: 3 },
        { at: 3.4, highlight: '#cv_msg_1', label: 'Missed call', for: 2 },
        { at: 5.6, highlight: '#cv_msg_2', label: 'Automatic text', for: 2.4 },
        { at: 8.4, highlight: '#cv_msg_3', label: 'A new patient', for: 2.4 },
      ],
    },
    {
      chapter: 'AI receptionist',
      goto: '{demo}#/ai-agents/voice-ai',
      settle: 1,
      say: "Voice AI can answer calls in a natural voice, answer common questions, and book patients in, while urgent calls are transferred to your team.",
      actions: [
        { at: 0.4, title: 'Voice AI receptionist', sub: 'Pro plan', for: 3.2 },
        { at: 3.8, highlight: '#vai_stats', label: 'Answered · booked · transferred', for: 3.4 },
        { at: 4.0, zoom: '#vai_stats', scale: 1.3, for: 3.2 },
      ],
    },
    {
      chapter: 'Reviews',
      goto: '{demo}#/reputation/overview',
      settle: 1,
      say: "After each visit, Kyntlo asks happy patients for a review, and Reviews AI helps you reply in seconds.",
      actions: [
        { at: 0.4, title: 'Reputation', sub: 'Review requests after every visit', for: 3.2 },
        { at: 3.8, highlight: '#rp_kpis', label: 'Rating, requests & reviews', for: 3 },
      ],
    },
    {
      chapter: 'Recall patients',
      goto: '{demo}#/automation/workflows/w6',
      settle: 1,
      say: "And a recall campaign brings patients back when their six-month check-up is due.",
      caption: "And a recall campaign brings patients back when their 6-month check-up is due.",
      actions: [
        { at: 0.4, title: '6-Month Recall', sub: 'Reactivation campaign', for: 3.4 },
        { at: 1.0, zoom: '#wf_canvas', scale: 1.2, for: 3 },
      ],
    },
    {
      chapter: 'Which plan?',
      card: { type: 'chapter', kicker: 'For clinics', title: 'Built for *busy clinics*', sub: 'Booking: every plan · Reminders & automation: Growth · Voice AI, missed-call text-back, reviews & recall: Pro' },
      say: "Online booking comes with every plan. Reminders and automation start on Growth. And Voice AI, missed-call text-back, reviews and reactivation campaigns come with Pro.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'Kyntlo for clinics', title: 'Start your free *14-day trial*', sub: 'No setup fees · Cancel anytime', cta: 'kyntlo.ai/[trial]' },
      say: "Give your front desk a break. Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
