"use client";

// Recordatorio de campaña al inicio de una página de categoría.
//
// Va donde la persona ya está decidiendo: /sofas y /alcobas son, después de la
// portada, las dos páginas con más tráfico del sitio. Es una línea, no un
// bloque: aquí el protagonista son los productos, no la campaña.
//
// Se monta sola si la categoría tiene productos en campaña, así que no hay que
// acordarse de ponerla ni de quitarla categoría por categoría.

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROMO, PROMO_FIN_TEXTO, promoVigente } from "@/lib/promo";

export default function FranjaPromo({ cuantos }: { cuantos: number }) {
  const [vigente, setVigente] = useState(false);
  useEffect(() => setVigente(promoVigente()), []);
  if (!vigente || cuantos === 0) return null;

  return (
    <Link
      href={PROMO.href}
      className="group mb-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl bg-ink px-5 py-3.5 text-sm text-white/75 transition-colors hover:bg-[#0D0D0D]"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">
        {PROMO.etiqueta}
      </span>
      <span>
        {cuantos === 1
          ? "Una referencia de esta categoría está en campaña"
          : `${cuantos} referencias de esta categoría están en campaña`}{" "}
        hasta el {PROMO_FIN_TEXTO}
      </span>
      <span className="ml-auto inline-flex items-center gap-1.5 font-medium text-white underline-offset-4 group-hover:underline">
        Ver la selección
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
