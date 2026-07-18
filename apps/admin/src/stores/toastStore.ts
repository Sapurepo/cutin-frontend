import { create } from "zustand";
import type { ToastData, ToastVariant } from "@cutin/ui";

interface ToastState {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_DURATION = 3000;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

/**
 * 컴포넌트 밖(이벤트 핸들러, 비-React 코드)에서도 호출할 수 있도록
 * store의 getState()를 감싼 헬퍼. `toast.success("저장됐어요")`처럼 사용한다.
 */
function show(
  message: string,
  variant: ToastVariant = "default",
  duration = DEFAULT_DURATION,
) {
  useToastStore.getState().addToast({ message, variant, duration });
}

export const toast = {
  show,
  success: (message: string, duration?: number) =>
    show(message, "success", duration),
  error: (message: string, duration?: number) =>
    show(message, "error", duration),
};
