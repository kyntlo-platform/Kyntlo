// Track A · Module 13 · Lesson 1 — Creating a course.
export default {
  id: 'A-13.1',
  title: 'Kyntlo Academy 13.1 — Creating a course',
  description:
    'Build an online course in Kyntlo Memberships: create a product, organise it into categories, add a video lesson with notes and downloads, publish it and preview it as a member.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Memberships', 'Online course', 'Course builder'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 13 · Lesson 1', title: 'Build your first *course*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 13 · Lesson 1', title: 'Creating a *course*', sub: 'Products, categories and lessons.' },
      say: "Welcome to Memberships! In this lesson, you'll create an online course in Kyntlo. We'll set up a product, organise it into categories, add a video lesson, and publish it.",
    },
    {
      chapter: 'Courses in Kyntlo',
      goto: '{demo}#/memberships/courses/products',
      settle: 1,
      say: "Memberships is where you build courses, member areas and communities. It's included on the Pro plan. In Kyntlo, a course is called a product. Bloom already has two: one for Invisalign patients, and one about caring for your smile at home.",
      actions: [
        { at: 0.6, title: 'Memberships', sub: 'Included on the Pro plan', for: 4 },
        { at: 6.0, hover: '#mb_sub_products' },
        { at: 6.2, highlight: '#mb_sub_products', label: 'Courses are "products"', for: 3 },
        { at: 9.6, highlight: '#mb_products', label: 'Your courses', for: 3.6 },
      ],
    },
    {
      chapter: 'Why a course',
      say: "Courses aren't just for coaches. A clinic can share aftercare videos, a gym can share workout plans, and an agency can onboard new clients. Anything you explain again and again can become a course.",
      actions: [
        { at: 0.6, title: 'Teach once', sub: 'Aftercare, onboarding, how-tos, training', for: 6 },
        { at: 7.0, move: [900, 420] },
      ],
    },
    {
      chapter: 'Create a product',
      say: "Click Create Product. Give it a clear title, Whitening Aftercare, and a short description that tells members what they'll get.",
      speed: 1.3,
      actions: [
        { at: 0.6, click: '#mb_new_product' },
        { at: 2.6, type: 'Whitening Aftercare', into: '#np_title' },
        { at: 5.0, type: 'Keep your new smile bright: what to eat, how to brush and when to top up.', into: '#np_desc', delay: 25 },
      ],
    },
    {
      chapter: 'Create a product',
      say: "Click Create product, and you land in the product builder. It's empty for now.",
      actions: [
        { at: 0.4, click: '#np_create' },
        { at: 2.4, highlight: '#pb_empty', label: 'Your new course', for: 2.6 },
      ],
    },
    {
      chapter: 'Categories',
      say: "Courses are organised into categories, like chapters in a book. Click Add Category, name it, Your first forty-eight hours, and save.",
      caption: 'Courses are organised into categories, like chapters in a book. Click Add Category, name it, Your first 48 hours, and save.',
      actions: [
        { at: 2.6, click: '#pb_add_cat2' },
        { at: 4.6, type: 'Your first 48 hours', into: '#nc_cat_title' },
        { at: 7.6, click: '#nc_cat_save' },
      ],
    },
    {
      chapter: 'Lessons',
      say: "Each category holds lessons. Click Add Lesson to open the lesson editor.",
      actions: [
        { at: 0.6, hover: '#pb_cat_k6' },
        { at: 0.8, highlight: '#pb_cat_k6', label: 'Category', for: 2 },
        { at: 3.0, click: '#pb_add_lesson_k6' },
      ],
    },
    {
      chapter: 'Video',
      say: "Give the lesson a title, then add your video. Upload a file straight from your computer, or paste a link from YouTube, Vimeo or Wistia.",
      actions: [
        { at: 0.6, type: 'Foods to avoid for 48 hours', into: '#le_title' },
        { at: 4.6, hover: '#le_video_drop' },
        { at: 4.8, highlight: '#le_video_drop', label: 'Upload or paste a link', for: 3 },
        { at: 8.2, click: '#le_video_drop' },
        { at: 8.8, wait: 1 },
      ],
    },
    {
      chapter: 'Lesson text',
      say: "Underneath, add text, like notes, steps or a transcript. Members can read along, and it helps anyone who prefers reading to watching.",
      speed: 1.4,
      actions: [
        { at: 0.6, type: 'For the first 48 hours, skip coffee, tea, red wine and curry. If it would stain a white shirt, it can stain your teeth.', into: '#le_body', delay: 22 },
      ],
    },
    {
      chapter: 'Downloads',
      say: "You can attach downloads too, like a printable food guide.",
      actions: [
        { at: 0.6, click: '#le_attach' },
        { at: 1.4, highlight: '#le_files', label: 'Downloadable PDF', for: 2.4 },
      ],
    },
    {
      chapter: 'Publish',
      say: "Now set the status. Draft lessons are hidden from members, so you can build in peace. When it's ready, choose Published. You can also drip content, releasing a lesson a few days after someone joins.",
      actions: [
        { at: 0.6, hover: '#le_status_published' },
        { at: 0.8, highlight: '#le_status_draft', label: 'Hidden', for: 2.6 },
        { at: 5.4, click: '#le_status_published' },
        { at: 6.0, highlight: '#le_status_published', label: 'Live for members', for: 2.6 },
        { at: 9.4, hover: '#le_drip' },
        { at: 9.6, highlight: '#le_drip', label: 'Drip content', for: 3 },
      ],
    },
    {
      chapter: 'Save',
      say: "Click Save. Back in the builder, the lesson sits inside its category. You can drag lessons and categories to reorder them at any time.",
      actions: [
        { at: 0.4, click: '#le_save' },
        { at: 2.2, hover: '#pb_cat_k6' },
        { at: 2.4, highlight: '#pb_cat_k6', label: 'Published lesson', for: 3 },
        { at: 2.6, zoom: '#pb_cat_k6', scale: 1.4, for: 3 },
      ],
    },
    {
      chapter: 'Preview',
      say: "Click Preview to see exactly what members see: the lessons on the left, the video and notes on the right, and their progress as they go.",
      actions: [
        { at: 0.6, click: '#pb_preview' },
        { at: 2.4, hover: '#pv_portal' },
        { at: 2.6, highlight: '#pv_portal', label: 'The member view', for: 5 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Keep lessons *short*', sub: 'One idea per lesson, under five minutes.' },
      say: "Here's a pro tip. Keep each lesson to one idea, and under five minutes. Short lessons get finished, and people who finish a lesson come back for the next one.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 13.2', title: 'Selling *access*', sub: 'Offers, checkout and automatic enrolment.', cta: 'Kyntlo [Academy]' },
      say: "Your first course is built! In the next lesson, you'll turn it into something people can buy, with offers, checkout and automatic enrolment. See you there.",
    },
  ],
};
