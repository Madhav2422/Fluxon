"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Eyebrow from "../Landing/Eyebrow";
import { prefersReducedMotion } from "../Landing/useInView";

const STORY =
  "Fluxon Infotech was founded with a simple yet powerful vision — to empower businesses through technology. We believe technology should be an enabler, not a barrier. So we pair deep technical expertise with a genuine understanding of business challenges, and help startups and enterprises modernize, build digital products and scale with confidence.";

const ACCENTS = new Set(["empower", "businesses", "enabler,", "expertise", "scale", "confidence."]);
const WORDS = STORY.split(" ");

/**
 * Our story as one big statement. The section is tall and its content sticky,
 * so as you scroll the words light up one by one. Only the words that change
 * are touched each frame, so it stays cheap.
 */
export default function StoryManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const section = sectionRef.current;
    const bar = barRef.current;
    const words = wordRefs.current;
    if (!section || !bar) return;

    if (reduced) {
      words.forEach((w) => w?.setAttribute("data-lit", "true"));
      bar.style.transform = "scaleX(1)";
      return;
    }

    let lit = 0;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;

      const nav = window.innerWidth >= 1024 ? 90 : 80;
      const start = nav + vh * 0.3; // start lighting a little before the text sticks
      const distance = r.height - (vh - nav) + vh * 0.3;
      const p = Math.min(1, Math.max(0, (start - r.top) / distance));

      // Finish lighting at ~85% so the full statement can be read before it leaves.
      const next = Math.min(words.length, Math.round((p / 0.85) * words.length));
      if (next !== lit) {
        const on = next > lit;
        for (let i = Math.min(lit, next); i < Math.max(lit, next); i++) {
          words[i]?.setAttribute("data-lit", on ? "true" : "false");
        }
        lit = next;
      }
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
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
  }, [reduced]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className={`relative bg-white ${reduced ? "py-24" : "h-[230vh] lg:h-[260vh]"}`}
    >
      <div
        className={
          reduced
            ? ""
            : "sticky top-20 flex h-[calc(100svh-80px)] items-center overflow-hidden lg:top-[90px] lg:h-[calc(100svh-90px)]"
        }
      >
        <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(26,158,131,0.09),transparent)]"
        />

        <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-10">
          <div className="flex items-center gap-5">
            <Eyebrow>Our story</Eyebrow>
            <span className="relative h-px flex-1 overflow-hidden bg-[#0d2340]/10">
              <span
                ref={barRef}
                className="absolute inset-0 origin-left bg-gradient-to-r from-[#1a9e83] to-[#3b82f6]"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </div>

          {/* Size follows both width and height, so the whole statement always fits on screen while pinned. */}
          <p className="fx-display mt-9 text-[clamp(1.4rem,min(3.4vw,5.4svh),3.15rem)] font-bold leading-[1.28] tracking-[-0.02em]">
            {WORDS.map((word, i) => (
              <Fragment key={i}>
                <span
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className="fx-mword"
                  data-accent={ACCENTS.has(word) ? "true" : undefined}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
