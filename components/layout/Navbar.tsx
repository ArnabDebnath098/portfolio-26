"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/work",     label: "Work"     },
  { href: "/about",    label: "Info"     },
  { href: "/lab",      label: "Lab"      },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div data-id="theme-toggle-placeholder" className="w-7 h-7" />;
  const isDark = theme === "dark";

  return (
    <button
      data-id="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative w-7 h-7 flex items-center justify-center",
        "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
        "transition-all duration-200 cursor-pointer"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
          transition={{ duration: 0.18 }}
          className="absolute"
        >
          {isDark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect case study page and extract title from the slug
  const caseStudySlug = pathname.match(/^\/work\/([^/]+)$/)?.[1] ?? null;
  const caseStudyTitle = caseStudySlug
    ? caseStudySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  return (
    <>
      {/* ── Desktop: floating pill ── */}
      <motion.div
        data-id="navbar-desktop"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block max-w-[calc(100vw-2rem)]"
      >
        <div
          data-id="navbar-desktop-pill"
          className={cn(
            "flex items-center gap-3 rounded-full pl-6 pr-4",
            "backdrop-blur-xl nav-pill-shadow",
            "bg-[var(--color-nav-bg)]",
            "border border-[var(--color-nav-border)]",
          )}
        >
          {caseStudyTitle ? (
            /* ── Case study mode: back + title + theme ── */
            <>
              <Link
                data-id="navbar-casestudy-back"
                href="/work"
                className={cn(
                  "flex items-center gap-1.5 py-2 text-sm font-medium",
                  "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                  "transition-colors duration-200 group shrink-0"
                )}
              >
                <svg
                  data-id="navbar-casestudy-back-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:-translate-x-0.5 transition-transform duration-200"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Work
              </Link>
              <div data-id="navbar-casestudy-divider" className="w-px h-4 bg-[var(--color-border-default)]" />
              <span
                data-id="navbar-casestudy-title"
                className="text-sm font-medium text-[var(--color-text-primary)] truncate max-w-[280px] lg:max-w-[400px] py-2"
              >
                {caseStudyTitle}
              </span>
              <div data-id="navbar-casestudy-divider-2" className="w-px h-4 bg-[var(--color-border-default)]" />
              <div data-id="navbar-right-casestudy" className="py-2">
                <ThemeToggle />
              </div>
            </>
          ) : (
            /* ── Default mode: logo + nav links + theme ── */
            <>
              {/* Left — logo */}
              <div data-id="navbar-left" className="py-2 flex items-center">
                <Link
                  data-id="navbar-logo-desktop"
                  href="/"
                  aria-label="Arnab Debnath"
                  className="flex items-center transition-opacity duration-200 hover:opacity-70"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.svg"
                    alt="Arnab Debnath"
                    width={42}
                    height={20}
                    className="logo-themed"
                  />
                </Link>
              </div>

              {/* Divider */}
              <div data-id="navbar-desktop-divider-1" className="w-px h-4 bg-[var(--color-border-default)]" />

              {/* Center — Nav links */}
              <div data-id="navbar-center" className="flex items-center gap-1 px-2 py-2">
                {links.map((link) => {
                  const active = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.href}
                      data-id={`navbar-link-${link.href.slice(1)}`}
                      href={link.href}
                      className={cn(
                        "px-2.5 lg:px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                        active
                          ? "text-[var(--color-text-primary)] bg-[var(--color-bg-elevated)]"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div data-id="navbar-desktop-divider-2" className="w-px h-4 bg-[var(--color-border-default)]" />

              {/* Right — Theme toggle */}
              <div data-id="navbar-right" className="py-2">
                <ThemeToggle />
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* ── Mobile: floating pill ── */}
      <motion.div
        data-id="navbar-mobile"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-4 right-4 z-50 md:hidden flex flex-col gap-2"
      >
        <div
          data-id="navbar-mobile-pill"
          className={cn(
            "flex items-center justify-between px-2 py-2",
            "backdrop-blur-xl nav-pill-shadow",
            "bg-[var(--color-nav-bg)]",
            "border border-[var(--color-nav-border)]",
          )}
        >
          {/* Logo */}
          <Link
            data-id="navbar-logo-mobile"
            href="/"
            className={cn(
              "w-8 h-8 flex items-center justify-center shrink-0",
              "bg-[var(--color-accent)] text-white",
              "text-xs font-black"
            )}
          >
            A
          </Link>

          <div data-id="navbar-mobile-actions" className="flex items-center gap-1">
            <ThemeToggle />
            <button
              data-id="navbar-mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "w-8 h-8 flex items-center justify-center",
                "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                "transition-all duration-200"
              )}
              aria-label="Toggle menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                ) : (
                  <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              data-id="navbar-mobile-dropdown"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "overflow-hidden",
                "backdrop-blur-xl nav-pill-shadow",
                "bg-[var(--color-nav-bg)]",
                "border border-[var(--color-nav-border)]",
              )}
            >
              <nav data-id="navbar-mobile-nav" className="px-3 py-3 flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    data-id={`navbar-mobile-link-${link.href.slice(1)}`}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-2.5 text-sm font-medium",
                      "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                      "hover:bg-[var(--color-bg-elevated)] transition-all duration-200"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  data-id="navbar-mobile-cta"
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-semibold text-center",
                    "bg-[var(--color-accent)] text-white"
                  )}
                >
                  Get in touch
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
