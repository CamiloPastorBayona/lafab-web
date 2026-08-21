"use client";

// Loader de LaFab (marca de muebles): sobre un fondo oscuro se ENCIENDE una luz
// cálida, se DIBUJA un sofá en línea dorada y aparece el logo; luego se revela el
// sitio. Corre en cada cambio de página.
// Sonido: el audiologo suena una vez por carga, al primer gesto del usuario
// (clic/tap/tecla/scroll) porque los navegadores prohíben el audio sin interacción.

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO = "https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png";
const DURATION = 2100;

// ---- Audiologo: se arma una sola vez por carga y suena al primer gesto ----
let audioArmed = false;
function armAudiologo() {
  if (typeof window === "undefined" || audioArmed) return;
  audioArmed = true;

  const audio = new Audio("/audiologo.mp3");
  audio.volume = 1;
  audio.preload = "auto";

  let played = false;
  const events = ["pointerdown", "touchstart", "keydown", "click", "wheel"];
  const teardown = () =>
    events.forEach((e) => window.removeEventListener(e, onGesture, true));
  const play = () => {
    if (played) return;
    audio
      .play()
      .then(() => {
        played = true;
        (window as unknown as Record<string, string>).__lafabAudiologo = "played";
        teardown();
      })
      .catch(() => {
        (window as unknown as Record<string, string>).__lafabAudiologo = "blocked";
      });
  };
  function onGesture() {
    play();
  }
  events.forEach((e) =>
    window.addEventListener(e, onGesture, { capture: true, passive: true })
  );
  play(); // intento inmediato (por si el navegador ya lo permite)
}

export default function IntroLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [cycle, setCycle] = useState(0);
  const once = useRef(false);

  useEffect(() => {
    setVisible(true);
    setCycle((c) => c + 1);
    if (!once.current) {
      once.current = true;
      armAudiologo();
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
      {/* Luz cálida que se enciende */}
      <span className="lf-loader-glow" />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Logo iluminado */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="LaFab" className="lf-loader-logo h-8 w-auto md:h-10" />

        {/* Sofá que se dibuja en línea dorada */}
        <svg
          className="lf-sofa mt-7 w-[220px] md:w-[260px]"
          viewBox="0 0 240 120"
          fill="none"
          stroke="#CABBA0"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* respaldo + brazos */}
          <path className="lf-sofa-line" style={{ animationDelay: "0.35s" }} d="M26 86 L26 54 Q26 40 42 40 L198 40 Q214 40 214 54 L214 86" />
          {/* línea del asiento */}
          <path className="lf-sofa-line" style={{ animationDelay: "0.6s" }} d="M40 66 Q120 60 200 66" />
          {/* base */}
          <path className="lf-sofa-line" style={{ animationDelay: "0.55s" }} d="M20 86 L220 86" />
          {/* división de cojines */}
          <path className="lf-sofa-line" style={{ animationDelay: "0.8s" }} d="M120 66 L120 44" />
          {/* patas */}
          <path className="lf-sofa-line" style={{ animationDelay: "0.9s" }} d="M44 86 L40 100" />
          <path className="lf-sofa-line" style={{ animationDelay: "0.9s" }} d="M196 86 L200 100" />
        </svg>

        <span className="lf-loader-line mt-6 h-px w-24 bg-gold" />
        <span className="lf-loader-tag mt-4 text-[11px] uppercase tracking-[0.35em] text-white/55">
          Muebles a la medida
        </span>
      </div>
    </div>
  );
}
