import Image from "next/image";

const NavbarLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Image
        src="/Fluxon_Logo.jpeg"
        alt="Fluxon Infotech Logo"
        width={280}
        height={120}
        className="object-contain h-18 w-auto md:h-16"
      />
    </div>
  );
};

export default NavbarLogo;