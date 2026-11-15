// Offline, on-device dose calculation engine.
import { getDrug } from "./formulary.js";
import { estimateWeight, BODY_BUILDS_BY_ID } from "./lengthToWeight.js";
import { validateMeasurement, ADULT_THRESHOLD_KG } from "./validation.js";
import { roundDose, roundVolume } from "./units.js";

// Resolve the patient into actual / ideal / dosing weight.
// patient = { method: "weight", weightKg } | { method: "length", lengthCm, build }
export function resolvePatient(patient) {
  if (!patient) return null;
  if (patient.method === "weight") {
    const v = validateMeasurement("weight", patient.weightKg);
    if (!v.ok) return null;
    return { method: "weight", actualKg: v.value, idealKg: null, estimated: false };
  }
  if (patient.method === "length") {
    const v = validateMeasurement("length", patient.lengthCm);
    if (!v.ok || !BODY_BUILDS_BY_ID[patient.build]) return null;
    const { idealKg, estimatedKg } = estimateWeight(v.value, patient.build);
    return {
      method: "length",
      lengthCm: v.value,
      build: patient.build,
      actualKg: estimatedKg,
      idealKg,
      estimated: true,
    };
  }
  return null;
}

// Returns a full, explainable result or null if it can't be calculated.
export function calculateDose(patient, drugId) {
  const drug = getDrug(drugId);
  const p = resolvePatient(patient);
  if (!drug || !p) return null;

  // Dosing weight: for overweight children use ideal weight (Resus Council UK).
  let dosingKg = p.actualKg;
  let usedIdeal = false;
  if (drug.weightBasis === "ideal" && p.idealKg != null && p.idealKg < p.actualKg) {
    dosingKg = p.idealKg;
    usedIdeal = true;
  }

  const adult = p.actualKg > ADULT_THRESHOLD_KG;
  let dose;
  let capped = false;
  let formula;

  if (adult && drug.adultDose != null) {
    dose = drug.adultDose;
    formula = `Adult dose (patient over ${ADULT_THRESHOLD_KG} kg)`;
  } else {
    const raw = dosingKg * drug.dosePerKg;
    if (raw > drug.maxDose) {
      dose = drug.maxDose;
      capped = true;
    } else {
      dose = raw;
    }
    formula = `${drug.dosePerKg} ${drug.unit}/kg × ${dosingKg.toFixed(1)} kg`;
  }

  dose = roundDose(dose);
  const volumeMl =
    drug.kind === "fluid" ? roundVolume(dose) : roundVolume(dose / drug.concentration);

  return {
    drug,
    patient: p,
    dosingKg,
    usedIdeal,
    adult,
    capped,
    dose,
    doseUnit: drug.unit,
    volumeMl,
    formula,
  };
}
