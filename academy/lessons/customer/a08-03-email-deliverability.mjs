// Track A · Module 8 · Lesson 3 — Email deliverability basics.
// Filmed on the demo workspace: Marketing → Emails (statistics, send settings, builder)
// and Settings → Email Services (dedicated domain, DNS records, email verification).
export default {
  id: 'A-8.3',
  title: 'Kyntlo Academy 8.3 — Email deliverability basics',
  description:
    'Get your Kyntlo emails into the inbox, not the spam folder: read your bounce and complaint numbers, set up a dedicated sending domain, turn on email verification, warm up with batches and keep your list healthy.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Email deliverability', 'SPF DKIM DMARC', 'Email marketing'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 8 · Lesson 3', title: 'Land in the *inbox*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 8 · Lesson 3', title: 'Email *deliverability* basics', sub: 'Make sure your emails land in the inbox, not the spam folder.' },
      say: "A great email only works if people actually see it. In this lesson, you'll learn the simple habits and settings that keep your emails in the inbox, and out of the spam folder.",
    },
    {
      chapter: 'What deliverability means',
      goto: '{demo}#/marketing/emails/stats/e1',
      settle: 1,
      say: "Gmail, Outlook and Yahoo decide where your email lands based on your reputation as a sender. Two numbers on your campaign statistics tell you how that reputation is doing: bounces, and spam complaints.",
      actions: [
        { at: 0.4, title: 'Deliverability', sub: 'Inbox or spam folder?', for: 3.6 },
        { at: 7.4, highlight: '#em_st_bounced', label: 'Bounces', for: 3 },
        { at: 10.6, highlight: '#em_st_spam', label: 'Spam complaints', for: 3 },
      ],
    },
    {
      chapter: 'Healthy numbers',
      say: "A bounce is an address that couldn't receive your email. Keep bounces under two percent. A spam complaint is someone clicking report spam. Keep those under one in every thousand emails. This campaign is well inside both.",
      caption: "A bounce is an address that couldn't receive your email. Keep bounces under 2%. A spam complaint is someone clicking 'report spam'. Keep those under 1 in every 1,000 emails. This campaign is well inside both.",
      actions: [
        { at: 0.4, zoom: '.mk-stats', scale: 1.5, for: 12 },
        { at: 0.6, highlight: '#em_st_bounced', label: 'Under 2%', for: 5 },
        { at: 6.4, highlight: '#em_st_spam', label: 'Under 0.1%', for: 5 },
      ],
    },
    {
      chapter: 'Why use your own domain',
      goto: '{demo}#/settings/email-services',
      settle: 1,
      say: "The biggest single improvement is a dedicated sending domain. Without one, your emails go out from a shared domain used by many businesses. With your own, your emails show your name, and your reputation belongs to you alone.",
      actions: [
        { at: 0.4, title: 'Settings → Email Services', sub: 'Dedicated domain', for: 3.6 },
        { at: 4.6, highlight: '#es_empty', label: 'Shared domain today', for: 3.6 },
        { at: 9.0, highlight: '#es_why', label: 'Why your own domain', for: 4 },
      ],
    },
    {
      chapter: 'Add a sending domain',
      say: "Click Add Domain, and enter a subdomain, like mail dot bloom dental dot co dot U K. Using a subdomain keeps your marketing email separate from your everyday mailbox, so it can never affect it.",
      caption: 'Click Add Domain, and enter a subdomain, like mail.bloomdental.co.uk. Using a subdomain keeps your marketing email separate from your everyday mailbox, so it can never affect it.',
      actions: [
        { at: 0.5, click: '#es_add_domain' },
        { at: 2.2, click: '#es_domain_input' },
        { at: 2.5, type: 'mail.bloomdental.co.uk' },
        { at: 6.4, zoom: '.modal', scale: 1.5, for: 4 },
        { at: 10.6, click: '#es_domain_continue' },
      ],
    },
    {
      chapter: 'DNS records explained',
      say: "Kyntlo now gives you a few DNS records to add where you bought your domain. You don't need to understand them, just copy each one across. SPF and DKIM prove the email really came from you, and DMARC tells inbox providers what to do if it didn't.",
      actions: [
        { at: 0.4, highlight: '#es_dns_card', label: 'Copy these to your domain provider', for: 4.4 },
        { at: 5.6, zoom: '#es_dns_card', scale: 1.3, for: 8 },
        { at: 9.6, highlight: '#es_rec_0', label: 'SPF', for: 2.2 },
        { at: 11.8, highlight: '#es_rec_1', label: 'DKIM', for: 2.2 },
        { at: 14.0, highlight: '#es_rec_5', label: 'DMARC', for: 2.4 },
      ],
    },
    {
      chapter: 'Verify the domain',
      say: "Once the records are in, come back and click Verify. Changes can take a few hours to spread, so if it isn't green straight away, try again later. When it says verified, every campaign sends from your own domain.",
      actions: [
        { at: 0.5, click: '#es_verify' },
        { at: 2.6, zoom: '#es_status', scale: 2, for: 4 },
        { at: 2.8, highlight: '#es_status', label: 'Verified', for: 3.8 },
      ],
    },
    {
      chapter: 'Email verification',
      goto: '{demo}#/settings/email-services/verification',
      settle: 0.8,
      say: "Next, turn on email verification. Kyntlo checks each new address before you send, and rechecks it every ninety days. Addresses that fail are skipped, so you stop bouncing off dead inboxes. Each check costs a fraction of a cent.",
      caption: 'Next, turn on email verification. Kyntlo checks each new address before you send, and rechecks it every 90 days. Addresses that fail are skipped, so you stop bouncing off dead inboxes. Each check costs a fraction of a cent.',
      actions: [
        { at: 0.4, highlight: '#es_body', label: 'Email verification', for: 4.6 },
        { at: 5.4, zoom: '#es_body', scale: 1.5, for: 6 },
      ],
    },
    {
      chapter: 'Warm up a new domain',
      goto: '{demo}#/marketing/emails/send/e4',
      settle: 1,
      say: "A brand-new domain has no reputation yet, so warm it up. For your first sends, choose your most engaged contacts, like recent and loyal patients. People who know you open your emails, and that teaches inbox providers to trust you.",
      actions: [
        { at: 0.4, click: '#em_to_tags' },
        { at: 2.6, click: '#em_tag_vip' },
        { at: 4.2, click: '#em_tag_new-patient' },
        { at: 6.4, zoom: '#em_sec_to', scale: 1.4, for: 5 },
        { at: 11.8, highlight: '#em_count', label: 'Start small & engaged', for: 3 },
      ],
    },
    {
      chapter: 'Send in batches',
      say: "Then use Send in batches. Set a small batch, like one hundred, repeating every day. Over two to four weeks, increase the batch size as your opens stay healthy. Slow and steady wins here.",
      caption: 'Then use Send in batches. Set a small batch, like 100, repeating every day. Over 2–4 weeks, increase the batch size as your opens stay healthy. Slow and steady wins here.',
      actions: [
        { at: 0.4, click: '#em_when_batch' },
        { at: 2.4, click: '#em_batch_qty' },
        { at: 2.7, press: 'Control+A' },
        { at: 3.0, type: '100' },
        { at: 3.6, press: 'Tab' },
        { at: 4.4, run: (page) => page.selectOption('#em_batch_unit', 'days') },
        { at: 5.6, zoom: '#em_sec_when', scale: 1.5, for: 5 },
        { at: 6.0, highlight: '#em_batch_info', label: 'One batch a day', for: 4.4 },
      ],
    },
    {
      chapter: 'Write like a human',
      goto: '{demo}#/marketing/emails/builder/e4',
      settle: 1,
      say: "Your content matters too. Keep the unsubscribe link in your footer. It's required, and it's far better than a spam complaint. Avoid shouty capitals and lots of exclamation marks, and balance images with real text.",
      actions: [
        { at: 0.6, click: '#em_c_footer' },
        { at: 2.6, highlight: '#em_c_footer', label: 'Keep the unsubscribe link', for: 4 },
        { at: 7.2, zoom: '#em_props', scale: 1.5, for: 4 },
      ],
    },
    {
      chapter: 'Keep your list clean',
      goto: '{demo}#/marketing/emails/stats/e1',
      settle: 1,
      say: "Finally, keep your list healthy. After each campaign, glance at who bounced and who unsubscribed. And every few months, stop emailing contacts who haven't opened anything in six months. A smaller, engaged list beats a big, silent one.",
      actions: [
        { at: 0.4, scroll: 500, ms: 1000 },
        { at: 1.8, highlight: '#em_st_recipients', label: 'Bounced & unsubscribed', for: 4.4 },
        { at: 7.0, zoom: '#em_st_recipients', scale: 1.3, for: 5 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Never *buy* an email list', sub: 'Bought lists bounce, complain and wreck your reputation fast.' },
      say: "Here's a pro tip. Never buy or borrow an email list. Those people never asked to hear from you, so they bounce and complain, and your reputation can take months to recover. Grow your list with forms and offers instead.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 8.4', title: 'SMS & *WhatsApp* broadcasts', sub: 'Templates, opt-outs and compliance for text marketing.', cta: 'Kyntlo [Academy]' },
      say: "Now your emails are set up to reach the inbox. Next, we'll move to text messages, with SMS and WhatsApp broadcasts, and the rules that keep them compliant. See you there.",
    },
  ],
};
