"use client";
import { useState, useEffect } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarBtn from "./NavbarBtn";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

const NavbarMain: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b transition-shadow duration-300 ${
        scrolled ? "shadow-md border-gray-200" : "shadow-sm border-gray-100"
      }`}
    >
      {/* Desktop */}
      <nav className="hidden lg:flex items-center justify-between max-w-[1280px] mx-auto px-8 h-[90px]">
        <NavbarLogo />
        <NavbarLinks menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <NavbarBtn />
      </nav>

      {/* Mobile */}
      <div className="lg:hidden relative">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 h-20 bg-white relative z-50">
          <NavbarLogo />
          <button
            onClick={toggleMenu}
            className="text-[#1a9e83] p-2 rounded-md hover:bg-[#f0fffc] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <IoCloseOutline size={26} />
            ) : (
              <GiHamburgerMenu size={22} />
            )}
          </button>
        </div>

        {/* Animated Dropdown */}
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100 origin-top transform transition-all duration-300 ease-in-out z-40 ${
            menuOpen
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0 pointer-events-none"
          }`}
        >
          <NavbarLinks menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <div className="px-4 pb-4 pt-4 bg-white border-t border-gray-100 mt-2">
            <NavbarBtn />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarMain;