// Track B · Video 5 — Your AI employee. Conversation AI + Voice AI.
// Plan facts (pricing.html): basic AI chatbot = Growth; advanced chatbot (booking actions), Voice AI and unlimited AI usage = Pro.
export default {
  id: 'B5',
  title: 'Your AI Employee — AI Chatbot & AI Phone Receptionist | Kyntlo',
  description:
    'Meet Conversation AI and Voice AI: a chatbot that answers your messages and books appointments, and an AI receptionist that answers your phone, routes urgent calls and logs every conversation.',
  tags: ['Kyntlo', 'AI chatbot', 'AI receptionist', 'Voice AI', 'Conversation AI', 'AI for small business'],
  thumbnail: { kicker: 'Your AI employee', title: 'Answers chats. *Answers calls.*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Your AI employee', title: 'Meet your *AI employee*', sub: 'Conversation AI + Voice AI, working around the clock.' },
      say: "What if someone answered every message and every phone call, day and night, and booked customers straight into your calendar? Meet your AI employee.",
    },
    {
      chapter: 'Conversation AI',
      goto: '{demo}#/ai-agents/conversation-ai',
      settle: 1,
      say: "It starts with Conversation AI. This chatbot replies to your customers' messages, using what you've taught it about your business. Bloom Dental's front desk bot handles enquiries.",
      actions: [
        { at: 0.4, title: 'Conversation AI', sub: 'An AI chatbot for your messages', for: 3.4 },
        { at: 4.4, highlight: '#cai_bot_b1', label: 'Bloom Front Desk Bot', for: 4 },
        { at: 4.6, zoom: '#cai_bots', scale: 1.4, for: 4.2 },
        { at: 9.6, click: '#cai_bot_b1' },
      ],
    },
    {
      chapter: 'Teach it your business',
      say: "You give it a personality and a goal, in plain English. Then you train it on your website, documents and FAQs, with a knowledge base.",
      actions: [
        { at: 0.4, click: '#cai_t_goals' },
        { at: 1.6, highlight: '#cai_personality', label: 'Who it is', for: 2.4 },
        { at: 4.2, highlight: '#cai_goal', label: 'Its goal', for: 2.2 },
        { at: 6.6, click: '#cai_t_kb' },
        { at: 7.6, highlight: '#cai_kb_card', label: 'Knowledge base', for: 2.4 },
      ],
    },
    {
      chapter: 'It answers questions',
      say: "Let's test it. A customer asks, how much is Invisalign? The bot answers from the price list, and offers a free scan.",
      caption: "Let's test it. A customer asks, \"How much is Invisalign?\" The bot answers from the price list, and offers a free scan.",
      actions: [
        { at: 0.4, highlight: '#cai_test', label: 'Test it yourself', for: 2 },
        { at: 2.6, type: 'How much is Invisalign?', into: '#cai_test_input', delay: 40 },
        { at: 4.2, press: 'Enter' },
        { at: 6.4, zoom: '#cai_msgs', scale: 1.4, for: 2.6 },
      ],
    },
    {
      chapter: 'It books appointments',
      say: "The customer says yes, and asks for Thursday. The bot offers two times, and books the free scan, straight into your calendar.",
      actions: [
        { at: 0.2, type: 'Yes please, can I come in on Thursday?', into: '#cai_test_input', delay: 30 },
        { at: 1.8, press: 'Enter' },
        { at: 4.2, type: '11:30 please', into: '#cai_test_input', delay: 40 },
        { at: 5.0, press: 'Enter' },
        { at: 7.0, highlight: '#cai_msgs .ai-act', label: 'Booked!', for: 2 },
      ],
    },
    {
      chapter: 'Voice AI',
      card: { type: 'chapter', kicker: 'Voice AI', title: 'An AI *receptionist* for your phone', sub: 'Answers calls, books appointments, routes urgent calls.' },
      say: "Now, your phone. Voice AI is a receptionist that answers your calls in a natural voice, whenever you can't.",
    },
    {
      chapter: 'Meet Rosie',
      goto: '{demo}#/ai-agents/voice-ai',
      settle: 1,
      say: "Bloom's voice agent is called Rosie. Up top, you can see the calls she's answered, the appointments she's booked, and the calls she's transferred.",
      actions: [
        { at: 0.4, title: 'Voice AI', sub: 'AI Agents → Voice AI', for: 3 },
        { at: 3.6, highlight: '#vai_stats', label: 'Answered · booked · transferred', for: 4 },
        { at: 3.8, zoom: '#vai_stats', scale: 1.3, for: 4 },
        { at: 8.8, click: '#vai_agent_r1' },
      ],
    },
    {
      chapter: 'What she can do',
      say: "You decide what she can do. Transfer emergencies to the right person, book appointments into your calendar, and send every caller a text afterwards.",
      actions: [
        { at: 0.4, click: '#vai_t_actions' },
        { at: 1.6, highlight: '#vai_transfer_sec', label: 'Call routing', for: 2.8 },
        { at: 4.8, highlight: '#vai_booking_sec', label: 'Books into your calendar', for: 2.4 },
        { at: 7.4, highlight: '#vai_sms_sec', label: 'Text after the call', for: 2 },
      ],
    },
    {
      chapter: 'Every call logged',
      goto: '{demo}#/ai-agents/voice-ai',
      settle: 1,
      say: "And every call is logged, with a summary, a transcript and the recording, so you always know exactly what was said.",
      actions: [
        { at: 0.4, click: '#vai_view_logs' },
        { at: 1.8, highlight: '#vai_log_l1', label: 'Booked by Rosie', for: 2.2 },
        { at: 4.2, click: '#vai_log_l1' },
        { at: 5.4, highlight: '#vai_summary', label: 'Summary', for: 1.6 },
        { at: 7.0, highlight: '#vai_transcript', label: 'Transcript', for: 1.8 },
      ],
    },
    {
      chapter: 'Which plan?',
      card: { type: 'chapter', kicker: 'Which plan?', title: 'AI that *works for you*', sub: 'Basic AI chatbot: Growth · Advanced chatbot, Voice AI & unlimited AI usage: Pro' },
      say: "A basic AI chatbot comes with Growth. The advanced chatbot that books appointments, and Voice AI, come with Pro, which includes unlimited AI usage.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'Your AI employee', title: 'Start your free *14-day trial*', sub: 'No setup fees · Cancel anytime', cta: 'kyntlo.ai/[trial]' },
      say: "Hire an AI employee that never takes a day off. Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
