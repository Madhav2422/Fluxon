"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FiActivity, FiLayers, FiTrendingUp, FiUsers } from "react-icons/fi";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { prefersReducedMotion, useInView } from "./useInView";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
  icon: IconType;
}

const STATS: Stat[] = [
  { value: 10, suffix: "+", label: "Projects Delivered", note: "Web, AI & cloud builds", icon: FiLayers },
  { value: 8, suffix: "+", label: "Happy Clients", note: "Long-term partnerships", icon: FiUsers },
  { value: 2, suffix: "+", label: "Years Experience", note: "And growing every day", icon: FiTrendingUp },
  { value: 24, suffix: "/7", label: "Support", note: "We're always on", icon: FiActivity },
];

/** Counts from 0 to `to` with an ease-out curve once `start` becomes true. */
function CountUp({ to, start }: { to: number; start: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!start || !el) return;
    if (prefersReducedMotion()) {
      el.textContent = String(to);
      return;
    }

    const duration = 1800;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = String(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);

  return <span ref={ref}>0</span>;
}

export default function StatsSection() {
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#1a9e83]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#3b82f6]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-6 md:px-10 lg:grid-cols-12">
        <Reveal variant="left" className="text-center lg:col-span-5 lg:text-left">
          <Eyebrow>Fluxon in numbers</Eyebrow>
          <h2 className="fx-display mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0d2340] md:text-5xl">
            Built on trust.
            <br />
            <span className="fx-gradient-text-dark">Measured in results.</span>
          </h2>
          <p className="fx-body mx-auto mt-5 max-w-md text-base leading-relaxed text-gray-500 md:text-lg lg:mx-0">
            Every project is a partnership. We stay close to your goals, ship with care and keep
            supporting you long after launch.
          </p>
        </Reveal>

        <div ref={gridRef} className="grid grid-cols-2 gap-4 md:gap-5 lg:col-span-7">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} variant="scale" delay={i * 120}>
                <div className="fx-conic h-full transition-[translate] duration-500 hover:-translate-y-1.5" style={{ "--d": `${-i * 1.5}s` } as CSSProperties}>
                  <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-white p-5 md:p-7">
                    <span className="absolute right-6 top-6 hidden h-10 w-10 place-items-center rounded-xl bg-[#f0fffc] text-[#1a9e83] sm:grid">
                      <Icon size={18} />
                    </span>
                    <div className="fx-display fx-gradient-text-dark text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                      <CountUp to={s.value} start={inView} />
                      {s.suffix}
                    </div>
                    <div className="fx-display mt-3 text-sm font-bold text-[#0d2340] md:text-base">{s.label}</div>
                    <div className="fx-body mt-1 text-xs text-gray-400 md:text-sm">{s.note}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
