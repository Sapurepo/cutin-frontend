import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Avatar } from "@/components/avatar";
import { Button, IconButton } from "@/components/button";
import { ProfileStat } from "@/components/profileStat";
import { friends, posts, suggested } from "@/mocks/seed";

/** §8.2 타인 프로필 — 친구 추가/신고, 포스트 노출은 공개 범위 의존. */
export default function OtherProfileScreen() {
  const c = useTheme();
  const router = useRouter();
  const { handle } = useLocalSearchParams<{ handle: string }>();

  const user =
    [...friends, ...suggested].find((f) => f.handle === handle) ??
    posts.find((p) => p.author.handle === handle)?.author ??
    friends[0];
  const grid = [...(posts[2]?.cuts ?? []), ...(posts[0]?.cuts ?? [])].slice(
    0,
    9,
  );

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title={user.name}
        left={<IconButton icon="chevron-left" onPress={() => router.back()} />}
        right={<IconButton icon="more-horizontal" />}
      />
      <ScrollView>
        <View style={styles.hero}>
          <Avatar src={user.avatar} name={user.name} size={80} />
          <Text
            style={[
              styles.name,
              { fontFamily: font("body", "600"), color: c.textPrimary },
            ]}
          >
            {user.name}
          </Text>
          <Text
            style={{
              fontFamily: font("latin"),
              fontSize: 13,
              color: c.textSecondary,
            }}
          >
            @{user.handle}
          </Text>
          <View style={styles.stats}>
            <ProfileStat value="41" label="포스트" />
            <ProfileStat value="208" label="친구" />
            <ProfileStat value="3.4k" label="받은 반응" />
          </View>
          <View style={styles.actions}>
            <View style={styles.addButton}>
              <Button variant="fill" block icon="user-plus">
                친구 추가
              </Button>
            </View>
            <IconButton icon="flag" variant="outline" size="lg" />
          </View>
        </View>
        <View style={styles.grid}>
          {grid.map((src, i) => (
            <View
              key={i}
              style={[styles.cell, { backgroundColor: c.surfaceSunken }]}
            >
              <Image
                source={{ uri: src }}
                style={StyleSheet.absoluteFill}
                alt=""
                contentFit="cover"
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  hero: { alignItems: "center", padding: spacing[5], gap: spacing[1] },
  name: { fontSize: 17, marginTop: spacing[2] },
  stats: { flexDirection: "row", gap: spacing[10], marginVertical: spacing[4] },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    width: "100%",
    maxWidth: 300,
  },
  addButton: { flex: 1 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 2 },
  cell: { width: "33%", aspectRatio: 1, flexGrow: 1 },
});
