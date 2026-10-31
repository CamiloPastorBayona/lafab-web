import { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { TERMINOS, TERMINOS_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos, garantía y devoluciones",
  description:
    "Términos y condiciones de uso del sitio y la tienda de LaFab (Inversiones Correa Rua S.A.S.): pagos, envíos, garantía, devoluciones y derecho de retracto.",
};

export default function TerminosPage() {
  return (
    <LegalDoc
      eyebrow="Información legal"
      title="Términos, garantía y devoluciones"
      updated={TERMINOS_UPDATED}
      sections={TERMINOS}
    />
  );
}
