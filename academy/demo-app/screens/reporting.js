// Reporting — placeholder until this screen is built.
KY.screen('reporting', {
  tabs: [{ id: 'google-ads', label: 'Google Ads' }, { id: 'facebook-ads', label: 'Facebook Ads' }, { id: 'attribution', label: 'Attribution Report' }, { id: 'calls', label: 'Call Reporting' }, { id: 'appointments', label: 'Appointment Report' }, { id: 'agents', label: 'Agent Reporting' }],
  render(view) {
    view.innerHTML = `<div class="soon">Reporting is coming to the demo soon.</div>`;
  },
});
