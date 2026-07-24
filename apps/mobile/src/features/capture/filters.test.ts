import { describe, expect, it } from "vitest";

import { filters, getFilter } from "./filters";

describe("filters registry", () => {
  it("필터 id는 유일하다", () => {
    const ids = filters.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("첫 항목은 원본(매트릭스·css 없음)이다", () => {
    expect(filters[0].id).toBe("original");
    expect(filters[0].matrix).toBeNull();
    expect(filters[0].css).toBeNull();
  });

  it("원본 외 모든 필터는 4x5 매트릭스(20원소)와 css를 가진다", () => {
    for (const f of filters.slice(1)) {
      expect(f.matrix, f.id).toHaveLength(20);
      expect(f.css, f.id).toBeTruthy();
    }
  });

  it("흑백은 RGB 세 행이 동일한 luma 가중치를 쓴다", () => {
    const mono = getFilter("mono").matrix;
    expect(mono).not.toBeNull();
    const rows = [mono!.slice(0, 3), mono!.slice(5, 8), mono!.slice(10, 13)];
    expect(rows[1]).toEqual(rows[0]);
    expect(rows[2]).toEqual(rows[0]);
    const lumaSum = rows[0].reduce((a, b) => a + b, 0);
    expect(lumaSum).toBeCloseTo(1, 4);
  });

  it("getFilter는 미지정·미지의 id를 원본으로 폴백한다", () => {
    expect(getFilter(undefined)).toBe(filters[0]);
    expect(getFilter("no-such-filter")).toBe(filters[0]);
    expect(getFilter("sepia").id).toBe("sepia");
  });
});
