import { MessageCircle } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { waLink, serviceWhatsAppMessage } from "../data/business";

export default function ServiceCard({ service, onOpen, featured = false }) {
  return (
    <div className="group border border-line bg-white flex flex-col h-full hover:shadow-panel transition-shadow">
      <button onClick={() => onOpen(service)} className="block w-full text-left">
        <ImagePlaceholder
          label={`${service.name} — project photo`}
          path={service.image}
          src={service.hasPhoto ? service.image : undefined}
          ratio={featured ? "aspect-[16/10]" : "aspect-[4/3]"}
        />
      </button>
      <div className={`flex flex-col flex-1 ${featured ? "p-7" : "p-[22px]"}`}>
        <button onClick={() => onOpen(service)} className="text-left">
          <h4 className={`font-display leading-snug group-hover:text-steel transition-colors ${featured ? "text-[22px]" : "text-[18px]"}`}>
            {service.name}
          </h4>
        </button>
        <p className={`mt-2.5 leading-relaxed text-ink/60 flex-1 ${featured ? "text-[15px]" : "text-[14px]"}`}>
          {service.description}
        </p>
        <div className="mt-5 flex items-center gap-4">
          <a
            href={waLink(serviceWhatsAppMessage(service.name))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[13.5px] text-whatsapp font-medium hover:underline underline-offset-4"
          >
            <MessageCircle size={15} strokeWidth={1.75} />
            Enquire on WhatsApp
          </a>
          <button
            onClick={() => onOpen(service)}
            className="text-[13.5px] text-ink/55 hover:text-ink underline underline-offset-4"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
