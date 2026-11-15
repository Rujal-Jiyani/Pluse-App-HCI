import React from "react";
import PulseLogo from "../components/PulseLogo.jsx";
import { SirenIcon, ArrowIcon, BookIcon, ShieldIcon } from "../components/Icons.jsx";

export default function Home({ onStart, onReference, onGuidelines }) {
  return (
    <main className="screen home">
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

      <button className="btn btn-primary start-btn" onClick={onStart}>
        <span className="start-left">
          <SirenIcon />
          <span>Start Emergency Session</span>
        </span>
        <ArrowIcon />
      </button>

      <section className="home-cards">
        <button className="home-card" onClick={onReference}>
          <BookIcon />
          <span>
            Medication
            <br />
            Reference
          </span>
        </button>
        <button className="home-card" onClick={onGuidelines}>
          <ShieldIcon />
          <span>
            Protocols &amp;
            <br />
            Guidelines
          </span>
        </button>
      </section>

      <p className="home-footer">For training and educational use · v0.2</p>
    </main>
  );
}
