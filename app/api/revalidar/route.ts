import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { ETIQUETA_TIENDA } from "@/lib/woocommerce";

/**
 * Lo llama el Portal cada vez que un producto cambia en la tienda, ya sea
 * desde el Portal o desde WordPress. Borra la caché de los datos de la tienda
 * y de todas las páginas, así el siguiente visitante ve los precios y textos
 * nuevos.
 *
 * Se protege con REVALIDAR_SECRET (solo servidor), que debe ser la misma
 * frase en este proyecto y en el del Portal.
 */
export async function POST(req: Request) {
  const secreto = process.env.REVALIDAR_SECRET;
  if (!secreto) return NextResponse.json({ error: "Falta REVALIDAR_SECRET." }, { status: 500 });
  const recibido = Buffer.from(req.headers.get("x-revalidar-secreto") ?? "");
  const esperado = Buffer.from(secreto);
  if (recibido.length !== esperado.length || !timingSafeEqual(recibido, esperado)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  revalidateTag(ETIQUETA_TIENDA);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, en: new Date().toISOString() });
}
