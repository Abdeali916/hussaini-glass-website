import { categories, services } from "../data/services";
import businessInfo, { telLink, mailLink } from "../data/business";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy text-paper pb-24 lg:pb-0">
      <div className="container-content py-16 grid sm:grid-cols-2 lg:grid-cols-6 gap-10">
        <div className="lg:col-span-2">
          {/* Hussaini Glass logo — on a light plate for legibility against
              the dark footer; the logo file itself is untouched. */}
          <div className="flex items-center gap-3">
            <span className="bg-paper px-2.5 py-2 shrink-0">
              <img src="/images/logo/logo.png" alt="Hussaini Glass" className="h-7 w-auto object-contain" />
            </span>
            <span className="font-display text-[20px]">Hussaini Glass</span>
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-paper/55 max-w-[240px]">
            Glass • Aluminium • Interiors • Kitchens • Wardrobes • Windows • Fabrication
          </p>
        </div>

        {categories.map((cat) => (
          <FooterColumn
            key={cat.id}
            title={cat.name}
            items={services.filter((s) => s.category === cat.id).map((s) => s.name)}
          />
        ))}

        <div>
          <h4 className="text-[12.5px] tracking-wide text-steel-light mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={scrollTo(l.href)} className="text-[13.5px] text-paper/70 hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-content border-t border-white/10 py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-paper/60">
          <a href={telLink()} className="hover:text-paper">{businessInfo.phone}</a>
          <a href={mailLink()} className="hover:text-paper">{businessInfo.email}</a>
          <span>{businessInfo.location}</span>
        </div>
        <p className="text-[12.5px] text-paper/45">
          © 2026 Hussaini Glass. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-[12.5px] tracking-wide text-steel-light mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-[13.5px] text-paper/70">{item}</li>
        ))}
      </ul>
    </div>
  );
}
