"use client";

// Loader de LaFab (marca de muebles): sobre un fondo oscuro se ENCIENDE una luz
// cálida, se DIBUJA un sofá en línea dorada y aparece el logo; luego se revela el
// sitio. Corre en cada cambio de página.
// Sonido: el audiologo suena una vez por carga, al primer gesto del usuario
// (clic/tap/tecla/scroll) porque los navegadores prohíben el audio sin interacción.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO = "https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png";
// El audiologo dura ~6s: el loader dura lo mismo para que animación y sonido calcen.
const DURATION = 6000;

// ---- Audiologo ----------------------------------------------------------
// Objetivo: que suene APENAS aparece el loader. En una navegación interna el
// clic que disparó el cambio de página ya es un gesto válido, así que el audio
// arranca de inmediato con la animación. Solo en la PRIMERA carga en frío el
// navegador obliga a esperar, así que ahí suena al primer movimiento/clic/scroll.
let audioEl: HTMLAudioElement | null = null;
let gestureArmed = false;

function getAudio() {
  if (!audioEl) {
    audioEl = new Audio("/audiologo.mp3");
    audioEl.volume = 1;
    audioEl.preload = "auto";
    audioEl.load();
  }
  return audioEl;
}

function playFromStart() {
  const a = getAudio();
  try {
    a.currentTime = 0;
  } catch {
    /* aún no cargado; play() igual arranca desde 0 */
  }
  return a.play();
}

function armOnFirstGesture() {
  if (gestureArmed) return;
  gestureArmed = true;
  const events = ["pointerdown", "touchstart", "keydown", "click", "wheel", "scroll"];
  const onGesture = () => {
    playFromStart().catch(() => {});
    events.forEach((e) => window.removeEventListener(e, onGesture, true));
  };
  events.forEach((e) =>
    window.addEventListener(e, onGesture, { capture: true, passive: true })
  );
}

// Suena en cuanto aparece el loader. Si el navegador lo bloquea (carga en frío
// sin interacción previa), queda listo para sonar al primer gesto.
function triggerAudiologo() {
  if (typeof window === "undefined") return;
  // Suena en CADA aparición del loader, desde el inicio.
  playFromStart()
    .then(() => {
      (window as unknown as Record<string, string>).__lafabAudiologo = "played";
    })
    .catch(() => {
      (window as unknown as Record<string, string>).__lafabAudiologo = "blocked";
      armOnFirstGesture();
    });
}

export default function IntroLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    setVisible(true);
    setCycle((c) => c + 1);
    triggerAudiologo();
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setVisible(false), reduce ? 800 : DURATION);
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
          <path className="lf-sofa-line" style={{ animationDelay: "0.7s" }} d="M26 86 L26 54 Q26 40 42 40 L198 40 Q214 40 214 54 L214 86" />
          {/* base */}
          <path className="lf-sofa-line" style={{ animationDelay: "1.1s" }} d="M20 86 L220 86" />
          {/* línea del asiento */}
          <path className="lf-sofa-line" style={{ animationDelay: "1.5s" }} d="M40 66 Q120 60 200 66" />
          {/* división de cojines */}
          <path className="lf-sofa-line" style={{ animationDelay: "2.1s" }} d="M120 66 L120 44" />
          {/* patas */}
          <path className="lf-sofa-line" style={{ animationDelay: "2.5s" }} d="M44 86 L40 100" />
          <path className="lf-sofa-line" style={{ animationDelay: "2.5s" }} d="M196 86 L200 100" />
        </svg>

        <span className="lf-loader-line mt-6 h-px w-24 bg-gold" />
        <span className="lf-loader-tag mt-4 text-[11px] uppercase tracking-[0.35em] text-white/55">
          Muebles a la medida
        </span>
      </div>
    </div>
  );
}
