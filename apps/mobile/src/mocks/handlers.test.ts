import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import type { Post } from "@cutin/types";

import { API_BASE_URL } from "../lib/apiConfig";
import { db, resetDb } from "./db";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  resetDb();
});
afterAll(() => server.close());

describe("mock API handlers", () => {
  it("GET /feed는 시드 포스트 목록을 돌려준다", async () => {
    const res = await fetch(`${API_BASE_URL}/feed`);
    expect(res.status).toBe(200);
    const posts = (await res.json()) as Post[];
    expect(posts).toHaveLength(db.posts.length);
    expect(posts[0].id).toBe("p0");
  });

  it("GET /posts/:id — 미존재 id는 404를 돌려준다", async () => {
    const res = await fetch(`${API_BASE_URL}/posts/no-such-post`);
    expect(res.status).toBe(404);
    const error = (await res.json()) as { code: string };
    expect(error.code).toBe("POST_NOT_FOUND");
  });

  it("POST /posts/:id/bookmark는 보관 상태를 토글하고 보관함에 반영한다", async () => {
    const before = await (await fetch(`${API_BASE_URL}/archive`)).json();
    expect((before as Post[]).map((p) => p.id)).toEqual(["p1"]);

    const res = await fetch(`${API_BASE_URL}/posts/p2/bookmark`, {
      method: "POST",
    });
    expect(res.status).toBe(200);
    expect(((await res.json()) as Post).bookmarked).toBe(true);

    const after = await (await fetch(`${API_BASE_URL}/archive`)).json();
    expect((after as Post[]).map((p) => p.id).sort()).toEqual(["p1", "p2"]);
  });

  it("POST /posts/:id/reactions는 반응을 교체하고 같은 이모지면 해제한다", async () => {
    const react = async (emoji: string) => {
      const res = await fetch(`${API_BASE_URL}/posts/p1/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emoji }),
      });
      return (await res.json()) as Post;
    };

    // p1은 시드에서 🔥(14)에 반응해 둔 상태다.
    const switched = await react("🙌");
    expect(switched.myReaction).toBe("🙌");
    expect(switched.reactions.find((r) => r.emoji === "🔥")?.count).toBe(13);
    expect(switched.reactions.find((r) => r.emoji === "🙌")?.count).toBe(3);

    const cleared = await react("🙌");
    expect(cleared.myReaction).toBeNull();
    expect(cleared.reactions.find((r) => r.emoji === "🙌")?.count).toBe(2);
  });

  it("POST /posts는 포스트를 생성해 피드 맨 앞에 추가한다", async () => {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: 4,
        cuts: [
          "file:///a.jpg",
          "file:///b.jpg",
          "file:///c.jpg",
          "file:///d.jpg",
        ],
        layout: "row",
        frameId: "white",
        filterId: "mono",
        thumbnailIndex: 1,
        caption: "테스트 네 컷",
        visibility: "friends",
      }),
    });
    expect(res.status).toBe(201);
    const created = (await res.json()) as Post;
    expect(created.author.handle).toBe("cut_jimin");
    expect(created.frameId).toBe("white");
    expect(created.timeAgo).toBe("방금 전");

    const feedRes = await fetch(`${API_BASE_URL}/feed`);
    const feed = (await feedRes.json()) as Post[];
    expect(feed[0].id).toBe(created.id);
    expect(feed[0].caption).toBe("테스트 네 컷");
  });
});
