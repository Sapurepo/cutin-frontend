import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Button } from "@/components/button";
import { img } from "@/mocks/seed";

/** §6.4 업로드 진행 — 완료 시 draft 해제 후 피드 복귀 (스켈레톤: 목 진행률). */
export default function UploadingScreen() {
  const c = useTheme();
  const router = useRouter();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPct((prev) => Math.min(prev + 7, 100));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (pct >= 100) {
      const done = setTimeout(() => router.dismissTo("/(tabs)"), 400);
      return () => clearTimeout(done);
    }
  }, [pct, router]);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader title="업로드" />
      <View style={styles.body}>
        <View style={[styles.thumb, { backgroundColor: c.surfaceSunken }]}>
          <Image
            source={{ uri: img("a1") }}
            style={[StyleSheet.absoluteFill, { opacity: 0.55 }]}
            alt=""
            contentFit="cover"
          />
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
          포스트를 올리는 중이에요
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
            color: c.textSecondary,
          }}
        >
          잠시만 기다려주세요
        </Text>
      </View>
      <View style={styles.footer}>
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
  footer: { padding: spacing[4] },
});
