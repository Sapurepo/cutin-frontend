import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { EmptyState } from "@/components/emptyState";

/** §4.2-5 기록 보관 — 러프 명세의 중복 항목을 단일 보관함 화면으로 통합(🟡 가정). */
export default function ArchiveScreen() {
  const c = useTheme();
  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.screen, { backgroundColor: c.bg }]}
    >
      <AppHeader title="기록 보관" />
      <View style={styles.empty}>
        <EmptyState
          icon="bookmark"
          title="보관한 기록이 없어요"
          description="마음에 드는 포스트를 보관하면 여기에 모여요."
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
});
