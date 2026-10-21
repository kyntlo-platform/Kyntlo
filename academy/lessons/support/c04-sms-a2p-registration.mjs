// Track C · Support Playbook C4 — Troubleshooting SMS & A2P registration.
// Order: plan (SMS is Growth+), number capabilities, Trust Center status, A2P 10DLC (US only),
// rejections and resubmission, contact DND, execution-log evidence.
// Bloom Dental is a UK account: A2P shows "Not required"; UK regulatory bundle is approved.
export default {
  id: 'C-4',
  title: 'Kyntlo Academy Support C4 — Troubleshooting SMS & A2P registration',
  description:
    "Internal support playbook. Why a customer's text messages aren't sending: plan check (SMS needs Growth or Pro), number capabilities, Trust Center status, A2P 10DLC registration for US numbers, common rejection reasons, contact DND and execution-log evidence.",
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'SMS', 'A2P 10DLC', 'Trust Center', 'HighLevel'],
  thumbnail: { kicker: 'Support Playbook C4', title: 'SMS & *A2P* registration' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C4', title: 'SMS & *A2P registration*', sub: 'Status checks, rejections and fixes.' },
      say: "When a customer says their texts aren't sending, the cause is rarely the message itself. It's usually the plan, the number, a registration, or the contact's consent. In this playbook, you'll check each of those in order, and learn how to handle a rejected registration.",
    },
    {
      chapter: 'Plan check',
      goto: '{demo}#/settings/billing/subscription',
      settle: 1.5,
      say: "Start with the plan. Text messages and WhatsApp are included on Growth and Pro, but not on Starter. So if a Starter customer asks why they can't text, it's a plan question, not a fault. Confirm the plan under Settings, Billing, Subscription, before you look any further.",
      actions: [
        { at: 0.5, title: 'SMS needs Growth or Pro', sub: 'Not included on Starter', for: 4.4 },
        { at: 10.0, highlight: '#bl_plan', label: 'Current plan', for: 4 },
        { at: 10.2, zoom: '#bl_plan', scale: 1.4, for: 4.4 },
      ],
    },
    {
      chapter: 'Can the number text?',
      goto: '{demo}#/settings/phone-numbers',
      settle: 1.5,
      say: "Next, the number. In Phone System, look at the capabilities column. Not every number can text. In the UK, local numbers are voice only, so a customer texting from one will see nothing go out. They need a mobile number with S M S. Also check the default outbound number, because that's the one messages use unless a user has their own.",
      caption: "Next, the number. In Phone System, look at the capabilities column. Not every number can text. In the UK, local numbers are voice only, so a customer texting from one will see nothing go out. They need a mobile number with SMS. Also check the default outbound number, because that's the one messages use unless a user has their own.",
      actions: [
        { at: 0.5, zoom: '#ph_table', scale: 1.5, for: 12 },
        { at: 2.6, highlight: '#ph_row_0', label: 'Calls only', for: 4 },
        { at: 9.2, highlight: '#ph_row_1', label: 'Calls + texts', for: 3.6 },
        { at: 15.0, highlight: '#ph_default_card', label: 'Default outbound number', for: 5 },
      ],
    },
    {
      chapter: 'Trust Center',
      say: "Then open Trust Center. Carriers require businesses to prove who they are before texting at scale. The primary customer profile holds the verified business identity, taken from Business Profile. Depending on the country, more is needed. For UK numbers, that's a regulatory bundle with proof of address. Each item shows a status, such as not started, pending, in review, approved, or rejected.",
      actions: [
        { at: 0.4, click: '#phone_tab_trust-center' },
        { at: 5.6, highlight: '#tc_profile', label: 'Verified business identity', for: 4.4 },
        { at: 13.6, highlight: '#tc_bundle', label: 'UK: proof of address', for: 4 },
        { at: 18.4, highlight: '#tc_steps', label: 'Status of each step', for: 5 },
      ],
    },
    {
      chapter: 'A2P 10DLC',
      say: "For US local numbers, the registration is called A two P ten D L C. It has two parts: the brand, meaning the legal business, and the campaign, which describes the messages and how people opt in. US carriers review it, usually within days, sometimes weeks. Until the campaign is approved, texts from US local numbers are blocked or filtered. US toll-free numbers need a separate toll-free verification instead.",
      caption: "For US local numbers, the registration is called A2P 10DLC. It has two parts: the brand, meaning the legal business, and the campaign, which describes the messages and how people opt in. US carriers review it, usually within days, sometimes weeks. Until the campaign is approved, texts from US local numbers are blocked or filtered. US toll-free numbers need a separate toll-free verification instead.",
      actions: [
        { at: 0.4, highlight: '#tc_a2p', label: 'US local numbers only', for: 4 },
        { at: 5.0, click: '#tc_a2p_start' },
        { at: 6.4, zoom: '.modal', scale: 1.3, for: 10 },
        { at: 6.6, highlight: '.modal', label: 'Brand + campaign + review', for: 6 },
      ],
    },
    {
      chapter: 'Why registrations get rejected',
      card: { type: 'chapter', kicker: 'Rejected?', title: 'Read the *reason* first', sub: 'Details don\'t match official records · No privacy policy or SMS terms · Vague opt-in · Samples don\'t match the use case · No "Reply STOP" opt-out' },
      say: "Rejections usually come down to a few reasons. The legal name, address or tax number doesn't match official records exactly. The website has no privacy policy, or doesn't explain how people sign up for texts. The opt-in description is vague. Or the sample messages don't match the use case, or leave out how to opt out, like reply STOP. Read the rejection reason carefully. It usually names the problem.",
    },
    {
      chapter: 'Fix and resubmit',
      goto: '{demo}#/settings/business-profile',
      settle: 1.5,
      say: "To fix a rejection, start at the source. The legal details come from Business Profile, so correct them here first, exactly as registered, including the business type and registration number. Then help the customer fix their website or opt-in wording, and resubmit. Never resubmit unchanged. Each submission starts a new review, so one careful resubmission beats three quick ones.",
      actions: [
        { at: 0.5, highlight: '#bp_info_card', label: 'Exactly as registered', for: 6 },
        { at: 0.7, zoom: '#bp_info_card', scale: 1.4, for: 8 },
        { at: 17.0, title: 'Never resubmit unchanged', sub: 'Fix the cause first', for: 4 },
      ],
    },
    {
      chapter: 'One contact gets nothing',
      goto: '{demo}#/contacts/detail/c1',
      settle: 1.5,
      say: "If the account is registered and other texts go out, but one contact gets nothing, check their Do not disturb settings. When someone replies STOP, text message D N D is switched on automatically, and no campaign or workflow will text them. That's the law working as intended. Only switch it off if the contact has clearly opted back in.",
      caption: "If the account is registered and other texts go out, but one contact gets nothing, check their Do not disturb settings. When someone replies STOP, text message DND is switched on automatically, and no campaign or workflow will text them. That's the law working as intended. Only switch it off if the contact has clearly opted back in.",
      actions: [
        { at: 0.5, highlight: '#cd_sec_dnd', label: 'Do not disturb', for: 3.4 },
        { at: 5.0, zoom: '#cd_dnd', scale: 1.5, for: 10 },
        { at: 7.4, highlight: '#cd_dnd_text-messages', label: 'Text messages', for: 4 },
      ],
    },
    {
      chapter: 'Evidence in the logs',
      goto: '{demo}#/automation/workflows/w1/logs',
      settle: 1.5,
      say: "For texts sent by a workflow, Execution Logs show exactly what happened. Search for the contact. Mason's text was skipped, because text message D N D is on. A skipped step was a deliberate decision. A failed step means the message was attempted and rejected, and the error in the details is exactly what you'll need if you escalate.",
      caption: "For texts sent by a workflow, Execution Logs show exactly what happened. Search for the contact. Mason's text was skipped, because text message DND is on. A skipped step was a deliberate decision. A failed step means the message was attempted and rejected, and the error in the details is exactly what you'll need if you escalate.",
      actions: [
        { at: 0.5, type: 'Mason', into: '#wfl_search', delay: 80 },
        { at: 3.0, highlight: '#wfl_row_11', label: 'Skipped', for: 3 },
        { at: 6.4, click: '#wfl_view_11' },
        { at: 7.8, highlight: '#wfl_detail', label: 'DND on for SMS', for: 4.4 },
        { at: 8.0, zoom: '#wfl_detail', scale: 1.5, for: 5 },
      ],
    },
    {
      chapter: 'When to escalate',
      card: { type: 'chapter', kicker: 'Escalate when', title: 'Bring the *details*', sub: 'Pending far longer than usual · A rejection that makes no sense · Approved numbers failing for many contacts — include number, status & exact error' },
      say: "Escalate when a registration has been pending far longer than usual, when it's rejected for a reason that doesn't make sense, or when approved numbers fail for many contacts at once. Include the sub-account, the number, the registration status and the exact error text, so nobody has to ask the customer again.",
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: 'Texts *not sending*', sub: 'Plan: Growth or Pro · Number can text · Trust Center status · A2P / regulatory approved · Contact DND · Logs & exact error' },
      say: "Here's the order. Plan: Growth or Pro. A number that can text. Trust Center status. A two P or regulatory registration approved. The contact's D N D. And the logs, with the exact error. Work through it top to bottom, and most SMS tickets are solved before you reach the end.",
      caption: "Here's the order. Plan: Growth or Pro. A number that can text. Trust Center status. A2P or regulatory registration approved. The contact's DND. And the logs, with the exact error. Work through it top to bottom, and most SMS tickets are solved before you reach the end.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Playbook C5', title: "Why didn't my *workflow* fire?", sub: 'Reading enrollment history and execution logs.', cta: 'Kyntlo [Academy]' },
      say: "That's SMS and A two P. In the next playbook, we'll answer the classic question: why didn't my workflow fire?",
      caption: "That's SMS and A2P. In the next playbook, we'll answer the classic question: why didn't my workflow fire?",
    },
  ],
};
