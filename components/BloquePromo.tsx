"use client";

// Banner de campaña como portada principal del sitio.
//
// Es el mismo que estaba en /black-friday, que gustó más que la franja corta:
// más alto, con la cuenta regresiva, los dos botones y el precio de entrada.
// Mientras el Black Friday esté vigente sustituye al carrusel de siempre; lo
// decide app/page.tsx en el servidor, para que no haya parpadeo entre uno y
// otro.

import Link from "next/link";
import BannerPromo from "@/components/BannerPromo";
import CuentaRegresiva from "@/components/CuentaRegresiva";
import { waCampana } from "@/components/SeccionCampana";
import { PROMO_FIN_TEXTO } from "@/lib/promo";

export default function BloquePromo({
  precios,
  maxPct,
}: {
  /** Precio de entrada de cada mueble del carrusel, ya formateado, por slug. */
  precios?: Record<string, string>;
  maxPct?: number;
}) {
  return (
    <BannerPromo alto="principal" precios={precios}>
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold-light">
        Nos adelantamos
      </p>
      <h1 className="mt-3 font-morality text-5xl font-light leading-[1.05] md:text-6xl">
        Black Friday
      </h1>
      <p className="mt-4 max-w-xl text-base font-light text-white/75 md:text-lg">
        Para que lo estrenes este año.{" "}
        {maxPct ? `Hasta ${maxPct}% ` : ""}en una selección de sofás y alcobas,
        con la misma fabricación a la medida de siempre.
      </p>

      <CuentaRegresiva className="mt-6" />

      <div className="relative z-20 mt-7 flex w-fit flex-wrap gap-3">
        <Link
          href="#seleccion"
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.02]"
        >
          Ver la selección
        </Link>
        <a
          href={waCampana("el Black Friday")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/60"
        >
          Preguntar por WhatsApp
        </a>
      </div>

      <p className="sr-only">La campaña va hasta el {PROMO_FIN_TEXTO}.</p>
    </BannerPromo>
  );
}
