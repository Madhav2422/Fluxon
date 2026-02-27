import Link from "next/link";

const CTAMain: React.FC = () => {
  return (
    <section
      className="w-full relative overflow-hidden py-24 px-8 text-center"
      style={{ background: "linear-gradient(135deg, #0d5c4a 0%, #1a9e83 60%, #0e7a63 100%)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff18 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft glow orbs */}
      <div className="absolute top-[-60px] left-[-60px] w-72 h-72 rounded-full bg-white/05 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 rounded-full bg-white/05 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-plus-jakarta)] leading-tight">
          Ready to Elevate Your Business?
        </h2>
        <p className="text-white/75 text-base md:text-lg font-[family-name:var(--font-dm-sans)] leading-relaxed">
          Let's discuss how Fluxon Infotech can help you achieve your
          technology goals.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-white text-[#0d5c4a] font-bold px-9 py-4 rounded-full text-sm tracking-wide font-[family-name:var(--font-dm-sans)] shadow-lg hover:shadow-xl hover:scale-105 hover:bg-[#f0fffc] transition-all duration-300 group mt-2"
        >
          Get Started Today
          <span className="group-hover:translate-x-1 transition-transform duration-200 text-base">→</span>
        </Link>
      </div>
    </section>
  );
};

export default CTAMain;