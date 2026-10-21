// Track A · Module 10 · Lesson 1 — AI overview: what's available on your plan.
// Filmed on the demo workspace (academy/demo-app), screen: AI Agents → Getting Started.
export default {
  id: 'A-10.1',
  title: "Kyntlo Academy 10.1 — AI overview: what's available on your plan",
  description:
    "Meet Kyntlo's AI employees (Conversation AI, Voice AI, Knowledge Base, Content AI, Workflow AI and Reviews AI) and see exactly which ones are included on Starter, Growth and Pro, and what pay-as-you-go AI usage costs.",
  tags: ['Kyntlo', 'Kyntlo Academy', 'AI for business', 'AI chatbot', 'Voice AI', 'Pricing'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 10 · Lesson 1', title: 'AI on *your plan*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 10 · Lesson 1', title: 'AI overview: what\'s on *your plan*', sub: 'Meet your AI employees, and what each plan includes.' },
      say: "Hi, and welcome to Module ten! Kyntlo has a whole team of AI helpers built in. In this first lesson, I'll show you what each one does, and exactly which of them are included on your plan.",
      caption: "Hi, and welcome to Module 10! Kyntlo has a whole team of AI helpers built in. In this first lesson, I'll show you what each one does, and exactly which of them are included on your plan.",
    },
    {
      chapter: 'Where AI lives',
      goto: '{demo}#/dashboard',
      settle: 1,
      say: "All of Kyntlo's AI tools live in one place. In the sidebar, click AI Agents. The Getting Started tab is your home base: an overview of every AI employee in your account.",
      actions: [
        { at: 1.6, hover: '#sb_ai-agents' },
        { at: 1.8, highlight: '#sb_ai-agents', label: 'AI Agents', for: 2.2 },
        { at: 4.2, click: '#sb_ai-agents' },
        { at: 6.0, title: 'AI Agents', sub: 'Your AI employees, in one place', for: 3.5 },
        { at: 8.6, hover: '#tab_getting-started' },
      ],
    },
    {
      chapter: 'Your plan',
      say: "This banner shows your plan. This demo account is on Pro, so every AI agent is unlocked, with unlimited AI usage included. Below it, each card is one AI employee, with a badge for the lowest plan that includes it.",
      actions: [
        { at: 0.4, highlight: '#gs_plan', label: 'Your plan', for: 4.6 },
        { at: 0.6, hover: '#gs_plan' },
        { at: 6.0, highlight: '#gs_cards', label: 'Your AI employees', for: 3.6 },
        { at: 9.8, hover: '#gs_card_conversation .chip' },
        { at: 10.0, zoom: '#gs_card_conversation', scale: 1.6, for: 3 },
      ],
    },
    {
      chapter: 'Conversation AI',
      say: "Conversation AI is your chatbot. It replies to messages on SMS, Facebook, Instagram, WhatsApp and your website chat. It answers questions, and it can even book appointments. It's available from the Growth plan.",
      actions: [
        { at: 0.4, hover: '#gs_card_conversation' },
        { at: 0.6, zoom: '#gs_card_conversation', scale: 1.7, for: 7 },
        { at: 0.8, highlight: '#gs_card_conversation', label: 'Your chatbot', for: 6.6 },
        { at: 10.4, hover: '#gs_card_conversation .chip' },
      ],
    },
    {
      chapter: 'Voice AI & Knowledge Base',
      say: "Voice AI is an AI receptionist that answers your phone. That's a Pro feature. And the Knowledge Base is what all your agents learn from: your website, your FAQs and your documents.",
      actions: [
        { at: 0.4, hover: '#gs_card_voice' },
        { at: 0.6, highlight: '#gs_card_voice', label: 'AI receptionist · Pro', for: 4.4 },
        { at: 5.6, hover: '#gs_card_kb' },
        { at: 5.8, highlight: '#gs_card_kb', label: 'What your AI knows', for: 4.6 },
      ],
    },
    {
      chapter: 'Content, Workflow & Reviews AI',
      say: "Content AI writes emails, social posts and website copy, and creates images. Workflow AI adds smart steps to your automations. And Reviews AI helps you reply to your Google and Facebook reviews. We'll cover that one in Module eleven.",
      caption: "Content AI writes emails, social posts and website copy, and creates images. Workflow AI adds smart steps to your automations. And Reviews AI helps you reply to your Google and Facebook reviews. We'll cover that one in Module 11.",
      actions: [
        { at: 0.4, hover: '#gs_card_content' },
        { at: 0.6, highlight: '#gs_card_content', label: 'Writing & images', for: 3.8 },
        { at: 4.8, hover: '#gs_card_workflow' },
        { at: 5.0, highlight: '#gs_card_workflow', label: 'AI in automations', for: 3.4 },
        { at: 8.8, hover: '#gs_card_reviews' },
        { at: 9.0, highlight: '#gs_card_reviews', label: 'Review replies', for: 4 },
      ],
    },
    {
      chapter: 'Plans compared',
      say: "Now click Plans and usage. This table shows what each plan includes. Starter doesn't include the AI chatbot. Growth adds a basic chatbot for automated replies and FAQs, plus the knowledge base.",
      actions: [
        { at: 0.6, click: '#gs_view_plans' },
        { at: 2.2, highlight: '#gs_plans', label: 'AI by plan', for: 2.8 },
        { at: 5.4, hover: '#gs_row_0' },
        { at: 5.6, zoom: '#gs_row_0', scale: 1.6, for: 6 },
        { at: 9.0, highlight: '#gs_row_1', label: 'Growth: knowledge base', for: 3 },
      ],
    },
    {
      chapter: 'What Pro adds',
      say: "Pro unlocks the advanced chatbot, with multi-step conversations, bookings and actions, plus the Voice AI receptionist. Most importantly, Pro includes unlimited AI usage, so you never pay per message.",
      actions: [
        { at: 0.4, highlight: '#gs_row_0', label: 'Advanced chatbot', for: 3.4 },
        { at: 0.6, hover: '#gs_row_0 td:last-child' },
        { at: 4.2, highlight: '#gs_row_2', label: 'Voice AI', for: 2.8 },
        { at: 4.4, hover: '#gs_row_2 td:last-child' },
        { at: 7.4, hover: '#gs_row_6 td:last-child' },
        { at: 7.6, highlight: '#gs_row_6', label: 'Unlimited AI on Pro', for: 4 },
      ],
    },
    {
      chapter: 'Pay-as-you-go rates',
      say: "On plans without unlimited AI, usage is billed at wholesale cost, with no markup. Conversation AI is four cents per message. And Content AI is eighteen cents per thousand words. AI steps inside workflows come with Pro.",
      caption: "On plans without unlimited AI, usage is billed at wholesale cost, with no markup. Conversation AI is $0.04 per message. And Content AI is $0.18 per 1,000 words. AI steps inside workflows come with Pro.",
      actions: [
        { at: 0.4, hover: '#gs_rates' },
        { at: 0.6, highlight: '#gs_rates', label: 'Wholesale AI rates', for: 4 },
        { at: 5.0, zoom: '#gs_rate_0', scale: 1.8, for: 2.6 },
        { at: 5.2, hover: '#gs_rate_0' },
        { at: 8.0, hover: '#gs_rate_1' },
        { at: 8.2, highlight: '#gs_rate_1', label: 'Per 1,000 words', for: 2.6 },
        { at: 11.4, hover: '#gs_rate_2' },
        { at: 11.6, highlight: '#gs_rate_2', label: 'Workflow AI · Pro plan', for: 2.8 },
      ],
    },
    {
      chapter: 'What it costs in practice',
      say: "So, if your chatbot sends a thousand messages in a month on Growth, that's about forty dollars of AI usage. As you grow, Pro's unlimited AI often works out cheaper. And on a Customized plan, you pick exactly the AI features you need.",
      caption: "So, if your chatbot sends 1,000 messages in a month on Growth, that's about $40 of AI usage. As you grow, Pro's unlimited AI often works out cheaper. And on a Customized plan, you pick exactly the AI features you need.",
      actions: [
        { at: 0.4, hover: '#gs_rate_0' },
        { at: 0.6, title: '1,000 messages × $0.04', sub: '≈ $40 a month on Growth', for: 5 },
        { at: 6.6, hover: '#gs_rates_pro' },
        { at: 6.8, highlight: '#gs_rates_pro', label: 'Unlimited on Pro', for: 3.6 },
        { at: 11.0, hover: '#gs_custom' },
        { at: 11.2, highlight: '#gs_custom', label: 'Customized plan', for: 3 },
      ],
    },
    {
      chapter: 'Your learning path',
      say: "Here's the plan for this module. Next, we'll set up the chatbot, then feed it your knowledge base. After that, we'll build a Voice AI receptionist, write content with AI, and finish with AI inside your workflows.",
      actions: [
        { at: 0.4, click: '#gs_view_overview' },
        { at: 2.6, hover: '#gs_open_conversation' },
        { at: 4.6, hover: '#gs_open_kb' },
        { at: 7.0, hover: '#gs_open_voice' },
        { at: 9.0, hover: '#gs_open_content' },
        { at: 11.0, hover: '#gs_open_workflow' },
        { at: 11.2, highlight: '#gs_card_workflow', label: 'Lesson 10.6', for: 2.6 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Build your *knowledge base* first', sub: 'Every AI agent learns from it.' },
      say: "Here's a pro tip. Build your knowledge base before you switch on any AI agent. Every agent learns from it, so good answers there mean good answers everywhere.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 10.2', title: 'Your *Conversation AI* chatbot', sub: 'Train it, set its mode and hand off to your team.', cta: 'Kyntlo [Academy]' },
      say: "That's your AI toolkit! In the next lesson, we'll set up your Conversation AI chatbot, and teach it to answer questions and book appointments. See you there.",
    },
  ],
};
