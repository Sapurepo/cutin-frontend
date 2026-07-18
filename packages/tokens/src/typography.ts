/* CUTIN 타이포그래피
 * 본문/UI: Pretendard (한글 전반) · 라틴/숫자/로고: Geist (라틴 전용 — 한글에 적용 금지)
 * 위계는 weight와 size로 만들고 색으로 만들지 않는다. */

export const fontFamily = {
  /** 한글 본문·UI (셀프호스팅 Pretendard) */
  body: "Pretendard",
  /** 라틴/숫자/로고 전용 (Geist) */
  latin: "Geist",
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const typeScale = {
  logo: { size: 18, weight: fontWeight.bold, tracking: 0.02 },
  headline: { size: 17, weight: fontWeight.semibold, lineHeight: 1.4 },
  body: { size: 14, weight: fontWeight.regular, lineHeight: 1.6 },
  caption: { size: 11, weight: fontWeight.regular, lineHeight: 1.4 },
  numeric: { size: 15, weight: fontWeight.medium },
  chip: { size: 12, weight: fontWeight.medium },
} as const;
