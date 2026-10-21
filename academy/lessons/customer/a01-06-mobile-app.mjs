// Track A · Module 1 · Lesson 6 — The Kyntlo mobile app.
// Filmed on the demo workspace (academy/demo-app): the Mobile App page and its phone mockup.
export default {
  id: 'A-1.6',
  title: 'Kyntlo Academy 1.6 — The Kyntlo mobile app',
  description:
    'Install the Kyntlo mobile app, log in, turn on notifications, reply to leads from your inbox, and check your calendar, contacts and pipeline on the go.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Getting started', 'Mobile app'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 1 · Lesson 6', title: 'Kyntlo in your *pocket*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 1 · Lesson 6', title: 'The Kyntlo *mobile app*', sub: 'Reply to leads and manage bookings on the go.' },
      say: "In this lesson, we'll set up the Kyntlo mobile app. Leads often go to whoever replies first, so having your inbox in your pocket is one of the quickest wins in the whole course.",
    },
    {
      chapter: 'Download the app',
      goto: '{demo}#/mobile-app',
      settle: 1,
      say: "Click Mobile App at the bottom of the sidebar. Scan this code with your phone's camera, or search for Kyntlo in the App Store or on Google Play. The app is included in every plan.",
      actions: [
        { at: 0.4, highlight: '#sb_mobile-app', label: 'Mobile App', for: 2.4 },
        { at: 3.0, highlight: '#mob_download', label: 'Scan to download', for: 4 },
        { at: 3.2, zoom: '#mob_download', scale: 1.4, for: 4.4 },
        { at: 8.6, hover: '#mob_ios' },
        { at: 9.6, hover: '#mob_android' },
      ],
    },
    {
      chapter: 'Download the app',
      say: "On a computer without your phone nearby? Type your mobile number here, and click Text me the download link.",
      actions: [
        { at: 0.6, highlight: '#mob_link_phone', label: 'Your mobile number', for: 2.6 },
        { at: 3.6, click: '#mob_send_link' },
      ],
    },
    {
      chapter: 'Log in',
      say: "Open the app, and log in with the same email and password you use on the web. If your company has several locations, choose the account you want to work in. You can switch at any time.",
      actions: [
        { at: 0.3, zoom: '#mob_phone', scale: 1.25, for: 9 },
        { at: 0.6, type: 'sarah@bloomdental.co.uk', into: '#mob_email', delay: 40 },
        { at: 2.4, type: 'demo-password', into: '#mob_password', delay: 40 },
        { at: 3.8, click: '#mob_login' },
        { at: 7.0, click: '#mob_pick_account' },
      ],
    },
    {
      chapter: 'Notifications',
      say: "When the app asks to send notifications, tap Allow. Now, the moment a new lead comes in or a customer replies, your phone lets you know, just like this.",
      actions: [
        { at: 0.6, highlight: '#mob_push', label: 'Instant alert', for: 3 },
        { at: 0.8, zoom: '#mob_phone', scale: 1.3, for: 4 },
      ],
    },
    {
      chapter: 'Reply to leads',
      say: "The Conversations tab is the same inbox you have on the web. Unread messages are at the top. Olivia is asking about an Invisalign consultation, so let's open her conversation.",
      actions: [
        { at: 0.4, highlight: '#mob_screen .mo-body', label: 'Your inbox', for: 3.4 },
        { at: 5.4, hover: '#mob_conv_v1' },
        { at: 8.8, click: '#mob_conv_v1' },
      ],
    },
    {
      chapter: 'Reply to leads',
      say: "You see the whole thread, including the AI's earlier reply. Type your answer, and tap send. It goes out by text from your business number, and it's saved on Olivia's contact record for the whole team to see.",
      actions: [
        { at: 0.3, zoom: '#mob_phone', scale: 1.3, for: 12 },
        { at: 2.6, type: 'Hi Olivia! We have Thursday at 10:00. Shall I book you in?', into: '#mob_reply', delay: 35 },
        { at: 8.6, click: '#mob_reply_send' },
      ],
    },
    {
      chapter: 'Calendar',
      say: "Tap Calendar to see the day's appointments. You can check who's coming in, confirm, reschedule, or book a new appointment right from your phone.",
      actions: [
        { at: 0.3, click: '#mob_back' },
        { at: 1.6, click: '#mob_nav_calendar' },
        { at: 3.0, highlight: '#mob_screen .mo-body', label: "Today's bookings", for: 3.6 },
        { at: 3.2, zoom: '#mob_phone', scale: 1.3, for: 5 },
      ],
    },
    {
      chapter: 'Contacts & opportunities',
      say: "Contacts lets you look anyone up and call them with one tap. And Opportunities shows your pipeline, so you can move a deal forward straight after a consultation.",
      actions: [
        { at: 0.3, click: '#mob_nav_contacts' },
        { at: 2.4, highlight: '#mob_screen .mo-body', label: 'Look up and call', for: 2.6 },
        { at: 5.6, click: '#mob_nav_opportunities' },
        { at: 6.8, highlight: '#mob_screen .mo-body', label: 'Your pipeline', for: 3 },
      ],
    },
    {
      chapter: 'More',
      say: "Under More, you'll find your notifications, tasks, payments, reviews and the dialer. Calls from the dialer use your business number too, so your personal mobile stays private.",
      actions: [
        { at: 0.3, click: '#mob_nav_more' },
        { at: 1.6, zoom: '#mob_phone', scale: 1.3, for: 6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Reply within *five minutes*', sub: 'Turn notifications on for new leads.' },
      say: "Here's a pro tip. Leads contacted within five minutes are far more likely to book. Keep notifications on for new leads and messages, and let the app do the reminding for you.",
      caption: "Here's a pro tip. Leads contacted within 5 minutes are far more likely to book. Keep notifications on for new leads and messages, and let the app do the reminding for you.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 2.1', title: 'Reading your *dashboard*', sub: 'Module 2: Dashboard & Reporting', cta: 'Kyntlo [Academy]' },
      say: "That's Module 1 complete, well done! In Module 2, we'll start with your dashboard, and what every number on it means. See you there.",
    },
  ],
};
