import { useEffect, useState } from "react";
import { toastState, Toast } from "../lib/toast";

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsub = toastState.subscribe(setToasts);
    return unsub;
  }, []);

  return { toasts, ...toastState };
}
