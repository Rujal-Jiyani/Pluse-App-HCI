import React from "react";
import Screen from "../components/Screen.jsx";
import { PrimaryButton, SecondaryButton } from "../components/Buttons.jsx";
import { ChildFaceIcon, PencilIcon, InfoIcon } from "../components/Icons.jsx";
import { BODY_BUILDS_BY_ID } from "../engine/lengthToWeight.js";
import { fmtKg } from "../engine/units.js";

export default function ConfirmPatient({ patient, onBack, onHome, onEdit, onNext }) {
  if (!patient) return null;
  const isLength = patient.method === "length";
  const build = isLength ? BODY_BUILDS_BY_ID[patient.build] : null;

  return (
    <Screen
      onBack={onBack}
      onHome={onHome}
      step={0}
      title="Confirm Patient Details"
      subtitle="Review the entered information before proceeding."
      footer={
        <PrimaryButton onClick={onNext} autoFocus>
          Proceed to Medications
        </PrimaryButton>
      }
    >
      <div className="hero-card">
        <div className="hero-head">
          <span className="hero-icon" style={{ background: "transparent" }}>
            <ChildFaceIcon size={96} />
          </span>
          <div className="kv-stack">
            <div>
              <div className="kv-label">Measurement Method</div>
              <div className="kv-value small">{isLength ? "Length-based" : "Weight-based"}</div>
            </div>
            {isLength && (
              <>
                <div>
                  <div className="kv-label">Patient Length</div>
                  <div className="kv-value small">{patient.lengthCm} cm</div>
                </div>
                <div>
                  <div className="kv-label">Body Build</div>
                  <div className="kv-value small">
                    {build.label} ({build.clinical})
                  </div>
                </div>
              </>
            )}
            <div>
              <div className="kv-label">{isLength ? "Estimated Weight" : "Patient Weight"}</div>
              <div className="kv-value">{fmtKg(patient.actualKg)}</div>
            </div>
          </div>
        </div>
      </div>

      {isLength && patient.idealKg < patient.actualKg && (
        <div className="notice info">
          <InfoIcon />
          <span>
            Drug doses will use the ideal weight for this length ({fmtKg(patient.idealKg)}), as
            recommended for overweight children.
          </span>
        </div>
      )}
      {patient.actualKg > 50 && (
        <div className="notice warning">
          <InfoIcon />
          <span>Over 50 kg: adult doses will be used.</span>
        </div>
      )}

      <SecondaryButton icon={<PencilIcon />} onClick={onEdit}>
        Edit Measurement
      </SecondaryButton>
    </Screen>
  );
}
