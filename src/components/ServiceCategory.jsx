import ServiceCard from "./ServiceCard";
import ServiceCardHorizontal from "./ServiceCardHorizontal";
import ServiceFeatureBanner from "./ServiceFeatureBanner";

// Categories deliberately don't share one card layout — a dense list
// for compact categories, a grid with a featured opener for the
// six-item categories, and a single spotlight banner where a category
// has only one service. This keeps 17 services from reading as one
// repeated grid.
export default function ServiceCategory({ category, items, onOpen }) {
  const layout = layoutFor(category.id, items.length);

  return (
    <div id={`cat-${category.id}`} className="scroll-mt-24 py-16 lg:py-20 border-b border-line last:border-0">
      <div className="flex items-baseline justify-between gap-4 mb-9">
        <h3 className="text-[26px] sm:text-[30px] font-display">{category.name}</h3>
        <span className="text-[13.5px] text-ink/45 shrink-0">
          {items.length} {items.length === 1 ? "service" : "services"}
        </span>
      </div>

      {layout === "banner" && (
        <ServiceFeatureBanner service={items[0]} onOpen={onOpen} />
      )}

      {layout === "list" && (
        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((service) => (
            <ServiceCardHorizontal key={service.slug} service={service} onOpen={onOpen} />
          ))}
        </div>
      )}

      {layout === "featured-grid" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ServiceCard service={items[0]} onOpen={onOpen} featured />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {items.slice(1, 3).map((service) => (
              <ServiceCard key={service.slug} service={service} onOpen={onOpen} />
            ))}
          </div>
          {items.slice(3).map((service) => (
            <ServiceCard key={service.slug} service={service} onOpen={onOpen} />
          ))}
        </div>
      )}

      {layout === "grid" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service) => (
            <ServiceCard key={service.slug} service={service} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

function layoutFor(categoryId, count) {
  if (count === 1) return "banner";
  if (categoryId === "aluminium-metal") return "list";
  if (categoryId === "interiors-kitchens") return "featured-grid";
  return "grid";
}
