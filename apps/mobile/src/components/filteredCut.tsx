import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { Image } from "expo-image";
import { ColorMatrix } from "react-native-color-matrix-image-filters";
import { getFilter } from "@/features/capture/filters";

interface FilteredCutProps {
  uri: string;
  /** 필터 프리셋 id — 미지정·미지의 id면 원본 렌더 */
  filterId?: string;
  style?: StyleProp<ViewStyle>;
}

/** 필터 프리셋을 적용한 컷 이미지. (웹 분기: filteredCut.web.tsx) */
export function FilteredCut({ uri, filterId, style }: FilteredCutProps) {
  const filter = getFilter(filterId);
  if (!filter.matrix) {
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
    <ColorMatrix matrix={filter.matrix} style={style}>
      <Image source={{ uri }} style={styles.fill} alt="" contentFit="cover" />
    </ColorMatrix>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
