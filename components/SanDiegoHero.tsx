"use client";

// Hero de la landing Sofá San Diego (versión limpia anterior) + indicador de
// scroll animado tipo Lottie. Carga lottie-web por CDN con la animación embebida
// (mouse con rueda que baja); si el runtime falla, queda un fallback CSS para
// que nunca se vea roto. Acoplado a la marca: título en morality, base del sitio.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import WpImage from "@/components/WpImage";
import { SANDIEGO } from "@/lib/sandiego";

// Animación Lottie mínima y válida: contorno de mouse + punto que baja y se
// desvanece en bucle. Embebida para no depender de un asset externo.
const SCROLL_LOTTIE = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 90,
  w: 60,
  h: 96,
  nm: "scroll",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "mouse",
      sr: 1,
      ks: {
        o: { a: 0, k: 90 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [0, 0, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "rc", d: 1, s: { a: 0, k: [40, 64] }, p: { a: 0, k: [30, 44] }, r: { a: 0, k: 20 } },
            { ty: "st", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, lc: 2, lj: 2 },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "dot",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
            { t: 14, s: [100], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
            { t: 34, s: [100], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
            { t: 48, s: [0] },
          ],
        },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [30, 30, 0], i: { x: 0.42, y: 1 }, o: { x: 0.58, y: 0 } },
            { t: 48, s: [30, 54, 0] },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", d: 1, s: { a: 0, k: [7, 7] }, p: { a: 0, k: [0, 0] } },
            { ty: "fl", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
};

const LOTTIE_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lottiePromise: Promise<any> | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadLottie(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).lottie) return Promise.resolve((window as any).lottie);
  if (lottiePromise) return lottiePromise;
  lottiePromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = LOTTIE_SRC;
    s.async = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s.onload = () => resolve((window as any).lottie);
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return lottiePromise;
}

export default function SanDiegoHero() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [lottieOn, setLottieOn] = useState(false);

  useEffect(() => {
    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let anim: any = null;
    loadLottie()
      .then((lottie) => {
        if (disposed || !boxRef.current) return;
        anim = lottie.loadAnimation({
          container: boxRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: SCROLL_LOTTIE,
        });
        setLottieOn(true);
      })
      .catch(() => {
        /* se queda el fallback CSS */
      });
    return () => {
      disposed = true;
      if (anim) anim.destroy();
    };
  }, []);

  return (
    <section
      id="inicio"
      className="relative -mt-[64px] min-h-screen overflow-hidden bg-ink text-center"
    >
      <WpImage
        src={SANDIEGO.hero}
        alt={SANDIEGO.name}
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* velo sutil para legibilidad */}
      <span
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.28) 0%, rgba(0,0,0,.10) 42%, rgba(0,0,0,.42) 100%)",
        }}
      />

      {/* Título + subtítulo (parte superior) */}
      <div className="lf-fade lfh-titlepos absolute left-0 right-0 z-10 px-4 text-center">
        <h1 className="text-4xl font-light uppercase leading-none tracking-[0.08em] text-white md:text-[76px]">
          {SANDIEGO.name}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base font-light text-white/90 md:text-lg">
          {SANDIEGO.tagline}
        </p>
      </div>

      {/* Botón (bien abajo) */}
      <div className="lfh-btnpos absolute left-0 right-0 z-10 flex justify-center px-4">
        <a
          href="#comprar"
          className="lf-fade rounded-md bg-white px-12 py-4 text-sm font-medium uppercase tracking-[0.18em] text-ink shadow-lg transition-transform hover:scale-105"
        >
          Comprar ahora
        </a>
      </div>

      {/* Indicador de scroll (Lottie + fallback CSS) — al fondo */}
      <a
        href="#diseno"
        aria-label="Desliza para ver más"
        className="lfh-cue absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <div className="relative h-14 w-9">
          {/* Lottie */}
          <div
            ref={boxRef}
            className="absolute inset-0 mx-auto"
            style={{ opacity: lottieOn ? 1 : 0, transition: "opacity .3s ease" }}
            aria-hidden="true"
          />
          {/* Fallback CSS: mouse con rueda */}
          {!lottieOn && (
            <span className="absolute left-1/2 top-1 flex h-11 w-6 -translate-x-1/2 justify-center rounded-full border-2 border-white/70">
              <span className="lfh-wheel mt-1.5 h-2 w-1 rounded-full bg-white/90" />
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/75">
          Desliza
        </span>
      </a>

      <style
        dangerouslySetInnerHTML={{
          __html: `
.lfh-titlepos{top:26%}
.lfh-btnpos{bottom:clamp(120px,16vh,200px)}
@keyframes lfhWheel{0%{transform:translateY(0);opacity:0}25%{opacity:1}70%{opacity:1}100%{transform:translateY(12px);opacity:0}}
.lfh-wheel{animation:lfhWheel 1.6s cubic-bezier(.4,0,.2,1) infinite;}
/* pantallas bajas (móvil apaisado): subo el título, bajo el botón y oculto la señal para que no se solapen */
@media (max-height:640px){
  .lfh-titlepos{top:14%}
  .lfh-btnpos{bottom:22px}
  .lfh-cue{display:none}
}
@media (prefers-reduced-motion:reduce){.lfh-wheel{animation:none;opacity:.8}}
`,
        }}
      />
    </section>
  );
}
