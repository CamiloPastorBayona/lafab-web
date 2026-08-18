"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, formatCOP } from "@/lib/cart";
import { STORE_URL } from "@/lib/woocommerce";
import Ico from "@/components/LandingIcons";

const ENVIOS = [
  { key: "medellin", label: "Medellín y Área Metropolitana", note: "Envío incluido" },
  { key: "nacional", label: "Nacional · ciudad capital", note: "Envío incluido" },
  { key: "otra", label: "Otra ciudad / municipio", note: "Se cotiza según destino" },
];

export default function CheckoutPage() {
  const { items, subtotal, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [envio, setEnvio] = useState("medellin");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    direccion: "",
    notas: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const canPay = items.length > 0 && form.nombre && form.email && form.telefono;

  const handlePay = () => {
    if (!canPay) return;
    setLoading(true);
    // Carrito codificado como "id:cantidad,id:cantidad".
    const payload = items.map((it) => `${it.id}:${it.qty}`).join(",");
    const params = new URLSearchParams({ lafab_cart: payload });
    if (form.email) params.set("billing_email", form.email);
    if (form.telefono) params.set("billing_phone", form.telefono);
    // Navegación first-party a WooCommerce: un snippet arma el carrito y
    // redirige al checkout real, donde el cliente paga con Bold.
    window.location.href = `${STORE_URL}/?${params.toString()}`;
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
  const stepHead =
    "mb-5 flex items-center gap-3 text-lg font-light text-ink";
  const stepNum =
    "flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-medium text-white";

  return (
    <div className="bg-cream/40">
      <div className="mx-auto max-w-site px-4 py-12 md:px-6 md:py-16">
        {/* Encabezado */}
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
          {/* Formulario */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 md:p-8">
              <h2 className={stepHead}>
                <span className={stepNum}>1</span> Datos de contacto
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={`${field} sm:col-span-2`} placeholder="Nombre completo *" value={form.nombre} onChange={set("nombre")} />
                <input className={field} type="email" placeholder="Correo electrónico *" value={form.email} onChange={set("email")} />
                <input className={field} placeholder="Teléfono / WhatsApp *" value={form.telefono} onChange={set("telefono")} />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 md:p-8">
              <h2 className={stepHead}>
                <span className={stepNum}>2</span> Envío
              </h2>
              <div className="grid gap-3">
                {ENVIOS.map((e) => (
                  <button
                    key={e.key}
                    type="button"
                    onClick={() => setEnvio(e.key)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                      envio === e.key
                        ? "border-ink bg-cream"
                        : "border-ink/15 hover:border-ink/40"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          envio === e.key ? "border-ink" : "border-ink/30"
                        }`}
                      >
                        {envio === e.key && (
                          <span className="h-2.5 w-2.5 rounded-full bg-ink" />
                        )}
                      </span>
                      <span className="text-sm text-ink">{e.label}</span>
                    </span>
                    <span className="text-xs text-gold-dark">{e.note}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input className={field} placeholder="Ciudad" value={form.ciudad} onChange={set("ciudad")} />
                <input className={field} placeholder="Dirección" value={form.direccion} onChange={set("direccion")} />
                <textarea className={`${field} sm:col-span-2`} rows={3} placeholder="Notas del pedido (opcional)" value={form.notas} onChange={set("notas")} />
              </div>
            </div>
          </div>

          {/* Resumen sticky */}
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
                  <span>{envio === "otra" ? "Se cotiza" : "Incluido"}</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4">
                <span className="font-medium text-ink">Total</span>
                <span className="text-2xl font-semibold text-ink">
                  {formatCOP(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-right text-xs text-ink/40">IVA incluido</p>

              <button
                onClick={handlePay}
                disabled={!canPay || loading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-medium uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-ink/40"
              >
                <Ico name="lock" className="h-4 w-4" />
                {loading ? "Redirigiendo…" : "Pagar con Bold"}
              </button>
              {!canPay && (
                <p className="mt-2 text-center text-xs text-ink/40">
                  Completa nombre, correo y teléfono para continuar.
                </p>
              )}

              {/* Sellos */}
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
