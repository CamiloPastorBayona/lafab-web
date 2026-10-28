"use client";

// ¿La sección ya está (o estuvo) a la vista? Los carruseles de las landings
// arrancaban al cargar la página, así que cuando el visitante bajaba hasta
// "Bondades del producto" ya iba por la tercera lámina. Con esto empiezan
// cuando la sección se acerca a la pantalla, que es cuando alguien las mira.

import { useEffect, useState, type RefObject } from "react";

export function useEnPantalla(
  ref: RefObject<HTMLElement | null>,
  margen = "200px"
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Sin IntersectionObserver (navegadores viejos) se da por visible y
    // funciona como antes, en vez de quedarse quieto para siempre.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin: margen }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, margen]);

  return visible;
}
