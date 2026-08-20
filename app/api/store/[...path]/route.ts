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
  process.env.NEXT_PUBLIC_WC_STORE_URL || "https://lafab.com.co"
).replace(/\/$/, "");
const BASIC_AUTH = process.env.WC_STORE_BASIC_AUTH;
const TOKEN_COOKIE = "lafab_cart_token";

async function proxy(req: NextRequest, path: string[]) {
  const target = `${STORE_URL}/wp-json/wc/store/v1/${path.join("/")}${req.nextUrl.search}`;
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
