import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import businessInfo, { waLink, telLink, mailLink, defaultWhatsAppMessage } from "../data/business";

const ITEMS = [
  {
    icon: Phone,
    label: "Call Us",
    value: () => businessInfo.phone,
    href: () => telLink(),
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: () => "Chat With Us",
    href: () => waLink(defaultWhatsAppMessage),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: () => businessInfo.email,
    href: () => mailLink(),
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: () => "Hyderabad, Telangana",
    href: () => "#location",
    onClick: (e) => { e.preventDefault(); document.querySelector("#location")?.scrollIntoView({ behavior: "smooth" }); },
  },
];

export default function ContactBar() {
  return (
    <section id="contact-bar" className="bg-navy text-paper border-b border-white/10">
      <div className="container-content grid grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label, value, href, external, onClick }, i) => (
          <a
            key={label}
            href={href()}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            onClick={onClick}
            className={`flex items-center gap-3 py-5 px-1 sm:px-3 group ${
              i < 3 ? "border-r border-white/10" : ""
            } ${i % 2 === 0 ? "" : "lg:border-r"}`}
          >
            <Icon size={19} strokeWidth={1.5} className="text-steel-light shrink-0" />
            <span className="min-w-0">
              <span className="block text-[11.5px] text-paper/55">{label}</span>
              <span className="block text-[14.5px] font-medium truncate group-hover:text-white transition-colors">
                {value()}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
