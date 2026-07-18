"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ReportStatus } from "@cutin/types";
import { Button } from "@cutin/ui";

import { StatusPill } from "@/components/adminShell";
import { reportsQueryOptions } from "@/features/moderation/queries";

const filters = ["전체", "접수", "처리중", "완료"] as const;

/** §10 신고 큐 — 포스트/댓글/프로필 신고 처리. */
export default function ReportsPage() {
  const { data: reports, isLoading } = useQuery(reportsQueryOptions());
  const [filter, setFilter] = useState<(typeof filters)[number]>("전체");

  const visible =
    filter === "전체"
      ? reports
      : reports?.filter((r) => r.status === (filter as ReportStatus));

  return (
    <>
      <header className="border-border flex items-center justify-between border-b px-6 py-5">
        <div>
          <h1 className="text-lg font-bold">신고 큐</h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            포스트 · 댓글 · 프로필 신고 처리
          </p>
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {[
                "신고 ID",
                "대상",
                "신고 대상자",
                "사유",
                "신고자",
                "상태",
                "접수",
                "",
              ].map((h, i) => (
                <th
                  key={i}
                  className="border-border text-muted-foreground border-b px-4 py-2.5 text-left text-xs font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-muted-foreground px-4 py-10 text-center text-sm"
                >
                  불러오는 중…
                </td>
              </tr>
            ) : (
              visible?.map((r) => (
                <tr key={r.id}>
                  <td className="border-border font-latin border-b px-4 py-3.5 text-[13px]">
                    {r.id}
                  </td>
                  <td className="border-border border-b px-4 py-3.5 text-[13px]">
                    {r.target}
                  </td>
                  <td className="border-border font-latin text-muted-foreground border-b px-4 py-3.5 text-[13px]">
                    {r.targetBy}
                  </td>
                  <td className="border-border border-b px-4 py-3.5 text-[13px]">
                    {r.reason}
                  </td>
                  <td className="border-border font-latin text-muted-foreground border-b px-4 py-3.5 text-[13px]">
                    {r.reporter}
                  </td>
                  <td className="border-border border-b px-4 py-3.5">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="border-border text-muted-foreground border-b px-4 py-3.5 text-xs">
                    {r.time}
                  </td>
                  <td className="border-border border-b px-4 py-3.5">
                    <div className="flex gap-1.5">
                      <Button variant="outline" size="sm">
                        숨김
                      </Button>
                      <Button variant="primary" size="sm">
                        처리
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
