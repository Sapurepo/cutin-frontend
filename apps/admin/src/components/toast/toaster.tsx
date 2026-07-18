"use client";

import { Toaster as ToasterUI } from "@cutin/ui";

import { useToastStore } from "@/stores/toastStore";

/**
 * zustand store를 @cutin/ui의 presentational Toaster에 연결한다.
 * store 구독을 이 컴포넌트에 가둬, 토스트 변경이 상위 트리를 리렌더하지 않도록 한다.
 */
export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return <ToasterUI toasts={toasts} onDismiss={removeToast} />;
}
