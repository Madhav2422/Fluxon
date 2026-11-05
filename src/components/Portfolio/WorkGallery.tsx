"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { FiArrowRight, FiArrowUpRight, FiLock, FiMousePointer } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import { prefersReducedMotion } from "../Landing/useInView";
import { PROJECTS, type Project } from "./projects";

const NAV = 90; // fixed navbar height on desktop

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.name} (opens in a new tab)`}
      className="pf-card group block w-full shrink-0 outline-none lg:w-[clamp(340px,60vh,600px)]"
      style={{ "--accent": project.accent } as CSSProperties}
    >
      {/* Browser window */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1724] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] transition-[translate,box-shadow,border-color] duration-500 group-hover:-translate-y-2 group-hover:border-[color:var(--accent)]/60 group-focus-visible:border-[#2dd4bf]">
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-white/55">
            <FiLock size={10} className="shrink-0" />
            <span className="truncate">{project.domain}</span>
          </span>
          <FiArrowUpRight className="text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        </div>
        <div className="pf-shot-frame relative aspect-[16/10] overflow-hidden bg-white">
          <Image
            src={project.full}
            alt={`${project.name} website`}
            sizes="(min-width: 1024px) 600px, 92vw"
            placeholder="blur"
            className="pf-shot absolute inset-x-0 top-0 h-auto w-full"
          />
          <span className="pf-hint fx-body pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#050d16]/80 px-3 py-1.5 text-[11px] font-medium text-white/85 transition-opacity duration-300">
            <FiMousePointer size={11} /> Hover to scroll the site
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/40">0{index + 1}</span>
            <span className="h-px w-8 bg-[color:var(--accent)]" />
            <span className="fx-body text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 lg:truncate lg:text-xs">
              {project.category}
            </span>
          </div>
          <h3 className="fx-display mt-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {project.name}
          </h3>
          <p className="fx-body mt-2 max-w-md text-sm leading-relaxed text-white/60">{project.description}</p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-white group-hover:text-[#050d16]">
          <FiArrowUpRight size={20} />
        </span>
      </div>
    </a>
  );
}

/**
 * Live websites. On desktop the section pins and the cards slide sideways as you
 * scroll (one transform per frame); on smaller screens they simply stack.
 */
export default function WorkGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    const count = countRef.current;
    if (!section || !track || !bar || !count) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = prefersReducedMotion();
    let distance = 0;
    let raf = 0;
    let shown = -1;

    const measure = () => {
      if (!desktop.matches || reduced) {
        distance = 0;
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight - NAV + distance}px`;
    };

    const update = () => {
      raf = 0;
      if (!distance) return;
      const r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const p = Math.min(1, Math.max(0, (NAV - r.top) / distance));
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px, 0, 0)`;
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
      const index = Math.min(PROJECTS.length - 1, Math.round(p * (PROJECTS.length - 1)));
      if (index !== shown) {
        shown = index;
        count.textContent = String(index + 1).padStart(2, "0");
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    desktop.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      desktop.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative scroll-mt-[90px] bg-[#050d16] text-white">
      <div className="py-24 lg:sticky lg:top-[90px] lg:flex lg:h-[calc(100vh-90px)] lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
        <div aria-hidden="true" className="fx-grid-bg pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(42,143,224,0.2),transparent)]"
        />

        {/* Heading */}
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col justify-between gap-6 px-6 md:px-10 lg:flex-row lg:items-end">
          <div>
            <Eyebrow dark>Our work</Eyebrow>
            <h2 className="fx-display mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Live websites <span className="fx-gradient-text">we&apos;ve built</span>
            </h2>
            <p className="fx-body mt-4 max-w-md text-base text-white/55">
              Click any project to visit the live site. Hover a window to scroll through the whole page.
            </p>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <span className="font-mono text-sm text-white/50">
              <span ref={countRef} className="text-white">
                01
              </span>{" "}
              / 0{PROJECTS.length}
            </span>
            <span className="relative h-px w-40 overflow-hidden bg-white/15">
              <span
                ref={barRef}
                className="absolute inset-0 origin-left bg-gradient-to-r from-[#2dd4bf] to-[#3b82f6]"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="relative mt-12 flex flex-col gap-16 px-6 will-change-transform md:px-10 lg:mt-10 lg:w-max lg:flex-row lg:gap-12 lg:pl-[max(2.5rem,calc((100vw_-_1280px)/2_+_2.5rem))] lg:pr-[8vw]"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.url} project={project} index={i} />
          ))}

          {/* Closing card */}
          <Link
            href="/contact"
            className="group flex w-full shrink-0 flex-col items-start justify-between rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-[#2dd4bf]/60 hover:bg-white/[0.04] lg:w-[clamp(280px,40vh,380px)] lg:self-stretch"
          >
            <span className="fx-body text-xs font-semibold uppercase tracking-[0.25em] text-[#5eead4]">Next up</span>
            <span className="fx-display mt-6 text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Your project could be next.
            </span>
            <span className="fx-body mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
              Start a conversation
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
