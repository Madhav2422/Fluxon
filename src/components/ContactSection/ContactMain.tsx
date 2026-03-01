import ContactLeft from "./ContactMeLeft";
import ContactRight from "./ContactMeRight";

const ContactMain: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-white -mt-[90px]">

      <div
        className="w-full relative overflow-hidden pt-[calc(90px+4rem)] pb-16 px-8 text-center border-b border-[#1a9e83]/15"
        style={{
          background: "linear-gradient(135deg, #e8f4fd 0%, #e0f7f3 50%, #f0fffc 100%)",
          animation: "fadeInDown 0.6s ease-out both",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #1a9e8328 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 left-[-100px] w-80 h-80 rounded-full bg-[#1e5fa8]/08 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[-80px] w-[420px] h-[420px] rounded-full bg-[#1a9e83]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1a9e83] bg-white/70 border border-[#1a9e83]/20 px-4 py-1.5 rounded-full mb-4 font-[family-name:var(--font-dm-sans)]">
            Let's Talk
          </span>
          <h2 className="text-5xl font-bold font-[family-name:var(--font-plus-jakarta)] text-[#0d2340] mb-4">
            Contact <span className="text-[#1a9e83]">Us</span>
          </h2>
          <p className="text-gray-500 font-[family-name:var(--font-dm-sans)] text-base max-w-xl mx-auto leading-relaxed">
            Have a project in mind? Let's talk about how we can help you build
            something great.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ContactLeft />
          <ContactRight />
        </div>
      </div>

    </section>
  );
};

export default ContactMain;