// Track B · Video 2 — Replace your tool stack. Cost comparison and one invoice.
// Figures come only from the website: "$2,488+/mo of separate tools" (index.html#compare, pricing.html roi band),
// plan prices and the quarterly offer from pricing.html.
export default {
  id: 'B2',
  title: 'Replace a $2,488/mo Tool Stack with One Platform — Kyntlo',
  description:
    'CRM, funnels, website, forms, email, SMS, booking, automation and reviews: see what Kyntlo replaces, what a typical stack of separate tools costs, and how one platform with one invoice compares.',
  tags: ['Kyntlo', 'Software stack', 'CRM pricing', 'All-in-one CRM', 'Small business tools', 'HubSpot alternative'],
  thumbnail: { kicker: 'Do the math', title: 'Replace your *tool stack*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Do the math', title: 'Replace your *tool stack*', sub: 'One platform. One login. One invoice.' },
      say: "How many logins does it take to run your business? A CRM here, a booking app there, an email tool, a text tool, a website builder. Let's add it all up.",
    },
    {
      chapter: 'A typical stack',
      goto: '{site}/index.html#compare',
      setup: [{ run: (p) => p.evaluate(() => document.querySelector('#compare .matrix').scrollIntoView({ block: 'center' })) }],
      settle: 2.5,
      say: "Here's a typical stack. Pipedrive or HubSpot for your CRM. ClickFunnels for funnels. WordPress or Wix for your website. Typeform for forms. Mailchimp for email. And Twilio for text messages.",
      actions: [
        { at: 0.4, title: 'A typical tool stack', sub: 'One app for every job', for: 3 },
        { at: 1.0, highlight: '#compare .matrix-row >> nth=0', label: 'CRM', for: 1.8 },
        { at: 3.0, highlight: '#compare .matrix-row >> nth=1', label: 'Funnels', for: 1.8 },
        { at: 4.9, highlight: '#compare .matrix-row >> nth=2', label: 'Website', for: 1.8 },
        { at: 6.8, highlight: '#compare .matrix-row >> nth=3', label: 'Forms', for: 1.6 },
        { at: 8.4, highlight: '#compare .matrix-row >> nth=4', label: 'Email', for: 1.6 },
        { at: 10.0, highlight: '#compare .matrix-row >> nth=5', label: 'SMS', for: 2 },
      ],
    },
    {
      chapter: 'Nine tools, nine bills',
      say: "Then Calendly for bookings, Zapier to glue it all together, and Birdeye or Podium for reviews. That's nine tools, nine logins, and nine bills.",
      actions: [
        { at: 0.4, highlight: '#compare .matrix-row >> nth=6', label: 'Booking', for: 2 },
        { at: 2.6, highlight: '#compare .matrix-row >> nth=7', label: 'Automation', for: 2 },
        { at: 4.8, highlight: '#compare .matrix-row >> nth=8', label: 'Reviews', for: 2 },
        { at: 7.0, title: '9 tools · 9 logins · 9 bills', sub: "And none of them talk to each other", for: 3 },
      ],
    },
    {
      chapter: 'What it costs',
      say: "Added up, a stack like that can cost two thousand, four hundred and eighty-eight dollars a month, or more. And none of it talks to each other.",
      caption: "Added up, a stack like that can cost $2,488+ a month. And none of it talks to each other.",
      actions: [
        { at: 0.6, highlight: '#compare .matrix-total', label: '$2,488+ every month', for: 4.4 },
        { at: 0.8, zoom: '#compare .matrix-total', scale: 1.5, for: 4.4 },
      ],
    },
    {
      chapter: 'One platform',
      card: { type: 'chapter', kicker: 'With Kyntlo', title: 'One platform. *One invoice.*', sub: 'CRM, funnels, website, forms, email, SMS, booking, automation and reviews.' },
      say: "Kyntlo replaces all nine, with one platform, one login and one invoice. And because it's all connected, your customer data finally lives in one place.",
    },
    {
      chapter: 'One CRM',
      goto: '{demo}#/contacts/detail/c1',
      settle: 1,
      say: "Every customer has one record, with their conversations, appointments and deals, all together.",
      actions: [
        { at: 0.4, title: 'CRM', sub: 'Replaces Pipedrive, Salesforce, HubSpot', for: 3.4 },
        { at: 3.8, zoom: '#view', scale: 1.2, for: 2.4 },
      ],
    },
    {
      chapter: 'Funnels & forms',
      goto: '{demo}#/sites/funnels',
      settle: 1,
      say: "Your funnels, website and forms are built right here, and every lead drops straight into your CRM.",
      actions: [
        { at: 0.4, title: 'Sites', sub: 'Replaces ClickFunnels, Wix, Typeform', for: 3.4 },
        { at: 4.0, zoom: '#view', scale: 1.25, for: 2.6 },
      ],
    },
    {
      chapter: 'No more glue',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "And instead of gluing apps together with Zapier, workflows connect your forms, calendar, emails and texts, natively.",
      actions: [
        { at: 0.4, title: 'Automation', sub: 'Replaces Zapier, Pabbly, Make', for: 3.4 },
        { at: 4.0, highlight: '#wf_table tbody', label: 'Built-in workflows', for: 3 },
      ],
    },
    {
      chapter: 'What Kyntlo costs',
      goto: '{site}/pricing.html',
      setup: [{ run: (p) => p.evaluate(() => document.querySelector('.roi-band').scrollIntoView({ block: 'center' })) }],
      settle: 2,
      say: "So what does Kyntlo cost? Plans start at ninety dollars a month. Choose quarterly billing, and your first three months are half price, from forty-five dollars a month.",
      caption: "So what does Kyntlo cost? Plans start at $90 a month. Choose quarterly billing, and your first 3 months are half price, from $45 a month.",
      actions: [
        { at: 0.6, highlight: '.roi-band', label: 'One platform from $45/mo', for: 4 },
        { at: 0.8, zoom: '.roi-band', scale: 1.3, for: 4 },
        { at: 6.0, title: 'Quarterly billing', sub: '50% off your first 3 months', for: 3.6 },
      ],
    },
    {
      chapter: 'Usage & plans',
      card: { type: 'chapter', kicker: 'No surprises', title: 'Usage at *wholesale cost*', sub: 'Texts, calls, emails and AI at wholesale rates, no markup. Automation & texting from Growth; reviews on Pro.' },
      say: "Texts, calls, emails and AI are pay-as-you-go, at wholesale rates, with no markup. Just pick the plan with the tools you need: automation and texting start on Growth, and reviews come with Pro.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'One platform · One invoice', title: 'Start your free *14-day trial*', sub: 'No setup fees · Cancel anytime', cta: 'kyntlo.ai/[trial]' },
      say: "Stop paying for tools that don't talk to each other. Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
