"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg data-id="navbar-logomark-svg" width="49" height="21" viewBox="0 0 49 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M34.2988 2.17676H33.083C32.7203 2.17676 32.4747 2.23025 32.3467 2.33691C32.219 2.44374 32.1553 2.68879 32.1553 3.07227V4.7041H48.0273V6.94434H45.7227V24.7363H42.8428V21.998C42.6145 22.1585 42.2634 22.2402 41.7871 22.2402H38.1387C37.1788 22.2402 36.4535 22.0163 35.9629 21.5684C35.4937 21.099 35.2588 20.3738 35.2588 19.3926V12.0322C35.2588 11.0938 35.4828 10.411 35.9307 9.98438C36.4 9.53638 37.1578 9.3125 38.2031 9.3125H41.5312V11.4883H39.1309L41.3389 15.3604C41.6161 15.8509 41.8828 16.3415 42.1387 16.832C42.416 17.3014 42.63 17.6857 42.7793 17.9844C42.9499 18.283 43.0352 18.4326 43.0352 18.4326C43.0352 18.4326 43.0134 18.2939 42.9707 18.0166C42.9494 17.7393 42.9177 17.2913 42.875 16.6729C42.8537 16.0543 42.8428 15.2754 42.8428 14.3369V6.94434H32.123V24.7363H29.2432V6.94434H26.5234V19.3926C26.5234 20.3739 26.2778 21.099 25.7871 21.5684C25.2964 22.0164 24.5069 22.2402 23.4189 22.2402H20.9229C19.8564 22.2402 19.0775 22.0163 18.5869 21.5684C18.0964 21.099 17.8516 20.3737 17.8516 19.3926V6.94434H14.8164V24.7363H11.9355V15.7129H8.7998V19.4561C8.7998 20.3734 8.56502 21.0668 8.0957 21.5361C7.64777 22.0054 6.90155 22.2402 5.85645 22.2402H2.94434C1.899 22.2402 1.14121 22.0055 0.671875 21.5361C0.224033 21.0668 0 20.3732 0 19.4561V16.4805H2.91211V19.0723C2.91211 19.4348 2.97564 19.6805 3.10352 19.8086C3.2315 19.9366 3.47726 20.001 3.83984 20.001H4.99219C5.37579 20.001 5.62076 19.9364 5.72754 19.8086C5.85554 19.6806 5.91992 19.4349 5.91992 19.0723V15.6484C5.91992 15.2648 5.84538 15.009 5.69629 14.8809C5.54702 14.7316 5.28022 14.6563 4.89648 14.6562H2.97559V12.3848H4.89648C5.28022 12.3847 5.54702 12.3094 5.69629 12.1602C5.84541 12.0108 5.91992 11.7441 5.91992 11.3604V7.84082C5.91992 7.45682 5.85554 7.21116 5.72754 7.10449C5.62079 6.97666 5.37585 6.91213 4.99219 6.91211H3.83984C3.47726 6.91213 3.2315 6.97651 3.10352 7.10449C2.97571 7.21129 2.91211 7.45711 2.91211 7.84082V10.3682H0V7.45605C7.07699e-05 6.53914 0.22414 5.84621 0.671875 5.37695C1.14121 4.90762 1.899 4.67285 2.94434 4.67285H5.85645C6.90155 4.67292 7.64777 4.90769 8.0957 5.37695C8.56491 5.84621 8.79973 6.53899 8.7998 7.45605V11.9043C8.7998 12.3948 8.69365 12.7684 8.48047 13.0244C8.26713 13.2591 7.95709 13.4087 7.55176 13.4727V13.5049H11.9355V4.7041H29.2754V2.68848C29.2754 1.77144 29.5095 1.09954 29.9785 0.672852C30.4264 0.224921 31.1628 6.95263e-05 32.1865 0H34.2988V2.17676ZM20.7314 19.04C20.7314 19.4239 20.795 19.6805 20.9229 19.8086C21.0722 19.9366 21.3287 20.001 21.6914 20.001H22.6836C23.0672 20.0009 23.3122 19.9364 23.4189 19.8086C23.5469 19.6806 23.6113 19.424 23.6113 19.04V6.94434H20.7314V19.04ZM38.1387 19.04C38.1387 19.424 38.2031 19.6806 38.3311 19.8086C38.4591 19.9365 38.7048 20.001 39.0674 20.001H41.915C42.0658 20.001 42.1972 19.9894 42.3096 19.9688L39.835 15.7441C39.3657 14.8483 38.9813 14.1121 38.6826 13.5361C38.4054 12.9604 38.224 12.6193 38.1387 12.5127V19.04Z" fill="currentColor" />
    </svg>
  );
}

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
            "backdrop-blur-md nav-pill-shadow",
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
                  className="flex items-center text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  <LogoMark data-id="navbar-logomark" />
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
            "flex items-center justify-between px-2 py-2 rounded-full",
            "backdrop-blur-md nav-pill-shadow",
            "bg-[var(--color-nav-bg)]",
            "border border-[var(--color-nav-border)]",
          )}
        >
          {/* Logo */}
          <Link
            data-id="navbar-logo-mobile"
            href="/"
            aria-label="Arnab Debnath"
            className="flex items-center pl-2 transition-opacity duration-200 hover:opacity-70"
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
                "backdrop-blur-md nav-pill-shadow",
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
