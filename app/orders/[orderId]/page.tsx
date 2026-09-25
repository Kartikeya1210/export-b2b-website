import Link from 'next/link';

type Props = { params: { orderId: string } };

type StoredOrder = {
  orderId: string;
  createdAt: string;
  status: string;
  payload: any;
};

async function getOrder(orderId: string): Promise<StoredOrder | null> {
  const res = await fetch(`http://localhost:3001/api/orders/${orderId}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return (await res.json()) as StoredOrder;
}

const STEPS = ['placed', 'received', 'bidding', 'awarded', 'confirmed', 'shipped'] as const;

function titleCase(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

export default async function OrderStatusPage({ params }: Props) {
  const order = await getOrder(params.orderId);

  if (!order) {
    return (
      <div className="stack">
        <header className="page-header">
          <h1 className="page-title">Order not found</h1>
          <p className="page-subtitle">Check the link or contact HandyShack support.</p>
        </header>
        <Link href="/catalog" className="btn btn-ghost">
          Back to catalog
        </Link>
      </div>
    );
  }

  const currentIndex = Math.max(0, STEPS.indexOf(order.status as any));

  return (
    <div className="stack">
      <header className="page-header">
        <h1 className="page-title">Order {order.orderId}</h1>
        <p className="page-subtitle">
          Status: {titleCase(order.status)} • Placed {new Date(order.createdAt).toLocaleString()}
        </p>
      </header>

      <section className="card">
        <h2 className="section-title">Order journey</h2>
        <ol className="hero-list">
          {STEPS.map((step, index) => (
            <li key={step}>
              <span style={{ opacity: index <= currentIndex ? 1 : 0.45 }}>
                {index <= currentIndex ? '✓ ' : '• '}
                {titleCase(step)}
              </span>
            </li>
          ))}
        </ol>
        <p className="notice">
          This timeline updates as your order progresses (received → bidding → confirmed → shipped).
        </p>
      </section>

      <section className="card">
        <h2 className="section-title">Order summary</h2>
        <pre className="success-meta">{JSON.stringify(order.payload, null, 2)}</pre>
      </section>

      <div className="inline">
        <Link href="/catalog" className="btn btn-ghost">
          Continue shopping
        </Link>
        <Link href="/bulk-order" className="btn btn-ghost">
          Bulk order sheet
        </Link>
      </div>
    </div>
  );
}

