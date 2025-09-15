/**
 * Generates a simple invoice report in the console.
 *
 * @param {Object} invoice - The invoice data.
 * @param {string} invoice.number - Invoice number.
 * @param {string} invoice.customer - Customer name.
 * @param {Array<{description: string, quantity: number, price: number}>} invoice.items - Items of invoice.
 * @param {number} invoice.taxRate - Tax rate (e.g. 0.18 for 18%).
 * @returns {{subtotal:number, tax:number, total:number}} Calculated totals.
 */
function generateInvoiceReport(invoice) {
  let subtotal = 0;
  console.log(`Factura: ${invoice.number}`);
  console.log(`Cliente: ${invoice.customer}`);
  console.log('Detalle:');
  invoice.items.forEach((item) => {
    const lineTotal = item.quantity * item.price;
    subtotal += lineTotal;
    console.log(` - ${item.description} (${item.quantity} x ${formatCurrency(item.price)}) = ${formatCurrency(lineTotal)}`);
  });
  const tax = subtotal * invoice.taxRate;
  const total = subtotal + tax;
  console.log(`Subtotal: ${formatCurrency(subtotal)}`);
  console.log(`Impuesto (${invoice.taxRate * 100}%): ${formatCurrency(tax)}`);
  console.log(`Total: ${formatCurrency(total)}`);
  return { subtotal, tax, total };
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount);
}

if (require.main === module) {
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

module.exports = { generateInvoiceReport };
