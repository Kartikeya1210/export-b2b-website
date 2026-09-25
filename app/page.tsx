import Link from 'next/link';
import { products } from '../data/products';
import { getUserContext } from '../lib/auth';

export default function HomePage() {
  const { isWholesale } = getUserContext();
  const topProducts = products.slice(0, 3);

  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-main">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" />
            HandyShack Global Enterprises • Services + Technology
          </div>
          <h1 className="hero-title">
            Local roots, <span>global reach</span> for serious wholesale buyers.
          </h1>
          <p className="hero-body">
            A focused export ordering portal from HandyShack Global Enterprises – connecting branding,
            technology, and logistics so your trade customers can submit large-volume orders with the details
            you need to move fast.
          </p>
          <div className="hero-actions">
            <Link href="/catalog" className="btn btn-primary">
              Browse wholesale catalog
            </Link>
            <Link href="/bulk-order" className="btn btn-ghost">
              Bulk order sheet
            </Link>
          </div>
        </div>
        <aside className="hero-secondary">
          <div className="stack-sm">
            <span className="hero-metric-label">Typical export order size</span>
            <div className="hero-metric-value">1,000 – 50,000 units</div>
            <p className="hero-metric-note">
              Built for pallets and containers, not single parcels. Capture clean order data from serious
              buyers only.
            </p>
          </div>
          <ul className="hero-list">
            <li>Structured checkout with company & shipment details</li>
            <li>Clear unit pricing and minimums for each SKU</li>
            <li>Cart tuned for high quantities and line items</li>
          </ul>
        </aside>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">A few key SKUs</h2>
            <p className="section-subtitle">
              Your buyers see a concise catalog tuned for export. Pricing is only visible to approved
              wholesale accounts.
            </p>
          </div>
          <Link href="/catalog" className="btn btn-ghost">
            View full catalog
          </Link>
        </div>
        <div className="grid grid-3">
          {topProducts.map((product) => (
            <article key={product.id} className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-meta">{product.shortDescription}</p>
                </div>
                <span className="pill">{product.minOrder.toLocaleString()} unit MOQ</span>
              </div>
              {isWholesale ? (
                <div className="price">
                  ${product.basePricePerUnit.toFixed(2)}
                  <span className="price-unit">per unit (base tier)</span>
                </div>
              ) : (
                <p className="muted">Sign in to view pricing.</p>
              )}
              <div className="card-actions">
                <Link href={`/products/${product.id}`} className="btn btn-ghost">
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

