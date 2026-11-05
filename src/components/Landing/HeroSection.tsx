"use client";

import Link from "next/link";
import { Fragment, useRef, type CSSProperties } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import FluxField from "./FluxField";
import Magnetic from "./Magnetic";
import HeroVisual from "./HeroVisual";
import ScrambleText from "./ScrambleText";

const HEADLINE = ["Transforming", "Ideas", "Into"];
const ROTATING_WORDS = [
  "Digital Reality",
  "Scalable Software",
  "Intelligent AI",
  "Cloud Platforms",
  "Smart Automation",
] as const;

/** Inline style helper for staggered entrance delays. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  // Move the cursor glow with a transform, once per frame — it never repaints the hero.
  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      const glow = glowRef.current;
      if (!el || !glow) return;
      const r = el.getBoundingClientRect();
      glow.style.transform = `translate3d(${clientX - r.left}px, ${clientY - r.top}px, 0)`;
    });
  };

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("services");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMove}
      className="relative -mt-[90px] overflow-hidden bg-[#050d16] pt-[90px] text-white"
    >
      {/* ── Background layers ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="fx-blob left-[-12%] top-[-10%] h-[520px] w-[520px]"
          style={{ "--blob": "rgba(26,158,131,0.25)", "--dur": "16s", "--tx": "90px", "--ty": "70px" } as CSSProperties}
        />
        <div
          className="fx-blob right-[-14%] top-[18%] h-[560px] w-[560px]"
          style={{ "--blob": "rgba(37,99,235,0.2)", "--dur": "21s", "--tx": "-70px", "--ty": "50px" } as CSSProperties}
        />
        <div
          className="fx-blob bottom-[-25%] left-[28%] h-[440px] w-[440px]"
          style={{ "--blob": "rgba(76,201,212,0.15)", "--dur": "18s", "--tx": "60px", "--ty": "-60px" } as CSSProperties}
        />
        <div className="fx-grid-bg absolute inset-0" />
        <FluxField className="absolute inset-0" />
        <div ref={glowRef} className="fx-cursor-glow" style={{ transform: "translate3d(50vw, 45vh, 0)" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-90px)] max-w-[1280px] items-center gap-14 px-6 pb-28 pt-12 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge */}
          <div
            className="fx-enter inline-flex items-center gap-2.5 rounded-full border border-[#2dd4bf]/25 bg-white/[0.04] px-4 py-2 backdrop-blur-md"
            style={delay(100)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2dd4bf] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2dd4bf]" />
            </span>
            <span className="fx-body text-sm font-medium text-white/80">IT Solutions That Drive Growth</span>
          </div>

          {/* Headline */}
          <h1 className="fx-display mt-7 text-balance text-[clamp(2rem,8.4vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.02em] lg:text-[clamp(2.6rem,4.25vw,3.6rem)]">
            <span className="sr-only">Transforming ideas into digital reality</span>
            <span aria-hidden="true">
              {HEADLINE.map((word, i) => (
                <Fragment key={word}>
                  <span className="fx-word mr-[0.25em]">
                    <span style={delay(250 + i * 110)}>{word}</span>
                  </span>
                  {/* Below desktop, break after "Transforming" so "Into" never sits alone */}
                  {i === 0 && <br className="lg:hidden" />}
                </Fragment>
              ))}
              <span className="block">
                <span className="fx-word">
                  <span style={delay(580)}>
                    <ScrambleText
                      words={ROTATING_WORDS}
                      startDelay={1500}
                      className="fx-gradient-text whitespace-nowrap"
                    />
                  </span>
                </span>
              </span>
            </span>
          </h1>

          {/* Description */}
          <p
            className="fx-enter fx-body mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
            style={delay(750)}
          >
            End-to-end IT services tailored to your business — from software development to cloud
            infrastructure. We build scalable solutions that drive growth and turn your vision into
            reality.
          </p>

          {/* CTAs */}
          <div
            className="fx-enter mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            style={delay(900)}
          >
            <Magnetic>
              <Link
                href="/#services"
                onClick={scrollToServices}
                className="fx-btn-shine fx-body group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1a9e83] to-[#14b8a6] py-4 pl-7 pr-4 text-sm font-semibold tracking-wide text-white shadow-[0_10px_40px_-10px_rgba(45,212,191,0.8)] transition-shadow duration-300 hover:shadow-[0_14px_50px_-6px_rgba(45,212,191,0.95)]"
              >
                Explore Services
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <FiArrowRight size={15} />
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="fx-body group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-colors duration-300 hover:border-[#2dd4bf]/60 hover:bg-white/[0.08]"
              >
                Start a Project
                <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* 3D glass "command center" visual */}
        <div className="fx-enter" style={delay(450)}>
          <HeroVisual />
        </div>
      </div>

      {/* Interaction hint (desktop) */}
      <p
        className="fx-enter pointer-events-none absolute bottom-8 right-10 z-10 hidden font-mono text-[11px] tracking-wide text-white/35 lg:block"
        style={delay(1600)}
      >
        ✦ move your cursor · click to send a pulse
      </p>

      {/* Scroll cue */}
      <div
        className="fx-enter pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-white/40"
        style={delay(1400)}
      >
        <span className="flex h-9 w-6 justify-center rounded-full border border-white/25 pt-2">
          <span className="fx-scroll-dot h-1.5 w-1 rounded-full bg-[#2dd4bf]" />
        </span>
        <span className="fx-body text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}
