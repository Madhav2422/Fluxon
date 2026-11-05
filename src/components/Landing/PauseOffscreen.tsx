"use client";

import { useEffect } from "react";

/**
 * Pauses CSS animations inside landing sections that are off-screen.
 *
 * Some decorative animations (gradient-text shimmer, rotating borders, SVG
 * dashes) need main-thread work every frame even when you can't see them.
 * Pausing them while their section is out of view keeps scrolling smooth on
 * low-end phones; they resume just before the section scrolls into view.
 */
export default function PauseOffscreen() {
  useEffect(() => {
    const root = document.querySelector(".fx-root");
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("fx-offscreen", !entry.isIntersecting);
        }
      },
      { rootMargin: "200px 0px" }
    );

    root.querySelectorAll(":scope > section").forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  return null;
}
