// Motor de plantillas de correo. Las plantillas viven en /emails como HTML
// probado en clientes de correo; aquí solo se rellenan, nunca se rediseñan.
//
// Dos mecanismos:
//   {{variable}}                    → reemplazo simple de texto.
//   <!--lf:bloque--> … <!--/lf:bloque-->  → región reemplazable completa
//     (filas de ítems, totales, dirección). Si no se pasa contenido para un
//     bloque, se conserva el de la plantilla; si se pasa "", se elimina.
//
// Convención del asunto: <title>LaFab · Asunto</title>.

import { readFileSync } from "fs";
import { join } from "path";
import { SITE_URL, UPLOADS } from "@/lib/site";

export const TEMPLATES = [
  "pedido-recibido",
  "en-produccion",
  "va-en-camino",
  "pago-pendiente",
  "carrito-abandonado",
  "resena",
  "cuidado",
  "cotizacion",
  "bienvenida",
] as const;

export type TemplateName = (typeof TEMPLATES)[number];

const cache = new Map<TemplateName, string>();

export function loadTemplate(name: TemplateName): string {
  const cached = cache.get(name);
  if (cached) return cached;
  const html = readFileSync(join(process.cwd(), "emails", `${name}.html`), "utf8");
  cache.set(name, html);
  return html;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** El asunto sale del <title>, quitando el prefijo "LaFab · ". */
export function subjectOf(html: string, fallback: string): string {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!m) return fallback;
  return m[1].replace(/^\s*LaFab\s*·\s*/i, "").trim() || fallback;
}

/** Versión en texto plano, para mejorar la entregabilidad. */
export function htmlToText(html: string): string {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return (
    body
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
      // El preheader está oculto en el HTML: en texto plano sobra.
      .replace(/<div style="display:none[\s\S]*?<\/div>/gi, "")
      .replace(/<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
      .replace(/<\/(p|tr|div|h1|h2|h3|li)>/gi, "\n")
      .replace(/<\/td>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .split("\n")
      .map((l) => l.replace(/\s+/g, " ").trim())
      .join("\n")
      // Recién ahora que las líneas están limpias tiene sentido colapsar blancos.
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

export type RenderOptions = {
  /** Valores de {{variable}}. Se escapan salvo que la clave termine en _url. */
  vars?: Record<string, string>;
  /** HTML crudo para cada <!--lf:bloque-->. */
  blocks?: Record<string, string>;
  /** Asunto explícito; por defecto sale del <title>. */
  subject?: string;
};

/**
 * Variables que aplican a todas las plantillas. El logo se resuelve aquí para
 * que no quede ningún dominio escrito a mano dentro del HTML: tras el cutover
 * lafab.com.co deja de servir /wp-content.
 */
function defaultVars(): Record<string, string> {
  return {
    logo_url:
      process.env.MAIL_LOGO_URL || `${UPLOADS}/2022/12/lafab-blanco.png`,
    site_url: SITE_URL,
  };
}

export function render(
  name: TemplateName,
  options: RenderOptions = {}
): { subject: string; html: string; text: string } {
  let html = loadTemplate(name);

  for (const [block, content] of Object.entries(options.blocks || {})) {
    const re = new RegExp(`<!--lf:${block}-->[\\s\\S]*?<!--/lf:${block}-->`, "g");
    html = html.replace(re, content);
  }

  for (const [key, value] of Object.entries({ ...defaultVars(), ...(options.vars || {}) })) {
    // Las URLs van dentro de href="…": solo hay que neutralizar las comillas.
    const safe = key.endsWith("_url")
      ? String(value).replace(/"/g, "%22")
      : escapeHtml(String(value));
    html = html.split(`{{${key}}}`).join(safe);
  }

  // Cualquier placeholder que quede sin valor se vacía: es peor que el cliente
  // vea "{{order_number}}" a que vea un hueco.
  html = html.replace(/\{\{[a-z_]+\}\}/gi, "");

  return {
    subject: options.subject || subjectOf(html, "LaFab"),
    html,
    text: htmlToText(html),
  };
}
