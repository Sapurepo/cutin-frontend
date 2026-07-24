import type { CutCount, CutLayout, PostVisibility } from "./cutin";

/** 백엔드가 내려주는 표준 에러 응답 shape. */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

/** 포스트 생성 요청 — 촬영 플로우 업로드 payload. */
export interface CreatePostRequest {
  count: CutCount;
  cuts: string[];
  layout?: CutLayout;
  frameId?: string;
  filterId?: string;
  thumbnailIndex?: number;
  caption: string;
  visibility: PostVisibility;
}

/** offset 기반 페이지네이션 응답의 공통 래퍼. */
export interface OffsetPaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

/** 좋아요 등 토글 액션의 표준 응답. */
export interface ToggleResponse {
  active: boolean;
  count: number;
}
