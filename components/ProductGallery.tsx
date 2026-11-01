"use client";

import { useState } from "react";
import { WCImage } from "@/lib/woocommerce";

export default function ProductGallery({
  images,
  name,
}: {
  images: WCImage[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const main = images[active];

  return (
    <div>
      <div
        data-protect-img
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream"
      >
        {main ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={main.src}
              srcSet={main.srcset || undefined}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={main.alt || name}
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
              fetchPriority="high"
            />
            {/* Capa transparente: intercepta clic derecho / pulsación larga sobre la foto */}
            <span
              aria-hidden
              className="absolute inset-0 z-10 block"
              style={{ background: "transparent" }}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-ink/30">
            Sin imagen
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-lg bg-cream ring-2 transition ${
                i === active ? "ring-gold" : "ring-transparent hover:ring-gold/40"
              }`}
            >
              {/* El "thumbnail" que manda WooCommerce es la versión de 700 px,
                  no una miniatura: se bajaban 41 a 99 KB por foto para pintarlas
                  en un cuadro de 62 px. Con srcSet el navegador toma la de
                  150x150, que pesa 2 KB.
                  El alt va indexado a propósito: el del CMS es idéntico en las
                  seis fotos del mismo producto, así que un lector de pantalla
                  anunciaba seis botones con el mismo nombre. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.thumbnail || img.src}
                srcSet={img.thumbnail_srcset || img.srcset || undefined}
                sizes="(min-width: 768px) 120px, 80px"
                alt={`${name}, foto ${i + 1} de ${images.length}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
