import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiAmazonwebservices,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGithubactions,
  SiGooglecloud,
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import Reveal from "./Reveal";

interface Tech {
  name: string;
  icon: IconType;
  /** Brand colour revealed on hover. */
  color: string;
}

// ✏️ Edit these lists to match the stack Fluxon actually uses.
const ROW_ONE: Tech[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", icon: SiPython, color: "#FFD43B" },
  { name: "Django", icon: SiDjango, color: "#44B78B" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

const ROW_TWO: Tech[] = [
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "Azure", icon: VscAzure, color: "#0089D6" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Terraform", icon: SiTerraform, color: "#844FBA" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Redis", icon: SiRedis, color: "#FF4438" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "OpenAI", icon: SiOpenai, color: "#ffffff" },
  { name: "LangChain", icon: SiLangchain, color: "#7dd3c0" },
];

function MarqueeRow({ items, duration, reverse = false }: { items: Tech[]; duration: string; reverse?: boolean }) {
  return (
    <div className="fx-marquee overflow-hidden py-1">
      <div className="fx-marquee-track" data-reverse={reverse} style={{ "--dur": duration } as CSSProperties}>
        {[0, 1].map((copy) =>
          items.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={`${t.name}-${copy}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="group mr-4 inline-flex shrink-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-3 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                style={{ "--brand": t.color } as CSSProperties}
              >
                <Icon className="h-5 w-5 transition-colors duration-300 group-hover:text-[var(--brand)]" />
                <span className="fx-body whitespace-nowrap text-sm font-medium">{t.name}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/** Two infinitely scrolling rows of technologies, moving in opposite directions. */
export default function TechMarquee() {
  return (
    <section aria-label="Technologies we work with" className="relative border-t border-white/[0.06] bg-[#050d16] pb-16 pt-14">
      <Reveal>
        <p className="fx-body mb-9 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
          The modern stack we build with
        </p>
      </Reveal>
      <div className="flex flex-col gap-4">
        <MarqueeRow items={ROW_ONE} duration="55s" />
        <MarqueeRow items={ROW_TWO} duration="65s" reverse />
      </div>
    </section>
  );
}
