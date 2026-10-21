// Track A · Module 1 · Lesson 3 — Your Launchpad: first-day setup checklist.
// Filmed on the demo workspace (academy/demo-app).
export default {
  id: 'A-1.3',
  title: 'Kyntlo Academy 1.3 — Your Launchpad: first-day setup checklist',
  description:
    'Work through the Launchpad checklist: connect your Google Business Profile and Facebook & Instagram, install the website chat widget, and set up your email and phone, so your account is ready to capture leads on day one.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Getting started', 'Launchpad', 'Google Business Profile', 'Chat widget'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 1 · Lesson 3', title: 'Your *Launchpad* checklist' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 1 · Lesson 3', title: 'Your *Launchpad* setup checklist', sub: 'Get your account ready to capture leads on day one.' },
      say: "In this lesson, we'll work through your Launchpad, the setup checklist in Kyntlo. In about fifteen minutes, your Google profile, social pages, website chat and phone will all be feeding leads into one place.",
      caption: "In this lesson, we'll work through your Launchpad, the setup checklist in Kyntlo. In about 15 minutes, your Google profile, social pages, website chat and phone will all be feeding leads into one place.",
    },
    {
      chapter: 'What Launchpad is',
      goto: '{demo}#/launchpad',
      settle: 1,
      say: "Click Launchpad near the top of the sidebar. Each step connects one of the places your customers already reach you. Your progress is tracked at the top, so you can always see what's left.",
      actions: [
        { at: 0.4, highlight: '#sb_launchpad', label: 'Launchpad', for: 2.4 },
        { at: 3.0, highlight: '#lp_steps', label: 'Five setup steps', for: 3.4 },
        { at: 7.4, hover: '#lp_progress' },
        { at: 7.6, zoom: '#lp_progress', scale: 1.8, for: 3 },
      ],
    },
    {
      chapter: 'Google Business Profile',
      say: "Let's start with Google. Connecting your Google Business Profile brings your Google reviews and messages into Kyntlo, so you can reply without switching apps. Click Connect, then choose the Google account that manages your listing.",
      actions: [
        { at: 0.4, highlight: '#lp_step_google', label: 'Reviews & messages from Google', for: 3.4 },
        { at: 8.0, click: '#lp_google_btn' },
        { at: 10.2, hover: '#lp_account' },
        { at: 11.6, click: '#lp_account' },
      ],
    },
    {
      chapter: 'Google Business Profile',
      say: "Google asks you to allow access. Click Allow, then pick the business location to connect. If you have more than one practice or shop, choose the one that matches this account.",
      actions: [
        { at: 0.4, zoom: '.modal', scale: 1.4, for: 3 },
        { at: 2.6, click: '#lp_allow' },
        { at: 5.6, highlight: '.modal', label: 'Pick the right location', for: 3 },
        { at: 9.4, click: '#lp_pick_save' },
        { at: 10.4, highlight: '#lp_step_google', label: 'Connected', for: 2 },
      ],
    },
    {
      chapter: 'Facebook & Instagram',
      say: "Next, Facebook and Instagram. Connect the Facebook page for your business, and tick your Instagram account too. Instagram needs to be a business or creator account linked to that page. Once it's connected, Messenger and Instagram messages land in your Conversations inbox.",
      actions: [
        { at: 0.4, click: '#lp_facebook_btn' },
        { at: 1.8, click: '#lp_account' },
        { at: 3.6, click: '#lp_allow' },
        { at: 5.4, highlight: '.modal', label: 'Facebook page + Instagram', for: 5 },
        { at: 5.6, zoom: '.modal', scale: 1.4, for: 5 },
        { at: 13.0, click: '#lp_pick_save' },
        { at: 14.0, highlight: '#lp_step_facebook', label: 'Connected', for: 2.4 },
      ],
    },
    {
      chapter: 'Chat widget',
      say: "Now the chat widget. It adds a small chat bubble to your website, and every message goes straight to your inbox, with the visitor saved as a contact. Click Install. You can copy the code yourself, email it to your web developer, or use the WordPress plugin.",
      actions: [
        { at: 0.4, highlight: '#lp_step_widget', label: 'Website chat', for: 3 },
        { at: 6.0, click: '#lp_widget_btn' },
        { at: 8.6, hover: '#lp_widget_copy' },
        { at: 10.6, hover: '#lp_widget_dev' },
        { at: 12.6, hover: '#lp_widget_wp' },
      ],
    },
    {
      chapter: 'Chat widget',
      say: "The code goes just before the closing body tag on every page of your site. Copy it, add it to your website, then mark the step as installed. We'll style the widget and test it properly in Module 4.",
      actions: [
        { at: 0.3, zoom: '#lp_widget_code', scale: 1.7, for: 4 },
        { at: 0.5, highlight: '#lp_widget_code', label: 'Your widget code', for: 3.6 },
        { at: 4.8, click: '#lp_widget_copy' },
        { at: 7.6, click: '#lp_widget_done' },
      ],
    },
    {
      chapter: 'Email',
      say: "Set up your email takes you to Email Services in Settings. This is where you add your own sending domain, so your emails come from your business and land in the inbox, not spam. It needs a few changes at your domain provider, so we give it a full lesson in Module 14.",
      actions: [
        { at: 0.4, highlight: '#lp_step_email', label: 'Your own sending domain', for: 3.4 },
        { at: 4.0, click: '#lp_email_btn' },
        { at: 5.6, highlight: '#es_why', label: 'Why it matters', for: 4 },
        { at: 5.8, zoom: '#es_why', scale: 1.5, for: 4 },
      ],
    },
    {
      chapter: 'Phone number',
      goto: '{demo}#/launchpad',
      say: "Get a business phone number opens the Phone System. A Kyntlo number lets you call and text customers from one shared number, with every call and message saved on the contact's record. Buying a number and registering it is also covered in Module 14.",
      actions: [
        { at: 0.4, highlight: '#lp_step_phone', label: 'One number for the business', for: 3.4 },
        { at: 4.4, click: '#lp_phone_btn' },
        { at: 6.0, highlight: '#ph_table', label: 'Your numbers', for: 4 },
      ],
    },
    {
      chapter: 'Your progress',
      goto: '{demo}#/launchpad',
      say: "And look at that: three of the five steps are done. Email and phone are still open, and they'll stay on your checklist until you finish them, so nothing gets forgotten.",
      actions: [
        { at: 0.4, zoom: '#lp_progress', scale: 1.8, for: 3.4 },
        { at: 0.6, highlight: '#lp_progress', label: 'Three of five done', for: 3.2 },
        { at: 5.0, highlight: '#lp_step_email', label: 'Still to do', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Connect with an *owner* account', sub: "Not a staff member's personal login." },
      say: "Here's a pro tip. Always connect Google and Facebook with an account the business owns, not a team member's personal login. If that person ever leaves, your reviews and messages keep flowing.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 1.4', title: 'Business profile & *branding*', sub: 'Your logo, business details, time zone and legal information.', cta: 'Kyntlo [Academy]' },
      say: "Great work! Next, we'll fill in your business profile: your logo, address, time zone and legal details. See you in the next lesson.",
    },
  ],
};
