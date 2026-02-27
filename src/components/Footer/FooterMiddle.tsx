import Link from "next/link";

const quickLinks = [
  { label: "Home",     href: "/"        },
  { label: "Services", href: "/#services"},
  { label: "About",    href: "/about"   },
  { label: "Contact",  href: "/contact" },
];

const services = [
  { label: "Web Development",  href: "/services" },
  { label: "Mobile Apps",      href: "/services" },
  { label: "Cloud Solutions",  href: "/services" },
  { label: "IT Consulting",    href: "/services" },
];

const FooterMiddle: React.FC = () => {
  return (
    <>
      {/* Quick Links */}
      <div className="flex flex-col gap-4">
        <h4 className="text-white font-semibold text-sm font-[family-name:var(--font-plus-jakarta)] tracking-wide">
          Quick Links
        </h4>
        <ul className="flex flex-col gap-3">
          {quickLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[#a8d5cc] text-sm font-[family-name:var(--font-dm-sans)] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div className="flex flex-col gap-4">
        <h4 className="text-white font-semibold text-sm font-[family-name:var(--font-plus-jakarta)] tracking-wide">
          Services
        </h4>
        <ul className="flex flex-col gap-3">
          {services.map((s) => (
            <li key={s.label}>
              <Link
                href={s.href}
                className="text-[#a8d5cc] text-sm font-[family-name:var(--font-dm-sans)] hover:text-white transition-colors duration-200"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FooterMiddle;