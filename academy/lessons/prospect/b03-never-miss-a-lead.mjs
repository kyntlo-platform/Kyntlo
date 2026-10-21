// Track B · Video 3 — Never miss a lead again. Unified inbox + missed-call text-back.
// Plan facts (pricing.html): full inbox with SMS & WhatsApp = Growth+; missed-call text-back = Pro.
export default {
  id: 'B3',
  title: 'Never Miss a Lead Again — One Inbox + Missed-Call Text-Back | Kyntlo',
  description:
    'Every text, email, WhatsApp, Facebook, Instagram and website chat in one inbox, plus missed-call text-back that texts callers back within seconds, so a missed call becomes a conversation instead of a lost customer.',
  tags: ['Kyntlo', 'Missed call text back', 'Unified inbox', 'Lead follow-up', 'Small business CRM'],
  thumbnail: { kicker: 'Never miss a lead', title: 'One inbox. *Zero missed calls.*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Never miss a lead', title: 'Every message. *Every call.*', sub: 'One inbox, and a text-back for every missed call.' },
      say: "Every lead you miss is a customer who went somewhere else. Here's how Kyntlo makes sure you never miss one again.",
    },
    {
      chapter: 'One inbox',
      goto: '{demo}#/conversations/conversations/v1',
      settle: 1,
      say: "Kyntlo puts every conversation in one inbox. Texts, emails, WhatsApp, Facebook, Instagram, website chat and phone calls, side by side.",
      actions: [
        { at: 0.4, title: 'Conversations', sub: 'One inbox for every channel', for: 3.2 },
        { at: 3.8, highlight: '#cv_list_wrap', label: 'Every channel', for: 3.4 },
        { at: 4.0, zoom: '#cv_list_wrap', scale: 1.4, for: 3.6 },
      ],
    },
    {
      chapter: 'One thread per customer',
      say: "Each customer has one thread. Liam messaged on Facebook, then phoned, then got a text, and it's all in one place.",
      actions: [
        { at: 0.4, click: '#cv_item_v6' },
        { at: 2.6, highlight: '#cv_msg_1', label: 'Facebook', for: 1.8 },
        { at: 4.6, highlight: '#cv_msg_3', label: 'Phone call', for: 1.8 },
        { at: 6.6, highlight: '#cv_msg_4', label: 'Text', for: 1.8 },
      ],
    },
    {
      chapter: 'Teamwork',
      say: "Assign conversations, so everyone knows who's replying. And each customer's details, deals and bookings sit right alongside the chat.",
      actions: [
        { at: 0.4, click: '#cv_item_v1' },
        { at: 2.0, highlight: '#cv_assign', label: 'Who owns it', for: 2.6 },
        { at: 2.2, zoom: '#cv_head', scale: 1.6, for: 2.6 },
        { at: 5.6, highlight: '#cv_right', label: 'Everything about Olivia', for: 3 },
      ],
    },
    {
      chapter: 'The missed call problem',
      card: { type: 'chapter', kicker: 'The big one', title: 'Missed-call *text-back*', sub: 'A friendly text, seconds after a missed call · Pro plan' },
      say: "Now, the big one. When you can't pick up, plenty of callers won't leave a voicemail. They'll simply ring the next business on their list.",
    },
    {
      chapter: 'Missed-call text-back',
      goto: '{demo}#/conversations/conversations/v9',
      settle: 1,
      say: "Missed-call text-back fixes that. Seconds after a missed call, Kyntlo sends a friendly text, automatically, from your business number.",
      actions: [
        { at: 0.4, title: 'Missed-call text-back', sub: 'Automatic · Pro plan', for: 3.2 },
        { at: 3.0, highlight: '#cv_msg_1', label: 'Missed call · 09:41', for: 2.4 },
        { at: 5.6, highlight: '#cv_msg_2', label: 'Automatic text · 09:42', for: 2.8 },
        { at: 5.8, zoom: '#cv_msg_2', scale: 1.6, for: 2.8 },
      ],
    },
    {
      chapter: 'From missed call to booking',
      say: "The caller replies, and now you have a conversation instead of a lost lead. Answer in seconds, and book them in.",
      actions: [
        { at: 0.4, highlight: '#cv_msg_3', label: 'They replied', for: 2.6 },
        { at: 3.2, type: "So sorry to hear that! We can see you at 2pm today. Shall I book you in?", into: '#cv_text', delay: 22 },
        { at: 6.2, click: '#cv_send' },
        { at: 6.8, highlight: '#cv_msg_4', label: 'Replied in seconds', for: 1.8 },
      ],
    },
    {
      chapter: 'Which plan?',
      card: { type: 'chapter', kicker: 'Which plan?', title: 'Every lead, *every channel*', sub: 'Full inbox with SMS & WhatsApp: Growth and Pro · Missed-call text-back: Pro' },
      say: "The full inbox, with texts and WhatsApp, comes with Growth and Pro. And missed-call text-back is part of Pro.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'Never miss a lead', title: 'Start your free *14-day trial*', sub: 'No setup fees · Cancel anytime', cta: 'kyntlo.ai/[trial]' },
      say: "Stop losing customers to a missed call. Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
