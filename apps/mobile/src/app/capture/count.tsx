import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CaptureMode, CutCount } from "@cutin/types";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Button, IconButton } from "@/components/button";
import { Chip } from "@/components/chip";

const countLabels: Record<CutCount, string> = {
  1: "한 컷",
  2: "두 컷",
  4: "네 컷",
  6: "여섯 컷",
};

/** §5.1 컷 수 선택 + §5.2 촬영 방식 선택. */
export default function CaptureCountScreen() {
  const c = useTheme();
  const router = useRouter();
  const [count, setCount] = useState<CutCount>(4);
  const [mode, setMode] = useState<CaptureMode>("single");

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title="촬영"
        left={
          <IconButton icon="x" onPress={() => router.dismissTo("/(tabs)")} />
        }
      />
      <View style={styles.body}>
        <View>
          <Text
            style={[
              styles.label,
              { fontFamily: font("body", "600"), color: c.textPrimary },
            ]}
          >
            컷 수
          </Text>
          <View style={styles.countGrid}>
            {([1, 2, 4, 6] as CutCount[]).map((n) => {
              const on = count === n;
              return (
                <Pressable
                  key={n}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on }}
                  onPress={() => setCount(n)}
                  style={[
                    styles.countCell,
                    {
                      backgroundColor: on ? c.accent : "transparent",
                      borderColor: on ? c.accent : c.borderStrong,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: font("latin", "600"),
                      fontSize: 20,
                      color: on ? c.accentOn : c.textPrimary,
                    }}
                  >
                    {n}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.label,
              { fontFamily: font("body", "600"), color: c.textPrimary },
            ]}
          >
            촬영 방식
          </Text>
          <View style={styles.modes}>
            <Chip
              selected={mode === "single"}
              onPress={() => setMode("single")}
            >
              한 장씩 개별
            </Chip>
            <Chip selected={mode === "burst"} onPress={() => setMode("burst")}>
              연속 촬영
            </Chip>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            variant="fill"
            size="lg"
            block
            icon="camera"
            onPress={() => router.push(`/capture/camera?count=${count}&done=0`)}
          >
            {countLabels[count]} 촬영 시작
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { flex: 1, padding: spacing[5], gap: spacing[8] },
  label: { fontSize: 13, marginBottom: spacing[3] },
  countGrid: { flexDirection: "row", gap: spacing[2] },
  countCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modes: { flexDirection: "row", gap: spacing[2] },
  footer: { marginTop: "auto" },
});
