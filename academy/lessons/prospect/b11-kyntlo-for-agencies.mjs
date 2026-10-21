// Track B · Video 9c — Kyntlo for agencies. The demo workspace is a dental clinic (the kind of local business many
// agencies serve), so the narration says so and leans on cards and platform features.
// Plan facts (pricing.html): funnels/forms = every plan; workflow automation & SMS = Growth+; advanced reporting &
// attribution, unlimited AI = Pro; multi-brand, custom integrations, human campaign management = Customized.
export default {
  id: 'B11',
  title: 'Kyntlo for Agencies — Funnels, Pipelines, Automation & Reporting in One Platform',
  description:
    'How marketing agencies and consultants can run on Kyntlo: launch funnels from templates, track every lead in a pipeline, automate follow-up, send email and SMS campaigns, see which ads bring in leads, and use Content AI, with a Customized plan for multiple brands.',
  tags: ['Kyntlo', 'Marketing agency software', 'Agency CRM', 'Funnel builder', 'Marketing automation', 'Lead generation agency'],
  thumbnail: { kicker: 'Kyntlo for agencies', title: 'Run your agency on *one platform*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Kyntlo for agencies', title: 'Run your agency on *one platform*', sub: 'Funnels, pipelines, campaigns, automation and reporting.' },
      say: "Running an agency means juggling funnels, campaigns, follow-ups and reports, usually across a pile of different tools. Here's how Kyntlo brings it all together.",
    },
    {
      chapter: 'Same tools, your agency',
      card: { type: 'chapter', kicker: 'A quick note', title: 'Same tools. *Your agency.*', sub: 'The demo workspace is a dental clinic — the kind of local business many agencies serve.' },
      say: "The demo you're about to see belongs to a dental clinic, the kind of local business many agencies serve. Everything you'll see works the same way for your agency.",
    },
    {
      chapter: 'Funnels in minutes',
      goto: '{demo}#/sites/funnels',
      settle: 1,
      say: "Launch landing pages and funnels from ready-made templates in minutes, with forms that drop every lead straight into the CRM.",
      actions: [
        { at: 0.4, title: 'Funnels & websites', sub: 'From template to live in minutes', for: 3.4 },
        { at: 3.8, click: '#fn_new' },
        { at: 5.0, highlight: '#fn_new_template', label: 'Ready-made templates', for: 2.4 },
      ],
    },
    {
      chapter: 'Every lead in the pipeline',
      goto: '{demo}#/opportunities',
      settle: 1,
      say: "Track every lead and deal in a sales pipeline, by stage and value, so you always know what's coming in.",
      actions: [
        { at: 0.4, title: 'Opportunities', sub: 'Your sales pipeline', for: 3 },
        { at: 3.4, zoom: '#op_board', scale: 1.3, for: 3 },
        { at: 3.6, highlight: '#op_colh_0', label: 'Stage & value', for: 2.6 },
      ],
    },
    {
      chapter: 'Automated follow-up',
      goto: '{demo}#/automation/workflows',
      settle: 1,
      say: "Automate the follow-up: an instant reply to every new lead, nurture emails and texts, and notifications for your team.",
      actions: [
        { at: 0.4, title: 'Workflows', sub: 'Follow-up on autopilot · Growth+', for: 3.2 },
        { at: 3.6, click: '#wf_folder_lead-nurture' },
        { at: 4.6, highlight: '#wf_table tbody', label: 'Lead nurture', for: 3 },
      ],
    },
    {
      chapter: 'Campaigns',
      goto: '{demo}#/marketing/emails',
      settle: 1,
      say: "Send email campaigns and text broadcasts, and plan your social posts, all from the same platform.",
      actions: [
        { at: 0.4, title: 'Marketing', sub: 'Email · SMS · Social Planner', for: 3.2 },
        { at: 3.8, click: '#tab_social-planner' },
      ],
    },
    {
      chapter: 'Reporting',
      goto: '{demo}#/reporting/attribution',
      settle: 1,
      say: "And reporting shows which sources and campaigns actually bring in leads and revenue, so you can prove what's working.",
      actions: [
        { at: 0.4, title: 'Attribution Report', sub: 'Advanced reporting · Pro', for: 3.4 },
        { at: 4.0, zoom: '#view', scale: 1.2, for: 3 },
      ],
    },
    {
      chapter: 'Content AI',
      goto: '{demo}#/ai-agents/content-ai',
      settle: 1,
      say: "Content AI helps you draft emails, social posts and images in seconds, and on Pro, AI usage is unlimited.",
      actions: [
        { at: 0.4, title: 'Content AI', sub: 'Copy & images in seconds', for: 3 },
        { at: 3.6, highlight: '#cnt_types', label: 'What are you writing?', for: 3 },
      ],
    },
    {
      chapter: 'Built around you',
      card: { type: 'chapter', kicker: 'Customized plan', title: 'Built around *your operation*', sub: 'Multiple brands or branches · custom limits · custom integrations · human campaign management · dedicated onboarding' },
      say: "Running several brands, or need custom limits? The Customized plan is built around your operation, with multiple brands or branches, custom integrations, and even campaign management by the Kyntlo team. You pay only for the features you pick.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'Kyntlo for agencies', title: 'Start your free *14-day trial*', sub: 'Or talk to sales about a Customized plan', cta: 'kyntlo.ai/[trial]' },
      say: "Run your agency from one platform. Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
