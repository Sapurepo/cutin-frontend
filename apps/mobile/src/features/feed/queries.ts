import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post } from "@cutin/types";
import {
  createPost,
  fetchArchive,
  fetchFeed,
  fetchPost,
  toggleBookmark,
  toggleReaction,
} from "./api";

export const feedKeys = {
  all: ["feed"] as const,
  detail: (id: string) => ["feed", id] as const,
  archive: ["feed", "archive"] as const,
};

export function useFeed() {
  return useQuery({ queryKey: feedKeys.all, queryFn: fetchFeed });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: feedKeys.detail(id),
    queryFn: () => fetchPost(id),
  });
}

export function useArchive() {
  return useQuery({ queryKey: feedKeys.archive, queryFn: fetchArchive });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: feedKeys.all });
    },
  });
}

/** 서버가 돌려준 포스트를 목록·상세 캐시에 즉시 반영한다(재요청 없이 화면이 따라간다). */
function useSyncPostCaches() {
  const queryClient = useQueryClient();
  return (updated: Post) => {
    queryClient.setQueryData(feedKeys.detail(updated.id), updated);
    queryClient.setQueryData<Post[]>(feedKeys.all, (posts) =>
      posts?.map((p) => (p.id === updated.id ? updated : p)),
    );
    void queryClient.invalidateQueries({ queryKey: feedKeys.archive });
  };
}

export function useToggleBookmark() {
  const syncCaches = useSyncPostCaches();
  return useMutation({ mutationFn: toggleBookmark, onSuccess: syncCaches });
}

export function useToggleReaction() {
  const syncCaches = useSyncPostCaches();
  return useMutation({
    mutationFn: ({ id, emoji }: { id: string; emoji: string }) =>
      toggleReaction(id, emoji),
    onSuccess: syncCaches,
  });
}
