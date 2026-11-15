import React from "react";
import Screen from "../components/Screen.jsx";
import { BuildIcon, ChevronIcon } from "../components/Icons.jsx";
import { BODY_BUILDS, estimateWeight } from "../engine/lengthToWeight.js";

// Length path only. Shows the estimated weight per option so the effect of the
// choice is visible before committing (visibility of system status).
export default function SelectBodyBuild({ lengthCm, onBack, onHome, onSelect }) {
  return (
    <Screen
      onBack={onBack}
      onHome={onHome}
      step={0}
      title="Select Patient Body Build"
      subtitle={`Length ${lengthCm} cm. Choose the build that best matches the child.`}
    >
      <div className="choice-list">
        {BODY_BUILDS.map((b) => {
          const { estimatedKg } = estimateWeight(lengthCm, b.id);
          return (
            <button key={b.id} className="choice-card" onClick={() => onSelect(b.id)}>
              <span className="choice-icon">
                <BuildIcon build={b.id} size={70} />
              </span>
              <span>
                <span className="choice-title">
                  {b.label}
                  <span className="choice-tag">({b.clinical})</span>
                </span>
                <span className="choice-sub">
                  Estimated weight: <strong>{estimatedKg.toFixed(1)} kg</strong>
                </span>
              </span>
              <span className="choice-chevron">
                <ChevronIcon />
              </span>
            </button>
          );
        })}
      </div>
    </Screen>
  );
}
