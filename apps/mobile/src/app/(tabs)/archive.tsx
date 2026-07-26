import { FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, spacing } from "@cutin/tokens";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { EmptyState } from "@/components/emptyState";
import { PostCard } from "@/components/postCard";
import { Skeleton } from "@/components/skeleton";
import { useTabBarSpace } from "@/components/navBar";
import { useArchive } from "@/features/feed/queries";

/** §4.2-5 기록 보관 — 보관한 포스트 목록. */
export default function ArchiveScreen() {
  const c = useTheme();
  const router = useRouter();
  const { data: posts, isLoading, isRefetching, refetch } = useArchive();
  const tabBarSpace = useTabBarSpace();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.screen, { backgroundColor: c.bg }]}
    >
      <AppHeader title="기록 보관" />
      {isLoading ? (
        <View style={styles.list}>
          <Skeleton style={styles.skeletonFrame} />
        </View>
      ) : posts && posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerStyle={[styles.list, { paddingBottom: tabBarSpace }]}
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
            icon="bookmark"
            title="보관한 기록이 없어요"
            description="포스트 상세에서 보관 버튼을 누르면 여기에 모여요."
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: { padding: spacing[4], gap: spacing[4] },
  skeletonFrame: { aspectRatio: 1, borderRadius: radius.lg },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
});
