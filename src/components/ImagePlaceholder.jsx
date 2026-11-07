import { ImageIcon } from "lucide-react";

// Warm-to-cool gradient variants so placeholders read as an intentional
// design choice (a mood-board tile) rather than an empty dev box.
// Cycled by a stable hash of the path so the same slot always gets the
// same tone.
const VARIANTS = [
  "from-[#1B2534] to-[#2E3E52]",   // navy
  "from-[#2A3441] to-[#5E7285]",   // steel
  "from-[#12161C] to-[#33424F]",   // ink → steel
  "from-[#3B4A57] to-[#748A9A]",   // steel light
];

function hashVariant(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return VARIANTS[h % VARIANTS.length];
}

/**
 * A tasteful stand-in for a real photograph. Used for two kinds of
 * content:
 *  - service/project photos, which must never look like a genuine
 *    finished-project photo before one exists — so these carry a small,
 *    clearly legible "photo to add" badge and the exact file path.
 *  - once a real file exists at `src`, this renders a normal <img> and
 *    the badge disappears entirely.
 */
export default function ImagePlaceholder({ label, path, className = "", ratio = "aspect-[4/3]", src, icon: Icon = ImageIcon, priority = false }) {
  if (src) {
    if (ratio) {
      return (
        <div className={`relative w-full overflow-hidden ${ratio} ${className}`}>
          <img
            src={src}
            alt={label}
            loading="eager"
            fetchPriority={priority ? "high" : "auto"}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return (
      <img
        src={src}
        alt={label}
        loading="eager"
        fetchPriority={priority ? "high" : "auto"}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  const gradient = hashVariant(path || label);

  return (
    <div
      className={`relative overflow-hidden ${ratio} ${className} bg-gradient-to-br ${gradient}`}
      role="img"
      aria-label={`Placeholder — ${label}`}
    >
      {/* faint glass-pane grid for texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${path}`} width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${path})`} />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <Icon size={30} strokeWidth={1.25} className="text-white/25" />
      </div>

      <div className="absolute bottom-0 inset-x-0 p-3">
        <div className="inline-flex items-center gap-1.5 bg-ink/70 backdrop-blur-sm px-2.5 py-1.5 max-w-full">
          <ImageIcon size={12} strokeWidth={2} className="text-white/70 shrink-0" />
          <span className="text-[11px] text-white/85 truncate">{label}</span>
        </div>
      </div>
    </div>
  );
}
