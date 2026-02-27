import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const FooterRight: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-white font-semibold text-sm font-[family-name:var(--font-plus-jakarta)] tracking-wide">
        Contact
      </h4>
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
    </div>
  );
};

export default FooterRight;