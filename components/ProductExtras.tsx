// Ficha enriquecida del producto (editable por ACF): ficha técnica (medidas,
// materiales, tiempo, garantía, cuidados), galería de "looks" y preguntas
// frecuentes. Server component; el acordeón de FAQs usa <details> (sin JS).

import Reveal from "@/components/Reveal";
import type { WCProductExtra } from "@/lib/woocommerce";

function SpecRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-6 border-b border-ink/10 py-3 last:border-0">
      <dt className="text-sm font-medium text-ink/55">{label}</dt>
      <dd
        className="text-right text-sm text-ink [&_br]:block"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}

export default function ProductExtras({
  extra,
  name,
}: {
  extra: WCProductExtra;
  name: string;
}) {
  const { medidas, materiales, tiempo_fabricacion, garantia, cuidados, looks, faqs } =
    extra;

  const hasFicha =
    (medidas && medidas.length > 0) ||
    materiales ||
    tiempo_fabricacion ||
    garantia;

  return (
    <>
      {/* Ficha técnica */}
      {(hasFicha || cuidados) && (
        <Reveal>
          <section className="mt-16 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-gold-dark">
              Especificaciones
            </p>
            <h2 className="mb-6 mt-1 text-2xl font-light text-ink md:text-3xl">
              Ficha técnica
            </h2>

            {hasFicha && (
              <dl className="rounded-2xl bg-cream px-6 py-2">
                {medidas?.map((m, i) => (
                  <SpecRow key={`m-${i}`} label={m.etiqueta} value={m.valor} />
                ))}
                <SpecRow label="Materiales" value={materiales} />
                <SpecRow label="Tiempo de fabricación" value={tiempo_fabricacion} />
                <SpecRow label="Garantía" value={garantia} />
              </dl>
            )}

            {cuidados && (
              <div className="mt-6">
                <h3 className="text-lg font-light text-ink">Cuidados</h3>
                <p
                  className="mt-2 text-[15px] leading-relaxed text-ink/75 [&_br]:block"
                  dangerouslySetInnerHTML={{ __html: cuidados }}
                />
              </div>
            )}
          </section>
        </Reveal>
      )}

      {/* Galería de looks */}
      {looks && looks.length > 0 && (
        <section className="mt-16">
          <Reveal>
            <h2 className="mb-6 text-2xl font-light text-ink md:text-3xl">
              {name} en espacios reales
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {looks.map((img, i) => (
              <Reveal key={i} delay={(i % 3) * 90}>
                <div
                  data-protect-img
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    srcSet={img.srcset || undefined}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    alt={img.alt || name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span aria-hidden className="absolute inset-0 z-10 block" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Preguntas frecuentes */}
      {faqs && faqs.length > 0 && (
        <section className="mt-16 max-w-3xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-gold-dark">
              Preguntas frecuentes
            </p>
            <h2 className="mb-6 mt-1 text-2xl font-light text-ink md:text-3xl">
              Resolvemos tus dudas
            </h2>
          </Reveal>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f, i) => (
              <details key={i} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-[16px] font-medium text-ink marker:content-['']">
                  {f.pregunta}
                  <span className="flex-shrink-0 text-gold-dark transition-transform group-open:rotate-45">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p
                  className="mt-3 text-[15px] leading-relaxed text-ink/75 [&_br]:block"
                  dangerouslySetInnerHTML={{ __html: f.respuesta }}
                />
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
