"use client";

// FAQ en acordeón: solo una pregunta abierta a la vez, con apertura suave
// (animación por grid-template-rows 0fr→1fr + fade del contenido). Acoplado a la
// marca (título morality, +/× en gold-dark sobre cream).

import { useState } from "react";
import { SANDIEGO } from "@/lib/sandiego";

export default function SanDiegoFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-24"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold md:text-sm">
          Preguntas frecuentes
        </p>
        <h2 className="mt-3 text-3xl font-light text-ink md:text-4xl">
          Resolvemos tus dudas.
        </h2>
      </div>

      <div className="mt-10 divide-y divide-ink/10">
        {SANDIEGO.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-lg text-ink"
              >
                <span>{item.q}</span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-xl leading-none text-gold-dark transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p
                    className={`pb-5 pr-8 text-ink/70 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-1 opacity-0"
                    }`}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
