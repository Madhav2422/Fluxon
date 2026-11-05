import Link from "next/link";
import type { CSSProperties } from "react";
import { FiArrowRight, FiArrowUpRight, FiMail, FiPhone } from "react-icons/fi";
import Eyebrow from "./Eyebrow";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

/** Closing call-to-action: aurora card with a rotating circular badge. */
export default function CTASection() {
  return (
    <section className="relative bg-white px-4 py-24 md:px-10 md:py-32">
      <Reveal variant="scale" className="mx-auto max-w-[1280px]">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#050d16] px-6 py-20 text-center text-white md:rounded-[2.5rem] md:px-16 md:py-28">
          {/* Aurora */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="fx-blob -left-24 -top-24 h-[420px] w-[420px]"
              style={{ "--blob": "rgba(26,158,131,0.45)", "--dur": "14s", "--tx": "120px", "--ty": "60px" } as CSSProperties}
            />
            <div
              className="fx-blob -bottom-32 -right-16 h-[460px] w-[460px]"
              style={{ "--blob": "rgba(37,99,235,0.4)", "--dur": "17s", "--tx": "-100px", "--ty": "-50px" } as CSSProperties}
            />
            <div
              className="fx-blob left-1/3 top-1/3 h-[300px] w-[300px]"
              style={{ "--blob": "rgba(76,201,212,0.25)", "--dur": "12s", "--tx": "80px", "--ty": "-40px" } as CSSProperties}
            />
            <div className="fx-grid-bg absolute inset-0" />
          </div>

          {/* Rotating badge */}
          <Link
            href="/contact"
            aria-label="Contact Fluxon Infotech"
            className="group absolute right-8 top-8 hidden h-32 w-32 lg:block"
          >
            <svg viewBox="0 0 200 200" className="fx-spin-slow h-full w-full" aria-hidden="true">
              <defs>
                <path id="fx-badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text fill="rgba(255,255,255,0.65)" fontSize="15.5" fontWeight="700" letterSpacing="6.1" className="fx-display">
                <textPath href="#fx-badge-circle">LET&apos;S BUILD • THE FUTURE • TOGETHER • </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#2563eb] text-white shadow-[0_0_30px_rgba(45,212,191,0.6)] transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
              <FiArrowUpRight size={22} />
            </span>
          </Link>

          <Eyebrow dark>Let&apos;s talk</Eyebrow>
          <h2 className="fx-display mx-auto mt-7 max-w-4xl text-balance text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Ready to build something <span className="fx-gradient-text">extraordinary?</span>
          </h2>
          <p className="fx-body mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            Let&apos;s discuss how Fluxon Infotech can help you achieve your technology goals. Tell us
            about your idea — we&apos;ll take it from there.
          </p>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.4}>
              <Link
                href="/contact"
                className="fx-btn-shine fx-body group inline-flex items-center gap-4 rounded-full bg-white py-2 pl-8 pr-2 text-sm font-bold tracking-wide text-[#050d16] shadow-[0_20px_50px_-15px_rgba(45,212,191,0.7)]"
              >
                Get Started Today
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#1a9e83] to-[#2563eb] text-white transition-transform duration-500 group-hover:-rotate-45">
                  <FiArrowRight size={18} />
                </span>
              </Link>
            </Magnetic>
            <a
              href="mailto:fluxoninfotech@gmail.com"
              className="fx-body group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white/80 backdrop-blur-md transition-colors duration-300 hover:border-[#2dd4bf]/50 hover:text-white"
            >
              <FiMail className="text-[#2dd4bf]" />
              fluxoninfotech@gmail.com
            </a>
          </div>

          <a
            href="tel:+917984846312"
            className="fx-body mt-8 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white/80"
          >
            <FiPhone size={14} /> Prefer a call? +91 79848 46312
          </a>
        </div>
      </Reveal>
    </section>
  );
}
