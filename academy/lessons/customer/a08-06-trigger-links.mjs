// Track A · Module 8 · Lesson 6 — Trigger links & link tracking.
// Filmed on the demo workspace: Marketing → Trigger Links, the email builder and Automation (trigger picker).
export default {
  id: 'A-8.6',
  title: 'Kyntlo Academy 8.6 — Trigger links & link tracking',
  description:
    'Use trigger links in Kyntlo to see exactly which contacts clicked a link in your emails and texts, and start automations when they do: create a link, copy its key, use it in a campaign and read the click analytics.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Trigger links', 'Link tracking', 'Marketing automation'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 8 · Lesson 6', title: 'See *who clicked*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 8 · Lesson 6', title: 'Trigger links & *link tracking*', sub: 'Know exactly who clicked, and act on it.' },
      say: "A normal link tells you how many people clicked. A trigger link tells you who clicked, and can start an automation the moment they do. In this lesson, you'll create one, use it, and read the results.",
    },
    {
      chapter: 'What trigger links are',
      goto: '{demo}#/marketing/trigger-links',
      settle: 1,
      say: "Trigger links live under Marketing, Trigger Links. Each one has a name, the web address it points to, and a link key. You put the key in your emails and texts, and Kyntlo turns it into a tracked link for each contact.",
      actions: [
        { at: 0.4, title: 'Marketing → Trigger Links', sub: 'Tracked links', for: 3.6 },
        { at: 4.6, highlight: '#tl_table', label: 'Your trigger links', for: 3.6 },
        { at: 9.0, zoom: '#tl_row_l1', scale: 1.5, for: 4.6 },
        { at: 9.2, highlight: '#tl_row_l1 .tl-key', label: 'Link key', for: 4 },
      ],
    },
    {
      chapter: 'Create a link',
      say: "Let's create one for our November check-up reminder. Click Add Link. Give it a name your team will recognise, then paste the full web address of the page, including the https part. Click Save.",
      actions: [
        { at: 0.4, click: '#tl_add' },
        { at: 2.0, click: '#tl_name' },
        { at: 2.3, type: 'Book a Check-up' },
        { at: 5.0, click: '#tl_url' },
        { at: 5.3, type: 'https://bloomdental.co.uk/book-check-up', delay: 30 },
        { at: 8.4, zoom: '.modal', scale: 1.5, for: 3 },
        { at: 11.8, click: '#tl_save' },
      ],
    },
    {
      chapter: 'Copy the link key',
      say: "Your new link is in the list, with its own key. Click Copy. The key looks a little technical, but you don't need to understand it. Just paste it wherever you would normally paste a link.",
      actions: [
        { at: 0.4, highlight: '#tl_row_l4', label: 'Your new trigger link', for: 3.4 },
        { at: 4.2, click: '#tl_copy_l4' },
        { at: 5.0, zoom: '#tl_row_l4', scale: 1.6, for: 4 },
      ],
    },
    {
      chapter: 'Use it in an email',
      goto: '{demo}#/marketing/emails/builder/e4',
      settle: 1,
      say: "Here's our check-up reminder email in the builder. Click the button, and in the website address field, paste the link key instead of a normal web address. You can do the same in text messages, and in workflow emails and texts.",
      actions: [
        { at: 0.4, click: '#em_c_button' },
        { at: 2.6, click: '#em_prop_btn_url' },
        { at: 2.9, press: 'Control+A' },
        { at: 3.3, type: '{{trigger_link.W8m9kQbZ3Lps24YxRvTc}}', delay: 8 },
        { at: 5.0, zoom: '#em_props', scale: 1.6, for: 4.4 },
        { at: 5.2, highlight: '#em_prop_btn_url', label: 'Paste the link key', for: 4 },
        { at: 12.0, click: '#em_save' },
      ],
    },
    {
      chapter: 'What happens on a click',
      card: { type: 'chapter', kicker: 'Behind the scenes', title: 'One link, *every contact*', sub: 'Each person gets their own tracked link, so every click is tied to a contact.' },
      say: "When the email goes out, every contact gets their own personal version of that link. So when Olivia clicks it, Kyntlo knows it was Olivia, records it on her contact, and then sends her straight on to the page.",
    },
    {
      chapter: 'Act on clicks',
      goto: '{demo}#/automation/workflows/w6',
      settle: 1.2,
      say: "Here's where it gets powerful. In Automation, a workflow can start with the trigger called Trigger Link Clicked. For example, tag everyone who clicked, and create a task for your team to call them. Workflows are part of the Growth and Pro plans, and we'll build them in the next module.",
      actions: [
        { at: 0.6, click: '#wf_add_trigger' },
        { at: 2.6, click: '#wft_search' },
        { at: 2.9, type: 'link' },
        { at: 4.6, highlight: '#wft_trigger_link_clicked', label: 'Trigger Link Clicked', for: 4.4 },
        { at: 4.8, zoom: '#wft_list', scale: 1.6, for: 4.4 },
      ],
    },
    {
      chapter: 'Analyze your links',
      goto: '{demo}#/marketing/trigger-links/analyze',
      settle: 1,
      say: "Back in Trigger Links, open the Analyze tab and choose a link. You'll see total clicks, and unique clicks, which counts each person only once. The chart shows which days were busiest.",
      actions: [
        { at: 0.6, run: (page) => page.selectOption('#tl_an_link', 'l1') },
        { at: 1.2, highlight: '#tl_an_link', label: 'Choose a link', for: 2.6 },
        { at: 4.6, highlight: '#tl_an_total', label: 'Total clicks', for: 2.6 },
        { at: 7.4, highlight: '#tl_an_unique', label: 'Unique clicks', for: 3 },
        { at: 10.8, highlight: '#tl_an_chart', label: 'Clicks per day', for: 3 },
      ],
    },
    {
      chapter: 'Who clicked',
      say: "And here's the real gold: the people who clicked. These are warm leads. They saw your offer and wanted to know more. A quick, friendly message to each of them often turns a click into a booking.",
      actions: [
        { at: 0.4, highlight: '#tl_an_contacts', label: 'Warm leads', for: 4.4 },
        { at: 0.6, zoom: '#tl_an_contacts', scale: 1.5, for: 5 },
      ],
    },
    {
      chapter: 'Trigger links vs email stats',
      say: "You might wonder how this differs from the link report in your email statistics. That report covers one campaign. A trigger link follows the same offer across every email, text and post you use it in, keeps a history on each contact, and can start a workflow.",
      actions: [
        { at: 0.4, highlight: '#tl_an_total', label: 'Every channel, one link', for: 5 },
        { at: 8.0, highlight: '#tl_an_contacts', label: 'Saved on each contact', for: 5 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'One link per *offer*', sub: 'Name links after the offer, not the channel, and reuse them everywhere.' },
      say: "Here's a pro tip. Create one trigger link per offer, and use it everywhere: in emails, texts and social posts. Then one workflow can follow up with every interested person, wherever they clicked.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 9', title: 'Automation: how *workflows* think', sub: 'Triggers, actions and conditions, explained.', cta: 'Kyntlo [Academy]' },
      say: "That's the end of Module eight! You can now design emails, send campaigns, text, post and track every click. Next, in Module nine, we'll put it all on autopilot with workflows. See you there.",
      caption: "That's the end of Module 8! You can now design emails, send campaigns, text, post and track every click. Next, in Module 9, we'll put it all on autopilot with workflows. See you there.",
    },
  ],
};
