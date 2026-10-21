// Track A · Module 4 · Lesson 5 — Calls, voicemail & missed-call text-back (Pro).
// Filmed on the demo workspace (Conversations → Liam's call log, Noah's voicemail, a missed call from a new number).
export default {
  id: 'A-4.5',
  title: 'Kyntlo Academy 4.5 — Calls, voicemail & missed-call text-back',
  description:
    'Make and log calls from the Kyntlo inbox, listen to call recordings and voicemail transcripts, and use missed-call text-back to turn missed calls into booked appointments.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Missed call text back', 'Call recording', 'Voicemail', 'HighLevel phone system'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 4 · Lesson 5', title: 'Never lose a *missed call*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 4 · Lesson 5', title: 'Calls, voicemail & *missed-call text-back*', sub: 'Make calls, hear recordings, and win back every missed caller.' },
      say: "In this lesson, you'll see how phone calls work inside Kyntlo: making calls, listening to recordings and voicemails, and the feature that wins back lost leads, missed-call text-back.",
    },
    {
      chapter: 'Calls in the thread',
      goto: '{demo}#/conversations/conversations/v6',
      settle: 1,
      say: "Calls live in the same thread as your messages. Here's Liam: a Facebook message, then a phone call, then a confirmation text. Every call is logged automatically, with who handled it, and how long it lasted.",
      actions: [
        { at: 0.6, title: 'Calls', sub: 'Logged in the conversation, automatically', for: 3.6 },
        { at: 4.6, highlight: '#cv_msg_1', label: 'Facebook', for: 1.8 },
        { at: 6.6, hover: '#cv_msg_3' },
        { at: 6.8, highlight: '#cv_msg_3', label: 'Phone call', for: 2.4 },
        { at: 9.4, highlight: '#cv_msg_4', label: 'Text', for: 1.8 },
        { at: 11.8, zoom: '#cv_msg_3', scale: 1.8, for: 3.4 },
      ],
    },
    {
      chapter: 'Call recordings',
      say: "Call recording is included on the Pro plan. Press play to listen back. It's great for training new staff, or for checking exactly what was agreed. Do let callers know that calls may be recorded.",
      actions: [
        { at: 1.0, title: 'Call recording', sub: 'Included on Pro', for: 3.6 },
        { at: 3.2, click: '#cv_play_3' },
        { at: 3.6, zoom: '#cv_msg_3', scale: 1.8, for: 6 },
      ],
    },
    {
      chapter: 'Making a call',
      say: "To call someone, click the phone icon at the top of the thread. Kyntlo calls from your business number, so the patient sees your practice, not your personal mobile. You can mute, open the keypad, or transfer the call to a colleague.",
      actions: [
        { at: 1.2, hover: '#cv_call' },
        { at: 1.4, highlight: '#cv_call', label: 'Call', for: 1.8 },
        { at: 3.2, click: '#cv_call' },
        { at: 4.6, highlight: '#cv_dialer', label: 'From your business number', for: 4 },
        { at: 10.6, hover: '#cv_mute' },
        { at: 11.8, hover: '#cv_keypad' },
        { at: 13.0, hover: '#cv_transfer' },
      ],
    },
    {
      chapter: 'After the call',
      say: "When you hang up, the call and its recording are added to the conversation, so anyone on your team can see what happened. Answered calls, missed calls and voicemails all appear this way, so the inbox doubles as your complete call history.",
      actions: [
        { at: 0.4, click: '#cv_hangup' },
        { at: 1.6, hover: '#cv_thread .cv-call:last-of-type' },
        { at: 1.8, highlight: '#cv_msg_5', label: 'New call logged', for: 3.4 },
      ],
    },
    {
      chapter: 'Voicemail',
      say: "If nobody answers, callers can leave a voicemail. It arrives in the inbox like any other message, with a player and a written transcript, so you can see what it's about without even pressing play.",
      actions: [
        { at: 0.6, click: '#cv_item_v10' },
        { at: 2.4, highlight: '#cv_msg_1', label: 'Missed call', for: 2 },
        { at: 4.6, hover: '#cv_msg_2' },
        { at: 4.8, highlight: '#cv_msg_2', label: 'Voicemail + transcript', for: 4 },
        { at: 5.0, zoom: '#cv_msg_2', scale: 1.5, for: 6.5 },
      ],
    },
    {
      chapter: 'Calling back',
      say: "Noah wants to move his check-up, so the next step is clear. Priya owns this conversation, and she can call him back from right here, with one click.",
      actions: [
        { at: 1.6, hover: '#cv_assign' },
        { at: 3.6, highlight: '#cv_assign', label: 'Priya owns it', for: 2.4 },
        { at: 6.8, hover: '#cv_call' },
        { at: 7.0, highlight: '#cv_call', label: 'Call back', for: 2.4 },
      ],
    },
    {
      chapter: 'Missed-call text-back',
      say: "Now the big one. When a call goes unanswered, most people simply ring the next business on their list. Missed-call text-back fixes that. Seconds after a missed call, Kyntlo sends a friendly text, automatically.",
      actions: [
        { at: 0.6, click: '#cv_item_v9' },
        { at: 2.2, title: 'Missed-call text-back', sub: 'Pro plan', for: 4 },
        { at: 6.8, hover: '#cv_msg_1' },
        { at: 7.0, highlight: '#cv_msg_1', label: 'Missed call · 09:41', for: 2.6 },
        { at: 10.4, hover: '#cv_msg_2' },
        { at: 10.6, highlight: '#cv_msg_2', label: 'Automatic text · 09:42', for: 3.2 },
      ],
    },
    {
      chapter: 'From missed call to booking',
      say: "And it worked. Instead of a lost caller, we have a conversation, and a patient with a chipped tooth asking to be seen today. Reply, book them in, and that missed call has turned into revenue.",
      actions: [
        { at: 0.6, hover: '#cv_msg_3' },
        { at: 0.8, highlight: '#cv_msg_3', label: 'A new patient replied', for: 3.6 },
        { at: 5.0, type: "So sorry to hear that! We can see you at 2pm today. Shall I book you in?", into: '#cv_text', delay: 32 },
        { at: 9.6, click: '#cv_send' },
        { at: 10.4, highlight: '#cv_msg_4', label: 'Replied in seconds', for: 2.6 },
      ],
    },
    {
      chapter: 'New callers become contacts',
      say: "Look at the panel on the right. This caller wasn't in our contacts yet, so Kyntlo created a new contact from the phone number. Click Add name once you know who it is, and every future call and message is linked to them.",
      actions: [
        { at: 0.8, hover: '#cv_details' },
        { at: 1.0, highlight: '#cv_right', label: 'New contact, created from the call', for: 4.6 },
        { at: 6.6, zoom: '#cv_right', scale: 1.5, for: 5 },
        { at: 8.2, hover: '#cv_addname' },
        { at: 8.4, highlight: '#cv_addname', label: 'Add name', for: 2.6 },
      ],
    },
    {
      chapter: 'How it is set up',
      say: "Behind the scenes, this runs as a workflow. When a call is missed, the workflow sends your text-back message. Bloom's is called Missed Call Text-Back, and you'll build one step by step in Module nine.",
      caption: "Behind the scenes, this runs as a workflow. When a call is missed, the workflow sends your text-back message. Bloom's is called \"Missed Call Text-Back\", and you'll build one step by step in Module 9.",
      actions: [
        { at: 0.6, hover: '#cv_msg_2 .cv-auto' },
        { at: 0.8, zoom: '#cv_msg_2', scale: 1.7, for: 6 },
        { at: 1.0, highlight: '#cv_msg_2 .cv-meta', label: 'Sent by workflow', for: 4 },
        { at: 8.0, title: 'Workflow: Missed Call Text-Back', sub: 'Built in Module 9 · Automation', for: 4.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Write it like a *human*', sub: 'Say who you are, apologise, ask one question.' },
      say: "Here's a pro tip. Write your text-back message like a person, not a robot. Say who you are, apologise for missing the call, and ask one simple question, like, how can we help? A question gets far more replies than a link on its own.",
      caption: 'Here\'s a pro tip. Write your text-back message like a person, not a robot. Say who you are, apologise for missing the call, and ask one simple question, like "How can we help?" A question gets far more replies than a link on its own.',
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 5', title: 'Calendar *types* explained', sub: 'Personal, round robin, class, collective and service menus.', cta: 'Kyntlo [Academy]' },
      say: "That wraps up Conversations! In Module five, we'll move on to calendars, starting with the different calendar types, and which one fits each kind of booking. See you there.",
      caption: "That wraps up Conversations! In Module 5, we'll move on to calendars, starting with the different calendar types, and which one fits each kind of booking. See you there.",
    },
  ],
};
