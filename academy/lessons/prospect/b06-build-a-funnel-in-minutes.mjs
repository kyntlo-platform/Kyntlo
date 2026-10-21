// Track B · Video 6 — Build a funnel in minutes. Template → edit → publish, with long building scenes sped up.
// Plan facts (pricing.html): funnels, pages, forms & surveys = every plan (Starter+).
// Scenes after the first `goto` share state and must run in order.
export default {
  id: 'B6',
  title: 'Build a Funnel in Minutes — From Template to Live Page | Kyntlo',
  description:
    'Pick a ready-made funnel template, add your business name, headline, colours and photo, publish it, and track views and opt-ins, without a designer or developer.',
  tags: ['Kyntlo', 'Funnel builder', 'Landing page builder', 'Sales funnel', 'Lead generation'],
  thumbnail: { kicker: 'Build a funnel in minutes', title: 'From template to *live page*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Build a funnel in minutes', title: 'From template to *live page*', sub: 'No designer. No developer.' },
      say: "Need a landing page that turns visitors into bookings? Let's build one from a template, and publish it, in just a few minutes.",
    },
    {
      chapter: 'New funnel',
      goto: '{demo}#/sites/funnels',
      settle: 1,
      say: "In Sites, click New Funnel. Start from a blank page, a ready-made template, or let Funnels AI draft one for you.",
      actions: [
        { at: 0.4, title: 'Sites → Funnels', sub: 'Funnels, websites & forms', for: 3 },
        { at: 1.6, click: '#fn_new' },
        { at: 3.0, highlight: '#fn_new_blank', label: 'Blank', for: 1.6 },
        { at: 4.8, highlight: '#fn_new_template', label: 'Ready-made designs', for: 1.8 },
        { at: 6.8, highlight: '#fn_new_ai', label: 'Funnels AI', for: 1.6 },
      ],
    },
    {
      chapter: 'Pick a template',
      say: "Choose a category. There are designs for dental and health practices, local businesses, and lead generation. This dental template is a great start.",
      actions: [
        { at: 0.3, click: '#fn_new_template' },
        { at: 2.4, click: '#tl_cat_dental' },
        { at: 4.8, highlight: '#tl_t1', label: 'Dental — Free Consultation', for: 3 },
        { at: 5.0, zoom: '#tl_t1', scale: 1.4, for: 3 },
      ],
    },
    {
      chapter: 'Preview & create',
      speed: 1.5,
      say: "Preview it on mobile too, because that's where many of your visitors will see it. Then click Use, and give your funnel a name.",
      actions: [
        { at: 0.3, click: '[data-prev="t1"]' },
        { at: 1.8, click: '#pv_mobile' },
        { at: 4.4, click: '#pv_close' },
        { at: 5.2, click: '#tl_use_t1' },
        { at: 6.0, type: 'Dental Implants Consultation', into: '#fn_name', delay: 35 },
        { at: 7.8, click: '#fn_create' },
      ],
    },
    {
      chapter: 'Three steps, instantly',
      say: "Instantly, you have a three-step funnel: an opt-in page, a booking page, and a thank-you page. Let's open the builder.",
      actions: [
        { at: 0.4, highlight: '#fn_steps', label: 'Opt-in · Booking · Thank you', for: 4.6 },
        { at: 0.6, zoom: '#fn_steps', scale: 1.3, for: 4.4 },
        { at: 6.4, click: '#fn_edit' },
      ],
    },
    {
      chapter: 'Make it yours',
      speed: 1.5,
      say: "Click anything to edit it. Add your business name, then write a headline that says exactly what visitors get.",
      actions: [
        { at: 0.3, title: 'Page builder', sub: 'Click anything to edit it', for: 2.6 },
        { at: 1.2, click: '#pb_el_nav' },
        { at: 1.6, press: 'Control+A' },
        { at: 1.8, type: 'Bloom Dental Studio', delay: 35 },
        { at: 3.6, click: '#pb_el_headline' },
        { at: 4.0, press: 'Control+A' },
        { at: 4.2, type: 'Book your free implant consultation', delay: 35 },
        { at: 6.0, zoom: '#pb_el_headline', scale: 1.4, for: 1.6 },
      ],
    },
    {
      chapter: 'Colours & photos',
      speed: 1.5,
      say: "Change the button colour to match your brand, and swap the photo for one of your own.",
      actions: [
        { at: 0.3, click: '#pb_el_cta' },
        { at: 1.6, click: '#pb_bg_3' },
        { at: 3.0, click: '#pb_el_heroimg' },
        { at: 3.8, click: '#pb_prop_replace' },
        { at: 4.6, click: '.menu button:has-text("Our team")' },
      ],
    },
    {
      chapter: 'Publish',
      say: "Click Save, then Publish. And that's it: your page is live.",
      actions: [
        { at: 0.4, click: '#pb_save' },
        { at: 1.6, click: '#pb_publish' },
        { at: 2.4, highlight: '#pb_status', label: 'All changes saved', for: 2 },
      ],
    },
    {
      chapter: 'Share it',
      speed: 1.3,
      say: "Give it a clean web address, and share it in your ads, emails and social posts. Every form fill lands in your CRM, ready for follow-up.",
      actions: [
        { at: 0.4, click: '#pb_back' },
        { at: 1.8, click: '#fn_step_more' },
        { at: 2.6, click: '.menu button:has-text("Edit name & path")' },
        { at: 3.8, click: '#fn_es_path' },
        { at: 4.1, press: 'Control+A' },
        { at: 4.3, type: 'implant-consultation', delay: 40 },
        { at: 6.4, click: '#fn_es_save' },
        { at: 7.2, highlight: '#fn_step_url', label: 'Your live page', for: 2.4 },
      ],
    },
    {
      chapter: 'See what works',
      goto: '{demo}#/sites/funnels/f1/stats',
      settle: 1,
      say: "Then watch the results. Kyntlo tracks views, opt-ins and conversion rates for every step, so you know exactly what's working.",
      actions: [
        { at: 0.4, title: 'Funnel stats', sub: 'Views · opt-ins · conversion', for: 3 },
        { at: 3.4, highlight: '#fn_stats_tiles', label: 'The headline numbers', for: 3 },
        { at: 3.6, zoom: '#fn_stats_tiles', scale: 1.4, for: 3 },
        { at: 7.0, highlight: '#fn_stats_table', label: 'Step by step', for: 2 },
      ],
    },
    {
      chapter: 'Every plan',
      card: { type: 'chapter', kicker: 'Included', title: 'Funnels & forms on *every plan*', sub: 'Funnels, pages, forms and surveys come with Starter, Growth and Pro.' },
      say: "Funnels, pages, forms and surveys are included in every Kyntlo plan, starting with Starter.",
    },
    {
      chapter: 'Start your free trial',
      card: { type: 'outro', kicker: 'Build a funnel in minutes', title: 'Start your free *14-day trial*', sub: 'No setup fees · Cancel anytime', cta: 'kyntlo.ai/[trial]' },
      say: "Your next landing page is just a few minutes away. Start your free fourteen-day trial today, at kyntlo dot A I.",
    },
  ],
};
