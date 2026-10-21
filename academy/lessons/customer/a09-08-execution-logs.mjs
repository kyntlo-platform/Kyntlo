// Track A · Module 9 · Lesson 8 — Troubleshooting with execution logs.
// Uses "New Lead — Instant Follow-up" (w1): Grace Wright never enrolled (wrong form),
// Mason Evans' SMS was skipped (DND), Ethan Walker's email failed (bounce).
const opt = (text) => `.menu button:has-text("${text}")`;

export default {
  id: 'A-9.8',
  title: "Kyntlo Academy 9.8 — Troubleshooting workflows with execution logs",
  description:
    "Find out exactly why a contact didn't get a message or didn't move: check the publish status, the trigger filters, Enrollment History and Execution Logs, and fix the cause.",
  tags: ['Kyntlo', 'Kyntlo Academy', 'Workflows', 'Troubleshooting', 'Execution logs'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 9 · Lesson 8', title: "Why didn't my *workflow* fire?" },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 9 · Lesson 8', title: 'Troubleshooting with *execution logs*', sub: "Find out why a contact didn't move, in minutes." },
      say: "Sooner or later, someone will say: I never got your text. In this lesson, you'll learn a simple four-step check that finds the reason almost every time, using Enrollment History and Execution Logs.",
    },
    {
      chapter: 'The four checks',
      card: { type: 'chapter', kicker: 'The checklist', title: 'Published → *Enrolled* → Trigger → Logs', sub: 'Work through them in this order.' },
      say: "Here's the order. One, is the workflow published? Two, did the contact actually enrol? Three, if they didn't, does the trigger and its filters match what happened? And four, what do the execution logs say about each step?",
    },
    {
      chapter: '1. Is it published?',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Start with the list. Open the folder, and check the status. Drafts never run, not even for one contact. It sounds obvious, but a workflow left in draft after testing is the most common cause of all.",
      actions: [
        { at: 0.4, click: '#wf_folder_lead_nurture' },
        { at: 2.4, highlight: '#wf_row_w1 .chip', label: 'Published', for: 3.4 },
        { at: 2.6, zoom: '#wf_row_w1', scale: 1.5, for: 4 },
        { at: 9.4, click: '#wf_row_w1' },
      ],
    },
    {
      chapter: '2. Did they enrol?',
      say: "Our first case: Grace Wright filled in a form on the website, but never got the Invisalign text. Open Enrollment History, and search for Grace. Nothing. She never entered the workflow at all, so no step could ever run for her.",
      actions: [
        { at: 0.4, click: '#wf_tab_enrollment' },
        { at: 5.0, type: 'Grace', into: '#wfe_search', delay: 80 },
        { at: 7.0, highlight: '#wfe_table', label: 'Never enrolled', for: 4.6 },
      ],
    },
    {
      chapter: '3. Check the trigger',
      say: "When someone never enrolled, look at the trigger. The filter says, form is Invisalign Enquiry. Grace used the general Contact Us form instead. So the workflow did exactly what it was told. The fix is to add that form, or point her to a workflow that handles it.",
      actions: [
        { at: 0.4, click: '#wf_tab_builder' },
        { at: 2.0, click: '#wf_trigger_0' },
        { at: 3.6, highlight: '.wf-frow', label: 'Only this form', for: 5 },
        { at: 3.8, zoom: '.drawer .modal-b', scale: 1.5, for: 5.6 },
        { at: 15.0, click: '#wft_cancel' },
      ],
    },
    {
      chapter: '4. Read the execution logs',
      say: "Our second case: Mason Evans did enrol, but says he never got a text. Open Execution Logs. Every step, for every contact, is listed here with its status. Search for Mason, and look at the status column.",
      actions: [
        { at: 0.4, click: '#wf_tab_logs' },
        { at: 2.6, highlight: '#wfl_table thead', label: 'Contact · action · status · time', for: 3.6 },
        { at: 7.0, type: 'Mason', into: '#wfl_search', delay: 80 },
        { at: 9.4, highlight: '#wfl_table tbody', label: 'Every step for Mason', for: 3 },
      ],
    },
    {
      chapter: 'Executed, skipped, failed',
      say: "Most steps say Executed. But both text messages say Skipped. Skipped means Kyntlo chose not to run that step on purpose. Failed means it tried, and something went wrong. They need different fixes.",
      actions: [
        { at: 0.4, highlight: '#wfl_row_10 .chip', label: 'Executed', for: 2.6 },
        { at: 3.6, hover: '#wfl_row_11' },
        { at: 3.8, highlight: '#wfl_row_11', label: 'Skipped', for: 3.6 },
        { at: 3.9, zoom: '#wfl_row_11', scale: 1.4, for: 4 },
      ],
    },
    {
      chapter: 'View the details',
      say: "Click View details. Here's the reason: the contact has Do Not Disturb turned on for SMS. Kyntlo respects that setting in every workflow, which protects you from texting people who've opted out.",
      actions: [
        { at: 0.4, click: '#wfl_view_11' },
        { at: 2.2, highlight: '#wfl_detail', label: 'The reason', for: 5 },
        { at: 2.4, zoom: '#wfl_detail', scale: 1.6, for: 5.4 },
      ],
    },
    {
      chapter: 'Fix it on the contact',
      say: "Click Open contact to check his Do not disturb settings. Only switch it off if Mason has actually agreed to hear from you. If he opted out, the workflow was right, and email or a phone call is the better way to reach him.",
      actions: [
        { at: 0.6, click: '#wfl_open_contact' },
        { at: 2.8, hover: 'text="Do not disturb"' },
        { at: 3.0, highlight: 'text="Do not disturb"', label: 'Check consent first', for: 5 },
      ],
    },
    {
      chapter: 'Failed steps',
      goto: '{demo}#/automation/workflows/w1/logs',
      settle: 1,
      say: "Now filter by status, and choose Failed. Ethan Walker's email failed because it bounced. His mailbox was full. The fix here is outside the workflow: confirm his email address, or reach him by text instead.",
      actions: [
        { at: 0.4, click: '#wfl_status' },
        { at: 1.6, click: opt('Failed') },
        { at: 3.2, click: '#wfl_view_13' },
        { at: 4.8, highlight: '#wfl_detail', label: 'Email bounced', for: 4.4 },
      ],
    },
    {
      chapter: 'Waiting is normal',
      say: "Finally, a status that worries people but shouldn't: Waiting. Olivia is simply paused on the one-day wait. The details tell you exactly when she'll continue. Nothing is broken. The workflow is doing its job.",
      actions: [
        { at: 0.3, click: '.drawer [data-close]' },
        { at: 1.4, click: '#wfl_status' },
        { at: 2.4, click: opt('Waiting') },
        { at: 4.2, click: '#wfl_view_0' },
        { at: 5.8, highlight: '#wfl_detail', label: 'Continues tomorrow', for: 5 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Check *before* they ask', sub: 'A weekly look at Skipped and Failed catches problems early.' },
      say: "Here's a pro tip. Don't wait for complaints. Once a week, open your busiest workflows, filter the logs by Skipped and Failed, and look for patterns. A wrong form, a bad number, or a missing custom value is much easier to fix early.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 10', title: '*AI* in Kyntlo', sub: 'Chatbots, voice AI, content and AI inside workflows.', cta: 'Kyntlo [Academy]' },
      say: "That's the end of the automation module. You can now build, test and fix workflows with confidence. Next, in module ten, we'll explore A I in Kyntlo, from chatbots that answer your leads, to A I steps inside your workflows. See you there!",
      caption: "That's the end of the automation module. You can now build, test and fix workflows with confidence. Next, in Module 10, we'll explore AI in Kyntlo, from chatbots that answer your leads, to AI steps inside your workflows. See you there!",
    },
  ],
};
