import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct } from '../../../data/products';
import { getUserContext } from '../../../lib/auth';
import { formatAllCurrencies } from '../../../lib/currency';

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  const product = getProduct(params.id);
  const { isWholesale } = getUserContext();

  if (!product) {
    notFound();
  }

  const estPalletValue = product.minOrder * product.basePricePerUnit;

  return (
    <div className="stack">
      <header className="page-header">
        <h1 className="page-title">{product.name}</h1>
        <p className="page-subtitle">
          SKU {product.sku} • MOQ {product.minOrder.toLocaleString()} units • Lead time{' '}
          {product.leadTimeWeeks}–{product.leadTimeWeeks + 1} weeks
        </p>
      </header>
      <div className="detail-layout">
        <section className="detail-main">
          <p className="muted">{product.longDescription}</p>
          <div className="card">
            <div className="stack-sm">
              <div className="inline">
                <div>
                  {isWholesale ? (
                    <>
                      <div className="price">
                        ${product.basePricePerUnit.toFixed(2)}
                        <span className="price-unit">per unit (1,000–4,999 units)</span>
                      </div>
                      <div className="muted">
                        MOQ {product.minOrder.toLocaleString()} units (~$
                        {estPalletValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} order value)
                      </div>
                    </>
                  ) : (
                    <p className="muted">
                      Sign in as an approved wholesale buyer to view detailed pricing and place orders.
                    </p>
                  )}
                </div>
                <span className="badge-soft">
                  <span className="badge-soft-dot" />
                  Export-ready stock
                </span>
              </div>
              <div className="muted">
                Packaging: {product.packaging}
                <br />
                Country of origin: {product.countryOfOrigin}
              </div>
            </div>
          </div>
          {isWholesale && (
            <p className="notice">
              {(() => {
                const fx = formatAllCurrencies(product.basePricePerUnit);
                return `Indicative pricing: ${fx.USD} • ${fx.EUR} • ${fx.AED} per unit (1,000–4,999 units).`;
              })()}
            </p>
          )}
          {isWholesale && (
            <div className="card">
              <div className="section-title">Tiered pricing</div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Quantity band</th>
                    <th className="align-right">Unit price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1,000 – 4,999 units</td>
                    <td className="align-right">${product.tiers[0].pricePerUnit.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>5,000 – 9,999 units</td>
                    <td className="align-right">${product.tiers[1].pricePerUnit.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>10,000+ units</td>
                    <td className="align-right">${product.tiers[2].pricePerUnit.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="notice">
                The cart and checkout automatically apply the correct tier based on your requested quantity.
              </p>
            </div>
          )}
        </section>
        <aside className="detail-side">
          {isWholesale ? (
            <form action="/cart" method="GET" className="stack-sm">
              <div className="field">
                <label htmlFor="qty">Quantity (units)</label>
                <div className="qty-row">
                  <input
                    id="qty"
                    name="qty"
                    type="number"
                    min={product.minOrder}
                    defaultValue={product.minOrder}
                    step={product.minOrder}
                  />
                  <span className="pill-soft">
                    Typical export order: {product.minOrder.toLocaleString()}+ units
                  </span>
                </div>
              </div>
              <input type="hidden" name="productId" value={product.id} />
              <button type="submit" className="btn btn-primary">
                Add to cart
              </button>
              <p className="notice">
                This is a demo app. The cart and checkout summarise your order data but do not create a real
                order.
              </p>
            </form>
          ) : (
            <div className="card">
              <div className="stack-sm">
                <p className="muted">
                  Pricing and ordering are only available to approved wholesale buyers.
                </p>
                <div className="inline">
                  <Link href="/login" className="btn btn-primary">
                    Log in
                  </Link>
                  <Link href="/request-account" className="btn btn-ghost">
                    Request account
                  </Link>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
      <div className="spacer">
        <Link href="/catalog" className="btn btn-ghost">
          Back to catalog
        </Link>
      </div>
    </div>
  );
}

