import { Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { layout, radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { GlassSurface } from "./glassSurface";
import { Icon, type IconName } from "./icon";

export type TabKey = "home" | "friends" | "profile" | "archive";

/** 탭바가 콘텐츠 위에 떠 있으므로, 스크롤 하단에 이만큼 여백을 줘야 마지막 항목이 가리지 않는다. */
export function useTabBarSpace() {
  const insets = useSafeAreaInsets();
  return layout.navHeight + insets.bottom;
}

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

/** 하단 5탭 바 — 콘텐츠가 지나가는 유리 표면. 중앙 촬영 CTA는 fill 원형으로 강조. */
export function NavBar({ active, onTab, onCapture }: NavBarProps) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <GlassSurface
      fallbackColor={c.bg}
      style={[
        styles.bar,
        {
          height: layout.navHeight + insets.bottom,
          paddingBottom: insets.bottom,
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
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  bar: {
    // 콘텐츠가 유리 아래로 지나가야 재질이 드러난다 — 레이아웃을 차지하지 않고 띄운다.
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
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
