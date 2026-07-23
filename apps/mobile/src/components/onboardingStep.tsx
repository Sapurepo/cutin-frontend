import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Button, IconButton } from "./button";
import { StepDots } from "./stepDots";

interface OnboardingStepProps {
  step: number;
  totalSteps?: number;
  title: string;
  description: string;
  children: ReactNode;
  primaryLabel?: string;
  primaryDisabled?: boolean;
  onPrimary: () => void;
  secondary?: ReactNode;
}

/** 온보딩 공통 스캐폴드 — 뒤로가기 + 건너뛰기 + 스텝 dot + 하단 CTA. */
export function OnboardingStep({
  step,
  totalSteps = 4,
  title,
  description,
  children,
  primaryLabel = "다음",
  primaryDisabled = false,
  onPrimary,
  secondary,
}: OnboardingStepProps) {
  const c = useTheme();
  const router = useRouter();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          disabled={step === 0}
          onPress={() => router.back()}
        />
      </View>
      <View style={styles.body}>
        <StepDots total={totalSteps} current={step} />
        <Text
          style={[
            styles.title,
            { fontFamily: font("body", "700"), color: c.textPrimary },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.description,
            { fontFamily: font("body"), color: c.textSecondary },
          ]}
        >
          {description}
        </Text>
        <View style={styles.content}>{children}</View>
      </View>
      <View style={styles.footer}>
        <Button
          variant="fill"
          size="lg"
          disabled={primaryDisabled}
          block
          onPress={onPrimary}
        >
          {primaryLabel}
        </Button>
        {secondary}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    height: 52,
    alignItems: "flex-start",
    paddingHorizontal: spacing[3],
  },
  body: { flex: 1, paddingHorizontal: spacing[6], paddingTop: spacing[4] },
  title: { fontSize: 22, lineHeight: 30, marginTop: spacing[8] },
  description: { fontSize: 14, lineHeight: 22, marginTop: spacing[2] },
  content: { marginTop: spacing[6] },
  footer: {
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[6],
    gap: spacing[2],
  },
});
