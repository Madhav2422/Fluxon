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

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [visible, setVisible] = useState(false);

  // Auto-disappear success/error message
  useEffect(() => {
    if (status === "success" || status === "error") {
      setVisible(true);
      const fadeOut = setTimeout(() => setVisible(false), 3500);
      const reset = setTimeout(() => setStatus("idle"), 4000);
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
  
    let newErrors = { email: "", phone: "" };
  
    // Required fields check
    if (!form.fullName || !form.email || !form.subject) {
      setStatus("error");
      return;
    }
  
    // ✅ Professional Email Validation
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
  
    // ✅ Phone validation (numbers only & exactly 10 digits)
    if (form.phone) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(form.phone)) {
        newErrors.phone =
          "Phone number must be exactly 10 digits (numbers only).";
      }
    }
  
    // If validation fails
    if (newErrors.email || newErrors.phone) {
      setErrors(newErrors);
      setStatus("error");
      return;
    }
  
    // Clear errors
    setErrors({ email: "", phone: "" });
    setStatus("sending");
  
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone || "Not provided",
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
  
      setStatus("success");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };
  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0d2340] placeholder-gray-400 font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-[#1a9e83] focus:ring-1 focus:ring-[#1a9e83] transition-all duration-200 bg-white";

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
      {/* Header */}
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
            <label className="text-xs font-semibold text-gray-600">
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
            <label className="text-xs font-semibold text-gray-600">
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
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={form.phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                setForm({ ...form, phone: onlyNums });
              }}
              maxLength={10}
              className={inputClass}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
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
          <label className="text-xs font-semibold text-gray-600">
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

        {/* Success */}
        {status === "success" && (
          <div
            className={`flex items-center gap-2 bg-[#f0fffc] border border-[#1a9e83]/30 text-[#1a9e83] text-sm px-4 py-3 rounded-lg transition-opacity duration-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            ✓ Message sent! We'll get back to you shortly.
          </div>
        )}

        {/* Error */}
        {status === "error" && !errors.email && !errors.phone && (
          <div
            className={`flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg transition-opacity duration-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            ✗ Please fill required fields correctly.
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          className={`w-full text-white font-semibold py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            status === "sending"
              ? "bg-[#1a9e83]/60 cursor-not-allowed"
              : "bg-[#1a9e83] hover:bg-[#157a66]"
          }`}
        >
          {status === "sending" ? "Sending..." : "Send Message →"}
        </button>
      </div>
    </div>
  );
};

export default ContactRight;