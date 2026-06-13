"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Floating scroll indicator — a short vertical bar docked to the right edge.
 * The fill (scaleY) and the travelling marker are both driven by a single
 * CSS custom property `--sb` (0 → 1), updated off-thread by Motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      data-id="scroll-progress"
      aria-hidden
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ "--sb": progress } as unknown as React.CSSProperties}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <div
        data-id="scroll-progress-track"
        className="relative h-[34vh] w-[2px] bg-[color-mix(in_srgb,var(--color-text-primary)_14%,transparent)]"
      >
        {/* Filled portion grows from the top */}
        <div
          data-id="scroll-progress-fill"
          className="absolute inset-x-0 top-0 h-full origin-top bg-[var(--color-text-primary)] [transform:scaleY(var(--sb,0))]"
        />
        {/* Diamond marker rides the leading edge */}
        <div
          data-id="scroll-progress-marker"
          className="absolute left-1/2 top-0 h-2 w-2 bg-[var(--color-accent)] [transform:translate(-50%,-50%)_translateY(calc(var(--sb,0)*34vh))_rotate(45deg)]"
        />
      </div>
    </motion.div>
  );
}
