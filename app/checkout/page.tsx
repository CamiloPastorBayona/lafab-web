"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart, formatCOP } from "@/lib/cart";
import { CO_DEPARTMENTS } from "@/lib/departments";
import {
  syncCart,
  updateCustomer,
  selectShipping,
  placeOrder,
  type Address,
} from "@/lib/headlessCheckout";
import Ico from "@/components/LandingIcons";
import { trackBeginCheckout } from "@/lib/analytics";

export default function CheckoutPage() {
  const { items, subtotal, count, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    departamento: "CO-ANT",
    ciudad: "",
    direccion: "",
    postcode: "",
    notas: "",
  });

  // begin_checkout una sola vez, cuando el carrito ya está hidratado con items.
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current || items.length === 0) return;
    fired.current = true;
    trackBeginCheckout(
      items.map((it) => ({ id: it.id, name: it.name, price: it.price, qty: it.qty })),
      subtotal
    );
  }, [items, subtotal]);

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const canPay =
    items.length > 0 &&
    form.nombre &&
    form.apellidos &&
    form.email &&
    form.telefono &&
    form.departamento &&
    form.ciudad &&
    form.direccion;

  const handlePay = async () => {
    if (!canPay || loading) return;
    setError(null);
    setLoading(true);
    try {
      const billing: Address = {
        first_name: form.nombre,
        last_name: form.apellidos,
        company: "",
        address_1: form.direccion,
        address_2: "",
        city: form.ciudad,
        state: form.departamento,
        postcode: form.postcode || "",
        country: "CO",
        email: form.email,
        phone: form.telefono,
      };
      const shipping: Address = { ...billing };

      // 1) Sincroniza el carrito local con WooCommerce.
      const sync = await syncCart(items.map((i) => ({ id: i.id, qty: i.qty })));
      if (sync && !sync.ok)
        throw new Error(sync.error || "No pudimos preparar tu carrito.");

      // 2) Fija los datos del cliente → devuelve las opciones de envío.
      const cust = await updateCustomer(billing, shipping);
      if (!cust.ok || !cust.data)
        throw new Error(cust.error || "Revisa tus datos de envío.");

      // 3) Selecciona la primera opción de envío disponible.
      const pkg = cust.data.shipping_rates?.[0];
      if (pkg && pkg.shipping_rates.length) {
        await selectShipping(pkg.package_id, pkg.shipping_rates[0].rate_id);
      }

      // 4) Crea el pedido y paga con Bold.
      const order = await placeOrder(billing, shipping, "bold_co", form.notas);
      if (!order.ok || !order.data)
        throw new Error(order.error || "No pudimos crear tu pedido. Intenta de nuevo.");

      // El pedido ya existe en WooCommerce; vaciamos el carrito local.
      clear();
      const redirect = order.data.payment_result?.redirect_url;
      if (redirect) {
        window.location.href = redirect; // → página de pago de Bold
        return;
      }
      window.location.href = `/gracias?pedido=${order.data.order_id}`;
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Ocurrió un error. Intenta de nuevo."
      );
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-site px-4 py-24 text-center md:px-6">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-ink/40">
          <Ico name="tag" className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-light text-ink">Tu carrito está vacío</h1>
        <p className="mt-2 text-ink/50">Agrega un mueble para finalizar tu compra.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gold";
  const stepHead = "mb-5 flex items-center gap-3 text-lg font-light text-ink";
  const stepNum =
    "flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-medium text-white";

  return (
    <div className="bg-cream/40">
      <div className="mx-auto max-w-site px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8">
          <Link href="/carrito" className="text-sm text-ink/50 hover:text-ink">
            ← Volver al carrito
          </Link>
          <h1 className="mt-2 text-3xl font-light text-ink md:text-4xl">
            Finalizar compra
          </h1>
          <div className="mt-4 flex items-center gap-2 text-xs text-ink/50">
            <span className="rounded-full bg-white px-3 py-1">1 · Datos</span>
            <span className="text-ink/30">—</span>
            <span className="rounded-full bg-white px-3 py-1">2 · Envío</span>
            <span className="text-ink/30">—</span>
            <span className="rounded-full bg-white px-3 py-1">3 · Pago seguro</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 md:p-8">
              <h2 className={stepHead}>
                <span className={stepNum}>1</span> Datos de contacto
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={field} placeholder="Nombre *" value={form.nombre} onChange={set("nombre")} />
                <input className={field} placeholder="Apellidos *" value={form.apellidos} onChange={set("apellidos")} />
                <input className={field} type="email" placeholder="Correo electrónico *" value={form.email} onChange={set("email")} />
                <input className={field} placeholder="Teléfono / WhatsApp *" value={form.telefono} onChange={set("telefono")} />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 md:p-8">
              <h2 className={stepHead}>
                <span className={stepNum}>2</span> Envío
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <select className={field} value={form.departamento} onChange={set("departamento")}>
                  {CO_DEPARTMENTS.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <input className={field} placeholder="Ciudad *" value={form.ciudad} onChange={set("ciudad")} />
                <input className={`${field} sm:col-span-2`} placeholder="Dirección *" value={form.direccion} onChange={set("direccion")} />
                <input className={field} placeholder="Código postal (opcional)" value={form.postcode} onChange={set("postcode")} />
                <textarea className={`${field} sm:col-span-2`} rows={3} placeholder="Notas del pedido (opcional)" value={form.notas} onChange={set("notas")} />
              </div>
              <p className="mt-3 text-sm text-gold-dark">
                Envío incluido en Medellín y área metropolitana. A otras ciudades se coordina el despacho.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-light text-ink">
                Tu pedido <span className="text-ink/40">({count})</span>
              </h2>
              <div className="mt-4 max-h-72 divide-y divide-ink/10 overflow-y-auto">
                {items.map((it) => (
                  <div key={it.id} className="flex gap-3 py-3">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.image} alt={it.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ink px-1 text-xs font-bold text-white">
                        {it.qty}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-2">
                      <span className="text-sm text-ink">{it.name}</span>
                      <span className="whitespace-nowrap text-sm font-medium text-ink">
                        {formatCOP(it.price * it.qty)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
                <div className="flex justify-between text-ink/70">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span>Envío</span>
                  <span>Incluido</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4">
                <span className="font-medium text-ink">Total</span>
                <span className="text-2xl font-semibold text-ink">{formatCOP(subtotal)}</span>
              </div>
              <p className="mt-1 text-right text-xs text-ink/40">IVA incluido</p>

              {error && (
                <p className="mt-4 rounded-xl bg-sale/10 px-4 py-3 text-sm text-sale">
                  {error}
                </p>
              )}

              <button
                onClick={handlePay}
                disabled={!canPay || loading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-medium uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-ink/40"
              >
                <Ico name="lock" className="h-4 w-4" />
                {loading ? "Procesando…" : "Pagar con Bold"}
              </button>
              {!canPay && (
                <p className="mt-2 text-center text-xs text-ink/40">
                  Completa tus datos y dirección para continuar.
                </p>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5 text-xs text-ink/60">
                <span className="flex items-center gap-2"><Ico name="lock" className="h-4 w-4 text-gold-dark" /> Pago 100% seguro</span>
                <span className="flex items-center gap-2"><Ico name="shieldCheck" className="h-4 w-4 text-gold-dark" /> Garantía LaFab</span>
                <span className="flex items-center gap-2"><Ico name="factory" className="h-4 w-4 text-gold-dark" /> Fabricación propia</span>
                <span className="flex items-center gap-2"><Ico name="truck" className="h-4 w-4 text-gold-dark" /> Envío a domicilio</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
