import { getProducts, type WCProduct } from "@/lib/woocommerce";
import { SHIPPING_NATIONAL_COST } from "@/lib/shipping";
import { catLabel } from "@/lib/categories";

// Catálogo para Google Merchant Center, que es lo que alimenta las fichas
// gratuitas de Google Shopping. Se publica como RSS 2.0 con el espacio de
// nombres de Google, que es el formato que Merchant Center lee sin
// configuración adicional.
//
// Una fila por producto, no por variación: la ficha del sitio abre siempre en
// la combinación más económica, así que el precio del feed es el mismo que ve
// quien llega desde Google. Si no coincidieran, Merchant Center rechaza el
// producto, y con razón.
//
// Se regenera cada seis horas, así que un cambio de precio en el CMS llega
// solo. No hay que volver a subir nada.
export const revalidate = 21600;

const SITIO = "https://lafab.com.co";

/** Escapa lo que no puede ir suelto dentro de un XML. */
function xml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Quita etiquetas HTML y deja un párrafo limpio. */
function soloTexto(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Precio en el formato que Google espera: "3500000 COP". */
const precio = (valor: number) => `${Math.round(valor)} COP`;

function entrada(p: WCProduct): string | null {
  const foto = p.images?.[0]?.src;
  if (!foto) return null;

  // El precio tachado y el vigente. Si no hay oferta, van iguales y Google
  // simplemente no muestra descuento.
  const vigente = Number(p.prices.price) || 0;
  const normal = Number(p.prices.regular_price) || vigente;
  if (!vigente) return null;

  const descripcion =
    soloTexto(p.short_description) ||
    soloTexto(p.description) ||
    `${p.name} fabricado a la medida por LaFab en Medellín, con envío a todo el país.`;

  const categorias = (p.categories ?? []).map((c) => catLabel(c.name)).filter(Boolean);
  const ruta = categorias.length ? `Muebles > ${categorias[0]}` : "Muebles";

  const extras = (p.images ?? [])
    .slice(1, 11)
    .map((i) => `    <g:additional_image_link>${xml(i.src)}</g:additional_image_link>`)
    .join("\n");

  return `  <item>
    <g:id>${xml(p.sku || String(p.id))}</g:id>
    <title>${xml(p.name)}</title>
    <description>${xml(descripcion.slice(0, 4800))}</description>
    <link>${SITIO}/producto/${xml(p.slug)}</link>
    <g:image_link>${xml(foto)}</g:image_link>
${extras}
    <g:availability>${p.is_in_stock ? "in_stock" : "out_of_stock"}</g:availability>
    <g:price>${precio(normal)}</g:price>${
      vigente < normal ? `\n    <g:sale_price>${precio(vigente)}</g:sale_price>` : ""
    }
    <g:condition>new</g:condition>
    <g:brand>LaFab</g:brand>
    <g:mpn>${xml(p.sku || String(p.id))}</g:mpn>
    <g:product_type>${xml(ruta)}</g:product_type>
    <g:shipping>
      <g:country>CO</g:country>
      <g:service>Envío a domicilio</g:service>
      <g:price>${precio(SHIPPING_NATIONAL_COST)}</g:price>
    </g:shipping>
    <g:shipping_label>mueble</g:shipping_label>
  </item>`;
}

export async function GET() {
  // Si el CMS tropieza, se devuelve un feed vacío pero válido: Merchant Center
  // prefiere eso a un 500, que cuenta como error de obtención.
  const productos = await getProducts({ per_page: 100 }).catch((e) => {
    console.error("[lafab] feed de Merchant Center sin productos:", e);
    return [] as WCProduct[];
  });

  const items = productos
    .filter((p) => p.type !== "variation")
    .map(entrada)
    .filter(Boolean)
    .join("\n");

  const cuerpo = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>LaFab · Muebles a la medida</title>
  <link>${SITIO}</link>
  <description>Sofás, comedores, alcobas y poltronas fabricados a la medida en Itagüí, con envío a todo Colombia.</description>
${items}
</channel>
</rss>`;

  return new Response(cuerpo, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}
