// Track A · Module 3 · Lesson 4 — Tags, custom fields & custom values.
// Custom fields and custom values are created in Settings; this lesson teaches them from the
// contact record and the message composer, where customers use them day to day.
export default {
  id: 'A-3.4',
  title: 'Kyntlo Academy 3.4 — Tags, custom fields & custom values',
  description:
    'Organise your Kyntlo data so automations can use it: when to use a tag, a custom field or a custom value, and how to personalise messages with them.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM tutorial', 'Tags', 'Custom fields', 'Custom values'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 3 · Lesson 4', title: 'Tags, fields & *custom values*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 3 · Lesson 4', title: 'Tags, custom fields & *custom values*', sub: 'Organise your data so your automations can use it.' },
      say: "In this lesson, you'll learn the three ways to organise information in Kyntlo: tags, custom fields and custom values. Get these right, and your filters, automations and messages all become far more powerful.",
    },
    {
      chapter: 'Three tools, three jobs',
      card: { type: 'chapter', kicker: 'The short version', title: 'Tags · *Custom fields* · Custom values', sub: 'Labels for groups · details about a person · details about your business' },
      say: "Here's the short version. Tags are simple labels that put people into groups, like vip. Custom fields store a detail about one contact, like their last visit date. And custom values store a detail about your business, like your booking link, that you reuse everywhere.",
    },
    {
      chapter: 'Tags',
      goto: '{demo}#/contacts/detail/c3',
      settle: 1,
      say: "Let's start with tags. Here's Emma Clarke's record. Her tags sit on the left: whitening, and vip.",
      actions: [
        { at: 0.6, title: 'Tags', sub: 'Labels that group your contacts', for: 3.4 },
        { at: 3.8, hover: '#cd_tags' },
        { at: 4.0, highlight: '#cd_tags', label: 'Her tags', for: 2.6 },
        { at: 4.2, zoom: '#cd_tags', scale: 1.8, for: 2.6 },
      ],
    },
    {
      chapter: 'Tags',
      say: "Click Add tag and start typing. Kyntlo suggests tags you already use, so reuse one whenever you can. If you really need a new tag, click Create.",
      actions: [
        { at: 0.6, click: '#cd_addtag' },
        { at: 2.0, type: 'review', into: '#cd_tag_input' },
        { at: 3.4, highlight: '#cd_tag_sugg', label: 'Existing tags first', for: 2.6 },
        { at: 6.8, type: '-left' },
        { at: 8.4, click: '#cd_tag_create' },
      ],
    },
    {
      chapter: 'Why tags matter',
      say: "Tags are the glue of your automations. A workflow can start the moment a tag is added, like sending a thank-you when someone is tagged review left. And in your contact list, you can filter everyone by tag in a second.",
      actions: [
        { at: 0.6, hover: '#cd_tags' },
        { at: 0.8, highlight: '#cd_tags', label: 'New tag added', for: 3.4 },
        { at: 1.0, zoom: '#cd_tags', scale: 1.8, for: 3.4 },
      ],
    },
    {
      chapter: 'Custom fields',
      say: "Now scroll down to Additional info. These are custom fields. They hold the details that standard fields don't cover, like treatment interest, last visit date, or preferred dentist.",
      actions: [
        { at: 0.6, hover: '#cd_sec_custom' },
        { at: 2.6, highlight: '#cd_custom', label: 'Custom fields', for: 4.4 },
      ],
    },
    {
      chapter: 'Custom fields',
      say: "You update them like any other field, then click Save. Because they're real fields, you can filter by them, sort by them, and even show them as columns in your contact list.",
      actions: [
        { at: 0.6, click: '#cd_cf_lastVisit' },
        { at: 1.2, press: 'Control+A' },
        { at: 1.6, type: '14/10/2026' },
        { at: 4.0, click: '#cd_save' },
      ],
    },
    {
      chapter: 'Creating fields',
      say: "You create new custom fields in Settings, under Custom Fields. Pick a field type, like text, date, dropdown or checkbox, and group related fields into folders. We'll walk through Settings in module fourteen.",
      actions: [
        { at: 0.8, hover: '#sb_settings' },
        { at: 1.0, highlight: '#sb_settings', label: 'Settings › Custom Fields', for: 4 },
        { at: 7.0, move: [1100, 520] },
      ],
    },
    {
      chapter: 'Custom values',
      say: "Custom values are different. They belong to your business, not to a contact. Think of your booking link, your phone number, or this month's offer price. You set them once, in Settings, under Custom Values.",
      actions: [
        { at: 0.6, title: 'Custom values', sub: 'Set once, reuse everywhere', for: 4 },
        { at: 9.0, hover: '#sb_settings' },
        { at: 9.2, highlight: '#sb_settings', label: 'Settings › Custom Values', for: 3 },
      ],
    },
    {
      chapter: 'Personalise a message',
      say: "Here's where it all comes together. In the message box, click Custom values to insert placeholders. Contact fields fill in each person's details, and custom values fill in your business details.",
      speed: 1.3,
      actions: [
        { at: 0.6, type: 'Hi', into: '#cd_msg' },
        { at: 1.6, click: '#cd_merge' },
        { at: 2.4, highlight: '.menu', label: 'Fields and values', for: 2.6 },
        { at: 5.2, click: '#cd_mf_contact-first-name' },
        { at: 6.0, type: ', your whitening top-up is only', delay: 30 },
        { at: 8.2, click: '#cd_merge' },
        { at: 9.0, click: '#cd_mf_custom-values-whitening-offer-price' },
        { at: 10.0, type: ' this month. Book here:', delay: 30 },
        { at: 11.6, click: '#cd_merge' },
        { at: 12.4, click: '#cd_mf_custom-values-booking-link' },
        { at: 13.4, zoom: '#cd_msg', scale: 1.5, for: 2.6 },
      ],
    },
    {
      chapter: 'Personalise a message',
      say: "When you send it, Kyntlo swaps each placeholder for the real value. Emma sees her own name, the price and the link. And if the price changes, you update one custom value, and every message that uses it updates too.",
      actions: [
        { at: 0.4, click: '#cd_send' },
        { at: 1.6, hover: '#cd_activity .card' },
        { at: 1.8, highlight: '#cd_activity .card', label: 'Filled in for Emma', for: 4 },
        { at: 2.0, zoom: '#cd_activity .card', scale: 1.5, for: 4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Agree a *tag naming* style', sub: 'lowercase-with-hyphens, and a list of what each one means.' },
      say: "Here's a pro tip. Agree on a naming style for tags with your team, like lowercase words joined with hyphens, and write down what each tag means. A tidy tag list keeps your filters and automations reliable as you grow.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 3.5', title: 'Smart lists & *bulk actions*', sub: 'Segment contacts, then tag, message and export them in one go.', cta: 'Kyntlo [Academy]' },
      say: "Your data is organised! In the next lesson, we'll put it to work with smart lists and bulk actions, so you can tag, message and export whole groups at once. See you there.",
    },
  ],
};
