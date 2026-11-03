"use client";

// Aviso de campaña en la ficha de producto, debajo del precio.
//
// Se decide en el cliente a propósito: la ficha se cachea con ISR, así que si
// la vigencia se evaluara al renderizar, el aviso seguiría anunciando una
// promoción ya terminada hasta la siguiente revalidación.

import { useEffect, useState } from "react";
import Link from "next/link";
import { PROMO, PROMO_FIN_TEXTO, enPromo, promoVigente } from "@/lib/promo";

export default function AvisoPromo({
  slug,
  pct,
}: {
  slug: string;
  pct: number | null;
}) {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    setMostrar(promoVigente() && enPromo(slug));
  }, [slug]);

  if (!mostrar) return null;

  return (
    // Sin caja ni borde: justo debajo va el banner de la landing, que sí es una
    // caja con borde dorado, y dos iguales apiladas se leen como un error.
    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-light">
        {PROMO.etiqueta}
      </span>
      <span className="text-ink/60">
        {pct ? `${pct}% de descuento` : "Precio de campaña"} hasta el{" "}
        {PROMO_FIN_TEXTO}
      </span>
      <Link
        href={PROMO.href}
        className="text-ink/45 underline underline-offset-4 hover:text-ink"
      >
        Ver toda la selección
      </Link>
    </p>
  );
}
