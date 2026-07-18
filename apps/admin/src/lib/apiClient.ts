import { createApiClient } from "@cutin/api";

import { ensureMsw } from "@/mocks/ensureMsw";
import { API_BASE_URL } from "./apiConfig";

// 앱별 wiring: 환경변수 baseUrl과 MSW 준비 훅을 주입한다.
export const apiClient = createApiClient({
  baseUrl: API_BASE_URL,
  onBeforeRequest: ensureMsw,
});
