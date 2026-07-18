/* CUTIN 컬러 시스템 — 모노크롬(잉크/오프화이트) tone-on-tone.
 * 콘텐츠(사진/영상)가 주인공이므로 UI는 무채색으로 물러난다.
 * 위계는 FILL / OUTLINE / WEIGHT / SIZE로 만들고, 색상(hue)으로 만들지 않는다.
 * 순수 #000/#FFF는 눈부심·OLED 잔상 방지를 위해 의도적으로 피한다. */

export interface ColorScheme {
  bg: string;
  surface: string;
  surfaceSunken: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentOn: string;
  danger: string;
  scrim: string;
  overlay: string;
}

export const colors: { light: ColorScheme; dark: ColorScheme } = {
  light: {
    bg: "#FAFAF8",
    surface: "#FFFFFF",
    surfaceSunken: "#F2F2EE",
    border: "#E6E6E2",
    borderStrong: "#C9C9C4",
    textPrimary: "#0A0A0B",
    textSecondary: "#9A9A95",
    accent: "#0A0A0B",
    accentOn: "#FFFFFF",
    danger: "#FF3B30",
    scrim: "rgba(10, 10, 11, 0.55)",
    overlay: "rgba(10, 10, 11, 0.04)",
  },
  dark: {
    bg: "#0A0A0B",
    surface: "#161618",
    surfaceSunken: "#1E1E21",
    border: "#232327",
    borderStrong: "#3A3A3E",
    textPrimary: "#F5F5F4",
    textSecondary: "#7A7A7E",
    accent: "#F5F5F4",
    accentOn: "#0A0A0B",
    danger: "#FF453A",
    scrim: "rgba(0, 0, 0, 0.6)",
    overlay: "rgba(245, 245, 244, 0.06)",
  },
};
