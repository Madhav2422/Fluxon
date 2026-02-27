import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

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
            <p className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-sm">+91 7984846312</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f0fffc] border border-[#1a9e83]/20 flex items-center justify-center shrink-0">
            <FiMail className="text-[#1a9e83]" size={20} />
          </div>
          <div>
            <p className="text-[#0d2340] font-semibold font-[family-name:var(--font-dm-sans)] mb-1">Email</p>
            <p className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-sm">fluxoninfotech@gmail.com</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f0fffc] border border-[#1a9e83]/20 flex items-center justify-center shrink-0">
            <FiMapPin className="text-[#1a9e83]" size={20} />
          </div>
          <div>
            <p className="text-[#0d2340] font-semibold font-[family-name:var(--font-dm-sans)] mb-1">Office</p>
            <p className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed max-w-[240px]">
              Fluxon Infotech, Uran, Maharashtra, India — 400702
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactLeft;