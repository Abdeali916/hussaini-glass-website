import { MessageCircle, Check } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { waLink, serviceWhatsAppMessage } from "../data/business";

// A single, full-width feature treatment — used for a category with
// exactly one service (Commercial & Exterior / ACP Works) so it reads
// as a deliberate spotlight rather than a lonely small card.
export default function ServiceFeatureBanner({ service, onOpen }) {
  return (
    <div className="grid lg:grid-cols-2 border border-line bg-white overflow-hidden">
      <button onClick={() => onOpen(service)} className="block h-64 lg:h-full">
        <ImagePlaceholder
          label={`${service.name} — project photo`}
          path={service.image}
          src={service.hasPhoto ? service.image : undefined}
          ratio=""
          className="h-full"
        />
      </button>
      <div className="p-8 sm:p-10 flex flex-col justify-center">
        <h4 className="text-[26px] sm:text-[28px] font-display leading-tight">
          {service.name}
        </h4>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink/65 max-w-md">
          {service.description}
        </p>
        <ul className="mt-5 space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink/75">
              <Check size={16} strokeWidth={2} className="text-steel mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={waLink(serviceWhatsAppMessage(service.name))}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={17} strokeWidth={1.75} />
            WhatsApp Us
          </a>
          <button onClick={() => onOpen(service)} className="btn-outline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
