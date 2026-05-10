"use client";

import Link from "next/link";
import { PressButton } from "@/components/ui/PressButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { VineRow, FloralCross } from "@/components/illustrations/IndianOrnaments";

const pages = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "Info" },
  { href: "/lab", label: "Lab" },
];

const resources = [
  { href: "/contact", label: "Contact" },
  { href: "https://medium.com/@Arnab_Debnath", label: "Blog", external: true },
  { href: "https://dribbble.com/arnab_design", label: "Dribbble", external: true },
];

const social = [
  {
    href: "https://dribbble.com/arnab_design",
    label: "Dribbble",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/arnab_design",
    label: "Twitter / X",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/arnabdebnath07/",
    label: "LinkedIn",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/ArnabDebnath098",
    label: "GitHub",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

/* ── Mughal arch SVG — decorative arch frame for CTA ── */
function MughalArch({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("absolute pointer-events-none select-none", className)}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pointed arch outline */}
      <path
        d="M30 200 L30 80 Q150 -20 270 80 L270 200"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner arch */}
      <path
        d="M50 200 L50 90 Q150 5 250 90 L250 200"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        fill="none"
      />
      {/* Keystone dot */}
      <circle cx="150" cy="22" r="3" fill="rgba(255,255,255,0.15)" />
      {/* Base dots */}
      <circle cx="30" cy="80" r="2" fill="rgba(255,255,255,0.12)" />
      <circle cx="270" cy="80" r="2" fill="rgba(255,255,255,0.12)" />
    </svg>
  );
}

/* ── Paisley / lotus ornament for footer corners ── */
function LotusOrnament({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
    >
      {/* Outer ring */}
      <circle cx="32" cy="32" r="28" stroke="var(--color-ornament)" strokeWidth="0.6" opacity="0.25" />
      <circle cx="32" cy="32" r="22" stroke="var(--color-ornament)" strokeWidth="0.5" opacity="0.2" />
      {/* 6 petals */}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx="32"
          cy="16"
          rx="4"
          ry="10"
          transform={`rotate(${a}, 32, 32)`}
          stroke="var(--color-ornament)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.2"
        />
      ))}
      {/* Center */}
      <circle cx="32" cy="32" r="4" stroke="var(--color-ornament)" strokeWidth="0.5" opacity="0.25" />
      <circle cx="32" cy="32" r="1.5" fill="var(--color-ornament)" opacity="0.2" />
    </svg>
  );
}

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Hide footer on the work index and on case study detail pages
  if (pathname === "/work" || pathname.startsWith("/work/")) return null;

  return (
    <footer data-id="footer" className="relative mt-20">
      {/* ── CTA Banner — Terracotta with Mughal arch motifs ── */}
      <div data-id="footer-cta-banner" className="mx-6 sm:mx-10 lg:mx-16">
        <div
          data-id="footer-cta-card"
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "bg-gradient-to-br from-[var(--primitive-red-deep)] via-[var(--primitive-red-vivid)] to-[var(--primitive-red-bright)]",
            "px-8 sm:px-14 py-16 sm:py-20"
          )}
        >
          {/* Mandala art — desktop only, right side */}
          <div
            data-id="footer-cta-mandala-wrap"
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[660px] h-[660px] pointer-events-none select-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-id="footer-cta-mandala"
              src="/mandal-2.svg"
              alt=""
              aria-hidden
              className="w-full h-full opacity-[0.08] [filter:brightness(0)_invert(1)] animate-spin-slow"
            />
          </div>

          {/* Content */}
          <div data-id="footer-cta-content" className="relative z-10 max-w-lg">
            {/* Small ornamental label */}
            <div data-id="footer-cta-label-row" className="flex items-center gap-3 mb-6">
              <span data-id="footer-cta-label-ornament-left" className="text-white/40 text-xs">✦</span>
              <span data-id="footer-cta-label-text" className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium">
                Let&apos;s collaborate
              </span>
              <span data-id="footer-cta-label-ornament-right" className="text-white/40 text-xs">✦</span>
            </div>

            <h2
              data-id="footer-cta-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] text-white leading-[1.1] mb-5"
            >
              Let&apos;s build
              <br />
              something great.
            </h2>

            {/* Ornamental rule */}
            <div data-id="footer-cta-rule" className="flex items-center gap-2 mb-6" aria-hidden>
              <div data-id="footer-cta-rule-left" className="w-8 h-px bg-white/30" />
              <svg data-id="footer-cta-rule-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <polygon points="6,0.5 11.5,6 6,11.5 0.5,6" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
                <circle cx="6" cy="6" r="1.5" fill="white" opacity="0.3" />
              </svg>
              <div data-id="footer-cta-rule-right" className="w-8 h-px bg-white/30" />
            </div>

            <p
              data-id="footer-cta-desc"
              className="text-white/65 text-sm sm:text-base leading-relaxed max-w-md mb-8"
            >
              Looking for a designer who codes — or an engineer who designs?
              I&apos;m available for senior roles and select freelance projects.
            </p>

            <div data-id="footer-cta-buttons" className="flex flex-wrap gap-3">
              <PressButton data-id="footer-cta-contact" variant="primary" href="/contact">
                Get in touch
              </PressButton>
              <PressButton
                data-id="footer-cta-resume"
                variant="secondary"
                href="mailto:arnabdebnath.design@gmail.com"
              >
                Email me
              </PressButton>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer — parchment with Indian editorial style ── */}
      <div
        data-id="footer-main"
        className="mx-6 sm:mx-10 lg:mx-16 pt-16 pb-8"
      >
        {/* VineRow divider between CTA and footer links */}
        <div className="flex items-center justify-center mb-12">
          <VineRow width={480} color="var(--color-ornament)" opacity={0.25} />
        </div>

        {/* Link columns */}
        <div
          data-id="footer-columns"
          className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8 pb-12 px-10"
        >
          {/* Pages */}
          <div>
            <p className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.16em] mb-4 flex items-center gap-2">
              <span className="text-[var(--color-ornament)] opacity-50">◆</span>
              Pages
            </p>
            <div className="space-y-2.5 pl-5">
              {pages.map((link) => (
                <Link
                  key={link.href}
                  data-id={`footer-link-${link.label.toLowerCase()}`}
                  href={link.href}
                  className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.16em] mb-4 flex items-center gap-2">
              <span className="text-[var(--color-ornament)] opacity-50">◆</span>
              Resources
            </p>
            <div className="space-y-2.5 pl-5">
              {resources.map((link) => (
                <Link
                  key={link.href}
                  data-id={`footer-link-${link.label.toLowerCase()}`}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.16em] mb-4 flex items-center gap-2">
              <span className="text-[var(--color-ornament)] opacity-50">◆</span>
              Connect
            </p>
            <div className="space-y-2.5 pl-5">
              {social.map((link) => (
                <a
                  key={link.href}
                  data-id={`footer-social-${link.label.toLowerCase()}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom ornamental rule + copyright */}
        <div className="relative" aria-hidden>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--color-ornament)] opacity-15" />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polygon points="7,0.5 13.5,7 7,13.5 0.5,7" stroke="var(--color-ornament)" strokeWidth="0.6" fill="none" opacity="0.3" />
              <circle cx="7" cy="7" r="1.5" fill="var(--color-ornament)" opacity="0.2" />
            </svg>
            <div className="flex-1 h-px bg-[var(--color-ornament)] opacity-15" />
          </div>
        </div>

        <div
          data-id="footer-bottom"
          className="pt-6 pb-2 flex flex-wrap items-center justify-between gap-4"
        >
          <p
            data-id="footer-copyright"
            className="text-xs text-[var(--color-text-muted)]"
          >
            © {year} Arnab Debnath. Designed & crafted in Bengaluru.
          </p>
          <p className="text-[10px] text-[var(--color-text-muted)] opacity-60 flex items-center gap-1.5">
            <FloralCross size={14} color="var(--color-ornament)" opacity={0.4} />
            Built with Next.js, Motion & good taste
          </p>
        </div>

        {/* Corner lotus ornaments */}
        <div className="absolute bottom-4 right-4 sm:right-8 opacity-40">
          <LotusOrnament className="w-12 h-12" />
        </div>
      </div>
    </footer>
  );
}
