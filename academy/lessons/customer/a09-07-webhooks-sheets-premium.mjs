// Track A · Module 9 · Lesson 7 — Webhooks, Google Sheets & premium actions (Pro).
// Uses the draft "Website Leads → Google Sheet" workflow (w9) on the demo workspace.
const opt = (text) => `.menu button:has-text("${text}")`;

export default {
  id: 'A-9.7',
  title: 'Kyntlo Academy 9.7 — Webhooks, Google Sheets & premium actions',
  description:
    'Connect Kyntlo to your other tools without Zapier: start workflows from an inbound webhook, add rows to Google Sheets, send data out with webhooks, and understand how premium actions are billed.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Workflows', 'Webhooks', 'Google Sheets', 'Integrations'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 9 · Lesson 7', title: 'Webhooks & *Google Sheets*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 9 · Lesson 7', title: 'Webhooks, *Google Sheets* & premium actions', sub: 'Connect Kyntlo to your other tools, without Zapier.' },
      say: "Most businesses use a few other tools alongside Kyntlo. In this lesson, you'll connect them directly from a workflow. We'll receive data with an inbound webhook, add rows to a Google Sheet, and send data out to another app.",
    },
    {
      chapter: 'What premium means',
      card: { type: 'chapter', kicker: 'Before we start', title: 'Premium = *Pro plan*', sub: 'Premium triggers and actions are billed per execution.' },
      say: "These are premium features. They're included on the Pro plan, and each time a premium trigger or action runs, a small usage charge applies. You'll find the current rates on the Kyntlo pricing page. In the builder, look for the premium badge.",
    },
    {
      chapter: 'The example',
      goto: '{demo}#/automation/workflows/w9',
      settle: 1,
      say: "Here's the example. Bloom's website is built on another platform, and its enquiry form needs to reach Kyntlo. Every enquiry should become a contact, and a row in the practice manager's Google Sheet.",
      actions: [
        { at: 0.4, title: 'Website Leads → Google Sheet', sub: 'Draft workflow', for: 4 },
        { at: 5.0, highlight: '#wf_flow', label: 'Webhook → contact → sheet', for: 4.4 },
      ],
    },
    {
      chapter: 'Inbound webhook trigger',
      say: "The trigger is Inbound Webhook. Kyntlo gives you a unique address. Copy it, and paste it into your other app, as the place to send new enquiries.",
      actions: [
        { at: 0.4, click: '#wf_trigger_0' },
        { at: 2.4, highlight: '.wf-url', label: 'Your unique webhook URL', for: 4 },
        { at: 2.6, zoom: '.drawer .wf-box', scale: 1.4, for: 4.6 },
        { at: 7.4, click: '#wft_copy' },
      ],
    },
    {
      chapter: 'Fetch a sample',
      say: "Then send one test enquiry from that app, and click Fetch sample requests. Kyntlo shows the data it received: name, email, phone and treatment. Now it knows which fields are available to map.",
      actions: [
        { at: 0.6, click: '#wft_fetch' },
        { at: 2.2, highlight: '#wft_sample', label: 'The data that arrived', for: 5 },
        { at: 2.4, zoom: '#wft_sample', scale: 1.5, for: 5.4 },
        { at: 11.4, click: '#wft_save' },
      ],
    },
    {
      chapter: 'Create the contact',
      say: "The first action, Create Contact, maps that incoming data onto contact fields. The first name, email and phone from the webhook become a real contact in your CRM, with tags so you know where they came from.",
      actions: [
        { at: 0.4, click: '#wf_node_s1' },
        { at: 2.2, highlight: '.drawer .modal-b', label: 'Webhook fields → contact fields', for: 5 },
        { at: 2.4, zoom: '.drawer .modal-b', scale: 1.3, for: 5.4 },
        { at: 10.4, click: '#wfa_cancel' },
      ],
    },
    {
      chapter: 'Google Sheets action',
      say: "Next, Google Sheets. Connect your Google account once, then choose what to do: create, update, look up or delete a row. Pick the spreadsheet and the worksheet.",
      actions: [
        { at: 0.4, click: '#wf_node_s2' },
        { at: 2.2, highlight: '.drawer .chip.green', label: 'Connected account', for: 2.8 },
        { at: 5.2, click: '#wfa_gaction' },
        { at: 6.2, highlight: '.menu', label: 'Row actions', for: 3.4 },
        { at: 9.8, click: opt('Create Spreadsheet Row') },
      ],
    },
    {
      chapter: 'Map the columns',
      say: "Then map each column in your sheet to a custom value. Name goes in the name column, email in the email column, and so on. Every new enquiry adds a fresh row, automatically. Save the action.",
      actions: [
        { at: 0.4, scroll: 260, ms: 900 },
        { at: 1.6, highlight: '#wfa_map', label: 'Column → custom value', for: 5 },
        { at: 1.8, zoom: '#wfa_map', scale: 1.4, for: 5.4 },
        { at: 10.4, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Sending data out',
      say: "Data can travel the other way too. Click plus and search for webhook. The standard Webhook action posts contact data to a URL. Custom Webhook is the premium version, where you control the method, headers and body, for tools that need a specific format.",
      actions: [
        { at: 0.3, click: '#wf_plus_end' },
        { at: 1.8, type: 'webhook', into: '#wfa_search' },
        { at: 3.4, highlight: '#wfa_webhook', label: 'Webhook', for: 3 },
        { at: 7.0, highlight: '#wfa_custom_webhook', label: 'Custom Webhook · premium', for: 3.4 },
        { at: 10.6, click: '#wfa_custom_webhook' },
        { at: 12.4, zoom: '.drawer .modal-b', scale: 1.3, for: 4 },
      ],
    },
    {
      chapter: 'Configure the webhook',
      say: "Enter the address your other tool gave you, check the body uses the right custom values, and save. Now every enquiry is also sent to that system, the moment it arrives.",
      actions: [
        { at: 0.4, type: 'https://example.com/hooks/new-lead', into: '#wfa_url', delay: 35 },
        { at: 3.0, highlight: '.drawer textarea.input', label: 'Body with custom values', for: 3.6 },
        { at: 8.2, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Other premium actions',
      say: "You'll find a few more premium actions in the list, such as custom code, and the A I actions, like GPT powered by Open A I. We'll use those in the next module.",
      caption: "You'll find a few more premium actions in the list, such as Custom Code, and the AI actions, like GPT Powered by OpenAI. We'll use those in the next module.",
      actions: [
        { at: 0.3, click: '#wf_plus_end' },
        { at: 1.8, type: 'GPT', into: '#wfa_search' },
        { at: 3.2, highlight: '#wfa_gpt_powered_by_openai', label: 'AI · premium', for: 4 },
        { at: 8.4, click: '.drawer [data-close]' },
        { at: 9.2, click: '#wf_save' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Use one *test record*', sub: 'Send a sample, then check Execution Logs before you publish.' },
      say: "Here's a pro tip. When you connect another tool, send one test record, and then open Execution Logs. You'll see exactly what was sent, and what came back, before real customer data flows through it.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 9.8', title: 'Troubleshooting with *execution logs*', sub: "Find out why a contact didn't move.", cta: 'Kyntlo [Academy]' },
      say: "Your workflows can now talk to your other tools. In the final lesson of this module, you'll learn to troubleshoot any workflow, using enrollment history and execution logs. See you there!",
    },
  ],
};
