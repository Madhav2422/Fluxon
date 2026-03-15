"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiCode,
  FiCpu,
  FiCloud,
  FiSettings,
  FiUsers,
  FiZap,
} from "react-icons/fi";

const services = [
  {
    icon: <FiCode size={22} className="text-[#1a9e83]" />,
    title: "Web Development",
    description:
      "Full-stack web applications using React, Node.js, and modern frameworks. We build responsive, fast, and SEO-optimized websites and web apps.",
    tags: ["Custom Web Apps", "E-Commerce", "CMS Solutions", "API Development"],
  },
  {
    icon: <FiCpu size={22} className="text-[#1a9e83]" />,
    title: "AI Solutions",
    description:
      "Intelligent AI-powered tools and integrations tailored to automate workflows, enhance decisions, and drive smarter business outcomes.",
    tags: ["Machine Learning", "AI Chatbots", "Predictive Analytics", "LLM Integration"],
  },
  {
    icon: <FiCloud size={22} className="text-[#1a9e83]" />,
    title: "Cloud Solutions",
    description:
      "Cloud migration, architecture design, and managed services across AWS, Azure, and Google Cloud.",
    tags: ["Cloud Migration", "Infrastructure Setup", "Cost Optimization", "24/7 Monitoring"],
  },
  {
    icon: <FiSettings size={22} className="text-[#1a9e83]" />,
    title: "Automation",
    description:
      "End-to-end process automation to eliminate repetitive tasks, reduce errors, and boost your team's operational efficiency.",
    tags: ["Workflow Automation", "RPA", "API Integration", "Process Optimization"],
  },
  {
    icon: <FiUsers size={22} className="text-[#1a9e83]" />,
    title: "IT Consulting",
    description:
      "Strategic technology consulting to align IT with your business objectives and drive digital transformation.",
    tags: ["Digital Strategy", "Tech Roadmaps", "Process Automation"],
  },
  {
    icon: <FiZap size={22} className="text-[#1a9e83]" />,
    title: "DevOps & Automation",
    description:
      "Streamline your development and deployment with CI/CD pipelines, containers, and infrastructure as code.",
    tags: ["CI/CD Pipelines", "Docker & Kubernetes", "Infrastructure as Code", "Monitoring"],
  },
];

const ServicesPageCards: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardsRef} className="max-w-[1280px] mx-auto px-8 md:px-16 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`bg-white rounded-2xl p-7 border border-gray-100 shadow-sm 
                       hover:shadow-xl hover:shadow-[#1a9e83]/10 hover:border-[#1a9e83]/30 hover:-translate-y-2
                       active:scale-98 active:shadow-md
                       transition-all duration-500 ease-out
                       group flex flex-col gap-4 relative overflow-hidden
                       ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{
              transitionDelay: isVisible ? `${i * 80}ms` : "0ms",
            }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a9e83]/0 via-[#1a9e83]/0 to-[#1a9e83]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

            {/* Mobile tap indicator - top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1a9e83] to-transparent opacity-0 md:hidden group-active:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon + Title row */}
              <div className="flex items-center gap-4 mb-1">
                <div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0fffc] to-[#e0f7f3] border border-[#1a9e83]/20 
                             flex items-center justify-center shrink-0 
                             shadow-sm shadow-[#1a9e83]/10
                             group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md group-hover:shadow-[#1a9e83]/20
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
                <h3 className="text-lg font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)] group-hover:text-[#1a9e83] transition-colors duration-300">
                  {s.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)] mb-4">
                {s.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="text-xs text-[#1a9e83] bg-[#f0fffc] border border-[#1a9e83]/20 px-3 py-1.5 rounded-full font-[family-name:var(--font-dm-sans)] font-medium
                               hover:bg-[#1a9e83] hover:text-white hover:border-[#1a9e83] hover:shadow-sm
                               transition-all duration-300 cursor-default
                               transform hover:scale-105"
                    style={{
                      transitionDelay: `${idx * 30}ms`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPageCards;