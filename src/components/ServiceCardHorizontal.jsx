import { MessageCircle, ArrowRight } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { waLink, serviceWhatsAppMessage } from "../data/business";

// A compact list-style row — used for categories with fewer, denser
// items (e.g. Aluminium & Metal Works) so the page doesn't repeat the
// same card shape everywhere.
export default function ServiceCardHorizontal({ service, onOpen }) {
  return (
    <div className="group flex gap-5 border border-line bg-white p-4 sm:p-5">
      <button onClick={() => onOpen(service)} className="shrink-0 w-24 h-24 sm:w-28 sm:h-28">
        <ImagePlaceholder
          label={service.name}
          path={service.image}
          src={service.hasPhoto ? service.image : undefined}
          ratio=""
          className="h-full"
        />
      </button>
      <div className="flex-1 min-w-0 flex flex-col">
        <button onClick={() => onOpen(service)} className="text-left">
          <h4 className="text-[17px] font-display leading-snug group-hover:text-steel transition-colors">
            {service.name}
          </h4>
        </button>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/60 line-clamp-2">
          {service.description}
        </p>
        <div className="mt-auto pt-3 flex items-center gap-4">
          <a
            href={waLink(serviceWhatsAppMessage(service.name))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-whatsapp font-medium hover:underline underline-offset-4"
          >
            <MessageCircle size={14} strokeWidth={1.75} />
            Enquire
          </a>
          <button
            onClick={() => onOpen(service)}
            className="inline-flex items-center gap-1 text-[12.5px] text-ink/55 hover:text-ink"
          >
            Details <ArrowRight size={13} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
