import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Icon, type IconName } from "./icon";

interface ChipProps {
  children?: ReactNode;
  emoji?: string;
  count?: number;
  icon?: IconName;
  selected?: boolean;
  onPress?: () => void;
}

/** 반응/댓글/필터 캡슐 — 선택 상태는 fill로 표현(모노크롬 규칙). */
export function Chip({
  children,
  emoji,
  count,
  icon,
  selected,
  onPress,
}: ChipProps) {
  const c = useTheme();
  const fg = selected ? c.accentOn : c.textPrimary;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected ? c.accent : c.surface,
          borderColor: selected ? c.accent : c.border,
        },
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
    >
      {icon ? <Icon name={icon} size={14} color={fg} /> : null}
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      {children ? (
        <Text
          style={{ fontFamily: font("body", "500"), fontSize: 12, color: fg }}
        >
          {children}
        </Text>
      ) : null}
      {count !== undefined ? (
        <Text
          style={{ fontFamily: font("latin", "500"), fontSize: 12, color: fg }}
        >
          {count}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
    height: 32,
    paddingHorizontal: spacing[3],
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  emoji: { fontSize: 14 },
});
