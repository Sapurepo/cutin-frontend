import { createApiClient } from "@cutin/api";

import { ensureMocking } from "../mocks/ensureMocking";
import { API_BASE_URL } from "./apiConfig";

// 앱별 wiring: env baseUrl과 MSW 준비 훅을 주입한다. (admin lib/apiClient.ts 미러)
export const apiClient = createApiClient({
  baseUrl: API_BASE_URL,
  onBeforeRequest: ensureMocking,
});
