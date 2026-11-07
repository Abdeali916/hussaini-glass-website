import { MessageCircle } from "lucide-react";
import { waLink, defaultWhatsAppMessage } from "../data/business";

// Floating WhatsApp button, fixed bottom-right on all pages.
// Lifted above the mobile bottom action bar on small screens.
export default function WhatsAppButton() {
  return (
    <a
      href={waLink(defaultWhatsAppMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Hussaini Glass on WhatsApp"
      className="fixed right-5 z-40 bottom-[86px] lg:bottom-6 w-14 h-14 rounded-full bg-whatsapp
                 text-white flex items-center justify-center shadow-panel hover:bg-[#1fb857]
                 transition-colors"
    >
      <MessageCircle size={26} strokeWidth={1.75} />
    </a>
  );
}
