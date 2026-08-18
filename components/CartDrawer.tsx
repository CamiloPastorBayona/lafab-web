"use client";

import Link from "next/link";
import { useCart, formatCOP } from "@/lib/cart";

export default function CartDrawer() {
  const { items, subtotal, count, isOpen, closeCart, setQty, remove } =
    useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-ink">
            Tu carrito {count > 0 && <span className="text-ink/40">({count})</span>}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 hover:bg-cream"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-ink/50">Tu carrito está vacío.</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
            >
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-ink/10 overflow-y-auto px-5">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3 py-4">
                  <Link
                    href={`/producto/${it.slug}`}
                    onClick={closeCart}
                    className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-cream"
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
                    <Link
                      href={`/producto/${it.slug}`}
                      onClick={closeCart}
                      className="text-sm font-medium text-ink hover:text-gold-dark"
                    >
                      {it.name}
                    </Link>
                    <span className="mt-0.5 text-sm text-ink/60">
                      {formatCOP(it.price)}
                    </span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink/15">
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          className="h-8 w-8 text-lg text-ink/60 hover:text-ink"
                          aria-label="Restar"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          className="h-8 w-8 text-lg text-ink/60 hover:text-ink"
                          aria-label="Sumar"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(it.id)}
                        className="text-xs text-ink/40 hover:text-sale"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-ink/10 px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-ink/60">Subtotal</span>
                <span className="text-lg font-semibold text-ink">
                  {formatCOP(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block rounded-full bg-ink px-6 py-3.5 text-center font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Finalizar compra
              </Link>
              <Link
                href="/carrito"
                onClick={closeCart}
                className="mt-2 block text-center text-sm font-medium text-ink/60 hover:text-ink"
              >
                Ver carrito
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
