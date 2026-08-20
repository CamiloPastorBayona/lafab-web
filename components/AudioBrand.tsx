"use client";

// Audiologo de LaFab — reproducción SOLO opt-in (el usuario decide darle play).
// Nunca autoplay al cargar el sitio (respeta UX, accesibilidad y a los navegadores).
// En páginas puntuales (ej. /gracias) intenta reproducir tras la interacción previa;
// si el navegador lo bloquea, queda el botón para reproducir manualmente.

import { useEffect, useRef, useState } from "react";

export default function AudioBrand({
  autoplay = false,
  label = "Escucha nuestra identidad sonora",
  className = "",
}: {
  autoplay?: boolean;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio("/audiologo.mp3");
    a.preload = "auto";
    a.volume = 0.7;
    a.addEventListener("ended", () => setPlaying(false));
    ref.current = a;
    if (autoplay) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false)); // bloqueado: el usuario le dará play
    }
    return () => {
      a.pause();
      ref.current = null;
    };
  }, [autoplay]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.currentTime = 0;
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pausar identidad sonora" : label}
      className={`group inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold-dark transition-colors hover:bg-gold/20 ${className}`}
    >
      {playing ? (
        // Barras animadas (ecualizador) mientras suena
        <span className="flex h-4 items-end gap-0.5" aria-hidden>
          <span className="w-0.5 origin-bottom animate-[lf-eq_0.9s_ease-in-out_infinite] bg-gold-dark" style={{ height: "70%" }} />
          <span className="w-0.5 origin-bottom animate-[lf-eq_0.9s_ease-in-out_infinite] bg-gold-dark [animation-delay:0.15s]" style={{ height: "100%" }} />
          <span className="w-0.5 origin-bottom animate-[lf-eq_0.9s_ease-in-out_infinite] bg-gold-dark [animation-delay:0.3s]" style={{ height: "85%" }} />
          <span className="w-0.5 origin-bottom animate-[lf-eq_0.9s_ease-in-out_infinite] bg-gold-dark [animation-delay:0.45s]" style={{ height: "100%" }} />
        </span>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
      <span>{playing ? "Sonando… (pausar)" : label}</span>
    </button>
  );
}
