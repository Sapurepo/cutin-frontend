import { useColorScheme } from "react-native";
import { colors, type ColorScheme } from "@cutin/tokens";

/** 시스템 컬러 스킴을 따라 CUTIN 모노크롬 팔레트를 돌려준다. */
export function useTheme(): ColorScheme {
  const scheme = useColorScheme();
  return scheme === "dark" ? colors.dark : colors.light;
}
