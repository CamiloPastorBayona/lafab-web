"use client";

import { useState } from "react";
import { addToCartUrl } from "@/lib/woocommerce";

export default function AddToCart({
  productId,
  purchasable,
  inStock,
}: {
  productId: number;
  purchasable: boolean;
  inStock: boolean;
}) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const disabled = !purchasable || !inStock;

  const handleBuy = () => {
    if (disabled) return;
    setLoading(true);
    // Hybrid checkout: hand off to the WooCommerce cart, where Bold Pagos
    // completes the payment.
    window.location.href = addToCartUrl(productId, qty);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center rounded-full border border-ink/15">
        <button
          type="button"
          aria-label="Restar"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-11 w-11 text-xl text-ink/70 hover:text-ink"
        >
          −
        </button>
        <span className="w-8 text-center font-medium">{qty}</span>
        <button
          type="button"
          aria-label="Sumar"
          onClick={() => setQty((q) => q + 1)}
          className="h-11 w-11 text-xl text-ink/70 hover:text-ink"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleBuy}
        disabled={disabled || loading}
        className="flex-1 rounded-full bg-ink px-8 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-ink/40"
      >
        {loading
          ? "Redirigiendo…"
          : disabled
          ? "No disponible"
          : "Añadir al carrito"}
      </button>
    </div>
  );
}
