// Track C · Support Playbook C10 — Escalation & ticket handling.
// Triage questions, classification, evidence (Audit Logs, Execution Logs, screenshots), when to
// escalate. No SLAs, severity names or tool names are invented: "your ticketing system" and
// "Kyntlo's current severity levels and response targets" are used instead (BRD section 31).
const opt = (text) => `.menu button:has-text("${text}")`;

export default {
  id: 'C-10',
  title: 'Kyntlo Academy Support C10 — Escalation & ticket handling',
  description:
    'Internal support playbook. How to triage a ticket, classify it, gather evidence from Audit Logs and Execution Logs, take useful screenshots, rule out the usual causes, decide when to escalate, and write an escalation nobody has to ask about twice.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'Escalation', 'Ticket handling', 'Audit logs'],
  thumbnail: { kicker: 'Support Playbook C10', title: 'Escalation & *ticket handling*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C10', title: 'Escalation & *ticket handling*', sub: 'When and how to escalate.' },
      say: "Good escalation is a skill. Escalate too early, and specialists are buried in tickets you could have solved. Escalate too late, or with too little information, and the customer waits twice. In this playbook, you'll learn how to triage a ticket, gather the right evidence, and decide when to hand it on.",
    },
    {
      chapter: 'Five triage questions',
      card: { type: 'chapter', kicker: 'Triage', title: 'Five questions *first*', sub: 'Who, and which account? · Expected vs actual? · Where exactly? · When, and since when? · How many affected?' },
      say: "Every ticket starts with the same five questions. Who are you, and which account? What did you expect, and what actually happened? Where exactly: which page, workflow or contact? When did it happen, and has it ever worked? And how many people or contacts are affected? Ask them together, in one message, so the customer isn't drip-fed questions.",
    },
    {
      chapter: 'Classify it',
      card: { type: 'chapter', kicker: 'Classify', title: 'What *kind* of ticket?', sub: 'How-to · Configuration · Billing · Platform issue · Security or personal data' },
      say: "Then classify it. A how-to question is answered with a lesson or a short guide. A configuration issue is fixed in the customer's settings, and most tickets are this kind. Billing questions follow the billing playbook and policy. A platform issue is when HighLevel itself isn't working as documented. And anything involving security, suspected account access, or personal data is always escalated straight away.",
    },
    {
      chapter: 'Severity',
      card: { type: 'chapter', kicker: 'Severity', title: 'Impact *decides* priority', sub: "Use Kyntlo's current severity levels and response targets" },
      say: "Set the severity using Kyntlo's current severity levels and response targets. As a rule of thumb, the more customers affected, and the closer it is to money, to messages reaching the customer's clients, or to data, the higher it goes. A whole account unable to send texts is more urgent than a button in the wrong place.",
    },
    {
      chapter: 'What changed? Audit Logs',
      goto: '{demo}#/settings/audit-logs',
      settle: 1.5,
      say: "Now gather evidence, starting with what changed. Audit Logs, in Settings, show who changed what, and when. Here, an admin changed James's permissions two days ago, turning Payments off. If James reports that he suddenly can't see payments, that's your answer. No escalation needed.",
      actions: [
        { at: 0.5, highlight: '#ss_menu_audit-logs', label: 'Audit Logs', for: 2.6 },
        { at: 3.4, highlight: '#al_table', label: 'Who · what · when', for: 4 },
        { at: 7.6, click: '#al_row_4' },
        { at: 9.0, zoom: '.drawer', scale: 1.3, for: 6 },
        { at: 9.2, highlight: '.drawer', label: 'Payments switched off', for: 5 },
      ],
    },
    {
      chapter: 'Filter by module',
      say: "Filter by module to narrow it down. For contacts, you'll see changes like a D N D switch, who made it, and the before and after. Screenshot entries like this, and add them to the ticket.",
      caption: "Filter by module to narrow it down. For contacts, you'll see changes like a DND switch, who made it, and the before and after. Screenshot entries like this, and add them to the ticket.",
      actions: [
        { at: 0.2, click: '.drawer [data-close]' },
        { at: 0.8, click: '#al_filter_module' },
        { at: 1.8, click: opt('Contact') },
        { at: 3.6, click: '#al_row_0' },
        { at: 5.0, highlight: '.drawer', label: 'Before → after', for: 5 },
        { at: 5.2, zoom: '.drawer', scale: 1.3, for: 5.4 },
      ],
    },
    {
      chapter: 'Execution Logs',
      goto: '{demo}#/automation/workflows/w1/logs',
      settle: 1.5,
      say: "For automation problems, Execution Logs are the evidence. Filter by Failed or Skipped, open the step, and copy the exact reason and the timestamp. A screenshot of this detail is worth more than any description.",
      actions: [
        { at: 0.5, click: '#wfl_status' },
        { at: 1.8, click: opt('Failed') },
        { at: 3.6, click: '#wfl_view_13' },
        { at: 5.0, highlight: '#wfl_detail', label: 'Exact reason & time', for: 5 },
        { at: 5.2, zoom: '#wfl_detail', scale: 1.5, for: 5.4 },
      ],
    },
    {
      chapter: 'Screenshots that help',
      card: { type: 'chapter', kicker: 'Evidence', title: 'Screenshots that *help*', sub: 'Whole screen with the address bar · Error text copied as text · Time & time zone · Contact or record · Steps to reproduce' },
      say: "Good screenshots show the whole screen, including the address bar, so the specialist knows exactly where it happened. Copy error messages as text, not just as images. Note the time and time zone, the contact or record, and the exact steps to reproduce it. If you reproduced it yourself, say so. And leave out personal data that isn't needed.",
    },
    {
      chapter: 'Rule out the usual causes',
      card: { type: 'chapter', kicker: 'Before you escalate', title: 'Rule out the *usual causes*', sub: 'In their plan? · Set up & connected? · Playbook checks done? · Reproduced? · One account or several?' },
      say: "Before escalating, rule out the usual causes. Is the feature in their plan? Is it set up and connected? Have you worked through the relevant playbook? Can you reproduce it? And is it one account, or several? Several accounts with the same problem at the same time points to a platform issue, and that's urgent.",
    },
    {
      chapter: 'When to escalate',
      card: { type: 'chapter', kicker: 'Escalate when', title: 'Hand it on *with confidence*', sub: 'Several accounts affected · Security or personal data · A charge looks wrong, or a refund is requested · Platform not working as documented · Checks done, still stuck' },
      say: "Escalate when several accounts are affected, when security or personal data is involved, when a charge looks wrong or a refund is requested, when the platform isn't working as documented, or when you've done the checks and you're still stuck. Platform issues go to HighLevel through Kyntlo's internal process. The customer never has to contact HighLevel themselves.",
    },
    {
      chapter: 'Writing the escalation',
      card: { type: 'chapter', kicker: 'Writing it up', title: 'One ticket, *everything in it*', sub: 'Summary · Sub-account & user · Expected vs actual · Steps · Evidence · Already checked · Impact' },
      say: "Write the escalation in your ticketing system, so the next person never has to ask the customer again. A one-line summary. The sub-account and the user. Expected versus actual. Steps to reproduce. The evidence. What you've already checked. And the impact. Then tell the customer what happens next, honestly, without promising a time you can't guarantee.",
    },
    {
      chapter: 'Logins & passwords',
      goto: '{demo}#/settings/my-staff',
      settle: 1.5,
      say: "One firm rule. Never ask a customer for their password, and never send logins by chat or email. Every person should have their own user in My Staff, and password resets go through the login page. If a customer pastes a password into a ticket, ask them to change it straight away, and remove it from the ticket if your system allows.",
      actions: [
        { at: 0.5, title: 'Never ask for passwords', sub: 'Never send logins by chat or email', for: 4.4 },
        { at: 6.4, highlight: '#ms_table', label: 'One user per person', for: 5 },
      ],
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: 'Triage → *evidence* → escalate', sub: 'Five questions · Classify & set severity · Audit & Execution Logs · Screenshots with address bar & time · Rule out usual causes · Complete ticket · Update the customer' },
      say: "Here's the whole flow. Ask the five questions. Classify the ticket and set the severity. Check Audit Logs and Execution Logs. Take screenshots with the address bar and the time. Rule out the usual causes. Write a complete ticket. And keep the customer updated.",
    },
    {
      card: { type: 'outro', kicker: 'Track C complete', title: "You're ready to *support*", sub: 'Come back to any playbook when a ticket needs it.', cta: 'Kyntlo [Academy]' },
      say: "That's the end of the support playbooks. Come back to any of them whenever a ticket needs it. Thanks for taking such good care of Kyntlo's customers.",
    },
  ],
};
