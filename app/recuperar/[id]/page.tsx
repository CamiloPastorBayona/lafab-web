"use client";

// Destino del botón "Retomar mi compra" del correo de carrito abandonado:
// repone los ítems guardados en el carrito local y lleva al checkout.

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart, type CartItem } from "@/lib/cart";

export default function RecuperarCarritoPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { add, clear } = useCart();
  const [error, setError] = useState<string | null>(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    (async () => {
      try {
        const r = await fetch(`/api/cart/recover?id=${encodeURIComponent(params.id)}`);
        const data = (await r.json()) as { ok: boolean; items?: CartItem[] };
        if (!r.ok || !data.ok || !data.items?.length) {
          setError("Este enlace ya no está disponible.");
          return;
        }
        clear();
        for (const it of data.items) {
          const { qty, ...rest } = it;
          add(rest, qty);
        }
        router.replace("/checkout");
      } catch {
        setError("No pudimos recuperar tu carrito.");
      }
    })();
    // Solo debe correr una vez: `done` protege del doble efecto en dev.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-site flex-col items-center justify-center px-4 text-center">
      {error ? (
        <>
          <h1 className="text-2xl font-semibold text-ink">{error}</h1>
          <p className="mt-3 text-ink/60">
            Puedes volver a armar tu selección en la tienda.
          </p>
          <Link
            href="/shop"
            className="mt-6 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Ir a la tienda
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-ink">Recuperando tu carrito…</h1>
          <p className="mt-3 text-ink/60">Un momento, te llevamos al checkout.</p>
        </>
      )}
    </main>
  );
}
