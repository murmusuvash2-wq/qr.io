import React from "react";
import { cn } from "../../lib/utils";
import { Check, Minus } from "lucide-react";

export type CheckboxVariant = "checkbox" | "radio" | "switch";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  variant?: CheckboxVariant;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, variant = "checkbox", error, indeterminate, className, id, checked, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    // Switch variant
    if (variant === "switch") {
      return (
        <label htmlFor={inputId} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              checked={checked}
              className="sr-only peer"
              {...props}
            />
            <div className={cn(
              "w-9 h-5 rounded-full transition-all duration-[var(--ez-transition-fast)]",
              "bg-[var(--ez-bg-inset)] border border-[var(--ez-border-default)]",
              "peer-checked:bg-[var(--ez-border-focus)] peer-checked:border-[var(--ez-border-focus)]",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ez-border-focus)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--ez-bg-primary)]",
              "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
              "after:w-3.5 after:h-3.5 after:rounded-full after:bg-white",
              "after:transition-all after:duration-[var(--ez-transition-fast)]",
              "peer-checked:after:translate-x-4"
            )} />
          </div>
          {label && <span className="text-[var(--ez-text-sm)] text-[var(--ez-text-primary)] cursor-pointer">{label}</span>}
        </label>
      );
    }

    const isRadio = variant === "radio";
    return (
      <label htmlFor={inputId} className="flex items-center gap-2.5 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type={isRadio ? "radio" : "checkbox"}
            checked={checked}
            className="sr-only peer"
            {...props}
          />
          <div className={cn(
            "flex items-center justify-center transition-all duration-[var(--ez-transition-fast)]",
            isRadio ? "w-4 h-4 rounded-full" : "w-4 h-4 rounded-[4px]",
            "border-2 bg-transparent",
            checked
              ? "border-[var(--ez-border-focus)] bg-[var(--ez-border-focus)]"
              : "border-[var(--ez-border-strong)] group-hover:border-[var(--ez-border-focus)]",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ez-border-focus)] peer-focus-visible:ring-offset-1",
            error && "border-[var(--ez-error)]"
          )}>
            {isRadio ? (
              checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />
            ) : indeterminate ? (
              <Minus className="w-3 h-3 text-white" />
            ) : checked ? (
              <Check className="w-3 h-3 text-white" />
            ) : null}
          </div>
        </div>
        {label && <span className="text-[var(--ez-text-sm)] text-[var(--ez-text-primary)] cursor-pointer select-none">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

// --- Radio Group Helper ---

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  direction?: "horizontal" | "vertical";
  error?: string;
}

export function RadioGroup({ name, options, value, onChange, label, direction = "vertical", error }: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-[var(--ez-text-xs)] font-bold text-[var(--ez-text-muted)] uppercase tracking-wider">
          {label}
        </span>
      )}
      <div className={cn("flex gap-4", direction === "vertical" ? "flex-col" : "flex-wrap")}>
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            variant="radio"
            label={opt.label}
            name={name}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            disabled={opt.disabled}
          />
        ))}
      </div>
      {error && <p className="text-[var(--ez-text-xs)] text-[var(--ez-error)] font-medium">{error}</p>}
    </div>
  );
}
