import { StyleSheet, View } from "react-native";
import { radius, spacing } from "@cutin/tokens";
import { useTheme } from "@/theme/useTheme";

interface StepDotsProps {
  total: number;
  current: number;
}

/** 온보딩 진행 인디케이터 — 현재 스텝은 길게 늘어난 dot. */
export function StepDots({ total, current }: StepDotsProps) {
  const c = useTheme();
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            width: i === current ? 18 : 6,
            height: 6,
            borderRadius: radius.pill,
            backgroundColor: i === current ? c.accent : c.borderStrong,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", gap: spacing[1] },
});
