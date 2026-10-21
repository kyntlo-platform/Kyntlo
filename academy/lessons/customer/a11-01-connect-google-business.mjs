// Track A · Module 11 · Lesson 1 — Connecting Google Business Profile.
// Starts from the demo's "not connected" state: #/reputation/overview/not-connected
export default {
  id: 'A-11.1',
  title: 'Kyntlo Academy 11.1 — Connecting Google Business Profile',
  description:
    'Connect your Google Business Profile to Kyntlo Reputation, pull your Google reviews in, and set the review link your review requests will use.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Reputation management', 'Google Business Profile', 'Google reviews'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 11 · Lesson 1', title: 'Connect *Google* reviews' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 11 · Lesson 1', title: 'Connecting *Google Business Profile*', sub: 'Bring your Google reviews into Kyntlo.' },
      say: "Welcome to the Reputation module! In this lesson, you'll connect your Google Business Profile to Kyntlo, so your Google reviews flow straight into your account, and your review link is ready to share.",
    },
    {
      chapter: 'Reputation before connecting',
      goto: '{demo}#/reputation/overview/not-connected',
      settle: 1,
      say: "Reputation is where you request, read and reply to reviews. It's included on the Pro plan. Before you connect anything, it looks like this: no reviews yet, and a prompt at the top to connect Google.",
      actions: [
        { at: 0.6, title: 'Reputation', sub: 'Included on the Pro plan', for: 4 },
        { at: 7.4, hover: '#rp_connect_banner' },
        { at: 7.6, highlight: '#rp_connect_banner', label: 'Start here', for: 4 },
      ],
    },
    {
      chapter: 'Why connect Google',
      say: "Why connect? Google reviews are often the first thing new customers see. Once connected, you can reply from Kyntlo, track your rating over time, and send people straight to your review page. Plus, your average rating shows up in your reports, so you can see the effect of every request you send.",
      actions: [
        { at: 0.6, hover: '#rp_sources_setup' },
        { at: 0.8, highlight: '#rp_sources_setup', label: 'Review sources', for: 4.4 },
      ],
    },
    {
      chapter: 'Before you start',
      say: "Before you start, make sure you can sign in to the Google account that manages your business profile, as an owner or a manager. That's the account Kyntlo needs permission from. If someone else, like a web designer, set up your profile, ask them to add you as an owner first.",
      actions: [
        { at: 0.6, title: "You'll need", sub: 'Owner or manager access to your Google Business Profile', for: 6 },
      ],
    },
    {
      chapter: 'Sign in with Google',
      say: "Click Connect Google. Google's sign-in window opens. Choose the account that manages your business.",
      actions: [
        { at: 0.6, click: '#rp_connect_google' },
        { at: 3.0, hover: '#gg_account' },
        { at: 3.2, highlight: '#gg_account', label: 'Your business Google account', for: 2.6 },
        { at: 5.8, click: '#gg_account' },
      ],
    },
    {
      chapter: 'Give permission',
      say: "Google asks you to confirm what Kyntlo can do: see and manage your business listing, and reply to reviews. Click Allow.",
      actions: [
        { at: 0.6, hover: '.gg' },
        { at: 0.8, highlight: '.gg', label: 'What Kyntlo can access', for: 4 },
        { at: 6.4, click: '#gg_allow' },
      ],
    },
    {
      chapter: 'Choose your location',
      say: "Back in Kyntlo, choose your business location. If you have more than one, pick the one that matches this account. Each location should have its own Kyntlo sub-account, so its reviews and reports stay separate. Then click Connect location.",
      actions: [
        { at: 0.6, hover: '#gbp_loc_0' },
        { at: 0.8, highlight: '#gbp_loc_0', label: 'Bloom Dental Studio', for: 3.4 },
        { at: 5.0, hover: '#gbp_loc_1' },
        { at: 9.2, click: '#gbp_loc_0' },
        { at: 10.4, click: '#gbp_save' },
      ],
    },
    {
      chapter: 'Reviews imported',
      say: "That's it! Kyntlo starts importing your reviews straight away. Within a few minutes, your overview fills up with your average rating, your review count and the overall sentiment.",
      actions: [
        { at: 1.0, hover: '#rp_kpis' },
        { at: 1.2, highlight: '#rp_kpis', label: 'Your reviews, in Kyntlo', for: 4.4 },
        { at: 6.0, zoom: '#rp_kpi_rating', scale: 1.7, for: 3.4 },
      ],
    },
    {
      chapter: 'Managing the connection',
      say: "You can manage this connection any time from Settings, under Integrations. That's also where you'd reconnect if you ever lose access to that Google account.",
      actions: [
        { at: 0.8, hover: '#sb_settings' },
        { at: 1.0, highlight: '#sb_settings', label: 'Settings › Integrations', for: 4 },
      ],
    },
    {
      chapter: 'Your review link',
      say: "Next, check your review link. Open Settings here in Reputation, and go to Review link. Choose Google, and this is the link every review request will use.",
      actions: [
        { at: 0.6, click: '#tab_settings' },
        { at: 3.4, hover: '#rs_link_opts' },
        { at: 3.6, highlight: '#rs_link_opts', label: 'Where reviews go', for: 3.6 },
        { at: 7.4, click: '#rs_link_google' },
        { at: 8.0, highlight: '#rs_link_url', label: 'Your review link', for: 2.6 },
      ],
    },
    {
      chapter: 'Your review link',
      say: "Have a Facebook Page too? You can connect it as well, to bring in Facebook recommendations. Then pick whichever platform matters most to your customers as your review link.",
      actions: [
        { at: 0.6, hover: '#rs_link_facebook' },
        { at: 0.8, highlight: '#rs_link_facebook', label: 'Facebook recommendations', for: 3.4 },
        { at: 7.0, hover: '#rs_link_google' },
      ],
    },
    {
      chapter: 'QR code',
      say: "You'll also find a QR code for your review link. Print it for your reception desk, so happy customers can leave a review before they walk out of the door. Then click Save.",
      actions: [
        { at: 0.6, hover: '#rs_qr' },
        { at: 0.8, highlight: '#rs_qr', label: 'Print it for your counter', for: 4 },
        { at: 1.0, zoom: '#rs_qr', scale: 1.6, for: 4 },
        { at: 7.6, click: '#rs_save' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Reply to your *existing* reviews', sub: 'Good and bad. Future customers read your replies.' },
      say: "Here's a pro tip. Once your reviews are in, reply to the recent ones you haven't answered yet, good and bad. Google shows your replies publicly, and future customers notice the businesses that respond.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 11.2', title: 'Requesting reviews *automatically*', sub: 'Ask every happy customer, by text and email.', cta: 'Kyntlo [Academy]' },
      say: "Google is connected! In the next lesson, you'll start asking customers for reviews by text and email, and make it happen automatically after every visit. See you there.",
    },
  ],
};
