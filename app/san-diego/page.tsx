import { Metadata } from "next";
import { SANDIEGO, swatchImg } from "@/lib/sandiego";
import WpImage from "@/components/WpImage";
import SanDiegoConfigurator from "@/components/SanDiegoConfigurator";
import Reveal from "@/components/Reveal";
import Ico from "@/components/LandingIcons";
import BondadesSlider from "@/components/BondadesSlider";
import LandingHeader from "@/components/LandingHeader";

const WHATSAPP_SD =
  "https://api.whatsapp.com/send/?phone=573054602395&text=Hola%20LaFab,%20quiero%20info%20del%20Sof%C3%A1%20San%20Diego";

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

      {/* Hero */}
      <section
        id="inicio"
        className="relative -mt-[64px] flex min-h-screen items-center justify-center overflow-hidden bg-ink text-center"
      >
        <WpImage
          src={SANDIEGO.hero}
          alt={SANDIEGO.name}
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <Reveal>
            <h1 className="text-4xl font-light uppercase leading-none tracking-[0.06em] text-white md:text-[76px]">
              {SANDIEGO.name}
            </h1>
            <p className="mt-5 text-base font-light text-white/90 md:text-lg">
              {SANDIEGO.tagline}
            </p>
            <a
              href="#comprar"
              className="mt-10 inline-block rounded-md bg-white px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] text-ink transition-transform hover:scale-105"
            >
              Comprar ahora
            </a>
            <div className="mt-10 flex flex-col items-center gap-2 text-white/70">
              <span className="text-xs uppercase tracking-[0.3em]">Desliza</span>
              <span className="h-10 w-px bg-white/40" />
            </div>
          </Reveal>
        </div>
      </section>

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
      <section id="diseno" className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-28">
        <Reveal>
          <p className={eyebrow}>Por qué el Sofá San Diego</p>
          <h2 className={`mt-3 ${heading}`}>Pensado para la vida real.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SANDIEGO.lifestyle.map((l, i) => (
            <Reveal key={l.title} delay={(i % 2) * 120}>
              <div className="group relative aspect-[16/11] overflow-hidden rounded-2xl">
                <WpImage
                  src={l.img}
                  alt={l.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* botón + */}
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-xl leading-none text-ink transition-transform duration-300 group-hover:rotate-45">
                  +
                </span>
                {/* velo que aparece en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* texto que sube y aparece en hover */}
                <div className="absolute bottom-0 translate-y-3 p-6 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-2xl font-light">{l.title}</h3>
                  <p className="mt-1 text-sm text-white/85">{l.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Telas */}
      <section id="telas" className="bg-cream">
        <div className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-28">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow}>Telas</p>
              <h2 className={`mt-3 ${heading}`}>
                Elige la tela ideal para tu hogar.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-ink/60">
                Dos telas disponibles para compra online, seleccionadas por su
                comodidad, resistencia y facilidad de mantenimiento.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-ink/70">
                <Ico name="shieldCheck" className="h-4 w-4 text-gold" />
                Disponibles para compra online
              </span>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SANDIEGO.telas.map((t, i) => (
              <Reveal key={t.key} delay={i * 120}>
                <div className="h-full rounded-2xl bg-white p-6 md:p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white">
                    <Ico
                      name={t.key === "mon" ? "paw" : "sparkles"}
                      className="h-4 w-4 text-gold"
                    />
                    {t.key === "mon"
                      ? "Recomendada para hogares con mascotas"
                      : "Más elegida"}
                  </span>
                  <h3 className="mt-5 text-3xl font-light text-ink">{t.name}</h3>
                  <p className="mt-3 text-ink/70">{t.desc}</p>
                  <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {t.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2 text-sm text-ink/75">
                        <Ico name={f.icon} className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
                      Colores disponibles
                    </p>
                    <div className="flex gap-4">
                      {t.colors.map((c) => (
                        <div key={c.name} className="flex flex-col items-center gap-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={swatchImg(t.key, c.name)}
                            alt={c.name}
                            className="h-10 w-10 rounded-full border border-ink/10 object-cover"
                            style={{ backgroundColor: c.hex }}
                            loading="lazy"
                          />
                          <span className="text-xs text-ink/50">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-6 border-t border-ink/10 pt-4 text-xs text-ink/50">
                    {t.spec}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-light text-ink/70">
              Todas nuestras telas son seleccionadas por su{" "}
              <span className="text-ink">comodidad</span>,{" "}
              <span className="text-ink">resistencia</span> y{" "}
              <span className="text-ink">facilidad de mantenimiento</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* AquaFobiak */}
      <section className="mx-auto grid max-w-site items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <Reveal>
          <p className={eyebrow}>{SANDIEGO.aqua.eyebrow}</p>
          <h2 className={`mt-3 ${heading}`}>{SANDIEGO.aqua.title}</h2>
          <p className="mt-5 text-ink/70">{SANDIEGO.aqua.text}</p>
          <p className="mt-3 text-sm text-ink/50">{SANDIEGO.aqua.note}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {SANDIEGO.aqua.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70"
              >
                {b}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
              <WpImage
                src={SANDIEGO.aqua.img}
                alt={SANDIEGO.aqua.caption}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-2 text-center text-sm text-ink/50">
              {SANDIEGO.aqua.caption}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Pasos */}
      <section className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-24">
        <Reveal>
          <h2 className={`text-center ${heading}`}>Comprarlo es muy fácil</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:flex lg:divide-x lg:divide-ink/10">
          {SANDIEGO.compra.map((s, i) => (
            <Reveal key={s.title} delay={(i % 6) * 70} className="lg:flex-1">
              <div className="px-4 py-6 text-center">
                <span className="block text-5xl font-light text-ink/20 md:text-6xl">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-base font-light text-ink">{s.title}</h3>
                <p className="mt-1 text-sm text-ink/55">{s.text}</p>
                <span className="mx-auto mt-4 block h-px w-8 bg-gold" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Configurador */}
      <section id="comprar" className="scroll-mt-20">
        <div className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-24">
          <Reveal>
            <div className="mb-10 text-center">
              <p className={eyebrow}>Diseña tu sofá y cómpralo ahora</p>
              <h2 className={`mt-3 ${heading}`}>Sofá San Diego</h2>
            </div>
          </Reveal>
          <Reveal>
            <SanDiegoConfigurator />
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
            {SANDIEGO.seals.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 80}>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-gold">
                    <Ico name={s.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{s.t}</p>
                    <p className="text-xs text-ink/50">{s.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-ink/50">
            <strong className="text-ink/70">Importante:</strong> al realizar esta
            compra, el cliente reconoce que el producto será fabricado de manera
            personalizada según las especificaciones seleccionadas. Conforme al
            artículo 47 de la Ley 1480 de 2011, no aplica el derecho de retracto
            por cambio de opinión, salvo la garantía legal por defectos de
            fabricación.
          </p>
        </div>
      </section>

      {/* Por qué LaFab */}
      <section id="garantia" className="bg-cream">
        <div className="mx-auto max-w-site px-4 py-20 text-center md:px-6 md:py-24">
          <Reveal>
            <p className={eyebrow}>Fábrica propia</p>
            <h2 className={`mt-3 ${heading}`}>¿Por qué elegir LaFab?</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">
              Más de una década creando muebles que se ven bien y duran.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {SANDIEGO.whyLafab.map((w) => (
                <span
                  key={w}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70"
                >
                  {w}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bondades */}
      <section className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-24">
        <Reveal>
          <div className="text-center">
            <p className={eyebrow}>Diseñado para vivirse a diario</p>
            <h2 className={`mt-3 ${heading}`}>Bondades del producto.</h2>
          </div>
        </Reveal>
        <div className="mt-14">
          <BondadesSlider />
        </div>
      </section>

      {/* Vistas */}
      <section id="vistas" className="bg-cream">
        <div className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-24">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow}>Cada detalle pensado para verse bien</p>
              <h2 className={`mt-3 ${heading}`}>
                Míralo desde todos los ángulos.
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {SANDIEGO.vistas.map((v, i) => (
              <Reveal key={v.label} delay={i * 100}>
                <figure className="overflow-hidden rounded-2xl bg-white">
                  <div className="relative aspect-square">
                    <WpImage
                      src={v.img}
                      alt={`Vista ${v.label} del Sofá San Diego`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="py-3 text-center text-sm uppercase tracking-[0.2em] text-ink/50">
                    {v.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
      <section className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-24">
        <Reveal>
          <p className={eyebrow}>Ficha técnica</p>
          <h2 className={`mt-3 ${heading}`}>Especificaciones y garantía</h2>
        </Reveal>
        <Reveal>
          <dl className="mt-10 divide-y divide-ink/10">
            {SANDIEGO.specs.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-1 gap-1 py-4 md:grid-cols-[220px_1fr]"
              >
                <dt className="font-medium text-ink">{s.label}</dt>
                <dd className="text-ink/70">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink/50">
            {SANDIEGO.garantiaNote}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {SANDIEGO.fichaChips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-ink/60"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Opiniones */}
      <section id="opiniones" className="bg-cream">
        <div className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-24">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow}>Opiniones</p>
              <h2 className={`mt-3 ${heading}`}>Lo que dicen nuestros clientes.</h2>
              <p className="mt-3 text-ink/60">
                <span className="font-semibold text-ink">4.9</span>{" "}
                <span className="text-star">★★★★★</span> · 29 opiniones en Google
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS_SD.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 100}>
                <article className="flex h-full flex-col rounded-2xl bg-white p-6">
                  <span className="text-star">★★★★★</span>
                  <p className="mt-4 flex-1 text-ink/75">“{r.text}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 font-semibold text-gold-dark">
                      {r.name.charAt(0)}
                    </span>
                    <div className="text-sm">
                      <strong className="block text-ink">{r.name}</strong>
                      <span className="text-ink/40">vía Google</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

      {/* FAQ */}
      <section id="faqs" className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-24">
        <Reveal>
          <div className="text-center">
            <p className={eyebrow}>Preguntas frecuentes</p>
            <h2 className={`mt-3 ${heading}`}>Resolvemos tus dudas.</h2>
          </div>
        </Reveal>
        <div className="mt-10 divide-y divide-ink/10">
          {SANDIEGO.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg text-ink">
                {item.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-xl leading-none text-gold-dark transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Personalización CTA */}
      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(130%_130%_at_0%_0%,#3a342d_0%,#231f1c_45%,#141210_100%)] px-8 py-14 md:px-14 md:py-20">
            <div className="max-w-xl">
              <p className={eyebrow}>Personalización</p>
              <h2 className="mt-3 text-3xl font-light text-white md:text-5xl">
                ¿Necesitas otra medida, color o configuración?
              </h2>
              <p className="mt-5 text-white/70">
                Podemos fabricar una versión personalizada del Sofá San Diego,
                adaptada a tu espacio, tus medidas y el acabado que estás
                buscando.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#comprar"
                  className="rounded-md bg-gold px-8 py-3 text-sm font-medium uppercase tracking-[0.12em] text-ink transition-transform hover:scale-105"
                >
                  Comprar ahora
                </a>
                <a
                  href={WHATSAPP_SD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/30 px-8 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
                >
                  Hablar con un diseñador
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

const REVIEWS_SD = [
  {
    name: "María Angélica Vergara",
    text:
      "Excelente calidad del sofá, muy cómodo, elegante y con acabados muy bien elaborados. Quedé muy satisfecha con la compra y con el resultado final.",
  },
  {
    name: "Lucía Vélez",
    text:
      "Quedé muy agradecida, llenaron mi expectativa con mi alcoba. Muy feliz, excelente cumplimiento, acabados sensacionales y excelente servicio. ¡Dios los bendiga!",
  },
  {
    name: "Paulina Pérez",
    text:
      "Amé mi sala. Súper recomendado, todo gracias a María por su acompañamiento y asesoría. Les doy un 10 en todo, ¡los mejores!",
  },
  {
    name: "Eder Durán",
    text:
      "Excelente servicio, siempre muy atentos a las sugerencias y nos mantuvieron al tanto de los tiempos. Mandamos a hacer varios muebles y con todos nos fue muy bien.",
  },
  {
    name: "María Estefany Chavarría",
    text:
      "Me encantó el trabajo, me dieron una muy buena asesoría e hicieron realidad lo que tenía en mente. Totalmente recomendados. ¡Muchas gracias!",
  },
  {
    name: "Julián Ramírez",
    text:
      "Mi esposa y yo compramos una mesa y quedamos realmente impresionados. La calidad es excepcional. Muy recomendados.",
  },
];
