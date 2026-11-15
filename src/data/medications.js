// Medication reference data shown on the detail page.
// Epinephrine comes from the provided design. The other entries are left empty
// on purpose: fill them in from a verified clinical source before real use.
export const MEDICATION_DETAILS = {
  epinephrine: {
    name: "Epinephrine",
    indication: "Cardiac arrest,\nsevere allergic reaction",
    dose: "0.01 mg/kg (IV/IO)",
    concentration: "0.1 mg/mL",
    precaution: "Monitor heart rate\nand rhythm",
    // Numbers used by the dose calculation on the result page
    dosePerKgMg: 0.01,
    concentrationMgPerMl: 0.1,
  },
  atropine: {
    name: "Atropine",
    indication: "",
    dose: "",
    concentration: "",
    precaution: "",
  },
  amiodarone: {
    name: "Amiodarone",
    indication: "",
    dose: "",
    concentration: "",
    precaution: "",
  },
  fluids: {
    name: "Fluids",
    indication: "",
    dose: "",
    concentration: "",
    precaution: "",
  },
};
