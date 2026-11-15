import React from "react";
import Screen from "../components/Screen.jsx";
import DoseSummary from "../components/DoseSummary.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import { CheckIcon, InfoIcon } from "../components/Icons.jsx";

// Independent double check. No Edit here: to change anything, go Back.
export default function VerifyDose({ result, onBack, onHome, onConfirm }) {
  if (!result) return null;
  return (
    <Screen
      onBack={onBack}
      onHome={onHome}
      step={3}
      title="Second Clinician Verification"
      subtitle="A second clinician must independently verify these details before administration."
      footer={
        <PrimaryButton icon={<CheckIcon />} arrow={false} onClick={onConfirm}>
          Confirm
        </PrimaryButton>
      }
    >
      <DoseSummary result={result} />
      <div className="notice info">
        <InfoIcon />
        <span>
          Check: right patient size, right drug, right concentration, right dose, right route.
        </span>
      </div>
    </Screen>
  );
}
