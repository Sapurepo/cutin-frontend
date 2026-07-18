import localFont from "next/font/local";

// 빌드 시 외부 다운로드를 없애기 위해 self-host한 CUTIN 서체.
// 본문/한글: Pretendard(variable) · 라틴/숫자/로고: Geist(variable) — Geist는 한글에 적용 금지.
export const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  preload: false, // self-host 방식을 채택하며 preload 시 critical path가 무거워질 것 같아서 false로 설정
  variable: "--font-pretendard",
});

export const geist = localFont({
  src: "./fonts/GeistVariable.woff2",
  display: "swap",
  preload: false,
  variable: "--font-geist",
});
