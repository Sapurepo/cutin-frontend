import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { colors } from "@cutin/tokens";
import { queryClient } from "@/lib/queryClient";
import { ensureMocking } from "@/mocks/ensureMocking";
import { fontAssets } from "@/theme/fonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts(fontAssets);
  const scheme = useColorScheme();
  const c = scheme === "dark" ? colors.dark : colors.light;

  // MSW 조기 워밍 — apiClient가 매 요청 전 await 하므로 블로킹은 아니다.
  useEffect(() => {
    void ensureMocking();
  }, []);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: c.bg },
        }}
      >
        <Stack.Screen
          name="capture/draft"
          options={{ presentation: "transparentModal", animation: "fade" }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
