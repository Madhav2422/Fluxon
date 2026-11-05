"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FiActivity, FiCheck, FiUploadCloud } from "react-icons/fi";
import { prefersReducedMotion, useInView } from "./useInView";

/**
 * Hero visual — a 3D glass "command center":
 * a code editor that types out real code, a deployment card that follows the
 * build → test → deploy pipeline, a live traffic card and an AI assistant.
 * Layers sit at different depths and the whole scene tilts towards the cursor.
 * It only animates while on screen, uses no backdrop blur, and moves layers with
 * transforms only, so it stays cheap for the GPU.
 *
 * The composition is designed on a fixed 560×500 canvas and scaled to fit.
 */
const BASE_W = 560;
const BASE_H = 520;

/* ───────────────────────── Code being typed ───────────────────────── */

type Tone = "kw" | "fn" | "str" | "prop" | "var" | "pun" | "com";
type Token = [text: string, tone: Tone];

const TONES: Record<Tone, string> = {
  kw: "text-[#c792ea]",
  fn: "text-[#82aaff]",
  str: "text-[#5eead4]",
  prop: "text-[#f78c6c]",
  var: "text-[#e2e8f0]",
  pun: "text-white/55",
  com: "text-white/30 italic",
};

const CODE: Token[][] = [
  [["import", "kw"], [" { ", "pun"], ["build", "fn"], [", ", "pun"], ["deploy", "fn"], [" } ", "pun"], ["from", "kw"], [" ", "pun"], ['"@fluxon/core"', "str"], [";", "pun"]],
  [],
  [["const", "kw"], [" ", "pun"], ["app", "var"], [" = ", "pun"], ["await", "kw"], [" ", "pun"], ["build", "fn"], ["({", "pun"]],
  [["  stack", "prop"], [": [", "pun"], ['"next"', "str"], [", ", "pun"], ['"node"', "str"], [", ", "pun"], ['"ai"', "str"], ["],", "pun"]],
  [["  cloud", "prop"], [": ", "pun"], ['"aws"', "str"], [",", "pun"]],
  [["  scale", "prop"], [": ", "pun"], ['"auto"', "str"], [",", "pun"]],
  [["});", "pun"]],
  [],
  [["await", "kw"], [" ", "pun"], ["deploy", "fn"], ["(", "pun"], ["app", "var"], [");", "pun"], [" // live", "com"]],
];

const LINES = CODE.map((tokens) => tokens.map(([text]) => text).join(""));
const SOURCE = LINES.join("\n");
const TOTAL = SOURCE.length;
const LINE_STARTS = LINES.reduce<number[]>((starts, _line, i) => {
  starts.push(i === 0 ? 0 : starts[i - 1] + LINES[i - 1].length + 1);
  return starts;
}, []);

/* ───────────────────────── Pipeline state ───────────────────────── */

type Phase = "typing" | "build" | "test" | "deploy" | "live" | "reset";
type StatusTone = "amber" | "cyan" | "green";

const STAGES: Record<Phase, { step: number; note: string; status: string; tone: StatusTone }> = {
  typing: { step: 0, note: "Writing code…", status: "Queued", tone: "amber" },
  build: { step: 1, note: "Building app…", status: "Running", tone: "cyan" },
  test: { step: 2, note: "Running tests…", status: "Running", tone: "cyan" },
  deploy: { step: 3, note: "Shipping to cloud…", status: "Running", tone: "cyan" },
  live: { step: 4, note: "Live in production", status: "Live", tone: "green" },
  reset: { step: 4, note: "Live in production", status: "Live", tone: "green" },
};

const PROGRESS: Record<Exclude<Phase, "typing">, number> = {
  build: 52,
  test: 76,
  deploy: 92,
  live: 100,
  reset: 100,
};

const STATUS_STYLES: Record<StatusTone, { dot: string; pill: string }> = {
  amber: { dot: "bg-[#fbbf24]", pill: "border-[#fbbf24]/30 bg-[#fbbf24]/10 text-[#fcd34d]" },
  cyan: { dot: "bg-[#2dd4bf]", pill: "border-[#2dd4bf]/30 bg-[#2dd4bf]/10 text-[#5eead4]" },
  green: { dot: "bg-[#4ade80]", pill: "border-[#4ade80]/30 bg-[#4ade80]/10 text-[#86efac]" },
};

/* ───────────────────────── Building blocks ───────────────────────── */

/** Positions a layer on the canvas at a given depth, and flies it in on mount. */
function Slot({ x, y, z, delay, children }: { x: number; y: number; z: number; delay: number; children: ReactNode }) {
  return (
    <div className="fx-slot" style={{ left: x, top: y, "--z": `${z}px`, "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

/** Gentle independent float so layers drift against each other. */
function Bob({ duration, offset, children }: { duration: string; offset: string; children: ReactNode }) {
  return (
    <div className="fx-float" style={{ "--dur": duration, "--d": offset, "--amp": "-8px" } as CSSProperties}>
      {children}
    </div>
  );
}

function TokenRun({ tokens, visible }: { tokens: Token[]; visible: number }) {
  const parts: ReactNode[] = [];
  let remaining = visible;
  for (let j = 0; j < tokens.length && remaining > 0; j++) {
    const [text, tone] = tokens[j];
    parts.push(
      <span key={j} className={TONES[tone]}>
        {text.slice(0, remaining)}
      </span>
    );
    remaining -= text.length;
  }
  return <>{parts}</>;
}

function EditorWindow({ typed, phase }: { typed: number; phase: Phase }) {
  const status = STATUS_STYLES[STAGES[phase].tone];

  return (
    <div className="fx-glass-window relative h-[290px] w-[440px] rounded-[18px]">
      <span aria-hidden="true" className="fx-beam" />
      <div className="relative h-full overflow-hidden rounded-[17px]">
        {/* Title bar */}
        <div className="flex h-10 items-center gap-2 border-b border-white/[0.06] bg-white/[0.025] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="fx-body ml-4 flex items-center gap-1 text-[11px]">
            <span className="flex items-center gap-1.5 rounded-md bg-white/[0.07] px-2.5 py-1 text-white/85">
              <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${status.dot}`} />
              app.ts
            </span>
            <span className="px-2.5 py-1 text-white/35">deploy.yml</span>
          </div>
        </div>

        {/* Code */}
        <div
          className={`px-4 pt-3.5 font-mono text-[12.5px] transition-opacity duration-500 ${
            phase === "reset" ? "opacity-0" : "opacity-100"
          }`}
        >
          {CODE.map((tokens, i) => {
            const start = LINE_STARTS[i];
            const length = LINES[i].length;
            const visible = Math.max(0, Math.min(length, typed - start));
            const hasCaret = typed >= start && typed <= start + length;
            return (
              <div key={i} className="flex h-6 items-center">
                <span className="w-7 shrink-0 select-none pr-2.5 text-right text-white/20">
                  {typed >= start ? i + 1 : ""}
                </span>
                <span className="whitespace-pre">
                  <TokenRun tokens={tokens} visible={visible} />
                  {hasCaret && (
                    <span className="fx-caret ml-px inline-block h-[15px] w-[7px] translate-y-[3px] bg-[#2dd4bf]" />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Light sweeping across the glass */}
        <span aria-hidden="true" className="fx-glass-sweep" />
      </div>
    </div>
  );
}

function StepIcon({ state }: { state: "done" | "running" | "pending" }) {
  return (
    <span className="grid h-4 w-4 place-items-center">
      {state === "done" && (
        <span className="grid h-4 w-4 place-items-center rounded-full bg-[#22c55e]/20 text-[#4ade80]">
          <FiCheck size={10} />
        </span>
      )}
      {state === "running" && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#2dd4bf] border-t-transparent" />
      )}
      {state === "pending" && <span className="h-3.5 w-3.5 rounded-full border border-white/20" />}
    </span>
  );
}

function DeployCard({ typed, phase }: { typed: number; phase: Phase }) {
  const stage = STAGES[phase];
  const status = STATUS_STYLES[stage.tone];
  const progress = phase === "typing" ? Math.round((typed / TOTAL) * 30) : PROGRESS[phase];

  return (
    <div className="fx-glass-card w-[240px] rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#1a9e83] to-[#2563eb] text-white shadow-[0_8px_20px_-6px_rgba(45,212,191,0.6)]">
          <FiUploadCloud size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="fx-display text-[13px] font-bold text-white">Deployment</div>
          <div className="fx-body truncate text-[11px] text-white/50">{stage.note}</div>
        </div>
        <span
          className={`fx-body inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors duration-500 ${status.pill}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {stage.status}
        </span>
      </div>

      <div className="mt-3.5 flex items-center gap-2.5">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#3b82f6] shadow-[0_0_10px_rgba(45,212,191,0.6)] transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="w-9 text-right font-mono text-[11px] text-white/70">{progress}%</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {["Build", "Test", "Deploy"].map((label, i) => {
          const state = stage.step > i + 1 ? "done" : stage.step === i + 1 ? "running" : "pending";
          return (
            <span key={label} className="fx-body flex items-center gap-1.5 text-[11px] text-white/70">
              <StepIcon state={state} />
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Editor + deployment card share one timeline: type the code, then ship it.
 * Starts on the finished "live" scene so the first impression is complete.
 */
function Pipeline({ animate }: { animate: boolean }) {
  const [typed, setTyped] = useState(TOTAL);
  const [phase, setPhase] = useState<Phase>("live");

  useEffect(() => {
    if (!animate) return;

    let delay: number;
    let next: () => void;
    if (phase === "typing" && typed < TOTAL) {
      const char = SOURCE[typed];
      delay = typed === 0 ? 900 : char === "\n" ? 170 : 26 + Math.random() * 34;
      next = () => setTyped((t) => t + 1);
    } else if (phase === "typing") {
      delay = 450;
      next = () => setPhase("build");
    } else if (phase === "build") {
      delay = 1000;
      next = () => setPhase("test");
    } else if (phase === "test") {
      delay = 1000;
      next = () => setPhase("deploy");
    } else if (phase === "deploy") {
      delay = 1200;
      next = () => setPhase("live");
    } else if (phase === "live") {
      delay = 3800;
      next = () => setPhase("reset");
    } else {
      delay = 650;
      next = () => {
        setTyped(0);
        setPhase("typing");
      };
    }

    const id = setTimeout(next, delay);
    return () => clearTimeout(id);
  }, [animate, phase, typed]);

  return (
    <>
      <Slot x={30} y={80} z={0} delay={250}>
        <EditorWindow typed={typed} phase={phase} />
      </Slot>
      <Slot x={320} y={0} z={90} delay={800}>
        <Bob duration="6s" offset="-2s">
          <DeployCard typed={typed} phase={phase} />
        </Bob>
      </Slot>
    </>
  );
}

const AI_MESSAGES = [
  "Wrote tests for /checkout",
  "Optimized image pipeline",
  "Auto-scaled the servers",
  "Automated weekly reports",
];

function AICard({ animate }: { animate: boolean }) {
  const [index, setIndex] = useState(0);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const id = setTimeout(
      () => {
        if (thinking) {
          setIndex((i) => (i + 1) % AI_MESSAGES.length);
          setThinking(false);
        } else {
          setThinking(true);
        }
      },
      thinking ? 1300 : 3000
    );
    return () => clearTimeout(id);
  }, [animate, thinking]);

  return (
    <div className="fx-glass-card w-[240px] rounded-2xl p-3.5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white p-[5px] shadow-[0_6px_16px_-6px_rgba(45,212,191,0.7)]">
          <span className="fx-logo-mark block h-full w-full" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="fx-display text-[12.5px] font-bold text-white">Fluxon AI</div>
          <div className="fx-body text-[10.5px] text-white/45">Assistant</div>
        </div>
        <span className="fx-body text-[10px] text-white/35">now</span>
      </div>
      <div className="fx-body mt-3 flex h-9 items-center rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 text-[12px] text-white/85">
        {thinking ? (
          <span className="flex items-center gap-1">
            {[0, 0.15, 0.3].map((d) => (
              <span key={d} className="fx-dot h-1.5 w-1.5 rounded-full bg-[#5eead4]" style={{ "--d": `${d}s` } as CSSProperties} />
            ))}
            <span className="ml-2 text-white/40">Thinking…</span>
          </span>
        ) : (
          <span key={index} className="fx-term-line flex min-w-0 items-center gap-2">
            <FiCheck className="shrink-0 text-[#4ade80]" />
            <span className="truncate">{AI_MESSAGES[index]}</span>
          </span>
        )}
      </div>
    </div>
  );
}

const INITIAL_BARS = [38, 52, 44, 61, 48, 66, 58, 72, 55, 69, 63, 78, 70, 84, 76, 90];

function TrafficCard({ animate }: { animate: boolean }) {
  const [bars, setBars] = useState(INITIAL_BARS);
  const [visitors, setVisitors] = useState(2481);

  useEffect(() => {
    if (!animate) return;
    const id = setInterval(() => {
      setBars((prev) => [...prev.slice(1), 35 + Math.round(Math.random() * 65)]);
      setVisitors((v) => v + 2 + Math.round(Math.random() * 12));
    }, 1100);
    return () => clearInterval(id);
  }, [animate]);

  return (
    <div className="fx-glass-card w-[220px] rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="fx-body flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
          <FiActivity size={12} className="text-[#5eead4]" />
          Live traffic
        </span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="fx-display text-[22px] font-extrabold tabular-nums text-white">
          {visitors.toLocaleString("en-US")}
        </span>
        <span className="fx-body text-[11px] text-white/45">visitors now</span>
      </div>
      <div className="mt-3 flex h-12 items-end gap-[5px]">
        {bars.map((h, i) => {
          const last = i === bars.length - 1;
          return (
            <span
              key={i}
              className={`w-[7px] rounded-t-[3px] bg-gradient-to-t transition-[height] duration-700 ease-out ${
                last
                  ? "from-[#2dd4bf] to-[#a5f3fc] shadow-[0_0_10px_rgba(45,212,191,0.8)]"
                  : "from-[#1a9e83]/40 to-[#2dd4bf]/90"
              }`}
              style={{ height: `${h}%`, opacity: 0.3 + (i / (bars.length - 1)) * 0.7 }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── Composition ───────────────────────── */

export default function HeroVisual() {
  const [viewRef, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0, rootMargin: "0px" });
  const fitRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [reduced] = useState(prefersReducedMotion);
  const animate = inView && !reduced;

  // Tilt the scene towards the mouse. Writes the transform directly (once per frame,
  // only while the hero is on screen) so it never triggers React re-renders.
  useEffect(() => {
    const stage = stageRef.current;
    const host = viewRef.current?.closest("section");
    if (!animate || !stage || !host) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      const px = Math.max(-1, Math.min(1, ((x - r.left) / r.width) * 2 - 1));
      const py = Math.max(-1, Math.min(1, ((y - r.top) / r.height) * 2 - 1));
      stage.style.transform = `rotateY(${(-16 + px * 9).toFixed(2)}deg) rotateX(${(9 - py * 7).toFixed(2)}deg)`;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [animate, viewRef]);

  // Scale the fixed-size canvas down to whatever width the column gives us.
  useEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / BASE_W));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={viewRef}
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[560px] lg:mx-0 min-[1380px]:w-[112%] min-[1380px]:max-w-[600px]"
    >
      <div ref={fitRef} className="relative w-full" style={{ height: BASE_H * scale }}>
        {/* Ambient light behind the glass + a soft "floor" glow */}
        <div className="pointer-events-none absolute -inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.22),rgba(37,99,235,0.1)_55%,transparent)]" />
        <div className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-[75%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(45,212,191,0.35),transparent)] blur-xl" />

        <div
          className="absolute left-1/2 top-0 origin-top"
          style={{ width: BASE_W, height: BASE_H, transform: `translateX(-50%) scale(${scale})` }}
        >
          <div className="fx-scene absolute inset-0">
            <div ref={stageRef} className="fx-stage">
              <div className="fx-stage-float">
                <Pipeline animate={animate} />
                {/* Positions are nudged right/down to offset the shift their depth (z)
                    causes under the scene's base rotation, so no code is covered. */}
                <Slot x={330} y={262} z={120} delay={1050}>
                  <Bob duration="7s" offset="-3s">
                    <AICard animate={animate} />
                  </Bob>
                </Slot>
                <Slot x={10} y={374} z={70} delay={1300}>
                  <Bob duration="6.5s" offset="-1s">
                    <TrafficCard animate={animate} />
                  </Bob>
                </Slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
