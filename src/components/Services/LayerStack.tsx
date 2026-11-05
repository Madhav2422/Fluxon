"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FiCloud, FiCpu, FiDatabase, FiLayout, FiMonitor, FiServer } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";

interface Layer {
  name: string;
  sub: string;
  text: string;
  chips: string[];
  icon: IconType;
  pattern: string;
}

/** Top of the stack first — from what people see down to the infrastructure. */
const LAYERS: Layer[] = [
  {
    name: "Experience",
    sub: "UI / UX design",
    text: "Wireframes, prototypes and interfaces aligned with your brand and optimised for user experience.",
    chips: ["Wireframes", "Prototypes", "Design systems"],
    icon: FiLayout,
    pattern: "sv-pat-wire",
  },
  {
    name: "Frontend",
    sub: "Web & app interfaces",
    text: "Responsive, fast and SEO-optimised interfaces built with React, Next.js and modern frameworks.",
    chips: ["React", "Next.js", "Flutter"],
    icon: FiMonitor,
    pattern: "sv-pat-grid",
  },
  {
    name: "AI & automation",
    sub: "Intelligence layer",
    text: "LLM integrations, AI chatbots and automated workflows that take repetitive work off your team.",
    chips: ["LLM integration", "AI chatbots", "Workflow automation"],
    icon: FiCpu,
    pattern: "sv-pat-dots",
  },
  {
    name: "Backend & APIs",
    sub: "Business logic",
    text: "Secure, scalable APIs and integrations that connect your systems with third-party services.",
    chips: ["Node.js", "Python", "REST & GraphQL"],
    icon: FiServer,
    pattern: "sv-pat-lines",
  },
  {
    name: "Data",
    sub: "Databases & storage",
    text: "Reliable data models and databases designed to grow with your business.",
    chips: ["PostgreSQL", "MongoDB", "Redis"],
    icon: FiDatabase,
    pattern: "sv-pat-bars",
  },
  {
    name: "Cloud & DevOps",
    sub: "Infrastructure",
    text: "Cloud infrastructure on AWS, Azure and Google Cloud, with CI/CD pipelines, containers and 24/7 monitoring.",
    chips: ["AWS · Azure · GCP", "Docker & Kubernetes", "CI/CD"],
    icon: FiCloud,
    pattern: "sv-pat-rings",
  },
];

const N = LAYERS.length;
const NAV = 90;

/**
 * "Every layer, one team": an exploded 3D stack of the layers we build. On desktop
 * the section pins; scrolling first pulls the layers apart, then walks through them.
 * Only a CSS variable and a few data attributes change per frame.
 */
export default function LayerStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    const counter = counterRef.current;
    if (!section || !stack || !counter) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    let current = -2;

    const setActive = (index: number) => {
      if (index === current) return;
      current = index;
      [plateRefs.current, textRefs.current, tickRefs.current].forEach((list) =>
        list.forEach((el, i) => el?.setAttribute("data-active", String(i === index)))
      );
      stack.setAttribute("data-has-active", String(index >= 0));
      counter.textContent = String(Math.max(index, 0) + 1).padStart(2, "0");
    };

    const update = () => {
      raf = 0;
      if (!desktop.matches) return;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = Math.min(1, Math.max(0, (NAV - r.top) / (r.height - (vh - NAV))));
      const t = Math.min(1, p / 0.14);
      const eased = t * t * (3 - 2 * t);
      stack.style.setProperty("--gap", `${(12 + eased * 50).toFixed(1)}px`);
      setActive(Math.min(N - 1, Math.max(0, Math.floor(((p - 0.1) / 0.9) * N))));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onBreakpoint = () => {
      if (!desktop.matches) {
        stack.style.removeProperty("--gap");
        setActive(-1);
      }
      onScroll();
    };

    onBreakpoint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050d16] text-white lg:h-[320vh]">
      <div className="relative overflow-hidden py-24 md:py-32 lg:sticky lg:top-[90px] lg:flex lg:h-[calc(100svh-90px)] lg:items-center lg:py-0">
        <div aria-hidden="true" className="fx-grid-bg pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.16),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.16),transparent)]"
        />

        <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-6 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          {/* Text */}
          <div>
            <Eyebrow dark>Full stack, end to end</Eyebrow>
            <h2 className="fx-display mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
              Every layer of your product. <span className="fx-gradient-text">One team.</span>
            </h2>
            <p className="fx-body mt-5 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
              From the screens people tap to the servers underneath — we design, build and run every layer, so it all
              works together.
            </p>

            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <span className="font-mono text-sm text-white/45">
                <span ref={counterRef} className="text-white">
                  01
                </span>{" "}
                / 0{N}
              </span>
              <span className="flex gap-1.5" aria-hidden="true">
                {LAYERS.map((layer, i) => (
                  <span
                    key={layer.name}
                    ref={(el) => {
                      tickRefs.current[i] = el;
                    }}
                    className="sv-tick h-1 w-7 rounded-full bg-white/20"
                  />
                ))}
              </span>
            </div>

            <div className="relative mt-8 grid gap-4 lg:mt-6 lg:block lg:min-h-[250px]">
              {LAYERS.map((layer, i) => {
                const Icon = layer.icon;
                return (
                  <div
                    key={layer.name}
                    ref={(el) => {
                      textRefs.current[i] = el;
                    }}
                    className="sv-layer-text rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#1a9e83] to-[#2563eb]">
                        <Icon size={20} />
                      </span>
                      <span className="fx-body text-xs font-semibold uppercase tracking-[0.25em] text-[#5eead4]">
                        Layer 0{i + 1} · {layer.sub}
                      </span>
                    </div>
                    <h3 className="fx-display mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{layer.name}</h3>
                    <p className="fx-body mt-3 max-w-md text-base leading-relaxed text-white/65">{layer.text}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {layer.chips.map((chip) => (
                        <span
                          key={chip}
                          className="fx-body rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/80"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exploded stack */}
          <div aria-hidden="true" className="relative order-first grid h-[380px] place-items-center sm:h-[460px] lg:order-none lg:h-[600px]">
            <div className="absolute bottom-[8%] left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(45,212,191,0.28),transparent)]" />
            <div className="scale-[0.72] sm:scale-90 lg:scale-100">
              <div ref={stackRef} className="sv-stack" data-has-active="false">
                {LAYERS.map((layer, i) => {
                  const Icon = layer.icon;
                  return (
                    <div
                      key={layer.name}
                      ref={(el) => {
                        plateRefs.current[i] = el;
                      }}
                      className={`sv-plate ${layer.pattern}`}
                      style={{ "--i": N - 1 - i } as CSSProperties}
                    >
                      <span className="absolute left-6 top-5 font-mono text-[12px] uppercase tracking-[0.18em] text-white/75">
                        <span className="text-[#5eead4]">0{i + 1}</span> {layer.name}
                      </span>
                      <Icon className="absolute bottom-6 right-6 h-10 w-10 text-[#5eead4]/85" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
