// Track A · Module 3 · Lesson 1 — The contact list.
// Filmed on the demo workspace (academy/demo-app), selectors are the screen's stable ids.
export default {
  id: 'A-3.1',
  title: 'Kyntlo Academy 3.1 — The contact list',
  description:
    'Find anyone in seconds: search, advanced filters, sorting and columns in your Kyntlo contact list, and how to save the views you use every day as smart lists.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM tutorial', 'Contacts', 'Smart lists'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 3 · Lesson 1', title: 'Master your *contact list*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 3 · Lesson 1', title: 'The *contact list*', sub: 'Search, filter, sort and save the views you use every day.' },
      say: "Hi there! In this lesson, we're opening up Contacts, the heart of your Kyntlo account. You'll learn to search, filter, sort and arrange your contact list, and to save the views you use every day as smart lists.",
    },
    {
      chapter: 'Your contacts',
      goto: '{demo}#/contacts',
      settle: 1,
      say: "Every lead and customer who reaches you, from a form, a phone call, a chat or an ad, lands here as a contact. Think of it as one shared address book for your whole team, with each person's full history attached.",
      actions: [
        { at: 0.6, title: 'Contacts', sub: 'Every lead and customer in one place', for: 4 },
        { at: 6.0, highlight: '#ct_row_c1', label: 'One row per person', for: 4 },
        { at: 6.2, move: [1100, 600] },
      ],
    },
    {
      chapter: 'Reading the list',
      say: "Each row shows a person's phone number, email, tags, where they came from, and when they were last active. The number at the top tells you how many contacts you have in total.",
      actions: [
        { at: 0.5, hover: '#ct_table thead' },
        { at: 0.7, highlight: '#ct_table thead', label: 'Key details at a glance', for: 4.5 },
        { at: 7.4, hover: '#ct_total' },
        { at: 7.6, zoom: '#ct_total', scale: 2.0, for: 3 },
      ],
    },
    {
      chapter: 'Search',
      say: "The quickest way to find someone is the search bar. Type part of a name, an email address or a phone number, and the list narrows down as you type.",
      actions: [
        { at: 0.8, type: 'olivia', into: '#ct_search' },
        { at: 3.2, zoom: '#ct_search', scale: 1.6, for: 2.5 },
        { at: 6.0, highlight: '#ct_row_c1', label: 'Found her', for: 3 },
      ],
    },
    {
      chapter: 'Advanced filters',
      say: "To narrow the list by what you know about people, use Advanced Filters. Click Add filter, choose a field, like Tag, and pick a value. Let's find everyone interested in Invisalign.",
      actions: [
        { at: 0.2, click: '#ct_search' },
        { at: 0.5, press: 'Control+A' },
        { at: 0.7, press: 'Backspace' },
        { at: 2.0, click: '#ct_filter' },
        { at: 5.0, click: '#flt_add' },
        { at: 6.4, click: '#flt_field_tag' },
        { at: 9.0, click: '#flt_tag_invisalign' },
        { at: 9.4, highlight: '#flt_rows', label: 'Tag is invisalign', for: 2.6 },
      ],
    },
    {
      chapter: 'Advanced filters',
      say: "Click Apply. Now the list shows only matching contacts, and the filter appears as a chip, so you always know what you're looking at. Click the cross on a chip to remove it. You can stack several filters. A contact has to match all of them to show up.",
      actions: [
        { at: 0.3, click: '#flt_apply' },
        { at: 3.2, hover: '#ct_pill_0' },
        { at: 3.4, zoom: '#ct_pill_0', scale: 1.9, for: 3.5 },
        { at: 8.0, highlight: '#ct_table', label: 'Only Invisalign contacts', for: 3.5 },
      ],
    },
    {
      chapter: 'Sorting',
      say: "Next to it is Sort. By default, your newest contacts are at the top. You can switch to oldest first, or sort alphabetically by name. Alphabetical order is handy when you're working through a call list.",
      actions: [
        { at: 0.6, click: '#ct_sort' },
        { at: 2.4, highlight: '.menu', label: 'Choose an order', for: 3 },
        { at: 6.2, click: '#ct_sort_name-a-z' },
      ],
    },
    {
      chapter: 'Columns',
      say: "Want to see different information? Click Columns. Tick the fields you care about, like the team member each contact is assigned to, or a custom field such as treatment interest. And untick the ones you don't need.",
      actions: [
        { at: 0.5, click: '#ct_columns' },
        { at: 4.2, click: '#col_owner' },
        { at: 6.4, click: '#col_treatment' },
        { at: 9.0, click: '#col_last' },
        { at: 9.4, highlight: '.drawer .modal-b', label: 'Pick your columns', for: 2.4 },
      ],
    },
    {
      chapter: 'Columns',
      say: "Click Apply, and the list now shows exactly what your team needs at a glance.",
      actions: [
        { at: 0.3, click: '#col_apply' },
        { at: 1.8, hover: 'th[data-col="owner"]' },
        { at: 2.0, highlight: 'th[data-col="owner"]', label: 'New columns', for: 2.6 },
        { at: 2.2, zoom: '#ct_table thead', scale: 1.4, for: 2.6 },
      ],
    },
    {
      chapter: 'Smart lists',
      say: "Here's the best part. Once your filters, sort and columns look right, click Save as smart list, and give it a name. We'll call it Invisalign call list.",
      actions: [
        { at: 1.6, click: '#ct_savelist' },
        { at: 4.0, highlight: '.modal', label: 'Name your view', for: 2.4 },
        { at: 6.0, type: 'Invisalign call list', into: '#sl_name' },
        { at: 8.6, click: '#sl_save' },
      ],
    },
    {
      chapter: 'Smart lists',
      say: "Your new smart list appears as a tab next to the others. It isn't a frozen copy. It updates itself, so new Invisalign leads appear in it the moment they're tagged.",
      actions: [
        { at: 0.4, hover: '#ct_list_invisalign-call-list' },
        { at: 0.6, highlight: '#ct_lists', label: 'Your saved views', for: 4 },
        { at: 0.8, zoom: '#ct_lists', scale: 1.6, for: 4 },
        { at: 6.0, move: [1100, 640] },
      ],
    },
    {
      chapter: 'Smart lists',
      say: "Click All to go back to everyone. You can also share a smart list with teammates, so everybody works from the same view.",
      actions: [
        { at: 0.6, click: '#ct_list_all' },
        { at: 2.4, highlight: '#ct_list_all', label: 'Back to everyone', for: 2.6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'One *smart list* for every daily job', sub: 'New leads this week. Patients due a check-up. Unpaid invoices.' },
      say: "Here's a pro tip. Create one smart list for every job your team does each day. For example, new leads from this week, or patients who are due a check-up. Then your morning routine is simple: open the list, work through it, done.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 3.2', title: 'Adding & *importing* contacts', sub: 'Add people by hand, import a spreadsheet and avoid duplicates.', cta: 'Kyntlo [Academy]' },
      say: "That's your contact list! In the next lesson, you'll add contacts by hand, import a whole spreadsheet, and learn how Kyntlo keeps duplicates out. See you there.",
    },
  ],
};
