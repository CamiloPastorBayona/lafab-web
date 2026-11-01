// Calificación agregada en datos estructurados.
//
// Vivía en el JSON-LD global del layout, así que se emitía en las 86 páginas,
// incluidas 17 sin una sola reseña a la vista (el carrito, el checkout, los
// términos). La política de fragmentos de reseña de Google exige que lo
// valorado esté visible en la misma página, y saltársela se castiga con una
// acción manual sobre el dominio entero. Ahora lo emiten los propios bloques
// de reseñas: donde se ven, se declaran; donde no, no existe.

import { REVIEWS_SUMMARY } from "@/lib/content";

const DATOS = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": "https://lafab.com.co/#negocio",
  name: "LaFab · La Fábrica de Muebles",
  url: "https://lafab.com.co",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(REVIEWS_SUMMARY.rating),
    reviewCount: String(REVIEWS_SUMMARY.count),
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RatingJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(DATOS) }}
    />
  );
}

// JSON.stringify no escapa "<", así que un texto del CMS con "</script" cerraría
// la etiqueta y lo que siguiera se ejecutaría como JavaScript.
export function jsonLd(datos: unknown): string {
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}
