import { FiSearch, FiLayout, FiCode, FiCheckCircle } from "react-icons/fi";

const steps = [
  {
    step: "01",
    icon: <FiSearch size={24} className="text-[#1a9e83]" />,
    title: "Discovery",
    description:
      "We start by deeply understanding your business, goals, and challenges through detailed consultations and research.",
  },
  {
    step: "02",
    icon: <FiLayout size={24} className="text-[#1a9e83]" />,
    title: "Design",
    description:
      "Our team crafts intuitive wireframes and prototypes — aligned with your brand and optimized for user experience.",
  },
  {
    step: "03",
    icon: <FiCode size={24} className="text-[#1a9e83]" />,
    title: "Build",
    description:
      "We develop your solution using modern, scalable technologies with clean code, regular updates, and full transparency.",
  },
  {
    step: "04",
    icon: <FiCheckCircle size={24} className="text-[#1a9e83]" />,
    title: "Launch",
    description:
      "After thorough testing and your approval, we deploy your product and provide ongoing support to ensure everything runs smoothly.",
  },
];

const HowWeWork: React.FC = () => {
  return (
    <section
      className="w-full relative overflow-hidden py-16 px-8 md:px-16"
      style={{
        background: "linear-gradient(135deg, #e8f4fd 0%, #e0f7f3 50%, #f0fffc 100%)",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #1a9e8322 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1a9e83] bg-white/70 border border-[#1a9e83]/20 px-4 py-1.5 rounded-full mb-4 font-[family-name:var(--font-dm-sans)]">
            Our Process
          </span>
          <h2 className="text-4xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
            How We <span className="text-[#1a9e83]">Work</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-[family-name:var(--font-dm-sans)] max-w-xl mx-auto mt-3 leading-relaxed">
            A clear, collaborative process that keeps you informed and in control at every stage.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-lg hover:border-[#1a9e83]/20 transition-all duration-300 group"
            >
              {/* Step number — top right watermark */}
              <span className="absolute top-5 right-5 text-4xl font-black text-[#1a9e83]/08 font-[family-name:var(--font-plus-jakarta)] select-none">
                {s.step}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#f0fffc] border border-[#1a9e83]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)] mb-2">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {s.description}
              </p>

              {/* Connector arrow — hidden on last card */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-[#1a9e83]/30 text-xl z-10 select-none">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;