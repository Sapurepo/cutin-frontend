"use client";

import { useEffect, useState } from "react";
import { Check, Info, TriangleAlert, X, type LucideIcon } from "lucide-react";

import { cn } from "../utils";

export type ToastVariant = "default" | "success" | "error";

export interface ToastData {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

// variant별 아이콘·색상 컨셉. pill 본체(흰 카드)는 공통이고,
// 아이콘 글리프 / 아이콘 칩(chip) 색 / 하단 진행 바(bar) 색만 다르게 한다.
const VARIANT: Record<
  ToastVariant,
  { icon: LucideIcon; chip: string; iconColor: string; bar: string }
> = {
  default: {
    icon: Info,
    chip: "bg-neutral-100",
    iconColor: "text-neutral-600",
    bar: "bg-neutral-300",
  },
  success: {
    icon: Check,
    chip: "bg-success/15",
    iconColor: "text-success",
    bar: "bg-success",
  },
  error: {
    icon: TriangleAlert,
    chip: "bg-destructive/15",
    iconColor: "text-destructive",
    bar: "bg-destructive",
  },
};

const EXIT_MS = 200;

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: string) => void;
}) {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const { icon: Icon, chip, iconColor, bar } = VARIANT[toast.variant];

  // 진입 애니메이션·진행 바 축소를 다음 프레임에 시작하고, duration 후 퇴장 시작
  useEffect(() => {
    const enter = requestAnimationFrame(() => setEntered(true));
    const autoDismiss = setTimeout(() => setLeaving(true), toast.duration);
    return () => {
      cancelAnimationFrame(enter);
      clearTimeout(autoDismiss);
    };
  }, [toast.duration]);

  // 명시적으로 퇴장(leaving)할 때만 제거를 예약한다.
  // 마운트 시점엔 예약하지 않으므로 라우트 이동 중 진입 타이밍 경쟁으로 사라지지 않는다.
  useEffect(() => {
    if (!leaving) return;
    const remove = setTimeout(() => onDismiss(toast.id), EXIT_MS);
    return () => clearTimeout(remove);
  }, [leaving, toast.id, onDismiss]);

  const visible = entered && !leaving;

  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto relative transition-all duration-200 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      <div className="relative z-10 flex items-center gap-3 rounded-2xl border border-[#ECEAF3] bg-white px-3.5 py-3 shadow-[0_12px_30px_rgba(20,18,28,0.12)]">
        <span
          className={cn(
            "flex size-7.5 shrink-0 items-center justify-center rounded-full",
            chip,
          )}
        >
          <Icon className={cn("size-4", iconColor)} />
        </span>
        <p className="flex-1 text-[13.5px] font-medium text-neutral-900">
          {toast.message}
        </p>
        <button
          type="button"
          aria-label="닫기"
          onClick={() => setLeaving(true)}
          className="shrink-0 text-neutral-400 transition-colors hover:text-neutral-700"
        >
          <X className="size-3.5" />
        </button>
        <span
          className={cn(
            "absolute inset-x-3.5 bottom-1.5 h-0.5 origin-left rounded-full opacity-60",
            bar,
          )}
          style={{
            transform: entered ? "scaleX(0)" : "scaleX(1)",
            transition: `transform ${toast.duration}ms linear`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * 토스트를 화면 하단 중앙에 쌓아 보여주는 presentational 컴포넌트.
 * 상태는 갖지 않으며, 토스트 목록과 제거 콜백을 props로 받는다.
 * (앱별 store에서 toasts/onDismiss를 연결해 사용한다.)
 */
export function Toaster({
  toasts,
  onDismiss,
}: {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
