"use client";

// Loader de LaFab (marca de muebles): sobre un fondo oscuro se ENCIENDE una luz
// cálida, se DIBUJA un sofá en línea dorada y aparece el logo; luego se revela el
// sitio. Corre en cada cambio de página.

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO = "https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png";
const AUDIO_SRC = "/audiologo.mp3";
// El archivo 7 dura ~6.03s; la animación usa la misma duración para mantener sync.
const INTRO_DURATION_MS = 6040;

// ---- Audiologo ----------------------------------------------------------
// Objetivo: que audio y animación empiecen juntos. En carga fría, el navegador
// puede bloquear audio con volumen; en ese caso esperamos un gesto y reiniciamos
// la secuencia desde cero en lugar de dejar que el loader corra desfasado.
let audioEl: HTMLAudioElement | null = null;
type LoaderPhase = "starting" | "needs-gesture" | "playing";

function getAudio() {
  if (!audioEl) {
    audioEl = new Audio(AUDIO_SRC);
    audioEl.volume = 1;
    audioEl.preload = "auto";
  }
  return audioEl;
}

function resetAudio(audio: HTMLAudioElement) {
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {
    // Safari puede impedir currentTime antes de tener metadata; play() sigue funcionando.
  }
}

function playAudiologoFromStart() {
  const audio = getAudio();
  resetAudio(audio);
  return audio.play();
}

function stopAudiologo() {
  if (!audioEl) return;
  resetAudio(audioEl);
}

export default function IntroLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<LoaderPhase>("starting");
  const [cycle, setCycle] = useState(0);

  const runIdRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupEndedRef = useRef<(() => void) | null>(null);

  const clearScheduledHide = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    cleanupEndedRef.current?.();
    cleanupEndedRef.current = null;
  }, []);

  const finishRun = useCallback(
    (runId: number) => {
      if (runIdRef.current !== runId) return;
      clearScheduledHide();
      setVisible(false);
    },
    [clearScheduledHide]
  );

  const scheduleHide = useCallback(
    (runId: number) => {
      const audio = getAudio();
      const onEnded = () => finishRun(runId);
      audio.addEventListener("ended", onEnded, { once: true });
      cleanupEndedRef.current = () => audio.removeEventListener("ended", onEnded);

      // Fallback por si el navegador no dispara ended después de una navegación rápida.
      hideTimerRef.current = setTimeout(() => finishRun(runId), INTRO_DURATION_MS + 500);
    },
    [finishRun]
  );

  const startSyncedIntro = useCallback(
    async (runId: number) => {
      clearScheduledHide();
      setPhase("starting");

      try {
        await playAudiologoFromStart();
        if (runIdRef.current !== runId) return;

        setCycle((current) => current + 1);
        setPhase("playing");
        (window as unknown as Record<string, string>).__lafabAudiologo = "played";
        scheduleHide(runId);
      } catch {
        if (runIdRef.current !== runId) return;

        setPhase("needs-gesture");
        (window as unknown as Record<string, string>).__lafabAudiologo = "blocked";
      }
    },
    [clearScheduledHide, scheduleHide]
  );

  useEffect(() => {
    const audio = getAudio();
    audio.load();

    return () => {
      clearScheduledHide();
      stopAudiologo();
    };
  }, [clearScheduledHide]);

  useEffect(() => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;

    setVisible(true);
    void startSyncedIntro(runId);

    return () => {
      clearScheduledHide();
    };
  }, [pathname, clearScheduledHide, startSyncedIntro]);

  const handleStart = () => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    setVisible(true);
    void startSyncedIntro(runId);
  };

  if (!visible) return null;

  const isPlaying = phase === "playing";
  const loaderStyle = {
    "--lf-loader-duration": `${INTRO_DURATION_MS}ms`,
  } as CSSProperties;

  return (
    <div
      key={cycle}
      className={`lf-loader fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink ${
        isPlaying ? "lf-loader--playing pointer-events-none" : "lf-loader--ready"
      }`}
      style={loaderStyle}
      aria-hidden={phase === "needs-gesture" ? undefined : true}
      aria-label={phase === "needs-gesture" ? "Iniciar LaFab" : undefined}
      role={phase === "needs-gesture" ? "dialog" : undefined}
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

        {phase === "needs-gesture" ? (
          <button
            type="button"
            className="lf-loader-start mt-7 inline-flex items-center gap-3 rounded-full border border-gold-light/50 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-ink"
            onClick={handleStart}
          >
            <span className="flex h-4 items-end gap-0.5" aria-hidden>
              <span className="h-2 w-0.5 bg-gold-light" />
              <span className="h-4 w-0.5 bg-gold-light" />
              <span className="h-3 w-0.5 bg-gold-light" />
            </span>
            <span>Entrar</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
