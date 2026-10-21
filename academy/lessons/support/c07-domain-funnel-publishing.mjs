// Track C · Support Playbook C7 — Domain & funnel publishing issues.
// Four stages: DNS → verify → link (default page, 404 page) → SSL. Then 404s on paths,
// URL redirects, and not breaking a site hosted elsewhere. Screens: Sites → Domains, funnel f1.
export default {
  id: 'C-7',
  title: 'Kyntlo Academy Support C7 — Domain & funnel publishing issues',
  description:
    "Internal support playbook. Why a customer's page won't load, shows as not secure, or returns a 404: DNS records and conflicts, verification, linking and default pages, SSL issuing, paths, URL redirects, and how to avoid breaking a website hosted elsewhere.",
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'Custom domain', 'DNS', 'SSL', 'Funnels', 'HighLevel'],
  thumbnail: { kicker: 'Support Playbook C7', title: 'Domain & *funnel* publishing' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C7', title: 'Domain & *funnel publishing*', sub: 'DNS, SSL and 404s.' },
      say: "Domain tickets usually arrive as: my page won't load, it says not secure, or I get a four oh four. In this playbook, you'll learn how a domain connects to Kyntlo, and how to trace each of those problems to its cause.",
      caption: "Domain tickets usually arrive as: my page won't load, it says not secure, or I get a 404. In this playbook, you'll learn how a domain connects to Kyntlo, and how to trace each of those problems to its cause.",
    },
    {
      chapter: 'How it works',
      card: { type: 'chapter', kicker: 'How it works', title: 'DNS → *verify* → link → SSL', sub: "The customer's DNS points the domain at Kyntlo. Kyntlo verifies it, serves the funnel or website, and issues the certificate." },
      say: "A domain goes live in four stages. The customer adds DNS records at their domain provider, pointing the domain at Kyntlo. Kyntlo verifies them. The domain is linked to a funnel or website. Then a free S S L certificate is issued automatically. Find which stage failed, and you've found the problem.",
      caption: "A domain goes live in four stages. The customer adds DNS records at their domain provider, pointing the domain at Kyntlo. Kyntlo verifies them. The domain is linked to a funnel or website. Then a free SSL certificate is issued automatically. Find which stage failed, and you've found the problem.",
    },
    {
      chapter: 'Start at Domains',
      goto: '{demo}#/sites/domains',
      settle: 1.5,
      say: "Domains live under Sites, Domains. Each row shows what the domain is linked to, its default page, the S S L status and the connection status. Bloom's main domain is connected and secure. Start every domain ticket here, and ask the customer for the exact address they typed.",
      caption: "Domains live under Sites → Domains. Each row shows what the domain is linked to, its default page, the SSL status and the connection status. Bloom's main domain is connected and secure. Start every domain ticket here, and ask the customer for the exact address they typed.",
      actions: [
        { at: 0.5, highlight: '#tab_domains', label: 'Sites → Domains', for: 2.6 },
        { at: 3.4, highlight: '#dm_table', label: 'Linked to · default page · SSL · status', for: 5 },
        { at: 3.6, zoom: '#dm_table', scale: 1.35, for: 6 },
        { at: 10.4, highlight: '#dm_row_0', label: 'Connected & secure', for: 3.4 },
      ],
    },
    {
      chapter: 'The DNS records',
      say: "Most problems are DNS. When a domain is added, Kyntlo shows exactly which records are needed. A subdomain, like offers dot bloomdental dot co dot uk, needs one C NAME record. A root domain needs an A record, plus a C NAME for www.",
      caption: "Most problems are DNS. When a domain is added, Kyntlo shows exactly which records are needed. A subdomain, like offers.bloomdental.co.uk, needs one CNAME record. A root domain needs an A record, plus a CNAME for www.",
      actions: [
        { at: 0.4, click: '#dm_add' },
        { at: 1.8, type: 'offers.bloomdental.co.uk', into: '#dm_input', delay: 40 },
        { at: 5.6, click: '#dm_next' },
        { at: 7.0, highlight: '#dm_records', label: 'One CNAME for a subdomain', for: 5 },
        { at: 7.2, zoom: '#dm_records', scale: 1.5, for: 6 },
      ],
    },
    {
      chapter: 'Common DNS mistakes',
      say: "Watch for three mistakes. The full domain typed into the host field, so the record ends up on the wrong name. An old A or C NAME record left on the same host, which conflicts. Or the domain is proxied, for example by Cloudflare with the orange cloud on, which can stop verification and certificates. Set it to D N S only. Ask for a screenshot of their DNS settings, and compare it line by line.",
      caption: "Watch for three mistakes. The full domain typed into the host field, so the record ends up on the wrong name. An old A or CNAME record left on the same host, which conflicts. Or the domain is proxied, for example by Cloudflare with the orange cloud on, which can stop verification and certificates. Set it to DNS only. Ask for a screenshot of their DNS settings, and compare it line by line.",
      actions: [
        { at: 0.4, zoom: '#dm_records', scale: 1.6, for: 10 },
        { at: 2.6, highlight: '#dm_rec_0 td:nth-child(2)', label: 'Host: just "offers"', for: 4 },
        { at: 7.6, highlight: '#dm_rec_0', label: 'No other A or CNAME here', for: 4 },
        { at: 13.0, title: 'Proxy off', sub: 'Cloudflare: DNS only', for: 5 },
      ],
    },
    {
      chapter: 'Verify',
      say: "Then verify. DNS changes often work within minutes, but can take up to forty-eight hours to spread. If verification fails straight after a change, wait and retry before you dig deeper. A public DNS lookup tool shows what the internet currently sees, which is often different from what the customer just typed.",
      caption: "Then verify. DNS changes often work within minutes, but can take up to 48 hours to spread. If verification fails straight after a change, wait and retry before you dig deeper. A public DNS lookup tool shows what the internet currently sees, which is often different from what the customer just typed.",
      actions: [
        { at: 0.4, click: '#dm_next' },
        { at: 2.0, highlight: '#dm_verify_state', label: 'Verified', for: 4 },
      ],
    },
    {
      chapter: 'Default page & 404 page',
      say: "Once verified, the domain is linked to a funnel or website. Two settings here explain many four oh fours. The default page is what shows at the bare domain, with nothing after the slash. The four oh four page is what shows when a path doesn't exist. If the bare domain shows an error, check that a default page is set.",
      caption: "Once verified, the domain is linked to a funnel or website. Two settings here explain many 404s. The default page is what shows at the bare domain, with nothing after the slash. The 404 page is what shows when a path doesn't exist. If the bare domain shows an error, check that a default page is set.",
      actions: [
        { at: 0.4, click: '#dm_next' },
        { at: 2.0, highlight: '#dm_type', label: 'Funnel or website', for: 3.4 },
        { at: 7.8, highlight: '#dm_default', label: 'Shown at the bare domain', for: 4.4 },
        { at: 13.0, highlight: '#dm_404', label: '404 page', for: 4 },
      ],
    },
    {
      chapter: 'SSL & "not secure"',
      say: "After linking, Kyntlo issues a free S S L certificate. While it's issuing, visitors may see a not secure warning, which normally clears on its own once the certificate is issued. If it doesn't, the cause is almost always DNS: a conflicting record, a proxy, or records pointing somewhere else. A certificate can only be issued when the domain points at Kyntlo.",
      caption: "After linking, Kyntlo issues a free SSL certificate. While it's issuing, visitors may see a \"not secure\" warning, which normally clears on its own once the certificate is issued. If it doesn't, the cause is almost always DNS: a conflicting record, a proxy, or records pointing somewhere else. A certificate can only be issued when the domain points at Kyntlo.",
      actions: [
        { at: 0.4, click: '#dm_next' },
        { at: 2.0, highlight: '#dm_row_1', label: 'SSL issuing…', for: 3.6 },
        { at: 8.0, highlight: '#dm_row_1', label: 'Secure', for: 4 },
      ],
    },
    {
      chapter: '404 on a page that exists',
      goto: '{demo}#/sites/funnels/f1',
      settle: 1.5,
      say: "Now a four oh four on a page that should exist. Open the funnel and check the step's path. The address must match exactly, including everything after the slash. Check the latest changes are saved and published, and that this funnel is the one linked to the domain. A renamed page, or a path changed after links were shared, is the most common cause.",
      caption: "Now a 404 on a page that should exist. Open the funnel and check the step's path. The address must match exactly, including everything after the slash. Check the latest changes are saved and published, and that this funnel is the one linked to the domain. A renamed page, or a path changed after links were shared, is the most common cause.",
      actions: [
        { at: 0.5, highlight: '#fn_step_url', label: 'Exact path', for: 4.4 },
        { at: 0.7, zoom: '#fn_step_url', scale: 1.6, for: 5 },
        { at: 13.0, click: '#fn_tab_settings' },
        { at: 14.4, highlight: '#fn_set_domain', label: 'Linked domain', for: 4 },
      ],
    },
    {
      chapter: 'URL redirects',
      goto: '{demo}#/sites/domains',
      settle: 1.5,
      say: "When paths change, use URL redirects. They send old links to the new page, so ads, emails and QR codes keep working. A three oh one redirect is permanent. Suggest one to any customer who has renamed a page that was already shared.",
      caption: "When paths change, use URL redirects. They send old links to the new page, so ads, emails and QR codes keep working. A 301 redirect is permanent. Suggest one to any customer who has renamed a page that was already shared.",
      actions: [
        { at: 0.5, highlight: '#dm_redirects', label: 'Old link → new page', for: 5 },
        { at: 0.7, zoom: '#dm_redirects', scale: 1.4, for: 6 },
      ],
    },
    {
      chapter: "Don't break their website",
      card: { type: 'chapter', kicker: 'Be careful', title: "Don't break *their website*", sub: 'Main site hosted elsewhere? Use a subdomain · Never touch MX records · Note old values before changing anything' },
      say: "One warning. If the customer's main website is hosted somewhere else, never point the root domain at Kyntlo, or their existing site will go offline. Use a subdomain instead. Never change M X records, or their email can stop. And before any DNS change, have the customer note down the old values, so it can be put back.",
      caption: "One warning. If the customer's main website is hosted somewhere else, never point the root domain at Kyntlo, or their existing site will go offline. Use a subdomain instead. Never change MX records, or their email can stop. And before any DNS change, have the customer note down the old values, so it can be put back.",
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: "Page *won't load*", sub: 'Exact URL · DNS records & conflicts · Proxy off · Verified · Linked & default page · SSL issued · Path & redirects' },
      say: "Here's the order. Get the exact address. Check the DNS records and conflicts. Turn any proxy off. Confirm it's verified. Check it's linked, with a default page. Check S S L is issued. Then check the path, and add redirects where needed. If DNS is correct and verified, but S S L won't issue after a day, escalate with the domain and a screenshot of the DNS records.",
      caption: "Here's the order. Get the exact address. Check the DNS records and conflicts. Turn any proxy off. Confirm it's verified. Check it's linked, with a default page. Check SSL is issued. Then check the path, and add redirects where needed. If DNS is correct and verified, but SSL won't issue after a day, escalate with the domain and a screenshot of the DNS records.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Playbook C8', title: 'Billing, usage & *wallet*', sub: 'Explaining wholesale usage charges.', cta: 'Kyntlo [Academy]' },
      say: "That's domains and publishing. In the next playbook, we'll explain billing, usage and the wallet.",
    },
  ],
};
