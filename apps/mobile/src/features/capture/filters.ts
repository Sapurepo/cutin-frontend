/* 보정 필터 프리셋 — 4x5 color matrix(20원소)를 순수 데이터로 정의한다.
 * filterId 메타데이터로 저장하고 렌더 시점에 적용한다(이미지 베이킹 없음).
 * 렌더 라이브러리를 import하지 않아 vitest에서 그대로 검증 가능하다. */

export type FilterId =
  "original" | "mono" | "soft" | "warm" | "cool" | "film" | "sepia";

/** 4x5 color matrix — RNCMIF의 Matrix와 구조 동일한 20원소 튜플. */
// prettier-ignore
export type ColorMatrix = [
  number, number, number, number, number,
  number, number, number, number, number,
  number, number, number, number, number,
  number, number, number, number, number,
];

export interface FilterDef {
  id: FilterId;
  name: string;
  /** 4x5 color matrix — null이면 원본 그대로 */
  matrix: ColorMatrix | null;
  /** 웹(react-native-web) 렌더용 CSS filter — null이면 원본 그대로 */
  css: string | null;
}

/** Rec.709 luma 가중치 — 흑백 변환 표준 계수. */
const LUMA = [0.2126, 0.7152, 0.0722] as const;

/** 첫 항목이 기본값(원본) — getFilter() 폴백 대상. */
export const filters: FilterDef[] = [
  { id: "original", name: "원본", matrix: null, css: null },
  {
    id: "mono",
    name: "흑백",
    // prettier-ignore
    matrix: [
      ...LUMA, 0, 0,
      ...LUMA, 0, 0,
      ...LUMA, 0, 0,
      0, 0, 0, 1, 0,
    ],
    css: "grayscale(1)",
  },
  {
    id: "soft",
    name: "소프트",
    // prettier-ignore
    matrix: [
      1.05, 0, 0, 0, 0.05,
      0, 1.05, 0, 0, 0.05,
      0, 0, 1.05, 0, 0.05,
      0, 0, 0, 1, 0,
    ],
    css: "brightness(1.08)",
  },
  {
    id: "warm",
    name: "웜",
    // prettier-ignore
    matrix: [
      1.06, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, 0.93, 0, 0,
      0, 0, 0, 1, 0,
    ],
    css: "sepia(0.15) saturate(1.1)",
  },
  {
    id: "cool",
    name: "쿨",
    // prettier-ignore
    matrix: [
      0.94, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, 1.08, 0, 0,
      0, 0, 0, 1, 0,
    ],
    css: "saturate(1.05) hue-rotate(-8deg)",
  },
  {
    id: "film",
    name: "필름",
    // prettier-ignore
    matrix: [
      1.15, 0, 0, 0, -0.075,
      0, 1.15, 0, 0, -0.075,
      0, 0, 1.15, 0, -0.075,
      0, 0, 0, 1, 0,
    ],
    css: "contrast(1.15)",
  },
  {
    id: "sepia",
    name: "세피아",
    // prettier-ignore
    matrix: [
      0.393, 0.769, 0.189, 0, 0,
      0.349, 0.686, 0.168, 0, 0,
      0.272, 0.534, 0.131, 0, 0,
      0, 0, 0, 1, 0,
    ],
    css: "sepia(1)",
  },
];

/** 미지정·미지의 id는 원본으로 조용히 폴백한다. */
export function getFilter(id?: string | null): FilterDef {
  return filters.find((f) => f.id === id) ?? filters[0];
}
