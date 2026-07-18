import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { layout, radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Icon, type IconName } from "./icon";

export type TabKey = "home" | "friends" | "profile" | "archive";

interface NavBarProps {
  active: TabKey;
  onTab: (tab: TabKey) => void;
  onCapture: () => void;
}

const tabs: { key: TabKey | "capture"; icon: IconName; label: string }[] = [
  { key: "home", icon: "home", label: "홈" },
  { key: "friends", icon: "users", label: "친구" },
  { key: "capture", icon: "camera", label: "" },
  { key: "archive", icon: "bookmark", label: "보관" },
  { key: "profile", icon: "user", label: "프로필" },
];

/** 하단 5탭 바 — 중앙 촬영 CTA는 fill 원형으로 강조(레이즈드 엘리베이션 허용 지점). */
export function NavBar({ active, onTab, onCapture }: NavBarProps) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bar,
        {
          height: layout.navHeight + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: c.bg,
          borderTopColor: c.border,
        },
      ]}
    >
      {tabs.map((t) => {
        if (t.key === "capture") {
          return (
            <Pressable
              key={t.key}
              accessibilityRole="button"
              accessibilityLabel="촬영"
              onPress={onCapture}
              style={({ pressed }) => [
                styles.capture,
                { backgroundColor: c.accent },
                pressed && { transform: [{ scale: 0.97 }] },
              ]}
            >
              <Icon name="camera" size={22} color={c.accentOn} />
            </Pressable>
          );
        }
        const on = active === t.key;
        return (
          <Pressable
            key={t.key}
            accessibilityRole="tab"
            onPress={() => onTab(t.key as TabKey)}
            style={styles.tab}
          >
            <Icon
              name={t.icon}
              size={22}
              color={on ? c.textPrimary : c.textSecondary}
              strokeWidth={on ? 2.4 : 2}
            />
            <Text
              style={{
                fontFamily: font("body", on ? "600" : "400"),
                fontSize: 10,
                color: on ? c.textPrimary : c.textSecondary,
              }}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing[2],
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minWidth: layout.tapTarget,
    height: layout.tapTarget + 8,
  },
  capture: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -spacing[4],
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
