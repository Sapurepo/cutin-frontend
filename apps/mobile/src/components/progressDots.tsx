import { StyleSheet, Text, View } from "react-native";
import { spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";

interface ProgressDotsProps {
  total: number;
  current: number;
  color?: string;
}

/** 촬영 진행 "3/4" — 숫자는 Geist. */
export function ProgressDots({
  total,
  current,
  color = "#FFFFFF",
}: ProgressDotsProps) {
  return (
    <View style={styles.row}>
      <Text style={{ fontFamily: font("latin", "500"), fontSize: 13, color }}>
        {current}/{total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing[1] },
});
