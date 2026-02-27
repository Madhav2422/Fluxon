"use client";
import { useState } from "react";

const ContactRight: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(form);
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

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#1a9e83] text-[#f0fffc] font-semibold py-3.5 rounded-lg
                     hover:bg-[#157a66] transition-all duration-300
                     font-[family-name:var(--font-dm-sans)] text-sm tracking-wide
                     flex items-center justify-center gap-2 group"
        >
          Send Message
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </div>
    </div>
  );
};

export default ContactRight;