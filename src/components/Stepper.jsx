import React from "react";

const STEPS = ["Patient", "Medication", "Result"];

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export default function Stepper({ currentStep = 0 }) {
  return (
    <ol className="stepper" aria-label="Progress">
      {STEPS.map((label, i) => {
        const state = i < currentStep ? "done" : i === currentStep ? "current" : "";
        return (
          <li
            key={label}
            className={`step ${state}`}
            aria-current={i === currentStep ? "step" : undefined}
          >
            <span className="step-dot">{i < currentStep && <CheckIcon />}</span>
            <span className="step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
