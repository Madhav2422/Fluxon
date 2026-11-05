"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FiCheck, FiRefreshCw, FiSend } from "react-icons/fi";

const TOPICS = [
  "A new website",
  "A web app",
  "An online store",
  "AI / chatbot",
  "Cloud",
  "Automation",
  "DevOps",
  "IT consulting",
  "Something else",
];

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[0-9]{10}$/;

type Status = "idle" | "sending" | "success" | "error";
interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  general?: string;
}

/** Width that grows with the text, so the blanks feel hand-written into the sentence. */
const fit = (value: string, placeholder: string) => ({
  width: `${(Math.max(value.length, placeholder.length) * 0.82 + 1).toFixed(1)}ch`,
});

function Blank({
  value,
  placeholder,
  label,
  invalid,
  ...rest
}: {
  value: string;
  placeholder: string;
  label: string;
  invalid?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "placeholder">) {
  return (
    <span className="ct-blank" data-invalid={invalid ? "true" : undefined}>
      <input
        value={value}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={invalid || undefined}
        style={fit(value, placeholder)}
        {...rest}
      />
    </span>
  );
}

/** The contact form, written as a friendly letter you fill in. */
export default function LetterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const [sentName, setSentName] = useState("");
  const rootRef = useRef<HTMLElement | null>(null);
  const setRoot = (el: HTMLElement | null) => {
    rootRef.current = el;
  };

  // The thank-you note is shorter than the form — bring it into view so it isn't missed.
  useEffect(() => {
    if (status !== "success") return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rootRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
  }, [status]);

  const toggleTopic = (t: string) =>
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!email.trim()) next.email = "Please add your email so we can reply.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email address.";
    if (phone && !PHONE_RE.test(phone)) next.phone = "Phone number must be exactly 10 digits.";

    if (Object.keys(next).length) {
      setErrors(next);
      setStatus("error");
      setShakeKey((k) => k + 1);
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          fullName: name.trim(),
          email: email.trim(),
          phone: phone || "Not provided",
          subject: topics.length ? topics.join(", ") : "General enquiry",
          message: message.trim() || "(No extra details)",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSentName(name.trim().split(" ")[0]);
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setTopics([]);
      setMessage("");
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrors({ general: "Something went wrong while sending. Please try again, or email us directly." });
      setStatus("error");
    }
  };

  /* ── Thank-you note ── */
  if (status === "success") {
    return (
      <div ref={setRoot} className="ct-letter relative overflow-hidden rounded-[28px] px-7 py-16 text-center md:px-14 md:py-24">
        <span aria-hidden="true" className="ct-fly absolute left-1/2 top-1/2 -ml-6 -mt-6 text-[#1a9e83]">
          <FiSend size={48} />
        </span>
        <div className="ct-pop mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#1a9e83] text-white" style={{ "--d": "0.9s" } as CSSProperties}>
          <FiCheck size={30} />
        </div>
        <h3 className="ct-pop fx-display mt-6 text-3xl font-extrabold text-[#0d2340] md:text-4xl" style={{ "--d": "1.05s" } as CSSProperties}>
          Thank you{sentName ? `, ${sentName}` : ""}!
        </h3>
        <p className="ct-pop fx-body mx-auto mt-3 max-w-md text-base leading-relaxed text-[#0d2340]/65" style={{ "--d": "1.2s" } as CSSProperties}>
          Your message is on its way. We&apos;ll read it carefully and get back to you within 24 hours.
        </p>
        <p className="ct-pop ct-hand mt-6 text-2xl text-[#1a9e83]" style={{ "--d": "1.35s" } as CSSProperties}>
          — The Fluxon Infotech team
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="ct-pop fx-body mt-9 inline-flex items-center gap-2 rounded-full border border-[#0d2340]/15 px-5 py-2.5 text-sm font-semibold text-[#0d2340] transition-colors hover:border-[#1a9e83]/50 hover:text-[#1a9e83]"
          style={{ "--d": "1.5s" } as CSSProperties}
        >
          <FiRefreshCw size={14} /> Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      ref={setRoot}
      key={shakeKey}
      onSubmit={send}
      noValidate
      className={`ct-letter relative rounded-[28px] px-6 pb-8 pt-10 md:px-12 md:pb-12 md:pt-14 ${shakeKey ? "ct-shake" : ""}`}
    >
      <span aria-hidden="true" className="ct-tape absolute -left-5 -top-1 h-6 w-20 rounded-sm md:-left-6 md:top-5 md:h-7 md:w-28" />
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0d2340]/40">New message</p>
        <p className="font-mono text-xs text-[#0d2340]/40">To: Fluxon Infotech</p>
      </div>

      <div className="fx-display mt-8 text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-[2.1] text-[#0d2340]">
        <p>
          Hi Fluxon! My name is{" "}
          <Blank
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your name"
            label="Your name"
            autoComplete="name"
            invalid={!!errors.name}
          />{" "}
          and I&apos;d love your help with…
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2.5" role="group" aria-label="What do you need help with?">
        {TOPICS.map((t) => {
          const on = topics.includes(t);
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => toggleTopic(t)}
              className="ct-chip fx-body inline-flex items-center rounded-full border border-[#0d2340]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0d2340]"
            >
              <span className="ct-chip-check place-items-center">
                <FiCheck size={14} />
              </span>
              {t}
            </button>
          );
        })}
      </div>
      <p className="ct-hand mt-2 text-xl text-[#1a9e83]">↑ pick as many as you like</p>

      <div className="fx-display mt-6 text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-[2.1] text-[#0d2340]">
        <p>
          You can reach me at{" "}
          <Blank
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@email.com"
            label="Your email address"
            autoComplete="email"
            invalid={!!errors.email}
          />{" "}
          or call me on{" "}
          <Blank
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="phone (optional)"
            label="Your phone number (optional)"
            autoComplete="tel-national"
            invalid={!!errors.phone}
          />
          .
        </p>
      </div>

      <label className="mt-8 block">
        <span className="fx-display text-[clamp(1.1rem,2vw,1.35rem)] font-semibold text-[#0d2340]">
          Here&apos;s a little more about it:
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Your idea, goals, timeline, anything that helps…"
          className="ct-lines fx-body mt-2 block w-full resize-none bg-transparent text-base text-[#0d2340] outline-none placeholder:text-[#0d2340]/30"
        />
      </label>

      {(errors.name || errors.email || errors.phone || errors.general) && (
        <ul role="alert" className="fx-body mt-6 space-y-1 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {[errors.name, errors.email, errors.phone, errors.general].filter(Boolean).map((m) => (
            <li key={m}>• {m}</li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="ct-hand text-2xl text-[#0d2340]/60">Thanks — talk soon! ✌️</p>
        <button
          type="submit"
          disabled={sending}
          data-sending={sending}
          className="ct-send fx-btn-shine fx-body group inline-flex items-center gap-3 rounded-full bg-[#0d2340] py-2 pl-7 pr-2 text-sm font-semibold text-white shadow-[0_16px_36px_-14px_rgba(13,35,64,0.7)] transition-colors duration-300 hover:bg-[#1a9e83] disabled:cursor-wait disabled:opacity-80"
        >
          {sending ? "Sending…" : "Send message"}
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
            <FiSend className="ct-send-plane" size={17} />
          </span>
        </button>
      </div>
    </form>
  );
}
