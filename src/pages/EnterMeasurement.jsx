import React, { useEffect, useState } from "react";
import Screen from "../components/Screen.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import { BackspaceIcon, InfoIcon, WarningIcon } from "../components/Icons.jsx";
import { LIMITS, validateMeasurement } from "../engine/validation.js";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];
const MAX_INT_DIGITS = 3;
const MAX_DECIMALS = 1;

// Keypad input rules prevent impossible values before validation runs.
function applyKey(v, key) {
  if (key === "back") return v.slice(0, -1);
  const [int, dec] = v.split(".");
  if (key === ".") {
    if (v.includes(".")) return v;
    return v === "" ? "0." : v + ".";
  }
  if (dec !== undefined) return dec.length >= MAX_DECIMALS ? v : v + key;
  if (int === "0") return key; // no leading zeros
  if (int.length >= MAX_INT_DIGITS) return v;
  return v + key;
}

export default function EnterMeasurement({ method, initialValue = "", onBack, onHome, onNext }) {
  const [value, setValue] = useState(initialValue);
  const [showError, setShowError] = useState(Boolean(initialValue));
  const isWeight = method === "weight";
  const lim = LIMITS[method];
  const v = validateMeasurement(method, value);

  // Show range errors after a short pause, not while the user is mid-typing.
  useEffect(() => {
    setShowError(false);
    if (!value) return undefined;
    const t = setTimeout(() => setShowError(true), 600);
    return () => clearTimeout(t);
  }, [value]);

  const press = (key) => setValue((cur) => applyKey(cur, key));

  // Hardware keyboard support (useful for desktop demos / external keyboards).
  useEffect(() => {
    const onKey = (e) => {
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === "." || e.key === ",") press(".");
      else if (e.key === "Backspace") press("back");
      else if (e.key === "Enter" && v.ok) onNext(String(v.value));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const error = showError ? v.error : null;
  const unitWord = isWeight ? "kilograms (kg)" : "centimetres (cm)";

  return (
    <Screen
      onBack={onBack}
      onHome={onHome}
      step={0}
      title={isWeight ? "Enter Patient Weight" : "Enter Patient Length"}
      subtitle={
        isWeight
          ? `Enter the child's weight in ${unitWord}.`
          : `Measure crown-to-heel lying flat. Enter in ${unitWord}.`
      }
      footer={
        <PrimaryButton disabled={!v.ok} onClick={() => onNext(String(v.value))}>
          Confirm
        </PrimaryButton>
      }
    >
      <div className="measure-layout">
        <div className="measure-side">
          <div className="measure-panel">
            <label id="measure-label">{isWeight ? "Weight (kg)" : "Length (cm)"}</label>
            <div
              className={`measure-field ${error ? "invalid" : ""}`}
              role="textbox"
              aria-labelledby="measure-label"
              aria-invalid={Boolean(error)}
              aria-readonly="true"
            >
              <span className="measure-value" aria-live="polite">
                {value === "" ? <span className="placeholder">0</span> : value}
                <span className="caret" />
              </span>
              <span className="measure-unit">{lim.unit}</span>
            </div>
          </div>

          {error ? (
            <div className="notice error" role="alert">
              <WarningIcon />
              <span>
                {error} Allowed range: {lim.min} – {lim.max} {lim.unit}.
              </span>
            </div>
          ) : (
            <div className="notice plain">
              <InfoIcon />
              <span>
                Accepted range: {lim.min} – {lim.max} {lim.unit}
              </span>
            </div>
          )}

          {v.ok && v.warning && (
            <div className="notice warning" role="status">
              <WarningIcon />
              <span>{v.warning}</span>
            </div>
          )}
        </div>

        <div className="keypad">
          {KEYS.map((key) => (
            <button
              key={key}
              className={`key ${key === "." || key === "back" ? "muted" : ""}`}
              onClick={() => press(key)}
              aria-label={key === "back" ? "Delete last digit" : key === "." ? "Decimal point" : key}
            >
              {key === "back" ? <BackspaceIcon /> : key}
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}
