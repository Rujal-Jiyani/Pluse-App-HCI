import React from "react";

// All icons use currentColor so CSS controls the theme colour.
function Svg({ size = 24, stroke = 2, children, viewBox = "0 0 24 24", ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const BackIcon = (p) => (
  <Svg size={32} stroke={2.4} {...p}>
    <path d="M20 12H4" />
    <path d="m10 6-6 6 6 6" />
  </Svg>
);

export const HomeIcon = (p) => (
  <Svg size={32} stroke={2.2} {...p}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 9.5V20h13V9.5" />
    <path d="M10 20v-5.5h4V20" />
  </Svg>
);

export const ArrowIcon = (p) => (
  <Svg size={30} stroke={2.4} {...p}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </Svg>
);

export const ChevronIcon = (p) => (
  <Svg size={26} stroke={2.6} {...p}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
);

export const CheckIcon = (p) => (
  <Svg size={28} stroke={2.8} {...p}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </Svg>
);

export const PencilIcon = (p) => (
  <Svg size={28} stroke={2.1} {...p}>
    <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z" />
    <path d="m14.5 6.5 3 3" />
  </Svg>
);

export const InfoIcon = (p) => (
  <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <path d="M12 10.5v6.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="12" cy="7" r="1.5" fill="#fff" />
  </svg>
);

export const WarningIcon = (p) => (
  <Svg size={26} stroke={2.1} {...p}>
    <path d="M12 3 2 20.5h20z" />
    <path d="M12 10v5" />
    <path d="M12 17.8v.2" />
  </Svg>
);

export const SearchIcon = (p) => (
  <Svg size={26} stroke={2.2} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </Svg>
);

export const ClearIcon = (p) => (
  <Svg size={22} stroke={2.4} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

export const BackspaceIcon = (p) => (
  <Svg size={36} stroke={2} {...p}>
    <path d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7z" />
    <path d="m12 9 6 6" />
    <path d="m18 9-6 6" />
  </Svg>
);

export const SirenIcon = (p) => (
  <Svg size={36} stroke={1.8} {...p}>
    <path d="M7 18v-6a5 5 0 0 1 10 0v6" />
    <path d="M5 21h14" />
    <path d="M21 12h1M2 12h1M12 2v1" />
    <path d="m4.6 4.6.7.7M19.4 4.6l-.7.7" />
    <path d="M9 18v-6a3 3 0 0 1 3-3" />
  </Svg>
);

export const BookIcon = (p) => (
  <Svg size={48} stroke={1.8} {...p}>
    <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
    <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
  </Svg>
);

export const ShieldIcon = (p) => (
  <Svg size={46} stroke={1.8} {...p}>
    <path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z" />
    <path d="M12 8v6M9 11h6" />
  </Svg>
);

export const ShieldCheckIcon = (p) => (
  <Svg size={30} stroke={1.9} {...p}>
    <path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </Svg>
);

// ---- Measurement ----
export const ScaleIcon = (p) => (
  <Svg size={64} stroke={1.9} viewBox="0 0 48 48" {...p}>
    <path d="M10 10h28a4 4 0 0 1 4 4l-2 22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4L6 14a4 4 0 0 1 4-4z" />
    <path d="M16 18a8 8 0 0 1 16 0z" />
    <path d="m24 18 3-4" />
  </Svg>
);

export const ChildRulerIcon = (p) => (
  <svg width={p.size || 64} height={p.size || 64} viewBox="0 0 48 48" aria-hidden="true">
    <g fill="currentColor">
      <circle cx="16" cy="9" r="4" />
      <path d="M10 16a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v11h-2.5v13h-3.5V30h-.5v10H12V27H10z" />
    </g>
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M32 6v36" />
      <path d="M32 7h7M32 17h5M32 27h7M32 37h5M32 42h7" />
    </g>
  </svg>
);

export const ChildFaceIcon = (p) => (
  <Svg size={96} stroke={1.8} viewBox="0 0 48 48" {...p}>
    <circle cx="24" cy="18" r="10" />
    <path d="M15 15c3-5 13-6 18 0" />
    <circle cx="20.5" cy="18.5" r=".8" fill="currentColor" />
    <circle cx="27.5" cy="18.5" r=".8" fill="currentColor" />
    <path d="M21 22.5c1.8 1.4 4.2 1.4 6 0" />
    <path d="M10 42c0-7 6-11 14-11s14 4 14 11z" />
  </Svg>
);

// Body build silhouettes
const Body = ({ w, ...p }) => (
  <svg width={p.size || 64} height={p.size || 64} viewBox="0 0 48 48" aria-hidden="true">
    <g fill="currentColor">
      <circle cx="24" cy="8" r="5" />
      <rect x={24 - w / 2} y="15" width={w} height="16" rx={Math.min(6, w / 2.4)} />
      <rect x={24 - w / 2 + 1} y="30" width={w / 2 - 2} height="14" rx="2" />
      <rect x={24 + 1} y="30" width={w / 2 - 2} height="14" rx="2" />
    </g>
  </svg>
);
export const BuildIcon = ({ build, ...p }) => (
  <Body w={build === "underweight" ? 8 : build === "overweight" ? 20 : 13} {...p} />
);

// ---- Drug & table icons ----
export const SyringeIcon = (p) => (
  <Svg size={40} stroke={1.9} viewBox="0 0 36 36" {...p}>
    <path d="m24 5 7 7M26 7l3 3" />
    <path d="m21 9 6 6-13 13-6-6z" />
    <path d="m8 28-4 4" />
    <path d="m14 17 3 3M18 13l3 3M10 21l3 3" />
  </Svg>
);

export const HeartIcon = (p) => (
  <Svg size={40} stroke={1.9} viewBox="0 0 48 48" {...p}>
    <path d="M24 41S6 30 6 18a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23z" />
    <path d="M12 24h7l3-6 4 11 3-5h7" />
  </Svg>
);

export const LungsIcon = (p) => (
  <Svg size={40} stroke={1.9} viewBox="0 0 48 48" {...p}>
    <path d="M24 8v16M24 16c-3 0-4 3-4 3M24 16c3 0 4 3 4 3" />
    <path d="M20 19c-5 2-10 9-10 17 0 2 2 3 4 2 4-1 6-4 6-8z" />
    <path d="M28 19c5 2 10 9 10 17 0 2-2 3-4 2-4-1-6-4-6-8z" />
  </Svg>
);

export const DripIcon = (p) => (
  <Svg size={40} stroke={1.9} viewBox="0 0 48 48" {...p}>
    <path d="M17 5h14v20a7 7 0 0 1-14 0z" />
    <path d="M17 12h8" />
    <path d="M24 32v6M24 38c-3 0-4 2-4 5" />
  </Svg>
);

export const VialIcon = (p) => (
  <Svg size={40} stroke={1.9} viewBox="0 0 48 48" {...p}>
    <rect x="17" y="4" width="14" height="6" rx="1.5" />
    <path d="M19 10v28a5 5 0 0 0 10 0V10" />
    <path d="M19 24h10" />
  </Svg>
);

export const BottleIcon = (p) => (
  <Svg size={40} stroke={1.9} viewBox="0 0 48 48" {...p}>
    <rect x="15" y="5" width="18" height="7" rx="2" />
    <rect x="12" y="12" width="24" height="30" rx="4" />
    <path d="M24 21v12M18 27h12" />
  </Svg>
);

export const IVBagIcon = (p) => (
  <Svg size={40} stroke={1.9} viewBox="0 0 48 48" {...p}>
    <path d="M20 4h8M24 4v5" />
    <rect x="14" y="9" width="20" height="24" rx="6" />
    <path d="M18 18h12M18 24h12" />
    <path d="M24 33v7M24 40c-2 0-3 1-3 3" />
  </Svg>
);

export const PersonIcon = (p) => (
  <Svg size={32} stroke={1.9} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
  </Svg>
);

export const TargetIcon = (p) => (
  <Svg size={32} stroke={1.9} {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
  </Svg>
);

export const JarIcon = (p) => (
  <Svg size={32} stroke={1.9} {...p}>
    <rect x="6" y="2.5" width="12" height="4" rx="1" />
    <rect x="5" y="6.5" width="14" height="15" rx="2.5" />
    <path d="M12 11v6M9 14h6" />
  </Svg>
);

export const CalculatorIcon = (p) => (
  <Svg size={32} stroke={1.9} {...p}>
    <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
    <path d="M8 6.5h8" />
    <path d="M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01" strokeWidth="2.6" />
  </Svg>
);

export const RouteIcon = DripIconSmall;
function DripIconSmall(p) {
  return (
    <Svg size={32} stroke={1.9} {...p}>
      <path d="M8 2.5h8v10a4 4 0 0 1-8 0z" />
      <path d="M12 16.5v5" />
    </Svg>
  );
}

export const PillIcon = (p) => (
  <Svg size={32} stroke={1.9} {...p}>
    <g transform="rotate(-45 12 12)">
      <rect x="3" y="8" width="18" height="8" rx="4" />
      <path d="M12 8v8" />
    </g>
  </Svg>
);

export const ClockIcon = (p) => (
  <Svg size={32} stroke={1.9} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

export const ChevronDownIcon = (p) => (
  <Svg size={26} stroke={2.4} {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

const DRUG_ICONS = {
  syringe: SyringeIcon,
  heart: HeartIcon,
  lungs: LungsIcon,
  drip: DripIcon,
  vial: VialIcon,
  bottle: BottleIcon,
  ivbag: IVBagIcon,
};

export function DrugIcon({ name, ...p }) {
  const C = DRUG_ICONS[name] || SyringeIcon;
  return <C {...p} />;
}
