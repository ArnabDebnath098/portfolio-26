"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Exploration } from "@/data/explorations";

function ImageCard({ item, index }: { item: Exploration; index: number }) {
  const isPriority = index < 4;
  const [loaded, setLoaded] = useState(isPriority);

  return (
    <div
      data-id={`masonry-img-wrap-${item.id}`}
      className={cn(
        "overflow-hidden rounded-2xl group p-4 sm:p-6",
        "bg-[var(--color-bg-elevated)]",
        "flex items-center justify-center"
      )}
      style={{ "--card-max-h": `${item.maxH}px` } as React.CSSProperties}
    >
      <Image
        data-id={`masonry-img-${item.id}`}
        src={item.image}
        alt={item.title}
        width={900}
        height={1200}
        className={cn(
          "w-full h-auto max-h-[var(--card-max-h)] object-contain rounded-2xl sm:rounded-3xl transition-all duration-500",
          "group-hover:scale-[1.02]",
          loaded ? "opacity-100" : "opacity-0"
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setLoaded(true)}
        {...(isPriority ? { priority: true } : {})}
      />
    </div>
  );
}

function PlaceholderCard({ item }: { item: Exploration }) {
  return (
    <div
      data-id={`masonry-placeholder-${item.id}`}
      className={cn(
        "flex items-center justify-center rounded-2xl h-60 sm:h-80",
        "bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)]"
      )}
    >
      <span
        data-id={`masonry-placeholder-text-${item.id}`}
        className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)] opacity-40"
      >
        {item.title}
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
  return (
    <div
      data-id="masonry-grid"
      className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          data-id={`masonry-item-${item.id}`}
          className="break-inside-avoid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
        >
          {hasImages[i] ? (
            <ImageCard item={item} index={i} />
          ) : (
            <PlaceholderCard item={item} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
