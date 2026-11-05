import type { ReactNode } from "react";

/** Small pill label that sits above section headings. */
export default function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`fx-body inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] ${
        dark
          ? "border-[#2dd4bf]/25 bg-white/[0.04] text-[#5eead4]"
          : "border-[#1a9e83]/25 bg-white text-[#1a9e83] shadow-sm"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-[#2dd4bf]" : "bg-[#1a9e83]"}`} />
      {children}
    </span>
  );
}
