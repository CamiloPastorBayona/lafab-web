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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
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
