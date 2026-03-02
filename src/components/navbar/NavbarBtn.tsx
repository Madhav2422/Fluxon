"use client";

import Link from "next/link";

interface NavbarBtnProps {
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarBtn: React.FC<NavbarBtnProps> = ({ setMenuOpen }) => {
  return (
    <Link
      href="/contact"
      onClick={() => setMenuOpen && setMenuOpen(false)}
      className="bg-[#1a9e83] text-[#f0fffc] font-semibold px-6 py-2.5 rounded-md hover:bg-[#157a66] transition-all duration-300 shadow-sm text-sm tracking-wide whitespace-nowrap font-[family-name:var(--font-dm-sans)]"
    >
      Get a Quote
    </Link>
  );
};

export default NavbarBtn;