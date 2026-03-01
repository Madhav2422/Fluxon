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
  return (
    <div className="max-w-[1280px] mx-auto px-8 md:px-16 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1a9e83]/20 hover:-translate-y-1 transition-all duration-300 group flex flex-col gap-4"
          >
            {/* Icon + Title row */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#f0fffc] border border-[#1a9e83]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>
              <h3 className="text-base font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
                {s.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
              {s.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#1a9e83] bg-[#f0fffc] border border-[#1a9e83]/15 px-3 py-1 rounded-full font-[family-name:var(--font-dm-sans)] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPageCards;