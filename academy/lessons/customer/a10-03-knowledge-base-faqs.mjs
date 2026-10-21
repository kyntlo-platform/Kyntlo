// Track A · Module 10 · Lesson 3 — AI knowledge base & FAQs.
// Filmed on the demo workspace (academy/demo-app), screen: AI Agents → Knowledge Base.
export default {
  id: 'A-10.3',
  title: 'Kyntlo Academy 10.3 — AI knowledge base & FAQs',
  description:
    'Teach your AI agents about your business: crawl your website, add FAQs with exact answers, upload documents like price lists, check training status, then test what your chatbot has learned.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'AI chatbot', 'Knowledge base', 'FAQs'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 10 · Lesson 3', title: 'Train your AI with a *knowledge base*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 10 · Lesson 3', title: 'AI *knowledge base* & FAQs', sub: 'Feed your AI your website, documents and FAQs.' },
      say: "Welcome back! Your AI agents are only as good as what they know. In this lesson, we'll build your knowledge base from your website, your documents and your FAQs, so every answer is accurate.",
    },
    {
      chapter: 'Your knowledge base',
      goto: '{demo}#/ai-agents/knowledge-base',
      settle: 1,
      say: "Go to AI Agents, then Knowledge Base. Bloom Dental has one knowledge base, and both the front desk chatbot and the Voice AI receptionist use it. Update it once, and every agent gets smarter.",
      actions: [
        { at: 0.4, title: 'Knowledge Base', sub: 'AI Agents → Knowledge Base', for: 3.6 },
        { at: 4.4, hover: '#kb_summary' },
        { at: 4.6, highlight: '#kb_summary', label: 'Shared by every agent', for: 5 },
        { at: 4.8, zoom: '#kb_summary', scale: 1.4, for: 5 },
      ],
    },
    {
      chapter: 'Sources',
      say: "Everything it knows comes from these sources: the website, a list of frequently asked questions, and an uploaded price list. Each one shows its training status, so you can see what the AI has learned.",
      actions: [
        { at: 0.4, highlight: '#kb_sources', label: 'Sources', for: 3 },
        { at: 3.4, hover: '#kb_src_s1' },
        { at: 5.0, hover: '#kb_src_s2' },
        { at: 6.6, hover: '#kb_src_s3' },
        { at: 9.4, hover: '#kb_src_s1 [data-st]' },
        { at: 9.6, zoom: '#kb_src_s1 [data-st]', scale: 2, for: 3 },
      ],
    },
    {
      chapter: 'Add a source',
      say: "To teach it something new, click Add source. You can crawl web pages, add FAQs, upload files, or type information in as rich text. Let's start with the web crawler.",
      actions: [
        { at: 0.6, click: '#kb_add' },
        { at: 2.4, highlight: '#kb_add_body', label: 'Four kinds of source', for: 5 },
        { at: 2.6, hover: '#kb_type_web' },
        { at: 4.0, hover: '#kb_type_faq' },
        { at: 5.0, hover: '#kb_type_file' },
        { at: 6.0, hover: '#kb_type_text' },
        { at: 8.4, click: '#kb_type_web' },
      ],
    },
    {
      chapter: 'Web crawler',
      say: "Enter the address you want to crawl. Bloom has new blog posts, so we'll add the blog. Then choose how much to crawl: just this page, every page under this path, or the whole domain. All pages under this path is perfect here.",
      actions: [
        { at: 1.4, type: 'bloomdental.co.uk/blog', into: '#kb_url' },
        { at: 4.6, highlight: '#kb_crawl_opts', label: 'How much to crawl', for: 5 },
        { at: 5.0, hover: '#kb_crawl_exact' },
        { at: 6.6, hover: '#kb_crawl_path' },
        { at: 8.2, hover: '#kb_crawl_domain' },
        { at: 11.6, click: '#kb_crawl_path' },
      ],
    },
    {
      chapter: 'Train the pages',
      say: "Click Start crawling. Kyntlo finds every page under the blog. Untick any you don't want the AI to learn from, then click Train selected pages.",
      actions: [
        { at: 0.4, click: '#kb_crawl_start' },
        { at: 2.6, highlight: '#kb_pages', label: 'Pages found', for: 4 },
        { at: 2.8, zoom: '#kb_pages', scale: 1.3, for: 4 },
        { at: 3.0, wait: 1.8 },
        { at: 8.0, click: '#kb_train' },
      ],
    },
    {
      chapter: 'Training status',
      say: "The blog appears in your list, marked Training. After a moment, it switches to Trained. If you change your website later, click the re-train button, so your AI always has the latest information.",
      actions: [
        { at: 0.4, hover: '#kb_src_sw [data-st]' },
        { at: 0.6, highlight: '#kb_src_sw', label: 'Training…', for: 3 },
        { at: 4.4, zoom: '#kb_src_sw', scale: 1.4, for: 3 },
        { at: 9.0, hover: '#kb_src_sw button' },
        { at: 9.2, highlight: '#kb_src_sw button', label: 'Re-train', for: 2.6 },
      ],
    },
    {
      chapter: 'Add an FAQ',
      say: "Next, FAQs. Click Add source, then FAQs. Type the question the way customers ask it: Do you offer payment plans? Then write the answer exactly as you want it given.",
      caption: "Next, FAQs. Click Add source, then FAQs. Type the question the way customers ask it: \"Do you offer payment plans?\" Then write the answer exactly as you want it given.",
      speed: 1,
      actions: [
        { at: 0.6, click: '#kb_add' },
        { at: 2.0, click: '#kb_type_faq' },
        { at: 3.4, type: 'Do you offer payment plans?', into: '#kb_q', delay: 45 },
        { at: 7.6, type: 'Yes! Treatments over £1,000 can be spread over 12 months at 0% interest.', into: '#kb_a', delay: 30 },
      ],
    },
    {
      chapter: 'Why FAQs matter',
      say: "Save it. FAQs are the most reliable source, because the AI uses your answer word for word. Use them for prices, policies and anything you never want the AI to guess.",
      actions: [
        { at: 0.6, click: '#kb_faq_save' },
        { at: 2.6, hover: '#kb_src_s2' },
        { at: 2.8, highlight: '#kb_src_s2', label: 'Exact answers', for: 4 },
        { at: 7.4, title: 'Use FAQs for', sub: 'Prices · policies · anything that must be exact', for: 3.4 },
      ],
    },
    {
      chapter: 'Upload a file',
      say: "Finally, documents. Click Add source, then File upload, and drop in a PDF or Word file. Here's Bloom's whitening aftercare guide. Click Upload and train, and it's added to the knowledge base.",
      actions: [
        { at: 0.6, click: '#kb_add' },
        { at: 2.2, click: '#kb_type_file' },
        { at: 4.2, click: '#kb_drop' },
        { at: 6.2, highlight: '#kb_file', label: 'Aftercare guide', for: 3 },
        { at: 10.6, click: '#kb_upload' },
      ],
    },
    {
      chapter: 'Test what it learned',
      say: "Now let's check that it worked. Open Conversation AI, and the front desk bot. In the test panel, ask about payment plans. The bot answers using the FAQ you just added.",
      actions: [
        { at: 0.6, click: '#tab_conversation-ai' },
        { at: 2.6, click: '#cai_bot_b1' },
        { at: 5.0, type: 'Do you offer payment plans?', into: '#cai_test_input', delay: 40 },
        { at: 7.4, press: 'Enter' },
        { at: 7.6, wait: 1.3 },
        { at: 9.4, hover: '#cai_msgs .ai-b.bot:last-child' },
        { at: 9.6, highlight: '#cai_msgs .ai-b.bot:last-child', label: 'Answer from your FAQ', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Turn missed questions into *FAQs*', sub: 'Check Conversation history every week.' },
      say: "Here's a pro tip. Once a week, read your bot's conversation history. Any question it couldn't answer, or passed to your team, should become a new FAQ. Your AI gets smarter every single week.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 10.4', title: 'Your *Voice AI* receptionist', sub: 'Answer and route calls with AI.', cta: 'Kyntlo [Academy]' },
      say: "Your AI now knows your business inside out. In the next lesson, we'll give it a voice, and set up an AI receptionist that answers your phone. See you there.",
    },
  ],
};
