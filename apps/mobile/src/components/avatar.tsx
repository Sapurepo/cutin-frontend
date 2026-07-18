import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { radius } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  ring?: boolean;
}

/** 원형 프로필 이미지 — 이미지가 없으면 이니셜 폴백. */
export function Avatar({ src, name, size = 44, ring }: AvatarProps) {
  const c = useTheme();
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius.pill,
          backgroundColor: c.surfaceSunken,
          overflow: "hidden",
        },
        ring && { borderWidth: 2, borderColor: c.borderStrong },
      ]}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          style={StyleSheet.absoluteFill}
          alt={name}
          contentFit="cover"
        />
      ) : (
        <View style={styles.fallback}>
          <Text
            style={{
              fontFamily: font("body", "600"),
              fontSize: size * 0.4,
              color: c.textSecondary,
            }}
          >
            {name.slice(0, 1)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { flex: 1, alignItems: "center", justifyContent: "center" },
});
