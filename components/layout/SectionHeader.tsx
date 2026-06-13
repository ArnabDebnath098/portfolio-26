import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

interface SectionHeaderProps {
  /** scope for data-ids, e.g. "project-grid" */
  id: string;
  /** running index, e.g. "01" — rendered in mono */
  index?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared, indexed editorial section header.
 * A hairline + monospaced index + eyebrow, a display-serif title, and a
 * supporting line — one consistent voice across every home section.
 */
export function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <Reveal data-id={`${id}-header`} className={cn("flex flex-col gap-5", centered && "items-center text-center", className)}>
      {/* Meta row — hairline, index, eyebrow */}
      <div
        data-id={`${id}-header-meta`}
        className={cn(
          "w-full flex items-center gap-3 border-t border-dashed border-[var(--color-border-subtle)] pt-4",
          centered && "justify-center"
        )}
      >
        {index && (
          <>
            <span data-id={`${id}-header-index`} className="font-datatype text-xs tabular-nums text-[var(--color-text-muted)]">
              {index}
            </span>
            <span data-id={`${id}-header-index-sep`} aria-hidden className="text-[var(--color-text-muted)]">
              /
            </span>
          </>
        )}
        <span data-id={`${id}-header-eyebrow`} className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          {eyebrow}
        </span>
      </div>

      {/* Title */}
      <h2
        data-id={`${id}-header-title`}
        className={cn(
          "font-display whitespace-nowrap text-[clamp(1.15rem,2.6vw,1.875rem)] leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary)]",
          centered && "mx-auto"
        )}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          data-id={`${id}-header-subtitle`}
          className={cn(
            "text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xl",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
