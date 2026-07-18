import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { IconButton } from "@/components/button";
import { Icon, type IconName } from "@/components/icon";

const Item = ({
  icon,
  label,
  right,
}: {
  icon: IconName;
  label: string;
  right?: React.ReactNode;
}) => {
  const c = useTheme();
  return (
    <Pressable style={styles.item}>
      <Icon name={icon} size={20} color={c.textPrimary} />
      <Text
        style={[
          styles.itemLabel,
          { fontFamily: font("body"), color: c.textPrimary },
        ]}
      >
        {label}
      </Text>
      {right ?? <Icon name="chevron-right" size={18} color={c.textSecondary} />}
    </Pressable>
  );
};

const GroupTitle = ({ children }: { children: string }) => {
  const c = useTheme();
  return (
    <Text
      style={[
        styles.groupTitle,
        { fontFamily: font("body", "600"), color: c.textSecondary },
      ]}
    >
      {children}
    </Text>
  );
};

const Divider = () => {
  const c = useTheme();
  return <View style={[styles.divider, { backgroundColor: c.border }]} />;
};

/** §8.3 설정 — 알림 재설정 / 계정 / 로그아웃 / 탈퇴. */
export default function SettingsScreen() {
  const c = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title="설정"
        left={<IconButton icon="chevron-left" onPress={() => router.back()} />}
      />
      <ScrollView>
        <GroupTitle>알림</GroupTitle>
        <Item
          icon="bell"
          label="알림 시간대"
          right={
            <Text
              style={{
                fontFamily: font("body"),
                fontSize: 13,
                color: c.textSecondary,
              }}
            >
              아침 · 저녁
            </Text>
          }
        />
        <Divider />
        <Item
          icon="smartphone"
          label="푸시 알림"
          right={
            <View style={[styles.toggle, { backgroundColor: c.accent }]}>
              <View style={[styles.knob, { backgroundColor: c.accentOn }]} />
            </View>
          }
        />

        <GroupTitle>계정</GroupTitle>
        <Item icon="user" label="계정 정보" />
        <Divider />
        <Item icon="lock" label="개인정보 · 약관" />
        <Divider />
        <Item icon="shield" label="차단 목록" />

        <View style={styles.gap} />
        <Item icon="log-out" label="로그아웃" />
        <Divider />
        <Item icon="trash-2" label="회원 탈퇴" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  groupTitle: {
    fontSize: 12,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  itemLabel: { flex: 1, fontSize: 15 },
  divider: { height: StyleSheet.hairlineWidth, marginHorizontal: spacing[4] },
  toggle: {
    width: 40,
    height: 24,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 3,
  },
  knob: { width: 18, height: 18, borderRadius: radius.pill },
  gap: { height: spacing[5] },
});
