import React from "react";
import Screen from "../components/Screen.jsx";
import { ScaleIcon, ChildRulerIcon, ChevronIcon } from "../components/Icons.jsx";

const METHODS = [
  {
    id: "weight",
    title: "Weight-based",
    sub: "Enter the child's weight (kg)",
    Icon: ScaleIcon,
  },
  {
    id: "length",
    title: "Length-based",
    sub: "Enter the child's body length (cm) when weighing isn't possible",
    Icon: ChildRulerIcon,
  },
];

// No option is pre-selected: the clinician must make an explicit choice.
export default function SelectMethod({ onBack, onHome, onSelect }) {
  return (
    <Screen
      onBack={onBack}
      onHome={onHome}
      step={0}
      title="Select Measurement Method"
      subtitle="Choose how to determine the child's size."
    >
      <div className="choice-list">
        {METHODS.map(({ id, title, sub, Icon }) => (
          <button key={id} className="choice-card" onClick={() => onSelect(id)}>
            <span className="choice-icon">
              <Icon size={64} />
            </span>
            <span>
              <span className="choice-title">{title}</span>
              <span className="choice-sub">{sub}</span>
            </span>
            <span className="choice-chevron">
              <ChevronIcon />
            </span>
          </button>
        ))}
      </div>
    </Screen>
  );
}
