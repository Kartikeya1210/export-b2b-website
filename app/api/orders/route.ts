import { saveOrder } from '../../../lib/orderStore';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return new Response('Invalid JSON', { status: 400 });
  }

  const record = await saveOrder(body);

  // eslint-disable-next-line no-console
  console.log('Received demo export order:', JSON.stringify({ orderId: record.orderId, ...body }, null, 2));

  return Response.json(
    {
      ok: true,
      orderId: record.orderId,
      receivedAt: record.createdAt
    },
    { status: 200 }
  );
}

