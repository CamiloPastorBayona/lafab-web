/* Imagen responsiva servida directamente desde WordPress.
   Usa el srcset que ya genera WP (tamaños -700, -1024, etc.), así el navegador
   descarga solo el tamaño que necesita — rápido y sin pasar por el optimizador
   de Next (que el host corta con ECONNRESET).

   Si no se le pasa srcSet, lo busca en lib/imagenes.ts, el mapa que sacamos del
   CMS. Sin él, una foto del taller de 1122 px se bajaba entera para pintarla en
   una celda de 300. */

import { srcSetDe } from "@/lib/imagenes";

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
  const auto = srcSet || srcSetDe(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={auto || undefined}
      // Sin `sizes` el navegador da por hecho que la imagen ocupa todo el ancho
      // y se baja la más grande, con lo que el srcset no sirve de nada.
      sizes={sizes || (auto ? "100vw" : undefined)}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
