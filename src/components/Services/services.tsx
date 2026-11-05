import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiCloud, FiCode, FiCpu, FiSettings, FiUsers, FiZap } from "react-icons/fi";
import {
  AIVisual,
  AutomationVisual,
  CloudVisual,
  ConsultingVisual,
  DevOpsVisual,
  WebVisual,
} from "../Landing/ServiceVisuals";

export interface ServiceItem {
  /** Also the element id, so /services#<slug> deep-links to it. */
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: IconType;
  tags: string[];
  /** Technologies shown under "Tools we use" (empty = section hidden). */
  tools: string[];
  /** Words people might type into the "what do you need?" search. */
  keywords: string[];
  visual: ReactNode;
  /** Wide visuals get the full preview width. */
  wide?: boolean;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short: "Websites, web apps & online stores",
    description:
      "Full-stack web applications using React, Node.js and modern frameworks. We build responsive, fast and SEO-optimized websites and web apps.",
    icon: FiCode,
    tags: ["Custom Web Apps", "E-Commerce", "CMS Solutions", "API Development"],
    tools: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
    keywords: ["website", "web app", "webapp", "web", "online store", "store", "shop", "e-commerce", "ecommerce",
      "landing page", "portal", "cms", "seo", "frontend", "react", "next.js", "app", "brand", "redesign"],
    visual: <WebVisual />,
    wide: true,
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    short: "Chatbots, LLMs & smart tools",
    description:
      "Intelligent AI-powered tools and integrations tailored to automate workflows, enhance decisions and drive smarter business outcomes.",
    icon: FiCpu,
    tags: ["Machine Learning", "AI Chatbots", "Predictive Analytics", "LLM Integration"],
    tools: ["OpenAI", "LangChain", "Python", "TensorFlow", "PyTorch"],
    keywords: ["ai", "chatbot", "chat bot", "bot", "gpt", "llm", "openai", "machine learning", "ml", "predict",
      "assistant", "intelligent", "smart", "nlp", "recommendation"],
    visual: <AIVisual />,
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    short: "Migration, setup & 24/7 monitoring",
    description: "Cloud migration, architecture design and managed services across AWS, Azure and Google Cloud.",
    icon: FiCloud,
    tags: ["Cloud Migration", "Infrastructure Setup", "Cost Optimization", "24/7 Monitoring"],
    tools: ["AWS", "Azure", "Google Cloud", "Terraform"],
    keywords: ["cloud", "aws", "azure", "gcp", "google cloud", "server", "hosting", "migrate", "migration",
      "infrastructure", "scaling", "uptime", "backup"],
    visual: <CloudVisual />,
  },
  {
    slug: "automation",
    title: "Automation",
    short: "Workflows that run themselves",
    description:
      "End-to-end process automation to eliminate repetitive tasks, reduce errors and boost your team's operational efficiency.",
    icon: FiSettings,
    tags: ["Workflow Automation", "RPA", "API Integration", "Process Optimization"],
    tools: ["Python", "Node.js", "OpenAI", "REST APIs"],
    keywords: ["automate", "automation", "automatic", "invoice", "report", "workflow", "rpa", "manual",
      "repetitive", "excel", "spreadsheet", "integration", "integrate", "process"],
    visual: <AutomationVisual />,
  },
  {
    slug: "devops",
    title: "DevOps",
    short: "CI/CD, containers & infrastructure as code",
    description:
      "Streamline your development and deployment with CI/CD pipelines, containers and infrastructure as code.",
    icon: FiZap,
    tags: ["CI/CD Pipelines", "Docker & Kubernetes", "Infrastructure as Code", "Monitoring"],
    tools: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"],
    keywords: ["devops", "ci", "cd", "ci/cd", "pipeline", "docker", "kubernetes", "k8s", "deploy", "deployment",
      "release", "container", "terraform", "github actions", "downtime"],
    visual: <DevOpsVisual />,
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    short: "Strategy, roadmaps & architecture",
    description:
      "Strategic technology consulting to align IT with your business objectives and drive digital transformation.",
    icon: FiUsers,
    tags: ["Digital Strategy", "Tech Roadmaps", "Process Automation", "Architecture Reviews"],
    tools: [],
    keywords: ["consult", "consulting", "strategy", "strategic", "roadmap", "plan", "planning", "advice", "audit",
      "architecture", "digital transformation", "transformation", "cto", "review"],
    visual: <ConsultingVisual />,
    wide: true,
  },
];

/** How well a free-text request matches a service (0 = no match). */
export function scoreService(query: string, service: ServiceItem): number {
  const q = ` ${query.toLowerCase().replace(/[^a-z0-9+#/.\s-]/g, " ")} `;
  if (!q.trim()) return 0;

  let score = 0;
  for (const kw of service.keywords) {
    if (kw.length <= 3) {
      // Short keywords ("ai", "ci", "app") must be whole words.
      if (new RegExp(`[^a-z0-9]${kw.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}[^a-z0-9]`).test(q)) score += 2;
    } else if (q.includes(kw)) {
      score += kw.length > 6 ? 3 : 2;
    }
  }

  // Live feedback while typing: the unfinished last word may be the start of a keyword.
  const last = q.trim().split(/\s+/).pop() ?? "";
  if (last.length >= 3 && service.keywords.some((kw) => kw !== last && kw.startsWith(last))) score += 1;

  return score;
}

/** Scores for every service plus the index of the best match (-1 when nothing matches). */
export function rankServices(query: string) {
  const scores = SERVICES.map((s) => scoreService(query, s));
  const max = Math.max(...scores);
  return { scores, best: max > 0 ? scores.indexOf(max) : -1 };
}

export const OPEN_SERVICE_EVENT = "fx:open-service";

/** Ask the service list to open (and scroll to) a service. */
export function openService(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_SERVICE_EVENT, { detail: slug }));
}
