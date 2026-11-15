import React, { useState } from "react";
import PulseLogo from "../components/PulseLogo.jsx";
import Stepper from "../components/Stepper.jsx";

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

function BackspaceIcon() {
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
      <path d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7z" />
      <path d="m12 9 6 6" />
      <path d="m18 9-6 6" />
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

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];
const MAX_LENGTH = 6;

export default function EnterMeasurement({
  method = "weight",
  initialValue = "",
  onBack,
  onNext,
}) {
  const [value, setValue] = useState(initialValue);
  const isWeight = method === "weight";
  const title = isWeight ? "Enter Patient Weight" : "Enter Patient Length";

  const press = (key) => {
    if (key === "back") {
      setValue((v) => v.slice(0, -1));
      return;
    }
    setValue((v) => {
      if (v.length >= MAX_LENGTH) return v;
      if (key === ".") {
        if (v.includes(".")) return v;
        return v === "" ? "0." : v + ".";
      }
      // avoid leading zeros like "007"
      if (v === "0") return key;
      return v + key;
    });
  };

  const numeric = parseFloat(value);
  const canContinue = !Number.isNaN(numeric) && numeric > 0;

  return (
    <main className="screen measure-screen">
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

      <Stepper currentStep={0} />

      <h2 className="measure-title">{title}</h2>

      <div className="measure-display" aria-live="polite">
        {value === "" ? <span className="placeholder">0</span> : value}
      </div>

      <div className="keypad">
        {KEYS.map((key) => (
          <button
            key={key}
            className="key"
            onClick={() => press(key)}
            aria-label={key === "back" ? "Delete" : key === "." ? "Decimal point" : key}
          >
            {key === "back" ? <BackspaceIcon /> : key}
          </button>
        ))}
      </div>

      <button
        className="next-btn"
        disabled={!canContinue}
        onClick={() => onNext && onNext(numeric)}
      >
        <span>Next</span>
        <ArrowIcon />
      </button>
    </main>
  );
}
