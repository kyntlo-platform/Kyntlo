// Track A · Module 14 · Lesson 2 — Email services & sending domain.
// Filmed on the demo workspace (academy/demo-app): Settings → Email Services.
export default {
  id: 'A-14.2',
  title: 'Kyntlo Academy 14.2 — Email services & sending domain',
  description:
    'Set up a dedicated sending domain in Kyntlo: add a subdomain, copy the SPF, DKIM, MX, tracking and DMARC records to your DNS provider, verify the domain, and turn on email verification.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Email deliverability', 'SPF', 'DKIM', 'DMARC', 'Settings'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 14 · Lesson 2', title: 'Your own *sending domain*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 14 · Lesson 2', title: 'Email services & *sending domain*', sub: 'Send from your own domain and land in the inbox.' },
      say: "In this lesson, we'll connect your own sending domain, so the emails you send from Kyntlo come from your business, and land in the inbox instead of spam.",
    },
    {
      chapter: 'Why it matters',
      goto: '{demo}#/settings/email-services',
      settle: 1,
      say: "Open Settings, then Email Services. Right now, Bloom's emails go out through a shared Kyntlo domain. That works for testing, but Gmail, Yahoo and Outlook now expect bulk senders to prove who they are. A dedicated domain does exactly that, and keeps your sending reputation yours alone.",
      actions: [
        { at: 0.4, highlight: '#ss_menu_email-services', label: 'Email Services', for: 2.4 },
        { at: 3.4, highlight: '#es_empty', label: 'Shared domain for now', for: 4 },
        { at: 9.4, highlight: '#es_why', label: 'Why your own domain', for: 5 },
        { at: 9.6, zoom: '#es_why', scale: 1.5, for: 5 },
      ],
    },
    {
      chapter: 'Add your domain',
      say: "Click Add Domain. Use a subdomain, like mail dot bloomdental dot co dot U K. It keeps marketing email separate from your everyday mailbox, so if a campaign ever has a bad day, your normal email isn't affected.",
      caption: "Click Add Domain. Use a subdomain, like mail.bloomdental.co.uk. It keeps marketing email separate from your everyday mailbox, so if a campaign ever has a bad day, your normal email isn't affected.",
      actions: [
        { at: 0.4, click: '#es_add_domain' },
        { at: 2.4, type: 'mail.bloomdental.co.uk', into: '#es_domain_input' },
        { at: 5.0, zoom: '.modal', scale: 1.4, for: 6 },
        { at: 11.6, click: '#es_domain_continue' },
      ],
    },
    {
      chapter: 'DNS records',
      say: "Kyntlo now shows the DNS records to add. DNS is the address book for your domain, and you change it wherever you bought the domain, like GoDaddy, Cloudflare or one-two-three Reg. Add each record exactly as shown, using the copy buttons.",
      caption: "Kyntlo now shows the DNS records to add. DNS is the address book for your domain, and you change it wherever you bought the domain, like GoDaddy, Cloudflare or 123 Reg. Add each record exactly as shown, using the copy buttons.",
      actions: [
        { at: 0.4, highlight: '#es_dns_card', label: 'Add these at your domain provider', for: 4.4 },
        { at: 10.4, hover: '#es_rec_0 .btn' },
      ],
    },
    {
      chapter: 'SPF & DKIM',
      say: "The first two are the most important. S P F lists who is allowed to send email for your domain. D K I M adds a digital signature to every email, so inboxes can tell it really came from you and wasn't changed on the way.",
      caption: "The first two are the most important. SPF lists who is allowed to send email for your domain. DKIM adds a digital signature to every email, so inboxes can tell it really came from you and wasn't changed on the way.",
      actions: [
        { at: 0.3, zoom: '#es_rec_0', scale: 1.5, for: 11 },
        { at: 2.4, highlight: '#es_rec_0', label: 'SPF: who can send', for: 3.6 },
        { at: 6.6, highlight: '#es_rec_1', label: 'DKIM: a digital signature', for: 4 },
      ],
    },
    {
      chapter: 'MX, tracking & DMARC',
      say: "The two M X records handle bounces and replies for the subdomain. The C NAME record powers open and click tracking. And D MARC tells inboxes what to do with email that fails these checks. If you don't have a D MARC record yet, add this one too.",
      caption: "The two MX records handle bounces and replies for the subdomain. The CNAME record powers open and click tracking. And DMARC tells inboxes what to do with email that fails these checks. If you don't have a DMARC record yet, add this one too.",
      actions: [
        { at: 0.4, highlight: '#es_rec_2', label: 'MX', for: 2.6 },
        { at: 3.2, highlight: '#es_rec_4', label: 'Tracking', for: 3 },
        { at: 7.2, highlight: '#es_rec_5', label: 'DMARC', for: 4 },
        { at: 7.4, zoom: '#es_rec_5', scale: 1.5, for: 4.4 },
      ],
    },
    {
      chapter: 'Add records automatically',
      say: "Short on time? If your domain is with a supported provider, click Add records automatically, sign in to your provider, and Kyntlo adds them for you.",
      actions: [
        { at: 0.4, hover: '#es_auto' },
        { at: 0.6, highlight: '#es_auto', label: 'The quick way', for: 4 },
      ],
    },
    {
      chapter: 'Verify',
      say: "Once the records are in, click Verify. Changes can take anything from a few minutes to a day or two to spread, so if it doesn't verify straight away, come back later and try again. Here, every record checks out, and the domain is verified.",
      actions: [
        { at: 0.4, click: '#es_verify' },
        { at: 2.0, highlight: '#es_status', label: 'Checking DNS', for: 2.4 },
        { at: 9.4, zoom: '#es_dns_card', scale: 1.2, for: 4 },
        { at: 9.6, highlight: '#es_status', label: 'Verified', for: 3 },
      ],
    },
    {
      chapter: 'Your sending domain',
      say: "Back on Email Services, your new domain is verified and set as the default. From now on, your campaigns, workflows and one-to-one emails all go out from it. If you send very large volumes, a dedicated I P is also available as an add-on.",
      caption: "Back on Email Services, your new domain is verified and set as the default. From now on, your campaigns, workflows and one-to-one emails all go out from it. If you send very large volumes, a dedicated IP is also available as an add-on.",
      actions: [
        { at: 0.3, click: '#es_back' },
        { at: 1.8, highlight: '#es_table', label: 'Verified & default', for: 4 },
        { at: 2.0, zoom: '#es_table', scale: 1.4, for: 4 },
        { at: 11.4, highlight: '.ss-main .grid .grid .card:nth-child(2)', label: 'Dedicated IP add-on', for: 3 },
      ],
    },
    {
      chapter: 'Email verification',
      say: "One more tab: Email Verification. Kyntlo can check new addresses before you send to them, for half a cent each. Invalid addresses are skipped, which protects the reputation you've just built.",
      caption: "One more tab: Email Verification. Kyntlo can check new addresses before you send to them, for $0.005 each. Invalid addresses are skipped, which protects the reputation you've just built.",
      actions: [
        { at: 0.4, click: '#email_tab_verification' },
        { at: 2.0, highlight: '#es_body', label: 'Verify addresses', for: 4 },
        { at: 2.2, zoom: '#es_body', scale: 1.3, for: 5 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Warm up your *new domain*', sub: 'Start with your most engaged contacts.' },
      say: "Here's a pro tip. A brand new domain has no reputation yet. For the first couple of weeks, send to your most engaged contacts first, and grow your volume gradually. Inboxes learn to trust you much faster that way.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 14.3', title: 'Integrations & *App Marketplace*', sub: 'Connect Google, Facebook, Zoom, Stripe and more.', cta: 'Kyntlo [Academy]' },
      say: "Your emails are ready to land in the inbox! Next, we'll connect your other tools with integrations and the App Marketplace. See you there.",
    },
  ],
};
