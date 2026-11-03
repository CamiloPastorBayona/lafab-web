"use client";

// Franja de campaña para la portada. Lleva a /black-friday.
//
// Se decide en el cliente, igual que la barra superior: la portada se cachea
// con ISR y una franja decidida al renderizar seguiría anunciando la campaña
// después de que termine.

import Link from "next/link";
import { useEffect, useState } from "react";
import WpImage from "@/components/WpImage";
import CuentaRegresiva from "@/components/CuentaRegresiva";
import { PROMO, PROMO_FIN_TEXTO, promoVigente } from "@/lib/promo";
import { PIEZAS } from "@/lib/blackfriday";

export default function BloquePromo() {
  const [vigente, setVigente] = useState(false);
  useEffect(() => setVigente(promoVigente()), []);
  if (!vigente) return null;

  const fondo = PIEZAS[0];

  return (
    <section className="relative overflow-hidden bg-[#0D0D0D] text-white">
      <WpImage
        src={fondo.imagen}
        alt=""
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/85 to-[#0D0D0D]/45" />

      <div className="relative z-10 mx-auto flex max-w-site flex-col gap-8 px-4 py-14 md:flex-row md:items-center md:justify-between md:px-6 md:py-16">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-light">
            Nos adelantamos
          </p>
          <h2 className="mt-3 font-morality text-4xl font-light leading-tight md:text-5xl">
            Black Friday
          </h2>
          <p className="mt-3 max-w-md text-white/70">
            Para que lo estrenes este año. Sofás y alcobas a la medida con
            precio de campaña hasta el {PROMO_FIN_TEXTO}.
          </p>
          <Link
            href={PROMO.href}
            className="mt-7 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.02]"
          >
            {PROMO.cta}
          </Link>
        </div>

        <CuentaRegresiva />
      </div>
    </section>
  );
}
