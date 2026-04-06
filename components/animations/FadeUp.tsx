"use client";

import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  "data-id"?: string;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  "data-id": dataId,
}: FadeUpProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      data-id={dataId}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
