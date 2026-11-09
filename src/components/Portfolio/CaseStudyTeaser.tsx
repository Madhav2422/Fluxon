import Link from "next/link";
import { FiArrowRight, FiLock } from "react-icons/fi";
import LeadFinderDemo from "../CaseStudy/LeadFinderDemo";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";

const STATS = [
  { value: "2 → 1", label: "data providers combined into one list with no duplicates" },
  { value: "100", label: "companies per search, at no credit cost" },
  { value: "0", label: "credits to look a company up again" },
  { value: "~$6", label: "a month to host (estimate)" },
];

/** Portfolio: Lead Finder, a private client app shown as a demo with sample data. */
export default function CaseStudyTeaser({ tone = "white" }: { tone?: "white" | "mint" }) {
  return (
    <section className={`relative overflow-hidden py-24 md:py-32 ${tone === "mint" ? "bg-[#f5f9f8]" : "bg-white"}`}>
      <div aria-hidden="true" className="fx-grid-bg-light pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(14,111,108,0.12),transparent)]"
      />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal variant="left">
          <Eyebrow>Featured case study</Eyebrow>
          <h2 className="fx-display mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0d2340] md:text-6xl">
            Lead <span className="fx-gradient-text-dark">Finder</span>
          </h2>
          <p className="fx-body mt-5 max-w-lg text-base leading-relaxed text-gray-500 md:text-lg">
            A private B2B lead generation web app for a ceramic tile exporter. It finds the right buyer at any company, and
            their verified work email, by using Hunter and Snov together.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Private client tool", "Python", "Hunter + Snov APIs", "AWS"].map((tag) => (
              <span
                key={tag}
                className="fx-body rounded-full border border-[#0e6f6c]/20 bg-[#f0f8f7] px-3 py-1 text-xs font-semibold text-[#0e6f6c]"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-[#0d2340]/10 bg-white p-4 shadow-[0_16px_40px_-32px_rgba(13,35,64,0.5)]">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="fx-display fx-gradient-text-dark block text-3xl font-extrabold tracking-tight">{s.value}</span>
                  <span className="fx-body mt-1 block text-xs leading-snug text-gray-500">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9">
            <Link
              href="/contact"
              className="fx-body group inline-flex items-center gap-3 rounded-full bg-[#0d2340] py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1a9e83]"
            >
              Discuss a similar tool
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <FiArrowRight size={16} />
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal variant="right" delay={120}>
          <LeadFinderDemo />
          <p className="fx-body mt-4 text-balance text-center text-xs text-gray-400">
            <FiLock className="-mt-0.5 mr-1.5 inline" />
            Demo with sample data. The real app is private to our client.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
