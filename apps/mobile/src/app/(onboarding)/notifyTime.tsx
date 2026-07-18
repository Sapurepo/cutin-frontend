import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Icon, type IconName } from "@/components/icon";
import { OnboardingStep } from "@/components/onboardingStep";
import { notifySlots } from "@/mocks/seed";

/** §3.3 알림 선호 시간대 — 4슬롯, 다중 선택, 미선택 시 기본값(아침). */
export default function NotifyTimeScreen() {
  const c = useTheme();
  const router = useRouter();
  const [selected, setSelected] = useState<Record<string, boolean>>({
    morning: true,
  });

  const toggle = (key: string) =>
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <OnboardingStep
      step={1}
      title={"언제 알림을\n받을까요?"}
      description="기록하기 좋은 시간대를 골라주세요. 여러 개 선택할 수 있어요."
      onPrimary={() => router.push("/profilePhoto")}
    >
      <View style={styles.grid}>
        {notifySlots.map((slot) => {
          const on = !!selected[slot.key];
          return (
            <Pressable
              key={slot.key}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: on }}
              onPress={() => toggle(slot.key)}
              style={[
                styles.slot,
                {
                  backgroundColor: on ? c.accent : c.surface,
                  borderColor: on ? c.accent : c.border,
                },
              ]}
            >
              <View style={styles.slotHeader}>
                <Icon
                  name={slot.icon as IconName}
                  size={22}
                  color={on ? c.accentOn : c.textPrimary}
                />
                {on ? <Icon name="check" size={18} color={c.accentOn} /> : null}
              </View>
              <Text
                style={{
                  fontFamily: font("body", "600"),
                  fontSize: 15,
                  color: on ? c.accentOn : c.textPrimary,
                }}
              >
                {slot.label}
              </Text>
              <Text
                style={{
                  fontFamily: font("latin", "500"),
                  fontSize: 12,
                  color: on ? c.accentOn : c.textSecondary,
                  opacity: 0.8,
                }}
              >
                {slot.range}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing[2] },
  slot: {
    width: "48%",
    gap: spacing[2],
    padding: spacing[4],
    borderRadius: radius.md,
    borderWidth: 1,
  },
  slotHeader: { flexDirection: "row", justifyContent: "space-between" },
});
