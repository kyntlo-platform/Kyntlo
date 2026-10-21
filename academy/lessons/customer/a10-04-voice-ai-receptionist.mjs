// Track A · Module 10 · Lesson 4 — Voice AI receptionist (Pro).
// Filmed on the demo workspace (academy/demo-app), screen: AI Agents → Voice AI.
export default {
  id: 'A-10.4',
  title: 'Kyntlo Academy 10.4 — Voice AI receptionist',
  description:
    'Set up a Voice AI receptionist that answers your phone: pick a voice, write the greeting and goals, set working hours, route calls to your team, book appointments, send a text after every call, and review call logs with summaries and transcripts.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Voice AI', 'AI receptionist', 'Phone answering'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 10 · Lesson 4', title: 'Your *AI receptionist*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 10 · Lesson 4', title: 'Your *Voice AI* receptionist', sub: 'Answer, book and route calls with AI.' },
      say: "Welcome back! Missed calls are missed customers. In this lesson, we'll set up a Voice AI receptionist that answers your phone, books appointments, and puts urgent calls straight through to your team.",
    },
    {
      chapter: 'Voice AI agents',
      goto: '{demo}#/ai-agents/voice-ai',
      settle: 1,
      say: "Go to AI Agents, then Voice AI. Voice AI is included on the Pro plan. At the top, you can see how your agent is doing: calls answered, appointments booked, and calls transferred. Bloom's agent is called Rosie. Let's open her.",
      actions: [
        { at: 0.4, title: 'Voice AI', sub: 'AI Agents → Voice AI · Pro', for: 4 },
        { at: 5.4, hover: '#vai_stats' },
        { at: 5.6, zoom: '#vai_stats', scale: 1.3, for: 5 },
        { at: 5.8, highlight: '#vai_stats', label: 'How Rosie is doing', for: 5 },
        { at: 12.8, hover: '#vai_agent_r1' },
        { at: 13.4, click: '#vai_agent_r1' },
      ],
    },
    {
      chapter: 'Choose a voice',
      say: "Under Agent goals, start with the voice. Press play to hear each one. Pick a voice that suits your brand. Bloom uses Emma, a warm British voice.",
      actions: [
        { at: 0.4, highlight: '#vai_voice_sec', label: 'Voice', for: 2.6 },
        { at: 3.0, click: '#vai_play_oliver' },
        { at: 5.2, click: '#vai_play_emma' },
        { at: 5.4, zoom: '#vai_voices', scale: 1.4, for: 4 },
        { at: 8.6, click: '#vai_voice_emma .bold' },
      ],
    },
    {
      chapter: 'Greeting',
      say: "Next, the greeting: the first thing every caller hears. Keep it short and friendly, and always say it's a virtual assistant. Callers appreciate the honesty, and it sets the right expectations.",
      actions: [
        { at: 0.4, hover: '#vai_greeting' },
        { at: 0.6, zoom: '#vai_greeting', scale: 1.6, for: 5 },
        { at: 0.8, highlight: '#vai_greeting', label: 'First thing callers hear', for: 5 },
      ],
    },
    {
      chapter: 'Prompt & goals',
      say: "Then the prompt. Tell Rosie who she is, and list her goals in order: answer questions from the knowledge base, book new patients, transfer urgent calls, and otherwise take a message. Add rules, like never giving medical advice.",
      actions: [
        { at: 0.4, hover: '#vai_prompt' },
        { at: 0.6, highlight: '#vai_prompt', label: 'Who she is & her goals', for: 6 },
        { at: 4.0, zoom: '#vai_prompt', scale: 1.4, for: 9 },
      ],
    },
    {
      chapter: 'Phone & availability',
      say: "Under Phone and availability, choose which number Rosie answers. Then set her working hours. Bloom has her on from seven in the morning until ten at night, so she catches early calls, lunchtime rushes and evening enquiries.",
      caption: 'Under Phone and availability, choose which number Rosie answers. Then set her working hours. Bloom has her on from 7am until 10pm, so she catches early calls, lunchtime rushes and evening enquiries.',
      actions: [
        { at: 0.6, click: '#vai_t_phone' },
        { at: 2.4, highlight: '#vai_number', label: 'Number she answers', for: 3 },
        { at: 6.0, hover: '#vai_hours tr:first-child input' },
        { at: 6.2, highlight: '#vai_hours', label: 'Working hours', for: 6 },
        { at: 6.4, zoom: '#vai_hours', scale: 1.2, for: 6 },
      ],
    },
    {
      chapter: 'Call transfer',
      say: "Now the Actions tab. Call transfer routes callers to the right person. A dental emergency goes straight to Sarah. Billing questions go to Priya. And anyone who asks for a person goes to James.",
      actions: [
        { at: 0.6, click: '#vai_t_actions' },
        { at: 2.6, highlight: '#vai_transfer_sec', label: 'Call routing', for: 2.6 },
        { at: 5.4, hover: '#vai_route_0' },
        { at: 5.6, zoom: '#vai_route_0', scale: 1.5, for: 2.6 },
        { at: 8.4, hover: '#vai_route_1' },
        { at: 8.6, highlight: '#vai_route_1', label: 'Billing → Priya', for: 2.4 },
        { at: 11.0, hover: '#vai_route_2' },
        { at: 11.2, highlight: '#vai_route_2', label: 'A person → James', for: 2.4 },
      ],
    },
    {
      chapter: 'Booking & follow-up text',
      say: "Turn on Appointment booking, so Rosie can book callers straight into your calendars. And with Send SMS after the call, every caller gets a friendly text with your booking link.",
      actions: [
        { at: 0.4, hover: '#vai_booking_sec .toggle' },
        { at: 0.6, highlight: '#vai_booking_sec', label: 'Books into your calendar', for: 4.4 },
        { at: 5.6, hover: '#vai_sms_text' },
        { at: 5.8, highlight: '#vai_sms_sec', label: 'Text after every call', for: 4 },
        { at: 6.0, zoom: '#vai_sms_sec', scale: 1.4, for: 4 },
      ],
    },
    {
      chapter: 'After every call',
      say: "Finally, keep your team in the loop. Rosie saves a summary and transcript of every call to the contact, and can email the summary to you, too.",
      actions: [
        { at: 0.4, hover: '#vai_post_sec .toggle' },
        { at: 0.6, highlight: '#vai_post_sec', label: 'Summaries & transcripts', for: 5 },
        { at: 0.8, zoom: '#vai_post_sec', scale: 1.5, for: 5 },
        { at: 7.2, click: '#vai_save' },
      ],
    },
    {
      chapter: 'Test the agent',
      say: "Before going live, click Test agent, and have a real conversation with Rosie, right in your browser. Ask the questions your customers ask, and listen to how she answers.",
      actions: [
        { at: 0.6, click: '#vai_test' },
        { at: 2.4, highlight: '#vai_live', label: 'Live test call', for: 7 },
        { at: 9.4, wait: 0.1 },
      ],
    },
    {
      chapter: 'Call logs',
      say: "Once Rosie is live, every call appears in Call logs, with who called, how long it lasted, and what happened. This morning, Olivia called about Invisalign, and Rosie booked her in. Click the call to see the details.",
      actions: [
        { at: 0.2, wait: 0.1 },
        { at: 0.4, click: '#vai_end' },
        { at: 1.6, click: '#vai_back' },
        { at: 3.2, click: '#vai_view_logs' },
        { at: 5.0, highlight: '#vai_logs', label: 'Every call', for: 4 },
        { at: 9.4, hover: '#vai_log_l1' },
        { at: 9.6, highlight: '#vai_log_l1', label: 'Booked by Rosie', for: 3 },
        { at: 13.0, click: '#vai_log_l1' },
      ],
    },
    {
      chapter: 'Summary & transcript',
      say: "Here's the call summary, the actions Rosie took, and the full transcript. Press play to listen to the recording. It's the quickest way to check she's saying exactly what you want.",
      actions: [
        { at: 0.4, highlight: '#vai_summary', label: 'Call summary', for: 2.8 },
        { at: 3.4, highlight: '#vai_actions_taken', label: 'Actions taken', for: 2.4 },
        { at: 6.0, hover: '#vai_transcript' },
        { at: 6.2, highlight: '#vai_transcript', label: 'Transcript', for: 2.6 },
        { at: 8.8, click: '#vai_play' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Listen to her *first ten calls*', sub: 'Then fine-tune the prompt and knowledge base.' },
      say: "Here's a pro tip. Listen to Rosie's first ten calls. Whenever she hesitates or gets something wrong, add the answer to your knowledge base, or tweak her prompt. A few small fixes make a big difference.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 10.5', title: 'Writing with *Content AI*', sub: 'Emails, posts, pages and images in seconds.', cta: 'Kyntlo [Academy]' },
      say: "Your phone is now answered around the clock! In the next lesson, we'll use Content AI to write emails and social posts, and create images, in seconds. See you there.",
    },
  ],
};
