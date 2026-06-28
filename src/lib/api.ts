const URLS = {
  products: 'https://functions.poehali.dev/ead8b135-8ff7-4715-8e25-7ae9766ec88d',
  createPayment: 'https://functions.poehali.dev/4952d7ad-b871-4888-ba78-2ca5ca6dfdbb',
  orders: 'https://functions.poehali.dev/73b387c2-cc4f-43b5-a1b4-dec3b7257804',
};

export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  type: 'course' | 'key' | 'file' | 'subscription';
  category: string;
  price: number;
  old_price: number | null;
  emoji: string;
  gradient: string;
  badge: string | null;
  rating: number;
  sales_count: number;
}

export interface ApiOrder {
  id: number;
  title: string;
  type: string;
  emoji: string;
  gradient: string;
  amount: number;
  status: string;
  created_at: string;
  paid_at: string | null;
  delivery_content: string;
}

export async function fetchProducts(type?: string): Promise<ApiProduct[]> {
  const url = type && type !== 'all'
    ? `${URLS.products}?type=${type}`
    : URLS.products;
  const res = await fetch(url);
  const data = await res.json();
  return data.products ?? [];
}

export async function createPayment(payload: {
  product_id: number;
  email: string;
  name: string;
}): Promise<{ payment_url: string; payment_id: string }> {
  const res = await fetch(URLS.createPayment, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка создания платежа');
  return data;
}

export async function fetchOrders(email: string): Promise<ApiOrder[]> {
  const res = await fetch(`${URLS.orders}?email=${encodeURIComponent(email)}`);
  const data = await res.json();
  return data.orders ?? [];
}
