import { promises as fs } from 'fs';
import path from 'path';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.jsonl');

export type OrderStatus =
  | 'placed'
  | 'received'
  | 'bidding'
  | 'awarded'
  | 'confirmed'
  | 'shipped';

export type StoredOrder = {
  orderId: string;
  createdAt: string;
  status: OrderStatus;
  payload: unknown;
};

export async function saveOrder(payload: unknown): Promise<StoredOrder> {
  const orderId = `HS-${Date.now()}`;
  const record: StoredOrder = {
    orderId,
    createdAt: new Date().toISOString(),
    status: 'placed',
    payload
  };

  await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
  await fs.appendFile(ORDERS_FILE, JSON.stringify(record) + '\n', 'utf8');

  return record;
}

export async function loadOrder(orderId: string): Promise<StoredOrder | null> {
  try {
    const content = await fs.readFile(ORDERS_FILE, 'utf8');
    const lines = content.split('\n').filter(Boolean);
    for (const line of lines) {
      const record = JSON.parse(line) as StoredOrder;
      if (record.orderId === orderId) return record;
    }
    return null;
  } catch {
    return null;
  }
}

