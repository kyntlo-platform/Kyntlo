// Track A · Module 7 · Lesson 3 — The page builder in depth.
// Filmed on the demo workspace (academy/demo-app), screen: Sites → Funnels → page builder.
export default {
  id: 'A-7.3',
  title: 'Kyntlo Academy 7.3 — The page builder in depth',
  description:
    'Master the Kyntlo drag-and-drop page builder: how sections, rows, columns and elements fit together, editing text and styles, adding elements, mobile view, preview, save and publish.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Page builder', 'Landing page', 'Drag and drop'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 7 · Lesson 3', title: 'The *page builder* in depth' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 7 · Lesson 3', title: 'The *page builder* in depth', sub: 'Sections, rows, columns, elements and mobile view.' },
      say: "In this lesson, we'll go deep into the page builder, the drag and drop editor behind every funnel and website in Kyntlo. Once you understand how a page is put together, you can build anything.",
    },
    {
      chapter: 'Builder tour',
      goto: '{demo}#/sites/funnels/f1/builder/s1',
      settle: 1.2,
      say: "Here's Bloom's Invisalign landing page, open in the builder. Along the top: switch between desktop and mobile view, undo and redo, preview, save and publish. Elements are on the left, settings are on the right, and your page sits in the middle.",
      actions: [
        { at: 0.4, title: 'The page builder', sub: 'Invisalign Free Scan · opt-in page', for: 3.6 },
        { at: 4.6, highlight: '#pb_devices', label: 'Desktop / mobile', for: 2.4 },
        { at: 7.2, highlight: '#pb_undo', label: 'Undo & redo', for: 2 },
        { at: 9.4, highlight: '#pb_publish', label: 'Preview, save, publish', for: 2.4 },
        { at: 12.2, highlight: '#pb_panel', label: 'Elements', for: 2 },
        { at: 14.4, highlight: '#pb_props', label: 'Settings', for: 2 },
      ],
    },
    {
      chapter: 'How pages are built',
      say: "Every page is built from four building blocks, nested inside each other. Open Layers to see them. Sections are the big horizontal bands of your page, like the hero at the top. Click one, and it's outlined in green.",
      actions: [
        { at: 1.6, click: '#pb_layers' },
        { at: 3.4, highlight: '#pb_panel', label: 'The structure of your page', for: 3.4 },
        { at: 8.8, click: '#pb_layer_hero' },
        { at: 10.0, highlight: '#pb_hero', label: 'Section', for: 3 },
      ],
    },
    {
      chapter: 'Rows & columns',
      say: "Inside each section are rows, and rows split into columns. This hero row has two columns: text on the left, and the image on the right. On a phone, those columns stack on top of each other automatically.",
      actions: [
        { at: 0.4, click: '#pb_layer_r_hero' },
        { at: 1.2, highlight: '#pb_r_hero', label: 'Row', for: 3 },
        { at: 5.4, click: '#pb_layer_c_hero_1' },
        { at: 6.0, highlight: '#pb_c_hero_1', label: 'Column 1', for: 2.4 },
        { at: 8.6, click: '#pb_layer_c_hero_2' },
        { at: 9.2, highlight: '#pb_c_hero_2', label: 'Column 2', for: 2.4 },
      ],
    },
    {
      chapter: 'Elements',
      say: "And inside columns are elements: the headlines, paragraphs, images, buttons and forms your visitors actually see. Click any element to select it. It gets a blue outline, and its settings open on the right.",
      actions: [
        { at: 0.6, click: '#pb_el_subheadline' },
        { at: 1.4, highlight: '#pb_el_subheadline', label: 'Element', for: 3 },
        { at: 7.2, highlight: '#pb_props', label: 'Its settings', for: 3.4 },
      ],
    },
    {
      chapter: 'Editing text',
      speed: 1.2,
      say: "To change the words, just click the text on the page and type. Select the headline, highlight the text, and write a new one. What you see is exactly what your visitors will see.",
      actions: [
        { at: 0.4, click: '#pb_el_headline' },
        { at: 1.6, press: 'Control+A' },
        { at: 1.8, type: 'Straighter teeth, no metal braces.', delay: 45 },
        { at: 6.6, zoom: '#pb_el_headline', scale: 1.4, for: 2.6 },
      ],
    },
    {
      chapter: 'Styling',
      say: "The settings panel controls the look. Change the font size and weight, the alignment, and the colour. Spacing sets the gap above and below, so you never need to add empty lines.",
      actions: [
        { at: 0.4, click: '#pb_prop_size' },
        { at: 0.8, press: 'Control+A' },
        { at: 1.0, type: '50', delay: 120 },
        { at: 3.6, click: '#pb_color_3' },
        { at: 5.0, highlight: '#pb_align_left', label: 'Alignment', for: 2 },
        { at: 8.0, highlight: '#pb_prop_mb', label: 'Spacing', for: 2.6 },
      ],
    },
    {
      chapter: 'Adding elements',
      say: "To add something new, click the plus. Drag an element from the panel and drop it where you want it. A blue line shows exactly where it will land. Let's drop a video right below the button.",
      actions: [
        { at: 0.4, click: '#pb_add' },
        { at: 2.6, hover: '#pb_addel_video' },
        { at: 3.4, run: async (page) => page.mouse.down() },
        { at: 3.6, hover: '#pb_el_cta small' },
        { at: 7.2, run: async (page) => page.mouse.up() },
      ],
    },
    {
      chapter: 'Element settings',
      speed: 1.2,
      say: "The new video is selected, so its settings are ready. Paste the link from YouTube, Vimeo or Wistia, and add a caption. Every element type has its own settings, like the action of a button, or which form to show.",
      actions: [
        { at: 0.4, click: '#pb_prop_url' },
        { at: 0.8, type: 'https://youtu.be/bloom-free-scan', delay: 35 },
        { at: 3.6, click: '#pb_prop_caption' },
        { at: 3.9, press: 'Control+A' },
        { at: 4.1, type: 'See a free scan in 60 seconds', delay: 35 },
      ],
    },
    {
      chapter: 'Rows & sections',
      say: "The same panel adds rows and sections. Rows come in one to four columns. Sections come in four widths: full width, wide, medium and small. Medium and small work well for forms and text, because shorter lines are easier to read.",
      actions: [
        { at: 0.4, click: '#pb_tab_rows' },
        { at: 1.4, highlight: '#pb_panel', label: '1 to 4 columns', for: 3 },
        { at: 5.0, click: '#pb_tab_sections' },
        { at: 6.0, highlight: '#pb_panel', label: 'Full, wide, medium, small', for: 4 },
        { at: 11.0, click: '#pb_tab_elements' },
      ],
    },
    {
      chapter: 'Mobile view',
      speed: 1.2,
      say: "Now switch to mobile view. Columns stack, and text shrinks to fit. You can set a separate mobile font size, so the headline isn't too big on a small screen. That change only affects phones.",
      actions: [
        { at: 0.4, click: '#pb_mobile' },
        { at: 1.0, wait: 0.6 },
        { at: 2.6, click: '#pb_el_headline' },
        { at: 4.4, click: '#pb_prop_size' },
        { at: 4.7, press: 'Control+A' },
        { at: 4.9, type: '30', delay: 120 },
        { at: 6.4, highlight: '#pb_prop_size', label: 'Mobile only', for: 2.6 },
      ],
    },
    {
      chapter: 'Hide on mobile',
      say: "You can also hide an element on one device. Large images can slow a phone down, so select the hero image and switch off Show on mobile. It stays on desktop, and disappears on phones.",
      actions: [
        { at: 0.4, click: '#pb_el_heroimg' },
        { at: 4.2, click: '#pb_vis_mobile' },
        { at: 5.0, highlight: '#pb_el_heroimg', label: 'Hidden on mobile', for: 3.4 },
      ],
    },
    {
      chapter: 'Preview & publish',
      say: "Before you publish, preview the page exactly as visitors will see it, on mobile and on desktop. Then exit the preview, save, and publish. Changes aren't live until you click Publish.",
      actions: [
        { at: 0.4, click: '#pb_preview' },
        { at: 3.4, click: '#pv_desktop' },
        { at: 6.4, click: '#pv_close' },
        { at: 7.6, click: '#pb_save' },
        { at: 9.0, click: '#pb_publish' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Design for the *phone* first', sub: 'Most of your visitors are on mobile.' },
      say: "Here's a pro tip. Most visitors arrive on a phone, especially from social media ads. So check every page in mobile view before you publish, and make sure the main button is visible without scrolling.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 7.4', title: 'Forms & *surveys*', sub: 'Build, style, add logic and embed.', cta: 'Kyntlo [Academy]' },
      say: "You now know your way around the page builder. Next, we'll build forms and surveys, add conditional logic, and embed them anywhere. See you there.",
    },
  ],
};
