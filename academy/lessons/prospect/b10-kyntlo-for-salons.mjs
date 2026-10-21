// Track B · Video 9b — Kyntlo for salons. The demo workspace is a dental clinic, so the narration says so
// and leans on cards and the platform features rather than pretending the demo is a salon.
// Plan facts (pricing.html): booking & live chat = every plan; reminders, SMS/WhatsApp, workflows & basic AI chatbot = Growth+;
// advanced (booking) chatbot, missed-call text-back & Reputation Manager = Pro.
export default {
  id: 'B10',
  title: 'Kyntlo for Salons — Online Booking, Reminders, Reviews & Rebooking on Autopilot',
  description:
    'How salons, barbers, spas and beauty studios can use Kyntlo: online booking by stylist, automatic reminders, one inbox for Instagram, Facebook, WhatsApp and text, an AI chatbot that books, review requests and automatic rebooking offers.',
  tags: ['Kyntlo', 'Salon software', 'Salon booking', 'Beauty salon marketing', 'Barbershop booking', 'Spa CRM'],
  thumbnail: { kicker: 'Kyntlo for salons', title: 'Fully booked, *on autopilot*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Kyntlo for salons', title: 'Fully booked, *on autopilot*', sub: 'For salons, barbers, spas and beauty studios.' },
      say: "If you run a salon, a barbershop or a beauty studio, your diary is your business. Here's how Kyntlo keeps it full, while you focus on your clients.",
    },
    {
      chapter: 'Same tools, your salon',
      card: { type: 'chapter', kicker: 'A quick note', title: 'Same tools. *Your salon.*', sub: "The demo is a dental clinic. Swap check-ups for cuts and colours — everything works the same way." },
      say: "The demo you're about to see belongs to a dental clinic. But the tools are exactly the same for your salon. Just swap check-ups for cuts and colours.",
    },
    {
      chapter: 'Online booking',
      goto: '{demo}#/calendars/settings/edit/k4/details',
      settle: 1,
      say: "Clients book themselves online, with the team member they want, and only see times that are genuinely free. Share your booking link on Instagram, Google, or your website.",
      actions: [
        { at: 0.4, click: '#cal_ed_preview' },
        { at: 1.4, title: 'Online booking', sub: 'Included in every plan', for: 3 },
        { at: 4.6, highlight: '.kc-wid', label: 'What clients see', for: 3.4 },
        { at: 4.8, zoom: '.kc-wid', scale: 1.3, for: 4 },
        { at: 8.6, click: '#cal_pv_slot_1100' },
      ],
    },
    {
      chapter: 'Every stylist, one diary',
      goto: '{demo}#/calendars/calendar',
      settle: 1,
      say: "Every booking, for every member of your team, lands in one calendar. Filter by person to see anyone's day at a glance.",
      actions: [
        { at: 0.4, title: 'Calendar', sub: "Your whole team's diary", for: 3 },
        { at: 4.0, highlight: '#cal_filter_users', label: 'Filter by team member', for: 3.4 },
        { at: 4.2, zoom: '#cal_filter_users', scale: 1.6, for: 3 },
      ],
    },
    {
      chapter: 'Fewer no-shows',
      goto: '{demo}#/calendars/settings/edit/k4/details',
      settle: 1,
      say: "Automatic email and text reminders go out before every appointment, so you get fewer no-shows, and fewer gaps in your day.",
      actions: [
        { at: 0.3, click: '#cal_ed_tab_notifications' },
        { at: 1.6, highlight: '#cal_ed_sec_reminders', label: 'Automatic reminders · Growth+', for: 4 },
        { at: 1.8, zoom: '#cal_ed_sec_reminders', scale: 1.4, for: 4 },
      ],
    },
    {
      chapter: 'One inbox',
      goto: '{demo}#/conversations/conversations/v4',
      settle: 1,
      say: "Clients message you on Instagram, Facebook, WhatsApp or text. It all lands in one inbox, so every booking enquiry gets an answer.",
      actions: [
        { at: 0.4, title: 'One inbox', sub: 'Instagram, Facebook, WhatsApp, SMS & more', for: 3.6 },
        { at: 4.2, highlight: '#cv_mid', label: 'An Instagram enquiry', for: 3 },
      ],
    },
    {
      chapter: 'AI that books',
      goto: '{demo}#/ai-agents/conversation-ai',
      settle: 1,
      say: "And when your hands are busy with a client, an AI chatbot can answer questions about prices and opening hours, and even book the appointment for you.",
      actions: [
        { at: 0.4, title: 'Conversation AI', sub: 'Answers questions & books appointments', for: 3.6 },
        { at: 4.4, highlight: '#cai_bot_b1', label: 'Your AI front desk', for: 3 },
        { at: 4.6, zoom: '#cai_bots', scale: 1.4, for: 3 },
      ],
    },
    {
      chapter: 'Reviews',
      goto: '{demo}#/reputation/overview',
      settle: 1,
      say: "After each appointment, Kyntlo can ask for a review automatically, so new clients find you on Google.",
      actions: [
        { at: 0.4, title: 'Reputation', sub: 'Reviews on autopilot', for: 3 },
        { at: 3.4, highlight: '#rp_kpis', label: 'Requests, reviews & rating', for: 3 },
      ],
    },
    {
      chapter: 'Bring clients back',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "And workflows keep clients coming back: a birthday offer, or a friendly nudge when they're due their next appointment.",
      actions: [
        { at: 0.4, title: 'Automation', sub: 'Rebooking on autopilot', for: 3 },
        { at: 3.4, highlight: '#wf_row_w7', label: 'Birthday offer', for: 2.6 },
        { at: 6.2, click: '#wf_folder_reactivation' },
        { at: 7.0, highlight: '#wf_table tbody', label: 'Due for a visit', for: 2 },
      ],
    },
    {
      chapter: 'Which plan?',
      card: { type: 'chapter', kicker: 'For salons', title: 'Pick your *plan*', sub: 'Booking: every plan · Reminders, texts & automation: Growth · AI booking, reviews & missed-call text-back: Pro' },
      say: "Online booking is in every plan. Reminders, text messages and automation start on Growth. And the AI chatbot that books appointments, review requests and missed-call text-back come with Pro.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'Kyntlo for salons', title: 'Start your free *14-day trial*', sub: 'No setup fees · Cancel anytime', cta: 'kyntlo.ai/[trial]' },
      say: "Keep every chair full. Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
