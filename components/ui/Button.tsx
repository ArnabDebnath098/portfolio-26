import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg" | "full";

interface VariantOptions {
  variant?: Variant;
  size?: Size;
  className?: string;
}

/** Generates button classes — use this on <Link> and <a> elements */
export function buttonVariants({ variant = "primary", size = "md", className }: VariantOptions = {}) {
  return cn(
    // base
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200",
    // variant
    variant === "primary" && [
      "bg-[var(--color-accent)] text-white font-semibold",
      "hover:bg-[var(--color-accent-hover)]",
      "disabled:opacity-60 disabled:cursor-not-allowed",
    ],
    variant === "secondary" && [
      "border border-[var(--color-border-strong)]",
      "text-[var(--color-text-primary)]",
      "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]",
    ],
    variant === "ghost" && [
      "text-[var(--color-accent)]",
      "hover:underline underline-offset-2",
    ],
    // size
    size === "sm" && "px-4 py-2 text-xs",
    size === "md" && "px-5 py-2.5 text-sm",
    size === "lg" && "px-6 py-3 text-sm",
    size === "full" && "flex w-full py-3 text-sm",
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

/** Use for <button> elements. For <Link> / <a>, use buttonVariants() instead. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
);

Button.displayName = "Button";
