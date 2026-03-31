import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wellbecks.example";
  const routes = ["/", "/menu", "/cleanse", "/about", "/how-ordering-works", "/contact"];
  return routes.map((r) => ({ url: base + r, lastModified: new Date() }));
}
