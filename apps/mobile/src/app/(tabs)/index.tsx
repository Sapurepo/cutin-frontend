import { FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, spacing } from "@cutin/tokens";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Badge } from "@/components/badge";
import { Button, IconButton } from "@/components/button";
import { EmptyState } from "@/components/emptyState";
import { PostCard } from "@/components/postCard";
import { useFeed } from "@/features/feed/queries";

/** §4.1 피드 — 최신순 목록, 당겨서 새로고침, 빈 상태/로딩 스켈레톤. */
export default function FeedScreen() {
  const c = useTheme();
  const router = useRouter();
  const { data: posts, isLoading, isRefetching, refetch } = useFeed();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.screen, { backgroundColor: c.bg }]}
    >
      <AppHeader
        brand
        right={
          <View>
            <IconButton
              icon="bell"
              onPress={() => router.push("/notifications")}
            />
            <View style={styles.bellBadge}>
              <Badge dot variant="danger" />
            </View>
          </View>
        }
      />
      {isLoading ? (
        <View style={styles.list}>
          {[0, 1].map((i) => (
            <View
              key={i}
              style={[styles.skeleton, { backgroundColor: c.surfaceSunken }]}
            />
          ))}
        </View>
      ) : posts && posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: spacing[4] }} />}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onPress={() => router.push(`/post/${item.id}`)}
            />
          )}
        />
      ) : (
        <View style={styles.empty}>
          <EmptyState
            icon="camera"
            title="첫 컷을 남겨보세요"
            description="아직 포스트가 없어요. 아래 촬영 버튼으로 오늘 하루를 기록해보세요."
            action={
              <Button
                variant="fill"
                icon="camera"
                onPress={() => router.push("/capture/count")}
              >
                촬영 시작
              </Button>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  bellBadge: { position: "absolute", top: 4, right: 4 },
  list: { padding: spacing[4], gap: spacing[4] },
  skeleton: { height: 420, borderRadius: radius.md },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
});
