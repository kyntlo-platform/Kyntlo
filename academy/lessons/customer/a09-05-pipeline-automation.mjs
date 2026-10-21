// Track A · Module 9 · Lesson 5 — Pipeline automation.
// Builds "Consultation Booked → Pipeline" from scratch (new steps get ids n1, n2, …),
// then shows an opportunity-triggered workflow.
const opt = (text) => `.menu button:has-text("${text}")`;

export default {
  id: 'A-9.5',
  title: 'Kyntlo Academy 9.5 — Pipeline automation: move deals and create tasks',
  description:
    'Keep your pipeline up to date without dragging cards: use workflows to create and move opportunities, tag contacts, create tasks for your team, and react when deals are won.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Workflows', 'Pipelines', 'Opportunities'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 9 · Lesson 5', title: '*Pipeline* automation' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 9 · Lesson 5', title: '*Pipeline* automation', sub: 'Move deals automatically, and never forget a follow-up.' },
      say: "In module six, you moved deals through your pipeline by hand. That works, until things get busy and cards stop moving. In this lesson, workflows will keep your pipeline up to date for you, and create tasks so your team always knows what to do next.",
    },
    {
      chapter: 'The plan',
      card: { type: 'chapter', kicker: 'What we will build', title: 'Booked → *Consultation Booked*', sub: 'Move the deal, tag the contact, and give the team a task.' },
      say: "Here's the plan. When someone books a new patient consultation, their deal should move to the Consultation Booked stage, the contact should be tagged, and someone should get a task to prepare for the visit.",
    },
    {
      chapter: 'Create the workflow',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Create a new workflow from scratch, and name it so the purpose is obvious: Consultation Booked, Pipeline.",
      actions: [
        { at: 0.3, click: '#wf_create' },
        { at: 1.8, click: '#wf_scratch' },
        { at: 3.2, click: '#wf_name' },
        { at: 3.8, type: 'Consultation Booked → Pipeline', delay: 40 },
        { at: 6.4, press: 'Enter' },
      ],
    },
    {
      chapter: 'Trigger: a booking',
      say: "The trigger is Customer Booked Appointment. Add a filter for the New Patient Consultation calendar, so check-ups and whitening sessions don't move deals around. Then save the trigger.",
      actions: [
        { at: 0.3, click: '#wf_add_trigger' },
        { at: 1.8, click: '#wft_customer_booked_appointment' },
        { at: 3.6, click: '#wft_add_filter' },
        { at: 4.8, click: '#wft_filter_value' },
        { at: 6.0, click: opt('New Patient Consultation') },
        { at: 6.6, zoom: '.drawer .modal-b', scale: 1.5, for: 3.4 },
        { at: 10.8, click: '#wft_save' },
      ],
    },
    {
      chapter: 'Create or update the opportunity',
      say: "Now add Create, or Update Opportunity. Choose the Patient Journey pipeline, and the Consultation Booked stage. If the contact already has a deal in this pipeline, Kyntlo moves it. If not, it creates one. So it works for brand-new bookings too.",
      actions: [
        { at: 0.3, click: '#wf_plus_end' },
        { at: 1.6, click: '#wfa_create_update_opportunity' },
        { at: 3.4, highlight: '#wfa_pipeline', label: 'Patient Journey', for: 2.6 },
        { at: 6.0, click: '#wfa_stage' },
        { at: 7.2, click: opt('Consultation Booked') },
        { at: 8.0, zoom: '.drawer .modal-b', scale: 1.4, for: 4 },
      ],
    },
    {
      chapter: 'Two important switches',
      say: "Two switches at the bottom matter. Allow duplicate opportunities stays off, so one person never ends up with three copies of the same deal. And the first switch lets a deal move back to an earlier stage, which is useful if someone books again after going quiet. Save the action.",
      actions: [
        { at: 0.4, highlight: '#wfa_duplicate', label: 'Keep this off', for: 4.6 },
        { at: 0.6, zoom: '#wfa_duplicate', scale: 1.8, for: 4.6 },
        { at: 8.6, highlight: '#wfa_backward', label: 'Allow moving back', for: 4 },
        { at: 15.4, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Tag the contact',
      say: "Next, add a contact tag: consultation booked. Tags like this are what your other workflows check. Remember the If/Else in our new lead workflow? It looks for exactly this tag.",
      actions: [
        { at: 0.3, click: '#wf_plus_end' },
        { at: 1.6, click: '#wfa_add_contact_tag' },
        { at: 3.0, click: '#wfa_tags' },
        { at: 4.2, click: opt('consultation booked') },
        { at: 5.4, highlight: '#wfa_tags', label: 'consultation booked', for: 3 },
        { at: 9.0, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Create a task',
      say: "Finally, a task. Add Task, give it a clear title, like Prepare consultation notes, and assign it. It appears in the assigned user's task list, and on the contact record, due the next day.",
      actions: [
        { at: 0.3, click: '#wf_plus_end' },
        { at: 1.6, click: '#wfa_add_task' },
        { at: 3.0, type: 'Prepare consultation notes', into: '#wfa_task_title', delay: 40 },
        { at: 6.2, highlight: '#wfa_assign', label: 'Assigned user', for: 2.6 },
        { at: 9.4, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Publish',
      say: "Here's the finished workflow: booking in, deal moved, contact tagged, task created. Switch it to Publish and save. From now on, nobody has to remember to drag that card, even on your busiest days.",
      actions: [
        { at: 0.4, highlight: '#wf_flow', label: 'Booking → deal → tag → task', for: 4.4 },
        { at: 5.6, click: '#wf_publish' },
        { at: 6.6, click: '#wf_save' },
      ],
    },
    {
      chapter: 'Opportunity triggers',
      say: "Workflows can also start from the pipeline itself. Open the trigger list and search for opportunity. You can react when a deal is created, when its status changes to won or lost, when it moves to a stage, or when it goes stale.",
      actions: [
        { at: 0.3, click: '#wf_add_trigger' },
        { at: 1.8, type: 'opp', into: '#wft_search' },
        { at: 3.2, highlight: '#wft_list', label: 'Opportunity triggers', for: 5 },
        { at: 8.6, hover: '#wft_stale_opportunities' },
        { at: 8.8, highlight: '#wft_stale_opportunities', label: 'Deals going quiet', for: 2.6 },
        { at: 11.8, click: '#wft_cancel' },
      ],
    },
    {
      chapter: 'When a deal is won',
      goto: '{demo}#/automation/workflows/w8',
      settle: 1,
      say: "Here's one Bloom already uses. When an opportunity in the Patient Journey pipeline is marked as won, the contact is tagged as a patient, and receives a welcome email. A great first impression, without anyone lifting a finger.",
      actions: [
        { at: 0.4, highlight: '#wf_trigger_0', label: 'Status changed to Won', for: 4 },
        { at: 5.0, highlight: '#wf_node_s1', label: 'Tag: patient', for: 2.6 },
        { at: 7.8, hover: '#wf_node_s2' },
        { at: 8.0, highlight: '#wf_node_s2', label: 'Welcome email', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Automate the *middle*', sub: 'Let workflows move deals forward. Let people decide won or lost.' },
      say: "Here's a pro tip. Let workflows handle the predictable moves in the middle of your pipeline, like enquiry to booked. But let a person mark deals as won or lost. That keeps your reports honest, and your revenue numbers trustworthy.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 9.6', title: 'Recipes & *templates*', sub: 'Start fast from proven workflows.', cta: 'Kyntlo [Academy]' },
      say: "Your pipeline now updates itself. In the next lesson, you'll learn how to start new workflows in seconds, using ready-made recipes. See you there!",
    },
  ],
};
