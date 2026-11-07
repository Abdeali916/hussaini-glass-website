import { MessageCircle, Phone } from "lucide-react";
import { waLink, telLink, defaultWhatsAppMessage } from "../data/business";

export default function ProjectCTA() {
  return (
    <section className="bg-mist border-y border-line">
      <div className="container-content py-16 text-center">
        <h2 className="text-[26px] sm:text-[30px] font-display max-w-md mx-auto">
          Have a project in mind?
        </h2>
        <p className="mt-3 text-[15px] text-ink/60 max-w-sm mx-auto">
          Tell us what you're looking for and let's discuss your requirements.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={waLink(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" className="btn-primary">
            <MessageCircle size={17} strokeWidth={1.75} />
            WhatsApp Us
          </a>
          <a href={telLink()} className="btn-dark">
            <Phone size={17} strokeWidth={1.75} />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
