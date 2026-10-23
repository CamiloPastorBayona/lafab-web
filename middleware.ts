import { NextRequest, NextResponse } from "next/server";
import { CLAVE_PREVIA, COOKIE_PREVIA, yaLanzamos } from "@/lib/lanzamiento";

// Mientras no haya abierto, ninguna respuesta debe ser indexable. Va por
// cabecera y no por <meta>, porque el middleware corre en cada petición: así
// el sitio se vuelve indexable solo al llegar la hora, sin redesplegar nada.
function sinIndexar(res: NextResponse) {
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export function middleware(req: NextRequest) {
  // Desde el lanzamiento el sitio queda normal, sin que nadie tenga que tocar nada.
  if (yaLanzamos()) return NextResponse.next();

  const { pathname, searchParams } = req.nextUrl;

  // Con ?ver=lafab en cualquier URL también se ve la portada real, no el contador.
  if (searchParams.get("ver") === CLAVE_PREVIA) {
    const limpia = req.nextUrl.clone();
    limpia.searchParams.delete("ver");
    const res = NextResponse.redirect(limpia);
    res.cookies.set(COOKIE_PREVIA, "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
      sameSite: "lax",
    });
    return sinIndexar(res);
  }

  // Solo la portada muestra la cuenta regresiva. Tienda, fichas, landings,
  // carrito y checkout funcionan normal, para poder seguir trabajando y
  // probando sobre producción durante estos días.
  const esPortada = pathname === "/";
  const conPrevia = req.cookies.get(COOKIE_PREVIA)?.value === "1";
  if (!esPortada || conPrevia) return sinIndexar(NextResponse.next());

  const destino = req.nextUrl.clone();
  destino.pathname = "/proximamente";
  destino.search = "";
  return sinIndexar(NextResponse.rewrite(destino));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
