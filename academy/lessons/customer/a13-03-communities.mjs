// Track A · Module 13 · Lesson 3 — Communities.
export default {
  id: 'A-13.3',
  title: 'Kyntlo Academy 13.3 — Communities',
  description:
    'Create a private community in Kyntlo Memberships: groups, channels, posts, linked courses, the leaderboard and inviting members.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Memberships', 'Online community', 'Communities'],
  plan: 'PRO',
  thumbnail: { kicker: 'Module 13 · Lesson 3', title: 'Build a *community*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 13 · Lesson 3', title: '*Communities*', sub: 'A private space for your members.' },
      say: "In this lesson, you'll set up a community in Kyntlo: a private space where your members can talk, learn and support each other, right alongside your courses. A good community keeps members engaged, and keeps them paying.",
    },
    {
      chapter: 'Groups',
      goto: '{demo}#/memberships/communities',
      settle: 1,
      say: "Communities live in Memberships. Each community is made of groups. Think of a group as your own private social network, with no ads, and no algorithm deciding who sees your posts. Every member sees everything you share.",
      actions: [
        { at: 0.6, title: 'Communities', sub: 'Your own private social network', for: 4 },
        { at: 5.8, hover: '#cm_group_g1' },
        { at: 6.0, highlight: '#cm_group_g1', label: 'A group', for: 4 },
      ],
    },
    {
      chapter: 'Create a group',
      say: "To start a new one, click Create Group and give it a name. It gets its own web address on your member portal, the same place members log in to watch your courses.",
      actions: [
        { at: 0.6, click: '#cm_new' },
        { at: 2.4, type: 'Invisalign Support Group', into: '#cm_name' },
        { at: 5.6, highlight: '#cm_url', label: 'Its own link', for: 2.6 },
      ],
    },
    {
      chapter: 'Create a group',
      say: "Choose who can join. A private group is only for people you invite, or people who buy an offer that includes it. A public group is open to anyone with the link. Then click Create group.",
      actions: [
        { at: 0.6, hover: '#cm_privacy_private' },
        { at: 0.8, highlight: '#cm_privacy_private', label: 'Invite or offer only', for: 3.4 },
        { at: 5.6, hover: '#cm_privacy_public' },
        { at: 5.8, highlight: '#cm_privacy_public', label: 'Open to anyone', for: 2.6 },
        { at: 9.4, click: '#cm_create' },
      ],
    },
    {
      chapter: 'Inside a group',
      say: "Your new group starts with a general channel, ready for its first post. Let's go back and look at an established group, the Bloom Smile Club, from the offer we created in the last lesson.",
      actions: [
        { at: 0.6, highlight: '#cm_channels', label: 'Ready to go', for: 3 },
        { at: 6.0, click: '#cm_back' },
        { at: 8.4, click: '#cm_group_g1' },
      ],
    },
    {
      chapter: 'Sections & channels',
      say: "Along the top are the group's sections: the feed, learning, members, a leaderboard, events and an about page. On the left are channels, which keep conversations organised by topic.",
      actions: [
        { at: 0.6, hover: '#cm_tabs' },
        { at: 0.8, highlight: '#cm_tabs', label: 'Sections', for: 4.4 },
        { at: 6.6, hover: '#cm_channels' },
        { at: 6.8, highlight: '#cm_channels', label: 'Channels', for: 3.6 },
      ],
    },
    {
      chapter: 'Sections & channels',
      say: "Channels can be open to everyone, or limited to admins, like Announcements, so important news never gets buried under everyday chat.",
      actions: [
        { at: 0.6, click: '#cm_ch_announcements' },
        { at: 2.6, highlight: '#cm_ch_announcements', label: 'Admins only', for: 3 },
      ],
    },
    {
      chapter: 'Add a channel',
      say: "To add one, click the plus next to Channels, give it a name, choose who can post, and create it.",
      actions: [
        { at: 0.6, click: '#cm_add_channel' },
        { at: 2.6, type: 'whitening-tips', into: '#cm_ch_name' },
        { at: 4.6, hover: '#cm_ch_who_everyone' },
        { at: 6.4, click: '#cm_ch_create' },
      ],
    },
    {
      chapter: 'Posting',
      say: "Now let's post. Click the composer, and add a title and your message. You can attach images, files or video. Click Post, and members are notified. Pin your most important posts, so new members see them first.",
      speed: 1.3,
      actions: [
        { at: 0.6, click: '#cm_compose' },
        { at: 2.0, type: 'Your whitening questions, answered', into: '#cm_post_title', delay: 30 },
        { at: 4.6, type: 'Ask us anything about whitening this week, and Priya will answer every question on Friday.', into: '#cm_post_body', delay: 22 },
        { at: 10.2, click: '#cm_post' },
        { at: 10.8, highlight: '#cm_post_0', label: 'Posted', for: 2.4 },
      ],
    },
    {
      chapter: 'Learning',
      say: "The Learning tab links your courses to the group, so members can watch a lesson and then talk about it, in the same place. Discussion helps people actually use what they learn.",
      actions: [
        { at: 0.6, click: '#cm_tab_learning' },
        { at: 2.4, highlight: '#cm_main', label: 'Courses inside the group', for: 3.4 },
      ],
    },
    {
      chapter: 'Leaderboard',
      say: "And on the right is the leaderboard. Members earn points for posting, commenting and liking. A little friendly competition keeps people coming back. You can even reward the top members, like a free whitening top-up each month.",
      actions: [
        { at: 0.6, hover: '#cm_leader' },
        { at: 0.8, highlight: '#cm_leader', label: 'Points & ranks', for: 4 },
        { at: 1.0, zoom: '#cm_leader', scale: 1.5, for: 4 },
      ],
    },
    {
      chapter: 'Invite members',
      say: "To grow your group, click Invite members, and share the link or send email invites. Or include the group in a paid offer, and buyers join automatically.",
      actions: [
        { at: 0.6, click: '#cm_invite' },
        { at: 2.4, highlight: '.modal', label: 'Share the link', for: 4 },
        { at: 9.0, click: '.modal [data-close]' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Post a *weekly* prompt', sub: 'Ask one simple question, reply to every answer.' },
      say: "Here's a pro tip. Communities thrive on rhythm. Post one simple question every week, like, share your smile win of the week, and reply to every answer. Within a month, your members will start the conversations themselves. That's when a community really starts to run itself.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Module 14', title: 'Settings & *integrations*', sub: 'Phone numbers, email, integrations and billing.', cta: 'Kyntlo [Academy]' },
      say: "That's the end of the Memberships module. Well done! Next, in module fourteen, we'll head into Settings, starting with phone numbers and caller ID. See you there.",
    },
  ],
};
