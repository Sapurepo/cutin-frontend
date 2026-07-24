import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { IconButton } from "@/components/button";
import { CutFrame } from "@/components/cutFrame";
import { FilteredCut } from "@/components/filteredCut";
import { filters } from "@/features/capture/filters";
import { getTemplate } from "@/features/capture/templates";
import { useCaptureStore } from "@/stores/captureStore";

/** 보정 — 필터 프리셋을 전체 컷에 일괄 적용한다 (템플릿 다음, 편집 전 단계). */
export default function FilterSelectScreen() {
  const c = useTheme();
  const router = useRouter();
  const count = useCaptureStore((s) => s.count);
  const cuts = useCaptureStore((s) => s.cuts);
  const template = getTemplate(useCaptureStore((s) => s.templateId));
  const filterId = useCaptureStore((s) => s.filterId);
  const setFilter = useCaptureStore((s) => s.setFilter);
  const [selectedId, setSelectedId] = useState(filterId);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title="보정"
        left={<IconButton icon="chevron-left" onPress={() => router.back()} />}
        right={
          <Pressable
            onPress={() => {
              setFilter(selectedId);
              router.push("/capture/edit");
            }}
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
            layout={template.layout}
            frameId={template.frame?.id}
            stampDate={new Date().toISOString()}
            filterId={selectedId}
          />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.strip}
      >
        {filters.map((f) => {
          const on = f.id === selectedId;
          return (
            <Pressable
              key={f.id}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              onPress={() => setSelectedId(f.id)}
              style={styles.item}
            >
              <View
                style={[
                  styles.swatch,
                  { borderColor: on ? c.accent : c.border },
                ]}
              >
                {cuts[0] ? (
                  <FilteredCut
                    uri={cuts[0]}
                    filterId={f.id}
                    style={StyleSheet.absoluteFill}
                  />
                ) : null}
              </View>
              <Text
                style={{
                  fontFamily: font("body", on ? "600" : "400"),
                  fontSize: 11,
                  color: on ? c.textPrimary : c.textSecondary,
                }}
              >
                {f.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  preview: { flex: 1, alignItems: "center", justifyContent: "center" },
  previewFrame: { width: 220 },
  strip: {
    gap: spacing[3],
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[6],
    paddingTop: spacing[2],
  },
  item: { alignItems: "center", gap: spacing[1] },
  swatch: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    borderWidth: 2,
    overflow: "hidden",
  },
});
