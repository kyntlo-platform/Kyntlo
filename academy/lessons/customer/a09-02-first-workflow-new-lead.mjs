// Track A · Module 9 · Lesson 2 — Your first workflow: new-lead follow-up.
// Builds a workflow from scratch on the demo workspace. Scenes after the first
// `goto` share state, so they must run in order without reloading the page.
const opt = (text) => `.menu button:has-text("${text}")`;

export default {
  id: 'A-9.2',
  title: 'Kyntlo Academy 9.2 — Your first workflow: new-lead follow-up',
  description:
    'Build your first Kyntlo workflow from scratch: a form trigger with a filter, an instant SMS with custom values, a team notification, a wait and a follow-up email. Then test it and publish it.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Workflows', 'Lead follow-up', 'Speed to lead'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 9 · Lesson 2', title: 'Your *first workflow*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 9 · Lesson 2', title: 'Your *first workflow*', sub: 'Build, test and publish a new-lead follow-up.' },
      say: "In this lesson, you'll build your first workflow from scratch. When someone fills in your contact form, Kyntlo will text them straight away, tell your team, and send a follow-up email the next day. Then we'll test it and switch it on.",
    },
    {
      chapter: 'Why speed matters',
      card: { type: 'chapter', kicker: 'Why it matters', title: 'Reply in *minutes*, not hours', sub: 'The first business to reply usually wins the customer.' },
      say: "Why start here? Because speed wins. People who fill in a form are often contacting other businesses too. An instant, friendly reply, even an automated one, keeps you first in line while your team gets ready to call.",
    },
    {
      chapter: 'Create the workflow',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Go to Automation, then Workflows, and click Create Workflow. You can start from a recipe, which we'll cover later, but this time choose Start from Scratch, so you see how every piece fits together.",
      actions: [
        { at: 0.4, hover: '#wf_create' },
        { at: 2.2, click: '#wf_create' },
        { at: 4.4, highlight: '.wf-recipes', label: 'Recipes', for: 2.6 },
        { at: 7.6, hover: '#wf_scratch' },
        { at: 7.8, highlight: '#wf_scratch', label: 'Start from Scratch', for: 2 },
        { at: 10.0, click: '#wf_scratch' },
      ],
    },
    {
      chapter: 'Name it',
      say: "First, give it a clear name. Click the title at the top and type something you'll recognise in six months' time, like Contact Form, Instant Reply.",
      actions: [
        { at: 0.6, click: '#wf_name' },
        { at: 1.6, type: 'Contact Form — Instant Reply', delay: 45 },
        { at: 4.4, press: 'Enter' },
        { at: 5.0, highlight: '#wf_name', label: 'A name you will recognise', for: 3 },
      ],
    },
    {
      chapter: 'Add the trigger',
      say: "Now the trigger. Click Add New Trigger, and search for form. Choose Form Submitted. Then add a filter, so only the Contact Us form starts this workflow, and click Save Trigger.",
      actions: [
        { at: 0.4, click: '#wf_add_trigger' },
        { at: 2.4, type: 'form', into: '#wft_search' },
        { at: 4.0, click: '#wft_form_submitted' },
        { at: 6.4, click: '#wft_add_filter' },
        { at: 7.6, click: '#wft_filter_value' },
        { at: 8.8, click: opt('Contact Us') },
        { at: 9.4, zoom: '.drawer .modal-b', scale: 1.5, for: 3 },
        { at: 12.6, click: '#wft_save' },
      ],
    },
    {
      chapter: 'Send an instant SMS',
      say: "Next, click the plus button under the trigger to add an action. Every action lives in this panel, grouped by type. Under Communication, choose Send SMS.",
      actions: [
        { at: 0.4, click: '#wf_plus_end' },
        { at: 2.4, highlight: '.drawer .modal-b', label: 'Every action', for: 3 },
        { at: 5.6, hover: '#wfa_send_sms' },
        { at: 6.6, click: '#wfa_send_sms' },
      ],
    },
    {
      chapter: 'Personalise with custom values',
      speed: 1,
      say: "Write your message. To greet each person by name, click Custom Values and pick First Name. Kyntlo swaps that placeholder for each contact's real first name when it sends. Keep it short and friendly, then save the action.",
      actions: [
        { at: 0.4, type: 'Hi ', into: '#wfa_message' },
        { at: 1.6, click: '#wfa_custom_values' },
        { at: 3.0, click: opt('First Name') },
        { at: 4.2, type: ", thanks for contacting Bloom Dental! We'll call you shortly.", delay: 35 },
        { at: 4.4, zoom: '#wfa_message', scale: 1.6, for: 4.6 },
        { at: 12.4, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Notify your team',
      say: "Now let your team know. Add Send Internal Notification. By default it alerts the user assigned to the contact, inside Kyntlo, so the right person can call them back quickly.",
      actions: [
        { at: 0.4, click: '#wf_plus_end' },
        { at: 2.0, click: '#wfa_send_internal_notification' },
        { at: 4.0, highlight: '#wfa_who', label: 'Assigned user', for: 3.4 },
        { at: 9.0, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Wait, then follow up',
      say: "If they haven't heard from you by tomorrow, a follow-up email helps. Add a Wait action, set it to one day, and save. Then add Send Email underneath, with a friendly subject line.",
      actions: [
        { at: 0.3, click: '#wf_plus_end' },
        { at: 1.6, click: '#wfa_wait' },
        { at: 3.0, click: '#wfa_wait_amount' },
        { at: 3.4, press: 'Control+a' },
        { at: 3.6, type: '1' },
        { at: 4.2, click: '#wfa_wait_unit' },
        { at: 5.2, click: opt('Days') },
        { at: 6.2, click: '#wfa_save' },
        { at: 7.8, click: '#wf_plus_end' },
        { at: 9.0, click: '#wfa_send_email' },
        { at: 10.4, type: 'Your visit to Bloom Dental', into: '#wfa_subject', delay: 40 },
        { at: 13.0, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Workflow settings',
      say: "Before going live, check the Settings tab. Stop on response is on, so anyone who replies stops getting automated messages, and a real person can take over. You can also set a time window, so texts never go out in the middle of the night.",
      actions: [
        { at: 0.4, click: '#wf_tab_settings' },
        { at: 2.2, highlight: '#wfs_stop', label: 'Stop on response', for: 4 },
        { at: 2.4, zoom: '#wfs_stop', scale: 1.4, for: 4.6 },
        { at: 9.4, click: '#wfs_window' },
        { at: 10.0, highlight: '.wf-days', label: 'Only during opening hours', for: 3.6 },
        { at: 14.0, click: '#wfs_save' },
      ],
    },
    {
      chapter: 'Test it',
      say: "Back in the builder, click Test Workflow, and choose a contact. Test on yourself, because the messages are really sent. Run the test, and you'll see each step as it executes. It stops at the wait, exactly as a real lead would.",
      actions: [
        { at: 0.3, click: '#wf_tab_builder' },
        { at: 1.8, click: '#wf_test' },
        { at: 3.4, click: '#wf_test_contact' },
        { at: 4.6, click: opt('Sarah Mitchell (you)') },
        { at: 7.4, click: '#wf_test_run' },
        { at: 8.4, highlight: '#wf_test_res', label: 'Each step, live', for: 4 },
        { at: 15.0, click: '.modal [data-close]' },
      ],
    },
    {
      chapter: 'Publish',
      say: "Everything works, so let's switch it on. Flip the toggle from Draft to Publish, and click Save. From now on, every Contact Us submission gets an instant reply, day or night.",
      actions: [
        { at: 0.4, click: '#wf_publish' },
        { at: 1.4, zoom: '.wf-head .r', scale: 1.8, for: 4 },
        { at: 4.0, click: '#wf_save' },
        { at: 5.4, title: 'Published', sub: 'Your first workflow is live', for: 3.6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Read it as the *customer*', sub: 'Every message should make sense on its own, on a phone.' },
      say: "Here's a pro tip. Read your messages as if you were the customer. Would this text make sense on its own, at any time of day? Does it say who it's from? If not, rewrite it. Workflows are only as good as the words inside them.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 9.3', title: 'If/Else, *waits* & goals', sub: 'Send each contact down the right path.', cta: 'Kyntlo [Academy]' },
      say: "Congratulations, you've built and published your first workflow! Next, we'll make workflows smarter with If/Else branches, waits and goals. See you in the next lesson.",
    },
  ],
};
