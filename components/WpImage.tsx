/* Imagen responsiva servida directamente desde WordPress.
   Usa el srcset que ya genera WP (tamaños -700, -1024, etc.), así el navegador
   descarga solo el tamaño que necesita — rápido y sin pasar por el optimizador
   de Next (que el host corta con ECONNRESET). */

export default function WpImage({
  src,
  srcSet,
  sizes,
  alt,
  className,
  priority = false,
}: {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet || undefined}
      sizes={sizes || undefined}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
