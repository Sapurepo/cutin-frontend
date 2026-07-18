"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@cutin/ui";
import { MoreHorizontal, Search } from "lucide-react";

import { StatusPill } from "@/components/adminShell";
import { adminUsersQueryOptions } from "@/features/moderation/queries";

/** §10 사용자 관리 — 조회/검색, 정지·해제. */
export default function UsersPage() {
  const { data: users, isLoading } = useQuery(adminUsersQueryOptions());
  const [keyword, setKeyword] = useState("");

  const visible = users?.filter(
    (u) => u.name.includes(keyword) || u.handle.includes(keyword),
  );

  return (
    <>
      <header className="border-border flex items-center justify-between border-b px-6 py-5">
        <div>
          <h1 className="text-lg font-bold">사용자 관리</h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            조회 · 정지 · 탈퇴 처리
          </p>
        </div>
        <label className="border-border bg-card flex w-[260px] items-center gap-2 rounded-sm border px-3 py-2">
          <Search size={16} className="text-muted-foreground" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="닉네임 · 아이디 검색"
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
          />
        </label>
      </header>
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["사용자", "아이디", "가입일", "포스트", "상태", ""].map(
                (h, i) => (
                  <th
                    key={i}
                    className="border-border text-muted-foreground border-b px-4 py-2.5 text-left text-xs font-semibold"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-muted-foreground px-4 py-10 text-center text-sm"
                >
                  불러오는 중…
                </td>
              </tr>
            ) : (
              visible?.map((u) => (
                <tr key={u.handle}>
                  <td className="border-border border-b px-4 py-3.5">
                    <div className="flex items-center gap-2.5 text-[13px]">
                      <span className="bg-muted flex size-7 items-center justify-center rounded-full text-xs font-semibold">
                        {u.name.slice(0, 1)}
                      </span>
                      {u.name}
                    </div>
                  </td>
                  <td className="border-border font-latin text-muted-foreground border-b px-4 py-3.5 text-[13px]">
                    @{u.handle}
                  </td>
                  <td className="border-border font-latin text-muted-foreground border-b px-4 py-3.5 text-[13px]">
                    {u.joined}
                  </td>
                  <td className="border-border font-latin border-b px-4 py-3.5 text-[13px]">
                    {u.posts}
                  </td>
                  <td className="border-border border-b px-4 py-3.5">
                    <StatusPill status={u.status} />
                  </td>
                  <td className="border-border border-b px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Button variant="outline" size="sm">
                        {u.status === "정지" ? "해제" : "정지"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="더보기"
                      >
                        <MoreHorizontal size={16} />
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
