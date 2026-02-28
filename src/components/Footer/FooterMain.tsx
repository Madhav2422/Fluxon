import FooterLeft from "./FooterLeft";
import FooterMiddle from "./FooterMiddle";
import FooterRight from "./FooterRight";

const FooterMain: React.FC = () => {
  return (
    <footer
      className="w-full border-t-2 border-[#1a9e83]/30"
      style={{ background: "#125740" }}
    >
      {/* Main grid */}
      <div className="max-w-[1280px] mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <FooterLeft />
          <FooterMiddle />
          <FooterRight />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Copyright */}
      <div className="max-w-[1280px] mx-auto px-8 md:px-16 py-5 text-center">
        <p className="text-[#a8d5cc]/60 text-sm font-[family-name:var(--font-dm-sans)]">
          © {new Date().getFullYear()} Fluxon Infotech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterMain;