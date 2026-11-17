import React from "react";
import Screen from "../components/Screen.jsx";
import DoseSummary from "../components/DoseSummary.jsx";

export default function DoseConfirmed({ result, onHome }) {
  if (!result) return null;
  return (
    <Screen onHome={onHome} step={4}>
      <div className="confirmed-head" role="status">
        <div className="big-tick" aria-hidden="true">
          <span className="tick-ripple" />
          <span className="tick-ripple delay" />
          <svg viewBox="0 0 120 120">
            <path className="ray" d="M30 18l6 9M90 18l-6 9M14 46l10 3M106 46l-10 3" />
            <circle cx="60" cy="64" r="42" />
            <path d="M42 64l12 12 24-26" />
          </svg>
        </div>
        <h1 className="confirmed-title">Dose Confirmed</h1>
      </div>
      <DoseSummary result={result} verified volumeFirst />
    </Screen>
  );
}
