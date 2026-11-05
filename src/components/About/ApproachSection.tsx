import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight, FiCheckCircle, FiCode, FiLayout, FiSearch } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";

type Theme = "light" | "mint" | "navy" | "brand";

interface Step {
  title: string;
  text: string;
  icon: IconType;
  deliverables: string[];
  theme: Theme;
}

const STEPS: Step[] = [
  {
    title: "Discovery",
    text: "We start by deeply understanding your business, goals and challenges through detailed consultations and research.",
    icon: FiSearch,
    deliverables: ["Requirements", "Roadmap"],
    theme: "light",
  },
  {
    title: "Design",
    text: "Our team crafts intuitive wireframes and prototypes — aligned with your brand and optimised for user experience.",
    icon: FiLayout,
    deliverables: ["Wireframes", "UI prototype"],
    theme: "mint",
  },
  {
    title: "Build",
    text: "We develop your solution with modern, scalable technologies — clean code, regular updates and full transparency.",
    icon: FiCode,
    deliverables: ["Clean code", "Weekly demos"],
    theme: "navy",
  },
  {
    title: "Launch",
    text: "After thorough testing and your approval, we deploy your product and keep supporting it so everything runs smoothly.",
    icon: FiCheckCircle,
    deliverables: ["Deployment", "24/7 support"],
    theme: "brand",
  },
];

const THEMES: Record<Theme, { card: string; muted: string; chip: string; icon: string; num: string }> = {
  light: {
    card: "border-[#0d2340]/10 bg-white text-[#0d2340]",
    muted: "text-gray-500",
    chip: "border-[#1a9e83]/25 bg-[#f0fffc] text-[#1a9e83]",
    icon: "bg-gradient-to-br from-[#1a9e83] to-[#2563eb] text-white",
    num: "fx-outline-num-dark",
  },
  mint: {
    card: "border-[#1a9e83]/20 bg-[#eaf8f4] text-[#0d2340]",
    muted: "text-[#0d2340]/60",
    chip: "border-[#1a9e83]/30 bg-white text-[#1a9e83]",
    icon: "bg-[#0d2340] text-[#5eead4]",
    num: "fx-outline-num-dark",
  },
  navy: {
    card: "border-white/10 bg-[#0d2340] text-white",
    muted: "text-white/65",
    chip: "border-white/15 bg-white/[0.06] text-white/85",
    icon: "bg-white/10 text-[#5eead4]",
    num: "fx-outline-num",
  },
  brand: {
    card: "border-white/10 bg-gradient-to-br from-[#1a9e83] to-[#1e6fd0] text-white",
    muted: "text-white/80",
    chip: "border-white/25 bg-white/10 text-white",
    icon: "bg-white text-[#1a9e83]",
    num: "fx-outline-num",
  },
};

/**
 * How we work: the step cards pin and stack on top of each other as you scroll.
 * Pure CSS (position: sticky) — no JavaScript, nothing to slow scrolling down.
 */
export default function ApproachSection() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Heading — pinned beside the cards on desktop */}
        <div className="lg:sticky lg:top-40 lg:self-start">
          <Reveal>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="fx-display mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0d2340] md:text-5xl">
              Four clear steps. <span className="fx-gradient-text-dark">Zero guesswork.</span>
            </h2>
            <p className="fx-body mt-5 max-w-md text-base leading-relaxed text-gray-500 md:text-lg">
              A clear, collaborative process that keeps you informed and in control at every stage.
            </p>
            <Link
              href="/contact"
              className="fx-body group mt-8 inline-flex items-center gap-3 rounded-full border border-[#0d2340]/10 bg-white py-2 pl-6 pr-2 text-sm font-semibold text-[#0d2340] shadow-sm transition-all duration-300 hover:border-[#1a9e83]/40 hover:shadow-lg hover:shadow-[#1a9e83]/10"
            >
              Start your project
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0d2340] text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#1a9e83]">
                <FiArrowRight size={16} />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Stacking cards */}
        <div className="relative [--stack-top:96px] lg:[--stack-top:150px]">
          {STEPS.map((step, i) => {
            const t = THEMES[step.theme];
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="sticky mb-10 last:mb-0 lg:mb-[14vh]"
                style={{ top: `calc(var(--stack-top) + ${i * 22}px)` } as CSSProperties}
              >
                <article
                  className={`relative overflow-hidden rounded-[28px] border p-8 shadow-[0_-24px_60px_-34px_rgba(13,35,64,0.45)] md:p-10 ${t.card}`}
                >
                  <span
                    aria-hidden="true"
                    className={`fx-display pointer-events-none absolute -right-2 -top-5 text-[96px] font-extrabold leading-none md:-top-7 md:text-[150px] ${t.num}`}
                  >
                    0{i + 1}
                  </span>
                  <div className="relative flex items-center gap-4">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl ${t.icon}`}>
                      <Icon size={24} />
                    </span>
                    <span className="fx-body text-xs font-semibold uppercase tracking-[0.3em] opacity-70">
                      Step 0{i + 1} / 04
                    </span>
                  </div>
                  <h3 className="fx-display relative mt-8 text-3xl font-extrabold md:text-4xl">{step.title}</h3>
                  <p className={`fx-body relative mt-3 max-w-lg text-base leading-relaxed md:text-lg ${t.muted}`}>
                    {step.text}
                  </p>
                  <div className="relative mt-7 flex flex-wrap items-center gap-2">
                    <span className="fx-body mr-1 text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
                      You get
                    </span>
                    {step.deliverables.map((d) => (
                      <span key={d} className={`fx-body rounded-full border px-3 py-1 text-xs font-medium ${t.chip}`}>
                        {d}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
