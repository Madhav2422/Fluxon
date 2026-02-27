"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLinksProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ menuOpen, setMenuOpen }) => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();

  const links = [
    { link: "Home",        section: "home",     href: "/",          isRoute: true  },
    { link: "Services",    section: "services", href: "/services",  isRoute: true  },
    { link: "About",       section: "about",    href: "/about",     isRoute: true  },
    { link: "Our Journey", section: "journey",  href: "/#journey",  isRoute: false },
    { link: "Contact",     section: "contact",  href: "/contact",   isRoute: true  },
  ];

  const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof links[0]) => {
    if (!link.isRoute && pathname === "/") {
      e.preventDefault();
      setMenuOpen(false);
      setTimeout(() => {
        const section = document.getElementById(link.section);
        if (section) {
          const yOffset = -80;
          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 500);
    } else {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      setActiveSection("home");
      return;
    }
  }, [pathname]);

  const isLinkActive = (link: (typeof links)[0]) => {
    if (link.section === "home")     return pathname === "/";
    if (link.section === "services") return pathname === "/services";
    if (link.section === "about")    return pathname === "/about";
    if (link.section === "contact")  return pathname === "/contact";
    return pathname === "/" && activeSection === link.section;
  };

  return (
    <>
      {/* Desktop links */}
      <ul className="hidden lg:flex items-center gap-8">
        {links.map((link, index) => {
          const isActive = isLinkActive(link);
          return (
            <li key={index} className="group flex flex-col items-center">
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 pb-1 font-[family-name:var(--font-dm-sans)] ${
                  isActive
                    ? "text-[#1a9e83]"
                    : "text-[#3d3d3d] hover:text-[#1a9e83]"
                }`}
              >
                {link.link}
              </Link>
              <div
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#1a9e83] w-full"
                    : "bg-[#1a9e83] w-0 group-hover:w-full"
                }`}
              />
            </li>
          );
        })}
      </ul>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul className="lg:hidden flex flex-col gap-1 py-4 px-4 bg-white w-full border-t border-gray-100">
          {links.map((link, index) => {
            const isActive = isLinkActive(link);
            return (
              <li key={index}>
                <Link
                  href={link.href}
                  onClick={(e) => handleMobileClick(e, link)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 font-[family-name:var(--font-dm-sans)] ${
                    isActive
                      ? "text-[#1a9e83] bg-[#f0fffc]"
                      : "text-[#3d3d3d] hover:text-[#1a9e83] hover:bg-[#f0fffc]"
                  }`}
                >
                  {link.link}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default NavbarLinks;