import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import {
  isLiquidGlassSupported,
  LiquidGlassView,
} from "@callstack/liquid-glass";

interface GlassSurfaceProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** 유리를 못 쓰는 환경(iOS 26 미만·Android)에서 대신 깔 배경색 */
  fallbackColor: string;
  /** 'clear'는 배경이 더 많이 비친다 — 사진 위 컨트롤에 쓴다 */
  effect?: "clear" | "regular";
  colorScheme?: "light" | "dark" | "system";
  /** 누르면 반응하는 표면(버튼류). 마운트 후에는 바꿀 수 없다 */
  interactive?: boolean;
}

/** iOS 26 Liquid Glass 표면. 미지원 환경에서는 단색 배경 View로 폴백한다. */
export function GlassSurface({
  children,
  style,
  fallbackColor,
  effect = "regular",
  colorScheme = "system",
  interactive,
}: GlassSurfaceProps) {
  if (!isLiquidGlassSupported) {
    return (
      <View style={[style, { backgroundColor: fallbackColor }]}>
        {children}
      </View>
    );
  }
  return (
    <LiquidGlassView
      style={style}
      effect={effect}
      colorScheme={colorScheme}
      interactive={interactive}
    >
      {children}
    </LiquidGlassView>
  );
}

export const glassStyles = StyleSheet.create({
  /** 유리 표면은 자체 곡률이 있어야 재질이 드러난다 */
  clip: { overflow: "hidden" },
});
