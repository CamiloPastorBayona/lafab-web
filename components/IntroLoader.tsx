"use client";

// Loader de LaFab (marca de muebles): sobre un fondo oscuro se ENCIENDE una luz
// cálida, se DIBUJA un sofá en línea dorada y aparece el logo; luego se revela el
// sitio. Corre en cada cambio de página.

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO = "https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png";
const AUDIO_SRC = "/audiologo.mp3";
const HOME_PATHS = new Set(["/", "/inicio"]);
const AUDIO_SESSION_KEY = "lafab:audiologo:intro-played";
// La animación visual queda 1.5s más corta; el audiologo conserva su duración real.
const INTRO_DURATION_MS = 4540;

// ---- Audiologo ----------------------------------------------------------
// Objetivo: intentar el audiologo automáticamente una sola vez en home. Si el
// navegador bloquea autoplay con sonido, el loader no se detiene ni pide click.
let audioEl: HTMLAudioElement | null = null;
let audioAttemptedInRuntime = false;

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

function isHomePath(pathname: string) {
  return HOME_PATHS.has(pathname);
}

function wasAudioAlreadyAttempted() {
  if (audioAttemptedInRuntime) return true;

  try {
    return window.sessionStorage.getItem(AUDIO_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markAudioAttempted() {
  audioAttemptedInRuntime = true;

  try {
    window.sessionStorage.setItem(AUDIO_SESSION_KEY, "true");
  } catch {
    // sessionStorage puede estar deshabilitado; la bandera en memoria cubre la sesión SPA.
  }
}

function tryPlayAudiologoOnce(pathname: string) {
  if (!isHomePath(pathname) || wasAudioAlreadyAttempted()) return;

  markAudioAttempted();
  void playAudiologoFromStart()
    .then(() => {
      (window as unknown as Record<string, string>).__lafabAudiologo = "played";
    })
    .catch(() => {
      (window as unknown as Record<string, string>).__lafabAudiologo = "blocked";
    });
}

export default function IntroLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [cycle, setCycle] = useState(0);

  const runIdRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearScheduledHide = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
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
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      hideTimerRef.current = setTimeout(() => finishRun(runId), reduce ? 800 : INTRO_DURATION_MS);
    },
    [finishRun]
  );

  useEffect(() => {
    const audio = getAudio();
    audio.load();

    return () => {
      clearScheduledHide();
    };
  }, [clearScheduledHide]);

  useEffect(() => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;

    clearScheduledHide();
    setVisible(true);
    setCycle((current) => current + 1);
    scheduleHide(runId);

    if (isHomePath(pathname)) {
      tryPlayAudiologoOnce(pathname);
    } else {
      stopAudiologo();
    }

    return () => {
      clearScheduledHide();
    };
  }, [pathname, clearScheduledHide, scheduleHide]);

  if (!visible) return null;

  const loaderStyle = {
    "--lf-loader-duration": `${INTRO_DURATION_MS}ms`,
  } as CSSProperties;

  return (
    <div
      key={cycle}
      className="lf-loader lf-loader--playing pointer-events-none fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink"
      style={loaderStyle}
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
          <path className="lf-sofa-line" style={{ animationDelay: "0.45s" }} d="M26 86 L26 54 Q26 40 42 40 L198 40 Q214 40 214 54 L214 86" />
          {/* base */}
          <path className="lf-sofa-line" style={{ animationDelay: "0.7s" }} d="M20 86 L220 86" />
          {/* línea del asiento */}
          <path className="lf-sofa-line" style={{ animationDelay: "0.95s" }} d="M40 66 Q120 60 200 66" />
          {/* división de cojines */}
          <path className="lf-sofa-line" style={{ animationDelay: "1.25s" }} d="M120 66 L120 44" />
          {/* patas */}
          <path className="lf-sofa-line" style={{ animationDelay: "1.55s" }} d="M44 86 L40 100" />
          <path className="lf-sofa-line" style={{ animationDelay: "1.55s" }} d="M196 86 L200 100" />
        </svg>

        <span className="lf-loader-line mt-6 h-px w-24 bg-gold" />
        <span className="lf-loader-tag mt-4 text-[11px] uppercase tracking-[0.35em] text-white/55">
          Muebles a la medida
        </span>
      </div>
    </div>
  );
}
