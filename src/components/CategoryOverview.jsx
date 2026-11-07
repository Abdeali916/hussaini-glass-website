import { ChefHat, Layers, Wrench, Building2 } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { categories } from "../data/services";
import useReveal from "../hooks/useReveal";

const ICONS = {
  "interiors-kitchens": ChefHat,
  "glass-windows": Layers,
  "aluminium-metal": Wrench,
  "commercial-exterior": Building2,
};

const THUMBS = {
  "interiors-kitchens": "/images/hero/category-interiors.jpg",
  "glass-windows": "/images/hero/category-glass.jpg",
  "aluminium-metal": "/images/hero/category-aluminium.jpg",
  "commercial-exterior": "/images/hero/category-acp.jpg",
};

export default function CategoryOverview() {
  const [ref, visible] = useReveal();

  const scrollToCategory = (id) => {
    document.querySelector(`#cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-paper border-b border-line">
      <div ref={ref} className={`container-content py-20 lg:py-28 ${visible ? "reveal is-visible" : "reveal"}`}>
        <div className="max-w-2xl">
          <p className="eyebrow mb-3 font-medium">What we do</p>
          <h2 className="text-[32px] sm:text-[40px] leading-[1.15] text-ink">
            One place for glass, interiors, kitchens, wardrobes, windows and fabrication
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/65 max-w-lg">
            Hussaini Glass brings four areas of work under one roof, so a
            single call or message covers everything your space needs.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const Icon = ICONS[cat.id];
            return (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className="group text-left border border-line bg-white overflow-hidden hover:border-ink/30 transition-colors"
              >
                <div className="h-44 sm:h-52">
                  <ImagePlaceholder
                    label={`${cat.name} — representative photo`}
                    path={THUMBS[cat.id]}
                    src={THUMBS[cat.id]}
                    ratio=""
                    className="h-full"
                    icon={Icon}
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-[21px] sm:text-[23px] font-display leading-snug">
                    {cat.name}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink/60">
                    {cat.summary}
                  </p>
                  <span className="mt-4 inline-block text-[13.5px] font-medium text-steel group-hover:underline underline-offset-4">
                    View services →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
