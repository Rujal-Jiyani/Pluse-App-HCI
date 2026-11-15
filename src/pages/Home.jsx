import React from "react";
import PulseLogo from "../components/PulseLogo.jsx";

function SirenIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 18v-6a5 5 0 0 1 10 0v6" />
      <path d="M5 21h14" />
      <path d="M21 12h1" />
      <path d="M2 12h1" />
      <path d="M12 2v1" />
      <path d="m4.6 4.6.7.7" />
      <path d="m19.4 4.6-.7.7" />
      <path d="M9 18v-6a3 3 0 0 1 3-3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z" />
      <path d="M12 8v6" />
      <path d="M9 11h6" />
    </svg>
  );
}

export default function Home({ onStart }) {
  const handleStart = onStart;

  return (
    <main className="screen">
      <section className="brand">
        <div className="logo">
          <PulseLogo />
          <h1 className="logo-text">PULSE</h1>
        </div>
        <p className="tagline">
          Pediatric Emergency
          <br />
          Dosage &amp; Resuscitation Assistant
        </p>
      </section>

      <button className="start-btn" onClick={handleStart}>
        <span className="start-left">
          <SirenIcon />
          <span>Start Emergency Session</span>
        </span>
        <ArrowIcon />
      </button>

      <section className="cards">
        <button className="card" onClick={() => console.log("Medication Reference")}>
          <BookIcon />
          <span>
            Medication
            <br />
            Reference
          </span>
        </button>
        <button className="card" onClick={() => console.log("Protocols & Guidelines")}>
          <ShieldIcon />
          <span>
            Protocols &amp;
            <br />
            Guidelines
          </span>
        </button>
      </section>
    </main>
  );
}
