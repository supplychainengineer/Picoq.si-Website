"use client";

import { useEffect, useState } from "react";

export function HeroHeadline({ phrases }: { phrases: readonly [string, ...string[]] }) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let phrase = 0;
    let letters = phrases[0].length;
    let deleting = true;
    const enabled = () => !preference.matches && document.documentElement.getAttribute("data-motion") === "on";

    function tick() {
      if (!enabled()) return;
      if (deleting && letters === 0) {
        phrase = (phrase + 1) % phrases.length;
        deleting = false;
        timer = setTimeout(tick, 220);
        return;
      }
      letters += deleting ? -1 : 1;
      setText(phrases[phrase].slice(0, letters));
      if (!deleting && letters === phrases[phrase].length) {
        deleting = true;
        timer = setTimeout(tick, 2700);
      } else {
        timer = setTimeout(tick, deleting ? 35 : 80);
      }
    }

    function sync() {
      clearTimeout(timer);
      if (enabled()) timer = setTimeout(tick, 2600);
    }
    sync();
    window.addEventListener("picoq:motion", sync);
    preference.addEventListener("change", sync);
    return () => { clearTimeout(timer); window.removeEventListener("picoq:motion", sync); preference.removeEventListener("change", sync); };
  }, [phrases]);

  return <span className="hero-line" aria-hidden="true"><span className="hero-headline-static">{phrases[0]}</span><span className="hero-headline-typed">{text}</span><span className="hero-caret" /></span>;
}
