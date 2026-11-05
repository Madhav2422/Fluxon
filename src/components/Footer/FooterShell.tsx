"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The <footer> element. Marks when it first scrolls into view (data-revealed, for the
 * entrance animations) and whether it is currently on screen (data-active, so looping
 * animations only run while visible). Updates attributes directly — no re-renders.
 */
export default function FooterShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.active = String(entry.isIntersecting);
        if (entry.isIntersecting) el.dataset.revealed = "true";
      },
      { threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer ref={ref} className="ft-root">
      {children}
    </footer>
  );
}
