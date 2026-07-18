import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Avatar } from "@/components/avatar";
import { Button, IconButton } from "@/components/button";
import { ProfileStat } from "@/components/profileStat";
import { me, posts } from "@/mocks/seed";

/** §8.1 본인 프로필 — 통계 + 내 포스트 그리드 + 설정 진입. */
export default function ProfileScreen() {
  const c = useTheme();
  const router = useRouter();
  const grid = posts.flatMap((p) => p.cuts).slice(0, 9);

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.screen, { backgroundColor: c.bg }]}
    >
      <AppHeader
        title="프로필"
        right={
          <IconButton
            icon="settings"
            onPress={() => router.push("/settings")}
          />
        }
      />
      <ScrollView>
        <View style={styles.hero}>
          <Avatar src={me.avatar} name={me.name} size={80} ring />
          <Text
            style={[
              styles.name,
              { fontFamily: font("body", "600"), color: c.textPrimary },
            ]}
          >
            {me.name}
          </Text>
          <Text
            style={{
              fontFamily: font("latin"),
              fontSize: 13,
              color: c.textSecondary,
            }}
          >
            @{me.handle}
          </Text>
          <View style={styles.stats}>
            <ProfileStat value="24" label="포스트" />
            <ProfileStat value="132" label="친구" />
            <ProfileStat value="1.2k" label="받은 반응" />
          </View>
          <View style={styles.editButton}>
            <Button icon="pencil" block>
              프로필 편집
            </Button>
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
  editButton: { width: "100%", maxWidth: 260 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 2 },
  cell: { width: "33%", aspectRatio: 1, flexGrow: 1 },
});
