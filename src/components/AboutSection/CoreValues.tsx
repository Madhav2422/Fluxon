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
  return (
    <section className="w-full bg-white py-16 px-8 md:px-16 border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
            Our Core <span className="text-[#1a9e83]">Values</span>
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col items-center text-center gap-4">
              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full bg-[#f0fffc] border border-[#1a9e83]/20 flex items-center justify-center">
                {v.icon}
              </div>
              <h3 className="text-base font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
                {v.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
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