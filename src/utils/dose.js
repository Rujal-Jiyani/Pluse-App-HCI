// 0.15 -> "0.15", 1.4999999999999998 -> "1.5"
export const fmt = (n, digits = 2) => Number(n.toFixed(digits)).toString();

// Returns { weight, doseMg, volumeMl } or null when a dose can't be calculated.
export function calculateDose({ method, measurement, med }) {
  const weight = parseFloat(measurement);
  if (
    method !== "weight" ||
    !med ||
    !med.dosePerKgMg ||
    !med.concentrationMgPerMl ||
    Number.isNaN(weight) ||
    weight <= 0
  ) {
    return null;
  }
  const doseMg = weight * med.dosePerKgMg;
  const volumeMl = doseMg / med.concentrationMgPerMl;
  return { weight, doseMg, volumeMl };
}
