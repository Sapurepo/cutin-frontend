/* 촬영 템플릿 레지스트리 — 인생네컷식 "레이아웃 × 프레임 스킨" 큐레이션.
 * 프레임 색은 콘텐츠(사진 프레임)이므로 모노크롬 디자인 토큰에 넣지 않는다. */
import type { CutCount, CutLayout } from "@cutin/types";

export interface FrameSkin {
  id: string;
  /** 프레임 배경색 */
  bg: string;
  /** 푸터 스탬프 텍스트 색 */
  fg: string;
  /** 프레임 바깥 여백 */
  padding: number;
  /** 컷 사이 간격 */
  gutter: number;
  cellRadius: number;
  /** "logo-date": 하단 CUTIN 로고 + 날짜 스탬프 */
  footer?: "logo-date";
}

export interface CaptureTemplate {
  id: string;
  name: string;
  /** 이 템플릿을 고를 수 있는 컷 수 */
  counts: CutCount[];
  /** 4컷 외 컷 수에서는 CutFrame이 컷 수 기본(2xN) 레이아웃으로 그린다 */
  layout: CutLayout;
  /** 미지정이면 기본(테마 surfaceSunken) 룩 */
  frame?: FrameSkin;
}

const stamped = {
  padding: 12,
  gutter: 8,
  cellRadius: 2,
  footer: "logo-date" as const,
};

const white: FrameSkin = {
  id: "white",
  bg: "#FFFFFF",
  fg: "#0A0A0B",
  ...stamped,
};
const noir: FrameSkin = {
  id: "noir",
  bg: "#111113",
  fg: "#F5F5F4",
  ...stamped,
};
const peach: FrameSkin = {
  id: "peach",
  bg: "#FFD9CF",
  fg: "#8A3B2C",
  ...stamped,
};
const butter: FrameSkin = {
  id: "butter",
  bg: "#FFE9A8",
  fg: "#7A5B12",
  ...stamped,
};
const lavender: FrameSkin = {
  id: "lavender",
  bg: "#E3D9FF",
  fg: "#4A3B7A",
  ...stamped,
};
const mint: FrameSkin = {
  id: "mint",
  bg: "#CFEDDF",
  fg: "#1F5C42",
  ...stamped,
};
const cherry: FrameSkin = {
  id: "cherry",
  bg: "#C6373F",
  fg: "#FFFFFF",
  ...stamped,
};

export const frameSkins: FrameSkin[] = [
  white,
  noir,
  peach,
  butter,
  lavender,
  mint,
  cherry,
];

/** 첫 항목이 기본 템플릿 — getTemplate() 폴백 대상. */
export const templates: CaptureTemplate[] = [
  { id: "basic", name: "베이직", counts: [1, 2, 4, 6], layout: "2x2" },
  {
    id: "classic-white",
    name: "클래식 화이트",
    counts: [1, 2, 4, 6],
    layout: "2x2",
    frame: white,
  },
  {
    id: "noir-film",
    name: "느와르 필름",
    counts: [1, 2, 4, 6],
    layout: "2x2",
    frame: noir,
  },
  {
    id: "booth-strip",
    name: "포토부스 스트립",
    counts: [4],
    layout: "row",
    frame: white,
  },
  {
    id: "wide-strip",
    name: "와이드 스트립",
    counts: [4],
    layout: "strip",
    frame: noir,
  },
  {
    id: "big-left",
    name: "빅 레프트",
    counts: [4],
    layout: "big-left",
    frame: white,
  },
  {
    id: "peach",
    name: "피치",
    counts: [1, 2, 4, 6],
    layout: "2x2",
    frame: peach,
  },
  {
    id: "butter",
    name: "버터",
    counts: [1, 2, 4, 6],
    layout: "2x2",
    frame: butter,
  },
  {
    id: "lavender",
    name: "라벤더",
    counts: [1, 2, 4, 6],
    layout: "2x2",
    frame: lavender,
  },
  {
    id: "mint",
    name: "민트",
    counts: [1, 2, 4, 6],
    layout: "2x2",
    frame: mint,
  },
  {
    id: "cherry",
    name: "체리",
    counts: [1, 2, 4, 6],
    layout: "2x2",
    frame: cherry,
  },
];

export function templatesForCount(count: CutCount): CaptureTemplate[] {
  return templates.filter((t) => t.counts.includes(count));
}

/** 미지정·미지의 id는 기본 템플릿으로 조용히 폴백한다. */
export function getTemplate(id?: string | null): CaptureTemplate {
  return templates.find((t) => t.id === id) ?? templates[0];
}

/** 피드 렌더용 — Post.frameId를 스킨으로 해석. 미지정·미지의 id면 기본 룩(undefined). */
export function getFrameSkin(frameId?: string): FrameSkin | undefined {
  return frameId ? frameSkins.find((s) => s.id === frameId) : undefined;
}
