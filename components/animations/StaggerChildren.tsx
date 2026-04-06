"use client";

import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  "data-id"?: string;
}

export function StaggerChildren({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  once = true,
  "data-id": dataId,
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      data-id={dataId}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
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
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
