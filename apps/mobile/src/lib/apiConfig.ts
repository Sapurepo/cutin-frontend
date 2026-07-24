/* 앱별 API 설정 — EXPO_PUBLIC_* env는 번들 타임에 인라인된다(변경 시 Metro 재시작). */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

export const API_MOCKING_ENABLED =
  process.env.EXPO_PUBLIC_API_MOCKING === "enabled";
