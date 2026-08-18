import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getProducts, money } from "@/lib/woocommerce";
import ProductGallery from "@/components/ProductGallery";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

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

  const desc =
    stripHtml(product.short_description) ||
    stripHtml(product.description) ||
    `${product.name} fabricado a la medida por LaFab en Medellín.`;

  return {
    title: product.name,
    description: desc.slice(0, 160),
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      title: product.name,
      description: desc.slice(0, 160),
      images: product.images?.[0]?.src ? [product.images[0].src] : [],
      type: "website",
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

  return (
    <div className="mx-auto max-w-site px-4 py-10 md:px-6">
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

      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {cat && (
            <p className="text-sm font-medium uppercase tracking-wide text-gold-dark">
              {cat.name}
            </p>
          )}
          <h1 className="mt-1 text-3xl font-semibold text-ink md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            {product.on_sale ? (
              <>
                <span className="text-3xl font-bold text-ink">
                  {money(p.sale_price, p)}
                </span>
                <span className="text-lg text-ink/40 line-through">
                  {money(p.regular_price, p)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-ink">
                {money(p.price, p)}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink/50">IVA incluido</p>

          {product.slug === "sofa-san-diego" && (
            <Link
              href="/san-diego"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-gold-dark transition-colors hover:bg-gold/30"
            >
              ✨ Ver la experiencia completa del Sofá San Diego →
            </Link>
          )}

          {product.short_description && (
            <div
              className="prose prose-sm mt-6 max-w-none text-ink/70"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          <div className="mt-8">
            <AddToCart
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                image: product.images?.[0]?.thumbnail || product.images?.[0]?.src || "",
                price: parseInt(
                  product.on_sale ? p.sale_price : p.price,
                  10
                ),
              }}
              purchasable={product.is_purchasable}
              inStock={product.is_in_stock}
            />
          </div>

          {/* Trust seals */}
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-ink/60">
            <div className="rounded-xl bg-cream px-4 py-3">✓ Fabricación propia</div>
            <div className="rounded-xl bg-cream px-4 py-3">✓ Garantía LaFab</div>
            <div className="rounded-xl bg-cream px-4 py-3">✓ Pago seguro (Bold)</div>
            <div className="rounded-xl bg-cream px-4 py-3">✓ Envío a todo el país</div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <Reveal>
          <section className="mt-16 max-w-3xl">
            <h2 className="mb-4 text-2xl font-light text-ink">Descripción</h2>
            <div
              className="prose max-w-none text-ink/70"
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
    </div>
  );
}
