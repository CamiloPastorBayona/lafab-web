"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import type { LegalSection } from "@/lib/legal";

export default function LegalDoc({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((_, i) => {
      const el = document.getElementById(`sec-${i}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} />

      <section className="mx-auto max-w-site px-4 py-12 md:px-6 md:py-16">
        <p className="mb-8 text-sm text-ink/50">
          Última actualización: {updated} · Inversiones Correa Rua S.A.S. · NIT
          901.606.662-6
        </p>

        <div className="gap-12 md:grid md:grid-cols-[240px_1fr]">
          {/* Sidebar / índice */}
          <aside className="sticky top-16 z-10 -mx-4 mb-6 bg-white/95 px-4 py-3 backdrop-blur md:top-24 md:mx-0 md:mb-0 md:self-start md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
            <p className="mb-3 hidden text-xs font-medium uppercase tracking-[0.2em] text-ink/40 md:block">
              Contenido
            </p>
            <nav className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:gap-0 md:overflow-visible md:border-l md:border-ink/10">
              {sections.map((s, i) => (
                <a
                  key={s.title}
                  href={`#sec-${i}`}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors md:whitespace-normal md:rounded-none md:-ml-px md:border-l-2 md:px-4 md:py-2 ${
                    active === i
                      ? "bg-ink text-white md:bg-transparent md:border-gold md:text-ink md:font-medium"
                      : "text-ink/55 hover:text-ink md:border-transparent md:hover:border-ink/30"
                  }`}
                >
                  <span className="mr-1.5 text-gold md:text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Contenido */}
          <div>
            {sections.map((s, i) => (
              <section
                key={s.title}
                id={`sec-${i}`}
                data-idx={i}
                className="scroll-mt-24 border-b border-ink/10 py-8 first:pt-0"
              >
                <h2 className="text-2xl font-light text-ink">
                  <span className="mr-3 text-base text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-ink/70">
                  {s.body}
                </div>
              </section>
            ))}

            <div className="mt-10 rounded-2xl bg-cream p-6 text-sm text-ink/70">
              <p className="font-medium text-ink">
                ¿Dudas sobre tus datos o una compra?
              </p>
              <p className="mt-1">
                Escríbenos a{" "}
                <a
                  href="mailto:info@lafab.com.co"
                  className="text-gold-dark underline"
                >
                  info@lafab.com.co
                </a>{" "}
                o al (305) 460 2395. Cl. 64 #44-74, Barrio La Esmeralda, Itagüí,
                Antioquia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
