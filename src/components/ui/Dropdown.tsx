import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
  className?: string;
}

export function Dropdown({ trigger, items, align = "start", className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusedIdx(-1);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  const visibleItems = items.filter((i) => !i.divider);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    const len = visibleItems.length;
    if (e.key === "ArrowDown") { e.preventDefault(); setFocusedIdx((prev) => (prev + 1) % len); }
    if (e.key === "ArrowUp") { e.preventDefault(); setFocusedIdx((prev) => (prev - 1 + len) % len); }
    if (e.key === "Enter" && focusedIdx >= 0) {
      e.preventDefault();
      visibleItems[focusedIdx]?.onClick?.();
      close();
    }
  };

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ez-border-focus)] rounded-lg"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          role="menu"
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute top-full mt-1 z-[var(--ez-z-dropdown)] min-w-[160px]",
            "bg-[var(--ez-bg-surface)] border border-[var(--ez-border-default)]",
            "rounded-lg shadow-[var(--ez-shadow-lg)] py-1",
            align === "end" ? "right-0" : "left-0",
            "animate-in fade-in zoom-in-95 duration-[var(--ez-transition-fast)]"
          )}
        >
          {items.map((item, idx) => {
            if (item.divider) {
              return <div key={idx} className="h-px bg-[var(--ez-border-default)] my-1" />;
            }
            return (
              <button
                key={item.id}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => { item.onClick?.(); close(); }}
                onMouseEnter={() => setFocusedIdx(idx)}
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2 text-left",
                  "text-[var(--ez-text-sm)] font-medium transition-colors",
                  "focus-visible:outline-none",
                  focusedIdx === idx && "bg-[var(--ez-bg-elevated)]",
                  item.danger ? "text-[var(--ez-error)]" : "text-[var(--ez-text-primary)]",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
