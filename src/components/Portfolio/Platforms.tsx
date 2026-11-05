import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FiBarChart2, FiCpu, FiGlobe } from "react-icons/fi";
import biztrack from "../../../public/portfolio/app-biztrack.png";
import nexa from "../../../public/portfolio/app-nexa.png";
import novaai from "../../../public/portfolio/app-novaai.png";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";

interface Platform {
  title: string;
  text: string;
  label: string;
  icon: IconType;
  image: StaticImageData;
  span: string;
  float: string;
}

const PLATFORMS: Platform[] = [
  {
    title: "Web applications",
    text: "Scalable web platforms built for performance and usability.",
    label: "Nexa · project dashboard",
    icon: FiGlobe,
    image: nexa,
    span: "md:col-span-2 lg:col-span-6",
    float: "0s",
  },
  {
    title: "AI-powered tools",
    text: "Intelligent solutions designed to automate and simplify workflows.",
    label: "NovaAI · AI assistant",
    icon: FiCpu,
    image: novaai,
    span: "md:col-span-1 lg:col-span-3",
    float: "-2s",
  },
  {
    title: "Business systems",
    text: "Custom dashboards, internal tools, and software for business operations.",
    label: "BizTrack · sales analytics",
    icon: FiBarChart2,
    image: biztrack,
    span: "md:col-span-1 lg:col-span-3",
    float: "-4s",
  },
];

/** The three kinds of platforms we build, shown with the UI concepts from the portfolio. */
export default function Platforms() {
  return (
    <section className="relative overflow-hidden bg-[#050d16] py-24 text-white md:py-32">
      <div aria-hidden="true" className="fx-grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.2),transparent)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow dark>Platform types</Eyebrow>
            <h2 className="fx-display mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
              Products we design <span className="fx-gradient-text">&amp; build</span>
            </h2>
          </div>
          <p className="fx-body max-w-sm text-base leading-relaxed text-white/55 md:text-lg">
            From web platforms to AI assistants and business dashboards — designed for real people and real work.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {PLATFORMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 120} className={p.span}>
                <article className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-[translate,border-color] duration-500 hover:-translate-y-1.5 hover:border-[#2dd4bf]/40">
                  <div className="relative h-[340px] overflow-hidden bg-gradient-to-br from-[#1e5fd0] via-[#1a49a8] to-[#0e2a63] md:h-[380px]">
                    <div
                      className="fx-float absolute inset-0"
                      style={{ "--dur": "8s", "--d": p.float, "--amp": "-8px" } as CSSProperties}
                    >
                      <Image
                        src={p.image}
                        alt={`${p.title} — ${p.label} UI concept`}
                        fill
                        placeholder="blur"
                        sizes={i === 0 ? "(min-width: 1024px) 600px, 92vw" : "(min-width: 1024px) 300px, 46vw"}
                        className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#1a9e83] to-[#2563eb]">
                        <Icon size={18} />
                      </span>
                      <h3 className="fx-display text-xl font-extrabold uppercase tracking-tight">{p.title}</h3>
                    </div>
                    <p className="fx-body mt-4 text-[15px] leading-relaxed text-white/60">{p.text}</p>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/35">
                      UI concept · {p.label}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
