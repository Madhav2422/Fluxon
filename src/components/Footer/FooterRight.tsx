import { FiMail, FiPhone, FiLinkedin, FiInstagram } from "react-icons/fi";

const FooterRight: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-white font-semibold text-sm font-[family-name:var(--font-plus-jakarta)] tracking-wide">
        Contact
      </h4>

      {/* Contact details */}
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-2.5 text-[#a8d5cc] text-sm font-[family-name:var(--font-dm-sans)]">
          <FiMail size={15} className="shrink-0 text-[#1a9e83]" />
          fluxoninfotech@gmail.com
        </li>
        <li className="flex items-center gap-2.5 text-[#a8d5cc] text-sm font-[family-name:var(--font-dm-sans)]">
          <FiPhone size={15} className="shrink-0 text-[#1a9e83]" />
          +91 7984846312
        </li>
      </ul>

      {/* Social icons */}
      <div className="flex items-center gap-3 mt-1">
        {/* Email */}
        <a
          href="mailto:fluxoninfotech@gmail.com"
          aria-label="Email"
          className="w-10 h-10 rounded-full bg-[#1a9e83] border border-[#1a9e83] flex items-center justify-center text-white hover:bg-white hover:text-[#1a9e83] hover:scale-110 transition-all duration-300 shadow-md"
        >
          <FiMail size={17} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/fluxon-infotech"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-10 h-10 rounded-full bg-[#1a9e83] border border-[#1a9e83] flex items-center justify-center text-white hover:bg-white hover:text-[#1a9e83] hover:scale-110 transition-all duration-300 shadow-md"
        >
          <FiLinkedin size={17} />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/fluxoninfotech?igsh=OTk3ZGpmd2ppbHRl&utm_source=ig_contact_invite"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-10 h-10 rounded-full bg-[#1a9e83] border border-[#1a9e83] flex items-center justify-center text-white hover:bg-white hover:text-[#1a9e83] hover:scale-110 transition-all duration-300 shadow-md"
        >
          <FiInstagram size={17} />
        </a>
      </div>
    </div>
  );
};

export default FooterRight;