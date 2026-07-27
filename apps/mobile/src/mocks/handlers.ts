import { delay, http, HttpResponse } from "msw";
import type { CreatePostRequest, Post } from "@cutin/types";

import { API_BASE_URL } from "../lib/apiConfig";
import { db } from "./db";
import { friends, me, notifications, requests, suggested } from "./seed";

const url = (path: string) => `${API_BASE_URL}${path}`;

const LATENCY_MS = 300;

let postSeq = 0;

function notFound() {
  return HttpResponse.json(
    { code: "POST_NOT_FOUND", message: "포스트를 찾을 수 없어요." },
    { status: 404 },
  );
}

/** 이모지 카운트를 delta만큼 조정하고, 0이 되면 목록에서 뺀다. */
function bumpReaction(post: Post, emoji: string, delta: number) {
  const existing = post.reactions.find((r) => r.emoji === emoji);
  if (!existing) {
    if (delta > 0) post.reactions.push({ emoji, count: delta });
    return;
  }
  existing.count += delta;
  if (existing.count <= 0) {
    post.reactions = post.reactions.filter((r) => r.emoji !== emoji);
  }
}

// 도메인 핸들러를 이 배열에 추가해 나간다. (native/테스트 양쪽에서 공유)
export const handlers = [
  http.get(url("/feed"), async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(db.posts);
  }),
  http.get(url("/posts/:id"), async ({ params }) => {
    await delay(LATENCY_MS);
    const post = db.posts.find((p) => p.id === params.id);
    if (!post) return notFound();
    return HttpResponse.json(post);
  }),
  http.get(url("/archive"), async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(db.posts.filter((p) => p.bookmarked));
  }),
  http.post(url("/posts/:id/bookmark"), async ({ params }) => {
    await delay(LATENCY_MS);
    const post = db.posts.find((p) => p.id === params.id);
    if (!post) return notFound();
    post.bookmarked = !post.bookmarked;
    return HttpResponse.json(post);
  }),
  http.post(url("/posts/:id/reactions"), async ({ params, request }) => {
    await delay(LATENCY_MS);
    const post = db.posts.find((p) => p.id === params.id);
    if (!post) return notFound();
    const { emoji } = (await request.json()) as { emoji: string };

    // 같은 이모지를 다시 누르면 해제, 다른 이모지를 누르면 갈아탄다(1인 1반응).
    const previous = post.myReaction;
    if (previous) bumpReaction(post, previous, -1);
    post.myReaction = previous === emoji ? null : emoji;
    if (post.myReaction) bumpReaction(post, emoji, 1);

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
