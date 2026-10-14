import { Metadata } from "next";
import { SANDIEGO_LANDING } from "@/lib/sandiego";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Sofá San Diego",
  description:
    "Sofá San Diego: confort superior, fabricación propia y telas pet friendly y antifluido. Elige medida, material y color, y cómpralo en línea con envío incluido.",
};

export default function SanDiegoLanding() {
  return <LandingPage data={SANDIEGO_LANDING} />;
}
