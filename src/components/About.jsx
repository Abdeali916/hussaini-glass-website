import ImagePlaceholder from "./ImagePlaceholder";
import useReveal from "../hooks/useReveal";

export default function About() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" className="bg-navy text-white scroll-mt-16">
      <div ref={ref} className={`container-content py-20 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${visible ? "reveal is-visible" : "reveal"}`}>
        <div className="order-2 lg:order-1">
          <p className="eyebrow !text-white/80 mb-3 font-medium">About us</p>
          <h2 className="text-[32px] sm:text-[38px] leading-[1.15] font-display max-w-md text-white">
            A Hyderabad business built around what you actually need
          </h2>
          <p className="mt-6 text-[16.5px] leading-relaxed text-white max-w-md">
            Hussaini Glass provides glass, interior, kitchen, wardrobe, window,
            door, railing, aluminium and fabrication solutions for residential
            and commercial spaces in Hyderabad. We focus on understanding each
            customer's requirements and providing practical, modern solutions
            suited to their space.
          </p>
          <p className="mt-4 text-[16.5px] leading-relaxed text-white max-w-md">
            Whether it's a single wardrobe or a complete office interior, every
            job is approached the same way — understand the space, understand
            the requirement, and deliver a solution that fits.
          </p>
        </div>
        <div className="order-1 lg:order-2 h-[320px] sm:h-[420px] relative">
          <ImagePlaceholder
            label="Hussaini Glass project — glass and interior work"
            path="/images/hero/about-shop.jpg"
            src="/images/hero/about-shop.jpg"
            className="h-full border-white/10"
            ratio=""
          />
        </div>
      </div>
    </section>
  );
}
