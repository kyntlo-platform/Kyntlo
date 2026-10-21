// Track A · Module 4 · Lesson 3 — Snippets, templates & scheduling.
// Filmed on the demo workspace (Conversations → Snippets tab, then the composer).
export default {
  id: 'A-4.3',
  title: 'Kyntlo Academy 4.3 — Snippets, templates & scheduled messages',
  description:
    'Reply faster in Kyntlo Conversations: create snippets with custom values, insert them in one click, use email templates, and schedule messages to send later.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Snippets', 'Canned responses', 'Schedule message', 'HighLevel conversations'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 4 · Lesson 3', title: 'Reply *faster*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 4 · Lesson 3', title: 'Snippets, templates & *scheduling*', sub: 'Reply faster, and send at the right time.' },
      say: "In this lesson, you'll learn three time-savers: snippets for the questions you answer every day, templates for emails, and scheduling, so your messages go out at the right time, even when you're busy.",
    },
    {
      chapter: 'Why snippets',
      goto: '{demo}#/conversations/snippets',
      settle: 1,
      say: "You probably answer the same questions every week: prices, opening hours, how to book. Snippets are saved replies your whole team can insert in one click. You'll find them in the Snippets tab, at the top of Conversations.",
      actions: [
        { at: 0.4, hover: '#tab_snippets' },
        { at: 0.6, highlight: '#tab_snippets', label: 'Snippets', for: 2.6 },
        { at: 4.0, title: 'Snippets', sub: 'Saved replies for the whole team', for: 4 },
        { at: 8.4, hover: '#sn_table' },
        { at: 8.6, highlight: '#sn_table', label: 'Your snippet library', for: 3.4 },
      ],
    },
    {
      chapter: 'Custom values',
      say: "Notice the curly brackets. Those are custom values. When you insert a snippet, contact first name is swapped for the person's real first name, so every reply still feels personal.",
      caption: "Notice the curly brackets. Those are custom values. When you insert a snippet, {{contact.first_name}} is swapped for the person's real first name, so every reply still feels personal.",
      actions: [
        { at: 0.4, hover: '#sn_row_sn1' },
        { at: 0.6, zoom: '#sn_row_sn1', scale: 1.7, for: 7 },
        { at: 1.0, highlight: '#sn_row_sn1', label: 'Custom value', for: 6 },
      ],
    },
    {
      chapter: 'Add a snippet',
      say: "Let's add one. Click Add Snippet and give it a name your team will recognise. Choose Text for SMS, WhatsApp and chat, or Email. Then write the message. The Custom values button adds the first name for you.",
      actions: [
        { at: 0.6, click: '#sn_add' },
        { at: 2.0, type: 'Parking information', into: '#sn_name', delay: 50 },
        { at: 5.4, highlight: '#sn_type', label: 'Text or Email', for: 2.6 },
        { at: 8.4, type: 'Hi ', into: '#sn_body', delay: 60 },
        { at: 9.4, click: '#sn_cv' },
        { at: 10.4, click: '.menu button:has-text("contact.first_name")' },
        { at: 11.2, type: ', the nearest car park is Cavendish Square, a five-minute walk from us.', delay: 25 },
      ],
    },
    {
      chapter: 'Save it',
      say: "Pick a folder to keep things tidy, then save. Good names matter: start with the topic, like parking or prices, so they're easy to search. The snippet is now available to everyone on your team, in every conversation.",
      actions: [
        { at: 0.4, hover: '#sn_folder_sel' },
        { at: 0.6, run: (p) => p.selectOption('#sn_folder_sel', 'General') },
        { at: 0.8, highlight: '#sn_folder_sel', label: 'Folder', for: 2 },
        { at: 7.4, click: '#sn_save' },
        { at: 8.6, highlight: '#sn_table tbody tr:first-child', label: 'New snippet', for: 3 },
      ],
    },
    {
      chapter: 'Use a snippet',
      say: "Now let's use one. Open a conversation and click the snippets button in the composer. Search, or scroll, and click the one you need. It drops into the message box with Olivia's name already filled in. Check it reads well, then send.",
      actions: [
        { at: 0.4, click: '#tab_conversations' },
        { at: 2.0, click: '#cv_item_v1' },
        { at: 3.6, click: '#cv_snippets' },
        { at: 4.6, highlight: '#cv_snip_pop', label: 'Snippets', for: 2.2 },
        { at: 7.0, type: 'book', into: '#cv_snip_search', delay: 90 },
        { at: 9.2, click: '#cv_snip_sn1' },
        { at: 10.2, highlight: '#cv_text', label: '"Olivia" filled in', for: 3.4 },
        { at: 10.4, zoom: '#cv_composer', scale: 1.5, for: 4 },
        { at: 14.8, click: '#cv_send' },
      ],
    },
    {
      chapter: 'Email templates',
      say: "For emails, you also get templates. Daniel wants to move his check-up. His conversation is on email, so open Templates and pick Appointment moved. The subject and the message fill in for you.",
      caption: 'For emails, you also get templates. Daniel wants to move his check-up. His conversation is on email, so open Templates and pick "Appointment moved". The subject and the message fill in for you.',
      actions: [
        { at: 0.6, click: '#cv_item_v2' },
        { at: 2.4, highlight: '#cv_msg_1', label: 'Can I move my check-up?', for: 2.6 },
        { at: 5.6, click: '#cv_templates' },
        { at: 6.6, highlight: '#cv_tpl_pop', label: 'Email templates', for: 2.2 },
        { at: 9.0, click: '#cv_tpl_et2' },
        { at: 9.8, highlight: '#cv_box', label: 'Subject and body filled in', for: 3 },
      ],
    },
    {
      chapter: 'Schedule a message',
      say: "Say you only get to Daniel's email late in the evening. A reply at midnight looks odd. Instead of Send, click the clock icon to schedule the message. Pick the date and the time, and click Schedule.",
      actions: [
        { at: 2.6, hover: '#cv_schedule' },
        { at: 2.8, highlight: '#cv_schedule', label: 'Schedule', for: 2.2 },
        { at: 5.4, click: '#cv_schedule' },
        { at: 6.6, run: (p) => p.selectOption('#cv_sched_date', 'Fri 23 Oct 2026') },
        { at: 7.0, highlight: '.modal', label: 'Friday, 9:00', for: 3 },
        { at: 10.6, click: '#cv_sched_save' },
      ],
    },
    {
      chapter: 'Scheduled',
      say: "The message now waits in the thread, with a dashed outline and the time it will go out. Changed your mind? Click Cancel any time before then, and it won't be sent.",
      actions: [
        { at: 0.4, hover: '.cv-msg.sched .cv-bub' },
        { at: 0.6, highlight: '.cv-msg.sched', label: 'Waiting to send', for: 3.4 },
        { at: 0.8, zoom: '.cv-msg.sched', scale: 1.6, for: 6 },
        { at: 5.8, hover: '#cv_sched_cancel' },
      ],
    },
    {
      chapter: 'Write now, send later',
      say: "Scheduling is perfect for follow-ups you've promised. Write the message while the details are fresh, schedule it for the morning you agreed, and move on. Kyntlo sends it on time, from your business number, even if you're with a patient.",
      actions: [
        { at: 0.6, title: 'Write now, send later', sub: 'Scheduled messages go out automatically', for: 5 },
        { at: 6.0, hover: '#cv_thread' },
        { at: 8.0, highlight: '.cv-msg.sched', label: 'Sends Friday at 9:00', for: 3.4 },
      ],
    },
    {
      chapter: 'More composer tools',
      say: "The composer has a few more helpers. Add an emoji, attach a file like an aftercare guide, or insert a trigger link, which tracks who clicks it. You'll find those links in the Trigger Links tab.",
      actions: [
        { at: 0.8, hover: '#cv_emoji' },
        { at: 1.0, highlight: '#cv_emoji', label: 'Emoji', for: 1.8 },
        { at: 3.0, hover: '#cv_attach' },
        { at: 3.2, highlight: '#cv_attach', label: 'Attach a file', for: 2.2 },
        { at: 6.2, hover: '#cv_triggerlink' },
        { at: 6.4, highlight: '#cv_triggerlink', label: 'Trigger link', for: 2.4 },
        { at: 9.4, hover: '#tab_trigger-links' },
        { at: 9.6, highlight: '#tab_trigger-links', label: 'Trigger Links', for: 2.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Build snippets from *real questions*', sub: 'Typed the same answer twice? Save it.' },
      say: "Here's a pro tip. Build your snippet library from real questions. For one week, every time you type the same answer twice, save it as a snippet. By Friday, most of your replies will take a single click.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 4.4', title: 'Setting up the *website chat widget*', sub: 'Style it, install it and test it.', cta: 'Kyntlo [Academy]' },
      say: "That's snippets, templates and scheduling! Next, you'll put a chat widget on your website, so visitors can message you straight into this inbox. See you there.",
    },
  ],
};
