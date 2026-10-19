"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function DiscoveryExperience({ steps, children }: {
  steps: ReadonlyArray<{ title: string; description: string }>;
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  return <div className="discovery-interactive">
    <ol className="discovery-steps">
      {steps.map((step, i) => <li key={step.title} className={selected === i ? "step-active" : ""}>
        <button type="button" onPointerEnter={() => setSelected(i)} onFocus={() => setSelected(i)} onClick={() => setSelected(i)} aria-pressed={selected === i} aria-controls="discovery-readout">
          <span className="step-number mono">0{i + 1}</span><span><span className="step-title">{step.title}</span><span className="step-description">{step.description}</span></span><ArrowUpRight size={24} strokeWidth={1} aria-hidden="true" />
        </button>
      </li>)}
    </ol>
    <div className="discovery-media">
      <div className="discovery-readout" id="discovery-readout" key={selected}><span className="mono">0{selected + 1} / 04</span><strong>{steps[selected].title}</strong><p>{steps[selected].description}</p></div>
      {children}
    </div>
  </div>;
}
