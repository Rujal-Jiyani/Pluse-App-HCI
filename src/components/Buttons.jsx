import React from "react";
import { ArrowIcon } from "./Icons.jsx";

export function PrimaryButton({ children, arrow = true, icon, className = "", ...rest }) {
  return (
    <button className={`btn btn-primary ${className}`} {...rest}>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowIcon />}
    </button>
  );
}

export function SecondaryButton({ children, icon, className = "", ...rest }) {
  return (
    <button className={`btn btn-secondary ${className}`} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
