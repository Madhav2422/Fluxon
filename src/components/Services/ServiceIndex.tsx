"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiArrowUpRight, FiPlus } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";
import { useMediaQuery } from "../Landing/useInView";
import { OPEN_SERVICE_EVENT, SERVICES } from "./services";

const PREVIEW_W = 360;
const PREVIEW_H = 290;

/**
 * Big typographic list of services. On desktop a live preview follows the
 * cursor; clicking a row expands its details. Supports /services#<slug> links
 * and requests from the hero's command palette.
 */
export default function ServiceIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [openSlugs, setOpenSlugs] = useState<ReadonlySet<string>>(() => new Set());
  const [hovered, setHovered] = useState<number | null>(null);
  const [shown, setShown] = useState(0);
  const canPreview = useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 1024px)");

  const toggle = (slug: string) =>
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  // Open a service from a deep link or from the hero palette, then scroll to it.
  useEffect(() => {
    const open = (slug: string, smooth: boolean) => {
      if (!SERVICES.some((s) => s.slug === slug)) return;
      setOpenSlugs((prev) => (prev.has(slug) ? prev : new Set(prev).add(slug)));
      requestAnimationFrame(() =>
        document.getElementById(slug)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" })
      );
    };
    const fromHash = () => open(decodeURIComponent(window.location.hash.slice(1)), false);
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      open(slug, true);
      history.replaceState(null, "", `#${slug}`);
    };

    // Links like the footer's "/services#ai-solutions" clicked while already on this page:
    // the router updates the URL without a hashchange event, so catch the click itself.
    const onLinkClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname === window.location.pathname && url.hash) open(decodeURIComponent(url.hash.slice(1)), true);
    };

    const initial = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    window.addEventListener(OPEN_SERVICE_EVENT, onOpen);
    document.addEventListener("click", onLinkClick);
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener(OPEN_SERVICE_EVENT, onOpen);
      document.removeEventListener("click", onLinkClick);
    };
  }, []);

  // The preview card glides after the cursor (eased, one transform per frame).
  useEffect(() => {
    const list = listRef.current;
    const el = previewRef.current;
    if (!canPreview || !list || !el) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let placed = false;

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const flip = e.clientX + 36 + PREVIEW_W > window.innerWidth - 16;
      tx = flip ? e.clientX - 36 - PREVIEW_W : e.clientX + 36;
      ty = Math.min(window.innerHeight - PREVIEW_H - 16, Math.max(100, e.clientY - PREVIEW_H / 2));
      if (!placed) {
        x = tx;
        y = ty;
        placed = true;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      placed = false;
    };

    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
    };
  }, [canPreview]);

  const preview = SERVICES[shown];
  const PreviewIcon = preview.icon;

  return (
    <section className="relative bg-white py-24 md:py-32">
      <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="fx-display mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0d2340] md:text-6xl">
              Six services.
              <br />
              <span className="fx-gradient-text-dark">One team that ships.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="fx-body max-w-sm text-base leading-relaxed text-gray-500 md:text-lg">
              <span className="hidden lg:inline">Hover a service to preview it — click </span>
              <span className="lg:hidden">Tap </span>
              to see what&apos;s included, the tools we use and how to get started.
            </p>
          </Reveal>
        </div>

        <div
          ref={listRef}
          onMouseLeave={() => setHovered(null)}
          className="mt-14 border-t border-[#0d2340]/10 md:mt-20"
        >
          {SERVICES.map((s, i) => {
            const isOpen = openSlugs.has(s.slug);
            return (
              <div key={s.slug} id={s.slug} className="scroll-mt-[100px] border-b border-[#0d2340]/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${s.slug}-panel`}
                    onClick={() => toggle(s.slug)}
                    onMouseEnter={() => {
                      if (!canPreview) return;
                      setHovered(i);
                      setShown(i);
                    }}
                    className="sv-row group relative flex w-full items-center gap-4 py-7 text-left md:gap-8 md:py-9"
                  >
                    <span className="w-7 shrink-0 font-mono text-xs text-[#0d2340]/40 transition-colors duration-300 group-hover:text-[#5eead4] md:w-12 md:text-sm">
                      0{i + 1}
                    </span>
                    <span className="sv-row-title fx-display min-w-0 flex-1 text-[clamp(1.7rem,5.4vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#0d2340] group-hover:text-white">
                      {s.title}
                    </span>
                    <span className="fx-body hidden max-w-[240px] text-right text-sm leading-snug text-gray-500 transition-colors duration-300 group-hover:text-white/70 lg:block">
                      {s.short}
                    </span>
                    <span className="sv-plus grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#0d2340]/15 text-[#0d2340] group-hover:border-white/30 group-hover:text-white md:h-14 md:w-14">
                      <FiPlus size={20} />
                    </span>
                  </button>
                </h3>

                <div id={`${s.slug}-panel`} role="region" aria-label={s.title} data-open={isOpen} className="sv-panel">
                  <div>
                    <div className="sv-panel-inner grid gap-10 pb-12 pt-2 md:pl-[5rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                      <div>
                        <p className="fx-body max-w-xl text-lg leading-relaxed text-gray-600">{s.description}</p>

                        <p className="fx-body mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#0d2340]/45">
                          What we offer
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {s.tags.map((tag) => (
                            <span
                              key={tag}
                              className="fx-body rounded-full border border-[#1a9e83]/25 bg-[#f0fffc] px-3.5 py-1.5 text-sm font-medium text-[#1a9e83]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {s.tools.length > 0 && (
                          <>
                            <p className="fx-body mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-[#0d2340]/45">
                              Tools we use
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {s.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="rounded-lg bg-[#0d2340] px-3 py-1.5 font-mono text-xs text-white/85"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </>
                        )}

                        <div className="mt-9 flex flex-wrap items-center gap-3">
                          <Link
                            href="/contact"
                            tabIndex={isOpen ? undefined : -1}
                            className="fx-body group/cta inline-flex items-center gap-3 rounded-full bg-[#0d2340] py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1a9e83]"
                          >
                            Discuss your project
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover/cta:translate-x-1">
                              <FiArrowRight size={16} />
                            </span>
                          </Link>
                          <Link
                            href="/portfolio"
                            tabIndex={isOpen ? undefined : -1}
                            className="fx-body inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-sm font-semibold text-[#0d2340] transition-colors hover:text-[#1a9e83]"
                          >
                            See our work <FiArrowUpRight />
                          </Link>
                        </div>
                      </div>

                      <div className="relative grid h-[260px] place-items-center overflow-hidden rounded-[24px] border border-[#0d2340]/10 bg-gradient-to-br from-[#f0fffc] via-white to-[#eef4ff] px-6 md:h-[300px]">
                        <div className={s.wide ? "w-full max-w-[520px]" : "w-full max-w-[300px] md:scale-125"}>
                          <div className="flex justify-center">{s.visual}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cursor-following preview (desktop only). Kept outside reveal wrappers so `fixed` stays viewport-relative. */}
      {canPreview && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{ transform: "translate3d(-9999px, 0, 0)" }}
        >
          <div
            data-show={hovered !== null}
            className="sv-preview overflow-hidden rounded-[22px] border border-[#0d2340]/10 bg-white shadow-[0_40px_80px_-30px_rgba(13,35,64,0.55)]"
            style={{ width: PREVIEW_W, height: PREVIEW_H }}
          >
            <div className="flex items-center gap-2 border-b border-[#0d2340]/[0.07] bg-[#f6f7f8] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 truncate font-mono text-[11px] text-[#0d2340]/45">{preview.slug}.preview</span>
            </div>
            <div key={shown} className="sv-swap grid h-[190px] place-items-center bg-gradient-to-br from-[#f0fffc] via-white to-[#eef4ff] px-6">
              <div className={preview.wide ? "w-full" : "w-full max-w-[240px]"}>
                <div className="flex justify-center">{preview.visual}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#1a9e83] to-[#2563eb] text-white">
                <PreviewIcon size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="fx-display block truncate text-sm font-bold text-[#0d2340]">{preview.title}</span>
                <span className="fx-body block truncate text-[11px] text-gray-400">Click to see what&apos;s included</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
