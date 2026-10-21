// Track C · Support Playbook C2 — Onboarding a new customer, step by step.
// First-week checklist, ordered so slow items (phone registration, DNS) start on day one.
// Follows the onboarding journey and activation definition in the BRD (sections 11.5, 16).
export default {
  id: 'C-2',
  title: 'Kyntlo Academy Support C2 — Onboarding a new customer, step by step',
  description:
    "Internal support playbook. The first-week onboarding checklist for a new Kyntlo customer: plan and snapshot, Launchpad, business profile and time zone, staff, phone and registration, email sending domain, calendars, pipeline, chat widget, the first workflow, and a full end-to-end test.",
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'Customer onboarding', 'HighLevel'],
  thumbnail: { kicker: 'Support Playbook C2', title: 'Onboarding a *new customer*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C2', title: 'Onboarding a *new customer*', sub: 'The first-week checklist, step by step.' },
      say: "A customer's first week shapes how they feel about Kyntlo for months. In this playbook, you'll follow the onboarding checklist in an order that avoids rework, and learn what to check at each step. We'll use Bloom Dental Studio, a sub-account that has just been set up.",
    },
    {
      chapter: 'Before day one',
      card: { type: 'chapter', kicker: 'Before day one', title: 'Confirm the *basics*', sub: 'One sub-account · the plan they paid for · the right snapshot · admin invited · welcome email received' },
      say: "Before the customer logs in, confirm the basics on Kyntlo's side. There's exactly one sub-account for this customer, not two. It's on the plan they paid for, with the right snapshot loaded. And the first admin user has received the welcome email, so they can set their own password at hub dot kyntlo dot A I. Never send passwords by email or chat.",
    },
    {
      chapter: 'Launchpad',
      goto: '{demo}#/launchpad',
      settle: 1.5,
      say: "Day one starts in Launchpad, the setup checklist at the top of the sidebar. It covers Google Business Profile, Facebook and Instagram, the chat widget, email, a phone number and the mobile app. The progress bar shows how far the customer has got, so it's the quickest way to see where they are when they contact you.",
      actions: [
        { at: 0.5, highlight: '#sb_launchpad', label: 'Launchpad', for: 2.4 },
        { at: 3.4, highlight: '#lp_steps', label: 'Six setup steps', for: 6 },
        { at: 12.0, zoom: '#lp_progress', scale: 1.8, for: 4 },
        { at: 12.2, highlight: '#lp_progress', label: 'Where they are', for: 3.6 },
      ],
    },
    {
      chapter: 'Business profile & time zone',
      goto: '{demo}#/settings/business-profile',
      settle: 1.5,
      say: "Next, Business Profile, in Settings. Check the business name, address, and especially the time zone. It controls when appointments show, when reminders and workflows send, and how reports count each day. Then check the legal business details. Phone and messaging registrations use them, so they must match official records exactly.",
      actions: [
        { at: 0.5, highlight: '#bp_general_card', label: 'Name & contact details', for: 3.4 },
        { at: 5.4, zoom: '#bp_timezone', scale: 1.8, for: 5 },
        { at: 5.6, highlight: '#bp_timezone', label: 'Time zone', for: 4.6 },
        { at: 14.4, highlight: '#bp_info_card', label: 'Must match official records', for: 5 },
      ],
    },
    {
      chapter: 'Staff & permissions',
      goto: '{demo}#/settings/my-staff',
      settle: 1.5,
      say: "Then My Staff. Every person gets their own login, never a shared one. Check each role: admins can change settings, users can't. Check permissions, so people only see what they need. And keep the plan's user limit in mind: three on Starter, ten on Growth, and twenty-five on Pro.",
      caption: "Then My Staff. Every person gets their own login, never a shared one. Check each role: admins can change settings, users can't. Check permissions, so people only see what they need. And keep the plan's user limit in mind: 3 on Starter, 10 on Growth, and 25 on Pro.",
      actions: [
        { at: 0.5, highlight: '#ss_menu_my-staff', label: 'My Staff', for: 2.4 },
        { at: 3.2, highlight: '#ms_table', label: 'One login per person', for: 4.4 },
        { at: 3.4, zoom: '#ms_table', scale: 1.35, for: 6 },
        { at: 13.0, title: 'User limits', sub: 'Starter 3 · Growth 10 · Pro 25', for: 4 },
      ],
    },
    {
      chapter: 'Phone & registration',
      goto: '{demo}#/settings/phone-numbers',
      settle: 1.5,
      say: "On Growth and Pro, set up the phone early, because registration takes time. In Phone System, check the number can send texts. In the UK, local numbers are voice only, so texting needs a mobile number. Then open Trust Center, and make sure the business profile and any required registrations are submitted. For US numbers, that includes A two P ten D L C, covered in playbook C four.",
      caption: "On Growth and Pro, set up the phone early, because registration takes time. In Phone System, check the number can send texts. In the UK, local numbers are voice only, so texting needs a mobile number. Then open Trust Center, and make sure the business profile and any required registrations are submitted. For US numbers, that includes A2P 10DLC, covered in playbook C4.",
      actions: [
        { at: 0.5, highlight: '#ph_table', label: 'Numbers & capabilities', for: 3.4 },
        { at: 5.8, highlight: '#ph_row_1', label: 'Calls + texts', for: 4.4 },
        { at: 5.9, zoom: '#ph_table', scale: 1.4, for: 5 },
        { at: 13.6, click: '#phone_tab_trust-center' },
        { at: 15.0, highlight: '#tc_profile', label: 'Business identity', for: 3 },
        { at: 18.2, highlight: '#tc_steps', label: 'Registration progress', for: 4 },
      ],
    },
    {
      chapter: 'Email sending domain',
      goto: '{demo}#/settings/email-services',
      settle: 1.5,
      say: "Now email. Until a dedicated sending domain is added, emails go out from a shared domain. Add a subdomain, like mail dot bloomdental dot co dot uk. The customer then adds the DNS records at their domain provider, and verifies. Start this on day one too, because DNS changes can take up to forty-eight hours.",
      caption: "Now email. Until a dedicated sending domain is added, emails go out from a shared domain. Add a subdomain, like mail.bloomdental.co.uk. The customer then adds the DNS records at their domain provider, and verifies. Start this on day one too, because DNS changes can take up to 48 hours.",
      actions: [
        { at: 0.5, highlight: '#es_empty', label: 'Shared domain for now', for: 4 },
        { at: 5.4, click: '#es_add_domain' },
        { at: 6.8, type: 'mail.bloomdental.co.uk', into: '#es_domain_input', delay: 45 },
        { at: 8.4, zoom: '.modal', scale: 1.4, for: 5 },
      ],
    },
    {
      chapter: 'Calendars & sync',
      goto: '{demo}#/calendars/settings',
      settle: 1.5,
      say: "Calendars next. For each calendar, confirm who takes the bookings, the working hours and the appointment length. Then have each team member connect their own Google or Outlook calendar, so personal appointments block their availability. Playbook C six covers what to check when bookings go wrong.",
      caption: "Calendars next. For each calendar, confirm who takes the bookings, the working hours and the appointment length. Then have each team member connect their own Google or Outlook calendar, so personal appointments block their availability. Playbook C6 covers what to check when bookings go wrong.",
      actions: [
        { at: 0.5, highlight: '#cal_list', label: 'Team, hours & length', for: 5 },
        { at: 0.7, zoom: '#cal_list', scale: 1.3, for: 6 },
        { at: 8.0, click: '#cal_set_connections' },
        { at: 9.4, highlight: '#cal_conn_list', label: 'Google or Outlook', for: 4.6 },
      ],
    },
    {
      chapter: 'Pipeline',
      goto: '{demo}#/opportunities/pipelines',
      settle: 1.5,
      say: "Then the pipeline. The snapshot usually includes one. Walk through the stages with the customer, and rename them to match how they really sell. Starter includes one pipeline, Growth two to three, and Pro unlimited, so check the plan before they add more.",
      caption: "Then the pipeline. The snapshot usually includes one. Walk through the stages with the customer, and rename them to match how they really sell. Starter includes 1 pipeline, Growth 2 to 3, and Pro unlimited, so check the plan before they add more.",
      actions: [
        { at: 0.5, highlight: '#pl_table', label: 'Pipelines & stages', for: 5 },
        { at: 0.7, zoom: '#pl_table', scale: 1.3, for: 6 },
      ],
    },
    {
      chapter: 'Chat widget',
      goto: '{demo}#/sites/chat-widget',
      settle: 1.5,
      say: "The chat widget is the quickest lead source to get working. Check its settings, then install the code on the customer's website. If their website is built in Kyntlo, no code is needed. Send a test message from the live site, and make sure it lands in Conversations.",
      actions: [
        { at: 0.5, highlight: '#cw_row_cw1', label: 'Chat widget', for: 4 },
        { at: 8.0, title: 'Test it live', sub: 'The message should land in Conversations', for: 4 },
      ],
    },
    {
      chapter: 'First workflow',
      goto: '{demo}#/automation/workflows',
      settle: 1.5,
      say: "Last, the first workflow, on Growth and Pro. Start with one from the snapshot, like new lead follow-up. Check the business details in every message, test it with a test contact, and only then publish. A workflow left in draft never runs. And one published too early can send the wrong details to real customers.",
      actions: [
        { at: 0.5, click: '#wf_folder_lead_nurture' },
        { at: 2.4, highlight: '#wf_row_w1', label: 'New lead follow-up', for: 4 },
        { at: 2.6, zoom: '#wf_row_w1', scale: 1.5, for: 4.4 },
        { at: 12.0, highlight: '#wf_row_w1 .chip', label: 'Publish only after testing', for: 4 },
      ],
    },
    {
      chapter: 'End-to-end test',
      card: { type: 'chapter', kicker: 'End-to-end test', title: 'One lead, *start to finish*', sub: 'Form or chat → contact → opportunity → follow-up → booking → confirmation' },
      say: "Before you call onboarding done, run one complete test. Submit a form or a chat as a test lead. Check that a contact is created, an opportunity appears in the pipeline, the follow-up arrives, and a test booking gets its confirmation. An account that has been created is not the same as a customer who is up and running.",
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: 'The *first week*', sub: 'Plan & snapshot · Launchpad · Profile & time zone · Staff · Phone & registration · Email domain · Calendars · Pipeline · Chat widget · First workflow · Full test' },
      say: "Here's the full first-week list. Plan and snapshot. Launchpad. Business profile and time zone. Staff and permissions. Phone and registration. Email domain. Calendars and sync. Pipeline. Chat widget. First workflow. And one full test. Start the slow ones, phone registration and DNS, on day one.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Playbook C3', title: 'Email *deliverability*', sub: 'Common causes, and how to fix them.', cta: 'Kyntlo [Academy]' },
      say: "That's a smooth first week. In the next playbook, we'll troubleshoot email deliverability: why emails land in spam, or don't arrive at all.",
    },
  ],
};
