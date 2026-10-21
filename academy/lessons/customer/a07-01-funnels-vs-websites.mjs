// Track A · Module 7 · Lesson 1 — Funnels vs. websites.
// Filmed on the demo workspace (academy/demo-app), screen: Sites.
export default {
  id: 'A-7.1',
  title: 'Kyntlo Academy 7.1 — Funnels vs. websites',
  description:
    'Understand the difference between a funnel and a website in Kyntlo, when to use each one, and how they work together to turn visitors into booked appointments.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Funnels', 'Website builder', 'Landing pages'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 7 · Lesson 1', title: 'Funnels vs. *websites*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 7 · Lesson 1', title: 'Funnels vs. *websites*', sub: 'Pick the right tool for every page you build.' },
      say: "Welcome to Module Seven, all about Sites. Before we build anything, let's answer the most common question: should you build a funnel, or a website? By the end of this lesson, you'll know exactly when to use each.",
      caption: "Welcome to Module 7, all about Sites. Before we build anything, let's answer the most common question: should you build a funnel, or a website? By the end of this lesson, you'll know exactly when to use each.",
    },
    {
      chapter: 'The Sites area',
      goto: '{demo}#/sites/funnels',
      settle: 1,
      say: "Everything people see on the web lives here, under Sites. Funnels, websites, forms, surveys, your chat widget, QR codes, blogs and domains. They all share the same page builder, so once you learn it, you can build anything.",
      actions: [
        { at: 0.4, highlight: '#sb_sites', label: 'Sites', for: 2.6 },
        { at: 3.2, highlight: '#tabs', label: 'Everything public-facing', for: 5 },
        { at: 3.4, zoom: '#tabs', scale: 1.5, for: 4.6 },
      ],
    },
    {
      chapter: 'What a funnel is',
      say: "Let's start with funnels. A funnel is a short series of pages that guides someone towards one single action, like booking a free consultation. There's no menu and nothing to wander off to. Every page has one job, and the visitor always knows what to do next.",
      actions: [
        { at: 0.4, highlight: '#fn_table', label: 'Your funnels', for: 3.6 },
        { at: 4.6, hover: '#fn_row_f1' },
        { at: 9.4, click: '#fn_row_f1' },
      ],
    },
    {
      chapter: 'Funnel steps',
      say: "Each page in a funnel is called a step. Bloom's Invisalign funnel has three. First, an opt-in page that collects the visitor's details. Then a booking page with a calendar. And finally, a thank-you page.",
      actions: [
        { at: 0.4, highlight: '#fn_steps', label: 'Steps, in order', for: 3.8 },
        { at: 5.6, hover: '#fn_step_s1' },
        { at: 5.8, zoom: '#fn_step_card', scale: 1.25, for: 3.2 },
        { at: 9.4, click: '#fn_step_s2' },
        { at: 12.8, click: '#fn_step_s3' },
      ],
    },
    {
      chapter: 'Why funnels convert',
      say: "Because a funnel is a fixed path, it's easy to measure. You can see how many people reached each step, and exactly where they dropped off. That makes funnels perfect for ads, special offers and promotions.",
      actions: [
        { at: 0.6, click: '#fn_tab_stats' },
        { at: 2.4, highlight: '#fn_stats_table', label: 'Every step is measured', for: 4.6 },
        { at: 8.0, highlight: '#fn_stats_tiles', label: 'Ideal for ads & offers', for: 3.6 },
      ],
    },
    {
      chapter: 'What a website is',
      say: "Now, websites. A website is a set of pages joined by a navigation menu, so visitors can explore at their own pace. Home, treatments, about us, contact. It's your online shop window, and the place people check before they trust you with their teeth.",
      actions: [
        { at: 0.4, click: '#tab_websites' },
        { at: 2.4, highlight: '#fn_row_ws1', label: 'Your website', for: 3 },
        { at: 5.6, click: '#fn_row_ws1' },
        { at: 7.4, highlight: '#fn_steps', label: 'Pages, not steps', for: 3.4 },
      ],
    },
    {
      chapter: 'Website pages',
      say: "Notice the menu across the top of the page. People who are still researching like to browse, compare treatments and get to know you. A website is also what Google shows when someone searches for a dentist near them.",
      actions: [
        { at: 0.4, zoom: '#fn_var_a', scale: 1.5, for: 5 },
        { at: 0.6, highlight: '#fn_var_a', label: 'Navigation menu', for: 4.4 },
        { at: 6.4, click: '#fn_step_invisalign' },
      ],
    },
    {
      chapter: 'Which one when?',
      card: { type: 'chapter', kicker: 'Rule of thumb', title: 'One offer? *Funnel.* Whole business? *Website.*', sub: 'Most businesses use both.' },
      say: "So here's the rule of thumb. If you're promoting one offer and want one action, build a funnel. If you want to show your whole business and help people explore, build a website. Most businesses use both.",
    },
    {
      chapter: 'Working together',
      goto: '{demo}#/sites/websites/ws1/steps/home',
      settle: 1,
      say: "And they work beautifully together. Your website's Invisalign page can link to your free scan funnel. Your ads can point straight at the funnel. And every lead from either one lands in the same CRM, triggers the same automations, and shows up in the same reports.",
      actions: [
        { at: 0.4, hover: '#fn_step_invisalign' },
        { at: 1.0, highlight: '#fn_step_invisalign', label: 'Links to your funnel', for: 3.6 },
        { at: 6.0, highlight: '#fn_step_card', label: 'Same contacts, same automations', for: 4.4 },
      ],
    },
    {
      chapter: 'One builder for both',
      goto: '{demo}#/sites/funnels/f1/builder/s1',
      settle: 1.2,
      say: "Best of all, you build both with the same drag and drop editor. The same sections, the same elements, the same mobile view. Learn it once, and you can build funnels, websites and more.",
      actions: [
        { at: 0.4, title: 'The page builder', sub: 'Same editor for funnels & websites', for: 4 },
        { at: 4.8, highlight: '#pb_panel', label: 'Same elements', for: 3 },
        { at: 8.0, click: '#pb_mobile' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Start with *one funnel* for your best offer', sub: 'Launch fast, then improve it with real numbers.' },
      say: "Here's a pro tip. Don't try to build everything at once. Start with one funnel for your most profitable offer, send traffic to it, and improve it using real numbers. Your full website can follow.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 7.2', title: 'Build a funnel from a *template*', sub: 'Choose, customise and publish in minutes.', cta: 'Kyntlo [Academy]' },
      say: "Now you know when to use each one. In the next lesson, we'll build a complete funnel from a ready-made template, and publish it. See you there.",
    },
  ],
};
