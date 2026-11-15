import React from "react";
import { CheckIcon } from "./Icons.jsx";

const STEPS = ["Patient Size", "Medication", "Calculation", "Verify"];

// currentStep: 0..3 is in progress, 4 = all complete.
export default function Stepper({ currentStep = 0 }) {
  return (
    <ol className="stepper" aria-label={`Step ${Math.min(currentStep + 1, 4)} of 4`}>
      {STEPS.map((label, i) => {
        const state = i < currentStep ? "done" : i === currentStep ? "current" : "todo";
        return (
          <li key={label} className={`step ${state}`} aria-current={state === "current" ? "step" : undefined}>
            <span className="step-dot">{state === "done" && <CheckIcon size={18} />}</span>
            <span className="step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
