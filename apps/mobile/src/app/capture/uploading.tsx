import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Button } from "@/components/button";
import { FilteredCut } from "@/components/filteredCut";
import { useCreatePost } from "@/features/feed/queries";
import { getTemplate } from "@/features/capture/templates";
import { useCaptureStore } from "@/stores/captureStore";

/** §6.4 업로드 진행 — mocked POST /posts로 실제 생성 후 피드 복귀. */
export default function UploadingScreen() {
  const c = useTheme();
  const router = useRouter();
  const cuts = useCaptureStore((s) => s.cuts);
  const filterId = useCaptureStore((s) => s.filterId);
  const { mutate, isError } = useCreatePost();
  const [pct, setPct] = useState(0);
  const startedRef = useRef(false);

  const upload = useCallback(() => {
    const s = useCaptureStore.getState();
    const template = getTemplate(s.templateId);
    mutate(
      {
        count: s.count,
        cuts: s.cuts,
        layout: template.layout,
        frameId: template.frame?.id,
        filterId: s.filterId === "original" ? undefined : s.filterId,
        thumbnailIndex: s.thumbnailIndex,
        caption: s.caption,
        visibility: s.visibility,
      },
      {
        onSuccess: () => {
          setPct(100);
          setTimeout(() => {
            router.dismissTo("/(tabs)");
            useCaptureStore.getState().reset();
          }, 400);
        },
      },
    );
  }, [mutate, router]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    upload();
  }, [upload]);

  // 업로드 중 코스메틱 진행률 — 성공 시 onSuccess가 100으로 마감한다.
  useEffect(() => {
    const timer = setInterval(() => {
      setPct((prev) => (prev < 90 ? Math.min(prev + 7, 90) : prev));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader title="업로드" />
      <View style={styles.body}>
        <View style={[styles.thumb, { backgroundColor: c.surfaceSunken }]}>
          {cuts[0] ? (
            <FilteredCut
              uri={cuts[0]}
              filterId={filterId}
              style={[StyleSheet.absoluteFill, { opacity: 0.55 }]}
            />
          ) : null}
          <Text style={[styles.pct, { fontFamily: font("latin", "600") }]}>
            {pct}%
          </Text>
        </View>
        <Text
          style={{
            fontFamily: font("body", "600"),
            fontSize: 16,
            color: c.textPrimary,
          }}
        >
          {isError ? "업로드에 실패했어요" : "포스트를 올리는 중이에요"}
        </Text>
        <View style={[styles.track, { backgroundColor: c.surfaceSunken }]}>
          <View
            style={[
              styles.fillBar,
              { width: `${pct}%`, backgroundColor: c.accent },
            ]}
          />
        </View>
        <Text
          style={{
            fontFamily: font("body"),
            fontSize: 13,
            color: isError ? c.danger : c.textSecondary,
          }}
        >
          {isError
            ? "네트워크 상태를 확인하고 다시 시도해주세요"
            : "잠시만 기다려주세요"}
        </Text>
      </View>
      <View style={styles.footer}>
        {isError ? (
          <Button variant="fill" block onPress={upload}>
            다시 시도
          </Button>
        ) : null}
        <Button variant="outline" block onPress={() => router.back()}>
          취소
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[5],
    padding: spacing[8],
  },
  thumb: {
    width: 132,
    height: 132,
    borderRadius: radius.md,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  pct: {
    fontSize: 26,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  track: {
    width: "100%",
    maxWidth: 260,
    height: 6,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  fillBar: { height: "100%", borderRadius: radius.pill },
  footer: { padding: spacing[4], gap: spacing[2] },
});
