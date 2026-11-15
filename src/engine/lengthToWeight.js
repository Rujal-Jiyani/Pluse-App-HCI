// Length (cm) -> estimated weight (kg), with a body-build adjustment.
// TRAINING USE ONLY.
//
// Table: approximate 50th-percentile weight for a given length/height, sex-averaged.
//   30–50 cm   Fenton preterm growth chart (gestational-age medians)
//   50–87 cm   WHO Child Growth Standards (weight-for-length)
//   87–150 cm  CDC 2000 growth charts (median height-for-age paired with
//              median weight-for-age, ages 2–12 years)
// Body build factors follow the habitus-adjustment idea of the PAWPER tape:
// underweight ≈ -2 SD (~85% of median), overweight ≈ +2 SD (~120% of median).

export const LENGTH_TABLE = [
  [30, 0.65],
  [33.5, 0.85],
  [36.5, 1.1],
  [39.5, 1.4],
  [42, 1.75],
  [44.5, 2.2],
  [46.5, 2.7],
  [48.5, 3.1],
  [50, 3.4],
  [54, 4.3],
  [57.5, 5.2],
  [63, 6.7],
  [66.5, 7.6],
  [71, 8.6],
  [75, 9.4],
  [81, 10.6],
  [87, 12.2],
  [95, 14.3],
  [102.5, 16.3],
  [109, 18.4],
  [115.5, 20.7],
  [121.7, 23.0],
  [127.5, 25.6],
  [133, 28.5],
  [138.5, 32.0],
  [144, 36.0],
  [150, 40.5],
];

export const BODY_BUILDS = [
  {
    id: "underweight",
    label: "Underweight",
    clinical: "Malnourished",
    hint: "Thin limbs, visible ribs, little body fat",
    factor: 0.85,
  },
  {
    id: "normal",
    label: "Normal",
    clinical: "Healthy",
    hint: "Typical build for size",
    factor: 1.0,
  },
  {
    id: "overweight",
    label: "Overweight",
    clinical: "Obese",
    hint: "Round abdomen, fuller face and limbs",
    factor: 1.2,
  },
];

export const BODY_BUILDS_BY_ID = Object.fromEntries(BODY_BUILDS.map((b) => [b.id, b]));

// Median (ideal) weight for a length, by linear interpolation.
export function medianWeightForLength(lengthCm) {
  const t = LENGTH_TABLE;
  if (lengthCm <= t[0][0]) return t[0][1];
  if (lengthCm >= t[t.length - 1][0]) return t[t.length - 1][1];
  for (let i = 1; i < t.length; i++) {
    const [l1, w1] = t[i];
    if (lengthCm <= l1) {
      const [l0, w0] = t[i - 1];
      return w0 + ((lengthCm - l0) / (l1 - l0)) * (w1 - w0);
    }
  }
  return t[t.length - 1][1];
}

const round1 = (n) => Math.round(n * 10) / 10;

// Returns { idealKg, estimatedKg } rounded to 0.1 kg.
export function estimateWeight(lengthCm, buildId = "normal") {
  const build = BODY_BUILDS_BY_ID[buildId] || BODY_BUILDS_BY_ID.normal;
  const ideal = medianWeightForLength(lengthCm);
  return { idealKg: round1(ideal), estimatedKg: round1(ideal * build.factor) };
}
