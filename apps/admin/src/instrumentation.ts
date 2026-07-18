/**
 * 서버 시작 시 1회 실행된다(Next instrumentation).
 * 모킹이 켜져 있고 Node 런타임일 때만 msw/node 서버를 기동해
 * Server Action·DAL의 서버 사이드 fetch를 가로챈다.
 * (Edge 런타임 미들웨어는 msw/node로 가로챌 수 없어 제외된다.)
 */
export async function register() {
  if (
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
    process.env.NEXT_RUNTIME === "nodejs"
  ) {
    const { server } = await import("./mocks/server");
    server.listen({ onUnhandledRequest: "bypass" });
  }
}
