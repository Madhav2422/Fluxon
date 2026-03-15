"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden py-16 px-8 md:px-16"
      style={{
        background: "linear-gradient(135deg, #e8f4fd 0%, #e0f7f3 50%, #f0fffc 100%)",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1a9e8330 1.5px, transparent 0)`,
          backgroundSize: "35px 35px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Heading */}
        <div 
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1a9e83] bg-white/80 backdrop-blur-sm border border-[#1a9e83]/30 px-5 py-2 rounded-full mb-4 font-[family-name:var(--font-dm-sans)] shadow-sm">
            OUR PROCESS
          </span>
          <h2 className="text-4xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
            How We <span className="text-[#1a9e83]">Work</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-[family-name:var(--font-dm-sans)] max-w-xl mx-auto mt-3 leading-relaxed">
            A clear, collaborative process that keeps you informed and in control at every stage.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`relative bg-white/90 backdrop-blur-sm rounded-2xl p-7 shadow-sm border border-gray-100 
                         hover:-translate-y-2 hover:shadow-xl hover:shadow-[#1a9e83]/10 hover:border-[#1a9e83]/30
                         active:scale-[0.98] active:shadow-md
                         transition-all duration-500 group
                         ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a9e83]/0 via-[#1a9e83]/0 to-[#1a9e83]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              {/* Mobile tap indicator - top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1a9e83] to-transparent opacity-0 md:hidden group-active:opacity-100 transition-opacity duration-300" />

              {/* Step number — top right watermark */}
              <span className="absolute top-5 right-5 text-4xl font-black text-[#1a9e83]/08 font-[family-name:var(--font-plus-jakarta)] select-none group-hover:text-[#1a9e83]/12 transition-colors duration-300">
                {s.step}
              </span>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon with mobile pulse and desktop hover */}
                <div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0fffc] to-[#e0f7f3] border border-[#1a9e83]/20 
                             flex items-center justify-center mb-5
                             shadow-sm shadow-[#1a9e83]/10
                             group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md group-hover:shadow-[#1a9e83]/20
                             group-active:scale-95 md:group-active:scale-110
                             transition-all duration-500
                             animate-[subtlePulse_3s_ease-in-out_infinite] md:animate-none"
                  style={{
                    animationDelay: `${i * 250}ms`,
                  }}
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)] mb-2 group-hover:text-[#1a9e83] transition-colors duration-300">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
                  {s.description}
                </p>
              </div>

              {/* Connector arrow — hidden on last card */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-[#1a9e83]/30 text-2xl z-10 select-none group-hover:text-[#1a9e83]/50 transition-colors duration-300">
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