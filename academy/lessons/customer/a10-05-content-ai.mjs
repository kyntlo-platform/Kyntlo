// Track A · Module 10 · Lesson 5 — Content AI.
// Filmed on the demo workspace (academy/demo-app), screen: AI Agents → Content AI.
export default {
  id: 'A-10.5',
  title: 'Kyntlo Academy 10.5 — Content AI',
  description:
    'Use Content AI to write emails, social posts, blog posts and website copy in your brand voice, choose the tone and length, send the result straight to your campaigns, and generate images for your posts.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Content AI', 'AI writing', 'Social media'],
  plan: 'ADD-ON',
  thumbnail: { kicker: 'Module 10 · Lesson 5', title: 'Write it with *Content AI*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 10 · Lesson 5', title: 'Writing with *Content AI*', sub: 'Emails, posts, pages and images in seconds.' },
      say: "Welcome back! Staring at a blank page is the slowest part of marketing. In this lesson, you'll use Content AI to write an email and a social post, and create images, in just a few clicks.",
    },
    {
      chapter: 'Where to find it',
      goto: '{demo}#/ai-agents/content-ai',
      settle: 1,
      say: "Go to AI Agents, then Content AI. You'll also see Content AI inside the email builder, the social planner and your blog. On Pro, it's unlimited. On other plans, it's billed at eighteen cents per thousand words, so a typical email costs less than a cent.",
      caption: "Go to AI Agents, then Content AI. You'll also see Content AI inside the email builder, the social planner and your blog. On Pro, it's unlimited. On other plans, it's billed at $0.18 per 1,000 words, so a typical email costs less than a cent.",
      actions: [
        { at: 0.4, title: 'Content AI', sub: 'AI Agents → Content AI', for: 3.6 },
        { at: 9.0, hover: '.page-head .chip' },
        { at: 9.2, highlight: '.page-head .chip', label: 'Unlimited on Pro', for: 4 },
        { at: 9.4, zoom: '.page-head .chip', scale: 2, for: 3.6 },
      ],
    },
    {
      chapter: 'Choose what to write',
      say: "First, choose what you're writing: an email, a social post, a blog post, website copy, or a text message. Bloom wants to email past patients about a whitening offer, so we'll pick Email.",
      actions: [
        { at: 0.4, highlight: '#cnt_types', label: 'What are you writing?', for: 4.6 },
        { at: 0.6, hover: '#cnt_type_social' },
        { at: 2.2, hover: '#cnt_type_blog' },
        { at: 3.4, hover: '#cnt_type_website' },
        { at: 8.4, click: '#cnt_type_email' },
      ],
    },
    {
      chapter: 'Describe it',
      speed: 1,
      say: "Now describe what you want. Be specific: who it's for, the offer, the price, and the deadline. The more detail you give, the better the result.",
      actions: [
        { at: 0.4, type: 'Email to past patients about our £199 whitening offer, ending 31 October', into: '#cnt_prompt', delay: 38 },
        { at: 5.6, zoom: '#cnt_prompt', scale: 1.5, for: 3.4 },
      ],
    },
    {
      chapter: 'Tone & length',
      say: "Pick a tone of voice. Friendly suits Bloom's brand. Then choose a length. Medium is right for most emails. Click Generate.",
      actions: [
        { at: 0.4, hover: '#cnt_tones' },
        { at: 0.6, highlight: '#cnt_tones', label: 'Tone of voice', for: 3 },
        { at: 2.4, click: '#cnt_tone_friendly' },
        { at: 4.6, click: '#cnt_len_medium' },
        { at: 7.4, click: '#cnt_generate' },
      ],
    },
    {
      chapter: 'Your email',
      say: "And there it is, written in seconds: a subject line, a warm opening, the offer, the deadline, and a button. Notice the first name field, so every patient gets a personal greeting.",
      actions: [
        { at: 0.4, wait: 3.6 },
        { at: 4.2, hover: '#cnt_out' },
        { at: 4.4, highlight: '#cnt_result', label: 'Written in seconds', for: 3.4 },
        { at: 8.2, move: [1000, 290] },
        { at: 8.4, zoom: 'cursor', scale: 1.8, for: 3 },
      ],
    },
    {
      chapter: 'Use it',
      say: "Always read it through, and make it sound like you. Not quite right? Click Regenerate for a fresh version. When you're happy, click Use in email campaign to drop it straight into the email builder.",
      actions: [
        { at: 0.6, hover: '#cnt_out' },
        { at: 4.6, hover: '#cnt_regen' },
        { at: 4.8, highlight: '#cnt_regen', label: 'Try another version', for: 2.6 },
        { at: 8.6, hover: '#cnt_use' },
        { at: 8.8, highlight: '#cnt_use', label: 'Send to the email builder', for: 3 },
        { at: 11.6, click: '#cnt_use' },
      ],
    },
    {
      chapter: 'A social post',
      speed: 1,
      say: "Let's try a social post. Choose Social post, describe it, and pick Short, because short posts get read. Click Generate, and you get a post with emojis and hashtags, ready to go.",
      actions: [
        { at: 0.4, click: '#cnt_type_social' },
        { at: 1.6, type: 'Instagram post for our free Invisalign 3D scan', into: '#cnt_prompt', delay: 35 },
        { at: 4.4, click: '#cnt_len_short' },
        { at: 6.2, click: '#cnt_generate' },
        { at: 7.0, wait: 2.6 },
        { at: 9.8, highlight: '#cnt_result', label: 'Ready for Instagram', for: 3 },
      ],
    },
    {
      chapter: 'Send to Social Planner',
      say: "Click Send to Social Planner, and you can schedule it to Instagram and Facebook. We cover the social planner in the marketing module.",
      actions: [
        { at: 0.6, hover: '#cnt_use' },
        { at: 0.8, highlight: '#cnt_use', label: 'Schedule it', for: 3 },
        { at: 3.6, click: '#cnt_use' },
        { at: 4.0, wait: 3.4 },
      ],
    },
    {
      chapter: 'Generate images',
      speed: 1,
      say: "Content AI creates images, too. Open the Image tab, and describe what you need. Choose a style, and a size. Portrait suits Instagram posts.",
      actions: [
        { at: 0.4, click: '#cnt_view_image' },
        { at: 2.2, type: 'A bright, modern dental studio with plants, morning light', into: '#cnt_img_prompt', delay: 30 },
        { at: 5.2, hover: '#cnt_style_photo' },
        { at: 5.4, highlight: '#cnt_style_photo', label: 'Style', for: 2 },
        { at: 7.4, click: '#cnt_ar_45' },
      ],
    },
    {
      chapter: 'Pick your favourite',
      say: "Click Generate, and you get four options. Pick your favourite, then save it to Media Storage, or add it straight to a social post.",
      actions: [
        { at: 0.4, click: '#cnt_img_generate' },
        { at: 0.6, wait: 2.4 },
        { at: 4.4, click: '#cnt_img_1' },
        { at: 5.6, hover: '#cnt_img_save' },
        { at: 5.8, highlight: '#cnt_img_save', label: 'Save it', for: 1.6 },
        { at: 7.0, click: '#cnt_img_save' },
        { at: 7.2, wait: 3.2 },
      ],
    },
    {
      chapter: 'History',
      say: "Finally, the History tab keeps everything you've generated, and where you used it, so you can always find that great subject line again.",
      actions: [
        { at: 0.4, click: '#cnt_view_history' },
        { at: 2.2, highlight: '#cnt_history', label: 'Everything you generated', for: 4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Give it the *details*', sub: 'Audience · offer · price · deadline.' },
      say: "Here's a pro tip. AI writes best when you give it the details. Always include who it's for, the offer, the price and the deadline. And only use AI images that honestly represent your business.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 10.6', title: 'AI inside *workflows*', sub: 'Classify, summarise and reply automatically.', cta: 'Kyntlo [Academy]' },
      say: "You're writing faster than ever! In the final lesson of this module, we'll put AI inside your automations, to sort, summarise and reply to messages for you. See you there.",
    },
  ],
};
