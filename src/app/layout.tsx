import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./editorial.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.deployment.url),
  title: site.metadata.title,
  description: site.metadata.description,
  robots: { index: site.deployment.indexable, follow: site.deployment.indexable },
  openGraph: { title: site.metadata.title, description: site.metadata.description, type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image", title: site.metadata.title, description: site.metadata.description },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F5F3EF" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
