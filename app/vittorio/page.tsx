import { Metadata } from "next";
import { VITTORIO } from "@/lib/landings/vittorio";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Sofá Vittorio",
  description:
    "Sofá Vittorio: inspiración italiana, silueta baja y base completa en madera de roble. Disponible en 1.90, 2.10 y 2.40 m, en tela o cuero.",
};

export default function VittorioLanding() {
  return <LandingPage data={VITTORIO} />;
}
