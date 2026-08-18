import { REVIEWS, REVIEWS_SUMMARY, GOOGLE_REVIEW_URL } from "@/lib/content";
import Reveal from "@/components/Reveal";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="text-star tracking-tight" aria-label={`${n} de 5 estrellas`}>
      {"★".repeat(n)}
    </span>
  );
}

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#4285F4" d="M45 24c0-1.5-.1-3-.4-4.4H24v8.4h11.8c-.5 2.8-2 5.1-4.4 6.7v5.6h7.1C42.7 36.4 45 30.7 45 24z" />
      <path fill="#34A853" d="M24 46c6 0 11-2 14.6-5.4l-7.1-5.6c-2 1.3-4.5 2.1-7.5 2.1-5.8 0-10.7-3.9-12.4-9.2H4.3v5.8C7.9 40.9 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.6 27.9c-.5-1.3-.7-2.7-.7-4.1s.3-2.8.7-4.1v-5.8H4.3C2.8 16.9 2 20.3 2 23.8s.8 6.9 2.3 9.9l7.3-5.8z" />
      <path fill="#EA4335" d="M24 10.7c3.3 0 6.2 1.1 8.5 3.3l6.3-6.3C35 4.1 30 2 24 2 15.4 2 7.9 7.1 4.3 14l7.3 5.8C13.3 14.6 18.2 10.7 24 10.7z" />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold-dark">
              Reseñas
            </p>
            <h2 className="mt-2 text-3xl font-light text-ink md:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Tarjeta resumen destacada */}
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl bg-ink p-8 text-white">
              <div>
                <GoogleG className="h-8 w-8" />
                <div className="mt-6 flex items-end gap-3">
                  <span className="text-6xl font-light leading-none">
                    {REVIEWS_SUMMARY.rating.toFixed(1)}
                  </span>
                  <div className="pb-1">
                    <Stars />
                    <p className="text-sm text-white/60">
                      {REVIEWS_SUMMARY.count} reseñas en Google
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-white/70">
                  Cientos de hogares ya confían en LaFab. Estas son algunas de sus
                  experiencias reales.
                </p>
              </div>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-ink transition-transform hover:scale-105"
              >
                Escribir una reseña
              </a>
            </div>
          </Reveal>

          {/* Reseñas */}
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 2) * 120}>
              <article className="group flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="font-serif text-5xl leading-none text-gold/40">
                  &ldquo;
                </span>
                <Stars />
                <p className="mt-3 flex-1 text-ink/75">{r.text}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-lg font-semibold text-white">
                    {r.name.charAt(0)}
                  </span>
                  <div className="flex-1">
                    <strong className="block text-sm text-ink">{r.name}</strong>
                    <span className="flex items-center gap-1 text-xs text-ink/40">
                      <GoogleG className="h-3.5 w-3.5" /> vía Google
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
