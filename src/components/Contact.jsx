import { Phone, MessageCircle, Mail, MapPin, Navigation } from "lucide-react";
import businessInfo, { waLink, telLink, mailLink, defaultWhatsAppMessage } from "../data/business";

export default function Contact() {
  return (
    <section id="contact" className="bg-ink text-paper scroll-mt-16">
      <div className="container-content py-20 lg:py-28">
        <div className="max-w-xl">
          <p className="eyebrow text-steel-light mb-3 font-medium">Contact</p>
          <h2 className="text-[32px] sm:text-[38px] leading-[1.15] text-white">
            Let's discuss your requirement
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ContactItem icon={Phone} label="Phone" value={businessInfo.phone} />
          <ContactItem icon={MessageCircle} label="WhatsApp" value="Chat With Us" />
          <ContactItem icon={Mail} label="Email" value={businessInfo.email} />
          <ContactItem
            icon={MapPin}
            label="Address"
            value={businessInfo.address}
            subvalue={businessInfo.landmark}
          />
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href={waLink(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" className="btn-primary">
            <MessageCircle size={17} strokeWidth={1.75} />
            Chat on WhatsApp
          </a>
          <a href={telLink()} className="btn-outline-light">
            <Phone size={16} strokeWidth={1.75} />
            Call Us
          </a>
          <a
            href={businessInfo.googleMapsUrl?.startsWith("YOUR_") ? undefined : businessInfo.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-outline-light"
          >
            <Navigation size={16} strokeWidth={1.75} />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value, subvalue }) {
  const isPlaceholder = typeof value === "string" && value.startsWith("YOUR_");
  return (
    <div className="border-t border-white/15 pt-5">
      <Icon size={18} strokeWidth={1.5} className="text-steel-light mb-4" />
      <p className="text-[12px] text-paper/50 mb-1">{label}</p>
      <p className={`text-[14.5px] leading-snug ${isPlaceholder ? "text-paper/40 italic" : "text-paper"}`}>
        {value}
      </p>
      {subvalue && !isPlaceholder && (
        <p className="text-[12.5px] text-paper/50 mt-1">{subvalue}</p>
      )}
    </div>
  );
}
