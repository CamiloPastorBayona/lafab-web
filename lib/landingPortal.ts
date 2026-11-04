// Contenido de las landings editado en el Portal (pestaña Landing).
//
// La web parte de su contenido fijo (lib/sandiego.ts y lib/landings/*) y le
// pone encima lo que el Portal tenga para ese producto: textos, sellos, fotos
// de portada, vistas, historia y ambientes, ficha técnica y preguntas. Si el
// Portal no responde o no tiene un dato, se queda el contenido fijo, así la
// landing nunca se cae por el Portal.

import type { Landing } from "@/lib/sandiego";
import { ETIQUETA_TIENDA } from "@/lib/woocommerce";

const PORTAL = (process.env.PORTAL_URL || "https://lafab-portal.vercel.app").replace(/\/$/, "");

type DelPortal = {
  nombre: string;
  tagline: string | null;
  sellos: string[];
  portada: string | null;
  fichaTecnica: string | null;
  vistas: { img: string; titulo: string }[];
  historia: { img: string; titulo: string; texto: string }[];
  ambientes: { img: string; titulo: string; texto: string }[];
  especificaciones: { etiqueta: string; valor: string }[];
  preguntas: { pregunta: string; respuesta: string }[];
};

async function leerPortal(slug: string): Promise<DelPortal | null> {
  try {
    const res = await fetch(`${PORTAL}/api/web/landing?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300, tags: [ETIQUETA_TIENDA] },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return (await res.json()) as DelPortal;
  } catch (e) {
    console.error("[lafab] landing del Portal", slug, e);
    return null;
  }
}

const dosDigitos = (i: number) => String(i + 1).padStart(2, "0");

export async function conPortal(base: Landing, slug: string): Promise<Landing> {
  const p = await leerPortal(slug);
  if (!p) return base;

  // Las filas de arriba de la ficha son las medidas y la construcción; las de
  // abajo, telas, colores, garantía y envíos.
  const specs = p.especificaciones.filter((e) => e.etiqueta && e.valor);
  const corte = Math.min(specs.length, Math.max(base.specsTop.length, Math.ceil(specs.length / 2)));

  return {
    ...base,
    name: p.nombre || base.name,
    tagline: p.tagline || base.tagline,
    hero: p.portada || base.hero,
    specsImage: p.fichaTecnica || base.specsImage,
    heroBadges: p.sellos.length
      ? p.sellos.map((label, i) => ({ label, icon: base.heroBadges[i]?.icon ?? "award" }))
      : base.heroBadges,
    vistas: p.vistas.length ? p.vistas.map((v) => ({ img: v.img, label: v.titulo })) : base.vistas,
    bondades: p.historia.length
      ? p.historia.map((h, i) => ({ img: h.img, n: dosDigitos(i), title: h.titulo, sub: h.texto }))
      : base.bondades,
    lifestyle: p.ambientes.length
      ? p.ambientes.map((a) => ({ img: a.img, title: a.titulo, text: a.texto }))
      : base.lifestyle,
    specs: specs.length ? specs.slice(0, 4).map((e) => ({ label: e.etiqueta, value: e.valor })) : base.specs,
    specsTop: specs.length ? specs.slice(0, corte).map((e) => ({ key: e.etiqueta, val: e.valor })) : base.specsTop,
    specsBottom: specs.length ? specs.slice(corte).map((e) => ({ key: e.etiqueta, val: e.valor })) : base.specsBottom,
    faq: p.preguntas.length ? p.preguntas.map((f) => ({ q: f.pregunta, a: f.respuesta })) : base.faq,
  };
}
