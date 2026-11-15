import React from "react";
import { PersonIcon } from "./Icons.jsx";
import { BODY_BUILDS_BY_ID } from "../engine/lengthToWeight.js";
import { fmtKg } from "../engine/units.js";

export function patientText(p) {
  if (!p) return "";
  if (p.method === "length") {
    const b = BODY_BUILDS_BY_ID[p.build];
    return `${fmtKg(p.actualKg)} (est. from ${p.lengthCm} cm, ${b.label})`;
  }
  return fmtKg(p.actualKg);
}

export default function PatientChip({ patient }) {
  if (!patient) return null;
  return (
    <div className="patient-chip">
      <PersonIcon size={24} />
      <span>Patient: {patientText(patient)}</span>
    </div>
  );
}
