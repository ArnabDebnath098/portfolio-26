"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface CaseStudyModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

type LenisInstance = { stop: () => void; start: () => void };

function getLenis(): LenisInstance | undefined {
  return (window as unknown as { lenis?: LenisInstance }).lenis;
}

export function CaseStudyModal({ open, onClose, children }: CaseStudyModalProps) {
  const [mounted, setMounted] = useState(false);

  // Ref-based onClose access so the lock effect only depends on `open` —
  // avoids rapid lenis stop/start cycles when the parent passes an unstable callback.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseRef.current();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  if (!mounted) return null;

  const modal = (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="casestudy-modal"
          data-id="casestudy-modal-overlay"
          className="fixed inset-0 z-[9999] flex items-end lg:items-center lg:justify-center lg:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
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
              "w-full h-[95vh] rounded-t-xl",
              "lg:w-[95vw] lg:h-[95vh] lg:rounded-xl"
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
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
                <svg data-id="casestudy-modal-close-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable content — data-lenis-prevent stops Lenis from hijacking scroll inside */}
            <div
              data-id="casestudy-modal-content"
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain"
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
