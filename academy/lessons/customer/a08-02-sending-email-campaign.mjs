// Track A · Module 8 · Lesson 2 — Sending an email campaign.
// Filmed on the demo workspace (academy/demo-app): Marketing → Emails → Send or schedule → Statistics.
export default {
  id: 'A-8.2',
  title: 'Kyntlo Academy 8.2 — Sending an email campaign',
  description:
    'Send an email campaign in Kyntlo: choose your audience by tag or smart list, set the sender, write a subject line and preview text, test it, schedule it, and read the results.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Email marketing', 'Email campaigns', 'Newsletter'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 8 · Lesson 2', title: 'Send your *email campaign*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 8 · Lesson 2', title: 'Sending an *email campaign*', sub: 'Audience, subject line, test, schedule, results.' },
      say: "In the last lesson, you designed an email. Now let's send one! You'll choose exactly who gets it, write a subject line people want to open, schedule it, and then read the results.",
    },
    {
      chapter: 'Open your draft',
      goto: '{demo}#/marketing/emails',
      settle: 1,
      say: "Here in Marketing, Emails, we have a draft ready to go: the November check-up reminder. Click it to open the builder, give it one last look, then click Send or schedule in the top corner.",
      actions: [
        { at: 0.5, highlight: '#em_row_e4', label: 'Draft campaign', for: 3.4 },
        { at: 4.4, click: '#em_row_e4' },
        { at: 7.8, hover: '#em_canvas' },
        { at: 9.6, click: '#em_next' },
      ],
    },
    {
      chapter: 'Choose your audience',
      say: "Step one is recipients. You can send to all contacts, a smart list, or anyone with certain tags. This reminder is only for patients due a check-up, so choose Tags, and pick check-up. Kyntlo shows you how many people that is.",
      actions: [
        { at: 0.4, highlight: '#em_sec_to', label: 'Recipients', for: 3.6 },
        { at: 4.6, click: '#em_to_list' },
        { at: 6.4, click: '#em_to_tags' },
        { at: 8.6, click: '#em_tag_check-up' },
        { at: 10.6, zoom: '#em_count', scale: 1.7, for: 3.8 },
      ],
    },
    {
      chapter: 'Who gets skipped',
      say: "Notice the note underneath. Anyone who unsubscribed, or has email turned off in Do Not Disturb, is skipped automatically. You never have to clean the list by hand before you send.",
      actions: [
        { at: 0.4, highlight: '#em_count', label: 'Unsubscribed & DND skipped', for: 5 },
        { at: 0.6, zoom: '#em_count', scale: 1.6, for: 5 },
      ],
    },
    {
      chapter: 'Sender details',
      say: "Step two is the sender. Use a name people recognise, like your business name, and an email address on your own domain. The green badge means your dedicated sending domain is set up and verified. We'll cover why that matters in the next lesson.",
      actions: [
        { at: 0.4, highlight: '#em_sec_from', label: 'From name & email', for: 4.4 },
        { at: 8.0, zoom: '#em_domain', scale: 1.8, for: 4 },
        { at: 8.2, highlight: '#em_domain', label: 'Verified domain', for: 3.8 },
      ],
    },
    {
      chapter: 'Subject line & preview text',
      say: "Step three is your subject line. Keep it short and personal. Type it, then add the first name merge field in front. The preview text is the grey line people see next to the subject in their inbox. Use it to give one more reason to open.",
      actions: [
        { at: 0.4, click: '#em_subject' },
        { at: 0.8, type: 'your six-month check-up is due', delay: 35 },
        { at: 4.6, click: '#em_subject_merge' },
        { at: 5.8, click: '.menu button:has-text("First name")' },
        { at: 8.6, click: '#em_preview_text' },
        { at: 9.0, type: 'Evening and Saturday slots available. Book in under a minute.', delay: 25 },
        { at: 12.6, zoom: '#em_inbox_preview', scale: 1.5, for: 4 },
        { at: 12.8, highlight: '#em_inbox_preview .card-b > .row', label: 'How it looks in the inbox', for: 3.6 },
      ],
    },
    {
      chapter: 'Test before you send',
      say: "Always send yourself a test before the real thing. Click Send test email, then check it on your phone and your computer. Look for typos, broken links, and make sure the first name fills in properly.",
      actions: [
        { at: 0.5, click: '#em_send_test' },
        { at: 2.6, highlight: '#em_test_to', label: 'Send to yourself', for: 3 },
        { at: 6.4, click: '#em_test_send' },
      ],
    },
    {
      chapter: 'Schedule it',
      say: "Step four: when to send. Send now goes out straight away. Schedule lets you pick a date and time, in your account's time zone. Let's choose Tuesday the third of November, at ten in the morning.",
      caption: "Step 4: when to send. Send now goes out straight away. Schedule lets you pick a date and time, in your account's time zone. Let's choose Tuesday 3 November, at 10:00.",
      actions: [
        { at: 0.4, highlight: '#em_sec_when', label: 'When to send', for: 3.2 },
        { at: 4.4, click: '#em_when_later' },
        { at: 7.6, click: '#em_date' },
        { at: 8.0, press: 'Control+A' },
        { at: 8.3, type: 'Tue 3 Nov 2026' },
        { at: 10.4, zoom: '#em_sec_when', scale: 1.5, for: 3.6 },
      ],
    },
    {
      chapter: 'Sending in batches',
      say: "For big lists, there's also Send in batches. Kyntlo sends a set number of emails, waits, then sends the next group. It's gentler on your sending reputation. You'll use this in the next lesson.",
      actions: [
        { at: 0.5, click: '#em_when_batch' },
        { at: 2.4, highlight: '#em_batch_info', label: 'Batches', for: 4 },
        { at: 2.6, zoom: '#em_sec_when', scale: 1.4, for: 4 },
        { at: 9.4, click: '#em_when_later' },
      ],
    },
    {
      chapter: 'Confirm & schedule',
      say: "Now click Schedule. Kyntlo shows a quick summary: the campaign, how many people, and exactly when. Confirm, and you're done. Your campaign now shows as scheduled in the list.",
      actions: [
        { at: 0.5, click: '#em_send_go' },
        { at: 2.4, zoom: '.modal', scale: 1.5, for: 3.6 },
        { at: 6.4, click: '#em_confirm' },
        { at: 8.4, highlight: '#em_row_e4', label: 'Scheduled', for: 3.4 },
      ],
    },
    {
      chapter: 'Reading the results',
      say: "Once a campaign has gone out, click it to see the results. Delivered, opened and clicked are the big three. Open rates are estimates, because some email apps hide opens, so clicks are the most reliable sign of interest.",
      actions: [
        { at: 0.5, click: '#em_row_e1' },
        { at: 2.6, highlight: '.mk-stats', label: 'Campaign statistics', for: 3.6 },
        { at: 7.0, zoom: '#em_st_opened', scale: 1.8, for: 3 },
        { at: 10.6, highlight: '#em_st_clicked', label: 'Clicks: the real signal', for: 3.4 },
      ],
    },
    {
      chapter: 'Links & recipients',
      say: "Link activity shows which links people clicked, so you know what caught their interest. And the recipients list shows who did what, one person at a time. Someone who clicked to book but didn't finish? That's a perfect person to call.",
      actions: [
        { at: 0.4, highlight: '#em_st_links', label: 'Clicks per link', for: 4 },
        { at: 0.6, zoom: '#em_st_links', scale: 1.4, for: 4 },
        { at: 5.6, scroll: 500, ms: 1200 },
        { at: 7.4, highlight: '#em_st_recipients', label: 'Who opened & clicked', for: 4.4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Send when your *patients read*', sub: 'Test a weekday morning against an evening, and keep the winner.' },
      say: "Here's a pro tip. The best time to send depends on your audience. Try a weekday morning one month, and an early evening the next. Compare the click rates, and stick with the winner.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 8.3', title: 'Email *deliverability* basics', sub: 'Land in the inbox, not the spam folder.', cta: 'Kyntlo [Academy]' },
      say: "You've sent your first campaign! Next, we'll make sure your emails land in the inbox and not the spam folder, with a few simple deliverability basics. See you there.",
    },
  ],
};
