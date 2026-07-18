import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Button } from "@/components/button";
import { Icon, type IconName } from "@/components/icon";
import { StepDots } from "@/components/stepDots";
import { tips } from "@/mocks/seed";

/** §3.5 서비스 팁 캐러셀 — 마지막 카드에서 "시작하기" → 메인 진입. */
export default function TipsScreen() {
  const c = useTheme();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const tip = tips[index];
  const last = index === tips.length - 1;

  const enterApp = () => router.replace("/(tabs)");

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <View style={styles.header}>
        <Pressable onPress={enterApp} hitSlop={8}>
          <Text
            style={{
              fontFamily: font("body"),
              fontSize: 13,
              color: c.textSecondary,
            }}
          >
            다시 보지 않기
          </Text>
        </Pressable>
      </View>
      <View style={styles.body}>
        <View style={[styles.iconBox, { backgroundColor: c.surfaceSunken }]}>
          <Icon name={tip.icon as IconName} size={40} color={c.textPrimary} />
        </View>
        <Text
          style={{
            fontFamily: font("body", "700"),
            fontSize: 22,
            color: c.textPrimary,
          }}
        >
          {tip.title}
        </Text>
        <Text
          style={[
            styles.tipBody,
            { fontFamily: font("body"), color: c.textSecondary },
          ]}
        >
          {tip.body}
        </Text>
      </View>
      <View style={styles.dots}>
        <StepDots total={tips.length} current={index} />
      </View>
      <View style={styles.footer}>
        <Button
          variant="fill"
          size="lg"
          block
          onPress={() => (last ? enterApp() : setIndex(index + 1))}
        >
          {last ? "시작하기" : "다음"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    height: 52,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: spacing[5],
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[5],
    paddingHorizontal: spacing[8],
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  tipBody: { fontSize: 15, lineHeight: 25, textAlign: "center" },
  dots: { marginBottom: spacing[6] },
  footer: { paddingHorizontal: spacing[6], paddingBottom: spacing[6] },
});
