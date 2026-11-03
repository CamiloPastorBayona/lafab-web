"use client";

// Banner de campaña como portada principal del sitio.
//
// Mientras el Black Friday esté vigente sustituye al carrusel de siempre: lo
// decide app/page.tsx en el servidor, para que no haya parpadeo entre un hero
// y otro. Aquí solo va el contenido que se pinta encima de la foto.

import Link from "next/link";
import BannerPromo from "@/components/BannerPromo";
import CuentaRegresiva from "@/components/CuentaRegresiva";
import { PROMO, PROMO_FIN_TEXTO } from "@/lib/promo";

export default function BloquePromo() {
  return (
    <BannerPromo alto="principal">
      <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light">
        Nos adelantamos
      </p>
      <h1 className="mt-4 font-morality text-5xl font-light leading-[1.05] md:text-7xl">
        Black Friday
      </h1>
      <p className="mt-5 max-w-lg text-lg font-light text-white/75">
        Para que lo estrenes este año. Sofás y alcobas a la medida con precio de
        campaña hasta el {PROMO_FIN_TEXTO}.
      </p>

      <CuentaRegresiva className="mt-8" />

      <div className="relative z-20 mt-8 flex w-fit flex-wrap gap-3">
        <Link
          href={PROMO.href}
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.02]"
        >
          {PROMO.cta}
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/60"
        >
          Ver toda la tienda
        </Link>
      </div>
    </BannerPromo>
  );
}
