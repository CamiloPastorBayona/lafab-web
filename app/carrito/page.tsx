"use client";

import Link from "next/link";
import { useCart, formatCOP } from "@/lib/cart";

export default function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();

  return (
    <div className="mx-auto max-w-site px-4 py-14 md:px-6">
      <h1 className="mb-8 text-3xl font-semibold text-ink md:text-4xl">
        Tu carrito
      </h1>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-cream p-12 text-center">
          <p className="text-ink/60">Tu carrito está vacío.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white"
          >
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-ink/10">
              {items.map((it) => (
                <div key={it.id} className="flex gap-4 py-5">
                  <Link
                    href={`/producto/${it.slug}`}
                    className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-cream"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.image}
                      alt={it.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <Link
                        href={`/producto/${it.slug}`}
                        className="font-medium text-ink hover:text-gold-dark"
                      >
                        {it.name}
                      </Link>
                      <span className="font-semibold text-ink">
                        {formatCOP(it.price * it.qty)}
                      </span>
                    </div>
                    <span className="mt-0.5 text-sm text-ink/50">
                      {formatCOP(it.price)} c/u
                    </span>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-ink/15">
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          className="h-9 w-9 text-lg text-ink/60 hover:text-ink"
                          aria-label="Restar"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          className="h-9 w-9 text-lg text-ink/60 hover:text-ink"
                          aria-label="Sumar"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(it.id)}
                        className="text-sm text-ink/40 hover:text-sale"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/shop"
              className="mt-6 inline-block text-sm font-semibold text-gold-dark hover:underline"
            >
              ← Seguir comprando
            </Link>
          </div>

          {/* Resumen */}
          <aside className="h-fit rounded-2xl bg-cream p-6">
            <h2 className="text-lg font-semibold text-ink">Resumen</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-ink/70">
                <span>Subtotal</span>
                <span className="font-medium text-ink">
                  {formatCOP(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-ink/70">
                <span>Envío</span>
                <span>Se calcula al finalizar</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-ink/10 pt-4">
              <span className="font-semibold text-ink">Total</span>
              <span className="text-xl font-semibold text-ink">
                {formatCOP(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink/40">IVA incluido</p>
            <Link
              href="/checkout"
              className="mt-5 block rounded-full bg-ink px-6 py-3.5 text-center font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Finalizar compra
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
