import { useEffect } from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { radius } from "@cutin/tokens";
import { useTheme } from "@/theme/useTheme";

interface SkeletonProps {
  /** 기본 radius.md — 원형/전체 채움은 style로 덮어쓴다 */
  style?: StyleProp<ViewStyle>;
}

/** 로딩 자리표시자 — 은은한 펄스로 "비어 있음"이 아니라 "오는 중"임을 보여준다. */
export function Skeleton({ style }: SkeletonProps) {
  const c = useTheme();
  const reduceMotion = useReducedMotion();
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (reduceMotion) return;
    pulse.value = withRepeat(withTiming(0.5, { duration: 900 }), -1, true);
  }, [pulse, reduceMotion]);

  const animated = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel="불러오는 중"
      // surfaceSunken은 bg와 거의 같아 자리표시자가 묻힌다 — 한 단계 진한 border를 쓴다.
      style={[styles.base, { backgroundColor: c.border }, style, animated]}
    />
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.md },
});
