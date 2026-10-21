// Track A · Module 2 · Lesson 4 — Call, appointment & agent reports (Pro).
// Filmed on the Kyntlo demo workspace: Reporting › Call Reporting, Appointment Report, Agent Reporting.
export default {
  id: 'A-2.4',
  title: 'Kyntlo Academy 2.4 — Call, appointment & agent reports',
  description:
    'Use Call Reporting, the Appointment Report and Agent Reporting to see how many calls you answer, how many patients show up, and how each team member is performing.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Call tracking', 'Appointment report', 'Team performance'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 2 · Lesson 4', title: 'Calls, show rates & *your team*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 2 · Lesson 4', title: 'Call, appointment & *agent reports*', sub: 'Are you answering, are they showing up, who is doing what?' },
      say: "Welcome back! In this lesson, we'll use three reports that answer the questions every owner asks. Are we answering the phone? Are patients turning up? And how is each person on the team doing?",
    },
    {
      chapter: 'Call Reporting',
      goto: '{demo}#/reporting/calls',
      settle: 1,
      say: "Let's start with Call Reporting. It counts every call through your Kyntlo phone numbers. In the last thirty days there were a hundred and twenty-eight calls. A hundred and four were answered, and twenty-four were missed.",
      caption: "Let's start with Call Reporting. It counts every call through your Kyntlo phone numbers. In the last 30 days there were 128 calls. 104 were answered, and 24 were missed.",
      actions: [
        { at: 0.5, title: 'Call Reporting', sub: 'Every call, answered or not', for: 3.6 },
        { at: 5.0, zoom: '#rp_call_kpis', scale: 1.4, for: 8.4 },
        { at: 8.6, hover: '#rp_call_kpis .rp-kpi:nth-child(2)' },
        { at: 11.0, hover: '#rp_call_kpis .rp-kpi:nth-child(3)' },
      ],
    },
    {
      chapter: 'When calls are missed',
      say: "Answer rate is the share you picked up. Eighty-one percent is good, but look at the chart. Missed calls peak on Wednesdays, and on Saturdays more than a quarter go unanswered. Those are the moments to cover, or to send an automatic text back.",
      caption: 'Answer rate is the share you picked up. 81% is good, but look at the chart. Missed calls peak on Wednesdays, and on Saturdays more than a quarter go unanswered. Those are the moments to cover, or to send an automatic text back.',
      actions: [
        { at: 0.4, highlight: '#rp_call_kpis .rp-kpi:nth-child(4)', label: 'Answer rate', for: 3.4 },
        { at: 4.6, hover: '#rp_call_chart svg' },
        { at: 4.8, zoom: '#rp_call_chart', scale: 1.4, for: 7.4 },
      ],
    },
    {
      chapter: 'Calls by source',
      say: "Calls by source shows which tracking number each call came in on. Give your website, your Google ads and your Google Business Profile their own numbers, and you'll know exactly which one makes the phone ring.",
      actions: [
        { at: 0.4, highlight: '#rp_call_src_card', label: 'One number per source', for: 4.4 },
        { at: 0.6, hover: '#rp_call_src_card svg' },
        { at: 5.6, zoom: '#rp_call_src_card', scale: 1.5, for: 5.4 },
      ],
    },
    {
      chapter: 'Recordings & filters',
      say: "Below is every call, with who handled it. If call recording is on, press play to listen back. It's the best training tool you have. Use the filter at the top to see only inbound or outbound calls.",
      actions: [
        { at: 0.4, scroll: 560, ms: 1100 },
        { at: 2.0, highlight: '#rp_call_table', label: 'Every call', for: 2.8 },
        { at: 5.4, click: '#rp_play_0' },
        { at: 6.0, zoom: '#rp_call_table tbody tr:nth-child(1)', scale: 1.5, for: 3.6 },
        { at: 10.4, run: async (page) => page.evaluate(() => document.querySelector('#view').scrollTo({ top: 0, behavior: 'smooth' })) },
        { at: 11.2, click: '#rp_call_dir' },
        { at: 12.4, click: '.menu button:has-text("Inbound only")' },
      ],
    },
    {
      chapter: 'Appointment Report',
      say: "Next, the Appointment Report. Thirty-eight appointments were booked. Thirty-three patients showed up, three didn't, and two cancelled. That's a show rate of ninety-two percent.",
      caption: 'Next, the Appointment Report. 38 appointments were booked. 33 patients showed up, 3 didn’t, and 2 cancelled. That’s a show rate of 92%.',
      actions: [
        { at: 0.3, click: '#tab_appointments' },
        { at: 1.6, title: 'Appointment Report', sub: 'Who booked, who showed', for: 3.4 },
        { at: 5.4, zoom: '#rp_appt_kpis', scale: 1.4, for: 7 },
        { at: 10.6, hover: '#rp_appt_kpis .rp-kpi:nth-child(5)' },
      ],
    },
    {
      chapter: 'How patients book',
      say: "The chart breaks each week down by outcome. On the right, you can see how appointments were booked: twenty-four through your online booking widget, nine by staff, and five by your AI agent, often outside opening hours.",
      caption: 'The chart breaks each week down by outcome. On the right, you can see how appointments were booked: 24 through your online booking widget, 9 by staff, and 5 by your AI agent, often outside opening hours.',
      actions: [
        { at: 0.4, highlight: '#rp_appt_chart', label: 'By week', for: 3.6 },
        { at: 4.6, hover: '#rp_appt_src svg' },
        { at: 4.8, zoom: '#rp_appt_src', scale: 1.5, for: 7.4 },
      ],
    },
    {
      chapter: 'Show rate by calendar',
      say: "Scroll down for each calendar. Filter to a single calendar, like the Invisalign free scan, and you'll see its own show rate. Free appointments usually have the most no-shows, so they need the strongest reminders.",
      actions: [
        { at: 0.4, scroll: 480, ms: 1000 },
        { at: 1.8, highlight: '#rp_appt_table', label: 'Show rate per calendar', for: 3.2 },
        { at: 5.4, run: async (page) => page.evaluate(() => document.querySelector('#view').scrollTo({ top: 0, behavior: 'smooth' })) },
        { at: 6.0, click: '#rp_appt_cal' },
        { at: 7.2, click: '.menu button:has-text("Invisalign Free Scan")' },
        { at: 8.4, highlight: '#rp_appt_kpis .rp-kpi:nth-child(5)', label: 'Free scans: 89%', for: 3.6 },
      ],
    },
    {
      chapter: 'Agent Reporting',
      say: "Finally, Agent Reporting shows each team member side by side. You'll see the opportunities they own, how many they've won, the value of those wins, and their calls, texts and emails.",
      actions: [
        { at: 0.3, click: '#tab_agents' },
        { at: 1.6, title: 'Agent Reporting', sub: 'Your team, side by side', for: 3.4 },
        { at: 5.4, highlight: '#rp_ag_value', label: 'Won value per person', for: 3.6 },
        { at: 9.4, scroll: 360, ms: 900 },
      ],
    },
    {
      chapter: 'Reading it fairly',
      say: "Read it fairly. Priya has won the most, worth four thousand two hundred and fifty pounds. James hasn't closed a deal yet, but he handled the most calls. He looks after check-ups, which rarely become big treatment deals. Use this for coaching, not blame.",
      caption: 'Read it fairly. Priya has won the most, worth £4,250. James hasn’t closed a deal yet, but he handled the most calls. He looks after check-ups, which rarely become big treatment deals. Use this for coaching, not blame.',
      actions: [
        { at: 0.6, highlight: '#rp_ag_row_priya', label: 'Most won', for: 3.6 },
        { at: 5.0, highlight: '#rp_ag_row_james', label: 'Most calls', for: 4 },
        { at: 5.2, zoom: '#rp_ag_table', scale: 1.3, for: 6.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'A *ten-minute* Monday review', sub: 'Missed calls, no-shows, and one win to celebrate.' },
      say: "Here's a pro tip. Every Monday, spend ten minutes on these three reports with your team. Look at missed calls, no-shows, and one win to celebrate. Small, regular check-ins change habits far more than a big monthly meeting.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 3', title: 'The *contact list*', sub: 'Search, filter and save smart lists.', cta: 'Kyntlo [Academy]' },
      say: "That's the end of module two! You can now read every report that matters. In module three, we'll dive into Contacts, starting with the contact list. See you there.",
      caption: "That's the end of Module 2! You can now read every report that matters. In Module 3, we'll dive into Contacts, starting with the contact list. See you there.",
    },
  ],
};
