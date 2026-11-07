import { useState } from "react";
import { categories, services } from "../data/services";
import ServiceCategory from "./ServiceCategory";
import ServiceDetail from "./ServiceDetail";

export default function Services({ onRequestQuote }) {
  const [active, setActive] = useState(null);

  return (
    <section id="services" className="bg-paper scroll-mt-16">
      <div className="container-content py-20 lg:py-28">
        <p className="eyebrow mb-3 font-medium">What we provide</p>
        <h2 className="text-[32px] sm:text-[40px] leading-[1.15] max-w-xl">
          Every service, organized the way you'd ask for it
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-ink/60 max-w-lg">
          Browse by category below, or WhatsApp us directly and we'll help
          you find the right solution.
        </p>

        <div className="mt-4">
          {categories.map((cat) => (
            <ServiceCategory
              key={cat.id}
              category={cat}
              items={services.filter((s) => s.category === cat.id)}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      <ServiceDetail
        service={active}
        onClose={() => setActive(null)}
        onRequestQuote={onRequestQuote}
      />
    </section>
  );
}
