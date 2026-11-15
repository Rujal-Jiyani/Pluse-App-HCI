import React from "react";
import TopBar from "./TopBar.jsx";
import Stepper from "./Stepper.jsx";

// Common page frame: top bar, optional stepper, title + subtitle, decorative wave.
export default function Screen({
  className = "",
  onBack,
  onHome,
  step,
  title,
  subtitle,
  align = "center",
  children,
  footer,
}) {
  return (
    <main className={`screen ${className}`}>
      <TopBar onBack={onBack} onHome={onHome} />
      {step != null && <Stepper currentStep={step} />}
      {title && (
        <div className={`page-head ${align}`}>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="screen-body">{children}</div>
      {footer && <div className="screen-footer">{footer}</div>}
      <svg className="wave" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 200 C 120 200 160 120 260 90 S 380 40 400 30 L 400 200 Z" />
      </svg>
    </main>
  );
}
