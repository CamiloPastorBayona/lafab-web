import { Metadata } from "next";
import { LATINA } from "@/lib/landings/latina";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Sofá Latina",
  description:
    "Sofá Latina: base continua en madera de roble, líneas limpias y telas pet friendly y antifluido. Elige medida, material y color, y cómpralo en línea con envío incluido.",
};

export default function LatinaLanding() {
  return <LandingPage data={LATINA} />;
}
