import { Metadata } from "next";
import { SANDIEGO_LANDING } from "@/lib/sandiego";
import LandingPage from "@/components/LandingPage";
import { getLandingCatalog } from "@/lib/landingCatalog";

export const metadata: Metadata = {
  title: "Sofá San Diego",
  description:
    "Sofá San Diego: confort superior, fabricación propia y telas pet friendly y antifluido. Elige medida, material y color, y cómpralo en línea con envío incluido.",
};

export const revalidate = 300;

// La landing vende con los precios y las opciones de la tienda: lee las
// variaciones reales del CMS, igual que /luton y /latina. Si el CMS no
// responde, el configurador se muestra con su contenido estático.
export default async function SanDiegoLanding() {
  const catalog = await getLandingCatalog("sofa-san-diego");
  return <LandingPage data={SANDIEGO_LANDING} catalog={catalog} />;
}
