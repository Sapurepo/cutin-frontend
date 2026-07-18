import type { ApiError } from "@cutin/types";

import { NETWORK_ERROR_CODE, type ClientError } from "./apiError";

type AccessTokenProvider = () => string | null;

const noAccessToken: AccessTokenProvider = () => null;
const noop = async (): Promise<void> => {};

export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: AccessTokenProvider;
  /**
   * 매 요청 직전에 await 되는 훅. 앱이 주입한다(예: MSW 워커 준비 대기).
   * 기본값은 no-op이라, 주입하지 않으면 곧장 요청한다.
   */
  onBeforeRequest?: () => Promise<void>;
}

export interface ApiClient {
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string, body?: unknown): Promise<T>;
  patch<T>(endpoint: string, body?: unknown): Promise<T>;
  delete<T>(endpoint: string): Promise<T>;
}

async function parseError(response: Response): Promise<ClientError> {
  try {
    const error = (await response.json()) as Partial<ApiError>;
    if (typeof error.code === "string" && typeof error.message === "string") {
      return { ...(error as ApiError), status: response.status };
    }
  } catch {
    // Fall through to the stable fallback below.
  }

  return {
    code: String(response.status),
    message: response.statusText || "Request failed",
    status: response.status,
  };
}

export function createApiClient({
  baseUrl,
  getAccessToken = noAccessToken,
  onBeforeRequest = noop,
}: ApiClientOptions): ApiClient {
  async function request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    // 요청 직전 훅(앱이 주입)을 먼저 대기시킨다. 그 외엔 즉시 통과한다.
    await onBeforeRequest();

    const url = `${baseUrl}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const token = getAccessToken();
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    let response: Response;
    try {
      response = await fetch(url, { ...options, headers });
    } catch {
      // fetch 자체가 실패(오프라인/DNS/타임아웃)하면 HTTP 에러와 동일한 shape으로 정규화한다.
      throw {
        code: NETWORK_ERROR_CODE,
        message: "네트워크에 연결할 수 없습니다.",
      } satisfies ClientError;
    }

    if (!response.ok) {
      throw await parseError(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  return {
    get<T>(endpoint: string) {
      return request<T>(endpoint);
    },
    post<T>(endpoint: string, body?: unknown) {
      return request<T>(endpoint, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      });
    },
    patch<T>(endpoint: string, body?: unknown) {
      return request<T>(endpoint, {
        method: "PATCH",
        body: body ? JSON.stringify(body) : undefined,
      });
    },
    delete<T>(endpoint: string) {
      return request<T>(endpoint, { method: "DELETE" });
    },
  };
}
