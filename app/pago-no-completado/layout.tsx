// Como /gracias: la página es cliente y no puede exportar metadata, y una URL
// del embudo no tiene por qué competir en Google con el resto del sitio.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El pago no se completó",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
