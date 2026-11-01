// Proxy server-side a la Store API de WooCommerce para el checkout headless.
// - Evita CORS (el navegador llama a /api/store/*, no a WordPress).
// - Mantiene el carrito con el "Cart-Token" guardado en una cookie httpOnly.
// - No expone credenciales (Basic Auth opcional para staging).
// El nonce no se necesita: en WordPress activamos
// woocommerce_store_api_disable_nonce_check y la continuidad la da el Cart-Token.

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STORE_URL = (
  process.env.NEXT_PUBLIC_WC_STORE_URL || "https://cms.lafab.com.co"
).replace(/\/$/, "");
const BASIC_AUTH = process.env.WC_STORE_BASIC_AUTH;
const TOKEN_COOKIE = "lafab_cart_token";

// Rutas que el checkout usa de verdad, con los métodos que necesita de cada
// una. Antes el proxy reenviaba GET, POST, PUT y DELETE a CUALQUIER ruta bajo
// /wp-json/wc/store/v1/, sin autenticación y sin límite: con el nonce check
// desactivado en WordPress, cualquiera podía crear pedidos reales en bucle,
// llenar la base de pedidos basura, disparar correos y tumbar el CMS.
const PERMITIDO: Record<string, string[]> = {
  products: ["GET"],
  cart: ["GET"],
  "cart/items": ["GET", "DELETE"],
  "cart/add-item": ["POST"],
  "cart/remove-item": ["POST"],
  "cart/update-item": ["POST"],
  "cart/update-customer": ["POST"],
  "cart/select-shipping-rate": ["POST"],
  "cart/apply-coupon": ["POST"],
  "cart/remove-coupon": ["POST"],
  checkout: ["GET", "POST"],
};

/** La ruta pedida, o null si no está en la lista. */
function rutaPermitida(path: string[], metodo: string): string | null {
  const ruta = path.join("/");
  // /order/123 lleva un id variable, así que se comprueba aparte.
  if (/^order\/\d+$/.test(ruta)) return metodo === "GET" ? ruta : null;
  const metodos = PERMITIDO[ruta];
  return metodos && metodos.includes(metodo) ? ruta : null;
}

async function proxy(req: NextRequest, path: string[]) {
  const ruta = rutaPermitida(path, req.method);
  if (!ruta) {
    return NextResponse.json({ code: "lafab_no_route" }, { status: 404 });
  }
  const target = `${STORE_URL}/wp-json/wc/store/v1/${ruta}${req.nextUrl.search}`;
  const token = req.cookies.get(TOKEN_COOKIE)?.value;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers["Cart-Token"] = token;
  if (BASIC_AUTH) {
    headers["Authorization"] = `Basic ${Buffer.from(BASIC_AUTH).toString("base64")}`;
  }

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "DELETE") {
    body = await req.text();
    if (body) headers["Content-Type"] = "application/json";
  }

  const upstream = await fetch(target, { method: req.method, headers, body });
  const text = await upstream.text();

  const res = new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });

  // Persistir el Cart-Token que devuelva WooCommerce para las próximas llamadas.
  const newToken = upstream.headers.get("Cart-Token");
  if (newToken && newToken !== token) {
    res.cookies.set(TOKEN_COOKIE, newToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }
  return res;
}

type Ctx = { params: { path: string[] } };

export async function GET(req: NextRequest, { params }: Ctx) {
  return proxy(req, params.path);
}
export async function POST(req: NextRequest, { params }: Ctx) {
  return proxy(req, params.path);
}
export async function PUT(req: NextRequest, { params }: Ctx) {
  return proxy(req, params.path);
}
export async function DELETE(req: NextRequest, { params }: Ctx) {
  return proxy(req, params.path);
}
