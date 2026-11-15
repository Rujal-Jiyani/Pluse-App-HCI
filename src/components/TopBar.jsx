import React from "react";
import PulseLogo from "./PulseLogo.jsx";
import { BackIcon, HomeIcon } from "./Icons.jsx";

// Back (left) · logo (centre) · Home (right), mirrored for symmetry.
export default function TopBar({ onBack, onHome }) {
  return (
    <header className="top-bar">
      {onBack ? (
        <button className="icon-btn" onClick={onBack} aria-label="Go back">
          <BackIcon />
        </button>
      ) : (
        <span className="icon-btn-spacer" />
      )}
      <div className="top-logo" aria-label="PULSE">
        <PulseLogo />
        <span>PULSE</span>
      </div>
      {onHome ? (
        <button className="icon-btn" onClick={onHome} aria-label="Go to home screen">
          <HomeIcon />
        </button>
      ) : (
        <span className="icon-btn-spacer" />
      )}
    </header>
  );
}
