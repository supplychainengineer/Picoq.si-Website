"use client";

import { useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function HeroBackdrop({ children, labels }: {
  children: React.ReactNode;
  labels: { pause: string; play: string };
}) {
  const interactive = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [paused, setPaused] = useState(false);

  return (
    <div className="hero-backdrop" data-interactive={interactive} data-paused={paused}>
      <div className="hero-backdrop-scene" aria-hidden="true">
        {children}
        <div className="hero-halftone" />
        <div className="hero-backdrop-wash" />
      </div>
      {interactive && <button type="button" className="hero-motion-button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        {paused ? labels.play : labels.pause}
      </button>}
    </div>
  );
}
