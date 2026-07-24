import { describe, expect, it } from "vitest";
import type { CutCount } from "@cutin/types";

import {
  frameSkins,
  getFrameSkin,
  getTemplate,
  templates,
  templatesForCount,
} from "./templates";

describe("templates registry", () => {
  it("템플릿 id는 유일하다", () => {
    const ids = templates.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("프레임 스킨 id는 유일하다", () => {
    const ids = frameSkins.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("모든 컷 수에 템플릿이 있고 첫 항목은 기본(스킨 없음) 템플릿이다", () => {
    for (const count of [1, 2, 4, 6] as CutCount[]) {
      expect(templatesForCount(count).length).toBeGreaterThanOrEqual(1);
    }
    expect(templates[0].frame).toBeUndefined();
  });

  it("4컷 전용 레이아웃 변형은 다른 컷 수에 노출되지 않는다", () => {
    for (const count of [1, 2, 6] as CutCount[]) {
      for (const t of templatesForCount(count)) {
        expect(t.layout).toBe("2x2");
      }
    }
  });

  it("getTemplate은 미지정·미지의 id를 기본 템플릿으로 폴백한다", () => {
    expect(getTemplate(undefined)).toBe(templates[0]);
    expect(getTemplate("no-such-template")).toBe(templates[0]);
    expect(getTemplate("noir-film").id).toBe("noir-film");
  });

  it("getFrameSkin은 미지정·미지의 id에 undefined를 돌려준다", () => {
    expect(getFrameSkin(undefined)).toBeUndefined();
    expect(getFrameSkin("no-such-skin")).toBeUndefined();
    expect(getFrameSkin("white")?.bg).toBe("#FFFFFF");
  });
});
