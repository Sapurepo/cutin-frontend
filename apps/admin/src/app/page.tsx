"use client";

import { useRouter } from "next/navigation";
import { Button } from "@cutin/ui";

/** 어드민 로그인 — 스켈레톤 단계: 인증 없이 신고 큐로 진입한다. */
export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="bg-background flex min-h-dvh items-center justify-center px-6">
      <form
        className="border-border bg-card w-full max-w-sm rounded-md border p-8 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/reports");
        }}
      >
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="font-latin text-2xl font-bold tracking-[0.02em]">
            CUTIN
          </span>
          <span className="border-border text-muted-foreground rounded-md border px-1.5 py-px text-xs font-semibold">
            ADMIN
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="이메일"
            className="border-border bg-background placeholder:text-muted-foreground focus:border-input h-11 rounded-sm border px-4 text-sm outline-none"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="border-border bg-background placeholder:text-muted-foreground focus:border-input h-11 rounded-sm border px-4 text-sm outline-none"
          />
          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="mt-2 w-full"
          >
            로그인
          </Button>
        </div>
        <p className="text-muted-foreground mt-6 text-center text-xs">
          운영/모더레이션 전용 콘솔이에요. 접근 권한은 관리자에게 문의해주세요.
        </p>
      </form>
    </main>
  );
}
