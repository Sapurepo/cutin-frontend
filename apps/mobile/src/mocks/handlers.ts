import { delay, http, HttpResponse } from "msw";
import type { CreatePostRequest, Post } from "@cutin/types";

import { API_BASE_URL } from "../lib/apiConfig";
import { db } from "./db";
import { friends, me, notifications, requests, suggested } from "./seed";

const url = (path: string) => `${API_BASE_URL}${path}`;

const LATENCY_MS = 300;

let postSeq = 0;

// 도메인 핸들러를 이 배열에 추가해 나간다. (native/테스트 양쪽에서 공유)
export const handlers = [
  http.get(url("/feed"), async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(db.posts);
  }),
  http.get(url("/posts/:id"), async ({ params }) => {
    await delay(LATENCY_MS);
    const post = db.posts.find((p) => p.id === params.id);
    if (!post) {
      return HttpResponse.json(
        { code: "POST_NOT_FOUND", message: "포스트를 찾을 수 없어요." },
        { status: 404 },
      );
    }
    return HttpResponse.json(post);
  }),
  http.get(url("/friends/overview"), async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json({ friends, suggested, requests });
  }),
  http.get(url("/notifications"), async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(notifications);
  }),
  http.post(url("/posts"), async ({ request }) => {
    await delay(LATENCY_MS);
    const body = (await request.json()) as CreatePostRequest;
    const post: Post = {
      id: `p-new-${++postSeq}`,
      author: me,
      timeAgo: "방금 전",
      reactions: [],
      comments: [],
      myReaction: null,
      createdAt: new Date().toISOString(),
      ...body,
    };
    db.posts.unshift(post);
    return HttpResponse.json(post, { status: 201 });
  }),
];
