"use client";

import { FiArrowUp } from "react-icons/fi";
import { prefersReducedMotion } from "../Landing/useInView";

/** "Back to top" — the arrow loops upward on hover. */
export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
      className="ft-top ft-body group inline-flex items-center gap-3 text-sm font-medium text-white/60 transition-colors hover:text-white"
    >
      Back to top
      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-[#2dd4bf]/60 group-hover:bg-white/[0.06]">
        <span className="ft-top-arrows" aria-hidden="true">
          <FiArrowUp size={16} />
          <FiArrowUp size={16} />
        </span>
      </span>
    </button>
  );
}
