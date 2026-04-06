"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

// next-themes v0.4.x injects a <script> for anti-flicker; React 19 warns about it.
// Suppress only in dev — no effect in production.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const _error = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) return;
    _error(...args);
  };
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
