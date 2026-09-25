"use client";

import { useState } from 'react';
import { computeCartFromQuery, enrichCart } from '../../lib/cart';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CheckoutPage({ searchParams }: Props) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value != null) {
      params.set(key, value);
    }
  });

  const lines = computeCartFromQuery(params);
  const { items, subtotal } = enrichCart(lines);

  const hasItems = items.length > 0;

  const orderSummary = {
    items: items.map((item) => ({
      id: item.product!.id,
      name: item.product!.name,
      sku: item.product!.sku,
      quantity: item.quantity,
      unitPrice: item.unitPrice
    })),
    subtotal
  };

  const orderSummaryJson = JSON.stringify(orderSummary, null, 2);

  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submittedPayload, setSubmittedPayload] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="stack">
      <header className="page-header">
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle">
          Share company and shipment details so we can price transport, payment terms, and finalise your
          export order.
        </p>
      </header>

      {!hasItems && !submitted && (
        <div className="card">
          <p className="muted">
            There is no cart data in the URL. Go to the catalog, pick a product, and use &quot;Add to
            cart&quot; first.
          </p>
        </div>
      )}

      <div className="detail-layout">
        <section className="detail-main">
          {submitted ? (
            <div className="success-card">
              <div className="success-title">Order placed (demo)</div>
              <div className="success-body">
                We&apos;ve sent this payload to the <code>/api/orders</code> endpoint. In a real system this
                would create a draft export order in your backend.
              </div>
              {orderId && (
                <div className="spacer">
                  <a className="btn btn-primary" href={`/orders/${orderId}`}>
                    View order status
                  </a>
                </div>
              )}
              {submittedPayload && (
                <pre className="success-meta">{submittedPayload}</pre>
              )}
            </div>
          ) : (
            <form
              action=""
              method="POST"
              onSubmit={async (event) => {
                event.preventDefault();
                if (!hasItems) return;

                const formData = new FormData(event.currentTarget as HTMLFormElement);
                const customer = Object.fromEntries(formData.entries());
                const payload = { order: orderSummary, customer };

                setSubmitting(true);
                try {
                  const res = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                  });
                  if (!res.ok) {
                    throw new Error('Failed to submit order');
                  }
                  const data = (await res.json()) as { orderId?: string };
                  setSubmitted(true);
                  setOrderId(data.orderId ?? null);
                  setSubmittedPayload(JSON.stringify({ orderId: data.orderId, ...payload }, null, 2));
                } catch (error) {
                  // eslint-disable-next-line no-console
                  console.error(error);
                  alert('There was a problem submitting the order (demo). Check the console for details.');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className="field">
                <label htmlFor="company">Company name</label>
                <input
                  id="company"
                  name="company"
                  required
                  placeholder="Example Trading Ltd."
                  autoComplete="organization"
                />
              </div>
              <div className="field">
                <label htmlFor="contact">Contact name</label>
                <input
                  id="contact"
                  name="contact"
                  required
                  placeholder="Buyer / logistics contact"
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="buyer@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="field">
                <label htmlFor="country">Destination country</label>
                <input
                  id="country"
                  name="country"
                  required
                  placeholder="e.g. UAE, Saudi Arabia, USA"
                  autoComplete="country-name"
                />
              </div>
              <div className="field">
                <label htmlFor="notes">Notes (incoterms, port, special requirements)</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Share preferred incoterms, destination port, and any labelling or documentation requirements."
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={submitting || !hasItems}>
                {submitting ? 'Placing order…' : 'Place order (demo)'}
              </button>
              <p className="notice">
                This is a demo checkout. The data below is posted to a Next.js API route instead of a real
                payment gateway.
              </p>
            </form>
          )}
        </section>
        <aside className="detail-side">
          <div className="stack-sm">
            <h2 className="section-title">Order summary</h2>
            {!hasItems ? (
              <p className="muted">No items in this order yet.</p>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className="align-right">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.product!.id}>
                        <td>
                          <div className="stack-sm">
                            <strong>{item.product!.name}</strong>
                            <span className="muted">SKU {item.product!.sku}</span>
                          </div>
                        </td>
                        <td className="align-right">
                          {item.quantity.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="align-right">Estimated goods value</td>
                      <td className="align-right">
                        ${subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <p className="notice">
                  Freight, duties, and final pricing would normally be calculated by your backend or ERP once
                  this draft order is received.
                </p>
              </>
            )}
          </div>
          <div className="spacer">
            <div className="success-card">
              <div className="success-title">What happens with this data?</div>
              <div className="success-body">
                In a production setup this payload would be sent to your API or CRM to create a draft export
                order, assign an account manager, and trigger internal workflows.
              </div>
              <pre className="success-meta">
{orderSummaryJson}
              </pre>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

