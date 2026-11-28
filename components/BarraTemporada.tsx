"use client";

// Franja delgada sobre el header con el plazo de entrega de la temporada.
//
// Misma decisión que la franja de campaña: no es sticky, se puede cerrar y
// usa la paleta de la marca. Lo que cambia es el tono: esto no vende, avisa,
// así que no lleva cuenta regresiva ni botón.
//
// Si alguna vez hay campaña y temporada a la vez, manda la campaña: dos
// franjas apiladas sobre el header se leen como un error de maquetación.

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isLandingPath } from "@/lib/landings";
import { promoVigente } from "@/lib/promo";
import { TEMPORADA, temporadaVigente } from "@/lib/temporada";

const CLAVE = `lafab_temporada_${TEMPORADA.hasta}`;

export default function BarraTemporada() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!temporadaVigente() || promoVigente()) return;
    try {
      if (localStorage.getItem(CLAVE) === "cerrada") return;
    } catch {
      // Navegación privada o cookies bloqueadas: se muestra igual.
    }
    setVisible(true);
  }, []);

  const cerrar = () => {
    setVisible(false);
    try {
      localStorage.setItem(CLAVE, "cerrada");
    } catch {
      /* da igual, es una comodidad */
    }
  };

  if (!visible || isLandingPath(pathname)) return null;

  return (
    <aside
      aria-label="Plazo de entrega"
      className="relative z-[55] border-b border-gold/25 bg-[#0D0D0D]"
    >
      <div className="mx-auto flex max-w-site items-center justify-center px-10 py-2.5 md:px-6">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-center text-[11px] tracking-[0.14em] md:text-xs">
          <span className="font-medium uppercase text-gold-light">
            {TEMPORADA.etiqueta}
          </span>
          <span className="text-white/85">{TEMPORADA.franja}</span>
        </p>

        <button
          onClick={cerrar}
          aria-label="Cerrar el aviso de entregas"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/40 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-gold md:right-5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
