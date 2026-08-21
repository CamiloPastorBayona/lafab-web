"use client";

// Loader de intro audio-reactivo de LaFab.
// - Suena el audiologo (una vez por sesión).
// - La animación (visualizador circular + pulso del logo) reacciona EN VIVO a cada
//   golpe del sonido con la Web Audio API.
// - No fuerza autoplay: intenta sonar de una; si el navegador lo bloquea, arranca
//   con el primer gesto del usuario (toque/clic/scroll). Botón "Toca para entrar".
// - Al terminar el audio (o pasado un máximo), se desvanece y revela el sitio.

import { useEffect, useRef, useState } from "react";

const LOGO = "https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png";

export default function IntroLoader() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [pulse, setPulse] = useState(0); // 0..1 para el pulso del logo

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("lafab_intro_seen")) return;
    sessionStorage.setItem("lafab_intro_seen", "1");
    setShow(true);

    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    const audio = new Audio("/audiologo.mp3");
    audio.crossOrigin = "anonymous";
    const source = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.75;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    const bins = analyser.frequencyBinCount;
    const data = new Uint8Array(bins);

    let started = false;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setFading(true);
      setTimeout(() => {
        setShow(false);
        cancelAnimationFrame(rafRef.current);
      }, 650);
    };

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = canvas.clientWidth;
      if (canvas.width !== size * dpr) {
        canvas.width = size * dpr;
        canvas.height = size * dpr;
      }
      const c = canvas.getContext("2d")!;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, size, size);

      analyser.getByteFrequencyData(data);
      const cx = size / 2;
      const cy = size / 2;
      const baseR = size * 0.2;
      const bars = 72;

      // Pulso general (bajos) para el logo y el glow.
      let bass = 0;
      for (let i = 0; i < 12; i++) bass += data[i];
      bass = bass / 12 / 255; // 0..1
      setPulse(bass);

      // Glow central
      const glow = c.createRadialGradient(cx, cy, baseR * 0.3, cx, cy, baseR * (1.6 + bass));
      glow.addColorStop(0, `rgba(176,160,128,${0.10 + bass * 0.25})`);
      glow.addColorStop(1, "rgba(176,160,128,0)");
      c.fillStyle = glow;
      c.fillRect(0, 0, size, size);

      // Barras radiales reactivas
      for (let i = 0; i < bars; i++) {
        const idx = Math.floor((i / bars) * (bins * 0.7));
        const v = data[idx] / 255; // 0..1
        const len = 6 + v * (size * 0.22);
        const ang = (i / bars) * Math.PI * 2 - Math.PI / 2;
        const x1 = cx + Math.cos(ang) * (baseR + 6);
        const y1 = cy + Math.sin(ang) * (baseR + 6);
        const x2 = cx + Math.cos(ang) * (baseR + 6 + len);
        const y2 = cy + Math.sin(ang) * (baseR + 6 + len);
        c.strokeStyle = `rgba(${202 - v * 40},${187 - v * 30},${160},${0.5 + v * 0.5})`;
        c.lineWidth = 2.4;
        c.lineCap = "round";
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.stroke();
      }

      // Anillo base
      c.strokeStyle = "rgba(255,255,255,0.08)";
      c.lineWidth = 1;
      c.beginPath();
      c.arc(cx, cy, baseR, 0, Math.PI * 2);
      c.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    const start = () => {
      if (started) return;
      ctx.resume().catch(() => {});
      audio
        .play()
        .then(() => {
          started = true;
          setNeedsGesture(false);
          rafRef.current = requestAnimationFrame(draw);
        })
        .catch(() => {
          setNeedsGesture(true);
        });
    };

    audio.addEventListener("ended", finish);
    start();

    // Si el navegador bloqueó el audio, arranca con el primer gesto.
    const unlock = () => start();
    ["pointerdown", "keydown", "touchstart", "wheel"].forEach((e) =>
      window.addEventListener(e, unlock, { once: true, passive: true })
    );

    // Salvavidas: no dejar el sitio atrapado si nunca suena.
    const safety = setTimeout(finish, 9000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(safety);
      audio.pause();
      audio.removeEventListener("ended", finish);
      ["pointerdown", "keydown", "touchstart", "wheel"].forEach((e) =>
        window.removeEventListener(e, unlock)
      );
      ctx.close().catch(() => {});
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink transition-opacity duration-[650ms] ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      onClick={() => setNeedsGesture(false)}
      aria-hidden
    >
      <div className="relative flex h-[340px] w-[340px] items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO}
          alt="LaFab"
          className="relative z-10 h-9 w-auto md:h-11"
          style={{
            transform: `scale(${1 + pulse * 0.18})`,
            transition: "transform 80ms linear",
          }}
        />
      </div>

      {needsGesture && (
        <button
          type="button"
          onClick={() => setNeedsGesture(false)}
          className="lf-fade absolute bottom-[22%] left-1/2 -translate-x-1/2 rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium tracking-wide text-white/90 transition-colors hover:bg-white/10"
        >
          Toca para entrar
        </button>
      )}
    </div>
  );
}
