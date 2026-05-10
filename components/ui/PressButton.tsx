import Link from "next/link";
import { type ButtonHTMLAttributes } from "react";

interface PressButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  target?: string;
  rel?: string;
}

export function PressButton({
  variant = "primary",
  href,
  target,
  rel,
  children,
  className,
  ...props
}: PressButtonProps) {
  const inner = (
    <div data-id={`press-button-outer-${variant}`} className="press-btn-outer">
      <div data-id={`press-button-inner-${variant}`} className="press-btn-inner">
        <span data-id={`press-button-label-${variant}`} className="press-btn-label">
          {children}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        data-id={`press-button-${variant}`}
        href={href}
        target={target}
        rel={rel}
        className={`press-btn press-btn-${variant} ${className ?? ""}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      data-id={`press-button-${variant}`}
      className={`press-btn press-btn-${variant} ${className ?? ""}`}
      {...props}
    >
      {inner}
    </button>
  );
}
