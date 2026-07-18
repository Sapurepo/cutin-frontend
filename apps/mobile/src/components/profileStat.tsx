import { StyleSheet, Text, View } from "react-native";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";

/** 프로필 통계(포스트/친구/받은 반응) — 숫자는 Geist. */
export function ProfileStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const c = useTheme();
  return (
    <View style={styles.stat}>
      <Text
        style={{
          fontFamily: font("latin", "600"),
          fontSize: 18,
          color: c.textPrimary,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: font("body"),
          fontSize: 11,
          color: c.textSecondary,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stat: { alignItems: "center", gap: 2 },
});
