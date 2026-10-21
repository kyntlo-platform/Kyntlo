// Track B · Video 7 — Five-star reviews on repeat. Reputation automation.
// Plan facts (pricing.html): Reputation Manager = Pro; Pro includes unlimited AI usage.
export default {
  id: 'B7',
  title: 'Five-Star Reviews on Repeat — Automatic Review Requests & AI Replies | Kyntlo',
  description:
    'Ask every customer for a review automatically after their visit, track who reviewed, reply in seconds with Reviews AI, and show your best reviews on your website.',
  tags: ['Kyntlo', 'Google reviews', 'Review management', 'Reputation management', 'Review requests'],
  thumbnail: { kicker: '5-star reviews on repeat', title: 'More reviews, *on autopilot*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: '5-star reviews on repeat', title: 'Five-star reviews, *on repeat*', sub: 'Ask every customer. Reply in seconds.' },
      say: "More five-star reviews means more customers choosing you. The secret isn't luck. It's asking every happy customer, every time. And Kyntlo does the asking for you.",
    },
    {
      chapter: 'Your reputation',
      goto: '{demo}#/reputation/overview',
      settle: 1,
      say: "This is Reputation: your rating, your reviews and your review requests, in one place. Here, more than three hundred requests turned into a hundred and twenty-seven reviews.",
      caption: "This is Reputation: your rating, your reviews and your review requests, in one place. Here, more than 300 requests turned into 127 reviews.",
      actions: [
        { at: 0.4, title: 'Reputation', sub: 'Reviews on autopilot · Pro', for: 3.4 },
        { at: 4.0, highlight: '#rp_kpi_rating', label: 'Average rating', for: 2.4 },
        { at: 6.8, highlight: '#rp_kpi_invites', label: 'Requests sent', for: 2.4 },
        { at: 9.4, highlight: '#rp_kpi_reviews', label: 'Reviews received', for: 2.6 },
      ],
    },
    {
      chapter: 'Ask automatically',
      goto: '{demo}#/automation/workflows/w4',
      settle: 1,
      say: "It's powered by a simple workflow. When an appointment is marked as showed, Kyntlo waits two hours, then sends a review request, while the experience is still fresh.",
      caption: "It's powered by a simple workflow. When an appointment is marked as showed, Kyntlo waits 2 hours, then sends a review request, while the experience is still fresh.",
      actions: [
        { at: 0.4, title: 'Review Request After Visit', sub: 'A workflow that runs by itself', for: 3.2 },
        { at: 3.6, highlight: '#wf_trigger_0', label: 'Status: Showed', for: 2.6 },
        { at: 6.4, highlight: '#wf_node_s1', label: 'Wait 2 hours', for: 2.2 },
        { at: 8.8, highlight: '#wf_node_s2', label: 'Send Review Request', for: 2.6 },
      ],
    },
    {
      chapter: 'Track every request',
      goto: '{demo}#/reputation/requests',
      settle: 1,
      say: "Then track every request: delivered, clicked, and reviewed. And if someone doesn't click, Kyntlo can send a gentle reminder.",
      actions: [
        { at: 0.6, highlight: '#rq_row_4 td:last-child', label: 'Delivered', for: 2 },
        { at: 2.8, highlight: '#rq_row_3 td:last-child', label: 'Clicked', for: 2 },
        { at: 5.0, highlight: '#rq_row_1 td:last-child', label: 'Reviewed', for: 2 },
        { at: 5.2, zoom: '#rq_table', scale: 1.3, for: 2.6 },
      ],
    },
    {
      chapter: 'Reply with AI',
      goto: '{demo}#/reputation/reviews',
      settle: 1,
      say: "When reviews come in, Reviews AI writes a warm, personal reply in seconds. Check it, tweak it if you like, and post it.",
      actions: [
        { at: 0.4, title: 'Reviews AI', sub: 'On-brand replies in seconds', for: 3 },
        { at: 2.0, click: '#rv_reply_0' },
        { at: 3.2, click: '#rv_ai_0' },
        { at: 5.0, zoom: '#rv_text_0', scale: 1.3, for: 3 },
        { at: 8.0, click: '#rv_post_0' },
      ],
    },
    {
      chapter: 'Show them off',
      goto: '{demo}#/reputation/widgets',
      settle: 1,
      say: "Then show off your best reviews on your website, with a review widget that updates by itself.",
      actions: [
        { at: 0.4, title: 'Review widgets', sub: 'Your best reviews, on your website', for: 3.2 },
        { at: 3.6, highlight: '#wg_table', label: 'Your widgets', for: 2.6 },
      ],
    },
    {
      chapter: 'Which plan?',
      card: { type: 'chapter', kicker: 'Which plan?', title: 'Reputation Manager is part of *Pro*', sub: 'Review requests, AI replies and widgets · Pro includes unlimited AI usage' },
      say: "The Reputation Manager is included on the Pro plan, and Pro comes with unlimited AI usage too.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: '5-star reviews on repeat', title: 'Start your free *14-day trial*', sub: 'No setup fees · Cancel anytime', cta: 'kyntlo.ai/[trial]' },
      say: "Turn happy customers into five-star reviews. Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
