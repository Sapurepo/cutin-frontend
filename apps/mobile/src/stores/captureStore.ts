import { create } from "zustand";
import type {
  CaptureMode,
  CutCount,
  Draft,
  PostVisibility,
} from "@cutin/types";

interface CaptureState {
  count: CutCount;
  mode: CaptureMode;
  /** 촬영된 컷 이미지 URI (실촬영 file:// 또는 draft의 기존 URI) */
  cuts: string[];
  /** 재촬영 대상 인덱스 — 지정 시 다음 addCut이 해당 컷을 교체한다 */
  retakeIndex: number | null;
  /** 선택한 템플릿 id — templates.ts 레지스트리 참조 */
  templateId: string;
  /** 선택한 보정 필터 id — filters.ts 레지스트리 참조 */
  filterId: string;
  /** 업로드 옵션 — §6.3 대표 컷 / §6.4 캡션·공개 범위 */
  caption: string;
  visibility: PostVisibility;
  thumbnailIndex: number;
  start: (count: CutCount, mode: CaptureMode) => void;
  resume: (draft: Draft) => void;
  addCut: (uri: string) => void;
  setRetakeIndex: (index: number | null) => void;
  setTemplate: (templateId: string) => void;
  setFilter: (filterId: string) => void;
  setUploadMeta: (meta: {
    caption: string;
    visibility: PostVisibility;
    thumbnailIndex: number;
  }) => void;
  reset: () => void;
}

const initial = {
  count: 4 as CutCount,
  mode: "single" as CaptureMode,
  cuts: [] as string[],
  retakeIndex: null as number | null,
  templateId: "basic",
  filterId: "original",
  caption: "",
  visibility: "friends" as PostVisibility,
  thumbnailIndex: 0,
};

/** 촬영 플로우(카메라 → 템플릿 → 편집 → 업로드) 상태.
 * 실사진 URI 배열은 query param으로 나르기 어려워 스토어로 공유한다. */
export const useCaptureStore = create<CaptureState>((set) => ({
  ...initial,
  start: (count, mode) => set({ ...initial, count, mode }),
  resume: (draft) =>
    set({
      ...initial,
      count: draft.count,
      mode: draft.mode,
      cuts: [...draft.cuts],
    }),
  addCut: (uri) =>
    set((state) => {
      if (state.retakeIndex !== null) {
        const cuts = [...state.cuts];
        cuts[state.retakeIndex] = uri;
        return { cuts, retakeIndex: null };
      }
      return { cuts: [...state.cuts, uri] };
    }),
  setRetakeIndex: (index) => set({ retakeIndex: index }),
  setTemplate: (templateId) => set({ templateId }),
  setFilter: (filterId) => set({ filterId }),
  setUploadMeta: (meta) => set(meta),
  reset: () => set({ ...initial }),
}));
