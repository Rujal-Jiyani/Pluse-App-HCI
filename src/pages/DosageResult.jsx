import React from "react";
import Screen from "../components/Screen.jsx";
import { PrimaryButton, SecondaryButton } from "../components/Buttons.jsx";
import { PencilIcon, InfoIcon } from "../components/Icons.jsx";
import { DrugHero } from "./MedicationDetail.jsx";
import { fmtDose, fmtVolume } from "../engine/units.js";

export default function DosageResult({ result, onBack, onHome, onEdit, onNext }) {
  if (!result) {
    return (
      <Screen onBack={onBack} onHome={onHome} step={2} title="Dosage Result">
        <div className="notice error" role="alert">
          A dose can't be calculated for these details. Go back and check the patient
          measurement.
        </div>
      </Screen>
    );
  }

  const { drug, patient, dose, doseUnit, volumeMl, formula, capped, adult, usedIdeal } = result;
  const isFluid = drug.kind === "fluid";
  const editLabel = patient.method === "length" ? "Edit length" : "Edit weight";

  return (
    <Screen
      onBack={onBack}
      onHome={onHome}
      step={2}
      title="Dosage Result"
      subtitle="Calculated from the entered patient details and medication information."
      footer={
        <div className="btn-row">
          <SecondaryButton icon={<PencilIcon />} onClick={onEdit}>
            {editLabel}
          </SecondaryButton>
          <PrimaryButton onClick={onNext}>Verify</PrimaryButton>
        </div>
      }
    >
      <div className="hero-card">
        <DrugHero drug={drug} sub={drug.concentrationLabel} />
        <div className="dose-box" aria-live="polite">
          <div className="dose-box-label">{isFluid ? "Bolus Volume" : "Volume to Draw"}</div>
          <div className="dose-box-value">{fmtVolume(volumeMl)}</div>
          {!isFluid && (
            <div className="dose-box-sub">
              Dose <strong>{fmtDose(dose, doseUnit)}</strong> at {drug.concentrationLabel}
            </div>
          )}
          <div className="dose-box-sub">({formula})</div>
          {(capped || adult || usedIdeal || patient.estimated) && (
            <div className="badges">
              {adult && <span className="badge">Adult dose (over 50 kg)</span>}
              {capped && (
                <span className="badge">
                  Max dose applied ({drug.maxDose} {drug.unit})
                </span>
              )}
              {usedIdeal && <span className="badge teal">Dosed on ideal weight</span>}
              {patient.estimated && <span className="badge teal">Weight estimated from length</span>}
            </div>
          )}
        </div>
      </div>

      <div className="notice info">
        <InfoIcon />
        <span>Double-check the dose, concentration, and route before administration.</span>
      </div>
    </Screen>
  );
}
