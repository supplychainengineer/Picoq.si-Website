"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function MotionControl({ labels }: { labels: { pause: string; play: string } }) {
  const [paused, setPaused] = useState(false);
  const interactive = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-motion", paused ? "paused" : "on");
    window.dispatchEvent(new Event("picoq:motion"));
    return () => { document.documentElement.removeAttribute("data-motion"); };
  }, [paused]);

  if (!interactive) return null;
  return <button className="motion-control" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
    {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
    <span>{paused ? labels.play : labels.pause}</span>
  </button>;
}
