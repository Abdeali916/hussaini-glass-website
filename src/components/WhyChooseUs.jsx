import { Gem, Ruler, LayoutGrid, Sparkles, Building2, MessageCircle } from "lucide-react";
import useReveal from "../hooks/useReveal";

const REASONS = [
  {
    icon: Gem,
    title: "Quality Workmanship",
    body: "Careful attention to quality, finishing and project requirements.",
  },
  {
    icon: Ruler,
    title: "Customized Solutions",
    body: "Solutions designed according to customer requirements and available space.",
  },
  {
    icon: LayoutGrid,
    title: "Wide Range of Services",
    body: "Glass, interiors, kitchens, wardrobes, windows, doors, railings and fabrication under one business.",
  },
  {
    icon: Sparkles,
    title: "Modern Designs",
    body: "Contemporary solutions for modern homes and commercial spaces.",
  },
  {
    icon: Building2,
    title: "Residential & Commercial",
    body: "Solutions suitable for homes, offices, shops and other spaces.",
  },
  {
    icon: MessageCircle,
    title: "Easy Communication",
    body: "Customers can easily reach Hussaini Glass through WhatsApp, phone and email.",
  },
];

export default function WhyChooseUs() {
  const [ref, visible] = useReveal();

  return (
    <section id="why-us" className="bg-mist scroll-mt-16">
      <div ref={ref} className={`container-content py-20 lg:py-28 ${visible ? "reveal is-visible" : "reveal"}`}>
        <div className="max-w-lg">
          <p className="eyebrow mb-3 font-medium">Why Hussaini Glass</p>
          <h2 className="text-[32px] sm:text-[38px] leading-[1.15]">
            Why choose Hussaini Glass?
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {REASONS.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <span className="w-14 h-14 rounded-full bg-white border border-line flex items-center justify-center">
                <Icon size={24} strokeWidth={1.5} className="text-steel" />
              </span>
              <h3 className="mt-5 text-[18.5px] font-display">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink/60 max-w-[280px]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
