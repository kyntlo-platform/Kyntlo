// Track A · Module 3 · Lesson 6 — Companies & restoring / merging duplicates.
export default {
  id: 'A-3.6',
  title: 'Kyntlo Academy 3.6 — Companies & restoring / merging duplicates',
  description:
    'Keep your Kyntlo database clean: group contacts under companies, merge duplicate contacts without losing history, and restore contacts deleted by mistake.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM tutorial', 'Merge duplicates', 'Companies'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 3 · Lesson 6', title: 'Keep your CRM *clean*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 3 · Lesson 6', title: 'Companies & *duplicates*', sub: 'Keep your database clean and trustworthy.' },
      say: "In the final lesson of the Contacts module, you'll learn to keep your database clean. We'll group people under companies, merge duplicate contacts, and bring back anyone who was deleted by mistake.",
    },
    {
      chapter: 'Companies',
      goto: '{demo}#/contacts/companies',
      settle: 1,
      say: "Let's start with Companies. If you work with businesses, a company record groups everyone who works there. Bloom, for example, runs staff dental plans for local employers.",
      actions: [
        { at: 0.6, title: 'Companies', sub: 'Group contacts by organisation', for: 4 },
        { at: 5.0, highlight: '#co_table', label: 'Your companies', for: 4 },
      ],
    },
    {
      chapter: 'Add a company',
      say: "To add one, click Add Company. Fill in the name, phone number and website, then save.",
      speed: 1.3,
      actions: [
        { at: 0.6, click: '#co_add' },
        { at: 2.4, type: 'Regent Park Accountants', into: '#co_name', delay: 35 },
        { at: 4.6, type: '+44 20 7946 0450', into: '#co_phone', delay: 35 },
        { at: 6.4, type: 'regentparkaccountants.co.uk', into: '#co_web', delay: 30 },
        { at: 8.4, click: '#co_save' },
      ],
    },
    {
      chapter: 'Inside a company',
      say: "Open a company to see its details, the people linked to it, and its opportunities, all in one place.",
      actions: [
        { at: 0.6, click: '#co_row_co1' },
        { at: 2.4, highlight: '#co_people', label: 'People & deals', for: 3.4 },
      ],
    },
    {
      chapter: 'Inside a company',
      say: "To link someone, click Add contact and pick them from the list. Now, when Noah calls, your team can see straight away that he's on the Marylebone Law staff plan.",
      actions: [
        { at: 0.6, click: '#co_addcontact' },
        { at: 2.2, click: '#co_pick_c6' },
        { at: 3.0, highlight: '#co_person_c6', label: 'Linked', for: 3.4 },
      ],
    },
    {
      chapter: 'Spotting duplicates',
      say: "Now, duplicates. They happen to everyone. Olivia filled in a Facebook form, then later chatted on our website as Liv, with a different email. Kyntlo had no way to know it was the same person.",
      actions: [
        { at: 0.4, click: '#tab_smart-lists' },
        { at: 2.0, type: 'bennett', into: '#ct_search' },
        { at: 4.4, highlight: '#ct_table', label: 'Same person, twice', for: 4.4 },
      ],
    },
    {
      chapter: 'Merging contacts',
      say: "Tick both contacts. When exactly two are selected, a Merge button appears in the bulk action bar.",
      actions: [
        { at: 0.6, click: '#ct_sel_c1' },
        { at: 1.6, click: '#ct_sel_c19' },
        { at: 3.4, hover: '#ct_bulk_merge' },
        { at: 3.6, highlight: '#ct_bulk_merge', label: 'Merge', for: 2.4 },
      ],
    },
    {
      chapter: 'Merging contacts',
      say: "Click Merge. First, choose which contact to keep as the primary. Then, for each field, pick the value to keep. We'll keep Olivia's full first name, her original email and her phone number.",
      actions: [
        { at: 0.4, click: '#ct_bulk_merge' },
        { at: 2.4, hover: '#mg_master_a' },
        { at: 2.6, highlight: '.ct-merge tbody tr:first-child', label: 'Primary contact', for: 3 },
        { at: 6.4, zoom: '.ct-merge', scale: 1.3, for: 4.4 },
      ],
    },
    {
      chapter: 'Merging contacts',
      say: "Tags are combined, and the conversations, notes, tasks and appointments from both records come together. Merging can't be undone, so take a moment to check. Then click Merge contacts.",
      actions: [
        { at: 0.4, hover: '.ct-merge tbody tr:last-child' },
        { at: 0.6, highlight: '.ct-merge tbody tr:last-child', label: 'Tags combined', for: 3 },
        { at: 7.6, click: '#mg_merge' },
      ],
    },
    {
      chapter: 'Merging contacts',
      say: "And now there's just one Olivia, with her complete history in one place.",
      actions: [
        { at: 0.4, highlight: '#ct_row_c1', label: 'One clean record', for: 3 },
      ],
    },
    {
      chapter: 'Restoring contacts',
      say: "Finally, Restore. If someone deletes a contact by mistake, open the Restore tab, find the contact, and click Restore.",
      actions: [
        { at: 0.6, click: '#tab_restore' },
        { at: 2.4, highlight: '#rs_table', label: 'Recently deleted', for: 3 },
        { at: 6.2, click: '#rs_restore_2' },
      ],
    },
    {
      chapter: 'Restoring contacts',
      say: "Charlotte is back on your contact list, with her history. So before you re-create someone by hand, always check Restore first.",
      actions: [
        { at: 0.4, click: '#tab_smart-lists' },
        { at: 1.6, click: '#ct_search' },
        { at: 1.8, press: 'Control+A' },
        { at: 2.0, type: 'charlotte' },
        { at: 3.6, highlight: '#ct_table', label: 'Restored', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'A *monthly* clean-up', sub: 'Merge duplicates, link companies, ten minutes a month.' },
      say: "Here's a pro tip. Once a month, search your list for common surnames and check for duplicates. Merge them, and link business contacts to their companies. Ten minutes a month keeps your reports and automations accurate.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 4', title: 'Your *unified inbox*', sub: 'Every conversation, every channel, one place.', cta: 'Kyntlo [Academy]' },
      say: "That's the end of the Contacts module. Well done! Next, in module four, we'll open Conversations, the unified inbox where every email, text and chat comes together. See you there.",
    },
  ],
};
