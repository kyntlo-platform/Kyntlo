// Track A · Module 3 · Lesson 2 — Adding & importing contacts.
export default {
  id: 'A-3.2',
  title: 'Kyntlo Academy 3.2 — Adding & importing contacts',
  description:
    'Add contacts by hand, import a CSV spreadsheet, map columns to Kyntlo fields and custom fields, and keep duplicates out of your CRM.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM tutorial', 'Import contacts', 'CSV import'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 3 · Lesson 2', title: 'Import your *contacts*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 3 · Lesson 2', title: 'Adding & *importing* contacts', sub: 'One at a time, or your whole list at once.' },
      say: "In this lesson, you'll add contacts to Kyntlo in two ways: one at a time, and in bulk from a spreadsheet. You'll also see how Kyntlo stops the same person from ending up on your list twice.",
    },
    {
      chapter: 'Where contacts come from',
      goto: '{demo}#/contacts',
      settle: 1,
      say: "Most contacts arrive on their own, from your forms, calendars, chats and calls. But sometimes you'll want to add someone by hand, like a walk-in customer. And when you first move to Kyntlo, you'll want to bring your existing list with you.",
      actions: [
        { at: 0.6, title: 'Adding contacts', sub: 'By hand, or from a spreadsheet', for: 4 },
        { at: 8.0, hover: '#ct_add' },
        { at: 8.2, highlight: '#ct_add', label: 'One at a time', for: 2.6 },
        { at: 11.4, hover: '#ct_import' },
        { at: 11.6, highlight: '#ct_import', label: 'In bulk', for: 2.6 },
      ],
    },
    {
      chapter: 'Add a contact',
      say: "Let's start with a single contact. Click Add Contact, and a panel slides in from the right. Fill in their first and last name, and their email address.",
      speed: 1.2,
      actions: [
        { at: 1.2, click: '#ct_add' },
        { at: 3.6, type: 'Ruby', into: '#nc_first' },
        { at: 5.0, type: 'Collins', into: '#nc_last' },
        { at: 6.8, type: 'ruby.collins@mail.com', into: '#nc_email' },
      ],
    },
    {
      chapter: 'Add a contact',
      say: "Then add their mobile number. Always include the country code, like plus four four for the UK, so your text messages reach them.",
      caption: 'Then add their mobile number. Always include the country code, like +44 for the UK, so your text messages reach them.',
      actions: [
        { at: 0.6, type: '+44 7700 900120', into: '#nc_phone' },
        { at: 3.6, zoom: '#nc_phone', scale: 1.7, for: 3 },
      ],
    },
    {
      chapter: 'Add a contact',
      say: "Add a tag to describe them. Type it, and press Enter. Tags are labels you'll use to filter your list, and to start automations later on.",
      actions: [
        { at: 0.6, type: 'walk-in', into: '#nc_tags' },
        { at: 2.2, press: 'Enter' },
        { at: 2.6, highlight: '#nc_tagbox', label: 'Tags', for: 3 },
      ],
    },
    {
      chapter: 'Add a contact',
      say: "You can also choose who on your team owns this contact, and switch on Do Not Disturb if they've asked not to be contacted. Then click Save. Ruby is now at the top of your list.",
      actions: [
        { at: 0.6, hover: '#nc_owner' },
        { at: 0.8, highlight: '#nc_owner', label: 'Contact owner', for: 2.4 },
        { at: 3.4, hover: '#nc_dnd' },
        { at: 3.6, highlight: '#nc_dnd', label: 'Do not disturb', for: 2.4 },
        { at: 7.2, click: '#nc_save' },
        { at: 8.6, highlight: '#ct_table tbody tr:first-child', label: 'New contact', for: 3 },
      ],
    },
    {
      chapter: 'Avoiding duplicates',
      say: "Kyntlo also watches for duplicates as you type. Let's try adding someone with a phone number that's already in the system.",
      actions: [
        { at: 0, wait: 2.6 },
        { at: 2.8, click: '#ct_add' },
        { at: 4.8, type: '+44 7700 900103', into: '#nc_phone' },
      ],
    },
    {
      chapter: 'Avoiding duplicates',
      say: "Kyntlo spots that this number belongs to Emma Clarke, and offers to open her record instead. It recognises people by their email address and phone number, which is why it's worth collecting both on every form. One person, one record, means one complete history.",
      actions: [
        { at: 0.4, hover: '#nc_dupwarn' },
        { at: 0.6, highlight: '#nc_dupwarn', label: 'Already in your list', for: 4 },
        { at: 0.8, zoom: '#nc_dupwarn', scale: 1.6, for: 4 },
        { at: 9.4, click: '.drawer [data-close]' },
      ],
    },
    {
      chapter: 'Import a spreadsheet',
      say: "Now for bulk. First, export your old contact list as a CSV file, from a spreadsheet or your previous system. Then click Import, and drop the file in.",
      caption: 'Now for bulk. First, export your old contact list as a .csv file, from a spreadsheet or your previous system. Then click Import, and drop the file in.',
      actions: [
        { at: 4.6, click: '#ct_import' },
        { at: 6.4, highlight: '#im_drop', label: 'Drop your CSV here', for: 2.6 },
        { at: 9.2, click: '#im_drop' },
      ],
    },
    {
      chapter: 'Map your fields',
      say: "Next, Kyntlo matches each column in your file to a field in Kyntlo. Check every row. Columns like treatment and last visit can go into custom fields, and anything you don't need can be skipped.",
      actions: [
        { at: 0.6, hover: '#im_map' },
        { at: 0.8, highlight: '#im_map', label: 'Your file → Kyntlo fields', for: 4 },
        { at: 6.0, zoom: '#im_map tbody tr:nth-child(5)', scale: 1.6, for: 3.4 },
      ],
    },
    {
      chapter: 'Import options',
      say: "Then choose how to import. Create and update is usually the right choice. New people are added, and anyone you already have is updated, instead of duplicated.",
      actions: [
        { at: 0.4, click: '#im_next' },
        { at: 3.4, hover: '#im_opt_both' },
        { at: 3.6, highlight: '#im_opt_both', label: 'Recommended', for: 4 },
      ],
    },
    {
      chapter: 'Import options',
      say: "Add a tag to every imported contact, so you can find this batch later. And confirm these people agreed to hear from you. Only import contacts who have given you consent.",
      actions: [
        { at: 0.6, hover: '#im_tags' },
        { at: 0.8, highlight: '#im_tags', label: 'Tag the whole batch', for: 3.2 },
        { at: 5.6, hover: 'label:has(#im_consent)' },
        { at: 5.8, highlight: 'label:has(#im_consent)', label: 'Consent matters', for: 3.4 },
      ],
    },
    {
      chapter: 'Start the import',
      say: "Click Start import. Kyntlo works through the file in the background, so you can carry on working. You can follow its progress under Bulk Actions.",
      actions: [
        { at: 0.4, click: '#im_next' },
        { at: 3.4, click: '#im_next' },
        { at: 5.6, click: '#tab_bulk-actions' },
        { at: 7.2, highlight: '#bulk_actions_0', label: 'Your import', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Clean your file *before* you import', sub: 'Separate names, add country codes, delete blank rows.' },
      say: "Here's a pro tip. Spend ten minutes tidying your spreadsheet before you import. Remove blank rows, put first and last names in separate columns, and add country codes to phone numbers. Clean data now saves hours later.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 3.3', title: 'Inside a *contact record*', sub: 'Timeline, notes, tasks, appointments and DND.', cta: 'Kyntlo [Academy]' },
      say: "Your contacts are in! Next, we'll open a contact record and explore everything it holds, from the activity timeline to notes, tasks and appointments. See you there.",
    },
  ],
};
