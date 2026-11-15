import React, { useState } from "react";
import Screen from "../components/Screen.jsx";
import { DrugIcon, TargetIcon, JarIcon, SyringeIcon, PersonIcon, WarningIcon, RouteIcon, ClockIcon } from "../components/Icons.jsx";
import { DrugHero } from "./MedicationDetail.jsx";
import { SearchBox, matches } from "./SelectMedication.jsx";
import { DRUGS, doseRuleText } from "../engine/formulary.js";

function adultText(d) {
  if (d.adultDose == null) return `${doseRuleText(d)} (max ${d.maxDose} ${d.unit}), same as paediatric`;
  return `${d.adultDose} ${d.unit}`;
}

// Read-only reference: same formulary the calculator uses (single source of truth).
export default function MedicationReference({ onBack, onHome }) {
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(DRUGS[0].id);
  const list = DRUGS.filter((d) => matches(d, q));
  const d = DRUGS.find((x) => x.id === selectedId) || list[0];

  const rows = d && [
    { Icon: TargetIcon, title: "Indication", text: d.indication },
    { Icon: JarIcon, title: d.kind === "fluid" ? "Fluid" : "Concentration", text: d.concentrationLabel },
    { Icon: SyringeIcon, title: "Usual Dose (Adult, over 50 kg)", text: adultText(d) },
    { Icon: PersonIcon, title: "Usual Dose (Pediatric)", text: `${doseRuleText(d)} (max ${d.maxDose} ${d.unit})` },
    { Icon: RouteIcon, title: "Route", text: d.route },
    { Icon: ClockIcon, title: "Repeat", text: d.repeat },
    { Icon: WarningIcon, title: "Key Precautions", text: d.precaution, warn: true },
  ];

  return (
    <Screen onBack={onBack} onHome={onHome} title="Drug Reference" align="left">
      <SearchBox value={q} onChange={setQ} placeholder="Search medication (e.g., Adrenaline)" />

      <h2 className="section-title">Emergency Drugs</h2>
      <div className="chip-grid" role="listbox" aria-label="Medications">
        {list.map((x) => (
          <button
            key={x.id}
            role="option"
            aria-selected={x.id === d?.id}
            className={`drug-chip ${x.id === d?.id ? "selected" : ""}`}
            onClick={() => setSelectedId(x.id)}
          >
            <DrugIcon name={x.icon} size={40} />
            <span>{x.shortName || x.name}</span>
          </button>
        ))}
      </div>
      {!list.length && <p className="empty">No medication matches “{q}”.</p>}

      {d && list.includes(d) && (
        <div className="hero-card" aria-live="polite">
          <DrugHero drug={d} />
          <div className="ref-rows">
            {rows.map(({ Icon, title, text, warn }) => (
              <div key={title} className={`ref-row ${warn ? "warn" : ""}`}>
                <Icon />
                <div>
                  <div className="info-title">{title}</div>
                  <div className="info-text">{text}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="source">Source: {d.source}</p>
        </div>
      )}
      <p className="disclaimer">For training use. Always confirm against local protocols.</p>
    </Screen>
  );
}
