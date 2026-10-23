import { NextRequest, NextResponse } from "next/server";
import { CLAVE_PREVIA, COOKIE_PREVIA, yaLanzamos } from "@/lib/lanzamiento";

// Rutas que nunca deben caer en la cuenta regresiva.
// /api sostiene el carrito y el checkout; /fonts es el rewrite de la fuente de marca.
const LIBRES = ["/api", "/_next", "/fonts", "/proximamente"];

// robots.txt, sitemap.xml, imágenes, fuentes: pasan derecho.
const ARCHIVOS = /\.(?:ico|png|jpe?g|webp|avif|svg|gif|woff2?|ttf|txt|xml|json|mp4|webm)$/i;

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

  // El equipo ve el sitio real entrando una vez con ?ver=lafab en cualquier URL.
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
  if (req.cookies.get(COOKIE_PREVIA)?.value === "1") {
    return sinIndexar(NextResponse.next());
  }

  if (
    LIBRES.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    ARCHIVOS.test(pathname)
  ) {
    return sinIndexar(NextResponse.next());
  }

  const destino = req.nextUrl.clone();
  destino.pathname = "/proximamente";
  destino.search = "";
  return sinIndexar(NextResponse.rewrite(destino));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
