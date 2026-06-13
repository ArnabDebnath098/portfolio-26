import Link from "next/link";
import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PressButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  target?: string;
  rel?: string;
}

const base =
  "inline-flex items-center justify-center px-7 py-3 text-sm font-medium tracking-tight " +
  "transition-colors duration-200 cursor-pointer select-none whitespace-nowrap";

const variants = {
  primary:
    "bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] " +
    "border border-[var(--color-bg-inverse)] hover:bg-transparent hover:text-[var(--color-text-primary)]",
  secondary:
    "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-default)] " +
    "hover:bg-[var(--color-bg-inverse)] hover:text-[var(--color-text-inverse)]",
};

export function PressButton({
  variant = "primary",
  href,
  target,
  rel,
  children,
  className,
  ...props
}: PressButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link
        data-id={`press-button-${variant}`}
        href={href}
        target={target}
        rel={rel}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button data-id={`press-button-${variant}`} className={classes} {...props}>
      {children}
    </button>
  );
}
