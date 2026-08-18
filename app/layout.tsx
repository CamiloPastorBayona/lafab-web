import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";
import Analytics from "@/components/Analytics";
import WhatsAppFab from "@/components/WhatsAppFab";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Mientras el sitio esté en *.vercel.app (sin dominio) lo dejamos NO indexable
// para evitar contenido duplicado. En el cutover se pone NEXT_PUBLIC_ALLOW_INDEX=true.
const INDEXABLE = process.env.NEXT_PUBLIC_ALLOW_INDEX === "true";

export const metadata: Metadata = {
  metadataBase: new URL("https://lafab.com.co"),
  title: {
    default: "LaFab | Muebles a la medida en Medellín",
    template: "%s | LaFab",
  },
  description:
    "Fabricamos muebles a la medida en Medellín: sofás, comedores, camas y closets. Diseño propio, materiales de calidad y envío a todo el país.",
  icons: {
    icon: "https://lafab.com.co/wp-content/uploads/2024/11/cropped-favicon-lafab-270x270.png",
  },
  robots: INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
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
    "https://lafab.com.co/wp-content/uploads/2022/12/LaFab-negro.png",
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
    ratingValue: "4.9",
    reviewCount: "29",
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
        {/* Adelanta la conexión (DNS + TLS) al host de imágenes para que carguen antes */}
        <link
          rel="preconnect"
          href="https://lafab.com.co"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://lafab.com.co" />
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
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFab />
        </CartProvider>
      </body>
    </html>
  );
}
