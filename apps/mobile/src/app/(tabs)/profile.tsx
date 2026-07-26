import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
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
import { Skeleton } from "@/components/skeleton";
import { useFeed } from "@/features/feed/queries";
import { me } from "@/mocks/seed";

const GRID_SIZE = 9;
const GRID_COLUMNS = 3;
const GRID_GAP = 2;

/** §8.1 본인 프로필 — 통계 + 내 포스트 그리드 + 설정 진입. */
export default function ProfileScreen() {
  const c = useTheme();
  const router = useRouter();
  const { data: posts, isLoading } = useFeed();
  const grid = (posts ?? []).flatMap((p) => p.cuts).slice(0, GRID_SIZE);
  // 퍼센트 너비는 gap과 합쳐지면 한 줄에 3칸이 들어가지 않는다 — 실제 폭에서 계산한다.
  const { width } = useWindowDimensions();
  const cellSize = (width - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;
  const cell = { width: cellSize, height: cellSize };

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
          {isLoading
            ? Array.from({ length: GRID_SIZE }).map((_, i) => (
                <Skeleton key={i} style={[cell, styles.cellSquare]} />
              ))
            : grid.map((src, i) => (
                <View
                  key={i}
                  style={[cell, { backgroundColor: c.surfaceSunken }]}
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
  grid: { flexDirection: "row", flexWrap: "wrap", gap: GRID_GAP },
  cellSquare: { borderRadius: 0 },
});
