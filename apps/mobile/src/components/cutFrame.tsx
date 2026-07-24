import { StyleSheet, Text, View } from "react-native";
import type { CutCount, CutLayout } from "@cutin/types";
import { radius } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { FilteredCut } from "@/components/filteredCut";
import { getFrameSkin } from "@/features/capture/templates";

export type { CutLayout };

interface CutFrameProps {
  count: CutCount;
  cuts: string[];
  /** 4컷 전용 템플릿 변형 (§6.1) — 미지정 시 컷 수 기본 레이아웃 */
  layout?: CutLayout;
  /** 셀 크기 계산용 프레임 너비 비율 조정이 필요하면 스타일로 감싼다 */
  rounded?: boolean;
  /** 프레임 스킨 id — 미지정·미지의 id면 기본(테마) 룩 */
  frameId?: string;
  /** 푸터 날짜 스탬프용 작성 시각(ISO) — 스킨에 footer가 있을 때만 표시 */
  stampDate?: string;
  /** 보정 필터 id — 전체 컷에 일괄 적용 */
  filterId?: string;
}

const GUTTER = 4; // 시안: 4px 헤어라인 거터 (기본 룩)

/** 컷 수(1/2/4/6)에 맞는 템플릿 프레임 — 컷 그리드는 정방형, 스킨에 따라 프레임·푸터가 붙는다. */
export function CutFrame({
  count,
  cuts,
  layout,
  rounded = true,
  frameId,
  stampDate,
  filterId,
}: CutFrameProps) {
  const c = useTheme();
  const skin = getFrameSkin(frameId);
  const gap = { gap: skin?.gutter ?? GUTTER };

  const cell = (index: number, style?: object) => (
    <View
      key={index}
      style={[
        styles.cell,
        {
          backgroundColor: c.surfaceSunken,
          borderRadius: skin?.cellRadius ?? 3,
        },
        style,
      ]}
    >
      {cuts[index] ? (
        <FilteredCut
          uri={cuts[index]}
          filterId={filterId}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
    </View>
  );

  let inner: React.ReactNode;
  if (count === 1) {
    inner = <View style={[styles.fill, gap]}>{cell(0, styles.fill)}</View>;
  } else if (count === 2) {
    inner = (
      <View style={[styles.fill, styles.rowWrap, gap]}>
        {cell(0, styles.flex)}
        {cell(1, styles.flex)}
      </View>
    );
  } else if (count === 4 && layout === "row") {
    inner = (
      <View style={[styles.fill, styles.colWrap, gap]}>
        {[0, 1, 2, 3].map((i) => cell(i, styles.flex))}
      </View>
    );
  } else if (count === 4 && layout === "strip") {
    inner = (
      <View style={[styles.fill, styles.rowWrap, gap]}>
        {[0, 1, 2, 3].map((i) => cell(i, styles.flex))}
      </View>
    );
  } else if (count === 4 && layout === "big-left") {
    inner = (
      <View style={[styles.fill, styles.rowWrap, gap]}>
        {cell(0, { flex: 1.6 })}
        <View style={[styles.flex, styles.colWrap, gap]}>
          {[1, 2, 3].map((i) => cell(i, styles.flex))}
        </View>
      </View>
    );
  } else {
    // 2xN 그리드 (4컷 기본 2x2, 6컷 2x3)
    const columns = 2;
    const rows = count / columns;
    inner = (
      <View style={[styles.fill, styles.colWrap, gap]}>
        {Array.from({ length: rows }).map((_, r) => (
          <View key={r} style={[styles.flex, styles.rowWrap, gap]}>
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
        {
          backgroundColor: skin?.bg ?? c.surfaceSunken,
          padding: skin?.padding ?? GUTTER,
        },
        rounded && { borderRadius: radius.md },
      ]}
    >
      <View style={styles.grid}>{inner}</View>
      {skin?.footer === "logo-date" ? (
        <View style={styles.footer}>
          <Text
            style={{
              fontFamily: font("latin", "600"),
              fontSize: 11,
              letterSpacing: 2,
              color: skin.fg,
            }}
          >
            CUTIN
          </Text>
          {stampDate ? (
            <Text
              style={{
                fontFamily: font("latin", "500"),
                fontSize: 9,
                letterSpacing: 1,
                color: skin.fg,
                opacity: 0.65,
              }}
            >
              {stampDate.slice(0, 10).replaceAll("-", ".")}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: "hidden" },
  grid: { aspectRatio: 1 },
  fill: { flex: 1 },
  flex: { flex: 1 },
  rowWrap: { flexDirection: "row" },
  colWrap: { flexDirection: "column" },
  cell: { overflow: "hidden" },
  footer: { alignItems: "center", paddingTop: 10, gap: 2 },
});
