"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";
import { useInView, useReducedMotion } from "../Landing/useInView";

const ITEMS = [
  { title: "Responsive, mobile-first design", note: "Looks right on every screen size" },
  { title: "Fast & SEO-optimized", note: "Built to load quickly and be found" },
  { title: "Clean, scalable code", note: "Easy to maintain and extend later" },
  { title: "Regular updates & full transparency", note: "You always know where things stand" },
  { title: "Thorough testing before launch", note: "Checked end to end before going live" },
  { title: "Ongoing 24/7 support", note: "We stay with you after launch" },
];

const INDUSTRIES = ["Agro industries", "Fragrance & retail", "Industrial manufacturing", "Industrial minerals", "Healthcare"];

/** "Included as standard" — a checklist that ticks itself off when it scrolls into view. */
export default function Included() {
  const [cardRef, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reduced = useReducedMotion();
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (!inView || reduced || done >= ITEMS.length) return;
    const id = setTimeout(() => setDone((d) => d + 1), done === 0 ? 450 : 420);
    return () => clearTimeout(id);
  }, [inView, reduced, done]);

  const count = reduced ? ITEMS.length : done;
  const pct = Math.round((count / ITEMS.length) * 100);
  const complete = count === ITEMS.length;

  return (
    <section className="relative overflow-hidden bg-[#f5f9f8] py-24 md:py-32">
      <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(26,158,131,0.12),transparent)]"
      />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal variant="left">
          <Eyebrow>Included as standard</Eyebrow>
          <h2 className="fx-display mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0d2340] md:text-5xl">
            The essentials, <span className="fx-gradient-text-dark">built in.</span>
          </h2>
          <p className="fx-body mt-5 max-w-lg text-base leading-relaxed text-gray-500 md:text-lg">
            Whatever we build for you, the things that make software dependable aren&apos;t add-ons — they&apos;re
            part of how we work, on every project.
          </p>

          <p className="fx-body mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-[#0d2340]/45">
            Built for businesses across industries
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => (
              <span
                key={industry}
                className="fx-body rounded-full border border-[#0d2340]/10 bg-white px-4 py-2 text-sm font-medium text-[#0d2340] shadow-sm"
              >
                {industry}
              </span>
            ))}
          </div>
          <Link
            href="/portfolio"
            className="fx-body group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#1a9e83] transition-colors hover:text-[#0d2340]"
          >
            See the websites we&apos;ve built
            <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal variant="right" delay={120}>
          <div
            ref={cardRef}
            className="relative rounded-[28px] bg-white p-7 shadow-[0_40px_80px_-40px_rgba(13,35,64,0.45)] ring-1 ring-[#0d2340]/10 md:p-9"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-xs text-[#0d2340]/40">project-checklist.md</p>
                <p className="fx-display mt-1 text-2xl font-extrabold text-[#0d2340]">Your project</p>
              </div>
              <span className="fx-display fx-gradient-text-dark text-4xl font-extrabold tabular-nums tracking-tight md:text-5xl">
                {pct}%
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#0d2340]/[0.06]">
              <div
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#1a9e83] to-[#2563eb] transition-transform duration-500 ease-out"
                style={{ transform: `scaleX(${count / ITEMS.length})` }}
              />
            </div>

            <ul className="mt-7 space-y-1">
              {ITEMS.map((item, i) => (
                <li
                  key={item.title}
                  data-done={i < count}
                  className="sv-check-item flex items-center gap-4 rounded-2xl px-2 py-3"
                >
                  <span className="sv-check-circle grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#0d2340]/15">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path
                        className="sv-check-path"
                        pathLength={1}
                        d="M5 12.5l4.2 4.2L19 7"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="sv-check-text fx-display block font-bold text-[#0d2340]">{item.title}</span>
                    <span className="fx-body block text-sm text-gray-400">{item.note}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={`mt-6 flex items-center justify-between rounded-2xl bg-[#0d2340] px-5 py-4 text-white transition-all duration-700 ${
                complete ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <span className="fx-display font-bold">Ready to launch</span>
              <span className="text-xl" aria-hidden="true">
                🚀
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
