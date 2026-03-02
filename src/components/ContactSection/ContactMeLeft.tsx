import { FiPhone, FiMail, FiLinkedin } from "react-icons/fi";

const ContactLeft: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <h2 className="text-3xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)] mb-3">
          Get in Touch
        </h2>
        <div className="w-12 h-1 bg-[#1a9e83] rounded-full mb-4" />
        <p className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed max-w-sm">
          Reach out to us through any of these channels. We typically respond
          within 24 hours.
        </p>
      </div>

      {/* Contact Items */}
      <div className="flex flex-col gap-5">

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f0fffc] border border-[#1a9e83]/20 flex items-center justify-center shrink-0">
            <FiPhone className="text-[#1a9e83]" size={20} />
          </div>
          <div>
            <p className="text-[#0d2340] font-semibold font-[family-name:var(--font-dm-sans)] mb-1">Phone</p>
            <a
              href="tel:+917984846312"
              className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-sm hover:text-[#1a9e83] transition-colors duration-200"
            >
              +91 79848 46312
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f0fffc] border border-[#1a9e83]/20 flex items-center justify-center shrink-0">
            <FiMail className="text-[#1a9e83]" size={20} />
          </div>
          <div>
            <p className="text-[#0d2340] font-semibold font-[family-name:var(--font-dm-sans)] mb-1">Email</p>
            <a
              href="mailto:fluxoninfotech@gmail.com"
              className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-sm hover:text-[#1a9e83] transition-colors duration-200"
            >
              fluxoninfotech@gmail.com
            </a>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f0fffc] border border-[#1a9e83]/20 flex items-center justify-center shrink-0">
            <FiLinkedin className="text-[#1a9e83]" size={20} />
          </div>
          <div>
            <p className="text-[#0d2340] font-semibold font-[family-name:var(--font-dm-sans)] mb-1">LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/fluxon-infotech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-sm hover:text-[#1a9e83] transition-colors duration-200"
            >
              Connect with us on LinkedIn →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactLeft;