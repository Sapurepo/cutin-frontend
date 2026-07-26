import { API_MOCKING_ENABLED } from "../lib/apiConfig";

let startPromise: Promise<void> | null = null;

/**
 * MSW 서버(in-process fetch 인터셉트)가 준비될 때까지 기다린다. 모킹이 꺼져 있으면 즉시 resolve.
 * 최초 1회만 기동되고 이후 호출은 동일 프로미스를 공유한다.
 * apiClient가 요청 직전에 이걸 await 하여, 인터셉트 준비 전에 요청이 새는 것을 막는다.
 * (admin mocks/ensureMsw.ts 미러 — dynamic import라 모킹 off면 msw 번들도 평가되지 않는다)
 */
export function ensureMocking(): Promise<void> {
  if (!API_MOCKING_ENABLED) {
    return Promise.resolve();
  }
  if (!startPromise) {
    startPromise = (async () => {
      // msw 모듈 평가 전에 Hermes 전역 스텁을 먼저 설치한다 (순서 중요).
      await import("./polyfills");
      const { installMockFetch } = await import("./mockFetch");
      installMockFetch();
    })();
  }
  return startPromise;
}
