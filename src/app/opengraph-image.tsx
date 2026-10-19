import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.metadata.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f5f3ef", color: "#0a0a0a", padding: "55px 70px", fontFamily: "sans-serif" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 50, fontWeight: 700, letterSpacing: "-3px" }}>{site.wordmark}.</span><span style={{ fontSize: 19, color: "#4d5d3d", background: "#dce8c7", padding: "14px 22px", borderRadius: 30 }}>{site.stages[0].label}</span></div><div style={{ display: "flex", fontSize: 88, lineHeight: 1.04, letterSpacing: "-4px", maxWidth: 1020 }}>{site.hero.heading}</div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, color: "#59574f" }}><span>{site.stages[1].title} {site.stages[1].label}.</span><span>picoq.si</span></div></div>, size);
}
