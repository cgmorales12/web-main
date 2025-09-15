/**
 * Generates a simple invoice report either in the console or the browser.
 *
 * @param {Object} invoice - The invoice data.
 * @param {string} invoice.number - Invoice number.
 * @param {string} invoice.customer - Customer name.
 * @param {Array<{description: string, quantity: number, price: number}>} invoice.items - Items of invoice.
 * @param {number} invoice.taxRate - Tax rate (e.g. 0.18 for 18%).
 * @returns {{subtotal:number, tax:number, total:number}} Calculated totals.
 */
function calculateTotals(invoice) {
  let subtotal = 0;
  invoice.items.forEach((item) => {
    subtotal += item.quantity * item.price;
  });
  const tax = subtotal * invoice.taxRate;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

function generateInvoiceReport(invoice) {
  const { subtotal, tax, total } = calculateTotals(invoice);
  console.log(`Factura: ${invoice.number}`);
  console.log(`Cliente: ${invoice.customer}`);
  console.log('Detalle:');
  invoice.items.forEach((item) => {
    const lineTotal = item.quantity * item.price;
    console.log(` - ${item.description} (${item.quantity} x ${formatCurrency(item.price)}) = ${formatCurrency(lineTotal)}`);
  });
  console.log(`Subtotal: ${formatCurrency(subtotal)}`);
  console.log(`Impuesto (${invoice.taxRate * 100}%): ${formatCurrency(tax)}`);
  console.log(`Total: ${formatCurrency(total)}`);
  return { subtotal, tax, total };
}

function renderInvoiceReport(invoice, containerId = 'invoice-report') {
  const { subtotal, tax, total } = calculateTotals(invoice);
  const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
  if (!container) {
    return { subtotal, tax, total };
  }
  const table = document.createElement('table');
  const rows = invoice.items
    .map((item) => {
      const lineTotal = item.quantity * item.price;
      return `<tr><td>${item.description}</td><td>${item.quantity}</td><td>${formatCurrency(item.price)}</td><td>${formatCurrency(lineTotal)}</td></tr>`;
    })
    .join('');
  table.innerHTML = `
    <thead>
      <tr><th>Descripción</th><th>Cantidad</th><th>Precio</th><th>Total</th></tr>
    </thead>
    <tbody>${rows}</tbody>
    <tfoot>
      <tr><td colspan="3">Subtotal</td><td>${formatCurrency(subtotal)}</td></tr>
      <tr><td colspan="3">Impuesto (${invoice.taxRate * 100}%)</td><td>${formatCurrency(tax)}</td></tr>
      <tr><td colspan="3"><strong>Total</strong></td><td><strong>${formatCurrency(total)}</strong></td></tr>
    </tfoot>
  `;
  container.innerHTML = '';
  container.appendChild(table);
  return { subtotal, tax, total };
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateInvoiceReport, renderInvoiceReport };
} else {
  window.generateInvoiceReport = generateInvoiceReport;
  window.renderInvoiceReport = renderInvoiceReport;
}

if (typeof require === 'function' && require.main === module) {
  const sampleInvoice = {
    number: 'FAC-001',
    customer: 'Cliente de ejemplo',
    items: [
      { description: 'Producto A', quantity: 2, price: 10 },
      { description: 'Producto B', quantity: 1, price: 20 }
    ],
    taxRate: 0.18
  };
  generateInvoiceReport(sampleInvoice);
}
