"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Flag, Megaphone, Shield, Users } from "lucide-react";

interface NavItem {
  key: string;
  href?: string;
  icon: ReactNode;
  label: string;
}

// §10 어드민 표준 구성 — MVP는 신고 큐/사용자 관리만 실 페이지, 나머지는 준비 중.
const nav: NavItem[] = [
  {
    key: "reports",
    href: "/reports",
    icon: <Flag size={18} />,
    label: "신고 큐",
  },
  {
    key: "users",
    href: "/users",
    icon: <Users size={18} />,
    label: "사용자 관리",
  },
  { key: "moderation", icon: <Shield size={18} />, label: "콘텐츠 모더레이션" },
  { key: "notice", icon: <Megaphone size={18} />, label: "공지 · 푸시" },
  { key: "stats", icon: <BarChart3 size={18} />, label: "통계" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-background flex min-h-dvh">
      <aside className="border-border bg-card flex w-[232px] shrink-0 flex-col border-r px-3 py-5">
        <div className="flex items-center gap-2 px-3 pb-5">
          <span className="font-latin text-lg font-bold tracking-[0.02em]">
            CUTIN
          </span>
          <span className="border-border text-muted-foreground rounded-md border px-1.5 py-px text-[11px] font-semibold">
            ADMIN
          </span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {nav.map((item) => {
            const active = item.href ? pathname.startsWith(item.href) : false;
            const base =
              "flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm transition-colors";
            if (!item.href) {
              return (
                <span
                  key={item.key}
                  className={`${base} text-muted-foreground/60 cursor-default`}
                  title="준비 중이에요"
                >
                  {item.icon}
                  {item.label}
                  <span className="ml-auto text-[10px]">준비 중</span>
                </span>
              );
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`${base} ${
                  active
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted/60"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-2.5 px-3 pt-4">
          <span className="bg-muted flex size-8 items-center justify-center rounded-full text-xs font-semibold">
            운
          </span>
          <span className="flex flex-col">
            <span className="text-[13px]">운영자</span>
            <span className="font-latin text-muted-foreground text-xs">
              moderator
            </span>
          </span>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  접수: "bg-muted text-foreground",
  처리중: "bg-primary text-primary-foreground",
  완료: "border border-input text-muted-foreground",
  활성: "bg-muted text-foreground",
  정지: "bg-destructive text-white",
  검토중: "border border-input text-muted-foreground",
};

/** 상태 필 — 모노크롬 규칙상 fill/outline으로 구분, danger(정지)만 opt-in 레드. */
export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        statusStyles[status] ?? "bg-muted text-foreground"
      }`}
    >
      {status}
    </span>
  );
}
