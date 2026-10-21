// Track A · Module 11 · Lesson 3 — Responding with Reviews AI.
export default {
  id: 'A-11.3',
  title: 'Kyntlo Academy 11.3 — Responding with Reviews AI',
  description:
    'Reply to Google and Facebook reviews from Kyntlo in seconds: set up Reviews AI with your tone and instructions, generate on-brand replies, and handle negative reviews well.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Reputation management', 'Reviews AI', 'Reply to reviews'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 11 · Lesson 3', title: 'Reply with *Reviews AI*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 11 · Lesson 3', title: 'Responding with *Reviews AI*', sub: 'On-brand replies to every review, in seconds.' },
      say: "In this lesson, you'll reply to your reviews in seconds with Reviews AI, Kyntlo's built-in assistant that writes on-brand responses for you to check and post.",
    },
    {
      chapter: 'Why reply',
      goto: '{demo}#/reputation/reviews',
      settle: 1,
      say: "Replying to reviews matters. It thanks happy customers, it shows future customers that you care, and it's your chance to put things right when someone is unhappy. The Reviews tab brings every Google and Facebook review into one list.",
      actions: [
        { at: 0.6, title: 'Reviews', sub: 'Google and Facebook, in one list', for: 4 },
        { at: 8.4, hover: '#rv_0' },
        { at: 8.6, highlight: '#rv_0', label: 'A new review', for: 3.4 },
      ],
    },
    {
      chapter: 'Find unanswered reviews',
      say: "Click Needs reply to see only the reviews you haven't answered yet. We have three waiting.",
      actions: [
        { at: 0.6, click: '#rv_f_needs-reply' },
        { at: 2.4, highlight: '#rv_list', label: '3 to answer', for: 3 },
      ],
    },
    {
      chapter: 'Set up Reviews AI',
      say: "Before we reply, let's teach the AI how we like to sound. Click Reviews AI settings.",
      actions: [
        { at: 0.6, hover: '#rv_ai_banner' },
        { at: 0.8, highlight: '#rv_ai_banner', label: 'Reviews AI', for: 2.4 },
        { at: 3.6, click: '#rv_settings' },
      ],
    },
    {
      chapter: 'Set up Reviews AI',
      say: "First, choose a mode. Suggestive means the AI drafts a reply and you approve it. Auto-pilot means it posts replies for you automatically. Start with Suggestive, so you can see how it writes.",
      actions: [
        { at: 1.2, hover: '#rs_ai_suggestive' },
        { at: 1.4, highlight: '#rs_ai_suggestive', label: 'You approve each reply', for: 3.4 },
        { at: 5.2, hover: '#rs_ai_autopilot' },
        { at: 5.4, highlight: '#rs_ai_autopilot', label: 'Fully automatic', for: 3 },
        { at: 9.4, click: '#rs_ai_suggestive' },
      ],
    },
    {
      chapter: 'Your brand voice',
      say: "Then set the voice. Pick a tone, choose how replies are signed off, and add instructions. For example: mention the treatment, keep it to a few sentences, and for low ratings, apologise and invite them to call. Then save.",
      actions: [
        { at: 1.2, click: '#rs_tone_friendly' },
        { at: 2.6, hover: '#rs_signoff' },
        { at: 2.8, highlight: '#rs_signoff', label: 'Sign-off', for: 2.4 },
        { at: 5.6, hover: '#rs_ai_prompt' },
        { at: 5.8, highlight: '#rs_ai_prompt', label: 'Your instructions', for: 5 },
        { at: 6.0, zoom: '#rs_ai_prompt', scale: 1.4, for: 5 },
        { at: 12.4, click: '#rs_save' },
      ],
    },
    {
      chapter: 'Reply with AI',
      say: "Back on Reviews, click Reply on Emma's five-star review, then Reply with AI. In a couple of seconds, you have a warm, personal reply that mentions her whitening.",
      actions: [
        { at: 0.4, click: '#tab_reviews' },
        { at: 2.4, click: '#rv_reply_0' },
        { at: 4.4, click: '#rv_ai_0' },
        { at: 5.0, wait: 2 },
        { at: 7.4, hover: '#rv_text_0' },
        { at: 7.6, zoom: '#rv_text_0', scale: 1.3, for: 3.6 },
      ],
    },
    {
      chapter: 'Check and post',
      say: "Always read it before you post, and change anything you like. When it sounds like you, click Post reply. It's published on Google under your business name.",
      actions: [
        { at: 0.6, highlight: '#rv_text_0', label: 'Check it first', for: 3 },
        { at: 6.6, click: '#rv_post_0' },
      ],
    },
    {
      chapter: 'Negative reviews',
      say: "Now a harder one. Grace gave three stars because she waited too long. Watch how the AI handles it: it thanks her, apologises without making excuses, and offers a way to talk it through.",
      actions: [
        { at: 0.6, click: '#rv_reply_6' },
        { at: 2.6, click: '#rv_ai_6' },
        { at: 3.2, wait: 2 },
        { at: 6.4, hover: '#rv_text_6' },
        { at: 6.6, highlight: '#rv_text_6', label: 'Calm, kind, helpful', for: 5 },
      ],
    },
    {
      chapter: 'Negative reviews',
      say: "For reviews like this, a real name and a direct phone number turn a complaint into a conversation. The AI already included both, because of our instructions. Click Post reply.",
      actions: [
        { at: 1.0, zoom: '#rv_text_6', scale: 1.3, for: 4.4 },
        { at: 8.0, click: '#rv_post_6' },
      ],
    },
    {
      chapter: 'Auto-pilot',
      say: "Once you trust the replies, you can switch on Auto-pilot for four and five-star reviews, and keep handling lower ratings yourself. On the Pro plan, AI usage is included, so there's no charge per reply.",
      actions: [
        { at: 0.6, hover: '#rv_ai_banner' },
        { at: 0.8, highlight: '#rv_ai_banner', label: 'Change mode any time', for: 4 },
        { at: 8.0, title: 'Reviews AI', sub: 'Unlimited on the Pro plan', for: 3.6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Reply within *two days*', sub: 'A thoughtful answer to a bad review builds trust.' },
      say: "Here's a pro tip. Aim to reply to every review within two days. Quick replies show you're paying attention, and a thoughtful answer to a bad review often wins more trust than a page full of five stars.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 11.4', title: 'Review *widgets*', sub: 'Show your best reviews on your website.', cta: 'Kyntlo [Academy]' },
      say: "That's Reviews AI! In the last lesson of this module, you'll show off your best reviews on your website with a review widget. See you there.",
    },
  ],
};
