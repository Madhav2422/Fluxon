"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FiArrowUpRight, FiCheck, FiCopy, FiInstagram, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import { useIndiaTime } from "../Landing/useIndiaTime";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const EMAIL = "fluxoninfotech@gmail.com";

interface Channel {
  icon: IconType;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  tint: string;
}

const CHANNELS: Channel[] = [
  { icon: FiPhone, label: "Call us", value: "+91 79848 46312", href: "tel:+917984846312", tint: "#1a9e83" },
  { icon: FiMail, label: "Email us", value: EMAIL, href: `mailto:${EMAIL}`, tint: "#2563eb" },
  { icon: FiLinkedin, label: "LinkedIn", value: "Connect with us", href: "https://www.linkedin.com/in/fluxon-infotech", external: true, tint: "#0a66c2" },
  {
    icon: FiInstagram,
    label: "Instagram",
    value: "@fluxoninfotech",
    href: "https://www.instagram.com/fluxoninfotech?igsh=OTk3ZGpmd2ppbHRl&utm_source=ig_contact_invite",
    external: true,
    tint: "#e1306c",
  },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(EMAIL);
          setCopied(true);
        } catch {
          window.location.href = `mailto:${EMAIL}`;
        }
      }}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="fx-body relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[#0d2340]/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#0d2340] transition-colors hover:border-[#2563eb]/40"
    >
      {copied ? <FiCheck className="text-[#1a9e83]" /> : <FiCopy />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function ContactHero() {
  const time = useIndiaTime();

  return (
    <section className="ct-warm relative -mt-[90px] overflow-hidden pt-[90px]">
      {/* ── Background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ct-grain absolute inset-0" />
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.18),transparent)]" />
        <div className="absolute -right-40 top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.12),transparent)]" />

        {/* A paper plane drifting along a dashed flight path */}
        <svg viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <path
            id="ct-flight-path"
            d="M-60 520 C 220 380, 380 600, 620 430 S 980 160, 1180 300 S 1420 260, 1520 120"
            fill="none"
            stroke="#1a9e83"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeLinecap="round"
            className="ct-flight"
          />
          <g>
            <path d="M0 -11 L26 0 L0 11 L6 0 Z" fill="#0d2340" />
            <path d="M6 0 L26 0 L0 11 Z" fill="#1a9e83" />
            <animateMotion dur="16s" repeatCount="indefinite" rotate="auto">
              <mpath href="#ct-flight-path" />
            </animateMotion>
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-20 pt-14 md:px-10 md:pb-24 md:pt-20">
        <div className="fx-enter" style={delay(100)}>
          <Eyebrow>Contact us</Eyebrow>
        </div>

        <h1 className="fx-display mt-7 text-[clamp(3.4rem,11vw,9rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-[#0d2340]">
          <span className="sr-only">Let&apos;s talk.</span>
          <span aria-hidden="true">
            <span className="fx-word mr-[0.2em]">
              <span style={delay(200)}>Let&apos;s</span>
            </span>
            <span className="relative inline-block">
              <span className="fx-word">
                <span style={delay(320)} className="fx-gradient-text-dark">
                  talk.
                </span>
              </span>
              {/* Hand-drawn circle */}
              <svg
                viewBox="0 0 300 130"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -inset-x-[8%] -inset-y-[14%] h-[128%] w-[116%] overflow-visible"
              >
                <path
                  d="M152 14 C 60 10, 10 40, 14 70 C 18 108, 120 122, 196 114 C 268 106, 296 76, 284 46 C 272 18, 190 6, 120 16"
                  pathLength={1}
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="ct-draw"
                  style={delay(950)}
                />
              </svg>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="fx-enter fx-body max-w-xl text-base leading-relaxed text-[#0d2340]/65 md:text-lg" style={delay(650)}>
            Have a project in mind, a question, or just an idea you&apos;re excited about? Tell us about it — a real person
            from our team reads every message.
          </p>

          <div
            className="fx-enter fx-body inline-flex items-center gap-3 self-start rounded-full border border-[#0d2340]/10 bg-white/80 px-4 py-2.5 text-sm text-[#0d2340]/75 shadow-sm md:self-auto"
            style={delay(800)}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            </span>
            <span>
              {time ? (
                <>
                  It&apos;s <span className="font-semibold tabular-nums text-[#0d2340]">{time}</span> in India
                </>
              ) : (
                "Based in India"
              )}{" "}
              · we reply within 24 hours
            </span>
          </div>
        </div>

        {/* Ways to reach us */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="fx-enter" style={delay(900 + i * 110)}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group relative flex h-full flex-col gap-5 rounded-3xl border border-[#0d2340]/[0.08] bg-white p-6 shadow-[0_20px_40px_-32px_rgba(13,35,64,0.5)] transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-[color:var(--tint)]/40 hover:shadow-[0_30px_50px_-30px_rgba(13,35,64,0.55)]"
                  style={{ "--tint": c.tint } as CSSProperties}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="ct-card-icon grid h-12 w-12 place-items-center rounded-2xl text-white"
                      style={{ backgroundColor: c.tint }}
                    >
                      <Icon size={20} />
                    </span>
                    {c.label === "Email us" ? (
                      <CopyEmail />
                    ) : (
                      <FiArrowUpRight className="text-[#0d2340]/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0d2340]" size={20} />
                    )}
                  </div>
                  <span>
                    <span className="fx-body block text-xs font-semibold uppercase tracking-[0.2em] text-[#0d2340]/45">
                      {c.label}
                    </span>
                    <span
                      className={`fx-display mt-1.5 block font-bold text-[#0d2340] ${
                        c.label === "Email us" ? "break-all text-[15px] xl:text-base" : "text-lg"
                      }`}
                    >
                      {c.value}
                    </span>
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
