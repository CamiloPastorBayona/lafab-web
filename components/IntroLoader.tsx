"use client";

// Loader de intro de LaFab: se muestra una sola vez por sesión al entrar al sitio,
// con el logo y el audiologo. NO es música de fondo: es un momento de marca corto.
// El audio se intenta reproducir; si el navegador lo bloquea (política de autoplay
// en la primera carga en frío), suena en cuanto el usuario hace su primer gesto.

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Solo una vez por sesión (no en cada navegación).
    if (sessionStorage.getItem("lafab_intro_seen")) return;
    sessionStorage.setItem("lafab_intro_seen", "1");
    setShow(true);

    const audio = new Audio("/audiologo.mp3");
    audio.volume = 0.7;
    const tryPlay = () => audio.play().catch(() => false);
    tryPlay().then((ok) => {
      if (ok === false) {
        // Autoplay bloqueado: reproducir en el primer gesto del usuario.
        const unlock = () => {
          audio.play().catch(() => {});
          ["click", "keydown", "touchstart"].forEach((e) =>
            window.removeEventListener(e, unlock)
          );
        };
        ["click", "keydown", "touchstart"].forEach((e) =>
          window.addEventListener(e, unlock, { once: true })
        );
      }
    });

    const t1 = setTimeout(() => setFading(true), 2400);
    const t2 = setTimeout(() => setShow(false), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="lf-fade flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png"
          alt="LaFab"
          className="h-9 w-auto md:h-11"
        />
        <div className="mt-7 h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-gold" />
      </div>
    </div>
  );
}
