"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiCopy, FiInstagram, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { useIndiaTime } from "../Landing/useIndiaTime";
import { useInView } from "../Landing/useInView";

const EMAIL = "fluxoninfotech@gmail.com";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fluxon-infotech", icon: FiLinkedin },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fluxoninfotech?igsh=OTk3ZGpmd2ppbHRl&utm_source=ig_contact_invite",
    icon: FiInstagram,
  },
];

/** Contact Us column: email (with copy), phone, live India time and socials. */
export default function FooterContact() {
  const [statusRef, onScreen] = useInView<HTMLParagraphElement>({ once: false, threshold: 0, rootMargin: "0px" });
  const time = useIndiaTime(onScreen);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center gap-2">
          <a href={`mailto:${EMAIL}`} className="ft-contact group flex min-w-0 items-center gap-3">
            <span className="ft-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-[#5eead4]">
              <FiMail size={17} />
            </span>
            <span className="ft-body truncate text-[15px] text-white/75 transition-colors group-hover:text-white">{EMAIL}</span>
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Email copied" : "Copy email address"}
            title={copied ? "Copied!" : "Copy email"}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-[#2dd4bf]/50 hover:text-white"
          >
            {copied ? <FiCheck className="text-[#5eead4]" size={14} /> : <FiCopy size={14} />}
          </button>
        </li>
        <li>
          <a href="tel:+917984846312" className="ft-contact group flex items-center gap-3">
            <span className="ft-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-[#5eead4]">
              <FiPhone size={17} />
            </span>
            <span className="ft-body text-[15px] text-white/75 transition-colors group-hover:text-white">+91 79848 46312</span>
          </a>
        </li>
      </ul>

      <p
        ref={statusRef}
        className="ft-body mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white/65"
      >
        <span className="relative flex h-2 w-2">
          <span className="ft-ping" />
          <span className="relative h-2 w-2 rounded-full bg-[#22c55e]" />
        </span>
        <span>
          {time ? (
            <>
              <span className="font-semibold tabular-nums text-white">{time}</span> in Morbi, India
            </>
          ) : (
            "Based in Morbi, Gujarat"
          )}{" "}
          · We reply within 24 hours
        </span>
      </p>

      <div className="mt-6 flex items-center gap-3">
        {SOCIALS.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="ft-social grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </>
  );
}
