import { Metadata } from "next";
import { VITTORIO } from "@/lib/landings/vittorio";
import LandingPage from "@/components/LandingPage";
import { getLandingCatalog } from "@/lib/landingCatalog";

export const metadata: Metadata = {
  title: "Sofá Vittorio",
  description:
    "Sofá Vittorio: inspiración italiana, silueta baja y base completa en madera de roble. Disponible en 1.90, 2.10 y 2.40 m, en tela o cuero.",
};

export const revalidate = 300;

export default async function VittorioLanding() {
  const catalog = await getLandingCatalog("sofa-vittorio");
  return <LandingPage data={VITTORIO} catalog={catalog} />;
}
