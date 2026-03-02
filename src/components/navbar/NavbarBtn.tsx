import Link from "next/link";

const NavbarBtn: React.FC = () => {
  return (
    <Link
      href="/contact"
      className="bg-[#1a9e83] text-[#f0fffc] font-semibold px-6 py-2.5 rounded-md hover:bg-[#157a66] transition-all duration-300 shadow-sm text-sm tracking-wide whitespace-nowrap font-[family-name:var(--font-dm-sans)]"
    >
      Get a Quote
    </Link>
  );
};

export default NavbarBtn;