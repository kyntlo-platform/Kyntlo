// Kyntlo Team Academy · Batch 1 · s05 "I don't know which ads work" (internal: sales & support team).
// Approved script (doc "Kyntlo Team Academy: Batch 1 Scripts", section c07). Design: Money Grid.
// Filmed on the demo workspace (fictional Bloom Dental Studio) plus designed scenes in scenes/s05.html.
import { team } from './kit/lesson.mjs';

const t = team('s05');
const { page } = t;

export default {
  ...t.base,
  id: 'S-05',
  title: "Kyntlo Team Academy s05 - I don't know which ads work",
  transitions: ['pixelize', 'diagtr'],
  music: { preset: 'ads' },
  scenes: [
    { page: page('intro'), duration: 3.8, watermark: false },
    {
      page: page('hook'),
      voice: { voice: 'am_puck', speed: 1.0 },
      tail: 1,
      say: 'I spend money on ads every month. Honestly, I just hope they work.',
    },
    { page: page('coins'), duration: 7.4, say: 'Ad platforms tell you about clicks. You need to know about customers.' },
    {
      chapter: 'Where every lead came from',
      goto: '{demo}#/contacts',
      settle: 1,
      duration: 17.6,
      say: 'Every lead that enters Kyntlo is tagged with where it came from: Google, Facebook, Instagram, your website or a referral.',
      actions: [
        { at: 0.4, highlight: '#ct_row_c5', label: 'Google Ad', for: 1.4 },
        { at: 1.9, highlight: '#ct_row_c1', label: 'Facebook Ad', for: 1.4 },
        { at: 3.4, highlight: '#ct_row_c7', label: 'Instagram', for: 1.4 },
        { at: 4.9, highlight: '#ct_row_c2', label: 'Website Form', for: 1.4 },
        { at: 6.4, highlight: '#ct_row_c4', label: 'Referral', for: 1.4 },
        { at: 8.2, click: '#ct_row_c1' },
        { at: 9.6, highlight: '#cd_sec_contact', label: 'Source, saved on the record', for: 3.2 },
        { at: 9.8, zoom: '#cd_sec_contact', scale: 1.4, for: 2.8 },
        { at: 13.2, highlight: '#cd_tags', label: 'facebook lead', for: 2.4 },
      ],
    },
    {
      chapter: 'From lead to paid invoice',
      goto: '{demo}#/opportunities',
      settle: 1,
      duration: 18,
      say: 'Follow that lead through the pipeline to the booked job and the paid invoice.',
      actions: [
        { at: 0.4, click: '#op_filters' },
        { at: 1.6, click: '#opf_source' },
        { at: 2.6, click: '.menu button:has-text("Referral")' },
        { at: 3.6, click: '#opf_apply' },
        { at: 4.8, highlight: '#op_board', label: 'Only deals from referrals', for: 2.6 },
        { at: 7.6, highlight: '#op_card_o10', label: 'Won: £2,400 implant', for: 2.6 },
        { at: 10.4, click: '#sb_payments' },
        { at: 11.8, highlight: '#inv_row_INV-1043', label: 'Paid in full', for: 4 },
        { at: 12.0, zoom: '#inv_row_INV-1043', scale: 1.4, for: 3.4 },
      ],
    },
    { page: page('trail'), duration: 7.4 },
    {
      chapter: 'Results by source',
      goto: '{demo}#/dashboard',
      settle: 1,
      duration: 18,
      say: 'Your dashboard shows leads, bookings and revenue by source, side by side.',
      actions: [
        { at: 0.3, highlight: '#w_status', label: 'Opportunity status', for: 1.8 },
        { at: 2.2, highlight: '#w_value', label: 'Opportunity value', for: 1.8 },
        { at: 4.1, highlight: '#w_conversion', label: 'Conversion rate', for: 1.8 },
        { at: 6.2, click: '#dash_switch' },
        { at: 7.2, click: '.menu button:has-text("Marketing Performance")' },
        { at: 8.4, highlight: '#w_leadsource', label: 'Leads by source', for: 2.6 },
        { at: 11.4, click: '#sb_reporting' },
        { at: 12.4, click: '#tab_attribution' },
        { at: 13.6, highlight: '#rp_attr_table', label: 'Leads, bookings, revenue: side by side', for: 4 },
      ],
    },
    {
      chapter: 'Spend next to results',
      goto: '{demo}#/reporting/google-ads',
      settle: 1,
      duration: 17.4,
      say: 'Ads reporting puts your spend next to your results, so you can see the cost of each customer.',
      actions: [
        { at: 0.3, highlight: '#rp_g_kpis > :nth-child(5)', label: 'Spend', for: 2 },
        { at: 2.5, highlight: '#rp_g_kpis > :nth-child(6)', label: 'Results', for: 2 },
        { at: 4.7, highlight: '#rp_g_kpis > :nth-child(7)', label: 'Cost per customer', for: 2.6 },
        { at: 7.6, highlight: '#rp_g_table', label: 'Campaign by campaign', for: 4.2 },
        { at: 12.2, click: '#tab_facebook-ads' },
        { at: 13.4, highlight: '#rp_f_kpis > :nth-child(7)', label: 'Social ads: cost per lead', for: 3.6 },
      ],
    },
    { page: page('decide'), duration: 8, say: 'Double down on what works, switch off what does not.' },
    {
      page: page('tip'),
      tail: 2,
      say: "Selling tip: ask, if I gave you last month's ad spend and the number of customers it brought, could you tell me which ad did it? Most owners cannot.",
      caption: 'Selling tip: ask, "If I gave you last month\'s ad spend and the number of customers it brought, could you tell me which ad did it?" Most owners cannot.',
    },
    { page: page('outro'), watermark: false, duration: 6.0, say: 'Know your numbers. Kyntlo, Own Tomorrow.' },
  ],
};
