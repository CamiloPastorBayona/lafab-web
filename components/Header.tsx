"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=573054602395&text=Hola%20LaFab,%20quiero%20cotizar%20un%20mueble";

const NAV = [
  { label: "Tienda", href: "/shop" },
  { label: "Espacios", href: "/espacios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Showrooms", href: "/showrooms" },
  { label: "Nosotros", href: "/nosotros" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-ink/95 backdrop-blur-md shadow-lg"
          : "bg-ink/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png"
            alt="LaFab"
            className="h-8 w-auto md:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-gold-light"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105 md:inline-block"
          >
            Escríbenos
          </a>
          <button
            aria-label="Menú"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-white md:hidden"
          >
            <span className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-ink px-4 pb-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-white/90 hover:text-gold-light"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-full bg-gold px-5 py-2 text-center font-semibold text-ink"
          >
            Escríbenos
          </a>
        </nav>
      )}
    </header>
  );
}
