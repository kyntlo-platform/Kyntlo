// Track A · Module 9 · Lesson 1 — How workflows think: triggers, actions, conditions.
// Filmed on the demo workspace (Automation → Workflows → "New Lead — Instant Follow-up").
export default {
  id: 'A-9.1',
  title: 'Kyntlo Academy 9.1 — How workflows think: triggers, actions & conditions',
  description:
    'Understand the logic behind every Kyntlo workflow: triggers decide who enters, actions run top to bottom, waits pause, and If/Else conditions send each contact down the right path.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Workflows', 'Marketing automation', 'HighLevel workflows'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 9 · Lesson 1', title: 'How *workflows* think' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 9 · Lesson 1', title: 'How *workflows* think', sub: 'Triggers, actions and conditions: the logic behind every automation.' },
      say: "Welcome to the automation module! Before we build anything, let's learn how workflows think. Once you understand three simple ideas, triggers, actions and conditions, you'll be able to read any workflow, and build your own with confidence.",
    },
    {
      chapter: 'Where workflows live',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Workflows live under Automation, in the sidebar. Here's the list for Bloom Dental. You can group workflows into folders, and for each one you can see whether it's published or still a draft, and how many contacts it has enrolled.",
      actions: [
        { at: 0.3, highlight: '#sb_automation', label: 'Automation', for: 2.6 },
        { at: 3.4, title: 'Workflows', sub: 'Automation → Workflows', for: 3.5 },
        { at: 6.6, highlight: '#wf_folder_lead_nurture', label: 'Folders', for: 2.6 },
        { at: 9.6, hover: '#wf_row_w7 .chip' },
        { at: 9.8, highlight: '#wf_table thead', label: 'Status & enrolment counts', for: 3.6 },
      ],
    },
    {
      chapter: 'Open a workflow',
      say: "Let's open the Lead Nurture folder, and look at the workflow that follows up every new Invisalign lead. Reading a real one is the fastest way to understand how they work.",
      actions: [
        { at: 0.4, click: '#wf_folder_lead_nurture' },
        { at: 3.2, hover: '#wf_row_w1' },
        { at: 3.4, highlight: '#wf_row_w1', label: 'New lead follow-up', for: 2.4 },
        { at: 6.0, click: '#wf_row_w1' },
      ],
    },
    {
      chapter: 'Triggers: the "when"',
      say: "Every workflow starts with a trigger. The trigger is the when: the event that adds a contact to the workflow. This one has two triggers. A contact enters when they submit the website form, or when they fill in a Facebook lead form. Either one is enough.",
      actions: [
        { at: 0.4, title: 'Trigger = the "when"', sub: 'The event that enrols a contact', for: 4 },
        { at: 4.8, hover: '#wf_trigger_0' },
        { at: 5.0, highlight: '#wf_trigger_0', label: 'Website form', for: 3.6 },
        { at: 9.0, hover: '#wf_trigger_1' },
        { at: 9.2, highlight: '#wf_trigger_1', label: 'Facebook lead form', for: 3.4 },
      ],
    },
    {
      chapter: 'Trigger filters',
      say: "Triggers usually have filters. Click a trigger to see them. This filter says: form is Invisalign Enquiry. So only that form starts this workflow. Someone filling in your general contact form won't be enrolled. Filters are how you make sure the right people get the right messages.",
      actions: [
        { at: 0.6, click: '#wf_trigger_0' },
        { at: 3.0, highlight: '.wf-frow', label: 'Form is Invisalign Enquiry', for: 5 },
        { at: 3.2, zoom: '.drawer .modal-b', scale: 1.5, for: 6 },
        { at: 15.5, click: '#wft_cancel' },
      ],
    },
    {
      chapter: 'Actions: the "what"',
      say: "Under the trigger come the actions. Actions are the what: everything the workflow does for that contact. They run from top to bottom. Here, Kyntlo creates an opportunity in the pipeline, sends an instant text message, and notifies the team member assigned to the lead. All within seconds of the form being submitted.",
      actions: [
        { at: 0.4, title: 'Actions = the "what"', sub: 'They run from top to bottom', for: 4 },
        { at: 5.4, hover: '#wf_node_s1' },
        { at: 5.6, highlight: '#wf_node_s1', label: '1. Create opportunity', for: 2.8 },
        { at: 8.6, hover: '#wf_node_s2' },
        { at: 8.8, highlight: '#wf_node_s2', label: '2. Instant SMS', for: 2.8 },
        { at: 11.8, hover: '#wf_node_s3' },
        { at: 12.0, highlight: '#wf_node_s3', label: '3. Notify the team', for: 3 },
      ],
    },
    {
      chapter: 'Waits',
      say: "Next is a wait. A wait pauses the contact right here, in this case for one day, before they move on. Waits are what turn a single message into a friendly follow-up sequence, instead of five messages arriving at once.",
      actions: [
        { at: 0.4, hover: '#wf_node_s4' },
        { at: 0.6, highlight: '#wf_node_s4', label: 'Pause for one day', for: 3.6 },
        { at: 0.8, zoom: '#wf_node_s4', scale: 1.6, for: 3.8 },
      ],
    },
    {
      chapter: 'Conditions: If/Else',
      say: "Then comes a condition. This If/Else step asks a question: has the contact booked a consultation yet? Contacts who have, go down the Booked path. Everyone else goes down the None path, and gets a gentle email and one more text. Each contact only ever travels one path.",
      actions: [
        { at: 0.4, hover: '#wf_node_s5' },
        { at: 0.6, highlight: '#wf_node_s5', label: 'Ask a question', for: 3.4 },
        { at: 4.4, scroll: 420, ms: 1200 },
        { at: 6.2, hover: '#wf_branch_s5_0' },
        { at: 6.4, highlight: '#wf_branch_s5_0', label: 'Booked', for: 2.8 },
        { at: 9.6, hover: '#wf_branch_s5_1' },
        { at: 9.8, highlight: '#wf_branch_s5_1', label: 'Everyone else', for: 2.6 },
        { at: 12.6, hover: '#wf_node_s7' },
        { at: 12.8, zoom: '#wf_node_s7', scale: 1.4, for: 3.4 },
      ],
    },
    {
      chapter: 'One contact at a time',
      say: "Here's the key idea. A workflow runs separately for every contact. Olivia might be waiting on day one, while Sophie has already booked and finished. You can see exactly who's in the workflow, and where, in Enrollment History.",
      actions: [
        { at: 0.4, title: 'Every contact has their own journey', sub: '', for: 4 },
        { at: 6.0, click: '#wf_tab_enrollment' },
        { at: 8.0, highlight: '#wfe_table', label: 'Who is where', for: 4 },
      ],
    },
    {
      chapter: 'Draft & publish',
      say: "Finally, the switch at the top right. A workflow only runs when it's published. While it's a draft, you can build and test safely, and nothing is sent. When you're happy, switch it to Publish, and click Save.",
      actions: [
        { at: 0.3, click: '#wf_tab_builder' },
        { at: 2.0, hover: '.wf-pub' },
        { at: 2.2, highlight: '.wf-pub', label: 'Draft or Publish', for: 4 },
        { at: 2.4, zoom: '.wf-head .r', scale: 1.8, for: 4.6 },
        { at: 8.6, hover: '#wf_save' },
        { at: 8.8, highlight: '#wf_save', label: 'Always save', for: 2.4 },
      ],
    },
    {
      chapter: 'Your plan',
      say: "Workflow automation is included on the Growth and Pro plans. A handful of premium actions, like Google Sheets and custom webhooks, need Pro, and we'll cover those later in this module.",
      actions: [
        { at: 0.4, title: 'Growth & Pro plans', sub: 'Premium actions: Pro', for: 5 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Say it in *one sentence* first', sub: 'When this happens, do this, unless that.' },
      say: "Here's a pro tip. Before you build, describe the workflow in one sentence. When someone submits the Invisalign form, text them right away, and if they haven't booked after a day, follow up. The when is your trigger, the do is your actions, and the unless is your condition.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 9.2', title: 'Your *first workflow*', sub: 'Build, test and publish a new-lead follow-up.', cta: 'Kyntlo [Academy]' },
      say: "Now you know how workflows think. In the next lesson, we'll build your first one from scratch, a new lead follow-up, and test it before it goes live. See you there!",
    },
  ],
};
