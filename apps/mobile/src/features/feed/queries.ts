import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, fetchFeed, fetchPost } from "./api";

export const feedKeys = {
  all: ["feed"] as const,
  detail: (id: string) => ["feed", id] as const,
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

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: feedKeys.all });
    },
  });
}
