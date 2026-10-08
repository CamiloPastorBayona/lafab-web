// Parte la descripción larga que viene de WooCommerce (generada desde el Excel
// oficial de LaFab) en secciones para mostrarlas en pestañas.
//
// El formato que trae el contenido es siempre el mismo:
//   <h2>Características del Sofá X</h2>  → título de la sección
//   <p>…</p> …                            → pestaña "Descripción"
//   <h3>Ficha técnica</h3><ul>…</ul>      → pestaña "Ficha técnica"
//   <h3>Garantía</h3><ul>…</ul>           → pestaña "Garantía"
//   <h3>Entrega y envío</h3><p>…</p>      → pestaña "Envío"
//
// Si un producto no trae <h3> (catálogo viejo), devolvemos una sola sección y la
// ficha se ve como siempre, sin pestañas.

export type SectionVariant = "prose" | "specs" | "list";

export interface DocSection {
  key: string;
  label: string;
  html: string;
  variant: SectionVariant;
}

const stripTags = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Nombres cortos para la pestaña (el glosario manda: envío, nunca despacho).
function tabLabel(heading: string): string {
  const h = heading.toLowerCase();
  if (h.includes("ficha") || h.includes("técnic") || h.includes("tecnic"))
    return "Ficha técnica";
  if (h.includes("garant")) return "Garantía";
  if (h.includes("envío") || h.includes("envio") || h.includes("entrega"))
    return "Envío";
  return heading;
}

function variantFor(label: string): SectionVariant {
  if (label === "Ficha técnica") return "specs";
  if (label === "Garantía") return "list";
  return "prose";
}

const hasContent = (html: string) => stripTags(html).length > 0;

export function splitDescription(html: string): {
  title: string | null;
  sections: DocSection[];
} {
  if (!html || !html.trim()) return { title: null, sections: [] };

  let rest = html.trim();
  let title: string | null = null;

  const h2 = rest.match(/^<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (h2) {
    title = stripTags(h2[1]) || null;
    rest = rest.slice(h2[0].length);
  }

  const parts = rest.split(/(<h3[^>]*>[\s\S]*?<\/h3>)/i);
  const sections: DocSection[] = [];

  const intro = parts[0] ?? "";
  if (hasContent(intro)) {
    sections.push({
      key: "descripcion",
      label: "Descripción",
      html: intro,
      variant: "prose",
    });
  }

  for (let i = 1; i < parts.length; i += 2) {
    const heading = stripTags(parts[i]);
    const body = parts[i + 1] ?? "";
    if (!heading || !hasContent(body)) continue;
    const label = tabLabel(heading);
    sections.push({
      key: slug(label) || `seccion-${i}`,
      label,
      html: body,
      variant: variantFor(label),
    });
  }

  return { title, sections };
}
