"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { FiArrowRight, FiCornerDownLeft, FiSearch } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import { useInView, useReducedMotion } from "../Landing/useInView";
import { SERVICES, openService, rankServices } from "./services";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Requests the palette "types" on its own until the visitor takes over. */
const DEMO_QUERIES = [
  "Build an online store for my brand",
  "Add an AI chatbot to our website",
  "Move our servers to the cloud",
  "Automate our invoices & reports",
  "Set up CI/CD with Docker",
  "Plan our digital transformation",
];

const HEADLINE: { words: string[]; accent?: boolean }[] = [
  { words: ["Tell", "us", "what", "you", "need."] },
  { words: ["We'll", "build", "it."], accent: true },
];

/** Row height (56px) + gap (4px) — the highlight slides by this much per row. */
const ROW = 60;

type DemoPhase = "type" | "hold" | "erase";

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/70">
      {children}
    </kbd>
  );
}

/** "What do you need?" command palette with an auto-typing demo. */
function CommandPalette() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [paletteRef, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.2, rootMargin: "0px" });
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"demo" | "user">("demo");
  const [userQuery, setUserQuery] = useState("");
  const [manual, setManual] = useState<number | null>(null);
  const [demo, setDemo] = useState<{ q: number; chars: number; phase: DemoPhase }>({ q: 0, chars: 0, phase: "type" });

  // Auto-typing demo (only while visible, until the visitor focuses the input).
  useEffect(() => {
    if (mode !== "demo" || !inView || reduced) return;
    const text = DEMO_QUERIES[demo.q];
    let wait: number;
    let next: () => void;
    if (demo.phase === "type") {
      if (demo.chars < text.length) {
        wait = demo.chars === 0 ? 600 : 40 + Math.random() * 45;
        next = () => setDemo((d) => ({ ...d, chars: d.chars + 1 }));
      } else {
        wait = 150;
        next = () => setDemo((d) => ({ ...d, phase: "hold" }));
      }
    } else if (demo.phase === "hold") {
      wait = 2200;
      next = () => setDemo((d) => ({ ...d, phase: "erase" }));
    } else if (demo.chars > 0) {
      wait = 14;
      next = () => setDemo((d) => ({ ...d, chars: Math.max(0, d.chars - 2) }));
    } else {
      wait = 200;
      next = () => setDemo((d) => ({ q: (d.q + 1) % DEMO_QUERIES.length, chars: 0, phase: "type" }));
    }
    const id = setTimeout(next, wait);
    return () => clearTimeout(id);
  }, [demo, mode, inView, reduced]);

  // ⌘K / Ctrl+K focuses the palette from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus({ preventScroll: true });
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const demoText = reduced ? DEMO_QUERIES[0] : DEMO_QUERIES[demo.q].slice(0, demo.chars);
  const query = mode === "user" ? userQuery : demoText;
  const { scores, best } = useMemo(() => rankServices(query), [query]);
  const hasQuery = query.trim() !== "";
  const selected = mode === "user" && manual !== null ? manual : best;
  const matches = hasQuery ? scores.filter((s) => s > 0).length : SERVICES.length;

  const move = (dir: 1 | -1) => {
    const candidates = SERVICES.map((_, i) => i).filter((i) => !hasQuery || scores[i] > 0);
    if (!candidates.length) return;
    const pos = candidates.indexOf(selected);
    const next = pos === -1 ? (dir === 1 ? 0 : candidates.length - 1) : (pos + dir + candidates.length) % candidates.length;
    setManual(candidates[next]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      move(e.key === "ArrowDown" ? 1 : -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selected >= 0) openService(SERVICES[selected].slug);
      else if (hasQuery) router.push("/contact");
    } else if (e.key === "Escape") {
      if (userQuery) {
        setUserQuery("");
        setManual(null);
      } else {
        inputRef.current?.blur();
      }
    }
  };

  return (
    <div ref={paletteRef} className="relative mx-auto w-full max-w-[680px]">
      {/* Glow behind the palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-24 -inset-y-16 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.22),transparent)]"
      />

      <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0b1724]/95 text-left shadow-[0_50px_100px_-40px_rgba(0,0,0,0.95),0_0_0_1px_rgba(45,212,191,0.07)]">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
          <FiSearch className="shrink-0 text-[#5eead4]" size={20} />
          <div className="relative min-w-0 flex-1">
            <input
              ref={inputRef}
              type="text"
              value={mode === "user" ? userQuery : ""}
              onFocus={() => {
                if (mode === "demo") {
                  setMode("user");
                  setUserQuery("");
                  setManual(null);
                }
              }}
              onBlur={() => {
                if (!userQuery.trim()) setMode("demo");
              }}
              onChange={(e) => {
                setUserQuery(e.target.value);
                setManual(null);
              }}
              onKeyDown={onKeyDown}
              placeholder={mode === "user" ? "Describe what you need…" : ""}
              aria-label="Describe what you need"
              autoComplete="off"
              spellCheck={false}
              className="fx-body w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/35 md:text-lg"
            />
            {mode === "demo" && (
              <span
                aria-hidden="true"
                className="fx-body pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-nowrap text-[15px] text-white/90 md:text-lg"
              >
                {demoText}
                <span className="fx-caret ml-0.5 inline-block h-5 w-[2px] shrink-0 bg-[#2dd4bf]" />
              </span>
            )}
          </div>
          <kbd className="hidden shrink-0 rounded-md border border-white/15 bg-white/[0.06] px-2 py-1 font-mono text-[11px] text-white/60 sm:block">
            ⌘K
          </kbd>
        </div>

        {/* Results */}
        <div className="relative p-2" role="listbox" aria-label="Services">
          <span
            aria-hidden="true"
            className="sv-hl pointer-events-none absolute left-2 right-2 top-2 h-14 rounded-xl bg-white/[0.07] ring-1 ring-[#2dd4bf]/30"
            style={{ transform: `translateY(${Math.max(selected, 0) * ROW}px)`, opacity: selected >= 0 ? 1 : 0 }}
          >
            <span className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-[#2dd4bf]" />
          </span>

          <div className="flex flex-col gap-1">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const isSel = i === selected;
              const dim = hasQuery && scores[i] === 0;
              return (
                <button
                  key={s.slug}
                  type="button"
                  role="option"
                  aria-selected={isSel}
                  onMouseEnter={() => mode === "user" && setManual(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => openService(s.slug)}
                  className={`relative flex h-14 w-full items-center gap-3.5 rounded-xl px-3 text-left transition-opacity duration-300 ${
                    dim ? "opacity-35" : "opacity-100"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-300 ${
                      isSel ? "bg-gradient-to-br from-[#1a9e83] to-[#2563eb] text-white" : "bg-white/[0.06] text-[#5eead4]"
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="fx-display block truncate text-[15px] font-bold text-white">{s.title}</span>
                    <span className="fx-body block truncate text-xs text-white/45">{s.short}</span>
                  </span>
                  {isSel ? (
                    <span className="flex shrink-0 items-center gap-1 rounded-md border border-white/15 bg-white/[0.06] px-2 py-1 font-mono text-[10px] text-white/75">
                      <FiCornerDownLeft size={11} /> open
                    </span>
                  ) : hasQuery && !dim ? (
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[#5eead4]/80">match</span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {hasQuery && best === -1 && (
            <Link
              href="/contact"
              className="fx-body mt-1 flex h-14 items-center gap-3.5 rounded-xl border border-dashed border-white/15 px-3 text-sm text-white/80 transition-colors hover:border-[#2dd4bf]/50 hover:text-white"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-[#5eead4]">
                <FiArrowRight size={16} />
              </span>
              No exact match — tell us about it and we&apos;ll figure it out together
            </Link>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] px-5 py-3 font-mono text-[11px] text-white/40">
          <span className="hidden items-center gap-2 sm:flex">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navigate <Kbd>↵</Kbd> open <Kbd>esc</Kbd> clear
          </span>
          <span className="sm:hidden">Tap a service to see details</span>
          <span>
            {matches} of {SERVICES.length} services
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ServicesHero() {
  return (
    <section className="relative -mt-[90px] overflow-hidden bg-[#050d16] pt-[90px] text-white">
      {/* ── Background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="fx-blob left-[-12%] top-[-8%] h-[560px] w-[560px]"
          style={{ "--blob": "rgba(26,158,131,0.26)", "--dur": "17s", "--tx": "90px", "--ty": "60px" } as CSSProperties}
        />
        <div
          className="fx-blob right-[-12%] top-[6%] h-[600px] w-[600px]"
          style={{ "--blob": "rgba(37,99,235,0.22)", "--dur": "21s", "--tx": "-80px", "--ty": "50px" } as CSSProperties}
        />
        <div className="fx-grid-bg absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 bottom-[44%] h-px bg-gradient-to-r from-transparent via-[#2dd4bf]/60 to-transparent" />
        <div className="absolute bottom-[34%] left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.18),transparent)]" />
        <div className="sv-floor">
          <div className="sv-floor-grid" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050d16] to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-28 pt-14 text-center md:px-10 md:pb-36 md:pt-20">
        <div className="fx-enter flex justify-center" style={delay(100)}>
          <Eyebrow dark>Our services</Eyebrow>
        </div>

        <h1 className="fx-display mx-auto mt-7 max-w-5xl text-balance text-[clamp(2.4rem,6.4vw,5.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
          <span className="sr-only">Tell us what you need. We&apos;ll build it.</span>
          <span aria-hidden="true">
            {HEADLINE.map((line, l) => (
              <Fragment key={l}>
                <span className="block">
                  {line.words.map((word, i) => (
                    <span key={word} className="fx-word mr-[0.22em]">
                      <span style={delay(220 + (l * 5 + i) * 80)}>
                        {line.accent ? <span className="fx-gradient-text">{word}</span> : word}
                      </span>
                    </span>
                  ))}
                </span>
              </Fragment>
            ))}
          </span>
        </h1>

        <p
          className="fx-enter fx-body mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg"
          style={delay(800)}
        >
          Web, AI, cloud, automation, DevOps and consulting — end-to-end IT services from our team in Morbi, Gujarat,
          tailored to your business from the first idea to launch and beyond.
        </p>

        <div className="fx-enter mt-12" style={delay(950)}>
          <CommandPalette />
        </div>

        <p className="fx-enter fx-body mt-6 hidden text-sm text-white/40 sm:block" style={delay(1200)}>
          Try typing “online store”, “chatbot” or “cloud” — or press <span className="font-mono text-white/60">⌘K</span>{" "}
          anywhere on this page.
        </p>
      </div>
    </section>
  );
}
