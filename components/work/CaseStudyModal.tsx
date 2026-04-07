"use client";

import { ReactNode, useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface CaseStudyModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function CaseStudyModal({ open, onClose, children }: CaseStudyModalProps) {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close on Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
      lenis?.stop();
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
      lenis?.start();
    };
  }, [open, handleKey]);

  // Prevent scroll events from leaking to Lenis
  const stopPropagation = useCallback((e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  if (!mounted) return null;

  const modal = (
    <AnimatePresence mode="wait" onExitComplete={() => {
      document.body.style.overflow = "";
      const lenis = (window as unknown as { lenis?: { start: () => void } }).lenis;
      lenis?.start();
    }}>
      {open && (
        <motion.div
          key="casestudy-modal"
          data-id="casestudy-modal-overlay"
          className="fixed inset-0 z-[9999] flex items-end lg:items-center lg:justify-center lg:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onWheel={stopPropagation}
          onTouchMove={stopPropagation}
        >
          {/* Backdrop */}
          <motion.div
            data-id="casestudy-modal-backdrop"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal panel — bottom sheet on mobile, centered on desktop */}
          <motion.div
            data-id="casestudy-modal-panel"
            className={cn(
              "relative z-10 flex flex-col",
              "bg-[var(--color-bg-base)]",
              "border border-[var(--color-border-default)]",
              "overflow-hidden",
              // Mobile: bottom sheet
              "w-full h-[95vh] rounded-t-[24px]",
              // Desktop: centered modal
              "lg:w-[95vw] lg:h-[95vh] lg:rounded-[24px]"
            )}
            // Mobile: slide up from bottom; Desktop: scale in
            initial={{ y: "100%", opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 1 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Handle — mobile only */}
            <div data-id="casestudy-modal-handle-wrap" className="flex justify-center pt-3 pb-1 lg:hidden">
              <div
                data-id="casestudy-modal-handle"
                className="w-10 h-1 rounded-full bg-[var(--color-border-strong)]"
              />
            </div>

            {/* Close button */}
            <div data-id="casestudy-modal-header" className="absolute top-4 right-4 z-20">
              <button
                data-id="casestudy-modal-close"
                onClick={onClose}
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-full",
                  "bg-[var(--color-bg-elevated)]",
                  "border border-[var(--color-border-default)]",
                  "text-[var(--color-text-muted)]",
                  "hover:text-[var(--color-text-primary)]",
                  "hover:border-[var(--color-border-strong)]",
                  "transition-colors duration-200"
                )}
                aria-label="Close case study"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div
              ref={scrollRef}
              data-id="casestudy-modal-content"
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain rounded-t-2xl lg:rounded-2xl"
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
