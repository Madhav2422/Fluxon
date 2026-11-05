"use client";

import Link from "next/link";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Eyebrow from "../Landing/Eyebrow";
import Reveal from "../Landing/Reveal";

const FAQS = [
  {
    q: "How quickly will you reply?",
    a: "We typically respond within 24 hours. A real person from our team reads every message.",
  },
  {
    q: "What happens after I send a message?",
    a: "We set up a short discovery call to understand your business, goals and challenges. Then we share a clear plan and roadmap, and once you're happy we move through design, build and launch — keeping you informed at every stage.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes. From startups to enterprises, we help organizations modernize their operations, build digital products and scale with confidence.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "Websites and web apps, online stores, AI solutions and chatbots, cloud setup and migration, automation, DevOps and IT consulting.",
    link: { href: "/services", label: "Explore our services" },
  },
  {
    q: "Do you offer support after launch?",
    a: "Absolutely. After deployment we keep supporting your product with ongoing 24/7 support, so everything runs smoothly.",
  },
];

/** Common questions, as a calm accordion. */
export default function ContactFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Good to know</Eyebrow>
          <h2 className="fx-display mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0d2340] md:text-5xl">
            Questions, <span className="fx-gradient-text-dark">answered.</span>
          </h2>
          <p className="fx-body mt-5 max-w-sm text-base leading-relaxed text-gray-500 md:text-lg">
            Can&apos;t find what you&apos;re looking for? Just ask — that&apos;s what the form is for.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="border-t border-[#0d2340]/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-[#0d2340]/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="fx-display text-lg font-bold text-[#0d2340] transition-colors group-hover:text-[#1a9e83] md:text-xl">
                        {f.q}
                      </span>
                      <span className="ct-faq-icon grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f0fffc] text-[#1a9e83]">
                        <FiPlus size={18} />
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-${i}`} role="region" data-open={isOpen} className="ct-faq-panel">
                    <div>
                      <p className="fx-body max-w-2xl pb-6 pr-14 text-base leading-relaxed text-gray-500">
                        {f.a}{" "}
                        {f.link && (
                          <Link href={f.link.href} tabIndex={isOpen ? undefined : -1} className="font-semibold text-[#1a9e83] hover:underline">
                            {f.link.label} →
                          </Link>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
