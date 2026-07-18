import { MutationCache, QueryClient } from "@tanstack/react-query";

import { getErrorMessage, resolveErrorKind, type ErrorKind } from "./apiError";

/** 재시도가 의미 있는 종류(일시적 장애)만 한 번 더 시도한다. 4xx류는 재시도하지 않는다. */
const RETRYABLE_KINDS = new Set<ErrorKind>(["network", "server", "unknown"]);

export interface QueryClientOptions {
  /**
   * mutation 실패 시 호출된다. 앱이 토스트 등으로 표면화한다.
   * 인자는 이미 사용자용 한국어로 정규화된 메시지다.
   */
  onMutationError?: (message: string) => void;
}

export function createQueryClient({
  onMutationError,
}: QueryClientOptions = {}) {
  return new QueryClient({
    // 모든 mutation 실패를 한곳에서 알린다(쓰기 에러의 공통 표면).
    mutationCache: new MutationCache({
      onError: (error) => {
        onMutationError?.(getErrorMessage(error));
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: (failureCount, error) =>
          RETRYABLE_KINDS.has(resolveErrorKind(error)) && failureCount < 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
