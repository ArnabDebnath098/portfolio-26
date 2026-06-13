"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";
import {
  EnvelopeSimple,
  LinkedinLogo,
  XLogo,
  DribbbleLogo,
  Copy,
  Check,
  CaretRight,
} from "@phosphor-icons/react";

const EMAIL = "iamarnab998@gmail.com";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arnabdebnath07/", icon: LinkedinLogo },
  { label: "Twitter / X", href: "https://x.com/arnab_design", icon: XLogo },
  { label: "Dribbble", href: "https://dribbble.com/arnab_design", icon: DribbbleLogo },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div data-id="contact-page" className="min-h-screen pt-28 pb-32">
      <div data-id="contact-container" className="max-w-[1104px] mx-auto px-6 flex flex-col gap-16">

        {/* Header */}
        <FadeUp className="flex flex-col gap-3">
          <div data-id="contact-header-label-row" className="flex items-center gap-3">
            <span data-id="contact-header-rule" className="rule-red" />
            <p data-id="contact-header-label" className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.14em]">
              Contact
            </p>
          </div>
          <h1 data-id="contact-heading" className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-[var(--color-text-primary)] leading-[1.05]">
            Let&apos;s talk.
          </h1>
          <p data-id="contact-subline" className="text-base text-[var(--color-text-secondary)] max-w-md leading-relaxed">
            Whether it&apos;s a freelance project, a full-time role, or just a design conversation — I&apos;m open.
          </p>
        </FadeUp>

        {/* Links + Response time */}
        <FadeUp delay={0.1}>
          <div data-id="contact-links-grid" className="max-w-lg space-y-4">
            <div data-id="contact-links-card" className={cn(
              "border border-[var(--color-border-default)]",
              "bg-[var(--color-bg-surface)] p-5 flex flex-col gap-3"
            )}>
              <p data-id="contact-links-label" className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.14em]">
                Get in touch
              </p>

              {/* Email row with copy */}
              <button
                data-id="contact-link-email"
                onClick={copyEmail}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 w-full",
                  "hover:bg-[var(--color-bg-elevated)]",
                  "transition-colors duration-200 group cursor-pointer"
                )}
              >
                <EnvelopeSimple data-id="contact-link-icon-email" size={18} weight="regular" className="flex-shrink-0 text-[var(--color-text-muted)]" />
                <span data-id="contact-link-label-email" className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200 flex-1 text-left">
                  {EMAIL}
                </span>
                {copied ? (
                  <Check data-id="contact-email-check" size={16} weight="bold" className="flex-shrink-0 text-green-500" />
                ) : (
                  <Copy data-id="contact-email-copy" size={16} weight="regular" className="flex-shrink-0 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                )}
              </button>

              {/* Social links with chevron */}
              {links.map((link) => (
                <a
                  key={link.label}
                  data-id={`contact-link-${link.label.toLowerCase().replace(/[\s/@.]/g, "-")}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5",
                    "hover:bg-[var(--color-bg-elevated)]",
                    "transition-colors duration-200 group"
                  )}
                >
                  <link.icon data-id={`contact-link-icon-${link.label.toLowerCase().replace(/[\s/@.]/g, "-")}`} size={18} weight="regular" className="flex-shrink-0 text-[var(--color-text-muted)]" />
                  <span data-id={`contact-link-label-${link.label.toLowerCase().replace(/[\s/@.]/g, "-")}`} className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200 flex-1">
                    {link.label}
                  </span>
                  <CaretRight data-id={`contact-link-chevron-${link.label.toLowerCase().replace(/[\s/@.]/g, "-")}`} size={14} weight="bold" className="flex-shrink-0 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              ))}
            </div>

            <div data-id="contact-response-card" className={cn(
              "border border-[var(--color-border-default)]",
              "bg-[var(--color-bg-surface)] p-5 flex flex-col gap-2"
            )}>
              <p data-id="contact-response-label" className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.14em]">
                Response time
              </p>
              <p data-id="contact-response-text" className="text-sm text-[var(--color-text-secondary)]">
                Usually within 24–48 hours. Faster for urgent freelance enquiries.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
