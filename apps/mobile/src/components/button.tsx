import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, type ViewStyle } from "react-native";
import { layout, radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Icon, type IconName } from "./icon";

type Variant = "fill" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  icon?: IconName;
  disabled?: boolean;
  onPress?: () => void;
}

const heights: Record<Size, number> = { sm: 34, md: layout.tapTarget, lg: 52 };
const fontSizes: Record<Size, number> = { sm: 13, md: 14, lg: 15 };

/** fill(주 액션) / outline(보조) / ghost(3차) — 위계는 hue가 아니라 형태로. */
export function Button({
  children,
  variant = "outline",
  size = "md",
  block,
  icon,
  disabled,
  onPress,
}: ButtonProps) {
  const c = useTheme();

  const byVariant: Record<Variant, ViewStyle> = {
    fill: { backgroundColor: c.accent, borderColor: c.accent },
    outline: { backgroundColor: "transparent", borderColor: c.borderStrong },
    ghost: { backgroundColor: "transparent", borderColor: "transparent" },
  };
  const textColor = variant === "fill" ? c.accentOn : c.textPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { height: heights[size] },
        byVariant[variant],
        block && styles.block,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {icon ? (
        <Icon name={icon} size={fontSizes[size] + 3} color={textColor} />
      ) : null}
      <Text
        style={{
          fontFamily: font("body", "600"),
          fontSize: fontSizes[size],
          color: textColor,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

interface IconButtonProps {
  icon: IconName;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline";
  disabled?: boolean;
  color?: string;
  onPress?: () => void;
}

const iconButtonSizes = { sm: 32, md: 40, lg: layout.tapTarget };

/** 원형 아이콘 전용 컨트롤 (헤더 액션 등) */
export function IconButton({
  icon,
  size = "md",
  variant = "ghost",
  disabled = false,
  color,
  onPress,
}: IconButtonProps) {
  const c = useTheme();
  const dim = iconButtonSizes[size];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        { width: dim, height: dim, borderRadius: radius.pill },
        variant === "outline" && {
          borderWidth: 1,
          borderColor: c.borderStrong,
        },
        disabled && { opacity: 0.4 },
        pressed && { backgroundColor: c.overlay },
      ]}
    >
      <Icon name={icon} size={dim * 0.5} color={color ?? c.textPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  block: { alignSelf: "stretch" },
  disabled: { opacity: 0.4 },
  pressed: { transform: [{ scale: 0.97 }] },
  iconButton: { alignItems: "center", justifyContent: "center" },
});
