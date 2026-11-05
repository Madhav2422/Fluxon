"use client";

import { useId, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiArrowUp,
  FiCheck,
  FiCheckCircle,
  FiCloud,
  FiCode,
  FiSettings,
  FiUploadCloud,
} from "react-icons/fi";

/**
 * Small animated scenes, one per service. Shared by the home-page services grid
 * and the Services page. Animations are pure CSS (see landing.css).
 */

/** Unique, CSS-safe id for SVG gradients, so a visual can appear twice on one page. */
function useSvgId() {
  return `fx${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function WebVisual() {
  return (
    <div className="relative w-full pb-12 pr-4 sm:pr-8">
      {/* Browser being assembled */}
      <div className="overflow-hidden rounded-2xl border border-[#0d2340]/10 bg-[#f7fbfa] shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-[#0d2340]/[0.08] px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 truncate rounded-md border border-[#0d2340]/[0.08] bg-white px-2 py-1 font-mono text-[10px] text-gray-400">
            https://your-next-big-idea.com
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          <div className="fx-block col-span-3 h-9 rounded-lg bg-gradient-to-r from-[#1a9e83] to-[#2563eb]" style={d(0)} />
          <div className="fx-block col-span-2 h-16 rounded-lg bg-[#0d2340]/[0.06]" style={d(0.3)} />
          <div className="fx-block h-16 rounded-lg bg-[#1a9e83]/15" style={d(0.6)} />
          <div className="fx-block h-7 rounded-lg bg-[#0d2340]/[0.06]" style={d(0.9)} />
          <div className="fx-block h-7 rounded-lg bg-[#0d2340]/[0.06]" style={d(1.1)} />
          <div className="fx-block h-7 rounded-lg bg-[#2563eb]/15" style={d(1.3)} />
        </div>
      </div>

      {/* Code editor overlapping the browser */}
      <div className="absolute bottom-0 right-0 w-[78%] max-w-[300px] overflow-hidden rounded-xl border border-white/10 bg-[#0b1724] p-3.5 font-mono text-[10.5px] leading-[1.75] text-[#cbd5e1] shadow-[0_25px_50px_-15px_rgba(5,13,22,0.6)]">
        <div className="fx-code-line whitespace-pre" style={d(0.6)}>
          <span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">app</span> ={" "}
          <span className="text-[#c792ea]">await</span> <span className="text-[#ffcb6b]">fluxon</span>.build({"{"}
        </div>
        <div className="fx-code-line whitespace-pre" style={d(1.2)}>
          {"  "}design: <span className="text-[#c3e88d]">&apos;pixel-perfect&apos;</span>,
        </div>
        <div className="fx-code-line whitespace-pre" style={d(1.8)}>
          {"  "}speed: <span className="text-[#c3e88d]">&apos;blazing-fast&apos;</span>,
        </div>
        <div className="fx-code-line whitespace-pre" style={d(2.4)}>
          {"  "}scale: <span className="text-[#f78c6c]">Infinity</span>,
        </div>
        <div className="fx-code-line whitespace-pre" style={d(3)}>
          {"});"}
        </div>
        <div className="fx-code-line whitespace-pre" style={d(3.6)}>
          app.<span className="text-[#82aaff]">launch</span>();{" "}
          <span className="fx-caret inline-block h-3 w-1.5 translate-y-0.5 bg-[#2dd4bf]" />
        </div>
      </div>
    </div>
  );
}

const NN_LAYERS = [
  [30, 70, 110],
  [20, 53, 87, 120],
  [45, 95],
];
const NN_X = [36, 110, 184];

export function AIVisual() {
  const uid = useSvgId();
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 0; l < NN_LAYERS.length - 1; l++) {
    for (const y1 of NN_LAYERS[l]) {
      for (const y2 of NN_LAYERS[l + 1]) {
        edges.push({ x1: NN_X[l], y1, x2: NN_X[l + 1], y2 });
      }
    }
  }

  return (
    <svg viewBox="0 0 220 140" className="h-full w-full max-w-[260px]" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-nn`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a9e83" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {edges.map((e, i) => (
        <line key={`b${i}`} {...e} stroke="#0d2340" strokeOpacity="0.1" strokeWidth="1" />
      ))}
      {edges.map((e, i) => (
        <line
          key={`s${i}`}
          {...e}
          pathLength={100}
          className="fx-signal"
          style={d(((i * 37) % 22) / 10)}
          stroke="#1a9e83"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      {NN_LAYERS.map((layer, l) =>
        layer.map((y, n) => (
          <circle
            key={`${l}-${n}`}
            cx={NN_X[l]}
            cy={y}
            r={l === 2 ? 8 : 6}
            className="fx-node"
            style={d((l * 0.5 + n * 0.3) % 2.6)}
            fill={l === 2 ? `url(#${uid}-nn)` : "#fff"}
            stroke="#1a9e83"
            strokeWidth="2"
          />
        ))
      )}
    </svg>
  );
}

export function CloudVisual() {
  return (
    <div className="relative flex h-full w-full max-w-[220px] flex-col items-center justify-between py-1">
      <FiCloud className="h-14 w-14 text-[#1a9e83] drop-shadow-[0_8px_16px_rgba(26,158,131,0.35)]" />
      <div className="pointer-events-none absolute inset-x-0 top-14 flex h-10 justify-center gap-8">
        {[0, 0.8, 1.6].map((delay) => (
          <FiArrowUp key={delay} className="fx-rise-arrow h-4 w-4 text-[#2563eb]" style={d(delay)} />
        ))}
      </div>
      <div className="flex w-full flex-col gap-1.5">
        {[0, 0.45, 0.9].map((delay) => (
          <div
            key={delay}
            className="flex items-center gap-2 rounded-lg border border-[#0d2340]/10 bg-white px-3 py-1.5 shadow-sm"
          >
            <span className="fx-led h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={d(delay)} />
            <span className="h-1.5 flex-1 rounded-full bg-[#0d2340]/[0.07]" />
            <span className="h-1.5 w-6 rounded-full bg-[#1a9e83]/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AutomationVisual() {
  return (
    <div className="flex h-full w-full max-w-[260px] items-center justify-between gap-4">
      <div className="relative h-28 w-28 shrink-0">
        <FiSettings className="fx-gear absolute left-0 top-0 h-20 w-20 text-[#1a9e83]" />
        <FiSettings className="fx-gear--rev absolute bottom-0 right-0 h-12 w-12 text-[#2563eb]/70" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {["Invoices", "Reports", "Emails"].map((task, i) => (
          <div
            key={task}
            className="flex items-center gap-2 rounded-lg border border-[#0d2340]/10 bg-white px-2.5 py-1.5 shadow-sm"
          >
            <span
              className="fx-pipe-node grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#0d2340]/10"
              style={d(i * 1.33)}
            >
              <FiCheck className="h-2.5 w-2.5" />
            </span>
            <span className="fx-body text-[11px] font-medium text-[#0d2340]/70">{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PIPELINE: { label: string; icon: IconType }[] = [
  { label: "Build", icon: FiCode },
  { label: "Test", icon: FiCheckCircle },
  { label: "Deploy", icon: FiUploadCloud },
  { label: "Monitor", icon: FiActivity },
];

export function DevOpsVisual() {
  return (
    <div className="relative w-full max-w-[300px]">
      <div className="relative mx-[18px] h-[3px] rounded-full bg-[#0d2340]/10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a9e83] to-[#2563eb] opacity-40" />
        <span className="fx-pipe-dot absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2dd4bf] shadow-[0_0_14px_4px_rgba(45,212,191,0.6)]" />
      </div>
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-[18px] justify-between">
        {PIPELINE.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <div key={stage.label} className="flex w-9 flex-col items-center">
              <span
                className="fx-pipe-node grid h-9 w-9 place-items-center rounded-full border border-[#0d2340]/10 bg-white text-[#0d2340] shadow-sm"
                style={d((i * 4) / 3)}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="fx-body mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#0d2340]/50">
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ConsultingVisual() {
  const uid = useSvgId();
  const bars = [34, 48, 44, 66, 80, 104];
  return (
    <svg viewBox="0 0 320 150" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-stroke`} x1="0" x2="1">
          <stop offset="0" stopColor="#1a9e83" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id={`${uid}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a9e83" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1a9e83" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {[30, 70, 110].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#0d2340" strokeOpacity="0.06" strokeDasharray="4 6" />
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={22 + i * 50}
          y={140 - h}
          width="26"
          height={h}
          rx="6"
          fill={`url(#${uid}-bar)`}
          className="fx-bar"
          style={d(i * 0.12)}
        />
      ))}
      <path
        d="M12 122 C 60 112, 80 98, 122 92 S 196 66, 236 46 S 288 22, 308 14"
        pathLength={1}
        className="fx-chart-line"
        fill="none"
        stroke={`url(#${uid}-stroke)`}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="308" cy="14" r="5" fill="#2563eb" className="fx-node" />
    </svg>
  );
}
