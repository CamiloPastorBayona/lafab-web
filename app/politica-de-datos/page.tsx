import { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { POLITICA, POLITICA_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de tratamiento y protección de datos personales",
  description:
    "Política de tratamiento y protección de datos personales de LaFab (Inversiones Correa Rua S.A.S.), conforme a la Ley 1581 de 2012.",
};

export default function PoliticaPage() {
  return (
    <LegalDoc
      eyebrow="Información legal"
      title="Política de tratamiento de datos"
      updated={POLITICA_UPDATED}
      sections={POLITICA}
    />
  );
}
