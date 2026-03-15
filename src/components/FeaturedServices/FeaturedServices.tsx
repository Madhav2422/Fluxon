"use client";

import { useEffect, useRef, useState } from "react";
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
      id="services"
      className="w-full relative overflow-hidden py-20 px-8 md:px-16"
      style={{
        background: "linear-gradient(135deg, #e8f4fd 0%, #e0f7f3 50%, #f0fffc 100%)",
      }}
    >
      {/* Enhanced background pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1a9e8322 1.5px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#1a9e83]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1a9e83] bg-white/80 backdrop-blur-sm border border-[#1a9e83]/30 px-5 py-2 rounded-full mb-5 font-[family-name:var(--font-dm-sans)] shadow-sm">
            WHAT WE OFFER
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)] mb-4">
            Our <span className="text-[#1a9e83] relative">
              Services
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M0 4 Q50 0, 100 4 T200 4" stroke="#1a9e83" strokeWidth="2" fill="none" opacity="0.3"/>
              </svg>
            </span>
          </h2>
          <p className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive IT services designed to help your business thrive in
            the digital age.
          </p>
        </div>

        {/* Cards Grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50
                         transition-all duration-500 ease-out
                         hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#1a9e83]/20 hover:border-[#1a9e83]/40
                         active:scale-95 active:shadow-lg
                         cursor-pointer group relative overflow-hidden ${
                           isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                         }`}
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
              }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a9e83]/0 via-[#1a9e83]/0 to-[#1a9e83]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Mobile tap indicator - bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1a9e83] to-transparent opacity-0 md:hidden group-active:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 relative">
                  <div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a9e83] to-[#158f76] flex items-center justify-center
                               shadow-lg shadow-[#1a9e83]/30
                               group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-[#1a9e83]/40
                               group-active:scale-95 md:group-active:scale-110
                               transition-all duration-500
                               animate-[subtlePulse_3s_ease-in-out_infinite] md:animate-none"
                    style={{
                      animationDelay: `${i * 200}ms`,
                    }}
                  >
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                  </div>
                  {/* Animated ring */}
                  <div className="absolute inset-0 w-16 h-16 rounded-2xl border-2 border-[#1a9e83]/20 scale-100 group-hover:scale-125 opacity-100 group-hover:opacity-0 transition-all duration-500" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)] mb-3 group-hover:text-[#1a9e83] transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services button */}
        <div
          className={`text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border-2 border-[#1a9e83] text-[#1a9e83] font-semibold px-8 py-4 rounded-full font-[family-name:var(--font-dm-sans)] text-sm tracking-wide shadow-lg shadow-[#1a9e83]/20 hover:bg-[#1a9e83] hover:text-white hover:shadow-2xl hover:shadow-[#1a9e83]/40 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Animated background on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#1a9e83] to-[#158f76] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
            
            <span className="relative z-10">View All Services</span>
            <span className="relative z-10 w-8 h-8 rounded-full bg-[#1a9e83]/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;