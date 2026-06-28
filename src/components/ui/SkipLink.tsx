import React from "react";
import { cn } from "../../lib/utils";

export interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export function SkipLink({ href = "#main-content", children = "Skip to content" }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--ez-z-toast,600)]",
        "bg-[var(--ez-bg-surface)] text-[var(--ez-text-primary)]",
        "border border-[var(--ez-border-focus)] rounded-lg px-4 py-2",
        "text-[var(--ez-text-sm)] font-bold shadow-[var(--ez-shadow-lg)]",
        "focus-visible:outline-none focus-visible:ring-2"
      )}
    >
      {children}
    </a>
  );
}
