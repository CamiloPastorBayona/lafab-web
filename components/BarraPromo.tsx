"use client";

// Franja delgada sobre el header con la campaña vigente.
//
// Decisiones de diseño, porque en una marca de muebles a la medida el lenguaje
// de rebaja de electrodoméstico abarata lo que se vende:
//  - La paleta es la de siempre (ink y gold). Ni rojo ni amarillo de descuento.
//  - La urgencia la pone el calendario, no el signo de porcentaje: una cuenta
//    regresiva discreta en lugar de un número gigante.
//  - No es sticky. Se ve al entrar y se va con el scroll; el header, que sí es
//    sticky, se queda arriba como siempre.
//  - Se puede cerrar y no vuelve a aparecer en esa campaña.

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isLandingPath } from "@/lib/landings";
import { PROMO, promoVigente, restante } from "@/lib/promo";

// La clave lleva la fecha de fin: cuando empiece la campaña siguiente, a quien
// cerró esta le vuelve a aparecer.
const CLAVE = `lafab_promo_${PROMO.fin}`;

function Cuenta() {
  // En el servidor no hay reloj del visitante, así que el primer render va sin
  // cifras: pintarlas en el HTML provocaría un desajuste de hidratación.
  const [t, setT] = useState<ReturnType<typeof restante> | null>(null);

  useEffect(() => {
    const tic = () => setT(restante());
    tic();
    const id = setInterval(tic, 1000);
    return () => clearInterval(id);
  }, []);

  if (!t || t.terminado) return null;

  const dd = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="inline-flex items-center gap-1.5 text-white/55">
      <span className="hidden sm:inline" aria-hidden>
        ·
      </span>
      <span className="tabular-nums">
        Termina en {t.dias > 0 && `${t.dias} d `}
        {dd(t.horas)}:{dd(t.minutos)}:{dd(t.segundos)}
      </span>
    </span>
  );
}

export default function BarraPromo() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!promoVigente()) return;
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

  // En las landings de producto el header tampoco se monta: una franja suelta
  // sobre una portada a pantalla completa se vería como un error.
  if (!visible || isLandingPath(pathname)) return null;

  return (
    <aside
      aria-label={PROMO.etiqueta}
      className="relative z-[55] border-b border-gold/25 bg-[#0D0D0D]"
    >
      <div className="mx-auto flex max-w-site items-center justify-center px-10 py-2.5 md:px-6">
        {/* Solo información. El botón salió: la campaña ya es la portada
            entera, así que mandar a "ver la selección" desde aquí era
            repetir el mismo destino dos veces en la misma pantalla. */}
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-center text-[11px] tracking-[0.14em] md:text-xs">
          <span className="font-medium uppercase text-gold-light">
            {PROMO.etiqueta}
          </span>
          <span className="hidden text-white/85 sm:inline">{PROMO.gancho}</span>
          <Cuenta />
        </p>

        <button
          onClick={cerrar}
          aria-label="Cerrar el aviso de la promoción"
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
