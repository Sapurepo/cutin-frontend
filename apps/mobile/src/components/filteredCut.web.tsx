import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { Image } from "expo-image";
import { getFilter } from "@/features/capture/filters";

interface FilteredCutProps {
  uri: string;
  /** 필터 프리셋 id — 미지정·미지의 id면 원본 렌더 */
  filterId?: string;
  style?: StyleProp<ViewStyle>;
}

/** 웹 분기 — react-native-web이 style.filter를 CSS filter로 통과시킨다. */
export function FilteredCut({ uri, filterId, style }: FilteredCutProps) {
  const filter = getFilter(filterId);
  if (!filter.css) {
    return (
      <Image
        source={{ uri }}
        style={style as object}
        alt=""
        contentFit="cover"
      />
    );
  }
  return (
    <View style={[style, { filter: filter.css }]}>
      <Image source={{ uri }} style={styles.fill} alt="" contentFit="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
