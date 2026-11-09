import Link from "next/link";
import type { CSSProperties } from "react";
import { FiArrowRight } from "react-icons/fi";
import "./footer.css";
import BackToTop from "./BackToTop";
import FooterContact from "./FooterContact";
import FooterLinks, { type FooterLinkItem } from "./FooterLinks";
import FooterShell from "./FooterShell";
import FooterWordmark from "./FooterWordmark";

/** Same labels and order as the navbar. */
const QUICK_LINKS: FooterLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact" },
];

/** Each link opens that service on the Services page. */
const SERVICES: FooterLinkItem[] = [
  { label: "Web Development", href: "/services#web-development" },
  { label: "AI Solutions", href: "/services#ai-solutions" },
  { label: "Cloud Solutions", href: "/services#cloud-solutions" },
  { label: "Automation", href: "/services#automation" },
  { label: "DevOps", href: "/services#devops" },
  { label: "IT Consulting", href: "/services#it-consulting" },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Site footer: About Us · Quick Links · Services · Contact Us, then the giant wordmark. */
export default function FooterMain() {
  const year = new Date().getFullYear();

  return (
    <FooterShell>
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="ft-grid absolute inset-0" />
        <div className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(26,158,131,0.16),transparent)]" />
        <div className="absolute -right-48 bottom-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.14),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 pt-20 md:px-10 md:pt-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-[1.3fr_0.75fr_0.95fr_1.3fr] lg:gap-x-12">
          {/* 1 · About Us */}
          <div className="ft-reveal col-span-2 lg:col-span-1" style={delay(0)}>
            <h2 className="ft-heading">About Us</h2>
            <Link href="/" className="group mt-6 inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white p-2 shadow-[0_0_30px_rgba(45,212,191,0.25)] transition-transform duration-500 group-hover:rotate-[-8deg]">
                <span className="ft-logo-mark block h-full w-full" />
              </span>
              <span className="ft-display text-xl font-extrabold tracking-tight">Fluxon Infotech</span>
            </Link>
            <p className="ft-body mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
              An IT company in Morbi, Gujarat, empowering businesses with innovative IT solutions and technology
              services — from the first idea to launch and beyond.
            </p>
            <Link
              href="/about"
              className="ft-body group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5eead4] transition-colors hover:text-white"
            >
              Read our story
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 2 · Quick Links */}
          <div className="ft-reveal" style={delay(100)}>
            <h2 className="ft-heading">Quick Links</h2>
            <FooterLinks items={QUICK_LINKS} label="Quick links" />
          </div>

          {/* 3 · Services */}
          <div className="ft-reveal" style={delay(200)}>
            <h2 className="ft-heading">Services</h2>
            <FooterLinks items={SERVICES} label="Services" />
          </div>

          {/* 4 · Contact Us */}
          <div className="ft-reveal col-span-2 lg:col-span-1" style={delay(300)}>
            <h2 className="ft-heading">Contact Us</h2>
            <FooterContact />
          </div>
        </div>

        {/* Divider with a light running along it */}
        <div aria-hidden="true" className="relative mt-16 h-px overflow-hidden md:mt-20">
          <span className="ft-line absolute inset-0 bg-gradient-to-r from-[#1a9e83]/70 via-white/15 to-[#2563eb]/70" />
          <span className="ft-spark" />
        </div>

        {/* Giant wordmark */}
        <div className="mt-8 md:mt-10">
          <FooterWordmark />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-center justify-between gap-5 border-t border-white/10 py-7 sm:flex-row">
          <p className="ft-body text-center text-sm text-white/45 sm:text-left">
            © {year} Fluxon Infotech. All rights reserved.
            <span className="block sm:inline">
              <span className="hidden sm:inline"> · </span>Morbi, Gujarat, India
            </span>
          </p>
          <BackToTop />
        </div>
      </div>
    </FooterShell>
  );
}
