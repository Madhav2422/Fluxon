"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight, FiCloud, FiCode, FiCpu, FiSettings, FiUsers, FiZap } from "react-icons/fi";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { AIVisual, AutomationVisual, CloudVisual, ConsultingVisual, DevOpsVisual, WebVisual } from "./ServiceVisuals";

/* ───────────────────────── Data ───────────────────────── */

interface Service {
  slug: string;
  title: string;
  description: string;
  icon: IconType;
  tags: string[];
  visual: ReactNode;
  span: string;
  wide?: boolean;
}

const SERVICES: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Full-stack web applications using React, Node.js and modern frameworks — responsive, fast and SEO-optimized from day one.",
    icon: FiCode,
    tags: ["Custom Web Apps", "E-Commerce", "API Development"],
    visual: <WebVisual />,
    span: "md:col-span-2 lg:col-span-4",
    wide: true,
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    description: "Intelligent automation and AI-powered tools that streamline operations and sharpen decisions.",
    icon: FiCpu,
    tags: ["AI Chatbots", "LLM Integration"],
    visual: <AIVisual />,
    span: "lg:col-span-2",
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Cloud infrastructure, migration and management on AWS, Azure & GCP.",
    icon: FiCloud,
    tags: ["Migration", "24/7 Monitoring"],
    visual: <CloudVisual />,
    span: "lg:col-span-2",
  },
  {
    slug: "automation",
    title: "Automation",
    description: "End-to-end process automation that removes repetitive work and boosts efficiency.",
    icon: FiSettings,
    tags: ["Workflows", "RPA"],
    visual: <AutomationVisual />,
    span: "lg:col-span-2",
  },
  {
    slug: "devops",
    title: "DevOps",
    description: "CI/CD pipelines, containerization and infrastructure as code for fearless releases.",
    icon: FiZap,
    tags: ["CI/CD", "Docker & K8s"],
    visual: <DevOpsVisual />,
    span: "lg:col-span-2",
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    description:
      "Strategic technology consulting that aligns IT with your business objectives — clear roadmaps, smart architecture and measurable growth.",
    icon: FiUsers,
    tags: ["Digital Strategy", "Tech Roadmaps", "Architecture Reviews"],
    visual: <ConsultingVisual />,
    span: "md:col-span-2 lg:col-span-6",
    wide: true,
  },
];

/* ───────────────────────── Card ───────────────────────── */

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const Icon = service.icon;

  // Subtle 3D tilt that follows the cursor (at most one update per frame).
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (pointer.current.x - r.left) / r.width - 0.5;
      const py = (pointer.current.y - r.top) / r.height - 0.5;
      const max = service.wide ? 3 : 6;
      el.style.transform = `perspective(1200px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
    });
  };

  const handleLeave = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (ref.current) ref.current.style.transform = "";
  };

  const text = (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#1a9e83] to-[#2563eb] text-white shadow-lg shadow-[#1a9e83]/25 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
          <Icon size={20} />
        </span>
        <h3 className="fx-display text-xl font-bold text-[#0d2340] md:text-[22px]">{service.title}</h3>
      </div>
      <p className="fx-body mt-4 text-[15px] leading-relaxed text-gray-500">{service.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="fx-body rounded-full border border-[#1a9e83]/20 bg-[#f0fffc] px-3 py-1 text-xs font-medium text-[#1a9e83]"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/services#${service.slug}`}
        className="fx-body mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#0d2340] transition-colors hover:text-[#1a9e83]"
      >
        Learn more
        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </Link>
    </div>
  );

  return (
    <Reveal delay={(index % 3) * 110} className={service.span}>
      <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="fx-spot group">
        <div className="fx-spot-inner">
          {service.wide ? (
            <div className="grid h-full gap-8 p-7 md:p-9 lg:grid-cols-2 lg:items-center">
              {text}
              <div className="flex h-full min-h-[200px] items-center justify-center">{service.visual}</div>
            </div>
          ) : (
            <div className="flex h-full flex-col p-7">
              <div className="mb-7 grid h-44 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0fffc] via-white to-[#eef4ff] px-5">
                {service.visual}
              </div>
              {text}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ───────────────────────── Section ───────────────────────── */

export default function ServicesBento() {
  const gridRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  // Feed the cursor position to every card so borders glow as the light passes.
  // Once per frame, and all reads happen before all writes (no layout thrashing).
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const cards = gridRef.current?.querySelectorAll<HTMLElement>(".fx-spot");
      if (!cards) return;
      const { x, y } = pointer.current;
      const rects = Array.from(cards, (card) => card.getBoundingClientRect());
      cards.forEach((card, i) => {
        card.style.setProperty("--x", `${x - rects[i].left}px`);
        card.style.setProperty("--y", `${y - rects[i].top}px`);
      });
    });
  };

  return (
    <section id="services" className="relative scroll-mt-[90px] overflow-hidden bg-[#f5f9f8] py-24 md:py-32">
      <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#1a9e83]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="fx-display mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0d2340] md:text-6xl">
            Services built to{" "}
            <span className="fx-underline text-[#1a9e83]">
              scale
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M3 9 C 50 2, 150 2, 197 8"
                  pathLength={1}
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            with you
          </h2>
          <p className="fx-body mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg">
            Comprehensive IT services designed to help your business thrive in the digital age — from
            the first line of code to the cloud it runs on.
          </p>
        </Reveal>

        <div
          ref={gridRef}
          onMouseMove={handleMove}
          className="fx-spot-grid mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Link
            href="/services"
            className="fx-body group inline-flex items-center gap-3 rounded-full border border-[#0d2340]/10 bg-white py-2 pl-6 pr-2 text-sm font-semibold text-[#0d2340] shadow-sm transition-all duration-300 hover:border-[#1a9e83]/40 hover:shadow-lg hover:shadow-[#1a9e83]/10"
          >
            View all services
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0d2340] text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#1a9e83]">
              <FiArrowRight size={16} />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
