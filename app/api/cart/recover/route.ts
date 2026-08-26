// Devuelve los ítems guardados de un carrito para que la página /recuperar
// los reponga en el carrito local del navegador.

import { NextRequest, NextResponse } from "next/server";
import { getCart } from "@/lib/abandonedCarts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || "";
  if (!/^[a-f0-9]{24}$/.test(id)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const cart = await getCart(id);
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  // Solo los ítems: no devolvemos el correo ni el estado del registro.
  return NextResponse.json({ ok: true, items: cart.items });
}
