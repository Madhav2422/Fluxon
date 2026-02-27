"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "50+", label: "Projects Delivered",  delay: 0   },
  { value: "30+", label: "Happy Clients",        delay: 100 },
  { value: "5+",  label: "Years Experience",     delay: 200 },
  { value: "24/7",label: "Support",              delay: 300 },
];

const StatCard: React.FC<{ value: string; label: string; delay: number; visible: boolean }> = ({
  value,
  label,
  delay,
  visible,
}) => {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (visible && !played) {
      const t = setTimeout(() => setPlayed(true), delay);
      return () => clearTimeout(t);
    }
  }, [visible, played, delay]);

  return (
    <div className="flex flex-col items-center gap-2 group">
      {/* Number with slot-flip reveal */}
      <div className="overflow-hidden h-16 flex items-end justify-center">
        <span
          className={`text-5xl md:text-6xl font-bold text-[#1a9e83] font-[family-name:var(--font-plus-jakarta)] transition-all duration-700 ease-out ${
            played
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {value}
        </span>
      </div>

      {/* Label — fades in slightly after number */}
      <span
        className={`text-sm uppercase tracking-widest text-gray-400 font-[family-name:var(--font-dm-sans)] font-medium transition-all duration-500 ${
          played ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ transitionDelay: `${delay + 150}ms` }}
      >
        {label}
      </span>

      {/* Animated underline accent */}
      <div
        className={`h-[2px] bg-[#1a9e83]/30 rounded-full transition-all duration-700 ${
          played ? "w-10" : "w-0"
        }`}
        style={{ transitionDelay: `${delay + 250}ms` }}
      />
    </div>
  );
};

const StatsMain: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small mount delay ensures the observer never fires on initial render
    // before the user has actually scrolled to the section
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setVisible(true); },
        {
          threshold: 0.15,       // lower = works on smaller mobile viewports
          rootMargin: "0px 0px -60px 0px", // must scroll 60px past top edge
        }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, 300); // wait 300ms after mount before attaching observer

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section ref={ref} className="w-full bg-white py-16 border-y border-gray-100">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsMain;