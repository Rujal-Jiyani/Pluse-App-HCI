import React from "react";
import {
  PersonIcon,
  CalculatorIcon,
  RouteIcon,
  JarIcon,
  PillIcon,
  SyringeIcon,
  ShieldCheckIcon,
} from "./Icons.jsx";
import { DrugHero } from "../pages/MedicationDetail.jsx";
import { patientText } from "./PatientChip.jsx";
import { fmtDose, fmtVolume } from "../engine/units.js";

// Read-only summary used on the Verify and Dose Confirmed pages.
export default function DoseSummary({ result, verified = false }) {
  const { drug, patient, dose, doseUnit, volumeMl } = result;
  const isFluid = drug.kind === "fluid";
  const rows = [
    { Icon: PersonIcon, label: patient.estimated ? "Estimated Weight" : "Patient Weight", value: patientText(patient) },
    !isFluid && { Icon: PillIcon, label: "Dose", value: fmtDose(dose, doseUnit) },
    !isFluid && { Icon: JarIcon, label: "Concentration", value: drug.concentrationLabel },
    { Icon: RouteIcon, label: "Route", value: drug.route },
    verified && { Icon: ShieldCheckIcon, label: "Verified By", value: "2 Clinicians", accent: true },
  ].filter(Boolean);

  return (
    <div className="hero-card">
      <DrugHero drug={drug} sub={drug.concentrationLabel} />
      <div className="summary-table">
        {rows.map(({ Icon, label, value, accent }) => (
          <div key={label} className="summary-row">
            <Icon size={30} />
            <span className="summary-label">{label}</span>
            <span className={`summary-value ${accent ? "accent" : ""}`}>{value}</span>
          </div>
        ))}
        <div className="summary-row highlight">
          {isFluid ? <CalculatorIcon size={30} /> : <SyringeIcon size={32} />}
          <span className="summary-label">{isFluid ? "Bolus volume" : "Volume to draw"}</span>
          <span className="summary-value">{fmtVolume(volumeMl)}</span>
        </div>
      </div>
    </div>
  );
}
