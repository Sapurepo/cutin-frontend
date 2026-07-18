import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Icon } from "@/components/icon";

/** §2.1 OAuth 로그인 — MVP는 카카오·구글, 인스타/X는 2차. */
export default function LoginScreen() {
  const c = useTheme();
  const router = useRouter();
  const startOnboarding = () => router.replace("/nickname");

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <View style={styles.hero}>
        <Text
          style={{
            fontFamily: font("latin", "700"),
            fontSize: 40,
            letterSpacing: 0.8,
            color: c.textPrimary,
          }}
        >
          CUTIN
        </Text>
        <Text
          style={[
            styles.tagline,
            { fontFamily: font("body"), color: c.textSecondary },
          ]}
        >
          오늘의 순간을 컷으로 남기고,{"\n"}친구들과 나눠보세요.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={startOnboarding}
          style={({ pressed }) => [
            styles.oauth,
            { backgroundColor: "#FEE500" },
            pressed && styles.pressed,
          ]}
        >
          <Icon name="message-circle" size={18} color="#191600" />
          <Text
            style={[
              styles.oauthLabel,
              { fontFamily: font("body", "600"), color: "#191600" },
            ]}
          >
            카카오로 계속하기
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={startOnboarding}
          style={({ pressed }) => [
            styles.oauth,
            {
              backgroundColor: c.surface,
              borderWidth: 1,
              borderColor: c.borderStrong,
            },
            pressed && styles.pressed,
          ]}
        >
          <Text
            style={{
              fontFamily: font("latin", "700"),
              fontSize: 16,
              color: c.textPrimary,
            }}
          >
            G
          </Text>
          <Text
            style={[
              styles.oauthLabel,
              { fontFamily: font("body", "600"), color: c.textPrimary },
            ]}
          >
            구글로 계속하기
          </Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: c.border }]} />
          <Text
            style={{
              fontFamily: font("body"),
              fontSize: 11,
              color: c.textSecondary,
            }}
          >
            2차 오픈 예정
          </Text>
          <View style={[styles.line, { backgroundColor: c.border }]} />
        </View>

        <View style={styles.pending}>
          {["Instagram", "X"].map((p) => (
            <View
              key={p}
              style={[styles.pendingBox, { borderColor: c.borderStrong }]}
            >
              <Text
                style={{
                  fontFamily: font("latin"),
                  fontSize: 13,
                  color: c.textSecondary,
                }}
              >
                {p}
              </Text>
            </View>
          ))}
        </View>

        <Text
          style={[
            styles.terms,
            { fontFamily: font("body"), color: c.textSecondary },
          ]}
        >
          계속하면 서비스 약관과 개인정보처리방침에{"\n"}동의하는 것으로
          간주돼요.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[10],
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[3],
  },
  tagline: { fontSize: 15, lineHeight: 24, textAlign: "center" },
  actions: { gap: spacing[2] },
  oauth: {
    height: 52,
    borderRadius: radius.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
  },
  oauthLabel: { fontSize: 15 },
  pressed: { transform: [{ scale: 0.97 }] },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginVertical: spacing[1],
  },
  line: { flex: 1, height: 1 },
  pending: { flexDirection: "row", gap: spacing[2] },
  pendingBox: {
    flex: 1,
    height: 48,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  terms: {
    fontSize: 11,
    lineHeight: 18,
    textAlign: "center",
    marginTop: spacing[2],
  },
});
