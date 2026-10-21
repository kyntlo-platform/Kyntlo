// Track A · Module 11 · Lesson 2 — Requesting reviews automatically.
export default {
  id: 'A-11.2',
  title: 'Kyntlo Academy 11.2 — Requesting reviews automatically',
  description:
    'Send review requests by SMS and email, track who clicked and who reviewed, and set Kyntlo to ask every customer automatically with smart follow-ups.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Reputation management', 'Review requests', 'Google reviews'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 11 · Lesson 2', title: 'Get more *reviews*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 11 · Lesson 2', title: 'Requesting reviews *automatically*', sub: 'Ask every happy customer, every time.' },
      say: "In this lesson, you'll ask customers for reviews by text and email, one at a time or completely automatically, and track who has actually left one. More reviews mean more trust, and better visibility on Google.",
    },
    {
      chapter: 'Why ask',
      goto: '{demo}#/reputation/overview',
      settle: 1,
      say: "The businesses with the most reviews aren't luckier. They simply ask every happy customer, every time. Here, more than three hundred requests turned into a hundred and twenty-seven reviews.",
      caption: "The businesses with the most reviews aren't luckier. They simply ask every happy customer, every time. Here, more than 300 requests turned into 127 reviews.",
      actions: [
        { at: 0.6, title: 'Review requests', sub: 'Ask, and you shall receive', for: 4 },
        { at: 5.6, hover: '#rp_kpi_invites' },
        { at: 5.8, highlight: '#rp_kpi_invites', label: 'Requests sent', for: 2.6 },
        { at: 8.6, highlight: '#rp_trends', label: 'Requests → reviews', for: 3.4 },
      ],
    },
    {
      chapter: 'Send a request',
      say: "Let's send one by hand first. Click Send Review Request, then search for the contact. Mia Harris has just finished her whitening session, so let's select her. The best time to ask is while the experience is fresh.",
      actions: [
        { at: 0.6, click: '#rp_send' },
        { at: 4.2, type: 'Mia', into: '#rq_search' },
        { at: 7.4, click: '#rq_pick_c13' },
        { at: 8.0, highlight: '#rq_selected', label: 'Mia Harris', for: 2.4 },
      ],
    },
    {
      chapter: 'SMS or email',
      say: "Choose SMS or email. Text messages usually get the most reviews, because people read them within minutes. Email works well for customers who prefer it, or when you don't have a mobile number. The preview shows exactly what Mia will receive, with her name and your review link filled in.",
      actions: [
        { at: 0.6, hover: '#rq_sms' },
        { at: 0.8, highlight: '.rp-seg', label: 'SMS or email', for: 3 },
        { at: 4.4, click: '#rq_email' },
        { at: 6.6, click: '#rq_sms' },
        { at: 7.4, hover: '#rq_preview' },
        { at: 7.6, highlight: '#rq_preview', label: 'What Mia receives', for: 4 },
        { at: 7.8, zoom: '#rq_preview', scale: 1.5, for: 4 },
      ],
    },
    {
      chapter: 'Send a request',
      say: "Click Send. The request is on its way, and it appears at the top of the Requests tab.",
      actions: [
        { at: 0.4, click: '#rq_send' },
        { at: 2.4, hover: '#rq_row_0' },
        { at: 2.6, highlight: '#rq_row_0', label: 'Sent', for: 3 },
      ],
    },
    {
      chapter: 'Tracking requests',
      say: "Here you can follow every request. Delivered means it arrived. Clicked means they opened your review link. And Reviewed means they left a review. Together, these tell you how well your asking is working. If lots of people click but few review, try a shorter message, or a different time of day.",
      actions: [
        { at: 0.6, hover: '#rq_row_3' },
        { at: 0.8, highlight: '#rq_row_4 td:last-child', label: 'Delivered', for: 2.4 },
        { at: 3.6, highlight: '#rq_row_3 td:last-child', label: 'Clicked', for: 2.4 },
        { at: 6.6, highlight: '#rq_row_1 td:last-child', label: 'Reviewed', for: 2.4 },
        { at: 9.6, zoom: '.rp-kpi', scale: 1.4, for: 2 },
      ],
    },
    {
      chapter: 'Automatic requests',
      say: "Sending by hand works, but the real win is automation. Most of these requests came from a workflow called Review Request After Visit. It sends a request by itself whenever an appointment is marked as showed. You'll build workflows like this in module nine. Once it's on, every customer is asked, every time, without anyone on your team having to remember.",
      caption: "Sending by hand works, but the real win is automation. Most of these requests came from a workflow called Review Request After Visit. It sends a request automatically whenever an appointment is marked as showed. You'll build workflows like this in module 9.",
      actions: [
        { at: 4.4, hover: '#rq_row_2 td:nth-child(3)' },
        { at: 4.6, highlight: '#rq_row_2 td:nth-child(3)', label: 'Sent by a workflow', for: 5 },
      ],
    },
    {
      chapter: 'Timing & follow-ups',
      say: "Now let's fine-tune when requests go out. Open the Settings tab, and choose Review requests.",
      actions: [
        { at: 0.6, click: '#tab_settings' },
        { at: 2.6, click: '#rs_nav_requests' },
      ],
    },
    {
      chapter: 'Timing & follow-ups',
      say: "For SMS, choose Custom. Send the request two hours after the visit, while the experience is still fresh. If they don't click, Kyntlo reminds them every three days, up to two more times, and stops as soon as they click.",
      caption: "For SMS, choose Custom. Send the request 2 hours after the visit, while the experience is still fresh. If they don't click, Kyntlo reminds them every 3 days, up to 2 more times, and stops as soon as they click.",
      actions: [
        { at: 0.6, click: '#rs_sms_custom' },
        { at: 1.4, highlight: '#rs_sms_custom', label: 'Custom timing', for: 3 },
        { at: 4.6, zoom: '#rs_sms_custom', scale: 1.4, for: 7 },
      ],
    },
    {
      chapter: 'The message',
      say: "You can edit the message too. Keep it short, warm and personal, and always keep the review link placeholder in it. Use the customer's first name, and mention your business, so it never feels like spam. Then click Save.",
      actions: [
        { at: 0.6, hover: '#rs_sms_tpl' },
        { at: 0.8, highlight: '#rs_sms_tpl', label: 'Your SMS', for: 4 },
        { at: 6.4, click: '#rs_save' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Ask at the moment of *delight*', sub: 'Right after the result, not weeks later.' },
      say: "Here's a pro tip. Time your requests for the moment customers are happiest. For a dentist, that's right after a whitening session, or the day the braces come off. For you, it might be delivery day, or the end of a project. Set your workflow's trigger to match that moment.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 11.3', title: 'Responding with *Reviews AI*', sub: 'On-brand replies in seconds.', cta: 'Kyntlo [Academy]' },
      say: "Now the reviews will start rolling in. In the next lesson, you'll reply to them in seconds with Reviews AI. See you there.",
    },
  ],
};
