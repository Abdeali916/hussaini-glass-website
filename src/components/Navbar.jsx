import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import businessInfo, { waLink, telLink, defaultWhatsAppMessage } from "../data/business";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 border-b ${
        scrolled ? "bg-paper/95 backdrop-blur border-line" : "bg-paper/40 backdrop-blur-sm border-ink/5"
      }`}
    >
      <div className="container-content flex items-center justify-between h-[76px]">
        {/* Hussaini Glass logo — uploaded logo file, used as-is */}
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNav("#home"); }} className="flex items-center gap-3 shrink-0">
          <img
            src="/images/logo/logo.png"
            alt="Hussaini Glass"
            className="h-10 sm:h-11 w-auto object-contain"
          />
          <span className="font-display text-[20px] leading-none tracking-tight">
            Hussaini Glass
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              className="text-[15px] font-medium text-ink/75 hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={telLink()} className="btn-outline !py-2.5 !px-4">
            <Phone size={16} strokeWidth={1.75} />
            Call Now
          </a>
          <a href={waLink(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" className="btn-primary !py-2.5">
            <MessageCircle size={16} strokeWidth={1.75} />
            WhatsApp Us
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-paper border-t border-line">
          <nav className="container-content flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="py-3 text-[16px] border-b border-line last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-4">
              <a href={telLink()} className="btn-outline flex-1">
                <Phone size={16} /> Call
              </a>
              <a href={waLink(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" className="btn-primary flex-1">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
