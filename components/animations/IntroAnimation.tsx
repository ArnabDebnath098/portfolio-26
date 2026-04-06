"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

// Cinematic curtain intro — two panels split top/bottom
// Timeline:
//   0ms    → panels cover screen, AI greeting fetch starts
//   400ms  → "👋 Hello" fades in
//   800ms  → AI greeting fades in below (once fetched)
//   2400ms → text exits + panels slide outward (900ms slide)
//   3400ms → component unmounts

const PANEL_EASE = [0.76, 0, 0.24, 1] as const;

export function IntroAnimation() {
  const [showText, setShowText] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [panelsOpen, setPanelsOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [greeting, setGreeting] = useState<string | null>(null);

  // Fetch AI greeting immediately on mount
  useEffect(() => {
    const hour = new Date().getHours();
    const seed = Math.random().toString(36).slice(2, 8);
    fetch(`/api/greeting?hour=${hour}&seed=${seed}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setGreeting(data.greeting))
      .catch(() => setGreeting(null));
  }, []);

  // Animation timeline
  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 400);
    const t2 = setTimeout(() => setShowGreeting(true), 800);
    const t3 = setTimeout(() => {
      setHideText(true);
      setPanelsOpen(true);
    }, 2400);
    const t4 = setTimeout(() => setDone(true), 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (done) return null;

  return (
    <div data-id="intro-overlay" className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Top curtain panel */}
      <motion.div
        data-id="intro-panel-top"
        className="absolute top-0 left-0 w-full h-[50.5%] bg-[var(--color-bg-base)]"
        animate={panelsOpen ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.9, ease: PANEL_EASE }}
      />

      {/* Bottom curtain panel */}
      <motion.div
        data-id="intro-panel-bottom"
        className="absolute bottom-0 left-0 w-full h-[50.5%] bg-[var(--color-bg-base)]"
        animate={panelsOpen ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.9, ease: PANEL_EASE }}
      />

      {/* Greeting — sits above both panels */}
      <AnimatePresence>
        {showText && !hideText && (
          <motion.div
            data-id="intro-greeting"
            className="relative z-10 flex flex-col items-center gap-4 select-none px-6 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Waving hand */}
            <span
              data-id="intro-emoji"
              className="text-6xl leading-none intro-wave"
            >
              👋
            </span>

            {/* Hello, I am Arnab */}
            <span
              data-id="intro-hello"
              className="text-[var(--color-text-primary)] tracking-tight intro-hello-text"
            >
              Hello, I am Arnab
            </span>

            {/* AI time-aware greeting */}
            <AnimatePresence>
              {showGreeting && greeting && (
                <motion.p
                  data-id="intro-ai-greeting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed intro-greeting-text"
                >
                  {greeting}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
