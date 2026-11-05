"use client";

import { useEffect, useRef } from "react";

/**
 * "Flux field" — hundreds of light particles drifting along an animated
 * flow field. The cursor creates a vortex; clicking sends out a shockwave.
 *
 * Performance guards:
 *  - pauses when off-screen or when the tab is hidden
 *  - simulates at most ~60 times per second (also on 120 Hz screens)
 *  - canvas resolution capped at 1.5× device pixels
 *  - no allocations per particle per frame (ring-buffer trails)
 *  - sheds particles automatically if a device can't keep up
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  speed: number;
  color: number;
  /** Ring buffer of recent positions: [x0, y0, x1, y1, ...]. */
  trail: Float32Array;
  /** Next point slot to write. */
  head: number;
  /** Number of valid points in the trail. */
  count: number;
}

const COLORS = ["45,212,191", "76,201,212", "96,165,250", "26,158,131"];
const ALPHA_LEVELS = 4;
const TRAIL_POINTS = 12;
const MOUSE_RADIUS = 170;
const BURST_RADIUS = 260;
const MAX_DPR = 1.5;
const MIN_FRAME_GAP_MS = 10; // skip frames closer than this → ~60 fps on 120 Hz displays
const WORK_BUDGET_MS = 6; // average per-frame cost above this → shed particles
const MIN_PARTICLES = 120;

export default function FluxField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let particleCap = Infinity; // lowered permanently if the device struggles
    let raf = 0;
    let running = false;
    let onScreen = true;
    let lastFrame = 0;
    let avgCost = 0;
    let sampled = 0;
    let time = Math.random() * 100;
    const mouse = { x: 0, y: 0, active: false };

    const reset = (p: Particle) => {
      p.x = Math.random() * width;
      p.y = Math.random() * height;
      p.vx = 0;
      p.vy = 0;
      p.life = 0;
      p.maxLife = 180 + Math.random() * 260;
      p.speed = 0.6 + Math.random() * 1.3;
      p.color = (Math.random() * COLORS.length) | 0;
      p.head = 0;
      p.count = 0;
    };

    const create = (): Particle => {
      const p: Particle = {
        x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, speed: 0, color: 0,
        trail: new Float32Array(TRAIL_POINTS * 2), head: 0, count: 0,
      };
      reset(p);
      p.life = Math.random() * p.maxLife * 0.6; // stagger so they don't all fade together
      return p;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      // Resizing a canvas resets its context state.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1.2;

      const target = Math.min(Math.round((width * height) / 2400), width < 768 ? 200 : 560, particleCap);
      while (particles.length < target) particles.push(create());
      if (particles.length > target) particles = particles.slice(0, target);
    };

    // Cheap layered-sine "noise" — smooth, organic and evolving over time.
    const flowAngle = (x: number, y: number) => {
      const s = 0.0017;
      const n =
        Math.sin(x * s + time) +
        Math.cos(y * s * 1.4 - time * 0.8) +
        Math.sin((x - y) * s * 0.6 + time * 0.5);
      return n * 0.75;
    };

    const step = (dt: number) => {
      time += 0.0025 * dt;
      const r2 = MOUSE_RADIUS * MOUSE_RADIUS;

      for (const p of particles) {
        const a = flowAngle(p.x, p.y);
        let tx = Math.cos(a) * p.speed;
        let ty = Math.sin(a) * p.speed;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = 1 - d / MOUSE_RADIUS;
            const nx = dx / d;
            const ny = dy / d;
            // swirl around the cursor + a gentle outward push
            tx += (-ny * 3.4 + nx * 1.2) * f;
            ty += (nx * 3.4 + ny * 1.2) * f;
          }
        }

        p.vx += (tx - p.vx) * 0.07 * dt;
        p.vy += (ty - p.vy) * 0.07 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        p.trail[p.head * 2] = p.x;
        p.trail[p.head * 2 + 1] = p.y;
        p.head = (p.head + 1) % TRAIL_POINTS;
        if (p.count < TRAIL_POINTS) p.count++;

        if (p.life > p.maxLife || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
          reset(p);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // Batch by colour + opacity so we issue ~32 draw calls instead of hundreds.
      const bucketCount = COLORS.length * ALPHA_LEVELS;
      const trails: Path2D[] = [];
      const heads: Path2D[] = [];
      for (let i = 0; i < bucketCount; i++) {
        trails.push(new Path2D());
        heads.push(new Path2D());
      }

      for (const p of particles) {
        if (p.count < 2) continue;
        const fade = Math.min(1, p.life / 40, (p.maxLife - p.life) / 40);
        if (fade <= 0) continue;
        const level = Math.min(ALPHA_LEVELS - 1, (fade * ALPHA_LEVELS) | 0);
        const bucket = p.color * ALPHA_LEVELS + level;

        const path = trails[bucket];
        let idx = (p.head - p.count + TRAIL_POINTS) % TRAIL_POINTS;
        path.moveTo(p.trail[idx * 2], p.trail[idx * 2 + 1]);
        for (let k = 1; k < p.count; k++) {
          idx = (idx + 1) % TRAIL_POINTS;
          path.lineTo(p.trail[idx * 2], p.trail[idx * 2 + 1]);
        }

        heads[bucket].moveTo(p.x + 1.3, p.y);
        heads[bucket].arc(p.x, p.y, 1.3, 0, Math.PI * 2);
      }

      for (let c = 0; c < COLORS.length; c++) {
        for (let l = 0; l < ALPHA_LEVELS; l++) {
          const i = c * ALPHA_LEVELS + l;
          const alpha = (l + 1) / ALPHA_LEVELS;
          ctx.strokeStyle = `rgba(${COLORS[c]},${(0.34 * alpha).toFixed(3)})`;
          ctx.stroke(trails[i]);
          ctx.fillStyle = `rgba(${COLORS[c]},${(0.9 * alpha).toFixed(3)})`;
          ctx.fill(heads[i]);
        }
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const elapsed = now - lastFrame;
      if (elapsed < MIN_FRAME_GAP_MS) return;
      lastFrame = now;

      const t0 = performance.now();
      step(Math.min(elapsed / 16.667, 3));
      draw();
      const cost = performance.now() - t0;

      // Adaptive quality: if this device can't afford the effect, quietly thin it out.
      avgCost = avgCost * 0.9 + cost * 0.1;
      if (++sampled >= 90) {
        sampled = 0;
        if (avgCost > WORK_BUDGET_MS && particles.length > MIN_PARTICLES) {
          particleCap = Math.max(MIN_PARTICLES, Math.floor(particles.length * 0.75));
          particles = particles.slice(0, particleCap);
        }
      }
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      lastFrame = performance.now() - 16.667;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const renderStill = () => {
      for (let i = 0; i < 40; i++) step(1);
      draw();
    };

    // ── Pointer interaction ──
    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      return { x, y, inside: x >= 0 && y >= 0 && x <= r.width && y <= r.height };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!running) return;
      const { x, y, inside } = toLocal(e);
      mouse.x = x;
      mouse.y = y;
      mouse.active = inside;
    };

    const onPointerEnd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") mouse.active = false;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!running) return;
      const { x, y, inside } = toLocal(e);
      if (!inside) return;
      for (const p of particles) {
        const dx = p.x - x;
        const dy = p.y - y;
        const d = Math.hypot(dx, dy);
        if (d < BURST_RADIUS && d > 0.01) {
          const f = (1 - d / BURST_RADIUS) * 9;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) renderStill();
    });
    resizeObserver.observe(canvas);

    if (reduceMotion) {
      renderStill();
      return () => resizeObserver.disconnect();
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && !document.hidden) start();
      else stop();
    });
    visibilityObserver.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
