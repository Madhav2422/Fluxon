"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight, FiBox, FiCheck, FiCpu, FiLayers } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";

type TabId = "expertise" | "services";

const TABS: { id: TabId; label: string; color: string }[] = [
  { id: "expertise", label: "Our expertise", color: "#1e6fd0" },
  { id: "services", label: "Our services", color: "#1a56a0" },
];

const EXPERTISE: { title: string; icon: IconType; points: string[] }[] = [
  {
    title: "Full-stack development",
    icon: FiLayers,
    points: ["Scalable web applications and platforms", "Frontend, backend & database development", "Clean, maintainable code"],
  },
  {
    title: "AI & automation",
    icon: FiCpu,
    points: ["AI-powered solutions for businesses", "Intelligent workflows and automation", "APIs, integrations & custom tools"],
  },
  {
    title: "Custom software",
    icon: FiBox,
    points: ["Solutions tailored to business needs", "MVPs and internal platforms", "From concept to deployment"],
  },
];

const SERVICES: { title: string; text: string }[] = [
  { title: "Full-stack development", text: "Web applications, dashboards, and scalable platforms." },
  { title: "AI & automation", text: "AI solutions, intelligent workflows, and business automation." },
  { title: "Custom software", text: "Tailored software built around your business needs." },
  { title: "API & system integration", text: "APIs, third-party integrations, and connected systems." },
];

function MiniFolder() {
  return (
    <span className="pf-mini-folder block" aria-hidden="true">
      <span className="pf-mf-back block" />
      <span className="pf-mf-doc block p-3">
        <span className="block h-1.5 w-3/4 rounded-full bg-[#0d2340]/15" />
        <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-[#0d2340]/10" />
        <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-[#1e6fd0]/30" />
      </span>
      <span className="pf-mf-front block" />
    </span>
  );
}

/** Expertise & services inside an interactive "folder" with tabs (a nod to the portfolio PDF). */
export default function WhatWeDo() {
  const [tab, setTab] = useState<TabId>("expertise");
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <section className="pf-warm relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="fx-display mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0d2340] md:text-5xl">
              Turning complex problems into <span className="fx-gradient-text-dark">simple digital solutions.</span>
            </h2>
          </div>
          <p className="fx-body max-w-sm text-base leading-relaxed text-gray-500 md:text-lg">
            From the first idea to a product people rely on — here&apos;s where we can help.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-14">
          {/* Folder tabs */}
          <div role="tablist" aria-label="What we do" className="flex items-end gap-1 pl-2 md:pl-4">
            {TABS.map((t) => {
              const selected = t.id === tab;
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={`pf-tab fx-body inline-flex items-center gap-3 py-3.5 pl-6 pr-14 text-sm font-semibold uppercase tracking-[0.12em] outline-none focus-visible:underline md:py-4 md:pl-7 md:pr-16 md:text-base ${
                    selected ? "text-white" : "translate-y-1.5 text-white/75 hover:translate-y-0.5"
                  }`}
                  style={{ backgroundColor: selected ? active.color : "#7aa6d8" }}
                >
                  {t.label}
                  <FiArrowRight aria-hidden="true" className={selected ? "opacity-100" : "opacity-60"} />
                </button>
              );
            })}
          </div>

          {/* Folder body */}
          <div
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            className="relative overflow-hidden rounded-[28px] rounded-tl-none p-6 text-white shadow-[0_40px_80px_-40px_rgba(30,111,208,0.7)] transition-colors duration-500 md:p-12"
            style={{ backgroundColor: active.color }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)]"
            />

            {tab === "expertise" ? (
              <div key="expertise" className="pf-swap relative grid gap-5 md:grid-cols-3">
                {EXPERTISE.map(({ title, icon: Icon, points }, i) => (
                  <div
                    key={title}
                    className="rounded-3xl bg-white/[0.12] p-7 ring-1 ring-white/15 transition-transform duration-500 hover:-translate-y-1.5"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#1e6fd0] shadow-lg">
                      <Icon size={22} />
                    </span>
                    <h3 className="fx-display mt-6 text-xl font-extrabold uppercase tracking-tight">{title}</h3>
                    <ul className="mt-5 space-y-3">
                      {points.map((p) => (
                        <li key={p} className="fx-body flex items-start gap-3 text-[15px] leading-snug text-white/85">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/20">
                            <FiCheck size={12} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div key="services" className="pf-swap relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES.map((s) => (
                  <div key={s.title} className="group flex flex-col items-center text-center">
                    <div className="w-full max-w-[220px]">
                      <MiniFolder />
                    </div>
                    <span className="fx-display mt-6 rounded-2xl bg-[#fffbe8] px-4 py-2 text-sm font-extrabold uppercase tracking-tight text-[#11161d]">
                      {s.title}
                    </span>
                    <p className="fx-body mt-4 max-w-[240px] text-[15px] leading-relaxed text-white/85">{s.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
