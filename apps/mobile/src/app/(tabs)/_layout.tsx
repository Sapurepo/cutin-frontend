import { Tabs, useRouter } from "expo-router";
import { NavBar, type TabKey } from "@/components/navBar";

const routeByTab: Record<TabKey, string> = {
  home: "index",
  friends: "friends",
  archive: "archive",
  profile: "profile",
};

/** §4.2 네비게이션 바 — 5탭, 중앙 촬영 CTA는 촬영 플로우로 진입(§5). */
export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => {
        const current = state.routes[state.index]?.name ?? "index";
        const active =
          (Object.keys(routeByTab) as TabKey[]).find(
            (key) => routeByTab[key] === current,
          ) ?? "home";
        return (
          <NavBar
            active={active}
            onTab={(tab) => navigation.navigate(routeByTab[tab])}
            // §5.3 — 작성 중 draft가 있으면 차단 시트부터 (시드에 draft 존재)
            onCapture={() => router.push("/capture/draft")}
          />
        );
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="friends" />
      <Tabs.Screen name="archive" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
