import React, { useState } from "react";
import Screen from "../components/Screen.jsx";
import PatientChip from "../components/PatientChip.jsx";
import { DrugIcon, ChevronIcon, SearchIcon, ClearIcon } from "../components/Icons.jsx";
import { DRUGS, GROUPS } from "../engine/formulary.js";

export function matches(drug, q) {
  if (!q) return true;
  const hay = `${drug.name} ${drug.indication} ${drug.drugClass} ${drug.group}`.toLowerCase();
  return hay.includes(q.toLowerCase().trim());
}

export function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="search">
      <SearchIcon />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
      />
      {value && (
        <button className="icon-btn" onClick={() => onChange("")} aria-label="Clear search">
          <ClearIcon />
        </button>
      )}
    </div>
  );
}

export default function SelectMedication({ patient, onBack, onHome, onSelect }) {
  const [q, setQ] = useState("");
  const groups = GROUPS.map((g) => ({
    ...g,
    drugs: DRUGS.filter((d) => d.group === g.id && matches(d, q)),
  })).filter((g) => g.drugs.length);

  return (
    <Screen
      onBack={onBack}
      onHome={onHome}
      step={1}
      title="Select Medication"
      subtitle="Choose an emergency medication from the crash cart."
    >
      <PatientChip patient={patient} />
      <SearchBox value={q} onChange={setQ} placeholder="Search medication" />

      <div className="med-groups">
        {groups.map((g) => (
          <section key={g.id} className="med-group" aria-label={g.label}>
            <h2 className="group-label">{g.label}</h2>
            {g.drugs.map((d) => (
              <button key={d.id} className="list-card" onClick={() => onSelect(d.id)}>
                <span className="list-icon">
                  <DrugIcon name={d.icon} size={42} />
                </span>
                <span>
                  <span className="list-title">{d.name}</span>
                  <span className="list-sub">
                    {d.indication} · {d.route}
                  </span>
                </span>
                <span className="list-chevron">
                  <ChevronIcon />
                </span>
              </button>
            ))}
          </section>
        ))}
      </div>
      {!groups.length && <p className="empty">No medication matches “{q}”.</p>}
    </Screen>
  );
}
