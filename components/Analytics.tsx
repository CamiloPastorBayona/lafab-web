"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// IDs de las cuentas de LaFab (mismas que en WordPress/staging).
const GA = process.env.NEXT_PUBLIC_GA_ID || "G-EQDN3BWDSD";
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID || "xq77h4k3lx";
const PIXEL = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1531225141803025";

export default function Analytics() {
  const pathname = usePathname();

  // Registrar page_view en cada cambio de ruta (SPA de Next).
  useEffect(() => {
    const w = window as unknown as {
      gtag?: (...a: unknown[]) => void;
      fbq?: (...a: unknown[]) => void;
    };
    w.gtag?.("event", "page_view", { page_path: pathname });
    w.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}');`}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY}");`}
      </Script>

      {/* Meta (Facebook) Pixel */}
      <Script id="fb-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
