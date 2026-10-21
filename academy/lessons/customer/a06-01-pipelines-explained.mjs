// Track A · Module 6 · Lesson 1 — Pipelines explained.
// Filmed on the Kyntlo demo workspace (Opportunities › Patient Journey pipeline).
export default {
  id: 'A-6.1',
  title: 'Kyntlo Academy 6.1 — Pipelines explained',
  description:
    'What opportunities and pipelines are, how stages, values and statuses (open, won, lost, abandoned) work, why stage and status are separate, and how many pipelines each Kyntlo plan includes.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Sales pipeline', 'Opportunities', 'CRM'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 6 · Lesson 1', title: 'Pipelines *explained*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 6 · Lesson 1', title: 'Pipelines *explained*', sub: 'Stages, values and statuses, in plain English.' },
      say: "Welcome to module six! Here, we'll look at Opportunities, where you track every deal from first enquiry to paying customer. In this lesson, we'll cover the building blocks: pipelines, stages, values and statuses.",
      caption: "Welcome to Module 6! Here, we'll look at Opportunities, where you track every deal from first enquiry to paying customer. In this lesson, we'll cover the building blocks: pipelines, stages, values and statuses.",
    },
    {
      chapter: 'Contacts vs opportunities',
      goto: '{demo}#/opportunities',
      settle: 1,
      say: "First, a contact is a person. An opportunity is a deal you might win with that person. Olivia Bennett is a contact. Olivia's Invisalign treatment is an opportunity. One contact can have several opportunities over time.",
      actions: [
        { at: 0.5, title: 'Opportunities', sub: 'Every deal you might win', for: 3.6 },
        { at: 4.6, hover: '#op_card_o1' },
        { at: 7.8, highlight: '#op_card_o1', label: 'One opportunity', for: 4.4 },
      ],
    },
    {
      chapter: 'What a pipeline is',
      say: "A pipeline is your sales process, laid out as stages from left to right. This one, called Patient Journey, follows a new patient from their first enquiry, all the way to booked treatment.",
      actions: [
        { at: 0.4, highlight: '#op_board', label: 'Your sales process', for: 4.4 },
        { at: 0.6, move: [1100, 600] },
        { at: 6.0, hover: '#op_pipeline' },
        { at: 6.2, highlight: '#op_pipeline', label: 'Patient Journey pipeline', for: 3.6 },
      ],
    },
    {
      chapter: 'Stages',
      say: "Each column is a stage. New enquiry, contacted, consultation booked, treatment plan sent, and won. As a deal moves forward, its card moves one column to the right.",
      actions: [
        { at: 1.4, hover: '#op_colh_0' },
        { at: 2.8, hover: '#op_colh_1' },
        { at: 3.8, hover: '#op_colh_2' },
        { at: 5.4, hover: '#op_colh_3' },
        { at: 7.0, hover: '#op_colh_4' },
        { at: 8.2, highlight: '#op_colh_4', label: 'Deals move left to right', for: 3.4 },
      ],
    },
    {
      chapter: 'Counts & values',
      say: "The top of each column shows how many deals are in that stage, and what they're worth. New enquiry has three opportunities, worth seven thousand six hundred and ninety pounds.",
      caption: "The top of each column shows how many deals are in that stage, and what they're worth. New Enquiry has 3 opportunities, worth £7,690.",
      actions: [
        { at: 0.4, hover: '#op_colh_0' },
        { at: 0.6, zoom: '#op_colh_0', scale: 2.0, for: 8.6 },
      ],
    },
    {
      chapter: 'Opportunity cards',
      say: "Each card is one opportunity. It shows the deal name, the contact, where the lead came from, the value, and who owns it. The icons along the bottom let you call, text or email them, or add a task or note, without leaving the board.",
      actions: [
        { at: 0.4, hover: '#op_card_o1' },
        { at: 0.6, zoom: '#op_card_o1', scale: 1.9, for: 8.4 },
        { at: 10.0, hover: '#op_card_o1 .acts' },
        { at: 10.2, highlight: '#op_card_o1 .acts', label: 'Quick actions', for: 3.4 },
      ],
    },
    {
      chapter: 'Why values matter',
      say: "Always add a value, even if it's an estimate. Values are what turn a list of names into a forecast. Here, everything in this pipeline adds up to twenty-four thousand seven hundred and forty pounds.",
      caption: "Always add a value, even if it's an estimate. Values are what turn a list of names into a forecast. Here, everything in this pipeline adds up to £24,740.",
      actions: [
        { at: 0.6, hover: '#op_card_o1 .kv:nth-of-type(4)' },
        { at: 6.4, hover: '#op_summary' },
        { at: 6.6, zoom: '#op_summary', scale: 2.0, for: 4.4 },
        { at: 6.8, highlight: '#op_summary', label: 'Pipeline value', for: 4 },
      ],
    },
    {
      chapter: 'Statuses',
      say: "Every opportunity also has a status. Open means you're still working on it. Won means they said yes. Lost means they said no. And abandoned means they went quiet, or you've decided to stop chasing.",
      actions: [
        { at: 1.8, highlight: '#op_card_o1', label: 'Open', for: 2.4 },
        { at: 4.4, highlight: '#op_card_o9', label: 'Won', for: 2.2 },
        { at: 6.6, highlight: '#op_card_o16', label: 'Lost', for: 2.4 },
        { at: 9.0, highlight: '#op_card_o15', label: 'Abandoned', for: 3.4 },
      ],
    },
    {
      chapter: 'Stage vs status',
      say: "Here's the part people often miss: stage and status are separate. Dragging a card into the Won column doesn't mark it as won. Open the card, and set its status to Won, because the status is what your reports count.",
      actions: [
        { at: 0.6, hover: '#op_card_o9' },
        { at: 5.6, click: '#op_card_o9' },
        { at: 7.2, hover: '#op_f_status' },
        { at: 7.4, zoom: '#op_f_status', scale: 2.0, for: 4.4 },
        { at: 7.6, highlight: '#op_f_status', label: 'Status: Won', for: 4.2 },
        { at: 12.6, click: '.modal-h [data-close]' },
      ],
    },
    {
      chapter: 'Lost reasons',
      say: "When you mark a deal as lost, choose a reason, like price, or no response. After a few months, those reasons tell you exactly what to fix in your offer, or your follow-up.",
      actions: [
        { at: 0.5, hover: '#op_card_o16 .st' },
        { at: 0.7, zoom: '#op_card_o16', scale: 1.9, for: 5 },
        { at: 1.0, highlight: '#op_card_o16 .st', label: 'Lost reason', for: 4.4 },
      ],
    },
    {
      chapter: 'More than one pipeline',
      say: "You can also run separate pipelines for different services. The Starter plan includes one pipeline, Growth includes up to three, and Pro is unlimited. Here, Invisalign has its own pipeline, with its own stages.",
      actions: [
        { at: 0.5, click: '#op_pipeline' },
        { at: 1.8, highlight: '.menu', label: 'Your pipelines', for: 3.6 },
        { at: 4.0, title: 'Starter: 1 · Growth: up to 3 · Pro: unlimited', for: 5.4 },
        { at: 9.4, click: '.menu button:has-text("Invisalign")' },
        { at: 10.8, highlight: '#op_board', label: 'Invisalign pipeline', for: 3.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'One pipeline per *process*', sub: 'Not one per person — use the owner filter for that.' },
      say: "Here's a pro tip. Create a new pipeline only when the steps are genuinely different, like a long Invisalign journey versus a quick check-up. Don't create one per team member. Use the owner filter for that instead.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 6.2', title: 'Building a *pipeline*', sub: 'Create and order stages for your sales process.', cta: 'Kyntlo [Academy]' },
      say: "Now you know how pipelines work. In the next lesson, we'll build one from scratch, and put its stages in the right order. See you there!",
    },
  ],
};
