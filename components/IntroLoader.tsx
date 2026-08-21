"use client";

// Loader de LaFab: reveal de "encendido de luz" + logo en cada cambio de página.
// El audiologo suena una vez por sesión. Como los navegadores prohíben el sonido
// sin interacción, se intenta al cargar y, si se bloquea, suena en el primer
// gesto del usuario (clic, tap, tecla o scroll) — sin botón de "entrar".

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO = "https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png";
const DURATION = 1800;

// Suena el audiologo una sola vez por sesión, en la primera oportunidad válida.
function armAudiologo() {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem("lafab_audiologo")) return;

  const audio = new Audio("/audiologo.mp3");
  audio.volume = 0.9;
  audio.preload = "auto";

  let done = false;
  const events = ["pointerdown", "click", "keydown", "touchstart", "wheel"];
  const cleanup = () =>
    events.forEach((e) => window.removeEventListener(e, onGesture, true));
  const mark = () => {
    done = true;
    sessionStorage.setItem("lafab_audiologo", "1");
    cleanup();
  };
  const tryPlay = () => {
    if (done) return;
    audio.play().then(mark).catch(() => {});
  };
  function onGesture() {
    tryPlay();
  }

  // Intento inmediato (funciona en visitas donde el navegador ya lo permite)…
  tryPlay();
  // …y si no, en cuanto el usuario haga cualquier gesto.
  events.forEach((e) =>
    window.addEventListener(e, onGesture, { capture: true, passive: true })
  );
}

export default function IntroLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [cycle, setCycle] = useState(0);
  const armed = useRef(false);

  useEffect(() => {
    setVisible(true);
    setCycle((c) => c + 1);
    if (!armed.current) {
      armed.current = true;
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
