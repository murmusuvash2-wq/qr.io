export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number; // ms, default 4000
  action?: { label: string; onClick: () => void };
}

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
let listeners: Listener[] = [];

function notify() {
  listeners.forEach((l) => l([...toasts]));
}

export const toastState = {
  subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  add(toast: Omit<Toast, "id">) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    toasts = [...toasts, { ...toast, id }];
    notify();
    if (toast.duration !== Infinity) {
      setTimeout(() => this.dismiss(id), toast.duration || 4000);
    }
    return id;
  },
  dismiss(id: string) {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
  success(message: string, options?: Partial<Toast>) {
    return this.add({ message, variant: "success", ...options });
  },
  error(message: string, options?: Partial<Toast>) {
    return this.add({ message, variant: "error", ...options });
  },
  warning(message: string, options?: Partial<Toast>) {
    return this.add({ message, variant: "warning", ...options });
  },
  info(message: string, options?: Partial<Toast>) {
    return this.add({ message, variant: "info", ...options });
  },
};
