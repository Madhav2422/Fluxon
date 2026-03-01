"use client";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactRight: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [visible, setVisible] = useState(false);

  // Auto-disappear after 4 seconds with fade-out at 3.5s
  useEffect(() => {
    if (status === "success" || status === "error") {
      setVisible(true);
      const fadeOut = setTimeout(() => setVisible(false), 3500);
      const reset   = setTimeout(() => setStatus("idle"), 4000);
      return () => {
        clearTimeout(fadeOut);
        clearTimeout(reset);
      };
    }
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.subject) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          fullName: form.fullName,
          email:    form.email,
          phone:    form.phone || "Not provided",
          subject:  form.subject,
          message:  form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0d2340] placeholder-gray-400 font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-[#1a9e83] focus:ring-1 focus:ring-[#1a9e83] transition-all duration-200 bg-white";

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-7 bg-[#1a9e83] rounded-full" />
        <h3 className="text-xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
          Send Us a Message
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 font-[family-name:var(--font-dm-sans)]">
              Full Name <span className="text-[#1a9e83]">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Your name"
              value={form.fullName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 font-[family-name:var(--font-dm-sans)]">
              Email Address <span className="text-[#1a9e83]">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 font-[family-name:var(--font-dm-sans)]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 font-[family-name:var(--font-dm-sans)]">
              Subject <span className="text-[#1a9e83]">*</span>
            </label>
            <input
              type="text"
              name="subject"
              placeholder="How can we help?"
              value={form.subject}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 font-[family-name:var(--font-dm-sans)]">
            Message
          </label>
          <textarea
            name="message"
            placeholder="Tell us more about your project..."
            value={form.message}
            onChange={handleChange}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Success / Error — fades out automatically */}
        {status === "success" && (
          <div
            className={`flex items-center gap-2 bg-[#f0fffc] border border-[#1a9e83]/30 text-[#1a9e83] text-sm px-4 py-3 rounded-lg font-[family-name:var(--font-dm-sans)] transition-opacity duration-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            ✓ Message sent! We'll get back to you shortly.
          </div>
        )}

        {status === "error" && (
          <div
            className={`flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg font-[family-name:var(--font-dm-sans)] transition-opacity duration-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            ✗ Something went wrong. Please fill required fields and try again.
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          className={`w-full text-[#f0fffc] font-semibold py-3.5 rounded-lg
                     transition-all duration-300
                     font-[family-name:var(--font-dm-sans)] text-sm tracking-wide
                     flex items-center justify-center gap-2 group
                     ${status === "sending"
                       ? "bg-[#1a9e83]/60 cursor-not-allowed"
                       : "bg-[#1a9e83] hover:bg-[#157a66]"
                     }`}
        >
          {status === "sending" ? (
            <>
              <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactRight;