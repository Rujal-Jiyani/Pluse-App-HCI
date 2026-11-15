import React from "react";
import PulseLogo from "../components/PulseLogo.jsx";
import Stepper from "../components/Stepper.jsx";
import { MEDICATION_DETAILS } from "../data/medications.js";
import { FlaskIcon, JarIcon } from "./MedicationDetail.jsx";
import { fmt } from "../utils/dose.js";

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

const base = {
  width: 34,
  height: 34,
  viewBox: "0 0 36 36",
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function PersonIcon() {
  return (
    <svg {...base} stroke={TEAL}>
      <circle cx="18" cy="18" r="13" />
      <circle cx="18" cy="15" r="3.5" />
      <path d="M11.5 25c1-3.5 3.5-5 6.5-5s5.500 1.500 6.500 5" />
    </svg>
  );
}

export function PillIcon() {
  return (
    <svg {...base} stroke={TEAL}>
      <g transform="rotate(-45 18 18)">
        <rect x="5" y="11" width="26" height="14" rx="7" />
        <path d="M18 11v14" />
      </g>
    </svg>
  );
}

export function SyringeIcon() {
  return (
    <svg {...base} stroke={TEAL}>
      <path d="m24 5 7 7" />
      <path d="m26 7 3 3" />
      <path d="m21 9 6 6-13 13-6-6z" />
      <path d="m8 28-4 4" />
      <path d="m14 17 3 3M18 13l3 3M10 21l3 3" />
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

export default function DosageResult({ method, measurement, medicationId, onBack, onNext }) {
  const med = MEDICATION_DETAILS[medicationId];
  const weight = parseFloat(measurement);
  const canCalculate =
    method === "weight" &&
    med &&
    med.dosePerKgMg &&
    med.concentrationMgPerMl &&
    !Number.isNaN(weight) &&
    weight > 0;

  let doseMg = null;
  let volumeMl = null;
  if (canCalculate) {
    doseMg = weight * med.dosePerKgMg;
    volumeMl = doseMg / med.concentrationMgPerMl;
  }

  return (
    <main className="screen result-screen">
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

      <Stepper currentStep={2} />

      <h2 className="measure-title">Dosage Calculation</h2>

      {canCalculate ? (
        <>
          <div className="detail-table result-table">
            <div className="detail-row">
              <span className="detail-icon">
                <PersonIcon />
              </span>
              <span className="detail-label">Patient Weight</span>
              <span className="detail-value">{weight.toFixed(1)} kg</span>
            </div>
            <div className="detail-row">
              <span className="detail-icon">
                <PillIcon />
              </span>
              <span className="detail-label">Medication</span>
              <span className="detail-value">{med.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-icon">
                <FlaskIcon />
              </span>
              <span className="detail-label">Dose ({fmt(med.dosePerKgMg, 3)}mg/kg)</span>
              <span className="detail-value">{fmt(doseMg, 3)} mg</span>
            </div>
            <div className="detail-row">
              <span className="detail-icon">
                <JarIcon />
              </span>
              <span className="detail-label">Concentration</span>
              <span className="detail-value">{fmt(med.concentrationMgPerMl, 3)} mg/mL</span>
            </div>
          </div>

          <div className="volume-box">
            <span className="volume-icon">
              <SyringeIcon />
            </span>
            <span className="volume-label">Volume to draw</span>
            <span className="volume-value">{fmt(volumeMl)} mL</span>
          </div>

          <button className="next-btn calc-btn" onClick={() => onNext && onNext()}>
            <span>Verify Dose</span>
            <ArrowIcon />
          </button>
        </>
      ) : (
        <div className="result-notice" role="alert">
          {method !== "weight"
            ? "Dose calculation by length needs a length-to-weight reference, which hasn't been added yet. Please go back and enter the patient's weight."
            : "Dose data for this medication isn't available yet."}
        </div>
      )}
    </main>
  );
}
