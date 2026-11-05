"use client";

import { useRef, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  className?: string;
}

/** Wrapper that gently pulls its child towards the cursor while hovered. */
export default function Magnetic({ children, strength = 0.3, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`fx-magnetic inline-block ${className}`}
    >
      {children}
    </div>
  );
}
