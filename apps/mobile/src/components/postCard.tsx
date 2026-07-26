import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Post } from "@cutin/types";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Avatar } from "./avatar";
import { Chip } from "./chip";
import { CutFrame } from "./cutFrame";
import { Icon } from "./icon";

interface PostCardProps {
  post: Post;
  onPress?: () => void;
}

/** 피드 포스트 — 컷 프레임 자체가 카드다.
 * 프레임이 이미 실물 포토스트립(스킨·스탬프)이라 카드 크롬을 덧씌우지 않고,
 * 반응은 프레임 아래 모서리에 스티커처럼 걸쳐 붙인다. */
export function PostCard({ post, onPress }: PostCardProps) {
  const c = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.header}>
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

      <View style={styles.frameBlock}>
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
        {post.reactions.length > 0 ? (
          <View style={styles.reactionOverlay}>
            {post.reactions.map((r) => (
              <Chip
                key={r.emoji}
                emoji={r.emoji}
                count={r.count}
                selected={post.myReaction === r.emoji}
              />
            ))}
          </View>
        ) : null}
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

/** 칩(높이 32)이 프레임 밖으로 나오는 양. 프레임 안쪽 6px만 걸쳐
 * "걸친" 느낌은 남기고 하단 중앙의 로고·날짜 스탬프는 가리지 않는다. */
const REACTION_OVERLAP = 26;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    paddingBottom: spacing[2],
  },
  headerSpacer: { flex: 1 },
  frameBlock: { position: "relative" },
  frameClip: { borderRadius: radius.lg, overflow: "hidden" },
  reactionOverlay: {
    position: "absolute",
    left: spacing[3],
    bottom: -REACTION_OVERLAP,
    flexDirection: "row",
    gap: spacing[1],
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  footer: {
    gap: spacing[1],
    paddingTop: REACTION_OVERLAP + spacing[2],
  },
  caption: { fontSize: 14, lineHeight: 21 },
});
