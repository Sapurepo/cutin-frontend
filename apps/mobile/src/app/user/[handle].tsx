import { StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { IconButton } from "@/components/button";
import { ProfileView } from "@/features/profile/profileView";
import { useFeed } from "@/features/feed/queries";
import { friends, me, suggested } from "@/mocks/seed";

/** §8.2 타인 프로필 — 친구 추가/신고. 본인 핸들로 들어오면 본인 프로필로 렌더한다
 * (포스트 작성자를 눌러 자기 프로필에 들어오는 경우). */
export default function UserProfileScreen() {
  const c = useTheme();
  const router = useRouter();
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const { data: posts, isLoading } = useFeed();

  const isMe = handle === me.handle;
  const user = isMe
    ? me
    : ([...friends, ...suggested].find((f) => f.handle === handle) ??
      posts?.find((p) => p.author.handle === handle)?.author ?? {
        name: handle ?? "",
        handle: handle ?? "",
      });

  const userPosts = (posts ?? []).filter((p) => p.author.handle === handle);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title={user.name}
        left={<IconButton icon="chevron-left" onPress={() => router.back()} />}
        right={
          isMe ? (
            <IconButton
              icon="settings"
              onPress={() => router.push("/settings")}
            />
          ) : (
            <IconButton icon="more-horizontal" />
          )
        }
      />
      <ProfileView
        user={user}
        stats={
          isMe
            ? { posts: "24", friends: "132", reactions: "1.2k" }
            : { posts: "41", friends: "208", reactions: "3.4k" }
        }
        isMe={isMe}
        posts={userPosts}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
