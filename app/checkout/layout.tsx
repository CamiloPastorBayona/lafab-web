// La página es un componente de cliente y no puede exportar metadata, así que
// va aquí. Sin esto heredaba el título de la portada y quedaba indexable: tres
// URLs del embudo de compra compitiendo en Google con la home.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finalizar compra",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
