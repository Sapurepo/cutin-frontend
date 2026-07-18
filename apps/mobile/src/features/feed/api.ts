/* 피드 API — 스켈레톤 단계에서는 시드 데이터를 지연 반환하는 목 fetcher.
 * 실 API 연동 시 @cutin/api의 apiClient 호출로 본문만 교체한다. */
import type { Post } from "@cutin/types";
import { posts } from "@/mocks/seed";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchFeed(): Promise<Post[]> {
  await delay(300);
  return posts;
}

export async function fetchPost(id: string): Promise<Post> {
  await delay(200);
  const post = posts.find((p) => p.id === id);
  if (!post) throw new Error(`포스트를 찾을 수 없어요: ${id}`);
  return post;
}
