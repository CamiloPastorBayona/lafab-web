import { Metadata } from "next";
import { LATINA } from "@/lib/landings/latina";
import LandingPage from "@/components/LandingPage";
import { getLandingCatalog } from "@/lib/landingCatalog";

export const metadata: Metadata = {
  title: "Sofá Latina",
  description:
    "Sofá Latina: base continua en madera de roble, líneas limpias y telas pet friendly y antifluido. Elige medida, material y color, y cómpralo en línea con envío incluido.",
};

export const revalidate = 300;

export default async function LatinaLanding() {
  const catalog = await getLandingCatalog("sofa-latina");
  return <LandingPage data={LATINA} catalog={catalog} />;
}
