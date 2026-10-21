// Payments — placeholder until this screen is built.
KY.screen('payments', {
  tabs: [{ id: 'invoices', label: 'Invoices & Estimates' }, { id: 'payment-links', label: 'Payment Links' }, { id: 'subscriptions', label: 'Subscriptions' }, { id: 'transactions', label: 'Transactions' }, { id: 'products', label: 'Products' }, { id: 'integrations', label: 'Integrations' }],
  render(view) {
    view.innerHTML = `<div class="soon">Payments is coming to the demo soon.</div>`;
  },
});
