"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MaskedHeadlineProps {
  /** Words wrapped in *asterisks* render in the display serif + accent color. */
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  /** false (default) animates on mount (above the fold); true waits for scroll. */
  inView?: boolean;
  "data-id"?: string;
}

/**
 * TextReveal's masked word-rise, extended for editorial headlines: words can be
 * accented (*word* → display-serif italic in the accent color) and the reveal
 * can wait until the line scrolls into view.
 */
export function MaskedHeadline({
  text,
  className,
  delay = 0,
  staggerChildren = 0.05,
  inView = false,
  "data-id": dataId,
}: MaskedHeadlineProps) {
  const words = text.split(" ");
  const containerVariants = {
    visible: { transition: { staggerChildren, delayChildren: delay } },
  };

  return (
    <motion.span
      data-id={dataId}
      className={className}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
        : { animate: "visible" })}
      variants={containerVariants}
      aria-label={text.replace(/\*/g, "")}
    >
      {words.map((raw, i) => {
        const accent = raw.startsWith("*") && raw.endsWith("*");
        const word = accent ? raw.slice(1, -1) : raw;
        return (
          <span key={i} data-id={`${dataId ?? "masked"}-word-${i}`} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <motion.span
              data-id={`${dataId ?? "masked"}-word-inner-${i}`}
              className={cn("inline-block", accent && "font-display italic text-[var(--color-accent)]")}
              variants={{
                hidden: { y: "112%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span data-id={`${dataId ?? "masked"}-sp-${i}`} className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </motion.span>
  );
}
