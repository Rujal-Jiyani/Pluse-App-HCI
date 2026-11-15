import React from "react";
import PulseLogo from "../components/PulseLogo.jsx";
import Stepper from "../components/Stepper.jsx";

const TEAL = "#1f8f8a";

function BackIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 12H4" />
      <path d="m10 6-6 6 6 6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

const iconProps = {
  width: 42,
  height: 42,
  viewBox: "0 0 48 48",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function HeartIcon() {
  return (
    <svg {...iconProps} stroke="#000">
      <path d="M24 41S6 30 6 18a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23z" />
      <path d="M10 24h8l3-6 4 11 3-5h10" />
    </svg>
  );
}

function LungsIcon() {
  return (
    <svg {...iconProps} stroke={TEAL}>
      <path d="M24 8v16" />
      <path d="M24 16c-3 0-4 3-4 3" />
      <path d="M20 19c-5 2-10 9-10 17 0 2 2 3 4 2 4-1 6-4 6-8z" />
      <path d="M28 19c5 2 10 9 10 17 0 2-2 3-4 2-4-1-6-4-6-8z" />
    </svg>
  );
}

function SyringeIcon() {
  return (
    <svg {...iconProps} stroke={TEAL}>
      <path d="m31 6 11 11" />
      <path d="m34 9 5 5" />
      <path d="m27 12 9 9-17 17-9-9z" />
      <path d="m10 38-6 6" />
      <path d="m18 22 4 4M23 17l4 4M13 27l4 4" />
    </svg>
  );
}

function IVBagIcon() {
  return (
    <svg {...iconProps} stroke={TEAL}>
      <path d="M20 4h8" />
      <path d="M24 4v5" />
      <rect x="14" y="9" width="20" height="24" rx="6" />
      <path d="M18 18h12M18 24h12" />
      <path d="M24 33v7" />
      <path d="M24 40c-2 0-3 1-3 3" />
    </svg>
  );
}

export const MEDICATIONS = [
  { id: "epinephrine", label: "Epinephrine", Icon: HeartIcon },
  { id: "atropine", label: "Atropine", Icon: LungsIcon },
  { id: "amiodarone", label: "Amiodarone", Icon: SyringeIcon },
  { id: "fluids", label: "Fluids", Icon: IVBagIcon },
];

export default function SelectMedication({ onBack, onSelect }) {
  return (
    <main className="screen medication-screen">
      <header className="top-bar">
        <button className="back-btn" onClick={onBack} aria-label="Go back">
          <BackIcon />
        </button>
        <div className="top-logo">
          <PulseLogo />
          <span>PULSE</span>
        </div>
        <span className="top-spacer" />
      </header>

      <Stepper currentStep={1} />

      <h2 className="measure-title">Select Medication</h2>

      <div className="med-list">
        {MEDICATIONS.map(({ id, label, Icon }) => (
          <button key={id} className="med-card" onClick={() => onSelect && onSelect(id)}>
            <span className="med-icon">
              <Icon />
            </span>
            <span className="med-label">{label}</span>
            <span className="med-chevron">
              <ChevronIcon />
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
