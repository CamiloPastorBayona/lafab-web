"use client";

// Carrusel de banners de la campaña.
//
// Las imágenes vienen limpias, sin texto quemado, así que el titular, el
// nombre del mueble y el botón van en HTML encima. Eso tiene dos ventajas
// sobre quemarlo en la imagen: el texto se lee en cualquier tamaño de
// pantalla, y Google lo indexa.
//
// Cada banner está compuesto con el mueble a la derecha y el lado izquierdo en
// penumbra, que es donde cae el texto. El degradado refuerza esa penumbra para
// que el texto se lea siempre, aunque la foto cambie.

import Link from "next/link";
import { useEffect, useState } from "react";
import WpImage from "@/components/WpImage";
import { BANNERS } from "@/lib/blackfriday";
import { PROMO } from "@/lib/promo";

const NOMBRES: Record<string, string> = {
  "sofa-vittorio": "Sofá Vittorio",
  "alcoba-kenia": "Alcoba Kenia",
  "sofa-latina": "Sofá Latina",
  "sofa-luton": "Sofá Luton",
};

export default function BannerPromo({
  alto = "normal",
  children,
}: {
  /**
   * "principal" ocupa la portada entera en lugar del carrusel de siempre.
   * "alto" y "normal" quedan para cualquier otro sitio donde haga falta.
   */
  alto?: "normal" | "alto" | "principal";
  children?: React.ReactNode;
}) {
  const [activo, setActivo] = useState(0);
  const [montarResto, setMontarResto] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setMontarResto(true);
      setActivo((a) => (a + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // En "principal" se mete bajo el header transparente, igual que el hero al
  // que sustituye, pero no va a pantalla completa: a 60vh se ve el banner y se
  // asoma la selección que viene debajo, que es a donde queremos que bajen. En
  // móvil tampoco: estas fotos son panorámicas (2,3 a 1) y a 390 de ancho el
  // recorte se comería la sala entera para dejar una franja.
  const clases =
    alto === "principal"
      ? "-mt-[64px] min-h-[clamp(540px,60vh,660px)]"
      : alto === "alto"
        ? "min-h-[clamp(520px,70vh,720px)]"
        : "min-h-[clamp(380px,48vh,520px)]";

  return (
    <section
      className={`relative overflow-hidden bg-[#0D0D0D] text-white ${clases}`}
      aria-label={PROMO.etiqueta}
    >
      {BANNERS.map((b, i) => (
        <div
          key={b.slug}
          // 1200 ms era demasiado: durante el cruce se veían las dos fotos
          // mezcladas mientras la etiqueta de abajo ya había cambiado, así que
          // parecía que el nombre no correspondía al mueble.
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === activo ? 1 : 0 }}
          aria-hidden={i !== activo}
        >
          {(i === 0 || montarResto) && (
            <WpImage
              src={b.imagen}
              alt={i === activo ? b.alt : ""}
              sizes="100vw"
              priority={i === 0}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      ))}

      {/* El texto cae sobre el lado izquierdo, que es el que las fotos dejan
          en penumbra a propósito. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/95 via-[#0D0D0D]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent" />

      <div
        className={`relative z-10 mx-auto flex h-full max-w-site flex-col justify-center px-4 md:px-6 ${
          alto === "principal"
            ? "py-14 pt-28 md:py-14 md:pt-20"
            : "py-14 md:py-20"
        }`}
      >
        {children}

        {/* Qué mueble se está viendo. Cambia con el carrusel. */}
        <p className="mt-7 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-white/65">
          <span aria-hidden className="h-px w-7 bg-gold-light/60" />
          {NOMBRES[BANNERS[activo].slug] ?? ""}
        </p>

        <div className="mt-4 flex gap-2" role="tablist" aria-label="Muebles de la campaña">
          {BANNERS.map((b, i) => (
            <button
              key={b.slug}
              role="tab"
              aria-selected={i === activo}
              aria-label={NOMBRES[b.slug] ?? b.slug}
              onClick={() => {
                setMontarResto(true);
                setActivo(i);
              }}
              className={`h-1 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-gold ${
                i === activo ? "w-7 bg-gold-light" : "w-3 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Toda la pieza es clicable hacia el producto que se está viendo, por
          debajo del texto para no robarle los clics a los botones. */}
      <Link
        href={`/producto/${BANNERS[activo].slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Ver ${NOMBRES[BANNERS[activo].slug] ?? "el producto"}`}
      />
    </section>
  );
}
