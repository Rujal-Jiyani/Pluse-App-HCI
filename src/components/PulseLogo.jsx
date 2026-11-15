import React from "react";

export default function PulseLogo({ className = "logo-mark" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4fd1c5" />
          <stop offset="100%" stopColor="#1fb5a8" />
        </linearGradient>
      </defs>
      <path
        d="M6 38 H30 L42 34 L54 8 L68 70 L80 30 L90 38 H114"
        stroke="url(#pulseGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
