const mockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

let startPromise: Promise<void> | null = null;

/**
 * MSW 워커가 준비될 때까지 기다린다. 모킹이 꺼져 있거나 서버 환경이면 즉시 resolve.
 * 워커는 최초 1회만 기동되고 이후 호출은 동일 프로미스를 공유한다.
 * apiClient가 요청 직전에 이걸 await 하여, 워커보다 먼저 요청이 실서버로 새는 것을 막는다.
 */
export function ensureMsw(): Promise<void> {
  if (!mockingEnabled || typeof window === "undefined") {
    return Promise.resolve();
  }
  if (!startPromise) {
    startPromise = import("./browser").then(({ worker }) =>
      worker.start({ onUnhandledRequest: "bypass" }).then(() => undefined),
    );
  }
  return startPromise;
}
