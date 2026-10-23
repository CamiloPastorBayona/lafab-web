import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";
import Analytics from "@/components/Analytics";
import WhatsAppFab from "@/components/WhatsAppFab";
import ImageGuard from "@/components/ImageGuard";
import IntroLoader from "@/components/IntroLoader";
import { REVIEWS_SUMMARY } from "@/lib/content";
import { STORE_URL } from "@/lib/woocommerce";
import { UPLOADS } from "@/lib/cms";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// La indexación la gobierna el middleware con la cabecera X-Robots-Tag: corre en
// cada petición, así que el sitio se abre a los buscadores solo en el instante
// del lanzamiento, sin que haya que redesplegar ni tocar una variable.

export const metadata: Metadata = {
  metadataBase: new URL("https://lafab.com.co"),
  title: {
    default: "LaFab | Muebles a la medida en Medellín",
    template: "%s | LaFab",
  },
  description:
    "Fabricamos muebles a la medida en Medellín: sofás, comedores, camas y closets. Diseño propio, materiales de calidad y envío a todo el país.",
  icons: {
    icon: `${UPLOADS}/2024/11/cropped-favicon-lafab-270x270.png`,
  },
  robots: { index: true, follow: true },
  // Canónica siempre al dominio propio: el alias *.vercel.app no compite.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "LaFab",
  },
};

const BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "LaFab · La Fábrica de Muebles",
  image:
    `${UPLOADS}/2022/12/LaFab-negro.png`,
  url: "https://lafab.com.co",
  telephone: "+573054602395",
  email: "info@lafab.com.co",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cl. 64 #44-74, Barrio La Esmeralda",
    addressLocality: "Itagüí",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  areaServed: "Medellín y Colombia",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(REVIEWS_SUMMARY.rating),
    reviewCount: String(REVIEWS_SUMMARY.count),
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.instagram.com/lafabricamed/",
    "https://www.facebook.com/LaFabricaMed",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" className={poppins.variable}>
      <head>
        {/* Adelanta la conexión (DNS + TLS) al host de imágenes para que carguen antes.
            Las fotos del catálogo salen de STORE_URL, que hoy es staging: sin este
            preconnect el navegador perdía el handshake completo en la primera foto. */}
        <link rel="preconnect" href={STORE_URL} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={STORE_URL} />
        {/* La fuente de marca se pide de una vez, no al final de la cascada */}
        <link
          rel="preload"
          href="/fonts/morality.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Adelanta DNS de scripts de terceros (analítica) sin bloquear el render */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSONLD) }}
        />
        <Analytics />
        <IntroLoader />
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFab />
          <ImageGuard />
        </CartProvider>
      </body>
    </html>
  );
}
