import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Enlaces personales que llegan por correo: no deben indexarse.
      disallow: ["/recuperar/", "/api/"],
    },
    sitemap: "https://lafab.com.co/sitemap.xml",
    host: "https://lafab.com.co",
  };
}
