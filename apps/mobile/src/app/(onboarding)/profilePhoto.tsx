import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { radius, spacing } from "@cutin/tokens";
import { useTheme } from "@/theme/useTheme";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { OnboardingStep } from "@/components/onboardingStep";
import { me } from "@/mocks/seed";

/** §3.4 프로필 사진 — 업로드/크롭은 후속, 건너뛰면 기본 아바타. */
export default function ProfilePhotoScreen() {
  const c = useTheme();
  const router = useRouter();
  const next = () => router.push("/tips");

  return (
    <OnboardingStep
      step={2}
      title={"프로필 사진을\n등록해볼까요?"}
      description="건너뛰면 기본 아바타로 시작해요."
      onPrimary={next}
      secondary={
        <Button variant="ghost" block onPress={next}>
          기본 아바타로 시작
        </Button>
      }
    >
      <View style={styles.center}>
        <View>
          <Avatar src={me.avatar} name={me.name} size={132} ring />
          <View
            style={[
              styles.cameraBadge,
              { backgroundColor: c.accent, borderColor: c.bg },
            ]}
          >
            <Icon name="camera" size={18} color={c.accentOn} />
          </View>
        </View>
      </View>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", marginTop: spacing[10] },
  cameraBadge: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
