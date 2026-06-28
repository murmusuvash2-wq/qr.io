import React from "react";
import { cn } from "../../lib/utils";

export interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ variant = "text", width, height, className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--ez-bg-elevated)] rounded-md",
        variant === "circular" && "rounded-full",
        variant === "text" && "h-4",
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
