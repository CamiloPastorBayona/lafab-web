// Cliente del checkout headless. Habla con /api/store/* (proxy a la Store API de
// WooCommerce). El carrito se mantiene con el Cart-Token en cookie httpOnly.

export type Address = {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string; // código CO-XXX
  postcode: string;
  country: string; // "CO"
  email?: string;
  phone?: string;
};

export type ShippingRate = { rate_id: string; name: string; price: string };
export type CartResponse = {
  items_count: number;
  needs_shipping: boolean;
  totals?: { total_price: string; currency_minor_unit: number };
  shipping_rates?: { package_id: number; shipping_rates: ShippingRate[] }[];
};

async function api<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
  const r = await fetch(`/api/store/${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  const data = await r.json().catch(() => null);
  const error =
    !r.ok && data && typeof data === "object"
      ? (data as { message?: string }).message
      : undefined;
  return { ok: r.ok, status: r.status, data: data as T, error };
}

// Vacía el carrito de WooCommerce y lo llena con los ítems del carrito local.
export async function syncCart(items: { id: number; qty: number }[]) {
  await api("cart/items", { method: "DELETE" });
  let last;
  for (const it of items) {
    last = await api<CartResponse>("cart/add-item", {
      method: "POST",
      body: JSON.stringify({ id: it.id, quantity: it.qty }),
    });
    if (!last.ok) return last;
  }
  return last;
}

export async function updateCustomer(billing: Address, shipping: Address) {
  return api<CartResponse>("cart/update-customer", {
    method: "POST",
    body: JSON.stringify({ billing_address: billing, shipping_address: shipping }),
  });
}

export async function selectShipping(packageId: number, rateId: string) {
  return api<CartResponse>("cart/select-shipping-rate", {
    method: "POST",
    body: JSON.stringify({ package_id: packageId, rate_id: rateId }),
  });
}

export type CheckoutResponse = {
  order_id: number;
  status: string;
  payment_result?: {
    payment_status: string;
    redirect_url?: string;
  };
};

export async function placeOrder(
  billing: Address,
  shipping: Address,
  payment_method: string,
  customer_note?: string
) {
  return api<CheckoutResponse>("checkout", {
    method: "POST",
    body: JSON.stringify({
      billing_address: billing,
      shipping_address: shipping,
      payment_method,
      customer_note: customer_note || "",
    }),
  });
}
