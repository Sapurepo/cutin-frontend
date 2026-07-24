import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { PostVisibility } from "@cutin/types";
import { spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { AppHeader } from "@/components/appHeader";
import { Button, IconButton } from "@/components/button";
import { Chip } from "@/components/chip";
import { CutFrame } from "@/components/cutFrame";
import { Input } from "@/components/input";
import { getTemplate } from "@/features/capture/templates";
import { useCaptureStore } from "@/stores/captureStore";

/** §6.3 썸네일 지정 + §6.4 업로드 옵션 — 공개 범위 기본은 친구 공개(§1-6). */
export default function EditUploadScreen() {
  const c = useTheme();
  const router = useRouter();
  const count = useCaptureStore((s) => s.count);
  const cuts = useCaptureStore((s) => s.cuts);
  const template = getTemplate(useCaptureStore((s) => s.templateId));

  const [thumbnail, setThumbnail] = useState(0);
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState<PostVisibility>("friends");

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.bg }]}>
      <AppHeader
        title="편집"
        left={<IconButton icon="chevron-left" onPress={() => router.back()} />}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <CutFrame
          count={count}
          cuts={cuts}
          layout={template.layout}
          frameId={template.frame?.id}
          stampDate={new Date().toISOString()}
        />

        <View>
          <Text
            style={[
              styles.label,
              { fontFamily: font("body"), color: c.textSecondary },
            ]}
          >
            대표 컷 (썸네일)
          </Text>
          <View style={styles.thumbs}>
            {cuts.map((cut, i) => (
              <Pressable
                key={i}
                accessibilityRole="radio"
                accessibilityState={{ selected: thumbnail === i }}
                onPress={() => setThumbnail(i)}
                style={[
                  styles.thumb,
                  {
                    borderColor: thumbnail === i ? c.accent : c.border,
                    borderWidth: thumbnail === i ? 2 : 1,
                  },
                ]}
              >
                <Image
                  source={{ uri: cut }}
                  style={StyleSheet.absoluteFill}
                  alt=""
                  contentFit="cover"
                />
              </Pressable>
            ))}
          </View>
        </View>

        <Input
          value={caption}
          onChangeText={setCaption}
          placeholder="캡션 추가 (선택)"
        />

        <View>
          <Text
            style={[
              styles.label,
              { fontFamily: font("body"), color: c.textSecondary },
            ]}
          >
            공개 범위
          </Text>
          <View style={styles.visibility}>
            <Chip
              icon="users"
              selected={visibility === "friends"}
              onPress={() => setVisibility("friends")}
            >
              친구 공개
            </Chip>
            <Chip
              icon="globe"
              selected={visibility === "public"}
              onPress={() => setVisibility("public")}
            >
              전체 공개
            </Chip>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <Button
          variant="fill"
          size="lg"
          block
          icon="upload"
          onPress={() => router.replace("/capture/uploading")}
        >
          업로드
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { padding: spacing[4], gap: spacing[5] },
  label: { fontSize: 12, marginBottom: spacing[2] },
  thumbs: { flexDirection: "row", gap: spacing[2] },
  thumb: { width: 52, height: 52, borderRadius: 10, overflow: "hidden" },
  visibility: { flexDirection: "row", gap: spacing[2] },
  footer: { padding: spacing[4], borderTopWidth: StyleSheet.hairlineWidth },
});
