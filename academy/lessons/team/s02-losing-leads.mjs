// Kyntlo Team Academy · Batch 1 · s02 "I'm losing leads" (internal: sales & support team).
// Approved script (doc "Kyntlo Team Academy: Batch 1 Scripts", section c04). Design: Night Shift.
// Filmed on the demo workspace (fictional Bloom Dental Studio) plus designed scenes in scenes/s02.html.
import { team } from './kit/lesson.mjs';

const { page, chips, clearChips } = team('s02');

export default {
  ...team('s02').base,
  id: 'S-02',
  title: "Kyntlo Team Academy s02 - I'm losing leads",
  transitions: ['slideleft', 'smoothleft'],
  music: { preset: 'leads' },
  scenes: [
    { page: page('intro'), duration: 3.4, watermark: false },
    {
      page: page('hook'),
      voice: { voice: 'bf_emma', speed: 1.0 },
      say: 'Three people asked about my service this weekend. I saw one of them on Monday.',
    },
    { page: page('race'), tail: 1.4, say: 'Leads do not wait. The first business to reply usually wins the customer.' },
    {
      chapter: 'One inbox',
      goto: '{demo}#/conversations/conversations/v1',
      settle: 1,
      duration: 17.6,
      say: 'In Kyntlo, every message lands in one inbox: texts, Facebook, Instagram, website chat and email.',
      actions: [
        { at: 0.3, highlight: '#cv_items', label: 'Every channel, one list', for: 5.6 },
        { at: 0.6, run: chips('#cv_items', [['Text', '#12b76a'], ['Facebook', '#1877f2'], ['Instagram', '#e1306c'], ['Website chat', '#7f56d9'], ['Email', '#f79009']], { dx: 360, dy: 40 }) },
        { at: 6.2, run: clearChips },
        { at: 6.4, hover: '#cv_msg_1' },
        { at: 6.5, highlight: '#cv_msg_1', label: 'Facebook', for: 2 },
        { at: 8.7, highlight: '#cv_msg_4', label: 'Email', for: 2 },
        { at: 10.7, click: '#cv_item_v4' },
        { at: 11.6, highlight: '#cv_msg_1', label: 'Instagram', for: 1.8 },
        { at: 13.4, click: '#cv_item_v5' },
        { at: 14.1, highlight: '#cv_msg_1', label: 'Website chat', for: 1.4 },
        { at: 15.6, highlight: '#cv_channels', label: 'Reply on any channel, from here', for: 1.9 },
      ],
    },
    {
      page: page('widget'),
      cursor: true,
      duration: 13,
      say: 'Add the chat widget to your website and visitors can ask a question in seconds, any time of day.',
      actions: [
        { at: 0.9, click: '#cw_launch' },
        { at: 2.0, type: 'Do you see new patients on Saturdays?', into: '#cw_input', delay: 42 },
        { at: 4.4, click: '#cw_send' },
        { at: 7.4, highlight: '#cw_panel', label: 'Answered at 22:13, automatically', for: 4.8 },
      ],
    },
    {
      chapter: 'Straight into Kyntlo',
      goto: '{demo}#/conversations/conversations/v22',
      settle: 1,
      duration: 6.4,
      actions: [
        { at: 0.3, highlight: '#cv_msg_1', label: 'Asked at 22:13', for: 1.8 },
        { at: 2.2, highlight: '#cv_msg_2', label: 'Kyntlo answered', for: 1.8 },
        { at: 4.2, highlight: '#cv_msg_4', label: 'Mobile number captured', for: 2 },
      ],
    },
    {
      page: page('form'),
      cursor: true,
      duration: 9,
      say: 'Forms and landing pages drop new leads straight into your pipeline, tagged by source.',
      actions: [
        { at: 0.4, type: 'Leo Fraser', into: '#bf_name', delay: 45 },
        { at: 1.6, type: '07700 900041', into: '#bf_phone', delay: 40 },
        { at: 2.9, click: '#bf_t_checkup' },
        { at: 3.9, click: '#bf_submit' },
        { at: 5.2, focus: '#bf_sent' },
      ],
    },
    {
      chapter: 'Every form, one CRM',
      goto: '{demo}#/sites/forms',
      settle: 1,
      duration: 4.6,
      actions: [
        { at: 0.3, highlight: '#fm_row_fm1', label: '412 enquiries, all in Kyntlo', for: 3.8 },
      ],
    },
    {
      chapter: 'A new contact',
      goto: '{demo}#/contacts',
      settle: 1,
      duration: 4.2,
      actions: [
        { at: 0.2, highlight: '#ct_row_c41', label: 'Leo Fraser · Website Form', for: 3.6 },
      ],
    },
    {
      chapter: 'Source on every contact',
      goto: '{demo}#/contacts/detail/c41',
      settle: 1,
      duration: 5.6,
      actions: [
        { at: 0.3, highlight: '#cd_sec_contact', label: 'Contact source: Website Form', for: 2.6 },
        { at: 3.1, highlight: '#cd_tags', label: 'Tagged as it arrives', for: 2.2 },
      ],
    },
    {
      chapter: 'A new opportunity',
      goto: '{demo}#/opportunities',
      settle: 1,
      duration: 5.4,
      actions: [
        { at: 0.2, highlight: '#op_card_o41', label: 'New Enquiry · tagged by source', for: 4.6 },
        { at: 0.4, zoom: '#op_card_o41', scale: 1.6, for: 3.6 },
      ],
    },
    {
      page: page('missed'),
      duration: 11.5,
      say: "Missed a call? Missed-call text-back sends an instant message: 'Sorry we missed you, how can we help?' The lead stays warm.",
    },
    {
      chapter: 'Missed-call text-back',
      goto: '{demo}#/automation/workflows/w5',
      settle: 1,
      duration: 6.2,
      actions: [
        { at: 0.3, highlight: '#wf_trigger_0', label: 'Call not answered', for: 2.6 },
        { at: 3.1, highlight: '#wf_node_s1', label: 'Text goes out instantly', for: 2.8 },
      ],
    },
    {
      chapter: 'Nothing gets lost',
      goto: '{demo}#/conversations/conversations/v9',
      settle: 1,
      duration: 13,
      say: "No lead sits unanswered, and nothing lives in someone's personal phone.",
      actions: [
        { at: 0.3, highlight: '#cv_msg_1', label: 'Missed call', for: 1.8 },
        { at: 2.2, highlight: '#cv_msg_2', label: 'Text-back, one minute later', for: 2.2 },
        { at: 4.6, highlight: '#cv_msg_3', label: 'The caller wrote back', for: 2 },
        { at: 6.8, highlight: '#cv_composer .cv-addr', label: 'Sent from the business number', for: 2.6 },
        { at: 9.6, highlight: '#cv_list_wrap', label: 'The whole team sees it', for: 3 },
      ],
    },
    {
      page: page('tip'),
      say: 'Selling tip: ask the owner, what happens to a message that arrives at 9 pm on a Saturday? Their answer is your opening.',
      caption: 'Selling tip: ask the owner, "What happens to a message that arrives at 9 pm on a Saturday?" Their answer is your opening.',
      tail: 1.2,
    },
    { page: page('outro'), watermark: false, duration: 5.6, say: 'Catch every lead. Kyntlo, Own Tomorrow.' },
  ],
};
