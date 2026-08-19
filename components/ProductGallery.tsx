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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.thumbnail || img.src}
                alt={img.alt || `${name} ${i + 1}`}
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
