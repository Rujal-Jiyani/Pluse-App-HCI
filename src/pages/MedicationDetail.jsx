import React from "react";
import Screen from "../components/Screen.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import {
  DrugIcon,
  TargetIcon,
  PillIcon,
  JarIcon,
  WarningIcon,
  ClockIcon,
  RouteIcon,
} from "../components/Icons.jsx";
import { getDrug, doseRuleText } from "../engine/formulary.js";

export function drugInfoRows(d) {
  return [
    { Icon: TargetIcon, title: "Indication", text: d.indication },
    {
      Icon: PillIcon,
      title: "Recommended Dose",
      text: `${doseRuleText(d)} (max ${d.maxDose} ${d.unit})`,
    },
    { Icon: RouteIcon, title: "Route", text: d.route },
    {
      Icon: JarIcon,
      title: d.kind === "fluid" ? "Fluid" : "Available Concentration",
      text: d.concentrationLabel,
    },
    { Icon: ClockIcon, title: "Repeat", text: d.repeat },
    { Icon: WarningIcon, title: "Key Precautions", text: d.precaution, warn: true },
  ];
}

export function DrugHero({ drug, sub }) {
  return (
    <div className="hero-head">
      <span className="hero-icon">
        <DrugIcon name={drug.icon} size={60} />
      </span>
      <div>
        <div className="hero-name">{drug.name}</div>
        <div className="hero-sub">{sub ?? drug.drugClass}</div>
      </div>
    </div>
  );
}

export default function MedicationDetail({ drugId, onBack, onHome, onNext }) {
  const d = getDrug(drugId);
  if (!d) return null;
  return (
    <Screen
      onBack={onBack}
      onHome={onHome}
      step={1}
      title="Medication Details"
      footer={<PrimaryButton onClick={onNext}>Calculate Dosage</PrimaryButton>}
    >
      <div className="hero-card">
        <DrugHero drug={d} />
      </div>
      <div className="info-rows two-col">
        {drugInfoRows(d).map(({ Icon, title, text, warn }) => (
          <div key={title} className={`info-row ${warn ? "warn" : ""}`}>
            <Icon />
            <div>
              <div className="info-title">{title}</div>
              <div className="info-text">{text}</div>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
