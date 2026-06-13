"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, type CSSProperties } from "react";

/* Cinematic intro — a count-up preloader behind an editorial reveal, then the
   curtain lifts as staggered vertical slats (left → right) each carrying an
   accent leading edge.
   Timeline:
     0ms     → slats cover screen, loader counts 0→100, name rises in
     ~900ms  → AI greeting fades in (once fetched)
     ~2300ms → content fades out
     ~2350ms → slats lift upward in a staggered wave (~0.85s each)
     ~3500ms → unmount */

const SLAT_EASE = [0.76, 0, 0.24, 1] as const;
const RISE_EASE = [0.22, 1, 0.36, 1] as const;
const SLATS = 7;
const NAME = "Arnab Debnath";

export function IntroAnimation() {
  const [showGreeting, setShowGreeting] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [greeting, setGreeting] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("");

  // Live Bengaluru clock (deferred first tick to avoid a synchronous setState)
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
    const id0 = setTimeout(() => setTime(fmt()), 0);
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => {
      clearTimeout(id0);
      clearInterval(id);
    };
  }, []);

  // Respect reduced motion — skip the whole intro (deferred so it isn't a
  // synchronous setState in the effect body).
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setDone(true), 0);
    return () => clearTimeout(id);
  }, []);

  // Fetch AI greeting immediately on mount
  useEffect(() => {
    const hour = new Date().getHours();
    const seed = Math.random().toString(36).slice(2, 8);
    fetch(`/api/greeting?hour=${hour}&seed=${seed}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setGreeting(data.greeting))
      .catch(() => setGreeting(null));
  }, []);

  // Count-up loader 0 → 100 (ease-out cubic)
  useEffect(() => {
    let raf = 0;
    let start = 0;
    const DUR = 1900;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / DUR);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Stage timeline
  useEffect(() => {
    const t2 = setTimeout(() => setShowGreeting(true), 900);
    const t3 = setTimeout(() => {
      setHideText(true);
      setOpen(true);
    }, 2300);
    const t4 = setTimeout(() => setDone(true), 3500);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (done) return null;

  const words = NAME.split(" ");

  return (
    <div data-id="intro-overlay" className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Curtain slats — lift upward in a staggered left→right wave */}
      {Array.from({ length: SLATS }).map((_, i) => (
        <motion.div
          key={i}
          data-id={`intro-slat-${i}`}
          className="absolute top-0 h-full left-[var(--slat-left)] w-[var(--slat-width)] bg-[var(--color-bg-base)]"
          style={
            {
              "--slat-left": `${(i * 100) / SLATS}%`,
              "--slat-width": `${100 / SLATS + 0.6}%`,
            } as CSSProperties
          }
          animate={open ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.85, ease: SLAT_EASE, delay: open ? i * 0.06 : 0 }}
        >
          {/* accent leading edge */}
          <span data-id={`intro-slat-edge-${i}`} aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--color-accent)]" />
        </motion.div>
      ))}

      {/* Foreground content — fades out before the curtain lifts */}
      <AnimatePresence>
        {!hideText && (
          <motion.div
            key="intro-content"
            data-id="intro-content"
            className="absolute inset-0 z-10 select-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.45, ease: "easeIn" } }}
          >
            {/* Editorial corner marks */}
            {["left-5 top-5", "right-5 top-5", "left-5 bottom-5", "right-5 bottom-5"].map((pos, i) => (
              <motion.span
                key={pos}
                data-id={`intro-corner-${i}`}
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.06 }}
                className={`absolute ${pos} font-datatype text-sm text-[var(--color-text-muted)]`}
              >
                +
              </motion.span>
            ))}

            {/* Oversized ghost wordmark behind the name */}
            <span
              data-id="intro-ghost"
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(120px,30vw,360px)] leading-none tracking-[-0.04em] text-[color-mix(in_srgb,var(--color-text-primary)_4%,transparent)]"
            >
              ’26
            </span>

            {/* Top status bar */}
            <motion.div
              data-id="intro-topbar"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-7 font-datatype text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:px-10"
            >
              <span data-id="intro-topbar-left">Portfolio — Vol. 26</span>
              <span data-id="intro-topbar-time" className="tabular-nums">BLR {time || "--:--:--"}</span>
            </motion.div>

            {/* Center block */}
            <div data-id="intro-center" className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              {/* Eyebrow */}
              <motion.div
                data-id="intro-eyebrow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: RISE_EASE }}
                className="mb-6 flex items-center gap-2 font-datatype text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]"
              >
                <span data-id="intro-emoji" className="intro-wave text-base leading-none">👋</span>
                Hello, I&apos;m
              </motion.div>

              {/* Name — big italic, word-by-word mask rise */}
              <h1
                data-id="intro-name"
                className="font-questrial! flex flex-wrap justify-center text-[clamp(44px,7.5vw,88px)] italic leading-[1.0] tracking-[-0.02em] text-[var(--color-text-primary)]"
              >
                {words.map((word, wi) => (
                  <span
                    key={wi}
                    data-id={`intro-name-word-${wi}`}
                    className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]"
                  >
                    <motion.span
                      data-id={`intro-name-word-inner-${wi}`}
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + wi * 0.09, ease: RISE_EASE }}
                    >
                      {word}
                    </motion.span>
                    {wi < words.length - 1 && <span aria-hidden>&nbsp;</span>}
                  </span>
                ))}
              </h1>

              {/* AI greeting */}
              <div data-id="intro-greeting-wrap" className="mt-7 h-6">
                <AnimatePresence>
                  {showGreeting && greeting && (
                    <motion.p
                      data-id="intro-ai-greeting"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: RISE_EASE }}
                      className="max-w-sm font-questrial text-sm leading-relaxed text-[var(--color-text-muted)]"
                    >
                      {greeting}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom meta + count-up loader + progress line */}
            <motion.div
              data-id="intro-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="absolute inset-x-0 bottom-0"
            >
              <div data-id="intro-footer-row" className="flex items-end justify-between px-6 pb-4 font-datatype text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:px-10">
                <span data-id="intro-footer-meta">12.97°N 77.59°E · Bengaluru</span>
                <span data-id="intro-footer-counter" className="tabular-nums text-[var(--color-text-primary)]">
                  {String(count).padStart(3, "0")}
                  <span data-id="intro-footer-counter-total" className="text-[var(--color-text-muted)]">/100</span>
                </span>
              </div>
              {/* Progress line — fills with the counter */}
              <div data-id="intro-progress-track" className="h-px w-full bg-[var(--color-border-subtle)]">
                <div
                  data-id="intro-progress-fill"
                  className="h-full w-full origin-left bg-[var(--color-accent)] [transform:scaleX(var(--intro-p))]"
                  style={{ "--intro-p": count / 100 } as CSSProperties}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
