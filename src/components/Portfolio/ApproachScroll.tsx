"use client";

import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import { prefersReducedMotion } from "../Landing/useInView";

const STEPS = [
  { word: "Build", text: "We understand the problem, requirements, and business goals before writing code." },
  { word: "Solve", text: "We build clean, scalable solutions focused on performance, usability, and reliability." },
  { word: "Scale", text: "We continuously improve, integrate, and adapt products as they grow." },
];

/**
 * "BUILD. SOLVE. SCALE." — the section pins while you scroll; each word fills in
 * turn and its statement slides in. Only changes the DOM when the step changes.
 */
export default function ApproachScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    let current = -1;
    let raf = 0;
    const setActive = (index: number) => {
      if (index === current) return;
      current = index;
      [wordRefs.current, textRefs.current, dotRefs.current].forEach((list) =>
        list.forEach((el, i) => el?.setAttribute("data-active", String(i === index)))
      );
    };

    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const nav = window.innerWidth >= 1024 ? 90 : 80;
      const p = Math.min(1, Math.max(0, (nav - r.top) / (r.height - (vh - nav))));
      setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    setActive(0);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className={`pf-warm relative ${reduced ? "py-24" : "h-[240vh] lg:h-[280vh]"}`}>
      <div
        className={
          reduced
            ? "relative"
            : "sticky top-20 flex h-[calc(100svh-80px)] items-center overflow-hidden lg:top-[90px] lg:h-[calc(100svh-90px)]"
        }
      >
        <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />

        <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="fx-display mt-6 text-[clamp(3.4rem,11vw,8.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
              {STEPS.map((step, i) => (
                <span key={step.word} className="block">
                  <span
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    className="pf-word"
                    data-active={reduced ? "true" : undefined}
                  >
                    {step.word}
                    <span className="pf-diamond" aria-hidden="true" />
                  </span>
                </span>
              ))}
            </h2>
            <p className="fx-body mt-6 max-w-md text-base leading-relaxed text-gray-500 md:text-lg">
              A practical approach to turning ideas into reliable digital products.
            </p>
          </div>

          {/* Statements */}
          <div className={reduced ? "space-y-4" : "relative min-h-[320px]"}>
            {STEPS.map((step, i) => (
              <div
                key={step.word}
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                data-active={reduced ? "true" : undefined}
                className={`pf-statement rounded-[28px] bg-[#e7e6dc] p-8 md:p-10 ${reduced ? "" : "absolute inset-x-0 top-0"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#11161d] text-white">
                    <FiPlus size={20} />
                  </span>
                  <span className="font-mono text-sm text-[#11161d]/50">
                    0{i + 1} / 0{STEPS.length}
                  </span>
                </div>
                <p className="fx-display mt-8 text-2xl font-bold leading-snug tracking-tight text-[#11161d] md:text-3xl">
                  {step.text}
                </p>
                <div className="mt-8 h-px bg-[#11161d]/15" />
              </div>
            ))}

            {!reduced && (
              <div className="absolute -bottom-12 left-0 flex gap-2" aria-hidden="true">
                {STEPS.map((step, i) => (
                  <span
                    key={step.word}
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="h-1.5 w-8 rounded-full bg-[#11161d]/15 transition-colors duration-500 data-[active=true]:bg-[#1e6fd0]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
