"use client";

// Loader de LaFab: aparece en cada cambio de página con un reveal elegante de
// "encendido de luz" + el logo (acorde a una marca de muebles: cálido y minimal).
// Corre solo (sin clic). El audiologo suena en la primera entrada de la sesión;
// si el navegador bloquea el autoplay en frío, suena en el primer gesto del usuario.

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO = "https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png";
const DURATION = 1500;

export default function IntroLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [cycle, setCycle] = useState(0);
  const soundTried = useRef(false);

  useEffect(() => {
    // Mostrar el loader en cada navegación y reiniciar la animación.
    setVisible(true);
    setCycle((c) => c + 1);

    // Audiologo: solo una vez por sesión.
    if (typeof window !== "undefined" && !soundTried.current) {
      soundTried.current = true;
      if (!sessionStorage.getItem("lafab_audiologo")) {
        const audio = new Audio("/audiologo.mp3");
        audio.volume = 0.7;
        const mark = () => sessionStorage.setItem("lafab_audiologo", "1");
        audio
          .play()
          .then(mark)
          .catch(() => {
            // Autoplay bloqueado: reproducir en el primer gesto del usuario.
            const unlock = () => {
              audio.play().then(mark).catch(() => {});
              ["pointerdown", "keydown", "touchstart", "wheel"].forEach((e) =>
                window.removeEventListener(e, unlock)
              );
            };
            ["pointerdown", "keydown", "touchstart", "wheel"].forEach((e) =>
              window.addEventListener(e, unlock, { once: true, passive: true })
            );
          });
      }
    }

    const t = setTimeout(() => setVisible(false), DURATION);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      key={cycle}
      className="lf-loader pointer-events-none fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink"
      aria-hidden
    >
      <span className="lf-loader-glow" />
      <div className="relative z-10 flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="LaFab" className="lf-loader-logo h-9 w-auto md:h-11" />
        <span className="lf-loader-line mt-4 h-px w-24 bg-gold" />
        <span className="lf-loader-tag mt-4 text-[11px] uppercase tracking-[0.35em] text-white/55">
          Muebles a la medida
        </span>
      </div>
    </div>
  );
}
