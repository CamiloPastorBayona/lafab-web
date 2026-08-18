import { Metadata } from "next";
import { SANDIEGO } from "@/lib/sandiego";
import WpImage from "@/components/WpImage";
import SanDiegoConfigurator from "@/components/SanDiegoConfigurator";
import Reveal from "@/components/Reveal";
import Ico from "@/components/LandingIcons";
import LandingHeader from "@/components/LandingHeader";
import SanDiegoBondades from "@/components/SanDiegoBondades";
import SanDiegoViews from "@/components/SanDiegoViews";
import SanDiegoSpecs from "@/components/SanDiegoSpecs";
import SanDiegoReviews from "@/components/SanDiegoReviews";
import SanDiegoFaq from "@/components/SanDiegoFaq";
import SanDiegoCustom from "@/components/SanDiegoCustom";
import SanDiegoHero from "@/components/SanDiegoHero";
import SanDiegoLifestyle from "@/components/SanDiegoLifestyle";
import SanDiegoFabrics from "@/components/SanDiegoFabrics";
import SanDiegoWhy from "@/components/SanDiegoWhy";
import TrackView from "@/components/TrackView";

export const metadata: Metadata = {
  title: "Sofá San Diego",
  description:
    "Sofá San Diego: confort superior, fabricación propia y telas Pet Friendly antifluidos. Elige medida, material y color, y cómpralo en línea con envío incluido.",
};

const eyebrow =
  "text-xs md:text-sm font-medium uppercase tracking-[0.28em] text-gold";
const heading = "font-light text-3xl md:text-5xl text-ink";

export default function SanDiegoLanding() {
  return (
    <div className="font-morality">
      <LandingHeader productName="Sofá San Diego" />
      <TrackView id={SANDIEGO.productId} name={SANDIEGO.name} price={SANDIEGO.price} />

      {/* Hero */}
      <SanDiegoHero />

      {/* Badges */}
      <section className="bg-[#1a1a1a]">
        <div className="mx-auto flex max-w-site flex-wrap justify-center gap-x-6 gap-y-8 px-4 py-10 md:px-6">
          {SANDIEGO.heroBadges.map((b) => (
            <div
              key={b.label}
              className="flex w-24 flex-col items-center gap-2 text-center md:w-32"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 text-gold">
                <Ico name={b.icon} className="h-6 w-6" />
              </span>
              <span className="text-sm leading-tight text-white/85">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle */}
      <SanDiegoLifestyle />

      {/* Telas + AquaFobiak */}
      <SanDiegoFabrics />

      {/* Pasos */}
      <section className="bg-cream">
        <div className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-24">
          <Reveal>
            <h2 className={`text-center ${heading}`}>Comprarlo es muy fácil</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:flex lg:divide-x lg:divide-ink/10">
            {SANDIEGO.compra.map((s, i) => (
              <Reveal key={s.title} delay={(i % 6) * 70} className="lg:flex-1">
                <div className="px-4 py-6 text-center">
                  <span className="block text-5xl font-light text-ink/25 md:text-6xl">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-base font-light text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink/55">{s.text}</p>
                  <span className="mx-auto mt-4 block h-px w-8 bg-gold" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Configurador de compra (conectado a nuestro carrito + /checkout) */}
      <SanDiegoConfigurator />

      {/* Por qué LaFab */}
      <SanDiegoWhy />

      {/* Bondades */}
      <SanDiegoBondades />

      {/* Vistas */}
      <SanDiegoViews />

      {/* Taller */}
      <section className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-28">
        <Reveal>
          <p className={eyebrow}>Fabricado por LaFab</p>
          <h2 className={`mt-3 ${heading}`}>
            Diseñado y fabricado por nosotros.
          </h2>
          <p className="mt-4 max-w-2xl text-ink/60">
            Cada Sofá San Diego nace en nuestro taller en Itagüí. Del corte a la
            tapicería controlamos cada detalle, para que se vea y dure como debe.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SANDIEGO.taller.map((t, i) => (
            <Reveal key={t.n} delay={i * 100}>
              <div>
                <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl">
                  <WpImage
                    src={t.img}
                    alt={t.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm text-ink">
                    {t.n}
                  </span>
                </div>
                <h3 className="text-xl font-light text-ink">{t.title}</h3>
                <p className="text-sm text-ink/60">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {SANDIEGO.tallerChips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-ink/60"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Ficha técnica */}
      <SanDiegoSpecs />

      {/* Opiniones */}
      <SanDiegoReviews />

      {/* CTA intermedio */}
      <section className="bg-cream">
        <div className="mx-auto max-w-site px-4 pb-20 text-center md:px-6 md:pb-24">
          <Reveal>
            <h2 className={heading}>¿Listo para disfrutar tu Sofá San Diego?</h2>
            <a
              href="#comprar"
              className="mt-8 inline-block rounded-md bg-ink px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-transform hover:scale-105"
            >
              Comprar ahora
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ (acordeón, uno a la vez) */}
      <SanDiegoFaq />

      {/* Personalización CTA */}
      <SanDiegoCustom />
    </div>
  );
}
