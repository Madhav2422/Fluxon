import Link from "next/link";
import type { CSSProperties } from "react";
import { FiArrowRight, FiCheck, FiGlobe, FiMail, FiPhone } from "react-icons/fi";
import Magnetic from "../Landing/Magnetic";
import Reveal from "../Landing/Reveal";

const CONTACTS = [
  { icon: FiPhone, label: "7984846312", href: "tel:+917984846312" },
  { icon: FiMail, label: "fluxoninfotech@gmail.com", href: "mailto:fluxoninfotech@gmail.com" },
  { icon: FiGlobe, label: "fluxoninfotech.com", href: "https://fluxoninfotech.com", external: true },
];

const WORDS = ["Work", "with", "us!"];

/** "Work with us!" — giant words that fill with colour as they appear, plus contact details. */
export default function WorkWithUs() {
  return (
    <section id="contact" className="pf-warm relative scroll-mt-[90px] overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <h2 className="fx-display text-[clamp(4.5rem,15vw,11rem)] font-extrabold leading-[0.86] tracking-[-0.05em]">
            {WORDS.map((w, i) => (
              <span key={w} className="block">
                <span className="pf-fill" style={{ "--d": `${200 + i * 220}ms` } as CSSProperties}>
                  {w}
                </span>
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal variant="right" delay={200}>
          <p className="fx-display max-w-sm text-xl font-extrabold uppercase leading-tight tracking-tight text-[#11161d] md:text-2xl">
            We&apos;d love to help grow your brand through impactful content and strategy
          </p>

          <div className="mt-10 overflow-hidden rounded-[26px] bg-[#11161d] text-white shadow-[0_40px_80px_-40px_rgba(17,22,29,0.8)]">
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">
              <span className="fx-display text-xl font-extrabold">Contact us!</span>
              <FiCheck size={24} />
            </div>
            <ul className="space-y-2 p-4">
              {CONTACTS.map(({ icon: Icon, label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-white/[0.06]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#11161d] transition-colors duration-300 group-hover:bg-[#2dd4bf]">
                      <Icon size={17} />
                    </span>
                    <span className="fx-body min-w-0 flex-1 truncate text-[15px] text-white/85 group-hover:text-white">
                      {label}
                    </span>
                    <FiArrowRight className="shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Magnetic>
              <Link
                href="/contact"
                className="fx-btn-shine fx-body group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#1e6fd0] to-[#2a8fe0] py-2 pl-7 pr-2 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(30,111,208,0.8)]"
              >
                Start a project
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:-rotate-45">
                  <FiArrowRight size={17} />
                </span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
