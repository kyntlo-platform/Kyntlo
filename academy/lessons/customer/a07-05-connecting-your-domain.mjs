// Track A · Module 7 · Lesson 5 — Connecting your domain.
// Filmed on the demo workspace (academy/demo-app), screen: Sites → Domains.
export default {
  id: 'A-7.5',
  title: 'Kyntlo Academy 7.5 — Connecting your domain',
  description:
    'Put your funnels and websites on your own web address: add a domain or subdomain, create the DNS records at your domain provider, verify them, link the domain to a funnel with a default page, and get free SSL.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Custom domain', 'DNS', 'SSL'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 7 · Lesson 5', title: 'Connect your *domain*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 7 · Lesson 5', title: 'Connecting your *domain*', sub: 'DNS, SSL and default pages, step by step.' },
      say: "Your pages deserve your own web address. In this lesson, you'll connect a domain to Kyntlo, set up the DNS records, and get a free security certificate. It's easier than it sounds.",
    },
    {
      chapter: 'Your domains',
      goto: '{demo}#/sites/domains',
      settle: 1,
      say: "Go to Sites, then Domains. Bloom's main website already runs on bloomdental dot co dot uk. The green padlock means SSL is issued, so the site loads securely over https.",
      caption: "Go to Sites, then Domains. Bloom's main website already runs on bloomdental.co.uk. The green padlock means SSL is issued, so the site loads securely over https.",
      actions: [
        { at: 0.4, highlight: '#dm_table', label: 'Connected domains', for: 3.6 },
        { at: 5.6, highlight: '#dm_row_0', label: 'Live & secure', for: 3.6 },
      ],
    },
    {
      chapter: 'Domain or subdomain?',
      say: "First, a quick decision. A root domain, like your business dot co dot uk, is your main address. A subdomain adds a word in front, like offers dot your business. If your main website lives somewhere else, use a subdomain for Kyntlo, so your existing site keeps working.",
      caption: "First, a quick decision. A root domain, like yourbusiness.co.uk, is your main address. A subdomain adds a word in front, like offers.yourbusiness.co.uk. If your main website lives somewhere else, use a subdomain for Kyntlo, so your existing site keeps working.",
      actions: [
        { at: 0.4, title: 'Root domain', sub: 'yourbusiness.co.uk', for: 4.6 },
        { at: 6.0, title: 'Subdomain', sub: 'offers.yourbusiness.co.uk', for: 5.4 },
      ],
    },
    {
      chapter: 'Add a domain',
      say: "Click Add Domain. If you already own the domain, choose connect a domain you own. You can also buy a new one right here, and Kyntlo sets up the DNS for you.",
      actions: [
        { at: 0.4, click: '#dm_add' },
        { at: 2.2, highlight: '#dm_own', label: 'Already own it', for: 3 },
        { at: 5.8, highlight: '#dm_buy', label: 'Or buy one here', for: 3 },
      ],
    },
    {
      chapter: 'Enter the address',
      say: "Bloom wants a separate address for its ad campaigns, so we'll type offers dot bloomdental dot co dot uk, and click Continue.",
      caption: "Bloom wants a separate address for its ad campaigns, so we'll type offers.bloomdental.co.uk, and click Continue.",
      actions: [
        { at: 0.6, type: 'offers.bloomdental.co.uk', into: '#dm_input', delay: 50 },
        { at: 6.4, click: '#dm_next' },
      ],
    },
    {
      chapter: 'DNS records',
      say: "Now Kyntlo shows the DNS record to create. DNS is simply the address book of the internet. For a subdomain, you need one CNAME record. For a root domain, you'll see an A record, plus a CNAME for www.",
      actions: [
        { at: 0.4, highlight: '#dm_records', label: 'Add this at your provider', for: 4 },
        { at: 0.6, zoom: '#dm_records', scale: 1.5, for: 5 },
        { at: 9.6, highlight: '#dm_rec_0', label: 'CNAME for a subdomain', for: 3 },
      ],
    },
    {
      chapter: 'At your provider',
      say: "In another tab, log in to wherever you bought your domain, like GoDaddy, Namecheap or 123 reg. Open the DNS settings, add the record exactly as shown, and save. Use the copy buttons to avoid typos.",
      caption: 'In another tab, log in to wherever you bought your domain, like GoDaddy, Namecheap or 123-reg. Open the DNS settings, add the record exactly as shown, and save. Use the copy buttons to avoid typos.',
      actions: [
        { at: 0.4, title: 'Your domain provider', sub: 'GoDaddy · Namecheap · 123-reg…', for: 4.6 },
        { at: 8.4, click: '#dm_rec_0 [data-cp]' },
      ],
    },
    {
      chapter: 'Verify',
      say: "Back in Kyntlo, click Verify Records. Changes usually work within minutes, but can take up to a day or two to spread across the internet. If it doesn't verify straight away, just try again later.",
      actions: [
        { at: 0.4, click: '#dm_next' },
        { at: 2.4, highlight: '#dm_verify_state', label: 'Verified', for: 3.4 },
      ],
    },
    {
      chapter: 'Link the domain',
      say: "Now choose what this domain shows. Link it to a funnel, and pick the Invisalign Free Scan Offer. A domain can also point to a website, a blog, or a client portal.",
      actions: [
        { at: 0.4, click: '#dm_next' },
        { at: 2.2, highlight: '#dm_type', label: 'Funnel, website, blog…', for: 3 },
        { at: 5.6, highlight: '#dm_product', label: 'Invisalign Free Scan Offer', for: 3 },
      ],
    },
    {
      chapter: 'Default page',
      say: "The default page is what people see when they type just the domain, with nothing after it. Choose your opt-in step. You can also pick a page to show when someone mistypes a link.",
      actions: [
        { at: 0.4, highlight: '#dm_default', label: 'Shown at the bare domain', for: 4 },
        { at: 6.2, highlight: '#dm_404', label: '404 page', for: 3 },
      ],
    },
    {
      chapter: 'Free SSL',
      say: "Click Add Domain. Kyntlo issues a free SSL certificate automatically. It shows as issuing for a few minutes, then turns green. That padlock tells visitors, and Google, that your page is safe.",
      actions: [
        { at: 0.4, click: '#dm_next' },
        { at: 2.0, highlight: '#dm_row_1', label: 'SSL issuing…', for: 3.6 },
        { at: 6.4, wait: 1.5 },
        { at: 8.2, highlight: '#dm_row_1', label: 'Secure', for: 3 },
      ],
    },
    {
      chapter: 'Your new URL',
      goto: '{demo}#/sites/funnels/f1',
      settle: 1,
      say: "Open the funnel, and every step now lives on the new address. You can change a funnel's domain at any time in its Settings tab.",
      actions: [
        { at: 0.4, highlight: '#fn_step_url', label: 'offers.bloomdental.co.uk', for: 3.6 },
        { at: 4.6, click: '#fn_tab_settings' },
        { at: 5.8, highlight: '#fn_set_domain', label: 'Domain setting', for: 2.4 },
      ],
    },
    {
      chapter: 'URL redirects',
      goto: '{demo}#/sites/domains',
      settle: 1,
      say: "One last feature. If you rename a page, add a URL redirect from the old path to the new one, so old links and Google results still work.",
      actions: [
        { at: 0.4, highlight: '#dm_redirects', label: 'Keep old links working', for: 4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Never delete your *MX records*', sub: 'They deliver your email.' },
      say: "Here's a pro tip. When you're in your DNS settings, only add or change the records Kyntlo asks for. Never delete your MX records, because those deliver your email.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 7.6', title: 'Funnel stats, *A/B tests* & SEO', sub: 'Measure and improve conversion.', cta: 'Kyntlo [Academy]' },
      say: "You're now live on your own domain. Next, we'll read your funnel stats, run an A B test, and set up SEO, so you can keep improving. See you there.",
      caption: "You're now live on your own domain. Next, we'll read your funnel stats, run an A/B test, and set up SEO, so you can keep improving. See you there.",
    },
  ],
};
