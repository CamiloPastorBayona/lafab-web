"use client";

// Franja de campaña en la portada. Va justo bajo el hero.
//
// Se decide en el cliente, igual que la barra superior: la portada se cachea
// con ISR y una franja decidida al renderizar seguiría anunciando la campaña
// después de que termine.

import Link from "next/link";
import { useEffect, useState } from "react";
import BannerPromo from "@/components/BannerPromo";
import CuentaRegresiva from "@/components/CuentaRegresiva";
import { PROMO, PROMO_FIN_TEXTO, promoVigente } from "@/lib/promo";

export default function BloquePromo() {
  const [vigente, setVigente] = useState(false);
  useEffect(() => setVigente(promoVigente()), []);
  if (!vigente) return null;

  return (
    <BannerPromo>
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-light">
        Nos adelantamos
      </p>
      <h2 className="mt-3 font-morality text-4xl font-light leading-tight md:text-5xl">
        Black Friday
      </h2>
      <p className="mt-3 max-w-md text-white/70">
        Para que lo estrenes este año. Sofás y alcobas a la medida con precio de
        campaña hasta el {PROMO_FIN_TEXTO}.
      </p>

      <CuentaRegresiva className="mt-7" />

      <Link
        href={PROMO.href}
        className="relative z-20 mt-7 inline-block w-fit rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.02]"
      >
        {PROMO.cta}
      </Link>
    </BannerPromo>
  );
}
