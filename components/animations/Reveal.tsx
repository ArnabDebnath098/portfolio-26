"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

type Direction = "up" | "left" | "right";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 60 },
  left: { x: -64, y: 0 },
  right: { x: 64, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  once?: boolean;
  "data-id"?: string;
}

/**
 * Fresh single-block scroll reveal — rises in while a blur clears and the
 * element settles to full opacity. Direction adds variety between sections.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  "data-id": dataId,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const o = OFFSET[direction];

  return (
    <motion.div
      ref={ref}
      data-id={dataId}
      className={className}
      initial={{ opacity: 0, x: o.x, y: o.y, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  "data-id"?: string;
}

/** Staggered container — pair with <RevealItem> for grids of cards. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  stagger = 0.12,
  once = true,
  "data-id": dataId,
}: RevealGroupProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      data-id={dataId}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Single grid item — rises + un-blurs + scales in as part of a RevealGroup. */
export function RevealItem({
  children,
  className,
  "data-id": dataId,
}: {
  children: ReactNode;
  className?: string;
  "data-id"?: string;
}) {
  return (
    <motion.div
      data-id={dataId}
      className={className}
      variants={{
        hidden: { opacity: 0, y: 48, scale: 0.97, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
