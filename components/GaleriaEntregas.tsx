"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CATEGORIAS_ENTREGA,
  ENTREGAS,
  type Entrega,
} from "@/lib/entregas";

// Cada foto aparece sola al entrar en pantalla. Se usa un observador por
// tarjeta en vez de animar toda la cuadrícula: así una galería larga no
// dispara veinte transiciones a la vez en un teléfono.
function Tarjeta({
  foto,
  indice,
  onAbrir,
}: {
  foto: Entrega;
  indice: number;
  onAbrir: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Sin IntersectionObserver (o con movimiento reducido) se muestra directo.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "120px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onAbrir}
      aria-label={`Ampliar: ${foto.alt}`}
      style={{ transitionDelay: `${(indice % 2) * 110}ms` }}
      className={`group relative mb-3 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl bg-cream transition-all duration-700 ease-out sm:mb-4 sm:rounded-2xl md:mb-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={foto.src}
        srcSet={foto.srcSet}
        sizes="(min-width: 1024px) 33vw, 50vw"
        width={foto.w}
        height={foto.h}
        alt={foto.alt}
        loading="lazy"
        decoding="async"
        className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left text-sm font-light leading-snug text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:p-5 md:text-base">
        {foto.alt}
      </span>
    </button>
  );
}

export default function GaleriaEntregas() {
  const [cat, setCat] = useState<string>("todas");
  const [abierta, setAbierta] = useState<number | null>(null);

  const fotos = useMemo(
    () => (cat === "todas" ? ENTREGAS : ENTREGAS.filter((f) => f.cat === cat)),
    [cat]
  );

  // Solo se ofrecen las categorías que de verdad tienen fotos.
  const pestanas = useMemo(
    () =>
      CATEGORIAS_ENTREGA.filter(
        (c) => c.key === "todas" || ENTREGAS.some((f) => f.cat === c.key)
      ),
    []
  );

  const cerrar = useCallback(() => setAbierta(null), []);
  const mover = useCallback(
    (paso: number) =>
      setAbierta((i) =>
        i === null ? i : (i + paso + fotos.length) % fotos.length
      ),
    [fotos.length]
  );

  // Teclado y bloqueo del scroll mientras la foto está ampliada.
  useEffect(() => {
    if (abierta === null) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", alTeclear);
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = previo;
    };
  }, [abierta, cerrar, mover]);

  // Deslizar con el dedo para pasar de foto.
  const toque = useRef<number | null>(null);
  const inicioToque = (e: React.TouchEvent) => {
    toque.current = e.touches[0].clientX;
  };
  const finToque = (e: React.TouchEvent) => {
    if (toque.current === null) return;
    const d = e.changedTouches[0].clientX - toque.current;
    if (Math.abs(d) > 50) mover(d < 0 ? 1 : -1);
    toque.current = null;
  };

  const actual = abierta !== null ? fotos[abierta] : null;

  return (
    <>
      {/* Filtros */}
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
        {pestanas.map((c) => {
          const activa = cat === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setCat(c.key);
                setAbierta(null);
              }}
              aria-pressed={activa}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                activa
                  ? "border-ink bg-ink text-white"
                  : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Mosaico. La clave fuerza el remontaje al cambiar de filtro, para que
          las fotos vuelvan a aparecer en vez de cambiar de golpe. */}
      <div key={cat} className="columns-2 gap-3 sm:gap-4 md:gap-6 lg:columns-3">
        {fotos.map((f, i) => (
          <Tarjeta
            key={f.src}
            foto={f}
            indice={i}
            onAbrir={() => setAbierta(i)}
          />
        ))}
      </div>

      {/* Foto ampliada */}
      {actual && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={actual.alt}
          onClick={cerrar}
          onTouchStart={inicioToque}
          onTouchEnd={finToque}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-8"
        >
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(-1);
                }}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(1);
                }}
                aria-label="Foto siguiente"
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={actual.src}
            src={actual.src}
            srcSet={actual.srcSet}
            sizes="(max-width: 767px) 92vw, 80vw"
            width={actual.w}
            height={actual.h}
            alt={actual.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          />
          <p className="mt-4 max-w-2xl px-6 text-center text-sm text-white/75">
            {actual.alt}
            <span className="mt-1 block text-xs text-white/40">
              {(abierta ?? 0) + 1} de {fotos.length}
            </span>
          </p>
        </div>
      )}
    </>
  );
}
