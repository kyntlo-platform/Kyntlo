// Track A · Module 4 · Lesson 2 — Replying across channels.
// Filmed on the demo workspace (Conversations → Olivia's multi-channel thread, Ava on Instagram, Mason on live chat).
export default {
  id: 'A-4.2',
  title: 'Kyntlo Academy 4.2 — Replying across channels: SMS, email, WhatsApp, Facebook, Instagram & chat',
  description:
    'Reply to customers on any channel from one thread in Kyntlo: SMS, email, WhatsApp, Facebook Messenger, Instagram DMs and website live chat, plus internal comments for your team.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Unified inbox', 'SMS', 'WhatsApp', 'Instagram DMs', 'HighLevel conversations'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 4 · Lesson 2', title: 'Reply on *every channel*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 4 · Lesson 2', title: 'Replying across *channels*', sub: 'Text, email, WhatsApp, Facebook, Instagram and chat, from one thread.' },
      say: "In this lesson, you'll learn to reply on any channel from one place: text, email, WhatsApp, Facebook, Instagram and live chat. One thread per customer, and no more switching between apps.",
    },
    {
      chapter: 'One thread per person',
      goto: '{demo}#/conversations/conversations/v1',
      settle: 1,
      say: "Here's Olivia. She first messaged us on Facebook after seeing an ad. We followed up by email, and this morning she's texting. It's all one thread, in order, so anyone on your team can pick it up with the full story.",
      actions: [
        { at: 0.4, hover: '#cv_thread' },
        { at: 0.8, scroll: -1400, ms: 1400 },
        { at: 3.2, highlight: '#cv_msg_1', label: 'Facebook', for: 2.6 },
        { at: 6.2, highlight: '#cv_msg_4', label: 'Email', for: 2.6 },
        { at: 9.2, scroll: 1400, ms: 1400 },
        { at: 10.8, highlight: '#cv_msg_8', label: 'SMS today', for: 2.6 },
      ],
    },
    {
      chapter: 'Channel labels & AI replies',
      say: "Under every message, you can see which channel it came through. Messages with the purple A I label were written by your AI agent, not by a person. You'll set that up in Module ten.",
      caption: 'Under every message, you can see which channel it came through. Messages with the purple AI label were written by your AI agent, not by a person. You\'ll set that up in Module 10.',
      actions: [
        { at: 0.6, hover: '#cv_msg_8 .cv-meta' },
        { at: 0.8, zoom: '#cv_msg_8', scale: 1.8, for: 3.4 },
        { at: 4.8, hover: '#cv_msg_7 .cv-ai' },
        { at: 5.0, highlight: '#cv_msg_7', label: 'Written by AI', for: 3.4 },
        { at: 5.2, zoom: '#cv_msg_7', scale: 1.6, for: 4 },
      ],
    },
    {
      chapter: 'The composer',
      say: "To reply, use the composer at the bottom. The row of tabs is the channel switcher. Kyntlo picks the channel the customer used last, which is SMS here. The From and To line shows exactly which number you're sending from, and to.",
      actions: [
        { at: 1.2, hover: '#cv_ch_sms' },
        { at: 1.4, highlight: '#cv_channels', label: 'Channel switcher', for: 3.4 },
        { at: 1.6, zoom: '#cv_composer', scale: 1.5, for: 11 },
        { at: 9.4, hover: '.cv-addr' },
        { at: 9.6, highlight: '.cv-addr', label: 'From & To', for: 3 },
      ],
    },
    {
      chapter: 'Reply by text',
      say: "Olivia asked about Thursday, so let's text her back. Type your reply, keep an eye on the character counter, and click Send. One text segment is a hundred and sixty characters. When Olivia answers, her reply lands right back in this thread.",
      caption: "Olivia asked about Thursday, so let's text her back. Type your reply, keep an eye on the character counter, and click Send. One text segment is 160 characters. When Olivia answers, her reply lands right back in this thread.",
      actions: [
        { at: 0.6, type: 'Hi Olivia! Yes, we have 11:00 or 14:30 on Thursday. Which suits you best?', into: '#cv_text', delay: 40 },
        { at: 5.0, highlight: '#cv_count', label: 'Character counter', for: 2.6 },
        { at: 8.4, click: '#cv_send' },
        { at: 9.4, highlight: '#cv_msg_9', label: 'Sent by SMS', for: 2.6 },
      ],
    },
    {
      chapter: 'WhatsApp',
      say: "Prefer WhatsApp? Click the WhatsApp tab, and the same box now sends through your WhatsApp Business number. A quick note on plans: texting and WhatsApp are included from the Growth plan, and WhatsApp itself is a paid add-on. One WhatsApp rule to know: if the customer hasn't messaged you in the last twenty-four hours, you start with an approved template message.",
      caption: "Prefer WhatsApp? Click the WhatsApp tab, and the same box now sends through your WhatsApp Business number. A quick note on plans: texting and WhatsApp are included from the Growth plan, and WhatsApp itself is a paid add-on. One WhatsApp rule to know: if the customer hasn't messaged you in the last 24 hours, you start with an approved template message.",
      actions: [
        { at: 0.8, click: '#cv_ch_whatsapp' },
        { at: 1.6, highlight: '.cv-addr', label: 'Your WhatsApp number', for: 3 },
        { at: 1.8, zoom: '#cv_composer', scale: 1.5, for: 4 },
        { at: 7.0, title: 'SMS & WhatsApp', sub: 'Growth plan and above · WhatsApp is an add-on', for: 5 },
        { at: 15.0, title: '24-hour window', sub: 'Outside it, start with an approved template', for: 4 },
      ],
    },
    {
      chapter: 'Email',
      say: "For something longer, switch to Email. You get a subject line, and the reply comes from your business address. Use email for treatment plans, attachments, and anything the customer will want to keep.",
      actions: [
        { at: 0.6, click: '#cv_ch_email' },
        { at: 1.4, highlight: '#cv_box', label: 'Subject + message', for: 2.6 },
        { at: 3.8, type: 'Your Invisalign consultation', into: '#cv_subject', delay: 35 },
        { at: 6.0, type: 'Hi Olivia, here is everything to expect at your free consultation, including your 3D scan.', into: '#cv_text', delay: 25 },
        { at: 9.6, click: '#cv_send' },
        { at: 10.4, highlight: '#cv_msg_10', label: 'Sent by email', for: 2.4 },
      ],
    },
    {
      chapter: 'Facebook & Instagram',
      say: "Facebook and Instagram messages work exactly the same way. Ava messaged our Instagram account, so the Instagram tab is already selected. Your reply goes back as an Instagram direct message, and she never has to leave the app.",
      actions: [
        { at: 0.6, click: '#cv_item_v4' },
        { at: 2.4, highlight: '#cv_msg_1', label: 'Instagram DM', for: 2.6 },
        { at: 5.2, highlight: '#cv_ch_instagram', label: 'Instagram selected', for: 2.6 },
        { at: 8.0, type: 'Hi Ava! Yes, we use a gentle whitening gel made for sensitive teeth.', into: '#cv_text', delay: 30 },
        { at: 11.6, click: '#cv_send' },
      ],
    },
    {
      chapter: 'Live chat',
      say: "Website chat is no different. Mason asked a question through the chat widget on our website, so the Live Chat tab is selected, and he sees your answer right there in the chat window. Live chat works on every plan, so even on Starter, website visitors can reach you here.",
      actions: [
        { at: 0.6, click: '#cv_item_v5' },
        { at: 2.4, highlight: '#cv_msg_1', label: 'From the website chat', for: 2.6 },
        { at: 5.4, highlight: '#cv_ch_chat', label: 'Live Chat', for: 2.4 },
        { at: 7.8, type: 'Hi Mason, we have new patient slots this week. Shall I hold one for you?', into: '#cv_text', delay: 30 },
        { at: 11.0, click: '#cv_send' },
      ],
    },
    {
      chapter: 'Internal comments',
      say: "One more tab: Internal Comment. It's a note only your team can see. Use it to hand over context, like, Mason prefers evening appointments, without the customer ever seeing it.",
      caption: 'One more tab: Internal Comment. It\'s a note only your team can see. Use it to hand over context, like "Mason prefers evening appointments", without the customer ever seeing it.',
      actions: [
        { at: 0.6, click: '#cv_ch_comment' },
        { at: 1.4, highlight: '#cv_box', label: 'Team only', for: 2.6 },
        { at: 4.4, type: 'Mason prefers evening appointments.', into: '#cv_text', delay: 40 },
        { at: 7.6, click: '#cv_send' },
        { at: 8.4, highlight: '.cv-note', label: 'Only your team sees this', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Reply on *their* channel', sub: 'Answer where they asked, then invite them to text.' },
      say: "Here's a pro tip. Reply on the channel the customer chose. If someone messages you on Instagram, answer on Instagram first. Jumping to a phone call can feel pushy. Once they're comfortable, ask for their mobile number, so you can text reminders later.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 4.3', title: 'Snippets, templates & *scheduling*', sub: 'Reply faster, and send at the right time.', cta: 'Kyntlo [Academy]' },
      say: "Great work! Next, you'll learn to reply even faster, with snippets and templates, and to schedule messages for later. See you there.",
    },
  ],
};
