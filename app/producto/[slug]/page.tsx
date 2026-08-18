import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getProducts, money } from "@/lib/woocommerce";
import ProductGallery from "@/components/ProductGallery";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Ico from "@/components/LandingIcons";
import { WHATSAPP } from "@/lib/content";

export const revalidate = 300;

// Strip HTML for meta descriptions.
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Producto no encontrado" };

  // Mismo título/meta que dejamos optimizados en Rank Math (coherencia total).
  const title = `${product.name} a la medida en Medellín`;
  const description = `${product.name}, fabricado a la medida por LaFab en Medellín. Diseño propio, materiales de calidad y envío a todo el país. ¡Cotiza el tuyo!`;

  return {
    title,
    description,
    keywords: [
      product.name,
      `${product.name} Medellín`,
      "muebles a la medida Medellín",
      product.categories?.[0]?.name
        ? `${product.categories[0].name} a la medida`
        : "muebles a la medida",
    ],
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      title: `${title} | LaFab`,
      description,
      images: product.images?.[0]?.src ? [product.images[0].src] : [],
      type: "website",
      locale: "es_CO",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const p = product.prices;
  const cat = product.categories?.[0];

  // Related: same category, exclude current.
  const related = cat
    ? (await getProducts({ category: cat.id, per_page: 5 })).filter(
        (r) => r.id !== product.id
      ).slice(0, 4)
    : [];

  // Datos estructurados (Product schema) para resultados enriquecidos en Google.
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((i) => i.src) ?? [],
    description: (
      stripHtml(product.short_description) ||
      stripHtml(product.description) ||
      `${product.name} fabricado a la medida por LaFab en Medellín.`
    ).slice(0, 320),
    brand: { "@type": "Brand", name: "LaFab" },
    offers: {
      "@type": "Offer",
      priceCurrency: p.currency_code || "COP",
      price: parseInt(product.on_sale ? p.sale_price : p.price, 10),
      availability: product.is_in_stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `https://lafab.com.co/producto/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-site px-4 py-10 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-ink/50">
        <Link href="/" className="hover:text-ink">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="/shop" className="hover:text-ink">
          Tienda
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Galería (fija al hacer scroll en desktop) */}
        <div className="md:sticky md:top-24 md:self-start">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Info */}
        <div>
          {cat && (
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-gold-dark">
              {cat.name}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-light text-ink md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            {product.on_sale ? (
              <>
                <span className="text-3xl font-semibold text-ink">
                  {money(p.sale_price, p)}
                </span>
                <span className="text-lg text-ink/40 line-through">
                  {money(p.regular_price, p)}
                </span>
                <span className="rounded-full bg-sale/10 px-3 py-1 text-xs font-semibold text-sale">
                  Oferta
                </span>
              </>
            ) : (
              <span className="text-3xl font-semibold text-ink">
                {money(p.price, p)}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink/50">
            IVA incluido · Envío incluido en Medellín
          </p>

          {product.slug === "sofa-san-diego" && (
            <Link
              href="/san-diego"
              className="mt-5 flex items-center justify-between gap-2 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-3 text-sm font-semibold text-gold-dark transition-colors hover:bg-gold/20"
            >
              <span>Vive la experiencia completa del Sofá San Diego</span>
              <span aria-hidden>→</span>
            </Link>
          )}

          {product.short_description && (
            <div
              className="mt-6 text-ink/70 [&_a]:text-gold-dark [&_b]:font-semibold [&_p]:mt-2"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          <div className="mt-8">
            <AddToCart
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                image:
                  product.images?.[0]?.thumbnail ||
                  product.images?.[0]?.src ||
                  "",
                price: parseInt(product.on_sale ? p.sale_price : p.price, 10),
              }}
              purchasable={product.is_purchasable}
              inStock={product.is_in_stock}
            />
          </div>

          {/* Asesoría */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full border border-ink/15 py-3 text-sm font-medium text-ink transition-colors hover:bg-cream"
          >
            <Ico name="headset" className="h-4 w-4 text-gold-dark" /> ¿Dudas? Habla
            con un asesor
          </a>

          {/* Sellos con iconos */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6 text-center sm:grid-cols-4">
            {[
              { i: "factory", t: "Fabricación propia" },
              { i: "shieldCheck", t: "Garantía LaFab" },
              { i: "lock", t: "Pago seguro" },
              { i: "truck", t: "Envío a domicilio" },
            ].map((s) => (
              <div key={s.t} className="flex flex-col items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-gold-dark">
                  <Ico name={s.i} className="h-5 w-5" />
                </span>
                <span className="text-xs text-ink/60">{s.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Descripción */}
      {product.description && (
        <Reveal>
          <section className="mt-16 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-gold-dark">
              Detalles
            </p>
            <h2 className="mb-6 mt-1 text-2xl font-light text-ink md:text-3xl">
              Sobre este mueble
            </h2>
            <div
              className="text-[16px] leading-relaxed text-ink/75 [&_a]:text-gold-dark [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-light [&_h2]:text-ink [&_p]:mt-4"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </section>
        </Reveal>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <h2 className="mb-8 text-2xl font-light text-ink">
              Completa tu espacio
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={(i % 4) * 90}>
                <ProductCard product={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Cómo comprar */}
      <section className="mt-20">
        <Reveal>
          <h2 className="mb-10 text-center text-2xl font-light text-ink md:text-3xl">
            Comprar es muy fácil
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { i: "sofa", n: "01", t: "Elige tu mueble", s: "Explora el catálogo y elige el que va con tu espacio." },
            { i: "gem", n: "02", t: "Personalízalo", s: "Medidas, tela y color a tu gusto. Te asesoramos en todo." },
            { i: "truck", n: "03", t: "Recíbelo en casa", s: "Lo fabricamos y te lo llevamos. Envío incluido en Medellín." },
          ].map((step, idx) => (
            <Reveal key={step.n} delay={idx * 110}>
              <div className="h-full rounded-2xl bg-cream p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gold-dark">
                    <Ico name={step.i} className="h-5 w-5" />
                  </span>
                  <span className="text-2xl font-light text-gold">{step.n}</span>
                </div>
                <h3 className="mt-4 text-lg font-light text-ink">{step.t}</h3>
                <p className="mt-1 text-sm text-ink/60">{step.s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <Reveal>
        <section className="mt-16 overflow-hidden rounded-3xl bg-[radial-gradient(130%_130%_at_0%_0%,#3a342d_0%,#231f1c_45%,#141210_100%)] px-8 py-14 text-center md:px-14 md:py-16">
          <h2 className="text-2xl font-light text-white md:text-3xl">
            ¿Te enamoraste de este mueble?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Escríbenos y te asesoramos, o míralo junto a más piezas que combinan
            con tu espacio.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-8 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              Cotizar por WhatsApp
            </a>
            <Link
              href="/shop"
              className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver más muebles
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
