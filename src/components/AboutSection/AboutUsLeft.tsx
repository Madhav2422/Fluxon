"use client";

import { useEffect, useRef, useState } from "react";

const AboutLeft: React.FC = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col gap-6">
      {/* Section label */}
      <div 
        className={`flex items-center gap-3 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <div className="w-1 h-7 bg-[#1a9e83] rounded-full" />
        <h2 className="text-3xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
          Our Story
        </h2>
      </div>

      {/* Paragraphs with staggered animation */}
      <div className="flex flex-col gap-5 text-gray-600 text-base leading-relaxed font-[family-name:var(--font-dm-sans)]">
        <p 
          className={`transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Fluxon Infotech was founded with a simple yet powerful vision — to
          empower businesses through technology. Starting as a small team of
          passionate developers, we've grown into a full-service IT company
          serving clients across industries.
        </p>
        <p 
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          We believe technology should be an enabler, not a barrier. Our team
          combines deep technical expertise with a genuine understanding of
          business challenges to deliver solutions that make a real impact.
        </p>
        <p 
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          From startups to enterprises, we've helped organizations modernize
          their operations, build digital products, and scale with confidence.
        </p>
      </div>

      {/* Values chips with staggered animation */}
      <div 
        className={`flex flex-wrap gap-2 mt-2 transition-all duration-700 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {["Innovation", "Transparency", "Reliability", "Client-First"].map((v, i) => (
          <span
            key={v}
            className="text-xs font-semibold text-[#1a9e83] bg-[#f0fffc] border border-[#1a9e83]/20 px-3 py-1.5 rounded-full font-[family-name:var(--font-dm-sans)]
                       hover:bg-[#1a9e83] hover:text-white hover:shadow-sm hover:scale-105
                       transition-all duration-300 cursor-default"
            style={{
              transitionDelay: `${i * 50}ms`,
            }}
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AboutLeft;