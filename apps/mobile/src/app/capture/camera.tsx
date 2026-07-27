import { useEffect, useRef, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { CameraView, useCameraPermissions, type CameraType } from "expo-camera";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { Button, IconButton } from "@/components/button";
import { GlassSurface } from "@/components/glassSurface";
import { ProgressDots } from "@/components/progressDots";
import { useCaptureStore } from "@/stores/captureStore";

/* 촬영 화면은 항상 다크(잉크) 캔버스. */
const ink = colors.dark;

export default function CameraScreen() {
  const router = useRouter();
  const count = useCaptureStore((s) => s.count);
  const mode = useCaptureStore((s) => s.mode);
  const cuts = useCaptureStore((s) => s.cuts);
  const retakeIndex = useCaptureStore((s) => s.retakeIndex);
  const addCut = useCaptureStore((s) => s.addCut);
  const setRetakeIndex = useCaptureStore((s) => s.setRetakeIndex);

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("front");
  const [countdown, setCountdown] = useState<number | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const busyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const done = cuts.length;
  const full = done >= count && retakeIndex === null;

  useEffect(() => {
    if (full) router.replace("/capture/template");
  }, [full, router]);

  // 화면 이탈 시 burst 카운트다운 정리
  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [],
  );

  const shoot = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
      if (photo?.uri) addCut(photo.uri);
    } finally {
      busyRef.current = false;
    }
  };

  /** burst: 3-2-1 카운트다운 → 촬영, 남은 컷이 있으면 반복. */
  const runCountdown = () => {
    let n = 3;
    setCountdown(n);
    timerRef.current = setInterval(() => {
      n -= 1;
      if (n > 0) {
        setCountdown(n);
        return;
      }
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setCountdown(null);
      void (async () => {
        await shoot();
        if (useCaptureStore.getState().cuts.length < count) runCountdown();
      })();
    }, 1000);
  };

  const onShutter = () => {
    if (countdown !== null) return;
    if (mode === "burst" && retakeIndex === null) runCountdown();
    else void shoot();
  };

  const granted = permission?.granted ?? false;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.top}>
        <IconButton icon="x" color="#FFFFFF" onPress={() => router.back()} />
        <GlassSurface
          style={styles.progressCapsule}
          fallbackColor="rgba(255,255,255,0.12)"
          colorScheme="dark"
        >
          <ProgressDots total={count} current={done} />
        </GlassSurface>
        <IconButton
          icon="switch-camera"
          color="#FFFFFF"
          onPress={() => setFacing((f) => (f === "front" ? "back" : "front"))}
        />
      </View>

      <View style={styles.viewfinder}>
        {granted ? (
          <>
            <CameraView
              ref={cameraRef}
              facing={facing}
              mirror={facing === "front"}
              style={StyleSheet.absoluteFill}
            />
            {countdown !== null ? (
              <View style={styles.countdownOverlay} pointerEvents="none">
                <Text
                  style={{
                    fontFamily: font("latin", "600"),
                    fontSize: 96,
                    color: "#FFFFFF",
                  }}
                >
                  {countdown}
                </Text>
              </View>
            ) : null}
            <GlassSurface
              style={styles.counterCapsule}
              fallbackColor="rgba(10,10,11,0.4)"
              effect="clear"
              colorScheme="dark"
            >
              <Text
                style={{
                  fontFamily:
                    retakeIndex !== null ? font("body", "500") : font("latin"),
                  fontSize: 15,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {retakeIndex !== null
                  ? `${retakeIndex + 1}번째 컷 다시 찍기`
                  : `${Math.min(done + 1, count)} / ${count}`}
              </Text>
            </GlassSurface>
          </>
        ) : (
          <View style={styles.permissionBox}>
            <Text
              style={{
                fontFamily: font("body", "600"),
                fontSize: 15,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              컷 촬영을 위해{"\n"}카메라 권한이 필요해요
            </Text>
            {permission?.canAskAgain === false ? (
              <Button
                variant="outline"
                onPress={() => void Linking.openSettings()}
              >
                설정에서 허용
              </Button>
            ) : (
              <Button variant="fill" onPress={() => void requestPermission()}>
                카메라 권한 허용
              </Button>
            )}
          </View>
        )}
      </View>

      <View style={styles.thumbs}>
        {Array.from({ length: count }).map((_, i) => {
          const filled = i < done;
          const isRetake = retakeIndex === i;
          const isNext = !filled && i === done && retakeIndex === null;
          return (
            <Pressable
              key={i}
              disabled={!filled}
              accessibilityRole="button"
              accessibilityLabel={`${i + 1}번째 컷 재촬영`}
              onPress={() => setRetakeIndex(isRetake ? null : i)}
              style={[
                styles.thumb,
                {
                  borderColor: isRetake || isNext ? "#FFFFFF" : "#2C2C30",
                  borderWidth: isRetake ? 2 : isNext ? 1.5 : 1,
                },
              ]}
            >
              {filled ? (
                <Image
                  source={{ uri: cuts[i] }}
                  style={StyleSheet.absoluteFill}
                  alt=""
                  contentFit="cover"
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.shutterRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="촬영"
          disabled={!granted || countdown !== null}
          onPress={onShutter}
          style={({ pressed }) => [
            styles.shutter,
            pressed && { transform: [{ scale: 0.94 }] },
            (!granted || countdown !== null) && { opacity: 0.4 },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: ink.bg },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
  },
  progressCapsule: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  viewfinder: {
    flex: 1,
    marginHorizontal: spacing[3],
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: ink.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  countdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(10,10,11,0.25)",
  },
  counterCapsule: {
    position: "absolute",
    bottom: spacing[3],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  permissionBox: {
    alignItems: "center",
    gap: spacing[4],
    padding: spacing[6],
  },
  thumbs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing[1],
    padding: spacing[3],
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#232327",
  },
  shutterRow: {
    alignItems: "center",
    paddingTop: spacing[2],
    paddingBottom: spacing[8],
  },
  shutter: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.35)",
  },
});
