import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CutCount } from "@cutin/types";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { IconButton } from "@/components/button";
import { CutFrame, type CutLayout } from "@/components/cutFrame";
import { img } from "@/mocks/seed";

const countNames: Record<CutCount, string> = {
  1: "한 컷",
  2: "두 컷",
  4: "네 컷",
  6: "여섯 컷",
};

const layouts: CutLayout[] = ["2x2", "row", "big-left", "strip"];

/** §6.1 템플릿 선택 + §6.2 미리보기 — 컷 수에 맞는 레이아웃 목록. */
export default function TemplateSelectScreen() {
  const c = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ count?: string }>();
  const count = (Number(params.count) || 4) as CutCount;
  const cuts = Array.from({ length: count }, (_, i) => img(`a${i + 1}`));
  const [selected, setSelected] = useState<CutLayout>("2x2");

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title="템플릿"
        left={<IconButton icon="chevron-left" onPress={() => router.back()} />}
        right={
          <Pressable
            onPress={() =>
              router.push(`/capture/edit?count=${count}&layout=${selected}`)
            }
            hitSlop={8}
          >
            <Text
              style={{
                fontFamily: font("body", "600"),
                fontSize: 14,
                color: c.textPrimary,
              }}
            >
              다음
            </Text>
          </Pressable>
        }
      />
      <View style={styles.preview}>
        <View style={styles.previewFrame}>
          <CutFrame
            count={count}
            cuts={cuts}
            layout={count === 4 ? selected : undefined}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text
          style={[
            styles.label,
            { fontFamily: font("body", "600"), color: c.textPrimary },
          ]}
        >
          {countNames[count]} 레이아웃
        </Text>
        <View style={styles.options}>
          {(count === 4 ? layouts : (["2x2"] as CutLayout[])).map((l) => (
            <Pressable
              key={l}
              accessibilityRole="radio"
              accessibilityState={{ selected: l === selected }}
              onPress={() => setSelected(l)}
              style={[
                styles.option,
                {
                  borderColor: l === selected ? c.accent : c.border,
                  backgroundColor: c.surface,
                },
              ]}
            >
              <CutFrame
                count={count}
                cuts={cuts}
                layout={count === 4 ? l : undefined}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  preview: { alignItems: "center", paddingVertical: spacing[4] },
  previewFrame: { width: 200 },
  body: { paddingHorizontal: spacing[4], paddingBottom: spacing[6] },
  label: { fontSize: 13, marginBottom: spacing[3] },
  options: { flexDirection: "row", gap: spacing[2] },
  option: {
    flex: 1,
    padding: 5,
    borderRadius: radius.sm,
    borderWidth: 2,
  },
});
