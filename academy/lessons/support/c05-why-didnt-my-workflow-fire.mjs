// Track C · Support Playbook C5 — Why didn't my workflow fire?
// Workflow "New Lead — Instant Follow-up" (w1): Grace Wright never enrolled (form filter),
// Mason Evans' SMS skipped (DND), Olivia waiting. Order: plan → published → enrolled →
// trigger filters → re-entry → execution logs → time window → audit log.
const opt = (text) => `.menu button:has-text("${text}")`;

export default {
  id: 'C-5',
  title: "Kyntlo Academy Support C5 — Why didn't my workflow fire?",
  description:
    "Internal support playbook. A fixed order for workflow tickets: plan, published or draft, Enrollment History, trigger filters, re-entry, Execution Logs (executed, skipped, failed, waiting), time window, and Audit Logs.",
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'Workflows', 'Execution logs', 'HighLevel'],
  thumbnail: { kicker: 'Support Playbook C5', title: "Why didn't my *workflow* fire?" },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C5', title: "Why didn't my *workflow* fire?", sub: 'Enrollment history, trigger filters and execution logs.' },
      say: "Why didn't my workflow fire is one of the most common tickets from Growth and Pro customers. The good news is that the answer is almost always on screen. In this playbook, you'll work through the checks in a fixed order, from the workflow's status to the execution logs.",
    },
    {
      chapter: 'Three questions',
      card: { type: 'chapter', kicker: 'The order', title: 'Status → *Enrolled* → Steps', sub: 'Is it published? · Did the contact enter? · What happened at each step?' },
      say: "Every investigation answers three questions, in order. Is the workflow published? Did the contact enter it? And what happened at each step? Don't open the builder and start changing things until you know which question failed. And remember: workflow automation isn't included on Starter at all.",
    },
    {
      chapter: 'Published or draft?',
      goto: '{demo}#/automation/workflows',
      settle: 1.5,
      say: "First, the status. Open Automation, find the workflow, and check the badge. A draft never runs, not even for one contact. Customers often test, save, and forget to publish. Publishing also isn't retroactive. Contacts who triggered it while it was a draft won't be enrolled afterwards.",
      actions: [
        { at: 0.5, click: '#wf_folder_lead_nurture' },
        { at: 2.4, highlight: '#wf_row_w1 .chip', label: 'Published', for: 3.6 },
        { at: 2.6, zoom: '#wf_row_w1', scale: 1.5, for: 4.4 },
        { at: 15.4, click: '#wf_row_w1' },
      ],
    },
    {
      chapter: 'Did they enrol?',
      say: "Second, enrollment. Open Enrollment History and search for the contact. Grace Wright filled in a website form, but she isn't here. She never entered the workflow, so no step could ever run for her. When someone never enrolled, the problem is the trigger.",
      actions: [
        { at: 0.4, click: '#wf_tab_enrollment' },
        { at: 3.0, type: 'Grace', into: '#wfe_search', delay: 80 },
        { at: 5.6, highlight: '#wfe_table', label: 'Never enrolled', for: 4.6 },
      ],
    },
    {
      chapter: 'Trigger filters',
      say: "Open the trigger, and read its filters. This one only fires for the Invisalign Enquiry form. Grace used the general Contact Us form, so the workflow did exactly what it was told. Filters on forms, tags, calendars and pipeline stages are the most common reason a contact never enrols. The fix is to add the missing form, or a second trigger.",
      actions: [
        { at: 0.4, click: '#wf_tab_builder' },
        { at: 2.0, click: '#wf_trigger_0' },
        { at: 3.4, highlight: '.wf-frow', label: 'Only this form', for: 5 },
        { at: 3.6, zoom: '.drawer .modal-b', scale: 1.5, for: 6 },
        { at: 19.0, click: '#wft_cancel' },
      ],
    },
    {
      chapter: 'Re-entry & stop on response',
      say: "Another reason someone doesn't enrol: they've been through it before. In Settings, if Allow re-entry is off, each contact can only go through once. For anything that should happen every time, like booking reminders, it needs to be on. Also check Stop on response. It removes the contact as soon as they reply, which customers sometimes mistake for a failure.",
      actions: [
        { at: 0.4, click: '#wf_tab_settings' },
        { at: 2.4, highlight: '#wfs_reentry', label: 'Allow re-entry', for: 5 },
        { at: 2.6, zoom: '#wfs_reentry', scale: 1.5, for: 5.4 },
        { at: 15.4, highlight: '#wfs_stop', label: 'Stop on response', for: 4 },
      ],
    },
    {
      chapter: 'Execution Logs',
      say: "Third, if the contact did enrol, open Execution Logs. Every step, for every contact, is listed with its status and time. Search for the contact. Mason Evans enrolled, but says he never got a text.",
      actions: [
        { at: 0.4, click: '#wf_tab_logs' },
        { at: 2.4, highlight: '#wfl_table thead', label: 'Contact · action · status · time', for: 3.6 },
        { at: 6.8, type: 'Mason', into: '#wfl_search', delay: 80 },
        { at: 9.2, highlight: '#wfl_table tbody', label: 'Every step for Mason', for: 3 },
      ],
    },
    {
      chapter: 'Executed, skipped or failed',
      say: "Executed means the step ran. Skipped means it was deliberately not run. Here, the reason is clear: Do not disturb is on for S M S. So the answer to the customer is that Mason opted out, and the workflow was right. Failed is different. The step tried, and something went wrong, like a bounced email. That's the one to investigate further.",
      caption: "Executed means the step ran. Skipped means it was deliberately not run. Here, the reason is clear: Do not disturb is on for SMS. So the answer to the customer is that Mason opted out, and the workflow was right. Failed is different. The step tried, and something went wrong, like a bounced email. That's the one to investigate further.",
      actions: [
        { at: 0.4, highlight: '#wfl_row_10 .chip', label: 'Executed', for: 2.4 },
        { at: 2.6, highlight: '#wfl_row_11', label: 'Skipped', for: 2.6 },
        { at: 3.4, click: '#wfl_view_11' },
        { at: 5.0, highlight: '#wfl_detail', label: 'The reason', for: 5 },
        { at: 5.2, zoom: '#wfl_detail', scale: 1.5, for: 5.4 },
      ],
    },
    {
      chapter: 'Waiting is not broken',
      goto: '{demo}#/automation/workflows/w1/logs',
      settle: 1.5,
      say: "One status worries customers but shouldn't: Waiting. The contact is paused on a wait step, or held until the workflow's time window opens. Here, Olivia is on a one-day wait, and the details say exactly when she'll continue. Nothing is broken.",
      actions: [
        { at: 0.1, run: (p) => p.evaluate(() => document.querySelectorAll('.overlay, .drawer, .menu').forEach((e) => e.remove())) },
        { at: 0.5, click: '#wfl_status' },
        { at: 1.6, click: opt('Waiting') },
        { at: 3.4, click: '#wfl_view_0' },
        { at: 5.0, highlight: '#wfl_detail', label: 'Continues tomorrow', for: 5 },
      ],
    },
    {
      chapter: 'Time window',
      goto: '{demo}#/automation/workflows/w1/settings',
      settle: 1.5,
      say: "While you're in Settings, check the time window. If actions only run during set hours, a message triggered at night waits until the window opens. Also check which time zone the workflow uses: the account's, or the contact's. That explains most of the messages arrived at a strange time tickets.",
      actions: [
        { at: 0.5, highlight: '#wfs_window', label: 'Only during these hours', for: 5 },
        { at: 0.7, zoom: '.wf-settings .card:first-child', scale: 1.4, for: 8 },
        { at: 9.6, highlight: '#wfs_timezone', label: 'Account or contact time zone', for: 4.4 },
      ],
    },
    {
      chapter: 'Other hidden causes',
      card: { type: 'chapter', kicker: 'Also check', title: 'Other *hidden causes*', sub: 'Wallet empty · Step uses a feature outside the plan · No phone or email on the contact · An If/Else branch took another path · Workflow edited after they enrolled' },
      say: "A few other causes come up regularly. The wallet ran out, so texts and calls can't be paid for. A step uses a feature that isn't in the customer's plan. The contact has no phone number or email address. An If Else branch sent them down a different path. Or the workflow was edited after they enrolled. The logs show which path each contact actually took.",
    },
    {
      chapter: 'What changed?',
      goto: '{demo}#/settings/audit-logs',
      settle: 1.5,
      say: "If a workflow worked last week and stopped this week, ask what changed. Open Audit Logs in Settings, and filter by Workflow. You'll see who published or changed it, and when. That usually explains a sudden change in behaviour.",
      actions: [
        { at: 0.5, click: '#al_filter_module' },
        { at: 1.8, click: opt('Workflow') },
        { at: 3.4, highlight: '#al_row_0', label: 'Who published, and when', for: 5 },
        { at: 3.6, zoom: '#al_table', scale: 1.4, for: 6 },
      ],
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: "Why didn't it *fire*?", sub: 'Plan · Published · Enrolled · Trigger filters · Re-entry · Logs: skipped, failed, waiting · Time window · Audit Logs' },
      say: "Here's the order. Plan. Published. Enrolled. Trigger filters. Re-entry. The logs: skipped, failed or waiting. Time window. And Audit Logs. If a published workflow with the right trigger still doesn't enrol or run for several contacts, escalate with the workflow name, the contact, the time, and screenshots of the trigger and the logs.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Playbook C6', title: 'Calendar & *booking issues*', sub: 'Availability, time zones and sync conflicts.', cta: 'Kyntlo [Academy]' },
      say: "That's workflow troubleshooting. In the next playbook, we'll fix calendar and booking problems.",
    },
  ],
};
