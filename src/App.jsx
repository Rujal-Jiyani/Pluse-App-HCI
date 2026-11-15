import React, { useReducer, useState } from "react";
import Home from "./pages/Home.jsx";
import SelectMethod from "./pages/SelectMethod.jsx";
import EnterMeasurement from "./pages/EnterMeasurement.jsx";
import SelectBodyBuild from "./pages/SelectBodyBuild.jsx";
import ConfirmPatient from "./pages/ConfirmPatient.jsx";
import SelectMedication from "./pages/SelectMedication.jsx";
import MedicationDetail from "./pages/MedicationDetail.jsx";
import DosageResult from "./pages/DosageResult.jsx";
import VerifyDose from "./pages/VerifyDose.jsx";
import DoseConfirmed from "./pages/DoseConfirmed.jsx";
import MedicationReference from "./pages/MedicationReference.jsx";
import Guidelines from "./pages/Guidelines.jsx";
import Modal from "./components/Modal.jsx";
import { PrimaryButton, SecondaryButton } from "./components/Buttons.jsx";
import { calculateDose, resolvePatient } from "./engine/calculate.js";

const EMPTY_SESSION = { method: null, value: "", build: null, drugId: null };
const initial = { history: ["home"], session: EMPTY_SESSION };

// Navigating to a page already in the history rewinds to it (used by Edit),
// otherwise the page is pushed. Back pops one page.
function reducer(state, action) {
  const { history, session } = state;
  switch (action.type) {
    case "go": {
      const idx = history.lastIndexOf(action.page);
      const next = idx >= 0 ? history.slice(0, idx + 1) : [...history, action.page];
      return { history: next, session: { ...session, ...(action.patch || {}) } };
    }
    case "back":
      return history.length > 1 ? { ...state, history: history.slice(0, -1) } : state;
    case "home":
      return initial;
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const [askLeave, setAskLeave] = useState(false);
  const page = state.history[state.history.length - 1];
  const s = state.session;

  const go = (p, patch) => dispatch({ type: "go", page: p, patch });
  const back = () => dispatch({ type: "back" });
  const goHome = () => {
    setAskLeave(false);
    dispatch({ type: "home" });
  };
  // Guard against losing entered data (error prevention).
  const requestHome = () => {
    const hasData = s.method && page !== "confirmed";
    if (hasData) setAskLeave(true);
    else goHome();
  };

  const patientInput =
    s.method === "weight"
      ? { method: "weight", weightKg: s.value }
      : { method: "length", lengthCm: s.value, build: s.build };
  const patient = s.method ? resolvePatient(patientInput) : null;
  const result = patient && s.drugId ? calculateDose(patientInput, s.drugId) : null;

  const nav = { onBack: back, onHome: requestHome };
  let view;

  switch (page) {
    case "reference":
      view = <MedicationReference {...nav} onHome={goHome} />;
      break;
    case "guidelines":
      view = <Guidelines {...nav} onHome={goHome} />;
      break;
    case "method":
      view = (
        <SelectMethod
          {...nav}
          onSelect={(m) =>
            go("measure", m === s.method ? { method: m } : { method: m, value: "", build: null })
          }
        />
      );
      break;
    case "measure":
      view = (
        <EnterMeasurement
          key={s.method}
          {...nav}
          method={s.method}
          initialValue={s.value}
          onNext={(v) => go(s.method === "length" ? "build" : "confirmPatient", { value: v })}
        />
      );
      break;
    case "build":
      view = (
        <SelectBodyBuild
          {...nav}
          lengthCm={Number(s.value)}
          onSelect={(b) => go("confirmPatient", { build: b })}
        />
      );
      break;
    case "confirmPatient":
      view = (
        <ConfirmPatient
          {...nav}
          patient={patient}
          onEdit={() => go("measure")}
          onNext={() => go("medication")}
        />
      );
      break;
    case "medication":
      view = (
        <SelectMedication
          {...nav}
          patient={patient}
          onSelect={(id) => go("detail", { drugId: id })}
        />
      );
      break;
    case "detail":
      view = <MedicationDetail {...nav} drugId={s.drugId} onNext={() => go("result")} />;
      break;
    case "result":
      view = (
        <DosageResult
          {...nav}
          result={result}
          onEdit={() => go("measure")}
          onNext={() => go("verify")}
        />
      );
      break;
    case "verify":
      view = <VerifyDose {...nav} result={result} onConfirm={() => go("confirmed")} />;
      break;
    case "confirmed":
      view = <DoseConfirmed result={result} onHome={goHome} />;
      break;
    default:
      view = (
        <Home
          onStart={() => go("method")}
          onReference={() => go("reference")}
          onGuidelines={() => go("guidelines")}
        />
      );
  }

  return (
    <>
      {view}
      {askLeave && (
        <Modal
          title="Leave this calculation?"
          onClose={() => setAskLeave(false)}
          actions={
            <>
              <SecondaryButton onClick={() => setAskLeave(false)}>Stay</SecondaryButton>
              <PrimaryButton className="btn-danger" arrow={false} onClick={goHome}>
                Leave
              </PrimaryButton>
            </>
          }
        >
          The patient details and medication you entered will be cleared.
        </Modal>
      )}
    </>
  );
}
