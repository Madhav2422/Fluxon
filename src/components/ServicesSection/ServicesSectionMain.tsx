import ServicesPageCards from "./ServicesPageCards";

const ServicesPageMain: React.FC = () => {
  return (
    <section
      id="services"
      className="w-full relative overflow-hidden py-20 px-8 md:px-16"
      style={{
        background: "linear-gradient(135deg, #e8f4fd 0%, #e0f7f3 50%, #f0fffc 100%)",
      }}
    >
      {/* Dot grid — contained inside relative section */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #1a9e8322 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* All content above the dot grid */}
      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Section heading */}
        <div
          className="text-center mb-12"
          style={{ animation: "fadeInDown 0.6s ease-out both" }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1a9e83] bg-white/70 border border-[#1a9e83]/20 px-4 py-1.5 rounded-full mb-4 font-[family-name:var(--font-dm-sans)]">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)] mb-4">
            Our <span className="text-[#1a9e83]">Services</span>
          </h2>
          <p className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-base max-w-xl mx-auto leading-relaxed">
            Comprehensive IT services designed to help your business thrive in
            the digital age.
          </p>
        </div>

        {/* Cards */}
        <ServicesPageCards />
      </div>
    </section>
  );
};

export default ServicesPageMain;