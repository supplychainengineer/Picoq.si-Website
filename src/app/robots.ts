import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(site.deployment.indexable ? { allow: "/" } : { disallow: "/" }) },
    ...(site.deployment.indexable ? { sitemap: `${site.deployment.url}/sitemap.xml` } : {}),
  };
}
