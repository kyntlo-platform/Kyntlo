// Track A · Module 7 · Lesson 4 — Forms & surveys.
// Filmed on the demo workspace (academy/demo-app), screen: Sites → Forms / Surveys.
export default {
  id: 'A-7.4',
  title: 'Kyntlo Academy 7.4 — Forms & surveys',
  description:
    'Build lead forms that fill your CRM: standard and custom fields, required fields, conditional logic, what happens on submit, notifications, styling and embedding. Plus multi-step surveys with progress bars and jump logic.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Form builder', 'Surveys', 'Lead capture'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 7 · Lesson 4', title: 'Forms & *surveys*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 7 · Lesson 4', title: 'Forms & *surveys*', sub: 'Build, style, add logic and embed.' },
      say: "Forms are how visitors become contacts. In this lesson, you'll build a form, add conditional logic, decide what happens when someone submits it, and embed it anywhere. Then we'll look at surveys.",
    },
    {
      chapter: 'Your forms',
      goto: '{demo}#/sites/forms',
      settle: 1,
      say: "Go to Sites, then Forms. Here are Bloom's forms, with how many submissions each one has received. The Analyze tab shows conversion rates, and Submissions lists every entry. Let's open the Invisalign Enquiry form.",
      actions: [
        { at: 0.4, highlight: '#fm_table', label: 'Your forms', for: 3.6 },
        { at: 5.6, highlight: '#fm_sub_analyze', label: 'Conversion rates', for: 2.4 },
        { at: 8.2, highlight: '#fm_sub_submissions', label: 'Every entry', for: 2.4 },
        { at: 11.4, click: '#fm_row_fm1' },
      ],
    },
    {
      chapter: 'The form builder',
      say: "The form builder has three parts. Fields on the left, your form in the middle, and the settings for whichever field you select on the right.",
      actions: [
        { at: 0.4, highlight: '#fb_left', label: 'Fields', for: 2.4 },
        { at: 3.0, highlight: '#fb_card', label: 'Your form', for: 2.4 },
        { at: 5.4, click: '#fb_f_phone' },
        { at: 6.2, highlight: '#fb_props', label: 'Field settings', for: 2.6 },
      ],
    },
    {
      chapter: 'Standard & custom fields',
      say: "Standard fields, like name, phone and email, fill in the contact record automatically. Custom fields store anything else you need, like which treatment someone wants. Every answer is saved on the contact, so you can filter and automate with it later.",
      actions: [
        { at: 0.4, highlight: '#fb_prop_req', label: 'Required', for: 2.6 },
        { at: 6.4, click: '#fb_f_treatment' },
        { at: 7.4, highlight: '#fb_f_treatment', label: 'Custom field', for: 3.4 },
      ],
    },
    {
      chapter: 'Add a field',
      speed: 1.2,
      say: "To add a field, click it in the list. We'll add a Radio question, then give it a label and two options. Bloom wants to know whether Invisalign enquirers have had braces before.",
      actions: [
        { at: 0.6, click: '#fb_add_radio' },
        { at: 2.4, click: '#fb_prop_label' },
        { at: 2.7, press: 'Control+A' },
        { at: 2.9, type: 'Have you had braces before?', delay: 40 },
        { at: 5.6, click: '#fb_prop_options' },
        { at: 5.9, press: 'Control+A' },
        { at: 6.1, type: 'Yes\nNo', delay: 80 },
      ],
    },
    {
      chapter: 'Conditional logic',
      say: "That question only makes sense for Invisalign leads. So open Options and add a conditional rule. If the treatment is Invisalign, then show the braces question. Everyone else never sees it, which keeps the form short.",
      actions: [
        { at: 0.4, click: '#fb_tab_options' },
        { at: 2.4, click: '#fb_logic_add' },
        { at: 4.0, highlight: '.modal', label: 'IF Invisalign → SHOW question', for: 4.6 },
        { at: 9.8, click: '#fb_lg_save' },
      ],
    },
    {
      chapter: 'On submit',
      say: "Next, decide what happens after someone submits. You can show a thank-you message, or send them to a page. A dedicated thank-you page is great, because you can track it as a conversion in your ad accounts.",
      actions: [
        { at: 0.4, highlight: '#fb_os_message', label: 'Show a message', for: 2.6 },
        { at: 4.6, click: '#fb_os_url' },
        { at: 5.4, highlight: '#fb_os_link', label: 'Or redirect to a page', for: 3.6 },
      ],
    },
    {
      chapter: 'Notifications & follow-up',
      say: "Switch on email notifications, so your team knows the moment a lead arrives. To tag the contact, send a text, or create an opportunity, build a workflow with the Form Submitted trigger. We cover that in Module Nine.",
      caption: 'Switch on email notifications, so your team knows the moment a lead arrives. To tag the contact, send a text, or create an opportunity, build a workflow with the Form Submitted trigger. We cover that in Module 9.',
      actions: [
        { at: 0.4, highlight: '#fb_notify', label: 'Instant alerts', for: 3 },
        { at: 5.0, highlight: '#fb_wf', label: 'Form Submitted workflow', for: 4.4 },
      ],
    },
    {
      chapter: 'Styles',
      say: "In Styles, match the form to your brand: button colour, background, width, and whether labels show above each field. Then click Save.",
      actions: [
        { at: 0.4, click: '#fb_tab_styles' },
        { at: 2.2, click: '#fb_btn_0' },
        { at: 3.6, click: '#fb_btn_1' },
        { at: 5.0, highlight: '#fb_w_560', label: 'Form width', for: 2.4 },
        { at: 7.6, click: '#fb_save' },
      ],
    },
    {
      chapter: 'Embed anywhere',
      say: "To use the form on another website, click Integrate. Choose a layout, like inline or popup, then copy the embed code and paste it into your site. There's also a direct link you can share anywhere.",
      actions: [
        { at: 0.4, click: '#fb_integrate' },
        { at: 2.6, click: '#fb_int_popup' },
        { at: 4.0, click: '#fb_int_inline' },
        { at: 5.6, highlight: '#fb_embed_code', label: 'Embed code', for: 3 },
        { at: 8.8, click: '#fb_copy_embed' },
      ],
    },
    {
      chapter: 'On Kyntlo pages',
      say: "On your Kyntlo funnels and websites, you don't need any code. Just add a Form element in the page builder and choose this form.",
      actions: [
        { at: 0.4, zoom: '#fb_int_body', scale: 1.3, for: 3.4 },
        { at: 5.6, click: '.modal [data-close]' },
      ],
    },
    {
      chapter: 'Surveys',
      goto: '{demo}#/sites/surveys',
      settle: 1,
      say: "Surveys work like forms, but ask one question per slide. They feel like a quick quiz, so more people finish them. Here's Bloom's Smile Assessment Quiz.",
      actions: [
        { at: 0.4, highlight: '#sv_row_sv1', label: 'Multi-step survey', for: 3.4 },
        { at: 5.6, click: '#sv_row_sv1' },
      ],
    },
    {
      chapter: 'Slides & logic',
      say: "Each slide holds one or two questions, and the progress bar shows how close people are to the end. Slide logic lets you jump past slides that don't apply, or disqualify people who aren't a good fit.",
      actions: [
        { at: 0.4, highlight: '#sv_slide_1', label: 'One question per slide', for: 3 },
        { at: 3.8, click: '#sv_slide_2' },
        { at: 5.2, highlight: '#sv_progress', label: 'Progress bar', for: 2.4 },
        { at: 8.4, click: '#sv_slide_1' },
        { at: 9.2, highlight: '#sv_logic', label: 'Jump logic', for: 3 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Fewer fields, *more leads*', sub: 'Ask the rest later, by text or on the call.' },
      say: "Here's a pro tip. Every field you add costs you leads. Ask only for what you need to follow up, usually name, phone and email, and collect everything else later.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 7.5', title: 'Connecting your *domain*', sub: 'DNS, SSL and default pages.', cta: 'Kyntlo [Academy]' },
      say: "Your forms are ready to collect leads. Next, we'll connect your own domain, so your pages live at your business web address. See you there.",
    },
  ],
};
