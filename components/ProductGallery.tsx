"use client";

import { useState } from "react";
import Image from "next/image";
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
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
        {main ? (
          <Image
            src={main.src}
            alt={main.alt || name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
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
              <Image
                src={img.thumbnail || img.src}
                alt={img.alt || `${name} ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
