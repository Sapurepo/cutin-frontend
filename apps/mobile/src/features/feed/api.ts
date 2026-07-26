/* 피드 API — MSW가 인터셉트하는 mocked HTTP를 실제 apiClient로 호출한다.
 * 실백엔드 전환 시 이 파일은 그대로 두고 EXPO_PUBLIC_API_MOCKING만 끈다. */
import type { CreatePostRequest, Post } from "@cutin/types";
import { apiClient } from "@/lib/apiClient";

export function fetchFeed(): Promise<Post[]> {
  return apiClient.get<Post[]>("/feed");
}

export function fetchPost(id: string): Promise<Post> {
  return apiClient.get<Post>(`/posts/${id}`);
}

export function createPost(body: CreatePostRequest): Promise<Post> {
  return apiClient.post<Post>("/posts", body);
}

export function fetchArchive(): Promise<Post[]> {
  return apiClient.get<Post[]>("/archive");
}

/** 보관 토글 — 갱신된 포스트를 돌려준다. */
export function toggleBookmark(id: string): Promise<Post> {
  return apiClient.post<Post>(`/posts/${id}/bookmark`);
}

/** 반응 토글(1인 1반응) — 같은 이모지면 해제, 다른 이모지면 교체된다. */
export function toggleReaction(id: string, emoji: string): Promise<Post> {
  return apiClient.post<Post>(`/posts/${id}/reactions`, { emoji });
}
