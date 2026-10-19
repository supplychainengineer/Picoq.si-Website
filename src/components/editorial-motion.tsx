"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function EditorialMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context: gsap.Context | undefined;

    const refresh = () => {
      context?.revert();
      if (preference.matches || document.documentElement.getAttribute("data-motion") !== "on") return;
      context = gsap.context(() => {
        gsap.fromTo(".manifesto-word", { color: "#85827b" }, {
          color: "#0a0a0a", stagger: .12, ease: "none",
          scrollTrigger: { trigger: ".manifesto", start: "top 75%", end: "bottom 60%", scrub: 1 },
        });
      });
    };

    refresh();
    window.addEventListener("picoq:motion", refresh);
    preference.addEventListener("change", refresh);
    return () => { context?.revert(); window.removeEventListener("picoq:motion", refresh); preference.removeEventListener("change", refresh); };
  }, []);
  return null;
}
