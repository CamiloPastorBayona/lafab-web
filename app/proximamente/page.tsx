import type { Metadata } from "next";
import CuentaRegresiva from "@/components/CuentaRegresiva";
import { SHOWROOM, WHATSAPP } from "@/lib/content";

const CMS = "https://staging.lafab.com.co/wp-content/uploads";

export const metadata: Metadata = {
  title: "Nueva tienda en línea",
  description:
    "La nueva tienda en línea de LaFab abre el lunes 26 de octubre a las 8:00 a. m.",
  robots: { index: false, follow: false },
};

export default function ProximamentePage() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-16 text-cream">
      {/* Luz cálida que cae desde arriba, como el encendido de la intro */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[80vh] w-[120vw] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(176,160,128,0.22) 0%, rgba(176,160,128,0.07) 42%, rgba(21,21,21,0) 72%)",
        }}
      />
      {/* Grano finísimo para que el fondo no se vea plano */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${CMS}/2022/12/lafab-blanco.png`}
          alt="LaFab · La Fábrica de Muebles"
          width={150}
          height={48}
          className="h-10 w-auto sm:h-12"
        />

        <p className="mt-10 text-[11px] uppercase tracking-[0.34em] text-gold">
          Muy pronto
        </p>

        <h1 className="mt-5 font-morality text-[2rem] leading-[1.12] text-cream sm:text-5xl">
          Nuestra nueva tienda
          <br className="hidden sm:block" /> en línea
        </h1>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/60">
          Estamos terminando de montar el catálogo completo, con medidas, telas
          y precios para comprar en línea.
        </p>

        <div className="mt-12 w-full">
          <CuentaRegresiva />
        </div>

        <p className="mt-8 text-sm tracking-wide text-cream/80">
          Lunes 26 de octubre
          <span className="mx-2.5 text-gold">·</span>
          8:00 a. m.
        </p>

        <div className="mt-14 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gold/45 px-7 py-3 text-sm tracking-wide text-cream transition-colors hover:border-gold hover:bg-gold/10"
          >
            Escríbenos por WhatsApp
          </a>
          <a
            href="https://www.instagram.com/lafabricamed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-wide text-cream/55 underline-offset-4 transition-colors hover:text-cream hover:underline"
          >
            Síguenos en Instagram
          </a>
        </div>

        <p className="mt-14 text-xs leading-relaxed text-cream/35">
          Showroom · {SHOWROOM.address}, {SHOWROOM.city}
        </p>
      </div>
    </main>
  );
}
