// ─────────────────────────────────────────────────────────────
// GALLERY / PORTFOLIO PHOTOS
// Real Hussaini Glass project photographs. Each entry can carry
// more than one tag when a photo genuinely fits more than one
// filter (e.g. a glass balcony door is both "Glass" and "Doors").
//
// To add a new project photo: drop the file into
// public/images/projects/ and add an entry here.
// ─────────────────────────────────────────────────────────────

export const projects = [
  { id: "p01", tags: ["Kitchens"], title: "Modular kitchen, marble backsplash", file: "kitchen-01.jpg" },
  { id: "p02", tags: ["Kitchens"], title: "Kitchen cabinet with frosted glass doors", file: "kitchen-02.jpg" },
  { id: "p03", tags: ["Wardrobes"], title: "Dark wood-grain sliding wardrobe", file: "wardrobe-01.jpg" },
  { id: "p04", tags: ["Wardrobes"], title: "Wood-grain wardrobe, bedroom", file: "wardrobe-02.jpg" },
  { id: "p05", tags: ["Wardrobes"], title: "Marble-finish sliding wardrobe", file: "wardrobe-03.jpg" },
  { id: "p06", tags: ["Wardrobes"], title: "Reddish wood-grain sliding wardrobe", file: "wardrobe-04.jpg" },
  { id: "p07", tags: ["Wardrobes"], title: "Multi-tone modern wardrobe", file: "wardrobe-05.jpg" },
  { id: "p07b", tags: ["Wardrobes", "Glass"], title: "Modern fluted glass sliding wardrobe", file: "wardrobe-06.jpg" },
  { id: "p07c", tags: ["Wardrobes", "Interiors"], title: "Modern cream modular wardrobe with glass display unit", file: "wardrobe-07.jpg" },
  { id: "p08", tags: ["TV Units"], title: "Modern marble & wood-panel TV unit with backlit floating console", file: "tvunit-01.jpg" },
  { id: "p09", tags: ["Glass"], title: "Bathroom glass shower cubicle", file: "bath-shower-01.jpg" },
  { id: "p10", tags: ["Glass"], title: "Marble bathroom mirror, backlit", file: "bathroom-mirror-01.jpg" },
  { id: "p11", tags: ["Glass"], title: "Amber decorative glass window", file: "designer-glass-01.jpg" },
  { id: "p12", tags: ["Glass"], title: "Black and white patterned glass panel", file: "designer-glass-02.jpg" },
  { id: "p13", tags: ["Glass"], title: "Mirrored decorative glass panel", file: "designer-glass-03.jpg" },
  { id: "p14", tags: ["Glass"], title: "Organic-shaped backlit mirror", file: "designer-glass-04.jpg" },
  { id: "p15", tags: ["Glass"], title: "Egg-shaped backlit mirror", file: "designer-glass-05.jpg" },
  { id: "p15b", tags: ["Glass", "Doors"], title: "Geometric frosted designer glass sliding partition with gold inlays", file: "designer-glass-06.jpg" },
  { id: "p16", tags: ["Glass", "Doors"], title: "Frosted sliding glass door, interior", file: "glass-door-01.jpg" },
  { id: "p17", tags: ["Glass", "Doors"], title: "Frosted decorative glass door", file: "glass-door-02.jpg" },
  { id: "p18", tags: ["Doors", "Glass"], title: "Decorative glass entrance door", file: "glass-entrance-01.jpg" },
  { id: "p19", tags: ["Glass"], title: "Glass panel installation, commercial", file: "glass-install-01.jpg" },
  { id: "p20", tags: ["Glass", "Interiors"], title: "Gold-frame glass partition", file: "glass-partition-01.jpg" },
  { id: "p21", tags: ["Doors"], title: "Glass storefront, commercial", file: "glass-storefront-01.jpg" },
  { id: "p21b", tags: ["Doors", "Glass"], title: "Automatic sliding glass entrance doors", file: "glass-door-auto-01.jpg" },
  { id: "p22", tags: ["Interiors"], title: "Glass and wood display cabinetry", file: "interior-01.jpg" },
  { id: "p23", tags: ["Interiors"], title: "Office space with glass partitions", file: "office-01.jpg" },
  { id: "p24", tags: ["Interiors"], title: "Office cabin with glass walls", file: "office-02.jpg" },
  { id: "p25", tags: ["Railings"], title: "Balcony glass partition and railing", file: "railing-01.jpg" },
  { id: "p26", tags: ["Windows", "Doors"], title: "Aluminium sliding door / window", file: "upvc-door-01.jpg" },
  { id: "p27", tags: ["Windows"], title: "Architectural window, wood-clad exterior", file: "window-01.jpg" },
  { id: "p28", tags: ["Windows"], title: "Commercial building window installation", file: "window-02.jpg" },
  { id: "p28b", tags: ["Windows"], title: "White UPVC 3-track sliding window", file: "window-03.jpg" },
  { id: "p29", tags: ["Aluminium"], title: "Custom aluminium fabrication and frame work", file: "aluminium-01.png" },
  { id: "p30", tags: ["Fabrication"], title: "Mild steel (M.S.) custom fabrication work", file: "ms-works-01.png" },
  { id: "p31", tags: ["Fabrication"], title: "Stainless steel fabrication and finishing", file: "ss-works-01.png" },
  { id: "p32", tags: ["Railings"], title: "Modern staircase & balcony railing work", file: "railing-02.png" },
  { id: "p33", tags: ["ACP"], title: "Modern geometric ACP facade cladding with reflections", file: "acp-01.png" },
];

// Used by ServiceDetail to show a couple of related project photos
// alongside a service, matched by that service's gallery tag.
export function projectsForTag(tag, exclude = [], limit = 2) {
  return projects
    .filter((p) => p.tags.includes(tag) && !exclude.includes(p.file))
    .slice(0, limit);
}
