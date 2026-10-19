import Image from "next/image";

/** Optimized, locally served cinematic artwork; no external video dependency. */
export function HandArtwork() {
  return <div className="cinematic-artwork motion-loop"><Image src="/images/reaching-hands.webp" alt="" fill sizes="100vw" preload className="chrome-hand-image" /></div>;
}
