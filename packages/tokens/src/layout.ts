/* CUTIN spacing/radius/elevation/layout — 4px 기본 그리드, 절제된 엘리베이션. */

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16, // 기본 화면 gutter
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const radius = {
  xs: 6, // 칩, 작은 컨트롤
  sm: 10, // 인풋, 버튼
  md: 14, // 카드, 포스트
  lg: 20, // 시트, 큰 미디어
  pill: 999, // 캡슐 칩, 아바타, 촬영 FAB
} as const;

export const layout = {
  appMaxWidth: 430, // 모바일 캔버스 상한
  navHeight: 64, // 하단 탭바
  headerHeight: 52, // 상단 앱바
  tapTarget: 44, // 최소 히트 타깃
} as const;

export const duration = {
  fast: 120,
  base: 200,
  slow: 320,
} as const;
