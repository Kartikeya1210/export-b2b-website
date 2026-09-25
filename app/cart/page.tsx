import Link from 'next/link';
import { computeCartFromQuery, enrichCart } from '../../lib/cart';
import { getUserContext } from '../../lib/auth';
import { formatAllCurrencies } from '../../lib/currency';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CartPage({ searchParams }: Props) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value != null) {
      params.set(key, value);
    }
  });

  const { isWholesale } = getUserContext();
  const lines = computeCartFromQuery(params);
  const { items, subtotal } = enrichCart(lines);

  const hasItems = items.length > 0;

  return (
    <div className="stack">
      <header className="page-header">
        <h1 className="page-title">Cart</h1>
        <p className="page-subtitle">
          Review your export order before sharing company and shipment details at checkout.
        </p>
      </header>

      {!isWholesale && (
        <div className="card">
          <p className="muted">
            Pricing and ordering are only available to approved wholesale buyers. Log in or request an
            account to see your cart.
          </p>
          <div className="spacer inline">
            <Link href="/login" className="btn btn-primary">
              Log in
            </Link>
            <Link href="/request-account" className="btn btn-ghost">
              Request account
            </Link>
          </div>
        </div>
      )}

      {isWholesale && !hasItems ? (
        <div className="card">
          <p className="muted">Your cart is empty.</p>
          <div className="spacer">
            <Link href="/catalog" className="btn btn-primary">
              Browse catalog
            </Link>
          </div>
        </div>
      ) : isWholesale ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity (units)</th>
                <th className="align-right">Unit price</th>
                <th className="align-right">Line total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.product!.id}>
                  <td>
                    <div className="stack-sm">
                      <strong>{item.product!.name}</strong>
                      <span className="muted">
                        SKU {item.product!.sku} • MOQ{' '}
                        {item.product!.minOrder.toLocaleString(undefined, { maximumFractionDigits: 0 })} units
                      </span>
                    </div>
                  </td>
                  <td>{item.quantity.toLocaleString()}</td>
                  <td className="align-right">${item.unitPrice.toFixed(2)}</td>
                  <td className="align-right">
                    ${item.lineTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="align-right">
                  Subtotal (USD)
                </td>
                <td className="align-right">
                  ${subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>
            </tfoot>
          </table>

          <p className="notice">
            {(() => {
              const fx = formatAllCurrencies(subtotal);
              return `Approximate value: ${fx.USD} • ${fx.EUR} • ${fx.AED}`;
            })()}
          </p>

          <div className="spacer">
            <div className="inline">
              <Link href="/catalog" className="btn btn-ghost">
                Adjust quantities in catalog
              </Link>
              <Link
                href={{
                  pathname: '/checkout',
                  query: Object.fromEntries(params.entries())
                }}
                className="btn btn-primary"
              >
                Proceed to checkout
              </Link>
            </div>
            <p className="notice">
              This cart is sessionless and derived from the URL. In a real app you would persist it in a
              database or session store.
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

