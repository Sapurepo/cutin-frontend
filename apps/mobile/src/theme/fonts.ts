/* CUTIN 서체 헬퍼 — RN은 weight로 패밀리를 자동 선택하지 않으므로
 * (kind, weight) → 폰트 패밀리명 매핑으로 통일한다.
 * body: Pretendard(한글/UI 전반) · latin: Geist(라틴/숫자/로고 전용, 한글 금지) */
import type { fontWeight } from "@cutin/tokens";

// Metro는 정적 require로만 에셋을 번들에 포함할 수 있다.
/* eslint-disable @typescript-eslint/no-require-imports */
export const fontAssets = {
  Pretendard: require("../../assets/fonts/Pretendard-Regular.otf"),
  "Pretendard-Medium": require("../../assets/fonts/Pretendard-Medium.otf"),
  "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.otf"),
  "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.otf"),
  Geist: require("../../assets/fonts/Geist-Regular.otf"),
  "Geist-Medium": require("../../assets/fonts/Geist-Medium.otf"),
  "Geist-SemiBold": require("../../assets/fonts/Geist-SemiBold.otf"),
  "Geist-Bold": require("../../assets/fonts/Geist-Bold.otf"),
};
/* eslint-enable @typescript-eslint/no-require-imports */

type Weight = (typeof fontWeight)[keyof typeof fontWeight];

const suffix: Record<Weight, string> = {
  "400": "",
  "500": "-Medium",
  "600": "-SemiBold",
  "700": "-Bold",
};

export function font(kind: "body" | "latin", weight: Weight = "400") {
  const base = kind === "body" ? "Pretendard" : "Geist";
  return `${base}${suffix[weight]}`;
}
