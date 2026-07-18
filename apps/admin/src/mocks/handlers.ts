import { delay, http, HttpResponse } from "msw";

import { API_BASE_URL } from "@/lib/apiConfig";
import { db } from "./seed";

const url = (path: string) => `${API_BASE_URL}${path}`;

const LATENCY_MS = 300;

// 도메인 핸들러를 이 배열에 추가해 나간다. (browser/server 양쪽에서 공유)
export const handlers = [
  http.get(url("/admin/reports"), async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(db.reports);
  }),
  http.get(url("/admin/users"), async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(db.users);
  }),
];
