"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function WipBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after intro animation completes (~3.5s)
    const show = setTimeout(() => setVisible(true), 3800);
    // Auto-dismiss after 8s
    const hide = setTimeout(() => setVisible(false), 11800);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-id="wip-banner-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
        >
          <div
            data-id="wip-banner"
            className={cn(
              "relative flex items-start gap-3 px-5 py-4 rounded-2xl",
              "bg-[var(--color-bg-elevated)]/95 backdrop-blur-xl",
              "border border-[var(--color-border-default)]",
              "shadow-lg"
            )}
          >
            <span data-id="wip-banner-icon" className="text-lg leading-none mt-0.5">🚧</span>
            <div data-id="wip-banner-text" className="flex-1 min-w-0">
              <p data-id="wip-banner-title" className="text-sm font-semibold text-[var(--color-text-primary)]">
                Work in progress
              </p>
              <p data-id="wip-banner-desc" className="text-xs text-[var(--color-text-muted)] leading-relaxed mt-1">
                This portfolio is still being refined — writing detailed case studies and polishing every pixel. Check back soon!
              </p>
            </div>
            <button
              data-id="wip-banner-close"
              onClick={() => setVisible(false)}
              className={cn(
                "w-6 h-6 flex items-center justify-center shrink-0 rounded-full",
                "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                "hover:bg-[var(--color-bg-surface)]",
                "transition-colors cursor-pointer"
              )}
              aria-label="Dismiss"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
