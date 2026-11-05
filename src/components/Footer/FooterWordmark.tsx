"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../Landing/useInView";

/**
 * Giant "FLUXON" wordmark. An outlined base layer with a gradient copy on top that is
 * only visible inside a soft spotlight. The spotlight sweeps across once when the
 * footer appears, then follows the mouse (desktop) and glides back to the centre.
 * Only a CSS variable changes per frame, and nothing runs while idle.
 */
export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let sweepRaf = 0;
    let sweepTimer: ReturnType<typeof setTimeout> | undefined;
    let hovering = false;

    const apply = () => {
      el.style.setProperty("--x", `${x.toFixed(1)}px`);
      el.style.setProperty("--y", `${y.toFixed(1)}px`);
    };
    const center = () => ({ cx: el.offsetWidth / 2, cy: el.offsetHeight * 0.55 });
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      apply();
      raf = Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const glide = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const recenter = () => {
      const { cx, cy } = center();
      tx = cx;
      ty = cy;
    };

    recenter();
    x = tx;
    y = ty;
    apply();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      hovering = true;
      cancelAnimationFrame(sweepRaf);
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      glide();
    };
    const onLeave = () => {
      hovering = false;
      recenter();
      glide();
    };
    const onResize = () => {
      if (hovering) return;
      recenter();
      x = tx;
      y = ty;
      apply();
    };

    // One sweep from left to right the first time the wordmark appears.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduced) return;
        sweepTimer = setTimeout(() => {
          const w = el.offsetWidth;
          const t0 = performance.now();
          const D = 1900;
          const step = (now: number) => {
            if (hovering) return;
            const p = Math.min(1, (now - t0) / D);
            const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            x = tx = w * (-0.15 + 1.3 * e);
            y = ty = el.offsetHeight * 0.55;
            apply();
            if (p < 1) sweepRaf = requestAnimationFrame(step);
            else {
              recenter();
              glide();
            }
          };
          sweepRaf = requestAnimationFrame(step);
        }, 650);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      clearTimeout(sweepTimer);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(sweepRaf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div ref={ref} aria-hidden="true" className="ft-word-move relative">
        <span className="ft-word ft-word--base">FLUXON</span>
        <span className="ft-word ft-word--fill">FLUXON</span>
      </div>
    </div>
  );
}
