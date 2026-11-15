import React from "react";
import PulseLogo from "../components/PulseLogo.jsx";
import Stepper from "../components/Stepper.jsx";
import { MEDICATION_DETAILS } from "../data/medications.js";

const TEAL = "#1f6f6a";

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

function ArrowIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

const base = {
  width: 36,
  height: 36,
  viewBox: "0 0 36 36",
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function ClipboardIcon() {
  return (
    <svg {...base} stroke={TEAL}>
      <rect x="6" y="6" width="20" height="25" rx="3" />
      <path d="M12 4h8v4h-8z" />
      <path d="m10 14 1.5 1.5L14 13M10 20l1.5 1.5L14 19" />
      <path d="M17 14h6M17 20h4" />
      <circle cx="26" cy="27" r="5" fill="#d9d9d9" />
      <path d="m23.8 27 1.6 1.6 2.8-3" />
    </svg>
  );
}

export function FlaskIcon() {
  return (
    <svg {...base} stroke={TEAL}>
      <path d="M13 5h10" />
      <path d="M15 5v9L8 28a2 2 0 0 0 1.8 3h16.4a2 2 0 0 0 1.8-3l-7-14V5" />
      <path d="M11 23h14" />
    </svg>
  );
}

export function JarIcon() {
  return (
    <svg {...base} stroke={TEAL}>
      <rect x="8" y="5" width="16" height="5" rx="1.5" />
      <path d="M9 10v18a3 3 0 0 0 3 3h6" />
      <path d="M23 10v8" />
      <path d="m13 18 4 4M17 18l-4 4" />
      <path d="M26 22v8M22 26h8" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg {...base} stroke="#e5322d" strokeWidth="2.4">
      <path d="M18 5 3.5 30h29z" />
      <path d="M18 14v8" />
      <path d="M18 26v.5" />
    </svg>
  );
}

const ROWS = [
  { key: "indication", label: "Indication", Icon: ClipboardIcon },
  { key: "dose", label: "Dose", Icon: FlaskIcon },
  { key: "concentration", label: "Concentration", Icon: JarIcon },
  { key: "precaution", label: "Precaution", Icon: WarningIcon },
];

export default function MedicationDetail({ medicationId, onBack, onCalculate }) {
  const med = MEDICATION_DETAILS[medicationId];

  return (
    <main className="screen detail-screen">
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

      <h2 className="measure-title">{med ? med.name : "Medication"}</h2>

      <div className="detail-table">
        {ROWS.map(({ key, label, Icon }) => (
          <div className="detail-row" key={key}>
            <span className="detail-icon">
              <Icon />
            </span>
            <span className="detail-label">{label}</span>
            <span className="detail-value">
              {med && med[key] ? med[key] : <span className="detail-empty">Not available</span>}
            </span>
          </div>
        ))}
      </div>

      <button
        className="next-btn calc-btn"
        disabled={!med || !med.dose}
        onClick={() => onCalculate && onCalculate(medicationId)}
      >
        <span>Calculate Dose</span>
        <ArrowIcon />
      </button>
    </main>
  );
}
