import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import Ico from "@/components/LandingIcons";
import { WHATSAPP } from "@/lib/content";
import type { CategoryConfig } from "@/lib/categories";
import type { WCProduct } from "@/lib/woocommerce";

const BENEFITS = [
  { icon: "factory", t: "Fabricación propia" },
  { icon: "layers", t: "Telas de calidad" },
  { icon: "shieldCheck", t: "Garantía" },
  { icon: "truck", t: "Envío incluido en Medellín" },
];

export default function CategoryPage({
  cfg,
  products,
}: {
  cfg: CategoryConfig;
  products: WCProduct[];
}) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://lafab.com.co/" },
      { "@type": "ListItem", position: 2, name: "Tienda", item: "https://lafab.com.co/shop" },
      { "@type": "ListItem", position: 3, name: cfg.eyebrow, item: `https://lafab.com.co/${cfg.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageHeader eyebrow={cfg.eyebrow} title={cfg.h1} image={cfg.image} />

      <div className="mx-auto max-w-site px-4 py-12 md:px-6 md:py-16">
        {/* Breadcrumb visible */}
        <nav className="mb-8 text-sm text-ink/50">
          <Link href="/" className="hover:text-ink">Inicio</Link> /{" "}
          <Link href="/shop" className="hover:text-ink">Tienda</Link> /{" "}
          <span className="text-ink">{cfg.eyebrow}</span>
        </nav>

        {/* Intro SEO */}
        <Reveal>
          <div className="max-w-3xl space-y-4 text-ink/75">
            {cfg.intro.map((par, i) => (
              <p key={i}>{par}</p>
            ))}
          </div>
        </Reveal>

        {cfg.subcategories && cfg.subcategories.length > 0 && (
          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-ink/50">Explora también:</span>
              {cfg.subcategories.map((sc) => (
                <Link
                  key={sc.href}
                  href={sc.href}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-ink hover:text-ink"
                >
                  {sc.label}
                </Link>
              ))}
            </div>
          </Reveal>
        )}

        {/* Beneficios */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t} delay={(i % 4) * 80}>
              <div className="flex items-center gap-3 rounded-2xl border border-ink/10 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-gold-dark">
                  <Ico name={b.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-ink">{b.t}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="mt-14">
          <h2 className="mb-6 text-2xl font-light text-ink md:text-3xl">
            {cfg.eyebrow} disponibles
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-cream p-10 text-center text-ink/60">
              <p>Estamos preparando esta categoría.</p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white"
              >
                Cotizar a la medida
              </a>
            </div>
          )}
        </div>

        {/* FAQ */}
        <section className="mt-16 max-w-3xl">
          <h2 className="mb-6 text-2xl font-light text-ink md:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {cfg.faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg text-ink">
                  {item.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-xl leading-none text-gold-dark transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink/70">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal>
          <div className="mt-14 rounded-3xl bg-ink p-8 text-center md:p-12">
            <h2 className="text-2xl font-light text-white md:text-3xl">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/60">
              Fabricamos a la medida. Cuéntanos qué necesitas y lo diseñamos
              contigo.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
              >
                Cotizar por WhatsApp
              </a>
              <Link
                href="/shop"
                className="rounded-full border border-white/30 px-7 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ver toda la tienda
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
