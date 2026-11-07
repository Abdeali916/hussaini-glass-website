import { ChefHat, DoorOpen, Layers, Archive } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

// An asymmetric mood-board of real Hussaini Glass project photographs —
// kitchen, glass, wardrobe and window work — giving visitors an
// immediate, honest sense of the work before they scroll further.
export default function HeroVisual() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
      <div className="row-span-2">
        <ImagePlaceholder
          label="Modular kitchen"
          path="/images/hero/hero-kitchen.jpg"
          src="/images/hero/hero-kitchen.jpg"
          priority
          ratio=""
          className="h-full"
          icon={ChefHat}
        />
      </div>
      <ImagePlaceholder
        label="Glass door / facade"
        path="/images/hero/hero-glass.jpg"
          src="/images/hero/hero-glass.jpg"
        priority
        ratio=""
        className="h-full"
        icon={Layers}
      />
      <div className="grid grid-cols-2 gap-3">
        <ImagePlaceholder
          label="Wardrobe interior"
          path="/images/hero/hero-wardrobe.jpg"
          src="/images/hero/hero-wardrobe.jpg"
          priority
          ratio=""
          className="h-full"
          icon={Archive}
        />
        <ImagePlaceholder
          label="Window / door detail"
          path="/images/hero/hero-window.jpg"
          src="/images/hero/hero-window.jpg"
          priority
          ratio=""
          className="h-full"
          icon={DoorOpen}
        />
      </div>
    </div>
  );
}
