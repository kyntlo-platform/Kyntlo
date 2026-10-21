// Track A · Module 15 · Lesson 2 — Your 30-day Kyntlo action plan (course finale).
// Mostly cards, with short visits to each area of the demo workspace.
export default {
  id: 'A-15.2',
  title: 'Kyntlo Academy 15.2 — Your 30-day Kyntlo action plan',
  description:
    'Know exactly what to set up, and in which order: a four-week plan covering foundations, lead capture, automated follow-up and growth, plus the weekly habits that keep Kyntlo working for you.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Action plan', 'Getting started', 'CRM setup'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 15 · Finale', title: 'Your *30-day* action plan' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 15 · Lesson 2', title: 'Your *30-day* action plan', sub: 'What to set up, in which order.' },
      say: "You've made it to the final lesson! You've seen everything Kyntlo can do. Now let's turn it into a plan. Over the next thirty days, you'll set things up in the order that gets results fastest, one focused week at a time.",
    },
    {
      chapter: 'The plan',
      card: { type: 'chapter', kicker: 'Four weeks', title: 'Foundations → Capture → *Follow-up* → Grow', sub: 'One focus per week. Small steps, every day.' },
      say: "Here's the shape of it. Week one, foundations. Week two, capturing leads. Week three, automated follow-up. And week four, growth. Each week builds on the last, so don't skip ahead. Fifteen to thirty minutes a day is enough.",
    },
    {
      chapter: 'Week 1 · Foundations',
      card: { type: 'chapter', kicker: 'Week 1', title: '*Foundations*', sub: 'Profile, team, phone, email and your contacts.' },
      say: "Week one is foundations. Nothing here is glamorous, but everything else depends on it.",
    },
    {
      chapter: 'Your Launchpad',
      goto: '{demo}#/launchpad',
      settle: 1,
      say: "Start with the Launchpad. Work through the checklist: connect your email and phone, link Google and Facebook, and install the mobile app. Then, in Settings, complete your business profile, set your time zone, and invite your team.",
      actions: [
        { at: 0.4, highlight: '#sb_launchpad', label: 'Launchpad', for: 2.6 },
        { at: 3.2, highlight: '#lp_steps', label: 'Your first-day checklist', for: 5.4 },
        { at: 10.4, hover: '#sb_settings' },
        { at: 10.6, highlight: '#sb_settings', label: 'Profile, time zone, team', for: 3.6 },
      ],
    },
    {
      chapter: 'Bring in your contacts',
      say: "End the week by importing your existing customers into Contacts. Tag them as you import, for example past patients, so you can reach them later. Only import people who've agreed to hear from you.",
      actions: [
        { at: 0.3, click: '#sb_contacts' },
        { at: 2.2, hover: '#ct_import' },
        { at: 2.4, highlight: '#ct_import', label: 'Import your list', for: 4 },
        { at: 2.6, zoom: '#ct_import', scale: 2, for: 4 },
      ],
    },
    {
      chapter: 'Week 2 · Capture',
      card: { type: 'chapter', kicker: 'Week 2', title: 'Capture every *lead*', sub: 'Funnel, form, chat widget and booking calendar.' },
      say: "Week two is about capturing every lead, so nobody who's interested slips away.",
    },
    {
      chapter: 'Funnel, form & chat',
      goto: '{demo}#/sites/funnels',
      settle: 1,
      say: "Build one funnel from a template, around your best offer, with one form on it. Add the chat widget to your website, so visitors can message you. Then set up a booking calendar with your real availability, and link to it everywhere.",
      actions: [
        { at: 0.4, highlight: '#fn_row_f1', label: 'One funnel, one offer', for: 3.6 },
        { at: 4.6, click: '#tab_forms' },
        { at: 5.8, highlight: '#fm_row_fm1', label: 'One form', for: 2.8 },
        { at: 9.0, click: '#tab_chat-widget' },
        { at: 10.6, title: 'Chat widget', sub: 'Let visitors message you', for: 3 },
        { at: 13.6, click: '#sb_calendars' },
      ],
    },
    {
      chapter: 'Week 3 · Follow-up',
      card: { type: 'chapter', kicker: 'Week 3', title: 'Automate the *follow-up*', sub: 'The three workflows every business needs.' },
      say: "Week three is where Kyntlo starts working while you sleep. You'll automate the follow-up.",
    },
    {
      chapter: 'Your first three workflows',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Build three workflows, in this order. First, an instant reply to every new lead. Second, missed call text back. Third, appointment confirmations and reminders. Set up your pipeline too, and let workflows move deals forward. Test each one on yourself before you publish it.",
      actions: [
        { at: 0.4, highlight: '#wf_folder_lead_nurture', label: '1. New lead reply', for: 3.4 },
        { at: 4.4, highlight: '#wf_folder_lead_nurture', label: '2. Missed call text back', for: 2.8 },
        { at: 7.6, highlight: '#wf_folder_appointments', label: '3. Reminders', for: 3.4 },
        { at: 11.6, hover: '#sb_opportunities' },
        { at: 11.8, highlight: '#sb_opportunities', label: 'Pipeline', for: 3 },
      ],
    },
    {
      chapter: 'Week 4 · Grow',
      card: { type: 'chapter', kicker: 'Week 4', title: '*Grow*', sub: 'Reviews, campaigns, reactivation and AI.' },
      say: "Week four is about growth. With the basics running, you can now bring in more customers.",
    },
    {
      chapter: 'Reviews, campaigns & AI',
      goto: '{demo}#/reputation',
      settle: 1,
      say: "Switch on automatic review requests, and reply to every review. Send a reactivation campaign to the past customers you imported in week one. And explore A I: a chatbot that answers common questions can take a real load off your team.",
      caption: 'Switch on automatic review requests, and reply to every review. Send a reactivation campaign to the past customers you imported in week one. And explore AI: a chatbot that answers common questions can take a real load off your team.',
      actions: [
        { at: 0.4, highlight: '#rp_kpis', label: 'Reviews on autopilot', for: 4 },
        { at: 5.6, hover: '#sb_marketing' },
        { at: 5.8, highlight: '#sb_marketing', label: 'Reactivation campaign', for: 3.4 },
        { at: 10.6, hover: '#sb_ai-agents' },
        { at: 10.8, highlight: '#sb_ai-agents', label: 'AI Agents', for: 3.4 },
      ],
    },
    {
      chapter: 'Weekly habits',
      goto: '{demo}#/dashboard',
      settle: 1,
      say: "After thirty days, keep three weekly habits. Check your dashboard and conversion rate. Look at your workflow logs for anything skipped or failed. And read your newest reviews. Twenty minutes a week keeps the whole system healthy.",
      actions: [
        { at: 0.4, highlight: '#w_conversion', label: '1. Conversion rate', for: 3.6 },
        { at: 4.6, hover: '#sb_automation' },
        { at: 4.8, highlight: '#sb_automation', label: '2. Workflow logs', for: 3.2 },
        { at: 8.6, hover: '#sb_reputation' },
        { at: 8.8, highlight: '#sb_reputation', label: '3. New reviews', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Done beats *perfect*', sub: 'A simple workflow that is live today beats a perfect one next month.' },
      say: "Here's my last pro tip. Done beats perfect. A simple workflow that's live today will win you more customers than a perfect one you finish next month. Launch, watch the results, and improve as you go.",
    },
    {
      card: { type: 'outro', kicker: 'Thank you', title: 'You did it. Now go *grow*', sub: 'Revisit any lesson, any time. We are here to help.', cta: 'Kyntlo [Academy]' },
      say: "And that's the end of the course. Thank you so much for learning with us! Come back to any lesson whenever you need a refresher, use Ask A I inside Kyntlo for quick answers, and reach out to the Kyntlo support team whenever you get stuck. We can't wait to see what you build. Good luck!",
      caption: "And that's the end of the course. Thank you so much for learning with us! Come back to any lesson whenever you need a refresher, use Ask AI inside Kyntlo for quick answers, and reach out to the Kyntlo support team whenever you get stuck. We can't wait to see what you build. Good luck!",
    },
  ],
};
