"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./useInView";

type Variant = "up" | "down" | "left" | "right" | "scale" | "blur";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  /** Delay in milliseconds before the reveal transition starts. */
  delay?: number;
  className?: string;
}

/** Fades / slides its children in the first time they scroll into view. */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-variant={variant}
      className={`fx-reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ "--fx-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
