"use client";

import { useEffect } from "react";

import { ensureMsw } from "./ensureMsw";

/**
 * MSW 워커를 가능한 한 일찍 기동만 트리거한다(렌더는 막지 않는다 → 화면 깜빡임 방지).
 * 요청이 워커보다 먼저 새는 것은 apiClient가 ensureMsw()를 await 해서 막는다.
 */
export function MswProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void ensureMsw();
  }, []);

  return <>{children}</>;
}
