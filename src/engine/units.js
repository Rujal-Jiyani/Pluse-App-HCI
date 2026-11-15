// Trim floating noise: 1.4999999 -> "1.5"
export function fmt(n, digits = 2) {
  if (n == null || !Number.isFinite(n)) return "–";
  return Number(n.toFixed(digits)).toString();
}

// Volumes: < 1 mL -> 2 decimals, 1–99 mL -> 1 decimal, >= 100 mL -> whole number.
export function roundVolume(ml) {
  if (ml < 1) return Math.round(ml * 100) / 100;
  if (ml < 100) return Math.round(ml * 10) / 10;
  return Math.round(ml);
}

// Doses: up to 3 significant decimals for small amounts.
export function roundDose(v) {
  if (v < 1) return Math.round(v * 1000) / 1000;
  if (v < 100) return Math.round(v * 100) / 100;
  return Math.round(v);
}

export function fmtVolume(ml) {
  return `${fmt(roundVolume(ml), 2)} mL`;
}

export function fmtDose(v, unit) {
  return `${fmt(roundDose(v), 3)} ${unit}`;
}

export const fmtKg = (kg) => `${Number(kg).toFixed(1)} kg`;
