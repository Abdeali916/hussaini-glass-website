// ─────────────────────────────────────────────────────────────
// CENTRALIZED SERVICE DATA
// Add, remove or edit a service by editing this one file — every
// card, dropdown, filter and detail view reads from here.
//
// image: path under /public/images/services/ — see README for the
//        full list of filenames to add.
// gallery: the filter tag this service's project photos belong to
//          in the "Our Work" section.
// ─────────────────────────────────────────────────────────────

export const categories = [
  {
    id: "interiors-kitchens",
    name: "Interiors & Kitchens",
    summary:
      "Modular kitchens, kitchen cabinets, wardrobes, sliding wardrobes, TV units and office interiors.",
  },
  {
    id: "glass-windows",
    name: "Glass & Windows",
    summary:
      "All kinds of glass works, designer glass, automatic glass doors, UPVC windows, aluminium windows and bathroom shower cubicles.",
  },
  {
    id: "aluminium-metal",
    name: "Aluminium & Metal Works",
    summary:
      "Aluminium works, M.S. works, stainless steel works and railings.",
  },
  {
    id: "commercial-exterior",
    name: "Commercial & Exterior",
    summary: "ACP works and other suitable commercial/exterior solutions.",
  },
];

export const services = [
  // Interiors & Kitchens
  {
    slug: "modular-kitchen",
    hasPhoto: true,
    name: "Modular Kitchen",
    category: "interiors-kitchens",
    gallery: "Kitchens",
    image: "/images/services/modular-kitchen.jpg",
    description:
      "Modern modular kitchen solutions designed around the customer's space, requirements and preferred style.",
    features: [
      "Layout planned around your kitchen space",
      "Choice of finishes and storage configurations",
      "Coordinated with your countertop and appliances",
    ],
  },
  {
    slug: "kitchen-cabinets",
    hasPhoto: true,
    name: "Kitchen Cabinets",
    category: "interiors-kitchens",
    gallery: "Kitchens",
    image: "/images/services/kitchen-cabinets.jpg",
    description:
      "Practical and stylish kitchen cabinet solutions designed for efficient storage and everyday use.",
    features: [
      "Designed for everyday practicality",
      "Efficient use of available storage space",
      "Finish options to match your kitchen",
    ],
  },
  {
    slug: "wardrobes",
    hasPhoto: true,
    name: "Wardrobes",
    category: "interiors-kitchens",
    gallery: "Wardrobes",
    image: "/images/services/wardrobes.jpg",
    description:
      "Custom wardrobe solutions designed to provide organized storage while complementing the room's interior.",
    features: [
      "Custom-built to your room dimensions",
      "Organized internal storage layout",
      "Finishes that complement your interior",
    ],
  },
  {
    slug: "sliding-wardrobes",
    hasPhoto: true,
    name: "Sliding Wardrobes",
    category: "interiors-kitchens",
    gallery: "Wardrobes",
    image: "/images/services/sliding-wardrobes.jpg",
    description:
      "Space-efficient sliding wardrobe solutions with modern designs.",
    features: [
      "Space-saving sliding shutter systems",
      "Modern shutter finishes available",
      "Suited to compact and modern rooms",
    ],
  },
  {
    slug: "tv-units",
    hasPhoto: true,
    name: "TV Units",
    category: "interiors-kitchens",
    gallery: "TV Units",
    image: "/images/services/tv-units.jpg",
    description:
      "Modern TV units designed to complement contemporary home interiors.",
    features: [
      "Designed to fit your living room layout",
      "Integrated storage and display space",
      "Contemporary finish options",
    ],
  },
  {
    slug: "office-interiors",
    hasPhoto: true,
    name: "Office Interiors",
    category: "interiors-kitchens",
    gallery: "Interiors",
    image: "/images/services/office-interiors.jpg",
    description:
      "Functional and modern interior solutions for offices and workspaces.",
    features: [
      "Planned around your workspace needs",
      "Functional layouts for daily operations",
      "Modern finish for a professional look",
    ],
  },

  // Glass & Windows
  {
    slug: "glass-works",
    hasPhoto: true,
    name: "All Kinds of Glass Works",
    category: "glass-windows",
    gallery: "Glass",
    image: "/images/services/glass-works.jpg",
    description:
      "Glass solutions for a wide range of residential and commercial requirements.",
    features: [
      "Suited to homes and commercial spaces",
      "A wide range of glass requirements covered",
      "Executed to your specific requirement",
    ],
  },
  {
    slug: "designer-glass",
    hasPhoto: true,
    name: "Designer Glass",
    category: "glass-windows",
    gallery: "Glass",
    image: "/images/services/designer-glass.jpg",
    description:
      "Decorative and designer glass solutions for enhancing modern interiors.",
    features: [
      "Decorative patterns and finishes",
      "Enhances modern interior spaces",
      "Suited to feature walls and partitions",
    ],
  },
  {
    slug: "automatic-glass-doors",
    hasPhoto: true,
    name: "Automatic Glass Doors",
    category: "glass-windows",
    gallery: "Doors",
    image: "/images/services/automatic-glass-doors.jpg",
    description:
      "Modern automatic glass door solutions for suitable residential and commercial applications.",
    features: [
      "Modern automatic door systems",
      "Suited to entrances and storefronts",
      "For residential and commercial use",
    ],
  },
  {
    slug: "upvc-windows",
    hasPhoto: true,
    name: "UPVC Windows",
    category: "glass-windows",
    gallery: "Windows",
    image: "/images/services/upvc-windows.jpg",
    description: "Modern UPVC window solutions for homes and buildings.",
    features: [
      "Low-maintenance UPVC frames",
      "Suited to homes and buildings",
      "A range of configurations available",
    ],
  },
  {
    slug: "aluminium-windows",
    hasPhoto: true,
    name: "Aluminium Windows",
    category: "glass-windows",
    gallery: "Windows",
    image: "/images/services/aluminium-windows.jpg",
    description:
      "Durable and modern aluminium window solutions for residential and commercial spaces.",
    features: [
      "Durable aluminium framing",
      "Modern profiles for homes and offices",
      "For residential and commercial spaces",
    ],
  },
  {
    slug: "bathroom-shower-cubicles",
    hasPhoto: true,
    name: "Bathroom Shower Cubicles",
    category: "glass-windows",
    gallery: "Glass",
    image: "/images/services/bathroom-shower-cubicles.jpg",
    description:
      "Modern glass shower cubicle solutions designed for contemporary bathrooms.",
    features: [
      "Designed for contemporary bathrooms",
      "Glass options to suit your space",
      "Fitted to your bathroom layout",
    ],
  },

  // Aluminium & Metal Works
  {
    slug: "aluminium-works",
    hasPhoto: true,
    name: "Aluminium Works",
    category: "aluminium-metal",
    gallery: "Aluminium",
    image: "/images/services/aluminium-works.png",
    description:
      "Aluminium fabrication and related solutions based on customer requirements.",
    features: [
      "Fabrication based on your requirement",
      "Suited to a range of applications",
      "Residential and commercial use",
    ],
  },
  {
    slug: "ms-works",
    hasPhoto: true,
    name: "M.S. Works",
    category: "aluminium-metal",
    gallery: "Fabrication",
    image: "/images/services/ms-works.png",
    description:
      "Mild steel fabrication and related works for suitable residential and commercial applications.",
    features: [
      "Mild steel fabrication work",
      "Suited to residential and commercial use",
      "Executed to your specification",
    ],
  },
  {
    slug: "ss-works",
    hasPhoto: true,
    name: "Stainless Steel Works",
    category: "aluminium-metal",
    gallery: "Fabrication",
    image: "/images/services/ss-works.png",
    description:
      "Stainless steel fabrication and related works based on customer requirements.",
    features: [
      "Stainless steel fabrication work",
      "Durable, low-maintenance finish",
      "Executed to your requirement",
    ],
  },
  {
    slug: "railings",
    hasPhoto: true,
    name: "Railings",
    category: "aluminium-metal",
    gallery: "Railings",
    image: "/images/services/railings.png",
    description:
      "Modern railing solutions for suitable residential and commercial applications.",
    features: [
      "Modern railing designs",
      "Suited to balconies, staircases and more",
      "Residential and commercial applications",
    ],
  },

  // Commercial & Exterior
  {
    slug: "acp-works",
    hasPhoto: true,
    name: "ACP Works",
    category: "commercial-exterior",
    gallery: "ACP",
    image: "/images/services/acp-works.png",
    description:
      "ACP solutions for suitable commercial, exterior and architectural applications.",
    features: [
      "ACP cladding for exteriors",
      "Suited to commercial and architectural use",
      "Executed to your specification",
    ],
  },
];

export const galleryFilters = [
  "All",
  "Kitchens",
  "Wardrobes",
  "TV Units",
  "Glass",
  "Doors",
  "Windows",
  "Railings",
  "Interiors",
  "Aluminium",
  "Fabrication",
  "ACP",
];
