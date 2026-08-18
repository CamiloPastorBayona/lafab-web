"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WHATSAPP } from "@/lib/content";

const BASE = "https://lafab.com.co/wp-content/uploads";

type Slide = {
  img: string;
  srcSet: string;
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
};

// srcset con los tamaños que ya genera WordPress (768/1024/1536): el navegador
// baja solo el que necesita en vez del original de 1920px.
const srcset = (dir: string, base: string, sizes: [number, string][]) =>
  sizes.map(([w, file]) => `${BASE}/${dir}/${file} ${w}w`).join(", ");

const SLIDES: Slide[] = [
  {
    img: `${BASE}/2026/07/4.webp`,
    srcSet: `${BASE}/2026/07/4.webp 1600w`,
    eyebrow: "Nuestro sofá insignia",
    title: <>Sofá San Diego</>,
    sub: "Confort superior para disfrutar todos los días. Diséñalo a tu medida y cómpralo en línea.",
    ctaLabel: "Descubrir el San Diego",
    href: "/san-diego",
  },
  {
    img: `${BASE}/2024/11/Banner-2@4x-100-1024x490.jpg`,
    srcSet: srcset("2024/11", "Banner-2@4x-100", [
      [768, "Banner-2@4x-100-768x368.jpg"],
      [1024, "Banner-2@4x-100-1024x490.jpg"],
      [1536, "Banner-2@4x-100-1536x735.jpg"],
    ]),
    eyebrow: "Cocinas",
    title: (
      <>
        Cocinas que inspiran
        <br />
        cada receta.
      </>
    ),
    sub: "Crea el espacio perfecto para tus sabores.",
    ctaLabel: "Cotizar",
    href: WHATSAPP,
    external: true,
  },
  {
    img: `${BASE}/2024/12/closets-2-1-1024x683.jpg`,
    srcSet: srcset("2024/12", "closets-2-1", [
      [768, "closets-2-1-768x512.jpg"],
      [1024, "closets-2-1-1024x683.jpg"],
      [1536, "closets-2-1-1536x1025.jpg"],
    ]),
    eyebrow: "Closets",
    title: <>Closets a tu medida.</>,
    sub: "Estilo y funcionalidad en perfecta armonía.",
    ctaLabel: "Diseña el tuyo",
    href: WHATSAPP,
    external: true,
  },
  {
    img: `${BASE}/2024/11/Banner-4@4x-100-1024x490.jpg`,
    srcSet: srcset("2024/11", "Banner-4@4x-100", [
      [768, "Banner-4@4x-100-768x367.jpg"],
      [1024, "Banner-4@4x-100-1024x490.jpg"],
      [1536, "Banner-4@4x-100-1536x734.jpg"],
    ]),
    eyebrow: "Sofás",
    title: (
      <>
        Sofás que redefinen
        <br />
        tu confort.
      </>
    ),
    sub: "Diseñados para adaptarse a tu estilo y a tus espacios.",
    ctaLabel: "Ver sofás",
    href: "/shop",
  },
  {
    img: `${BASE}/2024/11/Banner-5_1@4x-100-1024x490.jpg`,
    srcSet: srcset("2024/11", "Banner-5_1@4x-100", [
      [768, "Banner-5_1@4x-100-768x368.jpg"],
      [1024, "Banner-5_1@4x-100-1024x490.jpg"],
      [1536, "Banner-5_1@4x-100-1536x735.jpg"],
    ]),
    eyebrow: "Alcobas",
    title: <>Alcoba Kenia.</>,
    sub: "Donde la comodidad se une a la relajación.",
    ctaLabel: "Ver colección",
    href: "/shop",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef<number | null>(null);

  const go = (i: number) => setActive((i + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section
      className="relative -mt-[64px] min-h-screen w-full overflow-hidden bg-ink"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.img}
            srcSet={s.srcSet}
            sizes="100vw"
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[7000ms] ease-out"
            style={{ transform: i === active ? "scale(1)" : "scale(1.06)" }}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={i === 0 ? "high" : undefined}
          />
          <span
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(62% 60% at 50% 50%, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 100%), linear-gradient(180deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,.28) 45%, rgba(0,0,0,.62) 100%)",
            }}
          />
        </div>
      ))}

      {/* Contenido del slide activo (centrado) */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-site items-center justify-center px-4 text-center md:px-6">
        <div key={active} className="lf-fade mx-auto max-w-2xl text-white">
          <span className="mb-3 block text-xs font-medium uppercase tracking-[0.28em] text-gold-light md:text-sm">
            {SLIDES[active].eyebrow}
          </span>
          <h1 className="text-3xl font-light leading-tight md:text-5xl">
            {SLIDES[active].title}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/85 md:text-lg">
            {SLIDES[active].sub}
          </p>
          <div className="mt-8">
            {SLIDES[active].external ? (
              <a
                href={SLIDES[active].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-gold px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
              >
                {SLIDES[active].ctaLabel}
              </a>
            ) : (
              <Link
                href={SLIDES[active].href}
                className="inline-block rounded-full bg-gold px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
              >
                {SLIDES[active].ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === active ? "w-7 bg-gold" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
