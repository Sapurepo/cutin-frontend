import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { IconButton } from "@/components/button";
import { ProfileView } from "@/features/profile/profileView";
import { useFeed } from "@/features/feed/queries";
import { me } from "@/mocks/seed";

/** §8.1 본인 프로필 — 통계 + 내 포스트 그리드 + 설정 진입. */
export default function ProfileScreen() {
  const c = useTheme();
  const router = useRouter();
  const { data: posts, isLoading } = useFeed();

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
      <ProfileView
        user={me}
        stats={{ posts: "24", friends: "132", reactions: "1.2k" }}
        isMe
        cuts={(posts ?? [])
          .filter((p) => p.author.handle === me.handle)
          .flatMap((p) => p.cuts)}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
