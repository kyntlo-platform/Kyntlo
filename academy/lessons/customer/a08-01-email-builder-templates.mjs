// Track A · Module 8 · Lesson 1 — Email builder & templates.
// Filmed on the demo workspace (academy/demo-app): Marketing → Emails.
export default {
  id: 'A-8.1',
  title: 'Kyntlo Academy 8.1 — Email builder & templates',
  description:
    'Design a branded marketing email in Kyntlo: start from a template, edit text and buttons, add personalised merge fields, drag in new elements, check the mobile view and send yourself a test.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Email marketing', 'Email builder', 'Email templates'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 8 · Lesson 1', title: 'Design *branded emails*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 8 · Lesson 1', title: 'Email builder & *templates*', sub: 'Design emails that look like your brand, without writing any code.' },
      say: "Welcome to Module eight, all about marketing! In this lesson, you'll design a beautiful, branded email in Kyntlo's drag and drop builder. No code, no design skills needed.",
    },
    {
      chapter: 'Where emails live',
      goto: '{demo}#/marketing/emails',
      settle: 1,
      say: "Email campaigns live under Marketing, in the Emails tab. Here you can see every campaign you've created, whether it's a draft, scheduled or already sent, along with how many people opened and clicked it.",
      actions: [
        { at: 0.4, title: 'Marketing → Emails', sub: 'All your email campaigns', for: 3.5 },
        { at: 4.5, highlight: '#em_table', label: 'Your campaigns', for: 4 },
        { at: 9.5, hover: '#em_row_e1' },
        { at: 10.0, zoom: '#em_row_e1', scale: 1.5, for: 3.5 },
      ],
    },
    {
      chapter: 'Choose a template',
      say: "To create a new one, click New campaign. You can start from a blank canvas, a pre-built template, or one of your own saved templates. Saved templates are the secret to fast, consistent emails: build your branding once, and reuse it every time.",
      actions: [
        { at: 0.5, click: '#em_new' },
        { at: 2.5, highlight: '#em_tpl_blank', label: 'Start from scratch', for: 2.6 },
        { at: 5.6, highlight: '#em_tpl_offer', label: 'Your saved templates', for: 3.4 },
        { at: 9.6, zoom: '#em_tpls', scale: 1.25, for: 4.5 },
      ],
    },
    {
      chapter: 'The builder',
      say: "Let's pick the event invite. The builder has three parts. On the left are the elements you can add. In the middle is your email, exactly as people will see it. And on the right are the settings for whatever you've clicked on.",
      actions: [
        { at: 0.3, hover: '#em_tpl_event' },
        { at: 1.0, click: '#em_tpl_event' },
        { at: 3.8, highlight: '.eb-left', label: 'Elements', for: 3 },
        { at: 7.4, highlight: '#em_canvas', label: 'Your email', for: 3.4 },
        { at: 11.4, highlight: '#em_props', label: 'Settings', for: 3 },
      ],
    },
    {
      chapter: 'Name your campaign',
      say: "First, give your campaign a clear name at the top. Only your team sees this name, so make it easy to find later, like the event and the month.",
      actions: [
        { at: 0.4, click: '#em_name' },
        { at: 1.0, press: 'Control+A' },
        { at: 1.3, type: 'Invisalign Open Evening — November invite' },
        { at: 5.0, zoom: '.eb-top', scale: 1.6, for: 3.5 },
      ],
    },
    {
      chapter: 'Personalise with merge fields',
      say: "Now click the heading to edit it. Let's greet each person by name. Type Hi, then open Merge fields and choose First name. When the email goes out, Kyntlo swaps that placeholder for each contact's real first name.",
      actions: [
        { at: 0.4, click: '#em_c_text' },
        { at: 2.0, click: '#em_prop_text' },
        { at: 2.4, press: 'Control+A' },
        { at: 2.7, type: 'Hi ' },
        { at: 4.6, click: '#em_merge' },
        { at: 6.0, click: '.menu button:has-text("First name")' },
        { at: 7.0, type: ", you're invited to our Invisalign Open Evening", delay: 30 },
        { at: 10.6, zoom: '#em_c_text', scale: 1.7, for: 3.6 },
        { at: 10.8, highlight: '#em_c_text', label: '{{contact.first_name}}', for: 3.4 },
      ],
    },
    {
      chapter: 'Edit the button',
      say: "Next, the button. Click it, and change the text to something specific about what happens next. Below that is the website address it opens. A clear button is the single biggest thing that gets people to click.",
      actions: [
        { at: 0.4, click: '#em_c_button' },
        { at: 2.0, click: '#em_prop_btn_text' },
        { at: 2.3, press: 'Control+A' },
        { at: 2.6, type: 'Save my free scan' },
        { at: 6.0, highlight: '#em_prop_btn_url', label: 'Where it goes', for: 3 },
        { at: 9.4, zoom: '#em_c_button', scale: 1.7, for: 3.4 },
      ],
    },
    {
      chapter: 'Drag in new elements',
      say: "To add something new, drag an element from the left onto your email. Let's drop in a video, just under the button. Email apps can't play video inside the email, so Kyntlo shows a thumbnail with a play button that opens your video.",
      actions: [
        { at: 0.4, highlight: '.eb-tools', label: 'Text, image, button, divider, social, video', for: 3.4 },
        { at: 4.0, hover: '#em_block_video' },
        { at: 4.6, run: (page) => page.mouse.down() },
        { at: 5.0, hover: '#em_c_divider' },
        { at: 6.4, run: (page) => page.mouse.up() },
        { at: 7.6, click: '#em_prop_video_url' },
        { at: 8.0, press: 'Control+A' },
        { at: 8.3, type: 'https://youtube.com/watch?v=bloom-invisalign', delay: 25 },
        { at: 11.2, zoom: '#em_c_video', scale: 1.5, for: 3.4 },
      ],
    },
    {
      chapter: 'Check the mobile view',
      say: "Most people will read your email on their phone, so always check the mobile view. Click Mobile at the top. Everything stacks neatly into one column, and the button is still big enough to tap with a thumb.",
      actions: [
        { at: 0.6, click: '#em_mobile' },
        { at: 2.6, highlight: '#em_canvas', label: 'Mobile view', for: 4 },
        { at: 2.8, hover: '#em_canvas' },
        { at: 3.4, scroll: 500, ms: 1600 },
        { at: 8.2, scroll: -500, ms: 1200 },
        { at: 10.0, click: '#em_desktop' },
      ],
    },
    {
      chapter: 'Send a test email',
      say: "Before any real customer sees it, send a test to yourself. Click Send test email, check the address, and pick a contact to fill in the merge fields. Then open it on your own phone and click every link.",
      actions: [
        { at: 0.5, click: '#em_test' },
        { at: 2.4, highlight: '#em_test_to', label: 'Your inbox', for: 3 },
        { at: 5.8, highlight: '#em_test_contact', label: 'Sample contact for merge fields', for: 3 },
        { at: 9.4, click: '#em_test_send' },
      ],
    },
    {
      chapter: 'Save your work',
      say: "Happy with it? Click Save. Your campaign is stored as a draft, ready to send whenever you are. If you'll reuse this design, open the menu and choose Save as template. Next month's email then takes minutes, not hours.",
      actions: [
        { at: 0.6, click: '#em_save' },
        { at: 1.4, highlight: '#em_saved', label: 'Saved as a draft', for: 2.6 },
        { at: 5.2, click: '#em_more' },
        { at: 6.4, click: '#em_save_tpl' },
        { at: 8.6, click: '#em_back' },
        { at: 9.8, click: '#em_sub_templates' },
        { at: 11.0, highlight: '.mk-tpl:last-child', label: 'Your new template', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'One email, *one goal*', sub: 'A single message and a single button gets more clicks than five offers.' },
      say: "Here's a pro tip. Give every email one goal, and one main button. When you offer five different things, people usually choose none of them. Keep it short, friendly and focused.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 8.2', title: 'Sending an *email campaign*', sub: 'Choose your audience, schedule it and track the results.', cta: 'Kyntlo [Academy]' },
      say: "Great work! You've designed your first branded email. In the next lesson, we'll choose who receives it, schedule it, and see how it performs. See you there.",
    },
  ],
};
