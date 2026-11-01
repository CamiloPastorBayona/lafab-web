import WpImage from "@/components/WpImage";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-14 pt-28 text-white">
      {image && (
        <>
          {/* Esta foto es el elemento LCP de /shop y de las landings de ciudad.
              Iba como <img> pelado, sin srcSet ni sizes, así que bajaba el
              original del CMS (670 KB, 2062x2560) para pintarlo en una franja
              de 390 px de ancho: nueve segundos de LCP en móvil. El srcset ya
              existía en lib/imagenes.ts y nadie lo estaba usando.
              El sizes va deliberadamente corto: encima hay un degradado al 90%
              de opacidad, así que un candidato pequeño no se nota. */}
          <WpImage
            src={image}
            alt=""
            sizes="(min-width: 1024px) 60vw, 70vw"
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/45" />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-site px-4 md:px-6">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold-light">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-light md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/70">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
