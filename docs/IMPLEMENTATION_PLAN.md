# PULSE: Implementation Plan

**Status:** Implemented (see §6–7 for decisions made during implementation).
**Target device:** Tablet (iPad / Android tablet). Portrait 768×1024 is the main layout. Landscape 1024×768 must also work.
**Course context:** HCI project. Each design decision below names the HCI principle behind it, so the report can cite it.

---

## 0. Where the code stands today

| Area | Current state | Problem |
|---|---|---|
| Navigation | `App.jsx` switches between pages with a `page` state. | No Home button. Every page defines its own copy of the back-arrow icon. |
| Method page | `SelectMethod.jsx` starts with `useState("weight")`. | "By Weight" is highlighted before the user chooses anything. Icons are black, not theme colour. |
| Measurement | `EnterMeasurement.jsx` only checks that the value is `> 0`. | No min/max checks. Units (kg / cm) are not shown on the input. |
| Length flow | `DosageResult.jsx` and `utils/dose.js` return `null` when `method !== "weight"`. | Shows the wrong "length-to-weight reference hasn't been added" message. |
| Medicines | `data/medications.js` has data for Epinephrine only. Atropine, Amiodarone and Fluids are empty. | Only one drug can be calculated. |
| Med list icons | `SelectMedication.jsx` has `HeartIcon` hard-coded to `stroke="#000"`. | Epinephrine icon is black while the others are teal. |
| Result page | Only has a "Verify Dose" button. | No Edit option. |
| Verify page | Has "Edit" and "Confirm" buttons. Confirm only shows a small text line. | Should have no Edit, should use second-clinician wording, and should end with a clear confirmation dialog. |
| Home cards | "Medication Reference" and "Protocols & Guidelines" only run `console.log`. | Pages don't exist. |
| Layout | `.screen { max-width: 480px }`, sized for a phone. | Should be sized for a tablet, with touch feedback instead of hover effects. |

Theme palette (from `App.css`, kept as-is and reused everywhere):
`--primary #0f6b6e`, `--primary-dark #0b5558`, `--tint #e2f1f0`, `--bg #eaf1f1`, `--surface #f2f6f6`, `--line #dbe5e5`, `--ink #14282a`, `--muted #5f7577`, `--danger #d93a35`. Font: Inter.
New tokens to add: `--warning #b7791f` / `--warning-tint #fdf3e1` (adult-dose and range notices) and `--success #1f8a5b` (the Dose Confirmed tick). Every colour pairing will be checked to meet WCAG AA contrast.

---

## 1. New user flow

```
Home
 ├─ Medication Reference   (new page)
 ├─ Protocols & Guidelines (new page)
 └─ Start Emergency Session
       │
       ▼
  Select Method   (nothing pre-selected)
       │
   ┌───┴────────────────┐
 By Weight          By Length
   │                    │
 Enter Weight (kg)  Enter Length (cm)
   │                    │
   │                Body Build  (NEW: Malnourished / Normal / Obese)
   └───────┬────────────┘
           ▼
   Select Medication  (grouped + search)
           ▼
   Medication Detail
           ▼
   Dosage Calculation   [✎ Edit weight / Edit length]  [Verify Dose →]
           ▼
   Second-Clinician Verification   [✓ Verify as Second Clinician]   (no Edit)
           ▼
   ✔ "Dose Confirmed" dialog  → [Calculate another drug] [New patient / Home]
```

The stepper changes from 3 steps to 4: **Patient → Medication → Dose → Verify**. The Verify page currently passes `currentStep={3}` to a 3-step stepper, so the 4th step was never actually displayed.

---

## 2. Work packages

Each package lists the files it touches and the acceptance criteria that mark it done.

### WP1: Tablet layout, touch feedback, shared components (do first)
**Why first:** every later page builds on this.

- **Tablet layout**
  - `.screen` width becomes `min(100%, 760px)` with 32px side padding. Base font size goes up for arm's-length reading.
  - Landscape: Enter Measurement shows the display on the left and the keypad on the right. Lists use 2 columns.
  - `viewport` meta gets `viewport-fit=cover`. Notch safe areas are respected with `env(safe-area-inset-*)`.
- **Touch, not mouse**
  - All tap targets are at least **56×56 px** (Apple HIG minimum 44, Material 48; ER users may be wearing gloves). Primary buttons are at least 64px tall.
  - Press feedback on `:active`: scale to 0.97, darker background, 120ms ease-out. Hover styles move inside `@media (hover: hover)` so they never "stick" on a touchscreen.
  - Add `touch-action: manipulation` (no double-tap zoom delay), `-webkit-tap-highlight-color: transparent`, and `user-select: none` on buttons.
  - Short ripple/fill animation on keypad keys and cards. Honour `prefers-reduced-motion`.
- **Shared components** (in `src/components/`)
  - `TopBar.jsx`: back button (left), PULSE logo (centre), **Home button (right)**, all the same size and in symmetrical positions.
  - `Icons.jsx`: one set of icons that use `currentColor` and are coloured through CSS with `var(--primary)`. This removes the duplicated `BackIcon`/`ArrowIcon` copies and the hard-coded `#000`, `#1f6f6a` and `#1f8f8a`.
  - `Modal.jsx`: accessible dialog (focus trap, `role="dialog"`, Esc/backdrop rules). Used by Dose Confirmed and the "Leave session?" prompt.
  - `PrimaryButton.jsx` / `SecondaryButton.jsx`: consistent shapes and states.
- **Home button behaviour:** shown on every page except Home. If a session has data in it (a value has been entered), tapping Home asks *"Leave this calculation? Entered data will be cleared."* with **Stay** / **Leave**. *(Error prevention, user control & freedom.)*

Files: `App.css`, `index.html`, new `components/TopBar.jsx`, `components/Icons.jsx`, `components/Modal.jsx`, all pages (switch to `TopBar`).
✅ Done when every page shows back and home buttons in symmetric positions, every target is at least 56px, and no hover effect sticks on touch.

### WP2: App state and navigation
- Replace the separate `useState`s in `App.jsx` with one `useReducer` session: `{ method, weightKg, lengthCm, habitus, medicationId, step }`.
- Add `history` in the reducer so Back always returns to the previous screen, including the new Body Build step.
- "Calculate another drug" keeps the patient and goes back to Select Medication. "New patient" clears everything.

Files: `App.jsx`, new `state/session.js`.

### WP3: Select Method page
- Start with **no option selected** (`useState(null)`). Tapping a card highlights it briefly (press feedback) and moves to the next page.
- Recolour the scale and ruler icons to the theme (they are black now).
- Short helper line under each card: *"Use when the child can be weighed"* / *"Use a length tape when weighing isn't possible"*. *(Recognition rather than recall.)*

Files: `pages/SelectMethod.jsx`, `App.css`.

### WP4: Enter Measurement page with validation and units
- Title: **"Enter Patient Weight (kg)"** / **"Enter Patient Length (cm)"**. A large unit suffix (`kg` / `cm`) is shown next to the number in the display.
- Range hint always visible under the display: *"Allowed: 0.5 – 150 kg"* / *"Allowed: 30 – 150 cm"*.
- **Validation rules:**

  | Input | Min | Max | Decimals | Extra rule |
  |---|---|---|---|---|
  | Weight | 0.5 kg | 150 kg *(hard stop, see open question Q2)* | 1 | **> 50 kg:** amber notice *"Over 50 kg: adult doses will be used."* Next is still allowed. |
  | Length | 30 cm | 150 cm | 1 | none |

- The keypad will not accept a second decimal digit or a 4th integer digit. Below min or above max: red border, an ⚠ icon and a text message (*"Minimum is 0.5 kg"*), and Next is disabled. Colour is never the only signal. *(Error prevention, accessibility.)*
- The error appears after the user taps Next or pauses for 600 ms, not while they are still typing "0." on the way to "0.8".

Files: `pages/EnterMeasurement.jsx`, new `engine/validation.js`.

### WP5: Body Build page (new, length path only)
- Title: **"Select Patient Body Build"**. Three large cards, each with a simple silhouette icon in the theme colour:
  1. **Underweight** (Malnourished)
  2. **Normal** (Healthy). It is **not** pre-selected.
  3. **Overweight** (Obese)
- One-line description under each card, e.g. *"Visible ribs, thin limbs"*. *(Recognition rather than recall.)*
- Shows the estimated weight live once a build is selected, e.g. *"Estimated weight: 18.6 kg"*, before moving on. *(Visibility of system status.)*

Files: new `pages/SelectBodyBuild.jsx`, `App.jsx`, `App.css`.

### WP6: Calculation engine (the "backend")
**Decided (Q1):** a separate, pure-JavaScript calculation layer in `src/engine/` that the UI calls like an API. It runs **offline, on the device**, with no network server.
**Why:** an ER tablet cannot depend on Wi-Fi, local calculation is instant, and keeping patient data on the device avoids privacy problems. The engine stays separate from the UI and is fully unit-tested.

```
src/engine/
  formulary.js        drug database (doses, concentrations, max/adult doses, sources)
  lengthToWeight.js   length (cm) + body build → estimated weight
  calculate.js        calculateDose({ weightKg | lengthCm+habitus, drugId }) → result
  validation.js       input range checks
  units.js            formatting (mg / mcg / mEq / g / mL / J), rounding rules
  __tests__/          Vitest unit tests
```

**6a. Length → weight**
- Lookup table of median weight for each length, with linear interpolation, built from the **WHO Child Growth Standards (weight-for-length/height)** and **CDC growth charts** to cover 30–150 cm. Below about 45 cm (preterm newborns) it uses neonatal growth references such as Fenton. Exact sources are confirmed and cited during the research step.
- Body build adjustment, following the approach of habitus-adjusted tapes such as PAWPER:
  - Malnourished: about **0.85 × median**
  - Normal: **1.0 × median**
  - Obese: about **1.2 × median**
  - The factors will be set from the published −2 SD / +2 SD values during research.
- **Dosing weight:** most resuscitation drugs should be dosed on **ideal (lean) body weight** in obese children, while a few use **total body weight** (e.g. succinylcholine). Each drug gets `weightBasis: "ideal" | "total"`, and the result page states which weight was used and why. *(Transparency, so the clinician can trust or override the number.)*

**6b. Dose calculation rules**
1. `dose = weight × dosePerKg`
2. Cap at `maxDose` when the per-kg result is larger.
3. If weight > 50 kg, use the drug's **adult dose** and show the badge *"Adult dose (patient > 50 kg)"*.
4. `volume = dose ÷ concentration`
5. Rounding: under 1 mL → 2 decimals, 1 mL or more → 1 decimal. Doses are shown in their natural unit (mcg when < 1 mg is clearer for fentanyl, etc.).
6. Fluids and defibrillation have no concentration. They show mL or J directly.
7. Every result carries `{ weightUsed, weightBasis, doseValue, doseUnit, concentration, volumeMl, capped, adult, formulaText }` so the UI can show the working, e.g. *"25.1 kg × 0.01 mg/kg = 0.251 mg"*.

**6c. Drug list (research required).** The doses below come from the paediatric resuscitation guidance I know (AHA PALS) and are a **draft**. During implementation each one will be checked against current sources: AHA PALS 2020 and its 2025 update, APLS/ERC paediatric guidelines, BNF for Children, and the Harriet Lane Handbook. The source is stored with each drug and shown on the Reference page. If a source disagrees, the plan comes back to you rather than me picking one silently.

**Decided (Q4):** core set only, covering cardiac arrest, arrhythmia, seizure and fluids.

| Group | Drug / indication | Dose | Max (child) | Adult dose (> 50 kg) | Concentration |
|---|---|---|---|---|---|
| Cardiac arrest | Epinephrine IV/IO | 0.01 mg/kg | 1 mg | 1 mg | 0.1 mg/mL |
| | Amiodarone IV/IO (VF/pVT) | 5 mg/kg | 300 mg | 300 mg | 50 mg/mL |
| | Lidocaine IV/IO (VF/pVT) | 1 mg/kg | 100 mg | 100 mg | 20 mg/mL (2%) |
| Arrhythmia | Adenosine 1st dose | 0.1 mg/kg | 6 mg | 6 mg | 3 mg/mL |
| | Adenosine 2nd dose | 0.2 mg/kg | 12 mg | 12 mg | 3 mg/mL |
| | Atropine (bradycardia) | 0.02 mg/kg | 0.5 mg | 1 mg | 0.1 mg/mL |
| Seizure | Midazolam IV | 0.1 mg/kg | 5 mg | 5 mg | 5 mg/mL |
| | Lorazepam IV | 0.1 mg/kg | 4 mg | 4 mg | 2 mg/mL |
| | Levetiracetam IV | 60 mg/kg | 4500 mg | 4500 mg | 100 mg/mL |
| Fluids | 0.9% saline bolus | 20 mL/kg (10 mL/kg if neonate or cardiac) | 1000 mL | 1000 mL | none |

- Every drug entry also stores `indication`, `route`, `precaution` and `source`.
- More drugs can be added later as a new entry in `formulary.js`, with no UI changes.
- None of the drugs in the core set is dosed on total body weight (succinylcholine was the example, and it's not in the set), so `weightBasis` will be `"ideal"` for all of them for now. The field stays in the engine for future drugs.

**6d. Unit tests** (Vitest, added as a dev dependency) cover:
- every drug at 0.5 kg, 10 kg, 49.9 kg, 50.1 kg and at its max cap;
- length interpolation at 30, 45, 110 and 150 cm for each body build;
- validation boundaries (0.49 / 0.5 / 150 / 150.1).

Files: new `src/engine/*`, replace `data/medications.js` and `utils/dose.js`, `package.json` (add `vitest` and a `test` script).
✅ Done when `npm test` passes and the length path produces a result instead of the error message.

### WP7: Select Medication page
- All icons in theme colour; fixes the black Epinephrine heart.
- Drugs grouped under 4 headers (Cardiac arrest, Arrhythmia, Seizure, Fluids). With only 10 items a search box isn't needed; grouping alone keeps choice time down. *(Hick's law.)*
- Each card shows the drug name, indication and route (e.g. *"Epinephrine · Cardiac arrest · IV/IO"*), so two epinephrine entries can't be confused. *(Error prevention.)*
- A patient summary chip under the stepper: *"18.6 kg (est. from 110 cm, Normal)"*.

Files: `pages/SelectMedication.jsx`, `App.css`.

### WP8: Medication Detail page
- Show data from the formulary: indication, dose per kg, max/adult dose, concentration, route, precaution, source.

Files: `pages/MedicationDetail.jsx`.

### WP9: Dosage Calculation page (fixes the error)
- Remove the wrong *"length-to-weight reference hasn't been added"* notice. The length path now calculates.
- Rows: Patient weight (labelled *estimated* for length, showing the length and build), Medication, Dose (with the formula), Concentration, and **Volume to draw** highlighted.
- Badges when they apply: *"Max dose applied"*, *"Adult dose (> 50 kg)"*, *"Dosed on ideal body weight"*.
- **Bottom action row:** `[✎ Edit weight]` on the **left** of `[Verify Dose →]`. The label is *"Edit length"* when the length method was used. Edit returns to the measurement page with the old value already filled in.
- Edit is a secondary (outlined) button and Verify Dose is primary (filled), so the main action stands out. *(Visual hierarchy, Fitts's law: both large and at the bottom within thumb reach.)*

Files: `pages/DosageResult.jsx`.

### WP10: Second-Clinician Verification page
- Title: **"Second Clinician Check"**, with the subtitle *"A second clinician should independently confirm each value before administration."* This follows the independent double-check practice recommended by ISMP for high-alert medications.
- Same summary table, **no Edit button**. To change something the user goes Back.
- One full-width primary button: **"✓ Verify as Second Clinician"**. *(Q3: alternative wording "Verify as Second Checker" / "Co-sign Dose".)*
- Tapping it opens the Dose Confirmed dialog.

Files: `pages/VerifyDose.jsx`.

### WP11: Dose Confirmed dialog
- A modal over a dimmed page with a **large animated tick** in a green circle at the top. The animation draws the stroke in about 400ms and is skipped if reduced motion is on.
- Heading: **"Dose Confirmed"**.
- Details: Patient weight (and length/build if used), Medication + route, Dose (e.g. *0.251 mg*), Concentration (*0.1 mg/mL*), then **Volume to draw: 2.51 mL** in large bold text on a teal-tint highlight.
- Actions: **Calculate another drug** (same patient) and **New patient** (home).
- It does not close on a backdrop tap, so it can't be dismissed by accident. *(Closure: Shneiderman's "design dialogs to yield closure".)*

Files: new `components/DoseConfirmedModal.jsx`, `App.css`.

### WP12: Medication Reference page (new)
- Opened from the Home card. Uses the shared `TopBar`.
- Searchable, grouped list of **every drug** in the formulary. Each row shows name, indication, route and **concentration** in bold. Tapping a row expands dose/kg, max dose, adult dose, precautions and source.
- Read-only. The formulary is the single source of truth, so this page always matches what the calculator uses.

Files: new `pages/MedicationReference.jsx`, `pages/Home.jsx`, `App.jsx`.

### WP13: Protocols & Guidelines page (new, training guide)
Accordion sections that are short, scannable and include icons:
1. **About PULSE**: purpose, plus the disclaimer *"Training/educational tool. Always follow local protocols and clinical judgement."*
2. **Quick start**: the 6 steps of a session, with a mini screenshot or icon for each.
3. **Weight vs length**: when to use each, how to measure crown-to-heel length lying flat, and the allowed ranges.
4. **Body build**: how to judge malnourished/normal/obese, and how it changes the estimated weight.
5. **How doses are calculated**: the formula, max caps, the adult-dose rule above 50 kg, ideal vs total body weight.
6. **Second clinician check**: why independent double-checks prevent errors, and what the second person should check.
7. **Reading the result**: what each badge and colour means.
8. **Common errors and how PULSE prevents them**: decimal slips (10× errors), wrong units, wrong drug strength.
9. **Practice scenarios**: 3–4 worked training cases (e.g. *"4-year-old, 105 cm, normal build, VF arrest"*) with expected answers that can be revealed.

Files: new `pages/Guidelines.jsx`, `pages/Home.jsx`, `App.jsx`.

### WP14: Home page polish
- Wire up both cards. Same tablet sizing and press animation.
- Small footer: *"For training use · v0.2"*.

---

## 3. HCI principles applied (for the report)

| Principle | Where it shows up |
|---|---|
| **Visibility of system status** (Nielsen #1) | 4-step stepper, live estimated weight, patient chip, badges |
| **Match with the real world** (#2) | Clinical units (kg, cm, mg/mL, J), ER drug grouping, "Second Clinician" wording |
| **User control & freedom** (#3) | Back + Home on every page, Edit on the result page, "Leave session?" prompt |
| **Consistency & standards** (#4) | Shared TopBar, icons, buttons and colour tokens |
| **Error prevention** (#5) | Range validation, keypad input limits, adult-dose switch, max caps, double check, non-dismissable confirmation |
| **Recognition over recall** (#6) | Units always shown, helper text, formula shown, reference page |
| **Aesthetic & minimalist design** (#8) | One primary action per screen, short labels |
| **Help users recover from errors** (#9) | Plain-language messages saying what to fix |
| **Help & documentation** (#10) | Guidelines page with practice scenarios |
| **Fitts's law** | 56px+ targets, primary actions full-width at the bottom |
| **Hick's law** | Drug grouping and search, 2–3 options per decision screen |
| **Feedback & closure** (Shneiderman) | Press animations, Dose Confirmed dialog |
| **Accessibility (WCAG 2.1 AA)** | Contrast-checked palette, never colour alone, ARIA roles, focus handling, reduced motion |

---

## 4. Order of implementation and commits

One commit per step so each part can be reviewed separately:

1. WP1 + WP2: tablet layout, shared TopBar/Home/Icons/Modal, session state
2. WP6: calculation engine + tests (after the research step)
3. WP3 + WP4 + WP5: method page, validation, Body Build page
4. WP7 + WP8 + WP9: medication list, detail, result page with Edit
5. WP10 + WP11: second-clinician page and Dose Confirmed dialog
6. WP12 + WP13 + WP14: Reference and Guidelines pages, Home wiring
7. Final check: `npm test`, `npm run build`, then click through both paths in the browser at 768×1024 and 1024×768 with screenshots

---

## 5. Decisions (answered)

- **Q1. Backend:** On-device, offline calculation engine. No separate server.
- **Q2. Maximum weight:** Hard limit **150 kg**. Above 50 kg, adult doses are used.
- **Q3. Second verifier wording:** **"Verify as Second Clinician"**.
- **Q4. Drug list:** **Core set only**: cardiac arrest, arrhythmia, seizure and fluids (10 entries, §6c).
- **Q5. Body build labels:** **Underweight / Normal / Overweight**, with *(Malnourished) / (Healthy) / (Obese)* underneath.

## 6. Design notes (from the reference mockups)

- **Confirm Patient Details** page added after measurement (and after body build for length): method, weight or length/build/estimated weight, **Edit Measurement**, **Proceed to Medications**.
- **Dosage Result:** big volume-to-draw figure with the formula underneath. "View Calculation" removed. Buttons: **Edit weight / Edit length** (left) and **Verify** (right).
- **Second Clinician Verification:** one button only, **Confirm**. No Edit.
- **Final page:** big animated tick, **Dose Confirmed**, summary including "Verified By: 2 Clinicians", single **Back to Home** button. No Record Administration.
- Stepper labels: **Patient Size → Medication → Calculation → Verify**.
- **Drug Reference** uses the mockup layout: search, drug chip grid, and a detail card for the selected drug.
- Drug names follow the mockups ("Adrenaline (Epinephrine)"). Epinephrine IV/IO uses **0.1 mg/mL**, the correct strength for IV/IO, not the 1 mg/mL shown in the mockup. So 12 kg gives 1.2 mL, not 0.12 mL.

## 7. Research outcome (doses changed from the draft)

- **Midazolam IV** max raised to **10 mg** (EMSC PEAK Status Epilepticus algorithm).
- **Atropine:** paediatric max single dose 0.5 mg; adult dose 1 mg. Some guides use 1 mg as the paediatric cap, so check against your local protocol.
- **Overweight children:** doses use **ideal weight** for length (Resus Council UK). Underweight children use their (lower) estimated weight.
