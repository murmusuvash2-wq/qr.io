import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({ items, type = "single", defaultOpen = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggle = (id: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(id) ? [] : [id]);
    } else {
      setOpenItems(
        openItems.includes(id) ? openItems.filter((i) => i !== id) : [...openItems, id]
      );
    }
  };

  return (
    <div className={cn("flex flex-col divide-y divide-[var(--ez-border-default)]", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => !item.disabled && toggle(item.id)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className={cn(
                "flex items-center justify-between w-full py-3 px-1 text-left min-h-[44px]",
                "text-[var(--ez-text-sm)] font-bold text-[var(--ez-text-primary)]",
                "transition-all duration-[var(--ez-transition-fast)]",
                "hover:text-[var(--ez-text-secondary)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ez-border-focus)] focus-visible:ring-offset-1",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {item.title}
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[var(--ez-text-dim)] transition-transform duration-[var(--ez-transition-base)]",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              hidden={!isOpen}
              className={cn(
                "overflow-hidden transition-all duration-[var(--ez-transition-slow)]",
                isOpen ? "pb-3" : "max-h-0"
              )}
            >
              <div className="text-[var(--ez-text-sm)] text-[var(--ez-text-muted)] px-1">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
