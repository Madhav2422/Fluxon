"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";
import { prefersReducedMotion, useInView } from "../Landing/useInView";

const METRICS = [
  { prefix: "+", value: 40, suffix: "%", ring: 40, label: "Efficiency", note: "Workflow optimization" },
  { prefix: "+", value: 60, suffix: "%", ring: 60, label: "Automation", note: "Manual processes reduced" },
  { prefix: "", value: 3, suffix: "x", ring: 100, label: "Faster delivery", note: "Streamlined development" },
];

const KEY_METRICS = ["Scalable software solutions", "AI & automation integration", "End-to-end product development"];

function CountUp({ to, start }: { to: number; start: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!start || !el) return;
    if (prefersReducedMotion()) {
      el.textContent = String(to);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1800);
      el.textContent = String(Math.round(to * (p === 1 ? 1 : 1 - Math.pow(2, -10 * p))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);
  return <span ref={ref}>0</span>;
}

/** Impact through technology — animated ring gauges and key metrics. */
export default function Impact() {
  const [ringsRef, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative overflow-hidden bg-[#050d16] py-24 text-white md:py-32">
      <div aria-hidden="true" className="fx-grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-0 h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(26,158,131,0.16),transparent)]"
      />

      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-6 md:px-10 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <Eyebrow dark>Impact</Eyebrow>
          <h2 className="fx-display mt-6 text-[clamp(2.6rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
            Impact
            <br />
            through
            <br />
            <span className="fx-gradient-text">technology</span>
          </h2>
          <p className="fx-body mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
            Building technology that improves efficiency, simplifies processes, and creates measurable business
            value.
          </p>

          <div className="mt-10 max-w-sm overflow-hidden rounded-[22px] border border-white/10 bg-[#11161d]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <span className="fx-display text-lg font-extrabold">Key metrics</span>
              <FiCheck size={22} className="text-[#5eead4]" />
            </div>
            <ul className="space-y-3 px-6 py-5">
              {KEY_METRICS.map((m) => (
                <li key={m} className="fx-body flex items-center gap-3 text-sm text-white/80">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[#11161d]">
                    <FiPlus size={14} />
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div ref={ringsRef} className="grid gap-6 sm:grid-cols-3 lg:col-span-7">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} variant="scale" delay={i * 150}>
              <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center transition-[translate,border-color] duration-500 hover:-translate-y-1.5 hover:border-[#2dd4bf]/40">
                <div className="relative h-40 w-40">
                  <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
                    <defs>
                      <linearGradient id={`pf-ring-${i}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2dd4bf" />
                        <stop offset="1" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={`url(#pf-ring-${i})`}
                      strokeWidth="8"
                      strokeLinecap="round"
                      pathLength={100}
                      className="pf-ring"
                      style={{ "--v": m.ring } as CSSProperties}
                    />
                  </svg>
                  <span className="fx-display absolute inset-0 grid place-items-center text-4xl font-extrabold tracking-tight">
                    <span>
                      {m.prefix}
                      <CountUp to={m.value} start={inView} />
                      {m.suffix}
                    </span>
                  </span>
                </div>
                <span className="fx-body mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#5eead4]">
                  {m.label}
                </span>
                <span className="fx-body mt-2 text-sm text-white/60">{m.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
