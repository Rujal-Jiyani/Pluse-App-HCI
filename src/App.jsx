import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import SelectMethod from "./pages/SelectMethod.jsx";
import EnterMeasurement from "./pages/EnterMeasurement.jsx";
import SelectMedication from "./pages/SelectMedication.jsx";
import MedicationDetail from "./pages/MedicationDetail.jsx";
import DosageResult from "./pages/DosageResult.jsx";
import VerifyDose from "./pages/VerifyDose.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [method, setMethod] = useState("weight");
  const [measurement, setMeasurement] = useState("");
  const [medication, setMedication] = useState(null);

  if (page === "verify") {
    return (
      <VerifyDose
        method={method}
        measurement={measurement}
        medicationId={medication}
        onBack={() => setPage("result")}
        onEdit={() => setPage("measure")}
        onConfirm={(data) => console.log("Dose confirmed:", data)}
      />
    );
  }

  if (page === "result") {
    return (
      <DosageResult
        method={method}
        measurement={measurement}
        medicationId={medication}
        onBack={() => setPage("detail")}
        onNext={() => setPage("verify")}
      />
    );
  }

  if (page === "detail") {
    return (
      <MedicationDetail
        medicationId={medication}
        onBack={() => setPage("medication")}
        onCalculate={() => setPage("result")}
      />
    );
  }

  if (page === "medication") {
    return (
      <SelectMedication
        onBack={() => setPage("measure")}
        onSelect={(id) => {
          setMedication(id);
          setPage("detail");
        }}
      />
    );
  }

  if (page === "measure") {
    return (
      <EnterMeasurement
        method={method}
        initialValue={measurement}
        onBack={() => setPage("method")}
        onNext={(value) => {
          setMeasurement(String(value));
          setPage("medication");
        }}
      />
    );
  }

  if (page === "method") {
    return (
      <SelectMethod
        onBack={() => setPage("home")}
        onSelect={(id) => {
          if (id !== method) setMeasurement("");
          setMethod(id);
          setPage("measure");
        }}
      />
    );
  }

  return <Home onStart={() => setPage("method")} />;
}
