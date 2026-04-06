/**
 * IndianOrnaments.tsx
 * Hand-crafted SVG decorative elements inspired by:
 *  - Indian folk tile art (diamond vine tiles)
 *  - Scandinavian/Indian folk flowers
 *  - Geometric mandala / cross patterns
 *  - Botanical silhouette marks
 *
 * Each component is SSR-safe (no runtime Math.cos/sin).
 * All paths use pre-computed coordinates.
 */

export type OrnamentProps = {
  size?: number;
  color?: string;
  className?: string;
  opacity?: number;
};

/* ─────────────────────────────────────────────────────
   1. DiamondVineTile
   Inspired by: red diamond tile (image 1) — diamond
   border with vine, leaf sprigs and central bloom.
   Use: Hero background, Achievements section header.
───────────────────────────────────────────────────── */
export function DiamondVineTile({
  size = 160,
  color = "currentColor",
  className,
  opacity = 1,
}: OrnamentProps) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 160 160"
      fill="none" aria-hidden
      className={className}
      style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}
    >
      {/* Outer diamond */}
      <polygon
        points="80,4 156,80 80,156 4,80"
        stroke={color} strokeWidth="1.4" fill="none"
      />
      {/* Inner diamond */}
      <polygon
        points="80,20 140,80 80,140 20,80"
        stroke={color} strokeWidth="0.7" fill="none"
      />
      {/* Dashed inner ring */}
      <polygon
        points="80,28 132,80 80,132 28,80"
        stroke={color} strokeWidth="0.4" fill="none"
        strokeDasharray="3 4"
      />

      {/* Corner accent boxes */}
      <rect x="75" y="1" width="10" height="6" rx="1"
        stroke={color} strokeWidth="0.8" fill="none"
        transform="rotate(45 80 4)"
      />
      <rect x="75" y="153" width="10" height="6" rx="1"
        stroke={color} strokeWidth="0.8" fill="none"
        transform="rotate(45 80 156)"
      />
      <rect x="1" y="75" width="10" height="6" rx="1"
        stroke={color} strokeWidth="0.8" fill="none"
        transform="rotate(45 4 80)"
      />
      <rect x="149" y="75" width="10" height="6" rx="1"
        stroke={color} strokeWidth="0.8" fill="none"
        transform="rotate(45 156 80)"
      />

      {/* Top vine sprig */}
      <line x1="80" y1="28" x2="80" y2="50" stroke={color} strokeWidth="0.9" />
      <path d="M80,38 C72,34 68,28 72,24 C76,28 78,34 80,38"
        stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M80,38 C88,34 92,28 88,24 C84,28 82,34 80,38"
        stroke={color} strokeWidth="0.8" fill="none" />
      <circle cx="80" cy="24" r="2" fill={color} opacity="0.5" />

      {/* Bottom vine sprig */}
      <line x1="80" y1="132" x2="80" y2="110" stroke={color} strokeWidth="0.9" />
      <path d="M80,122 C72,126 68,132 72,136 C76,132 78,126 80,122"
        stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M80,122 C88,126 92,132 88,136 C84,132 82,126 80,122"
        stroke={color} strokeWidth="0.8" fill="none" />
      <circle cx="80" cy="136" r="2" fill={color} opacity="0.5" />

      {/* Right vine sprig */}
      <line x1="132" y1="80" x2="110" y2="80" stroke={color} strokeWidth="0.9" />
      <path d="M122,80 C126,72 132,68 136,72 C132,76 126,78 122,80"
        stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M122,80 C126,88 132,92 136,88 C132,84 126,82 122,80"
        stroke={color} strokeWidth="0.8" fill="none" />
      <circle cx="136" cy="80" r="2" fill={color} opacity="0.5" />

      {/* Left vine sprig */}
      <line x1="28" y1="80" x2="50" y2="80" stroke={color} strokeWidth="0.9" />
      <path d="M38,80 C34,72 28,68 24,72 C28,76 34,78 38,80"
        stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M38,80 C34,88 28,92 24,88 C28,84 34,82 38,80"
        stroke={color} strokeWidth="0.8" fill="none" />
      <circle cx="24" cy="80" r="2" fill={color} opacity="0.5" />

      {/* Diagonal vine curves */}
      <path d="M54,54 C60,58 64,66 68,70" stroke={color} strokeWidth="0.6" fill="none" />
      <path d="M106,54 C100,58 96,66 92,70" stroke={color} strokeWidth="0.6" fill="none" />
      <path d="M54,106 C60,102 64,94 68,90" stroke={color} strokeWidth="0.6" fill="none" />
      <path d="M106,106 C100,102 96,94 92,90" stroke={color} strokeWidth="0.6" fill="none" />

      {/* Leaf buds on diagonals */}
      <ellipse cx="52" cy="52" rx="3" ry="5" fill={color} opacity="0.4"
        transform="rotate(45 52 52)" />
      <ellipse cx="108" cy="52" rx="3" ry="5" fill={color} opacity="0.4"
        transform="rotate(-45 108 52)" />
      <ellipse cx="52" cy="108" rx="3" ry="5" fill={color} opacity="0.4"
        transform="rotate(-45 52 108)" />
      <ellipse cx="108" cy="108" rx="3" ry="5" fill={color} opacity="0.4"
        transform="rotate(45 108 108)" />

      {/* Central 4-petal bloom */}
      <ellipse cx="80" cy="64" rx="6" ry="10" fill={color} opacity="0.45" />
      <ellipse cx="80" cy="96" rx="6" ry="10" fill={color} opacity="0.45" />
      <ellipse cx="64" cy="80" rx="10" ry="6" fill={color} opacity="0.45" />
      <ellipse cx="96" cy="80" rx="10" ry="6" fill={color} opacity="0.45" />
      <circle cx="80" cy="80" r="7" fill={color} opacity="0.7" />
      <circle cx="80" cy="80" r="3.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <circle cx="80" cy="80" r="1.5" fill={color} opacity="0.9" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   2. FolkFlowerSprig
   Inspired by: Scandinavian folk flower sheet (last image)
   — simple geometric flower with stem and two leaf pairs.
   Use: Testimonials cards, section dividers.
───────────────────────────────────────────────────── */
export function FolkFlowerSprig({
  size = 56,
  color = "currentColor",
  className,
  opacity = 1,
}: OrnamentProps) {
  return (
    <svg
      width={size} height={Math.round(size * 1.4)}
      viewBox="0 0 56 78"
      fill="none" aria-hidden
      className={className}
      style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}
    >
      {/* Stem */}
      <line x1="28" y1="76" x2="28" y2="36" stroke={color} strokeWidth="1.4" strokeLinecap="round" />

      {/* Lower leaf pair */}
      <path d="M28,62 C20,56 16,48 20,43 C23,49 25,56 28,62"
        fill={color} opacity="0.65" />
      <path d="M28,62 C36,56 40,48 36,43 C33,49 31,56 28,62"
        fill={color} opacity="0.65" />

      {/* Upper leaf pair */}
      <path d="M28,50 C22,44 20,36 24,32 C26,38 27,45 28,50"
        fill={color} opacity="0.5" />
      <path d="M28,50 C34,44 36,36 32,32 C30,38 29,45 28,50"
        fill={color} opacity="0.5" />

      {/* 6 petals — precomputed positions (r=14 from center 28,22) */}
      {/* angles: 0°,60°,120°,180°,240°,300° → petal centers */}
      {/* petal: ellipse cx,cy rotated toward center */}
      <ellipse cx="28" cy="8"  rx="5" ry="8" fill={color} opacity="0.55" />
      <ellipse cx="28" cy="8"  rx="5" ry="8" fill={color} opacity="0.55"
        transform="rotate(60 28 22)" />
      <ellipse cx="28" cy="8"  rx="5" ry="8" fill={color} opacity="0.55"
        transform="rotate(120 28 22)" />
      <ellipse cx="28" cy="8"  rx="5" ry="8" fill={color} opacity="0.55"
        transform="rotate(180 28 22)" />
      <ellipse cx="28" cy="8"  rx="5" ry="8" fill={color} opacity="0.55"
        transform="rotate(240 28 22)" />
      <ellipse cx="28" cy="8"  rx="5" ry="8" fill={color} opacity="0.55"
        transform="rotate(300 28 22)" />

      {/* Center circle */}
      <circle cx="28" cy="22" r="6" fill={color} />
      <circle cx="28" cy="22" r="2.5" fill="none"
        stroke="white" strokeWidth="0.8" opacity="0.5" />
      <circle cx="28" cy="22" r="1" fill="white" opacity="0.4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   3. StarInDiamond
   Inspired by: image 2 #129 — clean 8-point star
   inside a simple diamond border.
   Use: JaliDivider center, section break markers.
───────────────────────────────────────────────────── */
export function StarInDiamond({
  size = 48,
  color = "currentColor",
  className,
  opacity = 1,
}: OrnamentProps) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 80 80"
      fill="none" aria-hidden
      className={className}
      style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}
    >
      {/* Diamond border */}
      <polygon
        points="40,3 77,40 40,77 3,40"
        stroke={color} strokeWidth="1.2" fill="none"
      />
      {/* Inner diamond */}
      <polygon
        points="40,12 68,40 40,68 12,40"
        stroke={color} strokeWidth="0.5" fill="none"
      />

      {/* 8-point star — precomputed polygon */}
      {/* outer: r=18 at 0,45,90...315 deg | inner: r=7 at 22.5,67.5...337.5 */}
      {/* outer pts (cx=40,cy=40): */}
      {/* 0°:  58,40 | 45°: 52.7,52.7 | 90°: 40,58 | 135°: 27.3,52.7 */}
      {/* 180°: 22,40 | 225°: 27.3,27.3 | 270°: 40,22 | 315°: 52.7,27.3 */}
      {/* inner r=7: */}
      {/* 22.5°: 46.5,46.5 | 67.5°: 33.5,46.5 | 112.5°: 33.5,33.5 | 157.5°: 46.5,33.5 */}
      <polygon
        points="58,40 52.7,52.7 40,58 27.3,52.7 22,40 27.3,27.3 40,22 52.7,27.3"
        stroke={color} strokeWidth="1" fill={color} opacity="0.15"
      />
      <polygon
        points="58,40 46.5,46.5 52.7,52.7 46.5,46.5 40,58 33.5,46.5 27.3,52.7 33.5,46.5 22,40 33.5,33.5 27.3,27.3 33.5,33.5 40,22 46.5,33.5 52.7,27.3 46.5,33.5"
        stroke={color} strokeWidth="1" fill={color} opacity="0.7"
      />
      <circle cx="40" cy="40" r="4" fill={color} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   4. QuatrefoilBloom
   Inspired by: geometric mandala set (4th image) —
   4-fold cross bloom with teardrop petals + decorative border.
   Use: DesignProcess step ornaments, section headers.
───────────────────────────────────────────────────── */
export function QuatrefoilBloom({
  size = 64,
  color = "currentColor",
  className,
  opacity = 1,
}: OrnamentProps) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 100 100"
      fill="none" aria-hidden
      className={className}
      style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}
    >
      {/* Outer square border (rotated 45°) */}
      <rect x="10" y="10" width="80" height="80" rx="4"
        stroke={color} strokeWidth="0.8" fill="none"
        transform="rotate(45 50 50)"
      />

      {/* 4 main teardrop petals — cardinal */}
      <ellipse cx="50" cy="26" rx="9" ry="18" fill={color} opacity="0.7" />
      <ellipse cx="50" cy="74" rx="9" ry="18" fill={color} opacity="0.7" />
      <ellipse cx="26" cy="50" rx="18" ry="9" fill={color} opacity="0.7" />
      <ellipse cx="74" cy="50" rx="18" ry="9" fill={color} opacity="0.7" />

      {/* 4 smaller petal tips — diagonal */}
      <ellipse cx="50" cy="26" rx="5" ry="10" fill={color} opacity="0.4"
        transform="rotate(45 50 50)" />
      <ellipse cx="50" cy="26" rx="5" ry="10" fill={color} opacity="0.4"
        transform="rotate(135 50 50)" />
      <ellipse cx="50" cy="26" rx="5" ry="10" fill={color} opacity="0.4"
        transform="rotate(225 50 50)" />
      <ellipse cx="50" cy="26" rx="5" ry="10" fill={color} opacity="0.4"
        transform="rotate(315 50 50)" />

      {/* Center rings */}
      <circle cx="50" cy="50" r="12" fill={color} opacity="0.85" />
      <circle cx="50" cy="50" r="7"  fill="none" stroke="white"
        strokeWidth="1" opacity="0.3" />
      <circle cx="50" cy="50" r="3"  fill="white" opacity="0.3" />

      {/* Corner dots */}
      <circle cx="50" cy="8"  r="2.5" fill={color} opacity="0.4" />
      <circle cx="50" cy="92" r="2.5" fill={color} opacity="0.4" />
      <circle cx="8"  cy="50" r="2.5" fill={color} opacity="0.4" />
      <circle cx="92" cy="50" r="2.5" fill={color} opacity="0.4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   5. BotanicMark
   Inspired by: Botanica marks (3rd image) — single
   silhouette botanical with leaves, used as a small mark.
   Use: ProjectGrid label, small section stamps.
───────────────────────────────────────────────────── */
export function BotanicMark({
  size = 32,
  color = "currentColor",
  className,
  opacity = 1,
}: OrnamentProps) {
  return (
    <svg
      width={size} height={Math.round(size * 1.25)}
      viewBox="0 0 48 60"
      fill={color} aria-hidden
      className={className}
      style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}
    >
      {/* Stem */}
      <rect x="22.5" y="28" width="3" height="30" rx="1.5" />

      {/* Main leaf pair — lower */}
      <path d="M24,48 C14,42 8,30 14,22 C18,30 20,40 24,48Z" opacity="0.8" />
      <path d="M24,48 C34,42 40,30 34,22 C30,30 28,40 24,48Z" opacity="0.8" />

      {/* Secondary leaf pair — upper */}
      <path d="M24,36 C16,30 12,20 18,14 C20,22 22,30 24,36Z" opacity="0.6" />
      <path d="M24,36 C32,30 36,20 30,14 C28,22 26,30 24,36Z" opacity="0.6" />

      {/* Top bud — 3 petals */}
      <path d="M24,26 C24,20 20,14 24,10 C28,14 24,20 24,26Z" opacity="0.9" />
      <path d="M24,24 C18,20 14,14 18,10 C22,14 22,20 24,24Z" opacity="0.6" />
      <path d="M24,24 C30,20 34,14 30,10 C26,14 26,20 24,24Z" opacity="0.6" />

      {/* Base dots */}
      <circle cx="24" cy="58" r="2" opacity="0.5" />
      <circle cx="18" cy="56" r="1.5" opacity="0.3" />
      <circle cx="30" cy="56" r="1.5" opacity="0.3" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   6. FloralCross
   Inspired by: colorful geometric mandala set (4th image) —
   Mughal-style cross with petal tips and decorative frame.
   Use: Footer divider, DesignProcess progress dots.
───────────────────────────────────────────────────── */
export function FloralCross({
  size = 56,
  color = "currentColor",
  className,
  opacity = 1,
}: OrnamentProps) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 100 100"
      fill="none" aria-hidden
      className={className}
      style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="0.6" opacity="0.3" />

      {/* 4 arch petals — cardinal (like Mughal arch shape) */}
      <path
        d="M50,4 C42,4 36,14 36,26 C36,38 42,44 50,44 C58,44 64,38 64,26 C64,14 58,4 50,4Z"
        fill={color} opacity="0.55"
      />
      <path
        d="M50,96 C42,96 36,86 36,74 C36,62 42,56 50,56 C58,56 64,62 64,74 C64,86 58,96 50,96Z"
        fill={color} opacity="0.55"
      />
      <path
        d="M4,50 C4,42 14,36 26,36 C38,36 44,42 44,50 C44,58 38,64 26,64 C14,64 4,58 4,50Z"
        fill={color} opacity="0.55"
      />
      <path
        d="M96,50 C96,42 86,36 74,36 C62,36 56,42 56,50 C56,58 62,64 74,64 C86,64 96,58 96,50Z"
        fill={color} opacity="0.55"
      />

      {/* 4 small pointed tips — diagonal */}
      <ellipse cx="50" cy="50" rx="4" ry="14" fill={color} opacity="0.4"
        transform="rotate(45 50 50)" />
      <ellipse cx="50" cy="50" rx="4" ry="14" fill={color} opacity="0.4"
        transform="rotate(135 50 50)" />

      {/* Center medallion */}
      <circle cx="50" cy="50" r="14" fill={color} opacity="0.9" />
      <circle cx="50" cy="50" r="8"  stroke="white" strokeWidth="1" fill="none" opacity="0.25" />
      <circle cx="50" cy="50" r="3"  fill="white" opacity="0.3" />

      {/* Cardinal accent dots */}
      <circle cx="50" cy="16" r="2.5" fill={color} opacity="0.5" />
      <circle cx="50" cy="84" r="2.5" fill={color} opacity="0.5" />
      <circle cx="16" cy="50" r="2.5" fill={color} opacity="0.5" />
      <circle cx="84" cy="50" r="2.5" fill={color} opacity="0.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   7. VineRow
   A horizontal strip of small vine/folk botanical
   elements for use as section dividers.
   Use: Footer, between sections.
───────────────────────────────────────────────────── */
export function VineRow({
  width = 240,
  color = "currentColor",
  className,
  opacity = 1,
}: {
  width?: number;
  color?: string;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      width={width} height={24}
      viewBox="0 0 240 24"
      fill="none" aria-hidden
      className={className}
      style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}
    >
      {/* Main horizontal vine */}
      <line x1="0" y1="12" x2="240" y2="12" stroke={color} strokeWidth="0.6" />

      {/* Repeating leaf nodes — every 40px */}
      {[40, 80, 120, 160, 200].map((x) => (
        <g key={x}>
          <circle cx={x} cy={12} r="2.5" fill={color} opacity="0.6" />
          <path d={`M${x},12 C${x - 8},8 ${x - 12},4 ${x - 8},2 C${x - 4},5 ${x - 2},9 ${x},12`}
            fill={color} opacity="0.5" />
          <path d={`M${x},12 C${x + 8},8 ${x + 12},4 ${x + 8},2 C${x + 4},5 ${x + 2},9 ${x},12`}
            fill={color} opacity="0.5" />
          <path d={`M${x},12 C${x - 8},16 ${x - 12},20 ${x - 8},22 C${x - 4},19 ${x - 2},15 ${x},12`}
            fill={color} opacity="0.35" />
          <path d={`M${x},12 C${x + 8},16 ${x + 12},20 ${x + 8},22 C${x + 4},19 ${x + 2},15 ${x},12`}
            fill={color} opacity="0.35" />
        </g>
      ))}

      {/* Center star accent */}
      <polygon
        points="120,7 121.5,11 126,11 122.5,13.5 123.8,18 120,15.5 116.2,18 117.5,13.5 114,11 118.5,11"
        fill={color} opacity="0.7"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   8. TinyFleur — very small 4-petal accent
   Use: Inline with text, breadcrumbs, small decorations.
───────────────────────────────────────────────────── */
export function TinyFleur({
  size = 16,
  color = "currentColor",
  className,
  opacity = 1,
}: OrnamentProps) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill={color} aria-hidden
      className={className}
      style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}
    >
      <ellipse cx="12" cy="6"  rx="3.5" ry="5.5" opacity="0.7" />
      <ellipse cx="12" cy="18" rx="3.5" ry="5.5" opacity="0.7" />
      <ellipse cx="6"  cy="12" rx="5.5" ry="3.5" opacity="0.7" />
      <ellipse cx="18" cy="12" rx="5.5" ry="3.5" opacity="0.7" />
      <circle cx="12" cy="12" r="4" opacity="1" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   FOLK TILE GRID — Krona-poster inspired
   8 unique square tiles, each with a different folk icon.
   Used as: hero background grid, section accent grid.
═══════════════════════════════════════════════════════ */

/** Individual folk tile icons (40×40 viewBox each) */
const FolkTiles = {
  flower: (c: string) => (
    <g>
      <rect x="2" y="2" width="36" height="36" rx="3" stroke={c} strokeWidth="1" fill="none" />
      {/* 4-petal flower */}
      <ellipse cx="20" cy="13" rx="4" ry="7" fill={c} opacity="0.55" />
      <ellipse cx="20" cy="27" rx="4" ry="7" fill={c} opacity="0.55" />
      <ellipse cx="13" cy="20" rx="7" ry="4" fill={c} opacity="0.55" />
      <ellipse cx="27" cy="20" rx="7" ry="4" fill={c} opacity="0.55" />
      <circle cx="20" cy="20" r="5" fill={c} opacity="0.85" />
      {/* Corner dots */}
      <circle cx="6"  cy="6"  r="1.2" fill={c} opacity="0.4" />
      <circle cx="34" cy="6"  r="1.2" fill={c} opacity="0.4" />
      <circle cx="6"  cy="34" r="1.2" fill={c} opacity="0.4" />
      <circle cx="34" cy="34" r="1.2" fill={c} opacity="0.4" />
    </g>
  ),
  starburst: (c: string) => (
    <g>
      <rect x="2" y="2" width="36" height="36" rx="3" stroke={c} strokeWidth="1" fill="none" />
      {/* 8-ray star */}
      <polygon points="20,6 21.5,18 28,10 21.5,20 34,20 21.5,21.5 28,30 20,22 12,30 18.5,21.5 6,20 18.5,20 12,10 18.5,18"
        stroke={c} strokeWidth="0.8" fill={c} fillOpacity="0.5" />
      <circle cx="20" cy="20" r="4" fill={c} opacity="0.9" />
      <circle cx="20" cy="6" r="1.5" fill={c} opacity="0.4" />
      <circle cx="34" cy="20" r="1.5" fill={c} opacity="0.4" />
      <circle cx="20" cy="34" r="1.5" fill={c} opacity="0.4" />
      <circle cx="6" cy="20" r="1.5" fill={c} opacity="0.4" />
    </g>
  ),
  mountain: (c: string) => (
    <g>
      <rect x="2" y="2" width="36" height="36" rx="3" stroke={c} strokeWidth="1" fill="none" />
      {/* Temple arch */}
      <path d="M6,30 L6,18 Q6,8 20,8 Q34,8 34,18 L34,30Z" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.12" />
      <path d="M10,30 L10,20 Q10,12 20,12 Q30,12 30,20 L30,30Z" stroke={c} strokeWidth="0.6" fill="none" />
      {/* Small arch ornament */}
      <path d="M15,30 Q20,24 25,30" stroke={c} strokeWidth="1" fill="none" />
      {/* Diagonal lines inside (hatching) */}
      <line x1="6" y1="28" x2="20" y2="14" stroke={c} strokeWidth="0.5" opacity="0.4" />
      <line x1="10" y1="30" x2="24" y2="16" stroke={c} strokeWidth="0.5" opacity="0.4" />
      <line x1="14" y1="30" x2="28" y2="16" stroke={c} strokeWidth="0.5" opacity="0.4" />
    </g>
  ),
  heart: (c: string) => (
    <g>
      <rect x="2" y="2" width="36" height="36" rx="3" stroke={c} strokeWidth="1" fill="none" />
      <path d="M20,28 C20,28 8,21 8,14 C8,10 11,8 14.5,8 C17,8 20,10 20,10 C20,10 23,8 25.5,8 C29,8 32,10 32,14 C32,21 20,28 20,28Z"
        stroke={c} strokeWidth="1" fill={c} fillOpacity="0.35" />
      {/* Inner heart */}
      <path d="M20,24 C20,24 12,19 12,15 C12,13 13.5,12 15.5,12 C17,12 20,13.5 20,13.5 C20,13.5 23,12 24.5,12 C26.5,12 28,13 28,15 C28,19 20,24 20,24Z"
        stroke={c} strokeWidth="0.5" fill={c} fillOpacity="0.2" />
      <circle cx="6" cy="6" r="1.2" fill={c} opacity="0.4" />
      <circle cx="34" cy="6" r="1.2" fill={c} opacity="0.4" />
      <circle cx="6" cy="34" r="1.2" fill={c} opacity="0.4" />
      <circle cx="34" cy="34" r="1.2" fill={c} opacity="0.4" />
    </g>
  ),
  rainbow: (c: string) => (
    <g>
      <rect x="2" y="2" width="36" height="36" rx="3" stroke={c} strokeWidth="1" fill="none" />
      {/* 4 nested arcs */}
      <path d="M6,26 Q6,10 20,10 Q34,10 34,26" stroke={c} strokeWidth="1.2" fill="none" />
      <path d="M9,26 Q9,13 20,13 Q31,13 31,26" stroke={c} strokeWidth="1" fill="none" opacity="0.8" />
      <path d="M12,26 Q12,16 20,16 Q28,16 28,26" stroke={c} strokeWidth="0.8" fill="none" opacity="0.65" />
      <path d="M15,26 Q15,19 20,19 Q25,19 25,26" stroke={c} strokeWidth="0.6" fill="none" opacity="0.5" />
      {/* Dot row below */}
      {[8,12,16,20,24,28,32].map(x => (
        <circle key={x} cx={x} cy="30" r="1.2" fill={c} opacity="0.45" />
      ))}
    </g>
  ),
  drops: (c: string) => (
    <g>
      <rect x="2" y="2" width="36" height="36" rx="3" stroke={c} strokeWidth="1" fill="none" />
      {/* Hanging drops pattern */}
      <line x1="10" y1="8" x2="10" y2="20" stroke={c} strokeWidth="0.8" />
      <line x1="20" y1="8" x2="20" y2="16" stroke={c} strokeWidth="0.8" />
      <line x1="30" y1="8" x2="30" y2="22" stroke={c} strokeWidth="0.8" />
      <line x1="15" y1="12" x2="15" y2="26" stroke={c} strokeWidth="0.8" />
      <line x1="25" y1="12" x2="25" y2="20" stroke={c} strokeWidth="0.8" />
      <circle cx="10" cy="22" r="3" fill={c} opacity="0.6" />
      <circle cx="20" cy="18" r="2.5" fill={c} opacity="0.6" />
      <circle cx="30" cy="24" r="3.5" fill={c} opacity="0.6" />
      <circle cx="15" cy="28" r="3" fill={c} opacity="0.6" />
      <circle cx="25" cy="22" r="2.5" fill={c} opacity="0.6" />
      <line x1="6" y1="8" x2="34" y2="8" stroke={c} strokeWidth="0.6" opacity="0.5" />
    </g>
  ),
  lotus: (c: string) => (
    <g>
      <rect x="2" y="2" width="36" height="36" rx="3" stroke={c} strokeWidth="1" fill="none" />
      {/* Lotus side view */}
      <path d="M20,28 C16,24 10,20 10,15 C10,12 12,10 14,11 C16,12 18,16 20,20 C22,16 24,12 26,11 C28,10 30,12 30,15 C30,20 24,24 20,28Z"
        stroke={c} strokeWidth="1" fill={c} fillOpacity="0.3" />
      <path d="M20,28 C18,23 14,18 15,14 C17,15 19,19 20,24 C21,19 23,15 25,14 C26,18 22,23 20,28Z"
        fill={c} opacity="0.5" />
      {/* Side petals */}
      <path d="M12,20 C8,18 6,14 8,12 C10,14 11,18 12,20Z" fill={c} opacity="0.35" />
      <path d="M28,20 C32,18 34,14 32,12 C30,14 29,18 28,20Z" fill={c} opacity="0.35" />
      {/* Base water line */}
      <line x1="6" y1="30" x2="34" y2="30" stroke={c} strokeWidth="0.6" opacity="0.4" />
      <path d="M6,30 Q10,28 14,30 Q18,32 22,30 Q26,28 30,30 Q32,31 34,30"
        stroke={c} strokeWidth="0.6" fill="none" opacity="0.3" />
    </g>
  ),
  spiral: (c: string) => (
    <g>
      <rect x="2" y="2" width="36" height="36" rx="3" stroke={c} strokeWidth="1" fill="none" />
      {/* Concentric spiral-like arcs */}
      <path d="M20,20 C20,20 14,20 14,14 C14,10 17,8 20,8 C26,8 32,13 32,20 C32,28 25,34 18,34 C10,34 6,28 6,22"
        stroke={c} strokeWidth="1.2" fill="none" />
      <path d="M20,20 C20,20 16,20 16,17 C16,15 18,14 20,14 C23,14 26,17 26,20"
        stroke={c} strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="20" cy="20" r="2.5" fill={c} opacity="0.8" />
    </g>
  ),
};

type TileKey = keyof typeof FolkTiles;
const TILE_SEQUENCE: TileKey[] = [
  "flower","starburst","mountain","heart",
  "rainbow","lotus","drops","spiral",
  "starburst","mountain","heart","flower",
  "lotus","spiral","flower","mountain",
];

export function FolkTileGrid({
  cols = 4, rows = 4, tileSize = 44, color = "currentColor", className, opacity = 1,
}: {
  cols?: number; rows?: number; tileSize?: number;
  color?: string; className?: string; opacity?: number;
}) {
  const gap = 4;
  const w = cols * tileSize + (cols - 1) * gap;
  const h = rows * tileSize + (rows - 1) * gap;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none"
      aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const idx = (r * cols + c) % TILE_SEQUENCE.length;
          const key = TILE_SEQUENCE[idx];
          const tx = c * (tileSize + gap);
          const ty = r * (tileSize + gap);
          const scale = tileSize / 40;
          return (
            <g key={`${r}-${c}`} transform={`translate(${tx}, ${ty}) scale(${scale})`}>
              {FolkTiles[key](color)}
            </g>
          );
        })
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   QUATREFOIL LATTICE — fleur-de-lis ogee grid
   Inspired by: second reference image (terracotta + cream)
   Use: Hero section background, CTA banner decoration.
═══════════════════════════════════════════════════════ */
export function QuatrefoilLattice({
  width = 320, height = 240, color = "currentColor", className, opacity = 1,
}: {
  width?: number; height?: number; color?: string; className?: string; opacity?: number;
}) {
  // Ogee cell = 60×80 px
  const cw = 60; const ch = 80;
  const cols = Math.ceil(width / cw) + 1;
  const rows = Math.ceil(height / ch) + 1;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
      fill="none" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
      <defs>
        <pattern id="quatrefoil-cell" x="0" y="0" width={cw} height={ch} patternUnits="userSpaceOnUse">
          {/* Ogee / pointed arch shape */}
          <path
            d={`M0,${ch/2} Q0,0 ${cw/2},0 Q${cw},0 ${cw},${ch/2} Q${cw},${ch} ${cw/2},${ch} Q0,${ch} 0,${ch/2}Z`}
            stroke={color} strokeWidth="0.8" fill="none" opacity="0.5"
          />
          {/* Inner quatrefoil */}
          <path
            d={`M${cw/2},${ch/2-10} Q${cw/2+8},${ch/2-8} ${cw/2+10},${ch/2} Q${cw/2+8},${ch/2+8} ${cw/2},${ch/2+10} Q${cw/2-8},${ch/2+8} ${cw/2-10},${ch/2} Q${cw/2-8},${ch/2-8} ${cw/2},${ch/2-10}Z`}
            stroke={color} strokeWidth="0.6" fill="none" opacity="0.4"
          />
          {/* Fleur-de-lis simplified */}
          {/* Stem */}
          <line x1={cw/2} y1={ch/2+4} x2={cw/2} y2={ch/2+12} stroke={color} strokeWidth="1" />
          {/* Center petal */}
          <path d={`M${cw/2},${ch/2-2} C${cw/2-4},${ch/2-8} ${cw/2-4},${ch/2-14} ${cw/2},${ch/2-12} C${cw/2+4},${ch/2-14} ${cw/2+4},${ch/2-8} ${cw/2},${ch/2-2}Z`}
            fill={color} opacity="0.7" />
          {/* Left petal */}
          <path d={`M${cw/2-2},${ch/2-4} C${cw/2-8},${ch/2-8} ${cw/2-12},${ch/2-6} ${cw/2-10},${ch/2-2} C${cw/2-8},${ch/2} ${cw/2-4},${ch/2} ${cw/2-2},${ch/2-4}Z`}
            fill={color} opacity="0.6" />
          {/* Right petal */}
          <path d={`M${cw/2+2},${ch/2-4} C${cw/2+8},${ch/2-8} ${cw/2+12},${ch/2-6} ${cw/2+10},${ch/2-2} C${cw/2+8},${ch/2} ${cw/2+4},${ch/2} ${cw/2+2},${ch/2-4}Z`}
            fill={color} opacity="0.6" />
          {/* Base bar */}
          <line x1={cw/2-5} y1={ch/2+4} x2={cw/2+5} y2={ch/2+4} stroke={color} strokeWidth="1.2" />
          {/* Connector circles at corners */}
          <circle cx="0"    cy={ch/2} r="4" stroke={color} strokeWidth="0.5" fill="none" opacity="0.35" />
          <circle cx={cw}   cy={ch/2} r="4" stroke={color} strokeWidth="0.5" fill="none" opacity="0.35" />
          <circle cx={cw/2} cy="0"    r="4" stroke={color} strokeWidth="0.5" fill="none" opacity="0.35" />
          <circle cx={cw/2} cy={ch}   r="4" stroke={color} strokeWidth="0.5" fill="none" opacity="0.35" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill="url(#quatrefoil-cell)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   LOTUS VARIANTS — 4 distinct lotus silhouettes
   Inspired by: third reference image (teal lotus icons)
═══════════════════════════════════════════════════════ */
export function LotusBloom({
  variant = 1, size = 48, color = "currentColor", className, opacity = 1,
}: {
  variant?: 1 | 2 | 3 | 4; size?: number; color?: string; className?: string; opacity?: number;
}) {
  const variants: Record<number, React.ReactElement> = {
    // 1 — Classic radial, 8 petals
    1: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill={color} aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <ellipse cx="40" cy="22" rx="7" ry="18" opacity="0.8" />
        <ellipse cx="40" cy="22" rx="7" ry="18" opacity="0.8" transform="rotate(45 40 40)" />
        <ellipse cx="40" cy="22" rx="7" ry="18" opacity="0.8" transform="rotate(90 40 40)" />
        <ellipse cx="40" cy="22" rx="7" ry="18" opacity="0.8" transform="rotate(135 40 40)" />
        <ellipse cx="40" cy="22" rx="7" ry="18" opacity="0.8" transform="rotate(180 40 40)" />
        <ellipse cx="40" cy="22" rx="7" ry="18" opacity="0.8" transform="rotate(225 40 40)" />
        <ellipse cx="40" cy="22" rx="7" ry="18" opacity="0.8" transform="rotate(270 40 40)" />
        <ellipse cx="40" cy="22" rx="7" ry="18" opacity="0.8" transform="rotate(315 40 40)" />
        <circle cx="40" cy="40" r="10" />
      </svg>
    ),
    // 2 — Side view, stacked petals
    2: (
      <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 80 56" fill={color} aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        {/* Main petals */}
        <path d="M40,50 C32,42 24,32 28,22 C32,28 36,38 40,46 C44,38 48,28 52,22 C56,32 48,42 40,50Z" opacity="0.9" />
        <path d="M40,50 C28,40 16,28 22,16 C28,24 34,36 40,46 C46,36 52,24 58,16 C64,28 52,40 40,50Z" opacity="0.65" />
        <path d="M40,50 C24,38 10,24 18,10 C24,20 32,34 40,46 C48,34 56,20 62,10 C70,24 56,38 40,50Z" opacity="0.45" />
        {/* Base water line */}
        <ellipse cx="40" cy="52" rx="28" ry="4" opacity="0.3" />
      </svg>
    ),
    // 3 — Geometric outlined lotus mandala
    3: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <circle cx="40" cy="40" r="36" strokeWidth="1" />
        <circle cx="40" cy="40" r="24" strokeWidth="0.8" />
        {/* 8 petal outlines */}
        {[0,45,90,135,180,225,270,315].map(a => (
          <ellipse key={a} cx="40" cy="22" rx="6" ry="16"
            strokeWidth="1" transform={`rotate(${a} 40 40)`} />
        ))}
        <circle cx="40" cy="40" r="8" strokeWidth="1.2" fill={color} fillOpacity="0.7" />
      </svg>
    ),
    // 4 — Multi-layer open bloom
    4: (
      <svg width={size} height={Math.round(size * 0.75)} viewBox="0 0 80 60" fill={color} aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        {/* Layer 1 — widest outer petals */}
        <path d="M40,52 C30,44 14,34 18,22 C24,30 32,42 40,50 C48,42 56,30 62,22 C66,34 50,44 40,52Z" opacity="0.4" />
        {/* Layer 2 */}
        <path d="M40,50 C32,42 20,30 25,18 C30,26 36,40 40,48 C44,40 50,26 55,18 C60,30 48,42 40,50Z" opacity="0.6" />
        {/* Layer 3 — inner */}
        <path d="M40,46 C34,38 26,28 30,18 C34,24 38,36 40,44 C42,36 46,24 50,18 C54,28 46,38 40,46Z" opacity="0.8" />
        {/* Center */}
        <circle cx="40" cy="20" r="6" />
        <circle cx="40" cy="20" r="2.5" fill="none" stroke="white" strokeWidth="0.8" />
        {/* Base */}
        <ellipse cx="40" cy="54" rx="20" ry="4" opacity="0.25" />
      </svg>
    ),
  };
  return variants[variant] ?? variants[1];
}

/* ═══════════════════════════════════════════════════════
   ANCIENT SYMBOLS — wellness/spiritual line art icons
   Inspired by: fourth reference (Body/Mind/Spirit set)
   Each symbol: 48×48 viewBox, line art, single color.
═══════════════════════════════════════════════════════ */
export type AncientSymbolName =
  | "mind" | "spirit" | "growth" | "knowledge"
  | "peace" | "light" | "awaken" | "energy"
  | "harmony" | "alignment" | "body" | "balance";

export function AncientSymbol({
  name, size = 48, color = "currentColor", className, opacity = 1,
}: {
  name: AncientSymbolName; size?: number; color?: string; className?: string; opacity?: number;
}) {
  const paths: Record<AncientSymbolName, React.ReactElement> = {
    // MIND — spiral (inward awareness)
    mind: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <path d="M24,24 C24,24 16,24 16,17 C16,12 20,10 24,10 C30,10 36,15 36,22 C36,31 28,38 20,38 C11,38 6,30 6,24" strokeWidth="2" />
        <path d="M24,24 C24,24 20,24 20,21 C20,19 22,18 24,18 C27,18 30,21 30,24" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="2.5" fill={color} />
      </svg>
    ),
    // SPIRIT — bowl with dots above (like a diya)
    spirit: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <path d="M10,32 Q10,40 24,40 Q38,40 38,32" strokeWidth="2" />
        <line x1="10" y1="32" x2="38" y2="32" strokeWidth="1.5" />
        <circle cx="18" cy="20" r="2" fill={color} />
        <circle cx="24" cy="15" r="2.5" fill={color} />
        <circle cx="30" cy="20" r="2" fill={color} />
        <circle cx="24" cy="8"  r="1.5" fill={color} opacity="0.5" />
      </svg>
    ),
    // GROWTH — branching plant (trident/tree)
    growth: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <line x1="24" y1="40" x2="24" y2="14" strokeWidth="2" />
        <path d="M24,20 C20,16 14,14 12,10" strokeWidth="1.5" />
        <path d="M24,20 C28,16 34,14 36,10" strokeWidth="1.5" />
        <path d="M24,28 C19,24 13,23 10,20" strokeWidth="1.2" />
        <path d="M24,28 C29,24 35,23 38,20" strokeWidth="1.2" />
        <circle cx="12" cy="10" r="2.5" fill={color} />
        <circle cx="36" cy="10" r="2.5" fill={color} />
        <circle cx="10" cy="20" r="2" fill={color} opacity="0.7" />
        <circle cx="38" cy="20" r="2" fill={color} opacity="0.7" />
      </svg>
    ),
    // KNOWLEDGE — key/tree cross
    knowledge: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <circle cx="24" cy="14" r="8" strokeWidth="2" />
        <circle cx="24" cy="14" r="4" strokeWidth="1" />
        <line x1="24" y1="22" x2="24" y2="42" strokeWidth="2" />
        <line x1="18" y1="30" x2="30" y2="30" strokeWidth="1.5" />
        <line x1="20" y1="36" x2="28" y2="36" strokeWidth="1.5" />
        <circle cx="24" cy="14" r="1.5" fill={color} />
      </svg>
    ),
    // PEACE — 3 wave lines
    peace: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <path d="M8,18 Q14,13 20,18 Q26,23 32,18 Q38,13 44,18" strokeWidth="2" />
        <path d="M8,26 Q14,21 20,26 Q26,31 32,26 Q38,21 44,26" strokeWidth="1.8" />
        <path d="M8,34 Q14,29 20,34 Q26,39 32,34 Q38,29 44,34" strokeWidth="1.5" opacity="0.7" />
      </svg>
    ),
    // LIGHT — sun with surrounding dots
    light: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <circle cx="24" cy="24" r="8" strokeWidth="1.8" />
        <circle cx="24" cy="24" r="3" fill={color} opacity="0.8" />
        {/* 8 rays */}
        <line x1="24" y1="8"  x2="24" y2="13"  strokeWidth="1.5" />
        <line x1="24" y1="35" x2="24" y2="40"  strokeWidth="1.5" />
        <line x1="8"  y1="24" x2="13" y2="24"  strokeWidth="1.5" />
        <line x1="35" y1="24" x2="40" y2="24"  strokeWidth="1.5" />
        <line x1="12.7" y1="12.7" x2="16.2" y2="16.2" strokeWidth="1.5" />
        <line x1="31.8" y1="31.8" x2="35.3" y2="35.3" strokeWidth="1.5" />
        <line x1="35.3" y1="12.7" x2="31.8" y2="16.2" strokeWidth="1.5" />
        <line x1="16.2" y1="31.8" x2="12.7" y2="35.3" strokeWidth="1.5" />
        {/* Surrounding dots */}
        <circle cx="24" cy="6" r="1.5" fill={color} opacity="0.5" />
        <circle cx="24" cy="42" r="1.5" fill={color} opacity="0.5" />
        <circle cx="6" cy="24" r="1.5" fill={color} opacity="0.5" />
        <circle cx="42" cy="24" r="1.5" fill={color} opacity="0.5" />
      </svg>
    ),
    // AWAKEN — eye with lashes + dots
    awaken: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <path d="M6,24 Q24,10 42,24 Q24,38 6,24Z" strokeWidth="1.8" />
        <circle cx="24" cy="24" r="5" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="2" fill={color} />
        {/* Eyelashes */}
        <line x1="14" y1="20" x2="12" y2="16" strokeWidth="1.2" />
        <line x1="20" y1="16" x2="19" y2="12" strokeWidth="1.2" />
        <line x1="24" y1="15" x2="24" y2="11" strokeWidth="1.2" />
        <line x1="28" y1="16" x2="29" y2="12" strokeWidth="1.2" />
        <line x1="34" y1="20" x2="36" y2="16" strokeWidth="1.2" />
        {/* Dots above */}
        <circle cx="20" cy="10" r="1.5" fill={color} opacity="0.5" />
        <circle cx="24" cy="9"  r="1.5" fill={color} opacity="0.5" />
        <circle cx="28" cy="10" r="1.5" fill={color} opacity="0.5" />
      </svg>
    ),
    // ENERGY — galaxy spiral
    energy: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <path d="M24,24 C22,22 18,20 16,22 C14,25 16,30 20,32 C26,35 34,32 36,26 C38,18 32,10 24,10 C14,10 6,18 6,28 C6,38 14,44 24,44"
          strokeWidth="1.8" />
        <path d="M24,24 C23,23 21,22 20,23 C19,25 20,27 22,28 C25,29 28,27 28,24"
          strokeWidth="1.2" />
        <circle cx="24" cy="24" r="2.5" fill={color} />
      </svg>
    ),
    // HARMONY — two linked curves/crescents
    harmony: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <path d="M14,24 C14,16 20,10 24,14 C20,14 18,18 18,24 C18,30 20,34 24,34 C20,38 14,32 14,24Z" strokeWidth="1.8" />
        <path d="M34,24 C34,32 28,38 24,34 C28,34 30,30 30,24 C30,18 28,14 24,14 C28,10 34,16 34,24Z" strokeWidth="1.8" />
        <circle cx="24" cy="16" r="2.5" fill={color} />
        <circle cx="24" cy="32" r="2.5" fill={color} />
      </svg>
    ),
    // ALIGNMENT — compass cross
    alignment: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <circle cx="24" cy="24" r="18" strokeWidth="1.5" />
        <line x1="24" y1="6"  x2="24" y2="42" strokeWidth="1.5" />
        <line x1="6"  y1="24" x2="42" y2="24" strokeWidth="1.5" />
        <circle cx="24" cy="6"  r="3" fill={color} />
        <circle cx="24" cy="42" r="3" fill={color} />
        <circle cx="6"  cy="24" r="3" fill={color} />
        <circle cx="42" cy="24" r="3" fill={color} />
        <circle cx="24" cy="24" r="5" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="2" fill={color} opacity="0.8" />
        {/* Small dots at diagonals */}
        <circle cx="13.3" cy="13.3" r="1.5" fill={color} opacity="0.4" />
        <circle cx="34.7" cy="13.3" r="1.5" fill={color} opacity="0.4" />
        <circle cx="13.3" cy="34.7" r="1.5" fill={color} opacity="0.4" />
        <circle cx="34.7" cy="34.7" r="1.5" fill={color} opacity="0.4" />
      </svg>
    ),
    // BODY — figure with raised arm (like the symbol)
    body: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <circle cx="24" cy="10" r="5" strokeWidth="1.8" />
        <path d="M24,15 L24,32" strokeWidth="2" />
        <path d="M24,20 L16,28" strokeWidth="1.8" />
        <path d="M24,20 L34,14" strokeWidth="1.8" />
        <path d="M24,32 L18,42" strokeWidth="1.8" />
        <path d="M24,32 L30,42" strokeWidth="1.8" />
      </svg>
    ),
    // BALANCE — scales/bowl balance
    balance: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeLinecap="round" aria-hidden className={className} style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}>
        <line x1="24" y1="8" x2="24" y2="36" strokeWidth="2" />
        <line x1="10" y1="18" x2="38" y2="18" strokeWidth="1.5" />
        <path d="M8,22 Q8,30 15,30 Q22,30 22,22" strokeWidth="1.5" />
        <path d="M26,22 Q26,30 33,30 Q40,30 40,22" strokeWidth="1.5" />
        <line x1="16" y1="36" x2="32" y2="36" strokeWidth="2" />
        <circle cx="24" cy="8" r="3" fill={color} opacity="0.7" />
      </svg>
    ),
  };
  return paths[name] ?? paths["light"];
}
