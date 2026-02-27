"use client";
import Link from "next/link";

const HeroSectionLeft: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center gap-7 max-w-3xl mx-auto">

      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 border border-[#1a9e83]/30 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm"
        style={{ animation: "fadeIn 0.6s ease-out backwards" }}
      >
        <span className="w-2 h-2 rounded-full bg-[#1a9e83] animate-pulse-ring inline-block" />
        <span className="text-sm text-[#1a9e83] font-medium font-[family-name:var(--font-dm-sans)]">
          IT Solutions That Drive Growth
        </span>
      </div>

      {/* Heading — exactly 2 lines */}
      <div style={{ animation: "fadeInDown 0.8s ease-out 0.15s backwards" }}>
        <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
          Transforming Ideas Into
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#1a9e83] font-[family-name:var(--font-plus-jakarta)] mt-1">
          Digital Reality
        </h1>
      </div>

      {/* Description */}
      <p
        className="text-gray-500 text-base md:text-lg leading-relaxed font-[family-name:var(--font-dm-sans)] max-w-xl"
        style={{ animation: "fadeIn 0.8s ease-out 0.3s backwards" }}
      >
        Fluxon Infotech delivers end-to-end IT services, from software
        development to cloud infrastructure, tailored to your business needs.
        We build scalable digital solutions that help businesses grow faster
        and operate smarter. Partner with us to turn your vision into a
        competitive advantage.
      </p>

      {/* CTA Buttons */}
      <div
        className="flex flex-wrap justify-center gap-4 mt-1"
        style={{ animation: "fadeInUp 0.8s ease-out 0.45s backwards" }}
      >
        <Link
          href="/#services"
          className="flex items-center gap-2 bg-[#1a9e83] text-[#f0fffc] font-semibold px-8 py-3.5 rounded-md hover:bg-[#157a66] transition-all duration-300 shadow-md font-[family-name:var(--font-dm-sans)] text-sm tracking-wide"
        >
          Our Services
          <span className="text-base">→</span>
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-2 border-2 border-[#1a9e83] text-[#1a9e83] font-semibold px-8 py-3.5 rounded-md hover:bg-[#f0fffc] transition-all duration-300 font-[family-name:var(--font-dm-sans)] text-sm tracking-wide"
        >
          Contact Us
        </Link>
      </div>

    </div>
  );
};

export default HeroSectionLeft;