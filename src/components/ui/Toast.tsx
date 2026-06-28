import React from "react";
import { cn } from "../../lib/utils";
import { useToast } from "../../hooks/useToast";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: "border-[var(--ez-success)]/30 bg-[var(--ez-success)]/10 text-[var(--ez-success)]",
  error: "border-[var(--ez-error)]/30 bg-[var(--ez-error)]/10 text-[var(--ez-error)]",
  warning: "border-[var(--ez-warning)]/30 bg-[var(--ez-warning)]/10 text-[var(--ez-warning)]",
  info: "border-[var(--ez-info)]/30 bg-[var(--ez-info)]/10 text-[var(--ez-info)]",
};

export function ToastContainer({ className }: { className?: string }) {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-[var(--ez-z-toast)] flex flex-col gap-2 max-w-sm",
        className
      )}
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const Icon = iconMap[toast.variant];
        return (
          <div
            key={toast.id}
            role="alert"
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border shadow-[var(--ez-shadow-lg)]",
              "animate-in fade-in slide-in-from-right-2 duration-[var(--ez-transition-slow)]",
              "bg-[var(--ez-bg-surface)]",
              colorMap[toast.variant]
            )}
          >
            <Icon className="w-4 h-4 mt-0.5 shrink-0" />
            <p className="flex-1 text-[var(--ez-text-sm)] font-medium">{toast.message}</p>
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className="text-[var(--ez-text-xs)] font-bold underline hover:no-underline min-h-[44px] px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ez-border-focus)] rounded"
              >
                {toast.action.label}
              </button>
            )}
            <button
              onClick={() => dismiss(toast.id)}
              className="shrink-0 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded hover:bg-black/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ez-border-focus)]"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
