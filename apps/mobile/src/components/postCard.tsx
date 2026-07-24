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

/** 피드 포스트 카드 — surface + 헤어라인 보더, 그림자는 헤어라인 이상 쓰지 않는다. */
export function PostCard({ post, onPress }: PostCardProps) {
  const c = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: c.surface, borderColor: c.border },
      ]}
    >
      <View style={styles.header}>
        <Avatar src={post.author.avatar} name={post.author.name} size={36} />
        <View style={styles.headerText}>
          <Text
            style={{
              fontFamily: font("body", "600"),
              fontSize: 14,
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
        </View>
        <Icon name="more-horizontal" size={18} color={c.textSecondary} />
      </View>
      <CutFrame
        count={post.count}
        cuts={post.cuts}
        layout={post.layout}
        frameId={post.frameId}
        stampDate={post.createdAt}
        rounded={false}
      />
      {post.caption ? (
        <Text
          style={[
            styles.caption,
            { fontFamily: font("body"), color: c.textPrimary },
          ]}
        >
          {post.caption}
        </Text>
      ) : null}
      <View style={styles.reactions}>
        {post.reactions.map((r) => (
          <Chip
            key={r.emoji}
            emoji={r.emoji}
            count={r.count}
            selected={post.myReaction === r.emoji}
          />
        ))}
        <Chip icon="message-circle" count={post.comments.length} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    padding: spacing[3],
  },
  headerText: { flex: 1 },
  caption: {
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: spacing[3],
    paddingTop: spacing[3],
  },
  reactions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
    padding: spacing[3],
  },
});
