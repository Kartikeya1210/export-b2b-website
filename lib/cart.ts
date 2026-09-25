import { getProduct, getTierPrice } from '../data/products';

export type CartLine = {
  productId: string;
  quantity: number;
};

export function computeCartFromQuery(searchParams: URLSearchParams): CartLine[] {
  const productIds = searchParams.getAll('productId');
  const qtys = searchParams.getAll('qty');

  if (!productIds.length || !qtys.length || productIds.length !== qtys.length) return [];

  const lines: CartLine[] = [];

  productIds.forEach((id, index) => {
    const qtyRaw = qtys[index];
    const qty = Number(qtyRaw);
    if (!id || !Number.isFinite(qty) || qty <= 0) return;

    const product = getProduct(id);
    if (!product) return;

    const quantity = Math.max(product.minOrder, Math.round(qty));
    lines.push({ productId: id, quantity });
  });

  return lines;
}

export function enrichCart(lines: CartLine[]) {
  const items = lines
    .map((line) => {
      const product = getProduct(line.productId);
      if (!product) return null;
      const unitPrice = getTierPrice(product, line.quantity);
      const lineTotal = line.quantity * unitPrice;
      return { product, quantity: line.quantity, unitPrice, lineTotal };
    })
    .filter(Boolean) as {
      product: NonNullable<ReturnType<typeof getProduct>>;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
    }[];

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

  return { items, subtotal };
}

