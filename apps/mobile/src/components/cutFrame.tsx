import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import type { CutCount } from "@cutin/types";
import { radius } from "@cutin/tokens";
import { useTheme } from "@/theme/useTheme";

export type CutLayout = "2x2" | "row" | "big-left" | "strip";

interface CutFrameProps {
  count: CutCount;
  cuts: string[];
  /** 4컷 전용 템플릿 변형 (§6.1) — 미지정 시 컷 수 기본 레이아웃 */
  layout?: CutLayout;
  /** 셀 크기 계산용 프레임 너비 비율 조정이 필요하면 스타일로 감싼다 */
  rounded?: boolean;
}

const GUTTER = 4; // 시안: 4px 헤어라인 거터

/** 컷 수(1/2/4/6)에 맞는 템플릿 프레임 — 정방형, 엣지-투-엣지 컷 배치. */
export function CutFrame({
  count,
  cuts,
  layout,
  rounded = true,
}: CutFrameProps) {
  const c = useTheme();

  const cell = (index: number, style?: object) => (
    <View
      key={index}
      style={[styles.cell, { backgroundColor: c.surfaceSunken }, style]}
    >
      {cuts[index] ? (
        <Image
          source={{ uri: cuts[index] }}
          style={StyleSheet.absoluteFill}
          alt=""
          contentFit="cover"
        />
      ) : null}
    </View>
  );

  let inner: React.ReactNode;
  if (count === 1) {
    inner = <View style={styles.fill}>{cell(0, styles.fill)}</View>;
  } else if (count === 2) {
    inner = (
      <View style={[styles.fill, styles.rowWrap]}>
        {cell(0, styles.flex)}
        {cell(1, styles.flex)}
      </View>
    );
  } else if (count === 4 && layout === "row") {
    inner = (
      <View style={[styles.fill, styles.colWrap]}>
        {[0, 1, 2, 3].map((i) => cell(i, styles.flex))}
      </View>
    );
  } else if (count === 4 && layout === "strip") {
    inner = (
      <View style={[styles.fill, styles.rowWrap]}>
        {[0, 1, 2, 3].map((i) => cell(i, styles.flex))}
      </View>
    );
  } else if (count === 4 && layout === "big-left") {
    inner = (
      <View style={[styles.fill, styles.rowWrap]}>
        {cell(0, { flex: 1.6 })}
        <View style={[styles.flex, styles.colWrap]}>
          {[1, 2, 3].map((i) => cell(i, styles.flex))}
        </View>
      </View>
    );
  } else {
    // 2xN 그리드 (4컷 기본 2x2, 6컷 2x3)
    const columns = 2;
    const rows = count / columns;
    inner = (
      <View style={[styles.fill, styles.colWrap]}>
        {Array.from({ length: rows }).map((_, r) => (
          <View key={r} style={[styles.flex, styles.rowWrap]}>
            {Array.from({ length: columns }).map((_, col) =>
              cell(r * columns + col, styles.flex),
            )}
          </View>
        ))}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.frame,
        { backgroundColor: c.surfaceSunken },
        rounded && { borderRadius: radius.md },
      ]}
    >
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { aspectRatio: 1, overflow: "hidden", padding: GUTTER },
  fill: { flex: 1, gap: GUTTER },
  flex: { flex: 1 },
  rowWrap: { flexDirection: "row", gap: GUTTER },
  colWrap: { flexDirection: "column", gap: GUTTER },
  cell: { overflow: "hidden", borderRadius: 3 },
});
