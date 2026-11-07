import { MessageCircle, Phone, ArrowDown } from "lucide-react";
import HeroVisual from "./HeroVisual";
import businessInfo, { waLink, telLink, defaultWhatsAppMessage } from "../data/business";

export default function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-b from-mist to-paper pt-[76px] overflow-hidden">
      {/* faint architectural grid, evokes glass panelling / mullions */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#12161C" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div className="container-content relative grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-10 items-center py-14 lg:py-0 lg:min-h-[88vh]">
        <div className="max-w-[600px]">
          <p className="eyebrow mb-5 font-medium">{businessInfo.location}</p>
          <h1 className="text-[42px] sm:text-[52px] lg:text-[62px] leading-[1.06] font-normal text-ink">
            Complete Glass, Interior &amp; Fabrication Solutions
          </h1>
          <p className="mt-7 text-[17.5px] sm:text-[18.5px] leading-relaxed text-ink/70 max-w-[510px]">
            From modular kitchens and wardrobes to glass works, windows, doors,
            railings, aluminium works and office interiors — Hussaini Glass
            provides customized solutions for homes and businesses in
            Hyderabad.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3.5">
            <a href={waLink(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" className="btn-primary !text-[16px] !px-7 !py-3.5">
              <MessageCircle size={19} strokeWidth={1.75} />
              WhatsApp Us
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-dark !text-[16px] !px-7 !py-3.5"
            >
              Explore Our Services
            </a>
            <a href={telLink()} className="inline-flex items-center gap-2 text-[15.5px] font-medium text-ink hover:text-steel px-2 py-3.5">
              <Phone size={18} strokeWidth={1.75} />
              Call Now
            </a>
          </div>
        </div>

        <div className="relative h-[340px] sm:h-[440px] lg:h-[580px]">
          <HeroVisual />
          <div className="hidden lg:block absolute -bottom-5 -left-8 w-24 h-24 border border-steel-light/40 -z-10" />
        </div>
      </div>

      <a
        href="#contact-bar"
        onClick={(e) => { e.preventDefault(); document.querySelector("#contact-bar")?.scrollIntoView({ behavior: "smooth" }); }}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 text-[12px] text-ink/40 hover:text-ink/70 transition-colors"
      >
        <ArrowDown size={16} strokeWidth={1.5} />
      </a>
    </section>
  );
}
