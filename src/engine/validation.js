export const LIMITS = {
  weight: { min: 0.5, max: 150, unit: "kg", label: "weight" },
  length: { min: 30, max: 150, unit: "cm", label: "length" },
};

export const ADULT_THRESHOLD_KG = 50;

// Returns { ok, error, warning }.
export function validateMeasurement(method, raw) {
  const lim = LIMITS[method];
  if (!lim) return { ok: false, error: "Choose a measurement method first." };
  const str = String(raw ?? "").trim();
  if (str === "" || str === "." || str === "0.") {
    return { ok: false, error: null };
  }
  const n = Number(str);
  if (!Number.isFinite(n)) return { ok: false, error: "Enter a valid number." };
  if (n < lim.min) return { ok: false, error: `Minimum ${lim.label} is ${lim.min} ${lim.unit}.` };
  if (n > lim.max) return { ok: false, error: `Maximum ${lim.label} is ${lim.max} ${lim.unit}.` };
  const warning =
    method === "weight" && n > ADULT_THRESHOLD_KG
      ? "Over 50 kg: adult doses will be used."
      : null;
  return { ok: true, value: n, error: null, warning };
}
