"use client";

// Loader de LaFab (marca de muebles): sobre un fondo oscuro se ENCIENDE una luz
// cálida, se DIBUJA un sofá en línea dorada y aparece el logo; luego se revela el
// sitio. Corre en cada cambio de página.

import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

const LOGO = "https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png";
const AUDIO_SRC = "/audiologo.mp3";
const HOME_PATHS = new Set(["/", "/inicio"]);
// La animación visual queda 1.5s más corta; el audiologo conserva su duración real.
const INTRO_DURATION_MS = 4540;
const AUDIO_START_GUARD_MS = 1200;

// ---- Audiologo ----------------------------------------------------------
// Objetivo: el home empieza con una lámpara apagada. El primer tap/click del
// usuario enciende la escena y dispara el audiologo dentro de un gesto real.
let audioEl: HTMLAudioElement | null = null;
type LoaderState = "ready" | "playing" | "waiting-for-sound";

function prepareAudio(audio: HTMLAudioElement) {
  audio.volume = 1;
  audio.preload = "auto";
}

function getAudio() {
  if (!audioEl) {
    audioEl = new Audio(AUDIO_SRC);
    prepareAudio(audioEl);
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
  audio.muted = false;
  return audio.play();
}

function stopAudiologo() {
  if (!audioEl) return;
  resetAudio(audioEl);
}

function isHomePath(pathname: string) {
  return HOME_PATHS.has(pathname);
}

function setAudioStatus(status: "playing" | "played" | "blocked") {
  (window as unknown as Record<string, string>).__lafabAudiologo = status;
}

export default function IntroLoader() {
  const pathname = usePathname();
  const isHome = isHomePath(pathname);
  const [visible, setVisible] = useState(true);
  const [loaderState, setLoaderState] = useState<LoaderState>("ready");
  const [cycle, setCycle] = useState(0);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const homeSoundPrimedRef = useRef(false);
  const runIdRef = useRef(0);
  const soundStartInFlightRef = useRef(false);
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

  const startVisualLoader = useCallback(
    (runId: number) => {
      clearScheduledHide();
      setCycle((current) => current + 1);
      setLoaderState("playing");
      scheduleHide(runId);
    },
    [clearScheduledHide, scheduleHide]
  );

  const playHomeSound = useCallback(() => {
    if (soundStartInFlightRef.current) return;
    soundStartInFlightRef.current = true;

    setAudioStatus("playing");
    const releaseGuard = window.setTimeout(() => {
      soundStartInFlightRef.current = false;
    }, AUDIO_START_GUARD_MS);

    void playAudiologoFromStart()
      .then(() => {
        setAudioStatus("played");
      })
      .catch(() => {
        setAudioStatus("blocked");
      })
      .finally(() => {
        window.clearTimeout(releaseGuard);
        soundStartInFlightRef.current = false;
      });
  }, []);

  const startHomeSoundAndLoader = useCallback(
    (runId: number) => {
      // El play() se invoca dentro del gesto real del usuario y la animación
      // arranca en el mismo frame para que luz + audiologo entren juntos.
      startVisualLoader(runId);
      playHomeSound();
    },
    [playHomeSound, startVisualLoader]
  );

  useEffect(() => {
    getAudio().load();

    return () => {
      clearScheduledHide();
    };
  }, [clearScheduledHide]);

  useEffect(() => {
    const primeHomeSoundFromLink = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !isHomePath(url.pathname)) return;

      homeSoundPrimedRef.current = true;
      playHomeSound();

      if (isHomePath(window.location.pathname)) {
        const runId = runIdRef.current + 1;
        runIdRef.current = runId;
        setVisible(true);
        setLoaderState("ready");
        startVisualLoader(runId);
      }
    };

    document.addEventListener("pointerdown", primeHomeSoundFromLink, { capture: true });

    return () => {
      document.removeEventListener("pointerdown", primeHomeSoundFromLink, { capture: true });
    };
  }, [playHomeSound, startVisualLoader]);

  useEffect(() => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    soundStartInFlightRef.current = false;

    clearScheduledHide();
    setVisible(true);
    setLoaderState("ready");

    if (isHomePath(pathname) && homeSoundPrimedRef.current) {
      homeSoundPrimedRef.current = false;
      startVisualLoader(runId);
    } else if (isHomePath(pathname)) {
      setCycle((current) => current + 1);
      setLoaderState("waiting-for-sound");
    } else {
      homeSoundPrimedRef.current = false;
      stopAudiologo();
      startVisualLoader(runId);
    }

    return () => {
      clearScheduledHide();
    };
  }, [pathname, clearScheduledHide, startVisualLoader]);

  const isWaitingForSound = loaderState === "waiting-for-sound";
  const isPlaying = loaderState === "playing";

  const handleSoundGesture = useCallback(() => {
    if (!isHome || loaderState !== "waiting-for-sound") return;
    if (soundStartInFlightRef.current) return;

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    startHomeSoundAndLoader(runId);
  }, [isHome, loaderState, startHomeSoundAndLoader]);

  const handleSoundKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleSoundGesture();
  };

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !isWaitingForSound) return;

    const onNativeGesture = () => handleSoundGesture();
    loader.addEventListener("mousedown", onNativeGesture);
    loader.addEventListener("pointerdown", onNativeGesture);
    loader.addEventListener("touchstart", onNativeGesture, { passive: true });

    return () => {
      loader.removeEventListener("mousedown", onNativeGesture);
      loader.removeEventListener("pointerdown", onNativeGesture);
      loader.removeEventListener("touchstart", onNativeGesture);
    };
  }, [handleSoundGesture, isWaitingForSound]);

  if (!visible) return null;

  const loaderStyle = {
    "--lf-loader-duration": `${INTRO_DURATION_MS}ms`,
  } as CSSProperties;

  return (
    <div
      ref={loaderRef}
      key={cycle}
      className={`lf-loader fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink ${
        isPlaying ? "lf-loader--playing pointer-events-none" : "lf-loader--ready"
      } ${isWaitingForSound ? "lf-loader--waiting cursor-pointer" : ""}`}
      style={loaderStyle}
      aria-hidden={isWaitingForSound ? undefined : true}
      aria-label={isWaitingForSound ? "Encender intro sonora de LaFab" : undefined}
      role={isWaitingForSound ? "button" : undefined}
      tabIndex={isWaitingForSound ? 0 : undefined}
      onClick={handleSoundGesture}
      onPointerDown={handleSoundGesture}
      onTouchStart={handleSoundGesture}
      onKeyDown={handleSoundKeyDown}
    >
      <span className="lf-loader-wash" />
      <span className="lf-loader-glow" />
      <span className="lf-lamp-beam" />

      <div className="lf-loader-stage">
        <div className="lf-lamp" aria-hidden>
          <span className="lf-lamp-cable" />
          <svg
            className="lf-lamp-shade"
            viewBox="0 0 120 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M42 12 H78" />
            <path d="M32 16 L18 56 H102 L88 16 Z" />
            <path d="M28 56 H92" />
          </svg>
          <span className="lf-lamp-bulb" />
        </div>

        {isWaitingForSound ? (
          <span className="lf-loader-prompt text-xs font-medium uppercase text-white/60">
            Toca para encender
          </span>
        ) : null}

        <div className="lf-loader-brand flex flex-col items-center px-6">
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
    </div>
  );
}
