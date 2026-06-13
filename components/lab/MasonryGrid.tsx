"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Exploration } from "@/data/explorations";

/** Responsive column count — 1 / 2 / 3, recomputed on resize. */
function useColumnCount() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setCols(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return cols;
}

function ImageCard({ item, index }: { item: Exploration; index: number }) {
  const isPriority = index < 3;
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      data-id={`masonry-img-wrap-${item.id}`}
      className={cn(
        "group relative flex flex-col border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]",
        "transition-colors duration-300 hover:border-[var(--color-border-strong)]"
      )}
      style={{ "--card-max-h": `${item.maxH}px` } as React.CSSProperties}
    >
      <div
        data-id={`masonry-img-media-${item.id}`}
        className="relative flex items-center justify-center overflow-hidden p-4 sm:p-6"
      >
        {!loaded && (
          <div
            data-id={`masonry-img-skeleton-${item.id}`}
            className="absolute inset-0 animate-pulse bg-[var(--color-bg-subtle)]"
          />
        )}
        <Image
          data-id={`masonry-img-${item.id}`}
          src={item.image}
          alt={item.title}
          width={900}
          height={1200}
          loading={isPriority ? "eager" : "lazy"}
          decoding={isPriority ? "sync" : "async"}
          className={cn(
            "relative z-10 block h-auto max-h-[var(--card-max-h)] w-auto max-w-full",
            "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
            loaded ? "opacity-100" : "opacity-0"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setLoaded(true)}
          {...(isPriority ? { priority: true } : {})}
        />
      </div>

      {/* Caption — sharp hairline divider, title + index */}
      <div
        data-id={`masonry-caption-${item.id}`}
        className="flex items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] px-4 py-3"
      >
        <span
          data-id={`masonry-title-${item.id}`}
          className="truncate text-xs uppercase tracking-[0.12em] text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent)]"
        >
          {item.title}
        </span>
        <span
          data-id={`masonry-index-${item.id}`}
          className="shrink-0 font-datatype text-[10px] tabular-nums text-[var(--color-text-muted)]"
        >
          ({String(index + 1).padStart(2, "0")})
        </span>
      </div>
    </div>
  );
}

function PlaceholderCard({ item, index }: { item: Exploration; index: number }) {
  return (
    <div
      data-id={`masonry-placeholder-${item.id}`}
      className={cn(
        "flex h-60 items-center justify-center border border-[var(--color-border-subtle)] sm:h-80",
        "bg-[var(--color-bg-elevated)]"
      )}
    >
      <span
        data-id={`masonry-placeholder-text-${item.id}`}
        className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)] opacity-40"
      >
        {String(index + 1).padStart(2, "0")} · {item.title}
      </span>
    </div>
  );
}

export function MasonryGrid({
  items,
  hasImages,
}: {
  items: Exploration[];
  hasImages: boolean[];
}) {
  const cols = useColumnCount();

  // Greedy balance: drop each item into the currently shortest column (by an
  // estimated running height) so columns end near-equal — no CSS column-fill
  // gap, so the footer sits right under the grid.
  const columns: { item: Exploration; index: number }[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  items.forEach((item, index) => {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push({ item, index });
    // maxH is the image cap; +96 approximates padding + caption row.
    heights[shortest] += item.maxH + 96;
  });

  return (
    <div data-id="masonry-grid" className="flex items-start gap-4 sm:gap-5">
      {columns.map((col, ci) => (
        <div
          key={ci}
          data-id={`masonry-column-${ci}`}
          className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5"
        >
          {col.map(({ item, index }) => (
            <motion.div
              key={item.id}
              data-id={`masonry-item-${item.id}`}
              initial={{ opacity: 0, y: 28, scale: 0.97, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (ci * 0.06), ease: [0.22, 1, 0.36, 1] }}
            >
              {hasImages[index] ? (
                <ImageCard item={item} index={index} />
              ) : (
                <PlaceholderCard item={item} index={index} />
              )}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
