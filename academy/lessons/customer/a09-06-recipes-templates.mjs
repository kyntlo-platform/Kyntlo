// Track A · Module 9 · Lesson 6 — Workflow recipes & templates.
// Creates a workflow from the "Missed Call Text Back" recipe, customises it, then clones a workflow.
export default {
  id: 'A-9.6',
  title: 'Kyntlo Academy 9.6 — Workflow recipes & templates',
  description:
    'Start new automations in seconds: browse the workflow recipes, set up Missed Call Text Back from a recipe, customise the message and settings, and clone your own proven workflows.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Workflows', 'Workflow recipes', 'Missed call text back'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 9 · Lesson 6', title: 'Workflow *recipes*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 9 · Lesson 6', title: 'Recipes & *templates*', sub: 'Start fast from proven workflows.' },
      say: "You don't have to build every workflow from a blank page. In this lesson, you'll use a ready-made recipe to set up missed call text back in about two minutes, and learn how to reuse your own best workflows as templates.",
    },
    {
      chapter: 'Find the recipes',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Click Create Workflow. Below Start from Scratch, you'll find the recipes: ready-made workflows for the jobs almost every business needs.",
      actions: [
        { at: 0.4, click: '#wf_create' },
        { at: 2.4, highlight: '.wf-recipes', label: 'Recipes', for: 4.6 },
      ],
    },
    {
      chapter: 'What is on the menu',
      say: "There's appointment confirmation and reminders, Fast Five, which contacts new leads within five minutes, review requests, no-show nurture, missed call text back, a birthday template, and customer reactivation. Each one is a full workflow you can change however you like.",
      actions: [
        { at: 0.4, hover: '#wfr_appointment_confirmation_reminder' },
        { at: 3.0, hover: '#wfr_fast_five' },
        { at: 3.2, highlight: '#wfr_fast_five', label: 'Reply within five minutes', for: 3 },
        { at: 6.8, hover: '#wfr_review_request' },
        { at: 8.4, hover: '#wfr_no_show_nurture' },
        { at: 10.0, hover: '#wfr_missed_call_text_back' },
        { at: 11.6, hover: '#wfr_birthday_template' },
        { at: 13.0, hover: '#wfr_customer_reactivation' },
      ],
    },
    {
      chapter: 'Preview a recipe',
      say: "Let's use Missed Call Text Back. When you miss a call, it texts the caller straight away, so they don't just ring the next business on the list. Click it to preview the trigger and the actions before you commit.",
      actions: [
        { at: 0.4, click: '#wfr_missed_call_text_back' },
        { at: 2.4, highlight: '.modal .wf-box', label: 'Trigger & actions', for: 5 },
        { at: 2.6, zoom: '.modal .wf-box', scale: 1.5, for: 5.4 },
      ],
    },
    {
      chapter: 'Use the recipe',
      say: "Click Use this recipe. Kyntlo creates a new workflow with everything already in place, saved as a draft. Nothing runs until you publish it.",
      actions: [
        { at: 0.4, click: '#wfr_use' },
        { at: 2.6, highlight: '#wf_flow', label: 'Ready-made, as a draft', for: 3.6 },
        { at: 4.0, zoom: '.wf-head .r', scale: 1.8, for: 3 },
      ],
    },
    {
      chapter: 'Check the trigger',
      say: "Always check the trigger first. It's Call Status, filtered to calls with no answer, coming in to your business. That way it only texts people who called you and didn't get through.",
      actions: [
        { at: 0.4, click: '#wf_trigger_0' },
        { at: 2.4, highlight: '#wft_filters', label: 'No Answer · Inbound', for: 5 },
        { at: 2.6, zoom: '#wft_filters', scale: 1.6, for: 5.4 },
        { at: 9.8, click: '#wft_cancel' },
      ],
    },
    {
      chapter: 'Make the message yours',
      speed: 1.3,
      say: "Then make the message sound like you. Open the SMS, replace the text with your own words, and save. Mention your business name, so the caller knows exactly who's texting.",
      actions: [
        { at: 0.4, click: '#wf_node_s1' },
        { at: 1.8, click: '#wfa_message' },
        { at: 2.2, press: 'Control+a' },
        { at: 2.4, type: "Hi, it's Bloom Dental! Sorry we missed your call. How can we help?", delay: 30 },
        { at: 2.6, zoom: '#wfa_message', scale: 1.6, for: 4 },
        { at: 9.0, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Name it & publish',
      say: "Give it a clear name, switch it to Publish, and save. That's a complete missed call text back system, set up in about two minutes.",
      actions: [
        { at: 0.4, click: '#wf_name' },
        { at: 1.0, type: 'Missed Call Text-Back — Main Line', delay: 40 },
        { at: 3.4, press: 'Enter' },
        { at: 4.6, click: '#wf_publish' },
        { at: 5.6, click: '#wf_save' },
      ],
    },
    {
      chapter: 'Clone your own workflows',
      say: "Recipes are one shortcut. Your own workflows are another. Back in the list, open the menu next to any workflow, and choose Clone. You get an exact copy as a draft, ready to adapt, for a new offer or a new location.",
      actions: [
        { at: 0.4, click: '#wf_back' },
        { at: 2.4, click: '[data-more="w7"]' },
        { at: 3.6, highlight: '.menu', label: 'Edit · Clone · Move · Delete', for: 3.6 },
        { at: 7.4, click: '.menu button:has-text("Clone")' },
        { at: 8.6, highlight: '#wf_table tbody tr:last-child', label: 'Your copy, as a draft', for: 3.6 },
      ],
    },
    {
      chapter: 'Organise in folders',
      say: "As your list grows, use Create Folder to keep things tidy. Group workflows by purpose, like leads, appointments and reviews, so you and your team can always find the right one.",
      actions: [
        { at: 0.4, click: '#wf_create_folder' },
        { at: 1.8, type: 'Seasonal Offers', into: '#wf_folder_name', delay: 50 },
        { at: 4.4, click: '#wf_folder_save' },
        { at: 6.0, highlight: '#wf_folder_seasonal_offers', label: 'New folder', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'A recipe is a *starting point*', sub: 'Check the trigger, the wording and the settings, then test.' },
      say: "Here's a pro tip. A recipe is a starting point, not a finished product. Before you publish one, check three things: the trigger filters, the wording of every message, and the settings tab. Then run a quick test on yourself.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 9.7', title: 'Webhooks, *Google Sheets* & premium actions', sub: 'Connect Kyntlo to your other tools.', cta: 'Kyntlo [Academy]' },
      say: "You can now set up proven workflows in minutes. Next, we'll connect Kyntlo to your other tools, with webhooks, Google Sheets and premium actions. See you there!",
    },
  ],
};
