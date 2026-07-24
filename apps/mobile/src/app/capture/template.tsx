import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CutCount } from "@cutin/types";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { IconButton } from "@/components/button";
import { CutFrame } from "@/components/cutFrame";
import { getTemplate, templatesForCount } from "@/features/capture/templates";
import { useCaptureStore } from "@/stores/captureStore";

const countNames: Record<CutCount, string> = {
  1: "한 컷",
  2: "두 컷",
  4: "네 컷",
  6: "여섯 컷",
};

/** §6.1 템플릿 선택 + §6.2 미리보기 — 컷 수에 맞는 레이아웃 × 프레임 스킨 큐레이션. */
export default function TemplateSelectScreen() {
  const c = useTheme();
  const router = useRouter();
  const count = useCaptureStore((s) => s.count);
  const cuts = useCaptureStore((s) => s.cuts);
  const templateId = useCaptureStore((s) => s.templateId);
  const setTemplate = useCaptureStore((s) => s.setTemplate);

  const options = templatesForCount(count);
  const [selectedId, setSelectedId] = useState(() =>
    options.some((t) => t.id === templateId) ? templateId : options[0].id,
  );
  const selected = getTemplate(selectedId);
  const stamp = new Date().toISOString();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title="템플릿"
        left={<IconButton icon="chevron-left" onPress={() => router.back()} />}
        right={
          <Pressable
            onPress={() => {
              setTemplate(selectedId);
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
            layout={selected.layout}
            frameId={selected.frame?.id}
            stampDate={stamp}
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
          {countNames[count]} 템플릿
        </Text>
        <View style={styles.options}>
          {options.map((t) => {
            const on = t.id === selectedId;
            return (
              <Pressable
                key={t.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: on }}
                onPress={() => setSelectedId(t.id)}
                style={[
                  styles.option,
                  {
                    borderColor: on ? c.accent : c.border,
                    backgroundColor: c.surface,
                  },
                ]}
              >
                <CutFrame
                  count={count}
                  cuts={cuts}
                  layout={t.layout}
                  frameId={t.frame?.id}
                  stampDate={stamp}
                />
                <Text
                  style={[
                    styles.optionName,
                    { fontFamily: font("body", "500"), color: c.textPrimary },
                  ]}
                >
                  {t.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  preview: { alignItems: "center", paddingVertical: spacing[4] },
  previewFrame: { width: 180 },
  body: { paddingHorizontal: spacing[4], paddingBottom: spacing[6] },
  label: { fontSize: 13, marginBottom: spacing[3] },
  options: { flexDirection: "row", flexWrap: "wrap", gap: spacing[2] },
  option: {
    flexBasis: "47%",
    flexGrow: 0,
    padding: 5,
    borderRadius: radius.sm,
    borderWidth: 2,
    gap: spacing[1],
  },
  optionName: { fontSize: 11, textAlign: "center", paddingBottom: 2 },
});
