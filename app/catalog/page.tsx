import Link from 'next/link';
import { products } from '../../data/products';
import { getUserContext } from '../../lib/auth';

export default function CatalogPage() {
  const { isWholesale } = getUserContext();

  return (
    <div className="stack">
      <header className="page-header">
        <h1 className="page-title">Wholesale catalog</h1>
        <p className="page-subtitle">
          Core export SKUs with clear minimums, unit prices, and lead times. Built for pallet and container
          orders.
        </p>
      </header>
      <div className="grid grid-3">
        {products.map((product) => (
          <article key={product.id} className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">{product.name}</h2>
                <p className="card-meta">
                  {product.sku} • MOQ {product.minOrder.toLocaleString()} units
                </p>
              </div>
              <span className="pill">
                {product.leadTimeWeeks}–{product.leadTimeWeeks + 1} wks
              </span>
            </div>
            {isWholesale ? (
              <div className="price">
                ${product.basePricePerUnit.toFixed(2)}
                <span className="price-unit">per unit (base tier)</span>
              </div>
            ) : (
              <p className="muted">Sign in as an approved buyer to view pricing.</p>
            )}
            <p className="muted">{product.shortDescription}</p>
            <div className="card-actions">
              <Link href={`/products/${product.id}`} className="btn btn-ghost">
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

