"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface KineticHeadlineProps {
  /** Each string is one visual line of the headline. */
  lines: string[];
  /** Tailwind classes applied to each line of type. */
  className?: string;
  /** Words rendered with the animated accent gradient (matched case-insensitively, punctuation-stripped). */
  accentWords?: string[];
  "data-id"?: string;
}

const normalize = (s: string) => s.replace(/[^a-z0-9]/gi, "").toLowerCase();

/**
 * KineticHeadline — a calm display headline. Each line rises in once on mount.
 * The plain letters carry a slow, low-amplitude weight "breathing" that travels
 * across the headline as a gentle wave (per-letter delay), and the highlighted
 * words ("designer" & "engineer") flow through an accent colour gradient.
 */
export function KineticHeadline({
  lines,
  className,
  accentWords = ["designer", "engineer"],
  "data-id": dataId,
}: KineticHeadlineProps) {
  const accentSet = new Set(accentWords.map(normalize));
  // Global letter index so the breathing wave travels continuously across lines.
  let counter = 0;

  return (
    <div data-id={dataId} className="select-none">
      {lines.map((line, li) => (
        <motion.div
          key={li}
          data-id={`kinetic-line-${li}`}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 + li * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={cn("font-clash whitespace-nowrap flex", className)}
        >
          {line.split(" ").map((word, wi) => {
            const isAccent = accentSet.has(normalize(word));
            return (
              <span
                key={wi}
                data-id={`kinetic-word-${li}-${wi}`}
                className={cn("inline-block mr-[0.26em]", isAccent && "hero-word-accent")}
              >
                {isAccent
                  ? word
                  : word.split("").map((ch, ci) => {
                      const idx = counter++;
                      return (
                        <span
                          key={ci}
                          data-id={`kinetic-char-${li}-${wi}-${ci}`}
                          className="hero-letter"
                          style={{ "--i": idx } as React.CSSProperties}
                        >
                          {ch}
                        </span>
                      );
                    })}
              </span>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}
