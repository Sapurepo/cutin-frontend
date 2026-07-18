import { StyleSheet, Text, View } from "react-native";
import { radius } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";

interface BadgeProps {
  count?: number;
  dot?: boolean;
  /** danger(시스템 레드)는 알림/긴급 전용 opt-in — 기본은 잉크 뱃지 */
  variant?: "default" | "danger";
}

export function Badge({ count, dot, variant = "default" }: BadgeProps) {
  const c = useTheme();
  const bg = variant === "danger" ? c.danger : c.accent;
  if (dot) {
    return <View style={[styles.dot, { backgroundColor: bg }]} />;
  }
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text
        style={{
          fontFamily: font("latin", "600"),
          fontSize: 10,
          color: variant === "danger" ? "#FFFFFF" : c.accentOn,
        }}
      >
        {count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: { width: 8, height: 8, borderRadius: radius.pill },
  pill: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
});
