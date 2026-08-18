"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

export type LandingSection = { label: string; href: string };

const DEFAULT_SECTIONS: LandingSection[] = [
  { label: "Diseño", href: "#diseno" },
  { label: "Vistas", href: "#vistas" },
  { label: "Telas", href: "#telas" },
  { label: "Garantía", href: "#garantia" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Faqs", href: "#faqs" },
];

export default function LandingHeader({
  productName,
  buyHref = "#comprar",
  sections = DEFAULT_SECTIONS,
}: {
  productName: string;
  buyHref?: string;
  sections?: LandingSection[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-16 transition-colors duration-300 ${
        scrolled
          ? "bg-ink/95 shadow-lg backdrop-blur-md"
          : "bg-gradient-to-b from-ink/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-site items-center justify-between px-4 md:px-6">
        {/* Izquierda: logo + producto */}
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="LaFab — Inicio" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png"
              alt="LaFab"
              className="h-5 w-auto md:h-6"
            />
          </Link>
          <span className="hidden h-4 w-px bg-white/25 sm:block" />
          <span className="hidden text-sm font-medium text-white sm:block">
            {productName}
          </span>
        </div>

        {/* Centro: secciones de la landing */}
        <nav className="hidden items-center gap-6 lg:flex">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-sm text-white/80 transition-colors hover:text-gold-light"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Derecha */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative flex h-9 w-9 items-center justify-center text-white hover:text-gold-light"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </button>
          <a
            href={buyHref}
            className="hidden rounded-full border border-white/40 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-gold hover:text-gold-light md:inline-block"
          >
            Comprar ahora
          </a>
          <button
            aria-label="Menú"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-white lg:hidden"
          >
            <span className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Menú móvil de secciones */}
      {open && (
        <nav className="border-t border-white/10 bg-ink px-4 pb-4 lg:hidden">
          <p className="py-3 text-sm font-medium text-gold-light">{productName}</p>
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-white/85 hover:text-gold-light"
            >
              {s.label}
            </a>
          ))}
          <a
            href={buyHref}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-gold px-5 py-2.5 text-center font-semibold text-ink"
          >
            Comprar ahora
          </a>
        </nav>
      )}
    </header>
  );
}
