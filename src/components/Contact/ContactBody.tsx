import type { IconType } from "react-icons";
import { FiCalendar, FiFileText, FiMessageCircle } from "react-icons/fi";
import Reveal from "../Landing/Reveal";
import LetterForm from "./LetterForm";

const NEXT_STEPS: { icon: IconType; title: string; text: string }[] = [
  { icon: FiMessageCircle, title: "We reply within 24 hours", text: "A real person from our team reads your message and gets back to you." },
  { icon: FiCalendar, title: "A friendly discovery call", text: "We learn about your business, your goals and the challenges you're facing." },
  { icon: FiFileText, title: "A clear plan & roadmap", text: "You get a practical plan for how we'd build it — no jargon, no pressure." },
];

/** The letter-style form beside a short "what happens next" story. */
export default function ContactBody() {
  return (
    <section className="ct-warm relative pb-24 md:pb-32">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-6 md:px-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <Reveal variant="up">
          <LetterForm />
        </Reveal>

        <Reveal variant="right" delay={150} className="lg:pt-6">
          <p className="ct-hand -rotate-2 text-3xl text-[#1a9e83]">What happens next?</p>
          <ol className="relative mt-8 space-y-9">
            <span aria-hidden="true" className="absolute bottom-3 left-[21px] top-3 w-[2px] rounded-full bg-[#0d2340]/10">
              <span className="ct-step-line absolute inset-0 rounded-full bg-gradient-to-b from-[#1a9e83] to-[#2563eb]" />
            </span>
            {NEXT_STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative flex gap-5">
                <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#0d2340]/10 bg-white text-[#1a9e83] shadow-sm">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-mono text-xs text-[#0d2340]/40">Step 0{i + 1}</p>
                  <h3 className="fx-display mt-1 text-lg font-bold text-[#0d2340]">{title}</h3>
                  <p className="fx-body mt-1 text-[15px] leading-relaxed text-[#0d2340]/60">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 rotate-1 rounded-3xl bg-[#0d2340] p-7 text-white shadow-[0_30px_60px_-30px_rgba(13,35,64,0.8)]">
            <p className="ct-hand text-2xl text-[#5eead4]">Prefer to just talk?</p>
            <p className="fx-body mt-2 text-sm leading-relaxed text-white/70">Give us a call or drop us an email — whatever&apos;s easiest for you.</p>
            <div className="mt-5 flex flex-col gap-2">
              <a href="tel:+917984846312" className="fx-display font-bold transition-colors hover:text-[#5eead4]">
                +91 79848 46312
              </a>
              <a href="mailto:fluxoninfotech@gmail.com" className="fx-body break-all text-sm text-white/80 transition-colors hover:text-[#5eead4]">
                fluxoninfotech@gmail.com
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
