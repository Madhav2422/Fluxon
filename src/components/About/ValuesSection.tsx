"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FiAward, FiEye, FiHeart, FiTarget } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";
import { prefersReducedMotion, useInView } from "../Landing/useInView";

interface Value {
  title: string;
  text: string;
  icon: IconType;
  tags: string[];
  glow: string;
}

const VALUES: Value[] = [
  {
    title: "Innovation",
    text: "We stay at the forefront of technology to deliver modern solutions.",
    icon: FiTarget,
    tags: ["Modern stacks", "AI-first thinking"],
    glow: "rgba(45,212,191,0.32)",
  },
  {
    title: "Transparency",
    text: "Open communication and honest collaboration at every step.",
    icon: FiEye,
    tags: ["Clear updates", "Honest timelines"],
    glow: "rgba(96,165,250,0.32)",
  },
  {
    title: "Client Focus",
    text: "Your success is our success. We're committed to delivering real value.",
    icon: FiHeart,
    tags: ["Your goals first", "Real value"],
    glow: "rgba(76,201,212,0.32)",
  },
  {
    title: "Excellence",
    text: "We hold ourselves to the highest standards of quality and craft.",
    icon: FiAward,
    tags: ["Clean code", "Quality craft"],
    glow: "rgba(26,158,131,0.38)",
  },
];

const CYCLE_MS = 4500;

/**
 * Core values as expanding panels (desktop): hover, focus or tap a panel to open
 * it; while on screen and not hovered they advance on their own. On smaller
 * screens every value is shown as an open card.
 */
export default function ValuesSection() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [panelsRef, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.3, rootMargin: "0px" });
  const [reduced] = useState(prefersReducedMotion);
  const autoplay = inView && !hovering && !reduced;

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % VALUES.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [autoplay, active]);

  return (
    <section className="relative overflow-hidden bg-[#050d16] py-24 text-white md:py-32">
      <div aria-hidden="true" className="fx-grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(26,158,131,0.18),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.16),transparent)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <Eyebrow dark>What we stand for</Eyebrow>
            <h2 className="fx-display mt-6 max-w-2xl text-balance text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
              The values behind <span className="fx-gradient-text">every line of code</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="fx-body max-w-sm text-base leading-relaxed text-white/55 md:text-lg">
              Four principles guide how we think, build and partner with you.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div
            ref={panelsRef}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="mt-14 flex flex-col gap-4 lg:h-[440px] lg:flex-row"
          >
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              const isActive = i === active;
              return (
                <button
                  key={v.title}
                  type="button"
                  aria-expanded={isActive}
                  data-active={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="fx-vpanel relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#2dd4bf] lg:p-0"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
                    style={{ background: `radial-gradient(closest-side, ${v.glow}, transparent)` }}
                  />
                  <span
                    aria-hidden="true"
                    className="fx-display fx-outline-num pointer-events-none absolute -bottom-8 -right-1 text-[170px] font-extrabold leading-none"
                  >
                    0{i + 1}
                  </span>

                  {/* Collapsed state (desktop): icon on top, vertical title below */}
                  <span aria-hidden="true" className="fx-vcollapsed absolute inset-0 flex flex-col items-center justify-between py-8">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#5eead4]">
                      <Icon size={20} />
                    </span>
                    <span className="fx-display fx-vtitle text-2xl font-bold tracking-tight text-white/85">{v.title}</span>
                  </span>

                  {/* Open state */}
                  <span className="fx-vcontent relative flex flex-col gap-8 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[460px] lg:justify-between lg:p-10">
                    <span className="flex items-center gap-4">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#1a9e83] to-[#2563eb] text-white shadow-[0_12px_30px_-10px_rgba(45,212,191,0.7)]">
                        <Icon size={24} />
                      </span>
                      <span className="fx-body text-xs font-semibold uppercase tracking-[0.3em] text-[#5eead4]">
                        Value 0{i + 1}
                      </span>
                    </span>
                    <span className="block">
                      <span className="fx-display block text-3xl font-extrabold md:text-4xl">{v.title}</span>
                      <span className="fx-body mt-3 block max-w-sm text-base leading-relaxed text-white/65">{v.text}</span>
                      <span className="mt-5 flex flex-wrap gap-2">
                        {v.tags.map((tag) => (
                          <span
                            key={tag}
                            className="fx-body rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>

                  {/* Auto-advance timer */}
                  {isActive && autoplay && (
                    <span
                      key={active}
                      aria-hidden="true"
                      className="fx-vbar absolute bottom-0 left-0 hidden h-[3px] w-full bg-gradient-to-r from-[#2dd4bf] to-[#3b82f6] lg:block"
                      style={{ "--cycle": `${CYCLE_MS}ms` } as CSSProperties}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
