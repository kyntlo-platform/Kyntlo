// Track C · Support Playbook C3 — Troubleshooting email deliverability.
// Causes in order: no dedicated domain, missing/incorrect DNS, unverified, bounces,
// contact DND, content & warm-up. Screens: Settings → Email Services, Execution Logs, contact DND.
const opt = (text) => `.menu button:has-text("${text}")`;

export default {
  id: 'C-3',
  title: 'Kyntlo Academy Support C3 — Troubleshooting email deliverability',
  description:
    'Internal support playbook. Why customer emails land in spam or never arrive, and how to check each cause in order: dedicated sending domain, DNS records (SPF, DKIM, MX, DMARC), verification, bounces, contact DND, and content and warm-up.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Support playbook', 'Email deliverability', 'SPF DKIM DMARC', 'HighLevel'],
  thumbnail: { kicker: 'Support Playbook C3', title: 'Email *deliverability*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Support Playbook C3', title: 'Email *deliverability*', sub: 'Why emails land in spam, or never arrive.' },
      say: "Emails going to spam, or not arriving at all, is one of the most common tickets you'll see. In this playbook, you'll learn the usual causes, and how to check each one inside the customer's account, in a sensible order.",
    },
    {
      chapter: 'Pin down the symptom',
      card: { type: 'chapter', kicker: 'Start here', title: 'Spam, bounce or *never sent*?', sub: 'One contact or everyone? · Since when? · Campaign or workflow? · Anything changed?' },
      say: "First, pin down the symptom. Did the email land in spam, bounce back, or never get sent at all? Is it one contact, or everyone? Did it come from a campaign or a workflow? And did it start after a change, like a new domain or a big new list? Those answers point you to the right check.",
    },
    {
      chapter: 'Dedicated sending domain',
      goto: '{demo}#/settings/email-services',
      settle: 1.5,
      say: "Check one: does the customer have a dedicated sending domain? Open Settings, then Email Services. If this list is empty, emails go out from a shared domain. That works, but inbox placement is weaker. Gmail, Yahoo and Outlook now expect bulk senders to authenticate with their own domain. The fix is to add one.",
      actions: [
        { at: 0.5, highlight: '#ss_menu_email-services', label: 'Email Services', for: 2.6 },
        { at: 6.0, highlight: '#es_empty', label: 'No dedicated domain', for: 4 },
        { at: 11.6, highlight: '#es_why', label: 'Why it matters', for: 5 },
        { at: 11.8, zoom: '#es_why', scale: 1.5, for: 5 },
      ],
    },
    {
      chapter: 'Use a subdomain',
      say: "Recommend a subdomain, like mail dot bloomdental dot co dot uk. It keeps marketing email separate from the customer's everyday mailbox, so a poor campaign can't damage their normal email. Click Add and Verify, and Kyntlo shows the records to add.",
      caption: "Recommend a subdomain, like mail.bloomdental.co.uk. It keeps marketing email separate from the customer's everyday mailbox, so a poor campaign can't damage their normal email. Click Add & Verify, and Kyntlo shows the records to add.",
      actions: [
        { at: 0.4, click: '#es_add_domain' },
        { at: 1.8, type: 'mail.bloomdental.co.uk', into: '#es_domain_input', delay: 45 },
        { at: 3.6, zoom: '.modal', scale: 1.4, for: 6 },
        { at: 12.4, click: '#es_domain_continue' },
      ],
    },
    {
      chapter: 'DNS records',
      say: "Check two: the DNS records, which the customer adds at their domain provider. S P F says who may send for the domain. D K I M adds a digital signature. The M X records handle bounces, a C NAME powers click tracking, and D MARC tells inboxes what to do with mail that fails. Common mistakes are a typo, a record on the wrong host, or a second S P F record on the same name. There should only ever be one.",
      caption: "Check two: the DNS records, which the customer adds at their domain provider. SPF says who may send for the domain. DKIM adds a digital signature. The MX records handle bounces, a CNAME powers click tracking, and DMARC tells inboxes what to do with mail that fails. Common mistakes are a typo, a record on the wrong host, or a second SPF record on the same name. There should only ever be one.",
      actions: [
        { at: 0.4, highlight: '#es_dns_card', label: 'Added at the domain provider', for: 4 },
        { at: 4.6, zoom: '#es_dns', scale: 1.35, for: 14 },
        { at: 4.8, highlight: '#es_rec_0', label: 'SPF', for: 2.6 },
        { at: 7.6, highlight: '#es_rec_1', label: 'DKIM', for: 2.6 },
        { at: 10.4, highlight: '#es_rec_2', label: 'MX', for: 2.4 },
        { at: 13.0, highlight: '#es_rec_4', label: 'Tracking', for: 2.4 },
        { at: 15.6, highlight: '#es_rec_5', label: 'DMARC', for: 3 },
        { at: 22.0, highlight: '#es_rec_0', label: 'Only one SPF per name', for: 4 },
      ],
    },
    {
      chapter: 'Verified?',
      say: "Check three: is the domain verified? Once the records are in, click Verify. DNS changes can take up to forty-eight hours to spread, so a brand-new domain that won't verify often just needs time. If it still fails after a day, compare each record with what's shown here, character by character. A public DNS lookup tool shows what the internet actually sees.",
      caption: "Check three: is the domain verified? Once the records are in, click Verify. DNS changes can take up to 48 hours to spread, so a brand-new domain that won't verify often just needs time. If it still fails after a day, compare each record with what's shown here, character by character. A public DNS lookup tool shows what the internet actually sees.",
      actions: [
        { at: 0.4, highlight: '#es_status', label: 'Status', for: 2.6 },
        { at: 3.2, click: '#es_verify' },
        { at: 5.0, highlight: '#es_status', label: 'Verified', for: 3.6 },
        { at: 5.2, zoom: '#es_dns_card', scale: 1.2, for: 5 },
      ],
    },
    {
      chapter: 'Bounces & verification',
      goto: '{demo}#/settings/email-services/verification',
      settle: 1.5,
      say: "Check four: bounces. A hard bounce means the address doesn't exist, and repeatedly sending to bad addresses hurts the reputation of every email the customer sends. Under Email Verification, Kyntlo can check new addresses automatically, at half a cent each, and skip invalid ones in campaigns and workflows. Old, bought or scraped lists are the usual cause of a high bounce rate.",
      caption: "Check four: bounces. A hard bounce means the address doesn't exist, and repeatedly sending to bad addresses hurts the reputation of every email the customer sends. Under Email Verification, Kyntlo can check new addresses automatically, at $0.005 each, and skip invalid ones in campaigns and workflows. Old, bought or scraped lists are the usual cause of a high bounce rate.",
      actions: [
        { at: 0.5, highlight: '#email_tab_verification', label: 'Email Verification', for: 2.6 },
        { at: 8.8, highlight: '#es_body', label: 'Check & skip bad addresses', for: 6 },
        { at: 9.0, zoom: '#es_body', scale: 1.3, for: 6 },
      ],
    },
    {
      chapter: 'One email that failed',
      goto: '{demo}#/automation/workflows/w1/logs',
      settle: 1.5,
      say: "To see why one specific email failed, open the workflow's Execution Logs, and filter by Failed. Here, Ethan Walker's email bounced because his mailbox was full. That's a soft bounce: the address is real, but couldn't accept mail at the time. The fix is outside Kyntlo. Confirm the address, or reach him another way.",
      actions: [
        { at: 0.5, click: '#wfl_status' },
        { at: 1.8, click: opt('Failed') },
        { at: 3.6, click: '#wfl_view_13' },
        { at: 5.2, highlight: '#wfl_detail', label: 'Mailbox full', for: 5 },
        { at: 5.4, zoom: '#wfl_detail', scale: 1.5, for: 6 },
      ],
    },
    {
      chapter: 'Do Not Disturb',
      goto: '{demo}#/contacts/detail/c1',
      settle: 1.5,
      say: "Check five: Do Not Disturb. If one contact gets nothing at all, open their record and scroll to Do not disturb. When someone clicks unsubscribe, email D N D is switched on for them, and no campaign or workflow will email them. That's correct. Only switch it off if the contact has genuinely asked to hear from the business again.",
      caption: "Check five: Do Not Disturb. If one contact gets nothing at all, open their record and scroll to Do not disturb. When someone clicks unsubscribe, email DND is switched on for them, and no campaign or workflow will email them. That's correct. Only switch it off if the contact has genuinely asked to hear from the business again.",
      actions: [
        { at: 0.5, highlight: '#cd_sec_dnd', label: 'Do not disturb', for: 3.4 },
        { at: 4.6, zoom: '#cd_dnd', scale: 1.5, for: 9 },
        { at: 7.0, highlight: '#cd_dnd_emails', label: 'Email channel', for: 4 },
      ],
    },
    {
      chapter: 'Still in spam?',
      card: { type: 'chapter', kicker: 'Still in spam?', title: 'Check *sending habits*', sub: 'Warm up new domains slowly · Engaged contacts first · No shouty subjects or image-only emails · Unsubscribe link & address in every email' },
      say: "If everything is set up and verified, but mail still lands in spam, look at sending habits. A brand-new domain should start with small sends to engaged contacts, and grow over a few weeks. Avoid shouty subject lines, lots of links and image-only emails. And make sure every marketing email has a working unsubscribe link and the business address.",
    },
    {
      chapter: 'Dedicated IP',
      goto: '{demo}#/settings/email-services',
      settle: 1.5,
      say: "Customers sometimes ask whether a dedicated IP will fix things. It's an add-on at eighty-eight dollars fifty a month, and it only helps steady, high-volume senders, because an IP needs regular volume to build a good reputation. For a small sender with a set-up problem, it's not the answer. Fix the domain first.",
      caption: "Customers sometimes ask whether a dedicated IP will fix things. It's an add-on at $88.50 a month, and it only helps steady, high-volume senders, because an IP needs regular volume to build a good reputation. For a small sender with a set-up problem, it's not the answer. Fix the domain first.",
      actions: [
        { at: 0.5, highlight: '.ss-main .grid .grid .card:nth-child(2)', label: 'Dedicated IP add-on', for: 5 },
      ],
    },
    {
      chapter: 'Checklist',
      card: { type: 'chapter', kicker: 'Checklist', title: 'Email *deliverability*', sub: 'Symptom · Dedicated domain · DNS records · Verified · Bounces & logs · Contact DND · Sending habits' },
      say: "Here's the order. Clarify the symptom. Check for a dedicated domain. Check the DNS records. Confirm it's verified. Look for bounces in the logs. Check the contact's D N D. Then review sending habits. If all of that checks out, and emails still fail across the whole account, escalate, with screenshots of the domain status and the failed log entries.",
      caption: "Here's the order. Clarify the symptom. Check for a dedicated domain. Check the DNS records. Confirm it's verified. Look for bounces in the logs. Check the contact's DND. Then review sending habits. If all of that checks out, and emails still fail across the whole account, escalate, with screenshots of the domain status and the failed log entries.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Playbook C4', title: 'SMS & *A2P registration*', sub: 'Status checks and rejections.', cta: 'Kyntlo [Academy]' },
      say: "That's email deliverability. In the next playbook, we'll troubleshoot text messages and A two P registration.",
      caption: "That's email deliverability. In the next playbook, we'll troubleshoot text messages and A2P registration.",
    },
  ],
};
