import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return site.deployment.indexable ? [{ url: site.deployment.url, changeFrequency: "monthly", priority: 1 }] : [];
}
