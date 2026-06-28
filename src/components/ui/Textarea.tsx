import React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, maxLength, showCount, className, id, value, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[var(--ez-text-xs)] font-bold text-[var(--ez-text-muted)] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          className={cn(
            "w-full bg-[var(--ez-bg-surface)] border text-[var(--ez-text-primary)]",
            "placeholder:text-[var(--ez-text-dim)] resize-y min-h-[80px]",
            "rounded-lg px-3 py-2.5 text-[var(--ez-text-sm)]",
            "transition-all duration-[var(--ez-transition-fast)]",
            "focus-visible:outline-none focus-visible:border-[var(--ez-border-focus)] focus-visible:ring-1 focus-visible:ring-[var(--ez-border-focus)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-[var(--ez-error)] focus-visible:border-[var(--ez-error)] focus-visible:ring-[var(--ez-error)]"
              : "border-[var(--ez-border-default)] hover:border-[var(--ez-border-strong)]",
            className
          )}
          {...props}
        />
        <div className="flex items-center justify-between">
          <div>
            {error && (
              <p id={`${textareaId}-error`} className="text-[var(--ez-text-xs)] text-[var(--ez-error)] font-medium">
                {error}
              </p>
            )}
            {hint && !error && (
              <p id={`${textareaId}-hint`} className="text-[var(--ez-text-xs)] text-[var(--ez-text-dim)]">
                {hint}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <span className="text-[var(--ez-text-xs)] text-[var(--ez-text-dim)]">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
