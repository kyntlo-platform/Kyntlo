// Track B · Course trailer — for the YouTube / Udemy / Teachable course page. 60–90 seconds.
// Quick flashes of every module on the demo workspace, then "Start with lesson 1".
const sb = (id) => `#sb_${id}`;

export default {
  id: 'B00',
  title: 'Kyntlo Academy — The Complete Course (Trailer)',
  description:
    'Everything you will learn in Kyntlo Academy: 15 modules that take you from your first login to a complete lead-to-booking system. CRM, inbox, calendars, pipelines, funnels, marketing, automation, AI agents, reviews, payments, memberships and more.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Kyntlo course', 'CRM training', 'Marketing automation course'],
  thumbnail: { kicker: 'Kyntlo Academy', title: 'The *complete* course' },
  scenes: [
    {
      chapter: 'Welcome',
      card: { type: 'intro', kicker: 'Kyntlo Academy', title: 'The *complete* course', sub: '15 modules · from your first login to a business on autopilot' },
      say: "Welcome to Kyntlo Academy, the complete course: fifteen modules, from your very first login to a business that runs on autopilot.",
    },
    {
      chapter: 'Modules 1–3',
      goto: '{demo}#/dashboard',
      settle: 1.5,
      say: "First, you'll find your way around, read your dashboard, and bring every contact into one CRM.",
      actions: [
        { at: 0.3, title: 'Modules 1–3', sub: 'Getting started · Dashboards · Contacts', for: 3.2 },
        { at: 0.6, zoom: '#w_status', scale: 1.4, for: 2.6 },
        { at: 4.0, click: sb('contacts') },
      ],
    },
    {
      chapter: 'Modules 4–5',
      say: "Then you'll answer every message from one inbox, and let customers book themselves online.",
      actions: [
        { at: 0.2, click: sb('conversations') },
        { at: 0.6, title: 'Modules 4–5', sub: 'Conversations · Calendars', for: 3.2 },
        { at: 3.6, click: sb('calendars') },
      ],
    },
    {
      chapter: 'Modules 6–7',
      say: "You'll track every deal in your pipeline, and build funnels and websites that capture leads.",
      actions: [
        { at: 0.2, click: sb('opportunities') },
        { at: 0.6, title: 'Modules 6–7', sub: 'Pipelines · Funnels & websites', for: 3.2 },
        { at: 3.6, click: sb('sites') },
      ],
    },
    {
      chapter: 'Modules 8–9',
      say: "You'll send email, text and social campaigns, and build workflows that do the follow-up for you.",
      actions: [
        { at: 0.2, click: sb('marketing') },
        { at: 0.6, title: 'Modules 8–9', sub: 'Marketing · Automation', for: 3.2 },
        { at: 3.8, click: sb('automation') },
      ],
    },
    {
      chapter: 'Modules 10–11',
      say: "You'll put AI to work on your chats and phone calls, and collect five-star reviews on autopilot.",
      actions: [
        { at: 0.2, click: sb('ai-agents') },
        { at: 0.6, title: 'Modules 10–11', sub: 'AI agents · Reputation', for: 3.2 },
        { at: 4.0, click: sb('reputation') },
      ],
    },
    {
      chapter: 'Modules 12–14',
      say: "Then you'll take payments, sell courses and memberships, and set up your phone numbers, email and integrations.",
      actions: [
        { at: 0.2, click: sb('payments') },
        { at: 0.6, title: 'Modules 12–14', sub: 'Payments · Memberships · Settings', for: 3.4 },
        { at: 2.8, click: sb('memberships') },
        { at: 5.4, click: sb('settings') },
      ],
    },
    {
      chapter: 'Module 15',
      card: { type: 'chapter', kicker: 'Module 15', title: 'Put it *all together*', sub: 'A complete lead-to-booking system, plus a 30-day action plan.' },
      say: "And in the final module, you'll put it all together: a complete lead-to-booking system, plus a thirty-day plan to launch it.",
      caption: "And in the final module, you'll put it all together: a complete lead-to-booking system, plus a 30-day plan to launch it.",
    },
    {
      chapter: 'How it works',
      card: { type: 'chapter', kicker: 'How the course works', title: 'Short lessons. *Every click on screen.*', sub: 'One task per lesson · a plan badge shows which plan each feature needs' },
      say: "Every lesson is short, focused on one task, with every click on screen. And a plan badge shows which plan each feature needs.",
    },
    {
      chapter: 'Start with lesson 1',
      card: { type: 'outro', kicker: 'Start here', title: 'Start with *lesson 1*', sub: 'No account yet? Start your free 14-day trial.', cta: 'kyntlo.ai/[trial]' },
      say: "Ready? Start with lesson one. And if you don't have an account yet, start your free fourteen-day trial, at kyntlo dot A I.",
      caption: "Ready? Start with lesson 1. And if you don't have an account yet, start your free 14-day trial, at kyntlo.ai.",
    },
  ],
};
