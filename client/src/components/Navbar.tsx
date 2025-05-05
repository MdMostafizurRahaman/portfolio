import { useEffect, useState } from "react";
import { scrollToElement } from "@/lib/utils";
import ThemeToggle from "@/components/ui/theme-toggle.jsx";

interface NavbarProps {
  activeSection: string | null;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigationLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ];

  const navLinkClasses = (id: string) =>
    `nav-link font-medium transition-colors ${activeSection === id ? "text-primary" : "hover:text-primary"}`;

  return (
    <nav className={`fixed w-full bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 shadow-md backdrop-blur-sm z-50 transition-all duration-300 ${isScrolled ? "py-2 shadow-lg" : "py-3"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold text-primary font-poppins">
          <span className="text-dark dark:text-white">Md.</span>Mostafizur
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={navLinkClasses(link.id)}
              onClick={(e) => {
                e.preventDefault();
                scrollToElement(link.id);
              }}
            >
              {link.name}
            </a>
          ))}
          
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            className="text-dark dark:text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col p-4 space-y-3">
          {navigationLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`py-2 font-medium transition-colors ${
                activeSection === link.id ? "text-primary" : "hover:text-primary"
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToElement(link.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
