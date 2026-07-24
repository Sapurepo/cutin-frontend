import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Button } from "@/components/button";
import { draft } from "@/mocks/seed";
import { useCaptureStore } from "@/stores/captureStore";

/** §5.3 미완료 포스트 차단 — 동시 draft 1개 제한, [이어서 작성]/[폐기하고 새로 시작]. */
export default function DraftBlockSheet() {
  const c = useTheme();
  const router = useRouter();
  const resume = useCaptureStore((s) => s.resume);

  return (
    <View style={styles.screen}>
      <Pressable
        style={[StyleSheet.absoluteFill, { backgroundColor: c.scrim }]}
        onPress={() => router.back()}
      />
      <View
        style={[
          styles.sheet,
          { backgroundColor: c.surface, shadowColor: "#000" },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: c.borderStrong }]} />
        <View style={styles.row}>
          <View style={[styles.thumb, { backgroundColor: c.surfaceSunken }]}>
            {draft.cuts[0] ? (
              <Image
                source={{ uri: draft.cuts[0] }}
                style={StyleSheet.absoluteFill}
                alt=""
                contentFit="cover"
              />
            ) : null}
            <View style={[styles.thumbBadge, { backgroundColor: c.scrim }]}>
              <Text
                style={{
                  fontFamily: font("latin", "500"),
                  fontSize: 10,
                  color: "#FFF",
                }}
              >
                {draft.cuts.length}/{draft.count}
              </Text>
            </View>
          </View>
          <View style={styles.copy}>
            <Text
              style={{
                fontFamily: font("body", "700"),
                fontSize: 16,
                color: c.textPrimary,
              }}
            >
              작성 중인 포스트가 있어요
            </Text>
            <Text
              style={[
                styles.body,
                { fontFamily: font("body"), color: c.textSecondary },
              ]}
            >
              이전 포스트 완료 후 새로 만들 수 있어요. 이어서 작성할까요?
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Button
            variant="fill"
            size="lg"
            block
            onPress={() => {
              resume(draft);
              router.replace("/capture/camera");
            }}
          >
            이어서 작성
          </Button>
          <Button
            variant="outline"
            block
            icon="trash-2"
            onPress={() => router.replace("/capture/count")}
          >
            폐기하고 새로 시작
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "flex-end" },
  sheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing[5],
    paddingBottom: spacing[8],
    gap: spacing[4],
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -8 },
    elevation: 16,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    alignSelf: "center",
  },
  row: { flexDirection: "row", gap: spacing[3] },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
  },
  thumbBadge: {
    position: "absolute",
    right: 3,
    bottom: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.pill,
  },
  copy: { flex: 1, gap: spacing[1] },
  body: { fontSize: 13, lineHeight: 21 },
  actions: { gap: spacing[2] },
});
