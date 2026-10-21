// Track A · Module 14 · Lesson 1 — Phone numbers & caller ID.
// Filmed on the demo workspace (academy/demo-app): Settings → Phone System.
export default {
  id: 'A-14.1',
  title: 'Kyntlo Academy 14.1 — Phone numbers & caller ID',
  description:
    'Buy a business phone number, choose between local and mobile numbers, set up call forwarding and caller ID, pick your default outbound number, and understand the Trust Center: regulatory bundles, A2P 10DLC and number porting.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Phone numbers', 'A2P 10DLC', 'Call forwarding', 'Settings'],
  plan: 'ALL',
  thumbnail: { kicker: 'Module 14 · Lesson 1', title: 'Phone numbers & *caller ID*' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 14 · Lesson 1', title: 'Phone numbers & *caller ID*', sub: 'Buy a number, forward calls and get registered.' },
      say: "Welcome to Module 14, where we finish setting up your account. In this lesson, we'll buy a business phone number, forward its calls to you, and make sure carriers trust it, so your calls get answered and your texts get delivered.",
    },
    {
      chapter: 'Why a business number',
      goto: '{demo}#/settings/phone-numbers',
      settle: 1,
      say: "Open Settings, then Phone System. A Kyntlo number means every call and text is saved on the customer's record, your missed calls can trigger automations, and your personal mobile stays private. Bloom already has two numbers.",
      actions: [
        { at: 0.4, highlight: '#ss_menu_phone-numbers', label: 'Phone System', for: 2.6 },
        { at: 3.4, highlight: '#ph_table', label: 'Your numbers', for: 4 },
        { at: 9.0, zoom: '#ph_table', scale: 1.4, for: 4 },
      ],
    },
    {
      chapter: 'Number types',
      say: "Look at the capabilities column. The London landline can take calls, but in the UK, landline numbers can't send texts. The mobile number can do both. If you want to text customers, you need a number with S M S. Texting is included on the Growth and Pro plans.",
      caption: "Look at the capabilities column. The London landline can take calls, but in the UK, landline numbers can't send texts. The mobile number can do both. If you want to text customers, you need a number with SMS. Texting is included on the Growth and Pro plans.",
      actions: [
        { at: 0.4, zoom: '#ph_table', scale: 1.5, for: 12 },
        { at: 0.6, highlight: '#ph_row_0', label: 'Calls only', for: 4 },
        { at: 6.6, highlight: '#ph_row_1', label: 'Calls + texts', for: 4 },
      ],
    },
    {
      chapter: 'Buy a number',
      say: "To add a number, click Add Number. Choose the country and the type. Local numbers look familiar to nearby customers. Mobile numbers can text. Toll-free numbers are free for callers.",
      actions: [
        { at: 0.4, click: '#ph_add' },
        { at: 2.4, highlight: '#ph_types', label: 'Local · Mobile · Toll-free', for: 3 },
        { at: 5.4, click: '#ph_type_local' },
        { at: 7.4, highlight: '#ph_caps_note', label: 'Local: voice only in the UK', for: 2.6 },
        { at: 10.4, click: '#ph_type_mobile' },
      ],
    },
    {
      chapter: 'Buy a number',
      say: "Pick a number from the list and click Buy. You'll see what it supports and what it costs. The monthly rental and your call and text usage come out of your wallet at wholesale rates. Click Confirm purchase, and it's yours.",
      actions: [
        { at: 0.4, hover: '#ph_result_0' },
        { at: 2.0, click: '#ph_buy_0' },
        { at: 3.6, zoom: '.modal', scale: 1.35, for: 6 },
        { at: 10.6, click: '#ph_buy_confirm' },
        { at: 12.0, highlight: '#ph_row_2', label: 'Your new number', for: 2.4 },
      ],
    },
    {
      chapter: 'Call forwarding & caller ID',
      say: "Now let's decide where calls go. Click Configure on the main line. In Forward calls to, enter the phone that should ring. Here it's Sarah's mobile.",
      actions: [
        { at: 0.4, click: '#ph_edit_0' },
        { at: 2.4, highlight: '#ph_cfg_fwd', label: 'Where calls ring', for: 3.6 },
        { at: 2.6, zoom: '#ph_cfg_fwd', scale: 1.6, for: 3.4 },
      ],
    },
    {
      chapter: 'Call forwarding & caller ID',
      say: "Pass caller's number controls caller ID on forwarded calls. Switched on, your mobile shows the customer's number, not your Kyntlo number. The whisper message tells you it's a business call before you're connected, so you answer the right way.",
      caption: "Pass caller's number controls caller ID on forwarded calls. Switched on, your mobile shows the customer's number, not your Kyntlo number. The whisper message tells you it's a business call before you're connected, so you answer the right way.",
      actions: [
        { at: 0.4, highlight: '#ph_cfg_pass', label: 'Caller ID', for: 3.4 },
        { at: 0.6, zoom: '.drawer', scale: 1.3, for: 13 },
        { at: 9.0, highlight: '#ph_cfg_whisper', label: 'Whisper', for: 3 },
      ],
    },
    {
      chapter: 'Call forwarding & caller ID',
      say: "If you record calls, switch on Record calls, and let callers know they're being recorded. Choose how long it rings before voicemail, then click Save.",
      actions: [
        { at: 0.4, highlight: '#ph_cfg_record', label: 'Tell callers', for: 3 },
        { at: 4.0, highlight: '#ph_cfg_timeout', label: 'Then voicemail', for: 2.6 },
        { at: 7.2, click: '#ph_cfg_save' },
      ],
    },
    {
      chapter: 'Default outbound number',
      say: "Below the list is your default outbound number. This is the caller ID customers see when you call or text them, unless a team member has their own number. Use the number customers already know.",
      actions: [
        { at: 0.4, highlight: '#ph_default_card', label: 'What customers see', for: 4 },
        { at: 0.6, zoom: '#ph_default_card', scale: 1.5, for: 4.4 },
        { at: 5.6, click: '#ph_default' },
        { at: 8.4, click: '.menu button >> nth=0' },
      ],
    },
    {
      chapter: 'Trust Center',
      say: "Next, the Trust Center tab. Carriers want to know who is behind a number before they deliver your calls and texts. Your customer profile uses the details from your business profile. UK numbers also need a regulatory bundle, a proof of your business address. Both are approved here.",
      actions: [
        { at: 0.4, click: '#phone_tab_trust-center' },
        { at: 2.4, highlight: '#tc_profile', label: 'Your verified business', for: 4 },
        { at: 9.4, highlight: '#tc_bundle', label: 'UK proof of address', for: 4 },
      ],
    },
    {
      chapter: 'A2P 10DLC',
      say: "If you text customers from a US local number, you also need A two P ten D L C registration. You register your brand, then a campaign describing the messages you send and how people opt in. Until it's approved, US carriers may block your texts.",
      caption: "If you text customers from a US local number, you also need A2P 10DLC registration. You register your brand, then a campaign describing the messages you send and how people opt in. Until it's approved, US carriers may block your texts.",
      actions: [
        { at: 0.4, highlight: '#tc_a2p', label: 'US numbers only', for: 3.6 },
        { at: 4.6, click: '#tc_a2p_start' },
        { at: 6.0, zoom: '.modal', scale: 1.3, for: 6 },
      ],
    },
    {
      chapter: 'Number porting',
      goto: '{demo}#/settings/phone-numbers/porting',
      say: "Already have a number customers know? Use Number Porting to move it to Kyntlo. Keep it active with your old provider until the move is complete, so you don't miss a single call.",
      actions: [
        { at: 0.4, highlight: '#phone_tab_porting', label: 'Number Porting', for: 3 },
        { at: 3.6, highlight: '#ph_body', label: 'Bring your number', for: 4 },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Use one number *everywhere*', sub: 'Website, Google profile, ads and email signatures.' },
      say: "Here's a pro tip. Put your Kyntlo number everywhere customers find you: your website, your Google profile, your ads and your email signature. That way every call is tracked, and missed calls can get an automatic text back.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 14.2', title: 'Email services & *sending domain*', sub: 'Send from your own domain and land in the inbox.', cta: 'Kyntlo [Academy]' },
      say: "Your phone system is ready! Next, we'll set up your own email sending domain, so your emails land in the inbox. See you there.",
    },
  ],
};
