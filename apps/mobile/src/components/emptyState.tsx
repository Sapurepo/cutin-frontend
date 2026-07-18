import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Icon, type IconName } from "./icon";

interface EmptyStateProps {
  icon: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
}

/** 제로 데이터 뷰 — 모든 목록 화면의 빈 상태 표준 (§11). */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  const c = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={[styles.iconBox, { backgroundColor: c.surfaceSunken }]}>
        <Icon name={icon} size={32} color={c.textPrimary} />
      </View>
      <Text
        style={{
          fontFamily: font("body", "600"),
          fontSize: 17,
          color: c.textPrimary,
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text
          style={[
            styles.description,
            { fontFamily: font("body"), color: c.textSecondary },
          ]}
        >
          {description}
        </Text>
      ) : null}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    gap: spacing[3],
    paddingHorizontal: spacing[6],
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[1],
  },
  description: { fontSize: 14, lineHeight: 22, textAlign: "center" },
  action: { marginTop: spacing[2] },
});
