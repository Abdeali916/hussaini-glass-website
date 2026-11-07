import { useEffect } from "react";
import { X, MessageCircle, Check } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { waLink, serviceWhatsAppMessage } from "../data/business";
import { projectsForTag } from "../data/projects";

export default function ServiceDetail({ service, onClose, onRequestQuote }) {
  useEffect(() => {
    if (!service) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [service, onClose]);

  if (!service) return null;

  const related = projectsForTag(service.gallery, [], 2);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-paper w-full sm:max-w-3xl sm:max-h-[88vh] max-h-[92vh] overflow-y-auto sm:mx-4 shadow-panel animate-reveal">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-paper/90 border border-line flex items-center justify-center hover:bg-white"
        >
          <X size={18} strokeWidth={1.75} />
        </button>

        <ImagePlaceholder
          label={`${service.name} — large project photo`}
          path={service.image}
          src={service.hasPhoto ? service.image : undefined}
          ratio="aspect-[16/9]"
        />

        <div className="p-6 sm:p-10">
          <p className="eyebrow mb-2">{categoryLabel(service.category)}</p>
          <h3 className="text-[28px] sm:text-[32px] font-display leading-tight">{service.name}</h3>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink/70 max-w-xl">
            {service.description}
          </p>

          <div className="mt-8">
            <h4 className="text-[13px] tracking-wide text-steel mb-3">Key features</h4>
            <ul className="space-y-2.5">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink/80">
                  <Check size={16} strokeWidth={2} className="text-steel mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-9 grid sm:grid-cols-2 gap-4">
            {[0, 1].map((i) => {
              const proj = related[i];
              return (
                <div key={i} className="border border-line p-4">
                  <ImagePlaceholder
                    label={proj ? proj.title : `${service.name} — additional project photo`}
                    path={proj ? `/images/projects/${proj.file}` : `gallery-${i + 1}-${service.slug}.jpg`}
                    src={proj ? `/images/projects/${proj.file}` : undefined}
                    ratio="aspect-square"
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={waLink(serviceWhatsAppMessage(service.name))}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={17} strokeWidth={1.75} />
              WhatsApp Us
            </a>
            <button
              onClick={() => { onClose(); onRequestQuote(service.name); }}
              className="btn-outline"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function categoryLabel(id) {
  const map = {
    "interiors-kitchens": "Interiors & Kitchens",
    "glass-windows": "Glass & Windows",
    "aluminium-metal": "Aluminium & Metal Works",
    "commercial-exterior": "Commercial & Exterior",
  };
  return map[id] ?? "";
}
