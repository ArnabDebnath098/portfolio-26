/**
 * MandalaStamp — Circular mandala ornament used as achievement badges / section seals
 * Inspired by Indian geometric mandala art, temple rosettes, and kolam patterns
 */

type MandalaStampProps = {
  size?: number;
  color?: string;
  className?: string;
  filled?: boolean;
  "data-id"?: string;
};

export function MandalaStamp({
  size = 48,
  color = "var(--color-ornament)",
  className = "",
  filled = false,
  "data-id": dataId,
}: MandalaStampProps) {
  const r = size / 2;
  const petal = r * 0.28;
  const inner = r * 0.18;

  return (
    <svg
      data-id={dataId ?? "mandala-stamp"}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Outer ring */}
      <circle
        cx={r} cy={r} r={r - 1.5}
        stroke={color} strokeWidth="1"
        fill={filled ? color : "none"}
        fillOpacity={filled ? 0.08 : 0}
      />

      {/* Middle ring */}
      <circle cx={r} cy={r} r={r * 0.72} stroke={color} strokeWidth="0.75" fill="none" />

      {/* 8 petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const px = r + Math.cos(rad) * r * 0.52;
        const py = r + Math.sin(rad) * r * 0.52;
        return (
          <ellipse
            key={angle}
            cx={px}
            cy={py}
            rx={petal * 0.55}
            ry={petal}
            transform={`rotate(${angle}, ${px}, ${py})`}
            stroke={color}
            strokeWidth="0.75"
            fill="none"
          />
        );
      })}

      {/* 4 cardinal dots */}
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const dx = r + Math.cos(rad) * r * 0.78;
        const dy = r + Math.sin(rad) * r * 0.78;
        return <circle key={`dot${angle}`} cx={dx} cy={dy} r={1.5} fill={color} />;
      })}

      {/* Inner star — 4 points */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const ix = r + Math.cos(rad) * inner;
        const iy = r + Math.sin(rad) * inner;
        return (
          <line
            key={`star${angle}`}
            x1={r} y1={r}
            x2={ix} y2={iy}
            stroke={color}
            strokeWidth="0.6"
          />
        );
      })}

      {/* Center dot */}
      <circle cx={r} cy={r} r={2.5} fill={color} />
      <circle cx={r} cy={r} r={r * 0.14} stroke={color} strokeWidth="0.75" fill="none" />
    </svg>
  );
}
