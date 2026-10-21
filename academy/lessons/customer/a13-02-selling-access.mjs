// Track A · Module 13 · Lesson 2 — Selling access.
export default {
  id: 'A-13.2',
  title: 'Kyntlo Academy 13.2 — Selling access',
  description:
    'Sell your Kyntlo courses with offers: bundle products, set a free, one-time, subscription or payment-plan price, share the checkout link, and let buyers be enrolled automatically.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Memberships', 'Sell online courses', 'Membership site'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 13 · Lesson 2', title: 'Sell your *courses*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 13 · Lesson 2', title: 'Selling *access*', sub: 'Offers, checkout and automatic enrolment.' },
      say: "In this lesson, you'll turn your courses into something people can buy. You'll create an offer, set a price, and let Kyntlo enrol buyers automatically.",
    },
    {
      chapter: 'Offers explained',
      goto: '{demo}#/memberships/courses/offers',
      settle: 1,
      say: "Here's the key idea. Members never buy a product directly. They get access through an offer. An offer bundles one or more products, sets the price, and grants access when someone pays or signs up.",
      actions: [
        { at: 0.6, title: 'Offers', sub: 'How members get access', for: 4 },
        { at: 6.6, hover: '#of_table' },
        { at: 6.8, highlight: '#of_table', label: 'Your offers', for: 4 },
      ],
    },
    {
      chapter: 'Offers explained',
      say: "Bloom's current offers are free. Invisalign patients get their course at no cost, as part of their treatment. Now let's create a paid membership.",
      actions: [
        { at: 0.6, hover: '#of_row_of1' },
        { at: 0.8, highlight: '#of_row_of1', label: 'Free with treatment', for: 4 },
      ],
    },
    {
      chapter: 'Create an offer',
      say: "Click Create Offer and give it a name. We'll call it Bloom Smile Club, a monthly membership for patients who want to keep their smile at its best.",
      actions: [
        { at: 0.6, click: '#of_new' },
        { at: 2.6, type: 'Bloom Smile Club', into: '#of_title' },
        { at: 5.6, type: 'Monthly tips, videos and a members-only community.', into: '#of_desc', delay: 30 },
      ],
    },
    {
      chapter: "What's included",
      say: "Choose what's included. We'll add the Smile Care at Home course, plus our members-only community, which we'll set up in the next lesson.",
      actions: [
        { at: 0.6, click: '#of_prod_m2' },
        { at: 4.2, click: '#of_prod_community' },
        { at: 4.8, highlight: '#of_products', label: 'Included', for: 3.4 },
      ],
    },
    {
      chapter: 'Pricing',
      say: "Now, pricing. An offer can be free, a one-time payment, a payment plan, or a subscription. Choose Subscription and enter fifteen pounds. Members are billed every month until they cancel, through the Stripe account you connected in module twelve.",
      caption: 'Now, pricing. An offer can be free, a one-time payment, a payment plan, or a subscription. Choose Subscription and enter £15. Members are billed every month until they cancel, through the Stripe account you connected in module 12.',
      actions: [
        { at: 0.6, hover: '#of_price_free' },
        { at: 0.8, highlight: '.mb-seg', label: 'Four ways to charge', for: 4 },
        { at: 6.2, click: '#of_price_subscription' },
        { at: 8.0, type: '15', into: '#of_amount' },
        { at: 9.0, zoom: '#of_amount_row', scale: 1.4, for: 3 },
      ],
    },
    {
      chapter: 'Automatic access',
      say: "On the right are the access settings. With automatic access on, the moment a payment succeeds, the buyer is enrolled in everything in the offer, and gets an email with their login link. No manual work for you.",
      actions: [
        { at: 0.6, hover: '#of_access' },
        { at: 0.8, highlight: '#of_access', label: 'Enrolment on autopilot', for: 5 },
        { at: 1.0, zoom: '#of_access', scale: 1.5, for: 5 },
      ],
    },
    {
      chapter: 'Publish',
      say: "Click Publish offer. It's live, and ready to sell.",
      actions: [
        { at: 0.4, click: '#of_publish' },
      ],
    },
    {
      chapter: 'Share your offer',
      say: "Share it with the checkout link. Put it in an email, a text message, or behind a Join button on your website. If you'd rather sell through a Kyntlo funnel, attach this offer to the product in your order form, and buyers are enrolled the same way.",
      actions: [
        { at: 0.6, hover: '#of_link' },
        { at: 0.8, highlight: '#of_link', label: 'Checkout link', for: 3.4 },
        { at: 4.4, click: '#of_copy' },
        { at: 8.4, hover: '#of_share' },
        { at: 8.6, highlight: '#of_share', label: 'Or sell from a funnel', for: 4 },
      ],
    },
    {
      chapter: 'Test the checkout',
      say: "Let's test it. Click Preview checkout. This is what buyers see: what's included, the price, and a secure card form. We'll make a test purchase as Emma.",
      speed: 1.2,
      actions: [
        { at: 0.6, click: '#of_preview' },
        { at: 2.8, highlight: '#co_page', label: 'Checkout page', for: 3 },
        { at: 6.4, type: 'Emma Clarke', into: '#co_name' },
        { at: 8.4, type: 'emma.clarke@mail.com', into: '#co_email', delay: 30 },
        { at: 10.6, click: '#co_pay' },
      ],
    },
    {
      chapter: 'Automatic enrolment',
      say: "Payment done, and Emma is enrolled automatically. Her login email is already on its way.",
      actions: [
        { at: 0.4, hover: '#co_form' },
        { at: 0.6, highlight: '#co_form', label: 'Enrolled automatically', for: 3.4 },
      ],
    },
    {
      chapter: 'Automatic enrolment',
      goto: '{demo}#/memberships/courses/dashboard',
      say: "On the Courses dashboard, Emma now appears under Recent enrolments, with the offer she joined. You can also grant an offer from a workflow, for example giving every new Invisalign patient their course automatically.",
      actions: [
        { at: 0.6, hover: '#mb_enrol_0' },
        { at: 0.8, highlight: '#mb_enrol_0', label: 'New member', for: 4 },
        { at: 1.0, zoom: '#mb_enrolments', scale: 1.4, for: 4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Start with a *free* offer', sub: 'Feedback first, then testimonials, then sales.' },
      say: "Here's a pro tip. Before you charge for a course, give it away free to a few loyal customers. Their feedback will make it better, and their results become the testimonials that sell your paid offer.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 13.3', title: '*Communities*', sub: 'Groups, channels and engagement.', cta: 'Kyntlo [Academy]' },
      say: "You're ready to sell! In the next lesson, we'll build the members-only community we just included in our offer. See you there.",
    },
  ],
};
