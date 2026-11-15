import React, { useEffect, useRef } from "react";

// Accessible dialog: traps focus, Esc closes (unless `dismissable` is false).
export default function Modal({ title, children, actions, onClose, dismissable = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    const first = ref.current?.querySelector("button");
    first?.focus();
    const onKey = (e) => {
      if (e.key === "Escape" && dismissable && onClose) onClose();
      if (e.key === "Tab" && ref.current) {
        const items = ref.current.querySelectorAll("button");
        if (!items.length) return;
        const a = items[0];
        const b = items[items.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [dismissable, onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (dismissable && e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={ref}>
        <h2 id="modal-title" className="modal-title">
          {title}
        </h2>
        <div className="modal-body">{children}</div>
        <div className="modal-actions">{actions}</div>
      </div>
    </div>
  );
}
