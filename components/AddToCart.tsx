"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";

export default function AddToCart({
  product,
  purchasable,
  inStock,
}: {
  product: { id: number; name: string; slug: string; image: string; price: number };
  purchasable: boolean;
  inStock: boolean;
}) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const router = useRouter();

  const disabled = !purchasable || !inStock;

  const handleAdd = () => {
    if (disabled) return;
    add(product, qty);
  };

  const handleBuyNow = () => {
    if (disabled) return;
    add(product, qty);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center rounded-full border border-ink/15">
          <button
            type="button"
            aria-label="Restar"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-12 w-12 text-xl text-ink/70 hover:text-ink"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{qty}</span>
          <button
            type="button"
            aria-label="Sumar"
            onClick={() => setQty((q) => q + 1)}
            className="h-12 w-12 text-xl text-ink/70 hover:text-ink"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled}
          className="flex-1 rounded-full border-2 border-ink px-8 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {disabled ? "No disponible" : "Añadir al carrito"}
        </button>
      </div>

      <button
        type="button"
        onClick={handleBuyNow}
        disabled={disabled}
        className="rounded-full bg-ink px-8 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-ink/40"
      >
        Comprar ahora
      </button>
    </div>
  );
}
