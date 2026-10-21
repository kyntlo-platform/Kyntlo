// Track A · Module 14 · Lesson 3 — Integrations & App Marketplace.
// Filmed on the demo workspace (academy/demo-app): Settings → Integrations and the App Marketplace.
export default {
  id: 'A-14.3',
  title: 'Kyntlo Academy 14.3 — Integrations & App Marketplace',
  description:
    'Connect Google, Facebook & Instagram and Zoom from Settings → Integrations, see where Stripe lives, and install extra apps like Slack from the App Marketplace.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Integrations', 'App Marketplace', 'Google Business Profile', 'Zoom'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 14 · Lesson 3', title: 'Integrations & *apps*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 14 · Lesson 3', title: 'Integrations & *App Marketplace*', sub: 'Connect the tools you already use.' },
      say: "In this lesson, we'll connect Kyntlo to the other tools your business uses, like Google, Facebook and Zoom, and add extra features from the App Marketplace.",
    },
    {
      chapter: 'Integrations',
      goto: '{demo}#/settings/integrations',
      settle: 1,
      say: "Open Settings, then Integrations. Each card is an account you can connect. A green Connected label means it's working. Bloom's Facebook and Instagram are already connected, so let's add the rest. Connections are made once for the whole account, so your team doesn't need to repeat them.",
      actions: [
        { at: 0.4, highlight: '#ss_menu_integrations', label: 'Integrations', for: 2.4 },
        { at: 3.2, highlight: '#int_grid', label: 'Your connected accounts', for: 3.6 },
        { at: 7.2, highlight: '#int_facebook', label: 'Already connected', for: 3.4 },
        { at: 7.4, zoom: '#int_facebook', scale: 1.5, for: 3.6 },
      ],
    },
    {
      chapter: 'Google',
      say: "Start with Google. It powers your Google Business Profile reviews and messages, plus Google Ads and Analytics reporting. Click Connect, and choose the Google account that manages your business listing. It must be an owner or manager of the listing, otherwise your location won't appear in the list.",
      actions: [
        { at: 0.4, highlight: '#int_google', label: 'Reviews, messages & ads', for: 4 },
        { at: 7.0, click: '#int_google_connect' },
        { at: 9.4, click: '#int_account' },
      ],
    },
    {
      chapter: 'Google',
      say: "Review what Kyntlo will be able to do, and click Allow. Then choose the business location to connect, and click Connect location. That's it: Google is connected.",
      actions: [
        { at: 0.3, zoom: '.modal', scale: 1.35, for: 4 },
        { at: 3.4, click: '#int_allow' },
        { at: 5.4, highlight: '.modal', label: 'Choose your location', for: 2.8 },
        { at: 8.4, click: '#int_gbp_save' },
        { at: 9.8, highlight: '#int_google', label: 'Connected', for: 2.6 },
      ],
    },
    {
      chapter: 'Zoom',
      say: "If you hold online consultations, connect Zoom. Then, when you set a calendar's meeting location to Zoom, every booking gets its own meeting link automatically, in the confirmation and the reminders.",
      actions: [
        { at: 0.4, click: '#int_zoom_connect' },
        { at: 2.0, click: '#int_account' },
        { at: 4.0, click: '#int_allow' },
        { at: 5.6, highlight: '#int_zoom', label: 'Automatic meeting links', for: 4.4 },
        { at: 5.8, zoom: '#int_zoom', scale: 1.5, for: 4.6 },
      ],
    },
    {
      chapter: 'Manage & disconnect',
      say: "To change what's connected, for example to add another Facebook page, click Manage. And if you ever need to remove access, click Disconnect. Kyntlo stops syncing straight away. If a connection ever stops working, usually after a password change, disconnect and connect again.",
      actions: [
        { at: 0.4, hover: '#int_facebook_manage' },
        { at: 0.6, highlight: '#int_facebook_manage', label: 'Manage', for: 2.4 },
        { at: 3.8, highlight: '#int_facebook [data-dis]', label: 'Disconnect', for: 2.6 },
      ],
    },
    {
      chapter: 'Stripe',
      say: "What about payments? Stripe is connected from Payments, Integrations, so it sits with your invoices and products. We set it up step by step in Module 12, including how to take deposits automatically when patients book online.",
      actions: [
        { at: 0.4, highlight: '#int_stripe', label: 'Lives in Payments', for: 4 },
        { at: 4.6, hover: '#int_stripe_go' },
      ],
    },
    {
      chapter: 'App Marketplace',
      say: "For everything else, there's the App Marketplace. Click Open App Marketplace, or App Marketplace in the main sidebar. Apps add extra features to Kyntlo, from accounting and e-commerce to team chat. Browse by category on the left.",
      actions: [
        { at: 0.4, click: '#int_open_marketplace' },
        { at: 2.4, highlight: '#mk_grid', label: 'Apps for every job', for: 4 },
        { at: 8.6, click: '#mk_cat_accounting' },
        { at: 10.0, highlight: '#mk_grid', label: 'Accounting apps', for: 2.6 },
      ],
    },
    {
      chapter: 'Install an app',
      say: "Bloom's team wants new-lead alerts in Slack. Search for Slack, and click Install. Read what the app will be able to access, then click Allow and Install. Only install apps you trust, because they can read your account data. Most apps then have their own settings page, where you choose things like which Slack channel gets the alerts.",
      actions: [
        { at: 0.3, click: '#mk_cat_all' },
        { at: 1.6, type: 'slack', into: '#mk_search' },
        { at: 4.4, click: '#mk_install_slack' },
        { at: 6.0, zoom: '.modal', scale: 1.35, for: 4 },
        { at: 9.4, click: '#mk_install_confirm' },
      ],
    },
    {
      chapter: 'Installed apps',
      say: "The Installed Apps tab lists everything added to this account, so you can review your apps from time to time, and remove any you no longer use. Some apps charge their own fee, which is always shown before you install.",
      actions: [
        { at: 0.4, click: '#tab_installed' },
        { at: 2.0, highlight: '#mk_grid', label: 'Everything you have installed', for: 4.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Check native features *first*', sub: 'Webhooks and Google Sheets actions often replace Zapier.' },
      say: "Here's a pro tip. Before paying for a connector like Zapier, check what Kyntlo can already do. Workflows can send webhooks and update Google Sheets directly, which often covers it for a fraction of the cost.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 14.4', title: 'Usage, wallet & *billing*', sub: 'Read your usage and understand wholesale rates.', cta: 'Kyntlo [Academy]' },
      say: "Your tools are connected! Next, we'll look at billing: your wallet, your usage, and how wholesale rates work. See you there.",
    },
  ],
};
