import {
  FiCode,
  FiCpu,
  FiCloud,
  FiZap,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import Link from "next/link";

const cards = [
  {
    icon: <FiCode size={26} className="text-white" />,
    title: "Web Development",
    description:
      "Custom web applications built with modern frameworks and scalable architecture.",
  },
  {
    icon: <FiCpu size={26} className="text-white" />,
    title: "AI Solutions",
    description:
      "Intelligent automation and AI-powered tools tailored to streamline your business operations.",
  },
  {
    icon: <FiCloud size={26} className="text-white" />,
    title: "Cloud Solutions",
    description:
      "Cloud infrastructure, migration, and management on AWS, Azure & GCP.",
  },
  {
    icon: <FiSettings size={26} className="text-white" />,
    title: "Automation",
    description:
      "End-to-end process automation to eliminate repetitive tasks and boost operational efficiency.",
  },
  {
    icon: <FiUsers size={26} className="text-white" />,
    title: "IT Consulting",
    description:
      "Strategic technology consulting to accelerate your digital transformation.",
  },
  {
    icon: <FiZap size={26} className="text-white" />,
    title: "DevOps",
    description:
      "CI/CD pipelines, containerization, and infrastructure automation.",
  },
];

const FeaturedServices: React.FC = () => {
  return (
    <section
      id="services"
      className="w-full relative overflow-hidden py-20 px-8 md:px-16"
      style={{
        background: "linear-gradient(135deg, #e8f4fd 0%, #e0f7f3 50%, #f0fffc 100%)",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #1a9e8322 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">

        {/* Heading */}
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100
                         transition-all duration-300 ease-out
                         hover:-translate-y-2 hover:shadow-lg hover:border-[#1a9e83]/20
                         cursor-pointer group"
            >
              <div
                className="w-14 h-14 rounded-xl bg-[#1a9e83] flex items-center justify-center mb-6
                           group-hover:scale-110 transition-transform duration-300"
              >
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)] mb-3">
                {card.title}
              </h3>
              <p className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* View All Services button */}
        <div className="text-center mt-12 mb-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-white border-2 border-[#1a9e83] text-[#1a9e83] font-semibold px-8 py-3.5 rounded-full font-[family-name:var(--font-dm-sans)] text-sm tracking-wide shadow-sm hover:bg-[#1a9e83] hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 group"
          >
            View All Services
            <span className="w-7 h-7 rounded-full bg-[#1a9e83]/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedServices;