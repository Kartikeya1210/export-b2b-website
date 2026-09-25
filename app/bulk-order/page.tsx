import Link from 'next/link';
import { products } from '../../data/products';

export default function BulkOrderPage() {
  return (
    <div className="stack">
      <header className="page-header">
        <h1 className="page-title">Bulk order</h1>
        <p className="page-subtitle">
          Enter quantities for each SKU in one place to build large multi-line export orders.
        </p>
      </header>
      <form action="/cart" method="GET" className="card stack-sm">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>MOQ</th>
              <th>Lead time</th>
              <th className="align-right">Quantity (units)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="stack-sm">
                    <strong>{product.name}</strong>
                    <span className="muted">
                      SKU {product.sku} • Base from ${product.basePricePerUnit.toFixed(2)} per unit
                    </span>
                  </div>
                </td>
                <td>{product.minOrder.toLocaleString()}</td>
                <td>
                  {product.leadTimeWeeks}–{product.leadTimeWeeks + 1} wks
                </td>
                <td className="align-right">
                  <input
                    type="number"
                    name="qty"
                    min={0}
                    step={product.minOrder}
                    placeholder={product.minOrder.toString()}
                    className="bulk-input"
                  />
                  <input type="hidden" name="productId" value={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">
          Add all to cart
        </button>
        <p className="notice">
          Only rows with quantities &gt; 0 will be included. Quantities below the MOQ will be rounded up to
          the minimum for each SKU.
        </p>
        <p className="notice">
          For very large container-level orders, you can still use the checkout notes to request a custom
          shipping quote.
        </p>
      </form>
      <div className="spacer">
        <Link href="/catalog" className="btn btn-ghost">
          Back to catalog
        </Link>
      </div>
    </div>
  );
}

