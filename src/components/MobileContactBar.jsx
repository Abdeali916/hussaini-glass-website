import { Phone, MessageCircle, Navigation } from "lucide-react";
import businessInfo, { waLink, telLink, defaultWhatsAppMessage } from "../data/business";

const isPlaceholder = (v) => !v || v.startsWith("YOUR_");

// Fixed bottom action bar, visible only on mobile, stays in view while
// scrolling so Call / WhatsApp / Directions are always one tap away.
export default function MobileContactBar() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-ink border-t border-white/10 flex">
      <a href={telLink()} className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-paper/90">
        <Phone size={18} strokeWidth={1.5} />
        <span className="text-[11px]">Call</span>
      </a>
      <a
        href={waLink(defaultWhatsAppMessage)}
        target="_blank"
        rel="noreferrer"
        className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-paper/90 border-x border-white/10"
      >
        <MessageCircle size={18} strokeWidth={1.5} />
        <span className="text-[11px]">WhatsApp</span>
      </a>
      <a
        href={isPlaceholder(businessInfo.googleMapsUrl) ? undefined : businessInfo.googleMapsUrl}
        target="_blank"
        rel="noreferrer"
        aria-disabled={isPlaceholder(businessInfo.googleMapsUrl)}
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-paper/90 ${isPlaceholder(businessInfo.googleMapsUrl) ? "opacity-40 pointer-events-none" : ""}`}
      >
        <Navigation size={18} strokeWidth={1.5} />
        <span className="text-[11px]">Directions</span>
      </a>
    </nav>
  );
}
