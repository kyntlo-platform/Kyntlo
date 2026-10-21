// Track A · Module 14 · Lesson 5 — Data, privacy & DND.
// Filmed on the demo workspace (academy/demo-app): contact record DND, custom fields,
// contact export, restore and audit logs.
export default {
  id: 'A-14.5',
  title: 'Kyntlo Academy 14.5 — Data, privacy & DND',
  description:
    'Respect consent in Kyntlo: use Do Not Disturb per channel, understand automatic opt-outs (STOP replies and unsubscribes), record marketing consent with a custom field, export a contact\'s data, restore deleted contacts and check the audit log.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'GDPR', 'Do Not Disturb', 'Consent', 'Data privacy'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 14 · Lesson 5', title: 'Data, privacy & *DND*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 14 · Lesson 5', title: 'Data, privacy & *DND*', sub: 'Consent, unsubscribes and exports.' },
      say: "In this lesson, we'll look after your customers' data and their choices: who you're allowed to contact, how opt-outs work, and what to do when someone asks for a copy of their data.",
    },
    {
      chapter: 'Why consent matters',
      goto: '{demo}#/contacts',
      settle: 1,
      say: "Privacy laws like G D P R in the UK and Europe, and the T C P A in the US, say you need permission before you send marketing messages. Carriers and inbox providers watch for complaints too. Kyntlo gives you the tools to stay on the right side of both. Rules differ by country, so check what applies to you.",
      caption: "Privacy laws like GDPR in the UK and Europe, and the TCPA in the US, say you need permission before you send marketing messages. Carriers and inbox providers watch for complaints too. Kyntlo gives you the tools to stay on the right side of both. Rules differ by country, so check what applies to you.",
      actions: [
        { at: 0.6, title: 'Consent first', sub: 'Permission before marketing', for: 4 },
        { at: 6.0, highlight: '#ct_table', label: 'Every contact, every choice', for: 4 },
      ],
    },
    {
      chapter: 'Do Not Disturb',
      goto: '{demo}#/contacts/detail/c1',
      settle: 1,
      say: "Open a contact, and scroll to Do Not Disturb. D N D stops Kyntlo sending on a channel: emails, text messages, calls, WhatsApp and more. Olivia has asked for no more texts, so switch on Text messages. Her emails and calls carry on as normal.",
      caption: "Open a contact, and scroll to Do Not Disturb. DND stops Kyntlo sending on a channel: emails, text messages, calls, WhatsApp and more. Olivia has asked for no more texts, so switch on Text messages. Her emails and calls carry on as normal.",
      actions: [
        { at: 0.4, highlight: '#cd_sec_dnd', label: 'Do not disturb', for: 3 },
        { at: 3.6, zoom: '#cd_dnd', scale: 1.5, for: 10 },
        { at: 10.4, click: '#cd_dnd_text-messages' },
      ],
    },
    {
      chapter: 'Do Not Disturb',
      say: "D N D all channels blocks every outgoing message in one switch. And Inbound calls and S M S blocks their replies too, which is useful for spam. D N D also overrides your workflows and campaigns, so a contact who opted out is skipped automatically.",
      caption: "DND all channels blocks every outgoing message in one switch. And Inbound calls & SMS blocks their replies too, which is useful for spam. DND also overrides your workflows and campaigns, so a contact who opted out is skipped automatically.",
      actions: [
        { at: 0.4, highlight: '#cd_dnd_all', label: 'Everything off', for: 3.4 },
        { at: 4.6, highlight: '#cd_dnd_inbound', label: 'Block replies too', for: 3.6 },
      ],
    },
    {
      chapter: 'Automatic opt-outs',
      say: "Most of the time, you won't need to switch this yourself. When someone replies STOP to a text, Kyntlo turns on text D N D for them. When they click unsubscribe in an email, email D N D turns on. Never switch these back on unless the customer clearly asks you to.",
      caption: "Most of the time, you won't need to switch this yourself. When someone replies STOP to a text, Kyntlo turns on text DND for them. When they click unsubscribe in an email, email DND turns on. Never switch these back on unless the customer clearly asks you to.",
      actions: [
        { at: 0.6, title: 'Reply STOP', sub: 'Text DND turns on automatically', for: 4.4 },
        { at: 6.4, title: 'Unsubscribe link', sub: 'Email DND turns on automatically', for: 4 },
      ],
    },
    {
      chapter: 'Record consent',
      goto: '{demo}#/settings/custom-fields',
      settle: 1,
      say: "It also helps to record when someone gave you permission. In Settings, Custom Fields, click Add Field, and choose Checkbox.",
      actions: [
        { at: 0.4, highlight: '#ss_menu_custom-fields', label: 'Custom Fields', for: 2.4 },
        { at: 3.4, click: '#cf_add' },
        { at: 5.4, click: '#cf_type_checkbox' },
      ],
    },
    {
      chapter: 'Record consent',
      say: "Name it Marketing consent, put it in a Consent folder, and write the exact wording people agree to. Add this field to your forms, unticked, so every new lead's choice is saved on their record.",
      actions: [
        { at: 0.4, type: 'Marketing consent', into: '#cf_name' },
        { at: 2.4, click: '#cf_folder' },
        { at: 3.6, click: '.menu button:has-text("Consent")' },
        { at: 4.8, type: 'I agree to receive offers by email and SMS', into: '#cf_option', delay: 35 },
        { at: 6.8, zoom: '.modal', scale: 1.3, for: 3.4 },
        { at: 10.4, click: '#cf_save' },
      ],
    },
    {
      chapter: 'Data requests',
      goto: '{demo}#/contacts',
      say: "Sometimes a customer asks for a copy of the data you hold about them. In Contacts, tick their name, and choose Export. You'll get a C S V file you can send them.",
      caption: "Sometimes a customer asks for a copy of the data you hold about them. In Contacts, tick their name, and choose Export. You'll get a CSV file you can send them.",
      actions: [
        { at: 0.4, click: '#ct_sel_c1' },
        { at: 2.4, highlight: '#ct_bulk', label: 'Bulk actions', for: 2.6 },
        { at: 5.4, click: '#ct_bulk_export' },
        { at: 7.0, zoom: '.modal', scale: 1.3, for: 3 },
        { at: 9.4, click: '#ex_go' },
      ],
    },
    {
      chapter: 'Deleting data',
      say: "If someone asks you to delete their data, delete the contact. Deleted contacts stay in the Restore tab for a while, in case of mistakes, so you can bring one back if it was removed by accident.",
      actions: [
        { at: 4.4, click: '#tab_restore' },
        { at: 6.0, highlight: '#view .card', label: 'Restore', for: 4 },
      ],
    },
    {
      chapter: 'Audit logs',
      goto: '{demo}#/settings/audit-logs',
      settle: 1,
      say: "Finally, Audit Logs in Settings shows who changed what, and when. Here's Sarah turning on text D N D for Olivia this morning. If a customer ever asks how their data was handled, this is your record.",
      caption: "Finally, Audit Logs in Settings shows who changed what, and when. Here's Sarah turning on text DND for Olivia this morning. If a customer ever asks how their data was handled, this is your record.",
      actions: [
        { at: 0.4, highlight: '#al_table', label: 'Who changed what', for: 3.4 },
        { at: 5.0, click: '#al_row_0' },
        { at: 6.6, zoom: '.drawer', scale: 1.3, for: 5 },
      ],
    },
    {
      chapter: 'Limit access',
      goto: '{demo}#/settings/my-staff',
      say: "And remember lesson one point five: only give the Bulk Actions permission, which includes exporting, to the people who really need it. The fewer people who can download your contact list, the safer it is.",
      caption: "And remember lesson 1.5: only give the Bulk Actions permission, which includes exporting, to the people who really need it. The fewer people who can download your contact list, the safer it is.",
      actions: [
        { at: 0.4, highlight: '#ms_table', label: 'Your team', for: 3 },
        { at: 3.6, click: '#ms_edit_1' },
        { at: 5.2, click: '#ms_sec_perm' },
        { at: 6.6, highlight: '#ms_perm_bulk', label: 'Includes exports', for: 4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Never import a list *without consent*', sub: 'Bought lists hurt your deliverability and your reputation.' },
      say: "Here's a pro tip. Never import a list of people who haven't agreed to hear from you, even if you bought it. Complaints from one bad list can get your number blocked and your emails sent to spam for everyone.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 15', title: 'Build a complete *lead-to-booking* system', sub: 'Lesson 15.1: the capstone project.', cta: 'Kyntlo [Academy]' },
      say: "That's Module 14 done, and your account is fully set up! In Module 15, we'll put everything together and build a complete lead-to-booking system, start to finish. See you there.",
    },
  ],
};
