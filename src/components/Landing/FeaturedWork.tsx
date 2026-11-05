import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FiArrowRight, FiArrowUpRight, FiLock } from "react-icons/fi";
import { PROJECTS } from "../Portfolio/projects";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

/**
 * Home-page teaser for the portfolio: a slowly moving wall of live websites
 * (each card opens the real site). Pauses on hover.
 */
const INDUSTRIES = ["Agro", "Fragrance", "Manufacturing", "Minerals", "Healthcare"];

export default function FeaturedWork() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(42,143,224,0.1),transparent)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal>
            <Eyebrow>Our work</Eyebrow>
            <h2 className="fx-display mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0d2340] md:text-5xl">
              Websites we&apos;ve <span className="fx-gradient-text-dark">built &amp; shipped</span>
            </h2>
            <p className="fx-body mt-5 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg">
              Real businesses, live online — from agro industries and fragrances to heavy machinery and healthcare.
              Click any project to visit it.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-3xl border border-[#0d2340]/10 bg-[#f7faf9] p-6 shadow-[0_20px_50px_-35px_rgba(13,35,64,0.5)]">
              <div className="flex items-baseline gap-3">
                <span className="fx-display fx-gradient-text-dark text-5xl font-extrabold tracking-tight">
                  0{PROJECTS.length}
                </span>
                <span className="fx-body text-sm font-medium text-gray-500">
                  live websites across {INDUSTRIES.length} industries
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {INDUSTRIES.map((industry) => (
                  <span
                    key={industry}
                    className="fx-body rounded-full border border-[#1a9e83]/20 bg-white px-3 py-1 text-xs font-medium text-[#1a9e83]"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/portfolio"
              className="fx-body group mt-5 inline-flex items-center gap-3 rounded-full bg-[#0d2340] py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1a9e83]"
            >
              View full portfolio
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <FiArrowRight size={16} />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Moving wall of live websites */}
      <Reveal delay={200} className="mt-16">
        <div className="fx-marquee overflow-hidden py-4">
          <div className="fx-marquee-track" style={{ "--dur": "60s" } as CSSProperties}>
            {[0, 1].map((copy) =>
              PROJECTS.map((p) => (
                <a
                  key={`${p.url}-${copy}`}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-hidden={copy === 1 ? true : undefined}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="group mr-6 block w-[300px] shrink-0 md:w-[400px]"
                >
                  <div className="overflow-hidden rounded-2xl border border-[#0d2340]/10 bg-white shadow-[0_24px_50px_-30px_rgba(13,35,64,0.45)] transition-[translate,box-shadow] duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_34px_60px_-28px_rgba(13,35,64,0.55)]">
                    <div className="flex items-center gap-1.5 border-b border-[#0d2340]/[0.07] bg-[#f6f7f8] px-3 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                      <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                      <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                      <span className="ml-2 flex min-w-0 items-center gap-1 truncate font-mono text-[10px] text-[#0d2340]/45">
                        <FiLock size={9} className="shrink-0" />
                        {p.domain}
                      </span>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.shot}
                        alt={`${p.name} website`}
                        fill
                        sizes="400px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 px-1">
                    <div className="min-w-0">
                      <p className="fx-display truncate font-bold text-[#0d2340]">{p.name}</p>
                      <p className="fx-body truncate text-xs text-gray-400">{p.category}</p>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#0d2340]/10 text-[#0d2340] transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-[#0d2340] group-hover:text-white">
                      <FiArrowUpRight size={16} />
                    </span>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
