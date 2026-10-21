// Track A · Module 7 · Lesson 2 — Build a funnel from a template.
// Filmed on the demo workspace (academy/demo-app), screen: Sites → Funnels.
export default {
  id: 'A-7.2',
  title: 'Kyntlo Academy 7.2 — Build a funnel from a template',
  description:
    'Create a complete funnel in minutes: pick a template from the library, preview it, make it yours with your logo, headline, button and images, then save, publish and set a clean URL.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Funnel templates', 'Landing page', 'Funnel builder'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 7 · Lesson 2', title: 'A funnel from a *template*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 7 · Lesson 2', title: 'Build a funnel from a *template*', sub: 'Choose, customise and publish in minutes.' },
      say: "In this lesson, you'll build a complete funnel without starting from a blank page. We'll pick a template, make it look like your business, and publish it. Let's go.",
    },
    {
      chapter: 'New funnel',
      goto: '{demo}#/sites/funnels',
      settle: 1,
      say: "Go to Sites, then Funnels, and click New Funnel. You can start from blank, use a template, or let Funnels AI draft one for you. Funnels AI is billed per funnel, so today we'll use a free template.",
      actions: [
        { at: 0.6, click: '#fn_new' },
        { at: 2.6, highlight: '#fn_new_blank', label: 'Start from scratch', for: 2.6 },
        { at: 5.4, highlight: '#fn_new_template', label: 'Ready-made designs', for: 2.6 },
        { at: 8.2, highlight: '#fn_new_ai', label: 'Funnels AI · usage-based', for: 3 },
      ],
    },
    {
      chapter: 'Templates library',
      say: "Click From Template to open the library. Use the categories on the left to narrow things down. There are designs for dental and health practices, local businesses, and lead generation.",
      actions: [
        { at: 0.4, click: '#fn_new_template' },
        { at: 2.8, click: '#tl_cat_dental' },
        { at: 4.6, highlight: '#tl_t1', label: 'Dental — Free Consultation', for: 4 },
      ],
    },
    {
      chapter: 'Preview first',
      say: "Before you choose, preview the template. Check it on mobile too, because that's where most of your visitors will see it. This one has a clear headline, a short form, and a strong call to action.",
      actions: [
        { at: 0.4, click: '[data-prev="t1"]' },
        { at: 3.4, click: '#pv_mobile' },
        { at: 6.0, scroll: 500, ms: 1600 },
        { at: 9.4, click: '#pv_close' },
      ],
    },
    {
      chapter: 'Name your funnel',
      say: "Happy with it? Click Use, and give your funnel a name you'll recognise later. Bloom is launching dental implants, so we'll call it Dental Implants Consultation.",
      actions: [
        { at: 0.4, click: '#tl_use_t1' },
        { at: 2.2, type: 'Dental Implants Consultation', into: '#fn_name', delay: 45 },
        { at: 6.6, click: '#fn_create' },
      ],
    },
    {
      chapter: 'Your new steps',
      say: "And just like that, you have a three-step funnel: an opt-in page, a booking page, and a thank-you page. Each step is still a draft, so nothing is live yet. Let's open the first step and click Edit.",
      actions: [
        { at: 0.4, highlight: '#fn_steps', label: 'Three steps, ready to edit', for: 4.2 },
        { at: 5.6, highlight: '#fn_step_card .chip', label: 'Draft', for: 2.4 },
        { at: 9.6, click: '#fn_edit' },
      ],
    },
    {
      chapter: 'Your logo & phone',
      speed: 1.2,
      say: "Welcome to the page builder. First, make it yours. Click the business name at the top and type your own. In the settings panel on the right, update the phone number too.",
      actions: [
        { at: 0.4, title: 'Page builder', sub: 'Click anything to edit it', for: 3 },
        { at: 2.6, click: '#pb_el_nav' },
        { at: 3.2, press: 'Control+A' },
        { at: 3.4, type: 'Bloom Dental Studio', delay: 45 },
        { at: 6.4, click: '#pb_prop_phone' },
        { at: 6.7, press: 'Control+A' },
        { at: 6.9, type: '020 7946 0321', delay: 45 },
      ],
    },
    {
      chapter: 'Headline',
      speed: 1.2,
      say: "Now the headline, the most important words on the page. Say exactly what visitors get. Click it, select the text, and type your own.",
      actions: [
        { at: 0.4, click: '#pb_el_headline' },
        { at: 1.4, press: 'Control+A' },
        { at: 1.6, type: 'Book your free implant consultation', delay: 45 },
        { at: 6.0, zoom: '#pb_el_headline', scale: 1.4, for: 2.8 },
      ],
    },
    {
      chapter: 'Button & colours',
      say: "Select the button. Here you can change its text, its colour, and what happens when someone clicks. In this template, it scrolls down to the form. Let's switch the colour to Bloom's teal.",
      actions: [
        { at: 0.4, click: '#pb_el_cta' },
        { at: 2.4, highlight: '#pb_prop_btntext', label: 'Button text', for: 2.4 },
        { at: 5.0, highlight: '#pb_prop_action', label: 'What happens on click', for: 3.4 },
        { at: 9.0, click: '#pb_bg_3' },
      ],
    },
    {
      chapter: 'Images',
      say: "Swap the template image for one of yours. Select the image, click Replace image, and pick a photo. Then add alt text, a short description that helps Google and screen readers.",
      actions: [
        { at: 0.4, click: '#pb_el_heroimg' },
        { at: 2.4, click: '#pb_prop_replace' },
        { at: 3.6, click: '.menu button:has-text("Our team")' },
        { at: 6.4, click: '#pb_prop_alt' },
        { at: 6.7, press: 'Control+A' },
        { at: 6.9, type: 'The Bloom Dental team in Marylebone', delay: 35 },
      ],
    },
    {
      chapter: 'Save & publish',
      say: "Click Save as you go. When you're ready for the world to see it, click Publish. The status at the top tells you everything is saved.",
      actions: [
        { at: 0.4, click: '#pb_save' },
        { at: 2.6, click: '#pb_publish' },
        { at: 3.6, highlight: '#pb_status', label: 'All changes saved', for: 2.6 },
      ],
    },
    {
      chapter: 'Clean URL',
      say: "Back in the funnel, give the step a clean web address. Open the step menu, choose Edit name and path, and type something short and descriptive, like implant consultation.",
      actions: [
        { at: 0.4, click: '#pb_back' },
        { at: 2.2, click: '#fn_step_more' },
        { at: 3.2, click: '.menu button:has-text("Edit name & path")' },
        { at: 5.0, click: '#fn_es_path' },
        { at: 5.3, press: 'Control+A' },
        { at: 5.5, type: 'implant-consultation', delay: 45 },
        { at: 8.6, click: '#fn_es_save' },
        { at: 9.4, highlight: '#fn_step_url', label: 'Your live page', for: 2.4 },
      ],
    },
    {
      chapter: 'Next steps',
      say: "Repeat the same edits on the booking and thank-you steps, so the whole journey looks like you. In lesson seven point five, we'll connect your own domain to it.",
      caption: 'Repeat the same edits on the booking and thank-you steps, so the whole journey looks like you. In lesson 7.5, we\'ll connect your own domain to it.',
      actions: [
        { at: 0.4, highlight: '#fn_steps', label: 'Edit every step', for: 4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Keep the *structure*, change the *words*', sub: 'Templates are laid out to convert.' },
      say: "Here's a pro tip. Templates are laid out to convert, so resist the urge to redesign them. Keep the structure, and spend your time on the words: a clear headline, real benefits, and one obvious next step.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 7.3', title: 'The *page builder* in depth', sub: 'Sections, rows, columns, elements and mobile view.', cta: 'Kyntlo [Academy]' },
      say: "Your first funnel is live! Next, we'll go deeper into the page builder: sections, rows, columns, elements, and mobile view. See you there.",
    },
  ],
};
