"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiArrowDown, FiArrowUpRight, FiAward, FiLayers } from "react-icons/fi";
import aboutPhoto from "../../../public/About_Us.jpg";
import Eyebrow from "../Landing/Eyebrow";
import Magnetic from "../Landing/Magnetic";
import { prefersReducedMotion } from "../Landing/useInView";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Each inner array is one line on md+ screens. */
const HEADLINE: { text: string; accent?: boolean }[][] = [
  [{ text: "Technology" }, { text: "should" }, { text: "be" }],
  [{ text: "an" }, { text: "enabler,", accent: true }, { text: "not" }, { text: "a" }, { text: "barrier." }],
];

const MARQUEE = "Innovation · Transparency · Reliability · Client-First ·";

function FloatBadge({
  icon: Icon,
  value,
  label,
  className,
  duration,
  offset,
}: {
  icon: IconType;
  value: string;
  label: string;
  className: string;
  duration: string;
  offset: string;
}) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <div
        className="fx-float flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1a27]/90 px-3.5 py-2.5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.75)] md:px-4 md:py-3"
        style={{ "--dur": duration, "--d": offset, "--amp": "-10px" } as CSSProperties}
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#1a9e83] to-[#2563eb] text-white md:h-10 md:w-10">
          <Icon size={18} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="fx-display text-base font-extrabold text-white md:text-lg">{value}</span>
          <span className="fx-body text-[11px] text-white/55 md:text-xs">{label}</span>
        </span>
      </div>
    </div>
  );
}

/** Slowly spinning circular "seal" with the Fluxon mark in the middle. */
function SpinSeal() {
  return (
    <div className="pointer-events-none absolute -top-10 left-3 z-20 h-24 w-24 md:-left-10 md:-top-16 md:h-32 md:w-32">
      <span className="absolute inset-[6%] rounded-full border border-white/10 bg-[#050d16]/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]" />
      <svg viewBox="0 0 200 200" className="fx-spin-slow relative h-full w-full" aria-hidden="true">
        <defs>
          <path id="fx-about-seal" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text fill="rgba(255,255,255,0.75)" fontSize="15" fontWeight="700" letterSpacing="4.4" className="fx-display">
          <textPath href="#fx-about-seal">FLUXON INFOTECH • WHO WE ARE • </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto grid h-10 w-10 place-items-center rounded-xl bg-white p-1.5 shadow-[0_0_28px_rgba(45,212,191,0.6)] md:h-14 md:w-14 md:p-2">
        <span className="fx-logo-mark block h-full w-full" />
      </span>
    </div>
  );
}

/** Team photo in a cinematic frame that grows and parallaxes as you scroll. */
function PhotoFrame({ children }: { children?: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    const host = frame?.parentElement; // unscaled wrapper → stable measurements
    if (!frame || !image || !host || prefersReducedMotion()) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top > vh || r.bottom < 0) return; // off-screen: do nothing
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)));
      frame.style.transform = `scale(${(0.9 + 0.1 * p).toFixed(4)})`;
      const offset = ((r.top + r.height / 2 - vh / 2) / vh) * -48;
      image.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fx-enter" style={delay(650)}>
      <div ref={frameRef} className="relative will-change-transform" style={{ transformOrigin: "50% 0%" }}>
        <div className="rounded-[28px] bg-gradient-to-br from-[#2dd4bf]/70 via-white/10 to-[#3b82f6]/70 p-px shadow-[0_50px_100px_-50px_rgba(45,212,191,0.3)]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[27px] bg-[#0b1a27] md:aspect-[2/1]">
            <div ref={imageRef} className="absolute inset-x-0 -inset-y-[10%] will-change-transform">
              <Image
                src={aboutPhoto}
                alt="About Fluxon Infotech"
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1280px) 1120px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050d16]/75 via-[#050d16]/5 to-[#050d16]/30" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AboutHero() {
  const scrollToStory = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("story");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative -mt-[90px] overflow-hidden bg-[#050d16] pt-[90px] text-white">
      {/* ── Background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="fx-blob left-[-10%] top-[-6%] h-[560px] w-[560px]"
          style={{ "--blob": "rgba(26,158,131,0.28)", "--dur": "17s", "--tx": "90px", "--ty": "60px" } as CSSProperties}
        />
        <div
          className="fx-blob right-[-12%] top-[8%] h-[620px] w-[620px]"
          style={{ "--blob": "rgba(37,99,235,0.22)", "--dur": "21s", "--tx": "-80px", "--ty": "50px" } as CSSProperties}
        />
        <div
          className="fx-blob bottom-[-10%] left-[30%] h-[520px] w-[520px]"
          style={{ "--blob": "rgba(76,201,212,0.14)", "--dur": "19s", "--tx": "60px", "--ty": "-60px" } as CSSProperties}
        />
        <div className="fx-grid-bg absolute inset-0" />
      </div>

      {/* ── Intro ── */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pt-14 text-center md:px-10 md:pt-24">
        <div className="fx-enter flex justify-center" style={delay(100)}>
          <Eyebrow dark>Who we are</Eyebrow>
        </div>

        <h1 className="fx-display mx-auto mt-7 max-w-6xl text-balance text-[clamp(2.25rem,5.6vw,4.75rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
          <span className="sr-only">Technology should be an enabler, not a barrier.</span>
          <span aria-hidden="true">
            {HEADLINE.map((line, l) => (
              <Fragment key={l}>
                {line.map((word, i) => (
                  <span key={word.text} className="fx-word mr-[0.24em]">
                    <span style={delay(220 + (l * 3 + i) * 90)}>
                      {word.accent ? <span className="fx-gradient-text">{word.text}</span> : word.text}
                    </span>
                  </span>
                ))}
                {l === 0 && <br className="hidden md:inline" />}
              </Fragment>
            ))}
          </span>
        </h1>

        <p
          className="fx-enter fx-body mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg"
          style={delay(800)}
        >
          We&apos;re Fluxon Infotech — a team of passionate developers in Morbi, Gujarat, on a mission to
          empower businesses through technology.
        </p>

        <div className="fx-enter mt-9 flex flex-wrap items-center justify-center gap-4" style={delay(950)}>
          <Magnetic>
            <Link
              href="/about#story"
              onClick={scrollToStory}
              className="fx-btn-shine fx-body group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1a9e83] to-[#14b8a6] py-4 pl-7 pr-4 text-sm font-semibold tracking-wide text-white shadow-[0_10px_40px_-10px_rgba(45,212,191,0.8)]"
            >
              Read our story
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0.5">
                <FiArrowDown size={15} />
              </span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              className="fx-body group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:border-[#2dd4bf]/60 hover:bg-white/[0.08]"
            >
              Work with us
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* ── Photo with giant outlined values sliding behind it ── */}
      <div className="relative mt-24 pb-16 md:mt-36 md:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -translate-y-1/2 select-none overflow-hidden">
          <div className="fx-marquee-track" style={{ "--dur": "70s" } as CSSProperties}>
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="fx-display fx-outline-text whitespace-nowrap pr-[0.35em] text-[clamp(3.5rem,10vw,9rem)] font-extrabold uppercase leading-none tracking-tight"
              >
                {MARQUEE}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-10">
          <PhotoFrame>
            <SpinSeal />
            <FloatBadge
              icon={FiAward}
              value="2+ Years"
              label="of excellence"
              className="bottom-5 left-3 md:-left-8 md:bottom-14"
              duration="6s"
              offset="-1s"
            />
            <FloatBadge
              icon={FiLayers}
              value="10+ Projects"
              label="delivered with care"
              className="right-3 top-5 md:-right-8 md:top-12"
              duration="7s"
              offset="-3s"
            />
            <div className="absolute bottom-6 right-6 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-[#050d16]/80 px-4 py-2 md:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
              </span>
              <span className="fx-body text-xs font-medium text-white/85">24/7 support, always on</span>
            </div>
          </PhotoFrame>
        </div>
      </div>
    </section>
  );
}
