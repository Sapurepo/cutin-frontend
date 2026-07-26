import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import type { Post } from "@cutin/types";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Avatar } from "./avatar";
import { CutFrame } from "./cutFrame";
import { Icon } from "./icon";

interface PostCardProps {
  post: Post;
  onPress?: () => void;
}

/** 피드 포스트 — 컷 프레임 자체가 카드다.
 * 프레임이 이미 실물 포토스트립(스킨·스탬프)이라 카드 크롬을 덧씌우지 않는다.
 * 반응은 상세에서만 확인·남길 수 있고, 피드에는 댓글 수만 요약한다. */
export function PostCard({ post, onPress }: PostCardProps) {
  const c = useTheme();
  const router = useRouter();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${post.author.name} 프로필 보기`}
          onPress={() => router.push(`/user/${post.author.handle}`)}
          hitSlop={6}
          style={styles.authorLink}
        >
          <Avatar src={post.author.avatar} name={post.author.name} size={28} />
          <Text
            style={{
              fontFamily: font("body", "600"),
              fontSize: 13,
              color: c.textPrimary,
            }}
          >
            {post.author.name}
          </Text>
        </Pressable>
        <Text
          style={{
            fontFamily: font("body"),
            fontSize: 11,
            color: c.textSecondary,
          }}
        >
          {post.timeAgo}
        </Text>
        <View style={styles.headerSpacer} />
        <Icon name="more-horizontal" size={18} color={c.textSecondary} />
      </View>

      <View style={styles.frameClip}>
        <CutFrame
          count={post.count}
          cuts={post.cuts}
          layout={post.layout}
          frameId={post.frameId}
          stampDate={post.createdAt}
          filterId={post.filterId}
          rounded={false}
        />
      </View>

      <View style={styles.footer}>
        {post.caption ? (
          <Text style={[styles.caption, { color: c.textPrimary }]}>
            <Text style={{ fontFamily: font("body", "600") }}>
              {post.author.name}
            </Text>
            <Text style={{ fontFamily: font("body") }}> {post.caption}</Text>
          </Text>
        ) : null}
        {post.comments.length > 0 ? (
          <Text
            style={{
              fontFamily: font("body"),
              fontSize: 12,
              color: c.textSecondary,
            }}
          >
            댓글 {post.comments.length}개
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    paddingBottom: spacing[2],
  },
  authorLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  headerSpacer: { flex: 1 },
  frameClip: { borderRadius: radius.lg, overflow: "hidden" },
  footer: { gap: spacing[1], paddingTop: spacing[3] },
  caption: { fontSize: 14, lineHeight: 21 },
});
