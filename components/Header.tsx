"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { isLandingPath } from "@/lib/landings";

function CartIcon() {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label="Abrir carrito"
      className="relative flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-gold-light"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-ink">
          {count}
        </span>
      )}
    </button>
  );
}

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=573054602395&text=Hola%20LaFab,%20quiero%20cotizar%20un%20mueble";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

const NAV: NavItem[] = [
  {
    label: "Tienda",
    href: "/shop",
    children: [
      { label: "Todos los productos", href: "/shop" },
      { label: "Sofás", href: "/sofas" },
      { label: "Sofás lineales", href: "/sofas-lineales" },
      { label: "Sofás en L", href: "/sofas-en-l" },
      { label: "Comedores", href: "/comedores" },
      { label: "Camas", href: "/camas" },
      { label: "Poltronas", href: "/poltronas" },
    ],
  },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Showrooms", href: "/showrooms" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLandingPath(pathname)) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/95 shadow-lg backdrop-blur-md" : "bg-ink/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png"
            alt="LaFab"
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium text-white/90 transition-colors hover:text-gold-light"
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="mt-0.5 transition-transform group-hover:rotate-180">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-48 rounded-xl bg-ink/95 p-2 shadow-xl ring-1 ring-white/10 backdrop-blur">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-lg px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-gold-light"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/90 transition-colors hover:text-gold-light"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <CartIcon />
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
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-white/90 hover:text-gold-light"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-3 border-l border-white/10 pl-3">
                  {item.children
                    .filter((c) => c.href !== item.href)
                    .map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm text-white/70 hover:text-gold-light"
                      >
                        {c.label}
                      </Link>
                    ))}
                </div>
              )}
            </div>
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
