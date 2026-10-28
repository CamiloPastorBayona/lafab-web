import { Metadata } from "next";
import { SANDIEGO_LANDING } from "@/lib/sandiego";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Sofá San Diego",
  description:
    "Sofá San Diego: confort superior, fabricación propia y telas pet friendly y antifluido. Elige medida, material y color, y cómpralo en línea con envío incluido.",
};

// La landing del San Diego queda tal como se publicó: no lee el catálogo del
// CMS, conserva sus telas y su precio. Es decisión de Mauricio y Camilo; si
// algún día se quiere que siga al catálogo como /luton y /latina, basta con
// pasarle el catalog de getLandingCatalog("sofa-san-diego").
export default function SanDiegoLanding() {
  return <LandingPage data={SANDIEGO_LANDING} />;
}
