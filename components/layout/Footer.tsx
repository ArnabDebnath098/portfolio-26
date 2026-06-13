"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "Info" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
];

const social = [
  {
    href: "https://dribbble.com/arnab_design",
    label: "Dribbble",
    icon: (
      <svg data-id="footer-social-icon-dribbble" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/arnab_design",
    label: "Twitter",
    icon: (
      <svg data-id="footer-social-icon-twitter" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/arnabdebnath07/",
    label: "LinkedIn",
    icon: (
      <svg data-id="footer-social-icon-linkedin" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/ArnabDebnath098",
    label: "GitHub",
    icon: (
      <svg data-id="footer-social-icon-github" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

/* Hairline that stays legible whether the footer renders on black
   (light theme) or white (dark theme). */
const hairline = "border-[color-mix(in_srgb,var(--color-text-inverse)_16%,transparent)]";

/* ── Editorial "roll" link — label swaps on hover ── */
function RollLink({ href, label }: { href: string; label: string }) {
  const key = label.toLowerCase();
  return (
    <Link
      data-id={`footer-link-${key}`}
      href={href}
      className="group relative block w-fit overflow-hidden font-sans leading-[1.15] text-lg sm:text-xl"
    >
      <span
        data-id={`footer-link-top-${key}`}
        className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
      >
        {label}
      </span>
      <span
        data-id={`footer-link-bottom-${key}`}
        aria-hidden
        className="absolute inset-0 block translate-y-full text-[var(--color-accent)] transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      >
        {label}
      </span>
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Hide footer on the work index, case study detail pages, and the about page
  if (pathname === "/work" || pathname.startsWith("/work/") || pathname === "/about") return null;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      data-id="footer"
      className="relative mt-32 bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] border-t border-[var(--color-text-inverse)] overflow-hidden"
    >
      {/* ── Main grid: CTA + index + connect ── */}
      <div
        data-id="footer-grid"
        className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 border-b", hairline)}
      >
        {/* CTA block */}
        <div
          data-id="footer-cta"
          className={cn(
            "sm:col-span-2 lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-10",
            "border-b lg:border-b-0 lg:border-r",
            hairline
          )}
        >
          <div data-id="footer-cta-text">
            <span
              data-id="footer-cta-eyebrow"
              className="inline-flex items-center text-[11px] tracking-[0.2em] uppercase opacity-50"
            >
              Let&apos;s collaborate
            </span>
            <motion.h2
              data-id="footer-cta-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.04] tracking-[-0.015em] mt-5 max-w-xl"
            >
              Let&apos;s build something great.
            </motion.h2>
          </div>

          <a
            data-id="footer-cta-email"
            href="mailto:arnabdebnath.design@gmail.com"
            className={cn(
              "group inline-flex w-fit items-center gap-3 border px-5 sm:px-6 py-4 text-sm font-medium tracking-tight",
              "border-[var(--color-text-inverse)] transition-colors duration-300",
              "hover:bg-[var(--color-text-inverse)] hover:text-[var(--color-bg-inverse)]"
            )}
          >
            <span data-id="footer-cta-email-label" className="break-all sm:break-normal">
              arnabdebnath.design@gmail.com
            </span>
            <svg
              data-id="footer-cta-email-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>

        {/* Index column */}
        <nav
          data-id="footer-index"
          className={cn(
            "lg:col-span-3 p-8 sm:p-10 flex flex-col gap-5",
            "border-b sm:border-b-0 sm:border-r",
            hairline
          )}
        >
          <p data-id="footer-index-title" className="text-[11px] tracking-[0.2em] uppercase opacity-40">
            Index
          </p>
          <div data-id="footer-index-links" className="flex flex-col gap-2.5">
            {nav.map((link) => (
              <RollLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>
        </nav>

        {/* Connect column */}
        <div data-id="footer-connect" className="lg:col-span-3 flex flex-col">
          <p
            data-id="footer-connect-title"
            className="text-[11px] tracking-[0.2em] uppercase opacity-40 px-8 sm:px-10 pt-8 sm:pt-10 pb-4"
          >
            Connect
          </p>
          <div data-id="footer-connect-grid" className={cn("grid grid-cols-2 border-t flex-1 min-h-[180px]", hairline)}>
            {social.map((s, i) => (
              <motion.a
                key={s.href}
                data-id={`footer-connect-${s.label.toLowerCase()}`}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileTap={{ scale: 0.92 }}
                className={cn(
                  "group flex items-center justify-center py-10",
                  i < 2 ? "border-b" : "",
                  i % 2 === 0 ? "border-r" : "",
                  hairline,
                  "transition-colors duration-300 hover:bg-[var(--color-text-inverse)] hover:text-[var(--color-bg-inverse)]"
                )}
              >
                <span
                  data-id={`footer-connect-icon-${s.label.toLowerCase()}`}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  {s.icon}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        data-id="footer-bottom"
        className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 px-6 sm:px-10 lg:px-16 py-6"
      >
        <p data-id="footer-copyright" className="text-xs opacity-50">
          <span data-id="footer-copyright-year" className="font-datatype">© {year}</span>{" "}
          Arnab Debnath. Designed &amp; built in Bengaluru.
        </p>

        <span
          data-id="footer-availability"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] opacity-60"
        >
          <span data-id="footer-availability-dot" className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Available for work
        </span>

        <button
          data-id="footer-back-to-top"
          onClick={scrollTop}
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] opacity-60 transition-opacity duration-200 hover:opacity-100"
          aria-label="Back to top"
        >
          Back to top
          <svg
            data-id="footer-back-to-top-icon"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-y-1"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
