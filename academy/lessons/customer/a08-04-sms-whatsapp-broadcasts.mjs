// Track A · Module 8 · Lesson 4 — SMS & WhatsApp broadcasts.
// Filmed on the demo workspace: Marketing → Templates (SMS + WhatsApp) and Contacts → bulk "Send SMS".
export default {
  id: 'A-8.4',
  title: 'Kyntlo Academy 8.4 — SMS & WhatsApp broadcasts',
  description:
    'Send text message and WhatsApp broadcasts the right way: consent and opt-outs, reusable SMS templates with a segment counter, Meta-approved WhatsApp templates, and bulk sending from Contacts in drip mode.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'SMS marketing', 'WhatsApp marketing', 'Text message compliance'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 8 · Lesson 4', title: 'SMS & *WhatsApp* broadcasts' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 8 · Lesson 4', title: 'SMS & *WhatsApp* broadcasts', sub: 'Text your customers, the compliant way.' },
      say: "Text messages get read within minutes, which makes them powerful. In this lesson, you'll create SMS templates, see how WhatsApp templates work, and send a broadcast, all while staying compliant. SMS is included on the Growth and Pro plans, and WhatsApp is an add-on.",
    },
    {
      chapter: 'Consent comes first',
      card: { type: 'chapter', kicker: 'The rules', title: 'Consent, identity, *opt-out*', sub: 'Only text people who agreed · say who you are · always offer a way out.' },
      say: "Before we click anything, three rules. Only text people who agreed to hear from you. Always say who you are. And always tell them how to opt out. If you text numbers in the United States, your number also needs A two P registration first. We cover that in lesson fourteen point one.",
      caption: 'Before we click anything, three rules. Only text people who agreed to hear from you. Always say who you are. And always tell them how to opt out. If you text numbers in the United States, your number also needs A2P registration first. We cover that in lesson 14.1.',
    },
    {
      chapter: 'SMS templates',
      goto: '{demo}#/marketing/templates',
      settle: 1,
      say: "Reusable messages live in Marketing, Templates. Filter by SMS to see your text templates. You can use them in Conversations, in bulk sends, and in workflows, so you write a great message once and reuse it everywhere.",
      actions: [
        { at: 0.4, title: 'Marketing → Templates', sub: 'SMS, email & WhatsApp', for: 3.6 },
        { at: 4.4, click: '#tp_f_sms' },
        { at: 6.4, highlight: '#tp_table', label: 'Your text templates', for: 4 },
      ],
    },
    {
      chapter: 'Create a text template',
      say: "Click Add template, then Text template. Give it a clear name. Then write your message. Start with Hi, and add the first name merge field, so every text feels personal.",
      actions: [
        { at: 0.4, click: '#tp_add' },
        { at: 1.8, click: '#tp_add_sms' },
        { at: 3.4, click: '#tp_sms_name' },
        { at: 3.7, type: 'Autumn check-up reminder' },
        { at: 6.6, click: '#tp_sms_body' },
        { at: 7.0, type: 'Hi ' },
        { at: 7.8, click: '#tp_sms_merge' },
        { at: 9.0, click: '.menu button:has-text("First name")' },
        { at: 9.8, type: ", it's Bloom Dental. Autumn check-ups are now open. Book online: bloomdental.co.uk/book", delay: 25 },
      ],
    },
    {
      chapter: 'Characters & segments',
      say: "Watch the counter under the message. Texts are sent in segments of up to one hundred and sixty characters, and each segment is billed. Add an emoji, and a segment drops to seventy characters. So keep messages short, and check the counter before you save.",
      caption: 'Watch the counter under the message. Texts are sent in segments of up to 160 characters, and each segment is billed. Add an emoji, and a segment drops to 70 characters. So keep messages short, and check the counter before you save.',
      actions: [
        { at: 0.4, zoom: '#tp_sms_counter', scale: 2, for: 6 },
        { at: 0.6, highlight: '#tp_sms_counter', label: 'Characters & segments', for: 5.6 },
        { at: 8.4, highlight: '#tp_sms_preview', label: 'Phone preview', for: 4 },
      ],
    },
    {
      chapter: 'Add opt-out text',
      say: "Now the opt-out. Add Reply STOP to opt out at the end. When someone replies STOP, Kyntlo turns on Do Not Disturb for text messages on their contact automatically, so they never get another one. Then click Save.",
      actions: [
        { at: 0.4, click: '#tp_sms_body' },
        { at: 0.7, press: 'End' },
        { at: 1.0, type: ' Reply STOP to opt out.', delay: 40 },
        { at: 3.4, zoom: '#tp_sms_counter', scale: 1.8, for: 3.2 },
        { at: 6.8, highlight: '#tp_sms_compliance', label: 'STOP = automatic DND', for: 4.4 },
        { at: 12.0, click: '#tp_sms_save' },
      ],
    },
    {
      chapter: 'WhatsApp templates',
      say: "WhatsApp works a little differently. You can reply freely for twenty four hours after a customer messages you. To start a conversation, or to message after that window, you must use a template that Meta has approved.",
      caption: 'WhatsApp works a little differently. You can reply freely for 24 hours after a customer messages you. To start a conversation, or to message after that window, you must use a template that Meta has approved.',
      actions: [
        { at: 0.4, click: '#tp_f_whatsapp' },
        { at: 2.4, highlight: '#tp_wa_note', label: 'The 24-hour window', for: 5 },
        { at: 8.6, highlight: '#tp_table', label: 'Your WhatsApp templates', for: 4 },
      ],
    },
    {
      chapter: 'Template approval',
      say: "Each template shows its status. Approved templates are ready to send. Pending ones are still with Meta for review. Rejected ones need changes, often because they look like spam, with too many capitals or exclamation marks. Click a template to preview it.",
      actions: [
        { at: 0.4, zoom: '#tp_table', scale: 1.4, for: 9 },
        { at: 1.0, highlight: '#tp_row_w2', label: 'Approved', for: 2.4 },
        { at: 3.6, highlight: '#tp_row_w3', label: 'Pending review', for: 2.4 },
        { at: 6.2, highlight: '#tp_row_w4', label: 'Rejected', for: 3 },
        { at: 11.6, click: '#tp_row_w2' },
      ],
    },
    {
      chapter: 'Send a broadcast',
      goto: '{demo}#/contacts',
      settle: 1,
      say: "Now let's send a broadcast. Go to Contacts, and pick your audience. A smart list is ideal. Here, we'll open Invisalign leads, select everyone with the checkbox at the top, then click Send SMS.",
      actions: [
        { at: 0.4, title: 'Contacts', sub: 'Bulk actions', for: 3 },
        { at: 3.6, click: '#ct_list_invisalign-leads' },
        { at: 6.4, click: '#ct_all' },
        { at: 8.6, highlight: '#ct_bulk_sms', label: 'Send SMS', for: 2.4 },
        { at: 11.2, click: '#ct_bulk_sms' },
      ],
    },
    {
      chapter: 'Drip mode',
      say: "Write or paste your message, with the opt-out at the end. Then choose drip mode. Instead of texting everyone at once, Kyntlo sends small batches over time, so your team can keep up with the replies. Contacts with Do Not Disturb on are skipped automatically.",
      actions: [
        { at: 0.4, click: '#bm_body' },
        { at: 0.8, type: "Hi {{contact.first_name}}, it's Bloom Dental. Free Invisalign scans this month: bloomdental.co.uk/scan Reply STOP to opt out.", delay: 18 },
        { at: 6.4, click: '#bm_drip' },
        { at: 7.4, zoom: '.modal', scale: 1.4, for: 5 },
        { at: 12.6, highlight: '#bm_dnd', label: 'DND skipped', for: 3 },
        { at: 15.8, click: '#bm_send' },
      ],
    },
    {
      chapter: 'Track progress',
      say: "You can follow every bulk send in the Bulk Actions tab, including how far a drip has got. And for messages that should go out automatically, like reminders, you'll use workflows, which we'll build in Module nine.",
      caption: "You can follow every bulk send in the Bulk Actions tab, including how far a drip has got. And for messages that should go out automatically, like reminders, you'll use workflows, which we'll build in Module 9.",
      actions: [
        { at: 0.4, click: '#tab_bulk-actions' },
        { at: 2.4, highlight: '#view table', label: 'Bulk send history', for: 4.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Text at *sociable hours*', sub: 'Between 9 am and 8 pm, in your customer’s time zone.' },
      say: "Here's a pro tip. Only send broadcasts at sociable hours, roughly nine in the morning to eight in the evening. A text at night feels intrusive, and it's the fastest way to collect STOP replies.",
      caption: "Here's a pro tip. Only send broadcasts at sociable hours, roughly 9 am to 8 pm. A text at night feels intrusive, and it's the fastest way to collect STOP replies.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 8.5', title: 'The *Social Planner*', sub: 'Plan and schedule posts across all your social accounts.', cta: 'Kyntlo [Academy]' },
      say: "That's text marketing, done the right way. Next up is the Social Planner, where you'll schedule posts to Facebook, Instagram, Google and more, from one calendar. See you there.",
    },
  ],
};
