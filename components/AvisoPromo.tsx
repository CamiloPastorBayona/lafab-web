"use client";

// Aviso de campaña en la ficha de producto, debajo del precio.
//
// Se decide en el cliente a propósito: la ficha se cachea con ISR, así que si
// la vigencia se evaluara al renderizar, el aviso seguiría anunciando una
// promoción ya terminada hasta la siguiente revalidación.

import { useEffect, useState } from "react";
import { PROMO, PROMO_FIN_MS, enPromo, promoVigente } from "@/lib/promo";

const fin = new Date(PROMO_FIN_MS).toLocaleDateString("es-CO", {
  day: "numeric",
  month: "long",
  timeZone: "America/Bogota",
});

export default function AvisoPromo({ pct }: { pct: number | null }) {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    setMostrar(promoVigente() && enPromo(pct));
  }, [pct]);

  if (!mostrar) return null;

  return (
    // Sin caja ni borde: justo debajo va el banner de la landing, que sí es una
    // caja con borde dorado, y dos iguales apiladas se leen como un error.
    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-light">
        {PROMO.etiqueta}
      </span>
      <span className="text-ink/60">
        {pct}% de descuento hasta el {fin}
      </span>
    </p>
  );
}
