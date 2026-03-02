import { FiMail, FiPhone, FiLinkedin, FiInstagram } from "react-icons/fi";

const FooterRight: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-white font-semibold text-sm font-[family-name:var(--font-plus-jakarta)] tracking-wide">
        Contact
      </h4>

      {/* Email — clickable row */}
      <a href="mailto:fluxoninfotech@gmail.com" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#1a9e83] transition-colors duration-300">
          <FiMail size={15} className="text-[#a8d5cc] group-hover:text-white transition-colors duration-300" />
        </div>
        <span className="text-[#a8d5cc] text-sm font-[family-name:var(--font-dm-sans)] group-hover:text-white transition-colors duration-300">
          fluxoninfotech@gmail.com
        </span>
      </a>

      {/* Phone — clickable row */}
      <a href="tel:+917984846312" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#1a9e83] transition-colors duration-300">
          <FiPhone size={15} className="text-[#a8d5cc] group-hover:text-white transition-colors duration-300" />
        </div>
        <span className="text-[#a8d5cc] text-sm font-[family-name:var(--font-dm-sans)] group-hover:text-white transition-colors duration-300">
          +91 79848 46312
        </span>
      </a>

      {/* Social icons — LinkedIn, Instagram */}
      <div className="flex items-center gap-3 mt-1">
        <a
          href="https://www.linkedin.com/in/fluxon-infotech"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-10 h-10 rounded-full bg-[#1a9e83] flex items-center justify-center text-white hover:bg-white hover:text-[#1a9e83] hover:scale-110 transition-all duration-300 shadow-md"
        >
          <FiLinkedin size={17} />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/fluxoninfotech?igsh=OTk3ZGpmd2ppbHRl&utm_source=ig_contact_invite"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-10 h-10 rounded-full bg-[#1a9e83] flex items-center justify-center text-white hover:bg-white hover:text-[#1a9e83] hover:scale-110 transition-all duration-300 shadow-md"
        >
          <FiInstagram size={17} />
        </a>
      </div>
    </div>
  );
};

export default FooterRight;