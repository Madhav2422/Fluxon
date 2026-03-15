"use client";

import { useEffect, useRef, useState } from "react";
import { FiTarget, FiEye, FiHeart, FiAward } from "react-icons/fi";

const values = [
  {
    icon: <FiTarget size={24} className="text-[#1a9e83]" />,
    title: "Innovation",
    description: "We stay at the forefront of technology to deliver modern solutions.",
  },
  {
    icon: <FiEye size={24} className="text-[#1a9e83]" />,
    title: "Transparency",
    description: "Open communication and honest collaboration at every step.",
  },
  {
    icon: <FiHeart size={24} className="text-[#1a9e83]" />,
    title: "Client Focus",
    description: "Your success is our success. We're committed to delivering real value.",
  },
  {
    icon: <FiAward size={24} className="text-[#1a9e83]" />,
    title: "Excellence",
    description: "We hold ourselves to the highest standards of quality and craft.",
  },
];

const CoreValues: React.FC = () => {
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
    <section ref={sectionRef} className="w-full bg-white py-16 px-8 md:px-16 border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
            Our Core <span className="text-[#1a9e83]">Values</span>
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div 
              key={v.title} 
              className={`flex flex-col items-center text-center gap-4 group
                         transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
              }}
            >
              {/* Icon circle with mobile pulse and desktop hover */}
              <div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f0fffc] to-[#e0f7f3] border border-[#1a9e83]/20 
                           flex items-center justify-center
                           shadow-sm shadow-[#1a9e83]/10
                           group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#1a9e83]/20 group-hover:rotate-6
                           group-active:scale-95 md:group-active:scale-110
                           transition-all duration-500
                           animate-[subtlePulse_3s_ease-in-out_infinite] md:animate-none"
                style={{
                  animationDelay: `${i * 300}ms`,
                }}
              >
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {v.icon}
                </div>
              </div>

              <h3 className="text-base font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)] group-hover:text-[#1a9e83] transition-colors duration-300">
                {v.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;