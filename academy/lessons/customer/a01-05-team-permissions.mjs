// Track A · Module 1 · Lesson 5 — Inviting your team & user permissions.
// Filmed on the demo workspace (academy/demo-app).
export default {
  id: 'A-1.5',
  title: 'Kyntlo Academy 1.5 — Inviting your team & user permissions',
  description:
    'Add team members in Settings → My Staff, choose their permissions and role, limit them to their own contacts, set their phone number, and assign them to booking calendars.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Getting started', 'Team', 'User permissions'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 1 · Lesson 5', title: 'Invite your *team*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 1 · Lesson 5', title: 'Inviting your team & *permissions*', sub: 'Give everyone exactly the access they need.' },
      say: "In this lesson, we'll invite a new team member, choose what they can see and do, and add them to a booking calendar. By the end, your whole team can work in Kyntlo safely.",
    },
    {
      chapter: 'My Staff',
      goto: '{demo}#/settings/my-staff',
      settle: 1,
      say: "Go to Settings, then My Staff. Here's everyone who can log in to this account. Your plan sets how many users you can have: up to three on Starter, ten on Growth, and twenty-five on Pro.",
      caption: "Go to Settings, then My Staff. Here's everyone who can log in to this account. Your plan sets how many users you can have: up to 3 on Starter, 10 on Growth, and 25 on Pro.",
      actions: [
        { at: 0.4, highlight: '#ss_menu_my-staff', label: 'My Staff', for: 2.4 },
        { at: 3.2, highlight: '#ms_table', label: 'Your team', for: 4 },
      ],
    },
    {
      chapter: 'Add an employee',
      say: "Bloom has a new hygienist, Tom. Click Add Employee, and enter his first name, last name and work email. Add his mobile number too, so calls can be forwarded to him.",
      speed: 1,
      actions: [
        { at: 0.4, click: '#ms_add' },
        { at: 2.0, type: 'Tom', into: '#ms_first' },
        { at: 3.2, type: 'Reed', into: '#ms_last' },
        { at: 4.6, type: 'tom@bloomdental.co.uk', into: '#ms_email' },
        { at: 7.4, type: '+44 7700 900444', into: '#ms_phone' },
      ],
    },
    {
      chapter: 'Permissions',
      say: "Now the important part: permissions. Each switch turns a part of Kyntlo on or off for this person. Tom needs conversations, calendars and contacts to look after his patients, but he doesn't need sales opportunities or reviews.",
      actions: [
        { at: 0.4, click: '#ms_sec_perm' },
        { at: 1.6, highlight: '#ms_s_perm', label: 'One switch per area', for: 3.6 },
        { at: 6.0, zoom: '#ms_s_perm', scale: 1.3, for: 7 },
        { at: 9.8, click: '#ms_perm_opportunities' },
        { at: 11.4, click: '#ms_perm_reputation' },
      ],
    },
    {
      chapter: 'Permissions',
      say: "Payments, marketing, automation and settings stay off. And Bulk Actions stays off too, because it includes exporting your contact list. Only give that to people who really need it.",
      actions: [
        { at: 0.4, highlight: '#ms_perm_payments', label: 'Off', for: 2.4 },
        { at: 2.8, highlight: '#ms_perm_settings', label: 'Off', for: 2.4 },
        { at: 5.4, highlight: '#ms_perm_bulk', label: 'Includes exports', for: 3.6 },
      ],
    },
    {
      chapter: 'Roles',
      say: "Under User Roles, choose Admin or User. Admins can manage settings and other users, so keep that for owners and managers. Tom is a User. Then switch on Only show assigned data, so Tom sees just the patients assigned to him.",
      actions: [
        { at: 0.4, click: '#ms_sec_roles' },
        { at: 1.8, highlight: '#ms_role', label: 'Admin or User', for: 3.6 },
        { at: 2.0, zoom: '#ms_s_roles', scale: 1.5, for: 9 },
        { at: 8.6, click: '#ms_role_user' },
        { at: 11.8, click: '#ms_assigned_only' },
        { at: 12.4, highlight: '#ms_assigned_row', label: 'Only his own patients', for: 3 },
      ],
    },
    {
      chapter: 'Call settings',
      say: "Under Call and Voicemail, choose which business number Tom calls from, so patients always see the practice number, never his personal mobile. Then click Save.",
      caption: "Under Call & Voicemail, choose which business number Tom calls from, so patients always see the practice number, never his personal mobile. Then click Save.",
      actions: [
        { at: 0.4, click: '#ms_sec_call' },
        { at: 1.8, highlight: '#ms_outbound', label: 'Calls show the practice number', for: 4 },
        { at: 7.6, click: '#ms_save' },
      ],
    },
    {
      chapter: 'The invitation',
      say: "Tom now appears in the list, with an invitation sent. He'll get an email to set his own password, so you never need to share logins. To change his access later, just click the pencil icon.",
      actions: [
        { at: 0.4, highlight: '#ms_row_3', label: 'Invite sent', for: 4 },
        { at: 0.6, zoom: '#ms_row_3', scale: 1.4, for: 4 },
        { at: 8.0, hover: '#ms_edit_3' },
        { at: 8.2, highlight: '#ms_edit_3', label: 'Edit access', for: 2.4 },
      ],
    },
    {
      chapter: 'Calendar assignment',
      say: "Finally, let's let patients book with Tom. Open Calendars in the settings menu. Each calendar lists the team members who take its bookings. Click Team members on Check-up and Clean.",
      caption: "Finally, let's let patients book with Tom. Open Calendars in the settings menu. Each calendar lists the team members who take its bookings. Click Team members on Check-up & Clean.",
      actions: [
        { at: 0.4, click: '#ss_menu_calendars' },
        { at: 2.4, highlight: '#sc_table', label: 'Who takes bookings', for: 4 },
        { at: 8.6, click: '#sc_team_k3' },
      ],
    },
    {
      chapter: 'Calendar assignment',
      say: "Tick Tom, and click Save. This is a round robin calendar, so new check-ups are now shared between James, Priya and Tom, and only booked when each person is free.",
      actions: [
        { at: 0.4, click: '#sc_member_3' },
        { at: 1.4, zoom: '.modal', scale: 1.3, for: 3 },
        { at: 4.0, click: '#sc_team_save' },
        { at: 5.4, highlight: '#sc_row_k3', label: 'Tom now takes bookings', for: 4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Start with *less* access', sub: 'You can always switch more on later.' },
      say: "Here's a pro tip. Start every new team member with the least access they need. It's easy to switch a permission on later, but much harder to undo a mistake, like a bulk message sent to the wrong list.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 1.6', title: 'The Kyntlo *mobile app*', sub: 'Reply to leads and manage bookings on the go.', cta: 'Kyntlo [Academy]' },
      say: "Your team is set up! In the last lesson of this module, we'll install the Kyntlo mobile app, so you can reply to leads from anywhere. See you there.",
    },
  ],
};
