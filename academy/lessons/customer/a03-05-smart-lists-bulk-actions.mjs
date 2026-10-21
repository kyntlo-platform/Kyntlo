// Track A · Module 3 · Lesson 5 — Smart lists & bulk actions.
export default {
  id: 'A-3.5',
  title: 'Kyntlo Academy 3.5 — Smart lists & bulk actions',
  description:
    'Segment your contacts with smart lists and filters, then tag, text, email, enrol and export whole groups at once with bulk actions.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'CRM tutorial', 'Smart lists', 'Bulk SMS', 'Export contacts'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 3 · Lesson 5', title: 'Smart lists & *bulk actions*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 3 · Lesson 5', title: 'Smart lists & *bulk actions*', sub: 'Act on a whole group of contacts in a few clicks.' },
      say: "In this lesson, you'll learn to work with many contacts at once. You'll pick out a group with a smart list or a filter, then tag, message, enrol and export everyone in it in just a few clicks.",
    },
    {
      chapter: 'Why bulk actions',
      goto: '{demo}#/contacts',
      settle: 1,
      say: "Bulk actions save you hours. Instead of opening contacts one by one, you select a group and act on all of them together. Tag a group, message them, add them to an automation, or export them. It all starts with getting the right people on screen.",
      actions: [
        { at: 0.6, title: 'Bulk actions', sub: 'Many contacts, one click', for: 4 },
        { at: 6.0, move: [1000, 600] },
      ],
    },
    {
      chapter: 'Smart lists',
      say: "Smart lists are perfect for this. Here's our Reactivation list: patients we haven't seen in a while. It updates itself whenever someone gets the reactivation tag.",
      actions: [
        { at: 0.8, click: '#ct_list_reactivation' },
        { at: 3.4, highlight: '#ct_table', label: 'Always up to date', for: 3.6 },
      ],
    },
    {
      chapter: 'Build a segment',
      say: "You can also build a group on the fly. Let's filter for everyone interested in teeth whitening, because we're about to run a whitening offer.",
      actions: [
        { at: 0.6, click: '#ct_list_all' },
        { at: 2.0, click: '#ct_filter' },
        { at: 3.6, click: '#flt_add' },
        { at: 4.6, click: '#flt_field_tag' },
        { at: 6.4, click: '#flt_tag_whitening' },
        { at: 8.0, click: '#flt_apply' },
      ],
    },
    {
      chapter: 'Select contacts',
      say: "Tick the box in the header to select everyone in the list, or tick individual rows. A bulk action bar appears, showing how many people you've selected.",
      actions: [
        { at: 1.0, click: '#ct_all' },
        { at: 3.4, hover: '#ct_bulk' },
        { at: 3.6, highlight: '#ct_bulk', label: 'Bulk actions', for: 4 },
        { at: 3.8, zoom: '#ct_bulk', scale: 1.3, for: 4 },
      ],
    },
    {
      chapter: 'Bulk tag',
      say: "First, let's tag them, so we can track who got this offer. Click Add tag and choose the tag. It's added to every selected contact at once. Later, you can filter by this tag to see exactly who received the offer, and who booked.",
      actions: [
        { at: 1.6, click: '#ct_bulk_tag' },
        { at: 3.6, click: '#ct_tagopt_whitening-offer-oct' },
        { at: 4.4, highlight: '#ct_table', label: 'Tagged in one go', for: 3.4 },
      ],
    },
    {
      chapter: 'Bulk SMS',
      say: "Now let's send them a text. Select them again, click Send SMS, and write your message. Placeholders like first name make every text personal, even when it goes to hundreds of people.",
      speed: 1.3,
      actions: [
        { at: 0.6, click: '#ct_all' },
        { at: 2.4, click: '#ct_bulk_sms' },
        { at: 4.6, type: 'Hi {{contact.first_name}}! Teeth whitening is £199 at Bloom this month. Reply YES to book.', into: '#bm_body', delay: 30 },
      ],
    },
    {
      chapter: 'Bulk SMS',
      say: "Choose drip mode to send in small batches, so replies come in at a pace your team can handle. And don't worry about opt-outs: Kyntlo skips anyone with Do Not Disturb switched on. Then click Send.",
      actions: [
        { at: 0.6, click: '#bm_drip' },
        { at: 1.0, highlight: '#bm_drip', label: 'Send in batches', for: 3.4 },
        { at: 6.0, hover: '#bm_dnd' },
        { at: 6.2, highlight: '#bm_dnd', label: 'Opt-outs are respected', for: 3.6 },
        { at: 11.4, click: '#bm_send' },
      ],
    },
    {
      chapter: 'Bulk SMS',
      say: "A quick note: text messaging is included from the Growth plan. On Starter, you can still send bulk emails the same way, using the Send email button right next to it.",
      actions: [
        { at: 0.6, title: 'SMS', sub: 'Included from the Growth plan', for: 4 },
      ],
    },
    {
      chapter: 'Workflows & export',
      say: "Add to workflow enrols everyone in an automation, which we'll build in module nine. And Export downloads the selected contacts as a CSV file, with the columns you're viewing. It's handy for backups, or for sharing a list with your accountant.",
      caption: "Add to workflow enrols everyone in an automation, which we'll build in module 9. And Export downloads the selected contacts as a .csv file, with the columns you're viewing. It's handy for backups, or for sharing a list with your accountant.",
      actions: [
        { at: 0.4, click: '#ct_all' },
        { at: 1.4, click: '#ct_bulk_wf' },
        { at: 2.4, highlight: '.menu', label: 'Your workflows', for: 3 },
        { at: 6.0, click: '#ct_selcount' },
        { at: 6.6, click: '#ct_bulk_export' },
        { at: 9.4, highlight: '.modal', label: 'Export to CSV', for: 3 },
        { at: 13.0, click: '#ex_go' },
      ],
    },
    {
      chapter: 'Bulk Actions log',
      say: "Every bulk action is logged under Bulk Actions, with who started it, how many contacts it touched, and its progress. If something doesn't look right, this is the first place to check. Long-running sends, like drip messages, show their progress here as they go.",
      actions: [
        { at: 0.6, click: '#tab_bulk-actions' },
        { at: 2.4, hover: '#bulk_actions_0' },
        { at: 2.6, highlight: '#bulk_actions_0', label: 'Just now', for: 3.2 },
        { at: 6.4, zoom: '.card', scale: 1.3, for: 3.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Send it to *yourself* first', sub: 'Check wording, links and personalisation before the big send.' },
      say: "Here's a pro tip. Before you send a bulk message to hundreds of people, add yourself as a contact with the same tag, and send it to just you first. Check the wording, the links and the personalisation. Then send it to everyone.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 3.6', title: 'Companies & *duplicates*', sub: 'Group contacts by company, merge duplicates, restore deletions.', cta: 'Kyntlo [Academy]' },
      say: "Great work! In the last lesson of this module, we'll keep your database clean: grouping contacts by company, merging duplicates, and restoring anyone deleted by mistake.",
    },
  ],
};
