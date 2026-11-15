import { describe, it, expect } from "vitest";
import { calculateDose } from "./calculate.js";
import { validateMeasurement } from "./validation.js";
import { estimateWeight, medianWeightForLength } from "./lengthToWeight.js";
import { DRUGS } from "./formulary.js";

const w = (weightKg) => ({ method: "weight", weightKg });

describe("validation", () => {
  it("enforces weight limits", () => {
    expect(validateMeasurement("weight", "0.4").ok).toBe(false);
    expect(validateMeasurement("weight", "0.5").ok).toBe(true);
    expect(validateMeasurement("weight", "150").ok).toBe(true);
    expect(validateMeasurement("weight", "150.1").ok).toBe(false);
  });
  it("warns above 50 kg", () => {
    expect(validateMeasurement("weight", "50").warning).toBeNull();
    expect(validateMeasurement("weight", "50.1").warning).toMatch(/adult/i);
  });
  it("enforces length limits", () => {
    expect(validateMeasurement("length", "29.9").ok).toBe(false);
    expect(validateMeasurement("length", "30").ok).toBe(true);
    expect(validateMeasurement("length", "150").ok).toBe(true);
    expect(validateMeasurement("length", "151").ok).toBe(false);
  });
});

describe("weight-based doses", () => {
  it("epinephrine 12 kg -> 0.12 mg, 1.2 mL", () => {
    const r = calculateDose(w(12), "epinephrine");
    expect(r.dose).toBe(0.12);
    expect(r.volumeMl).toBe(1.2);
  });
  it("epinephrine 25.1 kg -> 0.251 mg, 2.5 mL", () => {
    const r = calculateDose(w(25.1), "epinephrine");
    expect(r.dose).toBe(0.251);
    expect(r.volumeMl).toBe(2.5);
  });
  it("amiodarone caps at 300 mg below 50 kg", () => {
    const r = calculateDose(w(49.9), "amiodarone");
    expect(r.dose).toBe(250); // 249.5 rounded to whole mg
    expect(r.capped).toBe(false);
  });
  it("atropine caps at 0.5 mg (30 kg)", () => {
    const r = calculateDose(w(30), "atropine");
    expect(r.dose).toBe(0.5);
    expect(r.capped).toBe(true);
    expect(r.volumeMl).toBe(5);
  });
  it("switches to adult dose above 50 kg", () => {
    const r = calculateDose(w(50.1), "atropine");
    expect(r.adult).toBe(true);
    expect(r.dose).toBe(1);
  });
  it("levetiracetam keeps weight-based dosing for adults, capped", () => {
    expect(calculateDose(w(60), "levetiracetam").dose).toBe(3600);
    expect(calculateDose(w(100), "levetiracetam").dose).toBe(4500);
  });
  it("fluid bolus 20 mL/kg", () => {
    const r = calculateDose(w(10), "saline-bolus");
    expect(r.volumeMl).toBe(200);
  });
  it("every drug gives a finite positive result from 0.5 to 150 kg", () => {
    for (const d of DRUGS) {
      for (const kg of [0.5, 10, 49.9, 50.1, 150]) {
        const r = calculateDose(w(kg), d.id);
        expect(r, `${d.id} @ ${kg}`).not.toBeNull();
        expect(r.volumeMl).toBeGreaterThan(0);
        expect(Number.isFinite(r.volumeMl)).toBe(true);
      }
    }
  });
  it("rejects invalid weights", () => {
    expect(calculateDose(w(0.3), "epinephrine")).toBeNull();
    expect(calculateDose(w(200), "epinephrine")).toBeNull();
  });
});

describe("length-based estimation", () => {
  it("interpolates the median table", () => {
    expect(medianWeightForLength(30)).toBeCloseTo(0.65);
    expect(medianWeightForLength(150)).toBeCloseTo(40.5);
    expect(medianWeightForLength(110)).toBeGreaterThan(18.4);
    expect(medianWeightForLength(110)).toBeLessThan(20.7);
  });
  it("applies body build factors", () => {
    const n = estimateWeight(110, "normal").estimatedKg;
    expect(estimateWeight(110, "underweight").estimatedKg).toBeLessThan(n);
    expect(estimateWeight(110, "overweight").estimatedKg).toBeGreaterThan(n);
  });
  it("length path calculates a dose (no more 'not added yet' error)", () => {
    const r = calculateDose({ method: "length", lengthCm: 110, build: "normal" }, "epinephrine");
    expect(r).not.toBeNull();
    expect(r.patient.estimated).toBe(true);
  });
  it("overweight child is dosed on ideal weight", () => {
    const r = calculateDose({ method: "length", lengthCm: 110, build: "overweight" }, "epinephrine");
    expect(r.usedIdeal).toBe(true);
    expect(r.dosingKg).toBe(r.patient.idealKg);
  });
  it("underweight child is dosed on estimated (lower) weight", () => {
    const r = calculateDose({ method: "length", lengthCm: 110, build: "underweight" }, "epinephrine");
    expect(r.usedIdeal).toBe(false);
    expect(r.dosingKg).toBe(r.patient.actualKg);
  });
  it("requires a body build", () => {
    expect(calculateDose({ method: "length", lengthCm: 110 }, "epinephrine")).toBeNull();
  });
});
