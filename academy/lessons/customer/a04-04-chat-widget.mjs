// Track A · Module 4 · Lesson 4 — Setting up the website chat widget.
// Filmed on the demo workspace (academy/demo-app), screen: Sites → Chat Widget.
export default {
  id: 'A-4.4',
  title: 'Kyntlo Academy 4.4 — Setting up the website chat widget',
  description:
    'Turn website visitors into conversations: choose live chat or SMS, style the chat bubble, write your greeting, pick the contact form fields, switch on Conversation AI, test the widget and install it on any website.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Chat widget', 'Live chat', 'Lead capture'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 4 · Lesson 4', title: 'Your website *chat widget*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 4 · Lesson 4', title: 'Set up your website *chat widget*', sub: 'Turn website visitors into conversations.' },
      say: "Welcome back! In this lesson, you'll set up the chat widget, the little bubble in the corner of your website that turns curious visitors into real conversations. We'll style it, test it, and install it.",
    },
    {
      chapter: 'Where it lives',
      goto: '{demo}#/sites/chat-widget',
      settle: 1,
      say: "You'll find it under Sites, then Chat Widget. Here's why it matters: most people won't pick up the phone, but they will type a quick question. Every chat becomes a contact in your CRM, and the conversation lands in your inbox.",
      actions: [
        { at: 0.4, highlight: '#tab_chat-widget', label: 'Sites → Chat Widget', for: 3 },
        { at: 4.5, highlight: '#cw_row_cw1', label: 'Your chat widget', for: 3.5 },
        { at: 9.0, hover: '#cw_row_cw1' },
      ],
    },
    {
      chapter: 'Live chat or SMS',
      say: "Open your widget. First, choose the chat type. Live Chat keeps the conversation inside the widget, in real time. SMS and Email collects the visitor's details, and you reply by text or email, so the conversation follows them after they leave your site.",
      actions: [
        { at: 0.5, click: '#cw_row_cw1' },
        { at: 2.6, highlight: '#cw_type_live', label: 'Real-time chat', for: 3.6 },
        { at: 7.4, click: '#cw_type_sms' },
        { at: 8.0, highlight: '#cw_window', label: 'Visitor leaves their details', for: 4 },
        { at: 14.0, click: '#cw_type_live' },
      ],
    },
    {
      chapter: 'Style & colours',
      say: "Next, style and colours. Pick a theme colour that matches your brand, and choose which corner the bubble sits in. Then give the bubble a friendly label. Something like questions, chat with us, works much better than a plain icon. The live preview on the right updates as you go.",
      actions: [
        { at: 0.4, click: '#cw_sec_style' },
        { at: 2.4, click: '#cw_color_1' },
        { at: 3.6, click: '#cw_color_0' },
        { at: 5.2, highlight: '#cw_pos_right', label: 'Bubble position', for: 2.4 },
        { at: 7.6, click: '#cw_bubble' },
        { at: 8.6, click: '#cw_bubble_label' },
        { at: 9.0, press: 'Control+A' },
        { at: 9.2, type: 'Questions? Chat with us' },
        { at: 13.4, highlight: '#cw_bubble', label: 'Live preview', for: 3 },
      ],
    },
    {
      chapter: 'Greeting',
      speed: 1.2,
      say: "In Chat window, write the greeting people see when they open the chat. Keep it warm and specific to your business, and tell them how quickly you reply. You can also show a small pop-up prompt after a few seconds, to start the conversation for them.",
      actions: [
        { at: 0.4, click: '#cw_sec_window' },
        { at: 1.4, click: '#cw_bubble' },
        { at: 2.0, click: '#cw_greeting' },
        { at: 2.3, press: 'Control+A' },
        { at: 2.5, type: 'Hi! Thinking about Invisalign or whitening? Ask us anything, we usually reply within minutes.', delay: 30 },
        { at: 8.4, highlight: '#cw_prompt_on', label: 'Optional pop-up prompt', for: 3 },
      ],
    },
    {
      chapter: 'Contact form',
      say: "Under Contact form, choose what visitors fill in before they chat. Name, phone and a message are usually enough. Every extra field means fewer people finish. Leave the consent text switched on, so you're allowed to text them back.",
      actions: [
        { at: 0.4, click: '#cw_sec_form' },
        { at: 2.2, highlight: '#cw_settings', label: 'Ask only what you need', for: 4 },
        { at: 7.4, highlight: '#cw_consent', label: 'SMS consent', for: 3 },
      ],
    },
    {
      chapter: 'Conversation AI',
      say: "On Growth and Pro, you can let Conversation AI answer first. It replies instantly, even at midnight, using what you teach it in AI Agents, then hands over to your team.",
      actions: [
        { at: 0.4, click: '#cw_sec_ai' },
        { at: 2.4, click: '#cw_ai' },
        { at: 3.0, highlight: '#cw_ai', label: 'Growth+ plans', for: 3.4 },
      ],
    },
    {
      chapter: 'Acknowledgement',
      say: "Finally, the acknowledgement. This message appears straight after someone sends a chat, so they know a real person has it and roughly when to expect an answer.",
      actions: [
        { at: 0.4, click: '#cw_sec_thanks' },
        { at: 2.0, highlight: '#cw_thanks', label: 'Sets expectations', for: 4 },
      ],
    },
    {
      chapter: 'Test it',
      speed: 1.3,
      say: "Now test it, exactly like a visitor would. Fill in the form in the preview and send a message. You'll see the acknowledgement, the AI reply, and a new chat arriving in Conversations.",
      actions: [
        { at: 0.4, type: 'Sophie Turner', into: '#cw_prev_name', delay: 40 },
        { at: 2.2, type: '07700 900105', into: '#cw_prev_phone', delay: 40 },
        { at: 3.8, type: 'Do you have any free Invisalign scans this week?', into: '#cw_prev_msg', delay: 30 },
        { at: 6.6, click: '#cw_prev_send' },
        { at: 7.4, highlight: '#cw_window', label: 'A new contact + conversation', for: 3.4 },
      ],
    },
    {
      chapter: 'Get the code',
      say: "Happy with it? Click Save, then Get Code. Copy this short snippet. It's the same code for every page, so you only install it once.",
      actions: [
        { at: 0.4, click: '#cw_save' },
        { at: 2.4, click: '#cw_getcode' },
        { at: 3.6, highlight: '#cw_code', label: 'Your install code', for: 3 },
        { at: 3.8, zoom: '#cw_code', scale: 1.5, for: 3 },
        { at: 7.0, click: '#cw_copy' },
      ],
    },
    {
      chapter: 'Install it',
      say: "On WordPress, Wix or Squarespace, paste it into the footer or custom code setting, just before the closing body tag. Not technical? Email it straight to your web developer. And on Kyntlo funnels and websites, you don't need code at all.",
      actions: [
        { at: 0.4, highlight: '#cw_where_external', label: 'Any other website', for: 4.6 },
        { at: 6.4, hover: '#cw_email_dev' },
        { at: 9.0, highlight: '#cw_where_kyntlo', label: 'No code needed', for: 3.6 },
      ],
    },
    {
      chapter: 'On Kyntlo pages',
      goto: '{demo}#/sites/funnels/f1/settings',
      settle: 1,
      say: "Just open your funnel or website settings, pick your widget from the Chat widget menu, and save. It then appears on every page of that funnel.",
      actions: [
        { at: 0.4, highlight: '#fn_set_chat', label: 'Settings → Chat widget', for: 4 },
        { at: 0.6, zoom: '#fn_set_chat', scale: 1.6, for: 3.6 },
        { at: 5.6, click: '#fn_set_save' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Reply within *five minutes*', sub: 'Turn on mobile notifications for new chats.' },
      say: "Here's a pro tip. Speed wins. Leads who get a reply within five minutes are far more likely to book, so turn on new-message notifications and answer new chats the moment they arrive.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 4.5', title: 'Calls & *missed-call text-back*', sub: 'Never lose a caller again.', cta: 'Kyntlo [Academy]' },
      say: "Your website is now open for conversations! Next, we'll set up calls, voicemail and missed-call text-back, so no caller slips through the cracks. See you there.",
    },
  ],
};
