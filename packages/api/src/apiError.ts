import type { ApiError } from "@cutin/types";

/**
 * apiClient가 던지는 정규화된 에러 shape.
 * HTTP 에러뿐 아니라 fetch 자체가 실패하는 네트워크 에러도 이 형태로 맞춘다.
 * `status`는 응답이 있었던 경우에만 채워진다(네트워크 실패 시 undefined).
 */
export interface ClientError extends ApiError {
  status?: number;
}

/** fetch 자체가 실패(오프라인/타임아웃 등)했을 때 부여하는 코드. */
export const NETWORK_ERROR_CODE = "NETWORK_ERROR";

/** 화면 분기·문구 결정을 위한 의미 단위 에러 종류. */
export type ErrorKind =
  | "network"
  | "validation"
  | "unauthorized"
  | "forbidden"
  | "notFound"
  | "conflict"
  | "rateLimited"
  | "server"
  | "unknown";

/** 서버가 내려주는 의미 코드 → ErrorKind. status보다 우선한다. */
const CODE_TO_KIND: Record<string, ErrorKind> = {
  [NETWORK_ERROR_CODE]: "network",
  BAD_REQUEST: "validation",
  VALIDATION_ERROR: "validation",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  NOT_FOUND: "notFound",
  CONFLICT: "conflict",
  TOO_MANY_REQUESTS: "rateLimited",
  INTERNAL_SERVER_ERROR: "server",
};

function kindFromStatus(status: number | undefined): ErrorKind {
  if (status === undefined) return "unknown";
  switch (status) {
    case 400:
      return "validation";
    case 401:
      return "unauthorized";
    case 403:
      return "forbidden";
    case 404:
      return "notFound";
    case 409:
      return "conflict";
    case 429:
      return "rateLimited";
    default:
      return status >= 500 ? "server" : "unknown";
  }
}

const KIND_MESSAGE: Record<ErrorKind, string> = {
  network: "네트워크 연결을 확인하고 다시 시도해주세요.",
  validation: "입력한 내용을 다시 확인해주세요.",
  unauthorized: "로그인이 필요해요.",
  forbidden: "이 작업을 수행할 권한이 없어요.",
  notFound: "요청한 내용을 찾을 수 없어요.",
  conflict: "이미 처리된 요청이에요.",
  rateLimited: "요청이 너무 많아요. 잠시 후 다시 시도해주세요.",
  server: "서버에 문제가 생겼어요. 잠시 후 다시 시도해주세요.",
  unknown: "문제가 발생했어요. 잠시 후 다시 시도해주세요.",
};

export function isClientError(error: unknown): error is ClientError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    typeof (error as ApiError).code === "string"
  );
}

export function resolveErrorKind(error: unknown): ErrorKind {
  if (!isClientError(error)) return "unknown";
  return CODE_TO_KIND[error.code] ?? kindFromStatus(error.status);
}

/** ValidationError의 details.fields에서 첫 번째 필드 메시지를 꺼낸다. */
function firstFieldMessage(error: ClientError): string | undefined {
  const fields = (
    error.details as { fields?: Record<string, unknown> } | undefined
  )?.fields;
  if (!fields || typeof fields !== "object") return undefined;
  const first = Object.values(fields)[0];
  return typeof first === "string" ? first : undefined;
}

/**
 * 사용자에게 보여줄 한국어 메시지. 종류별 친화적 문구를 기본으로 쓰되,
 * 검증 에러는 서버가 짚어준 필드 메시지를 우선 노출한다.
 */
export function getErrorMessage(error: unknown): string {
  const kind = resolveErrorKind(error);
  if (kind === "validation" && isClientError(error)) {
    return firstFieldMessage(error) ?? error.message ?? KIND_MESSAGE.validation;
  }
  return KIND_MESSAGE[kind];
}
