/* CUTIN 도메인 타입 — CUTIN-FEATURES.md 명세 기반.
 * MVP(Phase 1) 범위의 화면 스켈레톤이 소비하는 형태로 정의한다. */

export interface UserSummary {
  name: string;
  handle: string;
  avatar?: string;
}

export interface Friend extends UserSummary {
  /** 함께 아는 친구 수 (추천/요청 목록에서 사용) */
  mutual?: number;
}

export type PostVisibility = "friends" | "public";

/** 컷 수 옵션 — §5.1 */
export type CutCount = 1 | 2 | 4 | 6;

/** 4컷 템플릿 레이아웃 변형 — §6.1 (4컷 외 컷 수는 2xN 기본) */
export type CutLayout = "2x2" | "row" | "big-left" | "strip";

/** 촬영 방식 — §5.2 (A) 연속 촬영 / (B) 한 장씩 개별 촬영 */
export type CaptureMode = "burst" | "single";

export interface Reaction {
  emoji: string;
  count: number;
}

export interface Comment {
  name: string;
  text: string;
  timeAgo: string;
}

export interface Post {
  id: string;
  author: UserSummary;
  timeAgo: string;
  count: CutCount;
  cuts: string[];
  caption: string;
  reactions: Reaction[];
  comments: Comment[];
  myReaction: string | null;
  visibility?: PostVisibility;
  /** 템플릿 레이아웃 — 미지정 시 컷 수 기본(2xN) */
  layout?: CutLayout;
  /** 프레임 스킨 id — 미지정 시 기본 룩 */
  frameId?: string;
  /** 보정 필터 id — 미지정 시 원본 */
  filterId?: string;
  /** 대표 컷(썸네일) 인덱스 — §6.3 */
  thumbnailIndex?: number;
  /** 작성 시각(ISO) — 프레임 푸터 날짜 스탬프에 사용 */
  createdAt?: string;
}

/** 미완료 포스트 — §5.3 (동시 draft 1개 제한) */
export interface Draft {
  count: CutCount;
  mode: CaptureMode;
  /** 지금까지 촬영된 컷 이미지 URI */
  cuts: string[];
}

export type NotificationKind = "reaction" | "comment" | "friend" | "system";

export interface NotificationItem {
  kind: NotificationKind;
  actor: string;
  text: string;
  timeAgo: string;
  unread: boolean;
  avatar?: string;
  thumb?: string;
  /** 친구 요청처럼 수락/거절 액션이 붙는 알림 */
  action?: boolean;
}

/** 알림 선호 시간대 슬롯 — §3.3 */
export interface NotifySlot {
  key: string;
  label: string;
  range: string;
  icon: string;
}

export interface ServiceTip {
  icon: string;
  title: string;
  body: string;
}

/** 어드민 — 신고 큐 §10 */
export type ReportStatus = "접수" | "처리중" | "완료";

export interface Report {
  id: string;
  target: string;
  targetBy: string;
  reason: string;
  reporter: string;
  status: ReportStatus;
  time: string;
}

/** 어드민 — 사용자 관리 §10 */
export type AdminUserStatus = "활성" | "정지" | "검토중";

export interface AdminUser {
  name: string;
  handle: string;
  joined: string;
  posts: number;
  status: AdminUserStatus;
}
