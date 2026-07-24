import { create } from "zustand";
import type { CaptureMode, CutCount, Draft } from "@cutin/types";

interface CaptureState {
  count: CutCount;
  mode: CaptureMode;
  /** 촬영된 컷 이미지 URI (실촬영 file:// 또는 draft의 기존 URI) */
  cuts: string[];
  /** 재촬영 대상 인덱스 — 지정 시 다음 addCut이 해당 컷을 교체한다 */
  retakeIndex: number | null;
  /** 선택한 템플릿 id — templates.ts 레지스트리 참조 */
  templateId: string;
  start: (count: CutCount, mode: CaptureMode) => void;
  resume: (draft: Draft) => void;
  addCut: (uri: string) => void;
  setRetakeIndex: (index: number | null) => void;
  setTemplate: (templateId: string) => void;
  reset: () => void;
}

const initial = {
  count: 4 as CutCount,
  mode: "single" as CaptureMode,
  cuts: [] as string[],
  retakeIndex: null as number | null,
  templateId: "basic",
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
  reset: () => set({ ...initial }),
}));
