// Track A · Module 1 · Lesson 4 — Business profile & branding.
// Filmed on the demo workspace (academy/demo-app).
export default {
  id: 'A-1.4',
  title: 'Kyntlo Academy 1.4 — Business profile & branding',
  description:
    'Set up your Business Profile in Kyntlo: upload your logo, add your business details and address, choose the right time zone, and fill in the legal and compliance information used for phone and messaging registration.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Getting started', 'Business profile', 'Settings'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 1 · Lesson 4', title: 'Your *business profile*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 1 · Lesson 4', title: 'Business profile & *branding*', sub: 'Your logo, details, time zone and legal information.' },
      say: "In this lesson, we'll set up your business profile. It only takes a few minutes, but it affects almost everything in Kyntlo, from your invoices and emails to appointment times and phone registration.",
    },
    {
      chapter: 'Finding Business Profile',
      goto: '{demo}#/dashboard',
      say: "Click Settings at the bottom of the sidebar. Business Profile is the first page in the settings menu, under My Business.",
      actions: [
        { at: 0.4, hover: '#sb_settings' },
        { at: 0.6, highlight: '#sb_settings', label: 'Settings', for: 2 },
        { at: 2.6, click: '#sb_settings' },
        { at: 4.0, highlight: '#ss_menu_business-profile', label: 'Business Profile', for: 3 },
      ],
    },
    {
      chapter: 'Logo',
      say: "Start with your logo. Click the upload area and choose your file. A wide logo works best, around three hundred and fifty by one hundred and eighty pixels. It appears on your invoices, booking pages and other customer-facing pages.",
      caption: "Start with your logo. Click the upload area and choose your file. A wide logo works best, around 350 × 180 pixels. It appears on your invoices, booking pages and other customer-facing pages.",
      actions: [
        { at: 0.4, highlight: '#bp_logo', label: 'Upload your logo', for: 3 },
        { at: 3.6, click: '#bp_logo' },
        { at: 5.0, zoom: '#bp_logo', scale: 1.6, for: 4 },
      ],
    },
    {
      chapter: 'Business details',
      say: "Next, your business details. The friendly name is what customers see. The legal name must match your official registration exactly, including Limited or L L C. Add it now, because phone and texting registrations are checked against it.",
      caption: "Next, your business details. The friendly name is what customers see. The legal name must match your official registration exactly, including Ltd or LLC. Add it now, because phone and texting registrations are checked against it.",
      actions: [
        { at: 0.4, highlight: '#bp_name', label: 'What customers see', for: 3 },
        { at: 4.0, type: 'Bloom Dental Studio Ltd', into: '#bp_legal' },
        { at: 6.0, zoom: '#bp_legal', scale: 1.8, for: 4 },
        { at: 6.2, highlight: '#bp_legal', label: 'Exactly as registered', for: 3.6 },
      ],
    },
    {
      chapter: 'Business details',
      say: "Check your business email, phone and website. These are used as defaults in emails and on your pages. Choose your business niche, then click Update Information to save this section.",
      actions: [
        { at: 0.4, highlight: '#bp_email', label: 'Business email', for: 2.2 },
        { at: 2.6, highlight: '#bp_phone', label: 'Business phone', for: 2.2 },
        { at: 4.8, highlight: '#bp_website', label: 'Website', for: 2 },
        { at: 7.4, hover: '#bp_niche' },
        { at: 9.6, click: '#bp_save_general' },
      ],
    },
    {
      chapter: 'Address & time zone',
      say: "Below that is your business address. It's shown on invoices and used for your Google listing and phone registration, so use your real trading address.",
      actions: [
        { at: 0.3, highlight: '#bp_address_card', label: 'Business Physical Address', for: 4 },
        { at: 0.5, hover: '#bp_street' },
      ],
    },
    {
      chapter: 'Address & time zone',
      say: "Now the time zone, which is more important than it looks. It controls when appointments show, when reminders and workflows send, and how your reports count each day. Pick the time zone where your business operates, then click Update Address.",
      actions: [
        { at: 0.4, click: '#bp_timezone' },
        { at: 1.6, zoom: '.menu', scale: 1.5, for: 4 },
        { at: 7.0, click: '.menu button:has-text("Europe/London")' },
        { at: 8.6, highlight: '#bp_timezone', label: 'Your time zone', for: 3 },
        { at: 12.0, click: '#bp_save_address' },
      ],
    },
    {
      chapter: 'Legal & compliance',
      say: "Business Information holds your legal details: business type, industry, and your registration number. In the UK, that's your Companies House number. In the US, it's your E I N. Phone carriers use these details to approve your number for calling and texting.",
      caption: "Business Information holds your legal details: business type, industry, and your registration number. In the UK, that's your Companies House number. In the US, it's your EIN. Phone carriers use these details to approve your number for calling and texting.",
      actions: [
        { at: 0.4, highlight: '#bp_info_card', label: 'Legal & compliance details', for: 3.6 },
        { at: 5.0, hover: '#bp_type' },
        { at: 6.4, hover: '#bp_regtype' },
        { at: 8.6, type: '09876543', into: '#bp_regnum' },
        { at: 10.2, zoom: '#bp_info_card', scale: 1.4, for: 4 },
        { at: 15.0, click: '#bp_save_info' },
      ],
    },
    {
      chapter: 'Authorized representative',
      say: "On the right, add your authorized representative. This is the person carriers may contact about your registration, usually the owner or a director.",
      actions: [
        { at: 0.4, highlight: '#bp_rep_card', label: 'Authorized Representative', for: 4 },
        { at: 0.6, zoom: '#bp_rep_card', scale: 1.4, for: 4.4 },
        { at: 6.6, click: '#bp_save_rep' },
      ],
    },
    {
      chapter: 'General settings',
      say: "Finally, the General settings. Leave Allow Duplicate Contact switched off, so a lead who fills in two forms stays as one contact. And keep Mark email as invalid switched on, so you stop sending to addresses that bounce.",
      actions: [
        { at: 0.4, highlight: '#bp_general_settings', label: 'General', for: 3 },
        { at: 3.4, zoom: '#bp_general_settings', scale: 1.4, for: 8 },
        { at: 3.6, hover: '#bp_g_dupContact' },
        { at: 8.2, hover: '#bp_g_invalidEmail' },
        { at: 11.4, click: '#bp_save_settings' },
      ],
    },
    {
      chapter: 'My Profile',
      say: "One more page to know. My Profile, just below, holds your own details: your name, photo, password, email signature and two-factor sign-in. Each team member fills in their own.",
      actions: [
        { at: 0.4, click: '#ss_menu_my-profile' },
        { at: 2.2, highlight: '#ss_main', label: 'Your personal settings', for: 4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Copy your legal details *word for word*', sub: 'Mismatches are the top reason registrations get rejected.' },
      say: "Here's a pro tip. Copy your legal name, registration number and address word for word from your official documents. Even a small mismatch is the most common reason phone registrations get rejected.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 1.5', title: 'Inviting your team & *permissions*', sub: 'Add users, roles, permissions and calendars.', cta: 'Kyntlo [Academy]' },
      say: "Your business profile is done! Next, we'll invite your team, and decide exactly what each person can see and do. See you there.",
    },
  ],
};
