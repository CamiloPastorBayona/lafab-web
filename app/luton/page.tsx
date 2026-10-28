import { Metadata } from "next";
import { LUTON } from "@/lib/landings/luton";
import LandingPage from "@/components/LandingPage";
import { getLandingCatalog } from "@/lib/landingCatalog";

export const metadata: Metadata = {
  title: "Sofá Luton",
  description:
    "Sofá Luton: líneas contemporáneas, cojines amplios y base en madera de roble. Elige la medida, la tela o el cuero, y cómpralo en línea con envío incluido en Medellín.",
};

export const revalidate = 300;

export default async function LutonLanding() {
  const catalog = await getLandingCatalog("sofa-luton");
  return <LandingPage data={LUTON} catalog={catalog} />;
}
