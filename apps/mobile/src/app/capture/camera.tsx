import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CutCount } from "@cutin/types";
import { colors, radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { IconButton } from "@/components/button";
import { ProgressDots } from "@/components/progressDots";
import { img } from "@/mocks/seed";

/* 촬영 화면은 항상 다크(잉크) 캔버스 — 실제 카메라(expo-camera)는 후속 작업이고
 * 스켈레톤은 뷰파인더 플레이스홀더로 플로우만 검증한다. */
const ink = colors.dark;

export default function CameraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ count?: string; done?: string }>();
  const count = (Number(params.count) || 4) as CutCount;
  const [done, setDone] = useState(Math.min(Number(params.done) || 0, count));

  const shoot = () => {
    const next = done + 1;
    if (next >= count) {
      router.replace(`/capture/template?count=${count}`);
    } else {
      setDone(next);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.top}>
        <IconButton icon="x" color="#FFFFFF" onPress={() => router.back()} />
        <View style={styles.progressCapsule}>
          <ProgressDots total={count} current={done} />
        </View>
        <View style={styles.topSpacer} />
      </View>

      <View style={styles.viewfinder}>
        <Image
          source={{ uri: img("view2") }}
          style={[StyleSheet.absoluteFill, { opacity: 0.85 }]}
          alt=""
          contentFit="cover"
        />
        <View style={styles.counterCapsule}>
          <Text
            style={{
              fontFamily: font("latin"),
              fontSize: 15,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {done + 1} / {count}
          </Text>
        </View>
      </View>

      <View style={styles.thumbs}>
        {Array.from({ length: count }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.thumb,
              {
                borderColor: i === done ? "#FFFFFF" : "#2C2C30",
                borderWidth: i === done ? 1.5 : 1,
              },
            ]}
          >
            {i < done ? (
              <Image
                source={{ uri: img(`shot${i}`) }}
                style={StyleSheet.absoluteFill}
                alt=""
                contentFit="cover"
              />
            ) : null}
          </View>
        ))}
      </View>

      <View style={styles.shutterRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="촬영"
          onPress={shoot}
          style={({ pressed }) => [
            styles.shutter,
            pressed && { transform: [{ scale: 0.94 }] },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: ink.bg },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
  },
  progressCapsule: {
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.pill,
  },
  topSpacer: { width: 40 },
  viewfinder: {
    flex: 1,
    marginHorizontal: spacing[3],
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: ink.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  counterCapsule: {
    backgroundColor: "rgba(10,10,11,0.4)",
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.pill,
  },
  thumbs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing[1],
    padding: spacing[3],
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#232327",
  },
  shutterRow: {
    alignItems: "center",
    paddingTop: spacing[2],
    paddingBottom: spacing[8],
  },
  shutter: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.35)",
  },
});
