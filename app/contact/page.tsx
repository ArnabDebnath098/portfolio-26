"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  type: z.enum(["freelance", "fulltime", "collab", "other"]),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const inputClass = cn(
  "w-full px-4 py-3 text-sm",
  "bg-[var(--color-bg-surface)]",
  "border border-[var(--color-border-default)]",
  "text-[var(--color-text-primary)]",
  "placeholder:text-[var(--color-text-muted)]",
  "focus:outline-none focus:border-[var(--color-accent)]",
  "transition-colors duration-200"
);

const links = [
  { label: "arnabdebnath07@gmail.com", href: "mailto:arnabdebnath07@gmail.com", icon: "✉" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arnabdebnath07/", icon: "in" },
  { label: "Twitter / X", href: "https://x.com/arnab_design", icon: "𝕏" },
  { label: "Dribbble", href: "https://dribbble.com/arnab_design", icon: "●" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setSending(true);
    // TODO: wire up Resend API route
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);
    setSending(false);
    setSent(true);
  }

  return (
    <div data-id="contact-page" className="min-h-screen pt-28 pb-32">
      <div data-id="contact-container" className="max-w-5xl mx-auto px-6 flex flex-col gap-16">

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

        <div data-id="contact-grid" className="grid lg:grid-cols-[1fr_300px] gap-12">

          {/* Form */}
          <FadeUp delay={0.1}>
            {sent ? (
              <div data-id="contact-success" className={cn(
                "border border-[var(--color-border-default)]",
                "bg-[var(--color-bg-surface)] p-10 text-center space-y-3"
              )}>
                <div data-id="contact-success-icon" className="font-datatype text-3xl text-[var(--color-accent)]">✓</div>
                <h2 data-id="contact-success-heading" className="text-lg font-semibold text-[var(--color-text-primary)]">Message sent.</h2>
                <p data-id="contact-success-message" className="text-sm text-[var(--color-text-secondary)]">
                  I typically reply within 24–48 hours.
                </p>
              </div>
            ) : (
              <form data-id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name + Email */}
                <div data-id="contact-form-row-1" className="grid sm:grid-cols-2 gap-4">
                  <div data-id="contact-name-field" className="space-y-1">
                    <input
                      data-id="contact-input-name"
                      {...register("name")}
                      placeholder="Your name"
                      className={inputClass}
                    />
                    {errors.name && (
                      <p data-id="contact-error-name" className="font-datatype text-xs text-[var(--color-accent)]">{errors.name.message}</p>
                    )}
                  </div>
                  <div data-id="contact-email-field" className="space-y-1">
                    <input
                      data-id="contact-input-email"
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                    {errors.email && (
                      <p data-id="contact-error-email" className="font-datatype text-xs text-[var(--color-accent)]">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Type */}
                <div data-id="contact-type-field" className="space-y-1">
                  <select data-id="contact-select-type" {...register("type")} className={cn(inputClass, "cursor-pointer")}>
                    <option value="" disabled>What&apos;s this about?</option>
                    <option value="freelance">Freelance project</option>
                    <option value="fulltime">Full-time role</option>
                    <option value="collab">Collaboration / collab</option>
                    <option value="other">Just saying hi</option>
                  </select>
                  {errors.type && (
                    <p data-id="contact-error-type" className="font-datatype text-xs text-[var(--color-accent)]">{errors.type.message}</p>
                  )}
                </div>

                {/* Message */}
                <div data-id="contact-message-field" className="space-y-1">
                  <textarea
                    data-id="contact-textarea-message"
                    {...register("message")}
                    placeholder="Tell me what you're working on, what you need, and any context that's helpful..."
                    rows={5}
                    className={cn(inputClass, "resize-none")}
                  />
                  {errors.message && (
                    <p data-id="contact-error-message" className="font-datatype text-xs text-[var(--color-accent)]">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  data-id="contact-submit"
                  type="submit"
                  disabled={sending}
                  size="full"
                >
                  {sending ? "Sending..." : "Send message →"}
                </Button>
              </form>
            )}
          </FadeUp>

          {/* Sidebar */}
          <FadeUp delay={0.2}>
            <div data-id="contact-sidebar" className="space-y-4">
              <div data-id="contact-links-card" className={cn(
                "border border-[var(--color-border-default)]",
                "bg-[var(--color-bg-surface)] p-5 flex flex-col gap-3"
              )}>
                <p data-id="contact-links-label" className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.14em]">
                  Direct links
                </p>
                {links.map((link) => (
                  <a
                    key={link.label}
                    data-id={`contact-link-${link.label.toLowerCase().replace(/[\s/@.]/g, "-")}`}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5",
                      "hover:bg-[var(--color-bg-elevated)]",
                      "transition-colors duration-200 group"
                    )}
                  >
                    <span data-id={`contact-link-icon-${link.label.toLowerCase().replace(/[\s/@.]/g, "-")}`} className="font-datatype w-6 text-center text-sm text-[var(--color-text-muted)]">
                      {link.icon}
                    </span>
                    <span data-id={`contact-link-label-${link.label.toLowerCase().replace(/[\s/@.]/g, "-")}`} className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
                      {link.label}
                    </span>
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
    </div>
  );
}
