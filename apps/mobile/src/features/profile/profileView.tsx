import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import type { Post, UserSummary } from "@cutin/types";
import { spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Avatar } from "@/components/avatar";
import { Button, IconButton } from "@/components/button";
import { ProfileStat } from "@/components/profileStat";
import { Skeleton } from "@/components/skeleton";
import { useTabBarSpace } from "@/components/navBar";

const GRID_SIZE = 9;
const GRID_COLUMNS = 3;
const GRID_GAP = 2;

interface ProfileStats {
  posts: string;
  friends: string;
  reactions: string;
}

interface ProfileViewProps {
  user: UserSummary;
  stats: ProfileStats;
  /** 본인 프로필이면 편집, 타인이면 친구 추가·신고를 노출한다 */
  isMe: boolean;
  /** 이 유저의 포스트 — 컷을 펼쳐 그리드로 깔고, 누르면 상세로 간다 */
  posts: Post[];
  isLoading?: boolean;
}

/** 본인(§8.1)·타인(§8.2) 프로필의 공통 본문 — 액션 영역만 isMe로 갈린다. */
export function ProfileView({
  user,
  stats,
  isMe,
  posts,
  isLoading,
}: ProfileViewProps) {
  const c = useTheme();
  const router = useRouter();
  const tabBarSpace = useTabBarSpace();
  // 퍼센트 너비는 gap과 합쳐지면 한 줄에 3칸이 들어가지 않는다 — 실제 폭에서 계산한다.
  const { width } = useWindowDimensions();
  const size = (width - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;
  const cell = { width: size, height: size };
  const grid = posts
    .flatMap((post) => post.cuts.map((uri) => ({ uri, postId: post.id })))
    .slice(0, GRID_SIZE);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: tabBarSpace }}>
      <View style={styles.hero}>
        <Avatar src={user.avatar} name={user.name} size={80} ring={isMe} />
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
          <ProfileStat value={stats.posts} label="포스트" />
          <ProfileStat value={stats.friends} label="친구" />
          <ProfileStat value={stats.reactions} label="받은 반응" />
        </View>
        {isMe ? (
          <View style={styles.editButton}>
            <Button icon="pencil" block>
              프로필 편집
            </Button>
          </View>
        ) : (
          <View style={styles.actions}>
            <View style={styles.addButton}>
              <Button variant="fill" block icon="user-plus">
                친구 추가
              </Button>
            </View>
            <IconButton icon="flag" variant="outline" size="lg" />
          </View>
        )}
      </View>
      <View style={styles.grid}>
        {isLoading
          ? Array.from({ length: GRID_SIZE }).map((_, i) => (
              <Skeleton key={i} style={[cell, styles.cellSquare]} />
            ))
          : grid.map((item, i) => (
              <Pressable
                key={i}
                accessibilityRole="button"
                accessibilityLabel="포스트 열기"
                onPress={() => router.push(`/post/${item.postId}`)}
                style={[cell, { backgroundColor: c.surfaceSunken }]}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={StyleSheet.absoluteFill}
                  alt=""
                  contentFit="cover"
                />
              </Pressable>
            ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", padding: spacing[5], gap: spacing[1] },
  name: { fontSize: 17, marginTop: spacing[2] },
  stats: { flexDirection: "row", gap: spacing[10], marginVertical: spacing[4] },
  editButton: { width: "100%", maxWidth: 260 },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    width: "100%",
    maxWidth: 300,
  },
  addButton: { flex: 1 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: GRID_GAP },
  cellSquare: { borderRadius: 0 },
});
