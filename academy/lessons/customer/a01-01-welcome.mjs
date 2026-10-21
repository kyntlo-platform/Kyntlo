// Track A · Module 1 · Lesson 1 — Welcome to Kyntlo Academy.
export default {
  id: 'A-1.1',
  title: 'Kyntlo Academy 1.1 — Welcome to Kyntlo Academy',
  description: 'What Kyntlo is, what it replaces, and how this course is organised so you get set up fast.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Getting started'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 1 · Lesson 1', title: 'Welcome to *Kyntlo Academy*' },
  scenes: [
    {
      chapter: 'Welcome',
      card: { type: 'intro', kicker: 'Module 1 · Lesson 1', title: 'Welcome to *Kyntlo Academy*', sub: 'Everything you need to run your business on Kyntlo.' },
      say: "Hi, and welcome to Kyntlo Academy! I'm so glad you're here. Over this course, I'll show you every part of Kyntlo, step by step, so you can run your whole business from one place.",
    },
    {
      chapter: 'What is Kyntlo?',
      goto: '{app}/v2/location/{loc}/dashboard',
      settle: 2,
      say: "Kyntlo brings together the tools most businesses pay for separately: a CRM, a unified inbox, booking calendars, sales pipelines, funnels and websites, email and SMS marketing, automation, reviews and AI. All in one login, on one invoice.",
      actions: [
        { at: 0.5, title: 'One platform', sub: 'CRM · Inbox · Booking · Funnels · Automation · AI', for: 5 },
        { at: 6, highlight: ['aside', '#sidebar-v2'], label: 'All your tools, one login', for: 4 },
      ],
    },
    {
      chapter: 'How the course works',
      card: { type: 'chapter', kicker: 'How this course works', title: '15 modules · *short, focused lessons*', sub: 'Each lesson covers one task, start to finish.' },
      say: "The course is split into fifteen modules. Each lesson is short and focused on one task, and we'll always work inside a real Kyntlo account, so you can follow along in yours.",
    },
    {
      chapter: 'Your plan',
      card: { type: 'chapter', kicker: 'Good to know', title: 'Look for the *plan badge*', sub: 'Some features are included on Growth or Pro plans.' },
      say: "Some features are part of the Growth or Pro plans. Whenever that's the case, you'll see a plan badge at the start of the lesson, so you always know what's included in yours.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 1.2', title: 'Logging in & the *interface tour*', cta: 'Kyntlo [Academy]' },
      say: "Let's get started. In the next lesson, we'll log in and take a tour of the Kyntlo interface.",
    },
  ],
};
