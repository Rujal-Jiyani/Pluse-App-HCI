import React, { useState } from "react";
import PulseLogo from "../components/PulseLogo.jsx";
import Stepper from "../components/Stepper.jsx";
import { MEDICATION_DETAILS } from "../data/medications.js";
import { calculateDose, fmt } from "../utils/dose.js";
import { FlaskIcon, JarIcon } from "./MedicationDetail.jsx";
import { PersonIcon, PillIcon, SyringeIcon } from "./DosageResult.jsx";

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

function PencilIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20l1-4L16.500 4.500a2.100 2.100 0 0 1 3 3L8 19z" />
      <path d="m14.500 6.500 3 3" />
    </svg>
  );
}

function CheckIcon() {
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
      <path d="m4.500 12.500 5 5L19.500 7" />
    </svg>
  );
}

export default function VerifyDose({
  method,
  measurement,
  medicationId,
  onBack,
  onEdit,
  onConfirm,
}) {
  const [confirmed, setConfirmed] = useState(false);
  const med = MEDICATION_DETAILS[medicationId];
  const result = calculateDose({ method, measurement, med });

  const handleConfirm = () => {
    setConfirmed(true);
    if (onConfirm) onConfirm({ method, measurement, medicationId, ...result });
  };

  return (
    <main className="screen verify-screen">
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

      <Stepper currentStep={3} />

      <h2 className="measure-title">Verify Before Administration</h2>

      {result ? (
        <>
          <div className="verify-table">
            <div className="verify-row">
              <span className="detail-icon">
                <PersonIcon />
              </span>
              <span className="verify-label">Patient Weight</span>
              <span className="verify-colon">:</span>
              <span className="verify-value">{result.weight.toFixed(1)} kg</span>
            </div>
            <div className="verify-row">
              <span className="detail-icon">
                <PillIcon />
              </span>
              <span className="verify-label">Medication</span>
              <span className="verify-colon">:</span>
              <span className="verify-value">{med.name}</span>
            </div>
            <div className="verify-row">
              <span className="detail-icon">
                <FlaskIcon />
              </span>
              <span className="verify-label">Dose ({fmt(med.dosePerKgMg, 3)}mg/kg)</span>
              <span className="verify-colon">:</span>
              <span className="verify-value">{fmt(result.doseMg, 3)} mg</span>
            </div>
            <div className="verify-row">
              <span className="detail-icon">
                <JarIcon />
              </span>
              <span className="verify-label">Concentration</span>
              <span className="verify-colon">:</span>
              <span className="verify-value">{fmt(med.concentrationMgPerMl, 3)} mg/mL</span>
            </div>
            <div className="verify-row highlight">
              <span className="detail-icon">
                <SyringeIcon />
              </span>
              <span className="verify-label">Volume to draw</span>
              <span className="verify-colon">:</span>
              <span className="verify-value strong">{fmt(result.volumeMl)} mL</span>
            </div>
          </div>

          <div className="verify-actions">
            <button className="verify-btn edit" onClick={onEdit} disabled={confirmed}>
              <PencilIcon />
              <span>Edit</span>
            </button>
            <button className="verify-btn confirm" onClick={handleConfirm} disabled={confirmed}>
              <CheckIcon />
              <span>Confirm</span>
            </button>
          </div>

          {confirmed && (
            <p className="verify-confirmed" role="status">
              Dose confirmed
            </p>
          )}
        </>
      ) : (
        <div className="result-notice" role="alert">
          A dose can't be calculated for the current selection. Please go back and check the
          patient weight and medication.
        </div>
      )}
    </main>
  );
}
