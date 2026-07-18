import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Avatar } from "@/components/avatar";
import { Button, IconButton } from "@/components/button";
import { useNotifications } from "@/features/notifications/queries";

/** §4.3 알림 — 반응/댓글/친구요청/시스템, 미읽음 하이라이트. */
export default function NotificationsScreen() {
  const c = useTheme();
  const router = useRouter();
  const { data: items } = useNotifications();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title="알림"
        left={<IconButton icon="chevron-left" onPress={() => router.back()} />}
        right={
          <Pressable hitSlop={8}>
            <Text
              style={{
                fontFamily: font("body"),
                fontSize: 13,
                color: c.textSecondary,
              }}
            >
              모두 읽음
            </Text>
          </Pressable>
        }
      />
      <ScrollView>
        {items?.map((n, i) => (
          <View
            key={i}
            style={[
              styles.row,
              n.unread && { backgroundColor: c.surfaceSunken },
            ]}
          >
            {n.kind === "system" ? (
              <View
                style={[styles.systemAvatar, { backgroundColor: c.accent }]}
              >
                <Text
                  style={{
                    fontFamily: font("latin", "700"),
                    fontSize: 12,
                    color: c.accentOn,
                  }}
                >
                  CI
                </Text>
              </View>
            ) : (
              <Avatar src={n.avatar} name={n.actor} size={44} />
            )}
            <View style={styles.rowText}>
              <Text
                style={[
                  styles.message,
                  { fontFamily: font("body"), color: c.textPrimary },
                ]}
              >
                {n.kind !== "system" ? (
                  <Text style={{ fontFamily: font("body", "600") }}>
                    {n.actor}
                  </Text>
                ) : null}
                {n.text}
              </Text>
              <Text
                style={{
                  fontFamily: font("body"),
                  fontSize: 11,
                  color: c.textSecondary,
                }}
              >
                {n.timeAgo}
              </Text>
            </View>
            {n.action ? (
              <View style={styles.actions}>
                <Button variant="fill" size="sm">
                  수락
                </Button>
                <IconButton icon="x" size="sm" variant="outline" />
              </View>
            ) : n.thumb ? (
              <View
                style={[styles.thumb, { backgroundColor: c.surfaceSunken }]}
              >
                <Image
                  source={{ uri: n.thumb }}
                  style={StyleSheet.absoluteFill}
                  alt=""
                  contentFit="cover"
                />
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  systemAvatar: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: { flex: 1, gap: 3 },
  message: { fontSize: 13, lineHeight: 20 },
  actions: { flexDirection: "row", alignItems: "center", gap: spacing[1] },
  thumb: { width: 44, height: 44, borderRadius: 8, overflow: "hidden" },
});
