// Track A · Module 10 · Lesson 6 — AI inside workflows.
// Filmed on the demo workspace (academy/demo-app): AI Agents → Getting Started → Workflow AI,
// plus the Conversation AI "Trigger a workflow" action. The workflow builder itself is
// taught in the Automation module, so this lesson does not depend on it.
export default {
  id: 'A-10.6',
  title: 'Kyntlo Academy 10.6 — AI inside workflows',
  description:
    'Add AI steps to your automations with Workflow AI: classify incoming messages, summarise conversations into notes, write AI replies, and route complaints to a person. Includes a worked example of AI inbox triage.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Workflow AI', 'Automation', 'AI for business'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 10 · Lesson 6', title: 'AI inside your *workflows*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 10 · Lesson 6', title: 'AI inside *workflows*', sub: 'Classify, summarise and reply automatically.' },
      say: "Welcome to the last lesson of Module ten! So far, your AI agents have talked to customers. Now, we'll put AI inside your automations, so every message is sorted, summarised and answered, without you lifting a finger.",
      caption: "Welcome to the last lesson of Module 10! So far, your AI agents have talked to customers. Now, we'll put AI inside your automations, so every message is sorted, summarised and answered, without you lifting a finger.",
    },
    {
      chapter: 'What is Workflow AI?',
      goto: '{demo}#/ai-agents/getting-started',
      settle: 1,
      say: "In AI Agents, on the Getting Started tab, you'll find Workflow AI. It adds AI steps to the workflows you build in Automation. Think of it as a smart assistant sitting inside every automation. Click Open to see what it can do.",
      actions: [
        { at: 0.6, hover: '#gs_card_workflow' },
        { at: 0.8, highlight: '#gs_card_workflow', label: 'Workflow AI', for: 5 },
        { at: 1.0, zoom: '#gs_card_workflow', scale: 1.6, for: 5 },
        { at: 8.6, click: '#gs_open_workflow' },
      ],
    },
    {
      chapter: 'Classify & summarise',
      say: "There are a few AI actions to know. Classify message sorts a message into categories you choose, like a booking request, a price question or a complaint. You choose the categories, in plain English. Summarise turns a long conversation into a short note for your team.",
      actions: [
        { at: 0.4, highlight: '#gs_wf_actions', label: 'AI actions', for: 2.6 },
        { at: 3.2, hover: '#gs_wf_classify' },
        { at: 3.4, zoom: '#gs_wf_classify', scale: 1.8, for: 5.4 },
        { at: 10.4, hover: '#gs_wf_summarise' },
        { at: 10.6, highlight: '#gs_wf_summarise', label: 'Summarise', for: 3.4 },
      ],
    },
    {
      chapter: 'AI reply & sentiment',
      say: "AI reply writes and sends an answer using your knowledge base, or hands the chat to your Conversation AI bot. And Sentiment tells you if a message is positive, neutral or negative.",
      actions: [
        { at: 0.4, hover: '#gs_wf_reply' },
        { at: 0.6, highlight: '#gs_wf_reply', label: 'AI reply', for: 4.4 },
        { at: 6.4, hover: '#gs_wf_sentiment' },
        { at: 6.6, highlight: '#gs_wf_sentiment', label: 'Sentiment', for: 3.6 },
      ],
    },
    {
      chapter: 'Finding AI actions',
      say: "In the workflow builder, click Add action, and look in the AI section. Each AI step saves its result, so the next steps can use it, and each one is a single Workflow AI execution. AI steps in workflows are part of the Pro plan.",
      caption: "In the workflow builder, click Add action, and look in the AI section. Each AI step saves its result, so the next steps can use it, and each one is a single Workflow AI execution. AI steps in workflows are part of the Pro plan.",
      actions: [
        { at: 0.4, hover: '#gs_wf_where' },
        { at: 0.6, zoom: '#gs_wf_where', scale: 1.7, for: 5 },
        { at: 6.4, title: 'Workflow AI', sub: 'Included on the Pro plan', for: 4.4 },
      ],
    },
    {
      chapter: 'Example: AI inbox triage',
      say: "Here's a real example: AI inbox triage. When a customer replies, AI classifies the message, and saves a summary to their contact. Then an If, Else step sends it down the right branch.",
      caption: "Here's a real example: AI inbox triage. When a customer replies, AI classifies the message, and saves a summary to their contact. Then an If/Else step sends it down the right branch.",
      actions: [
        { at: 0.4, highlight: '#gs_wf_flow', label: 'Example workflow', for: 3 },
        { at: 3.6, hover: '#gs_node_trigger' },
        { at: 5.4, hover: '#gs_node_classify' },
        { at: 5.6, highlight: '#gs_node_classify', label: 'Classify', for: 2.2 },
        { at: 8.0, hover: '#gs_node_summary' },
        { at: 8.2, highlight: '#gs_node_summary', label: 'Summarise', for: 2.2 },
        { at: 10.6, hover: '#gs_node_branches' },
        { at: 10.8, zoom: '#gs_node_branches', scale: 1.5, for: 3 },
      ],
    },
    {
      chapter: 'Test a booking request',
      say: "Let's test it. Grace asks to book a check-up next week. Click Run test, and watch each step light up. AI labels it a booking request, writes a one-line summary, and replies with two available times.",
      actions: [
        { at: 0.4, hover: '#gs_wf_sample0' },
        { at: 0.6, highlight: '#gs_wf_msg', label: "Grace's message", for: 2.8 },
        { at: 3.8, click: '#gs_wf_run' },
        { at: 4.0, wait: 1.5 },
        { at: 5.8, highlight: '#gs_wf_results', label: 'AI results', for: 3.2 },
        { at: 9.4, hover: '#gs_branch0' },
        { at: 9.6, highlight: '#gs_branch0', label: 'Booking branch', for: 2.8 },
      ],
    },
    {
      chapter: 'Test a price question',
      say: "Now a price question about whitening. This time, it goes down the pricing branch, and the AI answers from your knowledge base: whitening is one hundred and ninety-nine pounds, and gentle on sensitive teeth.",
      caption: 'Now a price question about whitening. This time, it goes down the pricing branch, and the AI answers from your knowledge base: whitening is £199, and gentle on sensitive teeth.',
      actions: [
        { at: 0.4, click: '#gs_wf_sample1' },
        { at: 2.4, click: '#gs_wf_run' },
        { at: 2.6, wait: 1.5 },
        { at: 4.6, hover: '#gs_branch1' },
        { at: 4.8, highlight: '#gs_branch1', label: 'Pricing branch', for: 3 },
        { at: 8.4, hover: '#gs_wf_out2' },
        { at: 8.6, zoom: '#gs_wf_out2', scale: 1.6, for: 3.6 },
      ],
    },
    {
      chapter: 'Complaints go to a person',
      say: "And a complaint? AI spots it, but it doesn't reply. Instead, the workflow assigns it to Sarah with a note, so a real person handles it, just as a good receptionist would. Unhappy customers should always hear from a human.",
      actions: [
        { at: 0.4, click: '#gs_wf_sample2' },
        { at: 2.2, click: '#gs_wf_run' },
        { at: 2.4, wait: 1.5 },
        { at: 4.4, hover: '#gs_branch2' },
        { at: 4.6, highlight: '#gs_branch2', label: 'A person handles it', for: 4 },
        { at: 9.4, hover: '#gs_wf_out2' },
        { at: 9.6, highlight: '#gs_wf_out2', label: 'No AI reply', for: 2.6 },
      ],
    },
    {
      chapter: 'Bots can start workflows',
      say: "It works the other way, too. In Conversation AI, a bot can trigger a workflow mid-conversation. Open the bot's Actions, click Add action, and choose Trigger a workflow. For example, to start your new lead follow-up.",
      actions: [
        { at: 0.6, click: '#tab_conversation-ai' },
        { at: 2.2, click: '#cai_bot_b1' },
        { at: 4.4, click: '#cai_t_actions' },
        { at: 6.6, click: '#cai_add_action' },
        { at: 8.4, hover: '#cai_act_workflow' },
        { at: 8.6, highlight: '#cai_act_workflow', label: 'Trigger a workflow', for: 3.4 },
        { at: 12.4, click: '#cai_act_workflow' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Always keep a *human path*', sub: 'Route complaints and negative sentiment to your team.' },
      say: "Here's a pro tip. In every AI workflow, add a branch for complaints or negative sentiment that goes to a real person. And test with your own real messages before you publish it. Start with one simple workflow, like summarising new enquiries, and build from there.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 11', title: 'Reputation: connect *Google Business Profile*', sub: 'Pull every review into Kyntlo.', cta: 'Kyntlo [Academy]' },
      say: "That's Module ten complete! You've met every AI employee in Kyntlo. Next, in Module eleven, we'll look after your reputation, starting by connecting your Google Business Profile. See you there.",
      caption: "That's Module 10 complete! You've met every AI employee in Kyntlo. Next, in Module 11, we'll look after your reputation, starting by connecting your Google Business Profile. See you there.",
    },
  ],
};
