"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FiCheckCircle, FiCode, FiLayout, FiSearch } from "react-icons/fi";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { prefersReducedMotion } from "./useInView";

interface Step {
  title: string;
  description: string;
  icon: IconType;
  deliverables: string[];
  command: string;
  output: string[];
}

const STEPS: Step[] = [
  {
    title: "Discovery",
    description:
      "We start by deeply understanding your business, goals and challenges through detailed consultations and research.",
    icon: FiSearch,
    deliverables: ["Requirements", "Roadmap"],
    command: 'fluxon discover --idea "your-vision"',
    output: ["→ Analysing goals & audience", "→ Mapping challenges & opportunities", "✓ Project roadmap ready"],
  },
  {
    title: "Design",
    description:
      "Our team crafts intuitive wireframes and prototypes — aligned with your brand and optimised for user experience.",
    icon: FiLayout,
    deliverables: ["Wireframes", "UI Prototype"],
    command: "fluxon design --wireframes --prototype",
    output: ["→ Crafting user flows", "→ Building interactive prototype", "✓ Design approved"],
  },
  {
    title: "Build",
    description:
      "We develop your solution with modern, scalable technologies — clean code, regular updates and full transparency.",
    icon: FiCode,
    deliverables: ["Clean Code", "Weekly Demos"],
    command: "fluxon build --stack=modern --tests",
    output: ["→ Writing clean, scalable code", "→ Running automated tests", "✓ Build successful"],
  },
  {
    title: "Launch",
    description:
      "After thorough testing and your approval, we deploy your product and keep supporting it so everything runs smoothly.",
    icon: FiCheckCircle,
    deliverables: ["Deployment", "24/7 Support"],
    command: "fluxon deploy --env=production",
    output: ["→ Shipping to the cloud", "→ Enabling monitoring & alerts", "✓ You're live! 🚀"],
  },
];

/* ───────────────────────── Terminal ───────────────────────── */

function OutputLine({ text }: { text: string }) {
  const ok = text.startsWith("✓");
  return (
    <div className={`fx-term-line ${ok ? "text-[#4ade80]" : "text-white/55"}`}>{text}</div>
  );
}

function Prompt() {
  return (
    <>
      <span className="text-[#2dd4bf]">➜</span> <span className="text-[#60a5fa]">~/fluxon</span>{" "}
    </>
  );
}

/** The step currently being "typed". Remounted (via key) whenever the step changes. */
function TypingBlock({ step }: { step: Step }) {
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const instant = prefersReducedMotion();
    const timers: ReturnType<typeof setTimeout>[] = [];
    const charDelay = instant ? 0 : 26;
    const startDelay = instant ? 0 : 250;

    for (let i = 1; i <= step.command.length; i++) {
      timers.push(setTimeout(() => setTyped(i), startDelay + i * charDelay));
    }
    const typedAt = startDelay + step.command.length * charDelay;
    step.output.forEach((_, i) => {
      timers.push(setTimeout(() => setLines(i + 1), typedAt + (instant ? 0 : 350 + i * 380)));
    });

    return () => timers.forEach(clearTimeout);
  }, [step]);

  const finished = lines === step.output.length;

  return (
    <div className="mt-4">
      <div className="whitespace-pre-wrap break-all">
        <Prompt />
        <span className="text-white">{step.command.slice(0, typed)}</span>
        {!finished && <span className="fx-caret ml-0.5 inline-block h-4 w-2 translate-y-[3px] bg-[#2dd4bf]" />}
      </div>
      {step.output.slice(0, lines).map((line) => (
        <OutputLine key={line} text={line} />
      ))}
      {finished && (
        <div className="mt-4">
          <Prompt />
          <span className="fx-caret ml-0.5 inline-block h-4 w-2 translate-y-[3px] bg-[#2dd4bf]" />
        </div>
      )}
    </div>
  );
}

function Terminal({ active }: { active: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1622]/95 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(45,212,191,0.06)]">
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/40">fluxon — zsh</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#2dd4bf]/30 bg-[#2dd4bf]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#5eead4]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2dd4bf]" />
          {STEPS[active].title}
        </span>
      </div>
      <div className="flex h-[360px] flex-col justify-end overflow-hidden p-5 font-mono text-[12.5px] leading-[1.8] md:text-[13px]">
        {STEPS.slice(0, active).map((step) => (
          <div key={step.title} className="mt-4 opacity-60">
            <div className="whitespace-pre-wrap break-all">
              <Prompt />
              <span className="text-white">{step.command}</span>
            </div>
            {step.output.map((line) => (
              <div key={line} className={line.startsWith("✓") ? "text-[#4ade80]" : "text-white/55"}>
                {line}
              </div>
            ))}
          </div>
        ))}
        <TypingBlock key={active} step={STEPS[active]} />
      </div>
    </div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

export default function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [reached, setReached] = useState(0);

  // Scroll-linked progress: fills the line and lights up each step as it passes the
  // reading line (55% down the viewport). Runs at most once per frame, does nothing
  // while the section is off-screen, and writes the fill's transform directly.
  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const anchor = vh * 0.55;
      const r = timeline.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      const progress = Math.min(1, Math.max(0, (anchor - r.top) / r.height));
      fill.style.transform = `scaleY(${progress.toFixed(4)})`;

      let count = 0;
      stepRefs.current.forEach((el) => {
        if (el && el.getBoundingClientRect().top + 24 < anchor) count++;
      });
      setReached(count);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.max(0, reached - 1);

  return (
    <section className="relative overflow-clip bg-[#050d16] py-24 text-white md:py-32">
      <div aria-hidden="true" className="fx-grid-bg pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full bg-[#1a9e83]/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-[#2563eb]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Left: heading + timeline */}
        <div>
          <Reveal>
            <Eyebrow dark>How we work</Eyebrow>
            <h2 className="fx-display mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
              From idea to launch,
              <br />
              <span className="fx-gradient-text">in four clear steps.</span>
            </h2>
            <p className="fx-body mt-5 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
              A clear, collaborative process that keeps you informed and in control at every stage.
            </p>
          </Reveal>

          <div ref={timelineRef} className="relative mt-14">
            {/* Track + scroll-driven fill */}
            <div aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-[2px] rounded-full bg-white/10">
              <div ref={fillRef} className="fx-timeline-fill h-full w-full rounded-full bg-gradient-to-b from-[#2dd4bf] via-[#1a9e83] to-[#3b82f6] shadow-[0_0_14px_rgba(45,212,191,0.7)]" />
            </div>

            <ol className="flex flex-col gap-10">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i < reached;
                return (
                  <li key={step.title}>
                    <div
                      ref={(el) => {
                        stepRefs.current[i] = el;
                      }}
                      className="relative flex gap-6"
                    >
                      <span
                        data-active={isActive}
                        className="fx-step-node relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/15 bg-[#0a1622] text-white/50"
                      >
                        <Icon size={20} />
                      </span>
                      <div
                        className={`flex-1 rounded-2xl border p-6 transition-all duration-700 ${
                          isActive
                            ? "border-[#2dd4bf]/25 bg-white/[0.05] opacity-100"
                            : "border-white/[0.06] bg-white/[0.02] opacity-50"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="fx-display text-xl font-bold">{step.title}</h3>
                          <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                        </div>
                        <p className="fx-body mt-2 text-[15px] leading-relaxed text-white/60">{step.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {step.deliverables.map((d) => (
                            <span
                              key={d}
                              className="fx-body rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Right: live terminal */}
        <div className="lg:pt-24">
          <div className="lg:sticky lg:top-36">
            <Reveal variant="right">
              <Terminal active={active} />
              <p className="fx-body mt-4 text-center text-xs text-white/35">
                Scroll through the steps — the terminal follows along.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
