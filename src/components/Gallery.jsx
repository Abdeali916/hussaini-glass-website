import { useState } from "react";
import { X } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { galleryFilters } from "../data/services";
import { projects } from "../data/projects";
import useReveal from "../hooks/useReveal";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [ref, visible] = useReveal();

  const visibleProjects =
    filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="work" className="bg-paper scroll-mt-16">
      <div ref={ref} className={`container-content py-20 lg:py-28 ${visible ? "reveal is-visible" : "reveal"}`}>
        <div className="max-w-lg">
          <p className="eyebrow mb-3 font-medium">Portfolio</p>
          <h2 className="text-[32px] sm:text-[38px] leading-[1.15]">Our work</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink/60">
            A selection of completed Hussaini Glass projects.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-2.5">
          {galleryFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[13.5px] font-medium border transition-colors ${
                filter === f
                  ? "bg-ink text-paper border-ink"
                  : "border-line text-ink/60 hover:border-ink hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {visibleProjects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setLightbox(p)}
              className="block w-full mb-5 break-inside-avoid text-left"
            >
              <ImagePlaceholder
                label={p.title}
                path={`/images/projects/${p.file}`}
                src={`/images/projects/${p.file}`}
                ratio={i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}
              />
            </button>
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <p className="mt-10 text-center text-ink/50 text-[14px]">
            No project photos in this category yet — check back soon.
          </p>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-ink/85" onClick={() => setLightbox(null)} />
          <div className="relative max-w-2xl w-full">
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute -top-11 right-0 text-paper/80 hover:text-paper"
            >
              <X size={26} strokeWidth={1.5} />
            </button>
            <ImagePlaceholder
              label={lightbox.title}
              path={`/images/projects/${lightbox.file}`}
              src={`/images/projects/${lightbox.file}`}
              ratio="aspect-[4/3]"
              className="!bg-navy border-white/10"
            />
          </div>
        </div>
      )}
    </section>
  );
}
