/**
 * JaliDivider — Mughal jali lattice pattern section divider
 * Inspired by geometric stone screens in Indian temple/palace architecture
 */

type JaliDividerProps = {
  className?: string;
  color?: string;
  opacity?: number;
  "data-id"?: string;
};

export function JaliDivider({
  className = "",
  color = "var(--color-ornament)",
  opacity = 0.35,
  "data-id": dataId,
}: JaliDividerProps) {
  return (
    <div
      aria-hidden
      data-id={dataId ?? "jali-divider"}
      className={`w-full overflow-hidden flex items-center justify-center py-2 ${className}`}
    >
      <svg
        width="100%"
        height="24"
        viewBox="0 0 1200 24"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ "--orn-opacity": String(opacity) } as React.CSSProperties}
      >
        {/* Central ornament */}
        <g transform="translate(600, 12)">
          <JaliMotif color={color} />
        </g>

        {/* Repeating lattice left */}
        {[-1, -2, -3, -4, -5, -6, -7, -8].map((i) => (
          <g key={`l${i}`} transform={`translate(${600 + i * 72}, 12)`}>
            <LatticeUnit color={color} />
          </g>
        ))}

        {/* Repeating lattice right */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <g key={`r${i}`} transform={`translate(${600 + i * 72}, 12)`}>
            <LatticeUnit color={color} />
          </g>
        ))}

        {/* Fade lines on edges */}
        <line x1="0" y1="12" x2="168" y2="12" stroke={color} strokeWidth="0.5" />
        <line x1="1032" y1="12" x2="1200" y2="12" stroke={color} strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function JaliMotif({ color }: { color: string }) {
  return (
    <g>
      {/* StarInDiamond-style center — 8pt star in diamond */}
      <polygon points="0,-11 11,0 0,11 -11,0"
        stroke={color} strokeWidth="1" fill="none" />
      <polygon points="0,-7 7,0 0,7 -7,0"
        stroke={color} strokeWidth="0.5" fill="none" />
      {/* 8-point star fill */}
      <polygon
        points="0,-6 1.8,-1.8 6,0 1.8,1.8 0,6 -1.8,1.8 -6,0 -1.8,-1.8"
        fill={color} opacity="0.7"
      />
      {/* Cardinal dots */}
      <circle cx="0"  cy="-11" r="1.2" fill={color} />
      <circle cx="11" cy="0"   r="1.2" fill={color} />
      <circle cx="0"  cy="11"  r="1.2" fill={color} />
      <circle cx="-11" cy="0"  r="1.2" fill={color} />
      {/* Outer ring */}
      <circle cx="0" cy="0" r="15" stroke={color} strokeWidth="0.4" fill="none" />
    </g>
  );
}

function LatticeUnit({ color }: { color: string }) {
  return (
    <g>
      {/* Small diamond */}
      <polygon
        points="0,-5 4,0 0,5 -4,0"
        stroke={color}
        strokeWidth="0.75"
        fill="none"
      />
      {/* Horizontal connector */}
      <line x1="-36" y1="0" x2="-4" y2="0" stroke={color} strokeWidth="0.4" />
      <line x1="4" y1="0" x2="36" y2="0" stroke={color} strokeWidth="0.4" />
    </g>
  );
}
