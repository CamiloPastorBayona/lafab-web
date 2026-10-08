"use client";

// Pestañas de la ficha de producto: Descripción · Ficha técnica · Garantía · Envío.
// Antes todo el contenido iba seguido en un solo bloque y se veía apretado.
//
// Cada pestaña se renderiza con un estilo distinto según lo que contiene:
//   specs → filas etiqueta / valor con separador (Largo, Fondo, Altura…)
//   list  → viñetas con palomita (Garantía)
//   prose → párrafos normales

import { useState } from "react";
import type { DocSection } from "@/lib/productContent";

const PANEL: Record<DocSection["variant"], string> = {
  prose:
    "text-[16px] leading-relaxed text-ink/75 [&_a]:text-gold-dark [&_a]:underline [&_p]:mt-4 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_strong]:text-ink",
  specs:
    "text-[15px] text-ink/75 [&_li]:flex [&_li]:flex-wrap [&_li]:items-baseline [&_li]:justify-between [&_li]:gap-x-6 [&_li]:gap-y-1 [&_li]:border-b [&_li]:border-ink/10 [&_li]:py-3 [&_li:last-child]:border-0 [&_li]:text-right [&_strong]:mr-auto [&_strong]:text-left [&_strong]:font-medium [&_strong]:uppercase [&_strong]:tracking-[0.08em] [&_strong]:text-[12px] [&_strong]:text-ink/45 [&_ul]:list-none [&_ul]:p-0 [&_p]:mt-4",
  list:
    "text-[15px] leading-relaxed text-ink/75 [&_li]:relative [&_li]:py-1.5 [&_li]:pl-7 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-1.5 [&_li]:before:text-gold-dark [&_li]:before:content-['✓'] [&_ul]:list-none [&_ul]:p-0 [&_p]:mt-4",
};

export default function ProductTabs({
  title,
  sections,
}: {
  title: string;
  sections: DocSection[];
}) {
  const [active, setActive] = useState(0);
  if (sections.length === 0) return null;

  const current = sections[Math.min(active, sections.length - 1)];
  const single = sections.length === 1;

  return (
    <section className="mt-16">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold-dark">
        Detalles
      </p>
      <h2 className="mt-2 text-2xl font-light text-ink md:text-3xl">{title}</h2>

      <div className="mt-7 overflow-hidden rounded-3xl border border-ink/10 bg-white">
        {!single && (
          <div
            role="tablist"
            aria-label="Información del producto"
            className="flex gap-1 overflow-x-auto border-b border-ink/10 bg-cream/60 px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sections.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                id={`tab-${s.key}`}
                aria-selected={i === active}
                aria-controls={`panel-${s.key}`}
                onClick={() => setActive(i)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  i === active
                    ? "bg-ink text-white"
                    : "text-ink/60 hover:bg-white hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div
          role="tabpanel"
          id={`panel-${current.key}`}
          aria-labelledby={`tab-${current.key}`}
          className="px-6 py-7 md:px-9 md:py-9"
        >
          <div
            className={PANEL[current.variant]}
            dangerouslySetInnerHTML={{ __html: current.html }}
          />
        </div>
      </div>
    </section>
  );
}
