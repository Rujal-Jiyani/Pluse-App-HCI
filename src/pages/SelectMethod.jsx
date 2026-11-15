import React, { useState } from "react";
import PulseLogo from "../components/PulseLogo.jsx";

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

function ScaleIcon() {
  return (
    <svg width="62" height="62" viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="6" fill="#000" />
      <path
        d="M10 28a22 22 0 0 1 44 0z"
        fill="#fff"
        opacity="0"
      />
      <path d="M14 24a18 18 0 0 1 36 0 4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" fill="#fff" />
      <path d="M32 24 L26 17" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="24" r="2.5" fill="#000" />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg
      width="62"
      height="62"
      viewBox="0 0 64 64"
      fill="none"
      stroke="#000"
      strokeWidth="2.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <g transform="rotate(45 32 32)">
        <rect x="4" y="22" width="56" height="20" rx="2" />
        <path d="M12 22v8M20 22v5M28 22v8M36 22v5M44 22v8M52 22v5" />
      </g>
    </svg>
  );
}

const METHODS = [
  { id: "weight", label: "By Weight (kg)", Icon: ScaleIcon },
  { id: "length", label: "By Length (cm)", Icon: RulerIcon },
];

export default function SelectMethod({ onBack, onSelect }) {
  const [selected, setSelected] = useState("weight");

  const choose = (id) => {
    setSelected(id);
    if (onSelect) onSelect(id);
  };

  return (
    <main className="screen method-screen">
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

      <h2 className="method-title">
        Select Patient
        <br />
        Measurement Method
      </h2>

      <div className="method-list" role="radiogroup" aria-label="Measurement method">
        {METHODS.map(({ id, label, Icon }) => (
          <button
            key={id}
            role="radio"
            aria-checked={selected === id}
            className={`method-card ${selected === id ? "active" : ""}`}
            onClick={() => choose(id)}
          >
            <span className="method-icon">
              <Icon />
            </span>
            <span className="method-label">{label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
