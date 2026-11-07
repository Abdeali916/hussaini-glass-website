import { MapPin, Navigation, Clock } from "lucide-react";
import businessInfo from "../data/business";

const isPlaceholder = (v) => !v || v.startsWith("YOUR_");

export default function Location() {
  return (
    <section id="location" className="bg-mist scroll-mt-16">
      <div className="container-content py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-stretch">
        <div>
          <p className="eyebrow mb-3 font-medium">Find us</p>
          <h2 className="text-[32px] sm:text-[38px] leading-[1.15]">Visit Hussaini Glass</h2>
          <p className="mt-3 text-[16px] text-ink/60">{businessInfo.location}</p>

          <div className="mt-9 space-y-6 border-t border-line pt-7">
            <div className="flex gap-3.5">
              <MapPin size={20} strokeWidth={1.5} className="text-steel mt-0.5 shrink-0" />
              <div>
                <p className="text-[12.5px] tracking-wide text-ink/50 mb-1">Shop Address</p>
                <p className={`text-[15.5px] leading-relaxed ${isPlaceholder(businessInfo.address) ? "text-ink/40 italic" : "text-ink"}`}>
                  {businessInfo.address}
                </p>
                {businessInfo.landmark && !isPlaceholder(businessInfo.address) && (
                  <p className="text-[13px] text-ink/50 mt-1">{businessInfo.landmark}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3.5">
              <Clock size={20} strokeWidth={1.5} className="text-steel mt-0.5 shrink-0" />
              <div>
                <p className="text-[12.5px] tracking-wide text-ink/50 mb-1">Business Hours</p>
                <p className={`text-[15.5px] leading-relaxed ${isPlaceholder(businessInfo.businessHours) ? "text-ink/40 italic" : "text-ink"}`}>
                  {businessInfo.businessHours}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={isPlaceholder(businessInfo.googleMapsUrl) ? undefined : businessInfo.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-disabled={isPlaceholder(businessInfo.googleMapsUrl)}
              className={`btn-dark ${isPlaceholder(businessInfo.googleMapsUrl) ? "opacity-40 pointer-events-none" : ""}`}
            >
              <Navigation size={16} strokeWidth={1.75} />
              Get Directions
            </a>
            <a
              href={isPlaceholder(businessInfo.googleMapsUrl) ? undefined : businessInfo.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-disabled={isPlaceholder(businessInfo.googleMapsUrl)}
              className={`btn-outline ${isPlaceholder(businessInfo.googleMapsUrl) ? "opacity-40 pointer-events-none" : ""}`}
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className="relative min-h-[340px] border border-line bg-white shadow-subtle">
          {isPlaceholder(businessInfo.googleMapsEmbedUrl) ? (
            <div className="w-full h-full min-h-[340px] flex flex-col items-center justify-center text-center px-6 gap-3 bg-gradient-to-br from-white to-mist">
              <span className="w-14 h-14 rounded-full bg-white border border-line flex items-center justify-center">
                <MapPin size={24} strokeWidth={1.5} className="text-steel" />
              </span>
              <p className="text-[14px] text-ink/55 max-w-[260px]">
                The map will appear here once a Google Maps embed link is added.
              </p>
              <p className="text-[11px] font-mono text-steel-light">googleMapsEmbedUrl</p>
            </div>
          ) : (
            <iframe
              title="Hussaini Glass location"
              src={businessInfo.googleMapsEmbedUrl}
              className="w-full h-full min-h-[340px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>
    </section>
  );
}
