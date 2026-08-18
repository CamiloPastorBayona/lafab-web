import { REVIEWS, REVIEWS_SUMMARY, GOOGLE_REVIEW_URL } from "@/lib/content";

function Stars({ n }: { n: number }) {
  return (
    <span className="text-star" aria-label={`${n} de 5 estrellas`}>
      {"★".repeat(n)}
      <span className="text-ink/15">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function Reviews() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-gold-dark">
            Reseñas
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-ink md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-3 text-ink/60">
            <span className="font-semibold text-ink">
              {REVIEWS_SUMMARY.rating.toFixed(1)}
            </span>{" "}
            <span className="text-star">★★★★★</span> · {REVIEWS_SUMMARY.count}{" "}
            reseñas en Google
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
            >
              <Stars n={r.rating} />
              <p className="mt-4 flex-1 text-ink/75">“{r.text}”</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 font-semibold text-gold-dark">
                  {r.name.charAt(0)}
                </span>
                <div className="text-sm">
                  <strong className="block text-ink">{r.name}</strong>
                  <span className="text-ink/40">vía Google</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Déjanos tu opinión en Google
          </a>
        </div>
      </div>
    </section>
  );
}
