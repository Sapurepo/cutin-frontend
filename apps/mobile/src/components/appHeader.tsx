import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { layout, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";

interface AppHeaderProps {
  title?: string;
  /** true면 타이틀 대신 CUTIN 워드마크(Geist 700, +0.02em) */
  brand?: boolean;
  left?: ReactNode;
  right?: ReactNode;
}

/** 고정 상단 앱바(52px) — 로고는 워드마크로만 그린다(로고 이미지 금지). */
export function AppHeader({ title, brand, left, right }: AppHeaderProps) {
  const c = useTheme();
  return (
    <View
      style={[
        styles.bar,
        { backgroundColor: c.bg, borderBottomColor: c.border },
      ]}
    >
      <View style={styles.side}>{left}</View>
      <View style={styles.center}>
        {brand ? (
          <Text
            style={{
              fontFamily: font("latin", "700"),
              fontSize: 18,
              letterSpacing: 0.36,
              color: c.textPrimary,
            }}
          >
            CUTIN
          </Text>
        ) : title ? (
          <Text
            style={{
              fontFamily: font("body", "600"),
              fontSize: 16,
              color: c.textPrimary,
            }}
          >
            {title}
          </Text>
        ) : null}
      </View>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: layout.headerHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[2],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: { width: 88, flexDirection: "row", alignItems: "center" },
  right: { justifyContent: "flex-end" },
  center: { flex: 1, alignItems: "center" },
});
