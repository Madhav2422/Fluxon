"use client";

import type { IconType } from "react-icons";
import { FiGlobe, FiLayers, FiZap } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";
import { useInView } from "../Landing/useInView";

interface Chapter {
  n: string;
  kicker: string;
  title: string;
  text: string;
  icon: IconType;
}

const CHAPTERS: Chapter[] = [
  {
    n: "01",
    kicker: "The spark",
    title: "A small team with a big vision",
    text: "It started with a small team of passionate developers and one simple yet powerful vision: empower businesses through technology.",
    icon: FiZap,
  },
  {
    n: "02",
    kicker: "Growing up",
    title: "A full-service IT company",
    text: "We grew into a full-service IT partner — web, AI, cloud, automation, DevOps and consulting, all under one roof.",
    icon: FiLayers,
  },
  {
    n: "03",
    kicker: "Today",
    title: "Trusted across industries",
    text: "From startups to enterprises, we help organizations modernize their operations, build digital products and scale with confidence.",
    icon: FiGlobe,
  },
];

/** Three chapters on a timeline that draws itself, with a light travelling along it. */
export default function JourneySection() {
  const [trackRef, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });

  return (
    <section className="relative overflow-hidden bg-[#f5f9f8] py-24 md:py-32">
      <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.1),transparent)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Our journey</Eyebrow>
          <h2 className="fx-display mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0d2340] md:text-5xl">
            From a small team to a <span className="fx-gradient-text-dark">full-service</span> IT partner
          </h2>
          <p className="fx-body mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg">
            Every chapter has been driven by the same belief: technology should move businesses forward.
          </p>
        </Reveal>

        <div ref={trackRef} className="relative mt-16 md:mt-20">
          {/* Timeline (md+) */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-[27px] hidden h-[2px] rounded-full bg-[#0d2340]/10 md:block"
          >
            <div
              className={`h-full origin-left rounded-full bg-gradient-to-r from-[#1a9e83] via-[#2dd4bf] to-[#3b82f6] transition-transform duration-[1800ms] ease-out ${
                inView ? "scale-x-100" : "scale-x-0"
              }`}
            />
            {inView && <div className="fx-travel" />}
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {CHAPTERS.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.n} delay={200 + i * 250} className="flex flex-col items-center">
                  <span
                    className={`relative z-10 grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-700 ${
                      inView
                        ? "border-transparent bg-gradient-to-br from-[#1a9e83] to-[#2563eb] text-white shadow-[0_0_0_8px_rgba(26,158,131,0.1),0_12px_30px_-8px_rgba(26,158,131,0.6)]"
                        : "border-[#0d2340]/10 bg-white text-[#0d2340]/40"
                    }`}
                    style={{ transitionDelay: `${i * 600}ms` }}
                  >
                    <Icon size={22} />
                  </span>

                  <div className="group mt-8 h-full w-full rounded-3xl border border-[#0d2340]/[0.08] bg-white p-8 shadow-[0_20px_50px_-30px_rgba(13,35,64,0.35)] transition-[translate,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgba(13,35,64,0.45)]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="fx-body text-xs font-semibold uppercase tracking-[0.28em] text-[#1a9e83]">
                        {c.kicker}
                      </span>
                      <span className="fx-display fx-outline-num-dark -mt-2 text-6xl font-extrabold leading-none transition-colors duration-500">
                        {c.n}
                      </span>
                    </div>
                    <h3 className="fx-display mt-4 text-2xl font-bold text-[#0d2340]">{c.title}</h3>
                    <p className="fx-body mt-3 text-[15px] leading-relaxed text-gray-500">{c.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
