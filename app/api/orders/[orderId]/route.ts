import { loadOrder } from '../../../../lib/orderStore';

type Params = { params: { orderId: string } };

export async function GET(_req: Request, { params }: Params) {
  const order = await loadOrder(params.orderId);
  if (!order) {
    return new Response('Not found', { status: 404 });
  }
  return Response.json(order, { status: 200 });
}

