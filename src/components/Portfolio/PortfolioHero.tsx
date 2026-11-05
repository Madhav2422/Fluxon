"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiAtSign,
  FiCheck,
  FiCode,
  FiImage,
  FiMousePointer,
  FiPenTool,
  FiSend,
} from "react-icons/fi";
import Magnetic from "../Landing/Magnetic";
import { PROJECTS } from "./projects";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const LETTERS = "Portfolio".split("");

/** Small seeded random generator, so the binary field is identical on every render. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = seeded(2026);
const BINARY = Array.from({ length: 28 }, () =>
  Array.from({ length: 72 }, () => (rand() < 0.38 ? " " : rand() < 0.5 ? "0" : "1")).join("")
).join("\n");
const BITS = Array.from({ length: 22 }, () => ({
  left: `${(rand() * 96 + 2).toFixed(1)}%`,
  top: `${(rand() * 86 + 6).toFixed(1)}%`,
  size: `${Math.round(12 + rand() * 10)}px`,
  dur: `${(3 + rand() * 4).toFixed(1)}s`,
  d: `${(rand() * 5).toFixed(1)}s`,
  ch: rand() < 0.5 ? "0" : "1",
}));

/** The open folder from the portfolio cover, with live projects peeking out. */
function Folder() {
  // Left, right, then Avvira last so it sits on top in the middle.
  const papers = [
    { project: PROJECTS[1], tx: "-30%", ty: "-30%", rot: "-10deg", txh: "-48%", tyh: "-46%", roth: "-16deg", d: 1000 },
    { project: PROJECTS[3], tx: "30%", ty: "-30%", rot: "10deg", txh: "48%", tyh: "-46%", roth: "16deg", d: 1150 },
    { project: PROJECTS[0], tx: "0%", ty: "-46%", rot: "0deg", txh: "0%", tyh: "-66%", roth: "0deg", d: 1300 },
  ];

  return (
    <div className="fx-enter pf-folder aspect-[1.3]" style={delay(650)}>
      <div className="pf-folder-back">
        <span className="pf-folder-tab" />
      </div>

      {papers.map(({ project, tx, ty, rot, txh, tyh, roth, d }) => (
        <div
          key={project.name}
          className="pf-paper"
          style={
            {
              "--tx": tx,
              "--ty": ty,
              "--rot": rot,
              "--tx-h": txh,
              "--ty-h": tyh,
              "--rot-h": roth,
              "--d": `${d}ms`,
            } as CSSProperties
          }
        >
          <Image src={project.shot} alt={project.name} fill sizes="340px" className="object-cover object-top" />
        </div>
      ))}

      <div className="pf-folder-front flex items-end justify-between p-5 md:p-7">
        <span className="flex flex-col">
          <span className="fx-body text-[10px] font-semibold uppercase tracking-[0.3em] text-white/75 md:text-xs">
            Selected work
          </span>
          <span className="fx-display mt-1 text-lg font-extrabold text-white md:text-2xl">Live websites</span>
        </span>
        <span className="fx-display text-4xl font-extrabold leading-none text-white/90 md:text-6xl">
          0{PROJECTS.length}
        </span>
      </div>
    </div>
  );
}

export default function PortfolioHero() {
  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative -mt-[90px] overflow-hidden bg-[#050d16] pt-[90px] text-white">
      {/* ── Background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="fx-blob left-[-10%] top-[0%] h-[560px] w-[560px]"
          style={{ "--blob": "rgba(37,99,235,0.26)", "--dur": "18s", "--tx": "80px", "--ty": "60px" } as CSSProperties}
        />
        <div
          className="fx-blob right-[-12%] top-[20%] h-[600px] w-[600px]"
          style={{ "--blob": "rgba(26,158,131,0.22)", "--dur": "21s", "--tx": "-70px", "--ty": "40px" } as CSSProperties}
        />
        <pre className="pf-binary absolute inset-0 overflow-hidden pl-4 pt-6 text-[13px] md:text-[15px]">{BINARY}</pre>
        {BITS.map((b, i) => (
          <span
            key={i}
            className="pf-bit"
            style={{ left: b.left, top: b.top, fontSize: b.size, "--dur": b.dur, "--d": b.d } as CSSProperties}
          >
            {b.ch}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-20 pt-8 md:px-10 md:pt-12">
        {/* Header row — like the PDF pages */}
        <div
          className="fx-enter flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 md:text-xs"
          style={delay(100)}
        >
          <span>Portfolio</span>
          <span className="hidden sm:inline">Fluxon Infotech</span>
          <span>
            20<span className="text-white/80">(26)</span>
          </span>
        </div>
        <div className="relative mt-4 h-px w-full overflow-hidden bg-white/10">
          <span className="pf-line absolute inset-0 origin-left bg-gradient-to-r from-[#2dd4bf] to-[#3b82f6]" />
        </div>

        {/* Giant word + folder */}
        <div className="relative mt-10 md:mt-12">
          <h1 className="fx-display text-center text-[clamp(4.2rem,19vw,15.5rem)] font-extrabold leading-[0.85] tracking-[-0.05em]">
            <span className="sr-only">Portfolio — Fluxon Infotech</span>
            <span aria-hidden="true">
              {LETTERS.map((letter, i) => (
                <span key={i} className="fx-word">
                  <span style={delay(200 + i * 60)}>{letter}</span>
                </span>
              ))}
            </span>
          </h1>

          <div className="relative z-10 mx-auto mt-8 w-[min(540px,88vw)] sm:-mt-[clamp(2rem,8.5vw,6.8rem)]">
            <Folder />
          </div>

          {/* Left card — "WEB • API • DATABASE" */}
          <div className="fx-enter absolute left-0 top-[60%] z-20 hidden w-[290px] lg:block" style={delay(1150)}>
            <div className="fx-float" style={{ "--dur": "7s", "--amp": "-10px" } as CSSProperties}>
              <div className="-rotate-6 rounded-[22px] border border-white/10 bg-[#11161d]/95 p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]">
                <p className="font-mono text-sm tracking-[0.18em] text-white/85">WEB • API • DATABASE</p>
                <div className="mt-4 h-px bg-white/10" />
                <div className="mt-3 flex items-center justify-between text-white/60">
                  <span className="flex gap-2">
                    <FiAtSign size={15} />
                    <FiImage size={15} />
                  </span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#11161d]">
                    <FiSend size={13} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Company name — like the cover */}
          <div className="fx-enter absolute right-0 top-[47%] z-20 hidden text-right lg:block" style={delay(1000)}>
            <p className="fx-display text-3xl font-extrabold leading-[0.95] tracking-tight xl:text-[2.75rem]">
              FLUXON
              <br />
              INFOTECH
            </p>
            <p className="fx-body mt-2 text-base text-white/60">IT solutions that drive growth</p>
          </div>

          {/* Right card — what I bring */}
          <div className="fx-enter absolute bottom-[-8%] right-0 z-20 hidden w-[320px] lg:block" style={delay(1300)}>
            <div className="fx-float" style={{ "--dur": "8s", "--d": "-2s", "--amp": "-12px" } as CSSProperties}>
              <div className="rotate-3 space-y-3 rounded-[22px] border border-white/10 bg-[#11161d]/95 p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]">
                {[
                  { icon: FiMousePointer, text: "Building digital products", check: true },
                  { icon: FiPenTool, text: "Clean code. Smart solutions." },
                  { icon: FiCode, text: "From idea → development → deployment" },
                ].map(({ icon: Icon, text, check }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className="shrink-0 text-[#5eead4]" size={16} />
                    <span className="fx-body flex-1 text-[13px] uppercase tracking-wide text-white/85">{text}</span>
                    {check && <FiCheck className="shrink-0 text-white" size={18} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Company name on smaller screens */}
        <div className="fx-enter mt-10 text-center lg:hidden" style={delay(1000)}>
          <p className="fx-display text-3xl font-extrabold tracking-tight">Fluxon Infotech</p>
          <p className="fx-body mt-1 text-white/60">IT solutions that drive growth</p>
          <p className="mt-4 font-mono text-xs tracking-[0.2em] text-[#5eead4]">WEB • API • DATABASE</p>
        </div>

        {/* Bottom row */}
        <div
          className="fx-enter mt-12 flex flex-col items-center justify-between gap-8 md:mt-14 md:flex-row md:items-end"
          style={delay(1400)}
        >
          <p className="fx-display max-w-xs text-center text-lg font-extrabold uppercase leading-tight tracking-tight text-white/85 md:text-left">
            Building digital experiences through code
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic>
              <Link
                href="/portfolio#work"
                onClick={scrollTo("work")}
                className="fx-btn-shine fx-body group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1e6fd0] to-[#2a8fe0] py-4 pl-7 pr-4 text-sm font-semibold tracking-wide text-white shadow-[0_10px_40px_-10px_rgba(42,143,224,0.8)]"
              >
                View our work
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0.5">
                  <FiArrowDown size={15} />
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/portfolio#contact"
                onClick={scrollTo("contact")}
                className="fx-body group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:border-[#2dd4bf]/60 hover:bg-white/[0.08]"
              >
                Work with us
                <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
