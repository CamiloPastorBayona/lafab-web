// /contacto es un componente de cliente, así que no puede exportar metadata.
// Sin esta capa heredaba el title y la description de la portada: dos páginas
// distintas compitiendo en Google con el mismo texto.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp o visítanos en el showroom de Itagüí. Te ayudamos con medidas, telas y tiempos de entrega de tu mueble a la medida.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
