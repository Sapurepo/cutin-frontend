import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Avatar } from "@/components/avatar";
import { Button, IconButton } from "@/components/button";
import { Chip } from "@/components/chip";
import { CutFrame } from "@/components/cutFrame";
import { Input } from "@/components/input";
import { usePost } from "@/features/feed/queries";
import { reactionPalette } from "@/mocks/seed";

/** §7 포스트 상세 — 공유(7.1) + 댓글(7.2) + 반응(7.3). */
export default function PostDetailScreen() {
  const c = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: post } = usePost(id ?? "");

  if (!post) return <View style={[styles.screen, { backgroundColor: c.bg }]} />;

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title="포스트"
        left={<IconButton icon="chevron-left" onPress={() => router.back()} />}
        right={<IconButton icon="share" />}
      />
      <ScrollView>
        <View style={styles.author}>
          <Avatar src={post.author.avatar} name={post.author.name} size={40} />
          <View style={styles.authorText}>
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
          <IconButton icon="more-horizontal" />
        </View>

        <View style={styles.frame}>
          <CutFrame
            count={post.count}
            cuts={post.cuts}
            layout={post.layout}
            frameId={post.frameId}
            stampDate={post.createdAt}
            filterId={post.filterId}
          />
        </View>

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

        <View style={[styles.reactions, { borderBottomColor: c.border }]}>
          {reactionPalette.map((emoji) => {
            const reaction = post.reactions.find((r) => r.emoji === emoji);
            return (
              <Chip
                key={emoji}
                emoji={emoji}
                count={reaction?.count}
                selected={post.myReaction === emoji}
              />
            );
          })}
        </View>

        <View style={styles.comments}>
          <View style={styles.commentsTitle}>
            <Text
              style={{
                fontFamily: font("body", "600"),
                fontSize: 13,
                color: c.textPrimary,
              }}
            >
              댓글
            </Text>
            <Text
              style={{
                fontFamily: font("latin"),
                fontSize: 13,
                color: c.textSecondary,
              }}
            >
              {post.comments.length}
            </Text>
          </View>
          {post.comments.map((comment, i) => (
            <View key={i} style={styles.comment}>
              <Avatar name={comment.name} size={30} />
              <View style={styles.commentBody}>
                <Text
                  style={{
                    fontFamily: font("body"),
                    fontSize: 13,
                    color: c.textPrimary,
                  }}
                >
                  <Text style={{ fontFamily: font("body", "600") }}>
                    {comment.name}
                  </Text>{" "}
                  {comment.text}
                </Text>
                <Text
                  style={{
                    fontFamily: font("body"),
                    fontSize: 11,
                    color: c.textSecondary,
                  }}
                >
                  {comment.timeAgo}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={[
          styles.composer,
          { borderTopColor: c.border, backgroundColor: c.surface },
        ]}
      >
        <View style={styles.composerInput}>
          <Input placeholder="댓글 달기…" />
        </View>
        <Button variant="fill">게시</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  author: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    padding: spacing[3],
  },
  authorText: { flex: 1, gap: 1 },
  frame: { paddingHorizontal: spacing[3] },
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  comments: { padding: spacing[3], gap: spacing[3] },
  commentsTitle: {
    flexDirection: "row",
    gap: spacing[1],
    marginBottom: spacing[1],
  },
  comment: { flexDirection: "row", gap: spacing[2] },
  commentBody: { flex: 1, gap: 2 },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    padding: spacing[3],
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  composerInput: { flex: 1 },
});
