"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FiCheck, FiDownload, FiGlobe, FiGrid, FiLock, FiSearch } from "react-icons/fi";
import { useInView, useReducedMotion } from "../Landing/useInView";

/**
 * An animated replica of Lead Finder's "Find people" screen, played with SAMPLE DATA.
 * The real app is private to the client, so this walks visitors through the workflow:
 * search → consolidate → label → protect credits → export.
 *
 * Everything on screen is a pure function of the time into the loop, which keeps the
 * step buttons trivial (they just jump to a time). It only plays while visible.
 */

const BASE_W = 760;
const BASE_H = 500;
const LOOP_MS = 17000;
const TICK_MS = 80;
const DOMAIN = "northwindtiles.example"; // fictional (.example is a reserved, non-real domain)
const STATIC_FRAME = 13600; // shown when the visitor prefers reduced motion

const STEPS = [
  { label: "Search", at: 0 },
  { label: "Consolidate", at: 4300 },
  { label: "Label", at: 6300 },
  { label: "Protect credits", at: 7700 },
  { label: "Export", at: 12900 },
];

type Fit = "Buyer" | "Decision maker" | "Maybe";
type Tone = "good" | "warn" | "off" | "glaze";

interface Person {
  name: string;
  title: string;
  fit: Fit;
  email: string;
  check: string;
  checkTone: Tone;
  found: "Hunter + Snov" | "Snov" | "Hunter";
  /** Snov-only: the email costs a credit, fetched in the demo's credit step. */
  paid?: boolean;
}

// Sample data only — fictional people at a fictional company.
const HUNTER_ROWS = [
  { name: "Elena Marsh", title: "Head of Purchasing" },
  { name: "Priya Nair", title: "Procurement Manager" },
  { name: "Luca Romano", title: "Showroom Manager" },
];
const SNOV_ROWS = [
  { name: "Elena Marsh", title: "Head of Purchasing" },
  { name: "Priya Nair", title: "Procurement Manager" },
  { name: "Daniel Ortiz", title: "Import Manager" },
  { name: "Tom Becker", title: "Managing Director" },
];
const PEOPLE: Person[] = [
  { name: "Elena Marsh", title: "Head of Purchasing", fit: "Buyer", email: `elena@${DOMAIN}`, check: "Valid · 98%", checkTone: "good", found: "Hunter + Snov" },
  { name: "Priya Nair", title: "Procurement Manager", fit: "Buyer", email: `priya@${DOMAIN}`, check: "Valid · 95%", checkTone: "good", found: "Hunter + Snov" },
  { name: "Daniel Ortiz", title: "Import Manager", fit: "Buyer", email: `daniel@${DOMAIN}`, check: "Valid", checkTone: "good", found: "Snov", paid: true },
  { name: "Tom Becker", title: "Managing Director", fit: "Decision maker", email: `tom@${DOMAIN}`, check: "Valid", checkTone: "good", found: "Snov", paid: true },
  { name: "Anika Larsen", title: "Purchasing Director", fit: "Decision maker", email: `anika@${DOMAIN}`, check: "Valid", checkTone: "good", found: "Snov", paid: true },
  { name: "Luca Romano", title: "Showroom Manager", fit: "Maybe", email: `luca@${DOMAIN}`, check: "Risky · 61%", checkTone: "warn", found: "Hunter" },
];
/** Order in which the paid (Snov-only) rows get ticked: -1 = not a paid row. */
const PAID_ORDER = PEOPLE.map((p, i) => (p.paid ? PEOPLE.slice(0, i).filter((q) => q.paid).length : -1));

const FIT_TONE: Record<Fit, Tone> = { Buyer: "good", "Decision maker": "glaze", Maybe: "warn" };
const TONE_CLASS: Record<Tone, string> = {
  good: "bg-[var(--good-tint)] text-[var(--good)]",
  warn: "bg-[var(--warn-tint)] text-[var(--warn)]",
  off: "bg-[var(--off-tint)] text-[var(--off)]",
  glaze: "bg-[var(--glaze-tint)] text-[var(--glaze)]",
};
const DOT_CLASS: Record<Tone, string> = {
  good: "bg-[var(--good)]",
  warn: "bg-[var(--warn)]",
  off: "bg-[var(--off)]",
  glaze: "bg-[var(--glaze)]",
};

/** When each button is "clicked" (ms into the loop). */
const PRESSES: [string, number][] = [
  ["btn-hunter", 2450],
  ["btn-snov", 3100],
  ["btn-consolidate", 4800],
  ["btn-getemails", 8200],
  ["btn-pick", 9700],
  ["btn-buy", 12100],
  ["btn-sheets", 13400],
];
/** Where the pointer is heading, from each moment on. */
const CURSOR_PATH: [number, string][] = [
  [0, "input"],
  [2000, "btn-hunter"],
  [2700, "btn-snov"],
  [4300, "btn-consolidate"],
  [7700, "btn-getemails"],
  [9300, "btn-pick"],
  [9900, "check-2"],
  [10400, "check-3"],
  [10900, "check-4"],
  [11700, "btn-buy"],
  [12900, "btn-sheets"],
  [14700, "rest"],
];

/** How many items are showing at time t, one every `gap` ms from `start`. */
const reveal = (t: number, start: number, gap: number, max: number) =>
  t < start ? 0 : Math.min(max, Math.floor((t - start) / gap) + 1);

type View = "empty" | "split" | "merged";

function frame(t: number) {
  let cursor = "input";
  for (const [ms, id] of CURSOR_PATH) if (t >= ms) cursor = id;
  const view: View = t >= 5000 ? "merged" : t >= 2450 ? "split" : "empty";
  return {
    step: STEPS.reduce((acc, s, i) => (t >= s.at ? i : acc), 0),
    typed: Math.max(0, Math.min(DOMAIN.length, Math.floor((t - 300) / 68))),
    view,
    hunter: reveal(t, 2600, 150, HUNTER_ROWS.length),
    snov: reveal(t, 3300, 150, SNOV_ROWS.length),
    rows: reveal(t, 5100, 90, PEOPLE.length),
    fits: reveal(t, 6300, 150, PEOPLE.length),
    consolidated: t >= 4900,
    dialog: t >= 8250 && t < 9750,
    picking: t >= 9750 && t < 12150,
    picked: t >= 11200 ? 3 : t >= 10700 ? 2 : t >= 10200 ? 1 : 0,
    bought: t >= 12150,
    toast: t >= 13500,
    fading: t >= LOOP_MS - 650,
    cursor,
    press: PRESSES.find(([, ms]) => t >= ms && t < ms + 260)?.[0] ?? null,
  };
}

/* ───────────────────────── Small pieces ───────────────────────── */

function Btn({
  id,
  press,
  solid,
  muted,
  children,
}: {
  id: string;
  press: string | null;
  solid?: boolean;
  muted?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      data-cursor={id}
      data-pressed={press === id}
      className={`lf-btn inline-flex h-[30px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[8px] px-3 text-[12px] font-semibold ${
        solid ? "bg-[var(--glaze)] text-white" : "border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]"
      } ${muted ? "opacity-[0.45]" : ""}`}
    >
      {children}
    </span>
  );
}

function Pill({ tone, pop, children }: { tone: Tone; pop?: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-[2px] text-[10.5px] font-semibold ${TONE_CLASS[tone]} ${
        pop ? "lf-pop" : ""
      }`}
    >
      {children}
    </span>
  );
}

function SourceCard({
  name,
  total,
  rows,
  shown,
  more,
}: {
  name: string;
  total: string;
  rows: { name: string; title: string }[];
  shown: number;
  more?: number;
}) {
  return (
    <div className="lf-in flex min-h-0 flex-col overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--surface)]">
      <div className="flex h-[34px] shrink-0 items-center justify-between border-b border-[var(--line)] bg-[var(--surface-2)] px-3">
        <span className="text-[12.5px] font-bold">{name}</span>
        <Pill tone="glaze">{total}</Pill>
      </div>
      <div className="px-1">
        {rows.slice(0, shown).map((r) => (
          <div key={r.name} className="lf-in flex h-[38px] items-center justify-between gap-3 border-b border-[var(--line-soft)] px-2">
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-semibold">{r.name}</span>
              <span className="block truncate text-[10.5px] text-[var(--ink-3)]">{r.title}</span>
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--good)]" />
          </div>
        ))}
        {more !== undefined && shown >= rows.length && (
          <p className="lf-in px-2 py-2 text-[11px] text-[var(--ink-3)]">+{more} more people</p>
        )}
      </div>
    </div>
  );
}

const COLS = "grid-cols-[26px_172px_116px_1fr_96px_100px]";

/* ───────────────────────── The demo ───────────────────────── */

export default function LeadFinderDemo({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [rootRef, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.25, rootMargin: "0px" });
  const reduced = useReducedMotion();
  const fitRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const tRef = useRef(0);
  const [t, setT] = useState(0);
  const [jumped, setJumped] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [scale, setScale] = useState(1);
  const active = inView && !reduced;
  const f = frame(reduced && !jumped ? STATIC_FRAME : t);

  // Fit the fixed-size canvas to whatever width it is given.
  useEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / BASE_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Play the loop while the demo is on screen. Most ticks change nothing visible, so it
  // only re-renders when the frame actually changes — cheap even while the page scrolls.
  useEffect(() => {
    if (!active) return;
    const origin = performance.now() - tRef.current;
    let shown = JSON.stringify(frame(tRef.current));
    const id = setInterval(() => {
      const next = (performance.now() - origin) % LOOP_MS;
      tRef.current = next;
      const key = JSON.stringify(frame(next));
      if (key !== shown) {
        shown = key;
        setT(next);
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [active, epoch]);

  // Glide the pointer to whatever the demo is about to "click".
  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;
    const target = canvas.querySelector<HTMLElement>(`[data-cursor="${f.cursor}"]`);
    let x = BASE_W - 70;
    let y = BASE_H - 56;
    if (target) {
      const c = canvas.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      const s = c.width / BASE_W || 1;
      x = (r.left - c.left + Math.min(r.width * 0.6, 42)) / s;
      y = (r.top - c.top + r.height * 0.55) / s;
    }
    cursor.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }, [f.cursor, f.view, f.dialog, f.picking, scale]);

  const jump = (i: number) => {
    tRef.current = STEPS[i].at;
    setT(STEPS[i].at);
    setJumped(true);
    setEpoch((e) => e + 1);
  };

  const dark = theme === "dark";

  return (
    <div ref={rootRef} className="w-full">
      <div
        ref={fitRef}
        role="img"
        aria-label="Animated demo of Lead Finder using sample data: searching a company in Hunter and Snov, combining the results into one list, labelling buyers, approving credits before spending them, and exporting to Google Sheets."
        className="relative w-full"
        style={{ height: BASE_H * scale }}
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0"
          style={{ width: BASE_W, height: BASE_H, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
        >
          <div
            ref={canvasRef}
            className="lf-app relative h-full w-full overflow-hidden rounded-[16px] shadow-[0_40px_90px_-35px_rgba(5,13,22,0.65)] ring-1 ring-black/10"
          >
            {/* Browser bar */}
            <div className="flex h-[34px] items-center gap-2 border-b border-[var(--line-soft)] bg-[#f7f9f8] px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex flex-1 items-center gap-1.5 rounded-md bg-white px-2.5 py-[3px] text-[11px] text-[var(--ink-3)] ring-1 ring-[var(--line-soft)]">
                <FiLock size={10} /> Private client app · sign-in required
              </span>
            </div>

            {/* App header */}
            <div className="flex h-[44px] items-center justify-between border-b border-[var(--line)] bg-[var(--surface)] px-[18px]">
              <span className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--glaze)] text-[10px] font-bold text-white">LF</span>
                <span className="text-[14px] font-bold">Lead Finder</span>
              </span>
              <span className="flex h-full items-center gap-5 text-[12.5px]">
                <span className="text-[var(--ink-3)]">Find companies</span>
                <span className="relative flex h-full items-center font-semibold text-[var(--glaze)]">
                  Find people
                  <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[var(--glaze)]" />
                </span>
              </span>
              <span className="flex items-center gap-3">
                <span className="rounded-full bg-[var(--warn-tint)] px-2 py-0.5 text-[10.5px] font-semibold text-[var(--warn)]">
                  Sample data
                </span>
                <span className="text-[12px] text-[var(--ink-3)]">Sign out</span>
              </span>
            </div>

            {/* Main */}
            <div
              className={`absolute inset-x-0 bottom-0 top-[78px] flex flex-col px-[18px] pb-[14px] pt-[14px] transition-opacity duration-500 ${
                f.fading ? "opacity-0" : "opacity-100"
              }`}
            >
              <div>
                <p className="text-[15px] font-bold">Find people</p>
                <p className="text-[11.5px] text-[var(--ink-3)]">Type a company’s website to see who works there</p>
              </div>

              {/* Search row */}
              <div className="mt-[10px] flex items-center gap-2">
                <span
                  data-cursor="input"
                  className="flex h-[34px] w-[290px] items-center gap-2 rounded-[8px] border border-[var(--line)] bg-[var(--surface)] px-3 text-[12.5px]"
                >
                  <FiGlobe className="shrink-0 text-[var(--ink-3)]" size={13} />
                  {f.typed > 0 ? (
                    <span className="truncate">{DOMAIN.slice(0, f.typed)}</span>
                  ) : (
                    <span className="text-[var(--ink-3)]">Company website</span>
                  )}
                  {f.view === "empty" && <span className="lf-caret -ml-1 h-[14px] w-px shrink-0 bg-[var(--ink)]" />}
                </span>
                <Btn id="btn-hunter" press={f.press}>
                  <FiSearch size={12} /> Search Hunter
                </Btn>
                <Btn id="btn-snov" press={f.press}>
                  <FiSearch size={12} /> Search Snov
                </Btn>
                {f.view === "merged" && (
                  <span className="lf-in ml-auto whitespace-nowrap rounded-full bg-[var(--glaze-tint)] px-2.5 py-1 text-[10.5px] font-semibold text-[var(--glaze)]">
                    Saved · opening again costs 0 credits
                  </span>
                )}
              </div>

              {/* Results */}
              <div className="relative mt-[12px] min-h-0 flex-1">
                {f.view === "empty" && (
                  <div className="lf-in grid h-full place-items-center rounded-[12px] border border-dashed border-[var(--line)] bg-[var(--surface-2)]">
                    <div className="text-center">
                      <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[var(--glaze-tint)] text-[var(--glaze)]">
                        <FiSearch size={18} />
                      </span>
                      <p className="mt-3 text-[13px] font-semibold">Who works at this company?</p>
                      <p className="mt-1 text-[11.5px] text-[var(--ink-3)]">Nothing is searched until you click a Search button.</p>
                    </div>
                  </div>
                )}

                {f.view === "split" && (
                  <div className="grid h-full grid-cols-2 gap-3">
                    <SourceCard name="Hunter" total="3 people" rows={HUNTER_ROWS} shown={f.hunter} />
                    {f.snov > 0 ? (
                      <SourceCard name="Snov" total="20 people" rows={SNOV_ROWS} shown={f.snov} more={16} />
                    ) : (
                      <div className="rounded-[10px] border border-dashed border-[var(--line)]" />
                    )}
                  </div>
                )}

                {f.view === "merged" && (
                  <div className="lf-in flex h-full flex-col">
                    <div className="flex items-center justify-between text-[11.5px]">
                      <span>
                        <b>23 rows → 21 people</b>
                        <span className="text-[var(--ink-3)]"> · 2 duplicates merged</span>
                      </span>
                      <span className="text-[var(--ink-3)]">Sorted by fit</span>
                    </div>
                    <div className="mt-2 overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--surface)]">
                      <div
                        className={`grid ${COLS} h-[26px] items-center border-b border-[var(--line)] bg-[var(--surface-2)] px-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--ink-3)]`}
                      >
                        <span />
                        <span>Name</span>
                        <span>Fit</span>
                        <span>Email</span>
                        <span>Email check</span>
                        <span>Found in</span>
                      </div>
                      {PEOPLE.slice(0, f.rows).map((p, i) => {
                        const locked = p.paid && !f.bought;
                        const ticked = PAID_ORDER[i] >= 0 && PAID_ORDER[i] < f.picked;
                        return (
                          <div
                            key={p.name}
                            className={`lf-in grid ${COLS} h-[31px] items-center border-b border-[var(--line-soft)] px-2 last:border-b-0`}
                          >
                            <span className="grid place-items-center">
                              {f.picking && p.paid && (
                                <span
                                  data-cursor={`check-${i}`}
                                  data-on={ticked}
                                  className="lf-check grid h-[15px] w-[15px] place-items-center rounded-[4px] border-[1.5px] border-[var(--line)] bg-white text-white"
                                >
                                  {ticked && <FiCheck size={10} strokeWidth={3} />}
                                </span>
                              )}
                            </span>
                            <span className="min-w-0 pr-2">
                              <span className="block truncate text-[12px] font-semibold">{p.name}</span>
                              <span className="block truncate text-[10.5px] text-[var(--ink-3)]">{p.title}</span>
                            </span>
                            <span>
                              {i < f.fits && (
                                <Pill tone={FIT_TONE[p.fit]} pop>
                                  {p.fit}
                                </Pill>
                              )}
                            </span>
                            <span className="min-w-0 pr-2 text-[11.5px]">
                              {locked ? (
                                <span className="rounded-[5px] bg-[var(--off-tint)] px-1.5 py-[2px] text-[10.5px] font-semibold text-[var(--off)]">
                                  1 credit to reveal
                                </span>
                              ) : (
                                <span className={`block truncate ${p.paid ? "lf-in text-[var(--glaze-strong)]" : ""}`}>{p.email}</span>
                              )}
                            </span>
                            <span className="text-[11px]">
                              {locked ? (
                                <span className="text-[var(--ink-3)]">—</span>
                              ) : (
                                <span className="flex items-center gap-1.5">
                                  <span className={`h-[7px] w-[7px] rounded-full ${DOT_CLASS[p.checkTone]}`} />
                                  {p.check}
                                </span>
                              )}
                            </span>
                            <span>
                              <Pill tone={p.found === "Hunter + Snov" ? "glaze" : "off"}>{p.found}</Pill>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {f.rows >= PEOPLE.length && <p className="mt-1.5 text-[11px] text-[var(--ink-3)]">+15 more people</p>}
                  </div>
                )}
              </div>

              {/* Toolbar */}
              <div className="mt-[12px] flex h-[34px] items-center justify-between gap-3">
                {f.picking ? (
                  <div className="lf-in flex items-center gap-3">
                    <span className="text-[12px]">
                      <b>{f.picked} ticked</b>
                      <span className="text-[var(--ink-3)]"> · at most {f.picked + 1} credits</span>
                    </span>
                    <Btn id="btn-buy" press={f.press} solid>
                      {f.picked ? `Get ${f.picked} email${f.picked > 1 ? "s" : ""}` : "Get emails"}
                    </Btn>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Btn id="btn-consolidate" press={f.press} solid={!f.consolidated} muted={f.view === "empty"}>
                      {f.consolidated ? (
                        <>
                          <FiCheck size={12} /> Consolidated
                        </>
                      ) : (
                        "Consolidate"
                      )}
                    </Btn>
                    <Btn id="btn-getemails" press={f.press} muted={f.view !== "merged"}>
                      Get emails
                    </Btn>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Btn id="btn-excel" press={f.press} muted={f.view !== "merged"}>
                    <FiDownload size={12} /> Download Excel
                  </Btn>
                  <Btn id="btn-sheets" press={f.press} muted={f.view !== "merged"}>
                    <FiGrid size={12} /> Send to Google Sheets
                  </Btn>
                </div>
              </div>
            </div>

            {/* Credit check before spending */}
            {f.dialog && (
              <div className="lf-in absolute inset-0 z-20 grid place-items-center bg-[rgba(21,33,31,0.3)]">
                <div className="lf-dialog w-[390px] rounded-[14px] bg-[var(--surface)] p-5 shadow-2xl">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--warn)]">Before spending credits</p>
                  <p className="mt-2 text-[15px] font-bold">This could use up to 21 Snov credits</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--ink-2)]">
                    Snov found 20 people here: 1 credit for the list + 1 for each email. That’s above your 10-credit
                    limit, so the app asks first.
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <Btn id="btn-all" press={f.press}>
                      Get all · up to 21
                    </Btn>
                    <Btn id="btn-pick" press={f.press} solid>
                      Pick people
                    </Btn>
                  </div>
                </div>
              </div>
            )}

            {/* Export confirmation */}
            {f.toast && !f.fading && (
              <div className="lf-pop absolute right-[18px] top-[88px] z-10 flex items-center gap-2 rounded-[10px] bg-[var(--ink)] px-3.5 py-2.5 text-[12px] font-semibold text-white shadow-lg">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--good)]">
                  <FiCheck size={12} />
                </span>
                Sent 21 contacts to Google Sheets
              </div>
            )}

            {/* Pointer */}
            <div ref={cursorRef} data-press={f.press !== null} className="lf-cursor pointer-events-none absolute left-0 top-0 z-30">
              <span className="lf-ripple absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[rgba(14,111,108,0.45)]" />
              <svg width="18" height="22" viewBox="0 0 18 22" aria-hidden="true">
                <path
                  d="M1.5 1.5 L1.5 17 L5.8 13.2 L8.7 20 L11.6 18.7 L8.8 12.2 L14.6 12.2 Z"
                  fill="#15211F"
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Step buttons: jump to any part of the walkthrough */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Demo steps">
        {STEPS.map((s, i) => {
          const on = f.step === i;
          const tone = dark
            ? on
              ? "bg-[#2dd4bf] text-[#050d16]"
              : "bg-white/[0.06] text-white/70 hover:text-white"
            : on
              ? "bg-[#0d2340] text-white"
              : "bg-white text-[#0d2340]/70 ring-1 ring-[#0d2340]/10 hover:text-[#0d2340]";
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => jump(i)}
              aria-pressed={on}
              className={`fx-body inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${tone}`}
            >
              <span className="font-mono text-[10px] opacity-60">0{i + 1}</span>
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
