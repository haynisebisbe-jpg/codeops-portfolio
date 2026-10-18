
const SITE_URL = "https://addiseats.et";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/menu/"],
      disallow: [
        "/cart",
        "/checkout",
        "/orders",
        "/kitchen",
        "/signin",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
