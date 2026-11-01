import { Metadata } from "next";
import { VITTORIO } from "@/lib/landings/vittorio";
import LandingPage from "@/components/LandingPage";
import { getLandingCatalog } from "@/lib/landingCatalog";

export const metadata: Metadata = {
  title: "Sofá Vittorio",
  description:
    "Sofá Vittorio: inspiración italiana, silueta baja y base completa en madera de roble. Disponible en 1.90, 2.10 y 2.40 m, en tela o cuero.",
  // Esta landing estaba publicada a medias: responde 200 pero no está en el
  // sitemap ni la enlaza nadie, porque repite la misma foto en las 14
  // posiciones (ver el comentario de lib/landings.ts). Hasta que lleguen las
  // fotos, mejor fuera del índice que dentro con una página pobre. Cuando las
  // haya: quitar este robots y descomentar la línea de LANDING_BY_SLUG.
  robots: { index: false, follow: true },
};

export const revalidate = 300;

export default async function VittorioLanding() {
  const catalog = await getLandingCatalog("sofa-vittorio");
  return <LandingPage data={VITTORIO} catalog={catalog} />;
}
