import Image from "next/image";

const AboutRight: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Decorative teal border offset */}
      <div className="absolute top-4 right-4 w-full h-full rounded-2xl border-2 border-[#1a9e83]/20 -z-10" />

      {/* Image */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        <Image
          src="/About_Us.jpg"
          alt="About Fluxon Infotech"
          width={600}
          height={500}
          className="w-full h-auto object-cover"
          priority
        />

        {/* Subtle teal overlay on bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d5c4a]/20 to-transparent pointer-events-none" />
      </div>

      {/* Floating badge */}
      <div className="absolute bottom-6 left-6 bg-white rounded-xl px-4 py-3 shadow-md flex items-center gap-3 border border-gray-100">
        <div className="w-9 h-9 rounded-full bg-[#1a9e83] flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold font-[family-name:var(--font-plus-jakarta)]">5+</span>
        </div>
        <div>
          <p className="text-xs font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">Years of Excellence</p>
          <p className="text-[10px] text-gray-400 font-[family-name:var(--font-dm-sans)]">Delivering IT Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default AboutRight;