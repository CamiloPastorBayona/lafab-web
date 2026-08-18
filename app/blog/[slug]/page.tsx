import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import WpImage from "@/components/WpImage";
import ShareButtons from "@/components/ShareButtons";
import { ARTICLES, getArticle } from "@/lib/blog";
import { WHATSAPP } from "@/lib/content";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const a = getArticle(params.slug);
  if (!a) return { title: "Artículo no encontrado" };
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    keywords: a.keywords,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      title: `${a.title} | LaFab`,
      description: a.metaDescription,
      images: [a.image],
      type: "article",
      locale: "es_CO",
    },
  };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  const url = `https://lafab.com.co/blog/${a.slug}`;
  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    image: a.image,
    datePublished: a.date,
    dateModified: a.date,
    author: { "@type": "Organization", name: "LaFab" },
    publisher: {
      "@type": "Organization",
      name: "LaFab",
      logo: {
        "@type": "ImageObject",
        url: "https://lafab.com.co/wp-content/uploads/2022/12/LaFab-negro.png",
      },
    },
    mainEntityOfPage: url,
    description: a.metaDescription,
  };

  const sideLink = "text-ink/70 transition-colors hover:text-gold-dark";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader eyebrow="Blog" title={a.title} image={a.image} />

      <div className="mx-auto max-w-site px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          {/* Contenido */}
          <article>
            <nav className="mb-6 text-sm text-ink/50">
              <Link href="/" className="hover:text-ink">Inicio</Link> /{" "}
              <Link href="/blog" className="hover:text-ink">Blog</Link> /{" "}
              <span className="text-ink">{a.title}</span>
            </nav>

            <p className="mb-8 text-sm uppercase tracking-wide text-gold-dark">
              {fmtDate(a.date)} · {a.readingMinutes} min de lectura
            </p>

            <Reveal>
              <div
                className="max-w-2xl text-[17px] leading-relaxed text-ink/75 [&_a]:text-gold-dark [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-ink [&_li]:mt-1 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: a.bodyHtml }}
              />
            </Reveal>

            {/* Compartir (móvil) */}
            <div className="mt-10 border-t border-ink/10 pt-6 lg:hidden">
              <ShareButtons url={url} title={a.title} />
            </div>

            <div className="mt-10 rounded-2xl bg-cream p-8 text-center">
              <h2 className="text-xl font-light text-ink">
                ¿Buscas un mueble a la medida?
              </h2>
              <p className="mt-2 text-ink/60">
                Cuéntanos qué necesitas y lo diseñamos contigo.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="hidden rounded-2xl border border-ink/10 p-6 lg:block">
              <ShareButtons url={url} title={a.title} />
            </div>

            <div className="rounded-2xl bg-cream p-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
                Explora
              </p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sofas" className={sideLink}>Sofás a la medida</Link></li>
                <li><Link href="/comedores" className={sideLink}>Comedores de madera</Link></li>
                <li><Link href="/camas" className={sideLink}>Camas tapizadas</Link></li>
                <li><Link href="/poltronas" className={sideLink}>Poltronas</Link></li>
                <li><Link href="/shop" className={sideLink}>Ver toda la tienda</Link></li>
              </ul>
            </div>

            <div className="rounded-2xl bg-ink p-6 text-white">
              <p className="text-lg font-light">Diseña tu mueble</p>
              <p className="mt-1 text-sm text-white/60">
                Fabricación propia y asesoría sin compromiso.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-full bg-gold px-5 py-2.5 text-center text-sm font-semibold text-ink transition-transform hover:scale-105"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Sigue leyendo */}
      {related.length > 0 && (
        <section className="mx-auto max-w-site px-4 pb-16 md:px-6 md:pb-24">
          <h2 className="mb-8 text-2xl font-light text-ink">Sigue leyendo</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group flex overflow-hidden rounded-2xl bg-cream transition-shadow hover:shadow-lg"
              >
                <div className="relative w-32 shrink-0 overflow-hidden">
                  <WpImage
                    src={r.image}
                    alt={r.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 p-5">
                  <h3 className="text-base font-light text-ink group-hover:text-gold-dark">
                    {r.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-ink/55">
                    {r.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
