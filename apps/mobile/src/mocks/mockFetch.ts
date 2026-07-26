/* RN용 mock fetch 어댑터.
 *
 * msw의 네트워크 인터셉터(msw/native)는 RN 런타임과 맞지 않는다 —
 * fetch 인터셉터는 mock 응답을 ReadableStream 본문으로 만드는데 RN의 Response가
 * 이를 지원하지 않아 본문이 유실되고, XHR 인터셉터는 Hermes에 없는 전역
 * (XMLHttpRequestUpload 등)과 RN XHR의 비표준 동작에 걸린다.
 *
 * 그래서 인터셉션 레이어만 쓰지 않고, 핸들러 정의(handlers.ts)는 그대로 재사용해
 * 요청을 직접 매칭한다. 핸들러는 admin·vitest와 100% 동일한 것을 공유한다. */
import type { RequestHandler } from "msw";

import { handlers } from "./handlers";

let requestSeq = 0;

/** 핸들러에 매칭되면 mock 응답을, 아니면 null(실제 요청으로 통과)을 돌려준다. */
async function resolveMock(request: Request): Promise<Response | null> {
  for (const handler of handlers as RequestHandler[]) {
    const result = await handler.run({
      request: request.clone(),
      requestId: `rn-mock-${++requestSeq}`,
    });
    if (result?.response) return result.response;
  }
  return null;
}

/** global fetch를 핸들러 우선 조회 버전으로 교체한다. */
export function installMockFetch() {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async function mockFetch(input, init) {
    const request = new Request(input as RequestInfo, init);
    const mocked = await resolveMock(request);
    if (mocked) return mocked;
    // 핸들러가 없는 요청은 그대로 통과시킨다(msw의 onUnhandledRequest: "bypass").
    return originalFetch(input, init);
  };
}
