import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Friend } from "@cutin/types";
import { spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Chip } from "@/components/chip";
import { Input } from "@/components/input";
import { useFriendsOverview } from "@/features/friends/queries";

const Row = ({ friend, right }: { friend: Friend; right: React.ReactNode }) => {
  const c = useTheme();
  return (
    <View style={styles.row}>
      <Avatar src={friend.avatar} name={friend.name} size={44} />
      <View style={styles.rowText}>
        <Text
          style={{
            fontFamily: font("body", "600"),
            fontSize: 14,
            color: c.textPrimary,
          }}
        >
          {friend.name}
        </Text>
        <Text
          style={{
            fontFamily: font("latin"),
            fontSize: 12,
            color: c.textSecondary,
          }}
        >
          @{friend.handle}
          {friend.mutual ? `  ·  함께 아는 친구 ${friend.mutual}` : ""}
        </Text>
      </View>
      {right}
    </View>
  );
};

const SectionTitle = ({
  children,
  count,
}: {
  children: string;
  count?: number;
}) => {
  const c = useTheme();
  return (
    <View style={styles.sectionTitle}>
      <Text
        style={{
          fontFamily: font("body", "600"),
          fontSize: 13,
          color: c.textPrimary,
        }}
      >
        {children}
      </Text>
      {count !== undefined ? (
        <Text
          style={{
            fontFamily: font("latin"),
            fontSize: 13,
            color: c.textSecondary,
          }}
        >
          {count}
        </Text>
      ) : null}
    </View>
  );
};

/** §9 친구 목록 — 검색, 받은 요청(수락/거절), 추천, 내 친구. */
export default function FriendsScreen() {
  const c = useTheme();
  const router = useRouter();
  const { data } = useFriendsOverview();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.screen, { backgroundColor: c.bg }]}
    >
      <AppHeader title="친구" />
      <ScrollView contentContainerStyle={styles.body}>
        <Input icon="search" placeholder="닉네임 또는 아이디 검색" />

        <SectionTitle>받은 친구 요청</SectionTitle>
        {data?.requests.map((f) => (
          <Row
            key={f.handle}
            friend={f}
            right={
              <View style={styles.actions}>
                <Button variant="fill" size="sm">
                  수락
                </Button>
                <Button size="sm">거절</Button>
              </View>
            }
          />
        ))}

        <SectionTitle>추천 친구</SectionTitle>
        {data?.suggested.map((f) => (
          <Row
            key={f.handle}
            friend={f}
            right={
              <Button variant="fill" size="sm" icon="user-plus">
                추가
              </Button>
            }
          />
        ))}

        <SectionTitle count={data?.friends.length}>내 친구</SectionTitle>
        {data?.friends.map((f) => (
          <Row
            key={f.handle}
            friend={f}
            right={
              <Chip onPress={() => router.push(`/user/${f.handle}`)}>친구</Chip>
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { padding: spacing[4], paddingBottom: spacing[10] },
  sectionTitle: {
    flexDirection: "row",
    gap: spacing[1],
    marginTop: spacing[6],
    marginBottom: spacing[2],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  rowText: { flex: 1, gap: 2 },
  actions: { flexDirection: "row", gap: spacing[2] },
});
