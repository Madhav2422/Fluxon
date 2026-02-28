import ServicesPageCards from "./ServicesPageCards";

const ServicesPageMain: React.FC = () => {
  return (
    <section id="services" className="w-full bg-white">

      {/* Header — gradient bg, same as hero/contact/about */}
      <div
        className="w-full relative overflow-hidden pt-16 pb-14 px-8 text-center border-b border-[#1a9e83]/15"
        style={{
          background: "linear-gradient(135deg, #e8f4fd 0%, #e0f7f3 50%, #f0fffc 100%)",
          animation: "fadeInDown 0.6s ease-out both",
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #1a9e8328 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 left-[-100px] w-80 h-80 rounded-full bg-[#1e5fa8]/08 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[-80px] w-[420px] h-[420px] rounded-full bg-[#1a9e83]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1a9e83] bg-white/70 border border-[#1a9e83]/20 px-4 py-1.5 rounded-full mb-4 font-[family-name:var(--font-dm-sans)]">
            What We Offer
          </span>
          <h1 className="text-5xl font-bold font-[family-name:var(--font-plus-jakarta)] text-[#0d2340] mb-4">
            Our <span className="text-[#1a9e83]">Services</span>
          </h1>
          <p className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-base max-w-xl mx-auto leading-relaxed">
            End-to-end IT solutions tailored to your business needs and growth ambitions.
          </p>
        </div>
      </div>

      {/* Cards — white bg */}
      <ServicesPageCards />

    </section>
  );
};

export default ServicesPageMain;