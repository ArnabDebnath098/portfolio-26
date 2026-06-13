import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared section width + gutters. Every home section fills this exact
 * container so headings, grids, and cards line up on one vertical edge
 * as the page scrolls.
 */
export const SECTION_CONTAINER = "mx-auto w-full max-w-[1104px] px-6 sm:px-8 lg:px-12";

/** Consistent vertical rhythm between stacked sections. */
export const SECTION_RHYTHM = "py-20 sm:py-28";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({ id, children, className, containerClassName }: SectionProps) {
  return (
    <section data-id={id} className={cn("relative", SECTION_RHYTHM, className)}>
      <div data-id={`${id}-inner`} className={cn(SECTION_CONTAINER, containerClassName)}>
        {children}
      </div>
    </section>
  );
}
