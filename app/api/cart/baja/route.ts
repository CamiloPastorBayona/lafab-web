// Baja de los recordatorios de carrito abandonado (List-Unsubscribe y enlace
// del pie del correo). Responde HTML porque se abre desde el correo.

import { NextRequest, NextResponse } from "next/server";
import { optOut } from "@/lib/abandonedCarts";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function page(title: string, message: string, status: number) {
  return new NextResponse(
    `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;background:#F4F1EC;font-family:Helvetica,Arial,sans-serif;color:#151515;">
<div style="max-width:520px;margin:12vh auto;padding:40px 32px;background:#fff;border-radius:16px;text-align:center;">
<div style="font-size:20px;letter-spacing:6px;font-weight:600;">LAFAB</div>
<h1 style="font-size:22px;margin:24px 0 12px;">${title}</h1>
<p style="color:#4A4A4A;line-height:1.6;margin:0 0 24px;">${message}</p>
<a href="${SITE_URL}" style="display:inline-block;background:#151515;color:#fff;text-decoration:none;padding:13px 30px;border-radius:999px;font-weight:600;font-size:14px;">Volver a LaFab</a>
</div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

async function handle(id: string) {
  if (!/^[a-f0-9]{24}$/.test(id)) {
    return page("Enlace inválido", "No pudimos identificar tu suscripción.", 400);
  }
  const done = await optOut(id);
  return done
    ? page("Listo", "No volverás a recibir recordatorios de carrito. Los correos de tus pedidos sí seguirán llegando.", 200)
    : page("No encontramos el registro", "Es posible que ya se haya dado de baja o que el enlace haya caducado.", 404);
}

export async function GET(req: NextRequest) {
  return handle(req.nextUrl.searchParams.get("id") || "");
}

// List-Unsubscribe-Post: Gmail y Outlook hacen POST al botón de "cancelar suscripción".
export async function POST(req: NextRequest) {
  return handle(req.nextUrl.searchParams.get("id") || "");
}
