import React, { useState } from "react";
import Screen from "../components/Screen.jsx";
import { SecondaryButton } from "../components/Buttons.jsx";
import { ChevronDownIcon } from "../components/Icons.jsx";
import { calculateDose } from "../engine/calculate.js";
import { fmtDose, fmtVolume } from "../engine/units.js";

// Practice answers are computed by the real engine so they always match the app.
function answer(patient, drugId) {
  const r = calculateDose(patient, drugId);
  if (!r) return "–";
  const w = r.dosingKg.toFixed(1);
  return r.drug.kind === "fluid"
    ? `${fmtVolume(r.volumeMl)} (${r.formula})`
    : `${fmtDose(r.dose, r.doseUnit)} = ${fmtVolume(r.volumeMl)} of ${r.drug.concentrationLabel} (dosing weight ${w} kg)`;
}

const SCENARIOS = [
  {
    q: "A 12 kg toddler is in cardiac arrest (asystole). What volume of adrenaline do you draw up?",
    patient: { method: "weight", weightKg: "12" },
    drug: "epinephrine",
  },
  {
    q: "A child cannot be weighed. Length 110 cm, normal build, in SVT. What is the first adenosine dose?",
    patient: { method: "length", lengthCm: "110", build: "normal" },
    drug: "adenosine-1",
  },
  {
    q: "A 30 kg child is seizing for 7 minutes with IV access. What lorazepam dose is given?",
    patient: { method: "weight", weightKg: "30" },
    drug: "lorazepam",
  },
  {
    q: "A 140 cm overweight child is in shock. What fluid bolus volume should be given?",
    patient: { method: "length", lengthCm: "140", build: "overweight" },
    drug: "saline-bolus",
  },
  {
    q: "A 62 kg adolescent has symptomatic bradycardia. What atropine dose applies?",
    patient: { method: "weight", weightKg: "62" },
    drug: "atropine",
  },
];

function Scenario({ s, n }) {
  const [show, setShow] = useState(false);
  return (
    <div className="scenario">
      <p>
        <strong>Case {n}.</strong> {s.q}
      </p>
      {show ? (
        <p className="answer">
          <strong>Answer:</strong> {answer(s.patient, s.drug)}
        </p>
      ) : (
        <SecondaryButton onClick={() => setShow(true)}>Reveal answer</SecondaryButton>
      )}
    </div>
  );
}

const SECTIONS = [
  {
    title: "About PULSE",
    body: (
      <>
        <p>
          PULSE helps ER teams calculate emergency drug doses for children quickly and safely. It
          converts the child's size into a dose and the exact <strong>volume to draw</strong>.
        </p>
        <p>
          <strong>For training and educational use.</strong> Always follow your local protocols and
          clinical judgement. All calculations run on this tablet; no data leaves the device.
        </p>
      </>
    ),
  },
  {
    title: "Quick start: one session in 6 steps",
    body: (
      <ol>
        <li>Tap <strong>Start Emergency Session</strong> on the home screen.</li>
        <li>Choose <strong>Weight-based</strong> or <strong>Length-based</strong>.</li>
        <li>Enter the weight (kg) or length (cm) on the keypad. For length, choose the body build.</li>
        <li>Check the <strong>Confirm Patient Details</strong> screen, then pick the medication.</li>
        <li>Read the details and tap <strong>Calculate Dosage</strong>. Review the result.</li>
        <li>Tap <strong>Verify</strong>, hand the tablet to a second clinician, who taps <strong>Confirm</strong>.</li>
      </ol>
    ),
  },
  {
    title: "Weight vs length: which to use",
    body: (
      <>
        <ul>
          <li><strong>Weight-based</strong> is most accurate. Use it when the child has a known or measured weight. Allowed range: 0.5 – 150 kg.</li>
          <li><strong>Length-based</strong> is for when weighing is impossible (e.g. during CPR). Measure crown-to-heel with the child lying flat. Allowed range: 30 – 150 cm.</li>
        </ul>
        <p>Values outside the range are blocked and a message explains why.</p>
      </>
    ),
  },
  {
    title: "Choosing body build",
    body: (
      <>
        <ul>
          <li><strong>Underweight (Malnourished):</strong> thin limbs, visible ribs. Estimated weight ≈ 85% of typical.</li>
          <li><strong>Normal (Healthy):</strong> typical build for the length.</li>
          <li><strong>Overweight (Obese):</strong> round abdomen, fuller face and limbs. Estimated weight ≈ 120% of typical.</li>
        </ul>
        <p>
          Each option shows the resulting estimated weight before you choose. For overweight
          children, drug doses use the <strong>ideal weight</strong> for the length, because
          dosing on total weight can cause overdose.
        </p>
      </>
    ),
  },
  {
    title: "How doses are calculated",
    body: (
      <>
        <ul>
          <li><strong>Dose</strong> = dosing weight × dose per kg</li>
          <li>If the result is above the drug's <strong>maximum dose</strong>, the maximum is used and a badge is shown.</li>
          <li>Children <strong>over 50 kg</strong> receive the <strong>adult dose</strong>.</li>
          <li><strong>Volume to draw</strong> = dose ÷ concentration. Volumes under 1 mL are shown to 2 decimals.</li>
        </ul>
        <p>The working (e.g. 0.01 mg/kg × 12.0 kg) is always shown under the result.</p>
      </>
    ),
  },
  {
    title: "Second clinician check",
    body: (
      <>
        <p>
          Paediatric dosing errors (especially 10× decimal errors) are common under pressure. An
          <strong> independent double check</strong> by a second clinician catches most of them.
        </p>
        <p>The second clinician should confirm, without being told the answer:</p>
        <ul>
          <li>Right patient size and method</li>
          <li>Right drug and concentration on the vial in hand</li>
          <li>Right dose and volume, and right route</li>
        </ul>
        <p>The Verify screen has no Edit button on purpose: if anything is wrong, go Back and correct it.</p>
      </>
    ),
  },
  {
    title: "Reading the screens",
    body: (
      <ul>
        <li><strong>Stepper</strong> at the top shows where you are: Patient Size → Medication → Calculation → Verify.</li>
        <li><strong>Amber</strong> badges/notes = a rule changed the dose (maximum dose, adult dose).</li>
        <li><strong>Teal</strong> badges = information (weight estimated from length, ideal weight used).</li>
        <li><strong>Red</strong> messages = input that must be corrected.</li>
        <li><strong>Home</strong> (top right) asks before discarding a session in progress.</li>
      </ul>
    ),
  },
  {
    title: "Common errors and how PULSE prevents them",
    body: (
      <ul>
        <li><strong>Decimal slips:</strong> the keypad allows only one decimal place and blocks out-of-range values.</li>
        <li><strong>Wrong units:</strong> kg / cm / mg / mL are shown next to every number.</li>
        <li><strong>Wrong strength:</strong> the concentration used is displayed with every result. Compare it to the vial.</li>
        <li><strong>Overdose in large children:</strong> maximum and adult dose caps are applied automatically.</li>
      </ul>
    ),
  },
  {
    title: "Practice scenarios",
    body: (
      <>
        <p>Work out each answer with PULSE, then reveal to check.</p>
        {SCENARIOS.map((s, i) => (
          <Scenario key={i} s={s} n={i + 1} />
        ))}
      </>
    ),
  },
];

export default function Guidelines({ onBack, onHome }) {
  const [open, setOpen] = useState(1);
  return (
    <Screen
      onBack={onBack}
      onHome={onHome}
      title="Protocols & Guidelines"
      subtitle="How to use PULSE: a training guide."
      align="left"
    >
      <div className="accordion">
        {SECTIONS.map((s, i) => {
          const isOpen = open === i;
          return (
            <section key={s.title} className={`acc-item ${isOpen ? "open" : ""}`}>
              <button
                className="acc-head"
                aria-expanded={isOpen}
                aria-controls={`acc-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="acc-num">{i + 1}</span>
                <span>{s.title}</span>
                <span className="chev">
                  <ChevronDownIcon />
                </span>
              </button>
              {isOpen && (
                <div className="acc-body" id={`acc-${i}`}>
                  {s.body}
                </div>
              )}
            </section>
          );
        })}
      </div>
      <p className="disclaimer">For training use. Always confirm against local protocols.</p>
    </Screen>
  );
}
